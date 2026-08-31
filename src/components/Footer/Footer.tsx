'use client';

import React from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { footerSections } from '@/data/navigationData';
import { ShieldCheck, Phone, Mail, MapPin, ExternalLink, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-brand-navy-dark text-slate-400 pt-16 pb-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid: Company Info + 6 Link Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Left Column: Brand & Corporate Details (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <BrandLogo variant="dark" size="lg" />

            <p className="text-slate-300 leading-relaxed text-xs">
              AsthaPay powers 50,000+ retail banking agents and ₹5,000+ Cr in monthly volume with turnkey white-label and API infrastructure.
            </p>

            {/* Compliance Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-emerald-400 text-[11px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" /> PCI-DSS Level 1
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-blue-400 text-[11px] font-bold">
                <Lock className="w-3.5 h-3.5" /> ISO 27001
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-amber-400 text-[11px] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> NPCI Registered
              </span>
            </div>

            {/* Contact & Corporate Office */}
            <div className="space-y-2.5 pt-2 text-slate-400 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-coral shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200">HQ:</strong> DLF Cyber City, Phase III, Gurugram, Haryana - 122002
                </div>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-brand-coral shrink-0" />
                <a href="tel:+918001234567" className="text-slate-200 hover:text-brand-coral font-bold transition-colors">
                  +91 1800 123 4567
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-coral shrink-0" />
                <a href="mailto:support@asthapay.in" className="text-slate-200 hover:text-brand-coral transition-colors">
                  support@asthapay.in
                </a>
              </div>
            </div>
          </div>

          {/* Right Columns: Multi-Column Platform & Quick Links (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerSections.map((sec, idx) => (
              <div key={idx} className="space-y-3">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
                  {sec.title}
                </h4>
                <ul className="space-y-2">
                  {sec.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a
                        href={link.href}
                        className="hover:text-brand-coral transition-colors flex items-center justify-between group"
                      >
                        <span className="group-hover:translate-x-0.5 transition-transform">
                          {link.label}
                        </span>
                        {link.badge && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 bg-brand-coral/20 text-brand-coral rounded">
                            {link.badge}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Regulatory & Disclaimer Notice */}
        <div className="py-6 border-b border-slate-800 text-[11px] text-slate-500 leading-relaxed space-y-2">
          <p>
            <strong>Disclaimer:</strong> AsthaPay provides white-label technology and API platform infrastructure. Banking and AePS services are routed through RBI/NPCI-authorized partner banks. BBPS bill payments are processed via certified Bharat BillPay Operating Units.
          </p>
        </div>

        {/* Bottom Bar: Copyright & Grievance */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} AsthaPay Technologies India Private Limited. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a href="#privacy" className="hover:text-brand-coral transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-brand-coral transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#grievance" className="hover:text-brand-coral transition-colors">Grievance Officer</a>
            <span>•</span>
            <a href="#security" className="hover:text-brand-coral transition-colors">Security & Audit</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
