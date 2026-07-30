"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface StaticDestinationCardProps {
  image: StaticImageData | string;
  title: string;
  description: string;
  href?: string;
}

interface CarouselProps {
  destinations: StaticDestinationCardProps[];
}

function StaticCard({ dest }: { dest: StaticDestinationCardProps }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-secondary-100 flex-shrink-0 w-72 md:w-80 cursor-pointer">
      {/* Top text section */}
      <div className="px-5 pt-5 pb-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary-500 mb-2">
          Top Destination
        </p>
        <h3 className="font-display text-xl md:text-2xl font-bold text-secondary-900 leading-snug group-hover:text-primary-600 transition-colors duration-200">
          {dest.title}
        </h3>
      </div>

      {/* Image section */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={dest.image}
          alt={dest.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="320px"
        />
        <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
      </div>

      {/* Bottom info section */}
      <div className="px-5 py-4">
        {dest.description && (
          <>
            <p className="text-xs font-semibold uppercase tracking-wider text-secondary-500 mb-1">
              Highlights
            </p>
            <p className="text-sm text-secondary-600 leading-relaxed line-clamp-2">
              {dest.description}
            </p>
          </>
        )}
        <div className="flex items-center justify-end mt-4 pt-3 border-t border-secondary-100">
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 group-hover:gap-2 transition-all duration-200">
            Explore <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
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

  const visibleDestinations = Array.from({ length: visibleCount }, (_, i) =>
    destinations[(startIndex + i) % total]
  );

  return (
    <div className="flex items-center justify-center gap-4 w-full">
      <button
        onClick={handlePrev}
        className="p-2.5 rounded-full bg-white shadow-md hover:bg-primary-50 hover:shadow-lg transition-all duration-200 border border-secondary-100"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5 text-primary-600" />
      </button>

      <div className="flex gap-6 w-full max-w-5xl justify-center">
        {visibleDestinations.map((dest, idx) => {
          if (dest.href) {
            return (
              <Link key={`${dest.title}-${idx}`} href={dest.href} className="block">
                <StaticCard dest={dest} />
              </Link>
            );
          }
          return <StaticCard key={`${dest.title}-${idx}`} dest={dest} />;
        })}
      </div>

      <button
        onClick={handleNext}
        className="p-2.5 rounded-full bg-white shadow-md hover:bg-primary-50 hover:shadow-lg transition-all duration-200 border border-secondary-100"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5 text-primary-600" />
      </button>
    </div>
  );
}
