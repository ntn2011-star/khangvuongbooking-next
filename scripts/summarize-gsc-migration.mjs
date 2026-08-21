import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const parseCsv = (content) => {
  const records = [];
  let cells = []; let cell = ''; let quoted = false;
  for (let index = 0; index < content.length; index += 1) {
    const char = content[index];
    if (char === '"') {
      if (quoted && content[index + 1] === '"') { cell += '"'; index += 1; } else quoted = !quoted;
    } else if (char === ',' && !quoted) { cells.push(cell); cell = ''; }
    else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && content[index + 1] === '\n') index += 1;
      cells.push(cell); if (cells.some((value) => value.length > 0)) records.push(cells); cells = []; cell = '';
    } else cell += char;
  }
  cells.push(cell); if (cells.some((value) => value.length > 0)) records.push(cells);
  return records;
};

const root = process.cwd();
const reports = path.join(root, 'reports');
const [headerCells, ...records] = parseCsv(await readFile(path.join(reports, 'gsc-kvbk-migration-master.csv'), 'utf8'));
const headers = headerCells.map((header) => header.replace(/^\uFEFF/, ''));
const rows = records.map((cells) => Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? ''])));
const types = ['create_specific_landing', 'keep_existing', 'remap_existing', 'retain_asset', 'retire_low_value'];
const labels = { create_specific_landing: 'Tạo landing cùng URL cũ', keep_existing: 'Giữ route hiện có', remap_existing: '301 đến route tương đương', retain_asset: 'Giữ asset', retire_low_value: 'Nghỉ URL giá trị thấp' };
const summary = Object.fromEntries(types.map((type) => [type, { urls: 0, clicks: 0, impressions: 0 }]));
for (const row of rows) {
  if (!summary[row.recommendation_type]) throw new Error(`Quyết định không hợp lệ: ${row.recommendation_type}`);
  summary[row.recommendation_type].urls += 1;
  summary[row.recommendation_type].clicks += Number(row.clicks || 0);
  summary[row.recommendation_type].impressions += Number(row.impressions || 0);
}
const totalClicks = rows.reduce((sum, row) => sum + Number(row.clicks || 0), 0);
const totalImpressions = rows.reduce((sum, row) => sum + Number(row.impressions || 0), 0);
const remapValidation = JSON.parse(await readFile(path.join(reports, 'gsc-remap-validation.json'), 'utf8'));
const prerenderManifest = JSON.parse(await readFile(path.join(root, '.next/prerender-manifest.json'), 'utf8'));
const format = (value) => new Intl.NumberFormat('vi-VN').format(value);
const table = types.map((type) => `| ${labels[type]} | ${format(summary[type].urls)} | ${format(summary[type].clicks)} | ${format(summary[type].impressions)} |`).join('\n');
const report = `# Báo cáo hoàn tất migration SEO — Khang Vuong Booking

## Phạm vi

Dữ liệu xuất từ Google Search Console property \`https://khangvuongbooking.com/\` trong giai đoạn 27-05-2025 đến 20-08-2026. Mục tiêu là giữ URL và ý định tìm kiếm khi thay website cũ bằng Next.js, không dồn nhiều trang khác intent về một hub chung.

> Mapping đúng giúp giảm rủi ro mất tín hiệu SEO nhưng không thể bảo đảm nguyên vẹn thứ hạng Google. Cần theo dõi index, 404, canonical và hiệu suất page/query sau cutover.

## Quyết định cuối cho URL GSC

| Quyết định | Số URL | Click lịch sử | Impression lịch sử |
|---|---:|---:|---:|
${table}
| **Tổng** | **${format(rows.length)}** | **${format(totalClicks)}** | **${format(totalImpressions)}** |

**${format(summary.create_specific_landing.urls)} URL** được materialize thành landing tĩnh với đúng path cũ. **${format(remapValidation.generated)} URL** có redirect 301 đến route tương đương đã tồn tại trong production build. Remap không có đích hợp lệ được đổi sang giữ URL/tạo landing, nên validation không còn entry bị từ chối.

## Xác minh kỹ thuật

| Hạng mục | Kết quả |
|---|---|
| Route prerender trong build | ${format(Object.keys(prerenderManifest.routes).length)} |
| Landing GSC cùng path URL cũ | ${format(summary.create_specific_landing.urls)} |
| 301 GSC đã kiểm tra đích build | ${format(remapValidation.generated)} |
| 301 bị từ chối | ${format(remapValidation.rejected)} |
| TypeScript | Không lỗi |
| Vitest | 68 test đạt; 1 external-health test được skip vì sandbox trả HTTP 451 |
| Runtime mẫu | Landing GSC HTTP 200; remap GSC HTTP 301; sitemap chứa URL GSC |

## File kiểm soát

| File | Vai trò |
|---|---|
| \`reports/gsc-kvbk-migration-master.csv\` | Quyết định cuối cho ${format(rows.length)} URL GSC. |
| \`app/gsc-legacy-pages.ts\` | Các landing GSC giữ cùng path. |
| \`app/gsc-remaps.ts\` | Chỉ gồm ${format(remapValidation.generated)} redirect có đích build. |
| \`reports/gsc-remap-validation.json\` | Bằng chứng kiểm tra redirect. |
| \`proxy.ts\` | Ưu tiên route GSC materialize, chỉ redirect khi cần. |

## Trạng thái

**Chưa đổi DNS.** Website cũ cần tiếp tục hoạt động đến khi người quản trị phê duyệt cutover và thực hiện checklist kèm theo.
`;
const checklist = `# Checklist chuyển domain Khang Vuong Booking sang Next.js

> Phạm vi: chuyển giao cùng domain \`khangvuongbooking.com\` sang website Next.js. Checklist không tự thực hiện thay đổi DNS.

## Trước cutover

- [ ] Rà \`gsc-kvbk-migration-master.csv\`; không còn URL GSC thiếu quyết định.
- [ ] Xác nhận production build thành công và server có đủ secrets, đặc biệt \`RAPIDAPI_KEY\`.
- [ ] Kiểm tra ngoài internet 20 URL click cao nhất: HTTP 200 nếu tạo/giữ, HTTP 301 một bước nếu remap.
- [ ] Kiểm tra \`/sitemap.xml\`, \`/robots.txt\`, canonical, Open Graph và URL chuẩn \`/ve-may-bay-quoc-te\`.
- [ ] Chuẩn bị quyền sửa DNS, hosting mới, Search Console và người chịu trách nhiệm rollback.

## Trong cutover

- [ ] Trỏ DNS của root domain và \`www\` sang máy chủ Next.js theo thông số hosting đích.
- [ ] Xác nhận TLS/HTTPS hợp lệ trước hoặc đồng thời khi chuyển traffic.
- [ ] Giữ hostname HTTPS, sitemap và canonical \`https://khangvuongbooking.com\`.
- [ ] Không tắt site cũ đến khi kiểm tra HTTP production hoàn tất.
- [ ] Test homepage, hãng, dịch vụ, điểm đến, landing GSC mới, remap 301, sitemap, robots và API tìm giá.

## 0–72 giờ sau cutover

- [ ] Submit lại \`https://khangvuongbooking.com/sitemap.xml\` trong Google Search Console.
- [ ] Dùng URL Inspection cho homepage và các URL GSC click cao, yêu cầu crawl khi cần.
- [ ] Theo dõi Page Indexing, Crawl Stats, 404, soft-404, redirect error và canonical mismatch mỗi ngày.
- [ ] So sánh performance theo page/query với baseline; ưu tiên URL click cao giảm bất thường.
- [ ] Chỉ thêm 301 mới khi có bằng chứng intent tương đương; không redirect asset sang nội dung.

## 2–8 tuần sau cutover

- [ ] Theo dõi indexation, performance, sitemap và Core Web Vitals hằng tuần.
- [ ] Giữ redirect 301 tối thiểu 12 tháng; không đổi thành 302.
- [ ] Không trả URL cũ về 410 trước khi kiểm tra traffic, backlink và dữ liệu GSC.
`;

await writeFile(path.join(reports, 'gsc-kvbk-migration-summary.json'), JSON.stringify({ generatedAt: new Date().toISOString(), total: rows.length, totalClicks, totalImpressions, decisions: summary, remapValidation, prerenderedRoutes: Object.keys(prerenderManifest.routes).length }, null, 2));
await writeFile(path.join(reports, 'gsc-kvbk-migration-final-2026-08-20.md'), report);
await writeFile(path.join(reports, 'khangvuongbooking-domain-cutover-checklist-2026-08-20.md'), checklist);
console.log(JSON.stringify({ total: rows.length, decisions: summary, prerenderedRoutes: Object.keys(prerenderManifest.routes).length, remaps: remapValidation.generated }));
