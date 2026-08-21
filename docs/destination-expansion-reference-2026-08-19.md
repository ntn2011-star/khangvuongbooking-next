# Taxonomy điểm đến — ghi chú tham chiếu công khai

Nguồn tham chiếu hiển thị hub quốc gia và thành phố theo bảy nhóm: Châu Á, Châu Âu, Châu Mỹ, Châu Phi, Châu Đại Dương, Trung Đông và Nam Á. Cấu trúc này phù hợp để mở rộng điều hướng phân cấp của Khang Vuong Booking, nhưng không sao chép nội dung, ảnh, cờ hoặc thông tin thương hiệu.

Nhóm ưu tiên mở rộng đợt đầu được chọn từ các thị trường có sẵn liên kết quốc tế trong dự án và các tuyến thường được tổ chức tại hub tham chiếu: Thái Lan, Singapore, Malaysia, Indonesia, Philippines, Ấn Độ, Hồng Kông, Pháp, Anh, Đức, Ý, Tây Ban Nha, Hà Lan, Thụy Sĩ, New Zealand, Các Tiểu Vương Quốc Ả Rập Thống Nhất, Qatar, Thổ Nhĩ Kỳ, Ai Cập và Nam Phi.

Các thành phố tương ứng sẽ được đặt dưới landing quốc gia phù hợp, với title, canonical, theme và liên kết nội bộ riêng. Thông tin giá, hãng khai thác, visa, hành lý hoặc ưu đãi chỉ được đưa vào khi có nguồn và ngày xác minh riêng.

Nguồn cấu trúc: https://aivivu.vn/diem-den

Danh sách thành phố công khai cho thấy các cụm quan trọng gồm Bangkok, Phuket, Singapore, Kuala Lumpur, Manila, Phnom Penh, Tokyo, Osaka, Seoul, Hồng Kông, Dubai, Doha, Istanbul, Amsterdam, Barcelona, Zurich, Vienna, Cairo, Johannesburg, cùng các thành phố Bắc Mỹ, Úc và Đông Á. Hệ thống Khang Vuong Booking đã mở rộng các trang quốc gia/thành phố ưu tiên theo các cụm này, nhưng không sao chép thông tin giá hoặc mã sân bay trong nguồn tham chiếu.

## Kiểm tra landing dịch vụ con

Landing `/doi-ngay-ve-eva-air` hiển thị template chung với font Be Vietnam Pro, wordmark nhúng trực tiếp, theme xanh lục–vàng của EVA Air, checklist dịch vụ, CTA tới kênh booking chính thức và các liên kết hub. Kiểm thử tự động xác nhận toàn bộ cặp dịch vụ × hãng có page và được phân giải theme theo hãng.

## Kiểm tra CTA đặt vé

Trang chủ có thẻ kiểm tra hành trình với hai tab, bốn trường thông tin và hai CTA giao dịch: `Mở hệ thống đặt vé` và `Kiểm tra hành trình`. Cả hai CTA đều trỏ đến `https://khangvuongbooking.com/`; CTA thứ ba chỉ điều hướng nội bộ đến hub vé máy bay. Responsive CSS tại breakpoint 500px chuyển bốn trường về một cột, tăng kích thước vùng chạm cho tab và CTA, đồng thời giữ wordmark không bị bó hẹp.

Kiểm tra thực tế bằng iframe cùng origin ở viewport 371px xác nhận cụm trường hành trình còn một cột, CTA có chiều cao 48px, wordmark rộng khoảng 117px và CTA tiếp tục trỏ đến `https://khangvuongbooking.com/`.
