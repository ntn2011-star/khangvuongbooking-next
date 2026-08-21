# Rà soát nguồn logo cho danh mục hãng bay

Nguồn tham chiếu Logos-World tự công bố bản quyền đối với nội dung và hình ảnh của họ. Vì vậy, website Khang Vuong Booking không hotlink, tải lại hoặc sao chép trực tiếp asset từ Logos-World khi chưa có giấy phép bằng văn bản.

Phương án triển khai an toàn là sử dụng nhận diện chữ và màu theo hãng trong giao diện, đồng thời thiết kế sẵn lớp hiển thị logo có fallback. Khi Khang Vuong Booking cung cấp bộ logo đã được cấp quyền hoặc xác nhận quyền dùng logo từ từng hãng, các asset sẽ được thay vào đúng vị trí thông qua kho asset của dự án, không cần thay đổi cấu trúc giao diện.

Trang tham chiếu: https://logos-world.net/ (kiểm tra ngày 2026-08-19).

## Triển khai nhận diện an toàn

Hub 66 hãng hiện dùng cloud nhận diện chữ/màu cho 12 hãng ưu tiên ở góc phải của hero và nameplate có tên hãng trong directory, thay cho monogram hai ký tự. Cloud được đặt dưới lớp tiêu đề nên không chồng lên breadcrumb, tiêu đề hoặc mô tả; ở mobile cloud được ẩn để ưu tiên khả năng đọc. Đây là cấu trúc fallback, có thể thay bằng các logo gốc ngay khi Khang Vuong Booking cung cấp bộ asset đã được cấp quyền.
