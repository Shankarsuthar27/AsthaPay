'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { serviceCategoriesData } from '@/data/servicesData';
import { ServiceCategoryKey } from '@/types';
import { StickyTabBar } from './StickyTabBar';
import { ServiceCategoryCard } from './ServiceCategoryCard';
import { Sparkles, Layers, ShieldCheck, Zap } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategoryKey>('banking');
  const isManualScrolling = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ScrollSpy with IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -45% 0px',
      threshold: [0, 0.1, 0.2, 0.5],
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      if (isManualScrolling.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id') as ServiceCategoryKey;
          if (id) {
            setActiveCategory(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    serviceCategoriesData.forEach((cat) => {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleTabClick = (id: ServiceCategoryKey) => {
    setActiveCategory(id);
    isManualScrolling.current = true;

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    const element = document.getElementById(id);
    if (element) {
      const isMobile = window.innerWidth < 640;
      const headerOffset = isMobile ? 110 : 150;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
    }

    scrollTimeoutRef.current = setTimeout(() => {
      isManualScrolling.current = false;
    }, 800);
  };

  return (
    <section id="services" className="relative py-12 sm:py-16 bg-white">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A1931] tracking-tight">
          <span className="text-[#FF5733]">Core Services</span> You Can Launch with <span className="text-[#0A1931]">AsthaPay</span>
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mt-2 font-normal leading-relaxed">
          Scale your financial operations and distributor network across India with AsthaPay&apos;s <span className="font-semibold text-slate-800">multi-service platform</span>
        </p>
      </div>

      {/* Sticky Tab Bar with Framer Motion layoutId */}
      <StickyTabBar activeTab={activeCategory} onTabClick={handleTabClick} />

      {/* Category Panels with Framer Motion Viewport Reveal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {serviceCategoriesData.map((category) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <ServiceCategoryCard category={category} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
