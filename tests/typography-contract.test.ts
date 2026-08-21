import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const typography = readFileSync(new URL('../app/typography.css', import.meta.url), 'utf8');

describe('typography contract', () => {
  it('uses a single Vietnamese-friendly system sans stack and prevents synthetic font weight', () => {
    expect(typography).toContain('--font-ui:');
    expect(typography).toContain('"Be Vietnam Pro"');
    expect(typography).toContain('font-synthesis: none');
  });

  it('normalizes hero text and removes the blur-inducing copy shadow', () => {
    expect(typography).toContain('.hero h1');
    expect(typography).toContain('.hero-copy { text-shadow: none; }');
    expect(typography).toContain('@media (max-width: 760px)');
  });

  it('keeps the booking card and wordmark usable on narrow mobile screens', () => {
    expect(typography).toContain('@media (max-width: 500px)');
    expect(typography).toContain('.journey-fields { grid-template-columns: 1fr; }');
    expect(typography).toContain('.journey-card > a { min-height: 3rem; }');
    expect(typography).toContain('.brand-mark { width: auto; height: auto; gap: 0.3rem; }');
  });
});
