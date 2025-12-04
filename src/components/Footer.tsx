/**
 * Footer Component - Africa Tourism Website Footer
 * Includes links, social media and legal information
 */

import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const footerLinks = {
  about: [
    { name: "About Us", href: "/about" },
    { name: "Our Mission", href: "/about#mission" },
    { name: "Our Team", href: "/about#team" },
  ],
  destinations: [
    { name: "All Destinations", href: "/destinations" },
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
      <div className="container-custom section-spacing">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-block mb-4 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/mylogo.png"
                alt="AfricGuide"
                width={350}
                height={130}
                className="h-28 w-auto object-contain"
              />
            </Link>
            <p className="text-secondary-400 mb-6">
              Discover Africa's hidden treasures. Your comprehensive guide to exploring Algeria, 
              Rwanda, Benin, Libya, and Botswana. Experience the beauty, culture, and diversity of Africa.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-secondary-800 rounded-lg hover:bg-primary-600 transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-secondary-400 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Countries</h3>
            <ul className="space-y-2">
              {footerLinks.destinations.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-secondary-400 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-secondary-400 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="text-secondary-400 hover:text-primary-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-secondary-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-secondary-400 text-sm">
              © {new Date().getFullYear()} AfricGuide. All rights reserved.
            </p>
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-400 hover:text-primary-400 transition-colors text-sm"
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
