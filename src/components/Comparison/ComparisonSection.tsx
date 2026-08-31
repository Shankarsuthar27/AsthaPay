'use client';

import React, { useState } from 'react';
import { comparisonData } from '@/data/comparisonData';
import { DynamicIcon } from '../common/DynamicIcon';
import { CalculatorWidget } from '../Calculator/CalculatorWidget';
import { CheckCircle2, AlertTriangle, Sparkles, XCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export const ComparisonSection: React.FC = () => {
  const [toggleMode, setToggleMode] = useState<'with' | 'without'>('with');

  return (
    <section id="comparison" className="py-16 sm:py-24 bg-gradient-to-b from-white via-[#EEF5FF]/50 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-coral-light border border-brand-coral/20 text-xs font-bold text-brand-coral mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Turnkey vs In-House Build</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy tracking-tight">
            Building In-House vs.{' '}
            <span className="gradient-text-coral">Scaling with AsthaPay</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 mt-3 font-normal leading-relaxed">
            Launch in 24 hours with pre-integrated multi-bank switches and automated compliance.
          </p>

          {/* Segmented Toggle Pill Bar */}
          <div className="mt-8 inline-flex p-1.5 rounded-full bg-slate-200/90 border border-slate-300/80 shadow-inner">
            <button
              onClick={() => setToggleMode('with')}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all duration-300 flex items-center gap-2 ${
                toggleMode === 'with'
                  ? 'bg-brand-navy text-white shadow-md scale-102'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 ${toggleMode === 'with' ? 'text-brand-coral' : 'text-slate-500'}`} />
              <span>With AsthaPay</span>
            </button>

            <button
              onClick={() => setToggleMode('without')}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all duration-300 flex items-center gap-2 ${
                toggleMode === 'without'
                  ? 'bg-rose-600 text-white shadow-md scale-102'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <AlertTriangle className={`w-4 h-4 ${toggleMode === 'without' ? 'text-amber-300' : 'text-slate-500'}`} />
              <span>Without AsthaPay</span>
            </button>
          </div>
        </div>

        {/* 3x2 Grid of Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {comparisonData.map((card) => {
            const isHighlightMode = toggleMode === 'with';

            return (
              <div
                key={card.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-soft-sm hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* White Top Half: AsthaPay Solution */}
                <div className={`p-6 sm:p-7 transition-colors duration-300 ${isHighlightMode ? 'bg-white' : 'bg-slate-50/70'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-brand-pastel-blue text-brand-navy flex items-center justify-center shadow-2xs">
                        <DynamicIcon name={card.iconName} className="w-5 h-5" />
                      </div>
                      <h4 className="text-base font-black text-brand-navy">{card.title}</h4>
                    </div>

                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {card.withAsthaPay.highlightTag}
                    </span>
                  </div>

                  <h5 className="text-sm font-bold text-slate-900 mb-3">
                    {card.withAsthaPay.heading}
                  </h5>

                  <div className="space-y-2">
                    {card.withAsthaPay.points.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Red/Orange Alert Banner: Without AsthaPay Pain Points */}
                <div
                  className={`p-5 transition-all duration-300 border-t ${
                    toggleMode === 'without'
                      ? 'bg-rose-50 border-rose-200 text-rose-950 ring-2 ring-rose-400/40'
                      : 'bg-orange-50/80 border-orange-100 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span className="text-xs font-bold text-rose-800 uppercase tracking-wide">
                      {card.withoutAsthaPay.alertHeading}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {card.withoutAsthaPay.description}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-rose-200/60 flex items-center justify-between text-[11px] font-bold text-rose-700">
                    <span>Direct Cost Impact:</span>
                    <span className="bg-white/80 px-2 py-0.5 rounded border border-rose-200 shadow-2xs">
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
