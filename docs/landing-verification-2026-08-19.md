# Kiểm tra landing Khang Vuong Booking

## Trang chủ

Trang chủ sử dụng logo Khang Vuong Booking tại header/footer và thẻ kiểm tra hành trình bán trong suốt ở phía phải hero. Typography dùng Be Vietnam Pro với thang cỡ chữ và nhịp dòng chung.

## EVA Air

Landing `/hang-bay-eva-air` hiển thị theme xanh lục–vàng theo dữ liệu hãng và liên kết đến 17 landing dịch vụ riêng theo EVA Air. Nội dung, CTA kiểm tra hành trình và footer hiển thị đầy đủ.

## Vé quốc tế

Hub `/ve-may-bay/quoc-te` hiển thị các điểm vào theo bảy khu vực và duy trì header/footer/điều hướng thống nhất. Cần tiếp tục kiểm tra hub vé về Việt Nam và du học sinh ở bước sau.

## Vé từ nước ngoài về Việt Nam

Hub `/ve-tu-nuoc-ngoai-ve-viet-nam` hiển thị các landing theo thị trường, Hà Nội, TP. Hồ Chí Minh và các thành phố quốc tế. Theme gradient sử dụng đỏ-xanh theo hệ nhận diện chung và CTA kiểm tra hành trình hoạt động.

## Vé du học sinh

Hub `/ve-du-hoc-sinh` hiển thị liên kết theo khu vực, ba landing trường có nguồn mở và các landing theo hãng bay. Bố cục, typography, CTA và footer nhất quán với các hub còn lại.

## Lưu ý preview

Trong preview source độc lập, URL tài sản `/manus-storage/...` không được proxy, nên hình logo có thể hiển thị trạng thái lỗi dù header/footer vẫn giữ đúng thẻ ảnh và URL tài sản. Thẻ hành trình bán trong suốt, hero layout và toàn bộ CSS vẫn được render. Cần kiểm tra lại logo/ảnh nền trong một project web được quản lý có storage proxy trước khi phát hành chính thức.

## Khắc phục logo

Đã thay thẻ ảnh logo phụ thuộc `/manus-storage` bằng wordmark Khang Vuong Booking nhúng trực tiếp trong source, gồm biểu tượng máy bay, dòng Khang Vuong đỏ và Booking xanh. Bản production xác nhận wordmark hiển thị tại cả header và footer, không còn trạng thái ảnh lỗi trong preview source độc lập.

## Logo người dùng cung cấp lại

Logo mới đã được tối ưu thành WebP 560 × 102 px, nền trong suốt và kiểm tra trực tiếp có đầy đủ biểu tượng máy bay xanh/đỏ cùng wordmark Khang Vuong Booking. Ảnh khi tải từ miền kho tài sản ngoài có kích thước hợp lệ trong DOM nhưng phần hiển thị preview không ổn định, vì vậy cần chuyển sang cơ chế nhúng trực tiếp tệp đã tối ưu để tránh phụ thuộc miền ngoài.

## Xem trước banner cục bộ

Logo chính xác hiển thị ổn định ở header sau khi nhúng data URI từ WebP đã tối ưu. Bộ chọn `Thử ảnh banner` đã được kiểm tra bằng một ảnh hàng không: trạng thái chuyển thành `Đang xem trước ảnh từ máy của bạn`, hero đổi nền ngay lập tức và nút `Khôi phục ảnh mặc định` xuất hiện. Ảnh chỉ tồn tại cục bộ trong phiên trình duyệt, không được tải lên máy chủ hoặc tự xuất bản.

Đã nhấn nút khôi phục và xác nhận hero quay về ảnh mặc định; trạng thái xem trước cùng nút khôi phục biến mất. Trường chọn tệp có thể vẫn hiện tên tệp của trình duyệt nhưng không còn được dùng làm nền hero.

## Hero hai ảnh và lớp trong suốt

Banner sân bay thứ hai do người dùng cung cấp đã được chuẩn hóa WebP 1920×720 và thêm vào chu kỳ hero. Trên production, ảnh nền mặc định hiển thị rõ hơn sau khi giảm lớp phủ; thẻ hành trình vẫn giữ chữ, nhãn trường và CTA có thể đọc được nhờ nền glass mờ thay vì nền đặc.

Kiểm tra ban đầu cho thấy lớp hero vẫn đang dùng ảnh đầu tiên sau một chu kỳ dự kiến. Cần xác nhận thiết lập `prefers-reduced-motion` của môi trường preview trước khi kết luận chuyển động bị lỗi, vì thiết kế có chủ động dừng luân phiên khi người dùng yêu cầu giảm chuyển động.

Thiết lập giảm chuyển động của preview đang tắt, nhưng phép đo opacity sau 8,5 giây vẫn là lớp chính `1` và lớp phụ `0`. Đã chuyển sang điều tra trạng thái animation CSS trước khi bàn giao, nhằm không tuyên bố hero luân phiên khi chưa hoạt động thực tế.

Cơ chế cuối cùng dùng hai lớp ảnh CSS đã được xác minh hoạt động: trạng thái transition có lớp chính opacity khoảng `0,37` và lớp phụ khoảng `0,63`; ảnh sân bay gia đình do người dùng cung cấp hiển thị đầy đủ ở hero. Lớp phủ nhẹ và thẻ hành trình glass vẫn giữ tiêu đề, nhãn và CTA có thể đọc được. Người dùng bật giảm chuyển động sẽ chỉ thấy ảnh đầu tiên, không có luân phiên.
