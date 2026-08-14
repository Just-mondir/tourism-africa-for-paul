/**
 * DestinationCard Component - go2africa-inspired card layout
 * Text/title above the image, image in the middle with hover effect,
 * highlights/tags below — clean white card style.
 * Fixed: equal height cards, Title Case names, consistent alignment.
 */

"use client";

import { motion } from "framer-motion";
import FallbackImage from "@/components/FallbackImage";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import type { Destination } from "@/types/destination";
import { getOptimizedImageUrl } from "@/lib/cloudinary";
import { generateSlug } from "@/lib/utils";

interface DestinationCardProps {
  destination: Destination;
  index?: number;
}

// Convert a string to Title Case
function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(/[\s-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Get country ISO code (alpha-2) based on country slug
function getCountryCode(countrySlug: string): string {
  const codeMap: Record<string, string> = {
    algerie: "DZ",
    botswana: "BW",
    egypt: "EG",
    malawi: "MW",
    mali: "ML",
    morocco: "MA",
    rwanda: "RW",
    zambia: "ZM",
    benin: "BJ",
    kenya: "KE",
    libya: "LY",
    zimbabwi: "ZW",
  };
  const normalizedSlug = countrySlug.toLowerCase().trim();
  return codeMap[normalizedSlug] || "";
}

export default function DestinationCard({
  destination,
  index = 0,
}: DestinationCardProps) {
  const imageUrl = getOptimizedImageUrl(destination.image_url, 600, 400);
  const countryCode = getCountryCode(destination.country_slug);

  // Title-Case the place name and country label
  const placeName = toTitleCase(destination.places);
  const countryLabel = toTitleCase(destination.country_slug.replace(/-/g, " "));

  // Truncate description
  const truncatedDesc = destination.desc
    ? destination.desc.length > 90
      ? destination.desc.substring(0, 90) + "…"
      : destination.desc
    : null;

  // Consistent slug for detail route
  const placeSlug = generateSlug(destination.places);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group h-full"
    >
      <Link
        href={`/destinations/${destination.country_slug}/${placeSlug}`}
        className="block h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex flex-col"
      >
        {/* ── TOP TEXT SECTION (like go2africa: info above the image) ── */}
        <div className="px-5 pt-5 pb-4">
          {/* Country badge */}
          <div className="flex items-center gap-2 mb-2">
            {countryCode && (
              <ReactCountryFlag
                countryCode={countryCode}
                svg
                style={{ width: "1.1em", height: "1.1em", borderRadius: "2px" }}
                title={destination.country}
              />
            )}
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-500">
              {countryLabel}
            </span>
          </div>

          {/* Place title — Playfair Display editorial style */}
          <h3 className="font-display text-xl md:text-2xl font-bold text-secondary-900 leading-snug group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
            {placeName}
          </h3>
        </div>

        {/* ── IMAGE SECTION ── */}
        <div className="relative h-52 w-full overflow-hidden flex-shrink-0">
          {destination.image_url ? (
            <FallbackImage
              src={imageUrl}
              alt={placeName}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary-100 to-secondary-200">
              <MapPin className="w-12 h-12 text-secondary-300" />
            </div>
          )}
          {/* Subtle top fade for depth */}
          <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
        </div>

        {/* ── BOTTOM INFO SECTION ── */}
        <div className="px-5 py-4 flex-1 flex flex-col justify-end">
          {truncatedDesc && (
            <>
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary-500 mb-1">
                Highlights
              </p>
              <p className="text-sm text-secondary-600 leading-relaxed line-clamp-2">
                {truncatedDesc}
              </p>
            </>
          )}

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-secondary-100">
            <span className="text-xs text-secondary-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-primary-400" />
              {countryLabel}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 group-hover:gap-2 transition-all duration-200">
              Explore <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
