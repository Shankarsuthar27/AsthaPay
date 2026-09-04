'use client';

import React from 'react';
import { Menu, Bell, User, PlusCircle } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import Link from 'next/link';

interface AdminNavbarProps {
  onToggleSidebar: () => void;
  title?: string;
  subtitle?: string;
  onOpenAddLeadModal?: () => void;
}

export const AdminNavbar: React.FC<AdminNavbarProps> = ({
  onToggleSidebar,
  title = 'AsthaPay Control Portal',
  subtitle,
  onOpenAddLeadModal,
}) => {
  const { adminUser } = useAuth();

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between transition-all">
      {/* Left section: Mobile menu + Page Title */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              {title}
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Sync
            </span>
          </div>
          {subtitle && (
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right section: Action Buttons + User Pill */}
      <div className="flex items-center gap-3">
        {onOpenAddLeadModal ? (
          <button
            onClick={onOpenAddLeadModal}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FF5733] to-[#E03E1D] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#FF5733]/20 hover:shadow-lg hover:shadow-[#FF5733]/30 hover:opacity-95 active:scale-98 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Add Lead Manually</span>
            <span className="sm:hidden">Add Lead</span>
          </button>
        ) : (
          <Link
            href="/admin/leads"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FF5733] to-[#E03E1D] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#FF5733]/20 hover:shadow-lg hover:shadow-[#FF5733]/30 hover:opacity-95 active:scale-98 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Add Lead</span>
          </Link>
        )}

        {/* Notifications Mock */}
        <div className="relative">
          <button 
            title="Notifications"
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF5733]"></span>
          </button>
        </div>

        {/* User Pill */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-[#0A1931] text-white flex items-center justify-center font-bold text-xs shadow-sm">
            {adminUser?.displayName?.charAt(0).toUpperCase() || <User className="w-4 h-4" />}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-bold text-slate-800 leading-tight">
              {adminUser?.displayName || 'Admin'}
            </p>
            <p className="text-[10px] text-slate-400 leading-tight">
              {adminUser?.email || 'admin@asthapay.com'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
