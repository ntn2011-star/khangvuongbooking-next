import type { Metadata } from 'next';
import { gscLegacyPages } from '../gsc-legacy-pages';
import { CategoryOrLegacyPage, getLandingMetadata } from '../[slug]/page';

export function generateStaticParams() {
  return Object.keys(gscLegacyPages)
    .filter((slug) => slug.includes('/'))
    .map((slug) => ({ path: slug.split('/') }));
}

export async function generateMetadata({ params }: { params: Promise<{ path: string[] }> }): Promise<Metadata> {
  const { path } = await params;
  return getLandingMetadata(path.join('/'));
}

export default async function GscNestedPage({ params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return <CategoryOrLegacyPage params={Promise.resolve({ slug: path.join('/') })} />;
}
