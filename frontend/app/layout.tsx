import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GrainOverlay from "@/components/GrainOverlay";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: 'swap' });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: 'swap' });
const ibmPlexMono = IBM_Plex_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-ibm-plex-mono", display: 'swap' });

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
      {/* Skip to Content Link */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[999] focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:font-mono focus:text-sm"
        >
          Skip to main content
        </a>
        
        <GrainOverlay />
        <Navbar />
        
        {/* pt-20 offsets the fixed navbar */}
        <main className="flex-grow pt-20">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}