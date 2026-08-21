import { NextRequest } from 'next/server';
import { describe, expect, it } from 'vitest';
import { proxy } from '../proxy';

describe('SEO redirect proxy', () => {
  it('chuyển URL lịch sử sang danh mục tương ứng bằng 301', () => {
    const response = proxy(new NextRequest('https://khangvuongbooking.com/doi-ve-may-bay-vietjet-air'));
    expect(response.status).toBe(301);
    expect(response.headers.get('location')).toBe('https://khangvuongbooking.com/doi-ngay-ve-vietjet-air');
  });

  it('không chuyển hướng lại URL danh mục chuẩn', () => {
    const response = proxy(new NextRequest('https://khangvuongbooking.com/doi-ngay-ve'));
    expect(response.status).toBe(200);
    expect(response.headers.get('x-middleware-next')).toBe('1');
  });

  it('giữ landing mua thêm hành lý theo hãng là URL canonical độc lập', () => {
    const response = proxy(new NextRequest('https://khangvuongbooking.com/mua-them-hanh-ly-vietnam-airlines'));
    expect(response.status).toBe(200);
    expect(response.headers.get('x-middleware-next')).toBe('1');
  });

  it('giữ nguyên URL GSC đã materialize thay vì rơi vào fallback hành lý chung', () => {
    const response = proxy(new NextRequest('https://khangvuongbooking.com/mua-them-hanh-ly-ana-nippon-airways'));
    expect(response.status).toBe(200);
    expect(response.headers.get('x-middleware-next')).toBe('1');
  });

  it('chỉ remap URL GSC khi có đích landing cụ thể đã build', () => {
    const response = proxy(new NextRequest('https://khangvuongbooking.com/doi-ve-may-bay-air-asia'));
    expect(response.status).toBe(301);
    expect(response.headers.get('location')).toBe('https://khangvuongbooking.com/doi-ngay-ve');
  });

  it('chuyển URL đổi vé EVA cũ đến landing đổi ngày EVA Air riêng', () => {
    const response = proxy(new NextRequest('https://khangvuongbooking.com/doi-ve-may-bay-eva-air'));
    expect(response.status).toBe(301);
    expect(response.headers.get('location')).toBe('https://khangvuongbooking.com/doi-ngay-ve-eva-air');
  });

  it('chuyển mọi URL điểm đến cũ có nội địa về slug chuẩn không có nội địa', () => {
    const response = proxy(new NextRequest('https://khangvuongbooking.com/ve-may-bay-noi-dia-di-nha-trang?source=legacy'));
    expect(response.status).toBe(301);
    expect(response.headers.get('location')).toBe('https://khangvuongbooking.com/ve-may-bay-di-nha-trang?source=legacy');
  });

  it('chuyển hub quốc tế phân cấp cũ về URL phẳng chuẩn', () => {
    const response = proxy(new NextRequest('https://khangvuongbooking.com/ve-may-bay/quoc-te'));
    expect(response.status).toBe(301);
    expect(response.headers.get('location')).toBe('https://khangvuongbooking.com/ve-may-bay-quoc-te');
  });
});
