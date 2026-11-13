import Link from "next/link";

// A reusable component for pages that are planned but not yet built.
// Accepts a title and the section number (e.g., "09") to maintain the site's editorial numbering.
export default function PlaceholderPage({ title, number }: { title: string, number: string }) {
  return (
    <div className="max-w-content mx-auto px-6 py-24 flex flex-col items-start min-h-[60vh]">
      
      {/* Section Number */}
      <span className="font-mono text-sm text-brown-mid tracking-widest uppercase font-semibold mb-4">
        {number}
      </span>
      
      {/* Page Title */}
      <h1 className="text-5xl font-serif text-brown-deep tracking-tight mb-6">
        {title}
      </h1>
      
      {/* Under Construction Message */}
      <p className="text-brown-mid max-w-md mb-8 leading-relaxed">
        This section is currently under construction. Check back soon to see the final result.
      </p>
      
      {/* Return Home Button */}
      <Link 
        href="/" 
        className="border border-brown-light text-brown-deep px-6 py-3 rounded-md font-mono text-sm hover:bg-brown-deep hover:text-cream transition-colors"
      >
        Go back home
      </Link>
      
    </div>
  );
}