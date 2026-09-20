'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Terminal, CheckCircle, ChevronRight, Play, Pause } from 'lucide-react';
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
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => {
        console.warn('Background video autoplay note:', err);
      });
    }
  }, []);

  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
    <section className="relative overflow-hidden isolate h-screen min-h-[600px] max-h-[1200px] flex flex-col justify-between">
      {/* 1. Cinematic Background Video Layer — fills the entire section */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 select-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/AI_Video_Prompt_for_AsthaPay_H.mp4" type="video/mp4" />
          <source src="/videos/AI_Video_Prompt_for_AsthaPay_H.mp4" type="video/mp4" />
        </video>

        {/* Subtle translucent veil for text readability over video */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/45 pointer-events-none" />

        {/* Dynamic Light Beam & Mesh Highlights */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[700px] overflow-hidden">
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
            className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-blue-200/25 rounded-full blur-3xl"
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
            className="absolute top-10 right-10 w-[550px] h-[550px] bg-brand-coral/10 rounded-full blur-3xl"
          />
        </div>
      </div>

      {/* Video Play / Pause Subtle Floating Toggle */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-20">
        <button
          onClick={toggleVideoPlayback}
          aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/85 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-200/90 shadow-sm backdrop-blur-md text-xs font-semibold transition-all duration-200 active:scale-95 group cursor-pointer"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 text-brand-coral" />
              <span className="hidden sm:inline">Pause Motion</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
              <span className="hidden sm:inline">Play Motion</span>
            </>
          )}
        </button>
      </div>

      {/* 2. Hero Foreground Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 relative z-10 w-full my-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-5 sm:space-y-6"
        >
          {/* Pill Badge */}
          <motion.div variants={itemFadeDown} className="inline-block">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-slate-200 shadow-soft-sm text-xs sm:text-[13px] font-bold text-brand-navy mx-auto hover:border-brand-coral/40 transition-colors">
              <span className="flex h-1.5 w-1.5 rounded-full bg-brand-coral animate-ping"></span>
              <span className="text-brand-coral font-bold">⚡ Turnkey Stack</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600 font-medium">White-Label & APIs</span>
            </div>
          </motion.div>

          {/* Bold Headline */}
          <motion.h1
            variants={itemFadeUp}
            className="text-3xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-black text-brand-navy tracking-tight leading-[1.12] max-w-4xl mx-auto"
          >
            Power Your FinTech With{' '}
            <span className="gradient-text-coral">Turnkey Banking</span> APIs
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemFadeUp}
            className="text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Launch AePS, Micro-ATM, DMT & BBPS in 24 hours under your own brand.
          </motion.p>

          {/* Feature Checkpoints */}
          <motion.div
            variants={itemFadeUp}
            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-1 text-xs sm:text-sm font-semibold text-slate-700"
          >
            <motion.span
              variants={pillVariants}
              whileHover={{ y: -2, scale: 1.03 }}
              className="inline-flex items-center gap-1.5 bg-white/95 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-slate-200/80 shadow-2xs transition-shadow hover:shadow-soft-sm"
            >
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Unified Wallet</span>
            </motion.span>
            <motion.span
              variants={pillVariants}
              whileHover={{ y: -2, scale: 1.03 }}
              className="inline-flex items-center gap-2 bg-white/95 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-slate-200/80 shadow-2xs transition-shadow hover:shadow-soft-sm"
            >
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
              <span>100% White-Label</span>
            </motion.span>
            <motion.span
              variants={pillVariants}
              whileHover={{ y: -2, scale: 1.03 }}
              className="inline-flex items-center gap-2 bg-white/95 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-slate-200/80 shadow-2xs transition-shadow hover:shadow-soft-sm"
            >
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
              <span>99.99% SLA</span>
            </motion.span>
          </motion.div>

          {/* Dual CTAs */}
          <motion.div
            variants={itemFadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenDemoModal}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-brand-coral via-[#FF6247] to-brand-coral-hover text-white font-bold text-sm sm:text-base shadow-coral-glow hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Schedule Free Demo</span>
                <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#banking"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-brand-navy font-bold text-sm sm:text-base border border-slate-200/90 shadow-soft-sm hover:border-brand-coral/40 transition-all flex items-center justify-center gap-1.5 group"
            >
              <Terminal className="w-4 h-4 text-brand-coral" />
              <span>Explore Services</span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brand-coral group-hover:translate-x-0.5 transition-all" />
            </motion.a>
          </motion.div>

          {/* Small reassurance */}
          <motion.div
            variants={itemFadeUp}
            className="flex items-center justify-center gap-2.5 text-xs sm:text-[13px] text-slate-500 pt-1.5"
          >
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Zero Deposit
            </span>
            <span>•</span>
            <span>No Code Setup</span>
            <span>•</span>
            <span>24/7 SLA</span>
          </motion.div>
        </motion.div>
      </div>
    </section>

    {/* Trust & Certifications Bar — rendered below the hero */}
    <TrustBar />
    </>
  );
};
