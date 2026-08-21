# Rà soát cấu trúc hub hãng bay và điểm đến tham chiếu

**Nguồn tham chiếu:** https://aivivu.vn/dai-ly-phong-ve-hang và https://aivivu.vn/diem-den, kiểm tra ngày 2026-08-19.

## Kết quả quan sát

| Hub | Thành phần cấu trúc quan sát được | Cách áp dụng riêng cho Khang Vuong Booking |
|---|---|---|
| Hãng hàng không | Nội dung hub định hướng đại lý, nhóm dịch vụ hậu mãi và lối vào theo hãng/chặng | Tạo hub hãng làm trang cha, hiển thị dịch vụ con, các landing điểm hỗ trợ và liên kết tuyến bay. Không lặp lại tuyên bố đại lý, số lượng hãng, giá, thời gian xử lý hoặc chính sách của bên tham chiếu. |
| Điểm đến | Phân loại theo quốc gia và thành phố | Tạo taxonomy vùng → quốc gia → thành phố → điểm đi từ Việt Nam; mỗi landing có canonical, breadcrumb, ItemList và liên kết đến hub liên quan. |

## Nguyên tắc dữ liệu

Các điểm hỗ trợ, văn phòng, đại lý hay lịch bay sẽ chỉ xuất hiện khi có nguồn công khai từ hãng hàng không hoặc bên có thẩm quyền và có ngày kiểm tra. Không suy diễn tuyến bay, quyền đại lý, giá vé, hành lý hoặc kênh chăm sóc khách hàng từ hub tham chiếu.

## Xác minh triển khai Khang Vuong Booking

Ngày 2026-08-19, bản production đã xác minh hai hub sau: `/ve-may-bay/quoc-te` hiển thị bảy vùng điểm đến và dẫn đến các hub khu vực; `/dai-ly-phong-ve-hang` dẫn tới các landing đại lý/phòng vé theo từng hãng trong taxonomy. Các landing hỗ trợ chỉ đưa hướng dẫn xác minh kênh chính thức, chưa công bố quan hệ đại lý, địa chỉ, số điện thoại hoặc lịch bay không có nguồn kiểm chứng.
