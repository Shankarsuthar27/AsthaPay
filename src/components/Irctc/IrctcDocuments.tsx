'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, CreditCard, Mail, MapPin } from 'lucide-react';

const DOCUMENTS = [
  {
    title: 'Mobile Number',
    desc: 'You must provide a fresh mobile number that has never been registered on the consumer IRCTC portal or IRCTC Rail Connect app before.',
    icon: Smartphone,
    badgeColor: 'bg-[#0A1931] text-white',
  },
  {
    title: 'PAN Card',
    desc: 'Valid PAN Card of the applicant is mandatory for KYC verification and compliant TDS crediting under Indian Railways regulations.',
    icon: CreditCard,
    badgeColor: 'bg-[#0A1931] text-white',
  },
  {
    title: 'Email ID',
    desc: 'A fresh, personal email address that has never been registered or linked to any IRCTC user account previously.',
    icon: Mail,
    badgeColor: 'bg-[#0A1931] text-white',
  },
  {
    title: 'Address Proof',
    desc: 'Valid government identity & address proof: Aadhaar Card, Driving License, Voter ID, or Electricity bill matching applicant details.',
    icon: MapPin,
    badgeColor: 'bg-[#0A1931] text-white',
  },
];

export const IrctcDocuments: React.FC = () => {
  return (
    <section id="documents" className="py-14 sm:py-20 bg-white border-b border-slate-200/80 scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-black text-[#0A1931] tracking-tight">
            Documents required for IRCTC agent registration
          </h2>
        </div>

        {/* 2x2 Responsive Grid matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {DOCUMENTS.map((doc, idx) => {
            const Icon = doc.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-slate-50/70 border border-slate-200/90 shadow-2xs hover:shadow-md hover:bg-white hover:border-[#D8232A]/30 transition-all group"
              >
                <div className={`w-12 h-12 rounded-full ${doc.badgeColor} flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>
                <div className="space-y-1.5 text-left">
                  <h3 className="text-base sm:text-lg font-black text-slate-900">
                    {doc.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                    {doc.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
