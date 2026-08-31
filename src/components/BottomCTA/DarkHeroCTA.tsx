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
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-brand-coral">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Zero Upfront Engineering</span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight leading-[1.15] text-white">
                Scale Your Network.{' '}
                <span className="gradient-text-coral">Power More Services.</span>
              </h2>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
                Join 1,200+ FinTechs, master distributors, and rural banking partners on AsthaPay.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={onOpenDemoModal}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-brand-coral via-[#FF6247] to-brand-coral-hover text-white font-black text-base shadow-coral-glow hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3 group"
                >
                  <span>Schedule a Demo</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="#services"
                  className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/20 transition-all flex items-center justify-center gap-2.5"
                >
                  <span>Explore Solutions</span>
                </a>
              </div>

              {/* Feature Points */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-xs font-semibold text-slate-300">
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>24-Hour Deployment</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Your Brand & Logo</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Multi-Bank Switch</span>
                </div>
              </div>
            </div>

            {/* Right Card / Interactive Quick Contact Form */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-2">
                Instant Sandbox & Pricing
              </h3>
              <p className="text-xs text-slate-300 mb-6">
                Enter your work email for Swagger API docs and commission slabs.
              </p>

              {submitted ? (
                <div className="bg-emerald-500/20 border border-emerald-400/40 rounded-2xl p-5 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
                    ✓
                  </div>
                  <div className="text-sm font-bold text-white">Access Credentials Sent!</div>
                  <p className="text-xs text-slate-300">
                    Check your inbox for API keys and sandbox docs.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Business Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="founder@yourfintech.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-coral transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-brand-coral hover:bg-brand-coral-hover text-white text-xs font-black uppercase tracking-wider shadow-coral-glow transition-all flex items-center justify-center gap-2"
                  >
                    <span>Get Sandbox Access</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/10">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Privacy
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
