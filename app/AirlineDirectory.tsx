'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState, type CSSProperties } from 'react';
import { airlines, brandPositioning, getLandingTheme, toPublicAssetUrl } from './content';
import { airlineCodes } from './airline-codes';
import { airlineFacts } from './airline-facts';
import styles from './AirlineDirectory.module.css';

function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

const allianceFilters = ['Tất cả', 'Star Alliance', 'SkyTeam', 'Oneworld'] as const;
type AllianceFilter = (typeof allianceFilters)[number];

const airlineWordmarks: Record<string, string> = {
  'vietnam-airlines': 'VIETNAM AIRLINES', 'vietjet-air': 'vietjet', 'eva-air': 'EVA AIR', 'korean-air': 'KOREAN AIR',
  'all-nippon-airways': 'ANA', 'japan-airlines': 'JAL', 'singapore-airlines': 'SINGAPORE', 'cathay-pacific': 'CATHAY',
  'china-airlines': 'CHINA AIRLINES', 'starlux-airlines': 'STARLUX', 'qatar-airways': 'QATAR', emirates: 'EMIRATES',
  'turkish-airlines': 'TURKISH', 'bamboo-airways': 'BAMBOO AIRWAYS',
};

const airlineLogoFiles: Record<string, string> = {
  'vietnam-airlines': '/manus-storage/vietnam-airlines-logo_1ebaae4f_84118eb0.png', 'vietjet-air': '/manus-storage/vietjet-air-logo_79f04509_367a2563.png', 'eva-air': '/manus-storage/eva-air-logo_d77d3e18_2651b8b7.png',
  'korean-air': '/manus-storage/korean-air-logo_8f024276_02b989cf.png', 'all-nippon-airways': '/manus-storage/all-nippon-airways-logo_5000cce1_c26fe238.png', 'japan-airlines': '/manus-storage/japan-airlines-logo_38e40548_651d7d02.png',
  'singapore-airlines': '/manus-storage/singapore-airlines-logo_8c29d523_686668e5.png', 'cathay-pacific': '/manus-storage/cathay-pacific-logo_52395503_51733108.png', 'china-airlines': '/manus-storage/china-airlines-logo_66146f44_133abb37.png',
  'starlux-airlines': '/manus-storage/starlux-airlines-logo_2cb0ee6f_dc038286.png', 'qatar-airways': '/manus-storage/qatar-airways-logo_de2f0e30_e885080d.png', emirates: '/manus-storage/emirates-logo_b4ef523a_976979b0.png',
  'turkish-airlines': '/manus-storage/turkish-airlines-logo_01d6ef16_eb574bae.png', 'bamboo-airways': '/manus-storage/bamboo-airways-logo_b7b42a7f_90aa52ad.png', 'vietravel-airlines': '/manus-storage/vietravel-airlines-logo_ec26e8e6_a3dc39ea.png',
  'asiana-airlines': '/manus-storage/asiana-airlines-logo_1d2c35f3_aace0ee1.png', 'peach-aviation': '/manus-storage/peach-aviation-logo_019ca520_3acbfc61.png', scoot: '/manus-storage/scoot-logo_f10588a6_ecee8c7a.png',
  'hong-kong-airlines': '/manus-storage/hong-kong-airlines-logo_fe6ff039_614c0c34.png', 'thai-airways': '/manus-storage/thai-airways-logo_610a0ffd_54161fcf.png', 'malaysia-airlines': '/manus-storage/malaysia-airlines-logo_f113ba49_367b33b7.png',
  airasia: '/manus-storage/airasia-logo_ca30780b_c24756f2.png', 'philippine-airlines': '/manus-storage/philippine-airlines-hd_7666d8e4_1c84f18c.png', 'cebu-pacific': '/manus-storage/cebu-pacific-logo_8a314d5d_02eb00bb.png',
  'garuda-indonesia': '/manus-storage/garuda-indonesia-hd_035ffe91_7eb0c9bb.png', 'batik-air-malaysia': '/manus-storage/batik-air-malaysia-logo_91fc81e3_8a1e96b6.png', 'lion-air': '/manus-storage/lion-air-logo_ae252290_b3f6cb53.png',
  'china-southern': '/manus-storage/china-southern-logo_8cba65c7_b3e7fc5a.png', 'air-china': '/manus-storage/air-china-logo_82faeab7_856951ae.png', 'china-eastern': '/manus-storage/china-eastern-logo_b08715da_e8b3ad40.png',
  xiamenair: '/manus-storage/xiamen-airlines-logo_c03370aa_23ace693.png', 'sichuan-airlines': '/manus-storage/sichuan-airlines-logo_58f2b287_65136508.png', 'hainan-airlines': '/manus-storage/hainan-airlines-logo_4a1a5887_075995aa.png',
  'etihad-airways': '/manus-storage/etihad-airways-logo_f1aadcef_f5397a8d.png', 'air-india': '/manus-storage/air-india-logo_c2abe7e4_ae8cdfb0.png', indigo: '/manus-storage/indigo-logo_4ffaaf69_22f0e3ed.png',
  lufthansa: '/manus-storage/lufthansa-logo_6dc86b7f_f03e1add.png', 'air-france': '/manus-storage/air-france-logo_bbe5720c_3f2099b5.png', 'british-airways': '/manus-storage/british-airways-logo_2465e639_6f2552ee.png',
  'united-airlines': '/manus-storage/united-airlines-hd_5230a71c_719ccf2f.png', 'american-airlines': '/manus-storage/american-airlines-logo_471efb69_e68fe55f.png', qantas: '/manus-storage/qantas-logo_1eb8e948_c7b27f52.png',
  'jetstar-airways': '/manus-storage/jetstar-airways-logo_036ad07f_ed67c534.png', 'delta-air-lines': '/manus-storage/delta-air-lines-logo_4560f629_2d7e6442.png',
};

