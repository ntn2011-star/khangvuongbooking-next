import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const parseCsv = (content) => {
  const records = [];
  let cells = [];
  let cell = '';
  let quoted = false;
  for (let index = 0; index < content.length; index += 1) {
    const char = content[index];
    if (char === '"') {
      if (quoted && content[index + 1] === '"') { cell += '"'; index += 1; } else quoted = !quoted;
    } else if (char === ',' && !quoted) { cells.push(cell); cell = ''; }
    else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && content[index + 1] === '\n') index += 1;
      cells.push(cell);
      if (cells.some((value) => value.length > 0)) records.push(cells);
      cells = [];
      cell = '';
    } else cell += char;
  }
  cells.push(cell);
  if (cells.some((value) => value.length > 0)) records.push(cells);
  return records;
};

const root = process.cwd();
const source = await readFile(path.join(root, 'reports/gsc-kvbk-migration-master.csv'), 'utf8');
const [headerCells, ...records] = parseCsv(source);
const headers = headerCells.map((header) => header.replace(/^\uFEFF/, ''));
const rows = records.map((cells) => Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? ''])));
const isUsefulQuery = (query) => query && !/^site:/i.test(query.trim()) && query.trim().length > 4;
const firstUsefulQuery = (value) => value.split('|').map((item) => item.trim()).find(isUsefulQuery) ?? '';
const humanizeSlug = (slug) => slug.split('-').filter(Boolean).join(' ');
const relatedFor = (slug) => {
  if (slug.includes('doi-ngay') || slug.includes('doi-ve')) return ['doi-ngay-ve', 'hang-bay'];
  if (slug.includes('hanh-ly')) return ['mua-them-hanh-ly', 'hang-bay'];
  if (slug.includes('visa')) return ['visa', 'cam-nang-bay'];
  if (slug.includes('du-hoc')) return ['ve-du-hoc-sinh', 've-may-bay-quoc-te'];
  if (slug.includes('my') || slug.includes('trung-quoc') || slug.includes('chau') || slug.includes('nga')) return ['ve-may-bay-quoc-te', 'diem-den'];
  if (slug.includes('hang') || slug.includes('airlines') || slug.includes('airways')) return ['hang-bay', 'dich-vu-theo-hang'];
  return ['ve-may-bay', 'cam-nang-bay'];
};

const pages = rows
  .filter((row) => row.recommendation_type === 'create_specific_landing' || row.recommendation_type === 'keep_existing')
  .map((row) => {
    const slug = row.source_path.replace(/^\/+|\/+$/g, '');
    const query = firstUsefulQuery(row.top_queries);
    const phrase = query || humanizeSlug(slug);
    const related = relatedFor(slug).map((relatedSlug) => `{ slug: ${JSON.stringify(relatedSlug)}, label: ${JSON.stringify(relatedSlug.replaceAll('-', ' '))} }`).join(', ');
    return `  ${JSON.stringify(slug)}: {
    slug: ${JSON.stringify(slug)},
    eyebrow: 'Thông tin hành trình',
    title: ${JSON.stringify(phrase)},
    description: ${JSON.stringify(`Thông tin định hướng cho ${phrase}. Hãy kiểm tra giá vé, hành trình và điều kiện thực tế trước khi đặt.`)},
    intro: ${JSON.stringify(`Trang này được giữ nguyên đường dẫn từ website Khang Vuong Booking trước đây để bảo toàn tính liên tục của nội dung và hỗ trợ người dùng tìm đúng thông tin về ${phrase}.`)},
    checklist: ['Xác định hành trình hoặc nhu cầu cần kiểm tra.', 'Đối chiếu lịch bay, điều kiện vé và dịch vụ theo thời điểm thực tế.', 'Chuẩn bị thông tin booking trước khi gửi yêu cầu hỗ trợ.'],
    related: [${related}],
    updatedAt: '2026-08-20',
  }`;
  });

const file = `/** Tự sinh từ Google Search Console Khang Vuong Booking. Không xóa URL khi chưa hoàn tất migration SEO. */
import type { PageContent } from './content';

export const gscLegacyPages: Record<string, PageContent> = {
${pages.join(',\n')}
};
`;
await writeFile(path.join(root, 'app/gsc-legacy-pages.ts'), file);
console.log(JSON.stringify({ generated: pages.length, output: 'app/gsc-legacy-pages.ts' }));
