'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Search, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_LIST: FaqItem[] = [
  {
    question: 'What are the charges or fees for IRCTC agent registration?',
    answer: 'The IRCTC agent registration fee is a nominal one-time onboarding charge (varying between ₹1,999 to ₹3,999 based on dongle vs OTP model). It includes IRCTC sub-agent gateway creation, digital verification, portal access, and lifetime software updates with no hidden annual AMC charges.',
  },
  {
    question: 'What are the benefits of registering as an IRCTC agent?',
    answer: 'Authorized agents can book unlimited Tatkal & General rail tickets for commercial clients legally. Your agency name and phone number will be printed on the e-ticket. You earn direct commissions of ₹20 per Non-AC ticket and ₹40 per AC ticket per PNR, with instant wallet refund on cancellations.',
  },
  {
    question: 'What are the formalities & documents required for IRCTC agent registration?',
    answer: 'You only need 4 basic documents: (1) Fresh Mobile Number never registered on consumer IRCTC, (2) Fresh Email ID never registered on consumer IRCTC, (3) Self-attested PAN Card copy, and (4) Valid Address Proof (Aadhaar Card, Driving License, or Voter ID).',
  },
  {
    question: 'Can IRCTC agents book during the opening Tatkal window?',
    answer: 'Yes! IRCTC authorized agents are permitted to book Tatkal rail tickets after 15 minutes of the opening window (i.e. AC Tatkal from 10:15 AM and Non-AC/Sleeper Tatkal from 11:15 AM). Normal booking for General, Ladies, and Senior Citizen quota is open 24x7 without restrictions.',
  },
  {
    question: 'Is there any renewal or recurring AMC cost for agents?',
    answer: 'No recurring annual maintenance charge (AMC) is levied on standard active sub-agent portals. Your agency remains active as long as you perform regular ticket transactions.',
  },
  {
    question: 'What is the online link for IRCTC agent registration form online?',
    answer: 'You can register directly on this page using the Enquiry Form above, or reach out to our authorized PSP onboarding desk via Call or WhatsApp at +91-7023318111 for express activation within 24–48 hours.',
  },
  {
    question: 'How to become an IRCTC agent?',
    answer: 'The process is simple: (1) Fill the registration enquiry form, (2) Pay the nominal registration fees, (3) Submit your KYC documents online, (4) Complete mobile OTP and email verification from IRCTC, and (5) Receive your official IRCTC sub-agent ID and password.',
  },
  {
    question: 'How long does it take to become an IRCTC agent?',
    answer: 'Upon submission of accurate documents and payment confirmation, verification and sub-agent generation by IRCTC is typically completed within 24 to 48 working hours.',
  },
  {
    question: 'What is the validity period of IRCTC agency registration?',
    answer: 'The IRCTC agency is granted with multi-year validity (typically 1 to 2 years, renewable seamlessly upon simple KYC re-confirmation without full registration fees).',
  },
  {
    question: 'What is OTP-based IRCTC agent login?',
    answer: 'OTP-based login allows you to log in securely using a One-Time Password sent to your registered mobile number on any computer, laptop, or mobile browser without requiring a physical USB dongle.',
  },
  {
    question: 'How to get IRCTC agent login?',
    answer: 'Once your KYC documents are approved by IRCTC, an automated activation link and credentials (sub-agent username and temporary password) are sent directly to your registered email address by IRCTC.',
  },
  {
    question: 'Does IRCTC create booking approval direct?',
    answer: 'Yes, all agent bookings are processed directly through the official IRCTC core passenger reservation system (PRS) switch, ensuring genuine tickets and real-time PNR allotment.',
  },
  {
    question: 'What is the after-sales support channel?',
    answer: 'We provide dedicated relationship manager support, a WhatsApp helpline (+91-7023318111), toll-free telephone assistance, and a 24/7 helpdesk ticketing system for PNR queries, TDR filing, and refund tracking.',
  },
  {
    question: 'How many Tatkal tickets can be booked by an IRCTC agent?',
    answer: 'Authorized agents can book unlimited Tatkal tickets throughout the day after the opening restriction window (from 10:15 AM for AC classes and 11:15 AM for Sleeper classes), subject to live train seat availability.',
  },
  {
    question: 'What is the full form of IRCTC?',
    answer: 'IRCTC stands for Indian Railway Catering and Tourism Corporation, a subsidiary of the Indian Railways, Ministry of Railways, Government of India.',
  },
  {
    question: 'Can I start selling train tickets from my home?',
    answer: 'Yes! Anyone with a desktop, laptop, smartphone, or tablet with internet connectivity can operate an IRCTC agency from home, retail shops, travel counters, or cyber cafes.',
  },
  {
    question: 'Do I need any trade license to become an IRCTC agent?',
    answer: 'No trade license or commercial business registration is mandatory. Individuals, self-employed persons, shopkeepers, and freelancers can register easily using personal PAN and Aadhaar cards.',
  },
  {
    question: 'Do I need any GST number registration to become IRCTC agent?',
    answer: 'No, having a GST registration is optional. If you have a GST number, you can provide it for GST input tax credit, but it is not mandatory for agent registration.',
  },
  {
    question: 'Which operating system is required for IRCTC agent login?',
    answer: 'Any standard modern operating system works flawlessly: Windows 10/11, macOS, Linux, Android, or iOS via web browsers like Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.',
  },
  {
    question: 'Can I book premium Tatkal tickets on agent login?',
    answer: 'Yes, authorized agents can book Tatkal, General, Senior Citizen, and Ladies quota tickets. Dynamic fare premium tickets can also be booked per IRCTC commercial rules.',
  },
  {
    question: 'How to get IRCTC agent registration form pdf?',
    answer: 'Our entire onboarding procedure is 100% digital and paperless. You do not need to print or courier physical PDF forms; simply submit the digital form on this page to initiate registration.',
  },
  {
    question: 'List of states for IRCTC Agent Registration?',
    answer: 'Registration is open across all 28 States and 8 Union Territories across India with zero geographical restrictions.',
  },
  {
    question: 'How to activate the personal link from IRCTC?',
    answer: 'Upon application processing, IRCTC sends an activation link to your registered mobile and email. Simply click the link, input the OTP received on SMS, and set your permanent agent password.',
  },
];

