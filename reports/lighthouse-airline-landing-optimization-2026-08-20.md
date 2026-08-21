# Báo cáo tối ưu Lighthouse — Landing hãng bay

**Phạm vi:** Các thay đổi dùng chung cho toàn bộ 66 landing hãng bay. Đo kiểm được thực hiện trên năm URL đại diện: hub 66 hãng, Vietnam Airlines, EVA Air, United Airlines và Vietjet Air. Các URL này cùng dùng template route động, header/footer, hero, asset origin và cấu hình ảnh như toàn bộ nhóm landing còn lại.

## Phương pháp đo

Các lần đo sử dụng Lighthouse mobile simulated throttling trên preview production. Một số baseline ban đầu không thể dùng cùng một preset cho EVA Air và Vietjet Air; các số liệu đó chỉ dùng để xác định điểm nghẽn, không dùng làm so sánh định lượng trực tiếp. Tệp dữ liệu gốc được lưu tại `audit_airline_lighthouse_baseline.csv`, `audit_airline_lighthouse_after.csv` và `audit_airline_lighthouse_final.csv`.

## Kết quả xác minh cuối

| URL đại diện | Performance | LCP | CLS | TBT | Transfer | SEO |
|---|---:|---:|---:|---:|---:|---:|
| `/hang-bay` | 87 | 3,31 s | 0,00066 | 86 ms | 388 KB | 100 |
| `/hang-bay-vietnam-airlines` | 87 | 3,30 s | 0,00109 | 104 ms | 593 KB | 100 |
| `/hang-bay-eva-air` | 85 | 3,49 s | 0,0077 | 85 ms | 466 KB | 100 |
| `/hang-bay-united-airlines` | 88 | 3,19 s | 0,00066 | 65 ms | 547 KB | Không đo trong preset cuối |
| `/hang-bay-vietjet-air` | 87 | 3,30 s | 0,00100 | 80 ms | 632 KB | 100 |

> Các phép đo là **lab data** trong môi trường Lighthouse mô phỏng mobile. Core Web Vitals thực tế sẽ thay đổi theo thiết bị, mạng và cache của người dùng; cần tiếp tục đối chiếu bằng Chrome UX Report hoặc Search Console sau khi domain production nhận lưu lượng.

## Cải thiện quan sát được

Hub `/hang-bay` cải thiện từ Performance **65** lên **87**. Transfer giảm từ khoảng **5,3 MB** xuống **388 KB**, trong khi LCP giảm từ **25,81 giây** xuống **3,31 giây**. Landing Vietnam Airlines cải thiện từ Performance **59** lên **87**; transfer giảm từ khoảng **13,1 MB** xuống **593 KB**, còn LCP từ **24,78 giây** xuống **3,30 giây**. Landing United Airlines tăng từ **63** lên **88**, với LCP từ **6,20 giây** xuống **3,19 giây**.

## Thay đổi đã áp dụng

| Nhóm tối ưu | Triển khai | Phạm vi ảnh hưởng |
|---|---|---|
| Hero LCP | Chuyển hero từ thẻ `img`/background ảnh kép sang `next/image`, preload ưu tiên, `sizes="100vw"` và chất lượng 70 | Toàn bộ route động theo slug |
| Định dạng & kích thước | Bật AVIF/WebP và remote image optimization của Next.js cho kho asset | Toàn bộ hero hãng/dịch vụ/điểm đến dùng template chung |
| Tải trùng | Bỏ `backgroundImage` trùng với ảnh hero hiển thị | Toàn bộ route động theo slug |
| Kết nối tài nguyên | Thêm `preconnect` và `dns-prefetch` đến kho asset | Toàn site |
| Ảnh dưới fold | Cabin, logo card và logo footer dùng `loading="lazy"`, `decoding="async"` và ưu tiên thấp | 66 hub hãng và hub danh mục |
| HTML gốc | Thay logo base64 lặp lại trong header/footer bằng logo WebP 8,8 KB có cache | Toàn site |
| Bảo vệ regression | Bổ sung `airline-performance-contract.test.ts` để giữ Next Image, remote formats, preload kết nối, lazy cabin/logo và không tái lập background hero trùng | Bộ test dự án |

## Điểm còn cần theo dõi

LCP cuối vẫn quanh 3,19–3,49 giây trong môi trường mobile mô phỏng. Tài nguyên nặng nhất còn lại là hero khoảng 276 KB ở Vietnam Airlines; các trang hub cũng còn DOM lớn và một phần JavaScript legacy/chưa dùng. Các thay đổi tiếp theo nên được quyết định từ dữ liệu người dùng thật, để không đánh đổi nội dung SEO hoặc hình ảnh nhận diện hãng chỉ vì điểm lab.

## Xác nhận kỹ thuật

TypeScript không lỗi. Toàn bộ **29 file kiểm thử với 62 test** đều đạt; production build thành công với **2.571 trang tĩnh**. Các test bảo toàn sitemap, theme theo hãng, hero/cabin mapping 66 hãng, ngoại lệ United Airlines và SEO landing vẫn đạt.
