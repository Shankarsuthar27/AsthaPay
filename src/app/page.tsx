'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar/Navbar';
import { Hero } from '@/components/Hero/Hero';
import { ServicesSection } from '@/components/ServicesShowcase/ServicesSection';
import { WhyChooseUs } from '@/components/WhyChooseUs/WhyChooseUs';
import { OmniChannelShowcase } from '@/components/OmniChannel/OmniChannelShowcase';
import { ComparisonSection } from '@/components/Comparison/ComparisonSection';
import { DarkHeroCTA } from '@/components/BottomCTA/DarkHeroCTA';
import { Footer } from '@/components/Footer/Footer';
import { DemoModal } from '@/components/Modals/DemoModal';

export default function HomePage() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const handleOpenDemoModal = () => {
    setDemoModalOpen(true);
  };

  const handleCloseDemoModal = () => {
    setDemoModalOpen(false);
  };

  return (
    <main className="min-h-screen flex flex-col relative selection:bg-brand-coral/20 selection:text-brand-coral">
      {/* Sticky Header & Mega Menu */}
      <Navbar onOpenDemoModal={handleOpenDemoModal} />

      {/* Hero Section with Live Simulator & Trust Bar */}
      <Hero onOpenDemoModal={handleOpenDemoModal} />

      {/* Interactive Animated Core Services Showcase (ScrollSpy + Framer Motion) */}
      <ServicesSection />

      {/* Why Choose Us 6-Grid Feature Section */}
      <WhyChooseUs />

      {/* Omni-Channel Platform Showcase (Web, Android, WPOS, APIs) */}
      <OmniChannelShowcase />

      {/* Comparison Toggle Section ("With Us" vs "Without Us") + ROI Calculator */}
      <ComparisonSection />

      {/* High-Impact Bottom CTA Banner */}
      <DarkHeroCTA onOpenDemoModal={handleOpenDemoModal} />

      {/* Comprehensive Compliance Footer */}
      <Footer />

      {/* Free Live Demo Interactive Modal */}
      <DemoModal isOpen={demoModalOpen} onClose={handleCloseDemoModal} />
    </main>
  );
}
