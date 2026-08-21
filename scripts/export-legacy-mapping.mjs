import { readFile, writeFile, mkdir } from 'node:fs/promises';

const source = await readFile(new URL('../app/legacy-redirects.ts', import.meta.url), 'utf8');
const matches = [...source.matchAll(/^\s*"([^"]+)":\s*"([^"]+)",/gm)];
const rows = matches.map(([, legacyPath, targetPath]) => {
  const legacy = `https://khangvuongbooking.com/${legacyPath}`;
  const target = `https://khangvuongbooking.com${targetPath}`;
  return `"${legacy.replaceAll('"', '""')}","${target.replaceAll('"', '""')}",301`;
});
await mkdir(new URL('../reports/', import.meta.url), { recursive: true });
await writeFile(new URL('../reports/legacy-url-mapping.csv', import.meta.url), ['legacy_url,new_url,status_code', ...rows].join('\n'));
await writeFile(new URL('../reports/legacy-url-mapping-summary.md', import.meta.url), `# Báo cáo đối chiếu URL lịch sử\n\n- Số URL redirect 301 có cấu hình: **${rows.length.toLocaleString('vi-VN')}**\n- URL nguồn: khangvuongbooking.com/<duong-dan-cu>\n- URL đích: landing canonical trên Khang Vuong Booking Next.js\n- Trạng thái: 301 permanent redirect\n\nTệp CSV đi kèm dùng để kiểm tra trước khi thay DNS hoặc đưa domain vào hosting Manus.\n`);
console.log(`Exported ${rows.length} mappings.`);
