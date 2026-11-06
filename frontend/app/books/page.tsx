import { booksData } from "@/lib/booksData";


export default function Books() {
  return (
    <div className="max-w-content mx-auto px-6 py-24 min-h-[70vh]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="font-mono text-sm text-brown-light tracking-widest uppercase mb-4 block">
            06 — Books
          </span>
          <h1 className="text-5xl font-serif text-brown-deep tracking-tight">
            Reading List
          </h1>
        </div>
        <p className="text-brown-mid max-w-sm text-sm">
          A collection of books that have shaped my thinking on systems, philosophy, psychology, and life.
        </p>
      </div>

      <div className="flex flex-col gap-8 max-w-4xl">
        {booksData.map((book) => (
          <div
            key={book.id}
            className="group border border-brown-light/30 p-6 md:p-8 rounded-lg bg-cream/50 hover:bg-cream hover:shadow-sm transition-all flex flex-col md:flex-row gap-6 md:gap-12"
          >
            {/* Book Info */}
            <div className="md:w-1/3 shrink-0 flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-brown-light border border-brown-light/40 px-2 py-0.5 rounded">
                  {book.category}
                </span>
                {book.status === "reading" && (
                  <span className="font-mono text-[10px] uppercase tracking-wider text-accent border border-accent/40 bg-accent/5 px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                    Reading
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-serif text-brown-deep leading-tight mb-2">
                {book.title}
              </h2>
              <p className="text-sm text-brown-mid font-medium mb-4">{book.author}</p>

              {/* Rating (Stars) */}
              <div className="flex gap-1 text-accent mt-auto pt-4 md:pt-0">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < book.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Personal Note */}
            <div className="md:w-2/3 flex flex-col justify-center">
              <span className="font-mono text-xs text-brown-light mb-2 block">My Notes</span>
              <p className="text-brown-mid leading-relaxed">
                {book.note}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
