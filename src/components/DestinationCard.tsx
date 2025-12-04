/**
 * DestinationCard Component - Card to display an African destination/place
 * Uses fields: places, desc, image_url from country tables
 * Image as background, title visible, description expands on hover (100 chars max)
 */

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import type { Destination } from "@/types/destination";
import { getOptimizedImageUrl } from "@/lib/cloudinary";

interface DestinationCardProps {
  destination: Destination;
  index?: number;
}

// Get country ISO code (alpha-2) based on country slug
function getCountryCode(countrySlug: string): string {
  const codeMap: Record<string, string> = {
    'rwanda': 'RW',
    'benin': 'BJ',
  };
  const normalizedSlug = countrySlug.toLowerCase().trim();
  return codeMap[normalizedSlug] || '';
}

export default function DestinationCard({ destination, index = 0 }: DestinationCardProps) {
  const imageUrl = getOptimizedImageUrl(destination.image_url, 600, 400);
  const countryCode = getCountryCode(destination.country_slug);
  
  // Truncate description to 100 characters max
  const truncatedDesc = destination.desc 
    ? (destination.desc.length > 100 ? destination.desc.substring(0, 100) + "..." : destination.desc)
    : null;
  
  // Generate a slug from places name for routing
  const placeSlug = destination.places
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link
        href={`/destinations/${destination.country_slug}/${placeSlug}`}
        className="block relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 h-80"
      >
        {/* Image as background */}
        <div className="absolute inset-0">
          {destination.image_url ? (
            <Image
              src={imageUrl}
              alt={destination.places}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary-200 to-secondary-300">
              <MapPin className="w-16 h-16 text-secondary-400" />
            </div>
          )}
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/90 group-hover:via-black/60 group-hover:to-black/30 transition-all duration-300" />
        </div>

        {/* Content overlay */}
        <div className="relative h-full flex flex-col justify-end p-0">
          {/* Country badge */}
          <div className="absolute top-4 right-4 bg-white text-black px-3 py-1 rounded-full text-xs font-semibold shadow-md z-10 flex items-center gap-1.5">
            {countryCode && (
              <ReactCountryFlag
                countryCode={countryCode}
                svg
                style={{
                  width: '1.2em',
                  height: '1.2em',
                }}
                title={destination.country}
              />
            )}
            <span className="capitalize">{destination.country_slug}</span>
          </div>

          {/* Title - position change on hover */}
          <div
            className="absolute left-0 w-full px-6 z-10 transition-all duration-300"
            style={{
              bottom: '1rem',
            }}
          >
            <h3
              className="text-base md:text-lg font-bold text-white drop-shadow-lg bg-black/40 rounded-b-xl py-2 px-3 w-full transition-all duration-300 group-hover:translate-y-[-5.5rem] group-hover:rounded-t-xl group-hover:rounded-b-none"
              style={{
                transition: 'transform 0.3s',
              }}
            >
              {destination.places}
            </h3>
          </div>

          {/* Description - expands on hover */}
          {truncatedDesc && (
            <div className="overflow-hidden relative z-10 px-6 pb-6">
              <div className="transform transition-all duration-300 ease-in-out translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-white/95 text-sm md:text-base leading-relaxed drop-shadow-md pt-2">
                  {truncatedDesc}
                </p>
              </div>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
