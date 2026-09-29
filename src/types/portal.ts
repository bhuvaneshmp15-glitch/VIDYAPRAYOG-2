export type PortalId = 'industry' | 'governance' | 'candidate';

export interface PortalSection {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  iconName: string;
  badge?: string;
}

export interface PortalTheme {
  primary: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  activeBorder: string;
  accentBg: string;
  accentText: string;
  lightGlow: string;
}

export interface PortalConfig {
  id: PortalId;
  name: string;
  shortName: string;
  badge: string;
  description: string;
  iconName: string;
  buttonText: string;
  theme: PortalTheme;
  sections: PortalSection[];
  defaultTenantName: string;
  tenantRole: string;
}

export interface MetricItem {
  label: string;
  value: string;
  change: string;
  subtext: string;
  trend: 'up' | 'down' | 'neutral';
}
