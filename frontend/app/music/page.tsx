import Image from "next/image";
import Link from "next/link";
import { topArtists, topAlbums } from "@/lib/musicData";

export default function Music() {
  return (
    <div className="max-w-content mx-auto px-6 py-24 min-h-[70vh]">
      
      {/* Page Header */}
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

      {/* 1. TOP 7 ARTISTS (Matching the 12-column Album Grid) */}
      <div className="mb-24">
        <h2 className="text-3xl font-serif text-brown-deep mb-8 pb-4 border-b border-brown-light/30">
          Top 7 Artists
        </h2>
        
        {/* 
          Using the exact same 12-column grid structure as the albums.
          We set a minimum height for the rows so the artist images have enough room to breathe.
        */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:auto-rows-[250px] gap-6">
          {topArtists.map((artist, i) => {
            const spans = [
              "md:col-span-6 md:row-span-2", // 1: Large Feature (Top Left, 6x2)
              "md:col-span-3 md:row-span-1", // 2: Top Middle-Right (3x1)
              "md:col-span-3 md:row-span-1", // 3: Top Far-Right (3x1)
              "md:col-span-3 md:row-span-1", // 4: Mid Middle-Right (3x1)
              "md:col-span-3 md:row-span-1", // 5: Mid Far-Right (3x1)
              "md:col-span-6 md:row-span-1", // 6: Bottom Left (6x1)
              "md:col-span-6 md:row-span-1", // 7: Bottom Right (6x1)
            ];

            return (
              <Link 
                key={artist.name} 
                href={artist.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex flex-col justify-end p-6 rounded-xl overflow-hidden border border-brown-light/20 hover:shadow-lg transition-all ${spans[i]}`}
              >
                <div className="absolute inset-0 bg-brown-light/10 z-0">
                  {artist.imageUrl && (
                    <Image
                      src={artist.imageUrl}
                      alt={artist.name}
                      fill
                      className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 mix-blend-multiply"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-brown-deep/95 via-brown-deep/40 to-transparent" />
                </div>

                <div className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
                  <span className="font-mono text-xs text-cream/80 mb-2 block">0{i + 1}</span>
                  <h3 className="text-2xl md:text-3xl font-serif text-cream group-hover:text-white drop-shadow-md transition-colors leading-tight mb-2">
                    {artist.name}
                  </h3>
                  <span className="font-mono text-xs text-cream/70 uppercase tracking-widest border border-cream/30 px-2 py-1 rounded inline-block backdrop-blur-sm">
                    {artist.genre}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 2. TOP 7 ALBUMS (Perfect Square Grid) */}
      <div>
        <h2 className="text-3xl font-serif text-brown-deep mb-8 pb-4 border-b border-brown-light/30">
           Top 7 Albums
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {topAlbums.map((album, i) => {
            const spans = [
              "md:col-span-6 md:row-span-2", // 1: Large Feature (Top Left, 6x2)
              "md:col-span-3 md:row-span-1", // 2: Top Middle-Right (3x1)
              "md:col-span-3 md:row-span-1", // 3: Top Far-Right (3x1)
              "md:col-span-3 md:row-span-1", // 4: Mid Middle-Right (3x1)
              "md:col-span-3 md:row-span-1", // 5: Mid Far-Right (3x1)
              "md:col-span-6 md:row-span-1", // 6: Bottom Left (6x1)
              "md:col-span-6 md:row-span-1", // 7: Bottom Right (6x1)
            ];

            return (
              <Link 
                key={album.title} 
                href={album.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col gap-3 ${spans[i]}`}
              >
                <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-brown-light/10 border border-brown-light/20 shadow-sm">
                  <Image
                    src={album.coverUrl}
                    alt={album.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="w-14 h-14 rounded-full bg-white/20 border border-white/40 backdrop-blur-md flex items-center justify-center text-white transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-xl">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="px-1 shrink-0">
                  <p className="font-serif text-xl text-brown-deep group-hover:text-accent transition-colors leading-tight" title={album.title}>
                    {album.title}
                  </p>
                  <p className="text-sm text-brown-mid mt-1 font-mono uppercase tracking-wider">{album.artist}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

    </div>
  );
}