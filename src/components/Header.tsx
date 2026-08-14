/**
 * Header Component - go2africa-inspired site header
 * Countries dropdown menu, nav links, search, and auth button
 */

"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AuthButton from "./AuthButton";
import SearchOverlay from "./SearchOverlay";
import { cn } from "@/lib/utils";

// ─── Countries structured like go2africa dropdown ───────────────────────────
const countriesDropdown = {
  "North Africa": [
    { name: "Morocco", slug: "morocco" },
    { name: "Algeria", slug: "algerie" },
    { name: "Egypt", slug: "egypt" },
    { name: "Libya", slug: "libya" },
  ],
  "East Africa": [
    { name: "Kenya", slug: "kenya" },
    { name: "Rwanda", slug: "rwanda" },
    { name: "Malawi", slug: "malawi" },
    { name: "Zambia", slug: "zambia" },
  ],
  "Southern Africa": [
    { name: "Botswana", slug: "botswana" },
    { name: "Zimbabwe", slug: "zimbabwi" },
  ],
  "West Africa": [
    { name: "Benin", slug: "benin" },
    { name: "Mali", slug: "mali" },
  ],
};

const navigation = [
  { name: "Home", href: "/" },
  { name: "Experiences", href: "/experiences" },
  { name: "Directory", href: "/directory" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

// ─── About Dropdown Data ─────────────────────────────────────────────────────
const aboutDropdown = [
  { name: "Our Stories", slug: "stories" },
  { name: "Why Travel With Us", slug: "why-us" },
  { name: "Our Team", slug: "team" },
];

// ─── Countries Dropdown Component ────────────────────────────────────────────
function CountriesDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1.5 text-sm font-medium transition-colors focus:outline-none",
          open
            ? "text-primary-600"
            : "text-secondary-700 hover:text-primary-600"
        )}
        aria-expanded={open}
        aria-haspopup="true"
        id="countries-menu-btn"
      >
        Destinations
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[640px] bg-white rounded-2xl shadow-2xl border border-secondary-100 z-50 overflow-hidden"
            role="menu"
            aria-labelledby="countries-menu-btn"
          >
            {/* Dropdown header */}
            <div className="px-6 pt-5 pb-3 border-b border-secondary-100">
              <p className="font-display text-lg font-bold text-secondary-900">
                Explore Africa
              </p>
              <p className="text-xs text-secondary-500 mt-0.5">
                Browse destinations by region
              </p>
            </div>

            {/* Columns grid */}
            <div className="grid grid-cols-4 gap-0 p-4">
              {Object.entries(countriesDropdown).map(([region, countries]) => (
                <div key={region} className="px-3 py-2">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-secondary-400 mb-3">
                    {region}
                  </p>
                  <ul className="space-y-1.5">
                    {countries.map((country) => (
                      <li key={country.slug}>
                        <Link
                          href={`/destinations?country=${country.slug}`}
                          onClick={() => setOpen(false)}
                          className="block text-sm text-secondary-700 hover:text-primary-600 font-medium transition-colors py-0.5 rounded hover:pl-1 duration-150"
                          role="menuitem"
                        >
                          {country.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Footer CTA */}
            <div className="px-6 py-3 bg-secondary-50 border-t border-secondary-100 flex items-center justify-between">
              <p className="text-xs text-secondary-500">
                Discover all 54 African countries
              </p>
              <Link
                href="/destinations"
                onClick={() => setOpen(false)}
                className="text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors flex items-center gap-1"
              >
                View all destinations →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── About Dropdown Component ────────────────────────────────────────────────
function AboutDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1.5 text-sm font-medium transition-colors focus:outline-none",
          open ? "text-primary-600" : "text-secondary-700 hover:text-primary-600"
        )}
        aria-expanded={open}
        aria-haspopup="true"
        id="about-menu-btn"
      >
        About Us
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 bg-white rounded-xl shadow-xl border border-secondary-100 z-50 overflow-hidden"
            role="menu"
            aria-labelledby="about-menu-btn"
          >
            <div className="py-2">
              <ul className="space-y-1 px-2">
                {aboutDropdown.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/about/${item.slug}`}
                      onClick={() => setOpen(false)}
                      className="block text-sm text-secondary-700 hover:text-primary-600 hover:bg-secondary-50 font-medium transition-colors py-2 px-3 rounded-md"
                      role="menuitem"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Header ─────────────────────────────────────────────────────────────
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileCountriesOpen, setMobileCountriesOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white shadow-sm border-b border-secondary-200">
        <nav className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center hover:opacity-80 transition-opacity flex-shrink-0"
            >
              <Image
                src="/mylogo.png"
                alt="AfricGuide"
                width={350}
                height={130}
                className="h-16 md:h-20 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-7">
              {/* Countries Dropdown */}
              <CountriesDropdown />
              
              {/* About Dropdown */}
              <AboutDropdown />

              {/* Other nav links */}
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors",
                      isActive
                        ? "text-primary-600 border-b-2 border-primary-600 pb-0.5"
                        : "text-secondary-700 hover:text-primary-600"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-secondary-700 hover:text-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Auth Button */}
              <div className="hidden sm:block">
                <AuthButton />
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-secondary-700 hover:text-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden border-t border-secondary-200 overflow-hidden"
              >
                <div className="py-4 space-y-1">
                  {/* Mobile: Countries accordion */}
                  <div>
                    <button
                      onClick={() => setMobileCountriesOpen((v) => !v)}
                      className="flex items-center justify-between w-full text-base font-medium text-secondary-700 py-2 px-1 hover:text-primary-600 transition-colors"
                    >
                      Destinations
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          mobileCountriesOpen && "rotate-180"
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileCountriesOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 pt-1 pb-2 space-y-3">
                            {Object.entries(countriesDropdown).map(
                              ([region, countries]) => (
                                <div key={region}>
                                  <p className="text-[11px] font-bold uppercase tracking-widest text-secondary-400 mb-1">
                                    {region}
                                  </p>
                                  <div className="space-y-0.5">
                                    {countries.map((country) => (
                                      <Link
                                        key={country.slug}
                                        href={`/destinations?country=${country.slug}`}
                                        onClick={() => {
                                          setMobileMenuOpen(false);
                                          setMobileCountriesOpen(false);
                                        }}
                                        className="block text-sm text-secondary-600 hover:text-primary-600 py-1 transition-colors"
                                      >
                                        {country.name}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              )
                            )}
                            <Link
                              href="/destinations"
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setMobileCountriesOpen(false);
                              }}
                              className="inline-block text-sm font-semibold text-primary-600 mt-1"
                            >
                              View all →
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Mobile: About accordion */}
                  <div>
                    <button
                      onClick={() => setMobileAboutOpen((v) => !v)}
                      className="flex items-center justify-between w-full text-base font-medium text-secondary-700 py-2 px-1 hover:text-primary-600 transition-colors"
                    >
                      About Us
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          mobileAboutOpen && "rotate-180"
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileAboutOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 pt-1 pb-2 space-y-2">
                            {aboutDropdown.map((item) => (
                              <Link
                                key={item.slug}
                                href={`/about/${item.slug}`}
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setMobileAboutOpen(false);
                                }}
                                className="block text-sm text-secondary-600 hover:text-primary-600 py-1 transition-colors"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Other mobile nav links */}
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "block text-base font-medium transition-colors py-2 px-1",
                          isActive
                            ? "text-primary-600"
                            : "text-secondary-700 hover:text-primary-600"
                        )}
                      >
                        {item.name}
                      </Link>
                    );
                  })}

                  <div className="pt-3 border-t border-secondary-200">
                    <AuthButton />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
