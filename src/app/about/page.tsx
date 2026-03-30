/**
 * About Page - Africa Tourism Website
 * Information about the platform and mission
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Africa Tourism",
  description: "Learn about our mission to showcase the beauty and diversity of African destinations.",
};

export default function AboutPage() {
  return (
    <div className="section-spacing bg-white">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-8">
          About Africa Tourism
        </h1>

        <div className="prose prose-lg max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              Our Mission
            </h2>
            <p className="text-secondary-700 leading-relaxed">
              Africa Tourism was born from a passion for showcasing the incredible diversity and 
              beauty of the African continent. Our mission is to inspire travelers to discover 
              the hidden treasures of Algeria, Rwanda, Benin, Libya, and Botswana, celebrating 
              the rich cultures, stunning landscapes, and unique experiences that Africa has to offer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              What We Offer
            </h2>
            <ul className="list-disc list-inside space-y-2 text-secondary-700">
              <li>
                <strong>Comprehensive Destination Guides:</strong> Explore detailed information 
                about places across Algeria, Rwanda, Benin, Libya, and Botswana
              </li>
              <li>
                <strong>African Business Directory:</strong> Discover local businesses, services, 
                and establishments to enhance your African journey
              </li>
              <li>
                <strong>Travel Resources:</strong> Access travel guides, tips, and cultural 
                insights to make your African adventure unforgettable
              </li>
              <li>
                <strong>Community Platform:</strong> Connect with fellow travelers passionate 
                about exploring Africa
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              Our Focus Countries
            </h2>
            <p className="text-secondary-700 leading-relaxed mb-4">
              We specialize in showcasing destinations across five beautiful African countries:
            </p>
            <ul className="list-disc list-inside space-y-2 text-secondary-700">
              <li><strong>Algeria</strong> - Rich history, diverse landscapes, and cultural heritage</li>
              <li><strong>Rwanda</strong> - Land of a thousand hills, wildlife, and vibrant culture</li>
              <li><strong>Benin</strong> - Historical significance and West African traditions</li>
              <li><strong>Libya</strong> - Ancient ruins and Mediterranean beauty</li>
              <li><strong>Botswana</strong> - Wildlife paradise and natural wonders</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              Contact Us
            </h2>
            <p className="text-secondary-700 leading-relaxed">
              Have questions or suggestions? We'd love to hear from you. Please reach out through 
              our{" "}
              <a href="/contact" className="text-primary-600 hover:underline">
                contact form
              </a>
              {" "}and we'll get back to you as soon as possible.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
