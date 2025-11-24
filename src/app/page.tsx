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
import Image from "next/image";
import attractiveImage from "@/assets/attractive-image.jpg";
import familySafariImage from "@/assets/latestStories/family_safari.jpg";
import groupBinocularsImage from "@/assets/latestStories/Group-of-tourists-sitting-in-jeep-and-looking-through-binoculars-Kruger-National-Park-Africa-shutterstock_145428859.jpg";
import southAfricaPanoramaImage from "@/assets/latestStories/places-to-visit-in-south-africa-1715923864-785X440.jpg";
import adventureConvoyImage from "@/assets/latestStories/9e1e0fa96372cc48493a54138d813d5b.jpg";

const curatedStories = [
  {
    id: "family-safari",
    image: familySafariImage,
    title: "Family safari",
    description: "Families share laughs with local hosts during a peaceful savanna break.",
  },
  {
    id: "group-binoculars",
    image: groupBinocularsImage,
    title: "Guided wildlife watch",
    description: "Explorers scan the horizon from their 4x4 before the next leg of the trek.",
  },
  {
    id: "south-africa-panorama",
    image: southAfricaPanoramaImage,
    title: "South Africa vistas",
    description: "Golden cliffs and turquoise water spark ideas for a coastal road trip.",
  },
  {
    id: "adventure-convoy",
    image: adventureConvoyImage,
    title: "Joyful convoy",
    description: "Two safari trucks full of energy—perfect for experiencing Africa with friends.",
  },
];

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

// Latest stories section (static curated content)
function LatestStories() {
  return (
    <section className="section-spacing bg-secondary-50">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900">
              Latest Stories
            </h2>
            <p className="text-secondary-600 mt-2">
              A taste of African adventures to inspire your next journey
            </p>
          </div>
          <Link
            href="/blog"
            className="text-primary-600 hover:text-primary-700 font-semibold transition-colors whitespace-nowrap"
          >
            Visit the blog →
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] min-h-[480px]">
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden flex flex-col">
            <div className="relative w-full h-72 md:h-96">
              <Image
                src={attractiveImage}
                alt="Travelers enjoying a safari in Africa"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="p-6 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-500">
                Live the moment
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-secondary-900 mt-2">
                Enjoy your time in Africa
              </h3>
              <p className="text-secondary-600 mt-3">
                Authentic moments, contagious smiles, and endless horizons—let the continent’s energy guide you.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 mt-6 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
              >
                Get inspired now →
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8 flex flex-col justify-between">
            <ul className="space-y-5 overflow-y-auto pr-2">
              {curatedStories.map((story) => (
                <li key={story.id}>
                  <Link
                    href="/blog"
                    className="flex items-center gap-4 group rounded-2xl p-2 transition hover:bg-secondary-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  >
                    <div className="relative w-28 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                      <Image
                        src={story.image}
                        alt={story.title}
                        fill
                        className="object-cover transform transition duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-secondary-900">{story.title}</p>
                      <p className="text-sm text-secondary-600 mt-1">
                        {story.description}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
              >
                Explore all stories
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
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
