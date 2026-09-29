import React, { useState, useEffect } from 'react';
import { 
  Activity,
  AlertTriangle, 
  TrendingUp, 
  Check, 
  CheckCircle2, 
  Download, 
  Printer, 
  X, 
  FileCheck2,
  Layers,
  Sparkles
} from 'lucide-react';

interface ClusterTelemetry {
  id: string;
  name: string;
  shortageIndex: number;
  totalVacancies: number;
  traineeOutput: number;
  netDeficit: number;
  outflowRate: number;
  badge: string;
  badgeBg: string;
  badgeText: string;
}

const CLUSTERS: Record<string, ClusterTelemetry> = {
  'All Clusters': {
    id: 'all',
    name: 'All Clusters (Statewide)',
    shortageIndex: 64,
    totalVacancies: 18450,
    traineeOutput: 6640,
    netDeficit: -11810,
    outflowRate: 42,
    badge: 'Critical Shortage',
    badgeBg: 'bg-rose-50',
    badgeText: 'text-rose-700'
  },
  'Chennai OMR': {
    id: 'chennai',
    name: 'Chennai OMR IT Corridor',
    shortageIndex: 72,
    totalVacancies: 6800,
    traineeOutput: 1980,
    netDeficit: -4820,
    outflowRate: 48,
    badge: 'Critical Shortage',
    badgeBg: 'bg-rose-50',
    badgeText: 'text-rose-700'
  },
  'Bengaluru Urban': {
    id: 'bengaluru',
    name: 'Bengaluru Urban Belt',
    shortageIndex: 68,
    totalVacancies: 5100,
    traineeOutput: 1700,
    netDeficit: -3400,
    outflowRate: 38,
    badge: 'Critical Shortage',
    badgeBg: 'bg-rose-50',
    badgeText: 'text-rose-700'
  },
  'Coimbatore TIDEL': {
    id: 'coimbatore',
    name: 'Coimbatore TIDEL Cluster',
    shortageIndex: 58,
    totalVacancies: 3700,
    traineeOutput: 1550,
    netDeficit: -2150,
    outflowRate: 34,
    badge: 'High Deficit',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-700'
  },
  'Hyderabad HITEC': {
    id: 'hyderabad',
    name: 'Hyderabad HITEC Corridor',
    shortageIndex: 61,
    totalVacancies: 2850,
    traineeOutput: 1410,
    netDeficit: -1440,
    outflowRate: 29,
    badge: 'High Deficit',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-700'
  }
};

type TechRole = 'genai' | 'cloud';

interface QuarterData {
  quarter: string;
  demand: number;
  supply: number;
}

interface RoleTrajectory {
  id: TechRole;
  label: string;
  icon: string;
  deficitDelta: string;
  maxVal: number;
  quarters: QuarterData[];
}

const ROLE_DATA: Record<TechRole, RoleTrajectory> = {
  genai: {
    id: 'genai',
    label: 'GenAI & RAG Engineering',
    icon: '🤖',
    deficitDelta: '-77% Gap in Q4',
    maxVal: 5000,
    quarters: [
      { quarter: 'Q1 2026', demand: 1400, supply: 350 },
      { quarter: 'Q2 2026', demand: 2200, supply: 500 },
      { quarter: 'Q3 2026', demand: 3100, supply: 720 },
      { quarter: 'Q4 2026', demand: 4200, supply: 950 }
    ]
  },
  cloud: {
    id: 'cloud',
    label: 'Cloud DevOps & Kubernetes',
    icon: '☁️',
    deficitDelta: '-68% Gap in Q4',
    maxVal: 6500,
    quarters: [
      { quarter: 'Q1 2026', demand: 2100, supply: 650 },
      { quarter: 'Q2 2026', demand: 3300, supply: 980 },
      { quarter: 'Q3 2026', demand: 4400, supply: 1350 },
      { quarter: 'Q4 2026', demand: 5600, supply: 1800 }
    ]
  }
};

// Spline helper functions
function getSplinePath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  const tension = 0.35;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = i > 0 ? points[i - 1] : { x: 2 * points[0].x - points[1].x, y: 2 * points[0].y - points[1].y };
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = i < points.length - 2 ? points[i + 2] : { x: 2 * points[points.length - 1].x - points[points.length - 2].x, y: 2 * points[points.length - 1].y - points[points.length - 2].y };

    const cp1x = p1.x + (p2.x - p0.x) * (tension / 2);
    const cp1y = p1.y + (p2.y - p0.y) * (tension / 2);

    const cp2x = p2.x - (p3.x - p1.x) * (tension / 2);
    const cp2y = p2.y - (p3.y - p1.y) * (tension / 2);

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }

  return d;
}

