'use client';

import React from 'react';
import Link from 'next/link';
import { Train, Phone, Mail, MapPin, MessageCircle, ShieldCheck } from 'lucide-react';

export const IrctcFooter: React.FC = () => {
  return (
    <>
      <footer id="contact-info" className="bg-[#0A1931] text-slate-400 pt-14 pb-12 text-xs sm:text-[13px] border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-slate-800">
            {/* Column 1: Brand & Credentials (4 cols) */}
            <div className="lg:col-span-4 space-y-4 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0C2340] to-[#1E3A8A] flex items-center justify-center text-white border border-blue-800">
                  <Train className="w-5 h-5 text-[#FF5733]" />
                </div>
                <div className="flex items-center tracking-tight leading-none gap-1.5">
                  <span className="text-2xl font-black italic text-[#D8232A]">Asthasoft</span>
                  <span className="text-2xl font-black italic text-white">IRCTC</span>
                </div>
              </div>

              <p className="text-slate-300 leading-relaxed text-xs">
                Official IRCTC Principal Service Provider (PSP) sub-agent gateway partner. Powering 50,000+ travel agents, retail merchants, and cyber cafes with authorized rail ticketing infrastructure.
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800/90 text-emerald-400 text-[11px] font-bold border border-slate-700">
                  <ShieldCheck className="w-3.5 h-3.5" /> IRCTC PSP Verified
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800/90 text-blue-400 text-[11px] font-bold border border-slate-700">
                  ISO 27001 Certified
                </span>
              </div>
            </div>

            {/* Column 2: Quick Links (3 cols) */}
            <div className="lg:col-span-3 space-y-3 text-left">
              <h4 className="text-sm font-black text-white tracking-wider border-b border-slate-800 pb-2">
                Quick Links
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li>
                  <Link href="/irctc/contact" className="hover:text-[#D8232A] transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/irctc/about" className="hover:text-[#D8232A] transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/#privacy" className="hover:text-[#D8232A] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/#terms" className="hover:text-[#D8232A] transition-colors">
                    Terms and Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/#refund" className="hover:text-[#D8232A] transition-colors">
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link href="/#grievance" className="hover:text-[#D8232A] transition-colors">
                    Grievance Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Corporate Support & Contacts (5 cols) */}
            <div className="lg:col-span-5 space-y-2.5 text-left">
              <h4 className="text-sm font-black text-white tracking-wider">
                ASTHAPAY / ASTHASOFT INDIA
              </h4>

              <div className="space-y-2 text-xs text-slate-300 pt-1">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#D8232A] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    <strong className="text-white">Address:</strong> Glitz Cinema Jalore, Jalore, Rajasthan – 343001
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#D8232A] shrink-0" />
                  <a href="tel:+917023318111" className="hover:text-white font-bold transition-colors">
                    +91-7023318111 <span className="text-[10px] text-slate-400 font-normal">(Enquiry on Call)</span>
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a
                    href="https://wa.me/917023318111?text=Hello%20I%20want%20to%20become%20an%20IRCTC%20Authorized%20Agent"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-300 font-bold transition-colors"
                  >
                    +91-7023318111 <span className="text-[10px] text-emerald-400 font-normal">(Enquiry on WhatsApp)</span>
                  </a>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Mail className="w-4 h-4 text-[#D8232A] shrink-0" />
                  <span className="text-slate-400">Admin:</span>
                  <a href="mailto:info@asthasoftindia.com" className="hover:text-white font-medium transition-colors">
                    info@asthasoftindia.com
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#D8232A] shrink-0" />
                  <span className="text-slate-400">Sales:</span>
                  <a href="mailto:sales@asthasoftindia.com" className="hover:text-white font-medium transition-colors">
                    sales@asthasoftindia.com
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#D8232A] shrink-0" />
                  <span className="text-slate-400">Accounts:</span>
                  <a href="mailto:accounts@asthasoftindia.com" className="hover:text-white font-medium transition-colors">
                    accounts@asthasoftindia.com
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#D8232A] shrink-0" />
                  <span className="text-slate-400">Support:</span>
                  <a href="mailto:support@asthasoftindia.com" className="hover:text-white font-medium transition-colors">
                    support@asthasoftindia.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Red Bottom Bar */}
      <div className="bg-[#D8232A] text-white py-3 px-4 text-center text-xs font-semibold tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()}. AsthaPay / Asthasoft India. All Rights Reserved.</span>
          <span className="text-[11px] opacity-90">100% Authorized IRCTC PSP Gateway Partner</span>
        </div>
      </div>

      {/* Floating WhatsApp Action Button on Bottom Right */}
      <a
        href="https://wa.me/917023318111?text=Hello%20I%20want%20to%20become%20an%20IRCTC%20Authorized%20Agent"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer group"
      >
        <MessageCircle className="w-7 h-7 fill-white text-white" />
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat on WhatsApp
        </span>
      </a>
    </>
  );
};