export const IrctcFaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = FAQ_LIST.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-14 sm:py-20 bg-slate-50 scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching reference */}
        <div className="text-center mb-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/70 text-blue-700 text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0A1931] tracking-tight">
            IRCTC Agent FAQs
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Find answers to frequently asked questions about IRCTC authorized agency creation, commercial benefits, and rules.
          </p>

          {/* Search bar */}
          <div className="relative max-w-md mx-auto pt-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-5" />
            <input
              type="text"
              placeholder="Search questions (e.g. Tatkal, Commission, Documents)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0A1931] bg-white shadow-2xs placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Dark Blue Accordion List matching reference */}
        <div className="space-y-2.5">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-slate-500 text-sm">
              No matching questions found for &quot;{searchQuery}&quot;. Please contact our support team directly.
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-lg overflow-hidden border border-[#1E3A8A]/30 transition-all duration-200"
                >
                  {/* Accordion Header (Navy/Blue Tab matching reference screenshot) */}
                  <button
                    onClick={() => toggleFaq(idx)}
                    className={`w-full px-4 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between gap-3 text-left transition-colors ${
                      isOpen
                        ? 'bg-[#0E2954] text-white'
                        : 'bg-[#102A54] hover:bg-[#0E2954] text-slate-100'
                    }`}
                  >
                    <span className="text-xs sm:text-sm md:text-[14.5px] font-bold tracking-tight">
                      {faq.question}
                    </span>
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5 text-white" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-slate-300" />
                      )}
                    </div>
                  </button>

                  {/* Accordion Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="p-4 sm:p-5 bg-white text-slate-700 text-xs sm:text-sm leading-relaxed border-t border-slate-200">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
