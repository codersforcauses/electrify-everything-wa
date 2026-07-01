import { NewsFeaturedCard } from "./news-featured-card";
import { NewsHero } from "./news-hero";
import { NewsList } from "./news-list";

export default function NewsPage() {
  return (
    <>
      <NewsHero />
      <NewsFeaturedCard />
      <NewsList />
    </>
  );
}
