'use client';

import React, { useState } from 'react';
import { serviceCategoriesData } from '@/data/servicesData';
import { partnerDropdownItems, resourcesDropdownItems, aboutDropdownItems } from '@/data/navigationData';
import { DynamicIcon } from '../common/DynamicIcon';
import { X, ChevronDown, ChevronRight, Phone, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDemoModal: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onOpenDemoModal }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>('platform');
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>('banking');

  if (!isOpen) return null;

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl flex flex-col z-50 overflow-y-auto animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 sticky top-0 z-10 backdrop-blur-md">
          <BrandLogo size="sm" />
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:text-brand-navy hover:bg-slate-200/60 transition-colors"
            aria-label="Close Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Accordions */}
        <div className="p-4 flex-1 space-y-3">
          {/* Platform Accordion */}
          <div className="border border-slate-200/80 rounded-2xl overflow-hidden bg-slate-50/40">
            <button
              onClick={() => toggleSection('platform')}
              className="w-full p-3.5 flex items-center justify-between font-bold text-sm text-brand-navy bg-white hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-brand-coral/10 text-brand-coral flex items-center justify-center">
                  <DynamicIcon name="Layers" className="w-4 h-4" />
                </div>
                <span>Platform Solutions</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform ${
                  expandedSection === 'platform' ? 'rotate-180 text-brand-coral' : ''
                }`}
              />
            </button>

            {expandedSection === 'platform' && (
              <div className="p-3 bg-white border-t border-slate-100 space-y-2">
                {/* Horizontal Category Switcher */}
                <div className="flex gap-1.5 overflow-x-auto pb-2 no-scrollbar">
                  {serviceCategoriesData.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategoryKey(cat.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                        selectedCategoryKey === cat.id
                          ? 'bg-brand-navy text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat.navTitle}
                    </button>
                  ))}
                </div>

                {/* Selected Category's Services */}
                {(() => {
                  const activeCat = serviceCategoriesData.find((c) => c.id === selectedCategoryKey) || serviceCategoriesData[0];
                  return (
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[11px] font-bold text-brand-coral uppercase tracking-wider px-1">
                        {activeCat.title}
                      </div>
                      <div className="grid grid-cols-1 gap-1.5 max-h-60 overflow-y-auto">
                        {activeCat.services.map((srv) => (
                          <a
                            key={srv.id}
                            href={`#${activeCat.id}`}
                            onClick={onClose}
                            className="p-2 rounded-xl bg-slate-50 hover:bg-brand-coral/10 flex items-center gap-2.5 transition-colors group"
                          >
                            <div className="w-7 h-7 rounded-lg bg-white group-hover:bg-brand-coral group-hover:text-white text-slate-600 flex items-center justify-center shrink-0 border border-slate-200/60 shadow-2xs">
                              <DynamicIcon name={srv.iconName} className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-medium text-slate-800 group-hover:text-brand-coral truncate">
                              {srv.title}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          {/* Partner With Us Accordion */}
          <div className="border border-slate-200/80 rounded-2xl overflow-hidden bg-slate-50/40">
            <button
              onClick={() => toggleSection('partner')}
              className="w-full p-3.5 flex items-center justify-between font-bold text-sm text-brand-navy bg-white hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <DynamicIcon name="Network" className="w-4 h-4" />
                </div>
                <span>Partner with Us</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform ${
                  expandedSection === 'partner' ? 'rotate-180 text-brand-coral' : ''
                }`}
              />
            </button>

            {expandedSection === 'partner' && (
              <div className="p-2.5 bg-white border-t border-slate-100 space-y-1">
                {partnerDropdownItems.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    onClick={onClose}
                    className="p-2 rounded-xl hover:bg-slate-50 flex items-center justify-between text-xs font-medium text-slate-700"
                  >
                    <span>{item.title}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Direct Nav Items */}
          <a
            href="#pricing"
            onClick={onClose}
            className="p-3.5 rounded-2xl border border-slate-200/80 font-bold text-sm text-brand-navy bg-white hover:bg-slate-50 flex items-center justify-between"
          >
            <span>Pricing & Slabs</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </a>

          {/* Resources Accordion */}
          <div className="border border-slate-200/80 rounded-2xl overflow-hidden bg-slate-50/40">
            <button
              onClick={() => toggleSection('resources')}
              className="w-full p-3.5 flex items-center justify-between font-bold text-sm text-brand-navy bg-white hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <DynamicIcon name="Terminal" className="w-4 h-4" />
                </div>
                <span>Resources & Docs</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform ${
                  expandedSection === 'resources' ? 'rotate-180 text-brand-coral' : ''
                }`}
              />
            </button>

            {expandedSection === 'resources' && (
              <div className="p-2.5 bg-white border-t border-slate-100 space-y-1">
                {resourcesDropdownItems.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    onClick={onClose}
                    className="p-2 rounded-xl hover:bg-slate-50 flex items-center justify-between text-xs font-medium text-slate-700"
                  >
                    <span>{item.title}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* About Us Accordion */}
          <div className="border border-slate-200/80 rounded-2xl overflow-hidden bg-slate-50/40">
            <button
              onClick={() => toggleSection('about')}
              className="w-full p-3.5 flex items-center justify-between font-bold text-sm text-brand-navy bg-white hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                  <DynamicIcon name="Building" className="w-4 h-4" />
                </div>
                <span>About Us</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform ${
                  expandedSection === 'about' ? 'rotate-180 text-brand-coral' : ''
                }`}
              />
            </button>

            {expandedSection === 'about' && (
              <div className="p-2.5 bg-white border-t border-slate-100 space-y-1">
                {aboutDropdownItems.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    onClick={onClose}
                    className="p-2 rounded-xl hover:bg-slate-50 flex items-center justify-between text-xs font-medium text-slate-700"
                  >
                    <span>{item.title}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                ))}
              </div>
            )}
          </div>

          <a
            href="#contact"
            onClick={onClose}
            className="p-3.5 rounded-2xl border border-slate-200/80 font-bold text-sm text-brand-navy bg-white hover:bg-slate-50 flex items-center justify-between"
          >
            <span>Contact Us</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </a>
        </div>

        {/* Drawer Bottom Actions */}
        <div className="p-4 border-t border-slate-200/80 bg-slate-50 space-y-3">
          <button
            onClick={() => {
              onClose();
              onOpenDemoModal();
            }}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-coral to-brand-coral-hover text-white font-bold text-sm shadow-coral-glow flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.98] transition-all"
          >
            <span>Free Live Demo</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <a href="tel:+918001234567" className="flex items-center gap-1.5 hover:text-brand-navy">
              <Phone className="w-3.5 h-3.5 text-brand-coral" />
              <span>+91 (0) 800 123 4567</span>
            </a>
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> PCI-DSS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
