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
const master = await readFile(path.join(root, 'reports/gsc-kvbk-migration-master.csv'), 'utf8');
const [headerCells, ...records] = parseCsv(master);
const headers = headerCells.map((header) => header.replace(/^\uFEFF/, ''));
const rows = records.map((cells) => Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? ''])));
const manifest = JSON.parse(await readFile(path.join(root, '.next/prerender-manifest.json'), 'utf8'));
const validRoutes = new Set(Object.keys(manifest.routes));
const assetPattern = /\.(?:avif|gif|ico|jpe?g|png|svg|webp|xml|pdf|zip)$/i;
const invalid = [];
const redirects = {};
for (const row of rows.filter((row) => row.recommendation_type === 'remap_existing')) {
  const source = `/${row.source_path.replace(/^\/+|\/+$/g, '')}`;
  const target = `/${row.recommended_target_or_slug.replace(/^\/+|\/+$/g, '')}`;
  if (assetPattern.test(source)) { invalid.push({ source, target, reason: 'asset_source' }); continue; }
  if (!validRoutes.has(target)) { invalid.push({ source, target, reason: 'target_not_built' }); continue; }
  if (source !== target) redirects[source.slice(1)] = target;
}
const entries = Object.entries(redirects).sort(([a], [b]) => a.localeCompare(b));
const file = `/** Tự sinh từ bảng master GSC. Chỉ chứa remap có đích đã build. */\nexport const gscRemaps: Record<string, string> = {\n${entries.map(([source, target]) => `  ${JSON.stringify(source)}: ${JSON.stringify(target)},`).join('\n')}\n};\n`;
await writeFile(path.join(root, 'app/gsc-remaps.ts'), file);
await writeFile(path.join(root, 'reports/gsc-remap-validation.json'), JSON.stringify({ generated: entries.length, rejected: invalid.length, invalid }, null, 2));
console.log(JSON.stringify({ generated: entries.length, rejected: invalid.length }));
