'use client';

import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Building, Phone, Mail, User, Layers } from 'lucide-react';

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
    businessType: 'White-Label B2B Portal',
    estimatedRetailers: '10 - 50 Retailers',
    selectedServices: ['AePS', 'Micro ATM', 'BBPS Utility', 'DMT Remittance']
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-brand-navy/70 backdrop-blur-sm" onClick={handleResetAndClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-brand-navy via-brand-navy-card to-brand-navy-deep p-5 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-brand-coral text-[11px] font-bold mb-0.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Turnkey FinTech Infrastructure</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              Schedule Your Free Live Product Demo
            </h3>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Experience the white-label admin panel, distributor hierarchy & instant commission engine.
            </p>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close Demo Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto">
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Vikram Malhotra"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-brand-coral transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Mobile Number (WhatsApp) *
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-brand-coral transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Work Email & Company Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Business Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="vikram@payfast.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-brand-coral transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Company / Brand Name
                  </label>
                  <div className="relative">
                    <Building className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="PayFast FinTech Solutions"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-brand-coral transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Business Type & Network Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Partnership Model
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-brand-coral bg-white"
                  >
                    <option>White-Label B2B Portal & App</option>
                    <option>Master Distributor Model</option>
                    <option>Enterprise REST APIs</option>
                    <option>Hardware Micro ATM Distribution</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Estimated Retail Network
                  </label>
                  <select
                    value={formData.estimatedRetailers}
                    onChange={(e) => setFormData({ ...formData, estimatedRetailers: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-brand-coral bg-white"
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
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                  Select Services You Want to Launch:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {availableServices.map((srv, idx) => {
                    const isSelected = formData.selectedServices.includes(srv);
                    return (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => handleServiceToggle(srv)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all border ${
                          isSelected
                            ? 'bg-brand-coral text-white border-brand-coral shadow-sm'
                            : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {srv}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-coral via-[#FF6247] to-brand-coral-hover text-white font-black text-xs shadow-coral-glow hover:shadow-md transition-all duration-200 flex items-center justify-center gap-1.5"
              >
                <span>Confirm & Request Live Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center justify-center gap-3 text-[11px] text-slate-600 pt-0.5">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> Instant Sandbox Access
                </span>
                <span>•</span>
                <span>No Credit Card Needed</span>
              </div>
            </form>
          ) : (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-black shadow-soft-sm">
                ✓
              </div>

              <div>
                <h4 className="text-2xl font-black text-brand-navy">Demo Request Confirmed!</h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-2">
                  Thank you, <strong className="text-slate-900">{formData.name}</strong>. Our senior FinTech solutions architect will connect with you on <strong className="text-slate-900">{formData.phone}</strong> within 15 minutes.
                </p>
              </div>

              {/* Simulated Sandbox Token Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left max-w-md mx-auto space-y-2">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Temporary Sandbox Sandbox ID
                </div>
                <div className="font-mono text-xs text-brand-navy bg-white p-2.5 rounded-lg border border-slate-300 select-all">
                  DEMO-ASTHA-SANDBOX-KEY-9842X1
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold">
                  ✓ Swagger API Docs link sent to {formData.email}
                </div>
              </div>

              <button
                onClick={handleResetAndClose}
                className="px-8 py-3 rounded-full bg-brand-navy text-white text-xs font-bold hover:bg-brand-navy-dark transition-colors"
              >
                Close & Return to Page
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
