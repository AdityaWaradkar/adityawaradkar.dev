import BackendStatus from "@/components/BackendStatus";

export default function Home() {
  return (
    <main className="max-w-content mx-auto p-6 min-h-screen flex flex-col justify-center">
      <h1 className="text-5xl mb-4 font-serif text-brown-deep tracking-tight">
        Aditya Waradkar
      </h1>
      
      <p className="text-brown-mid font-sans mb-8 text-lg max-w-lg">
        Computer engineer. Pencil artist. Listener of many things.
      </p>
      
      <div className="flex gap-4 items-center mb-12">
        <button className="bg-accent text-white px-6 py-3 rounded-md font-mono text-sm shadow-sm hover:shadow-md transition-shadow">
          See my work
        </button>
        <button className="border border-brown-light text-brown-deep px-6 py-3 rounded-md font-mono text-sm hover:bg-brown-deep hover:text-cream transition-colors">
          Browse art
        </button>
      </div>

      {/* API Verification Section */}
      <div className="border-t border-brown-light/30 pt-8 mt-8">
        <p className="text-brown-mid font-mono text-xs uppercase tracking-wider mb-4">System Status</p>
        <BackendStatus />
      </div>
    </main>
  );
}