"use client";

import { useState } from "react";
import Image from "next/image";
import { artData, ArtPiece } from "@/lib/artData";
import Lightbox from "@/components/Lightbox";

export default function Art() {
  const [filter, setFilter] = useState<"all" | "sketches" | "paintings">("all");
  const [selectedPiece, setSelectedPiece] = useState<ArtPiece | null>(null);

  const filteredArt = artData.filter(
    (piece) => filter === "all" || piece.category === filter
  );

  // Logic to find the next/previous piece within the *filtered* list
  const handleNext = () => {
    if (!selectedPiece) return;
    const currentIndex = filteredArt.findIndex((p) => p.id === selectedPiece.id);
    const nextIndex = (currentIndex + 1) % filteredArt.length;
    setSelectedPiece(filteredArt[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedPiece) return;
    const currentIndex = filteredArt.findIndex((p) => p.id === selectedPiece.id);
    const prevIndex = (currentIndex - 1 + filteredArt.length) % filteredArt.length;
    setSelectedPiece(filteredArt[prevIndex]);
  };

  return (
    <div className="max-w-content mx-auto px-6 py-24 min-h-[70vh]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="font-mono text-sm text-brown-light tracking-widest uppercase mb-4 block">
            04 — Art
          </span>
          <h1 className="text-5xl font-serif text-brown-deep tracking-tight">
            Gallery
          </h1>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 border-b border-brown-light/30 pb-2">
          {["all", "sketches", "paintings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab as any)}
              className={`font-mono text-sm uppercase tracking-wider transition-colors pb-2 ${
                filter === tab
                  ? "text-accent border-b-2 border-accent"
                  : "text-brown-light hover:text-brown-mid"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArt.map((piece) => (
          <div 
            key={piece.id} 
            className="group flex flex-col gap-4 cursor-pointer"
            onClick={() => setSelectedPiece(piece)}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-brown-light/10 border border-brown-light/20">
              <Image
                src={piece.imageUrl}
                alt={piece.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <h2 className="text-xl font-serif text-brown-deep group-hover:text-accent transition-colors">
                  {piece.title}
                </h2>
                <span className="font-mono text-xs text-brown-light">{piece.year}</span>
              </div>
              <p className="text-sm text-brown-mid">{piece.medium}</p>
            </div>
          </div>
        ))}
      </div>

      {/* The Lightbox Component */}
      <Lightbox 
        piece={selectedPiece} 
        onClose={() => setSelectedPiece(null)} 
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
}