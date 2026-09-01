'use client';

import React from 'react';
import { whyChooseUsFeatures } from '@/data/featuresData';
import { Zap } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="py-12 sm:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFEFEB] border border-[#FFDCD4] text-xs font-bold text-[#EA5843] mb-3 shadow-2xs">
            <Zap className="w-3.5 h-3.5 fill-[#EA5843] text-[#EA5843]" />
            <span>The AsthaPay Edge</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A1931] tracking-tight">
            Why <span className="text-[#EA5843]">Choose Us</span>
          </h2>

          {/* Subtitle */}
          <p className="text-[13.5px] sm:text-base text-slate-600 max-w-xl mx-auto mt-2.5 font-normal leading-relaxed">
            A complete platform combining services, scalability, compliance, and ongoing support.
          </p>
        </div>

        {/* Clean Responsive Grid (Stacked on Mobile, 3x2 on Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 sm:gap-x-12 sm:gap-y-14">
          {whyChooseUsFeatures.map((item) => (
            <div key={item.id} className="flex flex-col justify-between group">
              <div>
                {/* Number & Dash line */}
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="text-[#EA5843] font-black text-lg tracking-tight shrink-0">
                    {item.number}
                  </span>
                  <span className="w-8 h-[2px] bg-[#0A1931] rounded-full shrink-0" />
                </div>

                {/* Title */}
                <h3 className="text-[22px] sm:text-xl font-black text-[#0A1931] tracking-tight mb-2 sm:mb-2 group-hover:text-[#EA5843] transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-[13.5px] sm:text-[13px] text-slate-600 leading-relaxed font-normal mb-4 sm:mb-4">
                  {item.description}
                </p>
              </div>

              {/* Bottom Tags (Full width stacked pill bars on mobile, compact pills on desktop) */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2 sm:gap-2 pt-1">
                {item.tags.map((tag, idx) => (
                  <div
                    key={idx}
                    className="w-full sm:w-auto text-center py-2 sm:py-1 px-4 rounded-full bg-[#EA5843] hover:bg-[#d94833] text-white text-[12px] sm:text-[10.5px] font-bold shadow-2xs transition-colors cursor-default"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
