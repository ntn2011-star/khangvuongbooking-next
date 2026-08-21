# Kiểm toán SEO — Landing hỗ trợ EVA Air

## Phạm vi

Hai landing được rà soát là `/so-dien-thoai-tong-dai-eva-air` và `/dia-chi-van-phong-eva-air`. Cả hai dùng template landing động chung với canonical tuyệt đối theo `https://khangvuongbooking.com`, mô tả riêng, Open Graph image 1200 × 630, `robots: index, follow`, cùng graph `WebPage`, `BreadcrumbList`, `ItemList` và `FAQPage`.

## Kết quả kiểm tra trước tối ưu

Landing tổng đài đang render title, description, canonical tuyệt đối, Open Graph URL/image/alt và Twitter Card lớn. JSON-LD bao gồm citation tới hai trang Contact EVA Air, breadcrumb hai cấp, danh sách landing liên quan và FAQ với câu trả lời hiển thị trên trang. Điểm cần nâng cấp là phân biệt kiểu trang thông tin khỏi `og:type: article`, bổ sung trường ngày cập nhật và thực thể `Organization`/`WebPage` liên kết chặt chẽ hơn, đồng thời kiểm thử metadata/JSON-LD như một contract tự động.

## Ràng buộc nội dung

Khối phản hồi khách hàng chỉ được hiển thị dữ liệu được xác thực và có sự cho phép công khai. Không được tạo, seed hoặc hardcode đánh giá, điểm số hay lời chứng thực mô phỏng.

Biểu mẫu đặt vé nhanh là biểu mẫu chuyển tiếp phía trình duyệt đến hệ thống booking chính thức; không thu thập hay gửi dữ liệu cá nhân vào website này. Vì không có endpoint nhận dữ liệu, biểu mẫu không lưu dữ liệu người dùng và không cần cơ chế CAPTCHA máy chủ.

## Xác minh sau triển khai

Landing tổng đài EVA Air hiển thị khung phản hồi khách hàng với thông báo minh bạch rằng chỉ dữ liệu xác thực mới được công bố; không có điểm số, tên hay lời chứng thực mô phỏng. Ngay sau đó là biểu mẫu đặt vé nhanh gồm loại hành trình, điểm đi/đến, ngày bay, ngày về theo loại hành trình và nhóm hành khách. Nút hành động chuyển sang hệ thống booking chính thức; ghi chú trên giao diện nêu rõ form không gửi hoặc lưu dữ liệu cá nhân tại landing này.

Trên môi trường preview production, hai landing đều render canonical tuyệt đối, `robots: index, follow`, Open Graph `website` với ảnh 1200 × 630, Twitter Card `summary_large_image`, và graph gồm `WebPage`, `WebSite`, `Organization`, `BreadcrumbList`, `ItemList`, `FAQPage`. Mỗi `WebPage` liên kết đúng thực thể EVA Air, nguồn Contact chính thức, hình Open Graph và ngày cập nhật `2026-08-19`.

Biểu mẫu đặt vé nhanh có xử lý submit phía trình duyệt, không khai báo `action` gửi dữ liệu. Các trường điểm đi, điểm đến và ngày đi đều bắt buộc; ngày về bắt buộc khi chọn khứ hồi. Khi để trống, native validation của trình duyệt chặn thao tác tiếp tục. Khu vực trạng thái dùng `aria-live="polite"` và ghi chú quyền riêng tư hiển thị trực tiếp bên dưới nút hành động.
