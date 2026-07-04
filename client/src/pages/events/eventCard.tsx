// Kind of placeholder until we get actual event card //

import { ArrowRight, ImageIcon, MapPin } from "lucide-react";
import Link from "next/link";

import { UiEvent } from "@/hooks/useEvents";

function formatDateLine(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

interface EventCardProps {
  event: UiEvent;
}

export default function EventCard({ event }: EventCardProps) {
  const { id, name, date, location, description, coverImage } = event;

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Image placeholder  swap for <Image src={coverImage} /> l8r*/}
      <div className="flex h-44 w-full items-center justify-center bg-gray-500">
        <ImageIcon className="h-9 w-9 text-white/80" strokeWidth={1.5} />
      </div>

      <div className="flex flex-1 flex-col px-4 py-4">
        <div className="mb-1 flex items-center gap-2 text-xs font-medium">
          <span className="text-fuchsia-600">{formatDateLine(date)}</span>
          <span className="text-gray-300">•</span>
          <span className="inline-flex items-center gap-1 text-fuchsia-600 underline decoration-fuchsia-300 underline-offset-2">
            <MapPin className="h-3 w-3" />
            {location}
          </span>
        </div>

        <h3 className="mb-2 text-base font-semibold leading-snug text-gray-900">
          {name}
        </h3>

        <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-500">
          {description}
        </p>

        <Link
          href={`/events/${id}`}
          className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-fuchsia-600 transition-colors hover:text-fuchsia-700"
        >
          View More
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
