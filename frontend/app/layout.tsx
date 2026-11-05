import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({ 
  subsets: ["latin"], 
  variable: "--font-fraunces",
  display: 'swap'
});

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap'
});

const ibmPlexMono = IBM_Plex_Mono({ 
  weight: ["400", "500"],
  subsets: ["latin"], 
  variable: "--font-ibm-plex-mono",
  display: 'swap'
});

export const metadata: Metadata = {
  title: "Aditya Waradkar",
  description: "Computer engineer. Pencil artist. Listener of many things.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${inter.variable} ${ibmPlexMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}