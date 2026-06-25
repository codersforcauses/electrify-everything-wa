import { Inter as FontSans } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useState } from "react";

import { usePings } from "@/hooks/pings";
import { cn } from "@/lib/utils";
import hero_image from "@/public/hero_img.png";
import styles from "@/styles/index.module.css";

import { Button } from "../components/ui/button";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function Home() {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const { data, isLoading } = usePings({
    enabled: clicked,
  });

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
          {/*! TODO: Replace this redirect with the actual destination page*/}
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
      <Button onClick={() => {}}>{isLoading ? "Loading" : "Ping"}</Button>
      <p>
        Response from server: <span>{data as string}</span>
      </p>
    </main>
  );
}
