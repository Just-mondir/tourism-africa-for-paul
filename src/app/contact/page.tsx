/**
 * Contact Page - Africa Tourism Website
 * Contact form with validation and Supabase submission
 */

"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import Modal from "@/components/Modal";
import { createClient } from "@/lib/supabase/client";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const supabase = createClient();

      // Insert message into contact_messages table
      const { error } = await supabase.from("contact_messages").insert([
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        },
      ]);

      if (error) {
        throw error;
      }

      // Reset form
      setFormData({ name: "", email: "", message: "" });
      setShowSuccessModal(true);
    } catch (error: unknown) {
      console.error("Error sending message:", error);
      const errorMsg =
        error instanceof Error ? error.message : "An error occurred.";
      setErrorMessage(errorMsg);
      setShowErrorModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="section-spacing bg-white">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Have a question or suggestion about African destinations? We're here to help. 
            Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Mail className="w-5 h-5 text-primary-600" />
                <h3 className="font-semibold text-secondary-900">Email</h3>
              </div>
              <p className="text-secondary-600">contact@africa-tourism.com</p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <Phone className="w-5 h-5 text-primary-600" />
                <h3 className="font-semibold text-secondary-900">Phone</h3>
              </div>
              <p className="text-secondary-600">+1 (555) 123-4567</p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-5 h-5 text-primary-600" />
                <h3 className="font-semibold text-secondary-900">Address</h3>
              </div>
              <p className="text-secondary-600">
                Africa Tourism Platform
                <br />
                Contact us via email
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="bg-secondary-50 rounded-xl p-8 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-secondary-900 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-secondary-900 mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-secondary-900 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  placeholder="Your message about African destinations..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Message Sent!"
        size="sm"
      >
        <p className="text-secondary-700">
          Thank you for your message. We'll get back to you as soon as possible.
        </p>
        <button
          onClick={() => setShowSuccessModal(false)}
          className="mt-6 btn-primary w-full"
        >
          Close
        </button>
      </Modal>

      {/* Error Modal */}
      <Modal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Error"
        size="sm"
      >
        <p className="text-red-600 mb-4">
          An error occurred while sending your message.
        </p>
        {errorMessage && (
          <p className="text-sm text-secondary-600 mb-4">{errorMessage}</p>
        )}
        <p className="text-sm text-secondary-600 mb-6">
          Please try again or contact us directly by email.
        </p>
        <button
          onClick={() => setShowErrorModal(false)}
          className="btn-primary w-full"
        >
          Close
        </button>
      </Modal>
    </div>
  );
}
