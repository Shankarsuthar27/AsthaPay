'use client';

import React from 'react';
import Link from 'next/link';
import { Train } from 'lucide-react';

interface IrctcHeaderProps {
  onOpenRegisterModal?: () => void;
}

export const IrctcHeader: React.FC<IrctcHeaderProps> = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-soft-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        {/* Left: Brand Logo: Asthasoft IRCTC */}
        <Link href="/become-an-irctc-agent" className="flex items-center gap-3 group select-none">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-[#0C2340] to-[#1E3A8A] flex items-center justify-center shadow-md text-white border border-blue-900/30 group-hover:scale-105 transition-transform">
            <Train className="w-6 h-6 text-[#FF5733]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center tracking-tight leading-none gap-1.5">
              <span className="text-2xl sm:text-3xl font-black italic text-[#D8232A]">Asthasoft</span>
              <span className="text-2xl sm:text-3xl font-black italic text-[#0A1931]">IRCTC</span>
            </div>
            <span className="text-[9.5px] sm:text-[10.5px] font-semibold text-slate-500 tracking-wide mt-0.5">
              Authorized IRCTC Principal Service Provider
            </span>
          </div>
        </Link>

        {/* Right Nav Links: Home, About Us, Contact Us */}
        <nav className="flex items-center gap-4 sm:gap-8 text-sm sm:text-base font-bold text-slate-700">
          <Link href="/become-an-irctc-agent" className="hover:text-[#D8232A] transition-colors py-1">
            Home
          </Link>
          <Link href="/irctc/about" className="hover:text-[#D8232A] transition-colors py-1">
            About Us
          </Link>
          <Link href="/irctc/contact" className="hover:text-[#D8232A] transition-colors py-1">
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
};