const airlineLogoCdn = (process.env.NEXT_PUBLIC_AIRLINE_LOGO_CDN ?? '').replace(/\/$/, '');

type AirlineProfile = {
  code: string;
  market: string;
  description: string;
  tags: string[];
  routes: string[];
};

const featuredProfiles: Record<string, AirlineProfile> = {
  'vietnam-airlines': { code: 'VN · HVN · Việt Nam', market: 'Việt Nam', description: 'Hãng hàng không quốc gia Việt Nam, phù hợp cho hành trình nội địa, quốc tế và các chặng nối chuyến.', tags: ['Phổ biến', 'Nội địa', 'Quốc tế'], routes: ['Việt Nam → Hà Nội', 'Việt Nam → TP. Hồ Chí Minh', 'Việt Nam → Đà Nẵng'] },
  'vietjet-air': { code: 'VJ · VJC · Việt Nam', market: 'Việt Nam', description: 'Lựa chọn linh hoạt cho nhu cầu đặt vé, kiểm tra hành lý và dịch vụ theo booking của Vietjet Air.', tags: ['Phổ biến', 'Nội địa', 'Tiết kiệm'], routes: ['Việt Nam → Hà Nội', 'Việt Nam → TP. Hồ Chí Minh', 'Việt Nam → Phú Quốc'] },
  'eva-air': { code: 'BR · EVA · Đài Loan', market: 'Đài Loan', description: 'Hãng bay quốc tế được nhiều hành khách lựa chọn cho hành trình đi châu Á, Bắc Mỹ và các tuyến nối chuyến.', tags: ['Phổ biến', 'Du học', 'Thăm thân'], routes: ['Việt Nam → Đài Bắc', 'Việt Nam → Los Angeles', 'Việt Nam → New York'] },
  'korean-air': { code: 'KE · KAL · Hàn Quốc', market: 'Hàn Quốc', description: 'Hãng hàng không Hàn Quốc phục vụ hành trình quốc tế với điểm nối chuyến tại Seoul và các chặng đi xa.', tags: ['Phổ biến', 'Du học', 'Thăm thân'], routes: ['Việt Nam → Seoul', 'Việt Nam → Los Angeles', 'Việt Nam → New York'] },
  'all-nippon-airways': { code: 'NH · ANA · Nhật Bản', market: 'Nhật Bản', description: 'Hãng hàng không Nhật Bản với các lựa chọn hành trình qua Tokyo, phù hợp cho khách công tác và du học.', tags: ['Du học', 'Thăm thân', 'Quốc tế'], routes: ['Việt Nam → Tokyo', 'Việt Nam → Osaka', 'Việt Nam → Hoa Kỳ'] },
  'japan-airlines': { code: 'JL · JAL · Nhật Bản', market: 'Nhật Bản', description: 'Hãng bay Nhật Bản phục vụ các hành trình quốc tế qua Tokyo, với điểm vào dịch vụ riêng theo booking.', tags: ['Du học', 'Thăm thân', 'Quốc tế'], routes: ['Việt Nam → Tokyo', 'Việt Nam → Osaka', 'Việt Nam → Hoa Kỳ'] },
  'singapore-airlines': { code: 'SQ · SIA · Singapore', market: 'Singapore', description: 'Hãng hàng không quốc tế với nhiều lựa chọn hành trình qua Singapore và kết nối đến nhiều điểm đến.', tags: ['Phổ biến', 'Du học', 'Quốc tế'], routes: ['Việt Nam → Singapore', 'Việt Nam → Úc', 'Việt Nam → Châu Âu'] },
  'cathay-pacific': { code: 'CX · CPA · Hồng Kông', market: 'Hồng Kông', description: 'Hãng bay quốc tế qua Hồng Kông, phù hợp để kiểm tra hành trình, dịch vụ và điều kiện theo booking.', tags: ['Phổ biến', 'Du học', 'Thăm thân'], routes: ['Việt Nam → Hồng Kông', 'Việt Nam → Los Angeles', 'Việt Nam → San Francisco'] },
  'china-airlines': { code: 'CI · CAL · Đài Loan', market: 'Đài Loan', description: 'Hãng hàng không Đài Loan phục vụ hành trình quốc tế với điểm nối chuyến tại Đài Bắc.', tags: ['Phổ biến', 'Du học', 'Thăm thân'], routes: ['Việt Nam → Đài Bắc', 'Việt Nam → Los Angeles', 'Việt Nam → New York'] },
  'qatar-airways': { code: 'QR · QTR · Qatar', market: 'Qatar', description: 'Hãng bay quốc tế qua Doha, phù hợp để tìm trang đặt vé và hỗ trợ dịch vụ theo chặng bay.', tags: ['Quốc tế', 'Châu Âu', 'Thăm thân'], routes: ['Việt Nam → Doha', 'Việt Nam → Châu Âu', 'Việt Nam → Hoa Kỳ'] },
  emirates: { code: 'EK · UAE · Dubai', market: 'Dubai', description: 'Hãng bay quốc tế khai thác mạng lưới rộng, với các điểm vào kiểm tra booking và dịch vụ hành khách.', tags: ['Quốc tế', 'Châu Âu', 'Thăm thân'], routes: ['Việt Nam → Dubai', 'Việt Nam → Châu Âu', 'Việt Nam → Hoa Kỳ'] },
  'turkish-airlines': { code: 'TK · THY · Thổ Nhĩ Kỳ', market: 'Thổ Nhĩ Kỳ', description: 'Hãng bay quốc tế với hành trình qua Istanbul, có các trang riêng để kiểm tra từng nhu cầu dịch vụ.', tags: ['Quốc tế', 'Châu Âu', 'Thăm thân'], routes: ['Việt Nam → Istanbul', 'Việt Nam → Châu Âu', 'Việt Nam → Hoa Kỳ'] },
};

