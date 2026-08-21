import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const audit = JSON.parse(await readFile(path.join(root, 'reports/gsc-kvbk-mapping-audit.json'), 'utf8'));
const genericTargets = new Set(['/', '/ve-may-bay', '/hang-bay', '/cam-nang-bay', '/khuyen-mai', '/dich-vu-theo-hang']);
const enrichedRows = audit.rows.map((row) => {
  const priorityScore = (row.clicks * 1000) + row.impressions + Math.max(0, 35 - row.position) * 10;
  const needsIntentReview = row.mappingStatus === 'needs_mapping_review'
    || (genericTargets.has(row.mappedTarget) && (row.clicks > 0 || row.impressions >= 50));
  return { ...row, priorityScore, needsIntentReview };
}).sort((a, b) => b.priorityScore - a.priorityScore);
const candidates = enrichedRows.filter((row) => row.needsIntentReview);
const report = {
  generatedAt: new Date().toISOString(),
  totalRows: enrichedRows.length,
  intentReviewCount: candidates.length,
  intentReviewCandidates: candidates,
  highPriorityCandidates: candidates.slice(0, 250),
  topMappedPages: enrichedRows.slice(0, 100),
};
await writeFile(path.join(root, 'reports/gsc-kvbk-mapping-priority.json'), JSON.stringify(report, null, 2));
const csvEscape = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
const columns = ['source_url', 'clicks', 'impressions', 'position', 'mapped_target', 'mapping_status', 'top_queries', 'priority_score'];
const csv = [columns.join(',')];
for (const row of candidates) {
  csv.push([row.sourceUrl, row.clicks, row.impressions, row.position, row.mappedTarget, row.mappingStatus, row.topQueries, row.priorityScore].map(csvEscape).join(','));
}
await writeFile(path.join(root, 'reports/gsc-kvbk-mapping-priority.csv'), `${csv.join('\n')}\n`);
console.log(JSON.stringify({ totalRows: enrichedRows.length, intentReviewCount: candidates.length, highPriority: candidates.slice(0, 10).map((row) => ({ sourcePath: row.sourcePath, clicks: row.clicks, impressions: row.impressions, target: row.mappedTarget, status: row.mappingStatus })) }));
