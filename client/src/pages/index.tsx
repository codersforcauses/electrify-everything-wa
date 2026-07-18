import { Inter as FontSans } from "next/font/google";
import { useState } from "react";

import { EventCalendar } from "@/components/EventCalendar";
import { usePings } from "@/hooks/pings";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function Home() {
  const [clicked, setClicked] = useState(false);
  const { data, isLoading } = usePings({
    enabled: clicked,
  });

  return (
    <main>
      <EventCalendar />
    </main>
  );
}
