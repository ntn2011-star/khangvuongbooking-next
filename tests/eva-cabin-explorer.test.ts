import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

const component = readFileSync(new URL('../app/EvaCabinExplorer.tsx', import.meta.url), 'utf8');
const page = readFileSync(new URL('../app/[slug]/page.tsx', import.meta.url), 'utf8');
const cabinAssets = readFileSync(new URL('../app/airline-cabin-assets.ts', import.meta.url), 'utf8');

describe('Airline cabin explorer', () => {
  it('cung cấp ba hạng ghế với bộ asset riêng cho từng hãng', () => {
    expect(component).toContain("business:");
    expect(component).toContain("premium:");
    expect(component).toContain("economy:");
    expect(component).toContain('getAirlineCabinBoard');
    expect(cabinAssets).toContain("'vietnam-airlines'");
    expect(cabinAssets).toContain("'united-airlines'");
    expect(component).toContain('toPublicAssetUrl');
  });

  it('hiển thị khối cabin trên mọi landing có airline slug, gồm hub và landing dịch vụ', () => {
    expect(component).toContain('AirlineCabinExplorer');
    expect(component).toContain('airlineName');
    expect(page).toContain('{airlineSlug && <AirlineCabinExplorer airlineName={airlineName} airlineSlug={airlineSlug} />}');
    expect(page).not.toContain('{isAirlineHub && airlineSlug && <AirlineCabinExplorer');
  });

  it('không còn trỏ tới các asset cabin đã trả về placeholder lỗi sinh ảnh', () => {
    expect(cabinAssets).not.toContain('cabin-board-hong-kong-airlines_ec710e70.png');
    expect(cabinAssets).not.toContain('cabin-board-malaysia-airlines_e54768dd.png');
    expect(cabinAssets).not.toContain('cabin-board-lufthansa_dab34375.png');
    expect(cabinAssets).not.toContain('cabin-board-air-canada_0918ccc2.png');
    expect(cabinAssets).not.toContain('cabin-board-aeromexico_da235040.png');
    expect((cabinAssets.match(/cabin-board-[a-z-]+-v2_[a-f0-9]+\.png/g) ?? []).length).toBe(33);
  });
});
