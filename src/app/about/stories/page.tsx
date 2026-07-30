import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Stories | AfricGuide",
  description: "Discover the authentic stories, moments, and transformative experiences shared by our travelers and local guides across Africa.",
};

export default function OurStoriesPage() {
  return (
    <div className="bg-secondary-50 min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] md:h-[60vh] overflow-hidden">
        <Image
          src="/about/stories-hero.png"
          alt="Travelers sharing a moment with a local guide"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-6 z-10">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 drop-shadow-lg font-display">
            Our Stories
          </h1>
          <p className="text-lg md:text-2xl text-white/90 drop-shadow-md max-w-2xl font-medium">
            Real experiences, authentic connections, and the magic of Africa.
          </p>
        </div>
      </div>

      <div className="container-custom mt-16 md:mt-24">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-secondary-100">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6 font-display">
            The Heartbeat of Our Journeys
          </h2>
          <div className="prose prose-lg text-secondary-700 max-w-none space-y-6">
            <p>
              At AfricGuide, we believe that the true essence of travel is not found in itineraries, but in the stories we bring back with us. It is the impromptu laughter shared around a campfire under the vast Serengeti sky. It is the silent awe of witnessing a silverback gorilla in the misty Rwandan mountains.
            </p>
            <p>
              Every traveler who embarks on a journey with us writes a unique chapter in our ongoing story. We don't just facilitate trips; we foster profound connections between curious explorers and the vibrant communities, diverse cultures, and breathtaking ecosystems of Africa.
            </p>
            <p>
              Our stories are woven from the deep respect we hold for the land and its people. When you travel with AfricGuide, you aren't just observing Africa from a distance—you are experiencing its heartbeat, guided by locals who call this magnificent continent home.
            </p>
            <div className="bg-primary-50 p-6 rounded-xl border border-primary-100 my-8">
              <h3 className="text-xl font-semibold text-primary-800 mb-2">Share Your African Story</h3>
              <p className="text-primary-700 text-base m-0">
                Have you traveled with us? We would love to hear about your transformative moments. Reach out to us at <a href="mailto:info@africguide.com" className="font-bold underline hover:text-primary-900">info@africguide.com</a>.
              </p>
            </div>
            <p>
              Join us, and let’s write your African story together. Let the rhythm of the continent inspire you, change you, and stay with you long after you've returned home.
            </p>
          </div>
          
          <div className="mt-12 pt-8 border-t border-secondary-100 flex justify-center">
            <Link 
              href="/destinations"
              className="btn-primary"
            >
              Begin Your Journey
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
