"use client";

import { Plane, Building2, ExternalLink, Star, Clock, Shield } from "lucide-react";

interface BookingWidgetsProps {
  placeName: string;
  countryName: string;
}

function buildFlightsUrl(place: string, country: string): string {
  const query = encodeURIComponent(`flights to ${place} ${country}`);
  return `https://www.google.com/travel/flights?q=${query}`;
}

function buildBookingUrl(place: string, country: string): string {
  const query = encodeURIComponent(`${place}, ${country}`);
  return `https://www.booking.com/searchresults.html?ss=${query}&lang=en-us&sb=1&src_elem=sb`;
}

export default function BookingWidgets({ placeName, countryName }: BookingWidgetsProps) {
  const flightsUrl = buildFlightsUrl(placeName, countryName);
  const bookingUrl = buildBookingUrl(placeName, countryName);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* ─── FLIGHTS ─── */}
      <a
        href={flightsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-secondary-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-primary-300 transition-all duration-200"
        aria-label={`Search flights to ${placeName}`}
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary-50 rounded-lg p-2.5 text-primary-600 group-hover:bg-primary-100 transition-colors">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-secondary-500">Flights</p>
              <p className="font-bold text-lg text-secondary-900 leading-tight">Fly to {placeName}</p>
            </div>
          </div>

          <p className="text-sm text-secondary-600 mb-5 leading-relaxed">
            Search and compare flights directly to {placeName}, {countryName}.
          </p>

          <div className="flex flex-col gap-2.5 mb-6 text-xs text-secondary-600">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-primary-400" />
              <span>Compare prices across airlines</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary-400" />
              <span>Real-time availability</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-secondary-100 pt-4 mt-auto">
          <span className="text-sm font-semibold text-primary-600 group-hover:text-primary-700 transition-colors inline-flex items-center gap-2">
            Search on Google Flights
            <ExternalLink className="w-4 h-4" />
          </span>
        </div>
      </a>

      {/* ─── HOTELS ─── */}
      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-secondary-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-primary-300 transition-all duration-200"
        aria-label={`Search hotels in ${placeName}`}
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary-50 rounded-lg p-2.5 text-primary-600 group-hover:bg-primary-100 transition-colors">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-secondary-500">Hotels</p>
              <p className="font-bold text-lg text-secondary-900 leading-tight">Stay in {placeName}</p>
            </div>
          </div>

          <p className="text-sm text-secondary-600 mb-5 leading-relaxed">
            Browse hotels, lodges, and resorts in {placeName}. Compare prices and reviews.
          </p>

          <div className="flex flex-col gap-2.5 mb-6 text-xs text-secondary-600">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-primary-400" />
              <span>Luxury, mid-range & budget</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary-400" />
              <span>Verified guest reviews</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-secondary-100 pt-4 mt-auto">
          <span className="text-sm font-semibold text-primary-600 group-hover:text-primary-700 transition-colors inline-flex items-center gap-2">
            Search on Booking.com
            <ExternalLink className="w-4 h-4" />
          </span>
        </div>
      </a>
    </div>
  );
}
