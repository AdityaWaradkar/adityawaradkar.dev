export default function Home() {
  return (
    <main className="max-w-content mx-auto p-6 min-h-screen flex flex-col justify-center">
      {/* Added tracking-tight for a bolder look */}
      <h1 className="text-5xl mb-4 font-serif text-brown-deep tracking-tight">
        Aditya Waradkar
      </h1>
      
      <p className="text-brown-mid font-sans mb-8 text-lg max-w-lg">
        Computer engineer. Pencil artist. Listener of many things.
      </p>
      
      <div className="flex gap-4">
        {/* Changed text to pure white for contrast, added a subtle shadow */}
        <button className="bg-accent text-white px-6 py-3 rounded-md font-mono text-sm shadow-sm hover:shadow-md transition-shadow">
          See my work
        </button>
        
        {/* Added border and subtle hover effect */}
        <button className="border border-brown-light text-brown-deep px-6 py-3 rounded-md font-mono text-sm hover:bg-brown-deep hover:text-cream transition-colors">
          Browse art
        </button>
      </div>
    </main>
  );
}