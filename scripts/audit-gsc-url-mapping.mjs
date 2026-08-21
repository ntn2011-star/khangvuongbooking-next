import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const gsc = JSON.parse(await readFile(path.join(root, 'reports/gsc-seo-url-performance.json'), 'utf8'));
const legacySource = await readFile(path.join(root, 'app/legacy-redirects.ts'), 'utf8');
const legacyRedirects = new Map([...legacySource.matchAll(/^\s*"([^"]*)":\s*"([^"]*)",?$/gm)].map(([, source, target]) => [source, target]));
const byPage = new Map();
for (const row of gsc.pageQueryRows) {
  const [page, query] = row.keys || [];
  if (!page || !query) continue;
  const bucket = byPage.get(page) || [];
  bucket.push({ query, clicks: row.clicks || 0, impressions: row.impressions || 0, position: row.position || 0 });
  byPage.set(page, bucket);
}

const csvEscape = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
const normalizeKey = (sourceUrl) => {
  const url = new URL(sourceUrl);
  return decodeURIComponent(url.pathname).replace(/^\/+|\/+$/g, '');
};
const checkRoute = async (sourceUrl) => {
  const url = new URL(sourceUrl);
  const response = await fetch(`http://127.0.0.1:3001${url.pathname}${url.search}`, { redirect: 'manual' });
  return { status: response.status, location: response.headers.get('location') || '' };
};
const withConcurrency = async (items, limit, task) => {
  const results = new Array(items.length);
  let cursor = 0;
  await Promise.all(Array.from({ length: limit }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await task(items[index]);
    }
  }));
  return results;
};

const rows = await withConcurrency(gsc.pageRows, 12, async (row) => {
  const sourceUrl = row.keys?.[0];
  const legacyKey = normalizeKey(sourceUrl);
  const mappedTarget = legacyRedirects.get(legacyKey) || '';
  let route = { status: 0, location: '' };
  try {
    route = await checkRoute(sourceUrl);
  } catch {
    route = { status: 0, location: '' };
  }
  const queries = (byPage.get(sourceUrl) || [])
    .sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions)
    .slice(0, 5);
  const mappingStatus = route.status === 301 || route.status === 308
    ? 'redirect_verified'
    : mappedTarget
      ? 'mapping_defined_unverified'
      : route.status >= 200 && route.status < 400
        ? 'route_available'
        : 'needs_mapping_review';
  return {
    sourceUrl,
    sourcePath: `/${legacyKey}`,
    clicks: row.clicks || 0,
    impressions: row.impressions || 0,
    ctr: row.ctr || 0,
    position: row.position || 0,
    mappingDefined: Boolean(mappedTarget),
    mappedTarget,
    httpStatus: route.status,
    runtimeTarget: route.location,
    mappingStatus,
    queryCount: queries.length,
    topQueries: queries.map((item) => item.query).join(' | '),
  };
});

rows.sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions || a.position - b.position);
const summary = rows.reduce((accumulator, row) => {
  accumulator.total += 1;
  accumulator.clicks += row.clicks;
  accumulator.impressions += row.impressions;
  accumulator[row.mappingStatus] = (accumulator[row.mappingStatus] || 0) + 1;
  return accumulator;
}, { total: 0, clicks: 0, impressions: 0 });
const report = { generatedAt: new Date().toISOString(), property: gsc.property, dateRange: gsc.dateRange, summary, rows };
await writeFile(path.join(root, 'reports/gsc-kvbk-mapping-audit.json'), JSON.stringify(report, null, 2));
const columns = ['source_url', 'source_path', 'clicks', 'impressions', 'ctr', 'position', 'mapping_defined', 'mapped_target', 'http_status', 'runtime_target', 'mapping_status', 'query_count', 'top_queries'];
const csv = [columns.join(',')];
for (const row of rows) {
  csv.push([
    row.sourceUrl, row.sourcePath, row.clicks, row.impressions, row.ctr, row.position,
    row.mappingDefined, row.mappedTarget, row.httpStatus, row.runtimeTarget, row.mappingStatus,
    row.queryCount, row.topQueries,
  ].map(csvEscape).join(','));
}
await writeFile(path.join(root, 'reports/gsc-kvbk-mapping-audit.csv'), `${csv.join('\n')}\n`);
console.log(JSON.stringify(summary));
