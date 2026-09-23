'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const BENEFITS = [
  'Low cost Agent Registration charges with lifetime portal validity.',
  'An agent can book unlimited Tatkal & General train tickets daily.',
  'Authorized agency name, mobile number & address printed on ticket.',
  'Earn ₹20 on Non-AC & ₹40 on AC class tickets per PNR booked.',
  'Instant ticket cancellation & automatic refund credited back to wallet.',
  'Single digital wallet for rail, domestic/international flights & bus bookings.',
  'Official sub-agent login credentials sent directly by IRCTC to your email.',
  '24x7 priority support via Dedicated Relationship Manager, Phone & WhatsApp.',
  'Free marketing materials, shop flex banner design & agent certification.',
  '100% Legal & Safe — Zero risk of commercial penalty or personal ID blocks.',
];

export const IrctcBenefits: React.FC = () => {
  return (
    <section id="benefits" className="py-14 sm:py-20 bg-white relative overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Vector Illustration matching reference */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex items-center justify-center"
          >
            <div className="relative w-full max-w-[480px] aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-blue-50/60 to-white p-4 flex items-center justify-center">
              <Image
                src="/images/irctc-agent-shop.jpg"
                alt="IRCTC Authorized Agent Retail Storefront Illustration"
                width={500}
                height={500}
                className="w-full h-auto object-contain rounded-xl drop-shadow-md"
                priority
              />
            </div>
          </motion.div>

          {/* Right Column: Benefits Content matching reference */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <div>
              <span className="text-sm sm:text-base font-extrabold text-[#D8232A] uppercase tracking-wide">
                Benefits of IRCTC Agent Registration
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0A1931] tracking-tight mt-1">
                IRCTC Agent Login Benefits
              </h2>
            </div>

            <div className="space-y-3 pt-1">
              {BENEFITS.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3 group">
                  <div className="w-5 h-5 rounded-full bg-red-100 text-[#D8232A] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-4 h-4 text-[#D8232A]" />
                  </div>
                  <p className="text-xs sm:text-sm md:text-[14.5px] text-slate-700 font-medium leading-relaxed">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <a
                href="#enquiry"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A1931] hover:bg-[#D8232A] text-white font-bold text-xs sm:text-sm transition-all duration-300 shadow-soft-sm"
              >
                <span>Apply for IRCTC Agency</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
