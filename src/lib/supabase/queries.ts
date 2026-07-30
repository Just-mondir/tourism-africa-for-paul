/**
 * Supabase query functions for African tourism website
 * Fetches from country tables: Rwanda, benin, bostwana, libya
 * and businesses table for African directory
 */

import { createClient } from "./server";
import type { Destination, DestinationsResponse, AfricanPlace } from "@/types/destination";
import type { Business, BusinessesResponse } from "@/types/business";
import type { Post, PostsResponse } from "@/types/post";
import { generateSlug } from "@/lib/utils";

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
  { table: "Algerie", name: "Algerie", slug: "algerie" },
  { table: "Botswana", name: "Botswana", slug: "botswana" },
  { table: "Egypt", name: "Egypt", slug: "egypt" },
  { table: "Malawi", name: "Malawi", slug: "malawi" },
  { table: "Mali", name: "Mali", slug: "mali" },
  { table: "Morocco", name: "Morocco", slug: "morocco" },
  { table: "Rwanda", name: "Rwanda", slug: "rwanda" },
  { table: "Zambia", name: "Zambia", slug: "zambia" },
  { table: "benin", name: "benin", slug: "benin" },
  { table: "kenya", name: "kenya", slug: "kenya" },
  { table: "libya", name: "libya", slug: "libya" },
  { table: "zimbabwi", name: "zimbabwi", slug: "zimbabwi" },
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
    let data: any = null;
    let error: any = null;
    
    const withImages = await supabase
      .from(country.table)
      .select("places, desc, image_url, images").limit(1).single();

    if (withImages.error) {
      const withoutImages = await supabase
        .from(country.table)
        .select("places, desc, image_url").limit(1).single();
      data = withoutImages.data;
      error = withoutImages.error;
    } else {
      data = withImages.data;
    }

      if (!data || error) return [];

      const name = typeof data.places === "string" ? data.places : "";
      if (name.length === 0 || name.length > 50 || name.includes(".")) return [];

      return [{
        ...data,
        id: `${country.slug}-${Math.random().toString(36).substr(2, 9)}`,
        country: country.name,
        country_slug: country.slug,
      }];
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

  // Fetch destinations - gracefully handle missing images column
  let data: any = null;
  let error: any = null;

  const withImages = await supabase
    .from(country.table)
    .select("places, desc, image_url, images")
    .range(from, to);

  if (withImages.error) {
    const withoutImages = await supabase
      .from(country.table)
      .select("places, desc, image_url")
      .range(from, to);
    data = withoutImages.data;
    error = withoutImages.error;
  } else {
    data = withImages.data;
  }

  if (error) {
    console.error(`Error fetching from ${country.table}:`, error);
    throw new Error(`Error: ${error.message}`);
  }

  // Transform to include country info, filter bad names, and generate unique id
  const destinations: Destination[] = (data || [])
    .filter((place: AfricanPlace) => {
      const name = typeof place.places === "string" ? place.places : "";
      return name.length > 0 && name.length <= 50 && !name.includes(".");
    })
    .map((place: AfricanPlace, idx: number) => ({
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
 * Fetches a single destination by its country and slugified place name
 * Falls back to a simple in-memory match if the slug is not stored in the database
 * @param countrySlug - Country slug (rwanda, benin, botswana, etc.)
 * @param placeSlug - Slugified place name (ex: victoria-falls)
 * @returns Destination details or null if not found
 */
export async function getDestinationBySlug(
  countrySlug: string,
  placeSlug: string
): Promise<Destination | null> {
  const country = AFRICAN_COUNTRIES.find(
    (c) => c.slug.toLowerCase() === countrySlug.toLowerCase()
  );

  if (!country) {
    return null;
  }

  const supabase = await createClient();
  const normalizedSlug = generateSlug(placeSlug);

  // Try fetching with images column; fall back gracefully if column doesn't exist yet
  let data: AfricanPlace[] | null = null;
  let fetchError: unknown = null;

  const withImages = await supabase
    .from(country.table)
    .select("places, desc, image_url, images");

  if (withImages.error) {
    // Column might not exist — retry without it
    const withoutImages = await supabase
      .from(country.table)
      .select("places, desc, image_url");
    data = (withoutImages.data ?? null) as AfricanPlace[] | null;
    fetchError = withoutImages.error;
  } else {
    data = (withImages.data ?? null) as AfricanPlace[] | null;
  }

  if (fetchError) {
    console.error(`Error fetching destination ${placeSlug} from ${country.table}:`, fetchError);
    return null;
  }

  if (!data) {
    return null;
  }

  const match = data.find((place) => {
    const placeName = typeof place.places === "string" ? place.places : "";
    return generateSlug(placeName) === normalizedSlug;
  });

  if (!match) {
    return null;
  }

  const placeName = typeof match.places === "string" ? match.places : normalizedSlug.replace(/-/g, " ");
  const description = typeof match.desc === "string" ? match.desc : null;
  const imageUrl = typeof match.image_url === "string" ? match.image_url : null;
  const images = Array.isArray(match.images) ? (match.images as string[]) : null;

  const destination: Destination = {
    id: `${country.slug}-${normalizedSlug}`,
    places: placeName,
    desc: description,
    image_url: imageUrl,
    images,
    country: country.name,
    country_slug: country.slug,
  };

  return destination;
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
    .from("publicBusinesses")
    .select("*", { count: "exact", head: true });

  // Fetch businesses
  const { data, error } = await supabase
    .from("publicBusinesses")
    .select("*")
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
    .from("publicBusinesses")
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
 * Fetches blog posts from the posts table
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
      .select("title, paragraph, image_url", { count: "exact", head: true });

    const { data, error } = await supabase
      .from("posts")
      .select("id, title, paragraph, image_url")
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
 * Fetches blog posts for build time (generateStaticParams)
 * Uses build client that doesn't require cookies
 * @param options - Pagination options
 * @returns List of posts with pagination metadata
 */
export async function getPostsForBuild(
  options: PaginationOptions = {}
): Promise<PostsResponse> {
  const { limit = 10, page = 1 } = options;
  const { createBuildClient } = await import("./server");
  const supabase = createBuildClient();

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // Check if posts table exists, if not return empty
  try {
    const { count } = await supabase
      .from("posts")
      .select("title, paragraph, image_url", { count: "exact", head: true });

    const { data, error } = await supabase
      .from("posts")
      .select("id, title, paragraph, image_url")
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
 * Fetches a post by ID
 * @param id - Post ID
 * @returns Post or null if not found
 */
export async function getPostById(id: string): Promise<Post | null> {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("posts")
      .select("id, title, paragraph, image_url")
      .eq("id", id)
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

/**
 * Fetches the image URLs for the flagship destinations
 * @returns Record mapping place slug to image_url
 */
export async function getFlagshipImages(): Promise<Record<string, string>> {
  const supabase = await createClient();
  const imagesMap: Record<string, string> = {};

  // Define the flagship places we need to fetch
  const flagshipTargets = [
    { table: "Algerie", slug: "tassili-najjer" },
    { table: "Rwanda", slug: "volcanoes-national-park" },
    { table: "benin", slug: "ouidah-coast-and-vodun-heritage" },
    { table: "libya", slug: "leptis-magna" },
    { table: "Botswana", slug: "okavango-delta" },
    { table: "Malawi", slug: "lake-malawi" },
    { table: "Mali", slug: "djenne" },
    { table: "Zambia", slug: "south-luangwa-national-park" },
    { table: "kenya", slug: "masai-mara" },
    { table: "zimbabwi", slug: "hwange-national-park" },
    { table: "Morocco", slug: "marrakech" },
    { table: "Egypt", slug: "pyramids-of-giza" },
  ];

  const fetchPromises = flagshipTargets.map(async (target) => {
    const { data, error } = await supabase
      .from(target.table)
      .select("places, image_url");
      
    if (error || !data) return;

    // Find the matching place by slug
    const match = data.find((place) => {
      const placeName = typeof place.places === "string" ? place.places : "";
      return generateSlug(placeName) === target.slug;
    });

    if (match && match.image_url) {
      imagesMap[target.slug] = match.image_url;
    }
  });

  await Promise.all(fetchPromises);
  return imagesMap;
}
