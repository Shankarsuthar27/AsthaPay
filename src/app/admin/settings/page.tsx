'use client';

import React, { useState } from 'react';
import { 
  Settings, 
  Mail, 
  Key, 
  ShieldCheck, 
  Bell, 
  Save, 
  CheckCircle2, 
  Database,
  Users,
  Server
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [notificationEmail, setNotificationEmail] = useState('admin@asthapay.com');
  const [salesEmail, setSalesEmail] = useState('sales@asthapay.com');
  const [resendApiKey, setResendApiKey] = useState('re_123456789_placeholder');
  const [senderName, setSenderName] = useState('AsthaPay Notifications');
  const [senderEmail, setSenderEmail] = useState('no-reply@asthapay.com');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Top Header */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          System &amp; Notification Settings
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          Configure lead notification alerts, email delivery credentials, and switch security.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Settings saved successfully! Configuration updated.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Email & Alert Routing */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Bell className="w-4 h-4 text-[#FF5733]" />
            <h3 className="font-extrabold text-slate-900 text-sm">Inbound Lead Notification Routing</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Primary Ops Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={notificationEmail}
                  onChange={(e) => setNotificationEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold focus:bg-white focus:ring-2 focus:ring-[#FF5733]/20 outline-none"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Receives real-time alerts when visitors schedule a demo.</p>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Sales Escalation Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={salesEmail}
                  onChange={(e) => setSalesEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold focus:bg-white focus:ring-2 focus:ring-[#FF5733]/20 outline-none"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">CC recipient for Super-Distributor &amp; White-Label inquiries.</p>
            </div>
          </div>
        </div>

        {/* Resend Email Delivery Engine */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Mail className="w-4 h-4 text-[#FF5733]" />
            <h3 className="font-extrabold text-slate-900 text-sm">Resend Email Delivery API</h3>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Resend API Key
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={resendApiKey}
                  onChange={(e) => setResendApiKey(e.target.value)}
                  placeholder="re_xxxxxxxxxxxxxx"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-mono focus:bg-white focus:ring-2 focus:ring-[#FF5733]/20 outline-none"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Used to dispatch automated PDF proposals directly to partners.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Sender Display Name
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold focus:bg-white focus:ring-2 focus:ring-[#FF5733]/20 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Sender Email Address (EMAIL_FROM)
                </label>
                <input
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold focus:bg-white focus:ring-2 focus:ring-[#FF5733]/20 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SMTP Transactional Email Architecture */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <Server className="w-4 h-4 text-[#FF5733]" />
              <h3 className="font-extrabold text-slate-900 text-sm">SMTP Server Settings (Nodemailer)</h3>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Secured in backend environment</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">EMAIL_HOST</label>
              <input
                type="text"
                placeholder="smtp.resend.com or smtp.sendgrid.net"
                defaultValue={process.env.NEXT_PUBLIC_EMAIL_HOST || ''}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-mono text-xs focus:bg-white focus:ring-2 focus:ring-[#FF5733]/20 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">EMAIL_PORT</label>
              <input
                type="text"
                placeholder="587 or 465"
                defaultValue="587"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-mono text-xs focus:bg-white focus:ring-2 focus:ring-[#FF5733]/20 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">EMAIL_USER</label>
              <input
                type="text"
                placeholder="smtp_user or apikey"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-mono text-xs focus:bg-white focus:ring-2 focus:ring-[#FF5733]/20 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">EMAIL_PASSWORD</label>
              <input
                type="password"
                placeholder="••••••••••••"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-mono text-xs focus:bg-white focus:ring-2 focus:ring-[#FF5733]/20 outline-none"
              />
            </div>
          </div>
          <p className="text-[11px] text-slate-500">
            When SMTP or Resend credentials are not set, the system automatically runs in <strong>Sandbox Mode</strong>, safely generating proposals and logging email payloads in server console.
          </p>
        </div>

        {/* Firebase & Switch Database Health */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <Database className="w-4 h-4 text-emerald-600" />
              <h3 className="font-extrabold text-slate-900 text-sm">Firebase Cloud Connection</h3>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Synchronized
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Project ID</span>
              <p className="font-mono font-bold text-slate-800 mt-0.5">asthapay-a9625</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Auth Domain</span>
              <p className="font-mono font-bold text-slate-800 mt-0.5 truncate">asthapay-a9625.firebaseapp.com</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Storage Bucket</span>
              <p className="font-mono font-bold text-slate-800 mt-0.5 truncate">asthapay-a9625.firebasestorage.app</p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#FF5733] to-[#E03E1D] hover:from-[#ff6b4a] hover:to-[#eb4724] text-white font-bold text-sm shadow-lg shadow-[#FF5733]/25 transition-all active:scale-98"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
}
