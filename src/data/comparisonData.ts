import { ComparisonCardItem } from '../types';

export const comparisonData: ComparisonCardItem[] = [
  {
    id: 'reports',
    title: 'Reconciliation & Reports',
    iconName: 'FileSpreadsheet',
    withAsthaPay: {
      heading: 'Automated 1-Click Multi-Bank Reconciliation',
      points: [
        'Daily 3-way bank switch auto-reconciliation',
        'Auto 194N TDS & GST invoice generation',
        'Instant export in Excel, CSV, and PDF'
      ],
      highlightTag: 'Zero Manual Work'
    },
    withoutAsthaPay: {
      alertHeading: 'Manual Excel Chaos',
      description: 'Hours spent reconciling disparate bank statements, causing balance mismatches.',
      costImpact: '₹15,000 - ₹40,000/mo accounting loss'
    }
  },
  {
    id: 'notifications',
    title: 'Notifications & Alerts',
    iconName: 'BellRing',
    withAsthaPay: {
      heading: 'Instant Push, SMS & WhatsApp Alerts',
      points: [
        'Free transactional push alerts to retailers',
        'Branded WhatsApp notifications on commission',
        'Low wallet balance emergency triggers'
      ],
      highlightTag: 'Pre-Integrated'
    },
    withoutAsthaPay: {
      alertHeading: 'Costly SMS Gateways',
      description: 'High SMS costs with frequent DLT template rejections and delivery drops.',
      costImpact: '₹8,000 - ₹25,000/mo extra messaging cost'
    }
  },
  {
    id: 'server',
    title: 'Cloud Infrastructure',
    iconName: 'Server',
    withAsthaPay: {
      heading: 'Auto-Scaling Cloud with 99.99% Uptime',
      points: [
        'Auto-scaling load balancers with DDoS shield',
        'PCI-DSS compliant bank-grade security',
        'Zero DevOps maintenance required'
      ],
      highlightTag: 'Zero Hosting Bills'
    },
    withoutAsthaPay: {
      alertHeading: 'DevOps & Server Headaches',
      description: 'Requires dedicated servers, DBA engineers, and 24/7 crash monitoring.',
      costImpact: '₹10,000 - ₹50,000/mo server expense'
    }
  },
  {
    id: 'apis',
    title: 'Multi-Bank Switches',
    iconName: 'GitMerge',
    withAsthaPay: {
      heading: 'Redundant Multi-Bank Routing',
      points: [
        'Direct links with ICICI, Axis, YES Bank & NSDL',
        'Dynamic failover if any partner bank is down',
        'Single unified wallet balance across 25+ services'
      ],
      highlightTag: 'Highest Success Rate'
    },
    withoutAsthaPay: {
      alertHeading: 'Single-Bank Downtime',
      description: 'High failure rates during bank outages. Direct bank security deposits cost lakhs.',
      costImpact: '₹5L - ₹15L bank deposit lock-in'
    }
  },
  {
    id: 'ui-control',
    title: 'White-Label Branding',
    iconName: 'Palette',
    withAsthaPay: {
      heading: '100% Brand Customization',
      points: [
        'Your logo, theme colors, and custom domain',
        'Your Google Play Store branded APK/AAB',
        'Customizable commission slabs and banners'
      ],
      highlightTag: 'Your Own Brand'
    },
    withoutAsthaPay: {
      alertHeading: 'Generic Vendor Templates',
      description: 'Rigid vendor templates with competitor logos, diluting your brand loyalty.',
      costImpact: 'Weakens customer trust & retention'
    }
  },
  {
    id: 'automation',
    title: 'Commission Splits',
    iconName: 'Coins',
    withAsthaPay: {
      heading: 'Real-Time Commission Splits',
      points: [
        'Instant multi-tier margin distribution',
        'Custom fixed vs percentage slab hierarchies',
        'Automated dispute & chargeback defense'
      ],
      highlightTag: 'Instant Margin'
    },
    withoutAsthaPay: {
      alertHeading: 'Manual Monthly Payouts',
      description: 'Delayed month-end payouts causing distributor friction and agent churn.',
      costImpact: 'High retailer churn & dispute overhead'
    }
  }
];
