export type VerifiedTestimonial = {
  quote: string;
  customerLabel: string;
  context: string;
  verifiedAt: string;
};

export function VerifiedTestimonials({ entries = [] }: { entries?: VerifiedTestimonial[] }) {
  return (
    <section className="verified-testimonials conversion-section" aria-labelledby="verified-testimonials-title">
      <p>Phản hồi có xác thực</p>
      <h2 id="verified-testimonials-title">Đánh giá từ khách hàng</h2>
      {entries.length > 0 ? (
        <div className="verified-testimonials-grid">
          {entries.map((entry) => <figure key={`${entry.customerLabel}-${entry.verifiedAt}`}><blockquote>“{entry.quote}”</blockquote><figcaption><strong>{entry.customerLabel}</strong><span>{entry.context} · Xác thực: {entry.verifiedAt}</span></figcaption></figure>)}
        </div>
      ) : (
        <div className="verified-testimonials-empty">
          <strong>Chỉ công bố phản hồi thực tế đã được xác minh</strong>
          <p>Trang này chưa hiển thị đánh giá nào vì Khang Vuong Booking chỉ đăng phản hồi khi có nguồn xác thực và sự đồng ý công khai của khách hàng.</p>
        </div>
      )}
    </section>
  );
}
