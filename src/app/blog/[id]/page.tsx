/**
 * Blog Post Page - Display individual blog post
 * Dynamic route for /blog/[id]
 */

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { getPostById, getPostsForBuild } from "@/lib/supabase/queries";
import { getOptimizedImageUrl } from "@/lib/cloudinary";

interface BlogPostPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  // Generate static params for pre-rendering (optional)
  // Uses build client that doesn't require cookies
  try {
    const { posts } = await getPostsForBuild({ limit: 100 });
    return posts.map((post) => ({
      id: String(post.id), // Ensure id is always a string
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostById(params.id);

  if (!post) {
    return {
      title: "Article Not Found - Africa Tourism",
    };
  }

  // Extract first 160 characters from paragraph for description
  const description = post.paragraph
    ? post.paragraph.replace(/<[^>]*>/g, "").substring(0, 160)
    : "";

  return {
    title: `${post.title} - Africa Tourism`,
    description: description || "Discover African tourism articles and guides.",
    openGraph: {
      title: post.title,
      description: description,
      images: post.image_url
        ? [
            {
              url: getOptimizedImageUrl(post.image_url, 1200, 630),
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: description,
      images: post.image_url
        ? [getOptimizedImageUrl(post.image_url, 1200, 630)]
        : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostById(params.id);

  if (!post) {
    notFound();
  }

  const coverImageUrl = post.image_url
    ? getOptimizedImageUrl(post.image_url, 1200, 600)
    : null;

  return (
    <article className="section-spacing bg-white">
      <div className="container-custom max-w-4xl">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-secondary-600 hover:text-primary-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6 leading-tight">
            {post.title}
          </h1>
        </header>

        {/* Cover Image */}
        {coverImageUrl && (
          <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-12 bg-secondary-100">
            <Image
              src={coverImageUrl}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
              priority
            />
          </div>
        )}

        {/* Article Content */}
        {post.paragraph && (
          <div
            className="prose prose-lg max-w-none prose-headings:text-secondary-900 prose-p:text-secondary-700 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-lg"
            dangerouslySetInnerHTML={{
              __html: post.paragraph,
            }}
          />
        )}

        {/* Article Footer */}
        <div className="mt-12 pt-8 border-t border-secondary-200">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </Link>
        </div>
      </div>
    </article>
  );
}

