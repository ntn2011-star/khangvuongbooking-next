import { NextRequest, NextResponse } from 'next/server';
import { legacyPages, pages } from './app/content';
import { gscLegacyPages } from './app/gsc-legacy-pages';
import { gscRemaps } from './app/gsc-remaps';
import { legacyRedirects } from './app/legacy-redirects';

const canonicalPages = new Set([...Object.keys(pages), ...Object.keys(legacyPages), ...Object.keys(gscLegacyPages), 'canh-bao-an-toan', 've-may-bay-quoc-te']);
function fallback(path: string) { if (path.includes('sua-ten')) return '/sua-ten-ve'; if (path.includes('nang-hang')) return '/nang-hang-ve'; if (path.includes('xe-lan')) return '/xe-lan'; if (path.includes('thu-cung') || path.includes('pet')) return '/ve-thu-cung'; if (path.includes('mua-them-hanh-ly') || path.includes('hanh-ly')) return '/mua-them-hanh-ly'; if (path.includes('doi-ve')) return '/doi-ngay-ve'; if (path.includes('visa')) return '/visa'; if (path.includes('ho-chieu')) return '/ho-chieu'; if (path.includes('san-bay')) return '/cam-nang-bay'; if (path.includes('khuyen-mai') || path.includes('uu-dai')) return '/khuyen-mai'; if (path.includes('ve-may-bay') || path.startsWith('ve/')) return '/ve-may-bay'; if (path.includes('hang-bay') || path.includes('airlines')) return '/hang-bay'; return null; }
function normalizedLegacyTarget(slug: string) {
  if (slug === 've-noi-dia' || slug === 've-may-bay-noi-dia' || slug === 've-may-bay/noi-dia') return '/ve-may-bay-trong-nuoc';
  if (slug === 've-may-bay/quoc-te') return '/ve-may-bay-quoc-te';
  const legacyDestination = slug.match(/^ve-may-bay-noi-dia-di-(.+)$/);
  return legacyDestination ? `/ve-may-bay-di-${legacyDestination[1]}` : null;
}
export function proxy(request: NextRequest) { const slug = request.nextUrl.pathname.replace(/^\/+|\/+$/g, '').toLowerCase(); const normalizedTarget = normalizedLegacyTarget(slug); if (normalizedTarget) { const destination = new URL(normalizedTarget, request.url); destination.search = request.nextUrl.search; return NextResponse.redirect(destination, 301); } if (!slug || slug.endsWith('/opengraph-image') || canonicalPages.has(slug)) return NextResponse.next(); const target = gscRemaps[slug] || legacyRedirects[slug] || fallback(slug); if (!target) return NextResponse.next(); const destination = new URL(target, request.url); destination.search = request.nextUrl.search; return NextResponse.redirect(destination, 301); }
export const config = { matcher: ['/((?!_next|favicon.ico|robots.txt|sitemap.xml).*)'] };
