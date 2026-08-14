/**
 * Footer Component - Africa Tourism Website Footer
 * Redesigned with improved spacing, hierarchy, and visual consistency
 */

import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from "lucide-react";

const footerLinks = {
  about: [
    { name: "About Us", href: "/about" },
    { name: "Our Mission", href: "/about#mission" },
    { name: "Our Team", href: "/about#team" },
  ],
  destinations: [
    { name: "All Destinations", href: "/destinations" },
    { name: "All Experiences", href: "/experiences" },
    { name: "Algeria", href: "/destinations?country=algeria" },
    { name: "Rwanda", href: "/destinations?country=rwanda" },
    { name: "Benin", href: "/destinations?country=benin" },
    { name: "Libya", href: "/destinations?country=libya" },
    { name: "Botswana", href: "/destinations?country=botswana" },
  ],
  resources: [
    { name: "African Directory", href: "/directory" },
    { name: "Travel Guide", href: "/blog" },
    { name: "FAQ", href: "/faq" },
    { name: "Travel Tips", href: "/tips" },
    { name: "Contact Us", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/PDF/Privacy Policy for AfricGuide.pdf" },
    { name: "Terms of Service", href: "/PDF/Terms of Service – AfricGuide.pdf" },
    { name: "Cookies", href: "/cookies" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-secondary-900 text-white">
      {/* ── Top accent bar ── */}
      <div className="h-1 bg-gradient-to-r from-primary-500 via-accent to-primary-600" />

      {/* ── Main footer content ── */}
      <div className="container-custom pt-16 pb-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Logo & Description — spans 4 cols */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-block mb-6 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/mylogo.png"
                alt="AfricGuide"
                width={280}
                height={100}
                className="h-20 w-auto object-contain"
              />
            </Link>
            <p className="text-secondary-400 leading-relaxed mb-6 text-sm">
              Your comprehensive guide to exploring the beauty, culture, and
              diversity of Africa. From ancient wonders to vibrant cities,
              pristine beaches to thrilling safaris — discover every corner of
              the continent.
            </p>

            {/* Contact quick links */}
            <div className="space-y-2 mb-6">
              <a
                href="mailto:contact@africguide.com"
                className="flex items-center gap-2 text-secondary-400 hover:text-primary-400 transition-colors text-sm"
              >
                <Mail className="w-4 h-4 text-primary-500" />
                contact@africguide.com
              </a>
              <a
                href="tel:+441412616508"
                className="flex items-center gap-2 text-secondary-400 hover:text-primary-400 transition-colors text-sm"
              >
                <Phone className="w-4 h-4 text-primary-500" />
                +44 141 261 6508
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-secondary-800 rounded-lg hover:bg-primary-600 transition-all duration-200 hover:scale-105"
                    aria-label={social.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* About — spans 2 cols */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-white mb-5 pb-2 border-b border-secondary-700">
              About
            </h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-secondary-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore — spans 3 cols */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-white mb-5 pb-2 border-b border-secondary-700">
              Explore
            </h3>
            <ul className="space-y-3 columns-1 sm:columns-2 lg:columns-1">
              {footerLinks.destinations.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-secondary-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources — spans 3 cols */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-white mb-5 pb-2 border-b border-secondary-700">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-secondary-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-secondary-800">
        <div className="container-custom px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-secondary-500 text-xs">
              © {new Date().getFullYear()} AfricGuide. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-500 hover:text-primary-400 transition-colors text-xs"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
