import { describe, expect, it } from 'vitest';
import { buildDefaultLandingFaqs } from '../app/LandingSeoGuide';

describe('nội dung SEO dùng chung theo landing', () => {
  it('tạo FAQ thủ tục an toàn khi landing chưa có FAQ riêng', () => {
    const faqs = buildDefaultLandingFaqs({ slug: 'demo', eyebrow: 'Demo', title: 'Đổi vé Demo', description: 'Demo', intro: 'Demo', checklist: [] });
    expect(faqs).toHaveLength(3);
    expect(faqs[0].question).toContain('Đổi vé Demo');
  });
});
