import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { AirlineBrandCloud, AirlineDirectory, BrandPositioning } from '../AirlineDirectory';
import { QuickBookingForm } from '../QuickBookingForm';
import { ServiceRequestPanel } from '../ServiceRequestPanel';
import { SiteShell } from '../SiteShell';
import { VerifiedTestimonials } from '../VerifiedTestimonials';
import { airlines, BOOKING_URL, getAirlineFooterBackground, getHeroAsset, getHeroObjectPosition, getLandingTheme, legacyPages, officeLocations, pages, type PageContent } from '../content';
import { OfficeLocations } from '../OfficeLocations';
import { getArticlesForAirline } from '../airline-articles';
import { getLandingFaqs, LandingSeoGuide } from '../LandingSeoGuide';
import { AirlineCabinExplorer } from '../EvaCabinExplorer';
import { airlineCodes } from '../airline-codes';
import { FlightPriceSearch } from '../FlightPriceSearch';
import { getAirlineProfileSources } from '../airline-profiles';
import { AirlineInternalLinkRail, JourneyCtaStack, JourneySpotlight } from '../JourneySpotlight';

// URL GSC kế thừa được giữ để bảo toàn path, nhưng không được phép ghi đè
// nội dung SEO chuyên biệt đã có trong registry pages.
const allPages = { ...legacyPages, ...pages };

export function generateStaticParams() {
  return Object.keys(allPages).map((slug) => ({ slug }));
}

export async function getLandingMetadata(slug: string): Promise<Metadata> {
  const page = allPages[slug];
  if (!page) return { robots: { index: false, follow: false } };

  const canonicalPath = `/${page.slug}`;
  const pageUrl = `${BOOKING_URL}${canonicalPath}`;
  const imagePath = slug.includes('/') ? null : `${canonicalPath}/opengraph-image`;
  const imageUrl = imagePath ? `${BOOKING_URL}${imagePath}` : null;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: canonicalPath },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
    },
    openGraph: {
      type: legacyPages[slug] && !pages[slug] ? 'article' : 'website',
      locale: 'vi_VN',
      siteName: 'Khang Vuong Booking',
      url: pageUrl,
      title: page.title,
      description: page.description,
      ...(imageUrl ? { images: [{ url: imageUrl, width: 1200, height: 630, alt: page.title }] } : {}),
    },
    twitter: { card: imageUrl ? 'summary_large_image' : 'summary', title: page.title, description: page.description, ...(imageUrl ? { images: [imageUrl] } : {}) },
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return getLandingMetadata(slug);
}

