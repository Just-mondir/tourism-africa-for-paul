/**
 * Supabase query functions for African tourism website
 * Fetches from country tables: Rwanda, benin, bostwana, libya
 * and businesses table for African directory
 */

import { createClient } from "./server";
import type { Destination, DestinationsResponse, AfricanPlace } from "@/types/destination";
import type { Business, BusinessesResponse } from "@/types/business";
import type { Post, PostsResponse } from "@/types/post";

/**
 * Pagination options for queries
 */
export interface PaginationOptions {
  limit?: number;
  page?: number;
}

/**
 * List of African country tables in your database
 */
const AFRICAN_COUNTRIES = [
  { table: "Rwanda", name: "Rwanda", slug: "rwanda" },
  { table: "benin", name: "benin", slug: "benin" },
];

/**
 * Fetches destinations from all African country tables
 * Combines results from Rwanda, benin, bostwana, libya tables
 * @param options - Pagination options (limit, page)
 * @returns Combined list of destinations from all countries
 */
export async function getDestinations(
  options: PaginationOptions = {}
): Promise<DestinationsResponse> {
  const { limit = 12, page = 1 } = options;
  const supabase = await createClient();

  // Fetch from all country tables in parallel
  const countryPromises = AFRICAN_COUNTRIES.map(async (country) => {
    const { data, error } = await supabase
      .from(country.table)
      .select("places, desc, image_url");

    if (error) {
      console.error(`Error fetching from ${country.table}:`, error);
      return [];
    }

    // Transform data to include country info and generate unique id
    return (data || []).map((place: AfricanPlace, idx: number) => ({
      ...place,
      id: `${country.slug}-${idx}-${Math.random().toString(36).substr(2, 9)}`, // Generate unique id
      country: country.name,
      country_slug: country.slug,
    }));
  });

  // Wait for all queries to complete
  const countryResults = await Promise.all(countryPromises);
  
  // Flatten all results into a single array
  const allDestinations: Destination[] = countryResults.flat();

  // Shuffle destinations for variety (or keep as is)
  // No sorting needed since we don't have created_at

  // Calculate pagination
  const total = allDestinations.length;
  const from = (page - 1) * limit;
  const to = from + limit;
  const paginatedDestinations = allDestinations.slice(from, to);

  return {
    destinations: paginatedDestinations,
    total,
    page,
    limit,
  };
}

/**
 * Fetches destinations from a specific country table
 * @param countrySlug - Country slug (rwanda, benin, botswana, libya)
 * @param options - Pagination options
 * @returns Destinations from the specified country
 */
export async function getDestinationsByCountry(
  countrySlug: string,
  options: PaginationOptions = {}
): Promise<DestinationsResponse> {
  const { limit = 12, page = 1 } = options;
  const supabase = await createClient();

  // Find the country table name
  const country = AFRICAN_COUNTRIES.find(
    (c) => c.slug.toLowerCase() === countrySlug.toLowerCase()
  );

  if (!country) {
    throw new Error(`Country ${countrySlug} not found`);
  }

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // Count total
  const { count } = await supabase
    .from(country.table)
    .select("*", { count: "exact", head: true });

  // Fetch destinations - only the 3 fields: places, desc, image_url
  const { data, error } = await supabase
    .from(country.table)
    .select("places, desc, image_url")
    .range(from, to);

  if (error) {
    console.error(`Error fetching from ${country.table}:`, error);
    throw new Error(`Error: ${error.message}`);
  }

  // Transform to include country info and generate unique id
  const destinations: Destination[] = (data || []).map((place: AfricanPlace, idx: number) => ({
    ...place,
    id: `${country.slug}-${from + idx}-${Math.random().toString(36).substr(2, 9)}`, // Generate unique id
    country: country.name,
    country_slug: country.slug,
  }));

  return {
    destinations,
    total: count || 0,
    page,
    limit,
  };
}

/**
 * Fetches all available countries
 * @returns List of country objects with table names and info
 */
export async function getCountries() {
  return AFRICAN_COUNTRIES.map((c) => ({
    id: c.slug,
    name: c.name,
    slug: c.slug,
    table: c.table,
  }));
}

/**
 * Fetches businesses from the businesses table (African directory)
 * @param options - Pagination options
 * @returns List of businesses with pagination metadata
 */
export async function getBusinesses(
  options: PaginationOptions = {}
): Promise<BusinessesResponse> {
  const { limit = 12, page = 1 } = options;
  const supabase = await createClient();

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // Count total
  const { count } = await supabase
    .from("businesses")
    .select("*", { count: "exact", head: true });

  // Fetch businesses
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Error fetching businesses:", error);
    throw new Error(`Error: ${error.message}`);
  }

  return {
    businesses: (data || []) as Business[],
    total: count || 0,
    page,
    limit,
  };
}

/**
 * Fetches a single business by ID
 * @param id - Business ID
 * @returns Business or null if not found
 */
export async function getBusinessById(id: string): Promise<Business | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    console.error("Error fetching business:", error);
    throw new Error(`Error: ${error.message}`);
  }

  return data as Business;
}

/**
 * Fetches blog posts (if you have a posts table)
 * @param options - Pagination options
 * @returns List of posts with pagination metadata
 */
export async function getPosts(
  options: PaginationOptions = {}
): Promise<PostsResponse> {
  const { limit = 10, page = 1 } = options;
  const supabase = await createClient();

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // Check if posts table exists, if not return empty
  try {
    const { count } = await supabase
      .from("posts")
      .select("*", { count: "exact", head: true })
      .not("published_at", "is", null);

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .not("published_at", "is", null)
      .order("published_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error("Error fetching posts:", error);
      return {
        posts: [],
        total: 0,
        page,
        limit,
      };
    }

    return {
      posts: (data || []) as Post[],
      total: count || 0,
      page,
      limit,
    };
  } catch (error) {
    // Posts table might not exist
    return {
      posts: [],
      total: 0,
      page,
      limit,
    };
  }
}

/**
 * Fetches a post by slug
 * @param slug - Post slug
 * @returns Post or null if not found
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .not("published_at", "is", null)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return null;
      }
      console.error("Error fetching post:", error);
      throw new Error(`Error: ${error.message}`);
    }

    return data as Post;
  } catch (error) {
    return null;
  }
}
