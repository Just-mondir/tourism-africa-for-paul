/**
 * Destination Detail Page
 * Displays a single destination using the limited data available (name, image, description)
 */

import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Camera, Compass, MapPin } from "lucide-react";
import { getDestinationBySlug } from "@/lib/supabase/queries";
import { getOptimizedImageUrl } from "@/lib/cloudinary";
import {
  getFlagshipDestination,
  type FlagshipDestination,
} from "@/lib/flagship-destinations";

interface DestinationDetailPageProps {
  params: {
    country: string;
    place: string;
  };
}

const FALLBACK_IMAGE = "/destinationHero.webp";
const FALLBACK_DESCRIPTION = "We are actively curating a richer travel guide for this location. For now, enjoy a quick preview with the essentials we already have.";

export async function generateMetadata({
  params,
}: DestinationDetailPageProps): Promise<Metadata> {
  const flagship = getFlagshipDestination(params.country, params.place);

  if (flagship) {
    return {
      title: `${flagship.title} - ${flagship.countryName} | Africa Tourism`,
      description: flagship.subtitle,
    };
  }

  const destination = await getDestinationBySlug(params.country, params.place);

  if (!destination) {
    return {
      title: "Destination preview coming soon | Africa Tourism",
      description: "We are preparing more information about this African destination.",
    };
  }

  return {
    title: `${destination.places} - ${destination.country} | Africa Tourism`,
    description: destination.desc || `Discover ${destination.places} in ${destination.country}.`,
  };
}

export default async function DestinationDetailPage({ params }: DestinationDetailPageProps) {
  const flagship = getFlagshipDestination(params.country, params.place);

  if (flagship) {
    return <FlagshipDestinationPage destination={flagship} />;
  }

  const destination = await getDestinationBySlug(params.country, params.place);

  if (!destination) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <p className="text-sm uppercase tracking-[0.2em] text-secondary-500 mb-4">Destination preview</p>
        <h1 className="text-3xl font-bold text-secondary-900 mb-4">We are still gathering details</h1>
        <p className="text-secondary-600 max-w-2xl">
          The full guide for this location is on the way. Explore other destinations or come back soon for more inspiration.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link href="/destinations" className="btn-primary">
            Browse all destinations
          </Link>
          <Link href="/contact" className="btn-secondary">
            Plan a custom trip
          </Link>
        </div>
      </div>
    );
  }

  const heroImage = destination.image_url
    ? getOptimizedImageUrl(destination.image_url, 1600, 900)
    : FALLBACK_IMAGE;

  const descriptionText = destination.desc || FALLBACK_DESCRIPTION;

  return (
    <div className="bg-white min-h-screen">
      <section className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src={heroImage}
          alt={destination.places}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 h-full container-custom flex flex-col justify-end pb-12 text-white">
          <div className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-white/80 mb-4">
            <MapPin className="w-5 h-5" />
            <span>{destination.country}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            {destination.places}
          </h1>
          <p className="max-w-3xl text-lg text-white/90 drop-shadow">
            {descriptionText}
          </p>
        </div>
        <div className="absolute top-6 left-6 z-10">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to destinations
          </Link>
        </div>
      </section>

      <section className="container-custom py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          <article className="bg-secondary-50 rounded-3xl p-8 shadow-lg">
            <p className="text-sm uppercase tracking-[0.3em] text-secondary-500 mb-3">
              Overview
            </p>
            <h2 className="text-2xl font-semibold text-secondary-900 mb-6">
              A closer look at {destination.places}
            </h2>
            <p className="text-secondary-700 leading-relaxed whitespace-pre-line">
              {descriptionText}
            </p>
          </article>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-secondary-100 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Compass className="w-5 h-5 text-primary-500" />
                <p className="font-semibold text-secondary-900">Quick facts</p>
              </div>
              <dl className="space-y-3 text-sm text-secondary-700">
                <div className="flex justify-between">
                  <dt className="font-medium text-secondary-500">Country</dt>
                  <dd className="text-secondary-900 capitalize">{destination.country}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium text-secondary-500">Experience</dt>
                  <dd className="text-secondary-900">Signature highlight</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium text-secondary-500">Status</dt>
                  <dd className="text-secondary-900">Guide in progress</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl bg-primary-50 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <Camera className="w-5 h-5 text-primary-600" />
                <p className="font-semibold text-primary-900">What to expect</p>
              </div>
              <ul className="space-y-2 text-sm text-primary-900/80">
                <li>• Immersive landscapes and vibrant culture</li>
                <li>• Photo-friendly spots ideal for social sharing</li>
                <li>• Personalized travel planning available on request</li>
              </ul>
            </div>
          </aside>
        </div>

        <div className="mt-12 flex flex-wrap gap-4 justify-between items-center">
          <Link href="/destinations" className="btn-secondary">
            Explore more destinations
          </Link>
          <Link href="/contact" className="btn-primary">
            Plan your trip with us
          </Link>
        </div>
      </section>
    </div>
  );
}

