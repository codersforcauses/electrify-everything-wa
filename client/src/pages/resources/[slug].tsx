import { useRouter } from "next/router";
import React from "react";

import { Button } from "@/components/ui/button";
import { getResourceFromSlug,Resource  } from "@/hooks/apiService";

/*const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});*/

export default function HandleResource() {
  const router = useRouter();
  const slug = router.query.slug as string;
  if (!router.isReady) return <p>"Loading Page..."</p>;

  const { data, isLoading } = getResourceFromSlug(slug);
  const resource = data;
  if (isLoading) return <p>"Loading Resource..."</p>;

  if (resource === undefined) {
    console.log("Data:", data);
    return <p>"Resource undefined"</p>;
  }

  return (
    <main>
      {/* Title + Back button */}
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">{resource.name}</h1>
        {/* TO DO: Back button */}
      </div>
    </main>
  );
}
