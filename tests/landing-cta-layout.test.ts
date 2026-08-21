import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const page = readFileSync(new URL('../app/[slug]/page.tsx', import.meta.url), 'utf8');
const panel = readFileSync(new URL('../app/ServiceRequestPanel.tsx', import.meta.url), 'utf8');
const rail = readFileSync(new URL('../app/landing-rail.css', import.meta.url), 'utf8');
const spotlight = readFileSync(new URL('../app/JourneySpotlight.tsx', import.meta.url), 'utf8');

describe('bố cục CTA và vùng nội dung landing', () => {
  it('đặt cụm CTA trước biểu mẫu và loại bỏ khối thông tin hành trình cũ', () => {
    expect(page.indexOf('<JourneyCtaStack')).toBeLessThan(page.indexOf('<ServiceRequestPanel'));
    expect(page).not.toContain('Thông tin theo hành trình');
    expect(panel).not.toContain('service-request-cta');
  });

  it('giữ nguyên cách viết chính thức của tên hãng trong CTA và biểu mẫu', () => {
    expect(spotlight).not.toContain('toLocaleLowerCase');
    expect(panel).not.toContain('toLocaleLowerCase');
    expect(spotlight).toContain('<h2>Hỗ trợ {label}</h2>');
    expect(panel).toContain('Gửi yêu cầu {serviceLabel}');
  });

  it('bổ sung mô-đun hành trình nổi bật giàu dữ kiện và ảnh theo từng slug', () => {
    expect(page).toContain('<JourneySpotlight');
    expect(spotlight).toContain('getAirlineProfile');
    expect(spotlight).toContain('Image src={hero.url}');
    expect(rail).toContain('.journey-spotlight');
    expect(rail).toContain('align-items: start');
  });
});
