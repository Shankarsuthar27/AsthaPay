'use client';

import React, { useState, useEffect } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { MegaMenu } from './MegaMenu';
import { SimpleDropdown } from './SimpleDropdown';
import { MobileMenu } from './MobileMenu';
import { partnerDropdownItems, resourcesDropdownItems, aboutDropdownItems } from '@/data/navigationData';
import { ChevronDown, Menu, PhoneCall, ShieldCheck, Sparkles, User, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenDemoModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemoModal }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdownHover = (name: string) => {
    setActiveDropdown(name);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <>
      {/* Top Pre-Header Notification Bar */}
      <div className="bg-brand-navy text-white text-[10.5px] py-1 px-4 hidden md:block border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-300 font-medium">
                NPCI Registered Turnkey Banking Switch & BBPS Central Unit Partner
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>ISO 27001 & PCI-DSS Level 1 Certified</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <a href="tel:+918001234567" className="flex items-center gap-1.5 hover:text-brand-coral transition-colors">
              <PhoneCall className="w-3 h-3 text-brand-coral" />
              <span>Helpline: 1800-123-4567</span>
            </a>
            <span className="text-slate-700">|</span>
            <a href="#portal" className="text-brand-coral hover:text-brand-coral-hover font-semibold flex items-center gap-1">
              <User className="w-3 h-3" /> Agent / Distributor Login
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav shadow-soft-md border-b border-slate-200/80 py-2'
            : 'bg-white/95 backdrop-blur-md border-b border-slate-100 py-2.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Brand Logo */}
            <BrandLogo size="md" />

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
              {/* Platform (Mega Menu) */}
              <div
                className="relative py-1.5"
                onMouseEnter={() => handleDropdownHover('platform')}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'platform' ? null : 'platform')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                    activeDropdown === 'platform'
                      ? 'text-brand-coral bg-brand-coral-light/60'
                      : 'text-slate-700 hover:text-brand-navy hover:bg-slate-100/70'
                  }`}
                >
                  <span>Platform</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'platform' ? 'rotate-180 text-brand-coral' : 'text-slate-400'
                    }`}
                  />
                </button>

                <MegaMenu isOpen={activeDropdown === 'platform'} onClose={handleDropdownLeave} />
              </div>

              {/* Partner with Us */}
              <div
                className="relative py-1.5"
                onMouseEnter={() => handleDropdownHover('partner')}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'partner' ? null : 'partner')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                    activeDropdown === 'partner'
                      ? 'text-brand-coral bg-brand-coral-light/60'
                      : 'text-slate-700 hover:text-brand-navy hover:bg-slate-100/70'
                  }`}
                >
                  <span>Partner with Us</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'partner' ? 'rotate-180 text-brand-coral' : 'text-slate-400'
                    }`}
                  />
                </button>

                <SimpleDropdown
                  isOpen={activeDropdown === 'partner'}
                  items={partnerDropdownItems}
                  onClose={handleDropdownLeave}
                  width="w-80"
                  badgeTitle="Partnership Opportunities"
                />
              </div>

              {/* Pricing */}
              <a
                href="#pricing"
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-brand-navy hover:bg-slate-100/70 transition-all"
              >
                Pricing
              </a>

              {/* Resources */}
              <div
                className="relative py-1.5"
                onMouseEnter={() => handleDropdownHover('resources')}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'resources' ? null : 'resources')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                    activeDropdown === 'resources'
                      ? 'text-brand-coral bg-brand-coral-light/60'
                      : 'text-slate-700 hover:text-brand-navy hover:bg-slate-100/70'
                  }`}
                >
                  <span>Resources</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'resources' ? 'rotate-180 text-brand-coral' : 'text-slate-400'
                    }`}
                  />
                </button>

                <SimpleDropdown
                  isOpen={activeDropdown === 'resources'}
                  items={resourcesDropdownItems}
                  onClose={handleDropdownLeave}
                  width="w-80"
                  badgeTitle="Developer & Growth Hub"
                />
              </div>

              {/* About Us */}
              <div
                className="relative py-1.5"
                onMouseEnter={() => handleDropdownHover('about')}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'about' ? null : 'about')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                    activeDropdown === 'about'
                      ? 'text-brand-coral bg-brand-coral-light/60'
                      : 'text-slate-700 hover:text-brand-navy hover:bg-slate-100/70'
                  }`}
                >
                  <span>About Us</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'about' ? 'rotate-180 text-brand-coral' : 'text-slate-400'
                    }`}
                  />
                </button>

                <SimpleDropdown
                  isOpen={activeDropdown === 'about'}
                  items={aboutDropdownItems}
                  onClose={handleDropdownLeave}
                  width="w-76"
                  badgeTitle="AsthaPay Corporate"
                />
              </div>

              {/* Contact Us */}
              <a
                href="#contact"
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-brand-navy hover:bg-slate-100/70 transition-all"
              >
                Contact Us
              </a>
            </nav>

            {/* Right: CTA Buttons */}
            <div className="hidden lg:flex items-center gap-2.5">
              <a
                href="#portal"
                className="text-[11.5px] font-bold text-brand-navy hover:text-brand-coral px-2.5 py-1.5 transition-colors flex items-center gap-1"
              >
                Login
              </a>

              <button
                onClick={onOpenDemoModal}
                className="relative group overflow-hidden rounded-full bg-gradient-to-r from-brand-coral via-[#FF6247] to-brand-coral-hover text-white text-xs font-bold px-4.5 py-2 shadow-coral-glow hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5"
              >
                <span className="relative z-10 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Free Live Demo
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={onOpenDemoModal}
                className="bg-brand-coral text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm"
              >
                Demo
              </button>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Open Navigation Drawer"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenDemoModal={onOpenDemoModal}
      />
    </>
  );
};
