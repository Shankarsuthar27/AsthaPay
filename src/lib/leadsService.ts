// src/lib/leadsService.ts
// Unified lead management service supporting Firestore real-time sync with localStorage fallback

import { Lead, LeadStatus, EmailStatus, ProposalStatus, GeneratedProposal } from '@/types/admin';
import { INITIAL_LEADS } from '@/data/mockLeads';
import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  doc, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';

const LOCAL_STORAGE_KEY = 'asthapay_leads_cache_v2';

export async function fetchAllLeads(): Promise<Lead[]> {
  // Try fetching from Firestore first
  try {
    if (typeof window !== 'undefined' && db) {
      const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const firestoreLeads: Lead[] = [];
        querySnapshot.forEach((d) => {
          const data = d.data();
          firestoreLeads.push({
            id: d.id,
            proposalId: data.proposalId,
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
            companyName: data.companyName || '',
            businessType: data.businessType || '',
            estimatedRetailers: data.estimatedRetailers || '',
            selectedServices: data.selectedServices || [],
            additionalRequirements: data.additionalRequirements,
            source: data.source || 'Website Demo Request Form',
            status: data.status || 'new',
            emailStatus: data.emailStatus || 'pending',
            proposalStatus: data.proposalStatus || 'generated',
            proposalContent: data.proposalContent,
            proposalPdfUrl: data.proposalPdfUrl,
            sentAt: data.sentAt?.toDate ? data.sentAt.toDate() : data.sentAt,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
            updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : undefined,
          });
        });
        
        // Cache to local storage
        if (typeof window !== 'undefined') {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(firestoreLeads));
        }
        return firestoreLeads;
      }
    }
  } catch (error) {
    console.warn('Firestore fetch failed or not configured, using local fallback:', error);
  }

  // Fallback to localStorage or INITIAL_LEADS
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        return parsed.map((l: any) => {
          let dateObj = new Date();
          if (l.createdAt) {
            if (typeof l.createdAt === 'string' || typeof l.createdAt === 'number') {
              dateObj = new Date(l.createdAt);
            } else if (typeof l.createdAt.seconds === 'number') {
              dateObj = new Date(l.createdAt.seconds * 1000);
            }
          }
          return {
            ...l,
            createdAt: dateObj,
          };
        });
      } catch (e) {
        console.error('Error parsing cached leads', e);
      }
    }
    // Initialize storage with mock leads
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_LEADS));
  }

  return INITIAL_LEADS;
}

export async function createLead(leadData: Partial<Lead>): Promise<Lead> {
  const newLead: Lead = {
    id: leadData.id || 'lead-' + Date.now(),
    proposalId: leadData.proposalId || `FIN-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
    name: leadData.name || '',
    email: leadData.email || '',
    phone: leadData.phone || '',
    companyName: leadData.companyName || '',
    businessType: leadData.businessType || 'White-Label B2B Portal & App',
    estimatedRetailers: leadData.estimatedRetailers || '10 - 50 Retailers',
    selectedServices: leadData.selectedServices || [],
    additionalRequirements: leadData.additionalRequirements,
    source: leadData.source || 'Website Demo Request Form',
    status: leadData.status || 'new',
    emailStatus: leadData.emailStatus || 'pending',
    proposalStatus: leadData.proposalStatus || 'generated',
    proposalContent: leadData.proposalContent,
    createdAt: new Date(),
  };

  // 1. Try saving to Firestore
  try {
    if (db) {
      const docRef = await addDoc(collection(db, 'leads'), {
        ...newLead,
        createdAt: serverTimestamp(),
      });
      newLead.id = docRef.id;
    }
  } catch (error) {
    console.warn('Firestore lead creation skipped, saved locally:', error);
  }

  // 2. Update local storage
  if (typeof window !== 'undefined') {
    try {
      const existing = await fetchAllLeads();
      const updated = [newLead, ...existing.filter((l) => l.id !== newLead.id)];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error caching new lead', e);
    }
  }

  return newLead;
}

export async function updateLeadStatus(leadId: string, newStatus: LeadStatus): Promise<void> {
  // 1. Try updating Firestore
  try {
    if (db && !leadId.startsWith('lead-')) {
      const leadRef = doc(db, 'leads', leadId);
      await updateDoc(leadRef, {
        status: newStatus,
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.warn('Firestore update failed, updating local state:', error);
  }

  // 2. Update local storage
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cached) {
      try {
        const list: Lead[] = JSON.parse(cached);
        const index = list.findIndex((l) => l.id === leadId);
        if (index !== -1) {
          list[index].status = newStatus;
          list[index].updatedAt = new Date();
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
        }
      } catch (e) {
        console.error('Error updating cached lead', e);
      }
    }
  }
}

export async function updateLeadProposalData(
  leadId: string, 
  data: { 
    proposalId?: string;
    proposalContent?: GeneratedProposal; 
    emailStatus?: EmailStatus; 
    proposalStatus?: ProposalStatus;
    sentAt?: Date;
    internalNotes?: string;
  }
): Promise<void> {
  // 1. Try Firestore
  try {
    if (db && !leadId.startsWith('lead-')) {
      const leadRef = doc(db, 'leads', leadId);
      await updateDoc(leadRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.warn('Firestore update failed, updating local state:', error);
  }

  // 2. Update Local Storage
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cached) {
      try {
        const list: Lead[] = JSON.parse(cached);
        const index = list.findIndex((l) => l.id === leadId);
        if (index !== -1) {
          list[index] = {
            ...list[index],
            ...data,
            updatedAt: new Date(),
          };
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
        }
      } catch (e) {
        console.error('Error updating cached lead proposal data', e);
      }
    }
  }
}

export async function updateLeadNotes(leadId: string, internalNotes: string): Promise<void> {
  return updateLeadProposalData(leadId, { internalNotes });
}

