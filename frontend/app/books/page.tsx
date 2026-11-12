import { booksData } from "@/lib/booksData";
import Image from "next/image";

export default function Books() {
  return (
    <div className="max-w-content mx-auto px-6 py-24 min-h-[70vh]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-brown-light/30 pb-8">
        <div>
          <span className="font-mono text-sm text-brown-mid tracking-widest uppercase font-semibold mb-4 block">
            06 — Books
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-brown-deep tracking-tight">
            Reading List
          </h1>
        </div>
        <p className="text-brown-mid max-w-sm text-sm leading-relaxed">
          A collection of books that have shaped my thinking on philosophy, psychology, and life. 
          The ones currently on my desk and the ones I highly recommend.
        </p>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {booksData.map((book) => (
          <div 
            key={book.id}
            className="group flex flex-col sm:flex-row gap-6 md:gap-8 items-start"
          >
            {/* Book Cover Placeholder */}
            <div className="relative w-full sm:w-40 aspect-[2/3] shrink-0 rounded-md overflow-hidden bg-brown-light/10 border border-brown-light/20 shadow-sm">
              {book.coverUrl ? (
                <Image
                  src={book.coverUrl}
                  alt={book.title}
                  fill
                  className="object-cover" // Removed the hover zoom class here
                  sizes="(max-width: 768px) 100vw, 160px"
                />
              ) : (
                // Fallback if no image is uploaded
                <div className="absolute inset-0 flex items-center justify-center text-brown-light font-mono text-xs">
                  No Cover
                </div>
              )}
            </div>

            {/* Book Details */}
            <div className="flex flex-col flex-grow h-full pt-2">
              {/* Tags */}
              <div className="flex items-center gap-3 mb-3">
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

              {/* Title & Author */}
              <h2 className="text-2xl font-serif text-brown-deep leading-tight mb-1 group-hover:text-accent transition-colors">
                {book.title}
              </h2>
              <p className="text-sm text-brown-mid font-medium mb-6">{book.author}</p>

              {/* My Notes */}
              <div className="flex flex-col flex-grow border-t border-brown-light/20 pt-4">
                <span className="font-mono text-[10px] text-brown-light uppercase tracking-wider mb-2 block">
                  My Notes
                </span>
                <p className="text-brown-mid text-sm leading-relaxed">
                  {book.note}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}