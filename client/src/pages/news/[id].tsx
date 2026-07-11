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
          src={article.image || "/cover-test.jpg"} //default image fallback
          alt={article.title}
          fill
          className="object-cover"
          priority
        />

        <Link
          href="/news"
          className="absolute left-[98px] top-[65px] inline-flex h-[36px] w-[197px] items-center gap-2 whitespace-nowrap text-[30px] font-semibold leading-[100%] tracking-[0px] text-[#8D8D8D] transition hover:text-white"
        >
          <ArrowLeft size={24} />
          Back to News
        </Link>

        <div className="absolute left-[98px] top-[165px] z-10 h-[121px] w-[1187px]">
          <h1 className="text-[50px] font-semibold leading-[100%] tracking-[0px] text-[#FFFFFF]">
            {article.title}
          </h1>
        </div>

        <div className="absolute left-[98px] top-[413px] z-10 h-[36px] w-[343px] text-[30px] font-semibold leading-[100%] tracking-[0px] text-[#E1E1E1]">
          <span>{article.published_at}</span>
          <span style={{ marginLeft: "20px" }}>By {article.author}</span>
        </div>
      </header>

      <main className="absolute left-[146px] top-[605px] z-10 h-[1008px] w-[1539px]">
        <div className="text-[38px] font-normal leading-[56px] tracking-[0px] text-[#515154]">
          <p>{article.body}</p>
        </div>
      </main>
    </div>
  );
}
