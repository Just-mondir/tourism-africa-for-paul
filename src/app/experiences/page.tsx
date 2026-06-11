import { Metadata } from "next";
import Image from "next/image";
import ExperienceCard from "@/components/ExperienceCard";
import { experiencesData } from "@/lib/experiences-data";

export const metadata: Metadata = {
  title: "Travel Experiences in Africa - AfricGuide",
  description: "Discover incredible travel experiences in Africa, from thrilling safaris and desert expeditions to relaxing beach getaways and cultural immersions.",
};

export default function ExperiencesPage() {
  return (
    <div className="bg-secondary-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src="/experiences/hero.png"
          alt="African Experiences Hero"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-6 z-10">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Curated African Experiences
          </h1>
          <p className="text-lg md:text-2xl text-white/90 drop-shadow-md max-w-3xl">
            Whether you seek adrenaline-pumping adventures, serene coastal retreats, or deep cultural immersions, your journey begins here.
          </p>
        </div>
      </div>

      {/* Main Content - Grid of Experiences */}
      <div className="py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-primary-600 mb-3 font-semibold">
              Discover By Style
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-secondary-900 mb-6">
              Find Your Perfect Journey
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Explore our diverse categories to find the travel experience that speaks to your soul. Each path offers a unique perspective on this extraordinary continent.
            </p>
          </div>

          {/* Experiences Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {experiencesData.map((experience, index) => (
              <ExperienceCard 
                key={experience.id} 
                experience={experience} 
                index={index} 
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-primary-900 py-20 mt-12 text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Start Planning?
        </h2>
        <p className="text-primary-100 max-w-2xl mx-auto mb-8 text-lg">
          Explore our extensive destination guides to see where your chosen experience comes to life.
        </p>
        <a 
          href="/destinations" 
          className="inline-block bg-white text-primary-900 font-semibold py-3 px-8 rounded-full hover:bg-primary-50 transition-colors duration-300 shadow-lg hover:shadow-xl"
        >
          Explore All Destinations
        </a>
      </div>
    </div>
  );
}
