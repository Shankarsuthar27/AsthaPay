'use client';

import React from 'react';
import { ChannelItem } from '@/types';
import { Wifi, Battery, Fingerprint, Printer, CreditCard, Sparkles, RefreshCw } from 'lucide-react';

interface DeviceMockupProps {
  channel: ChannelItem;
}

export const DeviceMockup: React.FC<DeviceMockupProps> = ({ channel }) => {
  if (channel.id === 'web-portal') {
    return (
      <div className="w-full bg-[#0F223D] rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden text-white">
        {/* Laptop Browser Header */}
        <div className="bg-[#0A182B] px-4 py-3 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-[11px] text-slate-400 font-mono ml-2">portal.yourbrandfintech.com</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
            SSL 256-BIT SECURE
          </span>
        </div>

        {/* Laptop Dashboard UI Content */}
        <div className="p-4 sm:p-5 space-y-3 sm:space-y-4">
          {/* Top stats strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
            <div className="bg-[#132C4E] p-3 rounded-xl border border-slate-700/60">
              <div className="text-[10px] text-slate-400 uppercase">Today&apos;s Volume</div>
              <div className="text-base sm:text-lg font-black text-white">₹ 14,82,900</div>
              <div className="text-[10px] text-emerald-400">↑ 18.4% vs yesterday</div>
            </div>
            <div className="bg-[#132C4E] p-3 rounded-xl border border-slate-700/60">
              <div className="text-[10px] text-slate-400 uppercase">Active Retailers</div>
              <div className="text-base sm:text-lg font-black text-white">1,482</div>
              <div className="text-[10px] text-blue-400">98.2% online</div>
            </div>
            <div className="bg-[#132C4E] p-3 rounded-xl border border-slate-700/60">
              <div className="text-[10px] text-slate-400 uppercase">Commission Earned</div>
              <div className="text-base sm:text-lg font-black text-brand-coral">₹ 28,450</div>
              <div className="text-[10px] text-slate-400">Auto settled</div>
            </div>
          </div>

          {/* Quick Action Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-brand-coral/15 border border-brand-coral/30 font-bold text-white flex flex-col items-center gap-1">
              <Fingerprint className="w-5 h-5 text-brand-coral" />
              <span>AePS 2.0</span>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-500/15 border border-blue-500/30 font-bold text-white flex flex-col items-center gap-1">
              <CreditCard className="w-5 h-5 text-blue-400" />
              <span>Micro ATM</span>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 font-bold text-white flex flex-col items-center gap-1">
              <RefreshCw className="w-5 h-5 text-emerald-400" />
              <span>DMT Remit</span>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 font-bold text-white flex flex-col items-center gap-1">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>BBPS Pay</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (channel.id === 'android-app') {
    return (
      <div className="max-w-[320px] mx-auto bg-slate-950 rounded-[40px] p-3 border-4 border-slate-800 shadow-2xl text-white relative">
        {/* Phone Notch & Status Bar */}
        <div className="flex items-center justify-between px-4 pt-1 pb-2 text-[10px] text-slate-400">
          <span>09:41</span>
          <div className="w-20 h-4 bg-slate-900 rounded-full mx-auto" />
          <div className="flex items-center gap-1.5">
            <Wifi className="w-3 h-3" />
            <Battery className="w-3 h-3" />
          </div>
        </div>

        {/* Mobile App Container */}
        <div className="bg-[#0C2340] rounded-[30px] p-4 space-y-3.5 border border-slate-800">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] text-slate-400">Merchant Store</div>
              <div className="text-sm font-black text-white">Sharma Digital Seva</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-brand-coral flex items-center justify-center font-bold text-xs">
              SD
            </div>
          </div>

          {/* Wallet Card */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-brand-coral via-[#FF6D4A] to-amber-500 text-white shadow-coral-glow">
            <div className="text-[10px] opacity-90">Main Wallet Balance</div>
            <div className="text-xl font-black">₹ 64,890.00</div>
            <div className="text-[9px] mt-1 opacity-90 flex items-center justify-between">
              <span>AePS Settlement: Instant</span>
              <span>194N: Compliant</span>
            </div>
          </div>

          {/* Biometric AePS Scan Action */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Fingerprint className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="text-xs font-bold">Biometric AePS Active</div>
                <div className="text-[9px] text-emerald-400">Mantra MFS100 Connected</div>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-500 text-white font-bold px-2 py-0.5 rounded">
              Ready
            </span>
          </div>

          {/* Grid buttons */}
          <div className="grid grid-cols-3 gap-2 text-[10px] text-center font-bold">
            <div className="p-2 bg-slate-800/80 rounded-xl">Withdraw</div>
            <div className="p-2 bg-slate-800/80 rounded-xl">Deposit</div>
            <div className="p-2 bg-slate-800/80 rounded-xl">Statement</div>
          </div>
        </div>
      </div>
    );
  }

  if (channel.id === 'wpos-device') {
    return (
      <div className="max-w-[340px] mx-auto bg-gradient-to-b from-slate-800 to-slate-950 rounded-[36px] p-4 border-4 border-slate-700 shadow-2xl text-white relative">
        {/* Thermal Printer Slot on Top */}
        <div className="bg-slate-900 rounded-t-2xl p-2.5 border-b border-slate-700 mb-3 text-center">
          <div className="w-28 h-2 bg-slate-950 rounded-full mx-auto mb-1.5" />
          <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-emerald-400">
            <Printer className="w-3.5 h-3.5" />
            <span>High-Speed 58mm Thermal Printer</span>
          </div>
        </div>

        {/* WPOS Touch Screen */}
        <div className="bg-[#0A1D36] rounded-2xl p-4 border border-slate-700 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white">Smart Micro-ATM WPOS</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
              EMV Level 2
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
            <div className="text-[10px] text-slate-400">INSERT / TAP CARD</div>
            <div className="text-xl font-black text-brand-coral">₹ 5,000.00</div>
            <div className="text-[10px] text-slate-300">RuPay • Visa • Mastercard</div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-xs font-bold">
            <div className="p-2.5 bg-emerald-600 rounded-xl">Print Slip</div>
            <div className="p-2.5 bg-slate-800 rounded-xl">E-Receipt SMS</div>
          </div>
        </div>

        {/* Physical Smart Card Slot & Biometric Sensor at bottom */}
        <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-around text-[10px] text-slate-400">
          <span className="flex items-center gap-1"><CreditCard className="w-3.5 h-3.5 text-brand-coral" /> Chip Reader</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Fingerprint className="w-3.5 h-3.5 text-emerald-400" /> Optical Sensor</span>
        </div>
      </div>
    );
  }

  // Default: Enterprise APIs Code Sandbox
  return (
    <div className="w-full bg-[#081220] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden text-white font-mono">
      {/* Code Header */}
      <div className="bg-[#050D18] px-4 py-3 flex items-center justify-between border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-slate-400 ml-2 font-sans font-bold">POST /api/v2/aeps/cash-withdrawal</span>
        </div>
        <span className="text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded text-[10px]">
          200 OK (38ms)
        </span>
      </div>

      {/* Code Snippet */}
      <div className="p-5 text-xs overflow-x-auto space-y-2 text-slate-300">
        <div className="text-slate-500">&#47;&#47; Header: Authorization: Bearer asthapay_live_jwt...</div>
        <div>
          <span className="text-purple-400">curl</span> -X POST https://api.asthapay.in/v2/aeps/withdraw \
        </div>
        <div className="pl-4 text-emerald-300">
          -H <span className="text-amber-300">&quot;X-API-KEY: astha_prod_9942a1&quot;</span> \
        </div>
        <div className="pl-4 text-blue-300">
          -d <span className="text-slate-200">&#123;</span>
        </div>
        <div className="pl-8 text-slate-200">
          <span className="text-blue-400">&quot;aadhaar_hash&quot;</span>: <span className="text-amber-300">&quot;9876XXXXXXXX&quot;</span>,
        </div>
        <div className="pl-8 text-slate-200">
          <span className="text-blue-400">&quot;amount&quot;</span>: <span className="text-amber-300">2500</span>,
        </div>
        <div className="pl-8 text-slate-200">
          <span className="text-blue-400">&quot;bank_iin&quot;</span>: <span className="text-amber-300">&quot;607094&quot;</span>,
        </div>
        <div className="pl-8 text-slate-200">
          <span className="text-blue-400">&quot;biometric_pid&quot;</span>: <span className="text-amber-300">&quot;&lt;PidData&gt;...&lt;/PidData&gt;&quot;</span>
        </div>
        <div className="pl-4 text-blue-300">&#125;</div>

        <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-emerald-400 font-sans flex items-center justify-between">
          <span>✓ Webhook callback dispatched in 14ms</span>
          <span className="text-slate-400">Swagger &amp; Postman Ready</span>
        </div>
      </div>
    </div>
  );
};

