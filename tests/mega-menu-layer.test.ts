import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const styles = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

describe('mega-menu layer contract', () => {
  it('keeps the header and its open dropdown above landing hero layers', () => {
    expect(styles).toContain('.header { z-index: 1000; isolation: isolate; }');
    expect(styles).toContain('.mega-trigger[open] { z-index: 2; }');
    expect(styles).toContain('.mega-panel { z-index: 3; opacity: 1; pointer-events: auto; }');
  });

  it('retains an opaque interactive dropdown surface', () => {
    expect(styles).toContain('background: #fffdf8');
    expect(styles).toContain('pointer-events: auto');
  });
});
