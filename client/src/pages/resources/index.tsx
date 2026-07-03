import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { getResources } from "@/hooks/apiService";

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

function ResourcesCards() {
  const { data, isLoading } = getResources();

  if (isLoading || data === undefined) return <p>Loading...</p>;

  return data.map((item, index) => (
    <div
      key={index}
      className="flex gap-2 overflow-hidden rounded-lg shadow-md"
    >
      <div className="h-64 w-72 bg-gray-300"></div>

      <div className="flex flex-col justify-center gap-2 px-12">
        <p className="text-[#C81FD1]">Lebron James • 30 Jun 2026</p>
        <h2 className="text-xl font-bold">{item.name}</h2>
        <p>{item.summary}</p>
        <p className="text-[#C81FD1]">View {"->"}</p>
      </div>
    </div>
  ));
}

export default function Resources() {
  return (
    <main className="flex flex-col gap-8 px-16 pt-8">
      {/* Title + Search */}
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Resources</h1>
        <input type="text" placeholder="Search..." />
      </div>
      {/* Cards */}
      <div className="flex flex-col gap-6">
        <ResourcesCards />
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
