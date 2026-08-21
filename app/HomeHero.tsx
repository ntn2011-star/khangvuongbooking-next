'use client';

import Link from 'next/link';
import { ChangeEvent, useEffect, useState } from 'react';
import { BOOKING_URL, toPublicAssetUrl } from './content';

const HERO_IMAGES = [
  toPublicAssetUrl('/manus-storage/khangvuong-hero-airport_2fb31192.png'),
  toPublicAssetUrl('/manus-storage/khangvuong-hero-airport-family-optimized_325826c7.webp'),
] as const;

export function HomeHero() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl); }, [previewUrl]);

  function selectBanner(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
  }

  function restoreDefault() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  }

  return <section className={`hero hero-photo${previewUrl ? ' is-preview' : ''}`}>
    {previewUrl ? (
      <span className="hero-image-layer hero-image-preview" aria-hidden="true" style={{ backgroundImage: `url("${previewUrl}")` }} />
    ) : <>
      <span className="hero-image-layer hero-image-primary" aria-hidden="true" style={{ backgroundImage: `url("${HERO_IMAGES[0]}")` }} />
      <span className="hero-image-layer hero-image-secondary" aria-hidden="true" style={{ backgroundImage: `url("${HERO_IMAGES[1]}")` }} />
    </>}
    <div className="frame hero-grid">
      <div className="hero-copy-block">
        <p className="eyebrow">Khang Vuong Booking · Hỗ trợ hành trình</p>
        <h1>Chọn hành trình rõ ràng, sẵn sàng cho chuyến bay.</h1>
        <p className="hero-copy">Khám phá vé máy bay, hãng bay, hành lý, đổi vé và cẩm nang trước khi kiểm tra booking qua kênh chính thức.</p>
        <div className="hero-points"><span>Thông tin hành lý rõ ràng</span><span>Hỗ trợ theo hãng bay</span><span>Điều kiện theo booking</span></div>
        <div className="hero-buttons"><a className="button button-gold" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Mở hệ thống đặt vé <span aria-hidden="true">↗</span></a><Link className="button button-clear" href="/ve-may-bay">Khám phá vé máy bay <span aria-hidden="true">→</span></Link></div>
        <div className="banner-preview" aria-live="polite">
          <label className="banner-preview-upload"><span>Thử ảnh banner</span><input type="file" accept="image/png,image/jpeg,image/webp" onChange={selectBanner} /><small>{previewUrl ? 'Đang xem trước ảnh từ máy của bạn.' : 'Ảnh chỉ xem trước trong trình duyệt.'}</small></label>
          {previewUrl && <button type="button" onClick={restoreDefault}>Khôi phục ảnh mặc định</button>}
        </div>
      </div>
      <aside className="journey-card" aria-label="Chuẩn bị thông tin hành trình"><p>Bước 1 · Chọn hành trình</p><h2>Kiểm tra hành trình theo lịch của bạn</h2><div className="journey-tabs" aria-label="Loại hành trình"><button type="button" className="is-selected">Một chiều</button><button type="button">Khứ hồi</button></div><div className="journey-fields"><label className="journey-field">Điểm đi <span>Chọn thành phố</span></label><label className="journey-field">Điểm đến <span>Chọn thành phố</span></label><label className="journey-field journey-field-small">Ngày đi <span>dd/mm/yyyy</span></label><label className="journey-field journey-field-small">Hành khách <span>1 người lớn</span></label></div><a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Kiểm tra hành trình <span aria-hidden="true">↗</span></a><small>Thông tin dùng để sẵn sàng cho bước tư vấn và báo giá.</small></aside>
    </div>
  </section>;
}
