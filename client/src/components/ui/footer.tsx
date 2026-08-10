"use client";

import { ChevronsUp } from "lucide-react";
import { Inter } from "next/font/google";
import Image from "next/image";
import * as React from "react";
import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";

import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

// ---------------------------------------------------------------------------
// Site map data
// ---------------------------------------------------------------------------
const siteMapLinks = [
  { label: "home", href: "/" },
  { label: "about us", href: "/about" },
  { label: "news", href: "/news" },
  { label: "events", href: "/events" },
  { label: "wa savings", href: "/wa-savings" },
  { label: "resources", href: "/resources" },
  { label: "contact", href: "/contact" },
] as const;

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", Icon: BsInstagram },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: BsLinkedin },
  { label: "Facebook", href: "https://facebook.com", Icon: BsFacebook },
] as const;

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={`relative overflow-hidden bg-[#ededed] text-black ${inter.className}`}
    >
      {/* faint house + plug watermark, matches the background graphic in the design */}
      <HouseWatermark />

      <div className="relative w-full px-6 py-16 sm:px-10">
        <div className="flex flex-col gap-12 sm:flex-row sm:items-start sm:justify-between">
          {/* ---------------------------------------------------------------- */}
          {/* Left column: logo, blurb, socials, back-to-top, charity badge   */}
          {/* ---------------------------------------------------------------- */}
          <div className="max-w-sm">
            <div className="mb-4 flex items-center gap-2">
              <Image
                src="/eewa-black.png"
                alt="Electrify Everything WA logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <h2 className="text-xl font-bold text-black">
                Electrify Everything WA
              </h2>
            </div>

            <p className="mb-6 text-sm leading-relaxed text-gray-700">
              Advocating for the switch from fossil-fuel based electricity
              reliance to renewable sources in Western Australia.
            </p>

            {/* socials */}
            <div className="mb-6 flex items-center gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-black transition hover:text-gray-600"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* back to top */}
            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={scrollToTop}
                className="gap-2 border-gray-400 bg-transparent text-xs font-thin uppercase tracking-wide text-black hover:border-black hover:bg-transparent hover:text-black"
              >
                <ChevronsUp className="h-4 w-4" />
                Back to top
              </Button>
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Right column: site map                                          */}
          {/* ---------------------------------------------------------------- */}
          <nav aria-label="Site map" className="text-right">
            <h3 className="mb-4 text-sm font-bold lowercase tracking-wide text-black">
              site map
            </h3>
            <ul className="space-y-2">
              {siteMapLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-700 transition hover:text-black"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* copyright bar */}
      <div className="relative border-t border-gray-200 bg-gray-50 py-4">
        <p className="text-center text-xs text-gray-500">
          Copyright © {new Date().getFullYear()}, electrifyeverythingwa.org,
          All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

// Faint background

function HouseWatermark() {
  return (
    <Image
      src="/eewa-black.png"
      alt=""
      aria-hidden="true"
      width={800}
      height={800}
      className="pointer-events-none absolute left-[60%] top-1/2 h-[130%] w-auto -translate-x-1/2 -translate-y-1/2 opacity-40"
    />
  );
}
