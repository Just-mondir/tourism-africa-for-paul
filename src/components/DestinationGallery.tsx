"use client";

import { useState, useCallback } from "react";
import FallbackImage from "@/components/FallbackImage";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface DestinationGalleryProps {
  images: string[];
  placeName: string;
}

export default function DestinationGallery({ images, placeName }: DestinationGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? 0 : (i - 1 + images.length) % images.length));
  }, [images.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? 0 : (i + 1) % images.length));
  }, [images.length]);

  if (!images || images.length === 0) return null;

  // Layout: first image large on left, rest in 2-col grid on right
  const [first, ...rest] = images;

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 rounded-2xl overflow-hidden">
        {/* First / hero image — spans 2 rows */}
        <div
          className="relative col-span-2 row-span-2 cursor-zoom-in group overflow-hidden rounded-l-2xl"
          style={{ minHeight: "280px" }}
          onClick={() => openLightbox(0)}
        >
          <FallbackImage
            src={first}
            alt={`${placeName} - photo 1`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
          </div>
        </div>

        {/* Rest of images */}
        {rest.slice(0, 3).map((src, idx) => (
          <div
            key={src}
            className={`relative cursor-zoom-in group overflow-hidden ${
              idx === rest.slice(0, 3).length - 1 ? "rounded-br-2xl" : ""
            } ${idx === 0 ? "rounded-tr-2xl" : ""}`}
            style={{ minHeight: "130px" }}
            onClick={() => openLightbox(idx + 1)}
          >
            <FallbackImage
              src={src}
              alt={`${placeName} - photo ${idx + 2}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center">
              <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
            </div>
            {/* Show +N more on last image if there are more */}
            {idx === 2 && images.length > 4 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">+{images.length - 4} more</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
            onClick={closeLightbox}
            aria-label="Close gallery"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium">
            {lightboxIndex + 1} / {images.length}
          </div>

          {/* Prev */}
          <button
            className="absolute left-4 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image */}
          <div
            className="relative w-full max-w-5xl h-[80vh] px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <FallbackImage
              src={images[lightboxIndex]}
              alt={`${placeName} - photo ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Next */}
          <button
            className="absolute right-4 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Thumbnails strip */}
          <div className="absolute bottom-4 left-0 right-0 flex gap-2 justify-center px-4 overflow-x-auto">
            {images.map((src, idx) => (
              <button
                key={src}
                className={`relative flex-shrink-0 w-14 h-10 rounded overflow-hidden border-2 transition-all duration-200 ${
                  idx === lightboxIndex ? "border-white scale-110" : "border-white/30 opacity-60 hover:opacity-100"
                }`}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(idx); }}
              >
                <FallbackImage
                  src={src}
                  alt={`thumb ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
