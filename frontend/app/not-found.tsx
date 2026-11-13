import Link from "next/link";

// This component automatically renders whenever a user navigates to a route that doesn't exist.
export default function NotFound() {
  return (
    <div className="max-w-content mx-auto px-6 py-32 flex flex-col items-center justify-center text-center min-h-[60vh]">
      
      {/* 404 Subtitle */}
      <span className="font-mono text-sm text-brown-mid tracking-widest uppercase font-semibold mb-4">
        404
      </span>
      
      {/* Main Heading */}
      <h1 className="text-5xl font-serif text-brown-deep tracking-tight mb-6">
        Page not found
      </h1>
      
      {/* Explanatory Text */}
      <p className="text-brown-mid max-w-md mb-8 leading-relaxed">
        The page you are looking for does not exist or has been moved.
      </p>
      
      {/* Return Home Button */}
      <Link 
        href="/" 
        className="bg-accent text-white px-8 py-3 rounded-md font-mono text-sm shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
      >
        Return home
      </Link>
      
    </div>
  );
}