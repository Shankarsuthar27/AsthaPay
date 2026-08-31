import { NavDropdownItem, NavSection } from '../types';

export const partnerDropdownItems: NavDropdownItem[] = [
  {
    title: 'White Label Partner',
    description: 'Launch your branded portal & Android app with custom domain.',
    href: '#partner-whitelabel',
    iconName: 'Sparkles',
    badge: 'Popular'
  },
  {
    title: 'Master Distributor Network',
    description: 'Scale distributor tiers and manage real-time agent commissions.',
    href: '#partner-distributor',
    iconName: 'Network',
    badge: 'High Margin'
  },
  {
    title: 'API Integration Partner',
    description: 'Integrate REST banking & BBPS APIs into your existing stack.',
    href: '#partner-api',
    iconName: 'Code2',
    badge: 'Sandbox'
  },
  {
    title: 'Enterprise Banking Tie-ups',
    description: 'Custom switch deployment for NBFCs and rural banks.',
    href: '#partner-enterprise',
    iconName: 'Landmark',
  }
];

export const resourcesDropdownItems: NavDropdownItem[] = [
  {
    title: 'Developer API Docs',
    description: 'Interactive Swagger, Postman collections, SDKs & webhooks.',
    href: '#docs',
    iconName: 'Terminal',
    badge: 'v2.4'
  },
  {
    title: 'Compliance Hub',
    description: 'NPCI, RBI guidelines, TDS deductions & GST reporting.',
    href: '#compliance',
    iconName: 'ShieldCheck',
  },
  {
    title: 'Growth Case Studies',
    description: 'How B2B networks scale to ₹50Cr+ monthly throughput.',
    href: '#case-studies',
    iconName: 'TrendingUp',
  },
  {
    title: 'Support & FAQs',
    description: 'Merchant guides, device setup, and troubleshooting.',
    href: '#help-center',
    iconName: 'HelpCircle',
  }
];

export const aboutDropdownItems: NavDropdownItem[] = [
  {
    title: 'Company & Vision',
    description: 'Branchless banking tech powering 50,000+ merchants.',
    href: '#company',
    iconName: 'Building',
  },
  {
    title: 'Security & Certifications',
    description: 'PCI-DSS Level 1 certified with 256-bit AES encryption.',
    href: '#security',
    iconName: 'Lock',
    badge: 'ISO 27001'
  },
  {
    title: 'Leadership Team',
    description: 'FinTech veterans building next-gen payment rails.',
    href: '#team',
    iconName: 'Users',
  },
  {
    title: 'Careers',
    description: 'Join our team revolutionizing merchant payments.',
    href: '#careers',
    iconName: 'Briefcase',
    badge: 'Hiring'
  }
];

export const footerSections: { title: string; links: { label: string; href: string; badge?: string }[] }[] = [
  {
    title: 'Banking Platform',
    links: [
      { label: 'AePS Biometric Suite', href: '#aeps' },
      { label: 'Micro ATM / mPOS Terminal', href: '#micro-atm' },
      { label: 'Domestic Money Transfer (DMT)', href: '#dmt' },
      { label: 'UPI Cash Withdrawal (ICCW)', href: '#upi-cash', badge: 'New' },
      { label: 'Cash Management System (CMS)', href: '#cms' },
      { label: 'Digital Account Opening', href: '#account-opening' },
      { label: 'Indo-Nepal Cross-Border Remittance', href: '#indo-nepal' },
      { label: 'Connected Banking Payouts', href: '#payouts' }
    ]
  },
  {
    title: 'Utility & BBPS',
    links: [
      { label: 'Electricity Bill Payment', href: '#electricity' },
      { label: 'Mobile & DTH Recharge', href: '#recharge' },
      { label: 'FASTag Recharge & Tag Issuance', href: '#fastag' },
      { label: 'Credit Card Bill Payment', href: '#credit-card' },
      { label: 'Piped Gas & Water Bills', href: '#water-gas' },
      { label: 'Loan EMI & Municipal Taxes', href: '#loan-emi' },
      { label: 'Broadband & Landline Bills', href: '#broadband' }
    ]
  },
  {
    title: 'Travel Platform',
    links: [
      { label: 'IRCTC Train Booking Agent', href: '#irctc', badge: 'Principal' },
      { label: 'Domestic & International Flights', href: '#flights' },
      { label: 'Intercity Bus Booking Portal', href: '#bus' },
      { label: 'Hotel & Stay Reservations', href: '#hotels' },
      { label: 'Travel Insurance Addon', href: '#travel-insurance' }
    ]
  },
  {
    title: 'E-Gov & Insurance',
    links: [
      { label: 'NSDL PAN Card Center', href: '#nsdl-pan' },
      { label: 'UTI PSA Agent Portal', href: '#uti-pan' },
      { label: 'Aadhaar Seva Toolkit', href: '#aadhaar' },
      { label: 'Motor & Bike Insurance POSP', href: '#motor-insurance' },
      { label: 'Health & Mediclaim Cover', href: '#health-insurance' },
      { label: 'Shopkeeper Commercial Cover', href: '#shop-insurance' }
    ]
  },
  {
    title: 'Partner Models',
    links: [
      { label: 'White Label B2B Portal', href: '#partner-whitelabel' },
      { label: 'Master Distributor Engine', href: '#partner-distributor' },
      { label: 'REST API Integration', href: '#partner-api' },
      { label: 'Enterprise Banking Switch', href: '#partner-enterprise' },
      { label: 'Hardware Pos Device Store', href: '#devices' }
    ]
  },
  {
    title: 'Company & Trust',
    links: [
      { label: 'About AsthaPay', href: '#company' },
      { label: 'PCI-DSS Level 1 Security', href: '#security' },
      { label: 'Compliance & Audit Logs', href: '#compliance' },
      { label: 'Developer Sandbox', href: '#docs' },
      { label: 'Terms & Conditions', href: '#terms' },
      { label: 'Privacy Policy', href: '#privacy' }
    ]
  }
];
