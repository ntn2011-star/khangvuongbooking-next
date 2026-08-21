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

const escape = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
const root = process.cwd();
const masterPath = path.join(root, 'reports/gsc-kvbk-migration-master.csv');
const [headerCells, ...records] = parseCsv(await readFile(masterPath, 'utf8'));
const headers = headerCells.map((header) => header.replace(/^\uFEFF/, ''));
const invalid = JSON.parse(await readFile(path.join(root, 'reports/gsc-remap-validation.json'), 'utf8')).invalid;
const invalidSources = new Set(invalid.filter((item) => item.reason === 'target_not_built').map((item) => item.source));
let reconciled = 0;
let kept = 0;
const rows = records.map((cells) => {
  const row = Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? '']));
  const source = `/${row.source_path.replace(/^\/+|\/+$/g, '')}`;
  if (row.recommendation_type === 'remap_existing' && invalidSources.has(source)) {
    row.recommendation_type = 'create_specific_landing';
    row.recommended_target_or_slug = source;
    row.rationale = `Giữ nguyên URL vì đích remap chưa tồn tại trong build. ${row.rationale}`.trim();
    reconciled += 1;
  }
  if (row.recommendation_type === 'remap_existing' && row.recommended_target_or_slug === source) {
    row.recommendation_type = 'keep_existing';
    row.rationale = `URL đích trùng URL nguồn và đã có route hợp lệ. ${row.rationale}`.trim();
    kept += 1;
  }
  return row;
});
const csv = [headers.join(','), ...rows.map((row) => headers.map((header) => escape(row[header])).join(','))].join('\n');
await writeFile(masterPath, `${csv}\n`);
console.log(JSON.stringify({ reconciled, kept, remainingInvalid: invalidSources.size - reconciled }));