function getAirlineProfile(airline: (typeof airlines)[number]): AirlineProfile {
  return featuredProfiles[airline.slug] ?? {
    code: `KVBK · ${airline.name.toUpperCase()}`,
    market: 'Hãng hàng không quốc tế',
    description: `Điểm vào ${airline.name} dành cho nhu cầu đặt vé và kiểm tra dịch vụ theo booking, hành trình thực tế.`,
    tags: airline.priority ? ['Hãng ưu tiên', 'Quốc tế', 'Hỗ trợ booking'] : ['Đặt vé', 'Dịch vụ theo hãng'],
    routes: [],
  };
}

function AirlineNameplate({ airline, faded = false, priority = false }: { airline: (typeof airlines)[number]; faded?: boolean; priority?: boolean }) {
  const mark = airlineWordmarks[airline.slug] ?? airline.name.toUpperCase();
  const logoFile = airlineLogoFiles[airline.slug];
  const logoUrl = logoFile ? (airlineLogoCdn ? `${airlineLogoCdn}${logoFile}` : toPublicAssetUrl(logoFile)) : null;
  return <span className={faded ? styles.heroMark : styles.nameplate} aria-label={`Nhận diện ${airline.name}`}>{logoUrl ? <img src={logoUrl} alt={airline.name} decoding="async" loading={faded || priority ? 'eager' : 'lazy'} /> : <b>{mark}</b>}{!faded && <small>{airline.name}</small>}</span>;
}

