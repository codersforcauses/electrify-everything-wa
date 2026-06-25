import Image, { StaticImageData } from "next/image";

import styles from "@/styles/components/card.module.css";

export interface CardProp {
  image: StaticImageData;
  alt: string;
  title: string;
  body: string;
}

export default function Card({ image, alt, title, body }: CardProp) {
  return (
    <div className={styles["card"]}>
      <div className={styles["card-img"]}>
        <Image src={image} alt={alt} />
      </div>
      <div className={styles["card-body"]}>
        <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
        <p>{body}</p>
      </div>
    </div>
  );
}
