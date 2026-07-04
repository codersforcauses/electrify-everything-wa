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

  return (
    <div className="mx-auto w-full max-w-6xl">
      {/* Tabs + filter/calendar row */}
      <div className="mb-8 rounded-2xl bg-amber-100 px-8 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[0.8fr_1.2fr]">
          {/* Left */}
          <div>
            <h1 className="max-w-xs text-4xl font-bold leading-tight text-gray-900">
              Lorem Ipsum Dolor Sit Amet...
            </h1>
          </div>

          {/* Right */}
          <div className="md:pt-8">
            <p className="max-w-xl text-xl font-semibold leading-8 text-gray-800">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              gravida turpis purus, at faucibus turpis feugiat quis. Praesent
              non tortor rutrum, metus. Fusce ac nunc lectus.
            </p>
          </div>
        </div>
      </div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => handleTabChange(tab.key)}
              aria-pressed={activeTab === tab.key}
              className={`rounded-xl border px-5 py-2 text-sm font-semibold transition-colors ${
                activeTab === tab.key
                  ? "border-amber-300 bg-amber-300 text-gray-900"
                  : "border-amber-200 bg-white text-gray-700 hover:border-amber-300 hover:bg-amber-50"
              }`}
            >
              {tab.label}
            </button>
          ))}

          {/* Filter button ------- Need to filter component thing latr */}
          <button
            type="button"
            className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-full border border-amber-200 bg-white text-gray-400 hover:border-amber-300 hover:bg-amber-50"
          >
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>
      {/* Card container */}
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
            <p className="mt-4 text-center text-xs text-gray-400">
              Refreshing…
            </p>
          )}
        </div>
      </div>
      ;
    </div>
  );
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
