'use client';

import { FormEvent, useState } from 'react';
import { BOOKING_URL, HOTLINE_PHONE, SUPPORT_PHONE, SUPPORT_PHONE_TEL, ZALO_SUPPORT_URL } from './content';

const SUPPORT_EMAIL = 'contact@khangvuongbooking.com';

export function ServiceRequestPanel({ airlineName, serviceLabel }: { airlineName: string; serviceLabel: string }) {
  const [status, setStatus] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get('verification') ?? '').trim() !== '7') {
      setStatus('Vui lòng trả lời đúng câu hỏi bảo mật trước khi mở email yêu cầu.');
      return;
    }
    const name = String(data.get('name') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const booking = String(data.get('booking') ?? '').trim();
    const note = String(data.get('note') ?? '').trim();
    const subject = `Yêu cầu ${serviceLabel} — ${airlineName}`;
    const body = [`Họ và tên: ${name}`, `Số điện thoại: ${phone}`, `Mã đặt chỗ: ${booking || 'Chưa có'}`, '', `Nội dung yêu cầu: ${note}`, '', 'Vui lòng kiểm tra điều kiện theo booking thực tế.'].join('\n');
    setStatus('Đang mở ứng dụng email để bạn chủ động gửi yêu cầu.');
    window.location.assign(`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  }

  return <section className="service-request" aria-labelledby="service-request-title">
    <div className="service-request-head"><span aria-hidden="true">◌</span><div><p>Hỗ trợ theo hãng</p><h2 id="service-request-title">Gửi yêu cầu {serviceLabel}</h2><small>{airlineName} · đối chiếu theo booking</small></div></div>
    <form onSubmit={handleSubmit} className="service-request-form" aria-describedby="service-request-note">
      <label>Họ và tên<input name="name" required minLength={2} autoComplete="name" placeholder="Nhập họ tên đầy đủ" /></label>
      <label>Số điện thoại<input name="phone" required inputMode="tel" pattern="[0-9+ ().-]{8,20}" autoComplete="tel" placeholder="Nhập số điện thoại" /></label>
      <label>Mã đặt chỗ <span>(nếu có)</span><input name="booking" maxLength={12} autoComplete="off" placeholder="Ví dụ: AB12CD" /></label>
      <label>Yêu cầu / ghi chú<textarea name="note" required minLength={10} rows={4} placeholder="Mô tả nhu cầu, ngày bay và chặng bay..." /></label>
      <label className="service-request-captcha">Câu hỏi bảo mật: <b>3 + 4 = ?</b><input name="verification" required inputMode="numeric" pattern="7" placeholder="Nhập đáp án" /></label>
      <button type="submit">Mở email gửi yêu cầu <span aria-hidden="true">↗</span></button>
      <p id="service-request-note">Biểu mẫu không lưu hay gửi dữ liệu trên trang này. Sau khi xác minh, ứng dụng email trên thiết bị của bạn sẽ mở để bạn chủ động xem lại trước khi gửi.</p>
      <span role="status" aria-live="polite">{status}</span>
    </form>
  </section>;
}
