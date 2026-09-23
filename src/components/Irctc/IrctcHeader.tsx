'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Train,
  Menu,
  X,
  Home,
  Info,
  Phone,
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Sparkles,
  HelpCircle,
  MessageCircle,
  ArrowRight,
  ExternalLink,
  Award
} from 'lucide-react';

interface IrctcHeaderProps {
  onOpenRegisterModal?: () => void;
}

export const IrctcHeader: React.FC<IrctcHeaderProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile drawer on route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/irctc', icon: Home, isExact: true },
    { label: 'About Us', href: '/irctc/about', icon: Info },
    { label: 'Process', href: '/irctc#process', icon: CheckCircle2 },
    { label: 'Documents', href: '/irctc#documents', icon: FileText },
    { label: 'Benefits', href: '/irctc#benefits', icon: Award },
    { label: 'Contact Us', href: '/irctc/contact', icon: Phone },
  ];

  const isLinkActive = (href: string, isExact?: boolean) => {
    if (isExact) {
      return pathname === href;
    }
    return pathname.startsWith(href) && href !== '/irctc';
  };

  const handleMobileNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* 1. Desktop Top Pre-Header Bar */}
      <div className="bg-[#0A1931] text-white text-[11px] py-1.5 px-4 hidden md:block border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-200 font-medium">
                Official IRCTC Principal Service Provider (PSP) • Registry Page 5, Entry 75
              </span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct PRS Switch • Tatkal & General Booking Authorized</span>
            </div>
          </div>
          <div className="flex items-center gap-5 text-slate-300">
            <a
              href="tel:+917023318111"
              className="flex items-center gap-1.5 hover:text-[#FF5733] transition-colors font-medium"
            >
              <PhoneCall className="w-3 h-3 text-[#FF5733]" />
              <span>IRCTC Desk: +91 70233 18111</span>
            </a>
            <span className="text-slate-700">|</span>
            <Link
              href="/"
              className="text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
            >
              AsthaPay Home <ArrowRight className="w-3 h-3 text-slate-400" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-soft-sm">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Brand Logo: Asthasoft IRCTC */}
          <Link
            href="/irctc"
            className="flex items-center gap-2.5 sm:gap-3 group select-none shrink-0"
            aria-label="Asthasoft IRCTC Home"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-tr from-[#0C2340] to-[#1E3A8A] flex items-center justify-center shadow-md text-white border border-blue-900/30 group-hover:scale-105 transition-transform shrink-0">
              <Train className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF5733]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center tracking-tight leading-none gap-1 sm:gap-1.5">
                <span className="text-xl sm:text-2xl md:text-3xl font-black italic text-[#D8232A]">
                  Asthasoft
                </span>
                <span className="text-xl sm:text-2xl md:text-3xl font-black italic text-[#0A1931]">
                  IRCTC
                </span>
              </div>
              <span className="text-[9px] font-bold text-slate-500 tracking-wide mt-0.5 sm:hidden">
                Authorized IRCTC PSP
              </span>
              <span className="hidden sm:block text-[9.5px] md:text-[10.5px] font-semibold text-slate-500 tracking-wide mt-0.5">
                Authorized IRCTC Principal Service Provider
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links & CTA */}
          <div className="hidden md:flex items-center gap-5 lg:gap-7">
            <nav className="flex items-center gap-4 lg:gap-6 text-sm font-bold text-slate-700">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href, link.isExact);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`py-1 transition-colors relative hover:text-[#D8232A] ${
                      active ? 'text-[#D8232A]' : 'text-slate-700'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#D8232A] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
              <a
                href="https://wa.me/917023318111?text=Hello%20I%20want%20to%20become%20an%20IRCTC%20Authorized%20Agent"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                title="WhatsApp Support"
              >
                <MessageCircle className="w-4 h-4 text-emerald-500" />
                <span>WhatsApp</span>
              </a>

              <Link
                href="/irctc#enquiry"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D8232A] to-[#B2181E] text-white text-xs lg:text-sm font-bold shadow-sm hover:shadow-md hover:brightness-105 active:scale-95 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Apply Now</span>
              </Link>
            </div>
          </div>

          {/* Mobile Right Controls: Apply Button + Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/irctc#enquiry"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#D8232A] to-[#B2181E] text-white text-xs font-bold shadow-xs active:scale-95 transition-all"
            >
              <span>Apply</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 stroke-[2.4] text-slate-800" />
              ) : (
                <Menu className="w-5 h-5 stroke-[2.4] text-slate-800" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 3. Mobile Responsive Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop Dimmer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Slide-out Drawer from Right */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="fixed inset-y-0 right-0 w-[84vw] max-w-[340px] bg-white shadow-2xl flex flex-col justify-between overflow-y-auto z-50 border-l border-slate-100"
            >
              <div className="p-5 flex-1 flex flex-col">
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#0C2340] to-[#1E3A8A] flex items-center justify-center text-white shadow-sm">
                      <Train className="w-4 h-4 text-[#FF5733]" />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center leading-none gap-1">
                        <span className="text-base font-black italic text-[#D8232A]">Asthasoft</span>
                        <span className="text-base font-black italic text-[#0A1931]">IRCTC</span>
                      </div>
                      <span className="text-[9px] font-semibold text-slate-500 mt-0.5">
                        PSP Page 5, Entry 75
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors focus:outline-none"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5 stroke-[2.4]" />
                  </button>
                </div>

                {/* Trust Badge Ribbon */}
                <div className="my-3 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center gap-2 text-[11px] text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span className="font-semibold text-slate-800">Authorized IRCTC Rail Gateway</span>
                </div>

                {/* Navigation Links Group */}
                <div className="mt-2 space-y-1">
                  <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Navigation
                  </span>
                  <nav className="space-y-1 pt-1">
                    {navLinks.map((link) => {
                      const Icon = link.icon;
                      const active = isLinkActive(link.href, link.isExact);
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={handleMobileNavClick}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                            active
                              ? 'bg-red-50 text-[#D8232A] font-bold border-l-3 border-[#D8232A]'
                              : 'text-slate-700 hover:bg-slate-50 hover:text-[#D8232A]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon
                              className={`w-4 h-4 ${
                                active ? 'text-[#D8232A]' : 'text-slate-400'
                              }`}
                            />
                            <span>{link.label}</span>
                          </div>
                          {active && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D8232A]" />
                          )}
                        </Link>
                      );
                    })}
                    <Link
                      href="/irctc#faq"
                      onClick={handleMobileNavClick}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#D8232A] transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <HelpCircle className="w-4 h-4 text-slate-400" />
                        <span>FAQs</span>
                      </div>
                    </Link>
                  </nav>
                </div>

                {/* Quick Action Buttons */}
                <div className="mt-6 pt-5 border-t border-slate-100 space-y-2.5">
                  <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Quick Contact & Actions
                  </span>

                  {/* Primary CTA: Apply for Agency */}
                  <Link
                    href="/irctc#enquiry"
                    onClick={handleMobileNavClick}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#D8232A] to-[#B2181E] text-white text-sm font-bold shadow-md hover:brightness-105 active:scale-98 transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Apply for IRCTC Agency</span>
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  </Link>

                  {/* Secondary: WhatsApp */}
                  <a
                    href="https://wa.me/917023318111?text=Hello%20I%20want%20to%20become%20an%20IRCTC%20Authorized%20Agent"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 active:scale-98 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>Chat on WhatsApp</span>
                  </a>

                  {/* Direct Phone Dial */}
                  <a
                    href="tel:+917023318111"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold hover:bg-slate-100 active:scale-98 transition-all"
                  >
                    <PhoneCall className="w-4 h-4 text-[#D8232A]" />
                    <span>Call Desk: +91 70233 18111</span>
                  </a>

                  {/* Main AsthaPay Site Link */}
                  <Link
                    href="/"
                    onClick={handleMobileNavClick}
                    className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors pt-2"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Back to AsthaPay Fintech Portal</span>
                  </Link>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                <p className="text-[11px] text-slate-500 leading-tight">
                  <span className="font-bold text-slate-700">Asthasoft IRCTC</span> — Authorized Principal Service Provider
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Tatkal & General PRS Rail Gateway
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
