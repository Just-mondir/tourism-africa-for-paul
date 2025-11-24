/**
 * Blog Post Page - Display individual blog post
 * Dynamic route for /blog/[slug]
 */

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Calendar, ArrowLeft } from "lucide-react";
import { getPostBySlug, getPosts } from "@/lib/supabase/queries";
import { formatDate } from "@/lib/utils";
import { getOptimizedImageUrl } from "@/lib/cloudinary";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  // Generate slugs for static pre-rendering (optional)
  try {
    const { posts } = await getPosts({ limit: 100 });
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Article Not Found - Africa Tourism",
    };
  }

  return {
    title: `${post.title} - Africa Tourism`,
    description: post.excerpt || post.content?.substring(0, 160) || "",
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content?.substring(0, 160) || "",
      images: post.cover_image_url
        ? [
            {
              url: getOptimizedImageUrl(post.cover_image_url, 1200, 630),
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
      type: "article",
      publishedTime: post.published_at || undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || post.content?.substring(0, 160) || "",
      images: post.cover_image_url
        ? [getOptimizedImageUrl(post.cover_image_url, 1200, 630)]
        : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const coverImageUrl = post.cover_image_url
    ? getOptimizedImageUrl(post.cover_image_url, 1200, 600)
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
          {post.published_at && (
            <time
              dateTime={post.published_at}
              className="text-sm text-secondary-500 mb-4 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              {formatDate(post.published_at)}
            </time>
          )}

          <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-secondary-600 leading-relaxed">{post.excerpt}</p>
          )}
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
        <div
          className="prose prose-lg max-w-none prose-headings:text-secondary-900 prose-p:text-secondary-700 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-lg"
          dangerouslySetInnerHTML={{
            __html: post.content || post.excerpt || "No content available.",
          }}
        />

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
