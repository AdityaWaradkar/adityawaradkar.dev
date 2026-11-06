"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ArtPiece } from "@/lib/artData";

type LightboxProps = {
  piece: ArtPiece | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
};

export default function Lightbox({ piece, onClose, onNext, onPrev }: LightboxProps) {
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };

    if (piece) {
      window.addEventListener("keydown", handleKeyDown);
      // Prevent background scrolling when lightbox is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [piece, onClose, onNext, onPrev]);

  if (!piece) return null;

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center bg-cream/95 backdrop-blur-sm p-4 md:p-12"
      onClick={onClose} // Close when clicking the backdrop
    >
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-brown-deep hover:text-accent transition-colors z-10"
        aria-label="Close"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation Arrows */}
      <button 
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-brown-deep hover:text-accent transition-colors z-10 p-2"
        aria-label="Previous image"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      
      <button 
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-brown-deep hover:text-accent transition-colors z-10 p-2"
        aria-label="Next image"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Main Content Area */}
      <div 
        className="flex flex-col md:flex-row max-w-6xl w-full max-h-full gap-8 items-center"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing the modal
      >
        {/* Image Container */}
        <div className="relative flex-grow h-[50vh] md:h-[80vh] w-full">
          <Image
            src={piece.imageUrl}
            alt={piece.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 70vw"
            priority
          />
        </div>

        {/* Metadata Side Panel */}
        <div className="w-full md:w-80 flex flex-col shrink-0 text-brown-deep">
          <span className="font-mono text-xs text-brown-light uppercase tracking-widest mb-2 block">
            {piece.category}
          </span>
          <h2 className="text-3xl font-serif mb-6 leading-tight">{piece.title}</h2>
          
          <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm mb-8 border-t border-b border-brown-light/30 py-6">
            <div>
              <span className="text-brown-light block mb-1">Medium</span>
              <span className="font-medium">{piece.medium}</span>
            </div>
            <div>
              <span className="text-brown-light block mb-1">Year</span>
              <span className="font-medium">{piece.year}</span>
            </div>
            <div>
              <span className="text-brown-light block mb-1">Dimensions</span>
              <span className="font-medium">{piece.dimensions}</span>
            </div>
          </div>

          <p className="text-brown-mid leading-relaxed italic">
            "{piece.note}"
          </p>
        </div>
      </div>
    </div>
  );
}