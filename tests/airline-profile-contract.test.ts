import { describe, expect, it } from 'vitest';
import { airlineCabinBoards } from '../app/airline-cabin-assets';
import { getAirlineProfile, getAirlineProfileSources } from '../app/airline-profiles';
import { airlines, pages } from '../app/content';
import { getLandingFaqs } from '../app/LandingSeoGuide';

describe('airline profile content contract', () => {
  it('có hồ sơ và nguồn công khai cho đầy đủ 66 hãng', () => {
    expect(Object.keys(airlineCabinBoards)).toHaveLength(airlines.length);
    for (const airline of airlines) {
      const profile = getAirlineProfile(airline.slug);
      expect(profile?.airlineName).toBe(airline.name);
      expect(profile?.sourceUrls.length).toBeGreaterThan(0);
      expect(getAirlineProfileSources(airline.slug)).toHaveLength(profile?.sourceUrls.length ?? 0);
    }
  });

  it('có FAQ hồ sơ theo từng hub hãng thay vì chỉ dùng FAQ thủ tục chung', () => {
    for (const airline of airlines) {
      const hub = pages[`hang-bay-${airline.slug}`];
      expect(hub).toBeDefined();
      expect(getLandingFaqs(hub).length).toBeGreaterThanOrEqual(5);
    }
  });

  it('không tạo route Tổng đài và Văn phòng cho United Airlines', () => {
    expect(pages['so-dien-thoai-tong-dai-united-airlines']).toBeUndefined();
    expect(pages['dia-chi-van-phong-united-airlines']).toBeUndefined();
    expect(pages['hang-bay-united-airlines'].related?.map((item) => item.slug)).not.toContain('so-dien-thoai-tong-dai-united-airlines');
    expect(pages['hang-bay-united-airlines'].related?.map((item) => item.slug)).not.toContain('dia-chi-van-phong-united-airlines');
  });
});
