import { Geist } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const geist = Geist({
  subsets: ["latin"],
});

export function FeaturedCard() {
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
            <p
              className={`${geist.className} text-sm font-normal text-gray-600`}
            >
              June 12, 20226
            </p>
            <div className="flex flex-col space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Washington State Passes Historic Clean Buildings Standard — What
                It Means for Homeowners
              </h2>
              <p
                className={`${geist.className} text-base font-normal text-gray-600`}
              >
                The newly enacted Clean Buildings Performance Standard sets
                aggressive carbon reduction targets for ...{" "}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`${geist.className} text-sm font-normal text-gray-600`}
            >
              {" "}
              By Chase
            </p>
            <p
              className={`${geist.className} text-sm font-normal text-gray-600`}
            >
              {" "}
              Read full article →
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}
