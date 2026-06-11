import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { experiencesData } from "@/lib/experiences-data";

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const experience = experiencesData.find((exp) => exp.id === params.category);
  
  if (!experience) {
    return {
      title: "Experience Not Found",
    };
  }

  return {
    title: `${experience.title} in Africa - AfricGuide`,
    description: experience.introduction.substring(0, 160),
  };
}

export function generateStaticParams() {
  return experiencesData.map((exp) => ({
    category: exp.id,
  }));
}

export default function ExperienceCategoryPage({ params }: { params: { category: string } }) {
  const experience = experiencesData.find((exp) => exp.id === params.category);

  if (!experience) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
        <Image
          src={experience.heroImage}
          alt={experience.title}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-4 md:px-6 pb-16 md:pb-24 z-10">
          <p className="text-primary-400 font-semibold uppercase tracking-widest mb-4">
            African Experiences
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-xl">
            {experience.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl drop-shadow-md">
            {experience.subtitle}
          </p>
        </div>
      </div>

      <div className="container-custom mt-[-4rem] relative z-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16">
          {/* Introduction */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6 border-b border-secondary-100 pb-4">
              Overview
            </h2>
            <p className="text-lg text-secondary-700 leading-relaxed">
              {experience.introduction}
            </p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Highlights */}
            <section>
              <h2 className="text-2xl font-bold text-secondary-900 mb-6 flex items-center">
                <span className="bg-primary-100 text-primary-600 p-2 rounded-lg mr-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                Experience Highlights
              </h2>
              <ul className="space-y-4">
                {experience.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary-500 mr-3 mt-1">•</span>
                    <span className="text-secondary-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Practical Info (Season & Costs) */}
            <section className="bg-secondary-50 p-8 rounded-2xl border border-secondary-100">
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                Practical Information
              </h2>
              
              <div className="mb-6">
                <h3 className="font-semibold text-secondary-900 flex items-center mb-2">
                  <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Best Season to Visit
                </h3>
                <p className="text-secondary-700">{experience.bestSeasonToVisit}</p>
              </div>

              <div>
                <h3 className="font-semibold text-secondary-900 flex items-center mb-2">
                  <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Estimated Costs
                </h3>
                <p className="text-secondary-700">{experience.estimatedCosts}</p>
              </div>
            </section>
          </div>

          {/* Best Destinations */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
              Top Destinations for {experience.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {experience.bestDestinations.map((dest, index) => (
                <Link 
                  href={dest.url} 
                  key={index}
                  className="group flex flex-col md:flex-row bg-white border border-secondary-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative w-full md:w-2/5 h-48 md:h-auto">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 md:w-3/5 flex flex-col justify-center">
                    <p className="text-primary-600 text-sm font-semibold mb-1 uppercase tracking-wider">{dest.country}</p>
                    <h3 className="text-xl font-bold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors">{dest.name}</h3>
                    <p className="text-secondary-600 text-sm line-clamp-3">{dest.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Travel Tips */}
          <section className="mb-16 bg-primary-900 text-white p-8 md:p-12 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10">
              <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-8 relative z-10">Expert Travel Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              {experience.travelTips.map((tip, index) => (
                <div key={index} className="flex items-start bg-primary-800/50 p-4 rounded-xl border border-primary-700/50">
                  <span className="bg-primary-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-primary-50 mt-1">{tip}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQs & Related Links */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <section className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-secondary-900 mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {experience.faqs.map((faq, index) => (
                  <div key={index} className="border-b border-secondary-200 pb-6 last:border-0">
                    <h3 className="text-lg font-bold text-secondary-900 mb-3">{faq.question}</h3>
                    <p className="text-secondary-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-secondary-50 p-8 rounded-2xl h-fit border border-secondary-100">
              <h2 className="text-xl font-bold text-secondary-900 mb-6">
                Related Destinations
              </h2>
              <ul className="space-y-4">
                {experience.relatedDestinations.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.url}
                      className="group flex items-center text-secondary-700 hover:text-primary-600 font-medium transition-colors"
                    >
                      <svg className="w-5 h-5 mr-3 text-secondary-400 group-hover:text-primary-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-8 border-t border-secondary-200">
                <Link 
                  href="/experiences"
                  className="text-primary-600 hover:text-primary-700 font-bold flex items-center transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to All Experiences
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
