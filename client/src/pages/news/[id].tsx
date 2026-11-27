import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useNewsArticle } from "@/hooks/news";

export default function ArticlePage() {
  const router = useRouter();
  const { id } = router.query;

  const { data: article, isLoading, error } = useNewsArticle(id as string);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error || !article) {
    return <p>Article not found.</p>;
  }

  return (
    <div className="font-sans">
      <header className="relative h-[514px] w-full overflow-hidden">
        <Image
          src={article.image || "/cover-test.jpg"} // Default image fallback
          alt={article.title}
          fill
          className="object-cover"
          priority
        />

        <Link
          href="/news"
          className="absolute left-[98px] top-[65px] inline-flex items-center gap-2 text-lg font-medium text-gray-500 hover:text-white"
        >
          <ArrowLeft size={24} />
          Back to News
        </Link>

        <div className="absolute left-[98px] top-[165px] z-10">
          <h1 className="text-4xl font-bold text-white">{article.title}</h1>
        </div>

        <div className="absolute left-[98px] top-[413px] z-10 text-lg text-gray-300">
          <span>{article.published_at}</span>
          <span className="ml-5">By {article.author}</span>
        </div>
      </header>

      <main className="px-10 py-8">
        <div className="text-lg leading-relaxed text-gray-700">
          <p>{article.body}</p>
        </div>
      </main>
    </div>
  );
}
