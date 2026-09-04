'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  X, 
  Phone, 
  Mail, 
  Building2, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  RotateCcw,
  Sparkles,
  ExternalLink,
  ChevronDown,
  FileText,
  Send,
  RefreshCw,
  Eye,
  Printer,
  ShieldAlert,
  Sliders,
  Edit3
} from 'lucide-react';
import Link from 'next/link';
import { Lead, LeadStatus, EmailStatus, ProposalStatus, GeneratedProposal } from '@/types/admin';
import { fetchAllLeads, createLead, updateLeadStatus, updateLeadProposalData } from '@/lib/leadsService';
import { synthesizeProposal } from '@/lib/proposalEngine';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [partnershipModelFilter, setPartnershipModelFilter] = useState<string>('all');
  const [retailNetworkFilter, setRetailNetworkFilter] = useState<string>('all');
  const [emailStatusFilter, setEmailStatusFilter] = useState<string>('all');
  const [proposalStatusFilter, setProposalStatusFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');

  // Modals & Drawer State
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [drawerNotes, setDrawerNotes] = useState<string>('');
  const [savingNotes, setSavingNotes] = useState(false);
  const [activeProposalPreview, setActiveProposalPreview] = useState<GeneratedProposal | null>(null);
  const [previewLeadId, setPreviewLeadId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Proposal Edit & Custom Pricing Modal State
  const [editingProposalLead, setEditingProposalLead] = useState<Lead | null>(null);
  const [proposalEditForm, setProposalEditForm] = useState({
    setupFee: '',
    monthlyFee: '',
    apiCharges: '',
    transactionCharges: '',
    hardwareCharges: '',
    note: '',
    proposalStatus: 'generated' as ProposalStatus,
    executiveSummary: '',
  });

  // New Lead Form State
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    email: '',
    phone: '+91 ',
    companyName: '',
    businessType: 'White-Label B2B Portal & App',
    estimatedRetailers: '10–50 Retailers',
    selectedServices: [
      'Aadhaar Enabled Payment System (AePS)',
      'Domestic Money Transfer (DMT)',
      'Micro ATM',
      'BBPS',
    ],
    additionalRequirements: '',
    status: 'new' as LeadStatus,
  });

  const allServices = [
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

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchAllLeads();
      setLeads(data);
    } catch (err) {
      console.error('Failed to load leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const notify = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    try {
      await updateLeadStatus(leadId, newStatus);
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
      );
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
      notify('success', `Lead status updated to ${newStatus}.`);
    } catch (err) {
      notify('error', 'Failed to update lead status.');
    }
  };

  // Resend proposal email via backend API
  const handleResendEmail = async (lead: Lead) => {
    if (!lead.email) {
      notify('error', 'No email address found for this lead.');
      return;
    }

    setActionLoading(`resend-${lead.id}`);
    try {
      // Ensure proposal content is present
      let proposalToResend = lead.proposalContent;
      if (!proposalToResend) {
        proposalToResend = synthesizeProposal({
          fullName: lead.name,
          businessEmail: lead.email,
          mobileNumber: lead.phone,
          companyName: lead.companyName,
          partnershipModel: lead.businessType,
          retailNetwork: lead.estimatedRetailers,
          selectedServices: lead.selectedServices,
          additionalRequirements: lead.additionalRequirements,
        });
        if (lead.proposalId) proposalToResend.proposalId = lead.proposalId;
      }

      const res = await fetch('/api/proposals/resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proposal: proposalToResend, leadId: lead.id }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to resend proposal email');
      }

      await updateLeadProposalData(lead.id!, {
        emailStatus: 'sent',
        sentAt: new Date(),
      });

      setLeads((prev) =>
        prev.map((l) => (l.id === lead.id ? { ...l, emailStatus: 'sent', sentAt: new Date() } : l))
      );

      notify('success', `Proposal email dispatched to ${lead.email}.`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Resend failed';
      notify('error', msg);
    } finally {
      setActionLoading(null);
    }
  };

  // Regenerate proposal content
  const handleRegenerateProposal = async (lead: Lead) => {
    setActionLoading(`regen-${lead.id}`);
    try {
      const res = await fetch('/api/proposals/regenerate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadInput: {
            fullName: lead.name,
            businessEmail: lead.email,
            mobileNumber: lead.phone,
            companyName: lead.companyName,
            partnershipModel: lead.businessType,
            retailNetwork: lead.estimatedRetailers,
            selectedServices: lead.selectedServices,
            additionalRequirements: lead.additionalRequirements,
          },
          leadId: lead.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to regenerate proposal');
      }

      await updateLeadProposalData(lead.id!, {
        proposalId: data.proposal.proposalId,
        proposalContent: data.proposal,
        proposalStatus: 'generated',
      });

      setLeads((prev) =>
        prev.map((l) =>
          l.id === lead.id
            ? {
                ...l,
                proposalId: data.proposal.proposalId,
                proposalContent: data.proposal,
                proposalStatus: 'generated',
              }
            : l
        )
      );

      notify('success', `Proposal regenerated (Ref: ${data.proposal.proposalId}).`);
      if (activeProposalPreview && previewLeadId === lead.id) {
        setActiveProposalPreview(data.proposal);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Regeneration failed';
      notify('error', msg);
    } finally {
      setActionLoading(null);
    }
  };

  const handleOpenDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setDrawerNotes(lead.internalNotes || '');
  };

  const handleSaveNotes = async () => {
    if (!selectedLead || !selectedLead.id) return;
    setSavingNotes(true);
    try {
      await updateLeadProposalData(selectedLead.id, { internalNotes: drawerNotes });
      setLeads((prev) =>
        prev.map((l) => (l.id === selectedLead.id ? { ...l, internalNotes: drawerNotes } : l))
      );
      setSelectedLead((prev) => (prev ? { ...prev, internalNotes: drawerNotes } : null));
      notify('success', 'Internal notes updated successfully.');
    } catch (err) {
      notify('error', 'Failed to update internal notes.');
    } finally {
      setSavingNotes(false);
    }
  };

  const openProposalPreview = (lead: Lead) => {
    setPreviewLeadId(lead.id || null);
    if (lead.proposalContent) {
      setActiveProposalPreview(lead.proposalContent);
    } else {
      const synthesized = synthesizeProposal({
        fullName: lead.name,
        businessEmail: lead.email,
        mobileNumber: lead.phone,
        companyName: lead.companyName,
        partnershipModel: lead.businessType,
        retailNetwork: lead.estimatedRetailers,
        selectedServices: lead.selectedServices,
        additionalRequirements: lead.additionalRequirements,
      });
      if (lead.proposalId) synthesized.proposalId = lead.proposalId;
      setActiveProposalPreview(synthesized);
    }
  };

  const handleOpenEditProposal = (lead: Lead) => {
    setEditingProposalLead(lead);
    const existing = lead.proposalContent;
    setProposalEditForm({
      setupFee: existing?.commercialTerms?.setupFee || 'Customized based on selected platform tier and white-label mobile app provisioning.',
      monthlyFee: existing?.commercialTerms?.monthlyFee || 'Covers cloud server scaling, multi-bank switch routing, SSL certificates, and technical support.',
      apiCharges: existing?.commercialTerms?.apiCharges || 'Included in enterprise package with zero per-hit overhead on standard transactions.',
      transactionCharges: existing?.commercialTerms?.transactionCharges || 'Zero debit MDR for AePS and Micro ATM; standard IMPS commercial slabs apply for DMT.',
      hardwareCharges: existing?.commercialTerms?.hardwareCharges || 'Hardware mPOS and Biometric scanners available at volume distributor rates.',
      note: existing?.commercialTerms?.note || 'Commercial pricing will be finalized based on the selected services, transaction volume, infrastructure requirements, and integration scope discussed during your live product demonstration.',
      proposalStatus: lead.proposalStatus || 'generated',
      executiveSummary: existing?.executiveSummary || '',
    });
  };

  const handleSaveProposalEdits = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProposalLead || !editingProposalLead.id) return;

    setActionLoading(`save-proposal-${editingProposalLead.id}`);
    try {
      let currentProposal = editingProposalLead.proposalContent;
      if (!currentProposal) {
        currentProposal = synthesizeProposal({
          fullName: editingProposalLead.name,
          businessEmail: editingProposalLead.email,
          mobileNumber: editingProposalLead.phone,
          companyName: editingProposalLead.companyName,
          partnershipModel: editingProposalLead.businessType,
          retailNetwork: editingProposalLead.estimatedRetailers,
          selectedServices: editingProposalLead.selectedServices,
          additionalRequirements: editingProposalLead.additionalRequirements,
        });
        if (editingProposalLead.proposalId) currentProposal.proposalId = editingProposalLead.proposalId;
      }

      const updatedProposal: GeneratedProposal = {
        ...currentProposal,
        executiveSummary: proposalEditForm.executiveSummary || currentProposal.executiveSummary,
        commercialTerms: {
          setupFee: proposalEditForm.setupFee,
          monthlyFee: proposalEditForm.monthlyFee,
          apiCharges: proposalEditForm.apiCharges,
          transactionCharges: proposalEditForm.transactionCharges,
          hardwareCharges: proposalEditForm.hardwareCharges,
          note: proposalEditForm.note,
        },
      };

      await updateLeadProposalData(editingProposalLead.id, {
        proposalContent: updatedProposal,
        proposalStatus: proposalEditForm.proposalStatus,
      });

      setLeads((prev) =>
        prev.map((l) =>
          l.id === editingProposalLead.id
            ? {
                ...l,
                proposalContent: updatedProposal,
                proposalStatus: proposalEditForm.proposalStatus,
              }
            : l
        )
      );

      if (selectedLead && selectedLead.id === editingProposalLead.id) {
        setSelectedLead((prev) =>
          prev
            ? {
                ...prev,
                proposalContent: updatedProposal,
                proposalStatus: proposalEditForm.proposalStatus,
              }
            : null
        );
      }

      if (activeProposalPreview && previewLeadId === editingProposalLead.id) {
        setActiveProposalPreview(updatedProposal);
      }

      setEditingProposalLead(null);
      notify('success', 'Proposal terms & pricing updated successfully.');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update proposal';
      notify('error', msg);
    } finally {
      setActionLoading(null);
    }
  };

  const handleProposalStatusChange = async (leadId: string, newStatus: ProposalStatus) => {
    try {
      await updateLeadProposalData(leadId, { proposalStatus: newStatus });
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, proposalStatus: newStatus } : l))
      );
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead((prev) => (prev ? { ...prev, proposalStatus: newStatus } : null));
      }
      notify('success', `Proposal status changed to ${newStatus}.`);
    } catch (err) {
      notify('error', 'Failed to update proposal status.');
    }
  };

  const handleAddLead = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const added = await createLead(newLeadForm);
      setLeads((prev) => [added, ...prev]);
      setIsAddModalOpen(false);
      notify('success', 'Lead created successfully.');
      setNewLeadForm({
        name: '',
        email: '',
        phone: '+91 ',
        companyName: '',
        businessType: 'White-Label B2B Portal & App',
        estimatedRetailers: '10–50 Retailers',
        selectedServices: [
          'Aadhaar Enabled Payment System (AePS)',
          'Domestic Money Transfer (DMT)',
          'Micro ATM',
          'BBPS',
        ],
        additionalRequirements: '',
        status: 'new',
      });
    } catch (err) {
      notify('error', 'Failed to create lead.');
    }
  };

  // CSV Export
  const exportToCSV = () => {
    const headers = [
      'Proposal ID',
      'Name',
      'Email',
      'Phone',
      'Company',
      'Partnership Model',
      'Retail Network',
      'Services',
      'Lead Status',
      'Proposal Status',
      'Email Status',
      'Date Created',
    ];
    const rows = filteredLeads.map((l) => [
      `"${l.proposalId || ''}"`,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.email.replace(/"/g, '""')}"`,
      `"${l.phone.replace(/"/g, '""')}"`,
      `"${(l.companyName || '').replace(/"/g, '""')}"`,
      `"${l.businessType.replace(/"/g, '""')}"`,
      `"${l.estimatedRetailers.replace(/"/g, '""')}"`,
      `"${(l.selectedServices || []).join('; ')}"`,
      `"${l.status}"`,
      `"${l.proposalStatus || 'generated'}"`,
      `"${l.emailStatus || 'pending'}"`,
      `"${new Date(l.createdAt as any).toLocaleDateString()}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `asthapay-proposals-leads-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filters
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lead.proposalId && lead.proposalId.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (lead.companyName && lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
      const matchesModel = partnershipModelFilter === 'all' || lead.businessType === partnershipModelFilter;
      const matchesNetwork = retailNetworkFilter === 'all' || lead.estimatedRetailers === retailNetworkFilter;
      const matchesEmail = emailStatusFilter === 'all' || lead.emailStatus === emailStatusFilter;
      const matchesProposalStatus = proposalStatusFilter === 'all' || (lead.proposalStatus || 'generated') === proposalStatusFilter;
      const matchesService = serviceFilter === 'all' || (lead.selectedServices && lead.selectedServices.includes(serviceFilter));

      let matchesDate = true;
      if (dateFilter !== 'all') {
        const leadDate = new Date(lead.createdAt as any);
        const now = new Date();
        if (dateFilter === 'today') {
          matchesDate = leadDate.toDateString() === now.toDateString();
        } else if (dateFilter === 'week') {
          const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = leadDate >= sevenDaysAgo;
        } else if (dateFilter === 'month') {
          const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          matchesDate = leadDate >= thirtyDaysAgo;
        }
      }

      return (
        matchesSearch &&
        matchesStatus &&
        matchesModel &&
        matchesNetwork &&
        matchesEmail &&
        matchesProposalStatus &&
        matchesService &&
        matchesDate
      );
    });
  }, [
    leads,
    searchQuery,
    statusFilter,
    partnershipModelFilter,
    retailNetworkFilter,
    emailStatusFilter,
    proposalStatusFilter,
    serviceFilter,
    dateFilter,
  ]);

  const statusCounts = useMemo(() => {
    return {
      all: leads.length,
      new: leads.filter((l) => l.status === 'new').length,
      contacted: leads.filter((l) => l.status === 'contacted').length,
      converted: leads.filter((l) => l.status === 'converted').length,
      lost: leads.filter((l) => l.status === 'lost').length,
    };
  }, [leads]);

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {notification && (
        <div className={`p-4 rounded-2xl flex items-center justify-between shadow-lg text-xs font-bold animate-in fade-in duration-200 ${
          notification.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
        }`}>
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-white/80 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Leads &amp; Automated Proposals
            </h2>
            <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#FF5733]/15 text-[#FF5733] border border-[#FF5733]/30">
              Live Pipeline
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Real-time B2B FinTech partner requests, requirement analysis, and personalized proposal delivery.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadData}
            title="Refresh"
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors bg-white shadow-sm"
          >
            <RotateCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-sm"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5733] to-[#E03E1D] text-white text-xs font-bold shadow-md shadow-[#FF5733]/20 hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Inbound Lead</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { key: 'all', label: 'All Inquiries', count: statusCounts.all },
          { key: 'new', label: 'New', count: statusCounts.new, color: 'text-amber-600 bg-amber-50' },
          { key: 'contacted', label: 'In Discussion', count: statusCounts.contacted, color: 'text-blue-600 bg-blue-50' },
          { key: 'converted', label: 'Converted Partners', count: statusCounts.converted, color: 'text-emerald-600 bg-emerald-50' },
          { key: 'lost', label: 'Lost', count: statusCounts.lost, color: 'text-slate-500 bg-slate-100' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              statusFilter === tab.key
                ? 'bg-[#0A1931] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                statusFilter === tab.key ? 'bg-white/20 text-white' : tab.color || 'bg-slate-200 text-slate-700'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search & Model Filters */}
      {/* Search & Comprehensive Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
        {/* Row 1: Search & Core Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
          <div className="sm:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by Proposal ID, Name, Company, Email, Phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#FF5733]/20 focus:border-[#FF5733] transition-all"
            />
          </div>

          <div>
            <select
              value={partnershipModelFilter}
              onChange={(e) => setPartnershipModelFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#FF5733]/20"
            >
              <option value="all">All Partnership Models</option>
              <option value="White-Label B2B Portal & App">White-Label B2B Portal &amp; App</option>
              <option value="Master Distributor Model">Master Distributor Model</option>
              <option value="Enterprise REST APIs">Enterprise REST APIs</option>
              <option value="Hardware Micro ATM Distribution">Hardware Micro ATM Distribution</option>
            </select>
          </div>

          <div>
            <select
              value={retailNetworkFilter}
              onChange={(e) => setRetailNetworkFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#FF5733]/20"
            >
              <option value="all">All Retail Networks</option>
              <option value="Starting New (1–10 Retailers)">Starting New (1–10)</option>
              <option value="10–50 Retailers">10–50 Retailers</option>
              <option value="50–200 Retailers">50–200 Retailers</option>
              <option value="200–1,000+ Retailers">200–1,000+ Retailers</option>
              <option value="Enterprise Bank Switch">Enterprise Bank Switch</option>
            </select>
          </div>
        </div>

        {/* Row 2: Secondary Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 border-t border-slate-100">
          <div>
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#FF5733]/20"
            >
              <option value="all">All FinTech Services</option>
              {allServices.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={proposalStatusFilter}
              onChange={(e) => setProposalStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#FF5733]/20"
            >
              <option value="all">All Proposal Statuses</option>
              <option value="generated">Generated</option>
              <option value="sent">Sent to Client</option>
              <option value="generating">Generating</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <div>
            <select
              value={emailStatusFilter}
              onChange={(e) => setEmailStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#FF5733]/20"
            >
              <option value="all">All Email Statuses</option>
              <option value="sent">Sent</option>
              <option value="failed">Delivery Failed</option>
              <option value="pending">Pending Dispatch</option>
            </select>
          </div>

          <div>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#FF5733]/20"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="week">Past 7 Days</option>
              <option value="month">Past 30 Days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-[10.5px] font-black uppercase text-slate-500 tracking-wider">
                <th className="py-3.5 px-4">Client</th>
                <th className="py-3.5 px-4">Company</th>
                <th className="py-3.5 px-4">Model</th>
                <th className="py-3.5 px-4">Network</th>
                <th className="py-3.5 px-4">Services</th>
                <th className="py-3.5 px-4">Proposal</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="font-bold text-sm text-slate-600">No matching inquiries found</p>
                    <p className="text-xs text-slate-400 mt-0.5">Try clearing filters or search terms.</p>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const rawPhone = lead.phone.replace(/[^0-9]/g, '');
                  const proposalId = lead.proposalId || 'FIN-2026-PENDING';
                  const isResending = actionLoading === `resend-${lead.id}`;
                  const createdDate = new Date(lead.createdAt as any);
                  const formattedDate = !isNaN(createdDate.getTime()) 
                    ? createdDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                    : 'Recent';

                  return (
                    <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* 1. Client */}
                      <td className="py-3.5 px-4">
                        <div className="font-extrabold text-slate-900 text-xs">{lead.name}</div>
                        <div className="text-[11px] text-slate-500 font-medium">{lead.email}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <a href={`tel:${lead.phone}`} className="text-slate-600 hover:text-[#FF5733] font-semibold text-[11px] flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            <span>{lead.phone}</span>
                          </a>
                          <a
                            href={`https://wa.me/${rawPhone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-700 font-bold text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 hover:bg-emerald-100"
                          >
                            WA
                          </a>
                        </div>
                      </td>

                      {/* 2. Company */}
                      <td className="py-3.5 px-4">
                        <div className="font-extrabold text-slate-800 flex items-center gap-1.5 text-xs">
                          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate max-w-[130px]">{lead.companyName || 'Not Specified'}</span>
                        </div>
                      </td>

                      {/* 3. Model */}
                      <td className="py-3.5 px-4">
                        <span className="text-[11px] font-bold text-slate-800 block max-w-[140px] leading-tight">
                          {lead.businessType}
                        </span>
                      </td>

                      {/* 4. Network */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200/70">
                          {lead.estimatedRetailers}
                        </span>
                      </td>

                      {/* 5. Services */}
                      <td className="py-3.5 px-4 max-w-[160px]">
                        <div className="flex flex-wrap gap-1">
                          {(lead.selectedServices || []).slice(0, 2).map((s) => (
                            <span
                              key={s}
                              className="text-[9.5px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 truncate max-w-[120px]"
                            >
                              {s}
                            </span>
                          ))}
                          {(lead.selectedServices || []).length > 2 && (
                            <span className="text-[9.5px] text-[#FF5733] font-bold px-1 py-0.5">
                              +{(lead.selectedServices || []).length - 2} more
                            </span>
                          )}
                        </div>
                      </td>

                      {/* 6. Proposal */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <Link
                          href={`/proposals/${proposalId}`}
                          target="_blank"
                          className="font-mono text-[11px] font-black text-[#FF5733] hover:underline flex items-center gap-1"
                        >
                          <span>{proposalId}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </Link>
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded block w-fit mt-0.5 font-mono ${
                          lead.proposalStatus === 'sent'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200/60'
                            : lead.proposalStatus === 'failed'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200/60'
                            : lead.proposalStatus === 'generating'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200/60'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                        }`}>
                          {lead.proposalStatus || 'generated'}
                        </span>
                      </td>

                      {/* 7. Email */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full shrink-0 ${
                            lead.emailStatus === 'sent' ? 'bg-emerald-500' : lead.emailStatus === 'failed' ? 'bg-red-500' : 'bg-amber-400'
                          }`} />
                          <span className={`text-[11px] font-bold ${
                            lead.emailStatus === 'sent' ? 'text-emerald-700' : lead.emailStatus === 'failed' ? 'text-red-600' : 'text-amber-700'
                          }`}>
                            {lead.emailStatus === 'sent' ? 'Sent' : lead.emailStatus === 'failed' ? 'Failed' : 'Pending'}
                          </span>
                        </div>
                      </td>

                      {/* 8. Date */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 text-[11px] font-medium">
                        {formattedDate}
                      </td>

                      {/* 9. Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          {/* Preview */}
                          <button
                            onClick={() => openProposalPreview(lead)}
                            title="Preview Generated Proposal"
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors inline-flex items-center gap-1 text-[11px]"
                          >
                            <FileText className="w-3.5 h-3.5 text-[#FF5733]" />
                            <span className="hidden sm:inline">Preview</span>
                          </button>

                          {/* Direct PDF Download */}
                          <a
                            href={`/api/proposals/${proposalId}/pdf`}
                            download
                            title="Download Official Proposal PDF"
                            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors inline-flex items-center gap-1 text-[11px] font-semibold"
                          >
                            <Download className="w-3.5 h-3.5 text-slate-600" />
                            <span className="hidden sm:inline">PDF</span>
                          </a>

                          {/* Edit Proposal & Custom Pricing */}
                          <button
                            onClick={() => handleOpenEditProposal(lead)}
                            title="Edit Proposal & Custom Pricing"
                            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors inline-flex items-center gap-1 text-[11px] font-semibold"
                          >
                            <Sliders className="w-3.5 h-3.5 text-indigo-600" />
                            <span className="hidden sm:inline">Pricing</span>
                          </button>

                          {/* Regenerate Proposal */}
                          <button
                            onClick={() => handleRegenerateProposal(lead)}
                            disabled={actionLoading === `regen-${lead.id}`}
                            title="Regenerate Proposal"
                            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors inline-flex items-center gap-1 text-[11px] font-semibold disabled:opacity-50"
                          >
                            <RefreshCw className={`w-3.5 h-3.5 text-orange-600 ${actionLoading === `regen-${lead.id}` ? 'animate-spin' : ''}`} />
                            <span className="hidden sm:inline">Regen</span>
                          </button>

                          {/* Resend / Retry Email */}
                          <button
                            onClick={() => handleResendEmail(lead)}
                            disabled={isResending}
                            title="Retry sending proposal to client's email"
                            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors inline-flex items-center gap-1 text-[11px] font-semibold disabled:opacity-50"
                          >
                            <Send className={`w-3 h-3 text-blue-600 ${isResending ? 'animate-spin' : ''}`} />
                            <span className="hidden sm:inline">Retry</span>
                          </button>

                          {/* Details Drawer */}
                          <button
                            onClick={() => handleOpenDetails(lead)}
                            className="px-2.5 py-1.5 rounded-lg bg-[#07172F] hover:bg-slate-800 text-white font-bold text-[11px] transition-colors"
                          >
                            Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PROPOSAL PREVIEW MODAL */}
      {activeProposalPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-y-auto max-h-[92vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 shrink-0">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-black text-[#FF5733] bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                    {activeProposalPreview.proposalId}
                  </span>
                  <span className="text-xs text-slate-400">&bull;</span>
                  <span className="text-xs font-bold text-slate-600">
                    {activeProposalPreview.client.companyName}
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  Personalized FinTech Infrastructure Proposal
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/proposals/${activeProposalPreview.proposalId}`}
                  target="_blank"
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold inline-flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print View</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>

                <button
                  onClick={() => setActiveProposalPreview(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Proposal Content Scroll */}
            <div className="py-6 space-y-6 text-xs flex-1 overflow-y-auto pr-1">
              {/* Executive Summary */}
              <div>
                <span className="text-[10px] font-black uppercase text-[#FF5733] tracking-wider block mb-1">
                  Executive Overview
                </span>
                <p className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed">
                  {activeProposalPreview.executiveSummary}
                </p>
              </div>

              {/* Client Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Model</span>
                  <p className="font-bold text-slate-900 mt-0.5 truncate">{activeProposalPreview.requirements.partnershipModel}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Network</span>
                  <p className="font-bold text-slate-900 mt-0.5 truncate">{activeProposalPreview.requirements.retailNetwork}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Services</span>
                  <p className="font-bold text-slate-900 mt-0.5">{activeProposalPreview.requirements.selectedServices.length} Activated</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Recipient</span>
                  <p className="font-bold text-slate-900 mt-0.5 truncate">{activeProposalPreview.client.fullName}</p>
                </div>
              </div>

              {/* Recommended Solution Modules */}
              <div>
                <span className="text-[10px] font-black uppercase text-slate-900 tracking-wider block mb-2">
                  Recommended Architecture Modules ({activeProposalPreview.recommendedSolution.length})
                </span>
                <div className="space-y-3">
                  {activeProposalPreview.recommendedSolution.map((mod, i) => (
                    <div key={i} className="p-4 rounded-xl border border-slate-200 bg-white">
                      <h4 className="font-extrabold text-slate-900 text-sm mb-1">{mod.module}</h4>
                      <p className="text-slate-600 mb-2">{mod.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {mod.features.map((f, fi) => (
                          <div key={fi} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selected Services Breakdown */}
              <div>
                <span className="text-[10px] font-black uppercase text-slate-900 tracking-wider block mb-2">
                  Service Specifications ({activeProposalPreview.selectedServicesDetails.length})
                </span>
                <div className="space-y-2">
                  {activeProposalPreview.selectedServicesDetails.map((srv, i) => (
                    <div key={i} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <p className="font-bold text-slate-900">{srv.service}</p>
                        <p className="text-[11px] text-slate-500">{srv.description}</p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                        Institutional Switch
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between shrink-0">
              <div className="text-xs text-slate-500">
                Prepared on {activeProposalPreview.generatedAt}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveProposalPreview(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-100"
                >
                  Close
                </button>
                <Link
                  href={`/proposals/${activeProposalPreview.proposalId}`}
                  target="_blank"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#FF5733] to-[#E03E1D] text-white font-bold shadow-md inline-flex items-center gap-1.5"
                >
                  <span>Open Full PDF Document</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* LEAD DETAILS DRAWER MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="font-mono text-[10px] font-bold text-[#FF5733] bg-[#FF5733]/10 px-2 py-0.5 rounded-full">
                  {selectedLead.proposalId || 'Ref: Inbound'}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  {selectedLead.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-2xl">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Phone (WhatsApp)</span>
                  <p className="font-extrabold text-slate-800 text-sm mt-0.5">{selectedLead.phone}</p>
                  <div className="flex gap-2 mt-2">
                    <a
                      href={`tel:${selectedLead.phone}`}
                      className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 inline-flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" /> Call
                    </a>
                    <a
                      href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 inline-flex items-center gap-1"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Business Email</span>
                  <p className="font-extrabold text-slate-800 text-sm mt-0.5 truncate">{selectedLead.email}</p>
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="mt-2 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 inline-flex items-center gap-1"
                  >
                    <Mail className="w-3 h-3" /> Send Email
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-2xl">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Company / Brand</span>
                  <p className="font-bold text-slate-800 text-sm mt-0.5">{selectedLead.companyName || 'Not Specified'}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Partnership Model</span>
                  <p className="font-bold text-slate-800 text-sm mt-0.5">{selectedLead.businessType}</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Estimated Network</span>
                <p className="font-bold text-slate-800 text-sm mt-0.5">{selectedLead.estimatedRetailers}</p>
              </div>

              {selectedLead.additionalRequirements && (
                <div className="p-3 bg-orange-50/60 border border-orange-200/80 rounded-2xl">
                  <span className="text-[#FF5733] font-bold uppercase text-[10px]">Additional Requirements:</span>
                  <p className="text-slate-800 mt-0.5 leading-relaxed">{selectedLead.additionalRequirements}</p>
                </div>
              )}

              {/* Internal Notes Section */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-xs">Internal Notes &amp; Follow-up Comments</span>
                  <button
                    type="button"
                    onClick={handleSaveNotes}
                    disabled={savingNotes}
                    className="px-2.5 py-1 bg-[#07172F] hover:bg-slate-800 text-white font-bold rounded-lg text-[10px] transition-all disabled:opacity-50"
                  >
                    {savingNotes ? 'Saving...' : 'Save Notes'}
                  </button>
                </div>
                <textarea
                  rows={2}
                  placeholder="Record call updates, pricing agreements, or custom switch requirements..."
                  value={drawerNotes}
                  onChange={(e) => setDrawerNotes(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200 bg-white text-slate-800 text-xs focus:ring-2 focus:ring-[#FF5733]/20 focus:border-[#FF5733] outline-none resize-none font-medium"
                />
              </div>

              {/* Pipeline Status */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="font-bold text-slate-700 text-xs">Lead Pipeline Status:</span>
                <select
                  value={selectedLead.status}
                  onChange={(e) => handleStatusChange(selectedLead.id!, e.target.value as LeadStatus)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 font-bold text-xs bg-white"
                >
                  <option value="new">New Lead</option>
                  <option value="contacted">In Discussion</option>
                  <option value="converted">Converted Partner</option>
                  <option value="lost">Lost Inquiry</option>
                </select>
              </div>

              {/* Proposal Status */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="font-bold text-slate-700 text-xs">Proposal Status:</span>
                <select
                  value={selectedLead.proposalStatus || 'generated'}
                  onChange={(e) => handleProposalStatusChange(selectedLead.id!, e.target.value as ProposalStatus)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 font-bold text-xs bg-white"
                >
                  <option value="generated">Generated</option>
                  <option value="sent">Sent</option>
                  <option value="failed">Failed</option>
                  <option value="generating">Generating</option>
                </select>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => {
                    const lead = selectedLead;
                    setSelectedLead(null);
                    openProposalPreview(lead);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-orange-50 text-[#FF5733] font-bold text-xs hover:bg-orange-100 inline-flex items-center gap-1 border border-orange-200/80"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>

                <a
                  href={`/api/proposals/${selectedLead.proposalId}/pdf`}
                  download
                  className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs hover:bg-slate-200 inline-flex items-center gap-1 border border-slate-200"
                >
                  <Download className="w-3.5 h-3.5 text-[#FF5733]" />
                  <span>Download PDF</span>
                </a>

                <button
                  onClick={() => {
                    const lead = selectedLead;
                    setSelectedLead(null);
                    handleOpenEditProposal(lead);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-xs hover:bg-indigo-100 inline-flex items-center gap-1 border border-indigo-200"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Edit Pricing</span>
                </button>

                <button
                  onClick={() => handleRegenerateProposal(selectedLead)}
                  disabled={actionLoading === `regen-${selectedLead.id}`}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs inline-flex items-center gap-1 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-orange-600 ${actionLoading === `regen-${selectedLead.id}` ? 'animate-spin' : ''}`} />
                  <span>Regen</span>
                </button>

                <button
                  onClick={() => handleResendEmail(selectedLead)}
                  disabled={actionLoading === `resend-${selectedLead.id}`}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs inline-flex items-center gap-1 disabled:opacity-50"
                >
                  <Send className="w-3 h-3 text-blue-600" />
                  <span>Retry Email</span>
                </button>
              </div>

              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD LEAD MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5733] bg-[#FF5733]/10 px-2 py-0.5 rounded-full">
                  Admin Entry
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  Add Partner Inquiry
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddLead} className="py-4 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Name"
                    value={newLeadForm.name}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-800 text-xs focus:ring-2 focus:ring-[#FF5733]/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mobile (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-800 text-xs focus:ring-2 focus:ring-[#FF5733]/20 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Business Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="partner@domain.com"
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-800 text-xs focus:ring-2 focus:ring-[#FF5733]/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Company / Brand</label>
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={newLeadForm.companyName}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, companyName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-800 text-xs focus:ring-2 focus:ring-[#FF5733]/20 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Partnership Model</label>
                  <select
                    value={newLeadForm.businessType}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, businessType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs"
                  >
                    <option value="White-Label B2B Portal & App">White-Label B2B Portal &amp; App</option>
                    <option value="Master Distributor Model">Master Distributor Model</option>
                    <option value="Enterprise REST APIs">Enterprise REST APIs</option>
                    <option value="Hardware Micro ATM Distribution">Hardware Micro ATM Distribution</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Retail Network</label>
                  <select
                    value={newLeadForm.estimatedRetailers}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, estimatedRetailers: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs"
                  >
                    <option value="Starting New (1–10 Retailers)">Starting New (1–10 Retailers)</option>
                    <option value="10–50 Retailers">10–50 Retailers</option>
                    <option value="50–200 Retailers">50–200 Retailers</option>
                    <option value="200–1,000+ Retailers">200–1,000+ Retailers</option>
                    <option value="Enterprise Bank Switch">Enterprise Bank Switch</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#FF5733] to-[#E03E1D] text-white font-bold shadow-md"
                >
                  Save Lead &amp; Generate Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PROPOSAL & CUSTOM PRICING MODAL */}
      {editingProposalLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 relative overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                  Proposal Customizer
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  Edit Proposal &amp; Custom Pricing
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {editingProposalLead.companyName || editingProposalLead.name} &bull; Ref: {editingProposalLead.proposalId || 'Pending'}
                </p>
              </div>
              <button
                onClick={() => setEditingProposalLead(null)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProposalEdits} className="mt-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Proposal Status
                  </label>
                  <select
                    value={proposalEditForm.proposalStatus}
                    onChange={(e) => setProposalEditForm({ ...proposalEditForm, proposalStatus: e.target.value as ProposalStatus })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-xs focus:ring-2 focus:ring-[#FF5733]/20 focus:border-[#FF5733] outline-none"
                  >
                    <option value="generated">Generated</option>
                    <option value="sent">Sent to Client</option>
                    <option value="failed">Failed / Bounced</option>
                    <option value="generating">Generating</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Platform Setup Fee
                  </label>
                  <input
                    type="text"
                    value={proposalEditForm.setupFee}
                    onChange={(e) => setProposalEditForm({ ...proposalEditForm, setupFee: e.target.value })}
                    placeholder="e.g. ₹49,999 + GST (One-time)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#FF5733]/20 focus:border-[#FF5733] outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Monthly Platform Fee / AMC
                  </label>
                  <input
                    type="text"
                    value={proposalEditForm.monthlyFee}
                    onChange={(e) => setProposalEditForm({ ...proposalEditForm, monthlyFee: e.target.value })}
                    placeholder="e.g. ₹4,999/month (Cloud & switch maintenance)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#FF5733]/20 focus:border-[#FF5733] outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    API Charges
                  </label>
                  <input
                    type="text"
                    value={proposalEditForm.apiCharges}
                    onChange={(e) => setProposalEditForm({ ...proposalEditForm, apiCharges: e.target.value })}
                    placeholder="e.g. Included in enterprise package"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#FF5733]/20 focus:border-[#FF5733] outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Transaction Charges / MDR
                  </label>
                  <input
                    type="text"
                    value={proposalEditForm.transactionCharges}
                    onChange={(e) => setProposalEditForm({ ...proposalEditForm, transactionCharges: e.target.value })}
                    placeholder="e.g. Zero debit MDR for AePS/MATM; standard DMT slabs"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#FF5733]/20 focus:border-[#FF5733] outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Hardware / Device Charges
                  </label>
                  <input
                    type="text"
                    value={proposalEditForm.hardwareCharges}
                    onChange={(e) => setProposalEditForm({ ...proposalEditForm, hardwareCharges: e.target.value })}
                    placeholder="e.g. ₹1,850 per Bluetooth mPOS device"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#FF5733]/20 focus:border-[#FF5733] outline-none font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Custom Commercial Terms Note
                </label>
                <textarea
                  rows={2}
                  value={proposalEditForm.note}
                  onChange={(e) => setProposalEditForm({ ...proposalEditForm, note: e.target.value })}
                  placeholder="Special discounts, custom volume incentives, or payment milestone terms..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#FF5733]/20 focus:border-[#FF5733] outline-none font-medium resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Personalized Executive Summary
                </label>
                <textarea
                  rows={3}
                  value={proposalEditForm.executiveSummary}
                  onChange={(e) => setProposalEditForm({ ...proposalEditForm, executiveSummary: e.target.value })}
                  placeholder="Tailored introductory pitch highlighting partner strengths..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#FF5733]/20 focus:border-[#FF5733] outline-none font-medium resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProposalLead(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-100 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading === `save-proposal-${editingProposalLead.id}`}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#FF5733] to-[#E03E1D] text-white font-bold shadow-md hover:shadow-lg text-xs transition-all disabled:opacity-50"
                >
                  {actionLoading === `save-proposal-${editingProposalLead.id}` ? 'Saving...' : 'Save & Update Proposal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
