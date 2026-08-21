'use client';

import { FormEvent, useState } from 'react';
import { BOOKING_URL } from './content';

export function QuickBookingForm({ airlineName }: { airlineName: string }) {
  const [tripType, setTripType] = useState<'round-trip' | 'one-way'>('round-trip');
  const [status, setStatus] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const origin = String(formData.get('origin') ?? '').trim().toLocaleLowerCase('vi-VN');
    const destination = String(formData.get('destination') ?? '').trim().toLocaleLowerCase('vi-VN');
    if (origin === destination) {
      setStatus('Điểm đi và điểm đến cần khác nhau trước khi mở hệ thống đặt vé.');
      return;
    }
    setStatus('Đang chuyển đến hệ thống đặt vé chính thức.');
    window.location.assign(BOOKING_URL);
  }

  return (
    <section className="quick-booking conversion-section" aria-labelledby="quick-booking-title">
      <div className="quick-booking-intro">
        <p>Đặt vé nhanh</p>
        <h2 id="quick-booking-title">Bắt đầu tìm hành trình {airlineName}</h2>
        <span>Chọn thông tin chuyến đi cơ bản, sau đó tiếp tục trên hệ thống đặt vé chính thức để xem chuyến bay và điều kiện theo thời điểm tra cứu.</span>
      </div>
      <form className="quick-booking-form" onSubmit={handleSubmit} aria-describedby="quick-booking-note">
        <fieldset>
          <legend>Loại hành trình</legend>
          <label><input type="radio" name="tripType" value="round-trip" checked={tripType === 'round-trip'} onChange={() => setTripType('round-trip')} /> Khứ hồi</label>
          <label><input type="radio" name="tripType" value="one-way" checked={tripType === 'one-way'} onChange={() => setTripType('one-way')} /> Một chiều</label>
        </fieldset>
        <div className="quick-booking-grid">
          <label>Điểm đi<input name="origin" required minLength={2} autoComplete="off" placeholder="Ví dụ: TP. Hồ Chí Minh" /></label>
          <label>Điểm đến<input name="destination" required minLength={2} autoComplete="off" placeholder="Ví dụ: Đài Bắc" /></label>
          <label>Ngày đi<input name="departureDate" type="date" required /></label>
          {tripType === 'round-trip' && <label>Ngày về<input name="returnDate" type="date" required /></label>}
          <label>Hành khách<select name="passengers" defaultValue="1 người lớn"><option>1 người lớn</option><option>2 người lớn</option><option>Gia đình có trẻ em</option></select></label>
        </div>
        <div className="quick-booking-action">
          <button type="submit">Mở hệ thống đặt vé chính thức</button>
          <p id="quick-booking-note">Biểu mẫu không gửi hoặc lưu dữ liệu cá nhân trên trang này. Giá, điều kiện vé và tình trạng chỗ được xác nhận tại hệ thống booking chính thức.</p>
          <span role="status" aria-live="polite">{status}</span>
        </div>
      </form>
    </section>
  );
}
