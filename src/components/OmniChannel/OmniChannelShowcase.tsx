'use client';

import React, { useState } from 'react';
import { omniChannelsData } from '@/data/channelData';
import { DeviceMockup } from './DeviceMockup';
import { DynamicIcon } from '../common/DynamicIcon';
import { Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const OmniChannelShowcase: React.FC = () => {
  const [selectedChannelId, setSelectedChannelId] = useState<string>('web-portal');

  const currentChannel = omniChannelsData.find((c) => c.id === selectedChannelId) || omniChannelsData[0];

  return (
    <section id="channels" className="py-16 sm:py-24 bg-brand-navy-dark text-white relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-coral/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-brand-coral mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Omni-Channel Distribution</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            One Platform. <span className="gradient-text-coral">Four Powerful Channels.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 mt-3 font-normal leading-relaxed">
            Web portal, Android app, smart handheld POS, or REST APIs — all under your brand.
          </p>
        </div>

        {/* 4 Channels Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {omniChannelsData.map((channel) => {
            const isActive = channel.id === selectedChannelId;
            return (
              <button
                key={channel.id}
                onClick={() => setSelectedChannelId(channel.id)}
                className={`p-4 rounded-2xl border transition-all text-left flex items-center gap-3.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#0C2340] to-[#132E52] border-brand-coral shadow-lg shadow-brand-coral/10'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isActive ? 'bg-brand-coral text-white' : 'bg-white/10 text-slate-400'
                  }`}
                >
                  <DynamicIcon name={channel.iconName} className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {channel.tag}
                  </div>
                  <div className={`text-sm font-black ${isActive ? 'text-white' : 'text-slate-200'}`}>
                    {channel.name}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Channel Showcase Card */}
        <div className="bg-[#0C2340] rounded-3xl p-6 sm:p-10 border border-slate-700/70 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Info & Specs */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-coral/20 text-brand-coral border border-brand-coral/30">
                  {currentChannel.tag}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-3">
                  {currentChannel.subtitle}
                </h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  {currentChannel.highlight}
                </p>
              </div>

              {/* Feature Points */}
              <div className="space-y-2.5 pt-2">
                {currentChannel.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Specs Pills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-slate-700">
                {currentChannel.specs.map((sp, idx) => (
                  <div key={idx} className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400">{sp.label}</div>
                    <div className="text-xs font-bold text-white mt-0.5">{sp.value}</div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="#demo"
                  className="px-6 py-3 rounded-full bg-brand-coral hover:bg-brand-coral-hover text-white text-xs font-bold shadow-coral-glow transition-all flex items-center gap-2"
                >
                  <span>Request Live {currentChannel.name} Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  White-label custom package included
                </span>
              </div>
            </div>

            {/* Right Interactive Device Mockup */}
            <div className="lg:col-span-6 flex justify-center">
              <DeviceMockup channel={currentChannel} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
