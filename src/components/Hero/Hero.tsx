'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Terminal, CheckCircle, ChevronRight } from 'lucide-react';
import { TrustBar } from './TrustBar';

interface HeroProps {
  onOpenDemoModal: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const itemFadeDown = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const itemFadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const Hero: React.FC<HeroProps> = ({ onOpenDemoModal }) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pb-16">
      {/* Background Decorative Gradients & Mesh with Smooth Ambient Floating Motion */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] pointer-events-none -z-10 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -18, 0],
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 22, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute top-10 right-10 w-[450px] h-[450px] bg-brand-coral/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 15, 0],
            y: [0, -12, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute top-1/2 left-1/3 w-[350px] h-[350px] bg-indigo-200/30 rounded-full blur-2xl"
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-5"
        >
          {/* Pill Badge */}
          <motion.div variants={itemFadeDown} className="inline-block">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-slate-200 shadow-soft-sm text-[11px] font-bold text-brand-navy mx-auto hover:border-brand-coral/40 transition-colors">
              <span className="flex h-1.5 w-1.5 rounded-full bg-brand-coral animate-ping"></span>
              <span className="text-brand-coral font-bold">⚡ Turnkey Stack</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500 font-medium">White-Label & APIs</span>
            </div>
          </motion.div>

          {/* Bold Headline */}
          <motion.h1
            variants={itemFadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy tracking-tight leading-[1.12] max-w-3xl mx-auto"
          >
            Power Your FinTech With{' '}
            <span className="gradient-text-coral">Turnkey Banking</span> APIs
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemFadeUp}
            className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Launch AePS, Micro-ATM, DMT & BBPS in 24 hours under your own brand.
          </motion.p>

          {/* Feature Checkpoints */}
          <motion.div
            variants={itemFadeUp}
            className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[11.5px] font-semibold text-slate-700"
          >
            <motion.span
              variants={pillVariants}
              whileHover={{ y: -2, scale: 1.03 }}
              className="inline-flex items-center gap-1.5 bg-white/95 px-3 py-1.5 rounded-full border border-slate-200/80 shadow-2xs transition-shadow hover:shadow-soft-sm"
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Unified Wallet</span>
            </motion.span>
            <motion.span
              variants={pillVariants}
              whileHover={{ y: -2, scale: 1.03 }}
              className="inline-flex items-center gap-1.5 bg-white/95 px-3 py-1.5 rounded-full border border-slate-200/80 shadow-2xs transition-shadow hover:shadow-soft-sm"
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>100% White-Label</span>
            </motion.span>
            <motion.span
              variants={pillVariants}
              whileHover={{ y: -2, scale: 1.03 }}
              className="inline-flex items-center gap-1.5 bg-white/95 px-3 py-1.5 rounded-full border border-slate-200/80 shadow-2xs transition-shadow hover:shadow-soft-sm"
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>99.99% SLA</span>
            </motion.span>
          </motion.div>

          {/* Dual CTAs */}
          <motion.div
            variants={itemFadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenDemoModal}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-brand-coral via-[#FF6247] to-brand-coral-hover text-white font-bold text-sm shadow-coral-glow hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Schedule Free Demo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#banking"
              className="w-full sm:w-auto px-5 py-3 rounded-full bg-white hover:bg-slate-50 text-brand-navy font-bold text-sm border border-slate-200/90 shadow-soft-sm hover:border-brand-coral/40 transition-all flex items-center justify-center gap-1.5 group"
            >
              <Terminal className="w-3.5 h-3.5 text-brand-coral" />
              <span>Explore Services</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-coral group-hover:translate-x-0.5 transition-all" />
            </motion.a>
          </motion.div>

          {/* Small reassurance */}
          <motion.div
            variants={itemFadeUp}
            className="flex items-center justify-center gap-2.5 text-[11px] text-slate-500 pt-1"
          >
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" /> Zero Deposit
            </span>
            <span>•</span>
            <span>No Code Setup</span>
            <span>•</span>
            <span>24/7 SLA</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Embedded Trust & Certifications Bar */}
      <TrustBar />
    </section>
  );
};
