import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Our Team | AfricGuide",
  description: "Meet the passionate experts, guides, and travel planners behind AfricGuide who make your dream African adventure a reality.",
};

export default function OurTeamPage() {
  return (
    <div className="bg-secondary-50 min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] md:h-[60vh] overflow-hidden">
        <Image
          src="/about/team-hero.png"
          alt="The AfricGuide team of experts"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-6 z-10">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 drop-shadow-lg font-display">
            Meet Our Team
          </h1>
          <p className="text-lg md:text-2xl text-white/90 drop-shadow-md max-w-2xl font-medium">
            The passionate experts behind your extraordinary African journey.
          </p>
        </div>
      </div>

      <div className="container-custom mt-16 md:mt-20">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6 font-display">
            Expertise Born from Passion
          </h2>
          <p className="text-lg text-secondary-600 leading-relaxed">
            We are a diverse family of travel designers, seasoned guides, conservationists, and logistics experts. United by our profound love for Africa, our singular mission is to showcase the true beauty, culture, and wildlife of this continent to the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Section: The Planners */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-secondary-100">
            <h3 className="text-2xl font-bold text-secondary-900 mb-4 font-display text-primary-600">
              The Travel Architects
            </h3>
            <p className="text-secondary-700 leading-relaxed mb-4">
              Our travel planners are the architects of your dream vacation. With decades of combined experience and an intimate knowledge of every lodge, route, and season, they meticulously craft bespoke itineraries tailored to your unique preferences.
            </p>
            <p className="text-secondary-700 leading-relaxed">
              They don't just book trips; they design experiences, ensuring seamless transitions, optimal pacing, and those special, unexpected touches that transform a good trip into an unforgettable one.
            </p>
          </div>

          {/* Section: The Guides */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-secondary-100">
            <h3 className="text-2xl font-bold text-secondary-900 mb-4 font-display text-primary-600">
              Our Local Guides
            </h3>
            <p className="text-secondary-700 leading-relaxed mb-4">
              The true stars of AfricGuide are our on-the-ground local guides. Born and raised in the regions they showcase, they possess an encyclopedic knowledge of the flora, fauna, and local customs.
            </p>
            <p className="text-secondary-700 leading-relaxed">
              With sharp eyes to spot a leopard in the brush and warm hearts to share their heritage, our guides are your companions, protectors, and storytellers throughout your journey in Africa.
            </p>
          </div>
        </div>

        <div className="mt-20 max-w-3xl mx-auto text-center">
          <p className="text-xl text-secondary-800 font-medium italic mb-6">
            "Our team's dedication is what makes the AfricGuide experience truly exceptional. We look forward to welcoming you."
          </p>
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl shadow-sm border border-secondary-100">
            <span className="text-secondary-600 mr-2">Get in touch with our team:</span>
            <a href="mailto:info@africguide.com" className="font-bold text-primary-600 hover:text-primary-700 text-lg">
              info@africguide.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
