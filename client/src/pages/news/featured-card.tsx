import Image from "next/image";
import Link from "next/link";

export function FeaturedCard() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <article className="grid overflow-hidden rounded-2xl bg-white shadow-lg lg:grid-cols-2">
        {/* Left */}
        <div className="relative min-h-[420px]">
          <Image
            fill
            objectFit="cover"
            src="/cover-test.jpg"
            alt="Featured Image"
          />
        </div>

        {/* Right */}
        <div className="flex flex-col justify-between p-10">
          <div className="flex flex-col space-y-6">
            <div>Date · Reading time</div>
            <div className="flex flex-col space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Washington State Passes Historic Clean Buildings Standard — What
                It Means for Homeowners
              </h2>
              <p>
                The newly enacted Clean Buildings Performance Standard sets
                aggressive carbon reduction targets for ...{" "}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p> By Chase</p>
            <p> Read full article </p>
          </div>
        </div>
      </article>
    </section>
  );
}
