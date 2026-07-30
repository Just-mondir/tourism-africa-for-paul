/**
 * SearchOverlay Component - Full-screen search modal
 * Searches across destinations and blog posts
 * Supports keyboard shortcuts (Escape to close)
 */

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, MapPin, BookOpen, Globe, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface SearchResult {
  type: "destination" | "country" | "post";
  title: string;
  description: string | null;
  image_url: string | null;
  country?: string;
  country_slug?: string;
  href: string;
}

interface SearchResponse {
  destinations: SearchResult[];
  posts: SearchResult[];
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResponse>({ destinations: [], posts: [] });
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      // Reset state
      setQuery("");
      setResults({ destinations: [], posts: [] });
      setHasSearched(false);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults({ destinations: [], posts: [] });
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data: SearchResponse = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
      setResults({ destinations: [], posts: [] });
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Debounce search
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      performSearch(value);
    }, 300);
  };

  const totalResults = results.destinations.length + results.posts.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Search Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-secondary-100">
              <Search className="w-5 h-5 text-secondary-400 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search countries, destinations, or blog posts..."
                className="flex-1 text-lg text-secondary-900 placeholder:text-secondary-400 outline-none bg-transparent"
                autoComplete="off"
              />
              {loading && (
                <Loader2 className="w-5 h-5 text-primary-500 animate-spin flex-shrink-0" />
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-secondary-400 hover:text-secondary-700 hover:bg-secondary-100 transition-colors"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {/* No query yet */}
              {!hasSearched && !loading && (
                <div className="px-6 py-8 text-center">
                  <Search className="w-10 h-10 text-secondary-300 mx-auto mb-3" />
                  <p className="text-secondary-500 text-sm">
                    Type at least 2 characters to search across destinations and blog posts
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {["Morocco", "Egypt", "Kenya", "Safari", "Pyramids"].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => {
                          setQuery(suggestion);
                          performSearch(suggestion);
                        }}
                        className="px-3 py-1.5 bg-secondary-50 text-secondary-600 text-sm rounded-full hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* No results */}
              {hasSearched && !loading && totalResults === 0 && (
                <div className="px-6 py-8 text-center">
                  <p className="text-secondary-500 text-base">
                    No results found for &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-secondary-400 text-sm mt-1">
                    Try searching for a country name or destination
                  </p>
                </div>
              )}

              {/* Destination results */}
              {results.destinations.length > 0 && (
                <div className="px-4 py-3">
                  <p className="px-2 text-xs font-semibold uppercase tracking-wider text-secondary-400 mb-2">
                    Destinations
                  </p>
                  <div className="space-y-1">
                    {results.destinations.map((result, idx) => (
                      <Link
                        key={`dest-${idx}`}
                        href={result.href}
                        onClick={onClose}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-secondary-50 transition-colors group"
                      >
                        {result.image_url ? (
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={result.image_url}
                              alt={result.title}
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                            {result.type === "country" ? (
                              <Globe className="w-5 h-5 text-primary-500" />
                            ) : (
                              <MapPin className="w-5 h-5 text-primary-500" />
                            )}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors truncate">
                            {result.title}
                          </p>
                          {result.country && (
                            <p className="text-xs text-secondary-400 capitalize">
                              {result.country}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Blog post results */}
              {results.posts.length > 0 && (
                <div className="px-4 py-3 border-t border-secondary-100">
                  <p className="px-2 text-xs font-semibold uppercase tracking-wider text-secondary-400 mb-2">
                    Blog Posts
                  </p>
                  <div className="space-y-1">
                    {results.posts.map((result, idx) => (
                      <Link
                        key={`post-${idx}`}
                        href={result.href}
                        onClick={onClose}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-secondary-50 transition-colors group"
                      >
                        {result.image_url ? (
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={result.image_url}
                              alt={result.title}
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                            <BookOpen className="w-5 h-5 text-accent" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors truncate">
                            {result.title}
                          </p>
                          {result.description && (
                            <p className="text-xs text-secondary-400 line-clamp-1">
                              {result.description}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer hint */}
            {totalResults > 0 && (
              <div className="px-6 py-3 border-t border-secondary-100 bg-secondary-50/50">
                <p className="text-xs text-secondary-400 text-center">
                  {totalResults} result{totalResults !== 1 ? "s" : ""} found · Press <kbd className="px-1.5 py-0.5 bg-secondary-200 rounded text-secondary-600 font-mono text-[10px]">ESC</kbd> to close
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
