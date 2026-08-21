# Triển khai Khang Vuong Booking

## Hạ tầng Manus và domain chính thức

Mã nguồn là ứng dụng Next.js độc lập. Khi triển khai trên hạ tầng Manus, hãy gắn domain `khangvuongbooking.com` trong phần quản lý domain của dự án và đặt hai biến môi trường trong bước build:

```bash
NEXT_PUBLIC_SITE_URL=https://khangvuongbooking.com
NEXT_PUBLIC_BOOKING_URL=https://khangvuongbooking.com
NEXT_PUBLIC_STATIC_ASSET_ORIGIN=https://your-kvbk-static-asset-origin.example
NEXT_PUBLIC_AIRLINE_LOGO_CDN=https://your-kvbk-static-asset-origin.example
```

`proxy.ts` giữ logic chuyển hướng 301 cho URL lịch sử. Trước khi build production, upload tất cả file trong `reports/kvbk-static-asset-manifest.csv` vào kho asset của chính project Khang Vuong Booking và đặt hai origin asset về host đó. Không dùng static asset host của website/project khác. Sau khi domain được gắn, cần kiểm tra lại sitemap, robots, canonical, ảnh Open Graph và một mẫu URL lịch sử trước khi thay đổi DNS.

## Chuyển sang máy chủ riêng

Ứng dụng không phụ thuộc database hoặc dịch vụ runtime riêng. Trên máy chủ có Node.js 22 hoặc mới hơn, chạy:

```bash
pnpm install --frozen-lockfile
NEXT_PUBLIC_SITE_URL=https://ten-mien-moi.example NEXT_PUBLIC_BOOKING_URL=https://ten-mien-moi.example pnpm build
pnpm start
```

Đặt reverse proxy HTTPS ở phía trước cổng do `next start` sử dụng. Mỗi lần thay domain chính thức, cần build lại với `NEXT_PUBLIC_SITE_URL` mới để cập nhật metadata, JSON-LD, sitemap, robots và Open Graph. Sau khi upload lại bộ logo và ảnh vào kho static của host mới, đặt `NEXT_PUBLIC_STATIC_ASSET_ORIGIN` và `NEXT_PUBLIC_AIRLINE_LOGO_CDN` về host đó. Không thay đổi hay xóa `proxy.ts`, `app/legacy-redirects.ts` hoặc các URL canonical trong quá trình chuyển máy chủ.

## Kiểm tra trước khi chuyển DNS

Kiểm tra HTTP 200 cho `/`, `/hang-bay`, `/sitemap.xml`, `/robots.txt` và một ảnh `/hang-bay/opengraph-image`. Kiểm tra HTTP 301 cho một URL lịch sử. Chỉ thay DNS khi canonical, chuyển hướng và CTA booking đều dùng domain chính thức mới.
