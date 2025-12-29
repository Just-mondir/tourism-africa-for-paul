/**
 * BlogCard Component - Card to display a blog post
 * Displays full content with smooth animations and link to individual post
 */

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/types/post";
import { getThumbnailUrl } from "@/lib/cloudinary";
import { truncate } from "@/lib/utils";

interface BlogCardProps {
  post: Post;
  index?: number;
}

export default function BlogCard({
  post,
  index = 0,
}: BlogCardProps) {
  const imageUrl = post.image_url 
    ? getThumbnailUrl(post.image_url, 600)
    : null;

  // Truncate paragraph for preview (first 200 characters without HTML tags)
  const previewText = post.paragraph
    ? truncate(post.paragraph.replace(/<[^>]*>/g, ""), 200)
    : "";

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <Link
        href={`/blog/${post.id}`}
        className="block focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-xl"
      >
        {/* Image */}
        {imageUrl && (
          <div className="relative w-full h-64 overflow-hidden bg-secondary-100">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Title overlay on image */}
            <div className="absolute bottom-0 left-0 w-full px-4 pb-3 z-10">
              <h2 className="text-xl font-bold text-white drop-shadow-lg bg-black/50 rounded-lg py-2 px-4 backdrop-blur-sm">
                {post.title}
              </h2>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {!imageUrl && (
            <h2 className="text-2xl font-bold text-secondary-900 mb-4 group-hover:text-primary-600 transition-colors">
              {post.title}
            </h2>
          )}
          
          {previewText && (
            <p className="text-secondary-700 leading-relaxed mb-4 line-clamp-4">
              {previewText}
            </p>
          )}
          
          <div className="text-primary-600 text-sm font-semibold flex items-center group-hover:translate-x-1 transition-transform">
            Read more
            <span className="ml-2">→</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

