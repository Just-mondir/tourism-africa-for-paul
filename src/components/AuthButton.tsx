/**
 * AuthButton Component - Authentication button
 * Displays a login button or user profile based on authentication state
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, LogOut, User } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { User as UserType } from "@/types/user";
import Loader from "./Loader";

export default function AuthButton() {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // Check authentication state on mount
  useEffect(() => {
    checkUser();

    // Listen for authentication changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user as UserType | null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    try {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();
      setUser(currentUser as UserType | null);
    } catch (error) {
      console.error("Error checking user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error("Login error:", error);
        alert("Login error. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login error. Please try again.");
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error);
        alert("Logout error. Please try again.");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center">
        <Loader size="sm" />
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-secondary-700 hover:text-primary-600 transition-colors"
        >
          <User className="w-5 h-5" />
          <span className="hidden sm:inline">
            {user.user_metadata?.full_name || user.email || "Profile"}
          </span>
        </Link>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center gap-2 px-4 py-2 text-secondary-700 hover:text-primary-600 transition-colors disabled:opacity-50"
          aria-label="Logout"
        >
          {isLoggingOut ? (
            <Loader size="sm" />
          ) : (
            <>
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Logout</span>
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleLogin}
      className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      aria-label="Sign in with Google"
    >
      <LogIn className="w-5 h-5" />
      <span className="hidden sm:inline">Login</span>
    </button>
  );
}