export function buildLandingJsonLd(page: PageContent, isLegacy: boolean) {
  const pageUrl = `${BOOKING_URL}/${page.slug}`;
  const ogImageUrl = `${pageUrl}/opengraph-image`;
  const related = page.related?.filter((item) => allPages[item.slug]) ?? [];
  const airline = airlines.find((item) => page.slug === `hang-bay-${item.slug}` || page.slug.endsWith(`-${item.slug}`));
  const isAirlineHub = page.slug === `hang-bay-${airline?.slug}`;
  const sources = [...(page.sourceReferences ?? []), ...(isAirlineHub ? getAirlineProfileSources(airline?.slug) : [])].filter((source, index, items) => items.findIndex((item) => item.url === source.url) === index);
  const faqs = getLandingFaqs(page);
  const webPage = {
    '@type': isLegacy ? 'Article' : 'WebPage',
    '@id': `${pageUrl}#webpage`,
    name: page.title,
    ...(isLegacy ? { headline: page.title, mainEntityOfPage: pageUrl } : {}),
    description: page.description,
    url: pageUrl,
    inLanguage: 'vi-VN',
    isPartOf: { '@id': `${BOOKING_URL}/#website` },
    publisher: { '@id': `${BOOKING_URL}/#organization` },
    primaryImageOfPage: { '@type': 'ImageObject', '@id': `${ogImageUrl}#image`, contentUrl: ogImageUrl, width: 1200, height: 630 },
    ...(page.updatedAt ? { dateModified: page.updatedAt } : {}),
    ...(airline ? { about: { '@type': 'Thing', name: airline.name } } : {}),
    ...(sources.length > 0 ? { citation: sources.map((source) => ({ '@type': 'CreativeWork', name: source.label, url: source.url, dateModified: source.checkedAt })) } : {}),
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPage,
      { '@type': 'WebSite', '@id': `${BOOKING_URL}/#website`, name: 'Khang Vuong Booking', url: BOOKING_URL, inLanguage: 'vi-VN', publisher: { '@id': `${BOOKING_URL}/#organization` } },
      { '@type': 'Organization', '@id': `${BOOKING_URL}/#organization`, name: 'Khang Vuong Booking', url: BOOKING_URL, contactPoint: [{ '@type': 'ContactPoint', telephone: '+84-1900-6695', contactType: 'customer service', availableLanguage: ['vi'] }, { '@type': 'ContactPoint', telephone: '+84-934-589-488', contactType: 'customer service', availableLanguage: ['vi'] }], address: officeLocations.flatMap((office) => office.addresses.map((address) => ({ '@type': 'PostalAddress', addressLocality: office.city, streetAddress: address.label, addressCountry: 'VN', telephone: office.phone }))) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Trang chủ', item: BOOKING_URL }, { '@type': 'ListItem', position: 2, name: page.title, item: pageUrl }] },
      ...(page.slug === 'hang-bay' ? [{ '@type': 'ItemList', name: 'Danh mục 66 hãng hàng không chủ lực', numberOfItems: airlines.length, itemListElement: airlines.map((item, index) => {
        const code = airlineCodes[item.slug as keyof typeof airlineCodes];
        return { '@type': 'ListItem', position: index + 1, item: { '@type': 'Airline', name: item.name, url: `${BOOKING_URL}/hang-bay-${item.slug}`, ...(code ? { iataCode: code.iata, icaoCode: code.icao } : {}) } };
      }) }] : []),
      ...(airline && page.slug !== `hang-bay-${airline.slug}` ? [{ '@type': 'Service', name: page.title, serviceType: page.eyebrow, areaServed: { '@type': 'Country', name: 'Việt Nam' }, provider: { '@id': `${BOOKING_URL}/#organization` }, audience: { '@type': 'Audience', audienceType: 'Hành khách hàng không' } }] : []),
      ...(related.length > 0 ? [{ '@type': 'ItemList', name: `Trang liên quan: ${page.title}`, itemListElement: related.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.label, item: `${BOOKING_URL}/${item.slug}` })) }] : []),
      ...(faqs.length > 0 ? [{ '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) }] : []),
    ],
  };
}

