/**
 * BlogListInfinite Component - Infinite scroll pour les articles de blog
 * Charge les posts progressivement lors du scroll
 */

"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Post } from "@/types/post";
import BlogCard from "@/components/BlogCard";
import Loader from "@/components/Loader";

const POSTS_PER_PAGE = 6;

export default function BlogListInfinite() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const observerTarget = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  const fetchPosts = useCallback(async (pageNum: number) => {
    if (loadingRef.current) return;
    
    loadingRef.current = true;
    setLoading(true);

    try {
      const supabase = createClient();
      const from = (pageNum - 1) * POSTS_PER_PAGE;
      const to = from + POSTS_PER_PAGE - 1;

      const { data, error } = await supabase
        .from("posts")
        .select("id, title, paragraph, image_url")
        .range(from, to);

      if (error) {
        console.error("Error fetching posts:", error);
        setHasMore(false);
        return;
      }

      if (data && data.length > 0) {
        setPosts((prev) => [...prev, ...(data as Post[])]);
        setHasMore(data.length === POSTS_PER_PAGE);
        setPage(pageNum + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading posts:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, []);

  // Charger les posts initiaux
  useEffect(() => {
    fetchPosts(1);
  }, [fetchPosts]);

  // Observer pour détecter le scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchPosts(page);
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading, page, fetchPosts]);

  if (posts.length === 0 && !loading) {
    return (
      <div className="text-center py-12 text-secondary-600">
        <p className="text-lg mb-2">Aucun article disponible pour le moment.</p>
        <p className="text-sm">
          Les articles apparaîtront ici une fois que vous les ajouterez à votre table Supabase.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {posts.map((post, index) => (
          <BlogCard key={post.id} post={post} index={index} />
        ))}
      </div>

      {/* Observer target pour infinite scroll */}
      <div ref={observerTarget} className="h-20 flex items-center justify-center">
        {loading && hasMore && (
          <div className="flex items-center justify-center py-8">
            <Loader size="md" />
          </div>
        )}
        {!hasMore && posts.length > 0 && (
          <p className="text-secondary-500 text-sm text-center py-4">
            Tous les articles ont été chargés
          </p>
        )}
      </div>
    </>
  );
}

