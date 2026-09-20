'use client';

import React, { useState } from 'react';
import { ShieldCheck, ExternalLink, X, Award, CheckCircle } from 'lucide-react';

export const IrctcVerifyBanner: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="bg-[#D8232A] text-white py-3.5 sm:py-4 px-4 shadow-md relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2.5 font-extrabold text-sm sm:text-base tracking-wide">
            <ShieldCheck className="w-5 h-5 text-yellow-300 shrink-0" />
            <span>
              Verify us in IRCTC Authorized Service Providers List Page no. 5, Entry no. 75
            </span>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-1.5 rounded bg-[#FBBF24] hover:bg-[#F59E0B] text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-sm hover:shadow transition-all duration-200 shrink-0 cursor-pointer active:scale-95"
          >
            Click to verify
          </button>
        </div>
      </section>

      {/* Verification Details Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 text-slate-800">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Award className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-black text-slate-900">
                Official IRCTC PSP Authorization
              </h3>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-left space-y-2.5 text-xs sm:text-sm">
                <div className="flex items-start justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-slate-500 font-medium">Provider Name:</span>
                  <span className="font-bold text-slate-900 text-right">Asthasoft IRCTC / AsthaPay</span>
                </div>
                <div className="flex items-start justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-slate-500 font-medium">IRCTC Registry:</span>
                  <span className="font-bold text-[#D8232A]">Official PSP Gazette</span>
                </div>
                <div className="flex items-start justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-slate-500 font-medium">Registry Listing:</span>
                  <span className="font-bold text-slate-900">Page No. 5, Entry No. 75</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-slate-500 font-medium">License Scope:</span>
                  <span className="font-bold text-emerald-700">Sub-Agent Network Gateway (Pan-India)</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                All sub-agents created through this portal receive authorized credentials issued directly by the Indian Railway Catering and Tourism Corporation (IRCTC).
              </p>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={() => setModalOpen(false)}
                  className="w-full py-2.5 rounded-lg bg-[#D8232A] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm transition-colors"
                >
                  Close Verification
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
