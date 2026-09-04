'use client';

import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Building, 
  Phone, 
  Mail, 
  User, 
  Check, 
  Loader2,
  FileText,
  ExternalLink,
  Download,
  Layers,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COUNTRY_CODES = [
  { code: '+91', country: 'IN', label: 'India (+91)' },
  { code: '+1', country: 'US', label: 'USA / Canada (+1)' },
  { code: '+44', country: 'GB', label: 'UK (+44)' },
  { code: '+971', country: 'AE', label: 'UAE (+971)' },
  { code: '+65', country: 'SG', label: 'Singapore (+65)' },
  { code: '+60', country: 'MY', label: 'Malaysia (+60)' },
  { code: '+966', country: 'SA', label: 'Saudi Arabia (+966)' },
];

const PARTNERSHIP_MODELS = [
  {
    name: 'White-Label B2B Portal & App',
    desc: 'Branded web portal, mobile app & full retailer/distributor management',
  },
  {
    name: 'Master Distributor Model',
    desc: 'Multi-level downline hierarchy, credit management & territory scale',
  },
  {
    name: 'Enterprise REST APIs',
    desc: 'Embeddable banking, payout rails, verification & webhooks',
  },
  {
    name: 'Hardware Micro ATM Distribution',
    desc: 'mPOS devices, EMV processing, terminal management & settlements',
  },
];

const RETAIL_NETWORKS = [
  'Starting New (1–10 Retailers)',
  '10–50 Retailers',
  '50–200 Retailers',
  '200–1,000+ Retailers',
  'Enterprise Bank Switch',
];

