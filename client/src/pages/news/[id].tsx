import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// taken from hardcoded data from news-list.tsx
const news = [
  {
    id: 1,
    title: "Washington State Passes Historic Clean Buildings Standard",
    summary:
      "The newly enacted Clean Buildings Performance Standard sets aggressive carbon reduction targets for commercial buildings across Washington State.",
    image: "/cover-test.jpg",
    author: "Kevin",
    date: "June 24, 2026",
  },
  {
    id: 2,
    title: "Australia Invests in Community Solar Projects",
    summary:
      "New funding will support renewable energy projects across regional communities, helping reduce electricity costs and emissions.",
    image: "/cover-test.jpg",
    author: "Kevin",
    date: "June 20, 2026",
  },
  {
    id: 3,
    title: "Battery Storage Reaches Record Deployment",
    summary:
      "Large-scale battery installations continue to expand rapidly, improving grid stability and supporting renewable energy integration.",
    image: "/cover-test.jpg",
    author: "Kevin",
    date: "June 18, 2026",
  },
  {
    id: 4,
    title: "Electric Vehicle Sales Continue to Grow",
    summary:
      "EV adoption in Australia has accelerated thanks to improved charging infrastructure and lower battery prices.",
    image: "/cover-test.jpg",
    author: "Kevin",
    date: "June 15, 2026",
  },
];

export default function ArticlePage() {
  const router = useRouter();
  const { id } = router.query;

  // Find the article based on the id from the URL
  const article = news.find((item) => item.id === Number(id));

  if (!router.isReady || !article) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <>
      <header className="relative h-[514px] w-full overflow-hidden">
        <Image
          src={article.image}
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
          <span>{article.date}</span>
          <span style={{ marginLeft: "20px" }}>By {article.author}</span>
        </div>
      </header>

      <main className="absolute left-[146px] top-[605px] z-10 h-[1008px] w-[1139px]">
        <div className="text-[38px] font-normal leading-[56px] tracking-[0px] text-[#515154]">
          <p>{article.summary}</p>
        </div>
      </main>
    </>
  );
}
