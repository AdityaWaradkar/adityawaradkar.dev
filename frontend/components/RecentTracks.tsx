"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchApi } from "@/lib/api";

type SpotifyTrack = {
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
  external_urls: { spotify: string };
};

export default function RecentTracks() {
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const data = await fetchApi<SpotifyTrack[]>("/api/spotify/recent");
        setTracks(data);
      } catch (error) {
        console.error("Failed to load Spotify tracks", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTracks();
  }, []);

  if (loading) {
    return <div className="animate-pulse text-brown-light font-mono text-sm py-12">Loading recent tracks...</div>;
  }

  if (tracks.length === 0) {
    return (
      <div className="border border-brown-light/30 rounded-lg p-8 bg-cream flex flex-col items-center justify-center text-center">
        <p className="text-brown-mid text-sm mb-4">
          Spotify listening data is currently unavailable.
        </p>
        <p className="text-brown-light text-xs font-mono">
          (Token may need refreshing)
        </p>
        <a 
          href="https://open.spotify.com/user/adityawaradkar" 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-6 text-accent font-mono text-sm hover:underline underline-offset-4"
        >
          View Profile on Spotify ↗
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {tracks.map((track, i) => (
        <a 
          key={i} 
          href={track.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 p-3 rounded-lg border border-transparent hover:border-brown-light/30 hover:bg-cream transition-colors"
        >
          <div className="relative w-12 h-12 rounded overflow-hidden shrink-0 bg-brown-light/20">
            {track.album.images[0] && (
              <Image src={track.album.images[0].url} alt={track.name} fill className="object-cover" />
            )}
          </div>
          
          <div className="flex flex-col flex-grow min-w-0">
            <span className="font-medium text-brown-deep group-hover:text-accent transition-colors truncate">
              {track.name}
            </span>
            <span className="text-sm text-brown-mid truncate">
              {track.artists.map(a => a.name).join(", ")}
            </span>
          </div>
          
          <div className="text-brown-light group-hover:text-accent opacity-0 group-hover:opacity-100 transition-all pr-2">
            ↗
          </div>
        </a>
      ))}
    </div>
  );
}