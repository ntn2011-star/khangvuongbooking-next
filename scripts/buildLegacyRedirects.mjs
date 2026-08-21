import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const sourcePath = '/home/ubuntu/baydimy/docs/wayback-khangvuongbooking-url-inventory.csv';
const outputPath = resolve(import.meta.dirname, '..', 'app', 'legacy-redirects.ts');
const auditPath = resolve(import.meta.dirname, '..', 'legacy-redirect-map.csv');

function parseCsvLine(line) {
  const values = [];
  let value = '';
  let inQuotes = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"') {
      if (inQuotes && line[index + 1] === '"') { value += '"'; index += 1; } else { inQuotes = !inQuotes; }
    } else if (character === ',' && !inQuotes) { values.push(value); value = ''; } else { value += character; }
  }
  values.push(value);
  return values;
}

function normalize(pathname) { return pathname.replace(/^\/+|\/+$/g, '').toLowerCase(); }
const airlineSlugs = ['vietnam-airlines', 'vietjet-air', 'bamboo-airways', 'eva-air', 'china-airlines', 'starlux-airlines', 'china-southern', 'air-china', 'china-eastern', 'korean-air', 'japan-airlines', 'singapore-airlines', 'cathay-pacific', 'qatar-airways', 'turkish-airlines', 'emirates', 'etihad-airways'];
function serviceDestination(service, path) {
  const airline = airlineSlugs.find((slug) => path.includes(slug));
  return `/${airline ? `${service}-${airline}` : service}`;
}
function destination(pathname, pageType) {
  const path = normalize(pathname);
  if (!path) return '/';
  if (path.includes('sua-ten')) return serviceDestination('sua-ten-ve', path);
  if (path.includes('nang-hang')) return serviceDestination('nang-hang-ve', path);
  if (path.includes('xe-lan')) return serviceDestination('xe-lan', path);
  if (path.includes('thu-cung') || path.includes('pet')) return serviceDestination('ve-thu-cung', path);
  if (path.includes('mua-them-hanh-ly') || pageType === 'baggage_service' || path.includes('hanh-ly') || path.includes('baggage')) return serviceDestination('mua-them-hanh-ly', path);
  if (pageType === 'ticket_change_service' || path.includes('doi-ve')) return serviceDestination('doi-ngay-ve', path);
  if (pageType === 'visa_guide' || path.includes('visa')) return '/visa';
  if (path.includes('ho-chieu')) return '/ho-chieu';
  if (pageType === 'airport_guide' || path.includes('san-bay')) return '/cam-nang-bay';
  if (path.includes('khuyen-mai') || path.includes('uu-dai') || path.includes('giam-gia') || path.includes('sale')) return '/khuyen-mai';
  if (pageType === 'flight_landing' || path.includes('ve-may-bay') || path.startsWith('ve/') || path.startsWith('ve-quoc-te/')) return '/ve-may-bay';
  if (pageType === 'airline_content' || path.includes('airlines') || path.includes('hang-bay')) return '/hang-bay';
  return '/cam-nang-bay';
}

const source = await readFile(sourcePath, 'utf8');
const redirects = new Map();
for (const line of source.trim().split('\n').slice(1)) {
  const [, , pathname, , , pageType] = parseCsvLine(line);
  const path = normalize(pathname);
  if (!redirects.has(path)) redirects.set(path, { destination: destination(pathname, pageType), pageType });
}
const rows = [...redirects.entries()].sort(([left], [right]) => left.localeCompare(right));
const table = Object.fromEntries(rows.map(([path, item]) => [path, item.destination]));
await writeFile(outputPath, `/** Bảng 301 được sinh từ ${rows.length} URL Wayback của khangvuongbooking.com. */\nexport const legacyRedirects: Readonly<Record<string, string>> = ${JSON.stringify(table, null, 2)};\n`);
await writeFile(auditPath, ['old_path,destination,page_type', ...rows.map(([path, item]) => `/${path},${item.destination},${item.pageType}`)].join('\n') + '\n');
console.log(`Generated ${rows.length} redirects.`);
