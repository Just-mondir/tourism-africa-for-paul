/**
 * LogoutButton Component - Logout button
 * Handles logout and redirection
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="flex items-center gap-2 px-4 py-2 text-secondary-700 hover:text-red-600 transition-colors border border-secondary-300 rounded-lg hover:border-red-300 disabled:opacity-50"
      aria-label="Logout"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Logging out...
        </>
      ) : (
        <>
          <LogOut className="w-5 h-5" />
          Logout
        </>
      )}
    </button>
  );
}

