import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

const component = readFileSync(new URL('../app/FlightPriceSearch.tsx', import.meta.url), 'utf8');
const pageTemplate = readFileSync(new URL('../app/[slug]/page.tsx', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');
const heroStyles = readFileSync(new URL('../app/hero-price-search.css', import.meta.url), 'utf8');

describe('thanh tìm giá tại hero landing điểm đến', () => {
  it('chỉ dùng trường tìm giá, không thu thập số điện thoại hoặc gửi email', () => {
    expect(component).toContain('origin');
    expect(component).toContain('destination');
    expect(component).toContain('departDate');
    expect(component).toContain('returnDate');
    expect(component).toContain('passengers');
    expect(component).toContain('cabin');
    expect(component).toContain('tripType');
    expect(component).toContain("placeholder={destination || 'Chọn sân bay hoặc thành phố'}");
    expect(component).toContain('Tìm tên thành phố, quốc gia hoặc IATA');
    expect(component).not.toContain('Số điện thoại');
    expect(component).not.toContain('mailto:');
    expect(component).toContain('fetch(\'/api/flight-search\'');
    expect(component).toContain('AirportPicker');
    expect(component).toContain('airport-picker-grid');
    expect(component).toContain('airportOptions');
    expect(component).toContain('airportRegions');
    expect(component).toContain('carrierFilter');
    expect(component).toContain('flight-price-filters');
    expect(component).toContain('Giá tối đa');
    expect(component).toContain('Điểm dừng');
  });

  it('đặt thanh tìm giá vào vùng hero cho slug điểm đến và hub hãng', () => {
    expect(pageTemplate).toContain("slug.startsWith('ve-may-bay-di-')");
    expect(pageTemplate).toContain('isDestinationLanding || isAirlineHub');
    expect(pageTemplate).toContain('hero-price-search');
    expect(pageTemplate).toContain('hero-price-search--airline');
    expect(pageTemplate).toContain("<FlightPriceSearch destination={isDestinationLanding ? searchDestination : ''} />");
    expect(styles).toContain('.hero-price-search');
    expect(styles).toContain('@media (max-width: 760px)');
    expect(heroStyles).toContain('@media (min-width: 1121px)');
  });
});
