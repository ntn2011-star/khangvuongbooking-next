# Rà soát cấu trúc hub vé du học sinh tham chiếu

**Nguồn tham chiếu:** https://aivivu.vn/ve-may-bay-du-hoc-sinh, kiểm tra ngày 2026-08-18.

## Thành phần cấu trúc công khai quan sát được

| Nhóm | Mục đích cấu trúc có thể học hỏi | Cách áp dụng riêng cho Khang Vuong Booking |
|---|---|---|
| Hero | Nêu rõ nhu cầu du học sinh và CTA tìm chuyến | Hero riêng, không sao chép thông điệp, giá hay ưu đãi |
| Hãng bay | Các thẻ/điểm vào theo hãng | Liên kết đến `/ve-du-hoc-sinh-{hang}` với nội dung chỉ xác minh theo chính sách hãng |
| Khu vực | Tabs Châu Mỹ, Châu Âu, Châu Á | Hub khu vực dẫn đến quốc gia, thành phố, sau đó đến trường có nguồn mở |
| Đường bay | Điểm vào theo chặng bay phổ biến | Dùng landing theo điểm đi Việt Nam → thành phố/quốc gia, không công bố giá hay thời gian bay không kiểm chứng |
| Biểu mẫu tư vấn | Thu thập quốc gia, tên trường, ngày bay, hãng ưu tiên và yêu cầu | Sẽ thiết kế riêng khi có backend/form an toàn; không tái sử dụng bố cục, trường bắt buộc hay nội dung tham chiếu |
| FAQ | Giải thích hành lý, điều kiện và thời điểm đặt vé | FAQ riêng, chỉ trả lời khi có nguồn chính thức và ngày hiệu lực |

## Kết luận thiết kế

Hub Khang Vuong Booking sẽ sử dụng ba trục điều hướng: **khu vực/quốc gia**, **hãng bay** và **trường đã xác minh nguồn mở**. Mỗi landing trường cần hiển thị nguồn, ngày kiểm tra và liên kết về hub quốc gia/hãng liên quan. Không sao chép nội dung, hình ảnh, giá, ưu đãi, hotline, tuyên bố hành lý hoặc thông tin liên hệ của trang tham chiếu.
