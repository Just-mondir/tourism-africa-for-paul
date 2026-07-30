import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Shield, Star, Heart, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Why Travel With Us | AfricGuide",
  description: "Discover the AfricGuide difference. Unparalleled luxury, sustainable practices, and expert local knowledge for your African adventure.",
};

export default function WhyUsPage() {
  const reasons = [
    {
      title: "Uncompromising Quality",
      description: "From luxury lodges to private transfers, every aspect of your journey is vetted to meet the highest standards of comfort and excellence.",
      icon: Star
    },
    {
      title: "Deep Local Expertise",
      description: "We are rooted in Africa. Our deep local connections mean you get exclusive access, hidden gems, and authentic cultural immersion.",
      icon: Compass
    },
    {
      title: "Sustainable & Ethical",
      description: "We are committed to positive impact travel. We partner with eco-friendly lodges and initiatives that empower local communities and protect wildlife.",
      icon: Heart
    },
    {
      title: "Peace of Mind",
      description: "With 24/7 on-the-ground support and comprehensive safety protocols, you can relax and immerse yourself fully in the magic of Africa.",
      icon: Shield
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
        <Image
          src="/about/why-us-hero.png"
          alt="Luxurious safari lodge interior"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 lg:px-24 z-10 max-w-4xl">
          <p className="text-primary-400 font-semibold tracking-widest uppercase mb-3 text-sm md:text-base">
            The AfricGuide Difference
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg font-display leading-tight">
            Why Travel With Us
          </h1>
          <p className="text-lg md:text-xl text-white/90 drop-shadow-md font-medium max-w-2xl">
            We don't just sell tours; we curate unforgettable experiences crafted with precision, luxury, and deep respect for the African continent.
          </p>
        </div>
      </div>

      <div className="container-custom mt-16 md:mt-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6 font-display">
            Elevating the African Safari
          </h2>
          <p className="text-lg text-secondary-600">
            Traveling to Africa is a profound experience. At AfricGuide, we ensure that every detail of your journey is flawlessly executed, allowing you to focus entirely on the wonder around you. Here is why discerning travelers choose us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div key={index} className="bg-secondary-50 p-8 rounded-2xl border border-secondary-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-secondary-900 mb-3">{reason.title}</h3>
                <p className="text-secondary-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 bg-primary-900 rounded-3xl p-8 md:p-12 text-center shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-display">
            Ready to experience the difference?
          </h3>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Contact our travel experts today to start planning your bespoke African adventure. We are here to answer your questions and design your dream itinerary.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary bg-white text-primary-900 hover:bg-secondary-50">
              Contact Us Today
            </Link>
            <a href="mailto:info@africguide.com" className="text-white hover:text-primary-200 underline font-medium">
              info@africguide.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
