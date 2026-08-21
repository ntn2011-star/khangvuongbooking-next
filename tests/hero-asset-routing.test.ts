import { describe, expect, it } from 'vitest';
import { airlines, getHeroAsset, getHeroObjectPosition } from '../app/content';

describe('hero ảnh theo ngữ cảnh landing', () => {
  it('đưa ảnh tương ứng cho các dịch vụ trọng tâm và hero riêng cho mỗi hãng', () => {
    expect(getHeroAsset('doi-ngay-ve-eva-air').url).toContain('kvbk-service-doi-ngay');
    expect(getHeroAsset('nang-hang-ve-vietnam-airlines').url).toContain('kvbk-service-nang-hang');
    expect(getHeroAsset('ve-thu-cung-eva-air').url).toContain('kvbk-service-thu-cung');
    expect(getHeroAsset('hang-bay-eva-air').kind).toBe('airline');
    expect(getHeroAsset('hang-bay-united-airlines').url).toContain('hero-united-airlines-v2');
    expect(getHeroAsset('hang-bay-vietnam-airlines').url).toContain('hero-vietnam-airlines-v2');
    expect(getHeroAsset('hang-bay-singapore-airlines').url).toContain('hero-singapore-airlines-v2');
    expect(getHeroAsset('hang-bay-lufthansa').url).toContain('hero-lufthansa-v2');
    expect(getHeroObjectPosition('hang-bay-asiana-airlines')).toBe('72% center');
    for (const airline of airlines) {
      const hero = getHeroAsset(`hang-bay-${airline.slug}`);
      expect(hero.kind).toBe('airline');
      expect(hero.url, `Missing dedicated hero for ${airline.slug}`).not.toContain('kvbk-airline-hero-style-reference');
    }
  });
});
