import { airlines, type PageContent } from './content';
import { getAirlineProfile } from './airline-profiles';

type SeoSection = { heading: string; text: string };

function getAirlineSlug(page: PageContent) {
  return airlines.find((airline) => page.slug === `hang-bay-${airline.slug}`)?.slug;
}

function cleanFact(text: string) {
  return text.replace(/\s*\[\d+\]/g, '').replace(/\s+/g, ' ').trim();
}

function getAirlineProfileArticle(page: PageContent): SeoSection[] | undefined {
  const airlineSlug = getAirlineSlug(page);
  const profile = getAirlineProfile(airlineSlug);
  if (!profile) return undefined;

  return [
    { heading: `Lịch sử hình thành và định hướng ${profile.airlineName}`, text: `${cleanFact(profile.founding)} ${cleanFact(profile.mission)}` },
    { heading: 'Trụ sở và sân bay kết nối trọng tâm', text: cleanFact(profile.headquarters_hubs) },
    { heading: 'Quy mô vận hành được công bố', text: `${cleanFact(profile.employees)} ${cleanFact(profile.fleet)} ${cleanFact(profile.passengers)}` },
    { heading: 'Mạng đường bay và các trục khai thác', text: cleanFact(profile.network_routes) },
    { heading: 'Hiện diện quốc tế và điểm hỗ trợ', text: cleanFact(profile.global_presence) },
    { heading: 'Khi nào nên kiểm tra giá vé?', text: cleanFact(profile.seasonalityNote) },
  ];
}

