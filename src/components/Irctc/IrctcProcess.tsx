'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CreditCard, UploadCloud, ShieldCheck, KeyRound, CheckCircle } from 'lucide-react';

const PROCESS_STEPS = [
  {
    step: '1. Fill Registration Form',
    desc: 'Fill our fast IRCTC agent registration form online with your personal & shop details.',
    icon: FileText,
  },
  {
    step: '2. Pay Charges',
    desc: 'After submitting the form, pay the nominal one-time IRCTC agency onboarding fee via online payment.',
    icon: CreditCard,
  },
  {
    step: '3. Upload Documents',
    desc: 'Submit your PAN card, Aadhaar card, applicant passport photo, and sample signature online.',
    icon: UploadCloud,
  },
  {
    step: '4. Document Verification',
    desc: 'Our compliance officer and IRCTC verification team will verify your submitted documents and mobile OTP.',
    icon: ShieldCheck,
  },
  {
    step: '5. Receive Agent ID & Pass',
    desc: 'Official IRCTC sub-agent login credentials will be generated and dispatched directly to your registered email.',
    icon: KeyRound,
  },
  {
    step: '6. Successful Login',
    desc: 'Login to the official IRCTC agent terminal and start issuing unlimited Tatkal & General rail tickets!',
    icon: CheckCircle,
  },
];

export const IrctcProcess: React.FC = () => {
  return (
    <section id="process" className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200/80 scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-12 sm:mb-16 space-y-2">
          <h2 className="text-2xl sm:text-4xl font-black text-[#0A1931] tracking-tight">
            Process of IRCTC Agent Registration
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 font-normal leading-relaxed">
            Here are few steps to become an IRCTC Authorized Service provider / IRCTC agent with us.
          </p>
        </div>

        {/* 6 Step Cards in 3x2 Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PROCESS_STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-soft-sm hover:shadow-xl hover:border-[#D8232A]/30 transition-all duration-300 flex flex-col items-center text-center space-y-4 group cursor-default"
              >
                {/* Red Icon Badge matching reference */}
                <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#D8232A] group-hover:bg-[#D8232A] group-hover:text-white flex items-center justify-center transition-colors duration-300 shadow-2xs">
                  <Icon className="w-7 h-7 stroke-[1.8]" />
                </div>

                {/* Step Title */}
                <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  {item.step}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
