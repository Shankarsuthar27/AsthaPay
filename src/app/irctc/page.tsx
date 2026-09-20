import type { Metadata } from 'next';
import { IrctcHeader } from '@/components/Irctc/IrctcHeader';
import { IrctcHero } from '@/components/Irctc/IrctcHero';
import { IrctcVerifyBanner } from '@/components/Irctc/IrctcVerifyBanner';
import { IrctcBenefits } from '@/components/Irctc/IrctcBenefits';
import { IrctcProcess } from '@/components/Irctc/IrctcProcess';
import { IrctcTargetAudience } from '@/components/Irctc/IrctcTargetAudience';
import { IrctcDocuments } from '@/components/Irctc/IrctcDocuments';
import { IrctcFaqAccordion } from '@/components/Irctc/IrctcFaqAccordion';
import { IrctcFooter } from '@/components/Irctc/IrctcFooter';

export const metadata: Metadata = {
  title: 'Become an Authorized IRCTC Agent | Asthasoft IRCTC Registration Portal',
  description:
    'Register as an authorized IRCTC agent with Asthasoft IRCTC. Book unlimited Tatkal and General train tickets, earn ₹20 to ₹40 commission per PNR, instant wallet refund, and 24x7 agent support.',
  keywords: [
    'IRCTC Agent Registration',
    'Become an IRCTC Agent',
    'Authorized IRCTC Agent Portal',
    'Tatkal Ticket Booking Agent',
    'IRCTC PSP Partner',
    'Rail Ticket Booking Agency',
    'Asthasoft IRCTC'
  ],
  openGraph: {
    title: 'Become an Authorized IRCTC Agent - Asthasoft IRCTC',
    description: 'Launch your authorized rail ticket booking counter today with low registration charges & lifetime validity.',
    images: ['/images/irctc-hero-bg.jpg'],
  },
};

export default function IrctcPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-[#D8232A]/20 selection:text-[#D8232A]">
      {/* 1. Header Navigation */}
      <IrctcHeader />

      {/* 2. Hero Section with Scenic Railway Background & Integrated Enquiry Form */}
      <IrctcHero />

      {/* 3. Red Verification Ribbon */}
      <IrctcVerifyBanner />

      {/* 4. Benefits of IRCTC Agent Registration with Vector Illustration */}
      <IrctcBenefits />

      {/* 5. 6-Step Registration Process */}
      <IrctcProcess />

      {/* 6. Who Can Become an IRCTC Agent */}
      <IrctcTargetAudience />

      {/* 7. Documents Required for Registration */}
      <IrctcDocuments />

      {/* 8. Interactive FAQs Accordion */}
      <IrctcFaqAccordion />

      {/* 9. Corporate Footer & Floating WhatsApp Action */}
      <IrctcFooter />
    </main>
  );
}
