'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/lib/AuthContext';
import { AdminGuard } from './AdminGuard';
import { AdminSidebar } from './AdminSidebar';
import { AdminNavbar } from './AdminNavbar';

export const AdminLayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If on the login page, render clean layout without sidebar/guard
  if (pathname === '/admin/login') {
    return (
      <AuthProvider>
        <main className="min-h-screen bg-[#07172F]">
          {children}
        </main>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <AdminGuard>
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
          {/* Admin Sidebar */}
          <AdminSidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
          />

          {/* Main Area (Offset by sidebar width on desktop) */}
          <div className="lg:pl-72 flex flex-col min-h-screen">
            <AdminNavbar 
              onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
            />

            <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
              {children}
            </main>

            <footer className="py-4 px-8 border-t border-slate-200 text-center text-xs text-slate-400 bg-white/50">
              AsthaPay FinTech Administration &bull; Secure Enterprise Switch Console &bull; v2.4
            </footer>
          </div>
        </div>
      </AdminGuard>
    </AuthProvider>
  );
};
