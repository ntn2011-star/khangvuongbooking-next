import { gscLegacyPages } from './gsc-legacy-pages';

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://khangvuongbooking.com';
export const SITE_URL = configuredSiteUrl.replace(/\/$/, '');
export const BOOKING_URL = (process.env.NEXT_PUBLIC_BOOKING_URL ?? SITE_URL).replace(/\/$/, '');
export const STATIC_ASSET_ORIGIN = (process.env.NEXT_PUBLIC_STATIC_ASSET_ORIGIN ?? '').replace(/\/$/, '');
export const HOTLINE_PHONE = '1900 6695';
export const SUPPORT_PHONE = '0934 589 488';
export const SUPPORT_PHONE_TEL = '0934589488';
export const ZALO_SUPPORT_URL = `https://zalo.me/${SUPPORT_PHONE_TEL}`;
export function toPublicAssetUrl(url: string) {
  return url.startsWith('/manus-storage/') ? `${STATIC_ASSET_ORIGIN}${url}` : url;
}

export type OfficeLocation = {
  city: string;
  phone: string;
  phoneTel: string;
  addresses: Array<{ label: string; mapUrl: string }>;
};

export const officeLocations: OfficeLocation[] = [
  {
    city: 'Hà Nội', phone: '024 3747 4848', phoneTel: '02437474848',
    addresses: [
      { label: '95H Lý Nam Đế, Hoàn Kiếm, Hà Nội', mapUrl: 'https://www.google.com/maps/search/?api=1&query=95H%20L%C3%BD%20Nam%20%C4%90%E1%BA%BF%2C%20Ho%C3%A0n%20Ki%E1%BA%BFm%2C%20H%C3%A0%20N%E1%BB%99i' },
      { label: '8/16 Huỳnh Thúc Kháng, Giảng Võ, Hà Nội', mapUrl: 'https://www.google.com/maps/search/?api=1&query=8%2F16%20Hu%E1%BB%B3nh%20Th%C3%BAc%20Kh%C3%A1ng%2C%20Gi%E1%BA%A3ng%20V%C3%B5%2C%20H%C3%A0%20N%E1%BB%99i' },
    ],
  },
  {
    city: 'TP. Hồ Chí Minh', phone: '028 3920 5999', phoneTel: '02839205999',
    addresses: [{ label: '96 Tôn Thất Tùng, Bến Thành, TP. Hồ Chí Minh', mapUrl: 'https://www.google.com/maps/search/?api=1&query=96%20T%C3%B4n%20Th%E1%BA%A5t%20T%C3%B9ng%2C%20B%E1%BA%BFn%20Th%C3%A0nh%2C%20TP.%20H%E1%BB%93%20Ch%C3%AD%20Minh' }],
  },
];

export type PageContent = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  checklist: string[];
  related?: Array<{ slug: string; label: string }>;
  sourceReferences?: Array<{ label: string; url: string; checkedAt: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  updatedAt?: string;
  conversionModules?: { quickBooking?: boolean; verifiedTestimonials?: boolean };
};

export type Airline = { slug: string; name: string; priority: boolean };
type Service = { slug: string; label: string; title: string; description: string; checklist: string[] };
export type LandingTheme = { primary: string; accent: string; soft: string };
export const brandTheme: LandingTheme = { primary: '#0b3764', accent: '#df1f2d', soft: '#eef5fb' };

export const navigation = [
  ['ve-may-bay-trong-nuoc', 'Vé trong nước'],
  ['ve-may-bay-quoc-te', 'Vé quốc tế'],
  ['hang-bay', 'Hãng bay'],
  ['dich-vu-theo-hang', 'Dịch vụ theo hãng'],
  ['ho-chieu', 'Hộ chiếu'],
  ['visa', 'Visa'],
] as const;

export const airlines: Airline[] = [
  { slug: 'vietnam-airlines', name: 'Vietnam Airlines', priority: true },
  { slug: 'vietjet-air', name: 'Vietjet Air', priority: true },
  { slug: 'eva-air', name: 'EVA Air', priority: true },
  { slug: 'korean-air', name: 'Korean Air', priority: true },
  { slug: 'all-nippon-airways', name: 'All Nippon Airways', priority: true },
  { slug: 'japan-airlines', name: 'Japan Airlines', priority: true },
  { slug: 'singapore-airlines', name: 'Singapore Airlines', priority: true },
  { slug: 'cathay-pacific', name: 'Cathay Pacific', priority: true },
  { slug: 'china-airlines', name: 'China Airlines', priority: true },
  { slug: 'starlux-airlines', name: 'Starlux Airlines', priority: true },
  { slug: 'qatar-airways', name: 'Qatar Airways', priority: true },
  { slug: 'emirates', name: 'Emirates', priority: true },
  { slug: 'turkish-airlines', name: 'Turkish Airlines', priority: true },
  { slug: 'bamboo-airways', name: 'Bamboo Airways', priority: true },
  { slug: 'vietravel-airlines', name: 'Vietravel Airlines', priority: false },
  { slug: 'asiana-airlines', name: 'Asiana Airlines', priority: false },
  { slug: 'peach-aviation', name: 'Peach Aviation', priority: false },
  { slug: 'scoot', name: 'Scoot', priority: false },
  { slug: 'hong-kong-airlines', name: 'Hong Kong Airlines', priority: false },
  { slug: 'hk-express', name: 'HK Express', priority: false },
  { slug: 'thai-airways', name: 'Thai Airways', priority: false },
  { slug: 'malaysia-airlines', name: 'Malaysia Airlines', priority: false },
  { slug: 'airasia', name: 'AirAsia', priority: false },
  { slug: 'philippine-airlines', name: 'Philippine Airlines', priority: false },
  { slug: 'cebu-pacific', name: 'Cebu Pacific', priority: false },
  { slug: 'garuda-indonesia', name: 'Garuda Indonesia', priority: false },
  { slug: 'batik-air-indonesia', name: 'Batik Air Indonesia', priority: false },
  { slug: 'batik-air-malaysia', name: 'Batik Air Malaysia', priority: false },
  { slug: 'lion-air', name: 'Lion Air', priority: false },
  { slug: 'china-southern', name: 'China Southern', priority: false },
  { slug: 'air-china', name: 'Air China', priority: false },
  { slug: 'china-eastern', name: 'China Eastern', priority: false },
  { slug: 'xiamenair', name: 'XiamenAir', priority: false },
  { slug: 'sichuan-airlines', name: 'Sichuan Airlines', priority: false },
  { slug: 'hainan-airlines', name: 'Hainan Airlines', priority: false },
  { slug: 'shanghai-airlines', name: 'Shanghai Airlines', priority: false },
  { slug: 'air-macau', name: 'Air Macau', priority: false },
  { slug: 'etihad-airways', name: 'Etihad Airways', priority: false },
  { slug: 'oman-air', name: 'Oman Air', priority: false },
  { slug: 'saudia', name: 'Saudia', priority: false },
  { slug: 'kuwait-airways', name: 'Kuwait Airways', priority: false },
  { slug: 'gulf-air', name: 'Gulf Air', priority: false },
  { slug: 'air-india', name: 'Air India', priority: false },
  { slug: 'indigo', name: 'IndiGo', priority: false },
  { slug: 'srilankan-airlines', name: 'SriLankan Airlines', priority: false },
  { slug: 'ethiopian-airlines', name: 'Ethiopian Airlines', priority: false },
  { slug: 'kenya-airways', name: 'Kenya Airways', priority: false },
  { slug: 'egyptair', name: 'EgyptAir', priority: false },
  { slug: 'lufthansa', name: 'Lufthansa', priority: false },
  { slug: 'air-france', name: 'Air France', priority: false },
  { slug: 'klm', name: 'KLM', priority: false },
  { slug: 'british-airways', name: 'British Airways', priority: false },
  { slug: 'swiss-international-air-lines', name: 'SWISS', priority: false },
  { slug: 'austrian-airlines', name: 'Austrian Airlines', priority: false },
  { slug: 'finnair', name: 'Finnair', priority: false },
  { slug: 'lot-polish-airlines', name: 'LOT Polish Airlines', priority: false },
  { slug: 'united-airlines', name: 'United Airlines', priority: false },
  { slug: 'american-airlines', name: 'American Airlines', priority: false },
  { slug: 'air-canada', name: 'Air Canada', priority: false },
  { slug: 'qantas', name: 'Qantas', priority: false },
  { slug: 'jetstar-airways', name: 'Jetstar Airways', priority: false },
  { slug: 'air-new-zealand', name: 'Air New Zealand', priority: false },
  { slug: 'delta-air-lines', name: 'Delta Air Lines', priority: false },
  { slug: 'alaska-airlines', name: 'Alaska Airlines', priority: false },
  { slug: 'aeromexico', name: 'Aeromexico', priority: false },
  { slug: 'air-mauritius', name: 'Air Mauritius', priority: false },
];

export const brandPositioning = {
  establishedYear: 2008,
  yearsOfService: 18,
  airlineCount: 66,
};

const airlineThemes: Record<string, LandingTheme> = {
  'vietnam-airlines': { primary: '#0a3d78', accent: '#d7a52a', soft: '#edf4fb' }, 'vietjet-air': { primary: '#be1d2d', accent: '#f4c126', soft: '#fff1ef' }, 'bamboo-airways': { primary: '#196b53', accent: '#8fc44b', soft: '#eff8f2' }, 'eva-air': { primary: '#0b705f', accent: '#f0b11e', soft: '#eaf7f3' }, 'china-airlines': { primary: '#1465a4', accent: '#ce344a', soft: '#edf5fb' }, 'starlux-airlines': { primary: '#24334a', accent: '#aa824d', soft: '#f5f1eb' }, 'china-southern': { primary: '#1f5fa8', accent: '#84b6df', soft: '#edf5fc' }, 'air-china': { primary: '#b51f31', accent: '#e0ad2f', soft: '#fff1f2' }, 'china-eastern': { primary: '#a51d3f', accent: '#76a7d7', soft: '#f9eef2' }, 'korean-air': { primary: '#174f96', accent: '#dc3344', soft: '#edf4fc' }, 'all-nippon-airways': { primary: '#1455a0', accent: '#48a6dd', soft: '#edf5fc' }, 'japan-airlines': { primary: '#bf1e2e', accent: '#26364d', soft: '#fff1f2' }, 'singapore-airlines': { primary: '#203c77', accent: '#e48b25', soft: '#eef1fa' }, 'cathay-pacific': { primary: '#006a61', accent: '#93cfc5', soft: '#ecf8f5' }, 'qatar-airways': { primary: '#5f1c43', accent: '#d6b5c6', soft: '#f8eff4' }, 'turkish-airlines': { primary: '#be1e2d', accent: '#f1d7d8', soft: '#fff0f1' }, emirates: { primary: '#bd1e2e', accent: '#b98c2e', soft: '#fff1f1' }, 'etihad-airways': { primary: '#675744', accent: '#c3a46d', soft: '#f5f1eb' }, 'asiana-airlines': { primary: '#9b1c31', accent: '#b6aa84', soft: '#fff1f4' }, lufthansa: { primary: '#143c78', accent: '#f3c21c', soft: '#edf3fc' }, 'air-france': { primary: '#142d66', accent: '#e0323b', soft: '#eef2fb' }, klm: { primary: '#1172b8', accent: '#ffffff', soft: '#edf7fd' }, 'british-airways': { primary: '#1e3f79', accent: '#c11f3a', soft: '#eef2fa' }, 'air-canada': { primary: '#c52332', accent: '#1d2836', soft: '#fff1f2' }, qantas: { primary: '#b71d34', accent: '#ffffff', soft: '#fff1f2' }, 'air-new-zealand': { primary: '#192127', accent: '#aab9c3', soft: '#f1f3f4' },
};

const extendedAirlineThemes: LandingTheme[] = [
  { primary: '#1f5f8c', accent: '#78b6d9', soft: '#edf6fb' },
  { primary: '#8d2440', accent: '#d6a1ae', soft: '#fcf0f3' },
  { primary: '#196652', accent: '#9bcf86', soft: '#edf8f1' },
  { primary: '#644f8e', accent: '#c6b1e1', soft: '#f4f0fa' },
  { primary: '#9a5a20', accent: '#e4bb75', soft: '#fff5e9' },
  { primary: '#3d5268', accent: '#9eb8cc', soft: '#eff4f8' },
];

