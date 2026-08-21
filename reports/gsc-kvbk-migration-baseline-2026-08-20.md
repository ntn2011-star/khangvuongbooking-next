# Baseline migration SEO từ Google Search Console

Property đã xác minh để phân tích là `https://khangvuongbooking.com/`. Lần export chỉ đọc ngày 20-08-2026 lấy dữ liệu trong khoảng 27-05-2025 đến 20-08-2026, gồm **1.604 URL có dữ liệu**, **14.369 lượt click**, **1.329.302 lượt hiển thị**, **19.138 cặp URL–truy vấn** và **2 sitemap**. Dữ liệu gốc lưu tại `gsc-seo-url-performance.json` và `gsc-seo-url-performance.csv`.

| Nhóm công việc | Kết quả baseline | Quyết định migration |
|---|---:|---|
| URL có dữ liệu GSC | 1.604 | Là tập URL ưu tiên, không chỉ dựa vào crawl URL lịch sử. |
| URL cần rà intent | 405 khi đối chiếu với preview đầy đủ | Không áp dụng redirect hàng loạt vào trang chung; rà theo từ khóa/trang đích. |
| URL lỗi mapping thô | 12 | Gồm 1 URL `/v` và 11 file ảnh cũ có 0 click, 1–2 impression; không redirect ảnh sang landing không liên quan. |
| URL có điểm SEO cao cần ưu tiên | Tuyến bay thành phố, hotline/đại lý theo hãng, đổi vé, giới thiệu doanh nghiệp | Tạo landing cụ thể hoặc remap sang hub dịch vụ/hãng/điểm đến gần intent nhất. |

Review song song theo 5 lô URL đã tạo các đề xuất `keep_existing`, `remap_existing`, `create_specific_landing`, `retain_asset` và `retire_low_value`. Các đề xuất là đầu vào rà kỹ thuật; chỉ các đích đã tồn tại hoặc landing mới có intent tương đương mới được đưa vào redirect 301 cuối.

> Không được đổi DNS, canonical production hoặc tắt website cũ cho đến khi báo cáo mapping cuối có trạng thái đã kiểm thử cho toàn bộ URL có click/impression.

## Trạng thái sau vòng materialize URL GSC

Từ review intent, hệ thống phân loại 1.604 URL GSC thành 908 URL chưa cần thay đổi mapping hiện có, 113 URL giữ đích đang có, 82 URL cần remap vào landing liên quan, 459 URL cần landing cụ thể, 26 URL giá trị thấp để nghỉ và 16 file asset giữ nguyên. Nhóm 459 URL cần landing cụ thể đã được tạo thành route tĩnh có cùng path trên Next.js, thay vì redirect vào một hub chung không đúng intent.

| Xác minh | Kết quả |
|---|---|
| Landing GSC kế thừa | 459 route tĩnh cùng URL cũ |
| Tổng trang tĩnh sau materialize | 3.014 |
| URL `ve-may-bay-ha-noi-di-hang-chau` | HTTP 200, prerendered |
| URL hub quốc tế cũ `/ve-may-bay/quoc-te` | HTTP 301 đến `/ve-may-bay-quoc-te` |
| TypeScript / unit test | Không lỗi; 66 test đạt, 1 external-health test được skip |

> Các route mới là lớp bảo toàn URL và intent ban đầu. Trước khi đổi DNS, 82 remap phải được duyệt theo đích đề xuất; 908 URL chưa review cũng phải có trạng thái cuối trong bảng master, đặc biệt các URL có click hoặc impression cao.
