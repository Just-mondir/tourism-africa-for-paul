"use client";
// src/components/StaticDestinationCard.tsx
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

interface StaticDestinationCardProps {
  image: string;
  title: string;
  description: string;
  index?: number;
}

export default function StaticDestinationCard({ image, title, description, index = 0 }: StaticDestinationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="block relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 h-80">
        {/* Image as background */}
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/90 group-hover:via-black/60 group-hover:to-black/30 transition-all duration-300" />
        </div>
        {/* Content overlay */}
        <div className="relative h-full flex flex-col justify-end p-0">
          {/* Title - position change on hover */}
          <div
            className="absolute left-0 w-full px-6 z-10 transition-all duration-300"
            style={{ bottom: "1rem" }}
          >
            <h3
              className="text-base md:text-lg font-bold text-white drop-shadow-lg bg-black/40 rounded-b-xl py-2 px-3 w-full transition-all duration-300 group-hover:translate-y-[-5.5rem] group-hover:rounded-t-xl group-hover:rounded-b-none"
              style={{ transition: "transform 0.3s" }}
            >
              {title}
            </h3>
          </div>
          {/* Description - expands on hover */}
          {description && (
            <div className="overflow-hidden relative z-10 px-6 pb-6">
              <div className="transform transition-all duration-300 ease-in-out translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-white/95 text-sm md:text-base leading-relaxed drop-shadow-md pt-2">
                  {description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
