import { airlines } from './content';

import { toPublicAssetUrl } from './content';

export type SourceReference = { label: string; url: string; checkedAt: string };
export type ArticleFaq = { question: string; answer: string };
export type AirlineArticle = {
  slug: string;
  airlineSlug: string;
  title: string;
  description: string;
  eyebrow: string;
  publishedAt: string;
  updatedAt: string;
  heroImage: string;
  heroAlt: string;
  serviceSlugs: string[];
  sections: Array<{ heading: string; paragraphs: string[]; image?: { url: string; alt: string; caption: string } }>;
  faqs: ArticleFaq[];
  sources: SourceReference[];
};

const assetBase = toPublicAssetUrl('/manus-storage');
const heroImage = `${assetBase}/eva-air-guide-hero_de5ce0c1.png`;
const businessCabinImage = `${assetBase}/eva-air-business-cabin-guide_27e01280.png`;
const economyCabinImage = `${assetBase}/eva-air-economy-cabin-guide_c0fee414.png`;

export const airlineArticles: AirlineArticle[] = [
  {
    slug: 'eva-air-huong-dan-chon-hanh-trinh',
    airlineSlug: 'eva-air',
    eyebrow: 'Cẩm nang EVA Air',
    title: 'Hướng dẫn chuẩn bị hành trình EVA Air: những điểm cần kiểm tra trước khi đặt vé',
    description: 'Khung hướng dẫn chuẩn bị hành trình EVA Air, từ điểm nối chuyến, hạng vé đến các dịch vụ cần đối chiếu theo booking.',
    publishedAt: '2026-08-19',
    updatedAt: '2026-08-19',
    heroImage,
    heroAlt: 'Máy bay thân rộng với phối màu xanh lục và vàng đang đỗ tại sân bay quốc tế',
    serviceSlugs: ['dat-ve-may-bay-eva-air', 'doi-ngay-ve-eva-air', 'mua-them-hanh-ly-eva-air', 'xac-nhan-ve-eva-air'],
    sections: [
      { heading: 'Bắt đầu từ hành trình, không chỉ từ giá vé', paragraphs: ['Khi chuẩn bị bay cùng EVA Air, hãy xác định rõ điểm khởi hành, điểm đến cuối cùng, ngày bay, số lượng hành khách và nhu cầu hành lý. Các thông tin này giúp đối chiếu đúng chuyến, hạng đặt chỗ và điều kiện đi kèm theo booking thực tế.', 'Nếu hành trình có nối chuyến, hãy so sánh tổng thời gian đi lại, thời gian chờ giữa các chặng và các yêu cầu giấy tờ tại điểm quá cảnh. Lịch khai thác, chỗ còn và điều kiện vé có thể thay đổi theo ngày bay nên cần kiểm tra lại trước khi xác nhận thanh toán.'] },
      { heading: 'Chuẩn bị yêu cầu dịch vụ càng sớm càng tốt', paragraphs: ['Sau khi đã có mã đặt chỗ, các yêu cầu như đổi ngày bay, mua thêm hành lý, chọn chỗ hay hỗ trợ hành khách cần được đối chiếu trên đúng chứng từ. Hãy chuẩn bị họ tên hành khách, hành trình và mô tả nhu cầu để việc kiểm tra phương án rõ ràng hơn.', 'Khang Vuong Booking chỉ tiếp nhận yêu cầu sau khi khách hàng xác nhận thông tin. Mức phí, khả năng xử lý và thời hạn áp dụng luôn phụ thuộc điều kiện hạng vé, chặng bay và phản hồi tại thời điểm hãng xử lý.'], image: { url: heroImage, alt: 'Khung cảnh sân bay quốc tế với máy bay thân rộng', caption: 'Hình minh họa gốc cho cẩm nang hành trình; không phải ảnh nhận diện chính thức của EVA Air.' } },
    ],
    faqs: [
      { question: 'Tôi cần chuẩn bị gì để kiểm tra hành trình EVA Air?', answer: 'Chuẩn bị điểm đi, điểm đến, ngày bay, số hành khách và mã đặt chỗ nếu vé đã xuất. Với nhu cầu đặc biệt, hãy nêu rõ từ đầu để kiểm tra theo booking.' },
      { question: 'Tôi có thể thay đổi dịch vụ sau khi xuất vé không?', answer: 'Khả năng xử lý phụ thuộc hạng vé, chặng bay, tình trạng chỗ và quy định hiện hành. Hãy gửi mã đặt chỗ để được đối chiếu trước khi xác nhận yêu cầu.' },
    ],
    sources: [{ label: 'EVA Air — Cabin Classes', url: 'https://www.evaair.com/en-us/fly-prepare/flying-with-eva/cabin-classes/', checkedAt: '2026-08-19' }],
  },
  {
    slug: 'eva-air-hang-ghe-va-cach-chon',
    airlineSlug: 'eva-air',
    eyebrow: 'Hạng ghế EVA Air',
    title: 'Hạng ghế EVA Air: cách xác định nhu cầu trước khi kiểm tra nâng hạng',
    description: 'Hướng dẫn định hướng chọn hạng ghế EVA Air theo độ dài hành trình, ngân sách và nhu cầu dịch vụ; quyền lợi xác nhận theo chuyến bay thực tế.',
    publishedAt: '2026-08-19',
    updatedAt: '2026-08-19',
    heroImage: businessCabinImage,
    heroAlt: 'Khoang ghế thương gia minh họa với ghế rộng và gam xanh lục đậm',
    serviceSlugs: ['nang-hang-ve-eva-air', 'chon-cho-eva-air', 'dat-ve-may-bay-eva-air', 'xac-nhan-ve-eva-air'],
    sections: [
      { heading: 'So sánh nhu cầu trước khi chọn hạng ghế', paragraphs: ['Một hạng ghế phù hợp không chỉ dựa vào tên gọi. Hãy cân nhắc độ dài hành trình, giờ đến nơi, số lượng hành lý, nhu cầu nghỉ ngơi và điều kiện thay đổi của vé. Các khoang, cấu hình ghế và quyền lợi có thể khác nhau giữa loại tàu bay hoặc chặng bay.', 'Nếu đang cân nhắc nâng hạng, hãy kiểm tra booking hiện tại, chặng cần nâng và thời điểm bay. Chỗ còn, mức chênh lệch và quy tắc hạng vé phải được xác nhận theo từng hành trình, không nên suy ra từ một chuyến bay khác.'], image: { url: businessCabinImage, alt: 'Khoang ghế thương gia minh họa trên máy bay', caption: 'Hình minh họa gốc về không gian hạng ghế; cấu hình thực tế phụ thuộc tàu bay và chuyến bay.' } },
      { heading: 'Chọn chỗ và chuẩn bị cho chuyến bay dài', paragraphs: ['Vị trí chỗ ngồi có thể ảnh hưởng rõ rệt đến trải nghiệm, đặc biệt khi đi cùng trẻ nhỏ, người lớn tuổi hoặc cần hỗ trợ di chuyển. Hãy nêu ưu tiên về khu vực ghế khi gửi yêu cầu và chỉ xác nhận sau khi đã biết điều kiện áp dụng.', 'Trước ngày bay, hãy kiểm tra lại hành trình, giấy tờ và thời gian có mặt tại sân bay. Các thông tin trên trang chỉ mang tính hướng dẫn; thông tin trên booking và nguồn chính thức của hãng mới là căn cứ cho chuyến bay.'], image: { url: economyCabinImage, alt: 'Khoang ghế phổ thông minh họa với lối đi trung tâm', caption: 'Hình minh họa gốc về khoang phổ thông, không đại diện cho sơ đồ ghế của một chuyến bay cụ thể.' } },
    ],
    faqs: [
      { question: 'Hạng ghế EVA Air có giống nhau trên mọi chặng bay không?', answer: 'Không nhất thiết. Khoang phục vụ, cấu hình ghế và quyền lợi có thể thay đổi theo loại tàu bay, chặng bay và hạng đặt chỗ. Hãy kiểm tra theo chuyến thực tế.' },
      { question: 'Khi nào nên gửi yêu cầu nâng hạng?', answer: 'Nên gửi yêu cầu sớm sau khi xác định hành trình. Khả năng nâng hạng chỉ được xác nhận sau khi kiểm tra booking, chỗ còn và điều kiện vé.' },
    ],
    sources: [{ label: 'EVA Air — Cabin Classes', url: 'https://www.evaair.com/en-us/fly-prepare/flying-with-eva/cabin-classes/', checkedAt: '2026-08-19' }],
  },
  {
    slug: 'eva-air-hanh-ly-xach-tay-ky-gui',
    airlineSlug: 'eva-air',
    eyebrow: 'Hành lý EVA Air',
    title: 'Hành lý EVA Air: cách đối chiếu xách tay, ký gửi và nhu cầu mua thêm',
    description: 'Thông tin tham khảo về hành lý EVA Air và các bước đối chiếu hạn mức chính xác theo chứng từ đặt chỗ.',
    publishedAt: '2026-08-19',
    updatedAt: '2026-08-19',
    heroImage: economyCabinImage,
    heroAlt: 'Khoang hành khách sáng và gọn gàng minh họa cho bài viết hành lý EVA Air',
    serviceSlugs: ['mua-them-hanh-ly-eva-air', 'xac-nhan-ve-eva-air', 'dat-ve-may-bay-eva-air', 'doi-ngay-ve-eva-air'],
    sections: [
      { heading: 'Đọc hạn mức ngay trên booking', paragraphs: ['Hạn mức hành lý miễn cước có thể phụ thuộc hạng vé, tuyến bay, hãng khai thác và hành trình liên danh. Vì vậy, hãy dùng thông tin trên booking làm mốc đầu tiên và đối chiếu lại với công cụ hoặc trang chính thức của hãng trước khi mua thêm.', 'EVA Air công bố quy tắc hành lý xách tay theo hạng phục vụ; mức cân nặng, số kiện và kích thước phải được xem tại thời điểm chuẩn bị bay. Với hành trình nhiều hãng, quy định có thể bị chi phối bởi hãng áp dụng trên từng phần hành trình.'], image: { url: economyCabinImage, alt: 'Khoang phổ thông minh họa với ngăn hành lý phía trên', caption: 'Hình minh họa gốc về khoang hành khách; không thể hiện hạn mức hành lý của một chuyến bay cụ thể.' } },
      { heading: 'Mua thêm hành lý theo chặng bay', paragraphs: ['Khi cần mua thêm hành lý, hãy chuẩn bị mã đặt chỗ, chặng bay và tổng nhu cầu hành lý. Mức hành lý có thể không áp dụng đồng nhất cho mọi chặng, đặc biệt với hành trình liên danh hoặc có nối chuyến.', 'Không nên chờ sát giờ khởi hành mới gửi yêu cầu. Khang Vuong Booking sẽ kiểm tra điều kiện và thông tin hiện hành trên booking trước khi khách hàng quyết định xử lý.'] },
    ],
    faqs: [
      { question: 'Tôi có thể dựa vào một mức hành lý cố định cho mọi vé EVA Air không?', answer: 'Không. Hạn mức có thể phụ thuộc hạng vé, hành trình và hãng áp dụng. Hãy đọc thông tin trên booking và kiểm tra lại với nguồn chính thức.' },
      { question: 'Nếu hành trình có nhiều hãng bay, quy định nào được áp dụng?', answer: 'Quy định có thể khác theo từng phần hành trình và hãng áp dụng. EVA Air nêu rõ hành trình liên danh/liên tuyến cần đối chiếu chính sách tương ứng trên chứng từ và nguồn chính thức.' },
    ],
    sources: [{ label: 'EVA Air — Carry-on Baggage', url: 'https://www.evaair.com/en-us/fly-prepare/baggage/free-baggage/carry-on-baggage/', checkedAt: '2026-08-19' }, { label: 'EVA Air — Checked Baggage', url: 'https://www.evaair.com/en-us/fly-prepare/baggage/free-baggage/checked-baggage/', checkedAt: '2026-08-19' }],
  },
  {
    slug: 'eva-air-check-in-va-xac-nhan-ve',
    airlineSlug: 'eva-air',
    eyebrow: 'Check-in EVA Air',
    title: 'Check-in EVA Air và xác nhận vé: các bước nên chuẩn bị trước ngày bay',
    description: 'Hướng dẫn định hướng check-in EVA Air và cách kiểm tra thông tin vé trước chuyến bay quốc tế.',
    publishedAt: '2026-08-19',
    updatedAt: '2026-08-19',
    heroImage,
    heroAlt: 'Máy bay thân rộng tại sân bay quốc tế minh họa cho bài viết check-in EVA Air',
    serviceSlugs: ['chon-cho-eva-air', 'xac-nhan-ve-eva-air', 'so-dien-thoai-tong-dai-eva-air', 'ho-tro-tieng-anh-eva-air'],
    sections: [
      { heading: 'Kiểm tra thông tin vé trước khi check-in', paragraphs: ['Hãy đối chiếu họ tên hành khách, thời gian khởi hành, nhà ga, số chặng bay và giấy tờ cần thiết. Nếu phát hiện khác biệt, cần kiểm tra ngay theo điều kiện booking thay vì đợi đến sân bay.', 'EVA Air công bố check-in trực tuyến dành cho hành khách quốc tế EVA Air hoặc UNI Air có thể thực hiện trong khoảng thời gian cụ thể trước giờ bay. Điều kiện lấy boarding pass có thể phụ thuộc sân bay khởi hành, hành trình và phương thức thanh toán.'] },
      { heading: 'Chủ động với hành lý và thời gian tại sân bay', paragraphs: ['Nếu có hành lý ký gửi hoặc chưa thể nhận boarding pass trực tuyến, hãy dành thời gian cho quầy làm thủ tục. Thời gian cần có mặt có thể thay đổi theo sân bay và quy định an ninh, vì vậy hãy đối chiếu hướng dẫn chính thức của sân bay và hãng trước ngày bay.', 'Khi cần hỗ trợ chọn chỗ, kiểm tra vé hoặc trao đổi tiếng Anh liên quan hành trình, hãy chuẩn bị mã đặt chỗ và thông tin chuyến bay. Điều này giúp việc đối chiếu dịch vụ chính xác hơn.'] },
    ],
    faqs: [
      { question: 'Khi nào có thể check-in trực tuyến EVA Air?', answer: 'EVA Air nêu rằng hành khách quốc tế EVA Air hoặc UNI Air có thể check-in trực tuyến từ 48 giờ đến 1 giờ trước giờ khởi hành, tùy điều kiện chuyến bay và sân bay.' },
      { question: 'Nếu không in được boarding pass trực tuyến thì sao?', answer: 'Một số hành trình hoặc sân bay có thể không hỗ trợ. Hãy đến quầy sân bay để nhận boarding pass và kiểm tra hành lý theo hướng dẫn của hãng.' },
    ],
    sources: [{ label: 'EVA Air — Online Check-in', url: 'https://www.evaair.com/en-global/fly-prepare/at-the-airport/check-in/online-check-in/', checkedAt: '2026-08-19' }],
  },
  {
    slug: 'eva-air-lich-su-doi-tau-bay-va-mang-duong-bay',
    airlineSlug: 'eva-air',
    eyebrow: 'Toàn cảnh EVA Air',
    title: 'EVA Air: lịch sử hình thành, đội tàu bay, hub Đào Viên và mạng đường bay quốc tế',
    description: 'Hồ sơ tổng quan EVA Air từ mốc thành lập, định hướng an toàn – dịch vụ – bền vững, đội tàu bay, nhân sự, hub Đào Viên và hoạt động khai thác được đối chiếu từ nguồn chính thức.',
    publishedAt: '2026-08-19',
    updatedAt: '2026-08-19',
    heroImage: `${assetBase}/kvbk-airline-eva-air_7aac8459.png`,
    heroAlt: 'Máy bay và tiếp viên EVA Air minh họa hành trình quốc tế tại sân bay',
    serviceSlugs: ['dat-ve-may-bay-eva-air', 'doi-ngay-ve-eva-air', 'mua-them-hanh-ly-eva-air', 'nang-hang-ve-eva-air', 'so-dien-thoai-tong-dai-eva-air', 'dia-chi-van-phong-eva-air'],
    sections: [
      {
        heading: 'Từ năm 1989 đến chuyến bay đầu tiên năm 1991',
        paragraphs: [
          'EVA Airways được thành lập vào tháng 3 năm 1989 bởi nhà sáng lập Evergreen Group, Dr. Chang Yung-Fa. Theo trang giới thiệu của hãng, đơn đặt hàng ban đầu gồm 26 máy bay mới và định hướng hoạt động đặt chất lượng phục vụ cùng an toàn làm tiêu chuẩn ngay từ đầu.',
          'Chuyến bay đầu tiên của EVA Air cất cánh ngày 1 tháng 7 năm 1991. Hãng hiện là thành viên Star Alliance; từ hub tại Sân bay quốc tế Đào Viên (Taiwan Taoyuan International Airport), EVA Air kết nối châu Á và Trung Quốc đại lục với Bắc Mỹ, châu Âu và châu Đại Dương. Đây là bối cảnh quan trọng khi khách đặt hành trình có nối chuyến tại Đài Loan.'
        ],
        image: { url: `${assetBase}/kvbk-airline-eva-air_7aac8459.png`, alt: 'Tiếp viên và máy bay minh họa cho bài giới thiệu EVA Air', caption: 'Hình minh họa gốc cho bài viết; không phải ảnh nhận diện chính thức hoặc thông báo vận hành của EVA Air.' }
      },
      {
        heading: 'Sứ mệnh vận hành: an toàn, dịch vụ và bền vững',
        paragraphs: [
          'Báo cáo thường niên 2025 của EVA Air nêu ba giá trị cốt lõi là “Safety, Service, and Sustainability”. Hãng mô tả an toàn là một phần của hệ thống quản lý với nhận diện nguy cơ, quản trị rủi ro, đào tạo nhân sự, bảo dưỡng và đánh giá rủi ro trước chuyến bay.',
          'EVA Air cũng công bố mục tiêu Net-Zero Carbon Emissions by 2050. Các nội dung dịch vụ và vận hành trên website hãng cần được hiểu theo chuyến bay cụ thể: loại tàu bay, hạng đặt chỗ, sân bay và điều kiện trên booking có thể làm thay đổi trải nghiệm thực tế của hành khách.'
        ]
      },
      {
        heading: 'Đội tàu bay và đội ngũ nhân sự',
        paragraphs: [
          'Theo dữ liệu đội bay của EVA Air cập nhật ngày 1 tháng 8 năm 2026, hãng có 89 máy bay đang khai thác: 32 Boeing 777-300ER, 9 Boeing 787-9, 13 Boeing 787-10, 9 Airbus A330-300, 17 Airbus A321-200 và 9 Boeing 777F chở hàng. Hãng cũng công bố đơn đặt hàng tương lai cho Boeing 787-9, 787-10, Airbus A350-1000 và A321neo.',
          'Về nhân sự, báo cáo thường niên 2025 ghi nhận EVA Air có 20.048 nhân viên cuối năm 2025; số liệu tại ngày 31 tháng 3 năm 2026 là 20.000 người. Các số liệu này là quy mô lực lượng lao động của công ty, không phải số tiếp viên hoặc phi công trên một chuyến bay cụ thể.'
        ]
      },
      {
        heading: 'Hub Đào Viên, mạng bay và hoạt động hằng năm',
        paragraphs: [
          'Trang dữ liệu cơ bản của EVA Air cho biết hãng phục vụ 66 điểm đến trên bốn châu lục (không bao gồm châu Phi) với 89 máy bay đang khai thác. Báo cáo 2025 nêu các tuyến mới Taoyuan–Kobe từ tháng 4, Taoyuan–Dallas và Taoyuan–Busan từ tháng 10; đồng thời tăng tần suất trên các tuyến Taoyuan–Seattle, Bangkok, Seoul và Kaohsiung–Osaka.',
          'Trong năm 2025, EVA Air vận chuyển 13,33 triệu hành khách và 840.000 tấn hàng hóa. Báo cáo công khai đã đối chiếu không nêu một tổng số chuyến bay hằng năm duy nhất, vì vậy bài viết không dùng số chuyến ước tính. Khi cần kiểm tra một tuyến cụ thể, nên đối chiếu lịch bay tại thời điểm đặt chỗ, bởi tần suất có thể thay đổi theo mùa và kế hoạch khai thác.'
        ]
      },
      {
        heading: 'Cách dùng thông tin hãng khi chuẩn bị hành trình',
        paragraphs: [
          'Thông tin về mạng bay, đội tàu bay và hub giúp hành khách hình dung luồng hành trình, nhưng không thay thế booking. Trước khi đặt vé hoặc yêu cầu dịch vụ EVA Air, cần kiểm tra mã chuyến bay, hãng khai thác thực tế, thời gian nối chuyến, hạng đặt chỗ, hạn mức hành lý và giấy tờ cần thiết.',
          'Khi đã có vé, các nhu cầu đổi ngày, mua hành lý, nâng hạng, chọn chỗ hay xác nhận vé phải được đối chiếu theo chứng từ. Khang Vuong Booking có thể hỗ trợ tổ chức yêu cầu theo booking; khả năng xử lý và chi phí chỉ được xác nhận sau khi kiểm tra điều kiện thực tế.'
        ]
      }
    ],
    faqs: [
      { question: 'EVA Air thành lập khi nào và bắt đầu khai thác khi nào?', answer: 'EVA Air được thành lập vào tháng 3 năm 1989 và thực hiện chuyến bay đầu tiên vào ngày 1 tháng 7 năm 1991, theo trang giới thiệu chính thức của hãng.' },
      { question: 'Hub chính của EVA Air ở đâu?', answer: 'EVA Air sử dụng Sân bay quốc tế Đào Viên tại Đài Loan làm hub trọng tâm cho mạng kết nối châu Á, Bắc Mỹ, châu Âu và châu Đại Dương.' },
      { question: 'EVA Air có bao nhiêu máy bay?', answer: 'Dữ liệu hãng cập nhật ngày 1 tháng 8 năm 2026 ghi nhận 89 máy bay đang khai thác; cơ cấu gồm Boeing 777-300ER, Boeing 787-9/787-10, Airbus A330-300, A321-200 và Boeing 777F.' },
      { question: 'EVA Air khai thác bao nhiêu chuyến bay mỗi năm?', answer: 'Nguồn công khai chính thức được đối chiếu nêu 13,33 triệu hành khách và 840.000 tấn hàng hóa trong năm 2025 nhưng không công bố một tổng số chuyến bay hằng năm duy nhất. Nên kiểm tra lịch bay của từng tuyến tại thời điểm đặt chỗ.' }
    ],
    sources: [
      { label: 'EVA Air — Fundamental Data', url: 'https://www.evaair.com/en-global/about-eva-air/about-us/market-and-sales-overview/fundamental-data/', checkedAt: '2026-08-19' },
      { label: 'EVA Air — EVA Values', url: 'https://www.evaair.com/en-global/about-eva-air/about-us/eva-values/', checkedAt: '2026-08-19' },
      { label: 'EVA Air — Fleet Operational Data', url: 'https://www.evaair.com/en-global/about-eva-air/about-us/market-and-sales-overview/eva-air-fleet/', checkedAt: '2026-08-19' },
      { label: 'EVA Air — 2025 Annual Report', url: 'https://www.evaair.com/en-global/_download-files/financial-materials/annual-reports/english/evaair-2025-annual-report-en.html', checkedAt: '2026-08-19' }
    ]
  },
];

export function getArticleBySlug(slug: string) { return airlineArticles.find((article) => article.slug === slug); }
export function getArticlesForAirline(airlineSlug: string) { return airlineArticles.filter((article) => article.airlineSlug === airlineSlug); }
export function getRelatedArticles(article: AirlineArticle, limit = 3) { return getArticlesForAirline(article.airlineSlug).filter((item) => item.slug !== article.slug).slice(0, limit); }
export function getAirlineName(airlineSlug: string) { return airlines.find((airline) => airline.slug === airlineSlug)?.name ?? airlineSlug; }
