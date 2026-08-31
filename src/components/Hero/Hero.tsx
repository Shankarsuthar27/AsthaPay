'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Play, Terminal, CheckCircle, RefreshCw, Zap, ArrowUpRight, Lock, Smartphone, CreditCard, ChevronRight } from 'lucide-react';
import { TrustBar } from './TrustBar';

interface HeroProps {
  onOpenDemoModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDemoModal }) => {
  const [activeTxIndex, setActiveTxIndex] = useState(0);

  const mockLiveTransactions = [
    {
      service: 'AePS Cash Withdrawal',
      amount: '₹ 2,500.00',
      bank: 'ICICI Switch',
      commission: '+₹ 7.50',
      status: 'Success',
      time: 'Just now'
    },
    {
      service: 'BBPS Bill Pay',
      amount: '₹ 1,840.00',
      bank: 'NPCI Switch',
      commission: '+₹ 3.20',
      status: 'Success',
      time: '2s ago'
    },
    {
      service: 'Micro-ATM Cash',
      amount: '₹ 10,000.00',
      bank: 'Axis Switch',
      commission: '+₹ 18.00',
      status: 'Success',
      time: '5s ago'
    },
    {
      service: 'DMT Remittance',
      amount: '₹ 4,950.00',
      bank: 'YES Bank Switch',
      commission: '+₹ 12.50',
      status: 'Success',
      time: '9s ago'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTxIndex((prev) => (prev + 1) % mockLiveTransactions.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [mockLiveTransactions.length]);

  const currentTx = mockLiveTransactions[activeTxIndex];

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pb-16">
      {/* Background Decorative Gradients & Mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-3xl" />
        <div className="absolute top-10 right-10 w-[450px] h-[450px] bg-brand-coral/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-[350px] h-[350px] bg-indigo-200/30 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-200 shadow-soft-sm text-xs font-bold text-brand-navy">
              <span className="flex h-2 w-2 rounded-full bg-brand-coral animate-ping"></span>
              <span className="text-brand-coral font-bold">⚡ Turnkey Stack</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500 font-medium">White-Label & APIs</span>
            </div>

            {/* Bold Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.35rem] font-black text-brand-navy tracking-tight leading-[1.12]">
              Power Your FinTech With{' '}
              <span className="gradient-text-coral">Turnkey Banking</span> APIs
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Launch AePS, Micro-ATM, DMT & BBPS in 24 hours under your own brand.
            </p>

            {/* Feature Checkpoints */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1 text-xs font-semibold text-slate-700">
              <span className="inline-flex items-center gap-1.5 bg-white/90 px-3 py-1.5 rounded-full border border-slate-200/70 shadow-2xs">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Unified Wallet</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/90 px-3 py-1.5 rounded-full border border-slate-200/70 shadow-2xs">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>100% White-Label</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/90 px-3 py-1.5 rounded-full border border-slate-200/70 shadow-2xs">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>99.99% SLA</span>
              </span>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenDemoModal}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-brand-coral via-[#FF6247] to-brand-coral-hover text-white font-bold text-base shadow-coral-glow hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5 group"
              >
                <span>Schedule Free Demo</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#banking"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 text-brand-navy font-bold text-base border border-slate-200/90 shadow-soft-sm hover:border-brand-coral/40 transition-all flex items-center justify-center gap-2 group"
              >
                <Terminal className="w-4 h-4 text-brand-coral" />
                <span>Explore Services</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brand-coral group-hover:translate-x-0.5 transition-all" />
              </a>
            </div>

            {/* Small reassurance */}
            <div className="flex items-center justify-center lg:justify-start gap-3 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Zero Deposit
              </span>
              <span>•</span>
              <span>No Code Setup</span>
              <span>•</span>
              <span>24/7 SLA</span>
            </div>
          </div>

          {/* Right Column: Interactive FinTech Visual Engine */}
          <div className="lg:col-span-5 relative">
            {/* Glow Aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-coral/20 to-blue-500/20 rounded-3xl blur-2xl -z-10" />

            {/* Main Interactive Dashboard Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-soft-xl border border-slate-100/80 relative overflow-hidden backdrop-blur-md">
              {/* Card Top Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-navy flex items-center justify-center text-white font-black text-xs shadow-sm">
                    AP
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-navy flex items-center gap-1.5">
                      <span>Admin Terminal</span>
                      <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-700">
                        LIVE
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500">Node: #ASTHA-01</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[9px] uppercase tracking-wider font-bold text-slate-500">
                    Unified Balance
                  </div>
                  <div className="text-base font-black text-brand-navy">₹ 8,45,290.50</div>
                </div>
              </div>

              {/* Multi-Bank Switch Status Bar */}
              <div className="my-3.5 p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 flex items-center gap-1.5 text-[11px]">
                    <RefreshCw className="w-3 h-3 text-brand-coral animate-spin" />
                    Multi-Bank Telemetry
                  </span>
                  <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    100% Up
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
                  <div className="bg-white p-1 rounded-lg border border-slate-200/70">
                    <div className="text-emerald-600 font-bold">● ICICI</div>
                    <div className="text-[9px] text-slate-500">12ms</div>
                  </div>
                  <div className="bg-white p-1 rounded-lg border border-slate-200/70">
                    <div className="text-emerald-600 font-bold">● Axis</div>
                    <div className="text-[9px] text-slate-500">18ms</div>
                  </div>
                  <div className="bg-white p-1 rounded-lg border border-slate-200/70">
                    <div className="text-emerald-600 font-bold">● YES</div>
                    <div className="text-[9px] text-slate-500">15ms</div>
                  </div>
                  <div className="bg-white p-1 rounded-lg border border-slate-200/70">
                    <div className="text-emerald-600 font-bold">● NSDL</div>
                    <div className="text-[9px] text-slate-500">22ms</div>
                  </div>
                </div>
              </div>

              {/* Dynamic Live Transaction Stream Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-brand-navy">Live Activity</span>
                  <span className="text-[9px] text-slate-500 font-medium">Real-time</span>
                </div>

                {/* Animated Current Transaction Box */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-brand-coral-light/60 to-white border border-brand-coral/20 shadow-sm transition-all duration-300">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-brand-coral bg-brand-coral/10 px-2 py-0.5 rounded-md">
                      {currentTx.service}
                    </span>
                    <span className="text-[9px] text-slate-500">{currentTx.time}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-base font-black text-brand-navy">{currentTx.amount}</div>
                      <div className="text-[10px] text-slate-500">{currentTx.bank}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {currentTx.commission}
                      </div>
                      <div className="text-[9px] text-slate-500 mt-0.5">Instant Margin</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Mini Badges */}
              <div className="grid grid-cols-2 gap-2.5 mt-3 pt-2.5 border-t border-slate-100">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-brand-navy">194N TDS Auto</div>
                    <div className="text-[9px] text-slate-500">Zero Liability</div>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-brand-navy">Auto Retries</div>
                    <div className="text-[9px] text-slate-500">99.9% Success</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Trust & Certifications Bar */}
      <TrustBar />
    </section>
  );
};
