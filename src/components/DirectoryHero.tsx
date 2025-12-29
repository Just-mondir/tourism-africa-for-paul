/**
 * DirectoryHero Component - Hero section for African Directory page
 * Uses background image from public folder
 */

"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function DirectoryHero() {
  return (
    <section className="relative min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/DirectoryHero.jpg"
          alt="African Directory Hero"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight drop-shadow-lg"
          >
            African{" "}
            <span className="text-primary-400">Directory</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-white/90 leading-relaxed drop-shadow-md"
          >
            Discover businesses, services, and establishments across Africa. 
            From restaurants to hotels, find everything you need for your African adventure.
          </motion.p>
        </div>
      </div>
    </section>
  );
}






