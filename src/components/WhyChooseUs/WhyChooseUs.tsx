'use client';

import React from 'react';
import { whyChooseUsFeatures } from '@/data/featuresData';
import { DynamicIcon } from '../common/DynamicIcon';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="py-12 sm:py-16 bg-gradient-to-b from-white via-slate-50/60 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-coral-light border border-brand-coral/20 text-[11px] font-bold text-brand-coral mb-2.5">
            <Sparkles className="w-3 h-3" />
            <span>Built for FinTech Scale</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-navy tracking-tight">
            Why FinTechs Choose <span className="gradient-text-coral">AsthaPay</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal leading-relaxed">
            Eliminate vendor fragmentation and scale your merchant network with bank-grade turnkey infrastructure.
          </p>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseUsFeatures.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Subtle top background highlight */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-brand-coral/5 rounded-bl-full pointer-events-none -z-0 transition-transform group-hover:scale-125" />

              <div className="relative z-10">
                {/* Top Row: Number & Icon & Stat */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl font-black text-brand-coral tracking-tighter opacity-90">
                      {item.number}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-brand-pastel-blue text-brand-navy group-hover:bg-brand-coral group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                      <DynamicIcon name={item.iconName} className="w-4 h-4" />
                    </div>
                  </div>

                  {item.stat && (
                    <div className="text-right">
                      <div className="text-xs font-black text-brand-navy">{item.stat}</div>
                      <div className="text-[9px] text-slate-600 font-semibold">{item.statLabel}</div>
                    </div>
                  )}
                </div>

                {/* Horizontal Accent Bar */}
                <div className="w-10 h-1 bg-gradient-to-r from-brand-coral to-amber-500 rounded-full mb-4 group-hover:w-16 transition-all duration-300" />

                {/* Title & Description */}
                <h3 className="text-base sm:text-lg font-bold text-brand-navy mb-2 group-hover:text-brand-coral transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal mb-5">
                  {item.description}
                </p>
              </div>

              {/* Bottom Tags (2 Coral Pill Tags) */}
              <div className="relative z-10 pt-3.5 border-t border-slate-100 flex flex-wrap gap-1.5">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-coral-light text-brand-coral border border-brand-coral/20 group-hover:bg-brand-coral group-hover:text-white transition-colors"
                  >
                    <CheckCircle2 className="w-2.5 h-2.5 shrink-0" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Reassurance Strip */}
        <div className="mt-12 p-5 rounded-3xl bg-brand-navy text-white flex flex-col md:flex-row items-center justify-between gap-5 shadow-soft-xl">
          <div className="flex items-center gap-3.5 text-center md:text-left">
            <div className="w-10 h-10 rounded-xl bg-brand-coral/20 text-brand-coral flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                Custom Dedicated Bank Switch Integration
              </h4>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Private cloud instances, hybrid bank switches, and customized message routers.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="px-5 py-2.5 rounded-full bg-brand-coral hover:bg-brand-coral-hover text-white text-[11px] font-bold shadow-coral-glow transition-all whitespace-nowrap flex items-center gap-1.5"
          >
            <span>Consult Architect</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
