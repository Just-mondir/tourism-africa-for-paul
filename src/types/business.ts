/**
 * Type for African directory businesses
 * Matches your businesses table in Supabase
 */
export interface Business {
  id: string;
  places?: string; // Business name/place
  description?: string | null;
  image_url?: string | null;
  // Add other fields that exist in your businesses table
  name?: string;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  category?: string | null;
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
}

/**
 * Type for paginated businesses response
 */
export interface BusinessesResponse {
  businesses: Business[];
  total: number;
  page: number;
  limit: number;
}

