'use client';

import { useState } from 'react';
import { toPublicAssetUrl } from './content';
import { getAirlineCabinBoard } from './airline-cabin-assets';
import './eva-cabin.css';

type CabinClass = 'business' | 'premium' | 'economy';

const cabinDefinitions: Record<CabinClass, { label: string; eyebrow: string; description: string; alt: string; notes: string[]; objectPosition: string }> = {
  business: {
    label: 'Thương gia',
    eyebrow: 'Không gian thư giãn',
    description: 'Không gian ngả phẳng và tiện nghi cụ thể phụ thuộc loại tàu bay, chặng bay cùng thời điểm khai thác.',
    alt: 'Khoang Thương gia minh họa theo nhận diện hãng',
    notes: ['Không gian ghế ngả sâu', 'Phù hợp hành trình dài', 'Cần kiểm tra cấu hình chuyến bay'],
    objectPosition: '0% center',
  },
  premium: {
    label: 'Phổ thông đặc biệt',
    eyebrow: 'Thoải mái cân bằng',
    description: 'Hạng ghế có trên một số chuyến bay; hãy đối chiếu loại tàu bay và tình trạng chỗ khi tư vấn hành trình cụ thể.',
    alt: 'Khoang Phổ thông đặc biệt minh họa theo nhận diện hãng',
    notes: ['Khoảng để chân thoải mái hơn', 'Trải nghiệm cân bằng', 'Tùy loại tàu bay'],
    objectPosition: '50% center',
  },
  economy: {
    label: 'Phổ thông',
    eyebrow: 'Linh hoạt theo hành trình',
    description: 'Lựa chọn phổ biến cho hành trình dài; điều kiện hành lý, chọn chỗ và nâng hạng cần được đối chiếu theo booking.',
    alt: 'Khoang Phổ thông minh họa theo nhận diện hãng',
    notes: ['Nhiều lựa chọn hành trình', 'Kiểm tra hành lý theo vé', 'Có thể tư vấn chọn chỗ'],
    objectPosition: '100% center',
  },
};

export function AirlineCabinExplorer({ airlineName, airlineSlug }: { airlineName: string; airlineSlug: string }) {
  const [selected, setSelected] = useState<CabinClass>('business');
  const cabin = cabinDefinitions[selected];
  const cabinBoard = getAirlineCabinBoard(airlineSlug);
  const image = toPublicAssetUrl(cabinBoard ?? '/manus-storage/kvbk-eva-cabin-business_d0b01054.png');

  return (
    <section className="eva-cabin-explorer" aria-labelledby="eva-cabin-heading">
      <div className="eva-cabin-heading">
        <div>
          <p>Không gian cabin theo hãng</p>
          <h2 id="eva-cabin-heading">Khám phá hạng ghế theo hành trình</h2>
        </div>
        <span>Ảnh minh họa theo {airlineName}; cấu hình thực tế phụ thuộc tàu bay và chặng.</span>
      </div>
      <div className="eva-cabin-tabs" role="tablist" aria-label={`Chọn hạng ghế ${airlineName}`}>
        {(Object.keys(cabinDefinitions) as CabinClass[]).map((key) => (
          <button key={key} type="button" role="tab" aria-selected={selected === key} className={selected === key ? 'is-active' : ''} onClick={() => setSelected(key)}>{cabinDefinitions[key].label}</button>
        ))}
      </div>
      <div className="eva-cabin-stage">
        <figure>
          <img src={image} alt={`${cabin.alt}: ${airlineName}`} loading="lazy" decoding="async" fetchPriority="low" style={{ objectPosition: cabin.objectPosition }} />
          <figcaption>{cabin.label} · ảnh cabin minh họa theo {airlineName}</figcaption>
        </figure>
        <div className="eva-cabin-copy">
          <p>{cabin.eyebrow}</p>
          <h3>{cabin.label}</h3>
          <span>{cabin.description}</span>
          <ul>{cabin.notes.map((note) => <li key={note}>{note}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}
