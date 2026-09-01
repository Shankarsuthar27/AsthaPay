'use client';

import React from 'react';
import Image from 'next/image';
import { DynamicIcon } from '../common/DynamicIcon';
import { ServiceCategoryKey } from '@/types';

interface ServiceIllustrationProps {
  serviceId: string;
  categoryId: ServiceCategoryKey;
  iconName: string;
  imageSrc?: string;
}

export const ServiceIllustration: React.FC<ServiceIllustrationProps> = ({
  serviceId,
  categoryId,
  iconName,
  imageSrc,
}) => {
  // Category styling themes
  const getTheme = (cat: ServiceCategoryKey) => {
    switch (cat) {
      case 'banking':
        return {
          bgGradient: 'from-blue-500/10 via-indigo-500/10 to-sky-400/15',
          border: 'border-blue-100',
          badgeBg: 'bg-blue-600',
          glow: 'rgba(37, 99, 235, 0.25)',
          accentIcon: 'Building2',
          pillColor: 'text-blue-700 bg-blue-50 border-blue-200/60',
        };
      case 'utility':
        return {
          bgGradient: 'from-amber-500/10 via-orange-500/10 to-yellow-400/15',
          border: 'border-amber-100',
          badgeBg: 'bg-amber-600',
          glow: 'rgba(217, 119, 6, 0.25)',
          accentIcon: 'Zap',
          pillColor: 'text-amber-700 bg-amber-50 border-amber-200/60',
        };
      case 'travel':
        return {
          bgGradient: 'from-sky-500/10 via-teal-500/10 to-cyan-400/15',
          border: 'border-sky-100',
          badgeBg: 'bg-sky-600',
          glow: 'rgba(2, 132, 199, 0.25)',
          accentIcon: 'Plane',
          pillColor: 'text-sky-700 bg-sky-50 border-sky-200/60',
        };
      case 'egov':
        return {
          bgGradient: 'from-emerald-500/10 via-teal-500/10 to-green-400/15',
          border: 'border-emerald-100',
          badgeBg: 'bg-emerald-600',
          glow: 'rgba(5, 150, 105, 0.25)',
          accentIcon: 'ShieldCheck',
          pillColor: 'text-emerald-700 bg-emerald-50 border-emerald-200/60',
        };
      case 'insurance':
        return {
          bgGradient: 'from-rose-500/10 via-red-500/10 to-pink-400/15',
          border: 'border-rose-100',
          badgeBg: 'bg-rose-600',
          glow: 'rgba(225, 29, 72, 0.25)',
          accentIcon: 'HeartPulse',
          pillColor: 'text-rose-700 bg-rose-50 border-rose-200/60',
        };
      default:
        return {
          bgGradient: 'from-slate-100 to-slate-200/50',
          border: 'border-slate-200',
          badgeBg: 'bg-slate-700',
          glow: 'rgba(100, 116, 139, 0.2)',
          accentIcon: 'Sparkles',
          pillColor: 'text-slate-700 bg-slate-100 border-slate-200',
        };
    }
  };

  const theme = getTheme(categoryId);

  if (imageSrc) {
    return (
      <div
        className="w-full h-48 sm:h-52 rounded-2xl bg-gradient-to-b from-[#EDF5FF] via-[#F4F8FE] to-[#E5F0FF] border border-blue-100/90 flex items-center justify-center p-2.5 relative overflow-hidden group-hover:scale-[1.02] transition-all duration-300 select-none shadow-sm"
      >
        {/* Subtle grid pattern background */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id={`img-grid-${serviceId}`} width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#3B82F6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#img-grid-${serviceId})`} />
        </svg>

        {/* Soft ambient lighting */}
        <div className="absolute inset-0 bg-radial from-white/80 via-transparent to-transparent pointer-events-none" />

        {/* High quality SVG Illustration - Centered */}
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={imageSrc}
            alt={serviceId}
            width={280}
            height={360}
            priority
            className="h-full w-auto max-w-[90%] object-contain drop-shadow-md mx-auto transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full h-48 sm:h-52 rounded-2xl bg-gradient-to-br ${theme.bgGradient} ${theme.border} border flex items-center justify-center p-3 relative overflow-hidden group-hover:scale-[1.02] transition-all duration-300 select-none shadow-sm`}
    >
      {/* Abstract Background Vectors */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id={`grid-${serviceId}`} width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" className="text-slate-400" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${serviceId})`} />
      </svg>

      {/* Ambient Lighting Spheres */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/80 blur-xl pointer-events-none" />
      <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/70 blur-xl pointer-events-none" />

      {/* Decorative Rotating Geometric Accents */}
      <div className="absolute top-2.5 left-3.5 w-8 h-8 rounded-full border border-dashed border-slate-300/60 animate-[spin_12s_linear_infinite] pointer-events-none" />
      <div className="absolute bottom-2.5 right-3.5 w-7 h-7 rounded-lg border border-slate-300/50 rotate-12 pointer-events-none" />

      {/* Main Centered Icon Badge with Glow and 3D Layering */}
      <div className="relative flex flex-col items-center">
        <div
          className="w-16 h-16 rounded-2xl bg-white shadow-soft-md border border-slate-100/90 flex items-center justify-center text-brand-navy group-hover:text-brand-coral group-hover:shadow-coral-glow transition-all duration-300 relative z-10"
          style={{
            boxShadow: `0 8px 20px -4px ${theme.glow}`,
          }}
        >
          <DynamicIcon
            name={iconName}
            className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
          />

          {/* Mini Status Indicator */}
          <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[7.5px] text-white font-black shadow-sm">
            ✓
          </span>
        </div>

        {/* Category Pill Tag */}
        <span
          className={`mt-2.5 text-[9px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-full border ${theme.pillColor} shadow-2xs relative z-10`}
        >
          {categoryId.toUpperCase()} • API READY
        </span>
      </div>
    </div>
  );
};

