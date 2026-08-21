import { describe, expect, it } from 'vitest';

describe('Sky Scrapper RapidAPI credential', () => {
  const runExternalHealthCheck = process.env.RUN_EXTERNAL_RAPIDAPI_TESTS === '1';

  it.skipIf(!runExternalHealthCheck)('xác thực RAPIDAPI_KEY bằng endpoint tìm sân bay nhẹ', async () => {
    const key = process.env.RAPIDAPI_KEY;
    expect(key).toBeTruthy();

    const response = await fetch('https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=Ho%20Chi%20Minh&locale=en-US', {
      headers: {
        'X-RapidAPI-Key': key as string,
        'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com',
      },
      signal: AbortSignal.timeout(20_000),
    });

    expect(response.ok).toBe(true);
    const payload = await response.json() as { status?: boolean; data?: unknown[] };
    expect(payload.status).toBe(true);
    expect(Array.isArray(payload.data)).toBe(true);
    expect(payload.data?.length).toBeGreaterThan(0);
  }, 25_000);
});
