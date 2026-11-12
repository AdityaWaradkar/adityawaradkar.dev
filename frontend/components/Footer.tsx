// frontend/components/Footer.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-brown-light/30 bg-cream mt-auto">
      <div className="max-w-content mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Column 1: Statement */}
        <div>
          <p className="font-serif text-2xl text-brown-deep mb-4">
            Aditya Waradkar
          </p>
          <p className="text-brown-mid text-sm max-w-xs">
            Computer Engineer and Artist
          </p>
        </div>

        {/* Column 2: Sitemap */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs text-brown-light uppercase tracking-wider mb-2">Explore</span>
          <Link href="/about" className="text-sm text-brown-mid hover:text-accent transition-colors">About</Link>
          <Link href="/work/projects" className="text-sm text-brown-mid hover:text-accent transition-colors">Projects</Link>
          <Link href="/art" className="text-sm text-brown-mid hover:text-accent transition-colors">Art Gallery</Link>
          <Link href="/music" className="text-sm text-brown-mid hover:text-accent transition-colors">Music</Link>
          <Link href="/contact" className="text-sm text-brown-mid hover:text-accent transition-colors">Contact</Link>
        </div>

        {/* Column 3: Socials Placeholder */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs text-brown-light uppercase tracking-wider mb-2">Connect</span>
          <a href="https://www.linkedin.com/in/aditya-waradkar-9a03b92a5/" className="text-sm text-brown-mid hover:text-accent transition-colors">LinkedIn</a>
          <a href="https://www.instagram.com/adityaa.draws/" className="text-sm text-brown-mid hover:text-accent transition-colors">Instagram</a>
          <a href="https://open.spotify.com/user/31h2c5dtb44qckvb3pjvt2x2rb74?si=ac0357ef9aa04e6d" className="text-sm text-brown-mid hover:text-accent transition-colors">Spotify</a>
          <Link href="/contact" className="text-sm text-brown-mid hover:text-accent transition-colors">Email</Link>
        </div>
      </div>

      <div className="border-t border-brown-light/20">
        <div className="max-w-content mx-auto px-6 py-6 flex justify-between items-center text-xs font-mono text-brown-light">
          <span>© {currentYear ? currentYear : "2025"} Aditya Waradkar</span>
          <span>Built with Next.js & Go</span>
        </div>
      </div>
    </footer>
  );
}