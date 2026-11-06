import RecentTracks from "@/components/RecentTracks";

export default function Music() {
  return (
    <div className="max-w-content mx-auto px-6 py-24 min-h-[70vh]">
      <div className="max-w-3xl mb-16">
        <span className="font-mono text-sm text-brown-light tracking-widest uppercase mb-4 block">
          05 — Music
        </span>
        <h1 className="text-5xl font-serif text-brown-deep tracking-tight mb-6">
          Listening
        </h1>
        <p className="text-lg text-brown-mid">
          Music is a constant companion. Here is what I have been listening to recently, 
          alongside curated lists for different moods and focus sessions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-6">
          <h2 className="text-2xl font-serif text-brown-deep mb-6 pb-2 border-b border-brown-light/30">
            Recently Played
          </h2>
          <RecentTracks />
        </div>

        <div className="md:col-span-6">
          <h2 className="text-2xl font-serif text-brown-deep mb-6 pb-2 border-b border-brown-light/30">
            Curated by Me
          </h2>
          
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="font-medium text-brown-deep text-lg mb-2">For Deep Work</h3>
              <p className="text-sm text-brown-mid mb-3">Ambient, post-rock, and minimal techno. Zero lyrics to distract the mind.</p>
              <div className="h-24 bg-brown-light/10 rounded border border-brown-light/20 flex items-center justify-center font-mono text-xs text-brown-light">
                [Spotify Embed Coming Soon]
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-brown-deep text-lg mb-2">Late Night Drives</h3>
              <p className="text-sm text-brown-mid mb-3">Synthwave, indie, and alternative. For empty highways and quiet cities.</p>
              <div className="h-24 bg-brown-light/10 rounded border border-brown-light/20 flex items-center justify-center font-mono text-xs text-brown-light">
                [Spotify Embed Coming Soon]
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}