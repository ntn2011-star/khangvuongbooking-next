import { describe, expect, it } from 'vitest';
import sitemap from '../app/sitemap';
import { legacyPages, pages } from '../app/content';
import { airlineArticles } from '../app/airline-articles';
import { gscLegacyPages } from '../app/gsc-legacy-pages';

describe('expanded sitemap', () => {
  it('đưa toàn bộ landing dịch vụ, hãng bay, tuyến bay và URL legacy vào sitemap', () => {
    const entries = sitemap();
    expect(entries).toHaveLength(Object.keys(pages).length + Object.keys(legacyPages).length + Object.keys(gscLegacyPages).length + airlineArticles.length + 3);
    expect(entries.some((entry) => entry.url === 'https://khangvuongbooking.com/doi-ngay-ve-eva-air')).toBe(true);
    expect(entries.some((entry) => entry.url === 'https://khangvuongbooking.com/ve-may-bay-tu-nhat-ban-ve-ha-noi')).toBe(true);
    expect(entries.some((entry) => entry.url === 'https://khangvuongbooking.com/visa')).toBe(true);
    expect(entries.some((entry) => entry.url === 'https://khangvuongbooking.com/ve-may-bay-quoc-te')).toBe(true);
    expect(entries.some((entry) => entry.url === 'https://khangvuongbooking.com/bai-viet/eva-air-hang-ghe-va-cach-chon')).toBe(true);
    expect(entries.some((entry) => entry.url === 'https://khangvuongbooking.com/mua-them-hanh-ly-ana-nippon-airways')).toBe(true);
  });
});