const ALL_SERVICES = [
  'Aadhaar Enabled Payment System (AePS)',
  'Domestic Money Transfer (DMT)',
  'Micro ATM',
  'Aadhaar Pay',
  'BBPS',
  'Mobile Recharge',
  'DTH Recharge',
  'Electricity Bill Payment',
  'FASTag Recharge',
  'PAN Card Services',
  'Insurance Services',
  'Travel Booking',
  'UPI Services',
  'Banking APIs',
  'Payout APIs',
  'Account Verification',
  'KYC / eKYC',
  'Merchant Onboarding',
  'Distributor & Retailer Management',
  'Commission Management',
  'Other FinTech Services',
];

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [generatedProposalId, setGeneratedProposalId] = useState<string | null>(null);
  const [emailStatus, setEmailStatus] = useState<string | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);

  const [countryCode, setCountryCode] = useState('+91');
  const [phoneDigits, setPhoneDigits] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    businessEmail: '',
    companyName: '',
    partnershipModel: 'White-Label B2B Portal & App',
    retailNetwork: '50–200 Retailers',
    selectedServices: [
      'Aadhaar Enabled Payment System (AePS)',
      'Domestic Money Transfer (DMT)',
      'Micro ATM',
      'BBPS',
      'Payout APIs',
    ],
    additionalRequirements: '',
  });

  if (!isOpen) return null;

  const handleServiceToggle = (serviceName: string) => {
    if (formData.selectedServices.includes(serviceName)) {
      if (formData.selectedServices.length === 1) return; // keep at least 1
      setFormData({
        ...formData,
        selectedServices: formData.selectedServices.filter((s) => s !== serviceName),
      });
    } else {
      setFormData({
        ...formData,
        selectedServices: [...formData.selectedServices, serviceName],
      });
    }
  };

  const handleSelectAllServices = () => {
    setFormData({ ...formData, selectedServices: [...ALL_SERVICES] });
  };

  const handleResetServices = () => {
    setFormData({
      ...formData,
      selectedServices: ['Aadhaar Enabled Payment System (AePS)', 'Domestic Money Transfer (DMT)', 'Micro ATM', 'BBPS'],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic client validation
    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.businessEmail.trim() || !formData.businessEmail.includes('@')) {
      setErrorMessage('Please enter a valid business email address.');
      return;
    }
    const cleanDigits = phoneDigits.replace(/\D/g, '');
    if (cleanDigits.length < 9) {
      setErrorMessage('Please enter a valid mobile number.');
      return;
    }
    if (formData.selectedServices.length === 0) {
      setErrorMessage('Please select at least one FinTech service.');
      return;
    }

    setSubmitting(true);

    try {
      const fullMobile = `${countryCode} ${cleanDigits}`;
      const res = await fetch('/api/demo-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          mobileNumber: fullMobile,
          businessEmail: formData.businessEmail.trim().toLowerCase(),
          companyName: formData.companyName.trim() || `${formData.fullName.trim()}'s Network`,
          partnershipModel: formData.partnershipModel,
          retailNetwork: formData.retailNetwork,
          selectedServices: formData.selectedServices,
          additionalRequirements: formData.additionalRequirements.trim(),
          honeypot: honeypot || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit demo request.');
      }

      setGeneratedProposalId(data.proposalId);
      setEmailStatus(data.emailStatus || null);
      setConfirmationMessage(data.message || null);
      setStep('success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error submitting request. Please try again.';
      setErrorMessage(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setStep('form');
    setErrorMessage(null);
    setEmailStatus(null);
    setConfirmationMessage(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Dark Backdrop */}
      <div
        className="fixed inset-0 bg-[#051329]/80 backdrop-blur-sm transition-opacity"
        onClick={handleResetAndClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-t-[28px] sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 max-h-[94vh] sm:max-h-[92vh] flex flex-col animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#071F48] via-[#0c2b61] to-[#071F48] p-4 sm:p-5 text-white flex items-center justify-between shrink-0 border-b border-slate-700/60">
          <div className="pr-2">
            <div className="inline-flex items-center gap-1.5 text-[#FF5733] text-[11px] font-bold mb-0.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Automated Proposal Generation</span>
            </div>
            <h3 className="text-base sm:text-xl font-black text-white leading-tight">
              Schedule Your Free Live Product Demo
            </h3>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Receive a personalized FinTech infrastructure proposal and immediate sandbox access.
            </p>
          </div>

          <button
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white flex items-center justify-center transition-colors shrink-0 -mr-1"
            aria-label="Close Modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto overscroll-contain flex-1">
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Anti-spam honeypot (hidden) */}
              <input
                type="text"
                name="website_url"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                  {errorMessage}
                </div>
              )}

              {/* Row 1: Full Name & Mobile Number (WhatsApp) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Vikram Malhotra"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#FF5733]/20 focus:border-[#FF5733] bg-slate-50/50 focus:bg-white transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number (WhatsApp) *
                  </label>
                  <div className="flex gap-1.5">
                    <div className="relative w-28 shrink-0">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-full appearance-none pl-2.5 pr-6 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-xs font-bold bg-slate-50/80 focus:bg-white focus:outline-none focus:border-[#FF5733]"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.code} ({c.country})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-3.5 pointer-events-none" />
                    </div>

                    <div className="relative flex-1">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        placeholder="98765 43210"
                        value={phoneDigits}
                        onChange={(e) => setPhoneDigits(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#FF5733]/20 focus:border-[#FF5733] bg-slate-50/50 focus:bg-white transition-all font-medium"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Business Email & Company / Brand Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Business Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="vikram@malhotrapay.in"
                      value={formData.businessEmail}
                      onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#FF5733]/20 focus:border-[#FF5733] bg-slate-50/50 focus:bg-white transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Company / Brand Name
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Malhotra Digital Kendra"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#FF5733]/20 focus:border-[#FF5733] bg-slate-50/50 focus:bg-white transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Partnership Model Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Partnership Model *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PARTNERSHIP_MODELS.map((model) => {
                    const isSelected = formData.partnershipModel === model.name;
                    return (
                      <button
                        type="button"
                        key={model.name}
                        onClick={() => setFormData({ ...formData, partnershipModel: model.name })}
                        className={`p-2.5 rounded-xl border text-left transition-all flex items-start justify-between gap-2 ${
                          isSelected
                            ? 'bg-[#071F48] text-white border-[#071F48] shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div>
                          <p className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                            {model.name}
                          </p>
                          <p className={`text-[10px] mt-0.5 leading-tight ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                            {model.desc}
                          </p>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-[#FF5733] shrink-0 mt-0.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Estimated Retail Network */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Estimated Retail Network *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                  {RETAIL_NETWORKS.map((opt) => {
                    const isSelected = formData.retailNetwork === opt;
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setFormData({ ...formData, retailNetwork: opt })}
                        className={`py-2 px-1 rounded-xl border text-center text-[11px] font-bold transition-all ${
                          isSelected
                            ? 'bg-[#FF5733] text-white border-[#FF5733] shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Select Services to Launch (21 Services) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Select Services You Want to Launch ({formData.selectedServices.length} of {ALL_SERVICES.length}) *
                  </label>
                  <div className="flex items-center gap-2 text-[10px]">
                    <button
                      type="button"
                      onClick={handleSelectAllServices}
                      className="text-[#FF5733] font-bold hover:underline"
                    >
                      Select All
                    </button>
                    <span className="text-slate-300">&bull;</span>
                    <button
                      type="button"
                      onClick={handleResetServices}
                      className="text-slate-500 hover:underline"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-48 overflow-y-auto p-2 bg-slate-50 rounded-2xl border border-slate-200/80">
                  {ALL_SERVICES.map((service) => {
                    const isChecked = formData.selectedServices.includes(service);
                    return (
                      <button
                        type="button"
                        key={service}
                        onClick={() => handleServiceToggle(service)}
                        className={`p-2 rounded-xl border text-left text-[11px] flex items-center justify-between transition-all ${
                          isChecked
                            ? 'bg-white border-[#FF5733] text-slate-900 shadow-2xs font-bold'
                            : 'bg-transparent border-transparent text-slate-600 hover:bg-white/70'
                        }`}
                      >
                        <span className="truncate pr-1">{service}</span>
                        {isChecked ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5733] shrink-0" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Additional Requirements / Message */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Additional Requirements / Message <span className="font-normal text-slate-400">(Optional)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Share any custom switch requirements, bank preference, API specs, or launch timelines..."
                  value={formData.additionalRequirements}
                  onChange={(e) => setFormData({ ...formData, additionalRequirements: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#FF5733]/20 focus:border-[#FF5733] bg-slate-50/50 focus:bg-white resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF5733] via-[#FF6247] to-[#EA5843] text-white font-black text-sm shadow-coral-glow hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generating Proposal &amp; Sending Email...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm &amp; Request Live Demo</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Trust Subtext */}
              <div className="flex items-center justify-center gap-3 text-[11px] text-slate-500 pt-0.5">
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Instant Sandbox Access
                </span>
                <span>&bull;</span>
                <span className="font-semibold text-slate-700">No Credit Card Needed</span>
              </div>
            </form>
          ) : (
            /* Post-Submission Success State */
            <div className="text-center py-6 sm:py-8 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-black shadow-soft-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="font-mono text-xs font-extrabold px-3 py-1 rounded-full bg-orange-100 text-[#FF5733] border border-orange-200">
                  Proposal Ref: {generatedProposalId}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2.5">
                  Requirements Received Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 max-w-md mx-auto mt-2 leading-relaxed">
                  {confirmationMessage || 'Thank you! Your requirements have been received and your personalized FinTech proposal has been prepared.'}
                </p>
                <div className="mt-2.5 flex justify-center">
                  {emailStatus === 'sent' ? (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      Dispatched to your email: {formData.businessEmail}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold">
                      <FileText className="w-3.5 h-3.5 text-[#FF5733] shrink-0" />
                      Ready for instant review &amp; PDF download
                    </span>
                  )}
                </div>
              </div>

              {/* Quick Summary Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-bold">Partnership Model:</span>
                  <span className="font-bold text-slate-900">{formData.partnershipModel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-bold">Retail Network:</span>
                  <span className="font-bold text-slate-900">{formData.retailNetwork}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-bold">Selected Services:</span>
                  <span className="font-bold text-slate-900">{formData.selectedServices.length} Services Selected</span>
                </div>
              </div>

              {/* Proposal Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
                {generatedProposalId && (
                  <>
                    <Link
                      href={`/proposals/${generatedProposalId}`}
                      target="_blank"
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5733] to-[#E03E1D] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 hover:brightness-105"
                    >
                      <FileText className="w-4 h-4" />
                      <span>View Interactive Proposal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>

                    <a
                      href={`/api/proposals/${generatedProposalId}/pdf`}
                      download
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#071F48] hover:bg-[#0c2b61] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4 text-[#FF5733]" />
                      <span>Download PDF Proposal</span>
                    </a>
                  </>
                )}

                <button
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                >
                  Close Window
                </button>
              </div>

              {/* Required Trust Callout */}
              <div className="flex items-center justify-center gap-4 text-xs font-bold text-slate-700 pt-2 border-t border-slate-100">
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Instant Sandbox Access
                </span>
                <span className="text-slate-300">&bull;</span>
                <span className="text-slate-700">No Credit Card Needed</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
