'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, PhoneCall, Mail, Terminal, Send } from 'lucide-react';

interface DarkHeroCTAProps {
  onOpenDemoModal: () => void;
}

export const DarkHeroCTA: React.FC<DarkHeroCTAProps> = ({ onOpenDemoModal }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section id="demo" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[40px] bg-gradient-to-br from-brand-navy via-brand-navy-card to-brand-navy-deep p-8 sm:p-14 lg:p-20 text-white shadow-2xl border border-slate-700/80 overflow-hidden">
          {/* Background Geometric Mesh & Ambient Blobs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-coral/20 rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="absolute inset-0 bg-dot-pattern-dark opacity-30 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] font-bold text-brand-coral">
                <Sparkles className="w-3 h-3" />
                <span>Zero Upfront Engineering</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-4xl font-black tracking-tight leading-[1.15] text-white">
                Scale Your Network.{' '}
                <span className="gradient-text-coral">Power More Services.</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl font-normal leading-relaxed">
                Join 1,200+ FinTechs, master distributors, and rural banking partners on AsthaPay.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1.5">
                <button
                  onClick={onOpenDemoModal}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-brand-coral via-[#FF6247] to-brand-coral-hover text-white font-black text-sm shadow-coral-glow hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
                >
                  <span>Schedule a Demo</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="#services"
                  className="w-full sm:w-auto px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore Solutions</span>
                </a>
              </div>

              {/* Feature Points */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 text-[11px] font-semibold text-slate-300">
                <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>24-Hour Deployment</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Your Brand & Logo</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Multi-Bank Switch</span>
                </div>
              </div>
            </div>

            {/* Right Card / Interactive Quick Contact Form */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-xl p-6 sm:p-7 rounded-3xl border border-white/20 shadow-2xl">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5">
                Instant Sandbox & Pricing
              </h3>
              <p className="text-xs text-slate-300 mb-4">
                Enter your work email for Swagger API docs and commission slabs.
              </p>

              {submitted ? (
                <div className="bg-emerald-500/20 border border-emerald-400/40 rounded-2xl p-4 text-center space-y-1.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-sm">
                    ✓
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white">Access Credentials Sent!</div>
                  <p className="text-[11px] text-slate-300">
                    Check your inbox for API keys and sandbox docs.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      Business Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="founder@yourfintech.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brand-coral transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-5 rounded-xl bg-brand-coral hover:bg-brand-coral-hover text-white text-[11px] font-black uppercase tracking-wider shadow-coral-glow transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Get Sandbox Access</span>
                    <Send className="w-3 h-3" />
                  </button>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1.5 border-t border-white/10">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" /> 100% Privacy
                    </span>
                    <span>Support: 1800-123-4567</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
