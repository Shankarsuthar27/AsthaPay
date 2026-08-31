'use client';

import React, { useState } from 'react';
import { SubServiceItem, ServiceCategoryKey } from '@/types';
import { ServiceIllustration } from './ServiceIllustration';
import { ArrowRight, CheckCircle2, Sparkles, Zap, ShieldCheck } from 'lucide-react';

interface ServiceItemCardProps {
  service: SubServiceItem;
  categoryId: ServiceCategoryKey;
  onExplore?: (service: SubServiceItem) => void;
}

export const ServiceItemCard: React.FC<ServiceItemCardProps> = ({
  service,
  categoryId,
  onExplore,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 p-5 flex flex-col items-center justify-between transition-all duration-300 relative overflow-hidden group min-w-[280px] sm:min-w-[310px] max-w-sm flex-1 hover:scale-105 select-none"
    >
      {/* Top Tag & Status */}
      <div className="flex items-center justify-between w-full mb-3 z-10">
        {service.badge ? (
          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-coral/10 text-brand-coral border border-brand-coral/20">
            {service.badge}
          </span>
        ) : (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
            Turnkey API
          </span>
        )}

        {service.popular && (
          <span className="flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            <Sparkles className="w-3 h-3 text-amber-500" /> Popular
          </span>
        )}
      </div>

      {/* Centered Graphic/Vector Illustration */}
      <div className="w-full mb-4">
        <ServiceIllustration
          serviceId={service.id}
          categoryId={categoryId}
          iconName={service.iconName}
          imageSrc={service.imageSrc}
        />
      </div>

      {/* Bold Card Title Below Graphic */}
      <div className="mb-3 text-center w-full">
        <h4 className="text-base font-bold text-brand-navy group-hover:text-brand-coral transition-colors duration-200 line-clamp-1">
          {service.title}
        </h4>
        <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed text-center font-normal">
          {service.shortDesc}
        </p>
      </div>

      {/* Feature Bullet Points */}
      {service.features && service.features.length > 0 && (
        <div className="space-y-1.5 my-2 w-full border-t border-slate-100 pt-3 text-left">
          {service.features.slice(0, 3).map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-600">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="truncate">{feat}</span>
            </div>
          ))}
        </div>
      )}

      {/* Card Action Link: Blue Button (Explore ->) */}
      <div className="pt-3 w-full flex items-center justify-between text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors border-t border-slate-100">
        <span className="flex items-center gap-1">
          Explore Service
        </span>
        <div className="w-7 h-7 rounded-full bg-blue-50 group-hover:bg-blue-600 group-hover:text-white text-blue-600 flex items-center justify-center transition-all duration-200">
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>

      {/* Smooth Hover Reveal Drawer Overlay */}
      <div
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A1931] via-[#0C2340] to-[#0D1B3E] text-white p-5 flex flex-col justify-between transition-all duration-300 ease-in-out transform ${
          isHovered
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded text-brand-coral border border-brand-coral/30">
              {service.badge || 'Ready API'}
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              99.99% SLA
            </span>
          </div>

          <h5 className="text-sm font-bold text-white mb-1.5">{service.title}</h5>
          <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-2 mb-3">
            {service.shortDesc}
          </p>

          <div className="space-y-1 py-2 border-t border-white/10">
            {service.features?.slice(0, 2).map((f, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[10px] text-slate-300">
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="truncate">{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
          <a
            href="#demo"
            className="text-xs font-bold text-sky-400 hover:text-white transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-white/10 hover:bg-sky-500 hover:text-white"
          >
            <span>Explore</span>
            <ArrowRight className="w-3 h-3" />
          </a>
          <span className="text-[10px] text-slate-400">Sandbox Ready</span>
        </div>
      </div>
    </div>
  );
};