export const airlineServices: Service[] = [
  { slug: 'doi-ngay-ve', label: 'Đổi ngày vé', title: 'Đổi ngày vé', description: 'Thông tin cần chuẩn bị khi kiểm tra khả năng đổi ngày bay theo booking.', checklist: ['Chuẩn bị mã đặt chỗ và tên hành khách.', 'Nêu rõ ngày bay mới mong muốn.', 'Xác nhận lại điều kiện vé và chi phí trước khi xử lý.'] },
  { slug: 'mua-them-hanh-ly', label: 'Mua thêm hành lý', title: 'Mua thêm hành lý', description: 'Thông tin cần chuẩn bị trước khi kiểm tra mua thêm hành lý theo booking.', checklist: ['Chuẩn bị mã đặt chỗ và hành trình.', 'Kiểm tra hành lý đã gồm trong vé.', 'Xác nhận chặng áp dụng, mức hành lý và chi phí.'] },
  { slug: 'sua-ten-ve', label: 'Sửa tên vé', title: 'Sửa tên vé máy bay', description: 'Thông tin cần chuẩn bị khi kiểm tra yêu cầu chỉnh sửa tên hành khách.', checklist: ['Đối chiếu tên trên booking với giấy tờ.', 'Xác định lỗi cần chỉnh sửa.', 'Xác nhận điều kiện của từng hãng và hạng vé.'] },
  { slug: 'nang-hang-ve', label: 'Nâng hạng vé', title: 'Nâng hạng vé máy bay', description: 'Thông tin cần chuẩn bị trước khi kiểm tra khả năng nâng hạng theo hành trình.', checklist: ['Chuẩn bị booking và hạng vé hiện tại.', 'Nêu rõ chặng hoặc hạng dịch vụ mong muốn.', 'Kiểm tra chỗ, điều kiện và khoản chênh lệch.'] },
  { slug: 'chon-cho', label: 'Check-in và chọn chỗ', title: 'Check-in và chọn chỗ ngồi', description: 'Thông tin kiểm tra check-in và chọn chỗ ngồi theo từng chặng bay, hãng và điều kiện vé.', checklist: ['Xác định số booking và chặng bay.', 'Nêu nhu cầu check-in hoặc ghế ngồi.', 'Xác nhận phí và điều kiện áp dụng trước khi chọn.'] },
  { slug: 'xe-lan', label: 'Đặt xe lăn', title: 'Đặt xe lăn và hỗ trợ di chuyển', description: 'Hướng dẫn chuẩn bị yêu cầu hỗ trợ xe lăn theo hãng và sân bay.', checklist: ['Chuẩn bị booking và thông tin hành khách.', 'Mô tả mức hỗ trợ cần thiết.', 'Gửi yêu cầu đủ sớm theo quy định từng hãng.'] },
  { slug: 've-thu-cung', label: 'Vé thú cưng', title: 'Vé thú cưng chó mèo', description: 'Thông tin chuẩn bị khi kiểm tra vận chuyển thú cưng cùng chuyến bay.', checklist: ['Xác định loại thú cưng, cân nặng và lồng vận chuyển.', 'Kiểm tra từng chặng bay và điểm nối chuyến.', 'Đối chiếu giấy tờ, hạn mức và yêu cầu của hãng.'] },
  { slug: 'dat-ve-may-bay', label: 'Mua / đặt vé', title: 'Mua và đặt vé máy bay', description: 'Thông tin cần chuẩn bị khi kiểm tra hành trình và đặt vé theo từng hãng bay.', checklist: ['Chuẩn bị điểm đi, điểm đến và ngày bay.', 'Xác định số hành khách và yêu cầu hành lý.', 'Kiểm tra điều kiện vé theo hãng khai thác.'] },
  { slug: 'ho-tro-tieng-anh', label: 'Hỗ trợ tiếng Anh', title: 'Hỗ trợ tiếng Anh', description: 'Thông tin định hướng khi cần trao đổi tiếng Anh theo từng hãng bay và hành trình.', checklist: ['Chuẩn bị mã đặt chỗ và thông tin hành khách.', 'Nêu rõ nội dung cần hỗ trợ.', 'Xác nhận kênh liên hệ chính thức của hãng.'] },
  { slug: 'tre-em-di-mot-minh', label: 'Trẻ em đi một mình', title: 'Dịch vụ trẻ em đi một mình', description: 'Thông tin cần chuẩn bị khi kiểm tra dịch vụ trẻ em đi một mình theo hãng bay.', checklist: ['Xác định tuổi của trẻ và hành trình.', 'Chuẩn bị thông tin người đưa/đón.', 'Kiểm tra điều kiện, thời hạn và giấy tờ theo hãng.'] },
  { slug: 'booking-visa', label: 'Booking xin visa', title: 'Booking hỗ trợ hồ sơ visa', description: 'Thông tin định hướng chuẩn bị booking khi cần hỗ trợ hồ sơ visa theo hành trình.', checklist: ['Xác định quốc gia và mục đích chuyến đi.', 'Chuẩn bị hành trình dự kiến.', 'Đối chiếu yêu cầu hiện hành tại nguồn chính thức.'] },
  { slug: 'booking-nhap-canh', label: 'Booking nhập cảnh', title: 'Booking hỗ trợ nhập cảnh', description: 'Thông tin định hướng chuẩn bị booking và hành trình trước khi kiểm tra yêu cầu nhập cảnh.', checklist: ['Xác định quốc gia đến và điểm transit.', 'Chuẩn bị giấy tờ hành trình.', 'Xác nhận yêu cầu nhập cảnh từ nguồn chính thức.'] },
  { slug: 'tong-dai-hang-bay', label: 'Tổng đài', title: 'Tổng đài và hỗ trợ khách hàng', description: 'Điểm điều hướng chuẩn bị thông tin trước khi liên hệ tổng đài hoặc kênh hỗ trợ của hãng.', checklist: ['Chuẩn bị mã đặt chỗ.', 'Nêu rõ hành trình và yêu cầu.', 'Chỉ liên hệ qua kênh xác minh chính thức.'] },
  { slug: 'van-phong-ho-tro', label: 'Văn phòng / điểm hỗ trợ', title: 'Văn phòng và điểm hỗ trợ', description: 'Thông tin định hướng xác minh điểm hỗ trợ, văn phòng hoặc kênh liên hệ chính thức theo hãng.', checklist: ['Xác minh địa chỉ qua kênh chính thức.', 'Chuẩn bị booking hoặc giấy tờ liên quan.', 'Không thanh toán qua kênh không được xác minh.'] },
  { slug: 'dai-ly-phong-ve', label: 'Đại lý phòng vé', title: 'Đại lý và phòng vé', description: 'Thông tin định hướng trước khi làm việc với đại lý hoặc phòng vé theo hãng bay.', checklist: ['Kiểm tra kênh bán và thông tin pháp lý.', 'Đối chiếu điều kiện vé trước thanh toán.', 'Lưu chứng từ giao dịch và mã đặt chỗ.'] },
  { slug: 'ho-tro-nguoi-cao-tuoi', label: 'Hỗ trợ người cao tuổi', title: 'Hỗ trợ người cao tuổi', description: 'Thông tin chuẩn bị khi hành khách cao tuổi cần hỗ trợ theo hãng bay và sân bay.', checklist: ['Chuẩn bị tình trạng hành khách và hành trình.', 'Xác định mức hỗ trợ cần thiết.', 'Gửi yêu cầu theo đúng thời hạn của hãng.'] },
  { slug: 'xac-nhan-ve', label: 'Xác nhận vé', title: 'Xác nhận vé máy bay', description: 'Thông tin định hướng xác nhận booking, hành trình và điều kiện vé theo hãng bay.', checklist: ['Chuẩn bị mã đặt chỗ và họ tên hành khách.', 'Đối chiếu chặng bay và thời gian.', 'Kiểm tra thông tin trực tiếp trên chứng từ hoặc kênh chính thức.'] },
  { slug: 've-tu-thanh-pho-nuoc-ngoai-ve-viet-nam', label: 'Vé từ thành phố nước ngoài về Việt Nam', title: 'Vé từ thành phố nước ngoài về Việt Nam', description: 'Thông tin định hướng hành trình từ thành phố nước ngoài về Việt Nam theo hãng bay.', checklist: ['Xác định thành phố khởi hành và điểm đến tại Việt Nam.', 'Kiểm tra transit, hành lý và điều kiện chặng bay.', 'Đối chiếu hãng trực tiếp khai thác trước khi đặt vé.'] },
  { slug: 've-tu-quoc-gia-ve-viet-nam', label: 'Vé từ quốc gia về Việt Nam', title: 'Vé từ quốc gia về Việt Nam', description: 'Thông tin định hướng hành trình từ quốc gia nước ngoài về Việt Nam theo hãng bay.', checklist: ['Xác định quốc gia khởi hành và điểm đến tại Việt Nam.', 'Kiểm tra yêu cầu giấy tờ và transit.', 'Đối chiếu lịch bay, hành lý và điều kiện booking.'] },
];

const domesticDestinations = ['ha-noi', 'ho-chi-minh', 'da-nang', 'phu-quoc', 'nha-trang', 'da-lat', 'hue', 'quy-nhon', 'hai-phong', 'con-dao'];
const domesticLabels: Record<string, string> = { 'ha-noi': 'Hà Nội', 'ho-chi-minh': 'TP. Hồ Chí Minh', 'da-nang': 'Đà Nẵng', 'phu-quoc': 'Phú Quốc', 'nha-trang': 'Nha Trang', 'da-lat': 'Đà Lạt', hue: 'Huế', 'quy-nhon': 'Quy Nhơn', 'hai-phong': 'Hải Phòng', 'con-dao': 'Côn Đảo' };
const internationalMarkets = [
  ['my', 'Mỹ'], ['nhat-ban', 'Nhật Bản'], ['han-quoc', 'Hàn Quốc'], ['chau-au', 'Châu Âu'], ['uc', 'Úc'], ['canada', 'Canada'], ['dong-nam-a', 'Đông Nam Á'], ['trung-quoc', 'Trung Quốc'], ['dai-loan', 'Đài Loan'], ['thai-lan', 'Thái Lan'], ['singapore', 'Singapore'], ['malaysia', 'Malaysia'], ['indonesia', 'Indonesia'], ['philippines', 'Philippines'], ['an-do', 'Ấn Độ'], ['hong-kong', 'Hồng Kông'], ['phap', 'Pháp'], ['anh', 'Anh'], ['duc', 'Đức'], ['italy', 'Ý'], ['tay-ban-nha', 'Tây Ban Nha'], ['ha-lan', 'Hà Lan'], ['thuy-si', 'Thụy Sĩ'], ['ao', 'Áo'], ['hungary', 'Hungary'], ['cong-hoa-sec', 'Cộng hòa Séc'], ['ba-lan', 'Ba Lan'], ['nga', 'Nga'], ['new-zealand', 'New Zealand'], ['uae', 'Các Tiểu vương quốc Ả Rập Thống nhất'], ['qatar', 'Qatar'], ['tho-nhi-ky', 'Thổ Nhĩ Kỳ'], ['a-rap-xe-ut', 'Ả Rập Xê Út'], ['ai-cap', 'Ai Cập'], ['nam-phi', 'Nam Phi'], ['kenya', 'Kenya'],
] as const;
const inboundMarkets = internationalMarkets.map(([slug]) => slug);
const internationalOriginCities = ['ha-noi', 'ho-chi-minh', 'da-nang', 'nha-trang', 'phu-quoc'] as const;
const internationalCityDestinations = [
  ['new-york', 'New York', 'my'], ['los-angeles', 'Los Angeles', 'my'], ['tokyo', 'Tokyo', 'nhat-ban'], ['osaka', 'Osaka', 'nhat-ban'], ['seoul', 'Seoul', 'han-quoc'], ['busan', 'Busan', 'han-quoc'], ['paris', 'Paris', 'phap'], ['london', 'London', 'anh'], ['sydney', 'Sydney', 'uc'], ['toronto', 'Toronto', 'canada'], ['singapore-city', 'Singapore', 'singapore'], ['bangkok', 'Bangkok', 'thai-lan'], ['taipei', 'Đài Bắc', 'dai-loan'], ['hong-kong', 'Hồng Kông', 'hong-kong'], ['phnom-penh', 'Phnom Penh', 'campuchia'], ['dubai', 'Dubai', 'uae'], ['doha', 'Doha', 'qatar'], ['istanbul', 'Istanbul', 'tho-nhi-ky'], ['amsterdam', 'Amsterdam', 'ha-lan'], ['barcelona', 'Barcelona', 'tay-ban-nha'], ['zurich', 'Zurich', 'thuy-si'], ['vienna', 'Vienna', 'ao'], ['cairo', 'Cairo', 'ai-cap'], ['johannesburg', 'Johannesburg', 'nam-phi'],
] as const;
const destinationRegions = [
  { slug: 'diem-den-chau-my', label: 'Châu Mỹ' }, { slug: 'diem-den-chau-au', label: 'Châu Âu' }, { slug: 'diem-den-dong-au', label: 'Đông Âu' }, { slug: 'diem-den-chau-a', label: 'Châu Á' }, { slug: 'diem-den-chau-uc', label: 'Châu Úc' }, { slug: 'diem-den-dong-nam-a', label: 'Đông Nam Á' }, { slug: 'diem-den-trung-dong', label: 'Trung Đông' }, { slug: 'diem-den-nam-a', label: 'Nam Á' }, { slug: 'diem-den-chau-phi', label: 'Châu Phi' },
] as const;
const destinationCountries = [
  { slug: 'my', label: 'Mỹ', region: 'diem-den-chau-my', cities: [['new-york', 'New York'], ['los-angeles', 'Los Angeles'], ['san-francisco', 'San Francisco'], ['houston', 'Houston'], ['seattle', 'Seattle'], ['chicago', 'Chicago'], ['boston', 'Boston'], ['dallas', 'Dallas'], ['washington-dc', 'Washington DC']] },
  { slug: 'canada', label: 'Canada', region: 'diem-den-chau-my', cities: [['toronto', 'Toronto'], ['vancouver', 'Vancouver'], ['montreal', 'Montreal']] },
  { slug: 'anh', label: 'Anh', region: 'diem-den-chau-au', cities: [['london', 'London'], ['manchester', 'Manchester']] },
  { slug: 'phap', label: 'Pháp', region: 'diem-den-chau-au', cities: [['paris', 'Paris'], ['lyon', 'Lyon']] },
  { slug: 'duc', label: 'Đức', region: 'diem-den-chau-au', cities: [['frankfurt', 'Frankfurt'], ['berlin', 'Berlin'], ['munich', 'Munich']] },
  { slug: 'italy', label: 'Ý', region: 'diem-den-chau-au', cities: [['rome', 'Rome'], ['milan', 'Milan']] },
  { slug: 'nhat-ban', label: 'Nhật Bản', region: 'diem-den-chau-a', cities: [['tokyo', 'Tokyo'], ['osaka', 'Osaka'], ['fukuoka', 'Fukuoka']] },
  { slug: 'han-quoc', label: 'Hàn Quốc', region: 'diem-den-chau-a', cities: [['seoul', 'Seoul'], ['busan', 'Busan']] },
  { slug: 'trung-quoc', label: 'Trung Quốc', region: 'diem-den-chau-a', cities: [['beijing', 'Bắc Kinh'], ['shanghai', 'Thượng Hải'], ['guangzhou', 'Quảng Châu']] },
  { slug: 'dai-loan', label: 'Đài Loan', region: 'diem-den-chau-a', cities: [['taipei', 'Đài Bắc'], ['kaohsiung', 'Cao Hùng']] },
  { slug: 'uc', label: 'Úc', region: 'diem-den-chau-uc', cities: [['sydney', 'Sydney'], ['melbourne', 'Melbourne'], ['perth', 'Perth']] },
  { slug: 'new-zealand', label: 'New Zealand', region: 'diem-den-chau-uc', cities: [['auckland', 'Auckland']] },
  { slug: 'singapore', label: 'Singapore', region: 'diem-den-dong-nam-a', cities: [['singapore-city', 'Singapore']] },
  { slug: 'thai-lan', label: 'Thái Lan', region: 'diem-den-dong-nam-a', cities: [['bangkok', 'Bangkok'], ['phuket', 'Phuket']] },
  { slug: 'malaysia', label: 'Malaysia', region: 'diem-den-dong-nam-a', cities: [['kuala-lumpur', 'Kuala Lumpur']] },
  { slug: 'indonesia', label: 'Indonesia', region: 'diem-den-dong-nam-a', cities: [['jakarta', 'Jakarta'], ['bali', 'Bali']] },
  { slug: 'philippines', label: 'Philippines', region: 'diem-den-dong-nam-a', cities: [['manila', 'Manila']] },
  { slug: 'uae', label: 'Các Tiểu vương quốc Ả Rập Thống nhất', region: 'diem-den-trung-dong', cities: [['dubai', 'Dubai'], ['abu-dhabi', 'Abu Dhabi']] },
  { slug: 'qatar', label: 'Qatar', region: 'diem-den-trung-dong', cities: [['doha', 'Doha']] },
  { slug: 'tho-nhi-ky', label: 'Thổ Nhĩ Kỳ', region: 'diem-den-trung-dong', cities: [['istanbul', 'Istanbul']] },
  { slug: 'an-do', label: 'Ấn Độ', region: 'diem-den-nam-a', cities: [['new-delhi', 'New Delhi'], ['mumbai', 'Mumbai']] },
  { slug: 'hong-kong', label: 'Hồng Kông', region: 'diem-den-chau-a', cities: [['hong-kong', 'Hồng Kông'], ['macau', 'Macau']] },
  { slug: 'campuchia', label: 'Campuchia', region: 'diem-den-dong-nam-a', cities: [['phnom-penh', 'Phnom Penh'], ['siem-reap', 'Siem Reap']] },
  { slug: 'lao', label: 'Lào', region: 'diem-den-dong-nam-a', cities: [['vientiane', 'Vientiane']] },
  { slug: 'myanmar', label: 'Myanmar', region: 'diem-den-dong-nam-a', cities: [['yangon', 'Yangon']] },
  { slug: 'tay-ban-nha', label: 'Tây Ban Nha', region: 'diem-den-chau-au', cities: [['barcelona', 'Barcelona'], ['madrid', 'Madrid']] },
  { slug: 'ha-lan', label: 'Hà Lan', region: 'diem-den-chau-au', cities: [['amsterdam', 'Amsterdam']] },
  { slug: 'thuy-si', label: 'Thụy Sĩ', region: 'diem-den-chau-au', cities: [['zurich', 'Zurich']] },
  { slug: 'ao', label: 'Áo', region: 'diem-den-chau-au', cities: [['vienna', 'Vienna']] },
  { slug: 'hungary', label: 'Hungary', region: 'diem-den-dong-au', cities: [['budapest', 'Budapest']] },
  { slug: 'cong-hoa-sec', label: 'Cộng hòa Séc', region: 'diem-den-dong-au', cities: [['prague', 'Prague']] },
  { slug: 'ba-lan', label: 'Ba Lan', region: 'diem-den-dong-au', cities: [['warsaw', 'Warsaw']] },
  { slug: 'nga', label: 'Nga', region: 'diem-den-dong-au', cities: [['moscow', 'Moscow'], ['saint-petersburg', 'Saint Petersburg']] },
  { slug: 'a-rap-xe-ut', label: 'Ả Rập Xê Út', region: 'diem-den-trung-dong', cities: [['riyadh', 'Riyadh']] },
  { slug: 'oman', label: 'Oman', region: 'diem-den-trung-dong', cities: [['muscat', 'Muscat']] },
  { slug: 'ai-cap', label: 'Ai Cập', region: 'diem-den-chau-phi', cities: [['cairo', 'Cairo']] },
  { slug: 'nam-phi', label: 'Nam Phi', region: 'diem-den-chau-phi', cities: [['johannesburg', 'Johannesburg']] },
  { slug: 'kenya', label: 'Kenya', region: 'diem-den-chau-phi', cities: [['nairobi', 'Nairobi']] },
] as const;

