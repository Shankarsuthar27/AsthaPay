'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Clock,
  ShieldCheck,
  Building,
  ExternalLink,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const IrctcContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    message: '',
    honeypot: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;

    if (!formData.fullName.trim() || !formData.mobileNumber.trim()) {
      setErrorMessage('Please provide your name and mobile number.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/irctc-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry');
      }

      setSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        mobileNumber: '',
        message: '',
        honeypot: '',
      });
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactNumbers = [
    {
      number: '+91-7023318111',
      label: 'Enquiry on Call',
      href: 'tel:+917023318111',
      isWhatsapp: false,
    },
    {
      number: '+91-7023318111',
      label: 'Enquiry on WhatsApp',
      href: 'https://wa.me/917023318111?text=Hello%20I%20want%20to%20become%20an%20IRCTC%20Authorized%20Agent',
      isWhatsapp: true,
    },
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* 1. Train Background Banner matching reference image */}
      <section className="relative h-64 sm:h-72 md:h-80 w-full overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{
            backgroundImage: "url('/images/irctc-hero-bg.jpg')",
          }}
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/75 to-[#0C2340]/85 backdrop-blur-[1px]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D8232A]/90 text-white text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <span>24x7 Helpdesk & Onboarding</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
            Let&apos;s Get in touch
          </h1>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-slate-200 font-medium max-w-2xl mx-auto leading-relaxed">
            Have a question or need assistance? We are here to help you with anything you need!
          </p>
        </div>
      </section>

      {/* 2. Main 2-Column Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left Column: Enquiry Form + Fast Phone Badges (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-sm transition-all hover:shadow-md">
              {/* Form Title & Subheading matching reference */}
              <div className="mb-6 pb-4 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Enquiry Form
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#D8232A] tracking-tight mt-0.5">
                  Want become an IRCTC Agent?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Fill in your details below and our authorized team will get back to you promptly.
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Enquiry Submitted Successfully!</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out! Our dedicated IRCTC agent onboarding specialist will call you shortly to assist with documentation, verification, and credentials.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-lg bg-[#D8232A] text-white text-xs font-bold hover:bg-[#B71C1C] transition-colors shadow-sm"
                  >
                    Submit Another Enquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot field for bot protection */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Name Field */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                      Your name <span className="text-[#D8232A]">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#D8232A] focus:border-transparent text-slate-900 placeholder-slate-400 text-sm outline-none transition-all bg-slate-50/50 hover:bg-white focus:bg-white"
                    />
                  </div>

                  {/* Email & Mobile Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                        Your email <span className="text-slate-400 text-xs font-normal">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="youremail@gmail.com"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#D8232A] focus:border-transparent text-slate-900 placeholder-slate-400 text-sm outline-none transition-all bg-slate-50/50 hover:bg-white focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                        Your Mobile No. <span className="text-[#D8232A]">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                          +91
                        </span>
                        <input
                          type="tel"
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={handleChange}
                          placeholder="98765 43210"
                          maxLength={10}
                          required
                          className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#D8232A] focus:border-transparent text-slate-900 placeholder-slate-400 text-sm outline-none transition-all bg-slate-50/50 hover:bg-white focus:bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                      Message <span className="text-[#D8232A]">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your requirement or city/state..."
                      rows={4}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#D8232A] focus:border-transparent text-slate-900 placeholder-slate-400 text-sm outline-none transition-all resize-none bg-slate-50/50 hover:bg-white focus:bg-white"
                    />
                  </div>

                  {/* Error Display */}
                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit Button matching reference */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-lg bg-[#D8232A] hover:bg-[#B71C1C] disabled:bg-slate-400 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Submitting enquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Direct Call / WhatsApp badges block matching reference image */}
              <div className="mt-8 pt-8 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                  Direct Enquiry Helplines:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {contactNumbers.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      target={item.isWhatsapp ? '_blank' : undefined}
                      rel={item.isWhatsapp ? 'noopener noreferrer' : undefined}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 ${
                        item.isWhatsapp
                          ? 'bg-emerald-50/70 border-emerald-200 hover:bg-emerald-100/80 text-emerald-900'
                          : 'bg-slate-50 border-slate-200 hover:bg-red-50/60 hover:border-red-200 text-slate-800'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${
                          item.isWhatsapp
                            ? 'bg-[#25D366] text-white'
                            : 'bg-[#D8232A] text-white'
                        }`}
                      >
                        {item.isWhatsapp ? (
                          <MessageCircle className="w-4 h-4" />
                        ) : (
                          <Phone className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-extrabold tracking-tight">
                          {item.number}
                        </span>
                        <span
                          className={`text-[11px] font-semibold ${
                            item.isWhatsapp ? 'text-emerald-700' : 'text-slate-500'
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Location & Email Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Card 1: Location Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 text-[#D8232A] flex items-center justify-center shrink-0 shadow-sm">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">Location</h3>
                  <p className="text-xs font-bold text-[#D8232A] uppercase tracking-wider mt-0.5">
                    AsthaPay / Asthasoft India
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-2 text-slate-700 text-sm leading-relaxed">
                <p className="font-semibold text-slate-900">
                  Address:
                </p>
                <p className="text-slate-800 font-medium text-base">
                  Glitz Cinema Jalore, Jalore, Rajasthan – 343001
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Building className="w-4 h-4 text-slate-400" />
                  <span>Jalore, Rajasthan – 343001</span>
                </div>
                <a
                  href="https://maps.google.com/?q=Glitz+Cinema+Jalore+Rajasthan+343001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8232A] hover:underline"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Card 2: Email Card with exact 4 emails */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 text-[#D8232A] flex items-center justify-center shrink-0 shadow-sm">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">Email</h3>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">
                    Official Departmental Emails
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-2.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                  <span className="font-bold text-slate-500 uppercase tracking-wide text-xs">Admin:</span>
                  <a href="mailto:info@asthasoftindia.com" className="font-bold text-slate-900 hover:text-[#D8232A] transition-colors">
                    info@asthasoftindia.com
                  </a>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                  <span className="font-bold text-slate-500 uppercase tracking-wide text-xs">Sales:</span>
                  <a href="mailto:sales@asthasoftindia.com" className="font-bold text-slate-900 hover:text-[#D8232A] transition-colors">
                    sales@asthasoftindia.com
                  </a>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                  <span className="font-bold text-slate-500 uppercase tracking-wide text-xs">Accounts:</span>
                  <a href="mailto:accounts@asthasoftindia.com" className="font-bold text-slate-900 hover:text-[#D8232A] transition-colors">
                    accounts@asthasoftindia.com
                  </a>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                  <span className="font-bold text-slate-500 uppercase tracking-wide text-xs">Support:</span>
                  <a href="mailto:support@asthasoftindia.com" className="font-bold text-[#D8232A] hover:underline transition-colors">
                    support@asthasoftindia.com
                  </a>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Response time: Usually within 2-4 business hours</span>
                </div>
              </div>
            </div>

            {/* Card 3: Support Hours & Guarantee */}
            <div className="bg-gradient-to-br from-slate-900 to-[#0C2340] text-white rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2.5 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>IRCTC Certified Partner</span>
              </div>
              <h4 className="text-lg font-extrabold text-white">
                Dedicated Relationship Manager
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Every onboarded agent gets assigned a direct support executive for fast training, software setup, and Tatkal booking guidance.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-300 font-medium">
                <span>Working Hours:</span>
                <span className="font-bold text-white">Mon - Sat: 9:30 AM - 6:30 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
