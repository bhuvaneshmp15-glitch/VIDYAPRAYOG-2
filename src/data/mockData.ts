import { PortalConfig, MetricItem } from '../types/portal';

export const LOGIN_HERO_METRICS: MetricItem[] = [
  {
    label: "Live Job Signals Ingested",
    value: "1,428,500+",
    change: "+14.8% this week",
    subtext: "Aggregated from verified job portals & returns",
    trend: "up"
  },
  {
    label: "Districts Monitored",
    value: "766 Districts",
    change: "36 States / UTs active",
    subtext: "Granular micro-cluster demand telemetry across India",
    trend: "neutral"
  },
  {
    label: "Curricula Mapped to NSQF",
    value: "1,840 Active Trades",
    change: "94.2% match rate",
    subtext: "Aligned with national qualification standards",
    trend: "up"
  }
];

export const PORTALS: Record<string, PortalConfig> = {
  industry: {
    id: 'industry',
    name: 'Industry & Employer Portal',
    shortName: 'Industry Portal',
    badge: 'Demand Sensing & Validation',
    description: 'Direct industry feedback loop: Post job signals, validate vocational curricula, and track 90-day post-hire readiness.',
    iconName: 'Building2',
    buttonText: 'Enter Employer Console →',
    defaultTenantName: 'Tata Electronics & Precision Eng. Cluster',
    tenantRole: 'Tier-1 Industrial Partner',
    theme: {
      primary: '#2563EB',
      badgeBg: 'bg-blue-50/80',
      badgeText: 'text-blue-700',
      badgeBorder: 'border-blue-200',
      activeBorder: 'border-blue-600',
      accentBg: 'bg-blue-50',
      accentText: 'text-blue-700',
      lightGlow: 'rgba(37, 99, 235, 0.08)'
    },
    sections: [
      {
        id: 'job-demand',
        title: 'Job Demand & Postings',
        shortTitle: 'Job Demand & Postings',
        description: 'Live job feeds and open vacancies',
        iconName: 'TrendingUp'
      },
      {
        id: 'skill-surveys',
        title: 'Company Skill Surveys',
        shortTitle: 'Company Skill Surveys',
        description: 'Quarterly tools and skill needs',
        iconName: 'ClipboardCheck'
      },
      {
        id: 'syllabus-review',
        title: 'Syllabus Review',
        shortTitle: 'Syllabus Review',
        description: 'Check and approve new course topics',
        iconName: 'FileCheck2'
      },
      {
        id: 'graduate-ratings',
        title: 'Graduate Work Ratings',
        shortTitle: 'Graduate Work Ratings',
        description: '90-day review of fresh hires',
        iconName: 'Award'
      }
    ]
  },
  governance: {
    id: 'governance',
    name: 'Governance & Academic Planning Console',
    shortName: 'Governance Console',
    badge: 'Intelligence & Policy Alignment',
    description: 'Macro analytics for state skill development missions, curriculum alignment engines, and district capacity planners.',
    iconName: 'Landmark',
    buttonText: 'Enter Governance Console →',
    defaultTenantName: 'State Skill Development Mission (SSDM)',
    tenantRole: 'District Nodal Directorate',
    theme: {
      primary: '#6366F1',
      badgeBg: 'bg-indigo-50/80',
      badgeText: 'text-indigo-700',
      badgeBorder: 'border-indigo-200',
      activeBorder: 'border-indigo-600',
      accentBg: 'bg-indigo-50',
      accentText: 'text-indigo-700',
      lightGlow: 'rgba(99, 102, 241, 0.08)'
    },
    sections: [
      {
        id: 'district-map',
        title: 'District Skill Map',
        shortTitle: 'District Skill Map',
        description: 'Shortages by district and job role',
        iconName: 'LayoutGrid'
      },
      {
        id: 'syllabus-fixer',
        title: 'Syllabus Fixer',
        shortTitle: 'Syllabus Fixer',
        description: 'Automated skill gap match & updates',
        iconName: 'Cpu'
      },
      {
        id: 'outdated-courses',
        title: 'Outdated Courses',
        shortTitle: 'Outdated Courses',
        description: 'Flag dead and overcrowded trades',
        iconName: 'AlertTriangle'
      },
      {
        id: 'district-budgets',
        title: 'District Lab & Budgets',
        shortTitle: 'District Lab & Budgets',
        description: 'New machine budgets and teacher training',
        iconName: 'Wrench'
      }
    ]
  },
  candidate: {
    id: 'candidate',
    name: 'Candidate & Trainee Portal',
    shortName: 'Candidate Portal',
    badge: 'Career Pathways & Diagnostics',
    description: 'Learner-centric guidance: Diagnose skill proficiencies, explore regional high-wage trades, and unlock verified credentials.',
    iconName: 'GraduationCap',
    buttonText: 'Enter Candidate Portal →',
    defaultTenantName: 'Aarav Sharma (Trainee ID: LMI-9042)',
    tenantRole: 'Advanced Mechatronics Apprentice',
    theme: {
      primary: '#059669',
      badgeBg: 'bg-emerald-50/80',
      badgeText: 'text-emerald-700',
      badgeBorder: 'border-emerald-200',
      activeBorder: 'border-emerald-600',
      accentBg: 'bg-emerald-50',
      accentText: 'text-emerald-700',
      lightGlow: 'rgba(5, 150, 105, 0.08)'
    },
    sections: [
      {
        id: 'skill-test',
        title: 'Skill Test & Score',
        shortTitle: 'Skill Test & Score',
        description: 'Diagnostics & Deficit Triage',
        iconName: 'Activity'
      },
      {
        id: 'career-roadmap',
        title: 'Career Roadmap',
        shortTitle: 'Career Roadmap',
        description: 'Domain Placement Trajectories & Skill Trees',
        iconName: 'GitFork'
      },
      {
        id: 'certificates-jobs',
        title: 'My Certificates & Jobs',
        shortTitle: 'My Certificates & Jobs',
        description: 'Verified Credential Wallet & 1-Click Cluster Apply',
        iconName: 'BadgeCheck'
      }
    ]
  }
};
