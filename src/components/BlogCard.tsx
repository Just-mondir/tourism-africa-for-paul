/**
 * BlogCard Component - Card to display a blog post
 * Supports horizontal and vertical variants
 */

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import type { Post } from "@/types/post";
import { getOptimizedImageUrl, getThumbnailUrl } from "@/lib/cloudinary";
import { formatDate, truncate } from "@/lib/utils";

interface BlogCardProps {
  post: Post;
  variant?: "horizontal" | "vertical";
  index?: number;
}

export default function BlogCard({
  post,
  variant = "vertical",
  index = 0,
}: BlogCardProps) {
  const imageUrl =
    variant === "horizontal"
      ? getOptimizedImageUrl(post.cover_image_url, 800, 500)
      : getThumbnailUrl(post.cover_image_url, 400);

  const excerpt = truncate(post.excerpt || post.content, variant === "horizontal" ? 200 : 120);

  if (variant === "horizontal") {
    return (
      <motion.article
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group"
      >
        <Link
          href={`/blog/${post.slug}`}
          className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="relative w-full md:w-1/3 h-64 md:h-auto overflow-hidden bg-secondary-100">
              {post.cover_image_url ? (
                <Image
                  src={imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-secondary-200">
                  <Calendar className="w-16 h-16 text-secondary-400" />
                </div>
              )}
              {/* Title at bottom of image (horizontal) */}
              <div className="absolute bottom-0 left-0 w-full px-4 pb-3 z-10">
                <h3 className="text-base md:text-lg font-bold text-white drop-shadow-lg bg-black/40 rounded-b-xl py-2 px-3 w-full">
                  {post.title}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 flex flex-col justify-center">
              {post.published_at && (
                <time
                  dateTime={post.published_at}
                  className="text-sm text-secondary-500 mb-2 flex items-center gap-1"
                >
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.published_at)}
                </time>
              )}
              <h3 className="text-2xl font-bold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                {/* Title removed from here, now on image */}
              </h3>
              {excerpt && (
                <p className="text-secondary-600 mb-4 line-clamp-3">{excerpt}</p>
              )}
              <div className="text-primary-600 text-sm font-semibold flex items-center">
                Read more
                <span className="ml-2 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  // Vertical variant
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        {/* Image */}
        <div className="relative w-full h-48 overflow-hidden bg-secondary-100">
          {post.cover_image_url ? (
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-secondary-200">
              <Calendar className="w-12 h-12 text-secondary-400" />
            </div>
          )}
          {/* Title at bottom of image (vertical) */}
          <div className="absolute bottom-0 left-0 w-full px-3 pb-2 z-10">
            <h3 className="text-base font-bold text-white drop-shadow-lg bg-black/40 rounded-b-xl py-2 px-3 w-full">
              {post.title}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {post.published_at && (
            <time
              dateTime={post.published_at}
              className="text-xs text-secondary-500 mb-2 block"
            >
              {formatDate(post.published_at)}
            </time>
          )}
          <h3 className="text-lg font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
            {/* Title removed from here, now on image */}
          </h3>
          {excerpt && (
            <p className="text-secondary-600 text-sm mb-3 line-clamp-2">{excerpt}</p>
          )}
          <div className="text-primary-600 text-sm font-semibold flex items-center">
            Read
            <span className="ml-2 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

