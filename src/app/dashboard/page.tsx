/**
 * Dashboard Page - Protected page for authenticated users
 * Displays user profile and personalized information
 */

import { redirect } from "next/navigation";
import { User, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardPage() {
  const supabase = await createClient();

  // Check authentication
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const userName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "User";

  const userEmail = user.email || "";

  return (
    <div className="section-spacing bg-white">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-2">
              Dashboard
            </h1>
            <p className="text-secondary-600">Welcome, {userName}!</p>
          </div>
          <LogoutButton />
        </div>

        {/* User Profile */}
        <div className="bg-secondary-50 rounded-xl p-8 mb-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-secondary-900">{userName}</h2>
              <p className="text-secondary-600">{userEmail}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4">
              <div className="text-sm text-secondary-600 mb-1">Registration Date</div>
              <div className="text-lg font-semibold text-secondary-900">
                {user.created_at
                  ? new Date(user.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <div className="text-sm text-secondary-600 mb-1">User ID</div>
              <div className="text-sm font-mono text-secondary-900 truncate">
                {user.id}
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <div className="text-sm text-secondary-600 mb-1">Status</div>
              <div className="text-lg font-semibold text-green-600">Active</div>
            </div>
          </div>
        </div>

        {/* Information */}
        <div className="bg-primary-50 rounded-xl p-8">
          <h3 className="text-xl font-bold text-secondary-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            Information
          </h3>
          <p className="text-secondary-700 mb-4">
            This page is protected and accessible only to authenticated users.
          </p>
          <p className="text-sm text-secondary-600">
            You can add personalized features here, such as your search history, favorite 
            African destinations, saved articles, travel plans, and more.
          </p>
        </div>
      </div>
    </div>
  );
}
