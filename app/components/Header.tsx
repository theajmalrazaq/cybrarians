"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/research", label: "Research" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-5 z-50 mx-auto w-fit transition-all duration-300 border border-zinc-200/50 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-white/50 backdrop-blur-sm"
      }`}
    >
      <nav className="flex h-12 items-center px-4 w-full md:w-auto md:min-w-[600px] justify-between gap-8">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2 group whitespace-nowrap"
          >
            <span className="text-normal font-bold tracking-tighter hover:text-brand transition-colors">
              CYBRARIANS
            </span>
          </Link>
        </div>

        {/* Center: Nav links */}
        <div className="hidden md:flex items-center justify-center">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-3 py-1.5 text-[11px] font-semibold transition-all whitespace-nowrap ${
                    pathname === link.href
                      ? "bg-brand text-white"
                      : "text-zinc-500 hover:text-brand"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-none bg-brand px-6 text-[13px] py-1.5 font-medium text-white transition-all hover:opacity-90 active:scale-95 border-t border-white/10 whitespace-nowrap shadow-lg shadow-brand/20"
          >
            Contact Us
          </Link>

          {/* Mobile menu button */}
          <button
            className="flex h-8 w-8 items-center justify-center rounded-none border border-zinc-200 md:hidden hover:bg-zinc-50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.75 9h16.5m-16.5 6.75h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-20 z-50 h-[calc(100vh-5rem)] border-b border-zinc-100 bg-background p-10 md:hidden animate-in fade-in slide-in-from-top-4">
          <ul className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block text-3xl font-semibold ${pathname === link.href ? "text-brand" : "text-black"}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-col gap-4">
            <Link
              href="/contact"
              className="inline-flex h-[48px] items-center justify-between rounded-none pl-5 pr-4 py-0 text-[13px] font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95 bg-brand text-white border-t border-r border-b border-white/10 w-full after:content-['→'] after:ml-3 after:flex after:h-7 after:w-7 after:items-center after:justify-center after:rounded-none after:bg-white/10 after:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
