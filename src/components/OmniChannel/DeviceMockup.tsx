'use client';

import React from 'react';
import {
  Monitor,
  Smartphone,
  CreditCard,
  Settings,
  Layers,
  Fingerprint,
  Zap,
  PhoneCall,
  Tv,
  Receipt,
  FileText,
  Car,
  Shield,
  CheckCircle2,
  Search,
  User,
  Bell,
  Menu,
  Home,
  QrCode,
  History,
  Grid,
  Sparkles,
  Printer
} from 'lucide-react';

export const MultiDeviceComposition: React.FC = () => {
  return (
    <div className="relative w-full max-w-5xl mx-auto flex items-end justify-center pt-8 pb-4">
      {/* 1. Center Laptop Mockup */}
      <div className="relative z-10 w-[88%] sm:w-[78%] md:w-[72%] max-w-[720px] shadow-2xl rounded-t-2xl">
        {/* Laptop Screen Bezel */}
        <div className="bg-[#181d24] rounded-t-2xl p-2.5 sm:p-3 border-t-2 border-x-2 border-slate-700/80 shadow-2xl">
          {/* Camera Notch */}
          <div className="flex justify-center mb-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-blue-500/80 animate-pulse" />
            </div>
          </div>

          {/* Laptop Screen Content (AsthaPay Admin Dashboard) */}
          <div className="bg-[#f8fafc] rounded-lg overflow-hidden border border-slate-300 text-slate-800 text-[9px] sm:text-[10.5px] select-none h-[220px] sm:h-[300px] md:h-[340px] flex">
            {/* Left Sidebar */}
            <div className="w-24 sm:w-32 bg-[#0c1e38] text-white p-2.5 sm:p-3 flex flex-col justify-between shrink-0">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 pb-2 border-b border-slate-700/80">
                  <div className="w-4 h-4 rounded bg-[#FF5733] flex items-center justify-center font-black text-[9px] text-white">
                    A
                  </div>
                  <span className="font-extrabold text-[10px] sm:text-xs text-white tracking-tight">AsthaPay</span>
                </div>

                <div className="space-y-1 text-[8.5px] sm:text-[9.5px] text-slate-300 font-medium">
                  <div className="p-1 rounded bg-[#FF5733]/20 text-[#FF5733] font-bold flex items-center gap-1">
                    <Grid className="w-2.5 h-2.5" /> Dashboard
                  </div>
                  <div className="p-1 rounded hover:bg-white/10 flex items-center gap-1">
                    <Layers className="w-2.5 h-2.5" /> API Services
                  </div>
                  <div className="p-1 rounded hover:bg-white/10 flex items-center gap-1">
                    <User className="w-2.5 h-2.5" /> Members (MD/DT)
                  </div>
                  <div className="p-1 rounded hover:bg-white/10 flex items-center gap-1">
                    <CreditCard className="w-2.5 h-2.5" /> Fund Mgmt
                  </div>
                  <div className="p-1 rounded hover:bg-white/10 flex items-center gap-1">
                    <History className="w-2.5 h-2.5" /> Transactions
                  </div>
                  <div className="p-1 rounded hover:bg-white/10 flex items-center gap-1">
                    <FileText className="w-2.5 h-2.5" /> Reports &amp; TDS
                  </div>
                </div>
              </div>

              <div className="text-[7.5px] sm:text-[8.5px] text-slate-400">
                <span className="text-emerald-400">● Switch: Live</span>
              </div>
            </div>

            {/* Main Portal Dashboard Content Area */}
            <div className="flex-1 p-2.5 sm:p-3.5 bg-[#f1f5f9] overflow-y-hidden flex flex-col justify-between">
              {/* Top Nav */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div className="font-bold text-[10px] sm:text-xs text-[#0c1e38]">
                  Services Marketplace &amp; Switch Controls
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[8px] sm:text-[9px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold border border-emerald-300">
                    256-Bit SSL
                  </span>
                  <span className="text-[8px] sm:text-[9px] text-slate-600 font-bold hidden sm:inline">
                    Admin Wallet: ₹18,42,950.00
                  </span>
                </div>
              </div>

              {/* Service Cards Grid inside Laptop */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2 my-1">
                {/* 1. Mobile & DTH */}
                <div className="bg-white p-1.5 sm:p-2 rounded-lg border border-slate-200 shadow-2xs flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <PhoneCall className="w-3 h-3" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-[8.5px] sm:text-[9.5px] truncate">Mobile / DTH Recharge</div>
                    <div className="text-[7px] sm:text-[8px] text-emerald-600 font-semibold">● Active TSP</div>
                  </div>
                </div>

                {/* 2. BBPS Utilities */}
                <div className="bg-white p-1.5 sm:p-2 rounded-lg border border-slate-200 shadow-2xs flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                    <Zap className="w-3 h-3" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-[8.5px] sm:text-[9.5px] truncate">BBPS Central Unit</div>
                    <div className="text-[7px] sm:text-[8px] text-emerald-600 font-semibold">● 20,000+ Billers</div>
                  </div>
                </div>

                {/* 3. AePS 2.0 */}
                <div className="bg-white p-1.5 sm:p-2 rounded-lg border border-slate-200 shadow-2xs flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                    <Fingerprint className="w-3 h-3" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-[8.5px] sm:text-[9.5px] truncate">AePS 2.0 Biometric</div>
                    <div className="text-[7px] sm:text-[8px] text-emerald-600 font-semibold">● Multi-Bank Rail</div>
                  </div>
                </div>

                {/* 4. DMT Money Transfer */}
                <div className="bg-white p-1.5 sm:p-2 rounded-lg border border-slate-200 shadow-2xs flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                    <CreditCard className="w-3 h-3" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-[8.5px] sm:text-[9.5px] truncate">DMT Instant Remit</div>
                    <div className="text-[7px] sm:text-[8px] text-emerald-600 font-semibold">● IMPS/NEFT</div>
                  </div>
                </div>

                {/* 5. Electricity & Fastag */}
                <div className="bg-white p-1.5 sm:p-2 rounded-lg border border-slate-200 shadow-2xs flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Car className="w-3 h-3" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-[8.5px] sm:text-[9.5px] truncate">FASTag &amp; Toll</div>
                    <div className="text-[7px] sm:text-[8px] text-emerald-600 font-semibold">● Instant Recharge</div>
                  </div>
                </div>

                {/* 6. Micro ATM */}
                <div className="bg-white p-1.5 sm:p-2 rounded-lg border border-slate-200 shadow-2xs flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0">
                    <Shield className="w-3 h-3" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-[8.5px] sm:text-[9.5px] truncate">Micro ATM Switch</div>
                    <div className="text-[7px] sm:text-[8px] text-emerald-600 font-semibold">● RuPay/Visa</div>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Analytics Bar */}
              <div className="bg-white p-1.5 sm:p-2 rounded-lg border border-slate-200 flex items-center justify-between text-[8px] sm:text-[9px] text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#0c1e38]">Today GTV: ₹ 14,82,900</span>
                  <span className="text-slate-300">|</span>
                  <span>Active Merchants: 1,482 (98.2% Up)</span>
                </div>
                <span className="text-emerald-600 font-bold">● 99.99% Switch Uptime</span>
              </div>
            </div>
          </div>
        </div>

        {/* Laptop Bottom Base & Hinge */}
        <div className="relative bg-[#252c38] h-3.5 sm:h-4 rounded-b-xl border-t border-slate-600 shadow-xl flex items-center justify-center">
          <div className="w-16 sm:w-24 h-1 bg-slate-400/80 rounded-full" />
        </div>
      </div>

      {/* 2. Left Smartphone (Android App) Mockup */}
      <div className="absolute -left-2 sm:left-2 md:left-4 -bottom-3 sm:-bottom-2 z-20 w-[115px] sm:w-[155px] md:w-[175px] bg-[#0c1017] rounded-[24px] sm:rounded-[32px] p-1.5 sm:p-2 border-[3px] sm:border-4 border-slate-700 shadow-2xl text-white select-none">
        {/* Dynamic Island */}
        <div className="w-10 sm:w-14 h-2.5 sm:h-3 bg-black rounded-full mx-auto mb-1 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500/60 ml-auto mr-1.5" />
        </div>

        {/* App Content */}
        <div className="bg-[#4338ca] rounded-[18px] sm:rounded-[24px] overflow-hidden text-[8px] sm:text-[9px]">
          {/* Header */}
          <div className="p-2 sm:p-2.5 text-white">
            <div className="flex items-center justify-between text-[7px] sm:text-[8px] opacity-80 mb-1">
              <span>AsthaPay Partner</span>
              <span>● 5G Live</span>
            </div>
            <div className="text-[10px] sm:text-xs font-black">₹ 64,890.00</div>
            <div className="text-[6.5px] sm:text-[7.5px] text-indigo-200">Main Wallet Balance</div>
          </div>

          {/* Grid Inside Phone */}
          <div className="bg-white text-slate-800 p-2 sm:p-2.5 space-y-1.5 rounded-t-[14px] sm:rounded-t-[18px]">
            <div className="font-extrabold text-[7.5px] sm:text-[8.5px] text-[#0c1e38]">Banking Services</div>
            <div className="grid grid-cols-3 gap-1 text-center text-[6.5px] sm:text-[7.5px] font-bold">
              <div className="p-1 rounded bg-slate-50 border border-slate-100 flex flex-col items-center">
                <Fingerprint className="w-2.5 h-2.5 text-[#FF5733]" />
                <span className="truncate w-full mt-0.5">AePS</span>
              </div>
              <div className="p-1 rounded bg-slate-50 border border-slate-100 flex flex-col items-center">
                <CreditCard className="w-2.5 h-2.5 text-blue-600" />
                <span className="truncate w-full mt-0.5">mATM</span>
              </div>
              <div className="p-1 rounded bg-slate-50 border border-slate-100 flex flex-col items-center">
                <Zap className="w-2.5 h-2.5 text-emerald-600" />
                <span className="truncate w-full mt-0.5">DMT</span>
              </div>
            </div>

            <div className="font-extrabold text-[7.5px] sm:text-[8.5px] text-[#0c1e38] pt-0.5">Bill Payments</div>
            <div className="grid grid-cols-3 gap-1 text-center text-[6.5px] sm:text-[7.5px] font-bold">
              <div className="p-1 rounded bg-slate-50 border border-slate-100 flex flex-col items-center">
                <PhoneCall className="w-2.5 h-2.5 text-indigo-600" />
                <span className="truncate w-full mt-0.5">Mobile</span>
              </div>
              <div className="p-1 rounded bg-slate-50 border border-slate-100 flex flex-col items-center">
                <Tv className="w-2.5 h-2.5 text-amber-600" />
                <span className="truncate w-full mt-0.5">DTH</span>
              </div>
              <div className="p-1 rounded bg-slate-50 border border-slate-100 flex flex-col items-center">
                <Car className="w-2.5 h-2.5 text-purple-600" />
                <span className="truncate w-full mt-0.5">FASTag</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Right WPOS Terminal Device Mockup */}
      <div className="absolute -right-2 sm:right-2 md:right-4 -bottom-3 sm:-bottom-2 z-20 w-[105px] sm:w-[145px] md:w-[165px] bg-[#1e2530] rounded-[22px] sm:rounded-[28px] p-1.5 sm:p-2 border-[3px] sm:border-4 border-slate-700 shadow-2xl text-white select-none">
        {/* Silver Thermal Printer Slot on Top */}
        <div className="bg-gradient-to-b from-slate-300 to-slate-400 rounded-t-xl sm:rounded-t-2xl p-1.5 sm:p-2 border-b-2 border-slate-500 mb-1.5 text-center text-slate-900 shadow-inner">
          <div className="w-12 sm:w-16 h-1 bg-slate-800 rounded-full mx-auto mb-0.5" />
          <div className="flex items-center justify-center gap-0.5 text-[6.5px] sm:text-[7.5px] font-mono font-bold text-slate-800">
            <Printer className="w-2 h-2" />
            <span>58mm Thermal</span>
          </div>
        </div>

        {/* WPOS Screen */}
        <div className="bg-[#051e3c] rounded-xl sm:rounded-2xl p-1.5 sm:p-2 border border-slate-600 space-y-1 text-[7px] sm:text-[8.5px]">
          <div className="flex items-center justify-between text-white font-bold border-b border-slate-700/80 pb-0.5">
            <span>Smart WPOS Terminal</span>
            <span className="text-[6px] sm:text-[7px] bg-emerald-500/20 text-emerald-400 px-1 rounded">
              EMV L2
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1 text-center font-bold pt-0.5">
            <div className="p-1 rounded bg-[#0b2b52] border border-blue-400/30 flex flex-col items-center">
              <Fingerprint className="w-2.5 h-2.5 text-[#FF5733]" />
              <span className="truncate w-full mt-0.5 text-white">AePS Cash</span>
            </div>
            <div className="p-1 rounded bg-[#0b2b52] border border-blue-400/30 flex flex-col items-center">
              <CreditCard className="w-2.5 h-2.5 text-emerald-400" />
              <span className="truncate w-full mt-0.5 text-white">Card Swiper</span>
            </div>
            <div className="p-1 rounded bg-[#0b2b52] border border-blue-400/30 flex flex-col items-center">
              <Receipt className="w-2.5 h-2.5 text-amber-400" />
              <span className="truncate w-full mt-0.5 text-white">Mini Stmt</span>
            </div>
            <div className="p-1 rounded bg-[#0b2b52] border border-blue-400/30 flex flex-col items-center">
              <QrCode className="w-2.5 h-2.5 text-purple-400" />
              <span className="truncate w-full mt-0.5 text-white">UPI QR</span>
            </div>
          </div>

          <div className="bg-emerald-600 text-white font-bold text-center py-0.5 rounded text-[6.5px] sm:text-[7.5px] mt-1 shadow-2xs">
            TAP / SWIPE CARD READY
          </div>
        </div>
      </div>
    </div>
  );
};
