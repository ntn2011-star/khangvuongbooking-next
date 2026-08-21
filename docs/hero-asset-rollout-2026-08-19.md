# Rollout Asset Hero và Nội dung SEO

## Nguyên tắc

Ảnh hero là minh họa gốc, không có chữ, logo, đồng phục hay livery nhận diện chính xác của hãng. Vùng trái của ảnh luôn chừa khoảng an toàn cho tiêu đề; đối tượng dịch vụ hoặc thành phố nằm chủ yếu ở nửa phải.

## Asset dịch vụ đã tạo

| Nhóm | Asset được gắn |
|---|---|
| Đổi ngày vé | `/manus-storage/kvbk-service-doi-ngay_b50334f3.png` |
| Hành lý | `/manus-storage/kvbk-service-hanh-ly_0e0c68df.png` |
| Nâng hạng | `/manus-storage/kvbk-service-nang-hang_a1e944e9.png` |
| Xe lăn | `/manus-storage/kvbk-service-xe-lan_0f9e2255.png` |
| Thú cưng | `/manus-storage/kvbk-service-thu-cung_a4aa2f73.png` |
| Sửa tên | `/manus-storage/kvbk-service-sua-ten_3e8c5d21.png` |
| Check-in/chọn chỗ | `/manus-storage/kvbk-service-checkin-choncho_804fceb3.png` |
| Trẻ em/người cao tuổi | `/manus-storage/kvbk-service-tre-em-nguoi-gia_1aeb53ca.png` |
| Visa/nhập cảnh | `/manus-storage/kvbk-service-visa-nhapcanh_c985ed34.png` |
| Tổng đài | `/manus-storage/kvbk-service-tongdai_989df5ab.png` |
| Đặt vé | `/manus-storage/kvbk-service-dat-ve_7516ebec.png` |
| Hỗ trợ tiếng Anh | `/manus-storage/kvbk-service-ho-tro-tieng-anh_b2335f45.png` |
| Văn phòng/đại lý | `/manus-storage/kvbk-service-van-phong_43bb2870.png` |
| Xác nhận booking | `/manus-storage/kvbk-service-xac-nhan-ve_99865001.png` |
| Vé về Việt Nam | `/manus-storage/kvbk-service-ve-ve-viet-nam_441eac3c.png` |

## Kiểm tra preview

Landing `/doi-ngay-ve-eva-air` đã render thành công với hero asset theo dịch vụ, theme EVA Air, rail yêu cầu dịch vụ và nội dung hướng dẫn SEO. Các URL asset mới được lưu trực tiếp trong cấu hình `getHeroAsset()` để tiếp tục dùng khi chuyển sang domain chính thức.

## Chẩn đoán hero hub EVA Air

- Template hub nhận đúng URL `background-image` của asset EVA Air tham chiếu từ VeBayDiMy.
- Trình duyệt ghi nhận request asset trong Resource Timing; cần đối chiếu ảnh chụp sạch để xác nhận lớp hiển thị thực tế, thay vì tiếp tục điều chỉnh crop hoặc canvas.
- Asset được mở trực tiếp và xác minh là cảnh EVA Air full-bleed gồm máy bay cùng tiếp viên. Cấu trúc `background-image` trong hub độc lập không hiển thị ổn định, vì vậy hero sẽ dùng phần tử ảnh trực tiếp với lớp gradient riêng.
- Phần tử ảnh trực tiếp đã tải hoàn tất (2048×878), phủ đúng khung hero; vấn đề còn lại thuộc lớp xếp chồng/pseudo của section, không phải URL asset hay crop ảnh.
