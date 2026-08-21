# Sky Scrapper (RapidAPI) — ghi nhận tích hợp

- URL người dùng cung cấp: https://rapidapi.com/apiheya/api/sky-scrapper/pricing
- Tên hiển thị trên RapidAPI: **Air Scraper**.
- Gói Basic công khai hiển thị 20 request/tháng, hard limit và rate limit 1.000 request/giờ tại thời điểm kiểm tra 2026-08-20.
- Trang pricing không cung cấp endpoint, RapidAPI host hoặc schema request. Cần tra trang endpoint/documentation sau khi xác định được URL kỹ thuật phù hợp.
- Khóa `RAPIDAPI_KEY` phải chỉ ở lớp server; giao diện gửi payload origin, destination, ngày đi/về, hành khách, hạng ghế và loại hành trình.

Trang API gốc tại `https://rapidapi.com/apiheya/api/sky-scrapper` không tải ổn định trong phiên trình duyệt hiện tại và chưa trả tài liệu endpoint. Cần xác nhận host/endpoint từ phần Code Snippets hoặc docs của sản phẩm trước khi gọi API, thay vì đoán đường dẫn.

Playground endpoint công khai được RapidAPI lập chỉ mục cũng không trả nội dung schema trong phiên hiện tại. Các snippet tìm kiếm xác nhận sản phẩm có Flights Live Prices và Get Near By Airports, nhưng chưa đủ để suy ra URL, host hoặc tên tham số một cách an toàn.

## Endpoint đã đối chiếu

Tài liệu kỹ thuật được trích xuất từ hướng dẫn Sky Scrapper xác định host `sky-scrapper.p.rapidapi.com`. Luồng tìm giá cần gọi `/api/v1/flights/searchAirport` để lấy `skyId` và `entityId`, sau đó gọi `/api/v1/flights/searchFlights` với hai cặp định danh, ngày đi, số người lớn, tiền tệ, quốc gia và thị trường. Endpoint `/api/v1/flights/getPriceCalendar` dùng để lấy giá thấp theo ngày trong tháng.

Không được hard-code `skyId`/`entityId`; cần resolve lại qua `searchAirport`. Lớp server phải đặt timeout tối thiểu 15 giây cho tìm kiếm live và cache mỗi truy vấn 5–15 phút. Khi API trả danh sách rỗng, UI phải hiển thị trạng thái không có inventory thay vì lỗi hệ thống.

Nguồn đối chiếu: https://dev.to/rominaduffy/how-to-get-a-free-skyscanner-api-key-and-search-live-flights-nodejs-python-1bhd
