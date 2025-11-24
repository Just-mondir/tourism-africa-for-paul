/**
 * OAuth Callback Route
 * Handles return after Google sign-in via Supabase
 */

import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") || "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Redirect to dashboard after successful login
      return NextResponse.redirect(new URL(next, requestUrl.origin));
    }
  }

  // Redirect to login page on error
  return NextResponse.redirect(new URL("/login?error=auth_failed", requestUrl.origin));
}

