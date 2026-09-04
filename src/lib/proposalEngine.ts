// src/lib/proposalEngine.ts
// Automated Requirement Analysis & Personalized Proposal Generation Engine

import { 
  GeneratedProposal, 
  ServiceDetail, 
  SolutionModule, 
  RoadmapPhase, 
  CommercialTerms 
} from '@/types/admin';
import { getProposalConfig, ProposalModularConfig } from '@/lib/proposalConfig';

// Comprehensive FinTech Services Knowledge Base
const SERVICES_KNOWLEDGE_BASE: Record<string, Omit<ServiceDetail, 'service'>> = {
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
};

// Generate Unique Proposal ID: FIN-2026-XXXXXX
export function generateProposalId(): string {
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  return `FIN-${year}-${randomSuffix}`;
}

export interface ProposalInput {
  fullName: string;
  businessEmail: string;
  mobileNumber: string;
  companyName: string;
  partnershipModel: string;
  retailNetwork: string;
  selectedServices: string[];
  additionalRequirements?: string;
  customProposalId?: string;
}

export function synthesizeProposal(
  input: ProposalInput,
  configOverride?: Partial<ProposalModularConfig>
): GeneratedProposal {
  const config = { ...getProposalConfig(), ...(configOverride || {}) };
  const proposalId = input.customProposalId || generateProposalId();
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // 1. DYNAMIC EXECUTIVE SUMMARY
  let executiveSummary = '';
  if (input.partnershipModel.includes('White-Label')) {
    executiveSummary = `Based on your objective to deploy a fully branded turnkey White-Label B2B FinTech platform supporting an anticipated network of ${input.retailNetwork}, ${config.companyInfo.brandName} has engineered a comprehensive, multi-tiered infrastructure solution. Under this deployment, ${input.companyName || 'your organization'} will launch and manage its own independent web and mobile banking ecosystem, backed by institutional multi-bank switch switches, instant commission distribution, and seamless retailer onboarding.`;
  } else if (input.partnershipModel.includes('Master Distributor')) {
    executiveSummary = `To facilitate your strategy as a Master Distributor managing an expansive network of ${input.retailNetwork}, ${config.companyInfo.brandName} provides a robust multi-level distribution switch. This architecture is purpose-built to empower your downline distributors and retail endpoints with high-earning banking services, real-time wallet settlements, and autonomous credit management under your central operational command.`;
  } else if (input.partnershipModel.includes('REST APIs')) {
    executiveSummary = `In alignment with your technical requirements for Enterprise REST API integration across ${input.retailNetwork}, ${config.companyInfo.brandName} offers an institutional-grade API suite. Designed for ultra-low latency, 99.99% uptime, and scalable transaction throughput, this solution allows ${input.companyName || 'your engineering team'} to embed banking and payment services directly into your proprietary digital products with developer sandbox sandboxes and live webhooks.`;
  } else {
    executiveSummary = `In support of your rollout for Hardware Micro ATM distribution across ${input.retailNetwork}, ${config.companyInfo.brandName} delivers an end-to-end device management and transaction settlement platform. This ensures encrypted card processing, certified terminal drivers, and instant per-transaction commission splits across your entire retail distribution chain.`;
  }

  // 2. DYNAMIC RECOMMENDED SOLUTION MODULES
  const recommendedSolution: SolutionModule[] = [];

  // Core Admin Panel (Included for White-Label, Master Distributor, and Hardware Distribution)
  if (!input.partnershipModel.includes('REST APIs')) {
    recommendedSolution.push({
      module: 'Central Admin Panel & Command Dashboard',
      description: 'Institutional-grade administrative console providing total operational governance over users, distributors, and switches.',
      features: [
        'Admin dashboard with real-time liquidity & volume telemetry',
        'Distributor management & retailer hierarchy governance',
        'Service management & dynamic routing across banking switches',
        'Commission engine with customizable slab configurations',
        'Unified dual-wallet ledger & automated 24x7 IMPS bank settlement',
        'Transaction monitoring, dispute/CMS management & audit logs',
        'KYC / eKYC document verification queue & merchant onboarding approvals',
        'GST-compliant financial ledgers & exportable transactional reports',
      ],
    });
  }

  // Model 1: White-Label B2B Portal & App
  if (input.partnershipModel.includes('White-Label')) {
    recommendedSolution.push({
      module: 'White-Label Branded Web Portal & Android Mobile App',
      description: 'Fully customized, turn-key retail point-of-sale portal and mobile application carrying your company brand identity.',
      features: [
        'Custom branded portal & native Android APK with custom logos & color theme',
        'Retailer management & instant biometric self-onboarding',
        'Multi-level distributor hierarchy & territory assignment',
        'One-touch access to all selected FinTech, utility & banking services',
        'Real-time wallet balance refresh & passbook mini-statements',
        'Automated receipt generation (PDF thermal print & WhatsApp share)',
        'Push notifications & SMS alerts for transactions & commission credits',
        'Seamless REST API integrations connecting back-office infrastructure',
      ],
    });

    recommendedSolution.push({
      module: 'Distributor Hierarchy & Downline Management Portal',
      description: 'Autonomous operational portal empowering your network distributors to recruit and manage retail downlines.',
      features: [
        'Distributor hierarchy controls & retailer onboarding approvals',
        'Downline credit transfer & automated balance allocation',
        'Distributor-level commission override & margin tracking',
        'Real-time territory performance analytics & sales dashboards',
        'Automated commission credit notifications & settlement receipts',
      ],
    });
  }

  // Model 2: Master Distributor Model
  if (input.partnershipModel.includes('Master Distributor')) {
    recommendedSolution.push({
      module: 'Master Distributor Multi-Tier Hierarchy Switch',
      description: 'Comprehensive distribution infrastructure built specifically for high-volume network management.',
      features: [
        'Master distributor multi-level hierarchy (Super Distributors -> Distributors -> Retailers)',
        'Comprehensive distributor management & network oversight',
        'Instant digital retailer onboarding with automated e-KYC validation',
        'Commission configuration engine with tier-based margin rules',
        'Autonomous wallet management & bulk balance funding',
        'Live transaction monitoring with automated risk filters',
        'In-depth business reports, earnings analytics & ledger exports',
        'Centralized admin controls & permission delegations',
      ],
    });
  }

  // Model 3: Enterprise REST APIs
  if (input.partnershipModel.includes('REST APIs') || input.selectedServices.includes('Payout APIs') || input.selectedServices.includes('Banking APIs')) {
    recommendedSolution.push({
      module: 'Enterprise REST API Infrastructure & Developer Gateway',
      description: 'High-throughput, ultra-low latency REST API gateway designed for embeddable banking and corporate disbursements.',
      features: [
        'REST API infrastructure with HMAC SHA-256 signature authentication & IP whitelisting',
        'Comprehensive API documentation, Postman collections & code samples',
        'Interactive developer sandbox environment with test wallets & simulated webhooks',
        'Transaction APIs (AePS, DMT, BBPS, UPI, Utility)',
        'High-velocity Payout APIs with double-debit idempotency protection',
        'Real-time verification APIs (Penny-drop account & PAN verification)',
        'Asynchronous Webhooks with guaranteed delivery & smart retries',
        'Sub-second latency, multi-bank switch failovers & 99.99% uptime SLA',
        'Real-time monitoring, structured error handling & enterprise integration support',
      ],
    });
  }

  // Model 4: Hardware Micro ATM Distribution
  if (input.partnershipModel.includes('Hardware') || input.selectedServices.includes('Micro ATM')) {
    recommendedSolution.push({
      module: 'Hardware Micro ATM Ecosystem & Terminal Management System (TMS)',
      description: 'Complete device lifecycle management, EMV card switch processing, and settlement platform.',
      features: [
        'Micro ATM hardware ecosystem supporting Bluetooth mPOS & Android PIN pads',
        'Retailer and distributor terminal assignment & device mapping',
        'Device management & remote diagnostic health telemetry',
        'Secure EMV chip & PIN transaction processing (RuPay, Visa, Mastercard)',
        'Automated commission management & instant per-transaction margin splits',
        'Real-time settlement tracking & 24x7 IMPS bank payouts',
        'Hardware onboarding with PCI-PTS certified cryptographic keys',
        'Comprehensive device inventory reports & serial number audit logs',
      ],
    });
  }

  // 3. SELECTED SERVICES DETAILED SPECIFICATIONS (Reads from modular catalog)
  const catalog = { ...SERVICES_KNOWLEDGE_BASE, ...(config.servicesCatalog || {}) };
  const selectedServicesDetails: ServiceDetail[] = input.selectedServices.map((serviceName) => {
    const knowledge = catalog[serviceName] || {
      description: `Turnkey B2B infrastructure for ${serviceName} with automated settlement and commission splits.`,
      businessUseCase: `Deliver ${serviceName} across your retail and distribution network to expand revenue opportunities.`,
      requiredInfrastructure: 'Bank-grade switch connectors and secure API endpoints.',
      integrationRequirements: 'Standard REST API integration with real-time webhook callback listeners.',
    };

    return {
      service: serviceName,
      ...knowledge,
    };
  });

  // 4. TECHNOLOGY & INFRASTRUCTURE OVERVIEW
  const technologyInfrastructure = [
    'NPCI & RBI Compliant Multi-Bank Switch Switches (ICICI, Kotak, Fino)',
    'Dual-Entry Ledger Architecture ensuring zero balancing discrepancy',
    'Bank-Grade 256-Bit SSL/TLS Encryption & PCI-DSS Compliant Workflows',
    'High Availability Auto-Scaling Cloud Infrastructure (99.99% Uptime SLA)',
    'Automated 24x7 IMPS/NEFT Wallet Settlements with Zero Bank Holiday Delays',
    'Multi-Factor Authentication (MFA), Biometric RD-Service Integration, and Role-Based Access Control (RBAC)',
    'Distributed Asynchronous Webhooks with Smart Retries and Event Auditing',
  ];

  // 5. IMPLEMENTATION ROADMAP (Reads from modular config)
  const implementationRoadmap: RoadmapPhase[] = config.implementationRoadmap || [];

  // 6. COMMERCIAL PROPOSAL TERMS (Configurable from Admin Panel)
  const commercialTerms: CommercialTerms = {
    setupFee: config.pricing?.setupFee || 'Customized based on selected platform tier and white-label mobile app provisioning.',
    monthlyFee: config.pricing?.monthlyFee || 'Covers cloud server scaling, multi-bank switch routing, SSL certificates, and technical support.',
    apiCharges: config.pricing?.apiCharges || 'Included in enterprise package with zero per-hit overhead on standard transactions.',
    transactionCharges: config.pricing?.transactionCharges || 'Zero debit MDR for AePS and Micro ATM; standard IMPS commercial slabs apply for DMT.',
    hardwareCharges: config.pricing?.hardwareCharges || 'Hardware mPOS and Biometric scanners available at volume distributor rates.',
    note: config.pricing?.note || 'Commercial pricing will be finalized based on the selected services, transaction volume, infrastructure requirements, and integration scope discussed during your live product demonstration.',
  };

  return {
    proposalId,
    generatedAt: currentDate,
    client: {
      fullName: input.fullName,
      businessEmail: input.businessEmail,
      mobileNumber: input.mobileNumber,
      companyName: input.companyName || 'Prospective FinTech Partner',
    },
    requirements: {
      partnershipModel: input.partnershipModel,
      retailNetwork: input.retailNetwork,
      selectedServices: input.selectedServices,
      additionalRequirements: input.additionalRequirements,
    },
    executiveSummary,
    recommendedSolution,
    selectedServicesDetails,
    technologyInfrastructure,
    implementationRoadmap,
    commercialTerms,
    callToAction: {
      title: 'Ready to Explore Your Turnkey Platform?',
      description: 'Experience a personalized demonstration of your white-label admin panel, distributor management, and live banking switches.',
      demoUrl: `${config.companyInfo.websiteUrl}/schedule-demo`,
      sandboxUrl: `${config.companyInfo.websiteUrl}/sandbox`,
    },
  };
}
