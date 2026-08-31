export type ServiceCategoryKey = 'banking' | 'utility' | 'travel' | 'egov' | 'insurance';

export interface SubServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  iconName: string;
  badge?: string;
  imageSrc?: string;
  features?: string[];
  popular?: boolean;
  link?: string;
}

export interface ServiceCategory {
  id: ServiceCategoryKey;
  title: string;
  navTitle: string;
  shortDesc: string;
  iconName: string;
  highlightPill: string;
  services: SubServiceItem[];
}

export interface FeatureItem {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  iconName: string;
  stat?: string;
  statLabel?: string;
}

export interface ChannelItem {
  id: string;
  name: string;
  subtitle: string;
  iconName: string;
  tag: string;
  features: string[];
  specs: { label: string; value: string }[];
  highlight: string;
}

export interface ComparisonCardItem {
  id: string;
  title: string;
  iconName: string;
  withAsthaPay: {
    heading: string;
    points: string[];
    highlightTag: string;
  };
  withoutAsthaPay: {
    alertHeading: string;
    description: string;
    costImpact: string;
  };
}

export interface NavDropdownItem {
  title: string;
  description?: string;
  href: string;
  iconName?: string;
  badge?: string;
}

export interface NavSection {
  title: string;
  items: NavDropdownItem[];
}
