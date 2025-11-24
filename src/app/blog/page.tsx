/**
 * Blog Page - List of all blog posts
 * Displays paginated list of blog posts
 */

import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import Loader from "@/components/Loader";
import { getPosts } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "Travel Blog - Africa Tourism",
  description: "Discover our travel articles, guides, and tips for your African adventures.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || "1", 10);
  const limit = 9;

  return (
    <div className="section-spacing bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
            Travel Blog
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Discover articles, guides, and tips for your adventures across Africa. 
            From destination guides to cultural insights, explore everything African tourism has to offer.
          </p>
        </div>

        {/* Blog List */}
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-12">
              <Loader size="lg" />
            </div>
          }
        >
          <BlogList page={page} limit={limit} />
        </Suspense>
      </div>
    </div>
  );
}

async function BlogList({ page, limit }: { page: number; limit: number }) {
  try {
    const { posts, total, page: currentPage } = await getPosts({ page, limit });
    const totalPages = Math.ceil(total / limit);

    if (posts.length === 0) {
      return (
        <div className="text-center py-12 text-secondary-600">
          <p className="text-lg mb-2">No articles available at the moment.</p>
          <p className="text-sm">
            Articles will appear here once you add them to your Supabase posts table.
          </p>
        </div>
      );
    }

    return (
      <>
        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {posts.map((post, index) => (
            <BlogCard key={post.id} post={post} variant="vertical" index={index} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            {currentPage > 1 && (
              <Link
                href={`/blog?page=${currentPage - 1}`}
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
                href={`/blog?page=${currentPage + 1}`}
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
    console.error("Error loading articles:", error);
    return (
      <div className="text-center py-12 text-red-600">
        <p className="text-lg mb-2">Error loading articles.</p>
        <p className="text-sm">
          Please check your Supabase connection and environment variables.
        </p>
      </div>
    );
  }
}
