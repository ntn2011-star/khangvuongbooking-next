# Xác minh cluster EVA Air — 2026-08-19

## Bài viết hạng ghế

Đã xác nhận route `/bai-viet/eva-air-hang-ghe-va-cach-chon` render hero WebP, nội dung hạng ghế, minh họa khoang thương gia/phổ thông, sidebar dịch vụ EVA Air và FAQ. Các liên kết dịch vụ gồm nâng hạng, chọn chỗ, mua/đặt vé và xác nhận vé đều sử dụng landing chuyên biệt theo hãng.

## Luồng nội dung tự động

Hub `/hang-bay-eva-air` tự nhận airline slug `eva-air` và hiển thị khối **Cẩm nang theo hãng**. Các bài cùng hãng được đưa vào hub bằng dữ liệu `getArticlesForAirline`, không phải liên kết viết tay tại template. Bài hạng ghế cũng lấy bài liên quan bằng `getRelatedArticles`, do đó chỉ hiển thị bài cùng hãng EVA Air.

## Ghi chú hình ảnh

Hero và minh họa khoang ghế dùng ảnh gốc tạo riêng theo bảng màu xanh lục–vàng trầm; không chứa tên hãng, logo hãng, watermark hoặc sơ đồ ghế được tuyên bố là chính thức. Các bài có nguồn chính thức EVA Air hiển thị rõ khối nguồn và ngày kiểm tra.
