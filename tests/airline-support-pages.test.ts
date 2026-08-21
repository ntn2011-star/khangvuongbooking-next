import { describe, expect, it } from 'vitest';
import { getAirlineFooterBackground, getLandingTheme, pages } from '../app/content';

describe('EVA Air support landing template', () => {
  it('exposes official contact and office pages with citations and FAQs', () => {
    const hotline = pages['so-dien-thoai-tong-dai-eva-air'];
    const office = pages['dia-chi-van-phong-eva-air'];
    expect(hotline?.sourceReferences?.every((source) => source.url.includes('evaair.com'))).toBe(true);
    expect(office?.sourceReferences).toHaveLength(2);
    expect(hotline?.faqs).toHaveLength(2);
    expect(office?.related?.some((item) => item.slug === 'so-dien-thoai-tong-dai-eva-air')).toBe(true);
  });

  it('keeps EVA footer tokens separate from the default Khang Vuong Booking theme', () => {
    expect(getLandingTheme('hang-bay-eva-air').primary).toBe('#0b705f');
    expect(getAirlineFooterBackground('eva-air')).toContain('eva-air-footer-airport-hub');
    expect(getAirlineFooterBackground('vietjet-air')).toBeUndefined();
  });
});
