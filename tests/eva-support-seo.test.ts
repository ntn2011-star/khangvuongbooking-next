import { describe, expect, it } from 'vitest';
import { generateMetadata, buildLandingJsonLd } from '../app/[slug]/page';
import { pages } from '../app/content';
import { getLandingFaqs } from '../app/LandingSeoGuide';

const supportSlugs = ['so-dien-thoai-tong-dai-eva-air', 'dia-chi-van-phong-eva-air'] as const;

describe('EVA Air support landing SEO contract', () => {
  it('xuất canonical, robots, Open Graph và Twitter Card nhất quán', async () => {
    for (const slug of supportSlugs) {
      const metadata = await generateMetadata({ params: Promise.resolve({ slug }) });
      expect(metadata.title).toBe(pages[slug].title);
      expect(metadata.description).toBe(pages[slug].description);
      expect(metadata.alternates?.canonical).toBe(`/${slug}`);
      expect(metadata.robots).toMatchObject({ index: true, follow: true });
      expect(metadata.openGraph).toMatchObject({ type: 'website', locale: 'vi_VN', siteName: 'Khang Vuong Booking', url: `https://khangvuongbooking.com/${slug}`, title: pages[slug].title });
      expect(metadata.twitter).toMatchObject({ card: 'summary_large_image', title: pages[slug].title });
    }
  });

  it('tạo WebPage, Organization, Breadcrumb, ItemList và FAQPage hợp lệ cho landing hỗ trợ', () => {
    for (const slug of supportSlugs) {
      const page = pages[slug];
      const graph = buildLandingJsonLd(page, false)['@graph'];
      const webPage = graph.find((node) => node['@type'] === 'WebPage') as { '@id': string; url: string; inLanguage: string; citation?: unknown[] } | undefined;
      const organization = graph.find((node) => node['@type'] === 'Organization');
      const breadcrumbs = graph.find((node) => node['@type'] === 'BreadcrumbList');
      const itemList = graph.find((node) => node['@type'] === 'ItemList') as { '@type': string; itemListElement: Array<{ item: string }> } | undefined;
      const faq = graph.find((node) => node['@type'] === 'FAQPage') as { '@type': string; mainEntity: unknown[] } | undefined;

      expect(webPage).toMatchObject({ '@id': `https://khangvuongbooking.com/${slug}#webpage`, url: `https://khangvuongbooking.com/${slug}`, inLanguage: 'vi-VN' });
      expect(organization).toMatchObject({ '@id': 'https://khangvuongbooking.com/#organization', name: 'Khang Vuong Booking' });
      expect(breadcrumbs).toMatchObject({ '@type': 'BreadcrumbList' });
      expect(itemList).toMatchObject({ '@type': 'ItemList' });
      expect(itemList?.itemListElement.every((item) => item.item.startsWith('https://khangvuongbooking.com/'))).toBe(true);
      expect(faq?.mainEntity).toHaveLength(getLandingFaqs(page).length);
      expect(webPage?.citation).toHaveLength(2);
    }
  });

  it('chỉ bật khối chuyển đổi ở landing tổng đài và không khai báo đánh giá mô phỏng', () => {
    expect(pages['so-dien-thoai-tong-dai-eva-air'].conversionModules).toEqual({ quickBooking: true, verifiedTestimonials: true });
    expect(pages['dia-chi-van-phong-eva-air'].conversionModules).toBeUndefined();
  });
});
