import { Inter as FontSans } from "next/font/google";

import { ContentCard } from "@/components/content-card";
import { formatPublishedDate, NewsArticle } from "@/hooks/news";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

interface NewsListProps {
  articles: NewsArticle[];
}

export function NewsList({ articles }: NewsListProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <ContentCard
            className={`font-sans ${fontSans.variable}`}
            key={article.id}
            imageSrc={article.image || "/cover-test.jpg"}
            imageAlt={article.title}
            title={article.title}
            description={article.summary ?? ""}
            href={`/news/${article.id}`}
            buttonLabel="Read full article"
            author={article.author ?? undefined}
            dateTime={formatPublishedDate(article.published_at)}
          />
        ))}
      </div>
    </section>
  );
}
