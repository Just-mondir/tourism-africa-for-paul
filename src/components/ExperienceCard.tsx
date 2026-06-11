import Link from "next/link";
import Image from "next/image";
import { ExperienceCategory } from "@/lib/experiences-data";

interface ExperienceCardProps {
  experience: ExperienceCategory;
  index: number;
}

export default function ExperienceCard({ experience, index }: ExperienceCardProps) {
  return (
    <Link 
      href={`/experiences/${experience.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 h-full"
    >
      {/* Image Container with Hover Effect */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={experience.image}
          alt={experience.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Title positioned at bottom of image */}
        <div className="absolute bottom-4 left-4 right-4 z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-2xl font-bold text-white drop-shadow-md">
            {experience.title}
          </h3>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-secondary-600 line-clamp-3 mb-4">
          {experience.subtitle}
        </p>
        
        {/* Learn More Button - visually pushed to bottom */}
        <div className="mt-auto">
          <span className="inline-flex items-center text-sm font-semibold text-primary-600 group-hover:text-primary-700 transition-colors">
            Explore Experience
            <svg 
              className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
