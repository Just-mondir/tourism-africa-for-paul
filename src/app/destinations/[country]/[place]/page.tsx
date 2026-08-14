/**
 * Destination Detail Page — Full Rebuild
 * Shows: hero, photo gallery, description, quick facts,
 *        flight booking (Google Flights), hotel booking (Booking.com),
 *        attractions, logistics, FAQs
 */

import FallbackImage from "@/components/FallbackImage";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Compass,
  Camera,
  Utensils,
  DollarSign,
  ShieldCheck,
  HelpCircle,
  Star,
} from "lucide-react";
import { getDestinationBySlug } from "@/lib/supabase/queries";
import { getOptimizedImageUrl } from "@/lib/cloudinary";
import { getFlagshipDestination, type FlagshipDestination } from "@/lib/flagship-destinations";
import { getDestinationGallery } from "@/lib/destination-images";
import { generateSlug } from "@/lib/utils";
import DestinationGallery from "@/components/DestinationGallery";
import BookingWidgets from "@/components/BookingWidgets";

interface DestinationDetailPageProps {
  params: {
    country: string;
    place: string;
  };
}

const FALLBACK_IMAGE = "/destinationHero.webp";
const FALLBACK_DESCRIPTION =
  "We are actively curating a richer travel guide for this location. For now, enjoy a quick preview with the essentials we already have.";

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
    description:
      destination.desc || `Discover ${destination.places} in ${destination.country}.`,
  };
}

