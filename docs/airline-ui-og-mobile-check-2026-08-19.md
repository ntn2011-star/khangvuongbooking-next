# Kiểm tra giao diện, CTA và Open Graph hãng bay

## Xác minh desktop ban đầu

Trang chủ production hiển thị thẻ kiểm tra hành trình với lớp nền nhẹ hơn, nên hình banner có thể nhìn xuyên qua trong khi nhãn, trường thông tin và CTA vẫn có viền/tương phản rõ. Landing đổi ngày vé EVA Air hiển thị thông điệp vị thế thương hiệu, CTA kiểm tra hành trình, rail yêu cầu dịch vụ theo theme xanh lục của hãng và các trường họ tên, số điện thoại, mã đặt chỗ, nội dung yêu cầu, câu hỏi bảo mật.

Rail yêu cầu dịch vụ không gửi dữ liệu vào landing. Khi người dùng hoàn tất câu hỏi bảo mật, trang chỉ khởi tạo ứng dụng email trên thiết bị để người dùng xem lại và chủ động gửi nội dung; hotline và liên kết booking là các CTA riêng.

## Mobile, Open Graph và FAQ

Ảnh chụp viewport 390 × 844 của `/hang-bay` cho thấy header, nút đặt vé, menu thu gọn, hero và phần giới thiệu 66 hãng đều hiển thị một cột, không có nội dung bị che khuất. Hub trả HTML với HTTP 200; thời gian phản hồi cục bộ sau khi production server đã sẵn sàng là khoảng 0,013 giây cho tài liệu HTML 287.858 byte.

Ảnh Open Graph `/hang-bay/opengraph-image` đã được loại khỏi middleware redirect và trả HTTP 200 `image/png` (87.860 byte trong kiểm tra cục bộ). Nội dung ảnh dùng tiêu đề “66 hãng bay chủ lực”, các chip hãng ưu tiên và thông điệp thành lập từ 2008/18 năm đồng hành. Landing tổng đài Vietnam Airlines hiển thị form có câu hỏi bảo mật và JSON-LD `FAQPage` với ba câu hỏi–trả lời định hướng; không công bố số liên hệ hãng khi chưa có nguồn riêng được kiểm chứng.
