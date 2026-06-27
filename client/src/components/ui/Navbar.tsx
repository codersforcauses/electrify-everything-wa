import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  {
    label: "about us",
    children: ["about EEWA", "news", "contact us"],
  },
  {
    label: "get involved",
    children: ["events", "join a community group"],
  },
  {
    label: "go electric",
    children: ["wa savings", "resources"],
  },
];

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="flex items-center justify-between bg-black px-8 py-2 text-white">
      {/* Logo */}
      <Link href="/">
        <Image
          src="/eewa-text-white.png"
          alt="EEWA Logo"
          width={180}
          height={60}
        />
      </Link>

      {/* Navigation Links */}
      <div className="hidden gap-8 pr-8 md:flex">
        {navLinks.map((nav) => (
          <div
            key={nav.label}
            className="relative"
            onMouseEnter={() => setOpenDropdown(nav.label)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            {/* Dropdown trigger */}
            <button className="flex items-center gap-1 hover:text-[#FFF4A3]">
              {openDropdown === nav.label ? "v " : "> "}
              {nav.label}
            </button>

            {/* Dropdown menu */}
            {openDropdown === nav.label && (
              <div className="absolute left-1/2 top-full z-50 mt-2 w-48 -translate-x-1/2 border-t-2 border-[#FFF4A3] bg-black py-2 text-center text-white">
                {nav.children.map((child) => (
                  <Link
                    key={child}
                    href={`/${child.replace(/ /g, "-")}`}
                    className="block px-4 py-3 text-center hover:text-[#FFF4A3]"
                  >
                    {child}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
