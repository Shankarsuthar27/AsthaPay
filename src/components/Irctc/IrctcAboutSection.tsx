'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Target, Eye, Award, Users, ShieldCheck, Headphones, ArrowRight, Train, CheckCircle2 } from 'lucide-react';

export const IrctcAboutSection: React.FC = () => {
  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* 1. Scenic Train Banner */}
      <section className="relative h-64 sm:h-72 md:h-80 w-full overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{
            backgroundImage: "url('/images/irctc-hero-bg.jpg')",
          }}
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/75 to-[#0C2340]/85 backdrop-blur-[1px]" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D8232A]/90 text-white text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <Train className="w-3.5 h-3.5" />
            <span>Official IRCTC Agency</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
            About Us
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-200 font-medium max-w-xl mx-auto">
            India&apos;s leading authorized railway ticket booking network empowering thousands of agents nationwide.
          </p>
        </div>
      </section>

      {/* 2. Main Body Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
        {/* Card 1: Company Overview */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-10 transition-all hover:shadow-md">
          {/* Header with Logos */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#0C2340] to-[#1E3A8A] flex items-center justify-center shadow-md text-white border border-blue-900/30">
                <Train className="w-7 h-7 text-[#FF5733]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center tracking-tight leading-none gap-1.5">
                  <span className="text-3xl font-black italic text-[#D8232A]">Asthasoft</span>
                  <span className="text-3xl font-black italic text-[#0A1931]">IRCTC</span>
                </div>
                <span className="text-xs font-semibold text-slate-500 tracking-wide mt-0.5">
                  Authorized IRCTC Principal Service Provider
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Powered by</span>
              <span className="text-base font-black text-blue-900 tracking-tight">Astha<span className="text-[#D8232A]">Pay</span></span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
            Asthasoft IRCTC is the best IRCTC agency in INDIA
          </h2>

          {/* Body Text */}
          <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
            <p>
              <strong className="text-slate-900">ASTHASOFT INDIA / ASTHAPAY</strong> started its operations with its office at Glitz Cinema Jalore, Jalore, Rajasthan – 343001, with the vision of bridging the digital divide by providing world-class and diversified digital solutions at a one-stop-shop for customers at their neighborhood.
            </p>
            <p>
              We have been in the financial inclusion and fintech services industry for the last 6+ years. Over these years, we have built a trusted network of over 100,000+ retail merchants and agents across India, empowering grassroots entrepreneurship with cutting-edge technology, instant booking terminals, seamless IRCTC agent onboarding, and round-the-clock dedicated customer care support.
            </p>
          </div>

          {/* Key Trust Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#D8232A] flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-black text-slate-900">100,000+</p>
                <p className="text-xs text-slate-500 font-medium">Registered Agents</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-black text-slate-900">6+ Years</p>
                <p className="text-xs text-slate-500 font-medium">Industry Excellence</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-black text-slate-900">100% Legal</p>
                <p className="text-xs text-slate-500 font-medium">IRCTC Authorized</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-black text-slate-900">24/7</p>
                <p className="text-xs text-slate-500 font-medium">Priority Helpdesk</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cards 2 & 3: Mission & Vision (Red-Bordered Cards matching reference) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="bg-white rounded-2xl border-2 border-red-300 hover:border-red-500 transition-all p-8 sm:p-10 shadow-sm flex flex-col items-center text-center group hover:shadow-md">
            <div className="w-16 h-16 rounded-full bg-red-50 border border-red-200 text-[#D8232A] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-[#D8232A] mb-4">
              Our Mission
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              To empower every local business owner and youth in India by giving them official authorization as IRCTC ticket booking agents, providing seamless digital tools, maximizing their earnings, and delivering hassle-free, secure railway reservation services to citizens across urban and rural India.
            </p>
            <div className="mt-6 pt-6 border-t border-slate-100 w-full flex flex-col gap-2 text-left">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Democratizing rail ticketing in Tier-2, 3 & rural areas</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero hassle digital onboarding with instant verification</span>
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-white rounded-2xl border-2 border-red-300 hover:border-red-500 transition-all p-8 sm:p-10 shadow-sm flex flex-col items-center text-center group hover:shadow-md">
            <div className="w-16 h-16 rounded-full bg-red-50 border border-red-200 text-[#D8232A] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Eye className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-[#D8232A] mb-4">
              Our Vision
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              To become India&apos;s most trusted, technologically advanced, and widespread digital services and travel network, enabling millions of entrepreneurs with rapid digital solutions, transparent operations, and outstanding customer satisfaction.
            </p>
            <div className="mt-6 pt-6 border-t border-slate-100 w-full flex flex-col gap-2 text-left">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% compliant and legal IRCTC booking platform</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Direct wallet refunds & high commission payouts</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Card: Prompt to Register */}
        <div className="rounded-2xl bg-gradient-to-r from-[#0C2340] via-[#1E3A8A] to-[#0A1931] text-white p-8 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black">
              Ready to start your own Railway Ticket Booking Agency?
            </h3>
            <p className="text-slate-300 text-sm max-w-xl">
              Get your official IRCTC Agent ID & Password delivered within 24 hours. Start booking Tatkal & General tickets today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/become-an-irctc-agent#enquiry"
              className="px-6 py-3.5 rounded-xl bg-[#D8232A] hover:bg-[#B71C1C] text-white font-bold text-sm shadow-md hover:shadow-xl transition-all flex items-center gap-2 active:scale-95"
            >
              <span>Register as an Agent Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/irctc/contact"
              className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all active:scale-95"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
