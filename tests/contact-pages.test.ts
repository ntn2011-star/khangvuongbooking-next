import { describe, expect, it } from 'vitest';
import { buildLandingJsonLd } from '../app/[slug]/page';
import { officeLocations, pages } from '../app/content';

describe('liên hệ và văn phòng', () => {
  it('có hai trang điều hướng và các liên kết Google Maps văn phòng', () => {
    expect(pages['lien-he'].title).toContain('Liên hệ');
    expect(pages['ve-chung-toi'].title).toContain('Về chúng tôi');
    expect(officeLocations).toHaveLength(2);
    expect(officeLocations.flatMap((office) => office.addresses)).toHaveLength(3);
    expect(officeLocations.flatMap((office) => office.addresses).every((address) => address.mapUrl.includes('google.com/maps'))).toBe(true);
  });

  it('đưa địa chỉ và ContactPoint vào Organization JSON-LD', () => {
    const jsonLd = buildLandingJsonLd(pages['lien-he'], false);
    const organization = jsonLd['@graph'].find((node: { '@type': string }) => node['@type'] === 'Organization') as { address: unknown[]; contactPoint: unknown[] };
    expect(organization.address).toHaveLength(3);
    expect(organization.contactPoint).toHaveLength(2);
  });
});
