export type FlightSearchInput = {
  origin: string;
  destination: string;
  departDate: string;
  returnDate: string | null;
  passengers: string;
  cabin: string;
  tripType: 'round-trip' | 'one-way';
};

export type FlightOffer = {
  id: string;
  price: string;
  rawPrice: number | null;
  currency: string;
  carrier: string;
  flightCode: string | null;
  departure: string | null;
  arrival: string | null;
  durationMinutes: number | null;
  stopCount: number | null;
};

type AirportCandidate = {
  navigation?: {
    relevantFlightParams?: { skyId?: string; entityId?: string; localizedName?: string };
  };
};

type ApiSegment = {
  flightNumber?: string;
  marketingCarrier?: { alternateId?: string; name?: string };
  operatingCarrier?: { alternateId?: string; name?: string };
};

type ApiLeg = {
  departure?: string;
  arrival?: string;
  durationInMinutes?: number;
  stopCount?: number;
  carriers?: { marketing?: Array<{ name?: string; alternateId?: string }> };
  segments?: ApiSegment[];
};

type ApiItinerary = {
  id?: string;
  price?: { raw?: number; formatted?: string };
  legs?: ApiLeg[];
};

const API_HOST = 'sky-scrapper.p.rapidapi.com';
const API_BASE = `https://${API_HOST}/api/v1/flights`;
const CACHE_TTL_MS = 5 * 60 * 1000;
const AIRPORT_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const searchCache = new Map<string, { expiresAt: number; offers: FlightOffer[] }>();
const airportCache = new Map<string, { expiresAt: number; value: { skyId: string; entityId: string; localizedName: string } }>();
const airportRequests = new Map<string, Promise<{ skyId: string; entityId: string; localizedName: string }>>();
const popularAirportQueries = ['SGN', 'HAN', 'DAD', 'JFK', 'LAX', 'SFO', 'LOND', 'PARI', 'TYOA', 'SELA'];
let prewarmStarted = false;

function airportQuery(value: string) {
  const iata = value.match(/\(([A-Z]{3})\)/)?.[1];
  return iata ?? value.trim();
}

export function parseAdultCount(passengers: string) {
  const count = Number.parseInt(passengers, 10);
  return Number.isFinite(count) && count > 0 ? count : 1;
}

export function toCabinClass(cabin: string) {
  if (cabin === 'Thương gia') return 'business';
  if (cabin === 'Phổ thông đặc biệt') return 'premium_economy';
  return 'economy';
}

export function normalizeFlightOffers(itineraries: ApiItinerary[], currency = 'VND'): FlightOffer[] {
  return itineraries.slice(0, 5).map((itinerary, index) => {
    const leg = itinerary.legs?.[0];
    const segment = leg?.segments?.[0];
    const marketing = segment?.marketingCarrier ?? leg?.carriers?.marketing?.[0];
    const carrierCode = marketing?.alternateId ?? null;
    const flightNumber = segment?.flightNumber?.trim() ?? '';
    const flightCode = carrierCode && flightNumber ? `${carrierCode}${flightNumber}` : null;
    const rawPrice = typeof itinerary.price?.raw === 'number' ? itinerary.price.raw : null;
    const price = itinerary.price?.formatted
      ?? (rawPrice !== null ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency }).format(rawPrice) : 'Kiểm tra theo API');

    return {
      id: itinerary.id ?? `${index}-${flightCode ?? 'itinerary'}`,
      price,
      rawPrice,
      currency,
      carrier: marketing?.name ?? 'Hãng khai thác đang cập nhật',
      flightCode,
      departure: leg?.departure ?? null,
      arrival: leg?.arrival ?? null,
      durationMinutes: leg?.durationInMinutes ?? null,
      stopCount: leg?.stopCount ?? null,
    };
  });
}

function apiHeaders() {
  const key = process.env.RAPIDAPI_KEY;
  if (!key) throw new Error('RAPIDAPI_KEY chưa được cấu hình trên server.');
  return { 'X-RapidAPI-Key': key, 'X-RapidAPI-Host': API_HOST };
}

async function getJson<T>(path: string, parameters: Record<string, string>) {
  const url = new URL(`${API_BASE}${path}`);
  for (const [key, value] of Object.entries(parameters)) url.searchParams.set(key, value);
  const response = await fetch(url, { headers: apiHeaders(), signal: AbortSignal.timeout(18_000), cache: 'no-store' });
  const payload = await response.json().catch(() => null) as { message?: string } | null;
  if (!response.ok) throw new Error(payload?.message ?? `Sky Scrapper phản hồi HTTP ${response.status}.`);
  return payload as T;
}

async function resolveAirport(query: string) {
  const normalized = airportQuery(query).toLowerCase();
  const cached = airportCache.get(normalized);
  if (cached && cached.expiresAt > Date.now()) return cached.value;
  const inFlight = airportRequests.get(normalized);
  if (inFlight) return inFlight;

  const request = getJson<{ status?: boolean; data?: AirportCandidate[]; message?: string }>('/searchAirport', { query: airportQuery(query), locale: 'en-US' })
    .then((payload) => {
      const flightParams = payload.data?.[0]?.navigation?.relevantFlightParams;
      if (!payload.status || !flightParams?.skyId || !flightParams.entityId) {
        throw new Error(`Không tìm thấy sân bay hoặc thành phố phù hợp cho “${query}”. Hãy nhập tên thành phố hoặc mã IATA.`);
      }
      const value = { skyId: flightParams.skyId, entityId: flightParams.entityId, localizedName: flightParams.localizedName ?? query };
      airportCache.set(normalized, { value, expiresAt: Date.now() + AIRPORT_CACHE_TTL_MS });
      return value;
    })
    .finally(() => airportRequests.delete(normalized));
  airportRequests.set(normalized, request);
  return request;
}

export function prewarmPopularAirports() {
  if (prewarmStarted) return;
  prewarmStarted = true;
  void Promise.allSettled(popularAirportQueries.map((query) => resolveAirport(query)));
}

export async function searchSkyScrapper(input: FlightSearchInput) {
  prewarmPopularAirports();
  const cacheKey = JSON.stringify(input);
  const cached = searchCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) return { offers: cached.offers, cached: true };

  const [origin, destination] = await Promise.all([resolveAirport(input.origin), resolveAirport(input.destination)]);
  const parameters: Record<string, string> = {
    originSkyId: origin.skyId as string,
    destinationSkyId: destination.skyId as string,
    originEntityId: origin.entityId as string,
    destinationEntityId: destination.entityId as string,
    date: input.departDate,
    adults: String(parseAdultCount(input.passengers)),
    cabinClass: toCabinClass(input.cabin),
    currency: 'VND',
    countryCode: 'VN',
    market: 'vi-VN',
  };
  if (input.tripType === 'round-trip' && input.returnDate) parameters.returnDate = input.returnDate;

  const payload = await getJson<{ status?: boolean; data?: { itineraries?: ApiItinerary[] }; message?: string }>('/searchFlights', parameters);
  if (!payload.status) throw new Error(payload.message ?? 'Sky Scrapper chưa trả được kết quả cho hành trình này.');
  const offers = normalizeFlightOffers(payload.data?.itineraries ?? []);
  searchCache.set(cacheKey, { offers, expiresAt: Date.now() + CACHE_TTL_MS });
  return { offers, cached: false };
}
