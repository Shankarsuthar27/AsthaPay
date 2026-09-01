'use client';

import React, { useState } from 'react';
import { serviceCategoriesData } from '@/data/servicesData';
import { partnerDropdownItems, resourcesDropdownItems } from '@/data/navigationData';
import {
  X,
  Landmark,
  Settings,
  Globe,
  Shield,
  Phone,
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDemoModal: () => void;
}

// Category icon mapper to match the exact visual style in the reference image
const getCategoryIcon = (id: string) => {
  switch (id) {
    case 'banking':
      return <Landmark className="w-3.5 h-3.5 text-[#FF5733]" />;
    case 'utility':
      return <Settings className="w-3.5 h-3.5 text-[#FF5733]" />;
    case 'travel':
      return <Globe className="w-3.5 h-3.5 text-[#FF5733]" />;
    case 'egov':
      return <Landmark className="w-3.5 h-3.5 text-[#FF5733]" />;
    case 'insurance':
      return <Shield className="w-3.5 h-3.5 text-[#FF5733]" />;
    default:
      return <Landmark className="w-3.5 h-3.5 text-[#FF5733]" />;
  }
};

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onOpenDemoModal }) => {
  const [platformOpen, setPlatformOpen] = useState<boolean>(true);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [partnerOpen, setPartnerOpen] = useState<boolean>(false);
  const [resourcesOpen, setResourcesOpen] = useState<boolean>(false);

  if (!isOpen) return null;

  const toggleCategory = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Slide-out Drawer matching reference screenshot */}
      <div className="fixed inset-y-0 right-0 w-[84vw] max-w-[340px] bg-white shadow-2xl flex flex-col z-50 overflow-y-auto animate-in slide-in-from-right duration-300">
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            {/* Top Close Button */}
            <div className="mb-6 flex items-center justify-start">
              <button
                onClick={onClose}
                className="p-1 -ml-1 text-[#0A1931] hover:text-[#FF5733] transition-colors focus:outline-none"
                aria-label="Close Navigation Menu"
              >
                <X className="w-6 h-6 stroke-[2.4]" />
              </button>
            </div>

            {/* Navigation List */}
            <nav className="space-y-4">
              {/* 1. Platform */}
              <div>
                <button
                  onClick={() => setPlatformOpen(!platformOpen)}
                  className="w-full flex items-center justify-between py-1 text-left group"
                >
                  <span className="text-[#0A1931] font-bold text-[15.5px] group-hover:text-[#FF5733] transition-colors">
                    Platform
                  </span>
                  <span
                    className={`text-[9px] text-[#0A1931] transition-transform duration-200 ${
                      platformOpen ? 'rotate-180 text-[#FF5733]' : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {/* Sub-categories under Platform */}
                {platformOpen && (
                  <div className="pt-3 pb-1 pl-1 space-y-3">
                    {serviceCategoriesData.map((category) => {
                      const isCatExpanded = expandedCategory === category.id;
                      return (
                        <div key={category.id} className="space-y-1.5">
                          <button
                            onClick={() => toggleCategory(category.id)}
                            className="w-full flex items-center justify-between py-1 text-left group cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              {/* Soft Light-Coral/Pink Rounded Square Icon Badge */}
                              <div className="w-7 h-7 rounded-lg bg-[#FFEFEB] flex items-center justify-center shrink-0">
                                {getCategoryIcon(category.id)}
                              </div>
                              <span className="text-[#0A1931] font-bold text-[14.5px] group-hover:text-[#FF5733] transition-colors">
                                {category.navTitle}
                              </span>
                            </div>
                            <span
                              className={`text-[8.5px] text-slate-500 transition-transform duration-200 ${
                                isCatExpanded ? 'rotate-180 text-[#FF5733]' : ''
                              }`}
                            >
                              ▼
                            </span>
                          </button>

                          {/* Nested Sub-services Links */}
                          {isCatExpanded && (
                            <div className="pl-10 pr-2 py-1 space-y-1.5 border-l-2 border-[#FFEFEB] ml-3.5 my-1">
                              {category.services.map((srv) => (
                                <a
                                  key={srv.id}
                                  href={`#${category.id}`}
                                  onClick={handleLinkClick}
                                  className="block py-1 text-xs font-semibold text-slate-600 hover:text-[#FF5733] transition-colors truncate"
                                >
                                  {srv.title}
                                </a>
                              ))}
                              <a
                                href={`#${category.id}`}
                                onClick={handleLinkClick}
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#FF5733] pt-0.5"
                              >
                                <span>Explore {category.navTitle}</span>
                                <ChevronRight className="w-3 h-3" />
                              </a>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 2. Partner with Us */}
              <div>
                <button
                  onClick={() => setPartnerOpen(!partnerOpen)}
                  className="w-full flex items-center justify-between py-1 text-left group"
                >
                  <span className="text-[#0A1931] font-bold text-[15.5px] group-hover:text-[#FF5733] transition-colors">
                    Partner with Us
                  </span>
                  <span
                    className={`text-[9px] text-[#0A1931] transition-transform duration-200 ${
                      partnerOpen ? 'rotate-180 text-[#FF5733]' : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {partnerOpen && (
                  <div className="pt-2 pl-3 pb-1 space-y-2 border-l-2 border-slate-100 ml-1 mt-1.5">
                    {partnerDropdownItems.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.href}
                        onClick={handleLinkClick}
                        className="block py-1 text-xs font-semibold text-slate-600 hover:text-[#FF5733] transition-colors"
                      >
                        {item.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. Pricing */}
              <div>
                <a
                  href="#pricing"
                  onClick={handleLinkClick}
                  className="block py-1 text-[#0A1931] font-bold text-[15.5px] hover:text-[#FF5733] transition-colors"
                >
                  Pricing
                </a>
              </div>

              {/* 4. Resources */}
              <div>
                <button
                  onClick={() => setResourcesOpen(!resourcesOpen)}
                  className="w-full flex items-center justify-between py-1 text-left group"
                >
                  <span className="text-[#0A1931] font-bold text-[15.5px] group-hover:text-[#FF5733] transition-colors">
                    Resources
                  </span>
                  <span
                    className={`text-[9px] text-[#0A1931] transition-transform duration-200 ${
                      resourcesOpen ? 'rotate-180 text-[#FF5733]' : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {resourcesOpen && (
                  <div className="pt-2 pl-3 pb-1 space-y-2 border-l-2 border-slate-100 ml-1 mt-1.5">
                    {resourcesDropdownItems.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.href}
                        onClick={handleLinkClick}
                        className="block py-1 text-xs font-semibold text-slate-600 hover:text-[#FF5733] transition-colors"
                      >
                        {item.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* 5. About Us */}
              <div>
                <a
                  href="#why-us"
                  onClick={handleLinkClick}
                  className="block py-1 text-[#0A1931] font-bold text-[15.5px] hover:text-[#FF5733] transition-colors"
                >
                  About Us
                </a>
              </div>

              {/* 6. Contact Us */}
              <div>
                <a
                  href="#contact"
                  onClick={handleLinkClick}
                  className="block py-1 text-[#0A1931] font-bold text-[15.5px] hover:text-[#FF5733] transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </nav>
          </div>

          {/* Drawer Bottom CTA Button */}
          <div className="pt-6 border-t border-slate-100 space-y-3 mt-6">
            <button
              onClick={() => {
                onClose();
                onOpenDemoModal();
              }}
              className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-[#FF5733] to-[#FF6D4A] text-white font-bold text-xs shadow-coral-glow flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.98] transition-all"
            >
              <span>Schedule Free Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <a
                href="tel:+918001234567"
                className="flex items-center gap-1 hover:text-[#0A1931] transition-colors font-medium"
              >
                <Phone className="w-3 h-3 text-[#FF5733]" />
                <span>1800-123-4567</span>
              </a>
              <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                <ShieldCheck className="w-3 h-3" /> PCI-DSS L1
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
