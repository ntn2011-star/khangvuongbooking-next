import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const parseCsv = (content) => {
  const records = [];
  let cells = [];
  let current = '';
  let quoted = false;
  for (let index = 0; index < content.length; index += 1) {
    const char = content[index];
    if (char === '"') {
      if (quoted && content[index + 1] === '"') {
        current += '"';
        index += 1;
      } else quoted = !quoted;
    } else if (char === ',' && !quoted) {
      cells.push(current);
      current = '';
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && content[index + 1] === '\n') index += 1;
      cells.push(current);
      if (cells.some((cell) => cell.length > 0)) records.push(cells);
      cells = [];
      current = '';
    } else current += char;
  }
  cells.push(current);
  if (cells.some((cell) => cell.length > 0)) records.push(cells);
  return records;
};
const recommendationDirectory = path.join(root, 'reports/gsc-intent-recommendations');
const recommendationFiles = (await readdir(recommendationDirectory)).filter((file) => file.endsWith('.csv')).sort();
const recommendations = new Map();
for (const file of recommendationFiles) {
  const [headerCells, ...records] = parseCsv(await readFile(path.join(recommendationDirectory, file), 'utf8'));
  const headers = headerCells.map((header) => header.replace(/^\uFEFF/, ''));
  for (const cells of records) {
    const row = Object.fromEntries(headers.map((header, index) => [header, cells[index] || '']));
    const key = row.source_url || row.source_path;
    if (key) recommendations.set(key, row);
  }
}
const audit = JSON.parse(await readFile(path.join(root, 'reports/gsc-kvbk-mapping-audit.json'), 'utf8'));
const rows = audit.rows.map((row) => ({
  ...row,
  ...(recommendations.get(row.sourceUrl) || recommendations.get(row.sourcePath) || {}),
}));
rows.sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions || a.position - b.position);
const counts = rows.reduce((total, row) => {
  const category = row.recommendation_type || 'not_reviewed';
  total[category] = (total[category] || 0) + 1;
  return total;
}, {});
const escape = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
const columns = ['source_url', 'source_path', 'clicks', 'impressions', 'ctr', 'position', 'top_queries', 'current_target', 'http_status', 'runtime_target', 'recommendation_type', 'recommended_target_or_slug', 'rationale'];
const csv = [columns.join(',')];
for (const row of rows) {
  csv.push([
    row.sourceUrl, row.sourcePath, row.clicks, row.impressions, row.ctr, row.position, row.topQueries,
    row.mappedTarget, row.httpStatus, row.runtimeTarget, row.recommendation_type || 'not_reviewed',
    row.recommended_target_or_slug || '', row.rationale || '',
  ].map(escape).join(','));
}
await writeFile(path.join(root, 'reports/gsc-kvbk-migration-master.csv'), `${csv.join('\n')}\n`);
await writeFile(path.join(root, 'reports/gsc-kvbk-migration-summary.json'), JSON.stringify({ generatedAt: new Date().toISOString(), total: rows.length, recommendations: counts }, null, 2));
console.log(JSON.stringify({ total: rows.length, recommendations: counts }));
