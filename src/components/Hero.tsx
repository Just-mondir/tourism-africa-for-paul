/**
 * Hero Component - Homepage hero section for Africa Tourism
 * Uses background image from assets folder
 */

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import heroImage from "@/assets/hero.jpg";

export default function Hero() {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="African landscape"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg"
          >
            Discover{" "}
            <span className="text-primary-400">Africa's</span> Hidden Treasures
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed drop-shadow-md"
          >
            Explore breathtaking destinations across Algeria, Rwanda, Benin, Libya, and Botswana. 
            From ancient wonders to vibrant cultures, discover the beauty and diversity of Africa.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/destinations"
              className="btn-primary inline-flex items-center justify-center gap-2 text-center bg-primary-500 hover:bg-primary-600 text-white shadow-lg"
            >
              Explore Destinations
              <MapPin className="w-5 h-5" />
            </Link>
            <Link
              href="/directory"
              className="bg-white/90 hover:bg-white text-secondary-900 px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2 text-center shadow-lg"
            >
              African Directory
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