export default async function DestinationDetailPage({
  params,
}: DestinationDetailPageProps) {
  const flagship = getFlagshipDestination(params.country, params.place);
  if (flagship) {
    return <FlagshipDestinationPage destination={flagship} placeSlug={params.place} />;
  }

  const destination = await getDestinationBySlug(params.country, params.place);

  if (!destination) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <p className="text-sm uppercase tracking-[0.2em] text-secondary-500 mb-4">
          Destination preview
        </p>
        <h1 className="text-3xl font-bold text-secondary-900 mb-4">
          We are still gathering details
        </h1>
        <p className="text-secondary-600 max-w-2xl">
          The full guide for this location is on the way. Explore other destinations or
          come back soon for more inspiration.
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

  const placeSlug = generateSlug(destination.places);
  const gallery = getDestinationGallery(placeSlug, destination.image_url);

  // If database images array exists and has items, use it. Otherwise fall back to static/dynamic resolvers.
  const dbImages: string[] = Array.isArray(destination.images)
    ? destination.images.filter(Boolean)
    : [];
  const allGalleryImages: string[] = dbImages.length > 0
    ? dbImages
    : [
        gallery.hero,
        ...gallery.gallery.filter((url) => url !== gallery.hero),
      ].slice(0, 8);

  const heroImage = getOptimizedImageUrl(gallery.hero, 1600, 900);
  const descriptionText = destination.desc || FALLBACK_DESCRIPTION;

  return (
    <div className="bg-white min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative h-[65vh] w-full overflow-hidden">
        <FallbackImage
          src={heroImage}
          alt={destination.places}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />

        {/* Back button */}
        <div className="absolute top-6 left-6 z-10">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-200 px-4 py-2 rounded-full text-sm font-medium border border-white/20"
          >
            <ArrowLeft className="w-4 h-4" />
            All Destinations
          </Link>
        </div>

        {/* Hero content */}
        <div className="relative z-10 h-full container-custom flex flex-col justify-end pb-10 text-white">
          <div className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-white/70 mb-3">
            <MapPin className="w-4 h-4" />
            <span>{destination.country}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-3 drop-shadow-lg leading-tight">
            {destination.places}
          </h1>
          <p className="max-w-2xl text-base md:text-lg text-white/85 drop-shadow leading-relaxed">
            {descriptionText.slice(0, 160)}
            {descriptionText.length > 160 ? "…" : ""}
          </p>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section className="container-custom py-10 md:py-16 space-y-12">

        {/* ─── PHOTO GALLERY ─── */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Camera className="w-5 h-5 text-primary-500" />
            <h2 className="text-xl font-semibold text-secondary-900">Photo Gallery</h2>
          </div>
          <DestinationGallery images={allGalleryImages} placeName={destination.places} />
        </div>

        {/* ─── OVERVIEW + QUICK FACTS ─── */}
        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          {/* Overview */}
          <article className="bg-secondary-50 rounded-3xl p-8 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-secondary-400 mb-2">Overview</p>
            <h2 className="text-2xl font-semibold text-secondary-900 mb-5">
              A closer look at {destination.places}
            </h2>
            <p className="text-secondary-700 leading-relaxed whitespace-pre-line text-base">
              {descriptionText}
            </p>
          </article>

          {/* Quick facts */}
          <aside className="space-y-5">
            <div className="rounded-2xl border border-secondary-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <Compass className="w-5 h-5 text-primary-500" />
                <p className="font-semibold text-secondary-900">Quick Facts</p>
              </div>
              <dl className="space-y-4 text-sm">
                <div className="flex justify-between border-b border-secondary-100 pb-3">
                  <dt className="font-medium text-secondary-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> Country
                  </dt>
                  <dd className="text-secondary-900 capitalize font-semibold">{destination.country}</dd>
                </div>
                <div className="flex justify-between border-b border-secondary-100 pb-3">
                  <dt className="font-medium text-secondary-500 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Best Season
                  </dt>
                  <dd className="text-secondary-900 text-right">November–April</dd>
                </div>
                <div className="flex justify-between border-b border-secondary-100 pb-3">
                  <dt className="font-medium text-secondary-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Ideal Stay
                  </dt>
                  <dd className="text-secondary-900 text-right">2–5 days</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium text-secondary-500 flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5" /> Attractions
                  </dt>
                  <dd className="text-secondary-900 text-right max-w-[60%]">
                    {destination.places} highlights & culture
                  </dd>
                </div>
              </dl>
            </div>

            {/* Travel tip card */}
            <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 p-6 shadow-sm border border-primary-200">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="w-5 h-5 text-primary-600" />
                <p className="font-semibold text-primary-900">Travel tips</p>
              </div>
              <ul className="space-y-2 text-sm text-primary-900/80">
                <li>• Check visa requirements before booking</li>
                <li>• Book accommodations early in peak season</li>
                <li>• Local guides enhance the experience</li>
                <li>• Travel insurance is recommended</li>
              </ul>
            </div>
          </aside>
        </div>

        {/* ─── BOOKING SECTION ─── */}
        <div>
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-secondary-400 mb-2">Ready to go?</p>
            <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-2">
              Plan your trip to {destination.places}
            </h2>
            <p className="text-secondary-500 text-sm max-w-xl mx-auto">
              Search and book flights and hotels with our trusted partners. You will be redirected to their secure platforms.
            </p>
          </div>
          <BookingWidgets placeName={destination.places} countryName={destination.country} />
        </div>

        {/* ─── CTA ─── */}
        <div className="flex flex-wrap gap-4 justify-between items-center border-t border-secondary-100 pt-8">
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

/* ═══════════════════════════════════════════════════════
   FLAGSHIP DESTINATION PAGE
   ═══════════════════════════════════════════════════════ */
function FlagshipDestinationPage({
  destination,
  placeSlug,
}: {
  destination: FlagshipDestination;
  placeSlug: string;
}) {
  const gallery = getDestinationGallery(placeSlug, destination.heroImage);
  const allGalleryImages: string[] = [gallery.hero, ...gallery.gallery].slice(0, 8);

  const quickFacts = [
    { label: "Country", value: destination.countryName, icon: MapPin },
    { label: "Best time", value: destination.bestTime, icon: Calendar },
    { label: "Ideal stay", value: destination.idealStay, icon: Clock },
    { label: "Base", value: destination.base, icon: Compass },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative h-[65vh] w-full overflow-hidden">
        <FallbackImage
          src={gallery.hero}
          alt={destination.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/85" />

        {/* Back button */}
        <div className="absolute top-6 left-6 z-10">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-200 px-4 py-2 rounded-full text-sm font-medium border border-white/20"
          >
            <ArrowLeft className="w-4 h-4" />
            All Destinations
          </Link>
        </div>

        {/* Flagship badge */}
        <div className="absolute top-6 right-6 z-10">
          <span className="bg-amber-400 text-amber-900 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow">
            ⭐ Flagship Guide
          </span>
        </div>

        <div className="relative z-10 h-full container-custom flex flex-col justify-end pb-10 text-white">
          <div className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-white/70 mb-3">
            <MapPin className="w-4 h-4" />
            <span>{destination.countryName}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-3 drop-shadow-lg leading-tight">
            {destination.title}
          </h1>
          <p className="max-w-2xl text-base md:text-lg text-white/85 drop-shadow leading-relaxed">
            {destination.subtitle}
          </p>
        </div>
      </section>

      <section className="container-custom py-10 md:py-16 space-y-12">

        {/* ─── PHOTO GALLERY ─── */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Camera className="w-5 h-5 text-primary-500" />
            <h2 className="text-xl font-semibold text-secondary-900">Photo Gallery</h2>
          </div>
          <DestinationGallery images={allGalleryImages} placeName={destination.title} />
        </div>

        {/* ─── OVERVIEW + QUICK FACTS ─── */}
        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          <article className="bg-secondary-50 rounded-3xl p-8 shadow-sm space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-secondary-400">Overview</p>
            <h2 className="text-2xl font-semibold text-secondary-900">
              A flagship experience in {destination.countryName}
            </h2>
            <div className="space-y-4 text-secondary-700 leading-relaxed">
              {destination.overview.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </article>

          <aside className="space-y-5">
            {/* Quick facts */}
            <div className="rounded-2xl border border-secondary-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <Compass className="w-5 h-5 text-primary-500" />
                <p className="font-semibold text-secondary-900">Quick Facts</p>
              </div>
              <dl className="space-y-4 text-sm">
                {quickFacts.map((fact) => (
                  <div key={fact.label} className="flex justify-between border-b border-secondary-100 pb-3 last:border-0 last:pb-0">
                    <dt className="font-medium text-secondary-500 flex items-center gap-1.5">
                      <fact.icon className="w-3.5 h-3.5" /> {fact.label}
                    </dt>
                    <dd className="text-secondary-900 text-right font-medium max-w-[55%]">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Top attractions preview */}
            <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 p-6 shadow-sm border border-primary-200">
              <div className="flex items-center gap-3 mb-3">
                <Star className="w-5 h-5 text-primary-600" />
                <p className="font-semibold text-primary-900">Top Attractions</p>
              </div>
              <ul className="space-y-2 text-sm text-primary-900/80">
                {destination.attractions.slice(0, 4).map((item) => (
                  <li key={item.title}>• {item.title}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* ─── BOOKING WIDGETS ─── */}
        <div>
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-secondary-400 mb-2">Ready to visit?</p>
            <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-2">
              Book your trip to {destination.title}
            </h2>
            <p className="text-secondary-500 text-sm max-w-xl mx-auto">
              Search flights and hotels with our trusted partners — redirected to their secure platforms.
            </p>
          </div>
          <BookingWidgets placeName={destination.title} countryName={destination.countryName} />
        </div>

        {/* ─── FULL ATTRACTIONS ─── */}
        <div className="space-y-5">
          <h2 className="text-2xl font-semibold text-secondary-900">Top Attractions</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {destination.attractions.map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-secondary-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-primary-200 transition-all duration-200"
              >
                <h3 className="text-base font-semibold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-secondary-600 text-sm leading-relaxed">{item.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── LOGISTICS + LODGING + DINING + BUDGET ─── */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Logistics */}
          <div className="rounded-2xl border border-secondary-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Compass className="w-4 h-4 text-primary-500" />
              <h3 className="text-base font-semibold text-secondary-900">Logistics</h3>
            </div>
            <ul className="space-y-2.5 text-sm text-secondary-600">
              {destination.logistics.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-primary-400 mt-0.5 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Lodging */}
          <div className="rounded-2xl border border-secondary-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-4 h-4 text-primary-500" />
              <h3 className="text-base font-semibold text-secondary-900">Where to Stay</h3>
            </div>
            <div className="space-y-4 text-sm text-secondary-600">
              {[
                { label: "Luxury", items: destination.lodging.luxury },
                { label: "Mid-range", items: destination.lodging.midrange },
                { label: "Budget", items: destination.lodging.budget },
                { label: "Local Lodges", items: destination.lodging.local },
              ].map(({ label, items }) =>
                items.length > 0 ? (
                  <div key={label}>
                    <p className="font-semibold text-secondary-800 mb-1.5 text-xs uppercase tracking-wide">{label}</p>
                    <ul className="space-y-1">
                      {items.map((item) => (
                        <li key={item.name}>
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
                ) : null
              )}
            </div>
          </div>

          {/* Dining */}
          <div className="rounded-2xl border border-secondary-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Utensils className="w-4 h-4 text-primary-500" />
              <h3 className="text-base font-semibold text-secondary-900">Food & Dining</h3>
            </div>
            <div className="space-y-3 text-sm text-secondary-600">
              <div>
                <p className="font-semibold text-secondary-800 mb-1.5 text-xs uppercase tracking-wide">Best Restaurants</p>
                <ul className="space-y-1">
                  {destination.dining.best.map((item) => (
                    <li key={item.name}>
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
                <p className="font-semibold text-secondary-800 mb-1.5 text-xs uppercase tracking-wide">Local Specialties</p>
                <ul className="space-y-1">
                  {destination.dining.specialties.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-primary-400 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-xs text-secondary-500 italic pt-1">{destination.dining.mealBudget}</p>
            </div>
          </div>

          {/* Budget */}
          <div className="rounded-2xl border border-secondary-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-4 h-4 text-primary-500" />
              <h3 className="text-base font-semibold text-secondary-900">Budget Guide</h3>
            </div>
            <div className="space-y-3 text-sm text-secondary-600">
              {[
                { label: "Activity Costs", items: destination.budget.activities },
                { label: "Daily Budget", items: destination.budget.daily },
                { label: "Entrance Fees", items: destination.budget.entrance },
              ].map(({ label, items }) => (
                <div key={label}>
                  <p className="font-semibold text-secondary-800 mb-1.5 text-xs uppercase tracking-wide">{label}</p>
                  <ul className="space-y-1">
                    {items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-primary-400 flex-shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── SAFETY ─── */}
        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-semibold text-amber-900">Safety & Tips</h3>
          </div>
          <ul className="grid md:grid-cols-2 gap-2.5 text-sm text-amber-800">
            {destination.safety.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-amber-500 flex-shrink-0 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ─── FAQs ─── */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="w-5 h-5 text-primary-500" />
            <h2 className="text-2xl font-semibold text-secondary-900">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {destination.faqs.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-secondary-100 bg-white shadow-sm overflow-hidden"
              >
                <summary className="cursor-pointer flex items-center justify-between p-5 text-sm font-semibold text-secondary-900 hover:bg-secondary-50 transition-colors list-none">
                  <span>{item.question}</span>
                  <span className="ml-4 flex-shrink-0 text-secondary-400 group-open:rotate-180 transition-transform duration-200">
                    ▾
                  </span>
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-sm text-secondary-600 leading-relaxed">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* ─── CTA ─── */}
        <div className="flex flex-wrap gap-4 justify-between items-center border-t border-secondary-100 pt-8">
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
