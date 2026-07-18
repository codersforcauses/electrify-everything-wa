import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from "lucide-react";
import { useState } from "react";

import { ContentCard } from "@/components/content-card";
import { getResources, Resource } from "@/hooks/apiService";

type Direction = "double_left" | "left" | "double_right" | "right";

function ArrowButton({ direction }: { direction: Direction }) {
  const buttonClass =
    "flex items-center justify-center w-8 h-8 bg-white border border-[#F1F1F1] rounded-lg";

  const iconClass = "h-4 w-4 text-[#CCCCCC]";

  const icons = {
    double_left: <ChevronsLeft className={iconClass} />,
    left: <ChevronLeft className={iconClass} />,
    double_right: <ChevronsRight className={iconClass} />,
    right: <ChevronRight className={iconClass} />,
  };

  return <button className={buttonClass}> {icons[direction]} </button>;
}

function ResourceCard({ item }: { item: Resource }) {
  const href = `/resources/${item.slug}`;

  // TODO: Use the horizontal card component for the mobile layout once it is available.
  return (
    <ContentCard
      title={item.name}
      description={item.summary}
      author={item.author}
      dateTime={item.date_made}
      href={href}
      imageSrc={item.image || "/default-resource-img.jpg"}
      imageAlt={item.name}
      buttonLabel="View"
      className="min-h-[28rem] w-full max-w-none [&_h3]:text-xl [&_p]:text-sm"
    />
  );
}

function ResourcesCards({ searchTerm }: { searchTerm: string }) {
  const { data, isLoading } = getResources();

  if (isLoading || data === undefined) return <p>Loading...</p>;

  const query = searchTerm.trim().toLowerCase();

  const filteredResources = data.filter((item) => {
    return item.name.toLowerCase().includes(query);
  });

  if (filteredResources.length === 0) {
    return <p>No resources match your search.</p>;
  }

  return filteredResources.map((item) => (
    <ResourceCard key={item.id} item={item} />
  ));
}

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <main>
      <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-8 px-4 pt-6 sm:px-8 lg:px-16 lg:pt-8">
        {/* Title + Search */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold">Resources</h1>

          {/* Search Box */}
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full rounded-lg border border-[#F1F1F1] py-2 pl-9 pr-4 md:w-72"
            />
          </div>
        </div>
        {/* Cards */}
        <div className="md grid w-full justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ResourcesCards searchTerm={searchTerm} />
        </div>
      </div>
    </main>
  );
}
