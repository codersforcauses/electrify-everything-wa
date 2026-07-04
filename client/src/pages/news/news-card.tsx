import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface NewsCardProps {
  article: {
    id: number;
    title: string;
    summary: string;
    image: string;
    author: string;
    date: string;
  };
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex h-[320px] flex-col p-6">
        <div className="mb-4 flex items-center gap-2 text-gray-500">
          <Calendar size={16} />
          <span>{article.date}</span>
        </div>

        <h2 className="line-clamp-3 text-2xl font-semibold leading-tight">
          {article.title}
        </h2>

        <p className="mt-5 line-clamp-2 text-lg text-gray-600">
          {article.summary}
        </p>

        <div className="mt-auto flex items-center justify-between border-t pt-5">
          <span className="font-medium">By {article.author}</span>

          <Link
            href={`/news/${article.id}`}
            className="flex items-center gap-2 font-medium hover:underline"
          >
            Read full article
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </article>
  );
}