function getSlugArticle(page: PageContent): SeoSection[] {
  const title = page.title;
  const slug = page.slug;
  const profileArticle = getAirlineProfileArticle(page);
  if (profileArticle) return profileArticle;
  if (slug.includes('doi-ngay-ve')) return [{ heading: `Khi nào nên kiểm tra ${title}?`, text: `Yêu cầu thay đổi ngày bay cần được đối chiếu theo mã đặt chỗ, chặng bay còn hiệu lực, hạng vé và thời điểm gửi yêu cầu. Hãy ghi rõ ngày bay mới mong muốn để nhận được hướng dẫn chính xác.` }, { heading: 'Thông tin cần đối chiếu', text: 'Chuẩn bị họ tên hành khách, mã đặt chỗ, ngày bay hiện tại và phương án ngày mới. Mức chênh lệch, điều kiện đổi và thời hạn xử lý phụ thuộc chứng từ thực tế.' }, { heading: 'Hoàn tất theo xác nhận', text: 'Chỉ thực hiện sau khi điều kiện, lịch bay và chi phí được xác nhận qua kênh phù hợp. Lưu lại xác nhận thay đổi để kiểm tra trước giờ khởi hành.' }];
  if (slug.includes('mua-them-hanh-ly')) return [{ heading: `Cách chuẩn bị cho ${title}`, text: 'Hành lý mua thêm cần được kiểm tra theo chặng bay, hạng vé và hãng trực tiếp khai thác. Mỗi chặng có thể có quy định trọng lượng hoặc kiện hành lý khác nhau.' }, { heading: 'Dữ liệu nên cung cấp', text: 'Mã đặt chỗ, hành trình, ngày bay và nhu cầu số ký hoặc số kiện giúp đối chiếu nhanh hơn. Hãy tách rõ hành lý ký gửi và hành lý đặc biệt nếu có.' }, { heading: 'Xác nhận trước khi bay', text: 'Kiểm tra lại xác nhận hành lý trên chứng từ và thời gian có mặt tại sân bay. Điều này giúp hạn chế phát sinh khi làm thủ tục.' }];
  if (slug.includes('sua-ten-ve')) return [{ heading: `Kiểm tra điều kiện ${title}`, text: 'Việc chỉnh sửa tên phụ thuộc mức độ sai khác, hạng vé, hành trình và quy định của hãng. Hãy đối chiếu tên trên booking với giấy tờ tùy thân hoặc hộ chiếu.' }, { heading: 'Chuẩn bị thông tin chính xác', text: 'Cung cấp mã đặt chỗ, tên đang hiển thị và tên đúng theo giấy tờ. Không tự suy đoán phạm vi chỉnh sửa khi chưa có xác nhận từ kênh hỗ trợ.' }, { heading: 'Lưu xác nhận sau cập nhật', text: 'Sau khi được phản hồi, kiểm tra toàn bộ họ tên, chặng bay và ngày bay trên chứng từ mới trước khi di chuyển ra sân bay.' }];
  if (slug.includes('nang-hang-ve')) return [{ heading: `Khả năng áp dụng ${title}`, text: 'Nâng hạng phụ thuộc hạng vé ban đầu, chặng bay, loại tàu bay và tình trạng chỗ. Điều kiện có thể khác nhau giữa từng chuyến bay trong cùng hành trình.' }, { heading: 'Thông tin cần chuẩn bị', text: 'Hãy chuẩn bị mã đặt chỗ, hạng vé hiện tại và chặng mong muốn nâng hạng. Nêu rõ nhu cầu nếu chỉ muốn thay đổi một chặng trong hành trình.' }, { heading: 'Đối chiếu quyền lợi', text: 'Xác nhận quyền lợi hạng ghế, hành lý, điều kiện thay đổi và khoản chênh lệch trước khi quyết định.' }];
  if (slug.includes('chon-cho') || slug.includes('xe-lan') || slug.includes('ve-thu-cung')) return [{ heading: `Chuẩn bị yêu cầu ${title}`, text: 'Dịch vụ cần được kiểm tra theo hãng khai thác, chặng bay, thời hạn gửi yêu cầu và tình trạng booking. Một số nhu cầu có thể cần thêm giấy tờ hoặc xác nhận y tế.' }, { heading: 'Mô tả nhu cầu rõ ràng', text: 'Cung cấp mã đặt chỗ, chặng bay, ngày bay và yêu cầu cụ thể. Thông tin rõ ràng giúp đối chiếu khả năng phục vụ theo từng sân bay và chuyến bay.' }, { heading: 'Xác nhận trước ngày bay', text: 'Kiểm tra lại việc ghi nhận dịch vụ trên booking trước khi ra sân bay và đến sớm theo khuyến nghị của hãng.' }];
  if (slug.startsWith('hang-bay-')) return [{ heading: `Tổng quan ${title}`, text: `Trang này tập hợp thông tin hành trình, dịch vụ và điểm cần kiểm tra dành cho khách bay cùng ${title}. Mỗi dịch vụ được tách riêng để thuận tiện đối chiếu theo booking.` }, { heading: 'Lưu ý theo chặng bay', text: 'Hãng trực tiếp khai thác, hạng vé, sân bay nối chuyến và ngày bay ảnh hưởng đến điều kiện dịch vụ. Hãy kiểm tra đúng chặng cần hỗ trợ.' }, { heading: 'Chọn đúng nhu cầu', text: 'Bạn có thể mở mục đặt vé, đổi vé, hành lý, chọn chỗ hoặc hỗ trợ đặc biệt tương ứng. Thông tin cuối cùng luôn dựa trên chứng từ thực tế.' }];
  if (slug.includes('ve-may-bay') || slug.includes('diem-den')) return [{ heading: `Chuẩn bị hành trình ${title}`, text: 'Bắt đầu bằng điểm đi, điểm đến, thời gian dự kiến và số hành khách. Hành trình quốc tế cần được đối chiếu thêm giấy tờ, quá cảnh và điều kiện nhập cảnh.' }, { heading: 'So sánh theo nhu cầu thực tế', text: 'Lựa chọn hãng bay, hạng vé, hành lý và giờ bay cần phù hợp với lịch trình. Đừng chỉ dựa vào một thông tin tổng quát khi đặt hành trình nhiều chặng.' }, { heading: 'Kiểm tra trước khi xác nhận', text: 'Đối chiếu hành trình, họ tên hành khách và điều kiện vé trên chứng từ trước khi hoàn tất giao dịch.' }];
  return [{ heading: `Thông tin cần biết về ${title}`, text: `Nội dung của trang được tổ chức theo đúng chủ đề ${title} để hỗ trợ bạn chuẩn bị thông tin cần thiết trước khi gửi yêu cầu.` }, { heading: 'Đối chiếu với chứng từ', text: 'Họ tên hành khách, mã đặt chỗ, chặng bay và thời điểm thực tế là cơ sở để xác nhận điều kiện áp dụng.' }, { heading: 'Chọn kênh phù hợp', text: 'Bạn có thể sử dụng hệ thống đặt vé chính thức, hotline, Zalo hoặc văn phòng để nhận định hướng theo nhu cầu.' }];
}

