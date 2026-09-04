'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  ExternalLink, 
  LogOut, 
  ShieldCheck,
  Zap,
  ChevronRight,
  X
} from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { adminUser, logout } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Leads & Inquiries', href: '/admin/leads', icon: Users, badge: 'Live' },
    { name: 'Proposals & Slabs', href: '/admin/proposals', icon: FileText },
    { name: 'System Settings', href: '/admin/settings', icon: Settings },
  ];

  const isActive = (item: typeof navigation[0]) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#07172F] text-slate-300 flex flex-col border-r border-slate-800/80 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Header / Brand */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800/80 bg-[#051124]">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF5733] to-[#FF8A65] flex items-center justify-center text-white font-black text-xl shadow-lg shadow-[#FF5733]/25 group-hover:scale-105 transition-transform">
              A
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-lg tracking-tight">Astha<span className="text-[#FF5733]">Pay</span></span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#FF5733]/20 text-[#FF5733] border border-[#FF5733]/30">
                  Admin
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">B2B FinTech Console</p>
            </div>
          </Link>

          {onClose && (
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* System Status Pill */}
        <div className="px-5 py-3 border-b border-slate-800/50 bg-[#06142a]/60">
          <div className="flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1.5 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Switch Status
            </span>
            <span className="text-emerald-400 font-semibold text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              Operational
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
            Operations
          </div>
          {navigation.map((item) => {
            const active = isActive(item);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`group flex items-center justify-between px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-150 ${
                  active
                    ? 'bg-gradient-to-r from-[#FF5733] to-[#E03E1D] text-white shadow-md shadow-[#FF5733]/20 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${active ? 'text-white' : 'text-slate-400 group-hover:text-[#FF5733]'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    active ? 'bg-white/25 text-white' : 'bg-[#FF5733]/20 text-[#FF5733]'
                  }`}>
                    {item.badge}
                  </span>
                )}
                {!item.badge && active && (
                  <ChevronRight className="w-4 h-4 text-white/80" />
                )}
              </Link>
            );
          })}

          <div className="pt-6">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
              Website
            </div>
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 text-sm font-medium transition-colors"
            >
              <div className="flex items-center gap-3">
                <ExternalLink className="w-4 h-4 text-slate-400" />
                <span>View Live Website</span>
              </div>
              <span className="text-[10px] text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">New tab</span>
            </Link>
          </div>
        </div>

        {/* Quick Platform Info Card */}
        <div className="p-4 mx-4 mb-3 rounded-xl bg-gradient-to-br from-[#0c2347] to-[#0a1b38] border border-slate-700/60">
          <div className="flex items-center gap-2 text-white font-semibold text-xs mb-1">
            <Zap className="w-3.5 h-3.5 text-[#FF5733]" />
            <span>Switch Commission Engine</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            All partner lead requests auto-generate B2B commercial slab proposals.
          </p>
        </div>

        {/* User Footer Card */}
        <div className="p-4 border-t border-slate-800/80 bg-[#051124]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white text-sm shrink-0 border border-slate-600">
                {adminUser?.displayName?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">
                  {adminUser?.displayName || 'Admin'}
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  {adminUser?.email || 'admin@asthapay.com'}
                </p>
              </div>
            </div>
            <button
              onClick={() => logout()}
              title="Logout from Admin Panel"
              className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
