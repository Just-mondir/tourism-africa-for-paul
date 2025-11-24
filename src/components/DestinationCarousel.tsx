"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface StaticDestinationCardProps {
  image: string;
  title: string;
  description: string;
}

interface CarouselProps {
  destinations: StaticDestinationCardProps[];
}

export default function DestinationCarousel({ destinations }: CarouselProps) {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;
  const total = destinations.length;

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % total);
  };

  // Compute visible cards (looping)
  const visibleDestinations = Array.from({ length: visibleCount }, (_, i) =>
    destinations[(startIndex + i) % total]
  );

  return (
    <div className="flex items-center justify-center gap-4 w-full">
      <button
        onClick={handlePrev}
        className="p-2 rounded-full bg-white shadow hover:bg-primary-100 transition-colors"
        aria-label="Previous"
      >
        <ChevronLeft className="w-6 h-6 text-primary-600" />
      </button>
      <div className="flex gap-6 w-full max-w-5xl justify-center">
        {visibleDestinations.map((dest, idx) => (
          <div
            key={dest.title}
            className="relative rounded-xl overflow-hidden shadow-md h-96 w-80 bg-white group flex-shrink-0"
          >
            <div className="absolute inset-0">
              <Image
                src={dest.image}
                alt={dest.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="320px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/90 group-hover:via-black/60 group-hover:to-black/30 transition-all duration-300" />
            </div>
            <div className="relative h-full flex flex-col justify-end p-0">
              <div
                className="absolute left-0 w-full px-6 z-10 transition-all duration-300"
                style={{ bottom: "1rem" }}
              >
                <h3
                  className="text-lg md:text-xl font-bold text-white drop-shadow-lg bg-black/40 rounded-b-xl py-2 px-3 w-full transition-all duration-300 group-hover:translate-y-[-5.5rem] group-hover:rounded-t-xl group-hover:rounded-b-none"
                  style={{ transition: "transform 0.3s" }}
                >
                  {dest.title}
                </h3>
              </div>
              {dest.description && (
                <div className="overflow-hidden relative z-10 px-6 pb-6">
                  <div className="transform transition-all duration-300 ease-in-out translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-white/95 text-base leading-relaxed drop-shadow-md pt-2">
                      {dest.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleNext}
        className="p-2 rounded-full bg-white shadow hover:bg-primary-100 transition-colors"
        aria-label="Next"
      >
        <ChevronRight className="w-6 h-6 text-primary-600" />
      </button>
    </div>
  );
}
