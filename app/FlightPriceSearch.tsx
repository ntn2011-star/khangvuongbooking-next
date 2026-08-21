'use client';

import { FormEvent, useMemo, useState } from 'react';
import { airportDisplay, airportOptions, airportRegions, type AirportRegion } from './airport-picker-data';
import './airport-picker.css';

type TripType = 'round-trip' | 'one-way';

export type FlightPriceSearchPayload = {
  origin: string;
  destination: string;
  departDate: string;
  returnDate: string | null;
  passengers: string;
  cabin: string;
  tripType: TripType;
  contextUrl: string;
};

type FlightOffer = {
  id: string;
  price: string;
  rawPrice: number | null;
  carrier: string;
  flightCode: string | null;
  durationMinutes: number | null;
  stopCount: number | null;
};

type AirportPickerKind = 'origin' | 'arrival';

function AirportPicker({ kind, label, value, placeholder, open, onOpenChange, onSelect }: { kind: AirportPickerKind; label: string; value: string; placeholder: string; open: boolean; onOpenChange: (next: boolean) => void; onSelect: (next: string) => void }) {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState<AirportRegion | 'Tất cả'>('Tất cả');
  const normalizedQuery = query.trim().toLocaleLowerCase('vi-VN');
  const choices = airportOptions.filter((airport) => {
    const matchesRegion = region === 'Tất cả' || airport.region === region;
    const haystack = `${airport.code} ${airport.city} ${airport.country}`.toLocaleLowerCase('vi-VN');
    return matchesRegion && (!normalizedQuery || haystack.includes(normalizedQuery));
  });

  return <div className={`airport-picker-field airport-picker-field--${kind}`}>
    <span>{label}</span>
    <button type="button" className="airport-picker-trigger" aria-haspopup="dialog" aria-expanded={open} onClick={() => onOpenChange(!open)}>{value || placeholder}<b aria-hidden="true">⌄</b></button>
    {open && <section className="airport-picker-popover" role="dialog" aria-label={`Chọn ${label.toLocaleLowerCase('vi-VN')}`}>
      <div className="airport-picker-search"><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm tên thành phố, quốc gia hoặc IATA" aria-label={`Tìm ${label.toLocaleLowerCase('vi-VN')}`} /><button type="button" onClick={() => onOpenChange(false)} aria-label="Đóng danh sách sân bay">×</button></div>
      <div className="airport-picker-regions" role="tablist" aria-label="Lọc vùng sân bay"><button type="button" role="tab" aria-selected={region === 'Tất cả'} className={region === 'Tất cả' ? 'is-active' : ''} onClick={() => setRegion('Tất cả')}>Tất cả</button>{airportRegions.map((item) => <button key={item} type="button" role="tab" aria-selected={region === item} className={region === item ? 'is-active' : ''} onClick={() => setRegion(item)}>{item}</button>)}</div>
      <div className="airport-picker-grid" role="listbox" aria-label={`Danh sách sân bay cho ${label}`}>{choices.length ? choices.map((airport) => <button key={airport.code} type="button" role="option" aria-selected={value === airportDisplay(airport)} onClick={() => { onSelect(airportDisplay(airport)); onOpenChange(false); }}><b>{airport.code}</b><span>{airport.city}<small>{airport.country}</small></span></button>) : <p>Chưa thấy trong danh mục. Hãy thử mã IATA, tên thành phố hoặc chọn vùng khác.</p>}</div>
      <small>Danh mục hiển thị sân bay Việt Nam và các cửa ngõ quốc tế phổ biến. Bạn có thể tìm theo mã IATA để lọc nhanh.</small>
    </section>}
  </div>;
}