function FlagshipDestinationPage({ destination }: { destination: FlagshipDestination }) {
  const quickFacts = [
    { label: "Country", value: destination.countryName },
    { label: "Best time", value: destination.bestTime },
    { label: "Ideal stay", value: destination.idealStay },
    { label: "Base", value: destination.base },
  ];

  return (
    <div className="bg-white min-h-screen">
      <section className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src={destination.heroImage}
          alt={destination.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 h-full container-custom flex flex-col justify-end pb-12 text-white">
          <div className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-white/80 mb-4">
            <MapPin className="w-5 h-5" />
            <span>{destination.countryName}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            {destination.title}
          </h1>
          <p className="max-w-3xl text-lg text-white/90 drop-shadow">
            {destination.subtitle}
          </p>
        </div>
        <div className="absolute top-6 left-6 z-10">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to destinations
          </Link>
        </div>
      </section>

      <section className="container-custom py-12 md:py-16 space-y-12">
        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          <article className="bg-secondary-50 rounded-3xl p-8 shadow-lg space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-secondary-500">
              Overview
            </p>
            <h2 className="text-2xl font-semibold text-secondary-900">
              A flagship experience in {destination.countryName}
            </h2>
            <div className="space-y-4 text-secondary-700 leading-relaxed">
              {destination.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-secondary-100 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Compass className="w-5 h-5 text-primary-500" />
                <p className="font-semibold text-secondary-900">Quick facts</p>
              </div>
              <dl className="space-y-3 text-sm text-secondary-700">
                {quickFacts.map((fact) => (
                  <div key={fact.label} className="flex justify-between gap-4">
                    <dt className="font-medium text-secondary-500">{fact.label}</dt>
                    <dd className="text-secondary-900 text-right">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-2xl bg-primary-50 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <Camera className="w-5 h-5 text-primary-600" />
                <p className="font-semibold text-primary-900">Travel highlights</p>
              </div>
              <ul className="space-y-2 text-sm text-primary-900/80">
                {destination.attractions.slice(0, 3).map((item) => (
                  <li key={item.title}>• {item.title}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-secondary-900">Top attractions</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {destination.attractions.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-secondary-100 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-secondary-600 text-sm leading-relaxed">{item.details}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-secondary-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Logistics</h3>
            <ul className="space-y-3 text-sm text-secondary-600">
              {destination.logistics.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-secondary-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Hebergement</h3>
            <div className="space-y-4 text-sm text-secondary-600">
              <div>
                <p className="font-semibold text-secondary-900 mb-2">Hotels de luxe</p>
                <ul className="space-y-2">
                  {destination.lodging.luxury.map((item) => (
                    <li key={item.name}>
                      •{" "}
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 hover:underline transition-colors"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-secondary-900 mb-2">Hotels milieu de gamme</p>
                <ul className="space-y-2">
                  {destination.lodging.midrange.map((item) => (
                    <li key={item.name}>
                      •{" "}
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 hover:underline transition-colors"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-secondary-900 mb-2">Options economiques</p>
                <ul className="space-y-2">
                  {destination.lodging.budget.map((item) => (
                    <li key={item.name}>
                      •{" "}
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 hover:underline transition-colors"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-secondary-900 mb-2">Lodges, resorts ou hebergements locaux</p>
                <ul className="space-y-2">
                  {destination.lodging.local.map((item) => (
                    <li key={item.name}>
                      •{" "}
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 hover:underline transition-colors"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-secondary-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Restaurants et gastronomie</h3>
            <div className="space-y-4 text-sm text-secondary-600">
              <div>
                <p className="font-semibold text-secondary-900 mb-2">Meilleurs restaurants</p>
                <ul className="space-y-2">
                  {destination.dining.best.map((item) => (
                    <li key={item.name}>
                      •{" "}
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 hover:underline transition-colors"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-secondary-900 mb-2">Specialites locales a decouvrir</p>
                <ul className="space-y-2">
                  {destination.dining.specialties.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-secondary-900 mb-2">Budget moyen des repas</p>
                <p>{destination.dining.mealBudget}</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-secondary-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Budget et couts</h3>
            <div className="space-y-4 text-sm text-secondary-600">
              <div>
                <p className="font-semibold text-secondary-900 mb-2">Prix des activites principales</p>
                <ul className="space-y-2">
                  {destination.budget.activities.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-secondary-900 mb-2">Budget journalier estime</p>
                <ul className="space-y-2">
                  {destination.budget.daily.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-secondary-900 mb-2">Frais d'entree des attractions</p>
                <ul className="space-y-2">
                  {destination.budget.entrance.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-secondary-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">Safety</h3>
          <ul className="space-y-3 text-sm text-secondary-600">
            {destination.safety.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-secondary-900">FAQs</h2>
          <div className="space-y-3">
            {destination.faqs.map((item) => (
              <details
                key={item.question}
                className="rounded-2xl border border-secondary-100 bg-white p-5 shadow-sm"
              >
                <summary className="cursor-pointer text-sm font-semibold text-secondary-900">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm text-secondary-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-between items-center">
          <Link href="/destinations" className="btn-secondary">
            Explore more destinations
          </Link>
          <Link href="/contact" className="btn-primary">
            Plan your trip with us
          </Link>
        </div>
      </section>
    </div>
  );
}
