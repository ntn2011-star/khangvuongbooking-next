# Ghi nhận xác minh giao diện

- Trang `/hang-bay-eva-air` đã tải được ảnh cabin Thương gia từ URL kho static công khai sau khi chuyển asset `/manus-storage/` sang origin public.
- Khối nội dung hướng dẫn dưới biểu mẫu hiển thị bài viết theo ngữ nghĩa slug EVA Air thay cho ba đoạn dùng chung.
- Bước kiểm tra tiếp theo: xác minh bộ lọc liên minh trên `/hang-bay` và breakpoint mobile của card cùng khối đường bay chủ lực.

## Mobile

Viewport 375 × 812 của `/hang-bay` hiển thị gọn phần liên hệ nhanh, logo, CTA đặt vé và hero; tiêu đề không tràn chiều ngang. Ảnh chụp theo neo `#airline-directory-title` trả về khung trắng từ Chromium nên chưa dùng làm kết luận cho card; cần kiểm tra bằng cuộn trang điều khiển được thay vì URL fragment.

Ảnh chụp bằng điều khiển cuộn xác nhận danh mục mobile hiển thị một cột, có ô tìm kiếm, bộ lọc Star Alliance/SkyTeam/Oneworld và card Vietnam Airlines không bị tràn. Khối lịch sử được giới hạn ba dòng; cần cuộn thêm để đối chiếu riêng khối Đường bay chủ lực ở cuối card.

Ảnh chụp trực tiếp khối Đường bay chủ lực của Vietnam Airlines xác nhận ba tuyến hiển thị từng dòng, không nhầm với dịch vụ. Nhóm CTA ở ngay dưới khối tuyến tự xuống dòng hợp lý; card kế tiếp bắt đầu sau khoảng cách rõ ràng.

## Schema, tìm kiếm và tải trang

Danh mục 66 hãng đã có ItemList JSON-LD với mã IATA/ICAO, còn các trang dịch vụ theo hãng có thêm Service schema. Truy vấn `VJC` trong ô tìm kiếm chỉ giữ lại card Vietjet Air. Preview production trả HTTP 200; thời gian phản hồi HTML của danh mục dưới 0,26 giây trong lần đo cuối.

## Thanh tìm giá trong hero điểm đến

Thanh tìm giá đã được đặt tại vùng đáy hero trên landing điểm đến, tự điền điểm đến theo slug và không còn bản sao trong phần cẩm nang. Kiểm tra mobile 390 × 844 cho thấy form xếp hai cột, tiêu đề hero vẫn hiển thị phía trên và CTA nằm toàn chiều rộng; lượt tinh chỉnh cuối cần chặn tràn ngang ở cấp hero/body.

## Sky Scrapper live search

Thanh tìm giá hiện gọi route server `/api/flight-search`, route này giữ RAPIDAPI_KEY ở server, resolve `skyId`/`entityId` qua Sky Scrapper và trả kết quả gồm giá, hãng, mã chuyến bay, số điểm dừng và thời lượng. Trên landing theo quốc gia, trường đích chuyển sang yêu cầu nhập thành phố/sân bay để tránh gửi tên quốc gia tiếng Việt không luôn được API phân giải ổn định. Kiểm tra route với SGN → HAN ngày 2026-09-20 đã trả giá VND cùng mã chuyến bay, gồm VN260.

Các trường render trong hero được xác minh gồm: Điểm đi (select), Điểm đến (input thành phố/sân bay), Ngày đi, Ngày về, Hành khách và Hạng ghế. Điểm đến để trống theo thiết kế để hành khách nhập thành phố hoặc sân bay có thể phân giải qua API.

Mô phỏng submit qua console cho SGN → HAN chưa tạo status/card trong DOM dù route server đã trả dữ liệu qua cURL. Cần kiểm tra console runtime hoặc thao tác native để xác minh sự kiện React trước khi công bố kết quả API ở giao diện.

