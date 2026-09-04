// src/types/admin.ts
// Shared TypeScript types for the Admin Panel and Automated Proposal Engine

export type LeadStatus = 'new' | 'contacted' | 'converted' | 'lost';
export type EmailStatus = 'pending' | 'sending' | 'sent' | 'failed';
export type ProposalStatus = 'generating' | 'generated' | 'sent' | 'failed';

export interface ServiceDetail {
  service: string;
  description: string;
  businessUseCase: string;
  requiredInfrastructure: string;
  integrationRequirements: string;
}

export interface SolutionModule {
  module: string;
  description: string;
  features: string[];
}

export interface RoadmapPhase {
  phase: string;
  title: string;
  description: string;
  duration: string;
  deliverables: string[];
}

export interface CommercialTerms {
  setupFee: string;
  monthlyFee: string;
  apiCharges: string;
  transactionCharges: string;
  hardwareCharges: string;
  note: string;
}

export interface GeneratedProposal {
  proposalId: string;
  generatedAt: string;
  client: {
    fullName: string;
    businessEmail: string;
    mobileNumber: string;
    companyName: string;
  };
  requirements: {
    partnershipModel: string;
    retailNetwork: string;
    selectedServices: string[];
    additionalRequirements?: string;
  };
  executiveSummary: string;
  recommendedSolution: SolutionModule[];
  selectedServicesDetails: ServiceDetail[];
  technologyInfrastructure: string[];
  implementationRoadmap: RoadmapPhase[];
  commercialTerms: CommercialTerms;
  callToAction: {
    title: string;
    description: string;
    demoUrl: string;
    sandboxUrl: string;
  };
}

export interface Lead {
  id?: string;
  proposalId?: string;
  name: string;             // Full Name
  email: string;            // Business Email
  phone: string;            // Mobile Number (WhatsApp)
  companyName: string;
  businessType: string;     // Partnership Model
  estimatedRetailers: string; // Retail Network size
  selectedServices: string[];
  additionalRequirements?: string;
  source?: string;          // Form source / referral
  utmCampaign?: string;
  status: LeadStatus;
  emailStatus: EmailStatus;
  proposalStatus?: ProposalStatus;
  proposalContent?: GeneratedProposal;
  proposalPdfUrl?: string;
  sentAt?: Date | string | { seconds: number; nanoseconds: number };
  createdAt: Date | string | { seconds: number; nanoseconds: number };
  updatedAt?: Date | string | { seconds: number; nanoseconds: number };
  internalNotes?: string;
}

export interface ProposalTemplate {
  id?: string;
  templateName: string;
  isActive: boolean;
  headerText: string;
  executiveSummary: string;
  scopeOfServices: string;
  commercialSlabs: CommercialSlab[];
  termsAndConditions: string;
  logoUrl?: string;
  signatureUrl?: string;
  sealUrl?: string;
  updatedAt?: Date | { seconds: number; nanoseconds: number };
}

export interface CommercialSlab {
  service: string;
  commissionType: 'fixed' | 'percentage';
  value: number;
  notes?: string;
}

export interface EmailSettings {
  id?: string;
  resendApiKey: string;
  fromEmail: string;
  fromName: string;
  adminNotificationEmail: string;
  subjectLine: string;
  emailBodyIntro: string;
  replyToEmail: string;
  updatedAt?: Date | { seconds: number; nanoseconds: number };
}

export interface AdminUser {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  isAdmin: boolean;
}

export interface DashboardMetrics {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  convertedLeads: number;
  proposalsSent: number;
  conversionRate: number;
  topServices: { service: string; count: number }[];
}
