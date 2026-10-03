'use client';

import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { DemoModal } from '../Modals/DemoModal';

export const NavbarWrapper: React.FC = () => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <>
      <Navbar onOpenDemoModal={() => setDemoModalOpen(true)} />
      <DemoModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </>
  );
};
