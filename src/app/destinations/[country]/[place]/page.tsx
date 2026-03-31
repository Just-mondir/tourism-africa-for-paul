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
