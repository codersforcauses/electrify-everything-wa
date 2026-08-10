import {
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Filter,
  MapPin,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

const LOCATIONS = [
  "City of Stirling",
  "City of Perth",
  "City of Joondalup",
  "City of Wanneroo",
  "City of Cockburn",
  "City of Fremantle",
  "Town of Victoria Park",
  "City of Melville",
  "Various Locations",
];

type Location = (typeof LOCATIONS)[number];

const fmt = (iso: string) => {
  if (!iso) return "";
  const [, m, d] = iso.split("-");
  return `${d}/${m}`;
};

export default function EventFilter() {
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [timeRange, setTimeRange] = useState({ start: "", end: "" });
  const [locations, setLocations] = useState<string[]>(["City of Stirling"]);
  const [open, setOpen] = useState<"dates" | "times" | "locations" | null>(
    null,
  );

  const toggleLocation = (loc: string) =>
    setLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc],
    );

  const clearAll = () => {
    setDateRange({ from: "", to: "" });
    setTimeRange({ start: "", end: "" });
    setLocations([]);
  };

  const chips = useMemo(() => {
    const out: { key: string; label: string; onRemove: () => void }[] = [];
    if (dateRange.from && dateRange.to) {
      out.push({
        key: "date",
        label: `${fmt(dateRange.from)} - ${fmt(dateRange.to)}`,
        onRemove: () => setDateRange({ from: "", to: "" }),
      });
    }
    if (timeRange.start && timeRange.end) {
      out.push({
        key: "time",
        label: `${timeRange.start} - ${timeRange.end}`,
        onRemove: () => setTimeRange({ start: "", end: "" }),
      });
    }
    locations.forEach((loc) =>
      out.push({
        key: loc,
        label: loc,
        onRemove: () => setLocations((p) => p.filter((l) => l !== loc)),
      }),
    );
    return out;
  }, [dateRange, timeRange, locations]);

  const dateLabel =
    dateRange.from && dateRange.to
      ? `${fmt(dateRange.from)} – ${fmt(dateRange.to)}`
      : "Select dates";
  const timeLabel =
    timeRange.start && timeRange.end
      ? `${timeRange.start} – ${timeRange.end}`
      : "Select times";
  const locLabel =
    locations.length === 0
      ? "Select locations"
      : locations.length === 1
        ? locations[0]
        : `${locations.length} selected`;

  return (
    <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-6">
        {/* Filters label */}
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-900" />
          <span className="border-b-2 border-amber-400 pb-0.5 text-lg font-bold text-gray-900">
            Filters
          </span>
        </div>

        {/* Dates */}
        <div className="relative flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-800">Dates</span>
          <button
            type="button"
            onClick={() => setOpen((o) => (o === "dates" ? null : "dates"))}
            aria-expanded={open === "dates"}
            className="flex min-w-[190px] items-center gap-2 rounded-full border border-gray-200 px-3 py-2 text-sm shadow-sm hover:border-amber-300"
          >
            <Calendar className="h-4 w-4 text-gray-400" />
            <span
              className={dateRange.from ? "text-gray-900" : "text-gray-400"}
            >
              {dateLabel}
            </span>
            <ChevronDown className="ml-auto h-4 w-4 text-gray-400" />
          </button>

          {open === "dates" && (
            <div className="absolute left-0 top-full z-20 mt-2 flex w-64 flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
              <label className="flex flex-col gap-1 text-xs font-semibold text-gray-500">
                From
                <input
                  type="date"
                  value={dateRange.from}
                  max={dateRange.to || undefined}
                  onChange={(e) =>
                    setDateRange((r) => ({ ...r, from: e.target.value }))
                  }
                  className="rounded-lg border border-gray-200 px-2 py-1.5 text-sm text-gray-900"
                />
              </label>
              <label className="flex flex-col gap-1 text-xs font-semibold text-gray-500">
                To
                <input
                  type="date"
                  value={dateRange.to}
                  min={dateRange.from || undefined}
                  onChange={(e) =>
                    setDateRange((r) => ({ ...r, to: e.target.value }))
                  }
                  className="rounded-lg border border-gray-200 px-2 py-1.5 text-sm text-gray-900"
                />
              </label>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setDateRange({ from: "", to: "" })}
                  className="text-sm font-semibold text-gray-500 hover:underline"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(null)}
                  className="rounded-lg bg-amber-300 px-4 py-1.5 text-sm font-bold text-gray-900"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Times */}
        <div className="relative flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-800">Times</span>
          <button
            type="button"
            onClick={() => setOpen((o) => (o === "times" ? null : "times"))}
            aria-expanded={open === "times"}
            className="flex min-w-[190px] items-center gap-2 rounded-full border border-gray-200 px-3 py-2 text-sm shadow-sm hover:border-amber-300"
          >
            <Clock className="h-4 w-4 text-gray-400" />
            <span
              className={timeRange.start ? "text-gray-900" : "text-gray-400"}
            >
              {timeLabel}
            </span>
            <ChevronDown className="ml-auto h-4 w-4 text-gray-400" />
          </button>

          {open === "times" && (
            <div className="absolute left-0 top-full z-20 mt-2 flex w-64 flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
              <label className="flex flex-col gap-1 text-xs font-semibold text-gray-500">
                Start time
                <input
                  type="time"
                  value={timeRange.start}
                  onChange={(e) =>
                    setTimeRange((t) => ({ ...t, start: e.target.value }))
                  }
                  className="rounded-lg border border-gray-200 px-2 py-1.5 text-sm text-gray-900"
                />
              </label>
              <label className="flex flex-col gap-1 text-xs font-semibold text-gray-500">
                End time
                <input
                  type="time"
                  value={timeRange.end}
                  onChange={(e) =>
                    setTimeRange((t) => ({ ...t, end: e.target.value }))
                  }
                  className="rounded-lg border border-gray-200 px-2 py-1.5 text-sm text-gray-900"
                />
              </label>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setTimeRange({ start: "", end: "" })}
                  className="text-sm font-semibold text-gray-500 hover:underline"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(null)}
                  className="rounded-lg bg-amber-300 px-4 py-1.5 text-sm font-bold text-gray-900"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Locations */}
        <div className="relative flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-800">Locations</span>
          <button
            type="button"
            onClick={() =>
              setOpen((o) => (o === "locations" ? null : "locations"))
            }
            aria-expanded={open === "locations"}
            className="flex min-w-[190px] items-center gap-2 rounded-full border border-gray-200 px-3 py-2 text-sm shadow-sm hover:border-amber-300"
          >
            <MapPin className="h-4 w-4 text-gray-400" />
            <span
              className={locations.length ? "text-gray-900" : "text-gray-400"}
            >
              {locLabel}
            </span>
            <ChevronDown className="ml-auto h-4 w-4 text-gray-400" />
          </button>

          {open === "locations" && (
            <div className="absolute left-0 top-full z-20 mt-2 max-h-64 w-64 overflow-y-auto rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
              {LOCATIONS.map((loc) => {
                const on = locations.includes(loc);
                return (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => toggleLocation(loc)}
                    className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-gray-900 hover:bg-amber-50"
                  >
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded border ${
                        on
                          ? "border-amber-400 bg-amber-400"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {on && <Check className="h-3 w-3 text-gray-900" />}
                    </span>
                    {loc}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Applied filters */}
      <div className="mt-4 flex items-center gap-3 border-t border-gray-100 pt-4">
        <span className="whitespace-nowrap text-sm font-bold text-gray-900">
          Applied Filters:
        </span>
        <div className="flex flex-1 gap-2 overflow-x-auto pb-1">
          {chips.length === 0 ? (
            <span className="text-sm italic text-gray-400">None</span>
          ) : (
            chips.map((chip) => (
              <span
                key={chip.key}
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-gray-200 py-1.5 pl-3 pr-1.5 text-sm font-semibold text-gray-800 shadow-sm"
              >
                {chip.label}
                <button
                  type="button"
                  onClick={chip.onRemove}
                  aria-label={`Remove ${chip.label}`}
                  className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-gray-100"
                >
                  <X className="h-3 w-3 text-gray-700" />
                </button>
              </span>
            ))
          )}
        </div>
        <button
          type="button"
          onClick={clearAll}
          className="whitespace-nowrap rounded-full border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-bold text-gray-900 hover:bg-amber-100"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
