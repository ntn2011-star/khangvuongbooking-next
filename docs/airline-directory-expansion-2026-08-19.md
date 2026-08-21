# Mở rộng Directory 66 Hãng Bay

## Nguyên tắc triển khai

Trang tham chiếu công khai cho thấy mô hình danh mục gồm nhóm hãng hàng không, điểm vào các trang hãng/dịch vụ và các liên kết điều hướng liên quan. Khang Vuong Booking chỉ sử dụng mô hình phân cấp này làm định hướng UX; nội dung, typography, thông điệp vị thế, đường dẫn và nhận diện đều được viết lại độc lập. Không sao chép logo, nội dung mô tả, tuyên bố quan hệ đại lý hay tài sản thương hiệu của trang tham chiếu.

## Kết quả triển khai

Danh mục hiện có 66 hãng bay chủ lực; 14 hãng được đặt ở nhóm ưu tiên đầu danh sách theo thứ tự nghiệp vụ, bắt đầu với Vietnam Airlines, Vietjet Air, EVA Air, Korean Air, All Nippon Airways, Japan Airlines, Singapore Airlines và Cathay Pacific. Mỗi hãng được sinh thành hub riêng cùng 19 landing dịch vụ: đặt vé, đổi ngày, hành lý, sửa tên, nâng hạng, check-in/chọn chỗ, xe lăn, thú cưng, hỗ trợ tiếng Anh, trẻ em đi một mình, booking visa, booking nhập cảnh, tổng đài, văn phòng, đại lý, người cao tuổi, xác nhận vé và hai luồng vé về Việt Nam.

## Xác minh giao diện

Trang `/hang-bay` có thông điệp Khang Vuong Booking thành lập năm 2008, 18 năm đồng hành, 66 hãng chủ lực; directory hiển thị card hãng, điều hướng theo nhu cầu và bộ tìm kiếm tại chỗ. Kiểm tra với truy vấn `qatar` chỉ còn lại Qatar Airways, đồng thời cập nhật trạng thái “Hiển thị 1 / 66 hãng bay”.