export function AirlineBrandCloud() {
  return <div className={`${styles.heroBrandCloud} hero-brand-cloud`} aria-label="Nhận diện các hãng bay ưu tiên"><span>66 HÃNG CHỦ LỰC</span><div>{airlines.filter((airline) => airline.priority).slice(0, 12).map((airline) => <AirlineNameplate key={airline.slug} airline={airline} faded />)}</div></div>;
}

export function AirlineDirectory() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [alliance, setAlliance] = useState<AllianceFilter>('Tất cả');
  const visibleAirlines = useMemo(() => {
    const keyword = normalize(query.trim());
    return airlines.filter((airline) => {
      const fact = airlineFacts[airline.slug as keyof typeof airlineFacts];
      const code = airlineCodes[airline.slug as keyof typeof airlineCodes];
      const searchable = [airline.name, code?.iata, code?.icao].filter(Boolean).map((value) => normalize(String(value)));
      return (!keyword || searchable.some((value) => value.includes(keyword))) && (alliance === 'Tất cả' || fact?.alliance === alliance);
    });
  }, [query, alliance]);

  return (
    <section className={styles.directory} aria-labelledby="airline-directory-title">
      <div className={styles.directoryHeader}>
        <div><p className={styles.eyebrow}>Danh mục theo hãng</p><h2 id="airline-directory-title">{brandPositioning.airlineCount} hãng bay chủ lực</h2><span>Các hãng được ưu tiên hiển thị trước. Mỗi hãng có trang thông tin riêng cho đặt vé, đổi ngày, hành lý, xác nhận booking và các nhu cầu hỗ trợ theo hành trình.</span></div>
        <input className={styles.search} value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Tìm tên hãng, mã IATA hoặc ICAO" aria-label="Tìm tên hãng, mã IATA hoặc ICAO" />
      </div>
      <div className={styles.allianceFilters} role="group" aria-label="Lọc theo liên minh hàng không"><span>Liên minh hàng không</span>{allianceFilters.map((item) => <button key={item} type="button" className={alliance === item ? styles.activeAlliance : ''} onClick={() => setAlliance(item)}>{item}</button>)}</div>
      <p className={styles.count} aria-live="polite">Hiển thị {visibleAirlines.length} / {brandPositioning.airlineCount} hãng bay.</p>
      {visibleAirlines.length > 0 ? <div className={styles.grid}>{visibleAirlines.map((airline) => {
        const profile = getAirlineProfile(airline);
        const fact = airlineFacts[airline.slug as keyof typeof airlineFacts];
        const code = airlineCodes[airline.slug as keyof typeof airlineCodes];
        const cardTheme = getLandingTheme(`hang-bay-${airline.slug}`);
        const cardStyle = { '--card-primary': cardTheme.primary, '--card-accent': cardTheme.accent, '--card-soft': cardTheme.soft } as CSSProperties;
        return <article className={styles.card} style={cardStyle} key={airline.slug} role="link" tabIndex={0} aria-label={`Mở landing ${airline.name}`} onClick={(event) => { if (!(event.target as HTMLElement).closest('a')) router.push(`/hang-bay-${airline.slug}`); }} onKeyDown={(event) => { if ((event.key === 'Enter' || event.key === ' ') && !(event.target as HTMLElement).closest('a')) { event.preventDefault(); router.push(`/hang-bay-${airline.slug}`); } }}>
          <div className={styles.cardAccent} aria-hidden="true" />
          <header className={styles.cardHeader}><AirlineNameplate airline={airline} priority={airline.priority} /><div className={styles.identity}><p>{code ? `${code.iata} · ${code.icao} · ${profile.market}` : profile.code}</p><h3>{airline.name}</h3></div><Link className={styles.hubArrow} href={`/hang-bay-${airline.slug}`} aria-label={`Mở hub ${airline.name}`}>↗</Link></header>
          <p className={styles.summary}>{profile.description}</p>
          {fact && <p className={styles.history}><b>Từ {fact.founded}</b><span>{fact.history}</span></p>}
          <div className={styles.tags} aria-label={`Nhóm nhu cầu ${airline.name}`}>{profile.tags.map((tag) => <span key={tag}>{tag}</span>)}{fact?.alliance !== 'Không thuộc liên minh lớn' && <span className={styles.allianceTag}>{fact?.alliance}</span>}</div>
          <div className={styles.infoTiles}><div><b>Điểm vào</b><span>{profile.market}</span></div><div><b>Hỗ trợ</b><span>Theo booking</span></div></div>
          {profile.routes.length > 0 && <section className={styles.routeBlock} aria-label={`Đường bay chủ lực ${airline.name}`}><p>Đường bay chủ lực</p><div>{profile.routes.map((route) => <span key={route}>{route}</span>)}</div></section>}
          <footer className={styles.actions}><Link className={styles.primaryAction} href={`/dat-ve-may-bay-${airline.slug}`}>Đặt vé</Link><Link href={`/doi-ngay-ve-${airline.slug}`}>Đổi vé</Link><Link href={`/mua-them-hanh-ly-${airline.slug}`}>Hành lý</Link><Link href={`/nang-hang-ve-${airline.slug}`}>Nâng hạng</Link><Link href={`/chon-cho-${airline.slug}`}>Chọn chỗ</Link></footer>
        </article>;
      })}</div> : <p className={styles.empty}>Chưa tìm thấy hãng phù hợp. Hãy thử nhập tên đầy đủ hoặc một phần tên hãng.</p>}
    </section>
  );
}

export function BrandPositioning({ airlineName }: { airlineName?: string }) {
  return <section className={styles.positioning} aria-label="Vị thế Khang Vuong Booking"><p>Đồng hành từ {brandPositioning.establishedYear}</p><h2>{brandPositioning.yearsOfService} năm đồng hành cùng hành khách và {brandPositioning.airlineCount} hãng bay chủ lực</h2><span>{airlineName ? `Với hành trình ${airlineName}, Khang Vuong Booking sắp xếp điểm vào thông tin và dịch vụ theo booking để khách hàng chủ động kiểm tra trước khi giao dịch.` : 'Khang Vuong Booking tổ chức thông tin hành trình, dịch vụ theo hãng và điểm đến để khách hàng lựa chọn đúng luồng hỗ trợ. Điều kiện vé luôn được xác nhận theo booking và hãng trực tiếp khai thác.'}</span></section>;
}