export async function CategoryOrLegacyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = allPages[slug];
  if (!page) notFound();

  const isLegacy = Boolean(legacyPages[slug]);
  const related = page.related?.filter((item) => allPages[item.slug]) ?? [];
  const theme = getLandingTheme(slug);
  const hero = getHeroAsset(slug);
  const heroObjectPosition = getHeroObjectPosition(slug);
  const airlineSlug = airlines.find((airline) => slug === `hang-bay-${airline.slug}` || slug.endsWith(`-${airline.slug}`))?.slug;
  const airlineName = airlines.find((airline) => airline.slug === airlineSlug)?.name ?? 'hãng bay';
  const isAirlineHub = Boolean(airlineSlug && slug === `hang-bay-${airlineSlug}`);
  const sources = [...(page.sourceReferences ?? []), ...(isAirlineHub ? getAirlineProfileSources(airlineSlug) : [])].filter((source, index, items) => items.findIndex((item) => item.url === source.url) === index);
  const faqs = getLandingFaqs(page);
  const airlineArticles = airlineSlug ? getArticlesForAirline(airlineSlug) : [];
  const isDestinationLanding = slug.startsWith('ve-may-bay-di-');
  const searchDestination = page.title.replace(/^Vé máy bay đi\s+/i, '');
  const themeStyle = { '--landing-primary': theme.primary, '--landing-accent': theme.accent, '--landing-soft': theme.soft } as CSSProperties;
  const jsonLd = buildLandingJsonLd(page, isLegacy);

  const heroStyle = themeStyle;

  return (
    <SiteShell footerTheme={airlineSlug ? theme : undefined} footerBackground={getAirlineFooterBackground(airlineSlug)}>
      <main className="landing-theme" style={themeStyle}>
        <section className="page-hero has-hero-art" style={heroStyle}><Image className="page-hero-art" src={hero.url} alt="" aria-hidden="true" priority sizes="100vw" quality={70} fill style={{ zIndex: 1, objectFit: 'cover', objectPosition: heroObjectPosition }} /><div aria-hidden="true" style={{ position: 'absolute', zIndex: 2, inset: 0, background: 'linear-gradient(90deg, color-mix(in srgb, var(--landing-primary) 84%, transparent) 0%, color-mix(in srgb, var(--landing-primary) 72%, transparent) 33%, color-mix(in srgb, var(--landing-primary) 38%, transparent) 55%, color-mix(in srgb, var(--landing-primary) 8%, transparent) 70%, transparent 82%)' }} /><div className="frame" style={{ position: 'relative', zIndex: 3, paddingInline: 'clamp(3.5rem, 15vw, 19rem)' }}>{slug === 'hang-bay' && <AirlineBrandCloud />}<nav className="crumb"><Link href="/">Trang chủ</Link><span>/</span><span>{page.eyebrow}</span></nav><p>{page.eyebrow}</p><h1>{page.title}</h1><i /><span>{page.description}</span>{(isDestinationLanding || isAirlineHub) && <div className={`hero-price-search${isAirlineHub ? ' hero-price-search--airline' : ''}`}><FlightPriceSearch destination={isDestinationLanding ? searchDestination : ''} /></div>}<span className="sr-only">{hero.alt}</span></div></section>
        <article className="frame article">
          <p className="lead">{page.intro}</p>
          {slug === 'lien-he' && <OfficeLocations />}
          {slug === 'hang-bay' && <><BrandPositioning /><AirlineDirectory /></>}
          {airlineSlug && <BrandPositioning airlineName={airlineName} />}
          {airlineArticles.length > 0 && <section className="article-related airline-content-stream airline-content-stream--featured"><p>Cẩm nang theo hãng</p><h2>Đọc ngay: bài viết về {airlineName}</h2><div>{airlineArticles.map((article) => <Link key={article.slug} href={`/bai-viet/${article.slug}`}><strong>{article.title}</strong><span>{article.description}</span><em>Đọc bài viết →</em></Link>)}</div></section>}
          <div className="article-grid"><div className="article-grid-main"><section><h2>{isLegacy ? 'Những điểm nên kiểm tra' : 'Chuẩn bị rõ ràng trước khi gửi yêu cầu'}</h2><ol>{page.checklist.map((item) => <li key={item}>{item}</li>)}</ol></section>{airlineSlug && <AirlineCabinExplorer airlineName={airlineName} airlineSlug={airlineSlug} />}<JourneySpotlight page={page} airlineSlug={airlineSlug} airlineName={airlineName} hero={hero} /></div><div className="airline-action-rail"><JourneyCtaStack label={page.eyebrow} />{airlineSlug && <ServiceRequestPanel airlineName={airlineName} serviceLabel={page.eyebrow} />}{airlineSlug && <AirlineInternalLinkRail airlineSlug={airlineSlug} airlineName={airlineName} currentSlug={slug} />}</div></div>
          <LandingSeoGuide page={page} />
          {faqs.length > 0 && <section className="article-faq"><p>Hỏi đáp nhanh</p><h2>FAQ {page.title}</h2>{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section>}
          {sources.length > 0 && <section className="article-sources"><p>Nguồn mở đã kiểm chứng</p><h2>Đối chiếu thông tin</h2><div>{sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer"><span>{source.label}</span><small>Kiểm tra: {source.checkedAt} ↗</small></a>)}</div></section>}
          {related.length > 0 && slug !== 'hang-bay' && <section className="article-related"><p>Khám phá tiếp</p><h2>Trang liên quan</h2><div>{related.map((item) => <Link key={item.slug} href={`/${item.slug}`}>{item.label} <span aria-hidden="true">→</span></Link>)}</div></section>}
          {page.conversionModules?.verifiedTestimonials && <VerifiedTestimonials />}
          {page.conversionModules?.quickBooking && <QuickBookingForm airlineName={airlineName} />}
        </article>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </SiteShell>
  );
}

export default CategoryOrLegacyPage;
