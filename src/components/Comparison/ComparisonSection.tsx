'use client';

import React, { useState } from 'react';
import { comparisonData } from '@/data/comparisonData';
import { DynamicIcon } from '../common/DynamicIcon';
import { CalculatorWidget } from '../Calculator/CalculatorWidget';
import { CheckCircle2, AlertTriangle, Sparkles, XCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export const ComparisonSection: React.FC = () => {
  const [toggleMode, setToggleMode] = useState<'with' | 'without'>('with');

  return (
    <section id="comparison" className="py-12 sm:py-16 bg-gradient-to-b from-white via-[#EEF5FF]/50 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-coral-light border border-brand-coral/20 text-[11px] font-bold text-brand-coral mb-2.5">
            <Sparkles className="w-3 h-3" />
            <span>Turnkey vs In-House Build</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-navy tracking-tight">
            Building In-House vs.{' '}
            <span className="gradient-text-coral">Scaling with AsthaPay</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal leading-relaxed">
            Launch in 24 hours with pre-integrated multi-bank switches and automated compliance.
          </p>

          {/* Segmented Toggle Pill Bar */}
          <div className="mt-6 inline-flex p-1 rounded-full bg-slate-200/90 border border-slate-300/80 shadow-inner">
            <button
              onClick={() => setToggleMode('with')}
              className={`px-5 py-2 rounded-full text-xs sm:text-[13px] font-black transition-all duration-300 flex items-center gap-1.5 ${
                toggleMode === 'with'
                  ? 'bg-brand-navy text-white shadow-md scale-102'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <CheckCircle2 className={`w-3.5 h-3.5 ${toggleMode === 'with' ? 'text-brand-coral' : 'text-slate-500'}`} />
              <span>With AsthaPay</span>
            </button>

            <button
              onClick={() => setToggleMode('without')}
              className={`px-5 py-2 rounded-full text-xs sm:text-[13px] font-black transition-all duration-300 flex items-center gap-1.5 ${
                toggleMode === 'without'
                  ? 'bg-rose-600 text-white shadow-md scale-102'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <AlertTriangle className={`w-3.5 h-3.5 ${toggleMode === 'without' ? 'text-amber-300' : 'text-slate-500'}`} />
              <span>Without AsthaPay</span>
            </button>
          </div>
        </div>

        {/* 3x2 Grid of Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {comparisonData.map((card) => {
            const isHighlightMode = toggleMode === 'with';

            return (
              <div
                key={card.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-soft-sm hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* White Top Half: AsthaPay Solution */}
                <div className={`p-5 sm:p-6 transition-colors duration-300 ${isHighlightMode ? 'bg-white' : 'bg-slate-50/70'}`}>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-brand-pastel-blue text-brand-navy flex items-center justify-center shadow-2xs">
                        <DynamicIcon name={card.iconName} className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-black text-brand-navy">{card.title}</h4>
                    </div>

                    <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {card.withAsthaPay.highlightTag}
                    </span>
                  </div>

                  <h5 className="text-xs sm:text-[13px] font-bold text-slate-900 mb-2.5">
                    {card.withAsthaPay.heading}
                  </h5>

                  <div className="space-y-1.5">
                    {card.withAsthaPay.points.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Red/Orange Alert Banner: Without AsthaPay Pain Points */}
                <div
                  className={`p-4 transition-all duration-300 border-t ${
                    toggleMode === 'without'
                      ? 'bg-rose-50 border-rose-200 text-rose-950 ring-2 ring-rose-400/40'
                      : 'bg-orange-50/80 border-orange-100 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wide">
                      {card.withoutAsthaPay.alertHeading}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-700 leading-relaxed">
                    {card.withoutAsthaPay.description}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-rose-200/60 flex items-center justify-between text-[10px] font-bold text-rose-700">
                    <span>Direct Cost Impact:</span>
                    <span className="bg-white/80 px-1.5 py-0.5 rounded border border-rose-200 shadow-2xs">
                      {card.withoutAsthaPay.costImpact}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Embedded Interactive ROI / Revenue Calculator Widget */}
        <CalculatorWidget />
      </div>
    </section>
  );
};
