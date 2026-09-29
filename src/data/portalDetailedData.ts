export interface ScraperFeed {
  id: string;
  source: string;
  count: string;
  growth: string;
  lastSync: string;
  status: 'active' | 'syncing';
}

export interface JobRequisition {
  id: string;
  title: string;
  cluster: string;
  nsqfLevel: number;
  openings: number;
  salaryRange: string;
  status: 'Live' | 'Screening' | 'Draft';
  skillsRequired: string[];
  datePosted: string;
}

export interface SyllabusItem {
  moduleNumber: string;
  topic: string;
  hours: number;
  nsqfAlignment: string;
  status: 'unchanged' | 'modified' | 'added' | 'deprecated';
  note?: string;
}

export const INDUSTRY_TELEMETRY = {
  activeVacanciesTotal: 27650,
  verifiedEmployers: 1420,
  ingestedSignalsToday: 4890,
  scraperFeeds: [
    { id: '1', source: 'State Employment Exchange & Rojgar Mela', count: '12,400 signals', growth: '+18.5%', lastSync: '12m ago', status: 'active' },
    { id: '2', source: 'Naukri.com Industrial & Blue-Collar Feed', count: '7,850 signals', growth: '+9.2%', lastSync: '3m ago', status: 'active' },
    { id: '3', source: 'LinkedIn India Tech & Manufacturing Hub', count: '4,290 signals', growth: '+22.1%', lastSync: 'Just now', status: 'active' },
    { id: '4', source: 'Indeed & Glassdoor Regional Scraper', count: '3,110 signals', growth: '+5.4%', lastSync: '25m ago', status: 'active' }
  ] as ScraperFeed[],
  jobRequisitions: [
    {
      id: 'REQ-2025-081',
      title: 'CNC Turn-Mill Precision Machinist',
      cluster: 'Pune Automotive Corridor (Chakan)',
      nsqfLevel: 5,
      openings: 45,
      salaryRange: '₹22,000 - ₹28,000 / mo',
      status: 'Live',
      skillsRequired: ['Fanuc G-Code', '5-Axis Machining', 'Geometric Dimensioning & Tolerancing (GD&T)', 'CMM Inspection'],
      datePosted: 'Today, 09:30 AM'
    },
    {
      id: 'REQ-2025-082',
      title: 'EV Battery Pack & BMS Assembly Technician',
      cluster: 'Hosur-Bengaluru EV Manufacturing Belt',
      nsqfLevel: 4,
      openings: 60,
      salaryRange: '₹24,000 - ₹30,000 / mo',
      status: 'Screening',
      skillsRequired: ['High-Voltage Safety NFPA 70E', 'BMS Diagnostics', 'Spot & Laser Welding', 'CAN Bus Telemetry'],
      datePosted: 'Yesterday'
    },
    {
      id: 'REQ-2025-083',
      title: 'Industrial Automation & PLC Technician',
      cluster: 'Sanand Industrial Estate, Gujarat',
      nsqfLevel: 5,
      openings: 28,
      salaryRange: '₹26,000 - ₹34,000 / mo',
      status: 'Live',
      skillsRequired: ['Siemens S7-1200', 'SCADA Interfacing', 'Pneumatic Actuators', 'Predictive Maintenance'],
      datePosted: '2 days ago'
    },
    {
      id: 'REQ-2025-084',
      title: 'Solar PV Grid Inverter Maintenance Lead',
      cluster: 'Bhadla-Jodhpur Renewable Zone',
      nsqfLevel: 6,
      openings: 18,
      salaryRange: '₹30,000 - ₹40,000 / mo',
      status: 'Live',
      skillsRequired: ['Central Inverter Diagnostics', 'HT Substation Protocol', 'IEC 61215 Standards', 'Thermography'],
      datePosted: '3 days ago'
    }
  ] as JobRequisition[]
};

