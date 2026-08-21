import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const styles = readFileSync(new URL('../app/AirlineDirectory.module.css', import.meta.url), 'utf8');

describe('cụm logo mini trong hero hãng', () => {
  it('dùng lưới logo 3 cột nhỏ gọn, rõ nét và ẩn trên mobile', () => {
    expect(styles).toContain('width: min(16.5rem, 30vw)');
    expect(styles).toContain('grid-template-columns: repeat(3, minmax(0, 1fr))');
    expect(styles).toContain('width: 3.1rem');
    expect(styles).toContain('.heroBrandCloud { display: none; }');
  });
});
