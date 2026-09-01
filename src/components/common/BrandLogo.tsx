import React from 'react';
import Image from 'next/image';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'light',
  className = '',
  size = 'md'
}) => {
  const isDark = variant === 'dark';

  const sizeStyles = {
    sm: {
      imageSize: 36,
      imgClass: 'w-8 h-8 sm:w-9 sm:h-9',
      titleClass: 'text-lg sm:text-xl',
      subClass: 'text-[8.5px] sm:text-[9px]',
      gap: 'gap-2 sm:gap-2.5',
    },
    md: {
      imageSize: 48,
      imgClass: 'w-10 h-10 sm:w-11 sm:h-11',
      titleClass: 'text-xl sm:text-[1.4rem]',
      subClass: 'text-[9.5px] sm:text-[10px]',
      gap: 'gap-2.5 sm:gap-3',
    },
    lg: {
      imageSize: 60,
      imgClass: 'w-12 h-12 sm:w-14 sm:h-14',
      titleClass: 'text-xl sm:text-2xl',
      subClass: 'text-[10px] sm:text-[11px]',
      gap: 'gap-3 sm:gap-3.5',
    },
    xl: {
      imageSize: 76,
      imgClass: 'w-16 h-16 sm:w-18 sm:h-18',
      titleClass: 'text-2xl sm:text-3xl',
      subClass: 'text-xs',
      gap: 'gap-3.5 sm:gap-4',
    },
  }[size];

  return (
    <a
      href="#"
      className={`flex items-center ${sizeStyles.gap} group cursor-pointer select-none ${className}`}
      aria-label="AsthaPay"
    >
      {/* High-Resolution Logo Badge Container */}
      <div className="relative flex items-center justify-center shrink-0">
        <div className={`relative ${sizeStyles.imgClass} rounded-full bg-white p-1 shadow-soft-md border border-slate-200/90 group-hover:scale-105 group-hover:shadow-coral-glow transition-all duration-300 overflow-hidden flex items-center justify-center`}>
          <Image
            src="/images/logo.png"
            alt="AsthaPay Logo"
            width={sizeStyles.imageSize}
            height={sizeStyles.imageSize}
            className="w-full h-full object-contain rounded-full"
            priority
          />
        </div>
        <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white"></span>
        </span>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className={`flex items-baseline tracking-tight font-black ${sizeStyles.titleClass} leading-none`}>
          <span className={isDark ? 'text-white' : 'text-brand-navy'}>Astha</span>
          <span className="text-brand-coral ml-[1px]">Pay</span>
          <span className="text-[11px] text-slate-400 font-bold ml-1">®</span>
        </div>
        <span className={`${sizeStyles.subClass} font-bold tracking-wider uppercase text-slate-500 mt-1`}>
          FinTech &amp; Banking Rails
        </span>
      </div>
    </a>
  );
};
