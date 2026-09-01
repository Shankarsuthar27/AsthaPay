'use client';

import React from 'react';
import { SubServiceItem, ServiceCategoryKey } from '@/types';
import { ServiceIllustration } from './ServiceIllustration';

interface ServiceItemCardProps {
  service: SubServiceItem;
  categoryId: ServiceCategoryKey;
  onExplore?: (service: SubServiceItem) => void;
}

export const ServiceItemCard: React.FC<ServiceItemCardProps> = ({
  service,
  categoryId,
}) => {
  return (
    <div className="bg-white rounded-[24px] shadow-sm hover:shadow-md border border-slate-100/90 p-3 sm:p-4 flex flex-col items-center justify-between transition-all duration-300 relative group w-[76vw] max-w-[265px] sm:w-[280px] h-[315px] sm:h-[340px] select-none shrink-0 hover:-translate-y-0.5">
      {/* Centered Smartphone Graphic / Illustration */}
      <div className="w-full flex-1 flex items-center justify-center pt-1">
        <ServiceIllustration
          serviceId={service.id}
          categoryId={categoryId}
          iconName={service.iconName}
          imageSrc={service.imageSrc}
        />
      </div>

      {/* Bold Card Title Below Graphic matching reference image */}
      <div className="w-full pt-2 pb-1 text-center min-h-[44px] flex items-center justify-center">
        <h4 className="text-[14px] sm:text-[15px] font-bold text-[#0A1931] group-hover:text-[#FF5733] transition-colors leading-snug line-clamp-2">
          {service.title}
        </h4>
      </div>
    </div>
  );
};
