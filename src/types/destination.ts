/**
 * Type for a destination/place from African country tables
 * Matches your Supabase tables: Algerie, Rwanda, Benin, Libya, Botswana
 */
export interface AfricanPlace {
  places: string; // The name of the place
  desc: string | null; // Description field
  image_url: string | null;
  // Additional fields that might exist in your tables
  [key: string]: unknown;
}

/**
 * Type for aggregated destinations from all countries
 */
export interface Destination {
  id: string;
  places: string;
  desc: string | null; // Description field from database
  image_url: string | null;
  country: string; // Country name (Algerie, Rwanda, etc.)
  country_slug: string; // Lowercase country name for routing
}

/**
 * Type for paginated destinations response
 */
export interface DestinationsResponse {
  destinations: Destination[];
  total: number;
  page: number;
  limit: number;
}
