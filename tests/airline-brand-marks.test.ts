import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const directory = readFileSync(new URL('../app/AirlineDirectory.tsx', import.meta.url), 'utf8');
const page = readFileSync(new URL('../app/[slug]/page.tsx', import.meta.url), 'utf8');

describe('nhận diện hãng bay không phụ thuộc logo bên thứ ba', () => {
  it('đặt wordmark cho nhóm ưu tiên và hero cloud riêng trên hub hãng', () => {
    expect(directory).toContain("'vietnam-airlines': 'VIETNAM AIRLINES'");
    expect(directory).toContain("'vietnam-airlines': '/manus-storage/vietnam-airlines-logo_1ebaae4f_84118eb0.png'");
    expect(directory).toContain("'vietjet-air': '/manus-storage/vietjet-air-logo_79f04509_367a2563.png'");
    expect(directory).toContain("'starlux-airlines': '/manus-storage/starlux-airlines-logo_2cb0ee6f_dc038286.png'");
    expect(directory).toContain('NEXT_PUBLIC_AIRLINE_LOGO_CDN');
    expect(directory).toContain('export function AirlineBrandCloud');
    expect(directory).toContain('heroBrandCloud');
    expect(page).toContain("slug === 'hang-bay' && <AirlineBrandCloud />");
  });
});
