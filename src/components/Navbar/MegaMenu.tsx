'use client';

import React from 'react';
import { serviceCategoriesData } from '@/data/servicesData';
import { ServiceCategoryKey } from '@/types';
import { DynamicIcon } from '../common/DynamicIcon';
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService?: (serviceId: string, categoryId: string) => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose, onSelectService }) => {
  const [activeCategoryId, setActiveCategoryId] = React.useState<ServiceCategoryKey>('banking');

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
      className="fixed left-1/2 -translate-x-1/2 top-[52px] sm:top-[58px] lg:top-[62px] w-[1020px] max-w-[95vw] pt-2 z-50 transition-all duration-200 animate-in fade-in slide-in-from-top-1"
    >
      {/* Invisible Hover Bridge */}
      <div className="absolute -top-3 inset-x-0 h-3" />

      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden">
        {/* Main Two-Pane Layout */}
        <div className="grid grid-cols-12 min-h-[440px]">
          {/* Left Pane: Category Vertical Tabs */}
          <div className="col-span-4 bg-slate-50/80 p-3 border-r border-slate-100 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                Service Verticals
              </div>
              {serviceCategoriesData.map((category) => {
                const isActive = category.id === activeCategoryId;
                return (
                  <button
                    key={category.id}
                    onMouseEnter={() => handleCategoryClick(category.id)}
                    onClick={() => handleCategoryClick(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-all duration-200 group ${
                      isActive
                        ? 'bg-white shadow-md border border-slate-200/90 text-brand-navy font-bold scale-[1.01]'
                        : 'text-slate-600 hover:bg-white/70 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-[30px] h-[30px] rounded-lg flex items-center justify-center transition-colors ${
                          isActive
                            ? 'bg-brand-coral text-white shadow-sm'
                            : 'bg-slate-200/70 text-slate-600 group-hover:bg-brand-coral/10 group-hover:text-brand-coral'
                        }`}
                      >
                        <DynamicIcon name={category.iconName} className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs leading-tight font-bold">{category.navTitle}</div>
                        <div className="text-[10px] text-slate-500 font-normal">
                          {category.services.length} Micro-services
                        </div>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isActive ? 'text-brand-coral translate-x-0.5' : 'text-slate-300 group-hover:text-slate-500'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Mini Partner CTA in Left Pane */}
            <div className="mt-3 p-2.5 bg-brand-coral/5 border border-brand-coral/15 rounded-xl">
              <div className="flex items-center gap-1.5 text-brand-coral text-[11px] font-bold mb-0.5">
                <Sparkles className="w-3 h-3" />
                <span>White-Label Ready</span>
              </div>
              <p className="text-[10px] text-slate-600 leading-snug">
                Launch with your logo, domain &amp; mobile app in 24 hours.
              </p>
            </div>
          </div>

          {/* Right Pane: Dynamic Sub-services Grid */}
          <div className="col-span-8 p-5 flex flex-col justify-between bg-white">
            <div>
              {/* Category Header */}
              <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-extrabold text-brand-navy">{currentCategory.title}</h4>
                    <span className="text-[9.5px] font-extrabold bg-brand-pastel-blue text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                      {currentCategory.highlightPill}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-1">{currentCategory.shortDesc}</p>
                </div>
                <a
                  href={`#${currentCategory.id}`}
                  onClick={onClose}
                  className="text-[11px] font-bold text-brand-coral hover:text-brand-coral-hover flex items-center gap-1 shrink-0 px-2 py-0.5 rounded-lg bg-brand-coral/10 hover:bg-brand-coral/20 transition-all"
                >
                  <span>View Full Stack</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>

              {/* Sub-services Grid (2-column layout) */}
              <div className="grid grid-cols-2 gap-2.5 max-h-[290px] overflow-y-auto pr-1">
                {currentCategory.services.map((service) => (
                  <a
                    key={service.id}
                    href={`#${currentCategory.id}`}
                    onClick={() => handleServiceClick(service.id)}
                    className="p-2.5 rounded-xl border border-slate-100 hover:border-brand-coral/30 hover:bg-brand-coral-light/30 transition-all duration-200 group flex items-start gap-2.5"
                  >
                    <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-brand-coral text-slate-700 group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-2xs">
                      <DynamicIcon name={service.iconName} className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-[11.5px] font-bold text-brand-navy group-hover:text-brand-coral truncate">
                          {service.title}
                        </span>
                        {service.badge && (
                          <span className="text-[8.5px] font-extrabold px-1.5 py-0.2 bg-brand-coral/10 text-brand-coral rounded shrink-0">
                            {service.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                        {service.shortDesc}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Info Strip */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 bg-slate-50 -mx-5 -mb-5 px-5 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
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
    </div>
  );
};
