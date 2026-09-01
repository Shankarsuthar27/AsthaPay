'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { serviceCategoriesData } from '@/data/servicesData';
import { ServiceCategoryKey } from '@/types';
import { DynamicIcon } from '../common/DynamicIcon';

interface StickyTabBarProps {
  activeTab: ServiceCategoryKey;
  onTabClick: (id: ServiceCategoryKey) => void;
}

export const StickyTabBar: React.FC<StickyTabBarProps> = ({ activeTab, onTabClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll active tab into view in horizontal container on mobile/small screens without hijacking window scroll
  useEffect(() => {
    if (activeTabRef.current && containerRef.current) {
      const container = containerRef.current;
      const tab = activeTabRef.current;
      const tabOffsetLeft = tab.offsetLeft;
      const tabWidth = tab.offsetWidth;
      const containerWidth = container.offsetWidth;
      const currentScrollLeft = container.scrollLeft;

      // Only scroll horizontally if active tab is outside or near edge of view
      const isVisible =
        tabOffsetLeft >= currentScrollLeft + 20 &&
        tabOffsetLeft + tabWidth <= currentScrollLeft + containerWidth - 20;

      if (!isVisible) {
        const targetScrollLeft = tabOffsetLeft - (containerWidth / 2) + (tabWidth / 2);
        container.scrollTo({ left: Math.max(0, targetScrollLeft), behavior: 'smooth' });
      }
    }
  }, [activeTab]);

  return (
    <div className="sticky top-[50px] sm:top-[58px] lg:top-[64px] z-40 bg-white/95 backdrop-blur-md border-y border-slate-200/80 shadow-soft-sm py-2 sm:py-2.5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={containerRef}
          className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth overscroll-x-contain"
          style={{ touchAction: 'pan-x pan-y', WebkitOverflowScrolling: 'touch' }}
        >
          {serviceCategoriesData.map((category) => {
            const isActive = activeTab === category.id;

            // Formatted tab label as requested
            const tabLabel = category.navTitle.includes('Services')
              ? category.navTitle
              : `${category.navTitle} Services`;

            return (
              <button
                key={category.id}
                ref={isActive ? activeTabRef : null}
                onClick={() => onTabClick(category.id)}
                className={`relative px-4 py-2 rounded-full text-[11.5px] sm:text-xs font-bold transition-all duration-200 whitespace-nowrap flex items-center gap-2 shrink-0 select-none ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-600 hover:text-[#0d1b3e] hover:bg-slate-100/70'
                }`}
              >
                {/* Framer Motion Sliding Pill Background with shared layoutId */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-[#0d1b3e] rounded-full -z-10 shadow-soft-md"
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 32,
                    }}
                  />
                )}

                <DynamicIcon
                  name={category.iconName}
                  className={`w-3.5 h-3.5 transition-colors ${
                    isActive ? 'text-brand-coral' : 'text-slate-400 group-hover:text-brand-navy'
                  }`}
                />

                <span>{tabLabel}</span>

                {/* Counter Badge */}
                <span
                  className={`text-[9.5px] px-1.5 py-0.5 rounded-full font-extrabold transition-colors ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200/80 text-slate-600'
                  }`}
                >
                  {category.services.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
