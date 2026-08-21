import research from './airline-profile-research.json';
import { airlines } from './content';

export type AirlineProfileFacts = {
  founding: string;
  headquarters_hubs: string;
  mission: string;
  employees: string;
  fleet: string;
  passengers: string;
  network_routes: string;
  global_presence: string;
};

export type AirlineProfile = AirlineProfileFacts & {
  airlineSlug: string;
  airlineName: string;
  confidence: 'high' | 'medium' | 'limited';
  seasonalityNote: string;
  sourceUrls: string[];
};

type ResearchOutput = {
  airline_slug: string;
  airline_name: string;
  confidence: 'high' | 'medium' | 'limited';
  seasonality_note: string;
  source_urls: string;
  verified_profile: string;
};

type ResearchRow = { output: ResearchOutput };

const emptyFacts: AirlineProfileFacts = {
  founding: 'Không công bố công khai trong các nguồn đã đối chiếu.',
  headquarters_hubs: 'Không công bố công khai trong các nguồn đã đối chiếu.',
  mission: 'Không công bố công khai trong các nguồn đã đối chiếu.',
  employees: 'Không công bố công khai trong các nguồn đã đối chiếu.',
  fleet: 'Không công bố công khai trong các nguồn đã đối chiếu.',
  passengers: 'Không công bố công khai trong các nguồn đã đối chiếu.',
  network_routes: 'Không công bố công khai trong các nguồn đã đối chiếu.',
  global_presence: 'Không công bố công khai trong các nguồn đã đối chiếu.',
};

function parseFacts(raw: string): AirlineProfileFacts {
  try {
    const parsed = JSON.parse(raw) as Partial<AirlineProfileFacts>;
    return { ...emptyFacts, ...parsed };
  } catch {
    return emptyFacts;
  }
}

const rows = research.results as unknown as ResearchRow[];
const canonicalAirlineNames = new Map(airlines.map((airline) => [airline.slug, airline.name]));

export const airlineProfiles: Record<string, AirlineProfile> = Object.fromEntries(
  rows.map(({ output }) => [
    output.airline_slug,
    {
      airlineSlug: output.airline_slug,
      airlineName: canonicalAirlineNames.get(output.airline_slug) ?? output.airline_name,
      confidence: output.confidence,
      seasonalityNote: output.seasonality_note,
      sourceUrls: output.source_urls.split('\n').map((url) => url.trim()).filter(Boolean),
      ...parseFacts(output.verified_profile),
    },
  ]),
);

export function getAirlineProfile(airlineSlug?: string) {
  return airlineSlug ? airlineProfiles[airlineSlug] : undefined;
}

export function getAirlineProfileSources(airlineSlug?: string) {
  const profile = getAirlineProfile(airlineSlug);
  if (!profile) return [];
  return profile.sourceUrls.map((url, index) => ({
    label: `Nguồn chính thức ${profile.airlineName} ${index + 1}`,
    url,
    checkedAt: '2026-08-20',
  }));
}
