export default function Home() {
  return (
    <main className="max-w-content mx-auto p-6 min-h-screen flex flex-col justify-center">
      <h1 className="text-4xl mb-4 font-serif text-brown-deep">
        Scaffolding Successful
      </h1>
      <p className="text-brown-mid font-sans mb-6">
        Cream background, brown text, and custom fonts are active.
      </p>
      
      <div className="flex gap-4">
        <span className="bg-accent text-cream px-4 py-2 rounded font-mono text-sm">
          Accent Color
        </span>
        <span className="border border-brown-light text-brown-deep px-4 py-2 rounded font-mono text-sm">
          Border Color
        </span>
      </div>
    </main>
  );
}