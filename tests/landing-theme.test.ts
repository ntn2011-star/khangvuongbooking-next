import { describe, expect, it } from 'vitest';
import { airlines, brandTheme, getAirlineServiceSlug, getAvailableAirlineServices, getLandingTheme, pages } from '../app/content';

describe('landing themes', () => {
  it('giữ đỏ-xanh làm theme mặc định của Khang Vuong Booking', () => {
    expect(brandTheme).toMatchObject({ primary: '#0b3764', accent: '#df1f2d' });
    expect(getLandingTheme('khuyen-mai')).toEqual(brandTheme);
  });

  it('phân giải theme theo hãng bay cho hub và dịch vụ chuyên biệt', () => {
    expect(getLandingTheme('hang-bay-eva-air')).toMatchObject({ primary: '#0b705f', accent: '#f0b11e' });
    expect(getLandingTheme('mua-them-hanh-ly-vietjet-air')).toMatchObject({ primary: '#be1d2d', accent: '#f4c126' });
  });

  it('phân giải theme theo nước đến cho landing quốc gia và thành phố', () => {
    expect(getLandingTheme('ve-may-bay-di-my')).toMatchObject({ primary: '#1e3a6d', accent: '#b22234' });
    expect(getLandingTheme('ve-may-bay-di-tokyo')).toMatchObject({ primary: '#ffffff', accent: '#c91f37' });
  });

  it('có đầy đủ landing dịch vụ cho từng hãng và dùng theme nhận diện của hãng đó', () => {
    for (const airline of airlines) {
      for (const service of getAvailableAirlineServices(airline.slug)) {
        const slug = getAirlineServiceSlug(service.slug, airline.slug);
        expect(pages[slug], `Missing ${slug}`).toBeDefined();
        expect(getLandingTheme(slug)).not.toEqual(brandTheme);
      }
    }
  });
});
