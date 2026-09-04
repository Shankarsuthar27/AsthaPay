'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Printer, 
  Download, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  ShieldCheck, 
  Layers, 
  Calendar, 
  Phone, 
  Mail, 
  ExternalLink,
  ChevronRight,
  Clock,
  Server
} from 'lucide-react';
import { GeneratedProposal } from '@/types/admin';
import { fetchAllLeads } from '@/lib/leadsService';
import { synthesizeProposal } from '@/lib/proposalEngine';
import Link from 'next/link';

export default function ProposalViewPage() {
  const params = useParams();
  const router = useRouter();
  const proposalId = params.id as string;

  const [proposal, setProposal] = useState<GeneratedProposal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProposal() {
      setLoading(true);
      try {
        const leads = await fetchAllLeads();
        const matchedLead = leads.find(
          (l) => l.proposalId === proposalId || l.id === proposalId
        );

        if (matchedLead && matchedLead.proposalContent) {
          setProposal(matchedLead.proposalContent);
        } else if (matchedLead) {
          // Synthesize on the fly
          const synth = synthesizeProposal({
            fullName: matchedLead.name,
            businessEmail: matchedLead.email,
            mobileNumber: matchedLead.phone,
            companyName: matchedLead.companyName,
            partnershipModel: matchedLead.businessType || 'White-Label B2B Portal & App',
            retailNetwork: matchedLead.estimatedRetailers || '100 - 500 Retailers',
            selectedServices: matchedLead.selectedServices || ['AePS Biometric', 'Micro ATM / mPOS'],
            additionalRequirements: matchedLead.additionalRequirements,
          });
          synth.proposalId = matchedLead.proposalId || proposalId;
          setProposal(synth);
        } else {
          // Demo fallback proposal
          const fallback = synthesizeProposal({
            fullName: 'Executive Partner',
            businessEmail: 'partner@domain.com',
            mobileNumber: '+91 98765 43210',
            companyName: 'FinTech Enterprise',
            partnershipModel: 'White-Label B2B Portal & App',
            retailNetwork: '200 - 1,000+ Retailers',
            selectedServices: [
              'Aadhaar Enabled Payment System (AePS)',
              'Domestic Money Transfer (DMT)',
              'Micro ATM',
              'BBPS',
              'Payout APIs',
            ],
          });
          fallback.proposalId = proposalId;
          setProposal(fallback);
        }
      } catch (err) {
        console.error('Failed to load proposal:', err);
      } finally {
        setLoading(false);
      }
    }

    if (proposalId) {
      loadProposal();
    }
  }, [proposalId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF5733] to-[#FF8A65] flex items-center justify-center font-black text-xl mb-4 animate-bounce">
          A
        </div>
        <p className="text-sm font-semibold text-slate-300">Preparing Official Proposal Document...</p>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-slate-800">Proposal Document Not Found</h2>
        <p className="text-xs text-slate-500 mt-1">Please verify the link or contact AsthaPay support.</p>
        <Link href="/" className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 pb-16 print:p-0 print:bg-white">
      {/* Floating Control Bar (Hidden when printing) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3.5 shadow-sm print:hidden">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Go Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#FF5733] bg-[#FF5733]/10 px-2.5 py-0.5 rounded-full border border-[#FF5733]/20">
                  {proposal.proposalId}
                </span>
                <span className="text-xs text-slate-500 hidden sm:inline">&bull;</span>
                <span className="text-xs font-bold text-slate-700 hidden sm:inline">
                  {proposal.client.companyName}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hidden sm:inline-block"
            >
              AsthaPay Website
            </Link>
            <a
              href={`/api/proposals/${proposal.proposalId}/pdf`}
              download
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all"
            >
              <Download className="w-4 h-4 text-[#FF5733]" />
              <span>Download PDF</span>
            </a>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FF5733] to-[#E03E1D] hover:from-[#ff6b4a] hover:to-[#eb4724] text-white font-bold text-xs shadow-md shadow-[#FF5733]/25 transition-all active:scale-98"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Printable Proposal Container */}
      <main className="max-w-4xl mx-auto mt-6 sm:mt-8 p-6 sm:p-12 bg-white rounded-3xl border border-slate-200/90 shadow-xl print:shadow-none print:border-none print:p-0 print:m-0 print:rounded-none">
        
        {/* Cover Section */}
        <section className="border-b-2 border-slate-900 pb-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF5733] to-[#FF8A65] text-white flex items-center justify-center font-black text-2xl shadow-md">
                  A
                </div>
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                    Astha<span className="text-[#FF5733]">Pay</span> Technologies
                  </h1>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                    Turnkey B2B FinTech &amp; Multi-Bank Switch Infrastructure
                  </p>
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="inline-block px-2.5 py-1 rounded bg-[#0A1931] text-white text-[10px] font-black uppercase tracking-widest">
                Confidential Proposal
              </span>
              <p className="font-mono font-bold text-xs text-slate-700 mt-2">ID: {proposal.proposalId}</p>
              <p className="text-xs text-slate-500">Date: {proposal.generatedAt}</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/80 p-5 rounded-2xl border border-slate-200/60">
            <div>
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Prepared Exclusively For:</span>
              <h2 className="text-lg font-black text-slate-900 mt-0.5">{proposal.client.companyName}</h2>
              <p className="text-xs text-slate-700 font-semibold">Authorized Representative: {proposal.client.fullName}</p>
              <p className="text-xs text-slate-500 mt-0.5">{proposal.client.mobileNumber} &bull; {proposal.client.businessEmail}</p>
            </div>

            <div className="space-y-1 text-xs">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Solution Model:</span>
              <p className="font-black text-[#0A1931] text-sm">{proposal.requirements.partnershipModel}</p>
              <p className="text-slate-600 font-medium">Planned Retail Network: <strong className="text-slate-900">{proposal.requirements.retailNetwork}</strong></p>
            </div>
          </div>
        </section>

        {/* 1. Executive Summary */}
        <section className="mb-10">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#FF5733] mb-1">
            Section 01
          </h3>
          <h2 className="text-lg font-black text-slate-900 mb-3">
            Executive Summary
          </h2>
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-50 to-orange-50/30 border border-slate-200 text-xs text-slate-700 leading-relaxed text-justify space-y-2">
            <p>{proposal.executiveSummary}</p>
            {proposal.requirements.additionalRequirements && (
              <p className="pt-2 border-t border-slate-200 text-[11px] text-slate-600 italic">
                <strong>Client Noted Objective:</strong> &ldquo;{proposal.requirements.additionalRequirements}&rdquo;
              </p>
            )}
          </div>
        </section>

        {/* 2. Client Requirements Matrix */}
        <section className="mb-10">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#FF5733] mb-1">
            Section 02
          </h3>
          <h2 className="text-lg font-black text-slate-900 mb-3">
            Client Requirement Specifications
          </h2>
          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs border-collapse">
              <tbody>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <td className="py-2.5 px-4 font-bold text-slate-600 w-1/3">Partnership Model</td>
                  <td className="py-2.5 px-4 font-extrabold text-slate-900">{proposal.requirements.partnershipModel}</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-2.5 px-4 font-bold text-slate-600">Retail Network Capacity</td>
                  <td className="py-2.5 px-4 font-extrabold text-slate-900">{proposal.requirements.retailNetwork}</td>
                </tr>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <td className="py-2.5 px-4 font-bold text-slate-600">Target Launch Services</td>
                  <td className="py-2.5 px-4 font-bold text-slate-900">{proposal.requirements.selectedServices.length} Turnkey Services Selected</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-bold text-slate-600">Operating Brand / Entity</td>
                  <td className="py-2.5 px-4 font-extrabold text-slate-900">{proposal.client.companyName}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. Recommended Solution Modules */}
        <section className="mb-10">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#FF5733] mb-1">
            Section 03
          </h3>
          <h2 className="text-lg font-black text-slate-900 mb-3">
            Recommended Platform Solution Architecture
          </h2>
          <div className="space-y-4">
            {proposal.recommendedSolution.map((mod, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded-lg bg-[#0A1931] text-white flex items-center justify-center font-bold text-xs">
                    {idx + 1}
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{mod.module}</h4>
                </div>
                <p className="text-xs text-slate-600 mb-3 pl-8">{mod.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-8">
                  {mod.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-[11px] text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Services Selected for Launch */}
        <section className="mb-10 page-break-before">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#FF5733] mb-1">
            Section 04
          </h3>
          <h2 className="text-lg font-black text-slate-900 mb-3">
            Services Selected for Launch ({proposal.selectedServicesDetails.length})
          </h2>
          <div className="space-y-4">
            {proposal.selectedServicesDetails.map((service, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                  <h4 className="font-black text-slate-900 text-sm">{service.service}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Switch Ready
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed mb-2.5">
                  {service.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
                  <div>
                    <span className="font-bold text-slate-400 uppercase text-[9px] block">Use Case</span>
                    <span className="text-slate-700 font-medium">{service.businessUseCase}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-400 uppercase text-[9px] block">Infrastructure</span>
                    <span className="text-slate-700 font-medium">{service.requiredInfrastructure}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-400 uppercase text-[9px] block">Integration Spec</span>
                    <span className="text-slate-700 font-medium">{service.integrationRequirements}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Technology & Security Infrastructure */}
        <section className="mb-10">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#FF5733] mb-1">
            Section 05
          </h3>
          <h2 className="text-lg font-black text-slate-900 mb-3">
            Technology, Switch &amp; Security Standards
          </h2>
          <div className="p-5 rounded-2xl bg-[#0A1931] text-white space-y-3">
            <p className="text-xs text-slate-300 leading-relaxed">
              AsthaPay operates as a high-concurrency B2B switch routing partner requests across multiple tier-1 banking institutions with automated fallback switches.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {proposal.technologyInfrastructure.map((tech, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-[#FF5733] shrink-0" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Implementation Roadmap */}
        <section className="mb-10">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#FF5733] mb-1">
            Section 06
          </h3>
          <h2 className="text-lg font-black text-slate-900 mb-3">
            Implementation Roadmap &amp; Milestones
          </h2>
          <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 text-xs">
            {proposal.implementationRoadmap.map((p, idx) => (
              <div key={idx} className="p-3.5 sm:p-4 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#FF5733] text-[11px] bg-orange-50 px-2 py-0.5 rounded">
                      {p.phase}
                    </span>
                    <h4 className="font-extrabold text-slate-900">{p.title}</h4>
                  </div>
                  <p className="text-slate-600 text-[11px]">{p.description}</p>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <span className="font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg text-[10px]">
                    {p.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Commercial Terms */}
        <section className="mb-10">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#FF5733] mb-1">
            Section 07
          </h3>
          <h2 className="text-lg font-black text-slate-900 mb-3">
            Commercial Structure &amp; Pricing Framework
          </h2>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3">
            <p className="text-slate-700 leading-relaxed">
              {proposal.commercialTerms.note}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Platform Setup</span>
                <p className="font-semibold text-slate-800 text-xs mt-0.5">{proposal.commercialTerms.setupFee}</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Server &amp; Maintenance</span>
                <p className="font-semibold text-slate-800 text-xs mt-0.5">{proposal.commercialTerms.monthlyFee}</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">API Overhead</span>
                <p className="font-semibold text-slate-800 text-xs mt-0.5">{proposal.commercialTerms.apiCharges}</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Settlement &amp; MDR</span>
                <p className="font-semibold text-slate-800 text-xs mt-0.5">{proposal.commercialTerms.transactionCharges}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Call to Action */}
        <section className="mb-10 print:hidden">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#07172F] via-[#0A1931] to-[#0D2447] text-white border border-slate-700 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-700/60">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#FF5733] bg-[#FF5733]/15 px-3 py-1 rounded-full border border-[#FF5733]/30">
                  Interactive Platform Experience
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
                  Ready to explore the platform?
                </h2>
                <p className="text-xs text-slate-300 mt-1 max-w-lg">
                  Your personalized live product demonstration can walk you through the end-to-end operational architecture:
                </p>
              </div>

              <div className="flex flex-wrap sm:flex-col gap-2.5 shrink-0">
                <Link
                  href="/"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5733] to-[#E03E1D] text-white font-black text-xs shadow-coral-glow hover:shadow-lg transition-all text-center"
                >
                  Schedule Live Demo
                </Link>
                <a
                  href="https://sandbox.asthapay.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs text-center border border-white/20 transition-all"
                >
                  Access Sandbox
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-5 text-xs">
              {[
                'Admin Panel Command Center',
                'Distributor Hierarchy',
                'Retailer Management',
                'Commission Engine & Slabs',
                'Wallet & Dual-Ledger System',
                'Transaction Processing Switch',
                'API Infrastructure & Webhooks',
                'Reporting & Financial Ledgers',
                'Selected FinTech Services Switch',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5733] shrink-0" />
                  <span className="text-[11px] font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Signatures & Formal Confirmation */}
        <section className="pt-8 border-t-2 border-slate-200 grid grid-cols-2 gap-8 text-xs">
          <div>
            <p className="font-extrabold text-slate-900">For AsthaPay Technologies</p>
            <div className="h-16 flex items-end">
              <div className="font-serif italic text-base font-bold text-slate-800">Authorized FinTech Director</div>
            </div>
            <p className="text-[11px] text-slate-500">Enterprise Solutions Group</p>
          </div>

          <div className="text-right">
            <p className="font-extrabold text-slate-900">Accepted on Behalf of</p>
            <div className="h-16 flex items-end justify-end">
              <div className="border-b border-slate-400 w-48 text-right pb-1 text-slate-400 italic">Signature &amp; Stamp</div>
            </div>
            <p className="text-[11px] text-slate-500">{proposal.client.companyName}</p>
          </div>
        </section>

      </main>
    </div>
  );
}
