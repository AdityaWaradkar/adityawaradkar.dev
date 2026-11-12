import { topArtists, topAlbums } from "@/lib/musicData";
import Image from "next/image";
import Link from "next/link";

export default function Music() {
  return (
    <div className="max-w-content mx-auto px-6 py-24 min-h-[70vh]">
      
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <span className="font-mono text-sm text-brown-mid tracking-widest uppercase font-semibold mb-4 block">
          05 — Music
        </span>
        <h1 className="text-5xl md:text-7xl font-serif text-brown-deep tracking-tight mb-6">
          The Soundtrack.
        </h1>
        <p className="text-lg text-brown-mid">
          From the crushing riffs of progressive metal to the raw energy of grunge and hard rock. 
          These are the artists and albums that form the soundtrack to my life, shaping how I think, work, and create.
        </p>
      </div>

      {/* TOP ARTISTS */}
      <div className="mb-24">
        <h2 className="text-3xl font-serif text-brown-deep mb-8 pb-4 border-b border-brown-light/30 flex items-center gap-3">
          <span className="text-accent text-sm font-mono"></span> Top 5 Artists
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {topArtists.map((artist, i) => (
            <Link 
              key={artist.name} 
              href={artist.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col p-4 rounded-lg border border-brown-light/20 hover:bg-brown-light/5 transition-all hover:-translate-y-1 hover:shadow-sm"
            >
              <div className="relative w-full aspect-square rounded-md overflow-hidden mb-4 bg-brown-light/10 border border-brown-light/10">
                {artist.imageUrl && (
                   <Image
                     src={artist.imageUrl}
                     alt={artist.name}
                     fill
                     className="object-cover group-hover:scale-105 transition-transform duration-500"
                   />
                )}
              </div>

              <span className="font-mono text-xs text-brown-light mb-2">0{i + 1}</span>
              <span className="text-xl font-serif text-brown-deep group-hover:text-accent transition-colors leading-tight mb-2">
                {artist.name}
              </span>
              <span className="font-mono text-xs text-brown-light uppercase mt-auto pt-2">
                {artist.genre}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* TOP ALBUMS */}
      <div className="mb-12">
        <h2 className="text-3xl font-serif text-brown-deep mb-8 pb-4 border-b border-brown-light/30 flex items-center gap-3">
           <span className="text-accent text-sm font-mono"></span> Top 5 Albums
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {topAlbums.map((album) => (
            // Changed from <div> to <Link>
            <Link 
              key={album.title} 
              href={album.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 p-4 -m-4 rounded-lg hover:bg-brown-light/5 transition-all hover:-translate-y-1 hover:shadow-sm"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg bg-brown-light/10 border border-brown-light/20 shadow-sm">
                <Image
                  src={album.coverUrl}
                  alt={album.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
              </div>
              <div>
                <p className="font-serif text-lg text-brown-deep group-hover:text-accent transition-colors leading-tight" title={album.title}>
                  {album.title}
                </p>
                <p className="text-sm text-brown-mid mt-1">{album.artist}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}