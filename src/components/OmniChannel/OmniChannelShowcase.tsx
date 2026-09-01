'use client';

import React from 'react';
import { MultiDeviceComposition } from './DeviceMockup';
import { Monitor, Smartphone, CreditCard, Settings, Sparkles } from 'lucide-react';

export const OmniChannelShowcase: React.FC = () => {
  const platformCards = [
    {
      id: 'web-portal',
      icon: Monitor,
      title: 'Web Portal',
      description: 'Complete admin control with reports, network management, and operations dashboard.'
    },
    {
      id: 'android-app',
      icon: Smartphone,
      title: 'Android App',
      description: 'Manage transactions, retailers, and notifications on the go.'
    },
    {
      id: 'wpos-device',
      icon: CreditCard,
      title: 'WPOS Device',
      description: 'Accept card payments and provide printed receipts with integrated hardware support.'
    },
    {
      id: 'enterprise-apis',
      icon: Settings,
      title: 'Enterprise APIs',
      description: 'Connect AsthaPay infrastructure directly with your existing systems.'
    }
  ];

  return (
    <section
      id="channels"
      className="py-14 sm:py-20 bg-gradient-to-b from-[#041024] via-[#071F48] to-[#041024] text-white relative overflow-hidden"
    >
      {/* Decorative Network Mesh Lines on Far Left and Right */}
      <div className="absolute top-0 left-0 w-64 h-full pointer-events-none opacity-20 hidden lg:block bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="absolute top-0 right-0 w-64 h-full pointer-events-none opacity-20 hidden lg:block bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Access <span className="text-[#FF5733]">AsthaPay</span> Across Multiple Platforms
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto mt-3 font-normal leading-relaxed">
            Access powerful fintech software solutions to operate and manage your business with flexible options designed for different use cases.
          </p>
        </div>

        {/* 4 Arch-Top Blue Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {platformCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="bg-[#1c4d92]/40 hover:bg-[#1c4d92]/60 border border-blue-400/25 rounded-t-[28px] sm:rounded-t-[36px] p-5 sm:p-6 pb-16 sm:pb-32 backdrop-blur-md shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
              >
                {/* Card Icon */}
                <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center mb-3.5 group-hover:bg-[#FF5733] group-hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </div>

                {/* Card Title */}
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight mb-2">
                  {card.title}
                </h3>

                {/* Card Description */}
                <p className="text-xs text-slate-200 leading-relaxed font-normal">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Overlapping Realistic Device Composition (Laptop + Mobile Phone + WPOS Terminal) */}
        <div className="-mt-10 sm:-mt-24 md:-mt-28 relative z-20">
          <MultiDeviceComposition />
        </div>
      </div>
    </section>
  );
};
