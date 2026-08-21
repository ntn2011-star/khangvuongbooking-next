import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const content = readFileSync(new URL('../app/content.ts', import.meta.url), 'utf8');
const directory = readFileSync(new URL('../app/AirlineDirectory.tsx', import.meta.url), 'utf8');
const requestPanel = readFileSync(new URL('../app/ServiceRequestPanel.tsx', import.meta.url), 'utf8');

describe('triển khai và CTA dùng chung', () => {
  it('cấu hình site URL qua biến môi trường thay vì rải domain cố định', () => {
    expect(content).toContain('NEXT_PUBLIC_SITE_URL');
    expect(content).toContain('NEXT_PUBLIC_BOOKING_URL');
    expect(content).toContain('NEXT_PUBLIC_STATIC_ASSET_ORIGIN');
    expect(content).not.toContain('vebaydimy.com');
    expect(directory).not.toContain('baydimy-ndz7kux7.manus.space');
  });

  it('giữ click card hãng và CTA gọi/Zalo riêng cho landing dịch vụ', () => {
    expect(directory).toContain("router.push(`/hang-bay-${airline.slug}`)");
    expect(directory).toContain("closest('a')");
    expect(requestPanel).toContain('ZALO_SUPPORT_URL');
    expect(content).toContain("SUPPORT_PHONE = '0934 589 488'");
  });
});
