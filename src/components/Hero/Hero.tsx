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
      service: 'AePS Biometric Cash Withdrawal',
      amount: '₹ 2,500.00',
      bank: 'ICICI Switch',
      commission: '+₹ 7.50',
      status: 'Success',
      time: 'Just now'
    },
    {
      service: 'BBPS Electricity Bill Settlement',
      amount: '₹ 1,840.00',
      bank: 'NPCI Central Switch',
      commission: '+₹ 3.20',
      status: 'Success',
      time: '2s ago'
    },
    {
      service: 'Micro-ATM Debit Card Payout',
      amount: '₹ 10,000.00',
      bank: 'Axis Switch',
      commission: '+₹ 18.00',
      status: 'Success',
      time: '5s ago'
    },
    {
      service: 'Instant DMT IMPS Remittance',
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
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-slate-200 shadow-soft-sm text-xs font-bold text-brand-navy hover:border-brand-coral/40 transition-colors">
              <span className="flex h-2 w-2 rounded-full bg-brand-coral animate-ping"></span>
              <span className="text-brand-coral">⚡ Turnkey FinTech Stack</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600 font-medium">White-Label & Developer APIs</span>
            </div>

            {/* Bold Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-black text-brand-navy tracking-tight leading-[1.12]">
              Power Your FinTech With{' '}
              <span className="gradient-text-coral">25+ Turnkey Banking</span> & Payment Services
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Launch <strong className="text-slate-900 font-semibold">AePS, Micro-ATM, DMT, and BBPS</strong> under your own brand in 24 hours. Single wallet, instant settlements, and multi-bank switches.
            </p>

            {/* Feature Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-semibold text-slate-700 text-left">
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-slate-200/60 shadow-2xs">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Single Unified Wallet</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-slate-200/60 shadow-2xs">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% White-Label</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-slate-200/60 shadow-2xs">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>99.99% Multi-Bank SLA</span>
              </div>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenDemoModal}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-brand-coral via-[#FF6247] to-brand-coral-hover text-white font-bold text-base shadow-coral-glow hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 group"
              >
                <span>Schedule Free Demo</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#banking"
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-white hover:bg-slate-50 text-brand-navy font-bold text-base border border-slate-200/90 shadow-soft-sm hover:border-brand-coral/40 transition-all flex items-center justify-center gap-2.5 group"
              >
                <Terminal className="w-4 h-4 text-brand-coral" />
                <span>Explore Services</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brand-coral group-hover:translate-x-0.5 transition-all" />
              </a>
            </div>

            {/* Small reassurance */}
            <div className="flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Zero Security Deposit
              </span>
              <span>•</span>
              <span>No Code Required</span>
              <span>•</span>
              <span>24/7 SLA Support</span>
            </div>
          </div>

          {/* Right Column: Interactive FinTech Visual Engine */}
          <div className="lg:col-span-5 relative">
            {/* Glow Aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-coral/20 to-blue-500/20 rounded-3xl blur-2xl -z-10" />

            {/* Main Interactive Dashboard Card */}
            <div className="bg-white rounded-3xl p-6 shadow-soft-xl border border-slate-100/80 relative overflow-hidden backdrop-blur-md">
              {/* Card Top Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-navy flex items-center justify-center text-white font-black text-sm shadow-sm">
                    AP
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-navy flex items-center gap-1.5">
                      <span>Enterprise Admin Terminal</span>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-700">
                        LIVE
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600">Switch ID: #ASTHA-NODE-IND-01</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-wider font-bold text-slate-600">
                    Unified Balance
                  </div>
                  <div className="text-base font-black text-brand-navy">₹ 8,45,290.50</div>
                </div>
              </div>

              {/* Multi-Bank Switch Status Bar */}
              <div className="my-4 p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5 text-brand-coral animate-spin" />
                    Multi-Bank Routing Telemetry
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    100% Operational
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
                  <div className="bg-white p-1.5 rounded-lg border border-slate-200/70 font-semibold text-slate-800">
                    <div className="text-emerald-600 font-bold">● ICICI</div>
                    <div className="text-[9px] text-slate-600">12ms SLA</div>
                  </div>
                  <div className="bg-white p-1.5 rounded-lg border border-slate-200/70 font-semibold text-slate-800">
                    <div className="text-emerald-600 font-bold">● Axis</div>
                    <div className="text-[9px] text-slate-600">18ms SLA</div>
                  </div>
                  <div className="bg-white p-1.5 rounded-lg border border-slate-200/70 font-semibold text-slate-800">
                    <div className="text-emerald-600 font-bold">● YES Bank</div>
                    <div className="text-[9px] text-slate-600">15ms SLA</div>
                  </div>
                  <div className="bg-white p-1.5 rounded-lg border border-slate-200/70 font-semibold text-slate-800">
                    <div className="text-emerald-600 font-bold">● NSDL</div>
                    <div className="text-[9px] text-slate-600">22ms SLA</div>
                  </div>
                </div>
              </div>

              {/* Dynamic Live Transaction Stream Box */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-navy">Live Network Activity</span>
                  <span className="text-[10px] text-slate-600 font-medium">Auto-refreshing</span>
                </div>

                {/* Animated Current Transaction Box */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-coral-light/60 to-white border border-brand-coral/20 shadow-sm transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-brand-coral bg-brand-coral/10 px-2 py-0.5 rounded-md">
                      {currentTx.service}
                    </span>
                    <span className="text-[10px] text-slate-600 font-medium">{currentTx.time}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-black text-brand-navy">{currentTx.amount}</div>
                      <div className="text-[11px] text-slate-600">{currentTx.bank}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                        {currentTx.commission}
                      </div>
                      <div className="text-[10px] text-slate-600 mt-0.5">Instant Retailer Margin</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Mini Badges */}
              <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-100">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-navy">194N TDS Auto</div>
                    <div className="text-[10px] text-slate-600">Zero Tax Liability</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-navy">Auto Retries</div>
                    <div className="text-[10px] text-slate-600">99.9% Success Rate</div>
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
