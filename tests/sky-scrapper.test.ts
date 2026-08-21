import { describe, expect, it } from 'vitest';
import { normalizeFlightOffers, parseAdultCount, toCabinClass } from '../app/sky-scrapper';

describe('chuẩn hóa dữ liệu Sky Scrapper', () => {
  it('chuyển hành khách và hạng ghế sang tham số API ổn định', () => {
    expect(parseAdultCount('2 người lớn, 1 trẻ em')).toBe(2);
    expect(parseAdultCount('Gia đình 4 người')).toBe(1);
    expect(toCabinClass('Thương gia')).toBe('business');
    expect(toCabinClass('Phổ thông đặc biệt')).toBe('premium_economy');
  });

  it('giữ mã chuyến bay IATA khi API trả segment', () => {
    const offers = normalizeFlightOffers([{ id: 'offer-1', price: { raw: 2500000, formatted: '2.500.000 ₫' }, legs: [{ durationInMinutes: 180, stopCount: 0, segments: [{ flightNumber: '310', marketingCarrier: { alternateId: 'VN', name: 'Vietnam Airlines' } }] }] }]);
    expect(offers[0]).toMatchObject({ price: '2.500.000 ₫', carrier: 'Vietnam Airlines', flightCode: 'VN310', stopCount: 0 });
  });

  it('không trả giá giả khi API không có raw price', () => {
    const offers = normalizeFlightOffers([{ legs: [{ carriers: { marketing: [{ name: 'Test Air' }] } }] }]);
    expect(offers[0]).toMatchObject({ price: 'Kiểm tra theo API', rawPrice: null, flightCode: null });
  });
});
