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

const DEFAULT_PAGE_SIZE = 20;

export function useEvents({
  type = "upcoming",
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
}: UseEventsParams = {}) {
  return useQuery<PaginatedResponse<ApiEvent>, Error, EventsPageData>({
    queryKey: ["events", type, page, pageSize],
  });
}