const destinationThemes: Record<string, LandingTheme> = {
  my: { primary: '#1e3a6d', accent: '#b22234', soft: '#eef3fb' }, canada: { primary: '#be1e2d', accent: '#ffffff', soft: '#fff1f1' }, anh: { primary: '#183a77', accent: '#c92034', soft: '#eef3fb' }, phap: { primary: '#1f4e93', accent: '#d9283b', soft: '#eef3fb' }, duc: { primary: '#20262f', accent: '#d9283b', soft: '#f1f2f4' }, italy: { primary: '#1b7a55', accent: '#cf3341', soft: '#edf7f1' }, 'nhat-ban': { primary: '#ffffff', accent: '#c91f37', soft: '#fff4f5' }, 'han-quoc': { primary: '#204d98', accent: '#cf3341', soft: '#eef3fb' }, 'trung-quoc': { primary: '#c51f32', accent: '#f0c22c', soft: '#fff2f2' }, 'dai-loan': { primary: '#184f92', accent: '#c8293c', soft: '#edf4fc' }, uc: { primary: '#193d7a', accent: '#ce2f44', soft: '#eef3fb' }, 'new-zealand': { primary: '#162c5e', accent: '#c62f42', soft: '#eef2fb' }, singapore: { primary: '#c82535', accent: '#ffffff', soft: '#fff2f3' }, 'thai-lan': { primary: '#254c98', accent: '#c9283c', soft: '#eef3fb' }, malaysia: { primary: '#1c4b96', accent: '#d9273b', soft: '#eef3fb' }, indonesia: { primary: '#c92635', accent: '#ffffff', soft: '#fff2f2' }, philippines: { primary: '#214f9a', accent: '#c92d3e', soft: '#eef3fb' }, uae: { primary: '#14664d', accent: '#cb2436', soft: '#ecf6f1' }, qatar: { primary: '#671e44', accent: '#ffffff', soft: '#f8eff4' }, 'tho-nhi-ky': { primary: '#c92435', accent: '#ffffff', soft: '#fff1f2' }, 'an-do': { primary: '#e07c1f', accent: '#1b6d58', soft: '#fff6ec' }, 'hong-kong': { primary: '#c82034', accent: '#ffffff', soft: '#fff2f3' }, campuchia: { primary: '#1d4a8f', accent: '#c92b3c', soft: '#eef3fb' }, lao: { primary: '#1f3d86', accent: '#ca2738', soft: '#eef2fb' }, myanmar: { primary: '#c82032', accent: '#f1c42c', soft: '#fff5eb' }, 'tay-ban-nha': { primary: '#a92032', accent: '#e7b927', soft: '#fff5e9' }, 'ha-lan': { primary: '#204a8b', accent: '#d56a35', soft: '#eff4fb' }, 'thuy-si': { primary: '#bf2433', accent: '#ffffff', soft: '#fff2f3' }, ao: { primary: '#c52938', accent: '#ffffff', soft: '#fff2f3' }, hungary: { primary: '#1e7a53', accent: '#c83342', soft: '#edf7f1' }, 'cong-hoa-sec': { primary: '#1d4d90', accent: '#c72d3d', soft: '#eef3fb' }, 'ba-lan': { primary: '#cc3446', accent: '#ffffff', soft: '#fff2f3' }, nga: { primary: '#1f4d96', accent: '#ce3140', soft: '#eef3fb' }, 'a-rap-xe-ut': { primary: '#146a4e', accent: '#ffffff', soft: '#edf7f1' }, oman: { primary: '#c72a39', accent: '#237456', soft: '#fff3f2' }, 'ai-cap': { primary: '#c42a39', accent: '#20272e', soft: '#fff4ef' }, 'nam-phi': { primary: '#1e6b54', accent: '#c92b3d', soft: '#edf7f2' }, kenya: { primary: '#1f2024', accent: '#c62b3b', soft: '#f4f4f4' },
};

export function getLandingTheme(slug: string): LandingTheme {
  const airline = airlines.find((item) => slug === `hang-bay-${item.slug}` || slug.endsWith(`-${item.slug}`));
  if (airline) return airlineThemes[airline.slug] ?? extendedAirlineThemes[airlines.findIndex((item) => item.slug === airline.slug) % extendedAirlineThemes.length];
  const country = destinationCountries.find((item) => slug.includes(`-${item.slug}`) || item.cities.some(([city]) => slug.endsWith(`-${city}`)));
  if (country) return destinationThemes[country.slug] ?? brandTheme;
  return brandTheme;
}

export function getAirlineFooterBackground(airlineSlug?: string) {
  if (airlineSlug === 'eva-air') return toPublicAssetUrl('/manus-storage/eva-air-footer-airport-hub_95a5baca.png');
  return undefined;
}

export type HeroAsset = { url: string; alt: string; kind: 'airline' | 'destination' | 'service' | 'default' };