Nguyên nhân xác định: giao diện đang ở chế độ Khứ hồi và trường ngày về còn trống, nên HTML validation chặn submit trước khi React gọi API. Các trường điểm đi, điểm đến và ngày đi đã nhận đúng giá trị; cần điền ngày về hoặc chuyển sang Một chiều trong lần kiểm tra tiếp theo.

Sau khi bổ sung ngày về hợp lệ, giao diện đã gửi được truy vấn đến route server Sky Scrapper và hiển thị phản hồi API đúng cách. Hành trình SGN → HAN khứ hồi ngày 2026-09-20 đến 2026-09-25 nhận trạng thái không có inventory thay vì lỗi hệ thống; route một chiều cùng ngày đã được xác minh trả giá/mã chuyến bay qua cURL.

Luồng Một chiều được xác minh trong UI: sau khi chọn, React đặt `aria-pressed=true` cho nút Một chiều, vô hiệu hóa ngày về và bỏ yêu cầu bắt buộc cho trường này.

Hành trình Một chiều SGN → HAN ngày 2026-09-20 được gửi thành công qua giao diện hero. Sky Scrapper trả năm card live, gồm giá, hãng, mã chuyến bay IATA, số điểm dừng và thời lượng; ví dụ Vietnam Airlines VN260 với giá 1.518.000 ₫ tại thời điểm kiểm tra.

## Nền trong của bộ tìm giá

Trên landing Pháp, nền bộ tìm giá đã chuyển sang trắng trong 72% với blur nhẹ. Cảnh Eiffel và hoàng hôn vẫn hiển thị phía sau khối, trong khi nhãn, input, select và CTA giữ nền trắng 88% để bảo toàn khả năng đọc. Font, vị trí và bố cục hero không bị thay đổi.

Mobile 390 × 844 xác nhận nút Khứ hồi đang chọn có nền xanh và chữ trắng rõ ràng; ảnh hero vẫn nhìn thấy qua nền tìm giá. Ảnh chụp vẫn hiển thị thanh cuộn ngang của trang nên cần xác định phần tử overflow ở cấp trang trước khi coi kiểm tra mobile là hoàn tất.

Sau lần giảm độ phủ thứ hai, lớp nền ngoài của bộ tìm giá ở 48% trên desktop và 60% trên mobile. Ảnh Eiffel hiện rõ qua toàn bộ bề mặt khối; các input/select riêng lẻ vẫn giữ nền trắng 88% để nhãn và giá trị không bị chìm.

## Mega-menu danh mục

Kiểm tra DOM trên landing United Airlines cho thấy khi mở mega-menu, điểm hit-test tại liên kết “Vé đi Hà Nội” thuộc chính `.mega-panel`, vì vậy liên kết không còn bị một phần tử hero che trong cùng bối cảnh trình duyệt. Preview cũ báo `z-index: auto` ở header nên đã được nạp lại bằng production build mới; landing sau nạp lại hiển thị ảnh hero đúng ở bên dưới header. Giá trị tính toán sau nạp lại là header `1000`, trigger mở `2`, panel `3`; panel có nền `rgb(255, 253, 248)`, opacity `1` và `pointer-events: auto`.

Đã click trực tiếp “Vé đi Hà Nội” trong mega-menu đang mở. Trình duyệt điều hướng thành công đến `/ve-may-bay-noi-dia-di-ha-noi`, xác nhận ảnh hero không còn chặn thao tác link.

Kiểm thử phòng ngừa `mega-menu-layer.test.ts` xác nhận header có z-index `1000`, trigger mở và panel có lớp tương tác tách riêng, panel luôn nhận pointer-events. Lần xác minh cuối: TypeScript không lỗi, 27 file kiểm thử với 56 test đều đạt và production build tạo thành công 2.573 trang tĩnh.

## Hồ sơ hãng, hero và cabin

