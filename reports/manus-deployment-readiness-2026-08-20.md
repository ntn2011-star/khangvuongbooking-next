# Đánh giá sẵn sàng deploy Manus — Khang Vuong Booking

## Kết luận điều hành

Source Next.js tại `/home/ubuntu/khangvuongbooking-next/` **đã sẵn sàng về mặt build, route, redirect SEO và API server**, nhưng **chưa nên gắn domain production ngay**. Cần hoàn tất một điều kiện tách hạ tầng: các logo hãng và một số static asset hiện vẫn tham chiếu host của website khác. Điều này không phù hợp với yêu cầu vận hành Khang Vuong Booking độc lập trên Manus.

> `vebaydimy.com` không phải một phần của dự án Khang Vuong Booking. Trước khi deploy production, mọi static asset mà Khang Vuong Booking cần phải được chuyển vào kho asset/host thuộc chính dự án Khang Vuong Booking, sau đó thay toàn bộ fallback URL tương ứng.

## Kết quả kiểm tra source hiện tại

| Hạng mục | Kết quả | Nhận định |
|---|---|---|
| Framework | Next.js 16.3.1, React 19.2.8, Node runtime | Phù hợp triển khai app Node trên Manus. |
| Production build | Thành công; 3.601 trang static/SSG | Đạt. |
| TypeScript | Không lỗi | Đạt. |
| Unit test | 68 test đạt; 1 external-health test skip do HTTP 451 của sandbox | Đạt ở mức source; cần test API thật sau deploy. |
| Dependency audit | Không có lỗ hổng production mức high trở lên | Đạt. |
| API tìm giá | `POST /api/flight-search`, Node.js runtime, xác thực input trả HTTP 400 đúng | Đạt. |
| Database | Không phát hiện Prisma/Drizzle/schema hay dependency database | Không cần cấu hình database cho phiên bản hiện tại. |
| Redirect GSC | 1.055 URL tạo route cùng path; 134 redirect 301 đã có đích build | Đạt. |
| Sitemap | Bao gồm route GSC materialize | Đạt. |

## Điểm cần xử lý trước production

| Mức độ | Vấn đề | Bằng chứng source | Việc cần làm |
|---|---|---|---|
| **Chặn deploy độc lập** | Static asset còn gắn host khác | `app/content.ts` đặt `STATIC_ASSET_ORIGIN = 'https://vebaydimy.com'`; `next.config.mjs` chỉ cho phép remote image từ host đó. | Chuyển asset cần dùng sang kho asset của Khang Vuong Booking, đổi origin và `remotePatterns` sang host asset Khang Vuong Booking. |
| **Chặn deploy độc lập** | Logo hãng có fallback host khác | `AirlineDirectory.tsx` fallback `NEXT_PUBLIC_AIRLINE_LOGO_CDN` về một project Manus khác. | Upload/copy logo vào kho asset của dự án Khang Vuong Booking; đặt URL CDN thuộc dự án này ở build production; bỏ fallback host khác. |
| Cần cấu hình | Secret API server | `RAPIDAPI_KEY` có trên sandbox và chỉ được đọc server-side. | Đặt `RAPIDAPI_KEY` thành secret của dự án Khang Vuong Booking trên Manus; không đưa vào source, client bundle hoặc Git. |
| Khuyến nghị | Rate limit/cache in-memory | API dùng `Map` theo tiến trình. | Chấp nhận được ở lượt đầu; khi chạy nhiều instance, chuyển cache/rate limit sang Redis/edge store nếu cần quota nhất quán. |

## Cấu hình runtime cần có trên dự án Manus mới

| Biến | Phạm vi | Giá trị production cần dùng | Tình trạng hiện tại |
|---|---|---|---|
| `RAPIDAPI_KEY` | Secret server-side | Khóa RapidAPI Sky Scrapper hiện có | Có trong sandbox; cần thêm lại vào project Manus mới. |
| `NEXT_PUBLIC_SITE_URL` | Public, build-time | `https://khangvuongbooking.com` | Source có fallback đúng, nhưng vẫn phải khai báo rõ khi build production. |
| `NEXT_PUBLIC_BOOKING_URL` | Public, build-time | `https://khangvuongbooking.com` hoặc URL booking riêng nếu sau này tách checkout | Hiện fallback về site URL. |
| `NEXT_PUBLIC_AIRLINE_LOGO_CDN` | Public, build-time | Origin asset của **chính Khang Vuong Booking** trên Manus | Chưa có origin riêng; không được dùng host website khác. |

Mỗi lần thay đổi `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_BOOKING_URL` hoặc `NEXT_PUBLIC_AIRLINE_LOGO_CDN` cần **build lại** vì các biến này ảnh hưởng canonical, JSON-LD, sitemap, Open Graph và URL asset được đóng vào bundle.

## Kiến trúc deploy đề xuất trên Manus

