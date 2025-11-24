/**
 * BusinessCard Component - Card to display businesses from African directory
 * Uses businesses table data
 */

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Building2, MapPin, Phone, Globe } from "lucide-react";
import type { Business } from "@/types/business";
import { getOptimizedImageUrl } from "@/lib/cloudinary";
import { truncate } from "@/lib/utils";

interface BusinessCardProps {
  business: Business;
  index?: number;
}

export default function BusinessCard({ business, index = 0 }: BusinessCardProps) {
  // Use places or name field
  const businessName = business.places || business.name || "Business";
  const imageUrl = getOptimizedImageUrl(business.image_url, 600, 400);
  const description = truncate(business.description, 120);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group"
    >
      <div className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {/* Image */}
        <div className="relative w-full h-64 overflow-hidden bg-secondary-100">
          {business.image_url ? (
            <Image
              src={imageUrl}
              alt={businessName}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-secondary-200">
              <Building2 className="w-16 h-16 text-secondary-400" />
            </div>
          )}
          {/* Title at bottom of image */}
          <div className="absolute bottom-0 left-0 w-full px-4 pb-3 z-10">
            <h3 className="text-base font-bold text-white drop-shadow-lg bg-black/40 rounded-b-xl py-2 px-3 w-full">
              {businessName}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title removed from here, now on image */}
          
          {business.category && (
            <span className="inline-block text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded mb-2">
              {business.category}
            </span>
          )}

          {description && (
            <p className="text-secondary-600 text-sm line-clamp-2 mb-4">{description}</p>
          )}

          {/* Business Info */}
          <div className="space-y-2 text-sm text-secondary-600">
            {business.address && (
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="line-clamp-1">{business.address}</span>
              </div>
            )}
            {business.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>{business.phone}</span>
              </div>
            )}
            {business.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 flex-shrink-0" />
                <a
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline truncate"
                  onClick={(e) => e.stopPropagation()}
                >
                  Visit Website
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