const heroAssets = {
  default: { url: '/manus-storage/kvbk-airline-hero-style-reference_c3bb3b4c.png', alt: 'Máy bay thương mại tại sân bay quốc tế cùng tiếp viên hàng không hư cấu', kind: 'default' as const },
  airline: {
    'vietnam-airlines': { url: '/manus-storage/kvbk-airline-vietnam-airlines_5fd8030a.png', alt: 'Máy bay thương mại và tiếp viên hư cấu minh họa hành trình Vietnam Airlines', kind: 'airline' as const },
    'vietjet-air': { url: '/manus-storage/kvbk-airline-vietjet-air_406f5744.png', alt: 'Máy bay thương mại và tiếp viên hư cấu minh họa hành trình Vietjet Air', kind: 'airline' as const },
    'eva-air': { url: '/manus-storage/hero-eva-air-uniform-green_4c34273d.webp', alt: 'Máy bay và tiếp viên EVA Air tại sân bay quốc tế cho hành trình EVA Air', kind: 'airline' as const },
    'korean-air': { url: '/manus-storage/kvbk-airline-korean-air_c6d89c55.png', alt: 'Máy bay thương mại và tiếp viên hư cấu minh họa hành trình Korean Air', kind: 'airline' as const },
    'all-nippon-airways': { url: '/manus-storage/kvbk-airline-all-nippon-airways_1687af46.png', alt: 'Máy bay thương mại và tiếp viên hư cấu minh họa hành trình All Nippon Airways', kind: 'airline' as const },
    'japan-airlines': { url: '/manus-storage/kvbk-airline-japan-airlines_7eca4e2b.png', alt: 'Máy bay thương mại và tiếp viên hư cấu minh họa hành trình Japan Airlines', kind: 'airline' as const },
    'singapore-airlines': { url: '/manus-storage/kvbk-airline-singapore-airlines_bf5bdf5d.png', alt: 'Máy bay thương mại và tiếp viên hư cấu minh họa hành trình Singapore Airlines', kind: 'airline' as const },
    'cathay-pacific': { url: '/manus-storage/kvbk-airline-cathay-pacific_187490c5.png', alt: 'Máy bay thương mại và tiếp viên hư cấu minh họa hành trình Cathay Pacific', kind: 'airline' as const },
    'china-airlines': { url: '/manus-storage/kvbk-airline-china-airlines_50ee1926.png', alt: 'Máy bay thương mại và tiếp viên hư cấu minh họa hành trình China Airlines', kind: 'airline' as const },
    'starlux-airlines': { url: '/manus-storage/kvbk-airline-starlux-airlines_9b5bc6e2.png', alt: 'Máy bay thương mại và tiếp viên hư cấu minh họa hành trình Starlux Airlines', kind: 'airline' as const },
    'qatar-airways': { url: '/manus-storage/kvbk-airline-qatar-airways_4f3c5edf.png', alt: 'Máy bay thương mại và tiếp viên hư cấu minh họa hành trình Qatar Airways', kind: 'airline' as const },
    emirates: { url: '/manus-storage/kvbk-airline-emirates_9df19fb4.png', alt: 'Máy bay thương mại và tiếp viên hư cấu minh họa hành trình Emirates', kind: 'airline' as const },
    'turkish-airlines': { url: '/manus-storage/kvbk-airline-turkish-airlines_fe98c0a2.png', alt: 'Máy bay thương mại và tiếp viên hư cấu minh họa hành trình Turkish Airlines', kind: 'airline' as const },
    'bamboo-airways': { url: '/manus-storage/kvbk-airline-bamboo-airways_8cb4360a.png', alt: 'Máy bay thương mại và tiếp viên hư cấu minh họa hành trình Bamboo Airways', kind: 'airline' as const },
    'air-france': { url: '/manus-storage/kvbk-airline-air-france_2bdb37d6.png', alt: 'Máy bay thương mại và tiếp viên hư cấu minh họa hành trình Air France', kind: 'airline' as const },
    airasia: { url: '/manus-storage/kvbk-airline-airasia_1bf61486.png', alt: 'Máy bay thương mại và tiếp viên hư cấu minh họa hành trình AirAsia', kind: 'airline' as const },
    'asiana-airlines': { url: '/manus-storage/kvbk-airline-asiana-airlines_d3abb875.png', alt: 'Máy bay thương mại và tiếp viên hư cấu minh họa hành trình Asiana Airlines', kind: 'airline' as const },
    'thai-airways': { url: '/manus-storage/kvbk-airline-thai-airways_c0885768.png', alt: 'Máy bay thương mại và tiếp viên hư cấu minh họa hành trình Thai Airways', kind: 'airline' as const },
    'malaysia-airlines': { url: '/manus-storage/kvbk-airline-malaysia-airlines_f756eb9e.png', alt: 'Máy bay thương mại và tiếp viên hư cấu minh họa hành trình Malaysia Airlines', kind: 'airline' as const },
    qantas: { url: '/manus-storage/kvbk-airline-qantas_2bbe622c.png', alt: 'Máy bay thương mại và tiếp viên hư cấu minh họa hành trình Qantas', kind: 'airline' as const },
    'american-airlines': { url: '/manus-storage/kvbk-airline-american-airlines_e483cd54.png', alt: 'Máy bay thương mại và tiếp viên hư cấu minh họa hành trình American Airlines', kind: 'airline' as const },
    'united-airlines': { url: '/manus-storage/hero-united-airlines-v2_84799ef7.png', alt: 'Máy bay và tiếp viên minh họa theo sắc xanh navy United Airlines', kind: 'airline' as const },
    'delta-air-lines': { url: '/manus-storage/kvbk-airline-delta-air-lines_deb76506.png', alt: 'Máy bay thương mại và tiếp viên hư cấu minh họa hành trình Delta Air Lines', kind: 'airline' as const },
    'air-canada': { url: '/manus-storage/kvbk-airline-air-canada_74e64dfe.png', alt: 'Máy bay thương mại và tiếp viên hư cấu minh họa hành trình Air Canada', kind: 'airline' as const },
    'air-china': { url: '/manus-storage/kvbk-airline-air-china_de95e060.png', alt: 'Máy bay thương mại và tiếp viên hư cấu minh họa hành trình Air China', kind: 'airline' as const },
    'china-eastern': { url: '/manus-storage/kvbk-airline-china-eastern-airlines_606d7079.png', alt: 'Máy bay thương mại và tiếp viên hư cấu minh họa hành trình China Eastern', kind: 'airline' as const },
    'china-southern': { url: '/manus-storage/kvbk-airline-china-southern-airlines_3a17ec95.png', alt: 'Máy bay thương mại và tiếp viên hư cấu minh họa hành trình China Southern', kind: 'airline' as const },
    xiamenair: { url: '/manus-storage/kvbk-airline-xiamenair_a0d6118a.png', alt: 'Máy bay thương mại và tiếp viên hư cấu minh họa hành trình XiamenAir', kind: 'airline' as const },
    'cebu-pacific': { url: '/manus-storage/kvbk-airline-cebu-pacific_8d58910b.png', alt: 'Máy bay thương mại và tiếp viên hư cấu minh họa hành trình Cebu Pacific', kind: 'airline' as const },
    'philippine-airlines': { url: '/manus-storage/kvbk-airline-philippine-airlines_7fe00d52.png', alt: 'Máy bay thương mại và tiếp viên hư cấu minh họa hành trình Philippine Airlines', kind: 'airline' as const },
    'air-india': { url: '/manus-storage/kvbk-airline-air-india_2ce813c.png', alt: 'Máy bay thương mại và tiếp viên hư cấu minh họa hành trình Air India', kind: 'airline' as const },
    indigo: { url: '/manus-storage/kvbk-airline-indigo_7b1f1e54.png', alt: 'Máy bay thương mại và tiếp viên hư cấu minh họa hành trình IndiGo', kind: 'airline' as const },
    'srilankan-airlines': { url: '/manus-storage/kvbk-airline-srilankan-airlines_6cc7da29.png', alt: 'Máy bay thương mại và tiếp viên hư cấu minh họa hành trình SriLankan Airlines', kind: 'airline' as const },
    'garuda-indonesia': { url: '/manus-storage/kvbk-airline-garuda-indonesia_597508ea.png', alt: 'Máy bay thương mại và tiếp viên hư cấu minh họa hành trình Garuda Indonesia', kind: 'airline' as const },
    scoot: { url: '/manus-storage/kvbk-airline-scoot_fb7a09b4.png', alt: 'Máy bay thương mại và tiếp viên hư cấu minh họa hành trình Scoot', kind: 'airline' as const },
    'vietravel-airlines': { url: '/manus-storage/hero-vietravel-airlines_fc0ae7f0.png', alt: 'Máy bay và tiếp viên minh họa theo sắc xanh vàng Vietravel Airlines', kind: 'airline' as const },
    'peach-aviation': { url: '/manus-storage/hero-peach-aviation_0059318d.png', alt: 'Máy bay và tiếp viên minh họa theo sắc tím Peach Aviation', kind: 'airline' as const },
    'hong-kong-airlines': { url: '/manus-storage/hero-hong-kong-airlines_400cea04.png', alt: 'Máy bay và tiếp viên minh họa theo sắc đỏ Hong Kong Airlines', kind: 'airline' as const },
    'hk-express': { url: '/manus-storage/hero-hk-express_56c13f6e.png', alt: 'Máy bay và tiếp viên minh họa theo sắc tím HK Express', kind: 'airline' as const },
    'batik-air-indonesia': { url: '/manus-storage/hero-batik-air-indonesia_a2816acc.png', alt: 'Máy bay và tiếp viên minh họa theo sắc đỏ Batik Air Indonesia', kind: 'airline' as const },
    'batik-air-malaysia': { url: '/manus-storage/hero-batik-air-malaysia_42e31218.png', alt: 'Máy bay và tiếp viên minh họa theo sắc đỏ xanh Batik Air Malaysia', kind: 'airline' as const },
    'lion-air': { url: '/manus-storage/hero-lion-air_2e45214a.png', alt: 'Máy bay và tiếp viên minh họa theo sắc đỏ Lion Air', kind: 'airline' as const },
    'sichuan-airlines': { url: '/manus-storage/hero-sichuan-airlines_f8d1cf04.png', alt: 'Máy bay và tiếp viên minh họa theo sắc đỏ vàng Sichuan Airlines', kind: 'airline' as const },
    'hainan-airlines': { url: '/manus-storage/hero-hainan-airlines_d484c474.png', alt: 'Máy bay và tiếp viên minh họa theo sắc đỏ vàng Hainan Airlines', kind: 'airline' as const },
    'shanghai-airlines': { url: '/manus-storage/hero-shanghai-airlines_5247daa9.png', alt: 'Máy bay và tiếp viên minh họa theo sắc xanh đỏ Shanghai Airlines', kind: 'airline' as const },
    'air-macau': { url: '/manus-storage/hero-air-macau_d6c8fcb4.png', alt: 'Máy bay và tiếp viên minh họa theo sắc đỏ vàng Air Macau', kind: 'airline' as const },
    'etihad-airways': { url: '/manus-storage/hero-etihad-airways_fbeca38d.png', alt: 'Máy bay và tiếp viên minh họa theo sắc đồng Etihad Airways', kind: 'airline' as const },
    'oman-air': { url: '/manus-storage/hero-oman-air_c9fa4ffe.png', alt: 'Máy bay và tiếp viên minh họa theo sắc xanh lục vàng Oman Air', kind: 'airline' as const },
    saudia: { url: '/manus-storage/hero-saudia_e759e889.png', alt: 'Máy bay và tiếp viên minh họa theo sắc xanh Saudia', kind: 'airline' as const },
    'kuwait-airways': { url: '/manus-storage/hero-kuwait-airways_6adfc5c1.png', alt: 'Máy bay và tiếp viên minh họa theo sắc xanh Kuwait Airways', kind: 'airline' as const },
    'gulf-air': { url: '/manus-storage/hero-gulf-air_6554797b.png', alt: 'Máy bay và tiếp viên minh họa theo sắc xanh vàng Gulf Air', kind: 'airline' as const },
    'ethiopian-airlines': { url: '/manus-storage/hero-ethiopian-airlines_13ff7b2f.png', alt: 'Máy bay và tiếp viên minh họa theo sắc xanh vàng đỏ Ethiopian Airlines', kind: 'airline' as const },
    'kenya-airways': { url: '/manus-storage/hero-kenya-airways_efbd4433.png', alt: 'Máy bay và tiếp viên minh họa theo sắc đỏ Kenya Airways', kind: 'airline' as const },
    egyptair: { url: '/manus-storage/hero-egyptair_45ad336e.png', alt: 'Máy bay và tiếp viên minh họa theo sắc xanh EgyptAir', kind: 'airline' as const },
    lufthansa: { url: '/manus-storage/hero-lufthansa_9a60111a.png', alt: 'Máy bay và tiếp viên minh họa theo sắc xanh vàng Lufthansa', kind: 'airline' as const },
    klm: { url: '/manus-storage/hero-klm_08a6fea4.png', alt: 'Máy bay và tiếp viên minh họa theo sắc xanh KLM', kind: 'airline' as const },
    'british-airways': { url: '/manus-storage/hero-british-airways_d01903cc.png', alt: 'Máy bay và tiếp viên minh họa theo sắc xanh đỏ British Airways', kind: 'airline' as const },
    'swiss-international-air-lines': { url: '/manus-storage/hero-swiss-international-air-lines_5efa5cb2.png', alt: 'Máy bay và tiếp viên minh họa theo sắc đỏ SWISS', kind: 'airline' as const },
    'austrian-airlines': { url: '/manus-storage/hero-austrian-airlines_f690c48f.png', alt: 'Máy bay và tiếp viên minh họa theo sắc đỏ Austrian Airlines', kind: 'airline' as const },
    finnair: { url: '/manus-storage/hero-finnair_2aa0c17c.png', alt: 'Máy bay và tiếp viên minh họa theo sắc xanh Finnair', kind: 'airline' as const },
    'lot-polish-airlines': { url: '/manus-storage/hero-lot-polish-airlines_7df2d39e.png', alt: 'Máy bay và tiếp viên minh họa theo sắc xanh đỏ LOT Polish Airlines', kind: 'airline' as const },
    'jetstar-airways': { url: '/manus-storage/hero-jetstar-airways_de335682.png', alt: 'Máy bay và tiếp viên minh họa theo sắc cam Jetstar Airways', kind: 'airline' as const },
    'air-new-zealand': { url: '/manus-storage/hero-air-new-zealand_c44aadf8.png', alt: 'Máy bay và tiếp viên minh họa theo sắc đen bạc Air New Zealand', kind: 'airline' as const },
    'alaska-airlines': { url: '/manus-storage/hero-alaska-airlines_8d4ec261.png', alt: 'Máy bay và tiếp viên minh họa theo sắc xanh Alaska Airlines', kind: 'airline' as const },
    aeromexico: { url: '/manus-storage/hero-aeromexico_7133926d.png', alt: 'Máy bay và tiếp viên minh họa theo sắc xanh đỏ Aeromexico', kind: 'airline' as const },
    'air-mauritius': { url: '/manus-storage/hero-air-mauritius_c04c2e42.png', alt: 'Máy bay và tiếp viên minh họa theo sắc xanh san hô Air Mauritius', kind: 'airline' as const },
  },
  service: {
    'doi-ngay-ve': { url: '/manus-storage/kvbk-service-doi-ngay_b50334f3.png', alt: 'Hành khách trao đổi thay đổi hành trình tại quầy hỗ trợ sân bay', kind: 'service' as const },
    'mua-them-hanh-ly': { url: '/manus-storage/kvbk-service-hanh-ly_0e0c68df.png', alt: 'Hành lý và vali tại khu vực hỗ trợ làm thủ tục sân bay', kind: 'service' as const },
    'nang-hang-ve': { url: '/manus-storage/kvbk-service-nang-hang_a1e944e9.png', alt: 'Không gian ghế hạng thương gia trên chuyến bay thương mại', kind: 'service' as const },
    'xe-lan': { url: '/manus-storage/kvbk-service-xe-lan_0f9e2255.png', alt: 'Hành khách nhận hỗ trợ xe lăn tại khu vực khởi hành sân bay', kind: 'service' as const },
    've-thu-cung': { url: '/manus-storage/kvbk-service-thu-cung_a4aa2f73.png', alt: 'Thú cưng trong lồng vận chuyển an toàn tại sân bay', kind: 'service' as const },
    'sua-ten-ve': { url: '/manus-storage/kvbk-service-sua-ten_3e8c5d21.png', alt: 'Hành khách kiểm tra thông tin booking cùng nhân viên hỗ trợ', kind: 'service' as const },
    'dat-ve-may-bay': { url: '/manus-storage/kvbk-service-dat-ve_7516ebec.png', alt: 'Khách hàng trao đổi hành trình cùng tư vấn viên tại sân bay', kind: 'service' as const },
    'chon-cho': { url: '/manus-storage/kvbk-service-checkin-choncho_804fceb3.png', alt: 'Hành khách thực hiện check-in và chọn chỗ tại sân bay', kind: 'service' as const },
    'ho-tro-tieng-anh': { url: '/manus-storage/kvbk-service-ho-tro-tieng-anh_b2335f45.png', alt: 'Nhân viên hỗ trợ hành khách quốc tế tại quầy thông tin sân bay', kind: 'service' as const },
    'tre-em-di-mot-minh': { url: '/manus-storage/kvbk-service-tre-em-nguoi-gia_1aeb53ca.png', alt: 'Nhân viên hỗ trợ hành khách trẻ em và cao tuổi tại cửa khởi hành', kind: 'service' as const },
    'ho-tro-nguoi-cao-tuoi': { url: '/manus-storage/kvbk-service-tre-em-nguoi-gia_1aeb53ca.png', alt: 'Nhân viên hỗ trợ hành khách cao tuổi tại cửa khởi hành', kind: 'service' as const },
    'booking-visa': { url: '/manus-storage/kvbk-service-visa-nhapcanh_c985ed34.png', alt: 'Hồ sơ hành trình và tài liệu hỗ trợ visa tại bàn tư vấn du lịch', kind: 'service' as const },
    'booking-nhap-canh': { url: '/manus-storage/kvbk-service-visa-nhapcanh_c985ed34.png', alt: 'Tài liệu hành trình phục vụ kiểm tra yêu cầu nhập cảnh', kind: 'service' as const },
    'tong-dai-hang-bay': { url: '/manus-storage/kvbk-service-tongdai_989df5ab.png', alt: 'Nhân viên hỗ trợ khách hàng qua tổng đài trong không gian hàng không', kind: 'service' as const },
    'van-phong-ho-tro': { url: '/manus-storage/kvbk-service-van-phong_43bb2870.png', alt: 'Không gian tư vấn hành trình tại văn phòng hỗ trợ', kind: 'service' as const },
    'dai-ly-phong-ve': { url: '/manus-storage/kvbk-service-van-phong_43bb2870.png', alt: 'Tư vấn hành trình tại điểm hỗ trợ vé máy bay', kind: 'service' as const },
    'xac-nhan-ve': { url: '/manus-storage/kvbk-service-xac-nhan-ve_99865001.png', alt: 'Hành khách xác nhận booking và hành trình tại sân bay', kind: 'service' as const },
    've-tu-thanh-pho-nuoc-ngoai-ve-viet-nam': { url: '/manus-storage/kvbk-service-ve-ve-viet-nam_441eac3c.png', alt: 'Hành khách chuẩn bị hành trình từ nước ngoài về Việt Nam', kind: 'service' as const },
    've-tu-quoc-gia-ve-viet-nam': { url: '/manus-storage/kvbk-service-ve-ve-viet-nam_441eac3c.png', alt: 'Hành khách chuẩn bị hành trình từ nước ngoài về Việt Nam', kind: 'service' as const },
  },
  destination: {
    my: { url: '/manus-storage/kvbk-destination-my_d82d04cd.png', alt: 'Đường chân trời New York với máy bay thương mại ở xa', kind: 'destination' as const },
    'nhat-ban': { url: '/manus-storage/kvbk-destination-nhat-ban_bb2da9a2.png', alt: 'Đường chân trời Tokyo với máy bay thương mại ở xa', kind: 'destination' as const },
    'han-quoc': { url: '/manus-storage/kvbk-destination-han-quoc_24d3e612.png', alt: 'Đường chân trời Seoul với máy bay thương mại ở xa', kind: 'destination' as const },
    phap: { url: '/manus-storage/kvbk-destination-phap_1a7b9985.png', alt: 'Paris với tháp Eiffel và máy bay thương mại ở xa', kind: 'destination' as const },
    uc: { url: '/manus-storage/kvbk-destination-uc_51ca8763.png', alt: 'Sydney với cảnh cảng và máy bay thương mại ở xa', kind: 'destination' as const },
    canada: { url: '/manus-storage/kvbk-destination-canada_06ed8086.png', alt: 'Toronto với tháp CN và máy bay thương mại ở xa', kind: 'destination' as const },
    singapore: { url: '/manus-storage/kvbk-destination-singapore_c3a1e92f.png', alt: 'Vịnh Marina Singapore và máy bay thương mại ở xa', kind: 'destination' as const },
    'thai-lan': { url: '/manus-storage/kvbk-destination-thai-lan_802fabc0.png', alt: 'Bangkok lúc hoàng hôn cùng máy bay thương mại ở xa', kind: 'destination' as const },
    uae: { url: '/manus-storage/kvbk-destination-uae_b0e2178c.png', alt: 'Dubai với Burj Khalifa và máy bay thương mại ở xa', kind: 'destination' as const },
    qatar: { url: '/manus-storage/kvbk-destination-qatar_094262bd.png', alt: 'Đường chân trời Doha với máy bay thương mại ở xa', kind: 'destination' as const },
    'trung-quoc': { url: '/manus-storage/kvbk-destination-trung-quoc_14c8adbe.png', alt: 'Thượng Hải với máy bay thương mại ở xa', kind: 'destination' as const },
    'dai-loan': { url: '/manus-storage/kvbk-destination-dai-loan_68453211.png', alt: 'Đài Bắc với máy bay thương mại ở xa', kind: 'destination' as const },
    malaysia: { url: '/manus-storage/kvbk-destination-malaysia_9cfddaef.png', alt: 'Kuala Lumpur với máy bay thương mại ở xa', kind: 'destination' as const },
    indonesia: { url: '/manus-storage/kvbk-destination-indonesia_60c6df76.png', alt: 'Bali với máy bay thương mại ở xa', kind: 'destination' as const },
    philippines: { url: '/manus-storage/kvbk-destination-philippines_a96f31ee.png', alt: 'Manila với máy bay thương mại ở xa', kind: 'destination' as const },
    'an-do': { url: '/manus-storage/kvbk-destination-an-do_88c20055.png', alt: 'New Delhi với máy bay thương mại ở xa', kind: 'destination' as const },
    'hong-kong': { url: '/manus-storage/kvbk-destination-hong-kong_5f13f077.png', alt: 'Hồng Kông với máy bay thương mại ở xa', kind: 'destination' as const },
    anh: { url: '/manus-storage/kvbk-destination-anh_d371a58f.png', alt: 'London với máy bay thương mại ở xa', kind: 'destination' as const },
    duc: { url: '/manus-storage/kvbk-destination-duc_ab25bd95.png', alt: 'Frankfurt với máy bay thương mại ở xa', kind: 'destination' as const },
    italy: { url: '/manus-storage/kvbk-destination-italy_62139f2d.png', alt: 'Rome với máy bay thương mại ở xa', kind: 'destination' as const },
    'tay-ban-nha': { url: '/manus-storage/kvbk-destination-tay-ban-nha_c1e7bd43.png', alt: 'Barcelona với máy bay thương mại ở xa', kind: 'destination' as const },
    'ha-lan': { url: '/manus-storage/kvbk-destination-ha-lan_3871ac1e.png', alt: 'Amsterdam với máy bay thương mại ở xa', kind: 'destination' as const },
    'thuy-si': { url: '/manus-storage/kvbk-destination-thuy-si_bd3a25c5.png', alt: 'Zurich với máy bay thương mại ở xa', kind: 'destination' as const },
    ao: { url: '/manus-storage/kvbk-destination-ao_fc31a639.png', alt: 'Vienna với máy bay thương mại ở xa', kind: 'destination' as const },
    hungary: { url: '/manus-storage/kvbk-destination-hungary_ec945a08.png', alt: 'Budapest với máy bay thương mại ở xa', kind: 'destination' as const },
    'cong-hoa-sec': { url: '/manus-storage/kvbk-destination-cong-hoa-sec_5a951886.png', alt: 'Prague với máy bay thương mại ở xa', kind: 'destination' as const },
    'ba-lan': { url: '/manus-storage/kvbk-destination-ba-lan_e339d7c6.png', alt: 'Warsaw với máy bay thương mại ở xa', kind: 'destination' as const },
    nga: { url: '/manus-storage/kvbk-destination-nga_ccd679f7.png', alt: 'Moscow với máy bay thương mại ở xa', kind: 'destination' as const },
    'new-zealand': { url: '/manus-storage/kvbk-destination-new-zealand_d9e307f4.png', alt: 'Auckland với máy bay thương mại ở xa', kind: 'destination' as const },
    'tho-nhi-ky': { url: '/manus-storage/kvbk-destination-tho-nhi-ky_bda33efe.png', alt: 'Istanbul với máy bay thương mại ở xa', kind: 'destination' as const },
    'a-rap-xe-ut': { url: '/manus-storage/kvbk-destination-a-rap-xe-ut_417649c1.png', alt: 'Riyadh với máy bay thương mại ở xa', kind: 'destination' as const },
    'ai-cap': { url: '/manus-storage/kvbk-destination-ai-cap_0bd60c55.png', alt: 'Cairo với máy bay thương mại ở xa', kind: 'destination' as const },
    'nam-phi': { url: '/manus-storage/kvbk-destination-nam-phi_fd2a42ed.png', alt: 'Johannesburg với máy bay thương mại ở xa', kind: 'destination' as const },
    kenya: { url: '/manus-storage/kvbk-destination-kenya_16cf7c1e.png', alt: 'Nairobi với máy bay thương mại ở xa', kind: 'destination' as const },
    'chau-au': { url: '/manus-storage/kvbk-destination-chau-au_b9d3d06b.png', alt: 'Thành phố châu Âu cùng máy bay thương mại ở xa', kind: 'destination' as const },
    'dong-nam-a': { url: '/manus-storage/kvbk-destination-singapore_c3a1e92f.png', alt: 'Thành phố Đông Nam Á cùng máy bay thương mại ở xa', kind: 'destination' as const },
  },
} as const;

const airlineHeroOverrides: Record<string, string> = {
  'vietnam-airlines': '/manus-storage/hero-vietnam-airlines-v2_1a1231d1.png',
  'vietjet-air': '/manus-storage/hero-vietjet-air-v2_04c82f57.png',
  'all-nippon-airways': '/manus-storage/hero-all-nippon-airways-v2_fa55aacb.png',
  'japan-airlines': '/manus-storage/hero-japan-airlines-v2_faf38fdb.png',
  'singapore-airlines': '/manus-storage/hero-singapore-airlines-v2_00eabc43.png',
  'cathay-pacific': '/manus-storage/hero-cathay-pacific-v2_9956aa84.png',
  emirates: '/manus-storage/hero-emirates-v2_45f871b9.png',
  'turkish-airlines': '/manus-storage/hero-turkish-airlines-v2_034504b1.png',
  'bamboo-airways': '/manus-storage/hero-bamboo-airways-v2_66158362.png',
  scoot: '/manus-storage/hero-scoot-v2_7b00625f.png',
  'hk-express': '/manus-storage/hero-hk-express-v2_40eb80ab.png',
  'batik-air-indonesia': '/manus-storage/hero-batik-air-indonesia-v2_18c8195f.png',
  'sichuan-airlines': '/manus-storage/hero-sichuan-airlines-v2_55ed67f4.png',
  'shanghai-airlines': '/manus-storage/hero-shanghai-airlines-v2_5c04a7f5.png',
  'etihad-airways': '/manus-storage/hero-etihad-airways-v2_588a73ff.png',
  'oman-air': '/manus-storage/hero-oman-air-v2_be54344e.png',
  saudia: '/manus-storage/hero-saudia-v2_62c6a53e.png',
  'air-india': '/manus-storage/hero-air-india-v2_a9eecef4.png',
  'ethiopian-airlines': '/manus-storage/hero-ethiopian-airlines-v2_83d06edc.png',
  'kenya-airways': '/manus-storage/hero-kenya-airways-v2_252a689c.png',
  egyptair: '/manus-storage/hero-egyptair-v2_f6581f9e.png',
  lufthansa: '/manus-storage/hero-lufthansa-v2_70beb6ac.png',
  'british-airways': '/manus-storage/hero-british-airways-v2_a30a8fad.png',
  'swiss-international-air-lines': '/manus-storage/hero-swiss-international-air-lines-v2_5e85366e.png',
  'austrian-airlines': '/manus-storage/hero-austrian-airlines-v2_7e18c19b.png',
  'lot-polish-airlines': '/manus-storage/hero-lot-polish-airlines-v2_ddd8c5c4.png',
  'jetstar-airways': '/manus-storage/hero-jetstar-airways-v2_844cab51.png',
  'air-new-zealand': '/manus-storage/hero-air-new-zealand-v2_1a463ce4.png',
  aeromexico: '/manus-storage/hero-aeromexico-v2_4ca53a5a.png',
  'air-mauritius': '/manus-storage/hero-air-mauritius-v2_0e088077.png',
};

