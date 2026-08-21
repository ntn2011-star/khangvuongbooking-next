import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { proxy } from '../proxy';

describe('Open Graph routes', () => {
  it('không redirect ảnh Open Graph của hub hãng về HTML hub', () => {
    const response = proxy(new NextRequest('https://khangvuongbooking.com/hang-bay/opengraph-image'));
    expect(response.status).toBe(200);
  });
});
