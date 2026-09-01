'use client';

import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Building, Phone, Mail, User, Check } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    businessType: 'White-Label B2B Portal & App',
    estimatedRetailers: '10 - 50 Retailers',
    selectedServices: ['AePS Biometric', 'Micro ATM / mPOS', 'DMT Money Transfer', 'BBPS Bill Pay']
  });

  if (!isOpen) return null;

  const handleServiceToggle = (serviceName: string) => {
    if (formData.selectedServices.includes(serviceName)) {
      setFormData({
        ...formData,
        selectedServices: formData.selectedServices.filter((s) => s !== serviceName)
      });
    } else {
      setFormData({
        ...formData,
        selectedServices: [...formData.selectedServices, serviceName]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  const handleResetAndClose = () => {
    setStep('form');
    onClose();
  };

  const availableServices = [
    'AePS Biometric',
    'Micro ATM / mPOS',
    'DMT Money Transfer',
    'BBPS Bill Pay',
    'NSDL PAN Card',
    'IRCTC Train Booking',
    'Motor & Health Insurance',
    'UPI Cash Withdrawal'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Dark Blur Backdrop */}
      <div
        className="fixed inset-0 bg-[#051329]/80 backdrop-blur-sm transition-opacity"
        onClick={handleResetAndClose}
      />

      {/* Modal Card / Bottom Sheet Container on Mobile */}
      <div className="relative w-full max-w-xl bg-white rounded-t-[28px] sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200 max-h-[92vh] sm:max-h-[88vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#071F48] via-[#0c2b61] to-[#071F48] p-4 sm:p-5 text-white flex items-center justify-between shrink-0 border-b border-slate-700/60">
          <div className="pr-2">
            <div className="inline-flex items-center gap-1.5 text-[#FF5733] text-[11px] font-bold mb-0.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Turnkey FinTech Infrastructure</span>
            </div>
            <h3 className="text-base sm:text-xl font-black text-white leading-tight">
              Schedule Your Free Live Product Demo
            </h3>
            <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-1 sm:line-clamp-none">
              Experience the white-label admin panel, distributor hierarchy &amp; instant commission engine.
            </p>
          </div>

          <button
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white flex items-center justify-center transition-colors shrink-0 -mr-1"
            aria-label="Close Demo Modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto overscroll-contain flex-1">
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                <div>
                  <label className="block text-[11.5px] sm:text-xs font-bold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Vikram Malhotra"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9.5 pr-3.5 py-2.5 sm:py-2 rounded-xl border border-slate-200 text-slate-900 text-sm sm:text-xs focus:outline-none focus:ring-2 focus:ring-[#FF5733]/20 focus:border-[#FF5733] transition-all bg-slate-50/50 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11.5px] sm:text-xs font-bold text-slate-700 mb-1">
                    Mobile Number (WhatsApp) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9.5 pr-3.5 py-2.5 sm:py-2 rounded-xl border border-slate-200 text-slate-900 text-sm sm:text-xs focus:outline-none focus:ring-2 focus:ring-[#FF5733]/20 focus:border-[#FF5733] transition-all bg-slate-50/50 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Work Email & Company Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                <div>
                  <label className="block text-[11.5px] sm:text-xs font-bold text-slate-700 mb-1">
                    Business Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="vikram@payfast.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9.5 pr-3.5 py-2.5 sm:py-2 rounded-xl border border-slate-200 text-slate-900 text-sm sm:text-xs focus:outline-none focus:ring-2 focus:ring-[#FF5733]/20 focus:border-[#FF5733] transition-all bg-slate-50/50 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11.5px] sm:text-xs font-bold text-slate-700 mb-1">
                    Company / Brand Name
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="PayFast FinTech Solutions"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full pl-9.5 pr-3.5 py-2.5 sm:py-2 rounded-xl border border-slate-200 text-slate-900 text-sm sm:text-xs focus:outline-none focus:ring-2 focus:ring-[#FF5733]/20 focus:border-[#FF5733] transition-all bg-slate-50/50 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Business Type & Network Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                <div>
                  <label className="block text-[11.5px] sm:text-xs font-bold text-slate-700 mb-1">
                    Partnership Model
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full px-3 py-2.5 sm:py-2 rounded-xl border border-slate-200 text-slate-900 text-sm sm:text-xs focus:outline-none focus:ring-2 focus:ring-[#FF5733]/20 focus:border-[#FF5733] bg-white"
                  >
                    <option>White-Label B2B Portal &amp; App</option>
                    <option>Master Distributor Model</option>
                    <option>Enterprise REST APIs</option>
                    <option>Hardware Micro ATM Distribution</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11.5px] sm:text-xs font-bold text-slate-700 mb-1">
                    Estimated Retail Network
                  </label>
                  <select
                    value={formData.estimatedRetailers}
                    onChange={(e) => setFormData({ ...formData, estimatedRetailers: e.target.value })}
                    className="w-full px-3 py-2.5 sm:py-2 rounded-xl border border-slate-200 text-slate-900 text-sm sm:text-xs focus:outline-none focus:ring-2 focus:ring-[#FF5733]/20 focus:border-[#FF5733] bg-white"
                  >
                    <option>Starting New (1 - 10 Retailers)</option>
                    <option>10 - 50 Retailers</option>
                    <option>50 - 200 Retailers</option>
                    <option>200 - 1,000+ Retailers</option>
                    <option>Enterprise Bank Switch</option>
                  </select>
                </div>
              </div>

              {/* Services Selection Pills */}
              <div className="pt-0.5">
                <label className="block text-[11.5px] sm:text-xs font-bold text-slate-700 mb-1.5">
                  Select Services You Want to Launch:
                </label>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {availableServices.map((srv, idx) => {
                    const isSelected = formData.selectedServices.includes(srv);
                    return (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => handleServiceToggle(srv)}
                        className={`px-3 py-1.5 sm:py-1 rounded-full text-xs font-semibold transition-all border select-none active:scale-95 flex items-center gap-1 ${
                          isSelected
                            ? 'bg-[#FF5733] text-white border-[#FF5733] shadow-2xs font-bold'
                            : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200/80'
                        }`}
                      >
                        {isSelected ? (
                          <Check className="w-3 h-3 text-white stroke-[3]" />
                        ) : (
                          <span className="text-slate-400">+</span>
                        )}
                        <span>{srv}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#FF5733] via-[#FF6247] to-[#EA5843] text-white font-black text-xs sm:text-sm shadow-coral-glow hover:shadow-lg transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Confirm &amp; Request Live Demo</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Trust Subtext */}
              <div className="flex items-center justify-center gap-2.5 text-[11px] text-slate-500 pt-0.5">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Instant Sandbox Access
                </span>
                <span>•</span>
                <span>No Credit Card Needed</span>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 sm:py-8 space-y-5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-black shadow-soft-sm">
                ✓
              </div>

              <div>
                <h4 className="text-xl sm:text-2xl font-black text-[#0c1e38]">Demo Request Confirmed!</h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
                  Thank you, <strong className="text-slate-900">{formData.name}</strong>. Our senior FinTech solutions architect will connect with you on <strong className="text-slate-900">{formData.phone}</strong> within 15 minutes.
                </p>
              </div>

              {/* Simulated Sandbox Token Card */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left max-w-md mx-auto space-y-2">
                <div className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">
                  Temporary Sandbox ID
                </div>
                <div className="font-mono text-xs text-[#0c1e38] bg-white p-2.5 rounded-lg border border-slate-300 select-all font-bold">
                  DEMO-ASTHA-SANDBOX-KEY-9842X1
                </div>
                <div className="text-[10.5px] text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Swagger API Docs link sent to {formData.email}</span>
                </div>
              </div>

              <button
                onClick={handleResetAndClose}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#0c1e38] text-white text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                Close &amp; Return to Page
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
