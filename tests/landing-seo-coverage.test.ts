import { describe, expect, it } from 'vitest';
import { legacyPages, pages } from '../app/content';
import { getLandingFaqs } from '../app/LandingSeoGuide';

describe('phủ nội dung SEO trên ma trận landing', () => {
  it('mọi landing có FAQ hiển thị hoặc bộ FAQ thủ tục mặc định', () => {
    const allPages = [...Object.values(pages), ...Object.values(legacyPages)];
    expect(allPages.length).toBeGreaterThan(2500);
    for (const page of allPages) {
      const faqs = getLandingFaqs(page);
      expect(faqs.length).toBeGreaterThanOrEqual(3);
    }
  });
});
