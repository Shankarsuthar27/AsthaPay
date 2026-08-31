import { ChannelItem } from '../types';

export const omniChannelsData: ChannelItem[] = [
  {
    id: 'web-portal',
    name: 'Web Portal',
    subtitle: 'Responsive Web Portal for Distributors & Agents',
    iconName: 'Monitor',
    tag: 'Web Platform',
    highlight: 'Instant white-label setup with your custom domain & brand colors',
    features: [
      'Unified login for Retailers, Distributors & Admins',
      'Real-time transaction & settlement ledger',
      'Instant branding banner & certificate generator',
      'Two-Factor Authentication (2FA) & IP control'
    ],
    specs: [
      { label: 'Platform', value: 'Cloud SaaS' },
      { label: 'Domain', value: 'Custom CNAME' },
      { label: 'Security', value: '256-bit AES' },
      { label: 'Uptime', value: '99.99% SLA' }
    ]
  },
  {
    id: 'android-app',
    name: 'Android Mobile App',
    subtitle: 'High-Performance White-Label Mobile App',
    iconName: 'Smartphone',
    tag: 'Mobile App',
    highlight: 'Ready-to-publish APK/AAB package for Google Play Store',
    features: [
      'Biometric RD service (Mantra, Morpho, Startek)',
      'Push alerts for commission credits & updates',
      'Thermal Bluetooth printer SDK support',
      'Biometric fingerprint app unlock'
    ],
    specs: [
      { label: 'OS', value: 'Android 8.0+' },
      { label: 'Biometrics', value: 'All RD Devices' },
      { label: 'App Size', value: '< 18 MB' },
      { label: 'Publish', value: 'Play Store Ready' }
    ]
  },
  {
    id: 'wpos-device',
    name: 'WPOS & Micro ATM',
    subtitle: 'Smart Handheld Android POS Terminal',
    iconName: 'CreditCard',
    tag: 'Hardware POS',
    highlight: 'Integrated card reader, biometric sensor, and printer',
    features: [
      'EMV Level 1 & 2 certified card slot',
      'High-speed 58mm thermal receipt printer',
      '5200mAh battery for all-day field usage',
      'Pre-installed locked kiosk security'
    ],
    specs: [
      { label: 'Network', value: '4G LTE + Wi-Fi' },
      { label: 'Certified', value: 'PCI-PTS / EMV' },
      { label: 'Printer', value: '58mm Thermal' },
      { label: 'Battery', value: '5200mAh Li-ion' }
    ]
  },
  {
    id: 'enterprise-api',
    name: 'Enterprise REST APIs',
    subtitle: 'High-Speed Developer APIs & Webhooks',
    iconName: 'Code2',
    tag: 'Developer APIs',
    highlight: 'Integrate banking, BBPS, and payout switches directly',
    features: [
      'JSON REST endpoints with <150ms switch response',
      'Real-time automated webhooks for callbacks',
      'Postman collection & Python / Node SDKs',
      'Sandbox environment with test simulators'
    ],
    specs: [
      { label: 'Latency', value: '< 150ms' },
      { label: 'Format', value: 'REST / Webhooks' },
      { label: 'Testing', value: 'Instant Sandbox' },
      { label: 'Throughput', value: '10,000+ TPS' }
    ]
  }
];
