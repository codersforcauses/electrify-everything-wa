import "@/styles/globals.css";

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import Providers from "@/components/main/providers";
import Navbar from "@/components/ui/Navbar";

export const metadata: Metadata = {
  title: "Electrify Everything WA",
  description: "Home Page",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className={`${montserrat.variable} font-sans`}>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}
