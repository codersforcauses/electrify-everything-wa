import { Inter as FontSans } from "next/font/google";

import { ContentCard } from "@/components/content-card";

import { NewsCard } from "./news-card";

const news = [
  {
    id: 1,
    title: "Washington State Passes Historic Clean Buildings Standard",
    summary:
      "The newly enacted Clean Buildings Performance Standard sets aggressive carbon reduction targets for commercial buildings across Washington State.",
    image: "/cover-test.jpg",
    author: "Chase",
    date: "June 24, 2026",
  },
  {
    id: 2,
    title: "Australia Invests in Community Solar Projects",
    summary:
      "New funding will support renewable energy projects across regional communities, helping reduce electricity costs and emissions.",
    image: "/cover-test.jpg",
    author: "Chase",
    date: "June 20, 2026",
  },
  {
    id: 3,
    title: "Battery Storage Reaches Record Deployment",
    summary:
      "Large-scale battery installations continue to expand rapidly, improving grid stability and supporting renewable energy integration.",
    image: "/cover-test.jpg",
    author: "Chase",
    date: "June 18, 2026",
  },
  {
    id: 4,
    title: "Electric Vehicle Sales Continue to Grow",
    summary:
      "EV adoption in Australia has accelerated thanks to improved charging infrastructure and lower battery prices.",
    image: "/cover-test.jpg",
    author: "Chase",
    date: "June 15, 2026",
  },
];

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export function NewsList() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {news.map((article) => (
          <ContentCard
            className={`font-sans ${fontSans.variable}`}
            key={article.id}
            imageSrc="/cover-test.jpg"
            imageAlt="Solar panels on a house"
            title={article.title}
            description={article.summary}
            href={`/news/${article.id}`}
            buttonLabel="Read full article"
            author={article.author}
            dateTime={article.date}
          />
        ))}
      </div>
    </section>
  );
}