const airlineHeroObjectPositions: Record<string, string> = { 'asiana-airlines': '72% center' };

function toPublicHeroAsset(asset: HeroAsset): HeroAsset {
  return { ...asset, url: toPublicAssetUrl(asset.url) };
}

export function getHeroAsset(slug: string): HeroAsset {
  const airline = airlines.find((item) => slug === `hang-bay-${item.slug}` || slug.endsWith(`-${item.slug}`));
  const service = airlineServices.find((item) => slug === getAirlineServiceSlug(item.slug, airline?.slug ?? '') || slug.startsWith(`${item.slug}-`));
  const destination = Object.keys(heroAssets.destination).find((key) => slug.includes(`-${key}`));
  if (service && heroAssets.service[service.slug as keyof typeof heroAssets.service]) return toPublicHeroAsset(heroAssets.service[service.slug as keyof typeof heroAssets.service]);
  if (airline && heroAssets.airline[airline.slug as keyof typeof heroAssets.airline]) {
    const asset = heroAssets.airline[airline.slug as keyof typeof heroAssets.airline];
    return toPublicHeroAsset(airlineHeroOverrides[airline.slug] ? { ...asset, url: airlineHeroOverrides[airline.slug] } : asset);
  }
  if (airline) return toPublicHeroAsset({ ...heroAssets.default, alt: `Máy bay thương mại và tiếp viên hàng không hư cấu minh họa cho dịch vụ ${airline.name}`, kind: 'airline' });
  if (destination) return toPublicHeroAsset(heroAssets.destination[destination as keyof typeof heroAssets.destination]);
  return toPublicHeroAsset(heroAssets.default);
}

export function getHeroObjectPosition(slug: string): string {
  const airline = airlines.find((item) => slug === `hang-bay-${item.slug}` || slug.endsWith(`-${item.slug}`));
  return airline ? airlineHeroObjectPositions[airline.slug] ?? 'center center' : 'center center';
}

const ticketVariants = [
  ['ve-thuong-gia', 'Vé thương gia'], ['ve-pho-thong', 'Vé phổ thông'], ['ve-khu-hoi', 'Vé khứ hồi'], ['ve-mot-chieu', 'Vé một chiều'], ['ve-tre-em', 'Vé trẻ em'],
] as const;
const inboundDestinations = [['viet-nam', 'Việt Nam'], ['ha-noi', 'Hà Nội'], ['ho-chi-minh', 'TP. Hồ Chí Minh'], ['da-nang', 'Đà Nẵng'], ['nha-trang', 'Nha Trang'], ['phu-quoc', 'Phú Quốc']] as const;

function cleanPublicCopy(value: string) {
  return value.replace(/\blanding\b/gi, 'trang');
}

function makeHub(slug: string, eyebrow: string, title: string, description: string, intro: string, checklist: string[], related: Array<{ slug: string; label: string }> = [], sourceReferences: Array<{ label: string; url: string; checkedAt: string }> = [], faqs: Array<{ question: string; answer: string }> = []): PageContent {
  return {
    slug,
    eyebrow: cleanPublicCopy(eyebrow),
    title: cleanPublicCopy(title),
    description: cleanPublicCopy(description),
    intro: cleanPublicCopy(intro),
    checklist: checklist.map(cleanPublicCopy),
    related: related.map((item) => ({ ...item, label: cleanPublicCopy(item.label) })),
    sourceReferences: sourceReferences.map((item) => ({ ...item, label: cleanPublicCopy(item.label) })),
    faqs: faqs.map((item) => ({ question: cleanPublicCopy(item.question), answer: cleanPublicCopy(item.answer) })),
  };
}

export function getAirlineServiceSlug(serviceSlug: string, airlineSlug: string) {
  if (serviceSlug === 'tong-dai-hang-bay') return `so-dien-thoai-tong-dai-${airlineSlug}`;
  if (serviceSlug === 'van-phong-ho-tro') return `dia-chi-van-phong-${airlineSlug}`;
  return `${serviceSlug}-${airlineSlug}`;
}

const unavailableAirlineServices: Record<string, readonly string[]> = {
  'united-airlines': ['tong-dai-hang-bay', 'van-phong-ho-tro'],
};

export function isAirlineServiceAvailable(serviceSlug: string, airlineSlug: string) {
  return !unavailableAirlineServices[airlineSlug]?.includes(serviceSlug);
}

export function getAvailableAirlineServices(airlineSlug: string) {
  return airlineServices.filter((service) => isAirlineServiceAvailable(service.slug, airlineSlug));
}

const corePages: Record<string, PageContent> = {
  've-may-bay': makeHub('ve-may-bay', 'Chọn hành trình', 'Vé máy bay', 'Hub thông tin vé máy bay trong nước, quốc tế và các nhu cầu theo hành trình.', 'Bắt đầu bằng điểm đi, điểm đến, ngày bay và số lượng hành khách. Giá, hạng đặt chỗ và điều kiện chỉ được xác nhận theo hành trình thực tế.', ['Xác định hành trình và thời gian dự kiến.', 'Chuẩn bị thông tin hành khách đúng giấy tờ.', 'Kiểm tra điều kiện dịch vụ trước khi thanh toán.'], [{ slug: 've-may-bay-trong-nuoc', label: 'Vé trong nước' }, { slug: 've-may-bay-quoc-te', label: 'Vé quốc tế' }, { slug: 've-tu-nuoc-ngoai-ve-viet-nam', label: 'Vé từ nước ngoài về Việt Nam' }]),
  'diem-den': makeHub('diem-den', 'Điểm đến quốc tế', 'Điểm đến theo quốc gia và thành phố', 'Hub điểm đến được tổ chức theo khu vực, quốc gia và thành phố để mở rộng các landing hành trình quốc tế.', 'Chọn khu vực, quốc gia hoặc thành phố để xem landing hành trình phù hợp. Các tuyến, hãng khai thác, transit và điều kiện chỉ được xác nhận theo lịch bay thực tế.', ['Chọn khu vực hoặc quốc gia dự kiến đến.', 'Mở landing thành phố khi đã xác định điểm đến.', 'Kiểm tra hộ chiếu, visa, transit và hành lý theo hành trình.'], destinationRegions.map((region) => ({ slug: region.slug, label: `Điểm đến ${region.label}` }))),
  've-may-bay-trong-nuoc': makeHub('ve-may-bay-trong-nuoc', 'Đường bay trong nước', 'Vé máy bay trong nước', 'Khám phá các landing đường bay trong nước theo điểm đến tại Việt Nam.', 'Các đường bay trong nước được tổ chức theo điểm đến để người dùng có thể bắt đầu từ hành trình phù hợp. Điều kiện giá vé và dịch vụ phải được xác nhận theo thời điểm kiểm tra.', ['Chọn thành phố đến.', 'Xác định ngày bay và số hành khách.', 'Kiểm tra hãng khai thác, hành lý và điều kiện vé.'], domesticDestinations.map((slug) => ({ slug: `ve-may-bay-di-${slug}`, label: `Vé đi ${domesticLabels[slug]}` }))),
  've-may-bay-quoc-te': makeHub('ve-may-bay-quoc-te', 'Đường bay quốc tế', 'Vé máy bay quốc tế', 'Hub landing theo quốc gia, khu vực, điểm khởi hành, thành phố đến và loại vé quốc tế.', 'Các landing quốc tế được nhóm theo thị trường để mở rộng thành điểm khởi hành Việt Nam, thành phố đến, hãng khai thác, hạng vé và loại hành trình.', ['Xác định quốc gia hoặc thành phố đến.', 'Kiểm tra hộ chiếu, visa và điều kiện quá cảnh.', 'Đối chiếu hành lý, hãng bay và lịch bay thực tế.'], [...internationalMarkets.map(([slug, label]) => ({ slug: `ve-may-bay-di-${slug}`, label: `Vé đi ${label}` })), ...internationalOriginCities.map((origin) => ({ slug: `ve-may-bay-tu-${origin}-di-my`, label: `Từ ${domesticLabels[origin]} đi quốc tế` })), ...ticketVariants.map(([variant, label]) => ({ slug: `${variant}-di-my`, label }))]),
  've-tu-nuoc-ngoai-ve-viet-nam': makeHub('ve-tu-nuoc-ngoai-ve-viet-nam', 'Chiều bay về Việt Nam', 'Vé máy bay từ nước ngoài về Việt Nam', 'Hub landing dành cho hành trình từ quốc gia hoặc thành phố nước ngoài về Việt Nam, Hà Nội, TP. Hồ Chí Minh và các điểm đến trong nước.', 'Mỗi thị trường có thể tiếp tục thành landing riêng theo thành phố xuất phát, điểm đến tại Việt Nam và hãng bay phù hợp. Hãy xác nhận điều kiện hành trình, transit và giấy tờ theo booking.', ['Xác định quốc gia hoặc thành phố khởi hành.', 'Chọn điểm đến phù hợp tại Việt Nam.', 'Kiểm tra giấy tờ, transit, hành lý và giờ bay.'], [...inboundMarkets.flatMap((slug) => inboundDestinations.map(([destination, destinationLabel]) => ({ slug: `ve-may-bay-tu-${slug}-ve-${destination}`, label: `Từ ${internationalMarkets.find(([key]) => key === slug)?.[1]} về ${destinationLabel}` }))), ...internationalCityDestinations.map(([city, cityLabel]) => ({ slug: `ve-may-bay-tu-${city}-ve-viet-nam`, label: `Từ ${cityLabel} về Việt Nam` }))]),
  'hang-bay': makeHub('hang-bay', 'Hành trình theo hãng', '66 hãng hàng không chủ lực', 'Danh mục 66 hãng bay chủ lực, dịch vụ theo hãng và điểm vào hỗ trợ theo booking.', 'Khang Vuong Booking tổ chức thông tin của 66 hãng bay chủ lực theo hành trình, booking và nhu cầu dịch vụ. Không có một điều kiện chung cho mọi hãng, vì vậy mỗi nhu cầu được tách thành trang chuyên biệt để khách hàng kiểm tra đúng nơi.', ['Xác định hãng trực tiếp khai thác từng chặng.', 'Kiểm tra điều kiện hạng vé và hành lý.', 'Chọn đúng dịch vụ theo hãng.'], airlines.map((airline) => ({ slug: `hang-bay-${airline.slug}`, label: airline.name }))),
  'lien-he': makeHub('lien-he', 'Kết nối cùng Khang Vuong Booking', 'Liên hệ Khang Vuong Booking', 'Thông tin liên hệ, văn phòng Hà Nội và TP. Hồ Chí Minh, kênh gọi điện, Zalo và Google Maps của Khang Vuong Booking.', 'Chọn kênh phù hợp với nhu cầu của bạn: gọi hotline để cần hỗ trợ nhanh, gửi yêu cầu theo booking hoặc mở Google Maps để đến văn phòng. Khi liên hệ về vé hoặc dịch vụ theo hãng, hãy chuẩn bị mã đặt chỗ và thông tin hành khách.', ['Gọi 1900 6695 hoặc 0934 589 488 khi cần hỗ trợ hành trình.', 'Chuẩn bị mã đặt chỗ, họ tên hành khách và chặng bay.', 'Chỉ cung cấp thông tin thanh toán qua kênh đã xác thực.'], [{ slug: 've-chung-toi', label: 'Về chúng tôi' }, { slug: 'hang-bay', label: '66 hãng hàng không chủ lực' }, { slug: 'canh-bao-an-toan', label: 'Cảnh báo an toàn giao dịch' }], [], [{ question: 'Tôi cần chuẩn bị gì khi liên hệ về đổi vé hoặc hành lý?', answer: 'Hãy chuẩn bị mã đặt chỗ, họ tên hành khách, chặng bay và nhu cầu cần hỗ trợ để thông tin được đối chiếu theo booking.' }, { question: 'Có thể tìm đường đến văn phòng bằng cách nào?', answer: 'Mỗi địa chỉ văn phòng có nút Google Maps trực tiếp. Hãy mở bản đồ trên thiết bị để kiểm tra tuyến đường phù hợp trước khi di chuyển.' }, { question: 'Khi nào nên gọi hotline?', answer: 'Bạn có thể gọi khi cần định hướng về hành trình hoặc dịch vụ. Điều kiện vé, lịch bay và chi phí luôn cần được xác nhận theo booking thực tế.' }]),
  've-chung-toi': makeHub('ve-chung-toi', 'Khang Vuong Booking', 'Về chúng tôi', 'Khang Vuong Booking thành lập từ năm 2008, tổ chức thông tin hành trình và dịch vụ theo 66 hãng hàng không chủ lực.', 'Từ năm 2008, Khang Vuong Booking phát triển hệ thống thông tin hành trình, điểm đến và dịch vụ theo hãng để hành khách dễ tìm đúng luồng hỗ trợ. Mỗi hướng dẫn đều cần được đối chiếu lại với booking, hãng trực tiếp khai thác và quy định tại thời điểm giao dịch.', ['Xem thông tin theo đúng hãng và loại dịch vụ.', 'Kiểm tra điều kiện theo booking thực tế trước khi quyết định.', 'Liên hệ qua hotline, Zalo hoặc văn phòng khi cần hướng dẫn thêm.'], [{ slug: 'lien-he', label: 'Liên hệ và văn phòng' }, { slug: 'hang-bay', label: 'Danh mục 66 hãng bay' }, { slug: 'dich-vu-theo-hang', label: 'Dịch vụ theo hãng' }]),
  'dai-ly-phong-ve-hang': makeHub('dai-ly-phong-ve-hang', 'Điểm hỗ trợ theo hãng', 'Đại lý và phòng vé theo hãng hàng không', 'Hub điều hướng đến landing đại lý/phòng vé riêng của từng hãng; thông tin liên hệ phải được xác minh trước khi xuất bản.', 'Chọn hãng bay để mở landing kiểm tra đại lý, phòng vé và kênh hỗ trợ theo hãng. Khang Vuong Booking không xác nhận quan hệ đại lý, địa chỉ hay đầu số khi chưa có nguồn công khai từ hãng hoặc cơ quan có thẩm quyền.', ['Chọn hãng bay trực tiếp khai thác.', 'Xác minh kênh liên hệ từ nguồn chính thức.', 'Chỉ thanh toán qua phương thức đã xác thực.'], airlines.map((airline) => ({ slug: `dai-ly-phong-ve-${airline.slug}`, label: `Đại lý / phòng vé ${airline.name}` }))),
  'van-phong-hang-bay': makeHub('van-phong-hang-bay', 'Điểm hỗ trợ theo hãng', 'Văn phòng và điểm hỗ trợ theo hãng bay', 'Hub điều hướng đến landing văn phòng/điểm hỗ trợ riêng theo từng hãng bay.', 'Mỗi landing chỉ định hướng cách xác minh văn phòng, điểm hỗ trợ hoặc kênh liên hệ. Địa chỉ, giờ làm việc và đầu mối hỗ trợ phải được đối chiếu trên nguồn chính thức trước khi giao dịch.', ['Chọn hãng bay trực tiếp khai thác.', 'Đối chiếu nguồn thông tin chính thức.', 'Chuẩn bị booking trước khi liên hệ.'], airlines.filter((airline) => isAirlineServiceAvailable('van-phong-ho-tro', airline.slug)).map((airline) => ({ slug: getAirlineServiceSlug('van-phong-ho-tro', airline.slug), label: `Văn phòng / điểm hỗ trợ ${airline.name}` }))),
  'dich-vu-theo-hang': makeHub('dich-vu-theo-hang', 'Hỗ trợ hành khách theo hãng', 'Dịch vụ theo từng hãng hàng không', 'Hub điều hướng đến các landing đổi ngày, hành lý, sửa tên, nâng hạng, chọn chỗ, xe lăn và thú cưng theo hãng.', 'Mỗi dịch vụ được tách riêng theo hãng bay thay vì gom vào một trang chung. Quy tắc hạng vé, hành trình và thời hạn xử lý sẽ được kiểm tra theo booking.', ['Chọn đúng loại dịch vụ.', 'Chọn hãng bay trực tiếp khai thác.', 'Chuẩn bị mã đặt chỗ trước khi gửi yêu cầu.'], airlineServices.map((service) => ({ slug: service.slug, label: service.label }))),
  'doi-ngay-ve': makeHub('doi-ngay-ve', 'Hỗ trợ đổi vé', 'Đổi ngày vé theo hãng bay', 'Danh mục landing đổi ngày vé theo từng hãng hàng không.', 'Chọn hãng bay để kiểm tra landing chuyên biệt cho đổi ngày vé. Chi phí và khả năng đổi phụ thuộc booking, hạng vé, chặng bay và thời điểm xử lý.', ['Chọn hãng bay tương ứng.', 'Chuẩn bị mã đặt chỗ.', 'Nêu ngày bay mới mong muốn.'], airlines.map((airline) => ({ slug: `doi-ngay-ve-${airline.slug}`, label: `Đổi ngày vé ${airline.name}` }))),
  'mua-them-hanh-ly': makeHub('mua-them-hanh-ly', 'Hỗ trợ hành lý', 'Mua thêm hành lý theo hãng bay', 'Danh mục landing mua thêm hành lý theo từng hãng hàng không.', 'Chọn hãng bay để kiểm tra landing chuyên biệt cho mua thêm hành lý. Điều kiện áp dụng theo vé, chặng và hãng trực tiếp khai thác.', ['Chọn hãng bay tương ứng.', 'Chuẩn bị mã đặt chỗ.', 'Xác định chặng và nhu cầu hành lý.'], airlines.map((airline) => ({ slug: `mua-them-hanh-ly-${airline.slug}`, label: `Mua thêm hành lý ${airline.name}` }))),
  'sua-ten-ve': makeHub('sua-ten-ve', 'Hỗ trợ sửa tên', 'Sửa tên vé theo hãng bay', 'Danh mục landing sửa tên hành khách theo từng hãng hàng không.', 'Chọn hãng bay để kiểm tra landing chuyên biệt cho sửa tên vé. Việc chỉnh sửa phụ thuộc loại lỗi, hạng vé, chặng bay và quy định của hãng.', ['Chọn hãng bay tương ứng.', 'Đối chiếu tên với giấy tờ.', 'Nêu rõ nội dung cần chỉnh sửa.'], airlines.map((airline) => ({ slug: `sua-ten-ve-${airline.slug}`, label: `Sửa tên vé ${airline.name}` }))),
  'nang-hang-ve': makeHub('nang-hang-ve', 'Dịch vụ hạng vé', 'Nâng hạng vé theo hãng bay', 'Danh mục landing nâng hạng vé theo từng hãng hàng không.', 'Chọn hãng bay để kiểm tra landing chuyên biệt cho nâng hạng vé. Việc nâng hạng chỉ được xác nhận theo tình trạng chỗ và điều kiện vé thực tế.', ['Chọn hãng bay tương ứng.', 'Chuẩn bị mã đặt chỗ và hạng vé.', 'Nêu chặng bay cần nâng hạng.'], airlines.map((airline) => ({ slug: `nang-hang-ve-${airline.slug}`, label: `Nâng hạng vé ${airline.name}` }))),
  'chon-cho': makeHub('chon-cho', 'Dịch vụ trên chuyến bay', 'Chọn chỗ ngồi theo hãng bay', 'Danh mục landing chọn chỗ ngồi theo từng hãng hàng không.', 'Chọn hãng bay để kiểm tra landing chuyên biệt cho chọn chỗ. Khả năng chọn và mức phí phụ thuộc chặng bay, hạng vé và thời điểm xử lý.', ['Chọn hãng bay tương ứng.', 'Chuẩn bị mã đặt chỗ.', 'Nêu khu vực ghế hoặc nhu cầu chỗ ngồi.'], airlines.map((airline) => ({ slug: `chon-cho-${airline.slug}`, label: `Chọn chỗ ${airline.name}` }))),
  'xe-lan': makeHub('xe-lan', 'Hỗ trợ di chuyển', 'Đặt xe lăn theo hãng bay', 'Danh mục landing đặt xe lăn và hỗ trợ di chuyển theo từng hãng hàng không.', 'Chọn hãng bay để kiểm tra landing chuyên biệt cho yêu cầu xe lăn. Yêu cầu cần được gửi trong thời hạn phù hợp theo từng hãng.', ['Chọn hãng bay tương ứng.', 'Chuẩn bị mã đặt chỗ và thông tin hành khách.', 'Mô tả mức hỗ trợ cần thiết.'], airlines.map((airline) => ({ slug: `xe-lan-${airline.slug}`, label: `Đặt xe lăn ${airline.name}` }))),
  've-thu-cung': makeHub('ve-thu-cung', 'Thú cưng chó mèo', 'Vé thú cưng theo hãng bay', 'Danh mục landing vận chuyển thú cưng theo từng hãng hàng không.', 'Chọn hãng bay để kiểm tra landing chuyên biệt cho chó, mèo và thú cưng. Điều kiện, giấy tờ, lồng vận chuyển và chặng bay đều cần xác minh theo từng booking.', ['Chọn hãng bay tương ứng.', 'Chuẩn bị thông tin thú cưng và lồng.', 'Kiểm tra giấy tờ, hành trình và điều kiện chặng bay.'], airlines.map((airline) => ({ slug: `ve-thu-cung-${airline.slug}`, label: `Vé thú cưng ${airline.name}` }))),
  'ho-chieu': makeHub('ho-chieu', 'Dịch vụ hộ chiếu', 'Hộ chiếu', 'Hub landing thông tin và dịch vụ hộ chiếu tách riêng khỏi Visa.', 'Nội dung hộ chiếu được tổ chức riêng để mở rộng theo địa phương, loại thủ tục và thời gian xử lý; các yêu cầu thực tế cần xác nhận trên nguồn chính thức.', ['Kiểm tra thời hạn hộ chiếu.', 'Xác định đúng nhu cầu thủ tục.', 'Đối chiếu thông tin tại nguồn chính thức.'], [{ slug: 'ho-chieu-nhanh', label: 'Hộ chiếu nhanh' }, { slug: 'gia-han-ho-chieu', label: 'Gia hạn hộ chiếu' }]),
  visa: makeHub('visa', 'Dịch vụ visa', 'Visa', 'Hub landing thông tin và dịch vụ visa tách riêng khỏi Hộ chiếu.', 'Nội dung visa được tổ chức theo quốc gia hoặc khu vực để tiếp tục mở rộng landing. Thông tin chỉ mang tính định hướng; hãy xác nhận yêu cầu hiện hành tại nguồn chính thức.', ['Xác định quốc gia và mục đích chuyến đi.', 'Chuẩn bị danh mục hồ sơ phù hợp.', 'Xác nhận điều kiện mới nhất trước khi nộp.'], [{ slug: 'visa-trung-quoc', label: 'Visa Trung Quốc' }, { slug: 'visa-chau-a', label: 'Visa châu Á' }, { slug: 'visa-chau-au', label: 'Visa châu Âu' }]),
  've-du-hoc-sinh': makeHub('ve-du-hoc-sinh', 'Hành trình du học', 'Vé máy bay cho du học sinh', 'Hub thông tin vé máy bay du học sinh theo khu vực, hãng bay, trường và điều kiện hành lý.', 'Hành trình du học cần được xác định theo quốc gia, trường, ngày nhập học và điều kiện hành lý của từng hãng. Các ưu đãi chỉ được xác nhận theo chương trình còn hiệu lực.', ['Xác định quốc gia, trường và ngày nhập học.', 'Chuẩn bị giấy tờ chứng minh phù hợp.', 'Kiểm tra hành lý và điều kiện theo hãng.'], [{ slug: 've-du-hoc-sinh-di-my', label: 'Du học sinh đi Mỹ' }, { slug: 've-du-hoc-sinh-di-chau-au', label: 'Du học sinh đi châu Âu' }, { slug: 've-du-hoc-sinh-di-chau-a', label: 'Du học sinh đi châu Á' }, { slug: 've-du-hoc-sinh-mit', label: 'Du học sinh tại MIT' }, { slug: 've-du-hoc-sinh-ucla', label: 'Du học sinh tại UCLA' }, { slug: 've-du-hoc-sinh-university-of-washington', label: 'Du học sinh tại University of Washington' }, ...airlines.filter((airline) => ['vietnam-airlines', 'cathay-pacific', 'turkish-airlines', 'qatar-airways', 'air-china', 'china-southern', 'china-airlines'].includes(airline.slug)).map((airline) => ({ slug: `ve-du-hoc-sinh-${airline.slug}`, label: `Du học sinh ${airline.name}` }))]),
  'cam-nang-bay': makeHub('cam-nang-bay', 'Cẩm nang hành trình', 'Cẩm nang bay', 'Các thông tin định hướng về sân bay, giấy tờ, hành lý và chuẩn bị hành trình.', 'Cẩm nang được sử dụng làm hub cho những nội dung cần kiểm tra trước chuyến bay. Quy định có thể thay đổi, vì vậy khách hàng cần xác nhận theo hành trình thực tế.', ['Xác định chủ đề cần kiểm tra.', 'Đối chiếu với booking và hãng khai thác.', 'Xác nhận trên nguồn chính thức khi cần.']),
  'khach-san': makeHub('khach-san', 'Lưu trú', 'Khách sạn', 'Thông tin định hướng lựa chọn lưu trú theo lịch trình.', 'Hãy xác định khu vực lưu trú, thời gian nhận/trả phòng và điều kiện hoàn hủy trước khi lựa chọn.', ['Xác định vị trí lưu trú.', 'Xác nhận số khách và giờ nhận phòng.', 'Đọc kỹ điều kiện hoàn, đổi và phụ phí.']),
  combo: makeHub('combo', 'Kết hợp dịch vụ', 'Combo du lịch', 'Thông tin cần cân nhắc khi kết hợp vé máy bay và lưu trú.', 'Một combo chỉ phù hợp khi thời gian bay, giờ nhận phòng và điều kiện dịch vụ có thể phối hợp với lịch trình của bạn.', ['Khóa các mốc thời gian quan trọng.', 'Kiểm tra điều kiện từng dịch vụ.', 'Xác nhận phương án thay đổi trước khi thanh toán.']),
  'khuyen-mai': makeHub('khuyen-mai', 'Cập nhật theo thời điểm', 'Khuyến mãi vé máy bay', 'Thông tin định hướng kiểm tra ưu đãi và điều kiện áp dụng.', 'Giá và ưu đãi có thể thay đổi nhanh. Chỉ xem thông tin còn hiệu lực tại nơi xác nhận booking.', ['Xác định chặng bay và ngày bay.', 'Kiểm tra hạn thanh toán.', 'Đọc điều kiện đổi, hoàn trước khi quyết định.']),
};

