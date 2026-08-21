import { describe, expect, it } from 'vitest';
import { airlines, getAirlineServiceSlug, pages } from '../app/content';
import { buildLandingJsonLd } from '../app/[slug]/page';

describe('FAQ schema cho tổng đài hãng lớn', () => {
  it('đặt FAQ trên tất cả landing tổng đài của nhóm hãng ưu tiên', () => {
    for (const airline of airlines.filter((item) => item.priority)) {
      const page = pages[getAirlineServiceSlug('tong-dai-hang-bay', airline.slug)];
      expect(page?.faqs?.length).toBeGreaterThanOrEqual(2);
      const graph = buildLandingJsonLd(page!, false)['@graph'];
      expect(graph.some((node) => node['@type'] === 'FAQPage')).toBe(true);
    }
  });
});
