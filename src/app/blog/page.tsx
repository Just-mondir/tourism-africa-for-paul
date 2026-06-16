/**
 * Blog Page - List of all blog posts
 * Displays infinite scroll list of blog posts
 */

import type { Metadata } from "next";
import BlogHero from "@/components/BlogHero";
import BlogListInfinite from "@/components/BlogListInfinite";

export const metadata: Metadata = {
  title: "Travel Blog - Africa Tourism",
  description: "Discover our travel articles, guides, and tips for your African adventures.",
};

export default function BlogPage() {
  return (
    <>
      <BlogHero />
      <div id="blog-content" className="section-spacing bg-white scroll-mt-20">
        <div className="container-custom">
          {/* Blog List with Infinite Scroll */}
          <BlogListInfinite />
        </div>
      </div>
    </>
  );
}