export const SYLLABUS_DIFF_DATA = {
  courseCode: 'DGT/CTS/AUTO-04',
  courseName: 'Mechanic Electric Vehicle (CTS - Trade Code 491)',
  nsqfTargetLevel: 5,
  currentRevision: 'Rev 2021.2 (Legacy)',
  proposedRevision: 'Rev 2025.1 (Industry Proposed)',
  validationStatus: 'Pending Final Industry Sign-Off',
  lastUpdated: '18 Sept 2026',
  currentSyllabus: [
    { moduleNumber: 'MOD-01', topic: 'Lead-Acid Battery Maintenance & Specific Gravity Testing', hours: 40, nsqfAlignment: 'Level 3', status: 'deprecated', note: 'Obsolete: Industry has transitioned to Lithium-Ion LFP/NMC' },
    { moduleNumber: 'MOD-02', topic: 'DC Shunt Motor Wiring & Carbon Brush Replacement', hours: 35, nsqfAlignment: 'Level 4', status: 'deprecated', note: 'Deprecated: BLDC & PMSM motors are modern standard' },
    { moduleNumber: 'MOD-03', topic: 'Basic Relay & Fuse Box Harnessing', hours: 30, nsqfAlignment: 'Level 4', status: 'unchanged', note: 'Retained as foundational electronics' },
    { moduleNumber: 'MOD-04', topic: 'Conventional Hydraulic Brake Overhaul', hours: 45, nsqfAlignment: 'Level 4', status: 'modified', note: 'Needs regeneration braking integration' }
  ] as SyllabusItem[],
  proposedSyllabus: [
    { moduleNumber: 'MOD-01', topic: 'Li-Ion Battery Pack Architecture, Thermal Runaway Mitigation & Cell Balancing', hours: 55, nsqfAlignment: 'Level 5', status: 'added', note: 'Mandatory standard for Automotive Industry 4.0' },
    { moduleNumber: 'MOD-02', topic: 'PMSM & BLDC Traction Drive Diagnostics with Field-Oriented Control (FOC)', hours: 50, nsqfAlignment: 'Level 5', status: 'added', note: 'Includes regenerative braking control loops' },
    { moduleNumber: 'MOD-03', topic: 'CAN Bus & LIN Bus High-Speed Protocol Packet Sniffing & OBD-II Analysis', hours: 40, nsqfAlignment: 'Level 5', status: 'added', note: 'Replaces conventional relay-only harness testing' },
    { moduleNumber: 'MOD-04', topic: 'High-Voltage Safety Protocol (Up to 800V DC) & ISO 26262 Functional Safety', hours: 35, nsqfAlignment: 'Level 5', status: 'added', note: 'Includes Lockout-Tagout (LOTO) and personal protective glove certification' }
  ] as SyllabusItem[]
};

export const GOVERNANCE_HEATMAP_DATA = [
  { district: 'Pune Cluster (MH)', trade: 'Precision CNC Machining', nsqfLevel: 5, demandIndex: 94, supplyIndex: 61, gapRatio: '+33% Deficit', status: 'High Deficit' },
  { district: 'Bengaluru Urban (KA)', trade: 'Embedded IoT & Robotics', nsqfLevel: 6, demandIndex: 98, supplyIndex: 54, gapRatio: '+44% Deficit', status: 'Critical Deficit' },
  { district: 'Gurugram-Manesar (HR)', trade: 'EV Powertrain Assembly', nsqfLevel: 5, demandIndex: 91, supplyIndex: 58, gapRatio: '+33% Deficit', status: 'High Deficit' },
  { district: 'Coimbatore (TN)', trade: 'Foundry & Metallurgy Automation', nsqfLevel: 4, demandIndex: 78, supplyIndex: 72, gapRatio: '+6% Balanced', status: 'Balanced' },
  { district: 'Ahmedabad (GJ)', trade: 'Chemical Plant Operator', nsqfLevel: 4, demandIndex: 86, supplyIndex: 52, gapRatio: '+34% Deficit', status: 'High Deficit' },
  { district: 'Ernakulam (KL)', trade: 'Marine Diesel & Hydraulics', nsqfLevel: 5, demandIndex: 74, supplyIndex: 82, gapRatio: '-8% Surplus', status: 'Mild Surplus' },
  { district: 'Kanpur Nagar (UP)', trade: 'Traditional Desktop Publishing', nsqfLevel: 3, demandIndex: 22, supplyIndex: 89, gapRatio: '-67% Oversupply', status: 'Rationalize' }
];

export const OBSOLETE_TRADES_DATA = [
  {
    id: 'OBS-01',
    tradeName: 'Desktop Publishing Operator (Manual Offset)',
    district: 'Kanpur & Gorakhpur (UP)',
    annualGraduates: 4200,
    placementRate: '14.2%',
    recommendedAction: 'Modernize trade to "UI/UX & Digital Media Specialist" (NSQF 5)',
    priority: 'Immediate',
    annualBudgetSavings: '₹3.4 Cr reallocated to AI & Media Labs'
  },
  {
    id: 'OBS-02',
    tradeName: 'Secretarial Practice (Traditional Typewriting 30 WPM)',
    district: 'Patna & Muzaffarpur (BR)',
    annualGraduates: 3100,
    placementRate: '11.8%',
    recommendedAction: 'Transition to "Cloud Office Productivity & Data Associate" (NSQF 4)',
    priority: 'Immediate',
    annualBudgetSavings: '₹2.8 Cr reallocated'
  },
  {
    id: 'OBS-03',
    tradeName: 'Mechanic Diesel (Euro-II Engine Tuning)',
    district: 'Coimbatore & Madurai (TN)',
    annualGraduates: 2900,
    placementRate: '38.5%',
    recommendedAction: 'Upgrade syllabus to "Hybrid & Dual-Fuel Engine Diagnostics" (NSQF 5)',
    priority: 'High',
    annualBudgetSavings: '₹1.9 Cr equipment upgrade'
  }
];

