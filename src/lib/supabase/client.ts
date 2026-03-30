/**
 * Client Supabase pour usage côté client
 * Ce client utilise la clé anonyme (anon key) qui est sécurisée avec RLS
 */

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

// Les variables d'environnement doivent être préfixées par NEXT_PUBLIC_ pour être accessibles côté client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "⚠️ Variables d'environnement Supabase manquantes. Veuillez configurer NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY dans .env.local"
  );
}

/**
 * Client Supabase pour les composants client
 * Utilisez ce client dans les composants avec 'use client'
 */
export const createClient = () =>
  createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);

