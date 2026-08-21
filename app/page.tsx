import Link from 'next/link';
import { HomeHero } from './HomeHero';
import { SiteShell } from './SiteShell';
import { navigation, pages } from './content';

export default function HomePage() {
  return <SiteShell><main>
    <HomeHero />
    <section className="main-content frame"><div className="intro"><div><p className="kicker">Danh mục hành trình</p><h2>Từ lúc lên kế hoạch đến khi cần hỗ trợ sau đặt vé.</h2></div><p>Các danh mục được tổ chức theo nhu cầu tìm kiếm phổ biến, đồng thời dành không gian giữ lại những URL và chủ đề có lịch sử SEO của Khang Vuong Booking.</p></div><div className="category-grid">{navigation.slice(0, 6).map(([slug, label], index) => { const category = pages[slug] ?? pages['ve-quoc-te']; return <Link href={`/${slug}`} className="category-card" key={slug}><span>0{index + 1}</span><h3>{label}</h3><p>{category.description}</p><b>Xem danh mục →</b></Link>; })}</div><section className="process"><div><p className="eyebrow">Quy trình gợi ý</p><h2>Kiểm tra từng bước trước khi quyết định.</h2><p>Thông tin trên website là điểm khởi đầu. Mọi điều kiện vé và chi phí cần được xác nhận theo hành trình, hãng bay và thời điểm xử lý.</p><Link href="/dich-vu-theo-hang">Khám phá dịch vụ theo hãng →</Link></div><ol><li><b>01</b><span><strong>Xác định hành trình</strong>Chọn điểm đi, điểm đến, số hành khách và thời gian dự kiến.</span></li><li><b>02</b><span><strong>Kiểm tra điều kiện</strong>Đối chiếu hãng khai thác, hành lý, visa hoặc quá cảnh nếu cần.</span></li><li><b>03</b><span><strong>Tiếp tục đặt vé</strong>Mở kênh chính thức để kiểm tra theo thời điểm thực tế.</span></li></ol></section><aside className="safe-callout"><div><strong>Ưu tiên giao dịch an toàn.</strong><span>Chỉ trao đổi và thanh toán qua kênh chính thức; kiểm tra kỹ người nhận, mã đặt chỗ và điều kiện dịch vụ.</span></div><Link href="/canh-bao-an-toan">Xem hướng dẫn an toàn →</Link></aside></section>
  </main></SiteShell>;
}
