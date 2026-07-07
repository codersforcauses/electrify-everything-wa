import InfoCard from "@/components/ui/InfoCard";

const cards = [
  {
    title: "VISION",
    description:
      "Widespread and just electrification of households, businesses, and transport throughout our communities to reduce energy costs, carbon emissions and build a safer future.",
  },
  {
    title: "VALUES",
    description:
      "Collaboration, respect, optimism, positive action, and inclusivity.",
  },
  {
    title: "MISSION",
    description:
      "To advocate, promote and celebrate the just electrification of Western Australia.",
  },
];

export default function AboutHero() {
  return (
    <div className="flex flex-col items-center gap-6">
      {cards.map((card) => (
        <InfoCard
          key={card.title}
          title={card.title}
          description={card.description}
        />
      ))}
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3"></div>
    </div>
  );
}
