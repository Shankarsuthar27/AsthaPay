'use client';

import React from 'react';
import { whyChooseUsFeatures } from '@/data/featuresData';
import { DynamicIcon } from '../common/DynamicIcon';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50/60 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-coral-light border border-brand-coral/20 text-xs font-bold text-brand-coral mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Built for FinTech Scale</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy tracking-tight">
            Why FinTechs Choose <span className="gradient-text-coral">AsthaPay</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 mt-3 font-normal leading-relaxed">
            Eliminate vendor fragmentation and scale your merchant network with bank-grade turnkey infrastructure.
          </p>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUsFeatures.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Subtle top background highlight */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-coral/5 rounded-bl-full pointer-events-none -z-0 transition-transform group-hover:scale-125" />

              <div className="relative z-10">
                {/* Top Row: Number & Icon & Stat */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-black text-brand-coral tracking-tighter opacity-90">
                      {item.number}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-brand-pastel-blue text-brand-navy group-hover:bg-brand-coral group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                      <DynamicIcon name={item.iconName} className="w-5 h-5" />
                    </div>
                  </div>

                  {item.stat && (
                    <div className="text-right">
                      <div className="text-sm font-black text-brand-navy">{item.stat}</div>
                      <div className="text-[10px] text-slate-600 font-semibold">{item.statLabel}</div>
                    </div>
                  )}
                </div>

                {/* Horizontal Accent Bar */}
                <div className="w-12 h-1 bg-gradient-to-r from-brand-coral to-amber-500 rounded-full mb-5 group-hover:w-20 transition-all duration-300" />

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-brand-navy mb-3 group-hover:text-brand-coral transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                  {item.description}
                </p>
              </div>

              {/* Bottom Tags (2 Coral Pill Tags) */}
              <div className="relative z-10 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full bg-brand-coral-light text-brand-coral border border-brand-coral/20 group-hover:bg-brand-coral group-hover:text-white transition-colors"
                  >
                    <CheckCircle2 className="w-3 h-3 shrink-0" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Reassurance Strip */}
        <div className="mt-16 p-6 rounded-3xl bg-brand-navy text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-soft-xl">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-brand-coral/20 text-brand-coral flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">
                Custom Dedicated Bank Switch Integration
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Private cloud instances, hybrid bank switches, and customized message routers.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="px-6 py-3 rounded-full bg-brand-coral hover:bg-brand-coral-hover text-white text-xs font-bold shadow-coral-glow transition-all whitespace-nowrap flex items-center gap-2"
          >
            <span>Consult Architect</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
