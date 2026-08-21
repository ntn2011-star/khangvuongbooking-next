import { describe, expect, it } from 'vitest';
import { airlineServices, pages } from '../app/content';

describe('airline and route landing matrix', () => {
  it('đưa toàn bộ dịch vụ con vào hub EVA Air', () => {
    const evaHub = pages['hang-bay-eva-air'];
    expect(evaHub).toBeDefined();
    expect(evaHub.related).toHaveLength(airlineServices.length);
    expect(evaHub.related?.map((item) => item.slug)).toEqual(expect.arrayContaining([
      'dat-ve-may-bay-eva-air',
      'mua-them-hanh-ly-eva-air',
      'doi-ngay-ve-eva-air',
      'nang-hang-ve-eva-air',
      'sua-ten-ve-eva-air',
      've-thu-cung-eva-air',
      'chon-cho-eva-air',
      'xe-lan-eva-air',
      'tre-em-di-mot-minh-eva-air',
      'xac-nhan-ve-eva-air',
      'so-dien-thoai-tong-dai-eva-air',
      'dia-chi-van-phong-eva-air',
    ]));
  });

  it('tạo tổ hợp URL mẫu cho vé đi, vé về Việt Nam và du học sinh', () => {
    expect(pages['ve-may-bay-tu-ha-noi-di-new-york']).toBeDefined();
    expect(pages['ve-thuong-gia-di-new-york']).toBeDefined();
    expect(pages['ve-tre-em-di-nhat-ban']).toBeDefined();
    expect(pages['ve-may-bay-tu-tokyo-ve-da-nang']).toBeDefined();
    expect(pages['ve-may-bay-tu-my-ve-viet-nam-eva-air']).toBeDefined();
    expect(pages['ve-du-hoc-sinh-qatar-airways']).toBeDefined();
  });

  it('tạo landing trường du học từ nguồn mở có thể kiểm tra', () => {
    const mit = pages['ve-du-hoc-sinh-mit'];
    expect(mit).toBeDefined();
    expect(mit.sourceReferences?.[0]).toMatchObject({
      label: 'MIT — About MIT',
      url: 'https://www.mit.edu/about/',
      checkedAt: '2026-08-18',
    });
    expect(pages['ve-du-hoc-sinh'].related?.map((item) => item.slug)).toEqual(expect.arrayContaining([
      've-du-hoc-sinh-mit',
      've-du-hoc-sinh-ucla',
      've-du-hoc-sinh-university-of-washington',
    ]));
  });
});