export function FlightPriceSearch({ destination }: { destination: string }) {
  const [tripType, setTripType] = useState<TripType>('round-trip');
  const [origin, setOrigin] = useState('TP. Hồ Chí Minh (SGN)');
  const [arrival, setArrival] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState('1 người lớn');
  const [cabin, setCabin] = useState('Phổ thông');
  const [message, setMessage] = useState('');
  const [offers, setOffers] = useState<FlightOffer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [carrierFilter, setCarrierFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [stopsFilter, setStopsFilter] = useState('all');
  const [openPicker, setOpenPicker] = useState<AirportPickerKind | null>(null);

  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const carriers = useMemo(() => [...new Set(offers.map((offer) => offer.carrier))].sort(), [offers]);
  const filteredOffers = useMemo(() => offers.filter((offer) => {
    const maxPrice = priceFilter === 'all' ? null : Number(priceFilter);
    const matchesCarrier = carrierFilter === 'all' || offer.carrier === carrierFilter;
    const matchesPrice = maxPrice === null || (offer.rawPrice !== null && offer.rawPrice <= maxPrice);
    const matchesStops = stopsFilter === 'all' || String(offer.stopCount ?? 0) === stopsFilter;
    return matchesCarrier && matchesPrice && matchesStops;
  }), [offers, carrierFilter, priceFilter, stopsFilter]);

  async function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const resolvedDestination = arrival.trim() || destination;
    if (!resolvedDestination) {
      setMessage('Hãy chọn điểm đến bằng mã IATA hoặc tên thành phố trước khi tìm giá.');
      return;
    }
    const payload: FlightPriceSearchPayload = {
      origin,
      destination: resolvedDestination,
      departDate,
      returnDate: tripType === 'round-trip' ? returnDate || null : null,
      passengers,
      cabin,
      tripType,
      contextUrl: window.location.href,
    };

    window.dispatchEvent(new CustomEvent('kvbk:flight-price-search', { detail: payload }));
    setIsLoading(true);
    setOffers([]);
    setCarrierFilter('all');
    setPriceFilter('all');
    setStopsFilter('all');
    setMessage('Đang tìm giá vé theo ngày bay bạn chọn…');
    try {
      const response = await fetch('/api/flight-search', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await response.json() as { ok?: boolean; error?: string; offers?: FlightOffer[]; cached?: boolean };
      if (!response.ok || !result.ok) throw new Error(result.error ?? 'Không thể tìm giá vé lúc này.');
      setOffers(result.offers ?? []);
      setMessage(result.offers?.length ? `${result.offers.length} lựa chọn được trả từ API Sky Scrapper${result.cached ? ' (từ bộ nhớ đệm 5 phút)' : ''}.` : 'Chưa có chuyến phù hợp trong dữ liệu API cho ngày bạn chọn.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Không thể tìm giá vé lúc này.');
    } finally {
      setIsLoading(false);
    }
  }

  return <section className="flight-price-search" aria-label={`Tìm giá vé máy bay đi ${destination}`}>
    <div className="flight-price-search-heading">
      <span>Bộ tìm giá vé</span>
      <strong>Tìm giá đi {destination}</strong>
    </div>
    <form onSubmit={submitSearch}>
      <fieldset className="flight-price-trip-type">
        <legend>Loại hành trình</legend>
        <button type="button" className={tripType === 'round-trip' ? 'is-selected' : ''} onClick={() => setTripType('round-trip')} aria-pressed={tripType === 'round-trip'}>Khứ hồi</button>
        <button type="button" className={tripType === 'one-way' ? 'is-selected' : ''} onClick={() => setTripType('one-way')} aria-pressed={tripType === 'one-way'}>Một chiều</button>
      </fieldset>
      <AirportPicker kind="origin" label="Điểm đi" value={origin} placeholder="Chọn sân bay" open={openPicker === 'origin'} onOpenChange={(next) => setOpenPicker(next ? 'origin' : null)} onSelect={setOrigin} />
      <AirportPicker kind="arrival" label="Điểm đến" value={arrival} placeholder={destination || 'Chọn sân bay hoặc thành phố'} open={openPicker === 'arrival'} onOpenChange={(next) => setOpenPicker(next ? 'arrival' : null)} onSelect={setArrival} />
      <label><span>Ngày đi</span><input type="date" min={minDate} value={departDate} onChange={(event) => setDepartDate(event.target.value)} required /></label>
      <label><span>Ngày về</span><input type="date" min={departDate || minDate} value={returnDate} onChange={(event) => setReturnDate(event.target.value)} disabled={tripType === 'one-way'} required={tripType === 'round-trip'} /></label>
      <label><span>Hành khách</span><select value={passengers} onChange={(event) => setPassengers(event.target.value)}><option>1 người lớn</option><option>2 người lớn</option><option>2 người lớn, 1 trẻ em</option><option>Gia đình 4 người</option></select></label>
      <label><span>Hạng ghế</span><select value={cabin} onChange={(event) => setCabin(event.target.value)}><option>Phổ thông</option><option>Phổ thông đặc biệt</option><option>Thương gia</option></select></label>
      <button className="flight-price-search-submit" type="submit" disabled={isLoading}>{isLoading ? 'Đang tìm…' : <>Tìm giá vé <span aria-hidden="true">→</span></>}</button>
    </form>
    <small>Giá được tìm theo ngày bay thực tế từ API. Công cụ không lưu số điện thoại hoặc thông tin liên hệ.</small>
    {message && <p role="status">{message}</p>}
    {offers.length > 0 && <><section className="flight-price-filters" aria-label="Bộ lọc kết quả chuyến bay"><label>Hãng bay<select value={carrierFilter} onChange={(event) => setCarrierFilter(event.target.value)}><option value="all">Tất cả hãng</option>{carriers.map((carrier) => <option key={carrier} value={carrier}>{carrier}</option>)}</select></label><label>Giá tối đa<select value={priceFilter} onChange={(event) => setPriceFilter(event.target.value)}><option value="all">Mọi mức giá</option><option value="2000000">Tối đa 2 triệu</option><option value="5000000">Tối đa 5 triệu</option><option value="10000000">Tối đa 10 triệu</option><option value="20000000">Tối đa 20 triệu</option></select></label><label>Điểm dừng<select value={stopsFilter} onChange={(event) => setStopsFilter(event.target.value)}><option value="all">Tất cả hành trình</option><option value="0">Bay thẳng</option><option value="1">1 điểm dừng</option><option value="2">Từ 2 điểm dừng</option></select></label></section><section className="flight-price-search-results" aria-label="Kết quả giá vé từ API">{filteredOffers.length > 0 ? filteredOffers.map((offer) => <article key={offer.id}><strong>{offer.price}</strong><span>{offer.carrier}</span><small>{offer.flightCode ? `Mã chuyến bay: ${offer.flightCode}` : 'API chưa trả mã chuyến bay'} · {offer.stopCount === 0 ? 'Bay thẳng' : `${offer.stopCount ?? 0} điểm dừng`} · {offer.durationMinutes ? `${Math.floor(offer.durationMinutes / 60)} giờ ${offer.durationMinutes % 60} phút` : 'Thời lượng đang cập nhật'}</small></article>) : <p className="flight-price-no-match">Chưa có lựa chọn phù hợp với bộ lọc này.</p>}</section></>}
  </section>;
}
