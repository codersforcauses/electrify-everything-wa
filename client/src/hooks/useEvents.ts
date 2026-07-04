import { useQuery } from "@tanstack/react-query";
// import { AxiosError } from "axios";
// import api from "@/lib/api";

export type EventTypeFilter = "current" | "upcoming" | "past";

export type ApiEvent = {
  id: number;
  name: string;
  description: string;
  date: string; // ISO date string
  location: string;
  cover_image: string | null;
};

export type UiEvent = Omit<ApiEvent, "cover_image"> & {
  coverImage: string | null;
};

function transformApiEventToUiEvent(data: ApiEvent): UiEvent {
  return {
    ...data,
    coverImage: data.cover_image,
  };
}

type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type EventsPageData = {
  items: UiEvent[];
  count: number;
  next: string | null;
  previous: string | null;
};

type UseEventsParams = {
  type?: EventTypeFilter;
  page?: number;
  pageSize?: number;
};

// -----------------------------------------------------------------------
// DUMMY DATA -- for now
// -----------------------------------------------------------------------

const DUMMY_TITLES = [
  "New feature available on Devias",
  "Community solar workshop",
  "Electrify Everything roadshow",
  "Home battery rebate info session",
  "EV charging station meetup",
  "Heat pump installer training day",
];

const DUMMY_LOCATIONS = [
  "Various Locations",
  "Perth Convention Centre",
  "Community Hall, Fremantle",
  "Online Webinar",
  "Joondalup Library",
];

const DUMMY_DESCRIPTION =
  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.";

function buildDummyEvents(type: EventTypeFilter, count: number): ApiEvent[] {
  const dayOffset = type === "past" ? -30 : type === "upcoming" ? 20 : 0;

  return Array.from({ length: count }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + dayOffset + i * 3);

    return {
      id: hashId(type, i),
      name: DUMMY_TITLES[i % DUMMY_TITLES.length],
      description: DUMMY_DESCRIPTION,
      date: date.toISOString(),
      location: DUMMY_LOCATIONS[i % DUMMY_LOCATIONS.length],
      cover_image: null,
    };
  });
}

function hashId(type: EventTypeFilter, i: number): number {
  const base = type === "current" ? 1000 : type === "upcoming" ? 2000 : 3000;
  return base + i;
}

const DUMMY_EVENTS: Record<EventTypeFilter, ApiEvent[]> = {
  current: buildDummyEvents("current", 7),
  upcoming: buildDummyEvents("upcoming", 42),
  past: buildDummyEvents("past", 62),
};

async function fetchDummyEvents({
  type,
  page,
  pageSize,
}: Required<UseEventsParams>): Promise<PaginatedResponse<ApiEvent>> {
  await new Promise((resolve) => setTimeout(resolve, 250));

  const all = DUMMY_EVENTS[type];
  const start = (page - 1) * pageSize;
  const results = all.slice(start, start + pageSize);
  const count = all.length;

  return {
    count,
    next: start + pageSize < count ? "dummy-next" : null,
    previous: page > 1 ? "dummy-previous" : null,
    results,
  };
}

const DEFAULT_PAGE_SIZE = 20;

export function useEvents({
  type = "upcoming",
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
}: UseEventsParams = {}) {
  return useQuery<PaginatedResponse<ApiEvent>, Error, EventsPageData>({
    queryKey: ["events", type, page, pageSize],
    // current dummy data
    queryFn: () => fetchDummyEvents({ type, page, pageSize }),
    // swap for real API l8r

    select: (data) => ({
      items: data.results.map(transformApiEventToUiEvent),
      count: data.count,
      next: data.next,
      previous: data.previous,
    }),
  });
}