const airlineLandingPages = Object.fromEntries(airlines.map((airline) => {
  return [`hang-bay-${airline.slug}`, makeHub(`hang-bay-${airline.slug}`, 'Hãng hàng không', airline.name, `Thông tin hành trình và các dịch vụ hỗ trợ dành cho ${airline.name}.`, `Trang thông tin ${airline.name} tập hợp từng dịch vụ theo hãng. Điều kiện cụ thể luôn cần được kiểm tra theo booking và chặng bay.`, ['Xác định hành trình có hãng trực tiếp khai thác.', 'Chọn đúng dịch vụ cần hỗ trợ.', 'Chuẩn bị mã đặt chỗ trước khi liên hệ.'], getAvailableAirlineServices(airline.slug).map((service) => ({ slug: getAirlineServiceSlug(service.slug, airline.slug), label: `${service.label} ${airline.name}` })))];
}));

Object.assign(airlineLandingPages, {
  'hang-bay-eva-air': makeHub(
    'hang-bay-eva-air',
    'Hành trình cùng EVA Air',
    'EVA Air: vé máy bay, đổi vé, hành lý và hỗ trợ theo booking',
    'Điểm vào tổng hợp dành cho hành khách cần kiểm tra hành trình, dịch vụ và thông tin hỗ trợ liên quan EVA Air.',
    'Khang Vuong Booking tổ chức các luồng hỗ trợ EVA Air theo từng nhu cầu cụ thể để hành khách không phải tìm chung trong một trang. Từ đặt vé, mua hành lý, đổi ngày bay, nâng hạng, chọn chỗ đến xe lăn và thú cưng, mỗi yêu cầu đều cần được đối chiếu theo mã đặt chỗ, chặng bay và điều kiện vé thực tế.',
    ['Chuẩn bị mã đặt chỗ, họ tên hành khách và chặng bay EVA Air.', 'Chọn đúng loại nhu cầu: đặt vé, đổi ngày, hành lý, nâng hạng hoặc hỗ trợ tại sân bay.', 'Xác nhận điều kiện, thời hạn và chi phí theo booking trước khi quyết định xử lý.'],
    airlineServices.map((service) => ({ slug: getAirlineServiceSlug(service.slug, 'eva-air'), label: `${service.label} EVA Air` })),
    [],
    [{ question: 'Tôi cần chuẩn bị gì trước khi gửi yêu cầu liên quan EVA Air?', answer: 'Hãy chuẩn bị mã đặt chỗ, họ tên hành khách, hành trình và nội dung dịch vụ cần hỗ trợ. Thông tin sẽ được đối chiếu theo booking thực tế.' }, { question: 'Đổi vé hoặc mua hành lý EVA Air có áp dụng chung cho mọi chuyến bay không?', answer: 'Không. Điều kiện có thể thay đổi theo hạng vé, chặng bay, hãng khai thác và thời điểm gửi yêu cầu. Bạn nên kiểm tra trên đúng booking trước khi xác nhận.' }, { question: 'Tôi có thể liên hệ qua kênh nào để được định hướng?', answer: 'Bạn có thể dùng hotline, Zalo, biểu mẫu yêu cầu hoặc landing dịch vụ tương ứng. Xác nhận cuối cùng luôn dựa trên booking và kênh hãng đã xác thực.' }],
  ),
  'hang-bay-vietnam-airlines': makeHub(
    'hang-bay-vietnam-airlines',
    'Hành trình cùng Vietnam Airlines',
    'Vietnam Airlines: vé máy bay, đổi vé, hành lý và hỗ trợ theo booking',
    'Điểm vào tổng hợp dành cho hành khách cần kiểm tra hành trình và dịch vụ theo Vietnam Airlines.',
    'Khang Vuong Booking phân tách các luồng Vietnam Airlines theo từng dịch vụ để hành khách chủ động chuẩn bị đúng thông tin. Bạn có thể chọn đặt vé, đổi ngày, hành lý, sửa tên, nâng hạng, chọn chỗ hoặc hỗ trợ đặc biệt trước khi gửi yêu cầu.',
    ['Chuẩn bị mã đặt chỗ, họ tên hành khách và chặng bay Vietnam Airlines.', 'Chọn đúng dịch vụ cần hỗ trợ theo tình trạng hành trình.', 'Đối chiếu điều kiện vé, thời hạn và chi phí trên booking trước khi xác nhận.'],
    airlineServices.map((service) => ({ slug: getAirlineServiceSlug(service.slug, 'vietnam-airlines'), label: `${service.label} Vietnam Airlines` })),
  ),
});

const serviceHubPages = Object.fromEntries(airlineServices.map((service) => [service.slug, makeHub(service.slug, 'Dịch vụ theo hãng', `${service.title} theo hãng bay`, `Hub landing ${service.label.toLowerCase()} được tách theo từng hãng hàng không.`, `Chọn hãng bay trực tiếp khai thác để mở đúng landing chuyên biệt. Điều kiện, thời hạn và chi phí chỉ được xác nhận theo booking thực tế.`, service.checklist, airlines.filter((airline) => isAirlineServiceAvailable(service.slug, airline.slug)).map((airline) => ({ slug: getAirlineServiceSlug(service.slug, airline.slug), label: `${service.label} ${airline.name}` })))]));

