/**
 * African Directory Page - Lists businesses from businesses table
 * Displays African directory businesses dynamically from Supabase
 */

import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import BusinessCard from "@/components/BusinessCard";
import DirectoryHero from "@/components/DirectoryHero";
import Loader from "@/components/Loader";
import { getBusinesses } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "African Directory - Africa Tourism",
  description: "Explore businesses, services, and establishments across Algeria, Rwanda, Benin, Libya, and Botswana.",
};

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: { page?: string; category?: string };
}) {
  const page = parseInt(searchParams.page || "1", 10);
  const limit = 12;

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <DirectoryHero />

      {/* Business List Section */}
      <div className="section-spacing">
        <div className="container-custom">
          {/* Business List */}
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-12">
                <Loader size="lg" />
              </div>
            }
          >
            <BusinessList page={page} limit={limit} category={searchParams.category} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

async function BusinessList({
  page,
  limit,
  category,
}: {
  page: number;
  limit: number;
  category?: string;
}) {
  try {
    const { businesses, total, page: currentPage } = await getBusinesses({ page, limit });
    const totalPages = Math.ceil(total / limit);

    // Filter by category if specified
    const filteredBusinesses = category
      ? businesses.filter((b) => b.category?.toLowerCase() === category.toLowerCase())
      : businesses;

    if (filteredBusinesses.length === 0) {
      return (
        <div className="text-center py-12 text-secondary-600">
          <p className="text-lg mb-2">No businesses available at the moment.</p>
          <p className="text-sm">
            Businesses will appear here once data is loaded from your Supabase businesses table.
          </p>
        </div>
      );
    }

    return (
      <>
        {/* Business Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredBusinesses.map((business, index) => (
            <BusinessCard key={business.id} business={business} index={index} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            {currentPage > 1 && (
              <Link
                href={`/directory?page=${currentPage - 1}${category ? `&category=${category}` : ""}`}
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
                href={`/directory?page=${currentPage + 1}${category ? `&category=${category}` : ""}`}
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
    console.error("Error loading businesses:", error);
    return (
      <div className="text-center py-12 text-red-600">
        <p className="text-lg mb-2">Error loading businesses.</p>
        <p className="text-sm">
          Please check your Supabase connection and ensure the "businesses" table exists with data.
        </p>
      </div>
    );
  }
}

