'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { Loader2 } from 'lucide-react';

export const AdminGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { adminUser, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !adminUser && pathname !== '/admin/login') {
      router.replace('/admin/login');
    }
  }, [adminUser, loading, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#07172F] text-white">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF5733] to-[#FF8A65] flex items-center justify-center font-black text-2xl shadow-xl shadow-[#FF5733]/30 mb-4 animate-bounce">
          A
        </div>
        <div className="flex items-center gap-2 text-slate-300 text-sm font-semibold">
          <Loader2 className="w-5 h-5 animate-spin text-[#FF5733]" />
          <span>Authenticating AsthaPay Admin...</span>
        </div>
      </div>
    );
  }

  // If not logged in and not on login page, don't flash protected content
  if (!adminUser && pathname !== '/admin/login') {
    return null;
  }

  return <>{children}</>;
};
