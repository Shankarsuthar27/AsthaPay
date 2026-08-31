import { ServiceCategory } from '../types';

export const serviceCategoriesData: ServiceCategory[] = [
  {
    id: 'banking',
    title: 'Banking & Financial Inclusion',
    navTitle: 'Banking',
    shortDesc: 'Branchless banking, biometric AePS, micro-ATMs, and money transfer.',
    iconName: 'Building2',
    highlightPill: 'Core Banking Stack',
    services: [
      {
        id: 'aeps',
        title: 'AePS Biometric Banking',
        shortDesc: 'Cash withdrawal, deposit & balance enquiry via Aadhaar.',
        iconName: 'Fingerprint',
        badge: 'High Margin',
        imageSrc: '/images/Aeps.svg',
        features: ['Cash Out & In', 'Aadhaar Pay', 'Multi-Bank Switch', 'Instant Settlement'],
        popular: true,
        link: '#aeps'
      },
      {
        id: 'micro-atm',
        title: 'Micro ATM & mPOS',
        shortDesc: 'Turn any counter into a card-swipe cash point.',
        iconName: 'CreditCard',
        badge: 'Hardware',
        imageSrc: '/images/MicroAtm.svg',
        features: ['RuPay & Visa/Mastercard', 'EMV Chip & PIN', 'Instant Slip Print', 'Zero Chargeback'],
        popular: true,
        link: '#micro-atm'
      },
      {
        id: 'dmt',
        title: 'Money Transfer (DMT)',
        shortDesc: '24/7 instant IMPS & NEFT fund transfers to all banks.',
        iconName: 'Send',
        badge: 'Instant IMPS',
        imageSrc: '/images/Dmt.svg',
        features: ['Direct Bank APIs', 'Beneficiary Check', 'OTP Validation', 'Smart Split Routing'],
        popular: true,
        link: '#dmt'
      },
      {
        id: 'upi-cash',
        title: 'UPI Cash Withdrawal',
        shortDesc: 'Cardless cash withdrawal via dynamic UPI QR scan.',
        iconName: 'QrCode',
        badge: 'QR Cash',
        imageSrc: '/images/Aps.svg',
        features: ['Dynamic QR Code', 'Zero Skimming Risk', 'Instant Webhooks', 'High Success Rate'],
        popular: true,
        link: '#upi-cash'
      },
      {
        id: 'cms',
        title: 'Cash Management (CMS)',
        shortDesc: 'Cash drop & EMI collection for 120+ NBFCs and delivery partners.',
        iconName: 'Briefcase',
        badge: '120+ NBFCs',
        imageSrc: '/images/Cms.svg',
        features: ['120+ Tie-ups', 'OTP Verification', 'Instant Receipt', 'High Volume'],
        popular: false,
        link: '#cms'
      },
      {
        id: 'account-opening',
        title: 'Digital Account Opening',
        shortDesc: 'Paperless Savings & Current accounts with video KYC.',
        iconName: 'UserCheck',
        badge: 'KYC Ready',
        features: ['Biometric & Video KYC', 'Debit Card Dispatch', 'Zero Balance Options', 'Bank Commissions'],
        popular: false,
        link: '#account-opening'
      },
      {
        id: 'indo-nepal',
        title: 'Indo-Nepal Remittance',
        shortDesc: 'Secure cross-border money transfers to Nepal.',
        iconName: 'Globe',
        badge: 'Cross-Border',
        imageSrc: '/images/Inmt.svg',
        features: ['Everest & Prabhu Bank', 'Cash Pickup & Wallet', 'RBI Compliant', 'Best FX Rates'],
        popular: false,
        link: '#indo-nepal'
      },
      {
        id: 'payouts',
        title: 'Connected Payouts',
        shortDesc: 'Automated 24/7 vendor payouts and commission settlements.',
        iconName: 'Layers',
        badge: 'Bulk APIs',
        features: ['Smart Balancing', 'Auto Retry', 'Custom Rules', 'Auto Reconciliation'],
        popular: false,
        link: '#payouts'
      }
    ]
  },
  {
    id: 'utility',
    title: 'Utility & BBPS Payments',
    navTitle: 'Utility',
    shortDesc: 'Certified Bharat BillPay for electricity, fastag, and mobile recharges.',
    iconName: 'Zap',
    highlightPill: 'NPCI BBPS Certified',
    services: [
      {
        id: 'bbps-electricity',
        title: 'Electricity Bills',
        shortDesc: 'Instant bill fetch and pay across 200+ power discoms.',
        iconName: 'Lightbulb',
        badge: '200+ Discoms',
        imageSrc: '/images/Bbps.svg',
        features: ['Instant Bill Fetch', 'Real-Time Receipt', 'Bill Reminders', 'Direct Margin'],
        popular: true,
        link: '#electricity'
      },
      {
        id: 'recharge-dth',
        title: 'Mobile & DTH Recharge',
        shortDesc: 'Multi-operator prepaid plans, data packs, and DTH.',
        iconName: 'Smartphone',
        badge: '99.9% Uptime',
        features: ['Plan Finder', 'Auto Retry Switch', 'All Operators', 'Instant Credit'],
        popular: true,
        link: '#recharge'
      },
      {
        id: 'fastag',
        title: 'FASTag Recharge & Issuance',
        shortDesc: 'Toll tag recharge across 35+ banks and new tag issuance.',
        iconName: 'Car',
        badge: '35+ Banks',
        features: ['Vehicle Lookup', 'NPCI NETC Switch', 'Bulk Fleet Top-up', 'Custom Tags'],
        popular: true,
        link: '#fastag'
      },
      {
        id: 'credit-card',
        title: 'Credit Card Bill Payment',
        shortDesc: 'BBPS card payment for Visa, Mastercard, and RuPay.',
        iconName: 'CreditCard',
        badge: 'Instant Credit',
        features: ['Major Banks', 'Instant ACK', 'Encrypted Rails', 'Balance Check'],
        popular: false,
        link: '#credit-card'
      },
      {
        id: 'water-gas',
        title: 'Gas & Water Bills',
        shortDesc: 'Piped natural gas (PNG) and municipal water payments.',
        iconName: 'Flame',
        badge: 'Pan-India',
        features: ['50+ Gas Providers', 'Municipal Boards', 'Consumer ID Check', 'Digital Receipt'],
        popular: false,
        link: '#water-gas'
      },
      {
        id: 'loan-emi',
        title: 'Loan EMI & Municipal Tax',
        shortDesc: 'EMI collection and local tax payments at retail counters.',
        iconName: 'Building',
        badge: 'High Flow',
        features: ['100+ Lenders', 'Instant ACK', 'Tax Validation', 'Zero Latency'],
        popular: false,
        link: '#loan-emi'
      }
    ]
  },
  {
    id: 'travel',
    title: 'Travel & Ticketing Suite',
    navTitle: 'Travel & Ticketing',
    shortDesc: 'Authorized IRCTC rail booking, flights, and bus tickets.',
    iconName: 'Plane',
    highlightPill: 'Authorized IRCTC Principal',
    services: [
      {
        id: 'irctc',
        title: 'IRCTC Train Booking',
        shortDesc: 'Official IRCTC agent portal with Tatkal & General booking.',
        iconName: 'Train',
        badge: 'Authorized',
        features: ['OTP/Dongle Login', 'Tatkal & General', 'PNR Tracking', 'Instant Refund'],
        popular: true,
        link: '#irctc'
      },
      {
        id: 'flights',
        title: 'Flight Booking Engine',
        shortDesc: 'Domestic and international air tickets with markup control.',
        iconName: 'PlaneTakeoff',
        badge: 'B2B Fares',
        features: ['Seat Selection', 'Markup Manager', 'Instant Cancel', 'SME Baggage Fares'],
        popular: true,
        link: '#flights'
      },
      {
        id: 'bus-booking',
        title: 'Bus Ticket Booking',
        shortDesc: '100,000+ routes across state RTCs and private operators.',
        iconName: 'Bus',
        badge: '100k+ Routes',
        features: ['Seat Layout', 'GPS Tracking', 'SMS m-Ticket', 'Top Margins'],
        popular: false,
        link: '#bus'
      },
      {
        id: 'hotel-booking',
        title: 'Hotel Reservations',
        shortDesc: '500,000+ verified hotels with instant confirmation.',
        iconName: 'Hotel',
        badge: '500k+ Hotels',
        features: ['Zero Booking Fee', 'Pay at Hotel', 'Free Cancellation', 'High Margin'],
        popular: false,
        link: '#hotels'
      }
    ]
  },
  {
    id: 'egov',
    title: 'E-Governance & Citizen Services',
    navTitle: 'E-Governance',
    shortDesc: 'Paperless PAN cards, Aadhaar services, and tax filing.',
    iconName: 'ShieldCheck',
    highlightPill: 'Govt Direct Rails',
    services: [
      {
        id: 'nsdl-pan',
        title: 'NSDL PAN Card Center',
        shortDesc: 'Paperless e-KYC PAN application with digital e-PAN in 2 hours.',
        iconName: 'FileText',
        badge: '2-Hr e-PAN',
        features: ['Biometric & OTP e-KYC', 'New & Corrections', 'Physical Dispatch', 'Zero Paper'],
        popular: true,
        link: '#nsdl-pan'
      },
      {
        id: 'uti-pan',
        title: 'UTIITSL PAN Portal',
        shortDesc: 'UTI PSA agent module for document verification and minor PAN.',
        iconName: 'FileCheck2',
        badge: 'PSA Module',
        features: ['Agent Credentials', 'Bulk Upload', 'Status API', 'Low Coupons'],
        popular: false,
        link: '#uti-pan'
      },
      {
        id: 'aadhaar-services',
        title: 'Aadhaar Seva Toolkit',
        shortDesc: 'Assisted demographic updates and PVC card ordering.',
        iconName: 'BadgeCheck',
        badge: 'UIDAI Ready',
        features: ['PVC Card Order', 'Masked Aadhaar', 'Mobile Check', 'UIDAI Compliant'],
        popular: false,
        link: '#aadhaar'
      },
      {
        id: 'itr-filing',
        title: 'Tax & GST Filing',
        shortDesc: 'Assisted ITR and GST return filing for local businesses.',
        iconName: 'Calculator',
        badge: 'Assisted ITR',
        features: ['CA Review', 'ITR 1-4 Filing', 'GST Registration', 'High Margins'],
        popular: false,
        link: '#itr'
      }
    ]
  },
  {
    id: 'insurance',
    title: 'Insurance & Protection',
    navTitle: 'Insurance',
    shortDesc: 'POSP-certified paperless policies from top IRDAI insurers.',
    iconName: 'HeartHandshake',
    highlightPill: 'IRDAI POSP Compliant',
    services: [
      {
        id: 'motor-insurance',
        title: 'Motor & Bike Insurance',
        shortDesc: 'Instant 3rd-party and comprehensive motor policies.',
        iconName: 'Shield',
        badge: 'Instant Policy',
        features: ['20+ Insurers', 'Zero Inspection', 'Break-in Renewal', 'POSP Payouts'],
        popular: true,
        link: '#motor-insurance'
      },
      {
        id: 'health-insurance',
        title: 'Health & Medical Cover',
        shortDesc: 'Cashless claims across 10,000+ network hospitals.',
        iconName: 'Cross',
        badge: 'Cashless',
        features: ['No Checkup to 55', 'Critical Illness', 'Hospital Cash', 'Instant PDF'],
        popular: true,
        link: '#health-insurance'
      },
      {
        id: 'shop-insurance',
        title: 'Shopkeeper Insurance',
        shortDesc: 'Commercial cover against fire, theft, and inventory loss.',
        iconName: 'Store',
        badge: 'B2B Cover',
        features: ['Stock & Cash Cover', 'Transit Shield', 'Low Premium', 'Fast Claims'],
        popular: false,
        link: '#shop-insurance'
      },
      {
        id: 'accident-life',
        title: 'Micro-Insurance & Life',
        shortDesc: 'Affordable protection starting at ₹100 premium.',
        iconName: 'HeartPulse',
        badge: 'From ₹100',
        features: ['High Multipliers', 'Disability Cover', 'Nominee Support', 'Zero Paperwork'],
        popular: false,
        link: '#life-accident'
      }
    ]
  }
];
