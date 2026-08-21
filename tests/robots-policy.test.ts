import { describe, expect, it } from 'vitest';
import robots from '../app/robots';

describe('robots policy', () => {
  it('cho phép crawl nội dung công khai và công bố sitemap Khang Vuong Booking', () => {
    const policy = robots();
    expect(policy.sitemap).toBe('https://khangvuongbooking.com/sitemap.xml');
    expect(policy.rules).toEqual(expect.arrayContaining([expect.objectContaining({ allow: '/', disallow: expect.arrayContaining(['/admin', '/api/']) })]));
  });
});
