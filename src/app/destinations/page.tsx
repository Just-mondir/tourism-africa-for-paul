/**
 * Destinations Page - Lists all African destinations
 * Fetches from all country tables: Algerie, Rwanda, Benin, Libya, Botswana
 */

import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import DestinationCard from "@/components/DestinationCard";
import Loader from "@/components/Loader";
import { getDestinations, getDestinationsByCountry, getCountries } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "African Destinations - Africa Tourism",
  description: "Explore amazing destinations across Algeria, Rwanda, Benin, Libya, and Botswana.",
};

export default async function DestinationsPage({
  searchParams,
}: {
  searchParams: { page?: string; country?: string };
}) {
  const page = parseInt(searchParams.page || "1", 10);
  const limit = 12;
  const countryFilter = searchParams.country || "";

  return (
    <div className="section-spacing bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
            African Destinations
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Discover incredible places across Algeria, Rwanda, Benin, Libya, and Botswana. 
            From ancient cities to natural wonders, explore the diversity of Africa.
          </p>
        </div>

        {/* Country Filters */}
        <Suspense fallback={null}>
          <CountryFilters currentCountry={countryFilter} />
        </Suspense>

        {/* Destinations List */}
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
    </div>
  );
}

// Country filter buttons
async function CountryFilters({ currentCountry }: { currentCountry: string }) {
  const countries = await getCountries();

  return (
    <div className="flex flex-wrap gap-4 mb-8 justify-center">
      <Link
        href="/destinations"
        className={`px-4 py-2 rounded-lg transition-colors ${
          !currentCountry
            ? "bg-primary-500 text-white"
            : "bg-secondary-100 text-secondary-900 hover:bg-primary-500 hover:text-white"
        }`}
      >
        All Countries
      </Link>
      {countries.map((country) => (
        <Link
          key={country.slug}
          href={`/destinations?country=${country.slug}`}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentCountry === country.slug
              ? "bg-primary-500 text-white"
              : "bg-secondary-100 text-secondary-900 hover:bg-primary-500 hover:text-white"
          }`}
        >
          {country.name}
        </Link>
      ))}
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
        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
