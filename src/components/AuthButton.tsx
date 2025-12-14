/**
 * AuthButton Component - Authentication button
 * Displays a login button or user profile with Google avatar based on authentication state
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogIn, LogOut } from "lucide-react";
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

  const handleLogin = () => {
    // Redirect to login page instead of directly to OAuth
    router.push("/login");
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
    const userName =
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email?.split("@")[0] ||
      "User";
    const avatarUrl = user.user_metadata?.avatar_url || user.avatar_url;

    return (
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-secondary-700 hover:text-primary-600 transition-colors group"
        >
          {avatarUrl ? (
            <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-primary-500 ring-offset-2 group-hover:ring-primary-600 transition-all">
              <Image
                src={avatarUrl}
                alt={userName}
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-semibold ring-2 ring-primary-500 ring-offset-2 group-hover:ring-primary-600 transition-all">
              {userName.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="hidden sm:inline font-medium">{userName}</span>
        </Link>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center gap-2 px-4 py-2 text-secondary-700 hover:text-red-600 transition-colors disabled:opacity-50 rounded-lg hover:bg-red-50"
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
      aria-label="Sign in"
    >
      <LogIn className="w-5 h-5" />
      <span className="hidden sm:inline">Login</span>
    </button>
  );
}

