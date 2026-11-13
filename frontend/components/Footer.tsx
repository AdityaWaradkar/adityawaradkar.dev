// frontend/components/Footer.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { socialsData } from "@/lib/socialsData";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  // Calculate the year on the client side to avoid Next.js hydration errors
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
          <span className="font-mono text-xs text-brown-mid uppercase tracking-wider font-semibold mb-2">Explore</span>
          <Link href="/about" className="text-sm text-brown-mid hover:text-accent transition-colors">About</Link>
          <Link href="/work/projects" className="text-sm text-brown-mid hover:text-accent transition-colors">Projects</Link>
          <Link href="/art" className="text-sm text-brown-mid hover:text-accent transition-colors">Art Gallery</Link>
          <Link href="/music" className="text-sm text-brown-mid hover:text-accent transition-colors">Music</Link>
          <Link href="/contact" className="text-sm text-brown-mid hover:text-accent transition-colors">Contact</Link>
        </div>

        {/* Column 3: Socials */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs text-brown-mid uppercase tracking-wider font-semibold mb-2">Connect</span>
          {/* Map through the shared socials data file to keep links consistent */}
          {socialsData.map((social) => (
            <a 
              key={social.name}
              href={social.url} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-brown-mid hover:text-accent transition-colors w-fit"
            >
              {social.name}
            </a>
          ))}
          <Link href="/contact" className="text-sm text-brown-mid hover:text-accent transition-colors w-fit">Email</Link>
        </div>
      </div>

      {/* Bottom Bar: Copyright and Credits */}
      <div className="border-t border-brown-light/20">
        <div className="max-w-content mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-brown-light">
          <span>© {currentYear ? currentYear : "2025"} Aditya Waradkar</span>
          <span>Built with Next.js & Go</span>
        </div>
      </div>
    </footer>
  );
}