/**
 * Type pour un pays
 * Correspond aux champs de la table `countries` dans Supabase
 */
export interface Country {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  created_at?: string;
  updated_at?: string;
  // Ajoutez d'autres champs selon votre table
  metadata?: Record<string, unknown>;
}