const airlineServiceLandingPages = Object.fromEntries(airlineServices.flatMap((service) => airlines.filter((airline) => isAirlineServiceAvailable(service.slug, airline.slug)).map((airline) => {
  const slug = getAirlineServiceSlug(service.slug, airline.slug);
  const faqs = service.slug === 'tong-dai-hang-bay' && airline.priority ? [
    { question: `Tôi cần chuẩn bị gì trước khi liên hệ tổng đài ${airline.name}?`, answer: `Chuẩn bị mã đặt chỗ, họ tên hành khách, hành trình và nội dung cần hỗ trợ. Khi cần xác minh điều kiện hoặc thông tin liên hệ, hãy đối chiếu trên booking và kênh chính thức của ${airline.name}.` },
    { question: `Khang Vuong Booking có phải tổng đài chính thức của ${airline.name} không?`, answer: `Không. Landing này hỗ trợ định hướng theo booking và không thay thế kênh chính thức của ${airline.name}. Thông tin, mức phí và quyết định xử lý chỉ được xác nhận theo booking cùng phản hồi từ hãng hoặc kênh đã được xác minh.` },
    { question: `Tôi có thể gửi yêu cầu đổi vé hoặc hành lý khi liên hệ không?`, answer: `Bạn nên nêu rõ nhu cầu, chặng bay và mã đặt chỗ để kiểm tra. Khả năng xử lý, thời hạn và chi phí phụ thuộc điều kiện vé, tình trạng chỗ và quy định hiện hành của ${airline.name}.` },
  ] : [];
  return [slug, makeHub(slug, `Dịch vụ ${airline.name}`, `${service.title} ${airline.name}`, `${service.description} Hành khách cần kiểm tra theo booking ${airline.name} thực tế.`, `Landing này phục vụ riêng nhu cầu ${service.label.toLowerCase()} ${airline.name}. Khả năng xử lý, thời hạn và chi phí phụ thuộc hạng vé, chặng bay, điều kiện booking và quy định hiện hành của hãng.`, service.checklist, [{ slug: service.slug, label: `Tất cả landing ${service.label}` }, { slug: `hang-bay-${airline.slug}`, label: `Dịch vụ ${airline.name}` }], [], faqs)];
}))); 

const domesticRoutePages = Object.fromEntries(domesticDestinations.map((destination) => {
  const slug = `ve-may-bay-di-${destination}`;
  const label = domesticLabels[destination];
  return [slug, makeHub(slug, 'Đường bay trong nước', `Vé máy bay đi ${label}`, `Thông tin định hướng kiểm tra vé máy bay đi ${label}.`, `Landing đường bay đi ${label} được dùng để tiếp tục mở rộng theo điểm khởi hành, hãng khai thác và thời gian bay. Giá và điều kiện cần được xác nhận theo thời điểm kiểm tra.`, ['Chọn điểm khởi hành đi ' + label + '.', 'Xác định ngày bay và số hành khách.', 'Kiểm tra hành lý, hãng bay và điều kiện vé.'], [{ slug: 've-may-bay-trong-nuoc', label: 'Tất cả vé trong nước' }])];
}));

const internationalRoutePages = Object.fromEntries(internationalMarkets.map(([market, label]) => {
  const slug = `ve-may-bay-di-${market}`;
  return [slug, makeHub(slug, 'Đường bay quốc tế', `Vé máy bay đi ${label}`, `Thông tin định hướng kiểm tra vé máy bay đi ${label}.`, `Landing vé máy bay đi ${label} được dùng để tiếp tục mở rộng theo thành phố đến, hãng bay, điểm nối chuyến và giấy tờ hành trình.`, ['Xác định thành phố đến và ngày bay.', 'Kiểm tra hộ chiếu, visa hoặc transit.', 'Đối chiếu hành lý và hãng khai thác.'], [{ slug: 've-may-bay-quoc-te', label: 'Tất cả vé quốc tế' }])];
}));

const destinationRegionPages = Object.fromEntries(destinationRegions.map((region) => {
  const countries = destinationCountries.filter((country) => country.region === region.slug);
  return [region.slug, makeHub(region.slug, 'Điểm đến quốc tế', `Điểm đến ${region.label}`, `Khám phá landing điểm đến tại ${region.label} theo quốc gia và thành phố.`, `Hub ${region.label} giúp điều hướng đến từng quốc gia và thành phố. Tuyến bay, hãng khai thác và điều kiện hành trình phải được xác nhận theo lịch bay thực tế.`, ['Chọn quốc gia cần đến.', 'Chọn thành phố nếu lịch trình đã xác định.', 'Kiểm tra giấy tờ và điều kiện transit.'], countries.map((country) => ({ slug: `ve-may-bay-di-${country.slug}`, label: `Vé đi ${country.label}` })))] as const;
}));

const countryDestinationPages = Object.fromEntries(destinationCountries.map((country) => {
  const slug = `ve-may-bay-di-${country.slug}`;
  return [slug, makeHub(slug, 'Điểm đến theo quốc gia', `Vé máy bay đi ${country.label}`, `Landing hành trình đi ${country.label} với các điểm vào theo thành phố.`, `Chọn thành phố đến để tiếp tục kiểm tra hành trình. Các hãng khai thác, transit, giấy tờ và điều kiện vé thay đổi theo lịch bay thực tế.`, ['Chọn thành phố đến.', 'Xác định ngày bay và số hành khách.', 'Kiểm tra visa, transit, hành lý và điều kiện vé.'], country.cities.map(([citySlug, cityLabel]) => ({ slug: `ve-may-bay-di-${citySlug}`, label: `Vé đi ${cityLabel}` })))] as const;
}));

const cityDestinationPages = Object.fromEntries(destinationCountries.flatMap((country) => country.cities.map(([citySlug, cityLabel]) => {
  const slug = `ve-may-bay-di-${citySlug}`;
  return [slug, makeHub(slug, 'Điểm đến theo thành phố', `Vé máy bay đi ${cityLabel}`, `Landing hành trình đi ${cityLabel}, ${country.label}.`, `Landing được tổ chức theo thành phố đến để tiếp tục mở rộng theo điểm khởi hành tại Việt Nam, hãng bay, loại vé và nhóm hành khách. Thông tin điều kiện cần được xác nhận theo hành trình thực tế.`, ['Chọn điểm khởi hành tại Việt Nam.', 'Xác định ngày bay và số hành khách.', 'Kiểm tra giấy tờ, transit, hành lý và điều kiện vé.'], [{ slug: `ve-may-bay-di-${country.slug}`, label: `Tất cả điểm đến ${country.label}` }, { slug: 'diem-den', label: 'Hub điểm đến' }])];
})));

const inboundRoutePages = Object.fromEntries(inboundMarkets.flatMap((market) => {
  const label = internationalMarkets.find(([key]) => key === market)?.[1] || market;
  return [['viet-nam', 'Việt Nam'], ['ha-noi', 'Hà Nội'], ['ho-chi-minh', 'TP. Hồ Chí Minh']].map(([destination, destinationLabel]) => {
    const slug = `ve-may-bay-tu-${market}-ve-${destination}`;
    return [slug, makeHub(slug, 'Đặt vé từ nước ngoài về', `Vé máy bay từ ${label} về ${destinationLabel}`, `Thông tin định hướng kiểm tra hành trình từ ${label} về ${destinationLabel}.`, `Landing này được dùng để tiếp tục mở rộng theo thành phố khởi hành và hãng bay. Lịch bay, transit, hành lý và giấy tờ cần được xác nhận theo booking thực tế.`, ['Xác định thành phố khởi hành tại ' + label + '.', 'Chọn điểm đến ' + destinationLabel + '.', 'Kiểm tra transit, hành lý và giấy tờ.'], [{ slug: 've-tu-nuoc-ngoai-ve-viet-nam', label: 'Tất cả vé về Việt Nam' }])];
  });
}));

const internationalOriginRoutePages = Object.fromEntries([
  ...internationalOriginCities.flatMap((origin) => internationalMarkets.map(([market, marketLabel]) => {
    const slug = `ve-may-bay-tu-${origin}-di-${market}`;
    return [slug, makeHub(slug, 'Vé máy bay đi quốc tế', `Vé máy bay từ ${domesticLabels[origin]} đi ${marketLabel}`, `Thông tin định hướng hành trình từ ${domesticLabels[origin]} đi ${marketLabel}.`, 'Landing có thể tiếp tục mở rộng theo thành phố đến, hãng bay, hạng vé và loại hành trình. Giá và điều kiện cần được xác nhận theo thời điểm kiểm tra.', ['Chọn ngày bay và số hành khách.', 'Kiểm tra giấy tờ, visa và transit.', 'Đối chiếu hãng khai thác, hành lý và điều kiện vé.'], [{ slug: `ve-may-bay-di-${market}`, label: `Tất cả vé đi ${marketLabel}` }])];
  })),
  ...internationalOriginCities.flatMap((origin) => internationalCityDestinations.map(([city, cityLabel, market]) => {
    const slug = `ve-may-bay-tu-${origin}-di-${city}`;
    return [slug, makeHub(slug, 'Vé máy bay đi quốc tế', `Vé máy bay từ ${domesticLabels[origin]} đi ${cityLabel}`, `Thông tin định hướng hành trình từ ${domesticLabels[origin]} đi ${cityLabel}.`, 'Landing được tổ chức theo điểm khởi hành và thành phố đến để tiếp tục mở rộng theo hãng, hạng vé và loại hành trình.', ['Chọn ngày bay và số hành khách.', 'Kiểm tra giấy tờ, visa và transit.', 'Đối chiếu hãng khai thác, hành lý và điều kiện vé.'], [{ slug: `ve-may-bay-di-${market}`, label: 'Hub vé quốc tế liên quan' }])];
  })),
]);

const internationalTicketVariantPages = Object.fromEntries(ticketVariants.flatMap(([variant, variantLabel]) => [
  ...internationalMarkets.map(([market, marketLabel]) => {
    const slug = `${variant}-di-${market}`;
    return [slug, makeHub(slug, 'Loại vé quốc tế', `${variantLabel} đi ${marketLabel}`, `Thông tin định hướng kiểm tra ${variantLabel.toLowerCase()} đi ${marketLabel}.`, 'Khả năng cung cấp, điều kiện đổi hoàn, hành lý và mức giá phụ thuộc hãng bay, chặng bay và thời điểm kiểm tra.', ['Xác định điểm đến và thời gian dự kiến.', 'Kiểm tra điều kiện vé theo hãng.', 'Đối chiếu hành lý, giấy tờ và transit.'], [{ slug: `ve-may-bay-di-${market}`, label: `Hub vé đi ${marketLabel}` }])];
  }),
  ...internationalCityDestinations.map(([city, cityLabel, market]) => {
    const slug = `${variant}-di-${city}`;
    return [slug, makeHub(slug, 'Loại vé quốc tế', `${variantLabel} đi ${cityLabel}`, `Thông tin định hướng kiểm tra ${variantLabel.toLowerCase()} đi ${cityLabel}.`, 'Khả năng cung cấp, điều kiện đổi hoàn, hành lý và mức giá phụ thuộc hãng bay, chặng bay và thời điểm kiểm tra.', ['Xác định điểm đến và thời gian dự kiến.', 'Kiểm tra điều kiện vé theo hãng.', 'Đối chiếu hành lý, giấy tờ và transit.'], [{ slug: `ve-may-bay-di-${market}`, label: 'Hub vé quốc tế liên quan' }])];
  }),
]));

const inboundExpansionPages = Object.fromEntries([
  ...internationalCityDestinations.flatMap(([city, cityLabel, market]) => inboundDestinations.map(([destination, destinationLabel]) => {
    const slug = `ve-may-bay-tu-${city}-ve-${destination}`;
    return [slug, makeHub(slug, 'Vé về Việt Nam', `Vé máy bay từ ${cityLabel} về ${destinationLabel}`, `Thông tin định hướng hành trình từ ${cityLabel} về ${destinationLabel}.`, 'Landing được dùng để mở rộng theo hãng bay, điểm nối chuyến và điều kiện hành trình. Hãy xác nhận theo booking thực tế.', ['Xác định thành phố khởi hành.', 'Chọn điểm đến tại Việt Nam.', 'Kiểm tra transit, hành lý và giấy tờ.'], [{ slug: `ve-may-bay-tu-${market}-ve-viet-nam`, label: 'Hub vé về Việt Nam liên quan' }])];
  })),
  ...inboundMarkets.flatMap((market) => airlines.slice(0, 6).map((airline) => {
    const marketLabel = internationalMarkets.find(([key]) => key === market)?.[1] || market;
    const slug = `ve-may-bay-tu-${market}-ve-viet-nam-${airline.slug}`;
    return [slug, makeHub(slug, 'Vé về Việt Nam theo hãng', `Vé từ ${marketLabel} về Việt Nam ${airline.name}`, `Thông tin định hướng hành trình từ ${marketLabel} về Việt Nam với ${airline.name}.`, 'Hãng khai thác, transit, hành lý và tình trạng chuyến bay phải được xác nhận theo lịch trình thực tế.', ['Xác định điểm khởi hành và điểm đến.', 'Kiểm tra hãng khai thác và chặng transit.', 'Đối chiếu điều kiện hành lý, giấy tờ và giờ bay.'], [{ slug: `ve-may-bay-tu-${market}-ve-viet-nam`, label: `Tất cả vé từ ${marketLabel} về Việt Nam` }, { slug: `hang-bay-${airline.slug}`, label: `Dịch vụ ${airline.name}` }])];
  })),
]);

const studentAirlineLandingPages = Object.fromEntries(airlines.filter((airline) => ['vietnam-airlines', 'cathay-pacific', 'turkish-airlines', 'qatar-airways', 'air-china', 'china-southern', 'china-airlines'].includes(airline.slug)).map((airline) => {
  const slug = `ve-du-hoc-sinh-${airline.slug}`;
  return [slug, makeHub(slug, 'Vé du học sinh theo hãng', `Vé máy bay du học sinh ${airline.name}`, `Thông tin định hướng hành trình du học sinh cùng ${airline.name}.`, 'Điều kiện hành lý, chính sách dành cho du học sinh và mức giá chỉ được xác nhận theo hồ sơ, hành trình và chương trình còn hiệu lực của từng hãng.', ['Chuẩn bị giấy tờ học tập hoặc visa phù hợp.', 'Xác định quốc gia, trường và ngày nhập học.', 'Kiểm tra điều kiện hành lý trực tiếp theo hãng.'], [{ slug: 've-du-hoc-sinh', label: 'Hub vé du học sinh' }, { slug: `hang-bay-${airline.slug}`, label: `Dịch vụ ${airline.name}` }])];
}));

const studentSchoolLandingPages: Record<string, PageContent> = {
  've-du-hoc-sinh-mit': makeHub('ve-du-hoc-sinh-mit', 'Du học sinh theo trường', 'Vé máy bay du học sinh đến MIT', 'Landing định hướng hành trình dành cho sinh viên chuẩn bị đến Massachusetts Institute of Technology tại Cambridge, Massachusetts.', 'MIT cho biết trường được thành lập năm 1861, đặt tại Cambridge, Massachusetts. Landing này hỗ trợ chuẩn bị hành trình; không đại diện cho MIT, không xác nhận admission, visa hay ưu đãi của hãng bay.', ['Xác định ngày nhập học và sân bay đến phù hợp.', 'Chuẩn bị giấy tờ nhập học, visa và hành lý.', 'Kiểm tra hành trình thực tế theo hãng khai thác.'], [{ slug: 've-du-hoc-sinh-di-my', label: 'Du học sinh đi Mỹ' }, { slug: 've-may-bay-tu-ho-chi-minh-di-boston', label: 'Vé từ TP. Hồ Chí Minh đi Boston' }, { slug: 've-du-hoc-sinh', label: 'Hub vé du học sinh' }], [{ label: 'MIT — About MIT', url: 'https://www.mit.edu/about/', checkedAt: '2026-08-18' }]),
  've-du-hoc-sinh-ucla': makeHub('ve-du-hoc-sinh-ucla', 'Du học sinh theo trường', 'Vé máy bay du học sinh đến UCLA', 'Landing định hướng hành trình dành cho sinh viên chuẩn bị đến University of California, Los Angeles tại Los Angeles, California.', 'UCLA công bố dữ liệu tuyển sinh và thông tin tổng quan về trường trên trang chính thức. Landing này hỗ trợ chuẩn bị hành trình; không đại diện cho UCLA, không xác nhận admission, visa hay ưu đãi của hãng bay.', ['Xác định ngày nhập học và sân bay đến phù hợp.', 'Chuẩn bị giấy tờ nhập học, visa và hành lý.', 'Kiểm tra hành trình thực tế theo hãng khai thác.'], [{ slug: 've-du-hoc-sinh-di-my', label: 'Du học sinh đi Mỹ' }, { slug: 've-may-bay-tu-ho-chi-minh-di-los-angeles', label: 'Vé từ TP. Hồ Chí Minh đi Los Angeles' }, { slug: 've-du-hoc-sinh', label: 'Hub vé du học sinh' }], [{ label: 'UCLA — Facts & Figures', url: 'https://www.ucla.edu/about/facts-and-figures', checkedAt: '2026-08-18' }]),
  've-du-hoc-sinh-university-of-washington': makeHub('ve-du-hoc-sinh-university-of-washington', 'Du học sinh theo trường', 'Vé máy bay du học sinh đến University of Washington', 'Landing định hướng hành trình dành cho sinh viên chuẩn bị đến University of Washington tại Seattle, Washington.', 'University of Washington cho biết có các campus tại Seattle, Bothell và Tacoma. Landing này hỗ trợ chuẩn bị hành trình; không đại diện cho University of Washington, không xác nhận admission, visa hay ưu đãi của hãng bay.', ['Xác định campus, ngày nhập học và sân bay đến phù hợp.', 'Chuẩn bị giấy tờ nhập học, visa và hành lý.', 'Kiểm tra hành trình thực tế theo hãng khai thác.'], [{ slug: 've-du-hoc-sinh-di-my', label: 'Du học sinh đi Mỹ' }, { slug: 've-may-bay-tu-ho-chi-minh-di-seattle', label: 'Vé từ TP. Hồ Chí Minh đi Seattle' }, { slug: 've-du-hoc-sinh', label: 'Hub vé du học sinh' }], [{ label: 'University of Washington — About', url: 'https://www.washington.edu/about/', checkedAt: '2026-08-18' }]),
};

