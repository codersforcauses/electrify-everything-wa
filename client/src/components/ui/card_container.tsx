import { useRef } from "react";

import styles from "@/styles/components/card_container.module.css";

import { ContentCard, ContentCardProps } from "../content-card";

/** Horizontally scrolling container for cards, On widescreen resolutions, scrolls with side buttons
 * mobile scrolling is done with pointer.
 *
 * @param param0 An Array of ContentCardProps which represents the cards to be displayed
 * @returns
 */
export default function CardContainer({
  cards,
}: {
  cards: Array<ContentCardProps>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      // Scroll by a generous amount -- CSS scroll-snap (see
      // card_container.module.css) takes care of landing exactly on the next
      // card's edge, so this doesn't need to match the card width precisely.
      containerRef.current.scrollBy({
        left: direction === "right" ? 400 : -400,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles["wrapper"]}>
      <button className={styles["arrow"]} onClick={() => scroll("left")}>
        &#8592;
      </button>
      <div className={styles["card-container"]} ref={containerRef}>
        {cards.map((card_prop) => (
          <ContentCard
            key={card_prop.href}
            {...card_prop}
            className="w-[clamp(18rem,30vw,24rem)] shrink-0 snap-start"
          />
        ))}
      </div>
      <button className={styles["arrow"]} onClick={() => scroll("right")}>
        &#8594;
      </button>
    </div>
  );
}
