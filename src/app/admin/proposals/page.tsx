'use client';

import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Printer, 
  Sparkles, 
  Plus, 
  Trash2, 
  Building2, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  Download,
  Eye,
  Edit3,
  Save,
  DollarSign,
  BookOpen,
  Calendar,
  Mail,
  HelpCircle,
  RefreshCw,
  Sliders,
  Check,
  Copy,
  Send,
  Terminal,
  FileCode
} from 'lucide-react';
import { CommercialSlab } from '@/types/admin';
import { 
  DEFAULT_PROPOSAL_CONFIG, 
  ProposalModularConfig 
} from '@/lib/proposalConfig';
import { synthesizeProposal } from '@/lib/proposalEngine';
import { generateProposalPlainText } from '@/lib/proposalPlainText';
import { generateProposalEmailHtml } from '@/lib/proposalEmailTemplate';

export default function AdminProposalsPage() {
  const [config, setConfig] = useState<ProposalModularConfig>(DEFAULT_PROPOSAL_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'slabs' | 'pricing' | 'services' | 'roadmap' | 'branding' | 'preview'>('slabs');

  // Preview Sandbox Lead State
  const [partnerName, setPartnerName] = useState('Metro Digital Services');
  const [partnerContact, setPartnerContact] = useState('Rahul Verma');
  const [partnerPhone, setPartnerPhone] = useState('+91 98111 22334');
  const [partnerEmail, setPartnerEmail] = useState('rahul@metrodigital.in');
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Aadhaar Enabled Payment System (AePS)',
    'Domestic Money Transfer (DMT)',
    'Micro ATM',
    'BBPS',
  ]);

  const [copiedText, setCopiedText] = useState(false);
  const [sendingTest, setSendingTest] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [previewMode, setPreviewMode] = useState<'document' | 'plaintext' | 'html'>('document');

  // Fetch active configuration from server on mount
  useEffect(() => {
    async function loadConfig() {
      try {
        const res = await fetch('/api/admin/proposal-config');
        if (res.ok) {
          const data = await res.json();
          if (data.config) {
            setConfig(data.config);
          }
        }
      } catch (err) {
        console.warn('Could not fetch server proposal config, using default:', err);
      } finally {
        setLoading(false);
      }
    }
    loadConfig();
  }, []);

  // Save all configuration changes to server / database
  const handleSaveConfig = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/proposal-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      if (!res.ok) throw new Error('Failed to save proposal configuration');
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      console.error(err);
      alert('Failed to save configuration. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Slab handlers
  const handleAddSlab = () => {
    setConfig({
      ...config,
      commercialSlabs: [
        ...config.commercialSlabs,
        { service: 'New FinTech Service', commissionType: 'fixed', value: 5.0, notes: 'Standard commission tier' },
      ],
    });
  };

  const handleRemoveSlab = (index: number) => {
    setConfig({
      ...config,
      commercialSlabs: config.commercialSlabs.filter((_, i) => i !== index),
    });
  };

  const handleUpdateSlab = (index: number, field: keyof CommercialSlab, val: any) => {
    const updated = [...config.commercialSlabs];
    updated[index] = { ...updated[index], [field]: val };
    setConfig({ ...config, commercialSlabs: updated });
  };

  // Terms & conditions handlers
  const handleAddTerm = () => {
    setConfig({
      ...config,
      termsAndConditions: [...config.termsAndConditions, 'New commercial term & condition statement.'],
    });
  };

  const handleRemoveTerm = (index: number) => {
    setConfig({
      ...config,
      termsAndConditions: config.termsAndConditions.filter((_, i) => i !== index),
    });
  };

  const handleUpdateTerm = (index: number, val: string) => {
    const updated = [...config.termsAndConditions];
    updated[index] = val;
    setConfig({ ...config, termsAndConditions: updated });
  };

  const handlePrint = () => {
    window.print();
  };

  // Synthesize dynamic proposal for preview sandbox
  const previewProposal = synthesizeProposal({
    fullName: partnerContact || 'Rahul Verma',
    companyName: partnerName || 'Metro Digital Services',
    businessEmail: partnerEmail || 'rahul@metrodigital.in',
    mobileNumber: partnerPhone || '+91 98111 22334',
    partnershipModel: 'White-Label B2B Portal & App',
    retailNetwork: '50–200 Retailers',
    selectedServices: selectedServices,
    customProposalId: 'FIN-2026-LIVE',
  });

  const previewPlainText = generateProposalPlainText(previewProposal, config);
  const previewEmailHtml = generateProposalEmailHtml(previewProposal, config);

  const handleCopyPlainText = () => {
    navigator.clipboard.writeText(previewPlainText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 3000);
  };

  const handleSendTestEmail = async (targetEmail?: string, formatOverride?: 'plain' | 'html') => {
    const to = targetEmail || partnerEmail || 'shankar.952152@gmail.com';
    setSendingTest(true);
    setTestResult(null);
    const chosenFormat = formatOverride || (previewMode === 'html' ? 'html' : config.emailTemplate?.format || 'plain');
    try {
      const res = await fetch('/api/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to,
          fullName: partnerContact || 'Partner Executive',
          companyName: partnerName || 'Enterprise Partner',
          mobileNumber: partnerPhone || '+91 98111 22334',
          format: chosenFormat,
        }),
      });
      const data = await res.json();
      if (res.ok && (data.success || data.emailResult?.clientDelivered || data.emailResult?.success)) {
        setTestResult({
          success: true,
          message: `Proposal dispatched in ${chosenFormat.toUpperCase()} format to ${to}!`,
        });
      } else {
        setTestResult({
          success: false,
          message: data.error || data.emailResult?.error || 'Failed to dispatch proposal email.',
        });
      }
    } catch (err: unknown) {
      setTestResult({
        success: false,
        message: err instanceof Error ? err.message : 'Network failure during email test',
      });
    } finally {
      setSendingTest(false);
      setTimeout(() => setTestResult(null), 8000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Proposal Engine &amp; Commercial Console
            </h2>
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              Modular Active
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Configure partner pricing, 21 services catalog, implementation roadmap, email templates, and commercial terms.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {savedSuccess && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              <Check className="w-3.5 h-3.5" />
              Settings Saved!
            </span>
          )}

          <button
            onClick={handleSaveConfig}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50"
          >
            {saving ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4 text-emerald-400" />
            )}
            <span>{saving ? 'Saving...' : 'Save Configuration'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF5733] to-[#E03E1D] text-white text-xs font-bold shadow-md shadow-[#FF5733]/20 hover:shadow-lg transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print Document</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-200/80 border border-slate-300/60">
        <button
          onClick={() => setActiveTab('slabs')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
            activeTab === 'slabs'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5 text-[#FF5733]" />
          <span>Commercial Slabs</span>
        </button>

        <button
          onClick={() => setActiveTab('pricing')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
            activeTab === 'pricing'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sliders className="w-3.5 h-3.5 text-indigo-600" />
          <span>Pricing &amp; Terms</span>
        </button>

        <button
          onClick={() => setActiveTab('services')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
            activeTab === 'services'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-blue-600" />
          <span>Services Catalog ({Object.keys(config.servicesCatalog || {}).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('roadmap')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
            activeTab === 'roadmap'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-3.5 h-3.5 text-teal-600" />
          <span>Roadmap Phases (6)</span>
        </button>

        <button
          onClick={() => setActiveTab('branding')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
            activeTab === 'branding'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Building2 className="w-3.5 h-3.5 text-purple-600" />
          <span>Company &amp; Email</span>
        </button>

        <button
          onClick={() => setActiveTab('preview')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
            activeTab === 'preview'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Eye className="w-3.5 h-3.5 text-[#FF5733]" />
          <span>Live Proposal Preview</span>
        </button>
      </div>

      {/* TAB 1: COMMERCIAL SLABS */}
      {activeTab === 'slabs' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Commercial Slabs &amp; Payout Matrix</h3>
              <p className="text-xs text-slate-500">
                Define the default commission payouts and revenue shares presented in client proposals.
              </p>
            </div>
            <button
              onClick={handleAddSlab}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 text-[#FF5733] text-xs font-extrabold hover:bg-orange-100 border border-orange-200 transition-colors w-fit"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Slab</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">Service / Transaction Slab</th>
                  <th className="py-2.5 px-3 w-36">Type</th>
                  <th className="py-2.5 px-3 w-32">Value</th>
                  <th className="py-2.5 px-3">Commercial Note</th>
                  <th className="py-2.5 px-3 w-12 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {config.commercialSlabs.map((slab, index) => (
                  <tr key={index} className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-3 font-semibold text-slate-800">
                      <input
                        type="text"
                        value={slab.service}
                        onChange={(e) => handleUpdateSlab(index, 'service', e.target.value)}
                        className="w-full px-2 py-1 rounded-lg border border-slate-200 bg-white font-semibold text-slate-800 focus:ring-1 focus:ring-[#FF5733] outline-none"
                      />
                    </td>
                    <td className="py-2.5 px-3">
                      <select
                        value={slab.commissionType}
                        onChange={(e) => handleUpdateSlab(index, 'commissionType', e.target.value as any)}
                        className="w-full px-2 py-1 rounded-lg border border-slate-200 bg-white font-medium text-slate-800 focus:ring-1 focus:ring-[#FF5733] outline-none"
                      >
                        <option value="fixed">Fixed (₹)</option>
                        <option value="percentage">Percentage (%)</option>
                      </select>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="relative flex items-center">
                        <span className="absolute left-2 text-slate-400 font-bold text-xs">
                          {slab.commissionType === 'fixed' ? '₹' : '%'}
                        </span>
                        <input
                          type="number"
                          step="0.05"
                          value={slab.value}
                          onChange={(e) => handleUpdateSlab(index, 'value', parseFloat(e.target.value) || 0)}
                          className="w-full pl-6 pr-2 py-1 rounded-lg border border-slate-200 bg-white font-bold text-slate-900 focus:ring-1 focus:ring-[#FF5733] outline-none"
                        />
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={slab.notes || ''}
                        onChange={(e) => handleUpdateSlab(index, 'notes', e.target.value)}
                        placeholder="e.g. Multi-bank instant switch credit"
                        className="w-full px-2 py-1 rounded-lg border border-slate-200 bg-white text-slate-600 focus:ring-1 focus:ring-[#FF5733] outline-none"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={() => handleRemoveSlab(index)}
                        className="p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        title="Delete Slab"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: PRICING & COMMERCIAL TERMS */}
      {activeTab === 'pricing' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-sm">Default Commercial Terms</h3>
              <p className="text-xs text-slate-500">
                These pricing terms appear in generated proposals and can be overridden per client in Lead Details.
              </p>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Platform Setup Fee</label>
                <input
                  type="text"
                  value={config.pricing.setupFee}
                  onChange={(e) => setConfig({ ...config, pricing: { ...config.pricing, setupFee: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium text-slate-800 focus:ring-2 focus:ring-[#FF5733]/20 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Monthly Platform Fee / AMC</label>
                <input
                  type="text"
                  value={config.pricing.monthlyFee}
                  onChange={(e) => setConfig({ ...config, pricing: { ...config.pricing, monthlyFee: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium text-slate-800 focus:ring-2 focus:ring-[#FF5733]/20 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">API Charges</label>
                <input
                  type="text"
                  value={config.pricing.apiCharges}
                  onChange={(e) => setConfig({ ...config, pricing: { ...config.pricing, apiCharges: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium text-slate-800 focus:ring-2 focus:ring-[#FF5733]/20 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Transaction Charges / MDR</label>
                <input
                  type="text"
                  value={config.pricing.transactionCharges}
                  onChange={(e) => setConfig({ ...config, pricing: { ...config.pricing, transactionCharges: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium text-slate-800 focus:ring-2 focus:ring-[#FF5733]/20 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Hardware Charges</label>
                <input
                  type="text"
                  value={config.pricing.hardwareCharges}
                  onChange={(e) => setConfig({ ...config, pricing: { ...config.pricing, hardwareCharges: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium text-slate-800 focus:ring-2 focus:ring-[#FF5733]/20 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Commercial Note / Clause</label>
                <textarea
                  rows={3}
                  value={config.pricing.note}
                  onChange={(e) => setConfig({ ...config, pricing: { ...config.pricing, note: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium text-slate-800 focus:ring-2 focus:ring-[#FF5733]/20 outline-none resize-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">Terms &amp; Conditions Clauses</h3>
                <p className="text-xs text-slate-500">Appended to generated proposals and PDF exports.</p>
              </div>
              <button
                onClick={handleAddTerm}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-[#FF5733]" />
                <span>Add Clause</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {config.termsAndConditions.map((term, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 font-bold text-[10px] flex items-center justify-center shrink-0 mt-1">
                    {index + 1}
                  </span>
                  <input
                    type="text"
                    value={term}
                    onChange={(e) => handleUpdateTerm(index, e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-[#FF5733]/20 outline-none"
                  />
                  <button
                    onClick={() => handleRemoveTerm(index)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="Remove clause"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SERVICES CATALOG (21 FINTECH SERVICES) */}
      {activeTab === 'services' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-900 text-sm">
              FinTech Services Knowledge Base ({Object.keys(config.servicesCatalog || {}).length} Services)
            </h3>
            <p className="text-xs text-slate-500">
              Whenever a prospect selects services on the demo form, these architectural specifications are dynamically injected into their custom proposal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(config.servicesCatalog || {}).map(([serviceName, details]) => (
              <div key={serviceName} className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-slate-900 text-sm">{serviceName}</h4>
                  <span className="text-[10px] font-bold text-[#FF5733] bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                    Switch Active
                  </span>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Description</label>
                  <textarea
                    rows={2}
                    value={details.description}
                    onChange={(e) => {
                      const updated = { ...config.servicesCatalog };
                      updated[serviceName] = { ...updated[serviceName], description: e.target.value };
                      setConfig({ ...config, servicesCatalog: updated });
                    }}
                    className="w-full mt-0.5 p-2 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-800 outline-none focus:ring-1 focus:ring-[#FF5733] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Business Use Case</label>
                  <input
                    type="text"
                    value={details.businessUseCase}
                    onChange={(e) => {
                      const updated = { ...config.servicesCatalog };
                      updated[serviceName] = { ...updated[serviceName], businessUseCase: e.target.value };
                      setConfig({ ...config, servicesCatalog: updated });
                    }}
                    className="w-full mt-0.5 px-2 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-800 outline-none focus:ring-1 focus:ring-[#FF5733]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Required Infra</label>
                    <input
                      type="text"
                      value={details.requiredInfrastructure}
                      onChange={(e) => {
                        const updated = { ...config.servicesCatalog };
                        updated[serviceName] = { ...updated[serviceName], requiredInfrastructure: e.target.value };
                        setConfig({ ...config, servicesCatalog: updated });
                      }}
                      className="w-full mt-0.5 px-2 py-1 rounded-lg border border-slate-200 bg-white text-[11px] font-medium text-slate-800 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Integration Scope</label>
                    <input
                      type="text"
                      value={details.integrationRequirements}
                      onChange={(e) => {
                        const updated = { ...config.servicesCatalog };
                        updated[serviceName] = { ...updated[serviceName], integrationRequirements: e.target.value };
                        setConfig({ ...config, servicesCatalog: updated });
                      }}
                      className="w-full mt-0.5 px-2 py-1 rounded-lg border border-slate-200 bg-white text-[11px] font-medium text-slate-800 outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: IMPLEMENTATION ROADMAP PHASES */}
      {activeTab === 'roadmap' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-900 text-sm">
              Implementation Roadmap (6 Key Delivery Milestones)
            </h3>
            <p className="text-xs text-slate-500">
              Customize the titles, duration estimates, and deliverables shown in proposal timelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {config.implementationRoadmap.map((phase, index) => (
              <div key={index} className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/60 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-[11px] text-[#FF5733] uppercase px-2 py-0.5 rounded bg-orange-100">
                    {phase.phase}
                  </span>
                  <input
                    type="text"
                    value={phase.duration}
                    onChange={(e) => {
                      const updated = [...config.implementationRoadmap];
                      updated[index] = { ...updated[index], duration: e.target.value };
                      setConfig({ ...config, implementationRoadmap: updated });
                    }}
                    placeholder="e.g. Days 1 – 2"
                    className="px-2 py-0.5 rounded-lg border border-slate-200 bg-white text-[11px] font-bold text-slate-700 w-28 text-right outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Phase Title</label>
                  <input
                    type="text"
                    value={phase.title}
                    onChange={(e) => {
                      const updated = [...config.implementationRoadmap];
                      updated[index] = { ...updated[index], title: e.target.value };
                      setConfig({ ...config, implementationRoadmap: updated });
                    }}
                    className="w-full mt-0.5 px-2 py-1.5 rounded-lg border border-slate-200 bg-white font-bold text-slate-900 outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Description</label>
                  <textarea
                    rows={2}
                    value={phase.description}
                    onChange={(e) => {
                      const updated = [...config.implementationRoadmap];
                      updated[index] = { ...updated[index], description: e.target.value };
                      setConfig({ ...config, implementationRoadmap: updated });
                    }}
                    className="w-full mt-0.5 p-2 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-800 outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Deliverables (Comma separated)</label>
                  <input
                    type="text"
                    value={phase.deliverables.join(', ')}
                    onChange={(e) => {
                      const updated = [...config.implementationRoadmap];
                      updated[index] = {
                        ...updated[index],
                        deliverables: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                      };
                      setConfig({ ...config, implementationRoadmap: updated });
                    }}
                    className="w-full mt-0.5 px-2 py-1 rounded-lg border border-slate-200 bg-white text-[11px] font-medium text-slate-700 outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: COMPANY BRANDING & EMAIL TEMPLATES */}
      {activeTab === 'branding' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Company Info */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-sm">Company Branding &amp; Signatory</h3>
              <p className="text-xs text-slate-500">Appears in header, footer, and signatures across proposals.</p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Company Registered Name</label>
                <input
                  type="text"
                  value={config.companyInfo.companyName}
                  onChange={(e) => setConfig({ ...config, companyInfo: { ...config.companyInfo, companyName: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium text-slate-800 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Brand Name</label>
                  <input
                    type="text"
                    value={config.companyInfo.brandName}
                    onChange={(e) => setConfig({ ...config, companyInfo: { ...config.companyInfo, brandName: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium text-slate-800 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={config.companyInfo.phone}
                    onChange={(e) => setConfig({ ...config, companyInfo: { ...config.companyInfo, phone: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium text-slate-800 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Platform Tagline</label>
                <input
                  type="text"
                  value={config.companyInfo.tagline}
                  onChange={(e) => setConfig({ ...config, companyInfo: { ...config.companyInfo, tagline: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium text-slate-800 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Support Email</label>
                  <input
                    type="email"
                    value={config.companyInfo.supportEmail}
                    onChange={(e) => setConfig({ ...config, companyInfo: { ...config.companyInfo, supportEmail: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium text-slate-800 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Sales Email</label>
                  <input
                    type="email"
                    value={config.companyInfo.salesEmail}
                    onChange={(e) => setConfig({ ...config, companyInfo: { ...config.companyInfo, salesEmail: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium text-slate-800 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Corporate Address</label>
                <input
                  type="text"
                  value={config.companyInfo.address}
                  onChange={(e) => setConfig({ ...config, companyInfo: { ...config.companyInfo, address: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Signatory Title</label>
                <input
                  type="text"
                  value={config.companyInfo.signatoryTitle}
                  onChange={(e) => setConfig({ ...config, companyInfo: { ...config.companyInfo, signatoryTitle: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium text-slate-800 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Email Template */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-sm">Automated Email Dispatch Configuration</h3>
              <p className="text-xs text-slate-500">
                Variables supported: <code className="text-[#FF5733] font-bold">&#123;&#123;fullName&#125;&#125;</code>, <code className="text-[#FF5733] font-bold">&#123;&#123;companyName&#125;&#125;</code>
              </p>
            </div>

            <div className="space-y-3 text-xs">
              {/* Delivery Format Selector */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Email Delivery Format</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setConfig({ ...config, emailTemplate: { ...config.emailTemplate, format: 'plain' } })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      (config.emailTemplate?.format ?? 'plain') === 'plain'
                        ? 'border-[#FF5733] bg-orange-50/60 ring-2 ring-[#FF5733]/20 text-slate-900'
                        : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs flex items-center gap-1.5 text-slate-900">
                        <Terminal className="w-3.5 h-3.5 text-[#FF5733]" />
                        Plain Text (Active)
                      </span>
                      {(config.emailTemplate?.format ?? 'plain') === 'plain' && (
                        <span className="w-2 h-2 rounded-full bg-[#FF5733]"></span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                      100% Primary Inbox deliverability. Bypasses spam/promo filters. PDF attached.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConfig({ ...config, emailTemplate: { ...config.emailTemplate, format: 'html' } })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      config.emailTemplate?.format === 'html'
                        ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-600/20 text-slate-900'
                        : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs flex items-center gap-1.5 text-slate-900">
                        <FileCode className="w-3.5 h-3.5 text-indigo-600" />
                        Rich HTML
                      </span>
                      {config.emailTemplate?.format === 'html' && (
                        <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                      Styled HTML visual template with button CTAs and badge headers.
                    </p>
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Subject Line</label>
                <input
                  type="text"
                  value={config.emailTemplate.subject}
                  onChange={(e) => setConfig({ ...config, emailTemplate: { ...config.emailTemplate, subject: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Greeting</label>
                <input
                  type="text"
                  value={config.emailTemplate.greeting}
                  onChange={(e) => setConfig({ ...config, emailTemplate: { ...config.emailTemplate, greeting: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Introduction Body</label>
                <textarea
                  rows={4}
                  value={config.emailTemplate.bodyIntro}
                  onChange={(e) => setConfig({ ...config, emailTemplate: { ...config.emailTemplate, bodyIntro: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium text-slate-800 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Signoff</label>
                <textarea
                  rows={3}
                  value={config.emailTemplate.signoff}
                  onChange={(e) => setConfig({ ...config, emailTemplate: { ...config.emailTemplate, signoff: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium text-slate-800 outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Full-width Live Plain Text Proposal Preview & Fast Action Bar */}
          <div className="lg:col-span-2 bg-slate-900 text-slate-100 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <Terminal className="w-5 h-5 text-[#FF5733]" />
                <div>
                  <h3 className="font-black text-white text-sm tracking-wide">
                    Executive Plain-Text Email Proposal Preview
                  </h3>
                  <p className="text-xs text-slate-400">
                    Live compiled plain text payload dispatched to clients when Plain Text format is active.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyPlainText}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700"
                >
                  {copiedText ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-300" />
                      <span>Copy Plain Text</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1.5 bg-slate-800/90 rounded-xl p-1 border border-slate-700">
                  <input
                    type="email"
                    value={partnerEmail}
                    onChange={(e) => setPartnerEmail(e.target.value)}
                    placeholder="Recipient Email"
                    className="bg-transparent px-2.5 py-1 text-xs text-white placeholder-slate-500 font-mono outline-none w-44"
                  />
                  <button
                    type="button"
                    onClick={() => handleSendTestEmail(partnerEmail)}
                    disabled={sendingTest}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FF5733] hover:bg-[#E03E1D] text-white text-xs font-bold transition-all disabled:opacity-50"
                  >
                    {sendingTest ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                    <span>{sendingTest ? 'Sending...' : 'Send Test Plain Text'}</span>
                  </button>
                </div>
              </div>
            </div>

            {testResult && (
              <div
                className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                  testResult.success
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                    : 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
                }`}
              >
                {testResult.success ? <Check className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                <span>{testResult.message}</span>
              </div>
            )}

            <div className="relative">
              <pre className="p-4 rounded-2xl bg-slate-950 text-slate-300 font-mono text-[11px] leading-relaxed overflow-x-auto max-h-[380px] border border-slate-800 scrollbar-thin scrollbar-thumb-slate-700">
                {previewPlainText}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: LIVE PROPOSAL PREVIEW */}
      {activeTab === 'preview' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-bold text-slate-700">Preview Partner:</span>
              <input
                type="text"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                placeholder="Partner Company"
                className="px-3 py-1.5 rounded-lg border border-slate-200 font-medium outline-none"
              />
              <input
                type="text"
                value={partnerContact}
                onChange={(e) => setPartnerContact(e.target.value)}
                placeholder="Contact Person"
                className="px-3 py-1.5 rounded-lg border border-slate-200 font-medium outline-none"
              />
            </div>

            <div className="flex items-center gap-2.5">
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setPreviewMode('document')}
                  className={`px-3 py-1 rounded-lg font-bold text-xs transition-all ${
                    previewMode === 'document'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Printable Document
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode('plaintext')}
                  className={`px-3 py-1 rounded-lg font-bold text-xs transition-all flex items-center gap-1.5 ${
                    previewMode === 'plaintext'
                      ? 'bg-white text-[#FF5733] shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Plain Text Email</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode('html')}
                  className={`px-3 py-1 rounded-lg font-bold text-xs transition-all flex items-center gap-1.5 ${
                    previewMode === 'html'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email HTML View</span>
                </button>
              </div>

              {previewMode === 'document' && (
                <button
                  onClick={handlePrint}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white font-bold inline-flex items-center gap-1.5 hover:bg-slate-800 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Document</span>
                </button>
              )}
              {previewMode === 'plaintext' && (
                <button
                  onClick={handleCopyPlainText}
                  className="px-3.5 py-1.5 rounded-xl bg-[#FF5733] text-white font-bold inline-flex items-center gap-1.5 hover:bg-[#E03E1D] transition-colors shadow-sm"
                >
                  {copiedText ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5 text-white" />}
                  <span>{copiedText ? 'Copied!' : 'Copy Plain Text'}</span>
                </button>
              )}
              {previewMode === 'html' && (
                <button
                  onClick={() => handleSendTestEmail(partnerEmail, 'html')}
                  disabled={sendingTest}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-bold inline-flex items-center gap-1.5 hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
                >
                  {sendingTest ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  <span>{sendingTest ? 'Sending...' : 'Send Test HTML'}</span>
                </button>
              )}
            </div>
          </div>

          {previewMode === 'plaintext' ? (
            /* Plain Text Email Preview */
            <div className="bg-slate-900 text-slate-100 rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-xl max-w-4xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-[#FF5733]" />
                    <span className="text-lg font-black text-white tracking-tight">
                      Plain Text Proposal RFC 822 Email Body
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    This exact plain text document will be delivered to <strong className="text-white font-mono">{partnerEmail}</strong> with the official PDF attached.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyPlainText}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-slate-700"
                  >
                    {copiedText ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-300" />
                        <span>Copy Plain Text</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSendTestEmail(partnerEmail, 'plain')}
                    disabled={sendingTest}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF5733] to-[#E03E1D] text-white text-xs font-bold transition-all shadow-md disabled:opacity-50"
                  >
                    {sendingTest ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                    <span>{sendingTest ? 'Sending...' : 'Send Test Plain Text'}</span>
                  </button>
                </div>
              </div>

              {testResult && (
                <div
                  className={`p-3.5 rounded-xl text-xs font-bold flex items-center gap-2.5 ${
                    testResult.success
                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                      : 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
                  }`}
                >
                  {testResult.success ? <Check className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                  <span>{testResult.message}</span>
                </div>
              )}

              <div className="rounded-2xl bg-slate-950 p-6 border border-slate-800">
                <pre className="text-slate-300 font-mono text-xs leading-relaxed whitespace-pre overflow-x-auto">
                  {previewPlainText}
                </pre>
              </div>
            </div>
          ) : previewMode === 'html' ? (
            /* Gmail-Style Email HTML View */
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm max-w-4xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <span className="text-lg font-black text-slate-900 tracking-tight">
                      Gmail Client Layout (Exact Recipient View)
                    </span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      HTML Email
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Visual template rendered in Gmail web/app format with highlighted ownership box, full deliverables, and terms.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(previewEmailHtml);
                      setCopiedText(true);
                      setTimeout(() => setCopiedText(false), 3000);
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-200"
                  >
                    {copiedText ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-600" />
                        <span>Copy HTML</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSendTestEmail(partnerEmail, 'html')}
                    disabled={sendingTest}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold transition-all shadow-md disabled:opacity-50"
                  >
                    {sendingTest ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                    <span>{sendingTest ? 'Sending...' : 'Send Test HTML Email'}</span>
                  </button>
                </div>
              </div>

              {testResult && (
                <div
                  className={`p-3.5 rounded-xl text-xs font-bold flex items-center gap-2.5 ${
                    testResult.success
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                      : 'bg-rose-50 border border-rose-200 text-rose-700'
                  }`}
                >
                  {testResult.success ? <Check className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                  <span>{testResult.message}</span>
                </div>
              )}

              {/* Email Client Shell Simulation */}
              <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-[#f6f8fc]">
                <div className="bg-[#f2f6fc] border-b border-slate-200 px-4 py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    <span className="font-semibold text-slate-700 ml-2">
                      Subject: {config.emailTemplate.subject.replace('{COMPANY_NAME}', partnerName || 'Enterprise Partner')}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">To: {partnerEmail}</span>
                </div>

                <div className="p-4 sm:p-6 bg-[#f6f8fc]">
                  <iframe
                    srcDoc={previewEmailHtml}
                    title="Gmail Proposal Email Preview"
                    className="w-full min-h-[900px] bg-white rounded-xl border border-slate-200 shadow-sm"
                  />
                </div>
              </div>
            </div>
          ) : (
            /* Printable Proposal Document */
            <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm max-w-4xl mx-auto space-y-8 print:p-0 print:border-none print:shadow-none">
            {/* Proposal Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b-2 border-slate-900">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#FF5733] flex items-center justify-center text-white font-black text-lg">
                    A
                  </div>
                  <span className="text-xl font-black text-slate-900 tracking-tight">
                    {config.companyInfo.brandName}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  {config.companyInfo.tagline}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {config.companyInfo.address}
                </p>
              </div>

              <div className="text-right sm:text-right">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#FF5733] bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                  Commercial Proposal
                </span>
                <p className="font-mono text-xs font-black text-slate-900 mt-1">
                  REF: FIN-2026-LIVE
                </p>
                <p className="text-[11px] text-slate-500">
                  Date: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>

            {/* Recipient Information */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Prepared Specifically For
                </span>
                <p className="font-extrabold text-slate-900 text-sm">{partnerName}</p>
                <p className="text-slate-600 font-medium">Attn: {partnerContact}</p>
                <p className="text-slate-500">{partnerEmail} &bull; {partnerPhone}</p>
              </div>
              <div className="sm:text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Platform Architecture
                </span>
                <p className="font-bold text-slate-900">Enterprise White-Label Switch</p>
                <p className="text-slate-600 font-medium">Web Portal &bull; Android APK &bull; Micro ATM</p>
                <p className="text-[#FF5733] font-bold">24x7 Instant Settlement Rails</p>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="space-y-2 text-xs">
              <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-xs border-l-2 border-[#FF5733] pl-2">
                Executive Overview
              </h4>
              <p className="text-slate-700 leading-relaxed font-normal text-justify">
                Based on your objective to deploy a fully branded turnkey White-Label B2B FinTech platform, {config.companyInfo.brandName} has engineered a comprehensive multi-tiered infrastructure solution. Under this deployment, {partnerName} will launch and manage its own independent web and mobile banking ecosystem, backed by institutional multi-bank switch routing, instant commission distribution, and seamless retailer onboarding.
              </p>
            </div>

            {/* Commercial Terms Summary Table */}
            <div className="space-y-3 text-xs">
              <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-xs border-l-2 border-[#FF5733] pl-2">
                Commercial Pricing &amp; License Terms
              </h4>
              <div className="rounded-2xl border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                  <tbody className="divide-y divide-slate-100">
                    <tr className="bg-slate-50/70">
                      <td className="py-2.5 px-4 font-bold text-slate-800 w-1/3">Platform Setup Fee</td>
                      <td className="py-2.5 px-4 text-slate-700">{config.pricing.setupFee}</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-bold text-slate-800">Monthly Maintenance / AMC</td>
                      <td className="py-2.5 px-4 text-slate-700">{config.pricing.monthlyFee}</td>
                    </tr>
                    <tr className="bg-slate-50/70">
                      <td className="py-2.5 px-4 font-bold text-slate-800">API Charges</td>
                      <td className="py-2.5 px-4 text-slate-700">{config.pricing.apiCharges}</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-bold text-slate-800">Transaction Charges</td>
                      <td className="py-2.5 px-4 text-slate-700">{config.pricing.transactionCharges}</td>
                    </tr>
                    <tr className="bg-slate-50/70">
                      <td className="py-2.5 px-4 font-bold text-slate-800">Hardware mPOS / PIN-Pad</td>
                      <td className="py-2.5 px-4 text-slate-700">{config.pricing.hardwareCharges}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-slate-500 italic">
                * Note: {config.pricing.note}
              </p>
            </div>

            {/* Commercial Slabs */}
            <div className="space-y-3 text-xs">
              <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-xs border-l-2 border-[#FF5733] pl-2">
                Proposed Commercial Commission Matrix
              </h4>
              <div className="rounded-2xl border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-900 text-white font-bold text-[11px]">
                      <th className="py-2.5 px-4">Service</th>
                      <th className="py-2.5 px-4">Commercial Rate</th>
                      <th className="py-2.5 px-4">Notes &amp; Settlement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {config.commercialSlabs.map((slab, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                        <td className="py-2.5 px-4 font-bold text-slate-800">{slab.service}</td>
                        <td className="py-2.5 px-4 font-mono font-black text-[#FF5733]">
                          {slab.commissionType === 'fixed' ? `₹${slab.value.toFixed(2)}` : `${slab.value}%`}
                        </td>
                        <td className="py-2.5 px-4 text-slate-500 text-[11px]">{slab.notes || 'Instant credit'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Implementation Timeline */}
            <div className="space-y-3 text-xs">
              <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-xs border-l-2 border-[#FF5733] pl-2">
                Implementation Roadmap
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {config.implementationRoadmap.map((p, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-[#FF5733] text-[11px]">{p.phase}</span>
                      <span className="text-slate-500 text-[10px]">{p.duration}</span>
                    </div>
                    <p className="font-bold text-slate-900 mt-1">{p.title}</p>
                    <p className="text-slate-600 text-[11px] mt-0.5">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="space-y-2 text-xs pt-4 border-t border-slate-200">
              <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-xs">
                Terms &amp; Conditions
              </h4>
              <ul className="list-disc pl-4 space-y-1 text-slate-600 text-[11px]">
                {config.termsAndConditions.map((term, i) => (
                  <li key={i}>{term}</li>
                ))}
              </ul>
            </div>

            {/* Signatures */}
            <div className="pt-8 border-t border-slate-200 grid grid-cols-2 gap-8 text-xs">
              <div>
                <p className="text-slate-400 font-bold uppercase text-[10px]">For {partnerName}</p>
                <div className="h-12 border-b border-dashed border-slate-300 mt-2" />
                <p className="font-bold text-slate-800 mt-1.5">Authorized Signatory</p>
                <p className="text-slate-400 text-[10px]">Name &amp; Designation</p>
              </div>
              <div className="text-right">
                <p className="text-slate-400 font-bold uppercase text-[10px]">For {config.companyInfo.companyName}</p>
                <div className="h-12 border-b border-dashed border-slate-300 mt-2 flex items-center justify-end">
                  <span className="font-serif italic text-slate-600 text-sm font-bold">AsthaPay Solutions</span>
                </div>
                <p className="font-bold text-slate-800 mt-1.5">{config.companyInfo.signatoryTitle}</p>
                <p className="text-slate-400 text-[10px]">Turnkey FinTech Switch Division</p>
              </div>
            </div>
          </div>
          )}
        </div>
      )}
    </div>
  );
}
