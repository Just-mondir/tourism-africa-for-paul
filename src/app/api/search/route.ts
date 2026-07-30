/**
 * Search API endpoint
 * Searches across all country destination tables and blog posts
 * GET /api/search?q=<query>
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const COUNTRY_TABLES = [
  { table: "Algerie", name: "Algeria", slug: "algerie" },
  { table: "Botswana", name: "Botswana", slug: "botswana" },
  { table: "Malawi", name: "Malawi", slug: "malawi" },
  { table: "Mali", name: "Mali", slug: "mali" },
  { table: "Rwanda", name: "Rwanda", slug: "rwanda" },
  { table: "Zambia", name: "Zambia", slug: "zambia" },
  { table: "benin", name: "Benin", slug: "benin" },
  { table: "kenya", name: "Kenya", slug: "kenya" },
  { table: "libya", name: "Libya", slug: "libya" },
  { table: "zimbabwi", name: "Zimbabwe", slug: "zimbabwi" },
  { table: "Morocco", name: "Morocco", slug: "morocco" },
  { table: "Egypt", name: "Egypt", slug: "egypt" },
];

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim();

  if (!query || query.length < 2) {
    return NextResponse.json({ destinations: [], posts: [] });
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Search destinations across all country tables
  const destinationPromises = COUNTRY_TABLES.map(async (country) => {
    try {
      const { data, error } = await supabase
        .from(country.table)
        .select("places, desc, image_url")
        .ilike("places", `%${query}%`)
        .limit(3);

      if (error || !data) return [];

      return data.map((place: { places: string; desc: string | null; image_url: string | null }) => ({
        type: "destination" as const,
        title: place.places,
        description: place.desc,
        image_url: place.image_url,
        country: country.name,
        country_slug: country.slug,
        href: `/destinations/${country.slug}/${generateSlug(place.places)}`,
      }));
    } catch {
      return [];
    }
  });

  // Also search by country name itself
  const countryMatches = COUNTRY_TABLES
    .filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
    .map((c) => ({
      type: "country" as const,
      title: c.name,
      description: `Explore destinations in ${c.name}`,
      image_url: null,
      country: c.name,
      country_slug: c.slug,
      href: `/destinations?country=${c.slug}`,
    }));

  // Search blog posts
  let posts: {
    type: "post";
    title: string;
    description: string | null;
    image_url: string | null;
    href: string;
  }[] = [];

  try {
    const { data, error } = await supabase
      .from("posts")
      .select("id, title, paragraph, image_url")
      .ilike("title", `%${query}%`)
      .limit(5);

    if (!error && data) {
      posts = data.map((post: { id: string; title: string; paragraph: string | null; image_url: string | null }) => ({
        type: "post" as const,
        title: post.title,
        description: post.paragraph
          ? post.paragraph.substring(0, 120) + "..."
          : null,
        image_url: post.image_url,
        href: `/blog/${post.id}`,
      }));
    }
  } catch {
    // posts table might not exist
  }

  const destinationResults = (await Promise.all(destinationPromises)).flat();
  const allDestinations = [...countryMatches, ...destinationResults].slice(0, 8);

  return NextResponse.json({
    destinations: allDestinations,
    posts: posts,
  });
}
