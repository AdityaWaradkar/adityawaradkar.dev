import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center pt-12 pb-24 overflow-hidden">
      <div className="max-w-content mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Text Content */}
        <div className="md:col-span-7 flex flex-col items-start z-10">
          <h1 className="text-5xl md:text-7xl font-serif text-brown-deep tracking-tight leading-[1.1] mb-6">
            part-time engineer <br />
            <span className="text-accent italic">full-time Artist</span>
          </h1>
          <p className="text-lg text-brown-mid max-w-md mb-10 leading-relaxed">
            I’m a computer engineer who spends a lot of time working with cloud and DevOps, painting and sketching portraits, and listening to heavy metal. This is my corner of the internet for the things I build and create.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/work/projects" 
              className="bg-accent text-white px-8 py-4 rounded-md font-mono text-sm shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              See my work
            </Link>
            <Link 
              href="/art" 
              className="border border-brown-light text-brown-deep px-8 py-4 rounded-md font-mono text-sm hover:bg-brown-deep hover:text-cream transition-colors"
            >
              Browse art
            </Link>
          </div>
        </div>

        {/* Right Side: Abstract Stroke Animation */}
        <div className="md:col-span-5 relative hidden md:flex justify-center items-center">
          <svg 
            viewBox="0 0 400 400" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full max-w-[400px] text-brown-light/40"
          >
            {/* The stroke animation applies here */}
            <path 
              className="animate-draw"
              d="M 50 200 C 100 100, 200 50, 300 100 C 400 150, 350 300, 250 350 C 150 400, 50 300, 100 200 C 150 100, 250 150, 300 250 C 350 350, 200 350, 150 250"
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
          </svg>
        </div>

      </div>
    </section>
  );
}