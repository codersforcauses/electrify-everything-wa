import Image from "next/image";

import TeamSection from "@/components/ui/TeamSection";

/* ---------------------------------- */
/* Intro text (top of page)           */
/* ---------------------------------- */

function AboutIntro() {
  return (
    <div className="relative mx-auto max-w-3xl items-center space-y-6 px-8 pt-16 text-center">
      <p>
        Electrify Everything WA is a volunteer-run, non-aligned, not-for-profit,
        incorporated organisation representing community groups across WA.
      </p>
      <div className="mx-auto mb-8 w-40 border-b-2 border-[#FBBF3B]" />
      <p>
        We aim to accelerate the electrification of households and communities,
        replacing fossil fuels with efficient electric technologies powered by
        renewable energy. We advocate for a fair and equitable transition to an
        all-electric future.
      </p>
    </div>
  );
}

/* ---------------------------------- */
/* Vision / Values / Mission cards    */
/* ---------------------------------- */

interface InfoCardProps {
  title: string;
  description: string;
}

function InfoCard({ title, description }: InfoCardProps) {
  return (
    <div className="w-full max-w-4xl rounded-2xl bg-[#F5D76E] px-8 py-10 text-center">
      <h3 className="mb-3 font-bold uppercase tracking-widest">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

const cards: InfoCardProps[] = [
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

function InfoCards() {
  return (
    <div className="flex flex-col items-center gap-6 px-8">
      {cards.map((card) => (
        <InfoCard
          key={card.title}
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
  );
}

/* ---------------------------------- */
/* Our History (dark image section)   */
/* ---------------------------------- */

function HistorySection() {
  return (
    <section className="relative px-8 py-20">
      {/* Background image — add solar-panels.jpg to public/images/ */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/solar-panels.jpg')" }}
      />
      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-white">
        <h2 className="mb-2 text-3xl font-bold">Our History</h2>
        <div className="mb-8 w-20 border-b-2 border-[#F5D76E]" />
        <p className="text-center">
          {/* TODO: replace with real history copy */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <main>
      {/* Cream → yellow gradient wraps intro + cards, like the mockup */}
      <div className="bg-gradient-to-b from-[#FCE49C] via-[#FFFDF4] to-[#FFFDF4] pb-24">
        <AboutIntro />
        <div className="mt-12">
          <InfoCards />
        </div>
      </div>

      <HistorySection />
      <TeamSection />
    </main>
  );
}
