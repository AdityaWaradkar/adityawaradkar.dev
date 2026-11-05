"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "About", href: "/about" },
    { name: "Experience", href: "/work/experience" },
    { name: "Projects", href: "/work/projects" },
    { name: "Art", href: "/art" },
    { name: "Music", href: "/music" },
    { name: "Books", href: "/books" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-cream/90 backdrop-blur-md border-b border-brown-light/20 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-content mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl tracking-tight text-brown-deep hover:text-accent transition-colors">
          Aditya Waradkar
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-brown-mid hover:text-accent transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-brown-deep p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isMobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-cream border-b border-brown-light/20 py-6 px-6 flex flex-col gap-6 shadow-lg">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl font-serif text-brown-deep"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}