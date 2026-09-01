/**
 * Footer Component - Africa Tourism Website Footer
 * Multi-column link layout inspired by go2africa, using platform content
 */

import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from "lucide-react";

// ── Column link data ──────────────────────────────────────────────────────────
const footerColumns = [
  {
    title: "Explore AfricGuide",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Our Stories", href: "/about/stories" },
      { name: "Why Travel With Us", href: "/about/why-us" },
      { name: "Our Team", href: "/about/team" },
      { name: "Travel Blog", href: "/blog" },
      { name: "African Directory", href: "/directory" },
      { name: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Destinations",
    links: [
      { name: "All Destinations", href: "/destinations" },
      { name: "Morocco", href: "/destinations?country=morocco" },
      { name: "Egypt", href: "/destinations?country=egypt" },
      { name: "Kenya", href: "/destinations?country=kenya" },
      { name: "Rwanda", href: "/destinations?country=rwanda" },
      { name: "Botswana", href: "/destinations?country=botswana" },
      { name: "Algeria", href: "/destinations?country=algerie" },
      { name: "Benin", href: "/destinations?country=benin" },
      { name: "Zambia", href: "/destinations?country=zambia" },
      { name: "Malawi", href: "/destinations?country=malawi" },
      { name: "Zimbabwe", href: "/destinations?country=zimbabwi" },
      { name: "Mali", href: "/destinations?country=mali" },
    ],
  },
  {
    title: "Experiences",
    links: [
      { name: "All Experiences", href: "/experiences" },
      { name: "Safari & Wildlife", href: "/experiences?category=safari" },
      { name: "Culture & Heritage", href: "/experiences?category=culture" },
      { name: "Beaches & Islands", href: "/experiences?category=beaches" },
      { name: "Adventure & Outdoors", href: "/experiences?category=adventure" },
    ],
  },
  {
    title: "Travel Blog",
    links: [
      { name: "All Articles", href: "/blog" },
      { name: "Family Safari Stories", href: "/blog" },
      { name: "Wildlife Guides", href: "/blog" },
      { name: "South Africa Vistas", href: "/blog" },
      { name: "Adventure Convoys", href: "/blog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "African Directory", href: "/directory" },
      { name: "Privacy Policy", href: "/PDF/Privacy Policy for AfricGuide.pdf" },
      { name: "Terms of Service", href: "/PDF/Terms of Service \u2013 AfricGuide.pdf" },
      { name: "Contact Us", href: "/contact" },
    ],
  },
];

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

      {/* ── Brand strip ── */}
      <div className="border-b border-white/10">
        <div className="container-custom px-4 md:px-6 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="inline-block hover:opacity-80 transition-opacity flex-shrink-0">
            <Image
              src="/mylogo.png"
              alt="AfricGuide"
              width={220}
              height={80}
              className="h-16 w-auto object-contain"
            />
          </Link>

          {/* Contact + Social */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start sm:items-center">
            <div className="space-y-1.5">
              <a
                href="mailto:info@africguide.com"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
              >
                <Mail className="w-4 h-4 text-primary-400 flex-shrink-0" />
                info@africguide.com
              </a>
              <a
                href="tel:+441412616508"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
              >
                <Phone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                +44 141 261 6508
              </a>
            </div>

            {/* Social icons */}
            <div className="flex gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 rounded-md hover:bg-primary-600 transition-all duration-200 hover:scale-105"
                    aria-label={social.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Multi-column link grid ── */}
      <div className="container-custom px-4 md:px-6 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-bold text-white mb-4">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href + link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-150 leading-relaxed"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="container-custom px-4 md:px-6 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-white/40 text-xs">
              © {new Date().getFullYear()} AfricGuide. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <Link
                href="/PDF/Privacy Policy for AfricGuide.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white/70 transition-colors text-xs"
              >
                Privacy Policy
              </Link>
              <Link
                href="/PDF/Terms of Service – AfricGuide.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white/70 transition-colors text-xs"
              >
                Terms of Service
              </Link>
              <Link
                href="/contact"
                className="text-white/40 hover:text-white/70 transition-colors text-xs"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
