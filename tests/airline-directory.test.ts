import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { airlines, brandPositioning, getAirlineServiceSlug, getAvailableAirlineServices, pages } from '../app/content';
import { airlineFacts } from '../app/airline-facts';
import { airlineCodes } from '../app/airline-codes';

const directoryComponent = readFileSync(new URL('../app/AirlineDirectory.tsx', import.meta.url), 'utf8');
const directoryStyles = readFileSync(new URL('../app/AirlineDirectory.module.css', import.meta.url), 'utf8');

describe('airline directory expansion', () => {
  it('duy trì đúng 66 hãng trong danh mục và ưu tiên một nhóm hãng mạnh', () => {
    expect(airlines).toHaveLength(66);
    expect(brandPositioning).toMatchObject({ establishedYear: 2008, yearsOfService: 18, airlineCount: 66 });
    expect(airlines.filter((airline) => airline.priority).length).toBeGreaterThanOrEqual(10);
    expect(new Set(airlines.map((airline) => airline.slug)).size).toBe(66);
  });

  it('sinh đủ landing dịch vụ khả dụng cho từng hãng mới và cũ', () => {
    for (const airline of airlines) {
      expect(pages[`hang-bay-${airline.slug}`]).toBeDefined();
      for (const service of getAvailableAirlineServices(airline.slug)) expect(pages[getAirlineServiceSlug(service.slug, airline.slug)]).toBeDefined();
    }
  });

  it('dùng URL tổng đài và văn phòng độc lập cho mọi hãng, trừ ngoại lệ United Airlines', () => {
    for (const airline of airlines.filter((item) => item.slug !== 'united-airlines')) {
      expect(pages[`so-dien-thoai-tong-dai-${airline.slug}`]).toBeDefined();
      expect(pages[`dia-chi-van-phong-${airline.slug}`]).toBeDefined();
    }
    expect(pages['so-dien-thoai-tong-dai-united-airlines']).toBeUndefined();
    expect(pages['dia-chi-van-phong-united-airlines']).toBeUndefined();
  });

  it('cung cấp card nhận diện với điểm vào nhanh và CTA dịch vụ theo hãng', () => {
    expect(directoryComponent).toContain('featuredProfiles');
    expect(directoryComponent).toContain('Đường bay chủ lực');
    expect(directoryComponent).toContain('routes: []');
    expect(directoryComponent).toContain('Nâng hạng');
    expect(directoryComponent).toContain("getLandingTheme(`hang-bay-${airline.slug}`)");
    expect(directoryComponent).toContain("'--card-primary'");
    expect(directoryComponent).toContain("loading={faded || priority ? 'eager' : 'lazy'}");
    expect(directoryStyles).toContain('content-visibility: auto');
  });

  it('có lịch sử và liên minh đã khai báo cho toàn bộ hãng phục vụ bộ lọc', () => {
    expect(Object.keys(airlineFacts)).toHaveLength(66);
    expect(airlineFacts['eva-air']).toMatchObject({ founded: '1989', alliance: 'Star Alliance' });
    expect(airlineFacts['vietnam-airlines']).toMatchObject({ alliance: 'SkyTeam' });
    expect(airlineFacts['japan-airlines']).toMatchObject({ alliance: 'Oneworld' });
    expect(directoryComponent).toContain('Liên minh hàng không');
    expect(directoryComponent).toContain('allianceFilters');
  });

  it('tìm được hãng theo tên, mã IATA và ICAO đã xác minh', () => {
    expect(Object.keys(airlineCodes)).toHaveLength(66);
    expect(airlineCodes['vietnam-airlines']).toEqual({ iata: 'VN', icao: 'HVN' });
    expect(airlineCodes['eva-air']).toEqual({ iata: 'BR', icao: 'EVA' });
    expect(directoryComponent).toContain('airlineCodes');
    expect(directoryComponent).toContain('mã IATA hoặc ICAO');
  });
});
