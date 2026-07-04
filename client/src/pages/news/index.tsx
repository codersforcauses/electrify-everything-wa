import { NewsFeaturedCard } from "./news-featured-card";
import { NewsHero } from "./news-hero";
import { NewsList } from "./news-list";

const featuredArticle = {
  id: 1,
  title: "Washington State Passes Historic Clean Buildings Standard",
  summary:
    "The newly enacted Clean Buildings Performance Standard sets aggressive carbon reduction targets for commercial buildings across Washington State.",
  image: "/cover-test.jpg",
  author: "Chase",
  date: "June 12, 2022",
};

export default function NewsPage() {
  return (
    <>
      <NewsHero />
      <NewsFeaturedCard article={featuredArticle} />
      <NewsList />
    </>
  );
}
