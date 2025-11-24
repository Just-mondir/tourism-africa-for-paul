/**
 * Type pour un article de blog
 * Correspond aux champs de la table `posts` dans Supabase
 */
export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image_url: string | null;
  published_at: string | null;
  created_at?: string;
  updated_at?: string;
  // Champs supplémentaires optionnels
  author_id?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Type pour les résultats paginés d'articles
 */
export interface PostsResponse {
  posts: Post[];
  total: number;
  page: number;
  limit: number;
}

