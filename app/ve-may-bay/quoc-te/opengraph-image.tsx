import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function InternationalFlightOpenGraphImage() {
  return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '70px', color: 'white', background: 'linear-gradient(135deg, #092f58 0%, #12649b 60%, #123a65 100%)' }}><div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: 25, letterSpacing: '4px', fontWeight: 800, textTransform: 'uppercase' }}><span style={{ width: 44, height: 44, display: 'flex', borderRadius: 12, background: '#f7c53d', color: '#0a355f', alignItems: 'center', justifyContent: 'center' }}>K</span>Khang Vuong Booking</div><div style={{ display: 'flex', flexDirection: 'column', maxWidth: 950 }}><span style={{ color: '#f7c53d', fontSize: 24, letterSpacing: '3px', textTransform: 'uppercase' }}>Điểm đến quốc tế</span><span style={{ marginTop: 20, fontSize: 64, fontWeight: 800, lineHeight: 1.05 }}>Vé máy bay quốc tế theo điểm đến</span><span style={{ marginTop: 22, color: '#d6eafb', fontSize: 25, lineHeight: 1.4 }}>Khám phá hành trình theo khu vực, quốc gia và thành phố.</span></div><div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,.35)', paddingTop: 23, color: '#d6eafb', fontSize: 21 }}><span>Thông tin hành trình rõ ràng</span><span>khangvuongbooking.com</span></div></div>, size);
}
