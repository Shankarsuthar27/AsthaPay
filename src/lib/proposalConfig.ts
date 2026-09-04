// src/lib/proposalConfig.ts
// Modular Configuration Store & Service for FinTech Proposals
// Allows administrators to modify services, descriptions, partnership models,
// pricing, implementation phases, email templates, company info, and terms
// without changing application code.

import { CommercialSlab, RoadmapPhase, ServiceDetail } from '@/types/admin';

export interface ProposalCompanyConfig {
  companyName: string;
  brandName: string;
  tagline: string;
  websiteUrl: string;
  supportEmail: string;
  salesEmail: string;
  phone: string;
  address: string;
  signatoryTitle: string;
}

export interface ProposalPricingConfig {
  setupFee: string;
  monthlyFee: string;
  apiCharges: string;
  transactionCharges: string;
  hardwareCharges: string;
  note: string;
}

export interface ProposalEmailTemplateConfig {
  subject: string;
  greeting: string;
  bodyIntro: string;
  signoff: string;
}

export interface ProposalModularConfig {
  companyInfo: ProposalCompanyConfig;
  pricing: ProposalPricingConfig;
  commercialSlabs: CommercialSlab[];
  servicesCatalog: Record<string, Omit<ServiceDetail, 'service'>>;
  termsAndConditions: string[];
  implementationRoadmap: RoadmapPhase[];
  emailTemplate: ProposalEmailTemplateConfig;
}

