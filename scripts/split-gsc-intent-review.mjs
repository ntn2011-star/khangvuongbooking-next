import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const priority = JSON.parse(await readFile(path.join(root, 'reports/gsc-kvbk-mapping-priority.json'), 'utf8'));
const candidates = priority.intentReviewCandidates || [];
const batchCount = 5;
const batchSize = Math.ceil(candidates.length / batchCount);
const batches = Array.from({ length: batchCount }, (_, index) => candidates.slice(index * batchSize, (index + 1) * batchSize));
const loads = batches.map((batch) => batch.reduce((total, row) => total + (row.priorityScore || 0), 0));
const outputDirectory = path.join(root, 'reports/gsc-intent-review-batches');
await mkdir(outputDirectory, { recursive: true });
const escape = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
const fields = ['source_url', 'source_path', 'clicks', 'impressions', 'position', 'mapped_target', 'mapping_status', 'top_queries', 'priority_score'];
for (let index = 0; index < batches.length; index += 1) {
  const csv = [fields.join(',')];
  for (const row of batches[index]) {
    csv.push([row.sourceUrl, row.sourcePath, row.clicks, row.impressions, row.position, row.mappedTarget, row.mappingStatus, row.topQueries, row.priorityScore].map(escape).join(','));
  }
  await writeFile(path.join(outputDirectory, `batch-${index + 1}.csv`), `${csv.join('\n')}\n`);
}
console.log(JSON.stringify({ totalCandidates: candidates.length, batchRows: batches.map((batch) => batch.length), batchPriority: loads.map((load) => Math.round(load)) }));
