import type { Metadata } from 'next';
import { SITE_URL } from './content';
import './globals.css';
import './hero-price-search.css';
import './typography.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Vé máy bay và cẩm nang hành trình | Khang Vuong Booking', template: '%s | Khang Vuong Booking' },
  description: 'Khám phá vé máy bay, hãng bay, hành lý, đổi vé, visa và cẩm nang chuẩn bị hành trình cùng Khang Vuong Booking.',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: { type: 'website', locale: 'vi_VN', siteName: 'Khang Vuong Booking', title: 'Vé máy bay và cẩm nang hành trình | Khang Vuong Booking', description: 'Thông tin hành trình, hãng bay, hành lý, đổi vé và visa.' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" /></head><body>{children}</body></html>;
}
