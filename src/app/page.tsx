/**
 * Home page - Africa Tourism Website
 * Displays hero section, African destinations from Supabase, and latest articles
 */

import { Suspense } from "react";
import Hero from "@/components/Hero";
import DestinationCarousel from "@/components/DestinationCarousel";
import BlogCard from "@/components/BlogCard";
import Loader from "@/components/Loader";
// import { getDestinations } from "@/lib/supabase/queries";
import { getPosts } from "@/lib/supabase/queries";
import Link from "next/link";

// Top African destinations section (static assets)
function TopDestinations() {
  // Images and titles from assets/Topdestinations
  const destinations = [
    {
      image: require("@/assets/Topdestinations/imageafrica.png"),
      title: "Africa",
      description: "The heart of the continent, rich in culture and breathtaking landscapes."
    },
    {
      image: require("@/assets/Topdestinations/imageegypte.png"),
      title: "Egypt",
      description: "Land of the Pharaohs, pyramids, and the majestic Nile."
    },
    {
      image: require("@/assets/Topdestinations/imagemorroco.png"),
      title: "Morocco",
      description: "A gateway to Africa, famous for its vibrant souks and Sahara dunes."
    },
    {
      image: require("@/assets/Topdestinations/imagesouthafrica.png"),
      title: "South Africa",
      description: "A rainbow nation with stunning coastlines and wildlife."
    },
    {
      image: require("@/assets/Topdestinations/imagetanzania.png"),
      title: "Tanzania",
      description: "Home to Kilimanjaro and the Serengeti’s great migration."
    },
  ];

  return (
    <section className="bg-white pt-8 md:pt-12 pb-16 md:pb-24">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900">
            Explore African Destinations
          </h2>
          <p className="text-secondary-600 mt-2">
            Discover amazing places across Africa, Egypt, Morocco, South Africa, and Tanzania
          </p>
        </div>
        <div className="flex justify-center mb-8">
          <Link
            href="/destinations"
            className="text-primary-600 hover:text-primary-700 font-semibold transition-colors whitespace-nowrap"
          >
            View all →
          </Link>
        </div>
        <DestinationCarousel destinations={destinations.map(d => ({
          image: d.image.default,
          title: d.title,
          description: d.description,
        }))} />
      </div>
    </section>
  );
}

// Latest stories section (if you have blog posts)
async function LatestStories() {
  try {
    const { posts } = await getPosts({ limit: 4 });
    
    if (posts.length === 0) {
      return null; // Hide section if no posts
    }

    return (
      <section className="section-spacing bg-secondary-50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900">
                Latest Stories
              </h2>
              <p className="text-secondary-600 mt-2">
                Read about African travel experiences and destination guides
              </p>
            </div>
            <Link
              href="/blog"
              className="text-primary-600 hover:text-primary-700 font-semibold transition-colors whitespace-nowrap"
            >
              Read more articles →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.slice(0, 3).map((post, index) => (
              <BlogCard key={post.id} post={post} variant="vertical" index={index} />
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error loading articles:", error);
    return null; // Hide section on error
  }
}

// Newsletter section
function NewsletterSection() {
  return (
    <section className="section-spacing bg-gradient-to-r from-primary-600 to-accent relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get Your African Travel Inspiration
          </h2>
          <p className="text-primary-100 mb-8">
            Subscribe to our newsletter for the latest African destinations, travel tips, 
            and cultural insights delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            >
              Subscribe
            </button>
          </form>
          <p className="text-sm text-primary-100 mt-4">
            Sign up for our premium newsletter.
          </p>
        </div>
      </div>
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Suspense
        fallback={
          <section className="section-spacing bg-white">
            <div className="container-custom">
              <div className="flex items-center justify-center py-12">
                <Loader size="lg" />
              </div>
            </div>
          </section>
        }
      >
        <TopDestinations />
      </Suspense>
      <Suspense
        fallback={
          <section className="section-spacing bg-secondary-50">
            <div className="container-custom">
              <div className="flex items-center justify-center py-12">
                <Loader size="lg" />
              </div>
            </div>
          </section>
        }
      >
        <LatestStories />
      </Suspense>
      <NewsletterSection />
    </>
  );
}
