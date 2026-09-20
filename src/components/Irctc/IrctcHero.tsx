'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Phone, MessageCircle, ArrowRight, Loader2, CheckCircle2, ShieldCheck } from 'lucide-react';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi NCR', 'Jammu & Kashmir', 'Ladakh'
];

export const IrctcHero: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    state: '',
    message: '',
    honeypot: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

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
        state: '',
        message: '',
        honeypot: '',
      });
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-[640px] lg:min-h-[720px] overflow-hidden flex items-center bg-slate-900">
      {/* Scenic Indian Railways Train Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/irctc-hero-bg.jpg')` }}
      >
        {/* Dark Gradient Overlay for optimal contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30 lg:from-black/85 lg:via-black/50 lg:to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Hero Content & Key USPs */}
          <div className="lg:col-span-7 text-white space-y-6 text-left">
            {/* Green Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 text-xs sm:text-sm font-bold tracking-wide">
              <span>●</span>
              <span>IRCTC Agent Registration</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-black tracking-tight leading-[1.1] text-white drop-shadow-md">
              Become an <span className="text-[#38BDF8]">IRCTC Agent</span>
            </h1>

            {/* Checklist items with green checkmarks matching reference */}
            <ul className="space-y-3 pt-1 text-sm sm:text-base font-semibold text-slate-100 max-w-xl">
              {[
                'Low cost Agent Registration Charges',
                'Earn ₹20 to ₹40 on every rail ticket',
                '100% Legal & Safe Authorized PSP',
                'Book unlimited Tatkal & General Tickets',
                'Fast Direct Support & Dedicated Relationship Manager',
                'Easy fast portal support on WhatsApp, Call and Ticket',
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/90 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="drop-shadow-sm">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href="#enquiry"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-600/30 hover:shadow-xl transition-all duration-300 active:scale-95"
              >
                <span>Register Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Floating Enquiry Form matching reference */}
          <div id="enquiry" className="lg:col-span-5 scroll-mt-28">
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-slate-200/90 text-slate-800 relative">
              {/* Form Title */}
              <div className="mb-5 pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Enquiry Form
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#D8232A] tracking-tight mt-0.5">
                  Want to become an IRCTC Agent?
                </h2>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 text-center space-y-3"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Enquiry Received!</h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-xs mx-auto leading-relaxed">
                    Thank you! Our dedicated IRCTC onboarding specialist will call you shortly to assist with your agent ID creation.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-3 text-xs font-bold text-[#D8232A] hover:underline"
                  >
                    Submit another response
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {errorMessage && (
                    <div className="p-2.5 rounded-lg bg-rose-50 text-rose-600 text-xs font-semibold border border-rose-200">
                      {errorMessage}
                    </div>
                  )}

                  {/* Full Name */}
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name *"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#D8232A] focus:border-transparent transition-all placeholder:text-slate-400"
                    />
                  </div>

                  {/* Email Id */}
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Id *"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#D8232A] focus:border-transparent transition-all placeholder:text-slate-400"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <input
                      type="tel"
                      name="mobileNumber"
                      placeholder="Mobile Number *"
                      required
                      maxLength={10}
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#D8232A] focus:border-transparent transition-all placeholder:text-slate-400"
                    />
                  </div>

                  {/* State Dropdown */}
                  <div>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#D8232A] focus:border-transparent transition-all text-slate-700 bg-white"
                    >
                      <option value="">Select State</option>
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <textarea
                      name="message"
                      rows={2}
                      placeholder="Message (Optional)"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#D8232A] focus:border-transparent transition-all placeholder:text-slate-400 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-[#D8232A] to-[#EF4444] text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-98 disabled:opacity-70 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <span>Submit Enquiry</span>
                    )}
                  </button>
                </form>
              )}

              {/* Bottom Quick Contact Strip matching reference */}
              <div className="grid grid-cols-2 gap-2 mt-5 pt-4 border-t border-slate-100 text-[11px] font-semibold text-slate-700">
                <a
                  href="tel:+917023318111"
                  className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-colors"
                >
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Phone className="w-3 h-3" />
                  </div>
                  <div className="flex flex-col text-left truncate">
                    <span className="text-[10px] text-slate-500 font-normal">Direct Call</span>
                    <span className="font-bold text-slate-900 truncate">+91-7023318111</span>
                  </div>
                </a>

                <a
                  href="https://wa.me/917023318111?text=Hello%20I%20want%20to%20become%20an%20IRCTC%20Authorized%20Agent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 transition-colors"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                    <MessageCircle className="w-3 h-3" />
                  </div>
                  <div className="flex flex-col text-left truncate">
                    <span className="text-[10px] text-emerald-700 font-normal">WhatsApp</span>
                    <span className="font-bold text-emerald-900 truncate">+91-7023318111</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