export function buildDefaultLandingFaqs(page: PageContent) {
  return [
    { question: `Cần chuẩn bị gì trước khi gửi yêu cầu về ${page.title}?`, answer: `Hãy chuẩn bị mã đặt chỗ nếu đã có, họ tên hành khách theo giấy tờ, hành trình dự kiến và nội dung cần hỗ trợ. Thông tin cuối cùng luôn cần được đối chiếu theo booking thực tế.` },
    { question: `Thông tin trên trang ${page.title} có áp dụng cho mọi chuyến bay không?`, answer: `Không. Mỗi hành trình có thể khác nhau theo hãng trực tiếp khai thác, hạng vé, thời điểm bay, chặng nối chuyến và điều kiện trên chứng từ. Hãy xác nhận lại trước khi giao dịch.` },
    { question: 'Tôi nên kiểm tra thông tin qua kênh nào?', answer: 'Bạn có thể dùng kênh đặt vé chính thức, hotline, Zalo hoặc văn phòng của Khang Vuong Booking để định hướng. Không gửi thông tin thanh toán qua kênh chưa được xác minh.' },
  ];
}

function buildAirlineProfileFaqs(page: PageContent) {
  const airlineSlug = getAirlineSlug(page);
  const profile = getAirlineProfile(airlineSlug);
  if (!profile) return [];
  return [
    { question: `${profile.airlineName} được thành lập khi nào?`, answer: cleanFact(profile.founding) },
    { question: `Sân bay trọng tâm của ${profile.airlineName} ở đâu?`, answer: cleanFact(profile.headquarters_hubs) },
    { question: `${profile.airlineName} công bố quy mô đội bay, nhân sự và hành khách thế nào?`, answer: `${cleanFact(profile.employees)} ${cleanFact(profile.fleet)} ${cleanFact(profile.passengers)}` },
    { question: `${profile.airlineName} có những trục đường bay nào?`, answer: cleanFact(profile.network_routes) },
    { question: `Tháng nào mua vé ${profile.airlineName} rẻ hơn?`, answer: cleanFact(profile.seasonalityNote) },
  ];
}

export function getLandingFaqs(page: PageContent) {
  const authored = page.faqs ?? [];
  const profileFaqs = buildAirlineProfileFaqs(page);
  if (profileFaqs.length > 0) {
    const seen = new Set<string>();
    return [...authored, ...profileFaqs].filter((faq) => {
      if (seen.has(faq.question)) return false;
      seen.add(faq.question);
      return true;
    }).slice(0, 7);
  }
  if (authored.length >= 3) return authored;
  return [...authored, ...buildDefaultLandingFaqs(page)].slice(0, 3);
}

export function LandingSeoGuide({ page }: { page: PageContent }) {
  const article = getSlugArticle(page);
  const airlineSlug = getAirlineSlug(page);
  const profile = getAirlineProfile(airlineSlug);
  return <section className="landing-seo-guide" aria-label={`Hướng dẫn ${page.title}`}>
    <p>{profile ? `Hồ sơ hãng · nguồn công khai ${profile.confidence === 'high' ? 'đầy đủ' : 'đang cập nhật'}` : 'Hướng dẫn theo hành trình'}</p>
    <h2>{profile ? `${profile.airlineName}: lịch sử, mạng bay và thông tin khai thác` : `${page.title}: thông tin cần chuẩn bị`}</h2>
    <div className="landing-seo-guide-grid">
      {article.map((section) => <section key={section.heading}><h3>{section.heading}</h3><p>{section.text}</p></section>)}
    </div>
  </section>;
}
