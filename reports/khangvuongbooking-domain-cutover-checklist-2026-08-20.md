# Checklist chuyển domain Khang Vuong Booking sang Next.js

> Phạm vi: chuyển giao cùng domain `khangvuongbooking.com` sang website Next.js. Checklist không tự thực hiện thay đổi DNS.

## Trước cutover

- [ ] Rà `gsc-kvbk-migration-master.csv`; không còn URL GSC thiếu quyết định.
- [ ] Xác nhận production build thành công và server có đủ secrets, đặc biệt `RAPIDAPI_KEY`.
- [ ] Kiểm tra ngoài internet 20 URL click cao nhất: HTTP 200 nếu tạo/giữ, HTTP 301 một bước nếu remap.
- [ ] Kiểm tra `/sitemap.xml`, `/robots.txt`, canonical, Open Graph và URL chuẩn `/ve-may-bay-quoc-te`.
- [ ] Chuẩn bị quyền sửa DNS, hosting mới, Search Console và người chịu trách nhiệm rollback.

## Trong cutover

- [ ] Trỏ DNS của root domain và `www` sang máy chủ Next.js theo thông số hosting đích.
- [ ] Xác nhận TLS/HTTPS hợp lệ trước hoặc đồng thời khi chuyển traffic.
- [ ] Giữ hostname HTTPS, sitemap và canonical `https://khangvuongbooking.com`.
- [ ] Không tắt site cũ đến khi kiểm tra HTTP production hoàn tất.
- [ ] Test homepage, hãng, dịch vụ, điểm đến, landing GSC mới, remap 301, sitemap, robots và API tìm giá.

## 0–72 giờ sau cutover

- [ ] Submit lại `https://khangvuongbooking.com/sitemap.xml` trong Google Search Console.
- [ ] Dùng URL Inspection cho homepage và các URL GSC click cao, yêu cầu crawl khi cần.
- [ ] Theo dõi Page Indexing, Crawl Stats, 404, soft-404, redirect error và canonical mismatch mỗi ngày.
- [ ] So sánh performance theo page/query với baseline; ưu tiên URL click cao giảm bất thường.
- [ ] Chỉ thêm 301 mới khi có bằng chứng intent tương đương; không redirect asset sang nội dung.

## 2–8 tuần sau cutover

- [ ] Theo dõi indexation, performance, sitemap và Core Web Vitals hằng tuần.
- [ ] Giữ redirect 301 tối thiểu 12 tháng; không đổi thành 302.
- [ ] Không trả URL cũ về 410 trước khi kiểm tra traffic, backlink và dữ liệu GSC.
