import type { Metadata } from 'next';
import { IrctcHeader } from '@/components/Irctc/IrctcHeader';
import { IrctcAboutSection } from '@/components/Irctc/IrctcAboutSection';
import { IrctcFooter } from '@/components/Irctc/IrctcFooter';

export const metadata: Metadata = {
  title: 'About Us | Authorized IRCTC Principal Service Provider - Asthasoft IRCTC',
  description:
    'Learn about Asthasoft IRCTC, located at Glitz Cinema Jalore, Jalore, Rajasthan – 343001. Serving retail agents across India with trusted IRCTC agency solutions.',
  keywords: [
    'About Asthasoft IRCTC',
    'Asthasoft IRCTC Agency',
    'Best IRCTC Agency in India',
    'IRCTC Authorized Partner Rajasthan',
    'IRCTC Agent Network',
    'Asthasoft India'
  ],
  openGraph: {
    title: 'About Us - Asthasoft IRCTC',
    description: 'Asthasoft IRCTC is the best IRCTC agency in INDIA empowering retail merchants across the nation.',
    images: ['/images/irctc-hero-bg.jpg'],
  },
};

export default function IrctcAboutPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-[#D8232A]/20 selection:text-[#D8232A]">
      <IrctcHeader />
      <IrctcAboutSection />
      <IrctcFooter />
    </main>
  );
}
