import { Inter as FontSans } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { ContentCard, ContentCardProps } from "@/components/content-card";
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
 * Returns a list of upcoming events as ContentCardProps to display
 *
 * @returns List of events sorted in order
 */
function getEvents(): Array<ContentCardProps> {
  // Currently a mock function, doesn't do anything other than make some stuff to display
  // TODO: replace with a real fetch against the Events endpoint once #3 is closed
  const mockEvents = [
    { title: "Community Solar Info Night", dateTime: "12 Jul 2026" },
    { title: "Electrify Your Home Workshop", dateTime: "19 Jul 2026" },
    { title: "EV Test Drive Day", dateTime: "26 Jul 2026" },
    { title: "Heat Pump Q&A Session", dateTime: "2 Aug 2026" },
    { title: "Battery Storage Info Session", dateTime: "9 Aug 2026" },
  ];

  return mockEvents.map((event, index) => ({
    imageSrc: hero_image.src,
    imageAlt: event.title,
    title: event.title,
    description:
      "Join us to learn how to electrify your home and cut your energy bills.",
    dateTime: event.dateTime,
    href: `/events/${index + 1}`,
  }));
}

/**
 * Returns the three quick-link tiles (WA Savings, News, Resources) shown
 * below the hero, linking out to their respective pages.
 *
 * @returns List of quick-link tiles
 */
function getQuickLinks(): Array<ContentCardProps> {
  return [
    {
      imageSrc: hero_image.src,
      imageAlt: "WA Savings",
      title: "WA Savings",
      description:
        "See how much you could save by switching to electric appliances and solar in WA.",
      href: "/wa-savings",
    },
    {
      imageSrc: hero_image.src,
      imageAlt: "News",
      title: "News",
      description:
        "Read the latest updates from Electrify Everything WA and our community.",
      href: "/news",
    },
    {
      imageSrc: hero_image.src,
      imageAlt: "Resources",
      title: "Resources",
      description:
        "Explore guides and resources to help you electrify your home.",
      href: "/resources",
    },
  ];
}

export default function Home() {
  const router = useRouter();
  const events = getEvents();
  const quickLinks = getQuickLinks();

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
          <Button
            className={styles["hero-button"]}
            onClick={() => router.push("/get-involved")}
          >
            Get Involved <span className={styles["arrow"]}>▸</span>
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
        <div className={styles["quick-links"]}>
          {quickLinks.map((link) => (
            <ContentCard key={link.href} {...link} />
          ))}
        </div>
        <div>
          <h1 className="text-5xl font-bold">Upcoming Events</h1>
          <CardContainer cards={events} />
        </div>
      </div>
    </main>
  );
}
