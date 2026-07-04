import { ChevronDown, ChevronRight, Menu } from "lucide-react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="relative z-50 flex items-center justify-between bg-black px-8 py-2 text-white">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/eewa-text-white.png"
            alt="EEWA Logo"
            width={160}
            height={80}
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden gap-8 pr-8 md:flex">
          {navLinks.map((nav) => (
            <div
              key={nav.label}
              className="relative flex w-max flex-col items-center pb-4 pt-4"
              onMouseEnter={() => setOpenDropdown(nav.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <div className="absolute left-1/2 top-full h-10 w-48 -translate-x-1/2" />

              {/* Dropdown trigger */}
              <button className="flex items-center gap-1 hover:text-[#FFF4A3]">
                {openDropdown === nav.label ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
                {nav.label}
              </button>

              <div
                className={`absolute left-1/2 top-full z-50 mt-2 w-48 -translate-x-1/2 border-t-8 border-[#FDEFBD] bg-black py-2 text-center text-white transition-all duration-200 ease-out ${
                  openDropdown === nav.label
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-2 opacity-0"
                }`}
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
            </div>
          ))}
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="rounded p-1 hover:text-[#FFF4A3]"
          >
            <Menu />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/45 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={toggleMobileMenu}
      />

      {/* Sliding sidebar */}
      <aside
        className={`fixed right-0 top-0 z-50 h-screen w-72 bg-black px-6 pb-8 pt-24 text-white shadow-xl transition-transform duration-300 ease-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-6">
          {navLinks.map((nav) => (
            <div key={nav.label} className="flex flex-col gap-3">
              <p className="text-md uppercase tracking-[0.08em] text-[#FFF4A3]">
                {nav.label}
              </p>
              <div className="flex flex-col">
                {nav.children.map((child) => (
                  <Link
                    key={child}
                    href={`/${child.replace(/ /g, "-")}`}
                    className="py-2 text-base hover:text-[#FFF4A3]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {child}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
