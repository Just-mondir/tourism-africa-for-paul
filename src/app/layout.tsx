/**
 * Root layout of the application - Africa Tourism Website
 * Includes header, footer and global SEO metadata
 */

import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "African Guide - Discover All African Countries",
  description:
    "Explore breathtaking destinations across all African countries. Discover the beauty, culture, and diversity of Africa through our comprehensive tourism platform.",
  keywords: ["africa tourism", "african destinations", "african guide", "travel africa", "african culture", "africa countries", "african travel guide"],
  authors: [{ name: "African Guide" }],
  creator: "African Guide",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "web-app-manifest",
        url: "/site.webmanifest",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://your-site.vercel.app",
    siteName: "African Guide",
    title: "African Guide - Discover All African Countries",
    description:
      "Explore breathtaking destinations across all African countries. Discover the beauty, culture, and diversity of Africa.",
    images: [
      {
        url: "/og-image.jpg", // Replace with your OG image
        width: 1200,
        height: 630,
        alt: "African Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "African Guide - Discover All African Countries",
    description:
      "Explore breathtaking destinations across all African countries. Discover the beauty, culture, and diversity of Africa.",
    images: ["/og-image.jpg"], // Replace with your Twitter image
    site: "@AfricanGuide",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