Sau khi chuyển `STATIC_ASSET_ORIGIN` sang `https://vebaydimy.com`, DOM trên `/hang-bay-vietnam-airlines` xác nhận hero Vietnam Airlines tải thành công ở độ rộng tự nhiên 2560px và minh họa cabin riêng đạt 1920px. Đây là bản sửa cho lỗi origin cũ không thể tải ảnh trên preview Next.js độc lập. Ảnh screenshot top-viewport còn chịu lớp gradient hero rất đậm nên cần tiếp tục đối chiếu vùng phải của hero và khối cabin sau khi cuộn, thay vì suy luận trạng thái ảnh chỉ từ nền xanh ở khu vực tiêu đề.

Cuộn trang Vietnam Airlines xác nhận khối cabin hiển thị một minh họa Thương gia riêng với palette xanh navy–vàng phù hợp theme hãng; tab và nhãn dùng token màu landing thay vì xanh EVA. Sáu thẻ hồ sơ SEO hiện hữu, gồm lịch sử/sứ mệnh, trụ sở–hub, nhân sự–đội bay–khách, mạng bay, hiện diện quốc tế và lưu ý mùa vé. Nội dung số liệu nêu năm dữ liệu, đồng thời các mục hãng không công bố vẫn được giữ dưới dạng cảnh báo thay vì suy đoán.

URL `so-dien-thoai-tong-dai-united-airlines` không còn render landing riêng và được proxy điều hướng về hub Hãng bay. Hub United Airlines không còn hai mục dịch vụ Tổng đài/Văn phòng trong nguồn route. Tuy nhiên, ảnh hero United Airlines trước đây vẫn hiển thị nền xanh trống dù mapping tồn tại, vì vậy cần thay bằng hero United mới để đạt chuẩn máy bay/tiếp viên và nhận diện xanh hãng như các landing khác.

## CTA đầu cột và hành trình nổi bật

Landing `/hang-bay-vietnam-airlines` đã được kiểm tra trực quan sau khi thay cấu trúc hai cột. Khối “Thông tin theo hành trình” cũ không còn xuất hiện. Cụm Gọi 1900 6695, Gọi/Zalo 0934 589 488 và Mở hệ thống đặt vé nằm ở đầu cột phải, trước biểu mẫu. Cột trái nối liên tục checklist, cabin explorer và mô-đun “Hành trình nổi bật” có hero, sân bay/cửa ngõ, mạng bay và liên kết dịch vụ đúng hãng, loại bỏ vùng trống lớn từng xuất hiện bên dưới cabin.

Sau biểu mẫu Vietnam Airlines hiện có cụm “Dịch vụ liên quan Vietnam Airlines” trong rail phải. Cụm chỉ hiển thị các URL cùng hãng đã tồn tại: đổi ngày vé, mua thêm hành lý, sửa tên vé, nâng hạng vé, chọn chỗ, xe lăn và hub dịch vụ theo hãng; phần cuối rail không còn bỏ trống.

## Picker IATA và hero tiếp viên

Hero Vietnam Airlines thay thế hiển thị trọn mặt, đầu và phần thân trên của tiếp viên ở phần phải hình. Bộ tìm giá trong hero dùng nền kính trong; khi mở Điểm đến, picker hiển thị dữ liệu theo lưới nhiều cột với mã IATA, thành phố và quốc gia, cùng các tab Việt Nam, Đông Á, Đông Nam Á, Nam Á, Trung Đông & Châu Phi, Châu Âu, Châu Mỹ và Châu Đại Dương. Bố cục này thay thế danh sách một cột dài, đồng thời vẫn có trường tìm theo mã IATA/tên thành phố/quốc gia.

## Chuẩn hóa slug điểm đến

URL chuẩn `/ve-may-bay-di-nha-trang` hiển thị menu, breadcrumb, hero và tiêu đề “Vé máy bay đi Nha Trang”, không còn cụm “nội địa”. Mở URL cũ `/ve-may-bay-noi-dia-di-nha-trang` điều hướng 301 về URL chuẩn, giữ nguyên query string nếu có.
