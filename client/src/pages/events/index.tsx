import { Calendar, Filter } from "lucide-react";
import { useState } from "react";

import { EventTypeFilter, useEvents } from "@/hooks/useEvents";

import Pagination from "../../components/ui/pagination";
import EventCard from "./eventCard";

const TABS: { key: EventTypeFilter; label: string }[] = [
  { key: "current", label: "Current Events" },
  { key: "upcoming", label: "Upcoming Events" },
  { key: "past", label: "Past Events" },
];

const PAGE_SIZE = 20;

export default function EventsSection() {
  const [activeTab, setActiveTab] = useState<EventTypeFilter>("current");
  const [page, setPage] = useState(1);

  const { data, isPending, isError, isFetching } = useEvents({
    type: activeTab,
    page,
    pageSize: PAGE_SIZE,
  });

  const events = data?.items ?? [];
  const count = data?.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));
  const activeLabel = TABS.find((t) => t.key === activeTab)?.label ?? "";

  const handleTabChange = (tab: EventTypeFilter) => {
    setActiveTab(tab);
    setPage(1);
  };
  {
    /* Card container */
  }
  <div className="rounded-2xl border-x-2 border-b-2 border-gray-200 bg-white p-6 shadow-sm sm:p-8">
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-900">{activeLabel}</h2>
      <span className="mt-2 block h-1 w-14 rounded-full bg-amber-400" />
    </div>

    <div className="max-h-[720px] overflow-y-auto pr-3">
      {isError && (
        <p className="mb-4 text-sm text-red-600" role="alert">
          Couldn&apos;t load events.
        </p>
      )}

      {isPending ? (
        <EventsGridSkeleton count={PAGE_SIZE} />
      ) : events.length === 0 ? (
        <p className="py-12 text-center text-sm text-gray-500">
          No {activeLabel.toLowerCase()} to show right now.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}

      {!isPending && events.length > 0 && (
        <div className="mt-8">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}

      {isFetching && !isPending && (
        <p className="mt-4 text-center text-xs text-gray-400">Refreshing…</p>
      )}
    </div>
  </div>;
}

function EventsGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-xl border border-gray-100"
        >
          <div className="h-44 w-full bg-gray-200" />
          <div className="space-y-2 px-4 py-4">
            <div className="h-3 w-2/3 rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-3 w-full rounded bg-gray-200" />
            <div className="h-3 w-3/4 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
