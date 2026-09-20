'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Laptop, Briefcase, Store, GraduationCap } from 'lucide-react';

const AUDIENCES = [
  {
    title: 'Self-Employed',
    icon: UserCheck,
    color: 'text-amber-600 bg-amber-50',
  },
  {
    title: 'Cyber Cafe',
    icon: Laptop,
    color: 'text-blue-600 bg-blue-50',
  },
  {
    title: 'Business Persons',
    icon: Briefcase,
    color: 'text-rose-600 bg-rose-50',
  },
  {
    title: 'Retailer',
    icon: Store,
    color: 'text-emerald-600 bg-emerald-50',
  },
  {
    title: 'College Students',
    icon: GraduationCap,
    color: 'text-indigo-600 bg-indigo-50',
  },
];

export const IrctcTargetAudience: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#0A1931] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight"
        >
          Who can become an <span className="text-[#38BDF8]">IRCTC Agent?</span>
        </motion.h2>

        {/* White Rounded Card Strip matching reference */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl border border-slate-200">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {AUDIENCES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.07 }}
                  whileHover={{ y: -3 }}
                  className="flex flex-col items-center justify-center p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-default text-slate-800"
                >
                  <div className={`w-14 h-14 rounded-full ${item.color} flex items-center justify-center mb-3 shadow-2xs`}>
                    <Icon className="w-7 h-7 stroke-[1.8]" />
                  </div>
                  <span className="text-xs sm:text-sm font-black text-slate-900 text-center">
                    {item.title}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
