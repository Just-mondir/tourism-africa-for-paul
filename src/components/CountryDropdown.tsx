/**
 * CountryDropdown — searchable dropdown replacing the old filter buttons.
 * Client component that navigates via router on selection change.
 */

"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown, X } from "lucide-react";

interface Country {
  slug: string;
  name: string;
}

interface CountryDropdownProps {
  countries: Country[];
  currentCountry: string;
}

export default function CountryDropdown({
  countries,
  currentCountry,
}: CountryDropdownProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentLabel =
    countries.find((c) => c.slug === currentCountry)?.name || "All Countries";

  const filtered = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-focus search when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const select = (slug: string) => {
    setIsOpen(false);
    setSearch("");
    if (slug) {
      router.push(`/destinations?country=${slug}`);
    } else {
      router.push("/destinations");
    }
  };

  return (
    <div ref={dropdownRef} className="relative w-full max-w-xs">
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-2 px-4 py-3 bg-white border border-secondary-200 rounded-xl text-secondary-900 font-medium shadow-sm hover:border-primary-400 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate">{currentLabel}</span>
        <ChevronDown
          className={`w-4 h-4 text-secondary-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Clear filter pill */}
      {currentCountry && (
        <button
          onClick={() => select("")}
          className="absolute -top-2 -right-2 p-1 bg-primary-500 text-white rounded-full shadow hover:bg-primary-600 transition-colors"
          aria-label="Clear filter"
        >
          <X className="w-3 h-3" />
        </button>
      )}

      {/* Dropdown panel */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-secondary-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Search input */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-secondary-100">
            <Search className="w-4 h-4 text-secondary-400 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search countries…"
              className="w-full bg-transparent text-sm text-secondary-900 placeholder:text-secondary-400 focus:outline-none"
            />
          </div>

          {/* Options list */}
          <ul
            className="max-h-60 overflow-y-auto py-1"
            role="listbox"
            aria-label="Country filter"
          >
            {/* All Countries option */}
            <li
              role="option"
              aria-selected={!currentCountry}
              onClick={() => select("")}
              className={`px-4 py-2.5 cursor-pointer text-sm transition-colors ${
                !currentCountry
                  ? "bg-primary-50 text-primary-700 font-semibold"
                  : "text-secondary-700 hover:bg-secondary-50"
              }`}
            >
              All Countries
            </li>

            {filtered.length === 0 && (
              <li className="px-4 py-3 text-sm text-secondary-400 text-center">
                No countries found
              </li>
            )}

            {filtered.map((country) => (
              <li
                key={country.slug}
                role="option"
                aria-selected={currentCountry === country.slug}
                onClick={() => select(country.slug)}
                className={`px-4 py-2.5 cursor-pointer text-sm transition-colors ${
                  currentCountry === country.slug
                    ? "bg-primary-50 text-primary-700 font-semibold"
                    : "text-secondary-700 hover:bg-secondary-50"
                }`}
              >
                {country.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
