# Nguyên tắc cấu trúc landing quốc tế

Các trang tham chiếu công khai cho thấy một mô hình điều hướng theo **quốc gia → thành phố → thông tin hành trình**. Dự án Khang Vuong Booking áp dụng mô hình taxonomy này theo nhận diện, nội dung và dữ liệu riêng; không sao chép nội dung, bảng giá, hotline, hình ảnh hay tuyên bố dịch vụ của bên tham chiếu.

## Cấu trúc được áp dụng

| Cụm landing | Cấu trúc URL nền tảng | Hướng mở rộng an toàn |
|---|---|---|
| Vé quốc tế đi | `/ve-may-bay-tu-{diem-di}-di-{quoc-gia-hoac-thanh-pho}` | Hãng, hạng vé, chiều bay, nhóm hành khách sau khi có dữ liệu phù hợp |
| Vé về Việt Nam | `/ve-may-bay-tu-{quoc-gia-hoac-thanh-pho}-ve-{diem-den}` | Hãng khai thác chỉ khi đã xác minh phù hợp với hành trình |
| Hãng bay | `/hang-bay-{hang}` → `/{dich-vu}-{hang}` | Một hub hãng làm trang cha cho toàn bộ dịch vụ chuyên biệt |
| Du học sinh | `/ve-du-hoc-sinh-{hang}` và hub khu vực | Dữ liệu trường học, ưu đãi, hành lý chỉ được thêm sau khi có nguồn chính thức |

## Kiểm soát nội dung

Không đưa giá vé, thời gian bay, hành lý miễn cước, yêu cầu visa, lộ trình khai thác hoặc ưu đãi dành cho du học sinh nếu chưa có nguồn xác thực ở thời điểm xuất bản. Những dữ liệu này cần có lịch cập nhật, nguồn lưu trữ và trường hiệu lực riêng trước khi hiển thị trên landing.
