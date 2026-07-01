import { Inter as FontSans } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { CardProp } from "@/components/ui/card";
import CardContainer from "@/components/ui/card_container";
import { cn } from "@/lib/utils";
import hero_image from "@/public/hero_img.png";
import styles from "@/styles/index.module.css";

import { Button } from "../components/ui/button";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

/**
 * Returns a list of upcoming events as CardProps to display
 *
 * @returns List of events sorted in order
 */
function getEvents(): Array<CardProp> {
  // Currently a mock function, doesn't do anything other than make some stuff to display
  return [
    { image: hero_image, alt: "woah", title: "woah", body: "woah" },
    { image: hero_image, alt: "woah", title: "woah", body: "woah" },
    { image: hero_image, alt: "woah", title: "woah", body: "woah" },
  ];
}

/**
 * Returns a list of most recent news as CardProps to display
 *
 * @returns List of news sorted in order
 */
function getNews(): Array<CardProp> {
  // Currently a mock function, doesn't do anything other than make some stuff to display
  return [
    { image: hero_image, alt: "woah", title: "woah", body: "woah" },
    { image: hero_image, alt: "woah", title: "woah", body: "woah" },
    { image: hero_image, alt: "woah", title: "woah", body: "woah" },
  ];
}

export default function Home() {
  const router = useRouter();
  const events = getEvents();
  const news = getNews();

  return (
    <main
      className={cn(
        "flex min-h-screen flex-col items-center gap-4 p-24 font-sans",
        fontSans.variable,
      )}
    >
      <div className={styles["hero"]}>
        <div className={styles["hero-body"]}>
          <div className={styles["hero-text"]}>
            Electrifying our households to build a safer, more sustainable
            future.
          </div>
          {/*! TODO: Replace this redirect with the actual destination page */}
          <Button
            className={styles["hero-button"]}
            onClick={() => router.push("/go-electric")}
          >
            Go Electric <span className={styles["arrow"]}>▸</span>
          </Button>
        </div>
        <div className={styles["hero-img"]}>
          <Image
            src={hero_image}
            alt={
              "Image of a house with electric alternative to fossil fuel products"
            }
          />
        </div>
      </div>
      <div className={styles["news-and-events"]}>
        <div>
          <h1 className="text-5xl font-bold">Recent News</h1>
          <CardContainer cards={news} />
        </div>
        <div>
          <h1 className="text-5xl font-bold">Upcoming Events</h1>
          <CardContainer cards={events} />
        </div>
      </div>
    </main>
  );
}
