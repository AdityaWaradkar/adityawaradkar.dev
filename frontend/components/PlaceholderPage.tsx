import Link from "next/link";

export default function PlaceholderPage({ title, number }: { title: string, number: string }) {
  return (
    <div className="max-w-content mx-auto px-6 py-24 flex flex-col items-start min-h-[60vh]">
      <span className="font-mono text-sm text-brown-light tracking-widest uppercase mb-4">
        {number}
      </span>
      <h1 className="text-5xl font-serif text-brown-deep tracking-tight mb-6">
        {title}
      </h1>
      <p className="text-brown-mid max-w-md mb-8">
        This section is currently under construction. Check back soon to see the final result.
      </p>
      <Link 
        href="/" 
        className="border border-brown-light text-brown-deep px-6 py-3 rounded-md font-mono text-sm hover:bg-brown-deep hover:text-cream transition-colors"
      >
        Go back home
      </Link>
    </div>
  );
}