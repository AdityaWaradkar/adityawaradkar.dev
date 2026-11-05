import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-content mx-auto px-6 py-32 flex flex-col items-center justify-center text-center min-h-[60vh]">
      <span className="font-mono text-sm text-brown-light tracking-widest uppercase mb-4">
        404
      </span>
      <h1 className="text-5xl font-serif text-brown-deep tracking-tight mb-6">
        Page not found
      </h1>
      <p className="text-brown-mid max-w-md mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link 
        href="/" 
        className="bg-accent text-white px-6 py-3 rounded-md font-mono text-sm shadow-sm hover:shadow-md transition-shadow"
      >
        Return home
      </Link>
    </div>
  );
}