export const CANDIDATE_RADAR_DATA = [
  { skill: 'Blueprint & CAD Reading', score: 88, benchmark: 75 },
  { skill: 'Electrical Diagnostics & CAN', score: 72, benchmark: 80 },
  { skill: 'Safety & NFPA Compliance', score: 94, benchmark: 85 },
  { skill: 'PLC & Logic Programming', score: 64, benchmark: 75 },
  { skill: 'Precision Metrology & GD&T', score: 85, benchmark: 70 },
  { skill: 'Hydraulics & Pneumatics', score: 79, benchmark: 72 }
];

export const REGIONAL_TRADES_DATA = [
  {
    id: 'TRD-01',
    title: 'Advanced Mechatronics & Robotics Technician',
    nsqfLevel: 5,
    duration: '2 Years (Dual Dual System of Training)',
    placementRate: '94.6%',
    medianSalary: '₹24,500 / month',
    openApprenticeships: 142,
    cluster: 'Pune Industrial Area',
    topRecruiters: ['Tata Motors', 'Bharat Forge', 'Kirloskar Pneumatic']
  },
  {
    id: 'TRD-02',
    title: 'EV Battery Management & High-Voltage Specialist',
    nsqfLevel: 5,
    duration: '1 Year (Fast-track Modular)',
    placementRate: '96.2%',
    medianSalary: '₹28,000 / month',
    openApprenticeships: 210,
    cluster: 'Hosur - Bengaluru Corridor',
    topRecruiters: ['Ola Electric', 'Ather Energy', 'TVS Motor Co']
  },
  {
    id: 'TRD-03',
    title: 'Precision CNC 5-Axis Turn-Mill Specialist',
    nsqfLevel: 5,
    duration: '2 Years (NCVT Certified)',
    placementRate: '92.1%',
    medianSalary: '₹23,000 / month',
    openApprenticeships: 98,
    cluster: 'Sanand & Rajkot Machine Tools Hub',
    topRecruiters: ['Jyoti CNC Automation', 'L&T Heavy Engineering']
  },
  {
    id: 'TRD-04',
    title: 'Solar Inverter & Micro-Grid Dispatch Operator',
    nsqfLevel: 4,
    duration: '1 Year (Suryamitra Certified)',
    placementRate: '88.5%',
    medianSalary: '₹21,000 / month',
    openApprenticeships: 85,
    cluster: 'Jodhpur Renewable Corridor',
    topRecruiters: ['Adani Green', 'Tata Power Solar', 'ReNew Power']
  }
];

export const CANDIDATE_CREDENTIALS = [
  {
    id: 'CRED-LMI-881',
    title: 'NSQF Level 5: Mechatronics & Industry 4.0 Systems',
    issuer: 'National Council for Vocational Education and Training (NCVET)',
    verifiedDate: '14 Aug 2026',
    credentialHash: '0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
    status: 'Verified DigiLocker',
    scoreObtained: '88.5% Distinction'
  },
  {
    id: 'CRED-LMI-882',
    title: 'High-Voltage EV Safety & Hazard Isolation (NFPA 70E)',
    issuer: 'Automotive Skills Development Council (ASDC)',
    verifiedDate: '02 Sept 2026',
    credentialHash: '0x94b3211a76e93c129e1fa1878b209cb14c40d8924b1f637731adcc18921df12e',
    status: 'Verified DigiLocker',
    scoreObtained: '94% Grade A+'
  },
  {
    id: 'CRED-LMI-883',
    title: 'Industrial PLC Ladder Logic & Siemens TIA Portal',
    issuer: 'Siemens Technical Academy & NCVET',
    verifiedDate: '10 Sept 2026',
    credentialHash: '0x2a9108c48a731b8ef091a13382c448bb9321f43501a4e109d949827ca18b100e',
    status: 'Verified DigiLocker',
    scoreObtained: '91% Honors'
  }
];
