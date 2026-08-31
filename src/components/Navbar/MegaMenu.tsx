'use client';

import React, { useState } from 'react';
import { serviceCategoriesData } from '@/data/servicesData';
import { ServiceCategoryKey } from '@/types';
import { DynamicIcon } from '../common/DynamicIcon';
import { ArrowRight, ChevronRight, Sparkles, ShieldCheck } from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService?: (serviceId: string, categoryId: string) => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose, onSelectService }) => {
  const [activeCategoryId, setActiveCategoryId] = useState<ServiceCategoryKey>('banking');

  if (!isOpen) return null;

  const currentCategory = serviceCategoriesData.find((c) => c.id === activeCategoryId) || serviceCategoriesData[0];

  const handleCategoryClick = (id: ServiceCategoryKey) => {
    setActiveCategoryId(id);
  };

  const handleServiceClick = (serviceId: string) => {
    onClose();
    if (onSelectService) {
      onSelectService(serviceId, activeCategoryId);
    } else {
      const element = document.getElementById(activeCategoryId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 top-[72px] sm:top-[76px] w-[1020px] max-w-[95vw] bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden z-50 transition-all duration-300 animate-in fade-in slide-in-from-top-2"
      onMouseLeave={onClose}
    >
      {/* Centered Top Banner Bar */}
      <div className="bg-gradient-to-r from-brand-navy via-[#0c2340] to-brand-navy px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-white/90 border-b border-slate-800">
        <div className="flex items-center gap-2 text-center sm:text-left mx-auto sm:mx-0">
          <span className="flex h-2 w-2 rounded-full bg-brand-coral animate-pulse"></span>
          <span className="font-semibold text-white tracking-wide">
            25+ Integrated Banking &amp; Utility Services on a Single Wallet Balance
          </span>
        </div>

        <div className="flex items-center gap-4 shrink-0 mx-auto sm:mx-0">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px] bg-white/10 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
            <ShieldCheck className="w-3.5 h-3.5" /> PCI-DSS Level 1
          </span>
          <span className="text-slate-500">|</span>
          <a
            href="#sandbox"
            onClick={onClose}
            className="text-brand-coral hover:text-white transition-colors flex items-center gap-1 font-bold text-[11px]"
          >
            <span>Explore API Sandbox</span>
            <ChevronRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main Two-Pane Layout */}
      <div className="grid grid-cols-12 min-h-[440px]">
        {/* Left Pane: Category Vertical Tabs */}
        <div className="col-span-4 bg-slate-50/80 p-4 border-r border-slate-100 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              Service Verticals
            </div>
            {serviceCategoriesData.map((category) => {
              const isActive = category.id === activeCategoryId;
              return (
                <button
                  key={category.id}
                  onMouseEnter={() => handleCategoryClick(category.id)}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`w-full text-left px-3.5 py-3 rounded-2xl flex items-center justify-between transition-all duration-200 group ${
                    isActive
                      ? 'bg-white shadow-md border border-slate-200/90 text-brand-navy font-bold scale-[1.01]'
                      : 'text-slate-600 hover:bg-white/70 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-brand-coral text-white shadow-sm'
                          : 'bg-slate-200/70 text-slate-600 group-hover:bg-brand-coral/10 group-hover:text-brand-coral'
                      }`}
                    >
                      <DynamicIcon name={category.iconName} className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm leading-tight font-bold">{category.navTitle}</div>
                      <div className="text-[11px] text-slate-500 font-normal">
                        {category.services.length} Micro-services
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isActive ? 'text-brand-coral translate-x-0.5' : 'text-slate-300 group-hover:text-slate-500'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Mini Partner CTA in Left Pane */}
          <div className="mt-4 p-3 bg-brand-coral/5 border border-brand-coral/15 rounded-2xl">
            <div className="flex items-center gap-1.5 text-brand-coral text-xs font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>White-Label Ready</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Launch with your logo, domain &amp; mobile app in 24 hours.
            </p>
          </div>
        </div>

        {/* Right Pane: Dynamic Sub-services Grid */}
        <div className="col-span-8 p-6 flex flex-col justify-between bg-white">
          <div>
            {/* Category Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-extrabold text-brand-navy">{currentCategory.title}</h4>
                  <span className="text-[10px] font-extrabold bg-brand-pastel-blue text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {currentCategory.highlightPill}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 line-clamp-1">{currentCategory.shortDesc}</p>
              </div>
              <a
                href={`#${currentCategory.id}`}
                onClick={onClose}
                className="text-xs font-bold text-brand-coral hover:text-brand-coral-hover flex items-center gap-1 shrink-0 px-2.5 py-1 rounded-lg bg-brand-coral/10 hover:bg-brand-coral/20 transition-all"
              >
                <span>View Full Stack</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            {/* Sub-services Grid (2-column layout) */}
            <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1">
              {currentCategory.services.map((service) => (
                <a
                  key={service.id}
                  href={`#${currentCategory.id}`}
                  onClick={() => handleServiceClick(service.id)}
                  className="p-3 rounded-2xl border border-slate-100 hover:border-brand-coral/30 hover:bg-brand-coral-light/30 transition-all duration-200 group flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-brand-coral text-slate-700 group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-2xs">
                    <DynamicIcon name={service.iconName} className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-brand-navy group-hover:text-brand-coral truncate">
                        {service.title}
                      </span>
                      {service.badge && (
                        <span className="text-[9px] font-extrabold px-1.5 py-0.2 bg-brand-coral/10 text-brand-coral rounded shrink-0">
                          {service.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {service.shortDesc}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Info Strip */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 bg-slate-50 -mx-6 -mb-6 px-6 py-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold text-slate-700">Direct Bank Switch Integration (ICICI, Axis, YES Bank, NSDL)</span>
            </div>
            <a
              href="#contact"
              onClick={onClose}
              className="text-brand-navy font-bold hover:text-brand-coral flex items-center gap-1 transition-colors"
            >
              <span>Talk to Solutions Architect</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
