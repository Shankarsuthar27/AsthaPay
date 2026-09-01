import React from 'react';
import { ShieldCheck, Award, CheckCircle2, TrendingUp, Users, Building2 } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const metrics = [
    {
      icon: Users,
      value: '50,000+',
      label: 'Active Retail Touchpoints',
      sub: 'Pan-India Distribution'
    },
    {
      icon: TrendingUp,
      value: '₹5,000+ Cr',
      label: 'Monthly GTV Processed',
      sub: 'High Volume Rails'
    },
    {
      icon: ShieldCheck,
      value: '99.99%',
      label: 'Switch Uptime SLA',
      sub: 'Multi-Bank Redundancy'
    },
    {
      icon: Building2,
      value: '1,200+',
      label: 'FinTech Enterprises',
      sub: 'White-Label Partners'
    }
  ];

  const certifications = [
    { name: 'NPCI Registered', tag: 'Turnkey Switch' },
    { name: 'BBPS Central Unit', tag: 'Direct TSP' },
    { name: 'PCI-DSS Level 1', tag: 'Certified' },
    { name: 'ISO 27001:2013', tag: 'Security Standard' },
    { name: '100% RBI Compliant', tag: '194N & KYC Ready' }
  ];

  return (
    <div className="border-y border-slate-200/80 bg-white/70 backdrop-blur-md py-6 sm:py-7">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges Strip */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mb-6 text-[11px] font-semibold text-slate-700">
          <span className="text-slate-600 uppercase tracking-wider text-[10px] font-bold">
            Trusted & Compliant With:
          </span>
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100/90 border border-slate-200/80 text-slate-800 shadow-2xs hover:border-brand-coral/40 transition-colors"
            >
              <CheckCircle2 className="w-3 h-3 text-brand-coral" />
              <span>{cert.name}</span>
              <span className="text-[9.5px] text-slate-600 font-normal">({cert.tag})</span>
            </div>
          ))}
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 lg:gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className={`flex flex-col items-center text-center ${idx > 0 ? 'pt-3 md:pt-0' : ''}`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <div className="w-6 h-6 rounded-md bg-brand-coral/10 text-brand-coral flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl sm:text-2xl font-black text-brand-navy tracking-tight">
                    {m.value}
                  </span>
                </div>
                <div className="text-[11.5px] sm:text-xs font-bold text-slate-800">{m.label}</div>
                <div className="text-[10px] text-slate-600">{m.sub}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
