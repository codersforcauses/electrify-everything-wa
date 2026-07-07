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
  const href =
    item.type === "file" && item.file_url
      ? item.file_url
      : `/resources/${item.slug}`;

  return (
    <ContentCard
      title={item.name}
      description={item.summary}
      author={item.author}
      dateTime={item.date_made}
      href={href}
      imageSrc=""
      imageAlt=""
      buttonLabel="View"
      className="min-h-[28rem]"
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
    <main className="flex flex-col gap-8 px-16 pt-8">
      {/* Title + Search */}
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Resources</h1>

        {/* Search Box */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="rounded-lg border border-[#F1F1F1] py-2 pl-9 pr-4"
          />
        </div>
      </div>
      {/* Cards */}
      <div className="mx-auto grid w-fit justify-items-center gap-x-4 gap-y-6 min-[800px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <ResourcesCards searchTerm={searchTerm} />
      </div>

      {/* Page Navigation */}
      <div className="flex justify-center gap-2">
        <ArrowButton direction="double_left" />
        <ArrowButton direction="left" />
        <button className="h-8 w-8 rounded-lg bg-[#C000CC] text-[13px] font-semibold leading-[18px] text-white">
          1
        </button>
        <ArrowButton direction="right" />
        <ArrowButton direction="double_right" />
      </div>
    </main>
  );
}
