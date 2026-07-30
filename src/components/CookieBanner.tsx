"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem("africguide_cookies_accepted");
    if (!hasAccepted) {
      // Small delay so it doesn't pop up instantly jarring the user
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("africguide_cookies_accepted", "true");
    setShowBanner(false);
  };

  const declineCookies = () => {
    // Usually you might store a 'declined' state, or just hide the banner for this session
    sessionStorage.setItem("africguide_cookies_declined", "true");
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-md border border-secondary-200 shadow-2xl rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-secondary-900 mb-2 font-display">
                We value your privacy
              </h3>
              <p className="text-sm text-secondary-600 leading-relaxed">
                We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. 
                Read our <Link href="/cookies" className="text-primary-600 hover:underline">Cookie Policy</Link> for more information.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              <button
                onClick={declineCookies}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-secondary-300 text-secondary-700 font-medium hover:bg-secondary-50 transition-colors"
              >
                Decline
              </button>
              <button
                onClick={acceptCookies}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 shadow-lg hover:shadow-xl transition-all"
              >
                Accept All
              </button>
              
              <button 
                onClick={() => setShowBanner(false)}
                className="absolute top-4 right-4 md:hidden text-secondary-400 hover:text-secondary-600"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
