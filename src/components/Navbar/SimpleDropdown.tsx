'use client';

import React from 'react';
import { NavDropdownItem } from '@/types';
import { DynamicIcon } from '../common/DynamicIcon';
import { ChevronRight } from 'lucide-react';

interface SimpleDropdownProps {
  isOpen: boolean;
  items: NavDropdownItem[];
  onClose: () => void;
  width?: string;
  badgeTitle?: string;
}

export const SimpleDropdown: React.FC<SimpleDropdownProps> = ({
  isOpen,
  items,
  onClose,
  width = 'w-80',
  badgeTitle
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`absolute top-full left-0 ${width} mt-3 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 z-50 transition-all duration-200 animate-in fade-in slide-in-from-top-2`}
      onMouseLeave={onClose}
    >
      {badgeTitle && (
        <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600 border-b border-slate-100 mb-1">
          {badgeTitle}
        </div>
      )}
      <div className="space-y-0.5">
        {items.map((item, index) => (
          <a
            key={index}
            href={item.href}
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-2.5 group"
          >
            {item.iconName && (
              <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-brand-coral group-hover:text-white text-slate-600 flex items-center justify-center shrink-0 transition-colors mt-0.5">
                <DynamicIcon name={item.iconName} className="w-3.5 h-3.5" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[11.5px] font-bold text-brand-navy group-hover:text-brand-coral transition-colors">
                  {item.title}
                </span>
                {item.badge && (
                  <span className="text-[8.5px] font-bold px-1.5 py-0.2 bg-brand-coral/10 text-brand-coral rounded">
                    {item.badge}
                  </span>
                )}
              </div>
              {item.description && (
                <p className="text-[10px] text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
            <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-brand-coral group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
          </a>
        ))}
      </div>
    </div>
  );
};