export const DEFAULT_PROPOSAL_CONFIG: ProposalModularConfig = {
  companyInfo: {
    companyName: 'AsthaPay Technologies Private Limited',
    brandName: 'AsthaPay',
    tagline: 'Enterprise Turnkey B2B FinTech & Banking Switch Infrastructure',
    websiteUrl: 'https://asthapay.com',
    supportEmail: 'support@asthapay.com',
    salesEmail: 'sales@asthapay.com',
    phone: '+91 98111 22334',
    address: 'DLF Cyber City, Sector 24, Gurugram, Haryana - 122002',
    signatoryTitle: 'Authorized FinTech Solutions Director',
  },
  pricing: {
    setupFee: 'Customized based on selected platform tier and white-label mobile app provisioning.',
    monthlyFee: 'Covers cloud server scaling, multi-bank switch routing, SSL certificates, and technical support.',
    apiCharges: 'Included in enterprise package with zero per-hit overhead on standard transactions.',
    transactionCharges: 'Zero debit MDR for AePS and Micro ATM; standard IMPS commercial slabs apply for DMT.',
    hardwareCharges: 'Hardware mPOS and Biometric scanners available at volume distributor rates.',
    note: 'Commercial pricing will be finalized based on the selected services, transaction volume, infrastructure requirements, and integration scope discussed during your live product demonstration.',
  },
  commercialSlabs: [
    { service: 'AePS Cash Withdrawal (₹3000 - ₹10,000)', commissionType: 'fixed', value: 13.0, notes: 'Highest tier instant credit' },
    { service: 'Micro ATM / mPOS (₹3000 - ₹10,000)', commissionType: 'fixed', value: 13.5, notes: 'Multi-bank switch routing' },
    { service: 'Domestic Money Transfer (DMT)', commissionType: 'percentage', value: 0.45, notes: 'IMPS 24x7 instant settlement' },
    { service: 'BBPS Electricity & Utility Bills', commissionType: 'fixed', value: 2.5, notes: 'Per bill cash-back / rebate' },
    { service: 'NSDL / UTI PAN Card Application', commissionType: 'fixed', value: 12.0, notes: 'E-KYC biometric instant PAN' },
    { service: 'IRCTC Authorized Agent Ticket', commissionType: 'fixed', value: 40.0, notes: 'AC Class booking fee allowance' },
    { service: 'UPI Cash at POS / QR Payout', commissionType: 'percentage', value: 0.20, notes: 'Zero chargeback guarantee' },
  ],
  servicesCatalog: {
    'Aadhaar Enabled Payment System (AePS)': {
      description: 'Assisted biometric banking infrastructure enabling cash withdrawal, balance inquiry, mini-statement, and Aadhaar-to-Aadhaar fund transfer using UIDAI biometric authentication.',
      businessUseCase: 'Empower retail store agents to act as micro-banking branch correspondents in rural and semi-urban localities.',
      requiredInfrastructure: 'Certified RD-Service biometric fingerprint / IRIS scanner devices and NPCI switch connectivity.',
      integrationRequirements: 'SDK/API integration with multi-bank switch fallbacks (ICICI / Kotak / Fino) and automated daily 24x7 IMPS wallet settlement.',
    },
    'Domestic Money Transfer (DMT)': {
      description: 'Instant 24x7 domestic remittances across all Indian scheduled commercial and regional rural banks via IMPS/NEFT rails.',
      businessUseCase: 'Enable migrant workers, unbanked retailers, and local customers to deposit cash and send money securely across India.',
      requiredInfrastructure: 'Bank-grade OTP authentication gateway, beneficiary master ledger, and NPCI IMPS switch routing.',
      integrationRequirements: 'REST API with automated Penny-Drop verification for instant recipient account name validation before fund transfer.',
    },
    'Micro ATM': {
      description: 'EMV chip & PIN debit card transaction processing infrastructure supporting RuPay, Visa, and Mastercard cards.',
      businessUseCase: 'Enable cash withdrawals and balance inquiries directly via debit cards at merchant counters with higher transaction limits than AePS.',
      requiredInfrastructure: 'Bluetooth mPOS / Android PIN-pad terminal hardware paired with mobile application or web terminal.',
      integrationRequirements: 'PCI-PTS certified device drivers, ISO 8583 banking switch interface, and end-to-end PIN encryption.',
    },
    'Aadhaar Pay': {
      description: 'Merchant biometric cash collection system allowing customers to pay for retail purchases using fingerprint authentication linked to their Aadhaar bank account.',
      businessUseCase: 'Cardless and mobile-free payments at merchant points without transaction limits typical of regular AePS withdrawals.',
      requiredInfrastructure: 'Merchant biometric device and merchant terminal ID mapped to bank acquirer.',
      integrationRequirements: 'NPCI Aadhaar Pay API switch and merchant settlement ledger with zero customer MDR.',
    },
    'BBPS': {
      description: 'NPCI Bharat Bill Payment System interoperable platform for recurring utility payments, postpaid mobile, gas, water, municipal taxes, and loan EMIs.',
      businessUseCase: 'Offer one-stop bill payment counter with instant receipt generation and commission rebate.',
      requiredInfrastructure: 'Direct BBPOU (Bharat Bill Payment Operating Unit) API connector.',
      integrationRequirements: 'Standard BBPS fetch and bill-pay API suite with dynamic biller lookup and real-time complaint management system (CMS).',
    },
    'Mobile Recharge': {
      description: 'Multi-operator prepaid mobile recharge platform covering Jio, Airtel, Vi, and BSNL with real-time plan browsing.',
      businessUseCase: 'High-frequency footfall driver generating recurring retail commissions on every prepaid top-up.',
      requiredInfrastructure: 'Direct operator LAPU switches and multi-hub API routing.',
      integrationRequirements: 'Operator lookup API, R-Offer plan discovery API, and instant webhook transaction callbacks.',
    },
    'DTH Recharge': {
      description: 'Instant satellite television top-up system for Tata Play, Airtel DTH, Dish TV, Sun Direct, and D2H.',
      businessUseCase: 'High-margin consumer utility services for walk-in retail customers.',
      requiredInfrastructure: 'Aggregator switch with customer ID validation and balance fetch engine.',
      integrationRequirements: 'Heavy-concurrency top-up API with automated reversal on operator failures.',
    },
    'Electricity Bill Payment': {
      description: 'Unified state electricity board payment switch covering 120+ power distribution corporations (DISCOMs) across India.',
      businessUseCase: 'High-ticket bill collection generating substantial agent retention and customer loyalty.',
      requiredInfrastructure: 'State DISCOM direct integration and NPCI BBPS switch gateway.',
      integrationRequirements: 'Consumer number fetch API with instant digital PDF receipt generation.',
    },
    'FASTag Recharge': {
      description: 'Instant toll tag recharge across 35+ issuer banks including NETC national electronic toll collection interoperability.',
      businessUseCase: 'Quick recharge facility for commercial drivers and personal vehicle owners visiting retail touchpoints.',
      requiredInfrastructure: 'NETC switch and issuer bank API connectors.',
      integrationRequirements: 'Vehicle chassis/registration lookup and instant FASTag wallet credit.',
    },
    'PAN Card Services': {
      description: 'Instant paperless PAN card issuance and correction through NSDL and UTIITSL biometric e-KYC integration.',
      businessUseCase: 'Assisted digital service creating high per-application margins for retail agents.',
      requiredInfrastructure: 'UIDAI biometric OTP / fingerprint verification module.',
      integrationRequirements: 'NSDL Protean / UTIITSL agent authentication gateway with instant e-PAN generation in 2 hours.',
    },
    'Insurance Services': {
      description: 'Point of Sale Person (PoSP) insurance distribution for two-wheeler, four-wheeler, commercial vehicle, and personal accident cover.',
      businessUseCase: 'High-margin revenue source requiring zero physical paperwork with instant policy issuance.',
      requiredInfrastructure: 'IRDAI compliant multi-insurer aggregator switch.',
      integrationRequirements: 'Instant vehicle quote comparison engine and real-time policy PDF delivery API.',
    },
    'Travel Booking': {
      description: 'IRCTC authorized train ticket booking, domestic/international flight reservation, and inter-city bus ticketing.',
      businessUseCase: 'Complete travel agent portal allowing retailers to book confirmed tickets with authorized agent credentials.',
      requiredInfrastructure: 'IRCTC Principal Service Provider (PSP) sub-agent gateway and GDS airline connectors.',
      integrationRequirements: 'Biometric/OTP IRCTC sub-agent login, live seat inventory API, and instant agent commission crediting.',
    },
    'UPI Services': {
      description: 'Dynamic and static UPI QR code generation, Soundbox integration, and Cash@POS withdrawal via UPI rails.',
      businessUseCase: 'Empower retail merchants to accept UPI payments from any app (PhonePe, Google Pay, Paytm) with instant audio alert.',
      requiredInfrastructure: 'NPCI UPI switch and multi-bank dynamic VPA generator.',
      integrationRequirements: 'Webhook payment notifications, instant split settlements, and audio device MQTT connection.',
    },
    'Banking APIs': {
      description: 'Enterprise API stack for opening zero-balance savings and current accounts with partner banks.',
      businessUseCase: 'Full digital onboarding of retail customers without visiting physical bank branches.',
      requiredInfrastructure: 'Bank Core Banking Solution (CBS) API gateway.',
      integrationRequirements: 'Video KYC (V-KYC) and Aadhaar e-Sign verification protocols.',
    },
    'Payout APIs': {
      description: 'High-throughput enterprise bulk payment gateway for instant vendor, salary, and loan disbursements via IMPS, NEFT, and RTGS.',
      businessUseCase: 'Automate high-volume corporate disbursements with 99.99% switch uptime and smart routing.',
      requiredInfrastructure: 'Multi-bank nodal account pooling and dedicated switch line.',
      integrationRequirements: 'Direct REST API with idempotency keys, webhook status listeners, and 2FA maker-checker workflow.',
    },
    'Account Verification': {
      description: 'Real-time bank account name verification (Penny Drop) and UPI VPA validation before funds transfer.',
      businessUseCase: 'Eliminate transfer failures, fraud, and misdirected payments across merchant networks.',
      requiredInfrastructure: 'NPCI IMPS switch account verification rails.',
      integrationRequirements: 'Sub-second API response returning registered bank account holder name.',
    },
    'KYC / eKYC': {
      description: 'Automated identity verification including Aadhaar OTP, biometric e-KYC, PAN verification, and voter ID checks.',
      businessUseCase: 'Instant compliance verification for retailer, distributor, and customer onboarding.',
      requiredInfrastructure: 'UIDAI-authorized KUA/ASA gateway and NSDL verification portal.',
      integrationRequirements: 'Encrypted biometric payload processing and real-time OCR document verification.',
    },
    'Merchant Onboarding': {
      description: 'End-to-end digital merchant and retailer onboarding workflow with digital agreement signing and background checks.',
      businessUseCase: 'Scale retail touchpoint networks from 10 to 1,000+ agents in days instead of months.',
      requiredInfrastructure: 'Document storage vault and digital signing gateway.',
      integrationRequirements: 'Self-onboarding mobile flow with automated approval rules and geo-tagging.',
    },
    'Distributor & Retailer Management': {
      description: 'Multi-tier hierarchy engine supporting Super Distributors, Master Distributors, Distributors, and Retailers.',
      businessUseCase: 'Manage complex nationwide partner networks with custom permissions, credit lines, and territory mapping.',
      requiredInfrastructure: 'Hierarchical database model with real-time balance tree calculation.',
      integrationRequirements: 'Role-based access control (RBAC), multi-user security, and downline performance dashboards.',
    },
    'Commission Management': {
      description: 'Dynamic real-time commission calculation engine supporting fixed and slab-based margin splits across all network tiers.',
      businessUseCase: 'Automate instant commission distribution upon successful transaction without manual reconciliation.',
      requiredInfrastructure: 'Double-entry ledger accounting engine.',
      integrationRequirements: 'Configurable slab rules per service, distributor override settings, and TDS tax calculation.',
    },
    'Other FinTech Services': {
      description: 'Custom financial products including digital gold, micro-credit facilitation, and mutual fund distribution.',
      businessUseCase: 'Expand basket of financial offerings to maximize customer lifetime value.',
      requiredInfrastructure: 'Partner AMC and lending NBFC API bridges.',
      integrationRequirements: 'Custom API integration endpoints with turnkey webhook reporting.',
    },
  },
  implementationRoadmap: [
    {
      phase: 'Phase 1',
      title: 'Requirement Finalization & Architecture Mapping',
      description: 'Discovery session to finalize branding assets, multi-tier hierarchy requirements, and service enablement scope.',
      duration: 'Days 1 – 2',
      deliverables: ['Custom scope documentation', 'Brand asset collection (Logo, Colors)', 'Domain & DNS setup guide'],
    },
    {
      phase: 'Phase 2',
      title: 'Platform Branding & Core Configuration',
      description: 'Deployment of branded Admin Console, Distributor Portal, and Retailer Web/Mobile application.',
      duration: 'Days 3 – 4',
      deliverables: ['White-label portal staging URL', 'Admin credentials provisioning', 'Super-Distributor role configuration'],
    },
    {
      phase: 'Phase 3',
      title: 'FinTech Switch & Service Activation',
      description: 'Activation of requested banking switches (AePS, DMT, Micro ATM, BBPS, UPI) and wallet ledger initialization.',
      duration: 'Days 5 – 6',
      deliverables: ['Active banking APIs', 'Commission slab structure configuration', 'Nodal bank pool account link'],
    },
    {
      phase: 'Phase 4',
      title: 'End-to-End Testing & Device Calibration',
      description: 'Comprehensive functional, security, and transaction flow testing across all selected services.',
      duration: 'Days 7 – 8',
      deliverables: ['Sandbox test transaction execution', 'Biometric/mPOS driver testing', 'Settlement reconciliation check'],
    },
    {
      phase: 'Phase 5',
      title: 'User Acceptance Testing (UAT) & Staff Training',
      description: 'Walkthrough and operational hand-off with your operations team and distributor leadership.',
      duration: 'Days 9 – 10',
      deliverables: ['Operations training session', 'User training guides', 'Sandbox validation sign-off'],
    },
    {
      phase: 'Phase 6',
      title: 'Production Go-Live & Launch Support',
      description: 'Official production switch-on, live retailer onboarding, and dedicated priority switch monitoring.',
      duration: 'Day 11 onwards',
      deliverables: ['Live domain launch', 'Google Play Store APK handover', '24x7 priority support channel'],
    },
  ],
  emailTemplate: {
    subject: 'Your Personalized FinTech Infrastructure Proposal – {{companyName}}',
    greeting: 'Hello {{fullName}},',
    bodyIntro: 'Thank you for your interest in our Turnkey FinTech Infrastructure platform.\nBased on the requirements you submitted, we have prepared a personalized proposal for {{companyName}}.\nThe proposal includes our recommended platform architecture, selected services, implementation approach and next steps.\nPlease find your personalized proposal attached.',
    signoff: 'We look forward to demonstrating the platform to you.\n\nRegards,\nFinTech Infrastructure Team\nAsthaPay Technologies Private Limited',
  },
  termsAndConditions: [
    'Deployment timeline: 3 to 5 business days from payment and logo asset handover.',
    'Wallet settlement is automated 24x7 via IMPS/NEFT without bank holiday delays.',
    'White-label updates and security patches are covered under monthly server maintenance.',
    'Zero debit MDR for AePS and Micro ATM transactions as per NPCI standards.',
    'All banking switch routing is RBI and NPCI compliant with redundant disaster recovery switches.',
  ],
};

// Global in-memory active config (synced across server requests)
let activeConfig: ProposalModularConfig = { ...DEFAULT_PROPOSAL_CONFIG };

export function getProposalConfig(): ProposalModularConfig {
  return activeConfig;
}

export function updateProposalConfig(newConfig: Partial<ProposalModularConfig>): ProposalModularConfig {
  activeConfig = {
    ...activeConfig,
    ...newConfig,
    companyInfo: { ...activeConfig.companyInfo, ...(newConfig.companyInfo || {}) },
    pricing: { ...activeConfig.pricing, ...(newConfig.pricing || {}) },
    emailTemplate: { ...activeConfig.emailTemplate, ...(newConfig.emailTemplate || {}) },
    servicesCatalog: { ...activeConfig.servicesCatalog, ...(newConfig.servicesCatalog || {}) },
  };
  return activeConfig;
}
