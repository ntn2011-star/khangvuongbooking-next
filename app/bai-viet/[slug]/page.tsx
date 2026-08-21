import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteShell } from '../../SiteShell';
import { BOOKING_URL, getAirlineFooterBackground, getLandingTheme, pages } from '../../content';
import { airlineArticles, getAirlineName, getArticleBySlug, getRelatedArticles } from '../../airline-articles';

export function generateStaticParams() { return airlineArticles.map((article) => ({ slug: article.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { robots: { index: false, follow: false } };
  return { title: article.title, description: article.description, alternates: { canonical: `/bai-viet/${article.slug}` }, openGraph: { type: 'article', title: article.title, description: article.description, url: `${BOOKING_URL}/bai-viet/${article.slug}`, images: [{ url: article.heroImage, alt: article.heroAlt }] } };
}

export default async function AirlineArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();
  const airlineName = getAirlineName(article.airlineSlug);
  const related = getRelatedArticles(article);
  const services = article.serviceSlugs.flatMap((serviceSlug) => pages[serviceSlug] ? [pages[serviceSlug]] : []);
  const jsonLd = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Article', headline: article.title, description: article.description, image: article.heroImage, datePublished: article.publishedAt, dateModified: article.updatedAt, inLanguage: 'vi-VN', mainEntityOfPage: `${BOOKING_URL}/bai-viet/${article.slug}`, author: { '@type': 'Organization', name: 'Khang Vuong Booking' }, publisher: { '@type': 'Organization', name: 'Khang Vuong Booking' }, citation: article.sources.map((source) => ({ '@type': 'CreativeWork', name: source.label, url: source.url, dateModified: source.checkedAt })) },
    { '@type': 'FAQPage', mainEntity: article.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Trang chủ', item: BOOKING_URL }, { '@type': 'ListItem', position: 2, name: airlineName, item: `${BOOKING_URL}/hang-bay-${article.airlineSlug}` }, { '@type': 'ListItem', position: 3, name: article.title, item: `${BOOKING_URL}/bai-viet/${article.slug}` }] },
  ] };
  return <SiteShell footerTheme={getLandingTheme(`hang-bay-${article.airlineSlug}`)} footerBackground={getAirlineFooterBackground(article.airlineSlug)}><main className="airline-article-page"><section className="article-hero"><img src={article.heroImage} alt={article.heroAlt} fetchPriority="high" /><div className="article-hero-shade" /><div className="frame article-hero-content"><nav className="crumb"><Link href="/">Trang chủ</Link><span>/</span><Link href={`/hang-bay-${article.airlineSlug}`}>{airlineName}</Link><span>/</span><span>Cẩm nang</span></nav><p>{article.eyebrow}</p><h1>{article.title}</h1><span>{article.description}</span><small>Cập nhật: {article.updatedAt}</small></div></section><article className="frame airline-article"><div className="airline-article-layout"><div className="article-body"><p className="lead">{article.description}</p>{article.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.image && <figure><img src={section.image.url} alt={section.image.alt} loading="lazy" /><figcaption>{section.image.caption}</figcaption></figure>}</section>)}</div><aside className="article-aside"><p>Dịch vụ {airlineName}</p><strong>Chọn đúng nhu cầu theo booking</strong><div>{services.map((service) => <Link key={service.slug} href={`/${service.slug}`}>{service.title}<span>→</span></Link>)}</div><a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Kiểm tra hành trình ↗</a></aside></div><section className="article-faq"><p>Hỏi đáp nhanh</p><h2>FAQ {airlineName}</h2>{article.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section><section className="article-sources"><p>Nguồn chính thức</p><h2>Đối chiếu trước khi bay</h2><div>{article.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer"><span>{source.label}</span><small>Kiểm tra: {source.checkedAt} ↗</small></a>)}</div></section>{related.length > 0 && <section className="article-related airline-articles-related"><p>Cùng hãng {airlineName}</p><h2>Bài viết liên quan</h2><div>{related.map((item) => <Link key={item.slug} href={`/bai-viet/${item.slug}`}><img src={item.heroImage} alt="" loading="lazy" /><strong>{item.title}</strong><span>Đọc bài viết →</span></Link>)}</div></section>}</article></main><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /></SiteShell>;
}
