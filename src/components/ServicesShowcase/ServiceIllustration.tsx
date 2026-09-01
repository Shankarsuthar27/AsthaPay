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
  if (imageSrc) {
    return (
      <div className="w-full h-52 sm:h-56 flex items-center justify-center p-1 relative overflow-hidden select-none">
        {/* Centered Phone / Vector Illustration */}
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={imageSrc}
            alt={serviceId}
            width={280}
            height={340}
            priority
            className="h-full w-auto max-h-[210px] sm:max-h-[225px] object-contain mx-auto drop-shadow-xs transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>
    );
  }

  // Fallback Modern Phone Mockup Container with clean vector graphics
  return (
    <div className="w-full h-52 sm:h-56 flex items-center justify-center p-1 relative overflow-hidden select-none">
      {/* Smartphone frame */}
      <div className="w-[170px] sm:w-[185px] h-[210px] sm:h-[220px] rounded-[26px] bg-gradient-to-b from-[#F3F8FF] via-white to-[#EAF3FF] border-2 border-slate-200/80 shadow-sm flex flex-col justify-between p-3 relative overflow-hidden group-hover:border-blue-300 transition-colors">
        {/* Notch / Speaker */}
        <div className="w-12 h-2.5 bg-slate-200/70 rounded-full mx-auto" />

        {/* Center Graphic */}
        <div className="flex flex-col items-center my-auto">
          <div className="w-14 h-14 rounded-2xl bg-white shadow-soft-md border border-blue-100 flex items-center justify-center text-[#FF5733] group-hover:scale-110 transition-transform">
            <DynamicIcon name={iconName} className="w-7 h-7" />
          </div>
          <div className="mt-2.5 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200/60 text-[8.5px] font-bold text-blue-700 uppercase tracking-wide">
            Turnkey API
          </div>
        </div>

        {/* Bottom bar indicator */}
        <div className="w-10 h-1 bg-slate-300/80 rounded-full mx-auto" />
      </div>
    </div>
  );
};
