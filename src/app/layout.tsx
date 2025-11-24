/**
 * Root layout of the application - Africa Tourism Website
 * Includes header, footer and global SEO metadata
 */

import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Africa Tourism - Discover Africa's Hidden Treasures",
  description:
    "Explore breathtaking destinations across Algeria, Rwanda, Benin, Libya, and Botswana. Discover the beauty, culture, and diversity of Africa through our comprehensive tourism platform.",
  keywords: ["africa tourism", "african destinations", "algeria", "rwanda", "benin", "libya", "botswana", "travel africa", "african culture"],
  authors: [{ name: "Africa Tourism" }],
  creator: "Africa Tourism",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-site.vercel.app",
    siteName: "Africa Tourism",
    title: "Africa Tourism - Discover Africa's Hidden Treasures",
    description:
      "Explore breathtaking destinations across Algeria, Rwanda, Benin, Libya, and Botswana. Discover the beauty and diversity of Africa.",
    images: [
      {
        url: "/og-image.jpg", // Replace with your OG image
        width: 1200,
        height: 630,
        alt: "Africa Tourism",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Africa Tourism - Discover Africa's Hidden Treasures",
    description:
      "Explore breathtaking destinations across Algeria, Rwanda, Benin, Libya, and Botswana. Discover the beauty and diversity of Africa.",
    images: ["/og-image.jpg"], // Replace with your Twitter image
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
