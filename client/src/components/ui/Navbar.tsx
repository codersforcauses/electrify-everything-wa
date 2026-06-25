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
    <nav className="flex items-center justify-between bg-black px-6 py-2 text-white">
      {/* Logo */}
      <Link href="/">
        <Image src="/images/logo.png" alt="EEWA Logo" width={150} height={50} />
      </Link>

      {/* Navigation Links */}
      <div className="hidden gap-8 md:flex">
        {navLinks.map((nav) => (
          <div
            key={nav.label}
            className="relative"
            onMouseEnter={() => setOpenDropdown(nav.label)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            {/* Dropdown trigger */}
            <button className="flex items-center gap-1 hover:text-[#FFF4A3]">
              {openDropdown === nav.label ? "v" : ">"}
              {nav.label}
            </button>

            {/* Dropdown menu */}
            {openDropdown === nav.label && (
              <div
                className="absolute right-0 top-full z-50 w-48 bg-black py-2 text-white"
                text-center
              >
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
