'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ServiceCategory } from '@/types';
import { ServiceItemCard } from './ServiceItemCard';
import { DynamicIcon } from '../common/DynamicIcon';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface ServiceCategoryCardProps {
  category: ServiceCategory;
  onExploreService?: (serviceTitle: string) => void;
}

export const ServiceCategoryCard: React.FC<ServiceCategoryCardProps> = ({ category }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollability();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollability);
      window.addEventListener('resize', checkScrollability);
      return () => {
        el.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, [category.services]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div
      id={category.id}
      className="bg-[#f2f7fc] rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 border border-slate-200/80 my-6 sm:my-10 shadow-soft-sm transition-all duration-300 relative scroll-mt-40"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200/80 mb-6">
        <div>
          {/* Highlight pill / Category Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-coral/10 text-brand-coral border border-brand-coral/20 text-xs font-bold mb-2.5">
            <DynamicIcon name={category.iconName} className="w-3.5 h-3.5" />
            <span>{category.highlightPill}</span>
          </div>

          {/* Red/Coral Bold Section Title */}
          <h3 className="text-2xl sm:text-3xl font-extrabold text-red-500 tracking-tight flex items-center gap-2.5">
            <span>{category.title}</span>
          </h3>

          {/* Concise 1-2 line subtitle */}
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl mt-2 font-normal leading-relaxed">
            {category.shortDesc}
          </p>
        </div>

        {/* Carousel Arrow Navigation Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <button
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 ${
              canScrollLeft
                ? 'bg-white hover:bg-slate-100 text-brand-navy border-slate-200 shadow-sm hover:scale-105 active:scale-95 cursor-pointer'
                : 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed opacity-50'
            }`}
            aria-label={`Scroll ${category.title} left`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 ${
              canScrollRight
                ? 'bg-white hover:bg-slate-100 text-brand-navy border-slate-200 shadow-sm hover:scale-105 active:scale-95 cursor-pointer'
                : 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed opacity-50'
            }`}
            aria-label={`Scroll ${category.title} right`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Service Cards Horizontal Carousel / Grid */}
      <div
        ref={scrollContainerRef}
        className="flex gap-5 sm:gap-6 overflow-x-auto pb-4 pt-2 px-1 no-scrollbar scroll-smooth snap-x touch-pan-x"
      >
        {category.services.map((service) => (
          <div key={service.id} className="snap-start shrink-0">
            <ServiceItemCard
              service={service}
              categoryId={category.id}
            />
          </div>
        ))}
      </div>

      {/* Bottom Category Details & API CTA */}
      <div className="mt-6 pt-5 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-slate-700">
            {category.services.length} Turnkey APIs • 99.99% SLA
          </span>
        </div>

        <a
          href="#demo"
          className="font-bold text-brand-coral hover:text-brand-coral-hover flex items-center gap-1.5 transition-colors group"
        >
          <span>Explore {category.navTitle} APIs</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
};