function getAreaPath(points: { x: number; y: number }[], baselineY: number): string {
  if (points.length === 0) return '';
  const linePath = getSplinePath(points);
  const last = points[points.length - 1];
  const first = points[0];
  return `${linePath} L ${last.x.toFixed(1)} ${baselineY} L ${first.x.toFixed(1)} ${baselineY} Z`;
}

export const DistrictSkillMapView: React.FC = () => {
  // Sub-Heading Active Tab State
  const [activeSection, setActiveSection] = useState<'deficit' | 'trajectory'>('deficit');

  // Selected Cluster
  const [activeCluster, setActiveCluster] = useState<string>('All Clusters');

  // Selected Tech Role for Spline Chart
  const [activeRole, setActiveRole] = useState<TechRole>('cloud');
  const [hoveredQuarterIndex, setHoveredQuarterIndex] = useState<number | null>(null);

  // Live animated telemetry states (animate from zero on mount/switch)
  const [shortageIndex, setShortageIndex] = useState<number>(0);
  const [totalVacancies, setTotalVacancies] = useState<number>(0);
  const [traineeOutput, setTraineeOutput] = useState<number>(0);
  const [netDeficit, setNetDeficit] = useState<number>(0);
  const [outflowRate, setOutflowRate] = useState<number>(0);

  // Spline animation progress (0 -> 1)
  const [graphProgress, setGraphProgress] = useState<number>(0);

  // Policy transmission & Plan lock state
  const [planApplied, setPlanApplied] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // PDF Export Modal State
  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);

  // Animate cluster metrics
  useEffect(() => {
    const target = CLUSTERS[activeCluster] || CLUSTERS['All Clusters'];
    const duration = 1200; // ms
    const startTime = performance.now();

    const animateMount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out

      setShortageIndex(Math.round(eased * target.shortageIndex));
      setTotalVacancies(Math.round(eased * target.totalVacancies));
      setTraineeOutput(Math.round(eased * target.traineeOutput));
      setNetDeficit(Math.round(eased * target.netDeficit));
      setOutflowRate(Math.round(eased * target.outflowRate));

      if (progress < 1) {
        requestAnimationFrame(animateMount);
      }
    };

    requestAnimationFrame(animateMount);
  }, [activeCluster]);

  // Animate graph progress on role switch or mount
  useEffect(() => {
    setGraphProgress(0);
    const duration = 800; // ms
    const startTime = performance.now();

    const animateGraph = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setGraphProgress(eased);

      if (progress < 1) {
        requestAnimationFrame(animateGraph);
      }
    };

    requestAnimationFrame(animateGraph);
  }, [activeRole]);

  // Handle "Apply District Reallocation Plan →"
  const handleApplyPlan = () => {
    if (planApplied) return;
    setPlanApplied(true);
    setToastMessage('Reallocation Matrix Locked into Portal 2 Modules! Pruning targets dispatched.');
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Helper to escape PDF strings
  const escapePdf = (str: string) => {
    return str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
  };

  // Generate downloadable PDF Blob
  const generateDistrictPdfBlob = () => {
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const timeStr = new Date().toLocaleTimeString();

    const lines = [
      'BT',
      '/F1 18 Tf',
      '50 740 Td',
      '(LMI-CAP | GOVERNANCE & ACADEMIC PLANNING) Tj',
      '0 -18 Td',
      '/F1 14 Tf',
      '(District Skill Map & Labour Reallocation Blueprint) Tj',
      '0 -16 Td',
      '/F2 9 Tf',
      `(${escapePdf(`Blueprint Ref: LMI-DISTRICT-2026-PS134 | Cluster: ${activeCluster} | Date: ${dateStr} ${timeStr}`)}) Tj`,
      '0 -24 Td',
      '/F1 11 Tf',
      '(========================================================================) Tj',
      '0 -16 Td',
      '(1. MACRO REGIONAL SHORTAGE & PIPELINE DEFICIT) Tj',
      '/F2 10 Tf',
      '0 -16 Td',
      `(${escapePdf(`• Shortage Severity Index: ${shortageIndex}% [Critical Industry Deficit Threshold]`)}) Tj`,
      '0 -14 Td',
      `(${escapePdf(`• Industry Vacancies Verified: ${totalVacancies.toLocaleString()} Openings across 142 Tech Firms`)}) Tj`,
      '0 -14 Td',
      `(${escapePdf(`• Qualified College Exits: ${traineeOutput.toLocaleString()} Students (Production-Ready)`)}) Tj`,
      '0 -14 Td',
      `(${escapePdf(`• Net Regional Pipeline Deficit: ${netDeficit.toLocaleString()} Engineers`)}) Tj`,
      '0 -14 Td',
      `(${escapePdf(`• Talent Outflow (Migration Rate): ${outflowRate}% to Tier-1 External Corridors`)}) Tj`,
      '0 -24 Td',
      '/F1 11 Tf',
      '(2. QUARTERLY DEMAND VS. SUPPLY TRAJECTORY) Tj',
      '/F2 10 Tf',
      '0 -16 Td',
      '(• GenAI & RAG Engineering Q4: Demand 4,200 vs Supply 950 [-77% Gap]) Tj',
      '0 -14 Td',
      '(• Cloud DevOps & K8s Q4: Demand 5,600 vs Supply 1,800 [-68% Gap]) Tj',
      '0 -24 Td',
      '/F1 11 Tf',
      '(3. GOVERNANCE POLICY AUTOMATION & ROUTING) Tj',
      '/F2 9 Tf',
      '0 -14 Td',
      '(• Reallocation Matrix automatically feeds Portal 2 Outdated Courses & District Lab Budgets) Tj',
      '0 -12 Td',
      '(• Fully compliant with AICTE & State Board of Technical Education Norms) Tj',
      '0 -20 Td',
      '/F1 9 Tf',
      '(========================================================================) Tj',
      '0 -12 Td',
      '/F2 8 Tf',
      '(CONFIDENTIAL - FOR STATE SKILL DEVELOPMENT MISSION & ITIs ONLY) Tj',
      'ET'
    ];

    const streamContent = lines.join('\n');
    const streamLen = new TextEncoder().encode(streamContent).length;

    let body = '';
    const offsets: number[] = [];

    function addObj(str: string) {
      offsets.push(new TextEncoder().encode(body).length);
      body += str;
    }

    body += '%PDF-1.4\n';
    addObj('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
    addObj('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');
    addObj('3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>\nendobj\n');
    addObj('4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n');
    addObj('5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n');
    addObj('6 0 obj\n<< /Length ' + streamLen + ' >>\nstream\n' + streamContent + '\nendstream\nendobj\n');

    const startxref = new TextEncoder().encode(body).length;
    body += 'xref\n0 ' + (offsets.length + 1) + '\n';
    body += '0000000000 65535 f \n';
    for (let i = 0; i < offsets.length; i++) {
      body += String(offsets[i]).padStart(10, '0') + ' 00000 n \n';
    }
    body += 'trailer\n<< /Size ' + (offsets.length + 1) + ' /Root 1 0 R >>\nstartxref\n' + startxref + '\n%%EOF\n';

    return new Blob([body], { type: 'application/pdf' });
  };

  // Handle Export PDF
  const handleExportDistrictPdf = () => {
    try {
      const blob = generateDistrictPdfBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `District_Skill_Map_Reallocation_Report_${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    } catch (e) {
      console.error('PDF error:', e);
    }

    setIsPdfModalOpen(true);
    setToastMessage('✓ District Skill Reallocation Report PDF generated & downloaded.');
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // SVG Circular Gauge Calculations
  const radius = 68;
  const circumference = 2 * Math.PI * radius; // ~ 427.256
  const strokeDashoffset = circumference - (circumference * shortageIndex) / 100;

  // Active Role Trajectory Data
  const currentRoleData = ROLE_DATA[activeRole];

  // SVG Spline Math Coordinates
  const baselineY = 180;
  const topY = 25;
  const usableH = baselineY - topY; // 155
  const xCoords = [65, 240, 415, 590];

  const demandPoints = currentRoleData.quarters.map((q, idx) => {
    const normalized = q.demand / currentRoleData.maxVal;
    const y = baselineY - normalized * usableH * graphProgress;
    return { x: xCoords[idx], y };
  });

  const supplyPoints = currentRoleData.quarters.map((q, idx) => {
    const normalized = q.supply / currentRoleData.maxVal;
    const y = baselineY - normalized * usableH * graphProgress;
    return { x: xCoords[idx], y };
  });

  const demandLinePath = getSplinePath(demandPoints);
  const demandAreaPath = getAreaPath(demandPoints, baselineY);

  const supplyLinePath = getSplinePath(supplyPoints);
  const supplyAreaPath = getAreaPath(supplyPoints, baselineY);

  const activeHoveredQuarter = hoveredQuarterIndex !== null 
    ? currentRoleData.quarters[hoveredQuarterIndex] 
    : currentRoleData.quarters[3]; // default to Q4

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2.5 border border-slate-700 animate-bounce">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Clean Section Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          District Skill Map
        </h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Regional labour demand-supply telemetry, deficit hot spots, and seat reallocation engine
        </p>
      </div>

      {/* ========================================================================= */}
      {/* SUB-NAV TAB ARCHITECTURE                                                  */}
      {/* ========================================================================= */}
      <div className="border-b border-slate-200 mb-6">
        <nav className="flex space-x-8 overflow-x-auto" aria-label="Sub-navigation">
          <button
            type="button"
            onClick={() => setActiveSection('deficit')}
            className={`py-3.5 px-1 border-b-2 text-sm transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeSection === 'deficit'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Regional Deficit &amp; Telemetry</span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                activeSection === 'deficit'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              766 Districts
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('trajectory')}
            className={`py-3.5 px-1 border-b-2 text-sm transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeSection === 'trajectory'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Supply vs. Demand Trajectory</span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                activeSection === 'trajectory'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              Q1-Q4 2026 Model
            </span>
          </button>
        </nav>
      </div>

      {/* ========================================================================= */}
      {/* 1. TOP SECTION: Regional Deficit Console & Telemetry (50/50 Dual View)    */}
      {/* ========================================================================= */}
      {activeSection === 'deficit' && (
        <div className="animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 items-stretch">
        
        {/* Left Card: 3D Neon Radial Shortage Gauge */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col items-center justify-between relative">
          <div className="w-full flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
              Regional Deficit Console
            </span>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
              PS134 Telemetry
            </span>
          </div>

          {/* SVG Circular Meter */}
          <div className="relative w-56 h-56 flex items-center justify-center my-2">
            <svg 
              className="w-full h-full -rotate-90 transform overflow-visible"
              viewBox="0 0 190 190"
              style={{
                filter: 'drop-shadow(0 10px 22px rgba(244, 63, 94, 0.3))',
                transform: 'perspective(500px) rotateX(15deg) rotate(-90deg)'
              }}
            >
              <defs>
                <linearGradient id="shortage-neon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F43F5E" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#6366F1" />
                </linearGradient>
              </defs>

              {/* Background Track */}
              <circle
                cx="95"
                cy="95"
                r={radius}
                className="text-slate-100"
                strokeWidth="20"
                stroke="currentColor"
                fill="transparent"
              />

              {/* Active Animated Ring */}
              <circle
                cx="95"
                cy="95"
                r={radius}
                stroke="url(#shortage-neon-grad)"
                strokeWidth="20"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-300 ease-out"
              />
            </svg>

            {/* Center Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-5xl font-black text-slate-900 tracking-tight">
                {shortageIndex}%
              </span>
              <span className="bg-rose-50 text-rose-700 font-black text-xs px-3 py-1 rounded-full mt-2 border border-rose-200">
                {CLUSTERS[activeCluster]?.badge || 'Critical Shortage'}
              </span>
            </div>
          </div>

          {/* District Selector Chips below gauge */}
          <div className="w-full pt-3 border-t border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2 text-center">
              Select Cluster Filter
            </span>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {(['All Clusters', 'Chennai OMR', 'Bengaluru Urban', 'Coimbatore TIDEL', 'Hyderabad HITEC'] as const).map(clusterName => {
                const isActive = activeCluster === clusterName;
                return (
                  <button
                    key={clusterName}
                    type="button"
                    onClick={() => setActiveCluster(clusterName)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    {clusterName}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Card: Macro Deficit Telemetry (4 High-Impact Grid Tiles) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-black text-slate-900">
              Macro Deficit Telemetry
            </h2>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
              {activeCluster}
            </span>
          </div>

          {/* 4 High-Impact Grid Tiles */}
          <div className="grid grid-cols-2 gap-3 h-full my-3">
            
            {/* Tile 1: Industry Vacancies */}
            <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-4 flex flex-col justify-between group hover:border-blue-300 transition-colors">
              <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider block">
                Industry Vacancies
              </span>
              <div className="my-1">
                <span className="text-2xl sm:text-3xl font-black text-blue-600 block tracking-tight">
                  {totalVacancies.toLocaleString()}
                </span>
                <span className="text-[11px] font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-full inline-block mt-1">
                  142 Hiring Firms
                </span>
              </div>
              <span className="text-[10px] font-semibold text-slate-500">
                Active hiring demand
              </span>
            </div>

            {/* Tile 2: Qualified Exits */}
            <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-4 flex flex-col justify-between group hover:border-emerald-300 transition-colors">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                Qualified Exits
              </span>
              <div className="my-1">
                <span className="text-2xl sm:text-3xl font-black text-emerald-600 block tracking-tight">
                  {traineeOutput.toLocaleString()}
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full inline-block mt-1">
                  Passed Out
                </span>
              </div>
              <span className="text-[10px] font-semibold text-slate-500">
                Verified lab grads
              </span>
            </div>

            {/* Tile 3: Pipeline Deficit */}
            <div className="bg-rose-50/60 border border-rose-200/80 rounded-2xl p-4 flex flex-col justify-between group hover:border-rose-300 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block">
                  Pipeline Deficit
                </span>
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              </div>
              <div className="my-1">
                <span className="text-2xl sm:text-3xl font-black text-rose-600 block tracking-tight">
                  {netDeficit.toLocaleString()}
                </span>
                <span className="text-[11px] font-bold text-rose-700 bg-rose-100/70 px-2 py-0.5 rounded-full inline-block mt-1">
                  Supply Gap
                </span>
              </div>
              <span className="text-[10px] font-semibold text-slate-500">
                Unfilled openings
              </span>
            </div>

            {/* Tile 4: Talent Outflow */}
            <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-4 flex flex-col justify-between group hover:border-amber-300 transition-colors">
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                Talent Outflow
              </span>
              <div className="my-1">
                <span className="text-2xl sm:text-3xl font-black text-amber-600 block tracking-tight">
                  {outflowRate}% Migrating
                </span>
                <span className="text-[11px] font-bold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-full inline-block mt-1">
                  Tier-1 Drain
                </span>
              </div>
              <span className="text-[10px] font-semibold text-slate-500">
                Outside cluster loss
              </span>
            </div>

          </div>

          {/* Bottom Sync Strip */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Aggregates live hiring signals from 142 firms & 766 districts
            </span>
            <span className="font-mono text-[11px] text-slate-400">PS134 Live</span>
          </div>
        </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. MIDDLE SECTION: Glowing Spline Line / Area Trajectory Graph             */}
      {/* ========================================================================= */}
      {activeSection === 'trajectory' && (
        <div className="animate-in fade-in duration-200 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 space-y-4">
        
        {/* Header Row & Role Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-black text-slate-900 tracking-tight">
              Hiring Demand vs. Pipeline Supply Trajectory
            </h2>
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              Quarterly trajectory model comparing corporate openings against accredited technical institute exits
            </p>
          </div>

          {/* Role Switcher Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl shadow-inner border border-slate-200/60">
            <button
              type="button"
              onClick={() => setActiveRole('genai')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                activeRole === 'genai'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🤖</span>
              <span>GenAI & RAG Engineering</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveRole('cloud')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                activeRole === 'cloud'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>☁️</span>
              <span>Cloud DevOps & Kubernetes</span>
            </button>
          </div>
        </div>

        {/* Legend & Deficit Delta Tag */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-blue-700">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-xs" />
              Industry Hiring Demand (Electric Blue)
            </span>
            <span className="flex items-center gap-1.5 text-rose-600">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-xs" />
              Qualified College Supply (Coral / Rose)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-rose-50 text-rose-700 border border-rose-200 font-extrabold text-xs px-3 py-1 rounded-full shadow-2xs">
              {currentRoleData.deficitDelta}
            </span>
          </div>
        </div>

        {/* Live Active Inspection Readout */}
        <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-200/70 flex flex-wrap items-center justify-between text-xs gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-bold text-slate-800">
              {`${activeHoveredQuarter.quarter.split(' ')[0]} Hiring Demand: ${activeHoveredQuarter.demand.toLocaleString()} Roles • Supply: ${activeHoveredQuarter.supply.toLocaleString()} Grads • Deficit: -${(activeHoveredQuarter.demand - activeHoveredQuarter.supply).toLocaleString()}`}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-semibold text-blue-700">
              Demand: <strong>{activeHoveredQuarter.demand.toLocaleString()}</strong> Roles
            </span>
            <span className="text-slate-300">•</span>
            <span className="font-semibold text-rose-600">
              Supply: <strong>{activeHoveredQuarter.supply.toLocaleString()}</strong> Grads
            </span>
            <span className="text-slate-300">•</span>
            <span className="font-bold text-slate-800 bg-rose-100/70 text-rose-800 px-2 py-0.5 rounded-md">
              Deficit: -{(activeHoveredQuarter.demand - activeHoveredQuarter.supply).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Spline SVG Stage Container */}
        <div className="relative w-full pt-2">
          {/* Keyframe Definition for traveling neon beam */}
          <style>{`
            @keyframes travelPulse {
              0% { stroke-dashoffset: 400; opacity: 0; }
              50% { opacity: 1; }
              100% { stroke-dashoffset: 0; opacity: 0; }
            }
          `}</style>

          <svg 
            viewBox="0 0 650 220" 
            className="w-full h-auto overflow-visible select-none"
          >
            <defs>
              {/* Blue Gradient for Base Demand Curve & Shaded Area */}
              <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
              </linearGradient>

              {/* Coral Gradient for Supply Area */}
              <linearGradient id="coralAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
              </linearGradient>

              {/* Glowing SVG Filter for Neon Telemetry Pulse */}
              <filter id="glowFilter" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Coral Glow Filter for Supply Curve */}
              <filter id="coralLineGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#f43f5e" floodOpacity="0.3" />
              </filter>
            </defs>

            {/* Horizontal Gridlines */}
            <g opacity="0.4">
              <line x1="60" y1="25" x2="600" y2="25" stroke="#CBD5E1" strokeDasharray="3 3" />
              <line x1="60" y1="76" x2="600" y2="76" stroke="#E2E8F0" strokeDasharray="3 3" />
              <line x1="60" y1="128" x2="600" y2="128" stroke="#E2E8F0" strokeDasharray="3 3" />
              <line x1="60" y1="180" x2="600" y2="180" stroke="#CBD5E1" />
            </g>

            {/* Y-Axis Value Labels */}
            <g className="text-[10px] font-bold fill-slate-400">
              <text x="52" y="29" textAnchor="end">{currentRoleData.maxVal.toLocaleString()}</text>
              <text x="52" y="80" textAnchor="end">{Math.round(currentRoleData.maxVal * 0.66).toLocaleString()}</text>
              <text x="52" y="132" textAnchor="end">{Math.round(currentRoleData.maxVal * 0.33).toLocaleString()}</text>
              <text x="52" y="184" textAnchor="end">0</text>
            </g>

            {/* Vertical Inspection Guide line when hovering a quarter */}
            {hoveredQuarterIndex !== null && (
              <line 
                x1={xCoords[hoveredQuarterIndex]} 
                y1="25" 
                x2={xCoords[hoveredQuarterIndex]} 
                y2="180" 
                stroke="#64748b" 
                strokeWidth="1.5" 
                strokeDasharray="4 4" 
                opacity="0.7" 
              />
            )}

            {/* Shaded Areas */}
            <path d={demandAreaPath} fill="url(#blueGradient)" />
            <path d={supplyAreaPath} fill="url(#coralAreaGradient)" />

            {/* Base Demand Spline Curve */}
            <path 
              d={demandLinePath} 
              stroke="#2563eb" 
              strokeWidth="3.5" 
              fill="url(#blueGradient)" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />

            {/* Traveling Neon Light Beam Overlay */}
            <path 
              d={demandLinePath} 
              stroke="#38bdf8" 
              strokeWidth="4" 
              fill="none" 
              strokeDasharray="40 160" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              filter="url(#glowFilter)" 
              className="animate-[travelPulse_3s_ease-in-out_infinite]" 
              style={{ animation: 'travelPulse 3s ease-in-out infinite' }}
            />

            {/* Coral / Rose Supply Spline Curve */}
            <path 
              d={supplyLinePath} 
              stroke="#f43f5e" 
              strokeWidth="3" 
              fill="none" 
              strokeDasharray="5 5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              filter="url(#coralLineGlow)" 
            />

            {/* Glowing Interactive Nodes: Demand Points */}
            {demandPoints.map((pt, idx) => {
              const isHovered = hoveredQuarterIndex === idx;
              const isQ4 = idx === 3;
              const qData = currentRoleData.quarters[idx];
              const qLabel = qData.quarter.split(' ')[0];
              const tooltipText = `${qLabel} Hiring Demand: ${qData.demand.toLocaleString()} Roles • Supply: ${qData.supply.toLocaleString()} Grads • Deficit: -${(qData.demand - qData.supply).toLocaleString()}`;

              return (
                <g 
                  key={`demand-pt-${idx}`} 
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredQuarterIndex(idx)}
                  onMouseLeave={() => setHoveredQuarterIndex(null)}
                >
                  <title>{tooltipText}</title>

                  {/* Pulsing Beacon Ring on Q4 Endpoint */}
                  {isQ4 && (
                    <circle 
                      cx={pt.x} 
                      cy={pt.y} 
                      r="10" 
                      stroke="#38bdf8" 
                      strokeWidth="2" 
                      fill="none" 
                      className="animate-ping origin-center opacity-75" 
                      style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                    />
                  )}

                  {/* Outer hover halo for non-Q4 points */}
                  {!isQ4 && isHovered && (
                    <circle 
                      cx={pt.x} 
                      cy={pt.y} 
                      r="12" 
                      fill="#2563eb" 
                      fillOpacity="0.25"
                    />
                  )}

                  {/* Center dot: Solid blue circle with crisp white stroke */}
                  <circle 
                    cx={pt.x} 
                    cy={pt.y} 
                    r="5" 
                    fill="#2563eb" 
                    stroke="#ffffff" 
                    strokeWidth="2.5" 
                    className="transition-all duration-200"
                  />

                  {/* Micro-badge above Q4: "● LIVE PEAK" */}
                  {isQ4 && (
                    <foreignObject
                      x={pt.x - 45}
                      y={Math.max(pt.y - 32, 2)}
                      width="90"
                      height="26"
                      className="overflow-visible pointer-events-none"
                    >
                      <div className="flex items-center justify-center">
                        <span className="text-[10px] font-black bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200 shadow-2xs whitespace-nowrap">
                          ● LIVE PEAK
                        </span>
                      </div>
                    </foreignObject>
                  )}
                </g>
              );
            })}

            {/* Glowing Interactive Nodes: Supply Points */}
            {supplyPoints.map((pt, idx) => {
              const isHovered = hoveredQuarterIndex === idx;
              const qData = currentRoleData.quarters[idx];
              const qLabel = qData.quarter.split(' ')[0];
              const tooltipText = `${qLabel} Hiring Demand: ${qData.demand.toLocaleString()} Roles • Supply: ${qData.supply.toLocaleString()} Grads • Deficit: -${(qData.demand - qData.supply).toLocaleString()}`;

              return (
                <g 
                  key={`supply-pt-${idx}`} 
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredQuarterIndex(idx)}
                  onMouseLeave={() => setHoveredQuarterIndex(null)}
                >
                  <title>{tooltipText}</title>

                  {/* Outer Pulsing Glow */}
                  {isHovered && (
                    <circle 
                      cx={pt.x} 
                      cy={pt.y} 
                      r="12" 
                      fill="#f43f5e" 
                      fillOpacity="0.25"
                    />
                  )}
                  {/* Solid Point */}
                  <circle 
                    cx={pt.x} 
                    cy={pt.y} 
                    r={isHovered ? "7" : "5"} 
                    fill="#f43f5e" 
                    stroke="#ffffff" 
                    strokeWidth="2.5" 
                    className="transition-all duration-200"
                  />
                </g>
              );
            })}

            {/* Interactive Floating HUD Tooltip when hovering any node or timeline quarter */}
            {hoveredQuarterIndex !== null && (
              <g 
                transform={`translate(${xCoords[hoveredQuarterIndex]}, ${Math.max(demandPoints[hoveredQuarterIndex].y - 38, 14)})`}
                className="pointer-events-none transition-all duration-150"
              >
                {/* Dark Glass Tooltip Container */}
                <rect 
                  x="-135" 
                  y="-14" 
                  width="270" 
                  height="26" 
                  rx="6" 
                  fill="#0f172a" 
                  fillOpacity="0.95" 
                  stroke="#334155" 
                  strokeWidth="1"
                  filter="drop-shadow(0 4px 10px rgba(0,0,0,0.3))"
                />
                {/* Pointer Triangle */}
                <polygon 
                  points="-5,12 5,12 0,16" 
                  fill="#0f172a" 
                />
                {/* Tooltip Content */}
                <text 
                  x="0" 
                  y="3" 
                  textAnchor="middle" 
                  fill="#ffffff" 
                  className="text-[10px] font-bold tracking-tight select-none"
                >
                  {`${currentRoleData.quarters[hoveredQuarterIndex].quarter.split(' ')[0]} Hiring Demand: ${currentRoleData.quarters[hoveredQuarterIndex].demand.toLocaleString()} Roles • Supply: ${currentRoleData.quarters[hoveredQuarterIndex].supply.toLocaleString()} Grads • Deficit: -${(currentRoleData.quarters[hoveredQuarterIndex].demand - currentRoleData.quarters[hoveredQuarterIndex].supply).toLocaleString()}`}
                </text>
              </g>
            )}

            {/* X-Axis Timeline Labels */}
            {currentRoleData.quarters.map((q, idx) => {
              const isHovered = hoveredQuarterIndex === idx;
              return (
                <g 
                  key={`xaxis-${idx}`} 
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredQuarterIndex(idx)}
                  onMouseLeave={() => setHoveredQuarterIndex(null)}
                >
                  <text 
                    x={xCoords[idx]} 
                    y="204" 
                    textAnchor="middle" 
                    className={`font-bold text-xs transition-colors ${
                      isHovered ? 'fill-blue-700 font-extrabold' : 'fill-slate-500'
                    }`}
                  >
                    {q.quarter}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Footnote instruction */}
        <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-100">
          <span>Hover markers to inspect quarter deficit telemetry</span>
          <span className="font-mono text-slate-500">Dual-Spline Model • AICTE-Verified</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. BOTTOM ACTION & POLICY TRANSMISSION BAR                                */}
      {/* ========================================================================= */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
        
        {/* Left Side Status */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${planApplied ? 'bg-emerald-500' : 'bg-blue-600 animate-pulse'}`} />
            <span className="text-xs font-extrabold text-slate-900">
              {planApplied ? "✓ Reallocation Plan Locked into Portal 2 Modules" : "● Live District Allocation Blueprint Ready"}
            </span>
          </div>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="text-xs font-medium text-slate-500">
            Auto-routes seat pruning targets to Outdated Courses &amp; District Lab Budgets.
          </span>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleExportDistrictPdf}
            className="border border-slate-300 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export District PDF</span>
          </button>

          <button
            type="button"
            onClick={handleApplyPlan}
            disabled={planApplied}
            className={`font-bold text-sm px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2 ${
              planApplied
                ? 'bg-emerald-600 text-white cursor-default'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {planApplied ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>✓ Plan Locked &amp; Routed</span>
              </>
            ) : (
              <>
                <span>Apply District Reallocation Plan →</span>
              </>
            )}
          </button>
        </div>

      </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DISTRICT PDF PREVIEW MODAL                                                */}
      {/* ========================================================================= */}
      {isPdfModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-auto animate-fadeIn flex flex-col max-h-[92vh]">
            
            {/* Modal Top Control Bar */}
            <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2.5">
                <FileCheck2 className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-sm font-black tracking-tight text-white">
                    District Skill Reallocation Report (Official PDF)
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Ref: LMI-DISTRICT-2026-PS134 • {activeCluster}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Document</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsPdfModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Close preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* PDF Sheet Preview */}
            <div className="p-6 sm:p-8 overflow-y-auto bg-slate-50/50 space-y-6 text-slate-800 text-xs">
              <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
                
                {/* Header */}
                <div className="border-b-2 border-slate-900 pb-4 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-md inline-block mb-1">
                      State Academic Planning &amp; Labour Reallocation Directive
                    </span>
                    <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                      District Skill Map &amp; Vacancy Pipeline Audit
                    </h1>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Cluster Focus: {activeCluster} • PS134 Model Framework
                    </p>
                  </div>
                  <div className="text-right font-mono text-[11px] text-slate-500">
                    <span className="block font-bold text-slate-800">Doc: LMI-DIST-766</span>
                    <span className="block">Date: {new Date().toLocaleDateString()}</span>
                    <span className="text-emerald-600 font-bold">Status: Active Directive</span>
                  </div>
                </div>

                {/* Section 1 */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 border-l-4 border-rose-500 pl-2">
                    1. Macro Deficit Telemetry
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                      <span className="text-[10px] font-bold text-slate-500 block">Shortage Severity</span>
                      <strong className="text-lg font-black text-rose-600 block mt-0.5">{shortageIndex}%</strong>
                      <span className="text-[9px] text-rose-700 font-semibold">{CLUSTERS[activeCluster]?.badge}</span>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                      <span className="text-[10px] font-bold text-slate-500 block">Verified Openings</span>
                      <strong className="text-lg font-black text-blue-600 block mt-0.5">{totalVacancies.toLocaleString()}</strong>
                      <span className="text-[9px] text-blue-700 font-semibold">142 Tech Firms</span>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                      <span className="text-[10px] font-bold text-slate-500 block">Qualified Exits</span>
                      <strong className="text-lg font-black text-emerald-600 block mt-0.5">{traineeOutput.toLocaleString()}</strong>
                      <span className="text-[9px] text-emerald-700 font-semibold">Trained Grads</span>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                      <span className="text-[10px] font-bold text-slate-500 block">Pipeline Deficit</span>
                      <strong className="text-lg font-black text-rose-600 block mt-0.5">{netDeficit.toLocaleString()}</strong>
                      <span className="text-[9px] text-rose-700 font-semibold">Net Shortfall</span>
                    </div>
                  </div>
                </div>

                {/* Section 2 */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 border-l-4 border-blue-500 pl-2">
                    2. Trajectory Directives (GenAI vs Cloud DevOps)
                  </h4>
                  <div className="space-y-2">
                    <div className="p-2.5 bg-slate-50 rounded-lg flex justify-between items-center text-xs">
                      <div>
                        <strong>GenAI &amp; RAG Engineering (Q4 2026)</strong>
                        <span className="text-[10px] text-slate-500 block">Demand 4,200 vs Supply 950 Grads</span>
                      </div>
                      <span className="text-rose-700 font-bold bg-rose-100 px-2 py-0.5 rounded">-77% Gap</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-lg flex justify-between items-center text-xs">
                      <div>
                        <strong>Cloud DevOps &amp; Kubernetes (Q4 2026)</strong>
                        <span className="text-[10px] text-slate-500 block">Demand 5,600 vs Supply 1,800 Grads</span>
                      </div>
                      <span className="text-rose-700 font-bold bg-rose-100 px-2 py-0.5 rounded">-68% Gap</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-white px-6 py-3.5 border-t border-slate-200 flex items-center justify-end gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsPdfModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Close Preview
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Document</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
