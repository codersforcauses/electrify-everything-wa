import { Inter as FontSans } from "next/font/google";

import ContactForm from "@/components/contact-form";
import { cn } from "@/lib/utils";
import styles from "@/styles/contact.module.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function Contact() {
  return (
    <main
      className={cn(
        "flex min-h-screen flex-col items-center gap-8 p-24 font-sans",
        fontSans.variable,
      )}
    >
      <div className={styles["hero"]}>
        <span className={styles["badge"]}>Contact</span>
        <p className={styles["subtext"]}>
          Have any enquiries? Have any suggestions? Ask away!
        </p>
      </div>
      <div className={styles["form-card"]}>
        <ContactForm />
      </div>
    </main>
  );
}
