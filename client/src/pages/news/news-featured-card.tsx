import { ArrowRight, Calendar } from "lucide-react";
import { Geist } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { NewsCardProps } from "./news-card";

const geist = Geist({
  subsets: ["latin"],
});

export function NewsFeaturedCard({ article }: NewsCardProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <article className="grid overflow-hidden rounded-2xl border bg-white lg:grid-cols-2">
        {/* Left */}
        <div className="relative min-h-[320px]">
          <Image
            fill
            objectFit="cover"
            src="/cover-test.jpg"
            alt="Featured Image"
          />
        </div>

        {/* Right */}
        <div className="flex flex-col justify-between p-10 pb-5 pt-5">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-row items-center gap-3">
              <Calendar size={16} />
              <p
                className={`${geist.className} text-sm font-normal text-gray-600`}
              >
                June 12, 20226
              </p>
            </div>
            <div className="flex flex-col space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
                {article.title}
              </h2>
              <p
                className={`${geist.className} text-base font-normal text-gray-600`}
              >
                {article.summary}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`${geist.className} text-sm font-normal text-gray-600`}
            >
              By {article.author}
            </p>
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
    </section>
  );
}
