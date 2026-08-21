import { describe, expect, it } from 'vitest';
import { legacyRedirects } from '../app/legacy-redirects';
import { legacyPages, navigation, pages } from '../app/content';

describe('Khang Vuong Booking SEO migration', () => {
  it('giữ bảng 301 đầy đủ từ kho URL lịch sử Wayback', () => {
    expect(Object.keys(legacyRedirects)).toHaveLength(4176);
    expect(legacyRedirects['1-000-000-co-hoi-bay-mien-phi-tu-vietjet-air-ket-noi-yeu-thuong']).toBe('/cam-nang-bay');
    expect(legacyRedirects['mua-them-hanh-ly-vietnam-airlines']).toBe('/mua-them-hanh-ly-vietnam-airlines');
  });

  it('có đủ các danh mục công khai chính và trang SEO lịch sử ưu tiên', () => {
    expect(navigation.map(([slug]) => slug)).toEqual(expect.arrayContaining(['ve-may-bay-trong-nuoc', 've-may-bay-quoc-te', 'hang-bay', 'dich-vu-theo-hang', 'ho-chieu', 'visa']));
    expect(Object.keys(pages).length).toBeGreaterThan(150);
    expect(pages['doi-ngay-ve-vietnam-airlines']).toBeDefined();
    expect(pages['mua-them-hanh-ly-eva-air']).toBeDefined();
    expect(pages['ve-may-bay-tu-nhat-ban-ve-ha-noi']).toBeDefined();
    expect(pages['ve-may-bay-di-da-nang']).toBeDefined();
    expect(pages['diem-den']).toBeDefined();
    expect(pages['diem-den-chau-my']).toBeDefined();
    expect(pages['ve-may-bay-di-san-francisco']).toBeDefined();
    expect(pages['dai-ly-phong-ve-hang']).toBeDefined();
    expect(pages['dai-ly-phong-ve-eva-air']).toBeDefined();
    expect(legacyPages['san-bay-quoc-te-tan-son-nhat-thanh-pho-ho-chi-minh-sgn']).toBeDefined();
    expect(legacyPages['doi-ve-may-bay-eva-air']).toBeUndefined();
    expect(legacyRedirects['doi-ve-may-bay-eva-air']).toBe('/doi-ngay-ve-eva-air');
  });
});
