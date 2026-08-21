import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const appDirectory = path.join(root, 'app');
const assetPattern = /\/manus-storage\/([A-Za-z0-9_.-]+)/g;

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(fullPath);
    return /\.(ts|tsx)$/.test(entry.name) ? [fullPath] : [];
  }));
  return nested.flat();
}

const usage = new Map();
for (const file of await sourceFiles(appDirectory)) {
  const relativeFile = path.relative(root, file);
  const content = await readFile(file, 'utf8');
  for (const match of content.matchAll(assetPattern)) {
    const assetPath = `/manus-storage/${match[1]}`;
    const entry = usage.get(assetPath) ?? new Set();
    entry.add(relativeFile);
    usage.set(assetPath, entry);
  }
}

const escape = (value) => `"${String(value).replaceAll('"', '""')}"`;
const rows = [...usage.entries()].sort(([left], [right]) => left.localeCompare(right));
const csv = [
  'asset_path,usage_count,referenced_by,target_origin,status',
  ...rows.map(([assetPath, files]) => [assetPath, files.size, [...files].sort().join(' | '), 'NEXT_PUBLIC_STATIC_ASSET_ORIGIN', 'pending_upload_to_kvbk_project'].map(escape).join(',')),
].join('\n');
await writeFile(path.join(root, 'reports/kvbk-static-asset-manifest.csv'), `${csv}\n`);
await writeFile(path.join(root, 'reports/kvbk-static-asset-manifest-summary.json'), JSON.stringify({ totalAssets: rows.length, targetOrigin: 'NEXT_PUBLIC_STATIC_ASSET_ORIGIN', generatedAt: new Date().toISOString() }, null, 2));
console.log(JSON.stringify({ totalAssets: rows.length, output: 'reports/kvbk-static-asset-manifest.csv' }));
