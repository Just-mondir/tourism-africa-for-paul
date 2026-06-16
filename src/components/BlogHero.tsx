/**
 * BlogHero Component - Hero section for Blog page
 * Re-designed to be premium and modern, matching the Swiss Tour layout with large typography and clean actions.
 */

"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function BlogHero() {
  return (
    <section className="relative min-h-[600px] md:min-h-[750px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1549366021-9f761d450615?q=95&w=1920&auto=format&fit=crop"
          alt="African Scenic Landscape"
          fill
          className="object-cover object-center scale-105"
          priority
          quality={95}
        />
        {/* Soft, deep overlay matching the premium blue/dark tone of the header and fading beautifully */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/80 via-transparent to-black/45" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 w-full">
        <div className="flex flex-col items-center text-center justify-center pt-20">
          {/* Kicker Category Tag */}
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xs md:text-sm font-bold tracking-[0.3em] text-orange-500 uppercase mb-3 bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/20 backdrop-blur-sm"
          >
            The Travel Blog
          </motion.span>

          {/* Main Massive Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-[14vw] md:text-[9vw] lg:text-[8vw] font-black text-white tracking-[0.18em] uppercase leading-none select-none font-sans drop-shadow-2xl opacity-90 mr-[-0.18em]"
          >
            EXPLORE
          </motion.h1>

          {/* Secondary Title with Sunset Orange Gradient */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-[0.12em] uppercase mt-2 drop-shadow-xl bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400"
          >
            AFRICA
          </motion.h2>

          {/* Subtitle / Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-sm md:text-lg lg:text-xl text-white/90 font-medium tracking-wide mt-4 mb-10 max-w-xl md:max-w-2xl drop-shadow-md px-4 leading-relaxed"
          >
            Stories, tips, and cultural insights from the heart of the continent.
          </motion.p>

          {/* Interactive Rounded Action Button */}
          <motion.a
            href="#blog-content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="group flex items-center gap-4 bg-white hover:bg-neutral-50 text-neutral-900 font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            <span className="tracking-wide text-sm md:text-base">Read Our Travel Stories</span>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-900/5 text-neutral-900 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2.5} 
                stroke="currentColor" 
                className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}


