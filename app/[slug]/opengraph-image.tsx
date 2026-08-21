import { ImageResponse } from 'next/og';
import { getLandingTheme, legacyPages, pages } from '../content';
import { getArticleBySlug } from '../airline-articles';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const page = article ?? { ...pages, ...legacyPages }[slug] ?? pages['ve-may-bay'];
  const theme = getLandingTheme(article ? `hang-bay-${article.airlineSlug}` : slug);
  const isAirlineHub = slug === 'hang-bay';
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '70px', color: 'white', background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primary} 58%, ${theme.accent} 160%)` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: 25, letterSpacing: '4px', fontWeight: 800, textTransform: 'uppercase' }}><span style={{ width: 44, height: 44, display: 'flex', borderRadius: 12, background: theme.accent, color: theme.primary, alignItems: 'center', justifyContent: 'center' }}>K</span>Khang Vuong Booking</div>
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 1000 }}><span style={{ color: theme.accent, fontSize: 24, letterSpacing: '3px', textTransform: 'uppercase' }}>{isAirlineHub ? 'Khang Vuong Booking · Danh mục theo hãng' : page.eyebrow}</span><span style={{ marginTop: 20, fontSize: isAirlineHub ? 70 : 64, fontWeight: 800, lineHeight: 1.05 }}>{isAirlineHub ? '66 hãng bay chủ lực' : page.title}</span><span style={{ marginTop: 22, color: '#f2f8fb', fontSize: 25, lineHeight: 1.4 }}>{isAirlineHub ? 'Tìm hãng, mở trang dịch vụ và kiểm tra hành trình theo booking.' : page.description}</span>{isAirlineHub && <div style={{ display: 'flex', gap: 12, marginTop: 30 }}>{['Vietnam Airlines', 'Vietjet Air', 'EVA Air', '+63 hãng'].map((item) => <span key={item} style={{ border: '1px solid rgba(255,255,255,.45)', borderRadius: 999, padding: '9px 16px', fontSize: 19, fontWeight: 700 }}>{item}</span>)}</div>}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,.35)', paddingTop: 23, color: '#f2f8fb', fontSize: 21 }}><span>{isAirlineHub ? '18 năm đồng hành · Thành lập từ 2008' : 'Thông tin hành trình rõ ràng'}</span><span>khangvuongbooking.com</span></div>
    </div>,
    size,
  );
}
