/**
 * Type pour l'utilisateur authentifié
 * Correspond au type User de Supabase Auth
 */
export interface User {
  id: string;
  email?: string;
  name?: string;
  avatar_url?: string;
  // Champs supplémentaires de Supabase Auth
  user_metadata?: Record<string, unknown>;
}

