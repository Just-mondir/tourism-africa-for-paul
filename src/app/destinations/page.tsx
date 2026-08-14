/**
 * Destinations Page - Lists all African destinations
 * Fetches from all country tables. Includes searchable country dropdown,
 * consistent card grid, and enriched content.
 */

import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import DestinationCard from "@/components/DestinationCard";
import FlagshipSpotCard from "@/components/FlagshipSpotCard";
import Loader from "@/components/Loader";
import { getDestinations, getDestinationsByCountry, getCountries, getFlagshipImages } from "@/lib/supabase/queries";
import { FLAGSHIP_DESTINATIONS } from "@/lib/flagship-destinations";
import CountryDropdown from "@/components/CountryDropdown";

export const metadata: Metadata = {
  title: "African Destinations – Explore All Countries | AfricGuide",
  description:
    "Browse destinations across Algeria, Rwanda, Benin, Libya, Botswana, Morocco, Egypt, Kenya, and more. Find the perfect African getaway — from ancient ruins to tropical beaches.",
  keywords: [
    "african destinations",
    "africa travel",
    "morocco travel",
    "egypt tourism",
    "kenya safari",
    "african countries",
    "explore africa",
  ],
};

export default async function DestinationsPage({
  searchParams,
}: {
  searchParams: { page?: string; country?: string };
}) {
  const page = parseInt(searchParams.page || "1", 10);
  const limit = 12;
  const countryFilter = searchParams.country || "";
  const flagshipSpots = FLAGSHIP_DESTINATIONS;
  const flagshipImages = await getFlagshipImages();

  return (
    <div className="bg-white">
      {/* Hero Section with Cards Overlay */}
      <div className="relative w-full overflow-hidden">
        <Image
          src="/destinationHero.webp"
          alt="African Destinations Hero"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Hero Content */}
        <div className="relative z-10 container-custom px-4 md:px-6 pt-16 md:pt-20 pb-8 md:pb-12">
          {/* Title and Subtitle - Centered */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-lg">
              Top African Destinations
            </h1>
            <p className="text-lg md:text-xl text-white/90 drop-shadow-md max-w-2xl mx-auto">
              From the Sahara&apos;s golden dunes to the lush deltas of Botswana,
              discover breathtaking landscapes, vibrant cultures, and unforgettable
              adventures across the continent.
            </p>
          </div>
          
          {/* Featured Destinations Cards */}
          <div className="relative z-20">
            <Suspense
              fallback={
                <div className="flex items-center justify-center py-12">
                  <Loader size="lg" />
                </div>
              }
            >
              <FeaturedDestinations countrySlug={countryFilter} />
            </Suspense>
          </div>
        </div>
      </div>

      <div className="pt-8 md:pt-12 pb-16 md:pb-24">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              African Destinations
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Discover incredible places across Morocco, Egypt, Kenya, Algeria, Rwanda, and more. 
              From ancient cities to natural wonders, explore the diversity of Africa.
            </p>
          </div>

          {/* Country Dropdown Filter */}
          <Suspense fallback={null}>
            <CountryFilters currentCountry={countryFilter} />
          </Suspense>

          {/* Destinations List */}
          <div className="mb-16">
            <Suspense
              fallback={
                <div className="flex items-center justify-center py-12">
                  <Loader size="lg" />
                </div>
              }
            >
              <DestinationsList page={page} limit={limit} countrySlug={countryFilter} />
            </Suspense>
          </div>

          <section className="mb-16 pt-8 border-t border-secondary-200">
            <div className="text-center mb-10">
              <p className="text-sm uppercase tracking-[0.3em] text-secondary-500 mb-3">
                Flagship guides
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-3">
                Signature Destinations by Country
              </h2>
              <p className="text-secondary-600 max-w-2xl mx-auto">
                Start with a curated, in-depth guide to the most iconic spot in each featured country.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {flagshipSpots.map((spot) => (
                <FlagshipSpotCard
                  key={`${spot.countrySlug}-${spot.slug}`}
                  title={spot.title}
                  description={spot.subtitle}
                  image={flagshipImages[spot.slug] || spot.heroImage}
                  country={spot.countryName}
                  href={`/destinations/${spot.countrySlug}/${spot.slug}`}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

// Featured Destinations - Shows first 3 cards
async function FeaturedDestinations({ countrySlug }: { countrySlug: string }) {
  try {
    const { destinations } = countrySlug
      ? await getDestinationsByCountry(countrySlug, { page: 1, limit: 3 })
      : await getDestinations({ page: 1, limit: 3 });

    if (destinations.length === 0) {
      return null;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {destinations.map((destination, index) => (
          <DestinationCard key={`featured-${destination.country_slug}-${destination.id}`} destination={destination} index={index} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error loading featured destinations:", error);
    return null;
  }
}

// Country filter — now renders the client-side dropdown
async function CountryFilters({ currentCountry }: { currentCountry: string }) {
  const countries = await getCountries();

  return (
    <div className="flex justify-center mb-10">
      <CountryDropdown
        countries={countries}
        currentCountry={currentCountry}
      />
    </div>
  );
}

async function DestinationsList({
  page,
  limit,
  countrySlug,
}: {
  page: number;
  limit: number;
  countrySlug: string;
}) {
  try {
    const { destinations, total, page: currentPage } = countrySlug
      ? await getDestinationsByCountry(countrySlug, { page, limit })
      : await getDestinations({ page, limit });

    const totalPages = Math.ceil(total / limit);

    if (destinations.length === 0) {
      return (
        <div className="text-center py-12 text-secondary-600">
          <p className="text-lg mb-2">No destinations available for this selection.</p>
          <p className="text-sm">
            Make sure your Supabase tables (Algerie, Rwanda, Benin, Libya, Botswana) have data.
          </p>
        </div>
      );
    }

    return (
      <>
        {/* Destinations Grid — items-stretch ensures equal heights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12 items-stretch">
          {destinations.map((destination, index) => (
            <DestinationCard key={`${destination.country_slug}-${destination.id}`} destination={destination} index={index} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            {currentPage > 1 && (
              <Link
                href={`/destinations?page=${currentPage - 1}${countrySlug ? `&country=${countrySlug}` : ""}`}
                className="px-4 py-2 bg-secondary-100 text-secondary-900 rounded-lg hover:bg-secondary-200 transition-colors"
              >
                Previous
              </Link>
            )}

            <span className="text-secondary-600">
              Page {currentPage} of {totalPages}
            </span>

            {currentPage < totalPages && (
              <Link
                href={`/destinations?page=${currentPage + 1}${countrySlug ? `&country=${countrySlug}` : ""}`}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                Next
              </Link>
            )}
          </div>
        )}
      </>
    );
  } catch (error) {
    console.error("Error loading destinations:", error);
    return (
      <div className="text-center py-12 text-red-600">
        <p className="text-lg mb-2">Error loading destinations.</p>
        <p className="text-sm">
          Please check your Supabase connection and ensure your country tables exist with data.
        </p>
      </div>
    );
  }
}
