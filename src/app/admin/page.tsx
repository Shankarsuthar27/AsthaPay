'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  UserCheck, 
  Sparkles, 
  ArrowUpRight, 
  Clock, 
  Phone, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Building2, 
  FileSpreadsheet, 
  ChevronRight,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { Lead, LeadStatus } from '@/types/admin';
import { fetchAllLeads, updateLeadStatus } from '@/lib/leadsService';

export default function AdminDashboardPage() {
  const { adminUser } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    try {
      await updateLeadStatus(leadId, newStatus);
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
      );
    } catch (err) {
      console.error('Status change error:', err);
    }
  };

  // Metrics Calculations
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'new').length;
  const contactedLeads = leads.filter((l) => l.status === 'contacted').length;
  const convertedLeads = leads.filter((l) => l.status === 'converted').length;
  const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

  // Services distribution
  const serviceCounts: { [key: string]: number } = {};
  leads.forEach((lead) => {
    (lead.selectedServices || []).forEach((service) => {
      serviceCounts[service] = (serviceCounts[service] || 0) + 1;
    });
  });

  const sortedServices = Object.entries(serviceCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const recentLeads = leads.slice(0, 5);

  const statusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'new':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            New Lead
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-600 border border-blue-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Contacted
          </span>
        );
      case 'converted':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Converted
          </span>
        );
      case 'lost':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-500/10 text-slate-500 border border-slate-500/20">
            Lost
          </span>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-[#07172F] via-[#0A1931] to-[#0E284F] p-6 sm:p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute right-0 top-0 w-80 h-full bg-[#FF5733]/15 blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-medium mb-3 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5733]" />
            <span>AsthaPay Switch Master Console</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Welcome back, {adminUser?.displayName || 'Admin'}
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Real-time pipeline overview of turnkey B2B White-Label &amp; API partner inquiries.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={loadData}
            title="Refresh Data"
            className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-colors"
          >
            <RotateCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <Link
            href="/admin/leads"
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#FF5733] to-[#E03E1D] hover:from-[#ff6b4a] hover:to-[#eb4724] text-white font-bold text-sm shadow-lg shadow-[#FF5733]/30 transition-all flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            <span>Manage All Leads ({totalLeads})</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Inquiries */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Leads</span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalLeads}</div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1">
            <span className="text-emerald-600 font-bold flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +18%
            </span>
            <span>from website form</span>
          </div>
        </div>

        {/* New Leads */}
        <div className="bg-white p-5 rounded-2xl border border-amber-200/80 bg-amber-50/20 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-amber-700 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">New / Uncontacted</span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-700">{newLeads}</div>
          <div className="text-[11px] text-amber-600/80 mt-1 font-medium">
            Requires immediate response
          </div>
        </div>

        {/* In Discussion */}
        <div className="bg-white p-5 rounded-2xl border border-blue-200/80 bg-blue-50/20 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-blue-700 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">In Discussion</span>
            <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">
              <Phone className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-blue-700">{contactedLeads}</div>
          <div className="text-[11px] text-blue-600/80 mt-1 font-medium">
            Proposal sent / demo given
          </div>
        </div>

        {/* Converted */}
        <div className="bg-white p-5 rounded-2xl border border-emerald-200/80 bg-emerald-50/20 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-emerald-700 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Converted</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-700">{convertedLeads}</div>
          <div className="text-[11px] text-emerald-600/80 mt-1 font-medium">
            Onboarded B2B partners
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-white p-5 rounded-2xl border border-purple-200/80 bg-purple-50/20 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-purple-700 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Conversion</span>
            <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-purple-700">{conversionRate}%</div>
          <div className="text-[11px] text-purple-600/80 mt-1 font-medium">
            Lead to partner ratio
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Inquiries + Service Demand Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Inquiries (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Recent Inquiries</h3>
              <p className="text-xs text-slate-500">Live requests from the website &amp; demo schedule form</p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-bold text-[#FF5733] hover:text-[#E03E1D] flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100 flex-1 overflow-x-auto">
            {recentLeads.length === 0 ? (
              <div className="p-12 text-center text-slate-400">
                <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm font-semibold">No leads yet</p>
              </div>
            ) : (
              recentLeads.map((lead) => (
                <div key={lead.id} className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-slate-900 text-sm truncate">
                        {lead.name}
                      </span>
                      {lead.proposalId && (
                        <Link
                          href={`/proposals/${lead.proposalId}`}
                          target="_blank"
                          className="font-mono text-[10px] font-extrabold text-[#FF5733] bg-orange-50 px-2 py-0.5 rounded border border-orange-200 hover:underline"
                        >
                          {lead.proposalId}
                        </Link>
                      )}
                      {statusBadge(lead.status)}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-medium text-slate-700">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        {lead.companyName || 'Individual Partner'}
                      </span>
                      <span>&bull;</span>
                      <span className="text-slate-600">{lead.phone}</span>
                      {lead.emailStatus === 'sent' && (
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">
                          Proposal Sent
                        </span>
                      )}
                    </div>
                    {lead.selectedServices && lead.selectedServices.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {lead.selectedServices.slice(0, 3).map((s) => (
                          <span
                            key={s}
                            className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md"
                          >
                            {s}
                          </span>
                        ))}
                        {lead.selectedServices.length > 3 && (
                          <span className="text-[10px] text-slate-400 px-1 font-medium">
                            +{lead.selectedServices.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-3 shrink-0">
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id!, e.target.value as LeadStatus)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#FF5733]/20"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                      <option value="lost">Lost</option>
                    </select>
                    <Link
                      href={`/admin/leads?id=${lead.id}`}
                      className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                      title="Open in Leads Manager"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
            <Link
              href="/admin/leads"
              className="text-xs font-bold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1.5"
            >
              <span>Go to Full Lead Management &amp; Export</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column: Most In-Demand Services + Quick Proposals Card */}
        <div className="space-y-6">
          
          {/* Top Services Inquiries */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Top Requested Services</h3>
                <p className="text-xs text-slate-500">Based on incoming leads</p>
              </div>
              <Sparkles className="w-4 h-4 text-[#FF5733]" />
            </div>

            <div className="space-y-3.5">
              {sortedServices.length === 0 ? (
                <p className="text-xs text-slate-400">No service metrics yet.</p>
              ) : (
                sortedServices.map(([service, count]) => {
                  const percentage = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0;
                  return (
                    <div key={service} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-slate-700">{service}</span>
                        <span className="text-slate-500">{count} inquiries ({percentage}%)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#FF5733] to-[#FF8A65] rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Proposal Generator Quick Callout */}
          <div className="bg-gradient-to-br from-[#0c2347] to-[#0A1931] p-6 rounded-3xl text-white shadow-lg border border-slate-700/60 relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FF5733]/20 text-[#FF5733] border border-[#FF5733]/30">
                Partner Onboarding
              </span>
              <h4 className="text-lg font-black mt-2 text-white">Generate B2B Proposal</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Configure commercial commission slabs, customize terms, and print instant brand proposals.
              </p>
              <Link
                href="/admin/proposals"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#0A1931] font-bold text-xs hover:bg-slate-100 transition-colors shadow-sm"
              >
                <span>Open Proposal Generator</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Switch Switch Uptime Status */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-sm border border-emerald-500/20">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Multi-Bank NPCI Switches</p>
                <p className="text-[11px] text-slate-500">ICICI, Kotak, Fino switches live</p>
              </div>
            </div>
            <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              99.98%
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
