import { Inter as FontSans } from "next/font/google";

import { ContentCard } from "@/components/content-card";
import { formatPublishedDate, useNews } from "@/hooks/news";

import { NewsHero } from "./news-hero";
import { NewsList } from "./news-list";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function NewsPage() {
  const { data: articles = [], isError, isLoading } = useNews();
  const [featuredArticle, ...otherArticles] = articles;

  return (
    <>
      <NewsHero />

      {isLoading ? (
        <section className="mx-auto max-w-7xl px-6 py-12">
          <p className={`font-sans text-muted-foreground ${fontSans.variable}`}>
            Loading news...
          </p>
        </section>
      ) : null}

      {isError ? (
        <section className="mx-auto max-w-7xl px-6 py-12">
          <p className={`font-sans text-destructive ${fontSans.variable}`}>
            News could not be loaded. Please try again later.
          </p>
        </section>
      ) : null}

      {!isLoading && !isError && !featuredArticle ? (
        <section className="mx-auto max-w-7xl px-6 py-12">
          <p className={`font-sans text-muted-foreground ${fontSans.variable}`}>
            No news articles have been published yet.
          </p>
        </section>
      ) : null}

      {featuredArticle ? (
        <article className="mx-auto max-w-7xl px-6 pt-12">
          <ContentCard
            className={`font-sans ${fontSans.variable}`}
            key={featuredArticle.id}
            imageSrc="/cover-test.jpg"
            imageAlt="Solar panels on a house"
            title={featuredArticle.title}
            description={featuredArticle.summary ?? ""}
            href={`/news/${featuredArticle.id}`}
            buttonLabel="Read full article"
            author={featuredArticle.author ?? undefined}
            dateTime={formatPublishedDate(featuredArticle.published_at)}
            layout="horizontal"
          />
        </article>
      ) : null}

      {otherArticles.length > 0 ? <NewsList articles={otherArticles} /> : null}
    </>
  );
}
