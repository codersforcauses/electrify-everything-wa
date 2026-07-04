import { Calendar,Filter } from "lucide-react";
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
  return <div className="mx-auto w-full max-w-6xl"></div>;
}

function EventsGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"></div>
  );
}
