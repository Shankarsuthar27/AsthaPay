'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  formatCommas?: boolean;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  from = 0,
  to,
  duration = 2.2,
  decimals = 0,
  prefix = '',
  suffix = '',
  formatCommas = true,
}) => {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easedProgress = easeOutExpo(progress);
      const currentVal = from + (to - from) * easedProgress;

      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(to);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [inView, from, to, duration]);

  const formattedNumber = () => {
    if (decimals > 0) {
      return count.toFixed(decimals);
    }
    const rounded = Math.round(count);
    return formatCommas ? rounded.toLocaleString('en-US') : rounded.toString();
  };

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {formattedNumber()}
      {suffix}
    </span>
  );
};

export const TrustBar: React.FC = () => {
  const certifications = [
    { name: 'NPCI Registered', tag: 'Turnkey Switch' },
    { name: 'BBPS Central Unit', tag: 'Direct TSP' },
    { name: 'PCI-DSS Level 1', tag: 'Certified' },
    { name: 'ISO 27001:2013', tag: 'Security Standard' },
    { name: '100% RBI Compliant', tag: '194N & KYC Ready' }
  ];

  return (
    <div className="relative overflow-hidden py-10 sm:py-16 bg-gradient-to-r from-[#edf4ff] via-white to-[#fff1ee] border-y border-slate-200/80">
      {/* Background Soft Glow Accents */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-rose-300/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Compliance Badges Marquee / Strip */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mb-10 text-[11px] font-semibold text-slate-700">
          <span className="text-slate-500 uppercase tracking-wider text-[10px] font-extrabold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Trusted & Compliant With:</span>
          </span>
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-slate-200/90 text-slate-800 shadow-2xs hover:border-[#FF5733]/40 transition-colors"
            >
              <CheckCircle2 className="w-3 h-3 text-[#FF5733]" />
              <span className="font-bold">{cert.name}</span>
              <span className="text-[9.5px] text-slate-500 font-normal">({cert.tag})</span>
            </div>
          ))}
        </div>

        {/* Main Grid: Left Titles + Right Staggered Floating Dark Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading & POWERING Branding */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-8 text-center lg:text-left">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.08] text-[#0A1931]">
                Excellence<br />
                Backed By<br />
                <span className="text-[#FF5733]">Numbers</span>
              </h2>
            </div>

            {/* POWERING scale. trust. execution. */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-3">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tighter text-[#0A1931] uppercase font-sans">
                POWERING
              </span>
              <div className="flex flex-col text-left text-[11px] sm:text-xs font-bold text-[#2563eb] leading-tight border-l-2 border-[#2563eb]/40 pl-2">
                <span>scale.</span>
                <span>trust.</span>
                <span>execution.</span>
              </div>
            </div>
          </div>

          {/* Right Column: 5 Staggered Stepped Dark Navy Cards with Counter Animations */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 items-center">
              {/* Col 1: Single Center-Aligned Card */}
              <div className="sm:self-center">
                <div className="bg-[#061A36] rounded-2xl p-5 sm:p-6 shadow-xl border border-slate-800 hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-center min-h-[140px] sm:min-h-[150px]">
                  <div className="text-2xl sm:text-3xl font-black text-[#FF5733] tracking-tight">
                    <AnimatedCounter to={5000} suffix="+" duration={2} />
                  </div>
                  <div className="text-xs sm:text-[13px] font-bold text-white mt-1.5 leading-snug">
                    Clients and Partners
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    FinTechs & Distributors
                  </div>
                </div>
              </div>

              {/* Col 2: Two Vertically Stacked Cards */}
              <div className="space-y-3.5 sm:space-y-4">
                {/* Card 1: 25,000+ */}
                <div className="bg-[#061A36] rounded-2xl p-5 sm:p-6 shadow-xl border border-slate-800 hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-center min-h-[140px] sm:min-h-[150px]">
                  <div className="text-2xl sm:text-3xl font-black text-[#FF5733] tracking-tight">
                    <AnimatedCounter to={25000} suffix="+" duration={2.2} />
                  </div>
                  <div className="text-xs sm:text-[13px] font-bold text-white mt-1.5 leading-snug">
                    Agent Network
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    (MD/DT/RT Touchpoints)
                  </div>
                </div>

                {/* Card 2: 10M+ */}
                <div className="bg-[#061A36] rounded-2xl p-5 sm:p-6 shadow-xl border border-slate-800 hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-center min-h-[140px] sm:min-h-[150px]">
                  <div className="text-2xl sm:text-3xl font-black text-[#FF5733] tracking-tight">
                    <AnimatedCounter to={10} suffix="M+" duration={1.8} />
                  </div>
                  <div className="text-xs sm:text-[13px] font-bold text-white mt-1.5 leading-snug">
                    Monthly Transactions
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    ₹5,000+ Cr Monthly GTV
                  </div>
                </div>
              </div>

              {/* Col 3: Two Vertically Stacked Cards */}
              <div className="space-y-3.5 sm:space-y-4">
                {/* Card 1: 49+ */}
                <div className="bg-[#061A36] rounded-2xl p-5 sm:p-6 shadow-xl border border-slate-800 hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-center min-h-[140px] sm:min-h-[150px]">
                  <div className="text-2xl sm:text-3xl font-black text-[#FF5733] tracking-tight">
                    <AnimatedCounter to={49} suffix="+" duration={1.8} />
                  </div>
                  <div className="text-xs sm:text-[13px] font-bold text-white mt-1.5 leading-snug">
                    Vendor Integrations
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Multi-Bank Switches
                  </div>
                </div>

                {/* Card 2: 99.99% */}
                <div className="bg-[#061A36] rounded-2xl p-5 sm:p-6 shadow-xl border border-slate-800 hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-center min-h-[140px] sm:min-h-[150px]">
                  <div className="text-2xl sm:text-3xl font-black text-[#FF5733] tracking-tight">
                    <AnimatedCounter to={99.99} decimals={2} suffix="%" duration={2.2} />
                  </div>
                  <div className="text-xs sm:text-[13px] font-bold text-white mt-1.5 leading-snug">
                    Platform Uptime
                  </div>
                  <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">
                    ● High Availability SLA
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
