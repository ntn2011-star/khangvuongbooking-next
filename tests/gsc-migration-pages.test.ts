import { describe, expect, it } from 'vitest';
import { legacyPages } from '../app/content';
import { gscLegacyPages } from '../app/gsc-legacy-pages';

describe('GSC migration legacy pages', () => {
  it('keeps each URL that needs a specific landing as a concrete static page', () => {
    expect(Object.keys(gscLegacyPages)).toHaveLength(1195);
    expect(legacyPages['huong-dan-doi-ngay-bay-cac-hang-hang-khong']).toBeDefined();
    expect(legacyPages['ve-may-bay-ha-noi-di-thanh-dao-son-dong']).toBeDefined();
    expect(legacyPages['so-dien-thoai-tong-dai-china-eastern-airlines']).toBeDefined();
    expect(gscLegacyPages['mua-them-hanh-ly-ana-nippon-airways']).toBeDefined();
    expect(gscLegacyPages['tag/ve-may-bay-eva-air-gia-re']).toBeDefined();
  });

  it('does not replace the preserved legacy URL with a generic redirect target', () => {
    const page = legacyPages['ve-may-bay-ha-noi-di-hang-chau'];
    expect(page.slug).toBe('ve-may-bay-ha-noi-di-hang-chau');
    expect(page.related?.map((item) => item.slug)).toContain('ve-may-bay-quoc-te');
  });

  it('keeps multi-segment GSC paths in the same registry as flat slugs', () => {
    expect(gscLegacyPages['dich-vu-hang-khong/page/4']?.slug).toBe('dich-vu-hang-khong/page/4');
  });
});
