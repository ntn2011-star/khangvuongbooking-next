import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const parseCsvLine = (line) => {
  const cells = [];
  let cell = '';
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"') {
      if (quoted && line[index + 1] === '"') { cell += '"'; index += 1; } else quoted = !quoted;
    } else if (char === ',' && !quoted) { cells.push(cell); cell = ''; } else cell += char;
  }
  cells.push(cell);
  return cells;
};

const root = process.cwd();
const outputDir = path.join(root, 'reports/gsc-unreviewed-batches');
await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

const raw = await readFile(path.join(root, 'reports/gsc-kvbk-migration-master.csv'), 'utf8');
const lines = raw.trim().split(/\r?\n/);
const headers = parseCsvLine(lines.shift());
const rows = lines.map((line) => Object.fromEntries(headers.map((header, index) => [header, parseCsvLine(line)[index] ?? ''])));
const candidates = rows.filter((row) => row.recommendation_type === 'not_reviewed').sort((a, b) => Number(b.clicks) - Number(a.clicks) || Number(b.impressions) - Number(a.impressions));
const manifest = JSON.parse(await readFile(path.join(root, '.next/prerender-manifest.json'), 'utf8'));
const routes = Object.keys(manifest.routes).filter((route) => route !== '/').sort();
await writeFile(path.join(outputDir, 'valid-routes.json'), JSON.stringify(routes, null, 2));

const batchSize = 12;
const batchFiles = [];
for (let index = 0; index < candidates.length; index += batchSize) {
  const batch = candidates.slice(index, index + batchSize).map((row) => ({
    source_path: row.source_path,
    clicks: Number(row.clicks),
    impressions: Number(row.impressions),
    top_queries: row.top_queries,
    current_target: row.current_target,
  }));
  const file = path.join(outputDir, `batch-${String(index / batchSize + 1).padStart(3, '0')}.json`);
  await writeFile(file, JSON.stringify(batch, null, 2));
  batchFiles.push(file);
}
await writeFile(path.join(outputDir, 'manifest.json'), JSON.stringify({ candidates: candidates.length, batchSize, batchFiles }, null, 2));
console.log(JSON.stringify({ candidates: candidates.length, batches: batchFiles.length, manifest: path.join(outputDir, 'manifest.json') }));
