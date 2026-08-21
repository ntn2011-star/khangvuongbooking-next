# Xác minh theme Khang Vuong Booking

Ngày 2026-08-19, bản production đã được kiểm tra trên trang chủ và landing `/hang-bay-eva-air`.

Trang chủ hiển thị logo Khang Vuong Booking do người dùng cung cấp trong header/footer, hero nền ảnh và thẻ kiểm tra hành trình bán trong suốt phía phải. Landing EVA Air áp dụng nền xanh lục đậm cùng điểm nhấn vàng theo token theme của hãng, trong khi văn bản nội dung và các thẻ liên quan giữ nền sáng để đảm bảo khả năng đọc.

Kiểm tra tiếp theo cần xác nhận ít nhất một landing quốc gia đại diện cho theme theo màu quốc kỳ và bố cục mobile.

Lưu ý kỹ thuật: workspace hiện tại là source Next.js độc lập. URL tài sản `/manus-storage/...` được chuẩn bị theo quy ước triển khai managed web nhưng không được proxy trong preview Next.js tạm thời, vì vậy preview cục bộ trả 404 khi mở trực tiếp URL tài sản. Source vẫn giữ URL tài sản theo quy ước triển khai; cần kiểm tra lại hero sau khi import source vào project web được quản lý hoặc môi trường có storage proxy tương ứng.
