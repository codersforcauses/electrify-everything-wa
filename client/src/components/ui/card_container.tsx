import { useRef } from "react";

import styles from "@/styles/components/card_container.module.css";

import Card, { CardProp } from "./card";

/** Horizontally scrolling container for cards, On widescreen resolutions, scrolls with side buttons
 * mobile scrolling is done with pointer.
 *
 * @param param0 An Array of CardProps which represents the cards to be displayed
 * @returns
 */
export default function CardContainer({ cards }: { cards: Array<CardProp> }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: direction === "right" ? 300 : -300,
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
          <Card
            image={card_prop.image}
            alt={card_prop.alt}
            title={card_prop.title}
            body={card_prop.body}
          />
        ))}
      </div>
      <button className={styles["arrow"]} onClick={() => scroll("right")}>
        &#8594;
      </button>
    </div>
  );
}
