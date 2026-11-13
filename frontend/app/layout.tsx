import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GrainOverlay from "@/components/GrainOverlay";

// -----------------------------------------------------------------------------
// Font Configuration
// Using next/font/google automatically self-hosts these fonts for optimal performance.
// We define CSS variables so Tailwind can use them across the site.
// -----------------------------------------------------------------------------
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: 'swap' });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: 'swap' });
const ibmPlexMono = IBM_Plex_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-ibm-plex-mono", display: 'swap' });

// -----------------------------------------------------------------------------
// SEO Metadata
// Defines global metadata, Open Graph (Facebook/LinkedIn), and Twitter cards.
// The template property automatically appends the site name to subpage titles.
// -----------------------------------------------------------------------------
export const metadata: Metadata = {
  title: {
    default: "Aditya Waradkar | DevOps & Cloud Engineer",
    template: "%s | Aditya Waradkar",
  },
  description: "Computer engineer specializing in DevOps and Cloud infrastructure. Pencil artist. Listener of many things.",
  keywords: ["Aditya Waradkar", "DevOps Engineer", "Cloud Engineer", "Portfolio", "Pencil Artist", "Go Developer"],
  authors: [{ name: "Aditya Waradkar" }],
  creator: "Aditya Waradkar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adityawaradkar.dev",
    title: "Aditya Waradkar | DevOps & Cloud Engineer",
    description: "Computer engineer specializing in DevOps and Cloud infrastructure. Pencil artist. Listener of many things.",
    siteName: "Aditya Waradkar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Waradkar | DevOps & Cloud Engineer",
    description: "Computer engineer specializing in DevOps and Cloud infrastructure. Pencil artist. Listener of many things.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${inter.variable} ${ibmPlexMono.variable} antialiased min-h-screen flex flex-col`}>
        
        {/* 
          Accessibility: Skip to Content Link
          Hidden by default, but appears when a keyboard user hits 'Tab'.
          Allows them to bypass the navbar and jump straight to the page content.
        */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[999] focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:font-mono focus:text-sm"
        >
          Skip to main content
        </a>
        
        <GrainOverlay />
        <Navbar />
        
        {/* 
          Main Content Area
          pt-20 offsets the fixed navbar so content doesn't hide behind it.
          flex-grow ensures the footer always stays at the bottom even on short pages.
        */}
        <main id="main-content" className="flex-grow pt-20">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}