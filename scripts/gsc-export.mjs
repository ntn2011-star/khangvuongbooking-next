import { createSign } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const serviceAccountRaw = process.env.GOOGLE_SEARCH_CONSOLE_SERVICE_ACCOUNT_JSON;
const configuredSite = process.env.GSC_SITE_URL || process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL;

if (!serviceAccountRaw || !configuredSite) {
  throw new Error('Google Search Console credentials or configured site URL are unavailable.');
}

const serviceAccount = JSON.parse(serviceAccountRaw);
const base64url = (value) => Buffer.from(typeof value === 'string' ? value : JSON.stringify(value)).toString('base64url');
const now = Math.floor(Date.now() / 1000);
const assertionHeader = base64url({ alg: 'RS256', typ: 'JWT' });
const assertionPayload = base64url({
  iss: serviceAccount.client_email,
  scope: 'https://www.googleapis.com/auth/webmasters.readonly',
  aud: 'https://oauth2.googleapis.com/token',
  iat: now,
  exp: now + 3600,
});
const signer = createSign('RSA-SHA256');
signer.update(`${assertionHeader}.${assertionPayload}`);
const assertion = `${assertionHeader}.${assertionPayload}.${signer.sign(serviceAccount.private_key).toString('base64url')}`;

const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion }),
});

if (!tokenResponse.ok) {
  throw new Error(`Google OAuth token request failed with HTTP ${tokenResponse.status}.`);
}

const { access_token: accessToken } = await tokenResponse.json();
const api = async (url, options = {}) => {
  const response = await fetch(`https://searchconsole.googleapis.com${url}`, {
    ...options,
    headers: { authorization: `Bearer ${accessToken}`, 'content-type': 'application/json', ...(options.headers || {}) },
  });
  if (!response.ok) throw new Error(`Search Console API request failed with HTTP ${response.status} at ${url}.`);
  return response.json();
};

const sites = await api('/webmasters/v3/sites');
const availableSites = new Set((sites.siteEntry || []).map((site) => site.siteUrl));
if (!availableSites.has(configuredSite)) {
  throw new Error('The configured Search Console property is not accessible to this service account.');
}

const today = new Date();
const start = new Date(today);
start.setDate(start.getDate() - 450);
const formatDate = (date) => date.toISOString().slice(0, 10);
const startDate = formatDate(start);
const endDate = formatDate(today);
const sitePath = encodeURIComponent(configuredSite);
const queryAnalytics = (dimensions, rowLimit = 25000) => api(`/webmasters/v3/sites/${sitePath}/searchAnalytics/query`, {
  method: 'POST',
  body: JSON.stringify({ startDate, endDate, dimensions, rowLimit, type: 'web', dataState: 'final' }),
});

const [pages, pageQueries, sitemaps] = await Promise.all([
  queryAnalytics(['page']),
  queryAnalytics(['page', 'query']),
  api(`/webmasters/v3/sites/${sitePath}/sitemaps`),
]);

const output = {
  generatedAt: new Date().toISOString(),
  property: configuredSite,
  dateRange: { startDate, endDate },
  pageRows: pages.rows || [],
  pageQueryRows: pageQueries.rows || [],
  sitemaps: sitemaps.sitemap || [],
};
const reportDirectory = path.resolve('reports');
await mkdir(reportDirectory, { recursive: true });
await writeFile(path.join(reportDirectory, 'gsc-seo-url-performance.json'), JSON.stringify(output, null, 2));
const csvEscape = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
const csv = ['url,clicks,impressions,ctr,position'];
for (const row of output.pageRows) csv.push([row.keys?.[0], row.clicks, row.impressions, row.ctr, row.position].map(csvEscape).join(','));
await writeFile(path.join(reportDirectory, 'gsc-seo-url-performance.csv'), `${csv.join('\n')}\n`);
console.log(JSON.stringify({ startDate, endDate, pageRows: output.pageRows.length, pageQueryRows: output.pageQueryRows.length, sitemapCount: output.sitemaps.length }));
