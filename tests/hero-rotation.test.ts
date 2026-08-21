import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const hero = readFileSync(new URL('../app/HomeHero.tsx', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

describe('hero image rotation', () => {
  it('uses two banner images and replaces both with one local preview when a user selects a file', () => {
    expect(hero).toContain('khangvuong-hero-airport-family-optimized_325826c7.webp');
    expect(hero).toContain('hero-image-primary');
    expect(hero).toContain('hero-image-secondary');
    expect(hero).toContain('hero-image-preview');
  });

  it('uses a subtle fade and translucent journey card instead of an opaque cover', () => {
    expect(styles).toContain('@keyframes hero-image-primary');
    expect(styles).toContain('@keyframes hero-image-secondary');
    expect(styles).toContain('prefers-reduced-motion: reduce');
    expect(styles).toContain('rgba(8,37,66,.34)');
    expect(styles).toContain('rgba(7,43,76,.18)');
  });
});
