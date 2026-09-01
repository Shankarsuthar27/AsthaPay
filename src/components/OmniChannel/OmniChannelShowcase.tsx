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
    <section id="channels" className="py-12 sm:py-16 bg-brand-navy-dark text-white relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-coral/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold text-brand-coral mb-2.5">
            <Sparkles className="w-3 h-3" />
            <span>Omni-Channel Distribution</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
            One Platform. <span className="gradient-text-coral">Four Powerful Channels.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 mt-2 font-normal leading-relaxed">
            Web portal, Android app, smart handheld POS, or REST APIs — all under your brand.
          </p>
        </div>

        {/* 4 Channels Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-8">
          {omniChannelsData.map((channel) => {
            const isActive = channel.id === selectedChannelId;
            return (
              <button
                key={channel.id}
                onClick={() => setSelectedChannelId(channel.id)}
                className={`p-3 rounded-xl border transition-all text-left flex items-center gap-3 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#0C2340] to-[#132E52] border-brand-coral shadow-lg shadow-brand-coral/10'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    isActive ? 'bg-brand-coral text-white' : 'bg-white/10 text-slate-400'
                  }`}
                >
                  <DynamicIcon name={channel.iconName} className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {channel.tag}
                  </div>
                  <div className={`text-xs font-black ${isActive ? 'text-white' : 'text-slate-200'}`}>
                    {channel.name}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Channel Showcase Card */}
        <div className="bg-[#0C2340] rounded-3xl p-5 sm:p-8 border border-slate-700/70 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info & Specs */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <span className="text-[10.5px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-coral/20 text-brand-coral border border-brand-coral/30">
                  {currentChannel.tag}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-2.5">
                  {currentChannel.subtitle}
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-300 mt-1.5 leading-relaxed">
                  {currentChannel.highlight}
                </p>
              </div>

              {/* Feature Points */}
              <div className="space-y-2 pt-1">
                {currentChannel.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Specs Pills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-700">
                {currentChannel.specs.map((sp, idx) => (
                  <div key={idx} className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                    <div className="text-[9px] text-slate-400">{sp.label}</div>
                    <div className="text-[11px] font-bold text-white mt-0.5">{sp.value}</div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-1 flex flex-wrap items-center gap-3">
                <a
                  href="#demo"
                  className="px-5 py-2.5 rounded-full bg-brand-coral hover:bg-brand-coral-hover text-white text-[11px] font-bold shadow-coral-glow transition-all flex items-center gap-1.5"
                >
                  <span>Request Live {currentChannel.name} Demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
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
