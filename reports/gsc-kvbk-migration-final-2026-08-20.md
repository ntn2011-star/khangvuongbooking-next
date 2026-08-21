# Báo cáo hoàn tất migration SEO — Khang Vuong Booking

## Phạm vi

Dữ liệu xuất từ Google Search Console property `https://khangvuongbooking.com/` trong giai đoạn 27-05-2025 đến 20-08-2026. Mục tiêu là giữ URL và ý định tìm kiếm khi thay website cũ bằng Next.js, không dồn nhiều trang khác intent về một hub chung.

> Mapping đúng giúp giảm rủi ro mất tín hiệu SEO nhưng không thể bảo đảm nguyên vẹn thứ hạng Google. Cần theo dõi index, 404, canonical và hiệu suất page/query sau cutover.

## Quyết định cuối cho URL GSC

| Quyết định | Số URL | Click lịch sử | Impression lịch sử |
|---|---:|---:|---:|
| Tạo landing cùng URL cũ | 1.055 | 5.849 | 570.010 |
| Giữ route hiện có | 141 | 5.425 | 371.141 |
| 301 đến route tương đương | 134 | 3.094 | 317.698 |
| Giữ asset | 22 | 0 | 164 |
| Nghỉ URL giá trị thấp | 252 | 1 | 70.289 |
| **Tổng** | **1.604** | **14.369** | **1.329.302** |

**1.055 URL** được materialize thành landing tĩnh với đúng path cũ. **134 URL** có redirect 301 đến route tương đương đã tồn tại trong production build. Remap không có đích hợp lệ được đổi sang giữ URL/tạo landing, nên validation không còn entry bị từ chối.

## Xác minh kỹ thuật

| Hạng mục | Kết quả |
|---|---|
| Route prerender trong build | 3.600 |
| Landing GSC cùng path URL cũ | 1.055 |
| 301 GSC đã kiểm tra đích build | 134 |
| 301 bị từ chối | 0 |
| TypeScript | Không lỗi |
| Vitest | 68 test đạt; 1 external-health test được skip vì sandbox trả HTTP 451 |
| Runtime mẫu | Landing GSC HTTP 200; remap GSC HTTP 301; sitemap chứa URL GSC |

## File kiểm soát

| File | Vai trò |
|---|---|
| `reports/gsc-kvbk-migration-master.csv` | Quyết định cuối cho 1.604 URL GSC. |
| `app/gsc-legacy-pages.ts` | Các landing GSC giữ cùng path. |
| `app/gsc-remaps.ts` | Chỉ gồm 134 redirect có đích build. |
| `reports/gsc-remap-validation.json` | Bằng chứng kiểm tra redirect. |
| `proxy.ts` | Ưu tiên route GSC materialize, chỉ redirect khi cần. |

## Trạng thái

**Chưa đổi DNS.** Website cũ cần tiếp tục hoạt động đến khi người quản trị phê duyệt cutover và thực hiện checklist kèm theo.