| Thành phần | Cấu hình đề xuất |
|---|---|
| Project hosting | Tạo một project Manus mới, tên riêng `Khang Vuong Booking`; import source `/home/ubuntu/khangvuongbooking-next/`. Không dùng project hoặc domain của website khác. |
| Runtime | Node.js 22+, dùng `pnpm install --frozen-lockfile`, `pnpm build`, `pnpm start`; không hard-code port. |
| Static assets | Dùng kho static asset/S3 gắn với project Khang Vuong Booking; source phải trỏ các URL này trước khi deploy. |
| API | Cho phép outbound HTTPS đến `sky-scrapper.p.rapidapi.com`; cấu hình `RAPIDAPI_KEY` trên server. |
| Database | Không cần migration hay database ở scope hiện tại. |
| Hosting mode | Autoscale phù hợp cho website nội dung + API tìm giá. Theo dõi quota RapidAPI và rate limit in-memory sau khi có traffic thực tế. |

## Kế hoạch cấu hình DNS và trỏ `khangvuongbooking.com` sang Manus

### Giai đoạn A — Chuẩn bị project Manus mới

1. Tạo project hosting **riêng** cho Khang Vuong Booking, sau đó import source và cấu hình ba biến public cùng `RAPIDAPI_KEY` theo bảng trên.
2. Tách static asset khỏi mọi host khác; build và kiểm tra asset, logo hãng, hero, OG image trên URL preview của project mới.
3. Chạy `pnpm check`, `pnpm test --run`, `pnpm build`; sau đó kiểm tra HTTP 200 cho `/`, `/hang-bay`, `/sitemap.xml`, `/robots.txt` và landing GSC mẫu; kiểm tra HTTP 301 cho URL GSC remap mẫu.
4. Trong phần **Settings → Domains** của project Khang Vuong Booking trên Manus, thêm lần lượt `khangvuongbooking.com` và `www.khangvuongbooking.com`.

### Giai đoạn B — Lấy bản ghi DNS chính xác từ Manus

1. Manus sẽ hiển thị bản ghi xác minh và bản ghi trỏ domain phù hợp với project mới. **Chỉ dùng đúng các giá trị hiển thị tại đó**; không dùng giá trị của project hay domain khác.
2. Tại nhà đăng ký/quản lý DNS hiện tại, lưu lại toàn bộ bản ghi đang có trước khi chỉnh. Giảm TTL cho các bản ghi web theo chính sách DNS của đơn vị quản lý, nhưng giữ nguyên MX, SPF, DKIM, DMARC và các bản ghi email khác.
3. Tạo bản ghi xác minh TXT/CNAME nếu Manus yêu cầu. Chờ trạng thái xác minh domain trong Manus trước khi chuyển traffic chính.
4. Cấu hình root `khangvuongbooking.com` và `www` theo đúng loại bản ghi A/AAAA/ALIAS/CNAME mà giao diện Manus cấp. Nếu có lựa chọn canonical, chọn `https://khangvuongbooking.com` và redirect `www` về root bằng cơ chế domain của Manus.

### Giai đoạn C — Cutover có rollback

1. Ngay trước cutover, giữ website cũ hoạt động và lưu ảnh chụp/bản export DNS. Không hủy hosting cũ.
2. Cập nhật duy nhất các bản ghi web của root và `www` sang giá trị Manus đã cấp; không đụng đến email DNS.
3. Khi Manus báo TLS/HTTPS active, dùng mạng ngoài kiểm tra homepage, 20 URL GSC click cao, `/sitemap.xml`, `/robots.txt`, API tìm giá, 1 URL 301 và 1 URL giữ nguyên path.
4. Nếu canonical sai, TLS lỗi, asset không tải hoặc 301 sai, rollback bằng cách trả bản ghi web về giá trị đã lưu và xử lý trên project Manus trước khi thử lại.

### Giai đoạn D — Sau cutover

1. Submit lại `https://khangvuongbooking.com/sitemap.xml` trong Google Search Console và kiểm tra URL Inspection cho homepage cùng nhóm URL click cao.
2. Theo dõi hàng ngày trong 72 giờ đầu: Page Indexing, Crawl Stats, 404/soft-404, redirect error, canonical mismatch và log lỗi API.
3. Theo dõi hàng tuần trong 2–8 tuần: click/impression theo page/query, Core Web Vitals, sitemap status và quota RapidAPI. Giữ 301 tối thiểu 12 tháng.

## Tiêu chí cho phép đổi DNS

- [ ] Static asset và logo đã chuyển sang origin thuộc Khang Vuong Booking.
- [ ] Project Manus mới đã có secret `RAPIDAPI_KEY` và 3 biến public đúng domain production.
- [ ] Preview/production build của project mới không có lỗi asset, canonical, sitemap, redirect hoặc API cơ bản.
- [ ] Domain đã xác minh trong project Manus mới và có bản ghi DNS chính xác từ giao diện Manus.
- [ ] Đã lưu bản ghi DNS cũ và xác định người thực hiện rollback.
- [ ] Đã kiểm tra 20 URL GSC ưu tiên cao cùng mẫu HTTP 200/301.
