import { describe, expect, it } from 'vitest';
import { buildLandingJsonLd, generateMetadata } from '../app/[slug]/page';
import { pages } from '../app/content';

describe('Open Graph hub 66 hãng', () => {
  it('dùng metadata di động thân thiện với ảnh OG tuyệt đối 1200x630', async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: 'hang-bay' }) });
    expect(metadata.title).toBe('66 hãng hàng không chủ lực');
    expect(pages['hang-bay'].description).toContain('66 hãng');
    expect(metadata.openGraph?.images).toEqual(expect.arrayContaining([expect.objectContaining({ url: 'https://khangvuongbooking.com/hang-bay/opengraph-image', width: 1200, height: 630 })]));
    expect((metadata.twitter as { card?: string } | undefined)?.card).toBe('summary_large_image');
  });

  it('xuất ItemList hãng cùng mã IATA và ICAO cho bot tìm kiếm', () => {
    const schema = buildLandingJsonLd(pages['hang-bay'], false);
    const list = schema['@graph'].find((item: { ['@type']?: string; name?: string }) => item['@type'] === 'ItemList' && item.name === 'Danh mục 66 hãng hàng không chủ lực') as { numberOfItems: number; itemListElement: Array<{ item: { iataCode: string; icaoCode: string } }> };
    expect(list.numberOfItems).toBe(66);
    expect(list.itemListElement[0].item).toMatchObject({ iataCode: 'VN', icaoCode: 'HVN' });
  });
});
