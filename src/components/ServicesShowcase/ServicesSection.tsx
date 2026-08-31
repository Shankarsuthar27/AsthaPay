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
      const headerOffset = 150;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-coral/10 border border-brand-coral/20 text-xs font-bold text-brand-coral mb-3 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Core Services Ecosystem</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy tracking-tight">
          Services You Can Launch with <span className="text-brand-coral">AsthaPay</span>
        </h2>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mt-3 font-normal leading-relaxed">
          Branchless banking, BBPS utilities, citizen services, and insurance under one unified balance.
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
