import Image from 'next/image';
import Link from 'next/link';
import type { PageContent } from './content';
import { BOOKING_URL, HOTLINE_PHONE, SUPPORT_PHONE, SUPPORT_PHONE_TEL, ZALO_SUPPORT_URL, getAirlineServiceSlug, getAvailableAirlineServices, pages } from './content';
import { getAirlineProfile } from './airline-profiles';

type JourneySpotlightProps = {
  page: PageContent;
  airlineSlug?: string;
  airlineName: string;
  hero: { url: string; alt: string };
};

function shortText(value: string, maximum = 185) {
  const normalized = value.replace(/\s+/g, ' ').trim();
  return normalized.length > maximum ? `${normalized.slice(0, maximum).trimEnd()}…` : normalized;
}

export function JourneyCtaStack({ label }: { label: string }) {
  return <section className="journey-cta-stack" aria-label="Liên hệ nhanh">
    <p>Liên hệ nhanh</p>
    <h2>Hỗ trợ {label}</h2>
    <span>Chọn kênh phù hợp để trao đổi trước khi gửi yêu cầu chi tiết.</span>
    <div>
      <a className="journey-cta-primary" href="tel:19006695">Gọi {HOTLINE_PHONE}</a>
      <a href={`tel:${SUPPORT_PHONE_TEL}`}>Gọi {SUPPORT_PHONE}</a>
      <a href={ZALO_SUPPORT_URL} target="_blank" rel="noopener noreferrer">Chat Zalo {SUPPORT_PHONE}</a>
      <a className="journey-cta-booking" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Mở hệ thống đặt vé ↗</a>
    </div>
  </section>;
}

export function AirlineInternalLinkRail({ airlineSlug, airlineName, currentSlug }: { airlineSlug: string; airlineName: string; currentSlug: string }) {
  const airlineHubSlug = `hang-bay-${airlineSlug}`;
  const serviceLinks = getAvailableAirlineServices(airlineSlug)
    .map((service) => ({ slug: getAirlineServiceSlug(service.slug, airlineSlug), label: service.label }))
    .filter((item) => item.slug !== currentSlug && Boolean(pages[item.slug]))
    .slice(0, 6);
  const links = [
    ...(currentSlug !== airlineHubSlug && pages[airlineHubSlug] ? [{ slug: airlineHubSlug, label: `Trang ${airlineName}` }] : []),
    ...serviceLinks,
  ];

  if (links.length === 0) return null;

  return <nav className="airline-internal-link-rail" aria-label={`Dịch vụ liên quan của ${airlineName}`}>
    <p>Kết nối theo hãng</p>
    <h3>Dịch vụ liên quan {airlineName}</h3>
    <span>Mở đúng nhu cầu theo booking, điều kiện vé và hành trình.</span>
    <div>{links.map((item) => <Link key={item.slug} href={`/${item.slug}`}>{item.label}<b aria-hidden="true">→</b></Link>)}</div>
    {pages[`dich-vu-theo-hang`] && <Link className="airline-internal-link-all" href="/dich-vu-theo-hang">Xem toàn bộ dịch vụ theo hãng <b aria-hidden="true">→</b></Link>}
  </nav>;
}

export function JourneySpotlight({ page, airlineSlug, airlineName, hero }: JourneySpotlightProps) {
  const profile = getAirlineProfile(airlineSlug);
  const related = page.related?.slice(0, 3) ?? [];
  const title = profile ? `Điểm chạm hành trình ${airlineName}` : `Gợi ý cho ${page.title}`;
  const primaryFact = profile?.headquarters_hubs || page.description;
  const secondaryFact = profile?.network_routes || page.intro;
  const factLabel = profile ? 'Sân bay & trung tâm khai thác' : 'Thông tin cần lưu ý';

  return <section className="journey-spotlight" aria-labelledby="journey-spotlight-title">
    <div className="journey-spotlight-media"><Image src={hero.url} alt={hero.alt} width={960} height={540} sizes="(max-width: 760px) 100vw, 65vw" quality={68} /><span>{profile ? `${airlineName} · thông tin công khai` : page.eyebrow}</span></div>
    <div className="journey-spotlight-copy">
      <p>Hành trình nổi bật</p>
      <h2 id="journey-spotlight-title">{title}</h2>
      <div className="journey-fact"><b>{factLabel}</b><span>{shortText(primaryFact)}</span></div>
      <div className="journey-fact"><b>{profile ? 'Mạng bay & chặng chủ lực' : 'Chuẩn bị trước khi liên hệ'}</b><span>{shortText(secondaryFact)}</span></div>
      {profile && <small>Thông tin vận hành thay đổi theo lịch khai thác; hãy đối chiếu với hãng và booking thực tế.</small>}
      {related.length > 0 && <div className="journey-spotlight-links">{related.map((item) => <Link key={item.slug} href={`/${item.slug}`}>{item.label} <span aria-hidden="true">→</span></Link>)}</div>}
    </div>
  </section>;
}
