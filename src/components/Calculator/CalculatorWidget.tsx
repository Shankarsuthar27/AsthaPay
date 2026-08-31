'use client';

import React, { useState } from 'react';
import { Calculator, Sparkles, TrendingUp, Users, DollarSign, ArrowRight } from 'lucide-react';

export const CalculatorWidget: React.FC = () => {
  const [retailersCount, setRetailersCount] = useState<number>(50);
  const [dailyTxPerRetailer, setDailyTxPerRetailer] = useState<number>(20);
  const [avgTicketSize, setAvgTicketSize] = useState<number>(2500);

  // Calculations
  const monthlyTransactions = retailersCount * dailyTxPerRetailer * 30;
  const monthlyGTV = (monthlyTransactions * avgTicketSize) / 10000000; // in Crores
  // Avg net commission margin ~ 0.35% across mixed banking & bill payment services
  const estimatedMonthlyCommission = (monthlyTransactions * avgTicketSize * 0.0035);

  return (
    <div className="bg-gradient-to-br from-brand-navy via-brand-navy-card to-brand-navy-deep rounded-3xl p-6 sm:p-10 text-white shadow-soft-xl border border-slate-700/80 my-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-coral/20 text-brand-coral text-xs font-bold mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>ROI & Commission Estimator</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Estimate Your Network Earnings
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Adjust network size and transaction volume to project monthly GTV and commission yield.
            </p>
          </div>

          {/* Sliders */}
          <div className="space-y-5 bg-white/5 p-5 rounded-2xl border border-white/10">
            {/* Slider 1: Retailers Count */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-brand-coral" /> Active Retail Outlets:
                </span>
                <span className="text-brand-coral text-sm font-black">{retailersCount} Stores</span>
              </div>
              <input
                type="range"
                min="5"
                max="500"
                step="5"
                value={retailersCount}
                onChange={(e) => setRetailersCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-coral"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>5 Stores</span>
                <span>250 Stores</span>
                <span>500+ Stores</span>
              </div>
            </div>

            {/* Slider 2: Daily Tx Per Retailer */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-400" /> Daily Transactions per Store:
                </span>
                <span className="text-emerald-400 text-sm font-black">{dailyTxPerRetailer} Tx/day</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                step="5"
                value={dailyTxPerRetailer}
                onChange={(e) => setDailyTxPerRetailer(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>5 Tx</span>
                <span>50 Tx</span>
                <span>100 Tx</span>
              </div>
            </div>

            {/* Slider 3: Avg Ticket Size */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-amber-400" /> Average Transaction Size:
                </span>
                <span className="text-amber-400 text-sm font-black">₹ {avgTicketSize.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="500"
                value={avgTicketSize}
                onChange={(e) => setAvgTicketSize(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>₹500</span>
                <span>₹5,000</span>
                <span>₹10,000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Card */}
        <div className="lg:col-span-5 bg-[#0F284A] p-6 sm:p-8 rounded-3xl border border-slate-600/80 shadow-2xl flex flex-col justify-between space-y-6">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Projected Monthly Network Yield
            </span>

            {/* Big Commission Earnings Number */}
            <div className="mt-2">
              <div className="text-3xl sm:text-4xl font-black text-brand-coral">
                ₹ {Math.round(estimatedMonthlyCommission).toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-emerald-400 font-semibold mt-1">
                ✓ Estimated Monthly Gross Commission
              </div>
            </div>
          </div>

          {/* Breakdown Pills */}
          <div className="space-y-2.5 pt-2 border-t border-slate-700">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Monthly Transactions:</span>
              <span className="font-bold text-white">{monthlyTransactions.toLocaleString()} Tx/mo</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Monthly GTV Handled:</span>
              <span className="font-bold text-white">₹ {monthlyGTV.toFixed(2)} Crore</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Annualized Earnings:</span>
              <span className="font-bold text-amber-300">
                ₹ {Math.round(estimatedMonthlyCommission * 12).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <a
            href="#demo"
            className="w-full py-3.5 rounded-full bg-brand-coral hover:bg-brand-coral-hover text-white text-xs font-bold shadow-coral-glow transition-all flex items-center justify-center gap-2"
          >
            <span>Start Earning With AsthaPay</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
