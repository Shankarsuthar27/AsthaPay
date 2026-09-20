import type { Metadata } from 'next';
import { IrctcHeader } from '@/components/Irctc/IrctcHeader';
import { IrctcContactSection } from '@/components/Irctc/IrctcContactSection';
import { IrctcFooter } from '@/components/Irctc/IrctcFooter';

export const metadata: Metadata = {
  title: "Let's Get in Touch | Contact AsthaPay IRCTC Agent Support",
  description:
    'Contact AsthaPay IRCTC Agent Support at Glitz Cinema Jalore, Jalore, Rajasthan – 343001. Call or WhatsApp: +91-7023318111. Emails: info@asthasoftindia.com, sales@asthasoftindia.com, accounts@asthasoftindia.com, support@asthasoftindia.com.',
  keywords: [
    'Contact IRCTC Agent Support',
    'AsthaPay Contact Us',
    'AsthaSoft India Jalore',
    'IRCTC Agent Helpline Number',
    'IRCTC Agent WhatsApp Support',
    'IRCTC Agent Registration Contact'
  ],
  openGraph: {
    title: "Let's Get in Touch - Asthasoft IRCTC",
    description: 'Have a question or need assistance becoming an authorized IRCTC agent? We are here to help!',
    images: ['/images/irctc-hero-bg.jpg'],
  },
};

export default function IrctcContactPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-[#D8232A]/20 selection:text-[#D8232A]">
      <IrctcHeader />
      <IrctcContactSection />
      <IrctcFooter />
    </main>
  );
}
