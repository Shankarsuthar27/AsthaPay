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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      const totalScrollable = scrollWidth - clientWidth;
      const progress = totalScrollable > 0 ? (scrollLeft / totalScrollable) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    }
  };

  useEffect(() => {
    checkScrollability();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollability, { passive: true });
      window.addEventListener('resize', checkScrollability);
      return () => {
        el.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, [category.services]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    isDragging.current = true;
    setIsMouseDown(true);
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftStart.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.4;
    scrollContainerRef.current.scrollLeft = scrollLeftStart.current - walk;
    checkScrollability();
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Only handle horizontal wheel or shift+wheel; never hijack vertical wheel/scroll
    if (!scrollContainerRef.current) return;
    if (e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      if (e.deltaX !== 0) {
        scrollContainerRef.current.scrollLeft += e.deltaX;
        checkScrollability();
      }
    }
  };

  return (
    <div
      id={category.id}
      className="bg-[#edf4fb] sm:bg-[#f2f7fc] rounded-[30px] sm:rounded-3xl p-5 sm:p-7 md:p-9 border border-slate-200/80 my-5 sm:my-9 shadow-soft-sm transition-all duration-300 relative scroll-mt-28 sm:scroll-mt-36"
    >
      {/* Mobile-only Section Header (Matching Reference Screenshot) */}
      <div className="block sm:hidden mb-4">
        <h3 className="text-[22px] font-bold text-[#ea5843] tracking-tight">
          {category.navTitle.includes('Services') ? category.navTitle : `${category.navTitle} Services`}
        </h3>
        <p className="text-[13px] text-[#556987] mt-1.5 font-normal leading-relaxed">
          {category.shortDesc}
        </p>
      </div>

      {/* Desktop Section Header (100% Unchanged on Desktop) */}
      <div className="hidden sm:flex sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-slate-200/80 mb-5">
        <div>
          {/* Highlight pill / Category Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-coral/10 text-brand-coral border border-brand-coral/20 text-[11px] font-bold mb-2">
            <DynamicIcon name={category.iconName} className="w-3 h-3" />
            <span>{category.highlightPill}</span>
          </div>

          {/* Red/Coral Bold Section Title */}
          <h3 className="text-xl sm:text-2xl font-extrabold text-red-500 tracking-tight flex items-center gap-2">
            <span>{category.title}</span>
          </h3>

          {/* Concise 1-2 line subtitle */}
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl mt-1.5 font-normal leading-relaxed">
            {category.shortDesc}
          </p>
        </div>

        {/* Carousel Arrow Navigation Buttons & Hint */}
        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <div className="hidden sm:flex items-center gap-1 text-[10.5px] font-medium text-slate-500 bg-white/80 px-2.5 py-1 rounded-full border border-slate-200/80 shadow-2xs">
            <span>Slide to explore</span>
            <span className="font-bold text-brand-navy">({category.services.length})</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-200 ${
                canScrollLeft
                  ? 'bg-white hover:bg-slate-100 text-brand-navy border-slate-200 shadow-sm hover:scale-105 active:scale-95 cursor-pointer'
                  : 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed opacity-50'
              }`}
              aria-label={`Scroll ${category.title} left`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-200 ${
                canScrollRight
                  ? 'bg-white hover:bg-brand-coral hover:text-white text-brand-navy border-slate-200 shadow-sm hover:scale-105 active:scale-95 cursor-pointer'
                  : 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed opacity-50'
              }`}
              aria-label={`Scroll ${category.title} right`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Service Cards Horizontal Carousel Container */}
      <div className="relative group/carousel">
        {/* Mobile Floating Arrow Buttons (Like Reference Screenshot) */}
        {canScrollLeft && (
          <button
            onClick={() => handleScroll('left')}
            className="sm:hidden absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-slate-700 active:scale-95 transition-all"
            aria-label="Previous service"
          >
            <ChevronLeft className="w-4 h-4 text-slate-700" />
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={() => handleScroll('right')}
            className="sm:hidden absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-slate-700 active:scale-95 transition-all"
            aria-label="Next service"
          >
            <ChevronRight className="w-4 h-4 text-slate-700" />
          </button>
        )}

        {/* Left Gradient Edge Fade (Desktop only) */}
        {canScrollLeft && (
          <div className="hidden sm:block absolute left-0 inset-y-0 w-10 bg-gradient-to-r from-[#f2f7fc] to-transparent z-10 pointer-events-none transition-opacity duration-300" />
        )}

        {/* Right Gradient Edge Fade (Desktop only) */}
        {canScrollRight && (
          <div className="hidden sm:block absolute right-0 inset-y-0 w-10 bg-gradient-to-l from-[#f2f7fc] to-transparent z-10 pointer-events-none transition-opacity duration-300" />
        )}

        {/* Horizontal Scrollable Row */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onWheel={handleWheel}
          className={`flex gap-3 sm:gap-5 overflow-x-auto pb-2 sm:pb-4 pt-1 px-0.5 sm:px-1 no-scrollbar scroll-smooth snap-x select-none overscroll-x-contain ${
            isMouseDown ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            touchAction: 'pan-x pan-y',
            WebkitOverflowScrolling: 'touch',
          }}
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
      </div>

      {/* Desktop Scroll Progress Bar (Desktop only) */}
      <div className="hidden sm:block w-full bg-slate-200/70 h-1 rounded-full overflow-hidden mt-1 mb-3">
        <div
          className="bg-brand-coral h-full rounded-full transition-all duration-150"
          style={{ width: `${Math.max(15, scrollProgress)}%` }}
        />
      </div>

      {/* Desktop Bottom Category Details & API CTA (Desktop only) */}
      <div className="hidden sm:flex pt-3 border-t border-slate-200/80 flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] text-slate-600">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-slate-700">
            {category.services.length} Turnkey APIs • 99.99% SLA
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[10px] text-slate-400 hidden sm:inline">
            ← Drag or click arrows to side scroll →
          </span>
          <a
            href="#demo"
            className="font-bold text-brand-coral hover:text-brand-coral-hover flex items-center gap-1 transition-colors group"
          >
            <span>Explore {category.navTitle} APIs</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};
