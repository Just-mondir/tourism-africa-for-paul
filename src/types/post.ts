/**
 * Type pour un article de blog
 * Correspond aux champs de la table `posts` dans Supabase
 */
export interface Post {
  id: string;
  title: string;
  paragraph: string | null;
  image_url: string | null;
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

