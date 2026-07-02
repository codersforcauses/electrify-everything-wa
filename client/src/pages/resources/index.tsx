import { getResources } from "@/hooks/apiService";

function ResourcesCards() {
  const { data, isLoading } = getResources();

  if (isLoading || data === undefined) return <p>Loading...</p>;

  return data.map((item, index) => (
    <div key={index} className="flex gap-2 shadow-md">
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
      {ResourcesCards()}
      {/* Placeholder Cards */}
      <div className="flex flex-col gap-6">
        <div className="flex gap-2 shadow-md">
          <div className="h-64 w-72 bg-gray-300"></div>

          <div className="flex flex-col justify-center gap-2 px-12">
            <p className="text-[#C81FD1]">Lebron James • 30 Jun 2026</p>
            <h2 className="text-xl font-bold">EEWA x CFC Website Design</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse ac mi quis augue accumsan vestibulum eleifend sit amet
              erat. Phasellus pharetra lobortis dictum. 
            </p>
            <p className="text-[#C81FD1]">View {"->"}</p>
          </div>
        </div>

        <div className="flex gap-2 shadow-md">
          <div className="h-64 w-72 bg-gray-300"></div>

          <div className="flex flex-col justify-center gap-2 px-12">
            <p className="text-[#C81FD1]">Lebron James • 30 Jun 2026</p>
            <h2 className="text-xl font-bold">EEWA x CFC Website Design</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse ac mi quis augue accumsan vestibulum eleifend sit amet
              erat. Phasellus pharetra lobortis dictum.
            </p>
            <p className="text-[#C81FD1]">View {"->"}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