const specialistPages: Record<string, PageContent> = {
  'ho-chieu-nhanh': makeHub('ho-chieu-nhanh', 'Dịch vụ hộ chiếu', 'Hộ chiếu nhanh', 'Thông tin định hướng về nhu cầu hộ chiếu nhanh.', 'Thông tin trên landing chỉ nhằm định hướng. Khách hàng cần xác nhận yêu cầu, hồ sơ và thời gian xử lý tại kênh chính thức.', ['Kiểm tra tình trạng hộ chiếu hiện tại.', 'Chuẩn bị giấy tờ cần thiết.', 'Xác nhận điều kiện xử lý thực tế.'], [{ slug: 'ho-chieu', label: 'Hub Hộ chiếu' }]),
  'gia-han-ho-chieu': makeHub('gia-han-ho-chieu', 'Dịch vụ hộ chiếu', 'Gia hạn hộ chiếu', 'Thông tin định hướng về nhu cầu gia hạn hộ chiếu.', 'Thông tin trên landing chỉ nhằm định hướng. Khách hàng cần xác nhận quy định hiện hành tại nguồn chính thức.', ['Kiểm tra thời hạn hộ chiếu.', 'Xác định nhu cầu thủ tục.', 'Đối chiếu yêu cầu hồ sơ.'], [{ slug: 'ho-chieu', label: 'Hub Hộ chiếu' }]),
  'visa-trung-quoc': makeHub('visa-trung-quoc', 'Dịch vụ visa', 'Visa Trung Quốc', 'Thông tin định hướng chuẩn bị visa Trung Quốc.', 'Thông tin không thay thế hướng dẫn của cơ quan có thẩm quyền. Điều kiện thay đổi theo mục đích chuyến đi và nơi nộp hồ sơ.', ['Xác định mục đích chuyến đi.', 'Chuẩn bị danh mục hồ sơ.', 'Xác nhận tại nguồn chính thức.'], [{ slug: 'visa', label: 'Hub Visa' }]),
  'visa-chau-a': makeHub('visa-chau-a', 'Dịch vụ visa', 'Visa châu Á', 'Hub nội dung visa theo các quốc gia châu Á.', 'Các yêu cầu visa thay đổi theo quốc gia, hộ chiếu và mục đích chuyến đi. Cần xác nhận tại nguồn chính thức trước khi chuẩn bị hồ sơ.', ['Chọn quốc gia cần đến.', 'Xác định mục đích chuyến đi.', 'Xác nhận yêu cầu hiện hành.'], [{ slug: 'visa', label: 'Hub Visa' }]),
  'visa-chau-au': makeHub('visa-chau-au', 'Dịch vụ visa', 'Visa châu Âu', 'Hub nội dung visa theo các quốc gia châu Âu.', 'Các yêu cầu visa thay đổi theo quốc gia, hộ chiếu và mục đích chuyến đi. Cần xác nhận tại nguồn chính thức trước khi chuẩn bị hồ sơ.', ['Chọn quốc gia cần đến.', 'Xác định mục đích chuyến đi.', 'Xác nhận yêu cầu hiện hành.'], [{ slug: 'visa', label: 'Hub Visa' }]),
  've-du-hoc-sinh-di-my': makeHub('ve-du-hoc-sinh-di-my', 'Hành trình du học', 'Vé máy bay du học sinh đi Mỹ', 'Thông tin định hướng vé máy bay, hành lý và chuẩn bị hành trình cho du học sinh đi Mỹ.', 'Điều kiện hành lý và chương trình ưu đãi dành cho du học sinh cần được kiểm tra theo từng hãng bay, tuyến bay và giấy tờ phù hợp.', ['Xác định thành phố hoặc trường đến.', 'Chuẩn bị visa và giấy tờ nhập học.', 'Kiểm tra điều kiện hành lý theo hãng.'], [{ slug: 've-du-hoc-sinh', label: 'Hub vé du học sinh' }]),
  've-du-hoc-sinh-di-chau-au': makeHub('ve-du-hoc-sinh-di-chau-au', 'Hành trình du học', 'Vé máy bay du học sinh đi châu Âu', 'Thông tin định hướng vé máy bay, hành lý và chuẩn bị hành trình cho du học sinh đi châu Âu.', 'Điều kiện hành lý và chương trình ưu đãi dành cho du học sinh cần được kiểm tra theo từng hãng bay, tuyến bay và giấy tờ phù hợp.', ['Xác định quốc gia hoặc trường đến.', 'Chuẩn bị visa và giấy tờ nhập học.', 'Kiểm tra điều kiện hành lý theo hãng.'], [{ slug: 've-du-hoc-sinh', label: 'Hub vé du học sinh' }]),
  've-du-hoc-sinh-di-chau-a': makeHub('ve-du-hoc-sinh-di-chau-a', 'Hành trình du học', 'Vé máy bay du học sinh đi châu Á', 'Thông tin định hướng vé máy bay, hành lý và chuẩn bị hành trình cho du học sinh đi châu Á.', 'Điều kiện hành lý và chương trình ưu đãi dành cho du học sinh cần được kiểm tra theo từng hãng bay, tuyến bay và giấy tờ phù hợp.', ['Xác định quốc gia hoặc trường đến.', 'Chuẩn bị visa và giấy tờ nhập học.', 'Kiểm tra điều kiện hành lý theo hãng.'], [{ slug: 've-du-hoc-sinh', label: 'Hub vé du học sinh' }]),
};

const evaSupportPages: Record<string, PageContent> = {
  'so-dien-thoai-tong-dai-eva-air': makeHub('so-dien-thoai-tong-dai-eva-air', 'Tổng đài EVA Air', 'Số điện thoại tổng đài EVA Air tại Việt Nam', 'Thông tin liên hệ EVA Air tại Việt Nam được đối chiếu từ trang Contact chính thức; hãy kiểm tra lại trước khi gọi hoặc thanh toán.', 'Trang Contact EVA Air cho Việt Nam nêu hotline đặt chỗ/bán vé +84-28-71002233. Trang này chỉ tổng hợp kênh chính thức để hỗ trợ hành trình EVA Air; không phải tổng đài của Khang Vuong Booking và không thay thế phản hồi trực tiếp từ hãng.', ['Chuẩn bị mã đặt chỗ và họ tên hành khách.', 'Nêu rõ hành trình cùng nhu cầu cần hỗ trợ.', 'Đối chiếu giờ làm việc, ngôn ngữ hỗ trợ và kênh liên hệ trên trang chính thức trước khi gọi.'], [{ slug: 'hang-bay-eva-air', label: 'Hub EVA Air' }, { slug: 'dia-chi-van-phong-eva-air', label: 'Địa chỉ văn phòng EVA Air' }, { slug: 'doi-ngay-ve-eva-air', label: 'Đổi ngày vé EVA Air' }, { slug: 'mua-them-hanh-ly-eva-air', label: 'Mua thêm hành lý EVA Air' }, { slug: 'xac-nhan-ve-eva-air', label: 'Xác nhận vé EVA Air' }], [{ label: 'EVA Air — Contact Ho Chi Minh', url: 'https://www.evaair.com/en-vn/customer-services/contact-us/contact/?countryCode=Ho+Chi+Minh+City', checkedAt: '2026-08-19' }, { label: 'EVA Air — Contact Hanoi', url: 'https://www.evaair.com/en-us/customer-services/contact-us/contact/?countryCode=Hanoi', checkedAt: '2026-08-19' }], [{ question: 'Tổng đài EVA Air tại Việt Nam là số nào?', answer: 'Trang Contact chính thức EVA Air cho Việt Nam nêu hotline đặt chỗ/bán vé +84-28-71002233. Hãy mở lại nguồn chính thức để xác nhận trước khi liên hệ.' }, { question: 'Tôi cần chuẩn bị gì trước khi liên hệ tổng đài?', answer: 'Chuẩn bị mã đặt chỗ, họ tên hành khách, chặng bay và nội dung yêu cầu. Những dữ liệu này giúp hãng hoặc kênh hỗ trợ đối chiếu booking chính xác hơn.' }]),
  'dia-chi-van-phong-eva-air': makeHub('dia-chi-van-phong-eva-air', 'Văn phòng EVA Air', 'Địa chỉ văn phòng EVA Air tại Hà Nội và TP. Hồ Chí Minh', 'Địa chỉ liên hệ EVA Air tại Việt Nam được đối chiếu theo hai trang Contact chính thức của hãng.', 'Theo trang Contact chính thức EVA Air, văn phòng/ticketing counter tại TP. Hồ Chí Minh ở 2A-4A Tôn Đức Thắng, phường Sài Gòn; tại Hà Nội ở Unit 15.02 A, tầng 15, CornerStone Building, 16 Phan Chu Trinh, phường Cửa Nam. Địa chỉ và giờ làm việc có thể thay đổi, vì vậy cần mở nguồn chính thức trước khi đến.', ['Chọn đúng thành phố cần liên hệ.', 'Kiểm tra lại địa chỉ và giờ làm việc trên trang Contact EVA Air.', 'Chuẩn bị booking hoặc chứng từ liên quan trước khi đến quầy.'], [{ slug: 'hang-bay-eva-air', label: 'Hub EVA Air' }, { slug: 'so-dien-thoai-tong-dai-eva-air', label: 'Tổng đài EVA Air' }, { slug: 'dai-ly-phong-ve-eva-air', label: 'Đại lý / phòng vé EVA Air' }, { slug: 'xac-nhan-ve-eva-air', label: 'Xác nhận vé EVA Air' }], [{ label: 'EVA Air — Contact Ho Chi Minh', url: 'https://www.evaair.com/en-vn/customer-services/contact-us/contact/?countryCode=Ho+Chi+Minh+City', checkedAt: '2026-08-19' }, { label: 'EVA Air — Contact Hanoi', url: 'https://www.evaair.com/en-us/customer-services/contact-us/contact/?countryCode=Hanoi', checkedAt: '2026-08-19' }], [{ question: 'Địa chỉ văn phòng EVA Air tại TP. Hồ Chí Minh là gì?', answer: 'Theo trang Contact chính thức EVA Air, địa chỉ là 2A-4A Tôn Đức Thắng, phường Sài Gòn, TP. Hồ Chí Minh. Hãy kiểm tra lại trang Contact trước khi đến.' }, { question: 'Địa chỉ văn phòng EVA Air tại Hà Nội là gì?', answer: 'Theo trang Contact chính thức EVA Air, địa chỉ là Unit 15.02 A, tầng 15, CornerStone Building, 16 Phan Chu Trinh, phường Cửa Nam, Hà Nội. Hãy kiểm tra lại trang Contact trước khi đến.' }]),
};

Object.assign(evaSupportPages['so-dien-thoai-tong-dai-eva-air'], {
  updatedAt: '2026-08-19',
  conversionModules: { quickBooking: true, verifiedTestimonials: true },
});
Object.assign(evaSupportPages['dia-chi-van-phong-eva-air'], { updatedAt: '2026-08-19' });

export const pages: Record<string, PageContent> = { ...serviceHubPages, ...corePages, ...airlineLandingPages, ...airlineServiceLandingPages, ...evaSupportPages, ...domesticRoutePages, ...internationalRoutePages, ...destinationRegionPages, ...countryDestinationPages, ...cityDestinationPages, ...inboundRoutePages, ...internationalOriginRoutePages, ...internationalTicketVariantPages, ...inboundExpansionPages, ...studentAirlineLandingPages, ...studentSchoolLandingPages, ...specialistPages };

export const megaMenuGroups = [
  { title: 'Vé trong nước', items: domesticDestinations.map((slug) => ({ slug: `ve-may-bay-di-${slug}`, label: `Vé đi ${domesticLabels[slug]}` })), cta: { slug: 've-may-bay-trong-nuoc', label: 'Tất cả đường bay trong nước' } },
  { title: 'Vé quốc tế', items: internationalMarkets.map(([slug, label]) => ({ slug: `ve-may-bay-di-${slug}`, label: `Vé đi ${label}` })), cta: { slug: 'diem-den', label: 'Tất cả quốc gia / khu vực' } },
  { title: 'Hãng hàng không', items: airlines.slice(0, 10).map((airline) => ({ slug: `hang-bay-${airline.slug}`, label: airline.name })), cta: { slug: 'hang-bay', label: 'Tất cả hãng hàng không' } },
  { title: 'Đổi vé & hành lý', items: airlines.slice(0, 5).flatMap((airline) => [{ slug: `doi-ngay-ve-${airline.slug}`, label: `Đổi ngày vé ${airline.name}` }, { slug: `mua-them-hanh-ly-${airline.slug}`, label: `Mua hành lý ${airline.name}` }]), cta: { slug: 'dich-vu-theo-hang', label: 'Tất cả dịch vụ theo hãng' } },
  { title: 'Dịch vụ khác', items: [{ slug: 'ho-chieu', label: 'Hộ chiếu' }, { slug: 'visa', label: 'Visa' }, { slug: 've-thu-cung', label: 'Vé thú cưng' }, { slug: 'xe-lan', label: 'Xe lăn & check-in' }, { slug: 'sua-ten-ve', label: 'Sửa tên vé' }, { slug: 'nang-hang-ve', label: 'Nâng hạng vé' }, { slug: 've-du-hoc-sinh', label: 'Vé du học sinh' }], cta: { slug: 'dich-vu-theo-hang', label: 'Khám phá dịch vụ' } },
] as const;

export const legacyPages: Record<string, PageContent> = {
  ...gscLegacyPages,
  'san-bay-quoc-te-tan-son-nhat-thanh-pho-ho-chi-minh-sgn': makeHub('san-bay-quoc-te-tan-son-nhat-thanh-pho-ho-chi-minh-sgn', 'Cẩm nang sân bay', 'Sân bay quốc tế Tân Sơn Nhất (SGN): thông tin cần chuẩn bị', 'Những điểm định hướng cho hành khách chuẩn bị chuyến bay tại sân bay Tân Sơn Nhất.', 'Thời gian làm thủ tục, nhà ga và điều kiện hành lý phụ thuộc hãng bay, chặng bay và thông báo vận hành. Hãy đối chiếu thông tin booking trước khi đến sân bay.', ['Xác nhận đúng nhà ga và thời gian có mặt.', 'Kiểm tra giấy tờ tùy thân hoặc hộ chiếu.', 'Đối chiếu hạn mức hành lý trước khi làm thủ tục.']),
  'kinh-nghiem-thu-tuc-xin-visa-trung-quoc': makeHub('kinh-nghiem-thu-tuc-xin-visa-trung-quoc', 'Cẩm nang visa', 'Chuẩn bị thủ tục xin visa Trung Quốc', 'Khung tham khảo trước khi chuẩn bị hồ sơ visa Trung Quốc.', 'Thông tin không thay thế hướng dẫn của cơ quan có thẩm quyền. Điều kiện thay đổi theo mục đích chuyến đi, nơi cư trú và quy định tại thời điểm nộp hồ sơ.', ['Xác định đúng loại visa theo mục đích.', 'Kiểm tra thời hạn hộ chiếu và danh mục hồ sơ.', 'Xác nhận lại tại nguồn chính thức trước khi nộp.']),
};
