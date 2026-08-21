import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const outputDirectory = path.join(root, 'reports/gsc-intent-recommendations');
const resultFiles = [
  '/home/ubuntu/review_kvbk_gsc_mapping_batches.json',
  '/home/ubuntu/review_remaining_gsc_url_intents.json',
  '/home/ubuntu/review_missing_gsc_batch.json',
];

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

let downloaded = 0;
for (const resultFile of resultFiles) {
  const review = JSON.parse(await readFile(resultFile, 'utf8'));
  for (const result of review.results) {
    const sourceUrl = result.output?.mapping_file || result.output?.recommendation_file;
    if (!sourceUrl) continue;
    const response = await fetch(sourceUrl);
    if (!response.ok) throw new Error(`Không tải được ${result.input}: HTTP ${response.status}.`);
    const prefix = resultFile.includes('review_kvbk_gsc_mapping_batches') ? 'prior-' : '';
    const sourceName = path.basename(result.input).replace(/\.(json|csv)$/i, '');
    await writeFile(path.join(outputDirectory, `${prefix}${sourceName}-mapping.csv`), await response.text());
    downloaded += 1;
  }
}
console.log(JSON.stringify({ downloaded, outputDirectory }));
