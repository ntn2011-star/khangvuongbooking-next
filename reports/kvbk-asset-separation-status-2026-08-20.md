# Trạng thái tách asset — Khang Vuong Booking

## Hoàn thành ở source code

Source runtime của Khang Vuong Booking hiện có **0 tham chiếu** đến host static asset của website/project khác. Toàn bộ URL `/manus-storage/...` được chuẩn hóa qua `NEXT_PUBLIC_STATIC_ASSET_ORIGIN`; logo hãng có thể dùng `NEXT_PUBLIC_AIRLINE_LOGO_CDN` hoặc cùng origin static của Khang Vuong Booking.

| Hạng mục | Trạng thái |
|---|---|
| `STATIC_ASSET_ORIGIN` hard-code ngoài project | Đã loại bỏ |
| Fallback logo hãng ngoài project | Đã loại bỏ |
| Hero, logo thương hiệu, ảnh bài EVA Air, footer EVA Air | Đã chuyển về path `/manus-storage/...` cấu hình được |
| `next.config.mjs` remote pattern ngoài project | Đã loại bỏ |
| TypeScript, Vitest, production build | Đạt; 68 test pass, 1 test external-health skip |
| Route static/SSG trong build | 3.601 |

## Việc cần thực hiện trên project Manus Khang Vuong Booking mới

Manifest `reports/kvbk-static-asset-manifest.csv` liệt kê **262 file** asset phải được đưa vào kho static asset/S3 của chính project Khang Vuong Booking. Sau khi upload, đặt:

```bash
NEXT_PUBLIC_STATIC_ASSET_ORIGIN=https://<origin-asset-rieng-cua-khang-vuong-booking>
NEXT_PUBLIC_AIRLINE_LOGO_CDN=https://<origin-asset-rieng-cua-khang-vuong-booking>
```

Không gắn domain, không đổi DNS và không kiểm tra preview production trước khi 262 asset được sẵn sàng tại origin này. Khi project Manus riêng đã được tạo, manifest là danh sách đối chiếu để kiểm tra tải ảnh HTTP 200 trước cutover.
