'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ServiceCategory } from '@/types';
import { ServiceItemCard } from './ServiceItemCard';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ServiceCategoryCardProps {
  category: ServiceCategory;
  onExploreService?: (serviceTitle: string) => void;
}

export const ServiceCategoryCard: React.FC<ServiceCategoryCardProps> = ({ category }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

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
      const scrollAmount = direction === 'left' ? -290 : 290;
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
      className="bg-[#EDF5FF] rounded-[28px] sm:rounded-[32px] p-5 sm:p-7 md:p-8 border border-blue-100/70 my-6 sm:my-8 shadow-soft-sm transition-all duration-300 relative scroll-mt-28 sm:scroll-mt-36"
    >
      {/* Category Section Header matching reference screenshot */}
      <div className="mb-4">
        {/* Coral/Red Bold Title */}
        <h3 className="text-xl sm:text-2xl font-black text-[#FF5733] tracking-tight">
          {category.title}
        </h3>

        {/* Clean Subtitle Description */}
        <p className="text-xs sm:text-[13.5px] text-slate-600 max-w-2xl mt-1.5 font-normal leading-relaxed">
          {category.shortDesc}
        </p>
      </div>

      {/* Service Cards Horizontal Carousel Container */}
      <div className="relative group/carousel">
        {/* Floating Circular Left Arrow Button matching reference image */}
        {canScrollLeft && (
          <button
            onClick={() => handleScroll('left')}
            className="w-9 h-9 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center text-slate-700 hover:text-[#FF5733] hover:scale-105 active:scale-95 transition-all z-20 absolute -left-2.5 sm:-left-3.5 top-1/2 -translate-y-1/2 cursor-pointer"
            aria-label={`Scroll ${category.title} left`}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}

        {/* Floating Circular Right Arrow Button matching reference image */}
        {canScrollRight && (
          <button
            onClick={() => handleScroll('right')}
            className="w-9 h-9 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center text-slate-700 hover:text-[#FF5733] hover:scale-105 active:scale-95 transition-all z-20 absolute -right-2.5 sm:-right-3.5 top-1/2 -translate-y-1/2 cursor-pointer"
            aria-label={`Scroll ${category.title} right`}
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        {/* Horizontal Scrollable Row of White Service Cards */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onWheel={handleWheel}
          className={`flex gap-3.5 sm:gap-4.5 overflow-x-auto pb-2 pt-1 px-1 no-scrollbar scroll-smooth snap-x select-none overscroll-x-contain ${
            isMouseDown ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            touchAction: 'pan-x pan-y',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {category.services.map((service) => (
            <div key={service.id} className="snap-center shrink-0">
              <ServiceItemCard
                service={service}
                categoryId={category.id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
