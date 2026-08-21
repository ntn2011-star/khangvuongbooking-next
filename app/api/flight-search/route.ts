import { NextRequest, NextResponse } from 'next/server';
import { FlightSearchInput, searchSkyScrapper } from '../../sky-scrapper';

export const runtime = 'nodejs';

const requestWindows = new Map<string, { count: number; resetsAt: number }>();

function canSearch(request: NextRequest) {
  const key = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anonymous';
  const now = Date.now();
  const current = requestWindows.get(key);
  if (!current || current.resetsAt <= now) {
    requestWindows.set(key, { count: 1, resetsAt: now + 60_000 });
    return true;
  }
  if (current.count >= 12) return false;
  current.count += 1;
  return true;
}

function isFlightInput(value: unknown): value is FlightSearchInput {
  if (!value || typeof value !== 'object') return false;
  const input = value as Record<string, unknown>;
  return typeof input.origin === 'string'
    && typeof input.destination === 'string'
    && typeof input.departDate === 'string'
    && typeof input.passengers === 'string'
    && typeof input.cabin === 'string'
    && (input.tripType === 'round-trip' || input.tripType === 'one-way');
}

export async function POST(request: NextRequest) {
  if (!canSearch(request)) return NextResponse.json({ ok: false, error: 'Bạn đã tìm quá nhanh. Vui lòng đợi một phút rồi thử lại.' }, { status: 429 });

  try {
    const body = await request.json();
    if (!isFlightInput(body)) return NextResponse.json({ ok: false, error: 'Dữ liệu hành trình chưa hợp lệ.' }, { status: 400 });
    const result = await searchSkyScrapper(body);
    return NextResponse.json({ ok: true, ...result }, { headers: { 'Cache-Control': 'private, max-age=300' } });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Không thể tìm giá vé lúc này.';
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}
