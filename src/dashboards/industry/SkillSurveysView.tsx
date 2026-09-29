import React, { useState } from 'react';
import { 
  Plus, 
  Check, 
  Sparkles, 
  GitFork, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  SlidersHorizontal,
  X,
  TrendingUp,
  Building2,
  PieChart,
  Sliders
} from 'lucide-react';

interface DomainItem {
  id: string;
  name: string;
  percentage: number;
  color: string;
  depthColor: string;
  gradient: string;
}

const DOMAINS: DomainItem[] = [
  {
    id: 'genai',
    name: 'Generative AI & Data',
    percentage: 42,
    color: '#4F46E5',
    depthColor: '#312E81',
    gradient: 'url(#genai-grad)'
  },
  {
    id: 'cloud',
    name: 'Cloud & DevOps',
    percentage: 32,
    color: '#0284C7',
    depthColor: '#075985',
    gradient: 'url(#cloud-grad)'
  },
  {
    id: 'fullstack',
    name: 'Full-Stack & APIs',
    percentage: 26,
    color: '#059669',
    depthColor: '#064E3B',
    gradient: 'url(#fullstack-grad)'
  }
];

interface RegionalHub {
  id: string;
  name: string;
  label: string;
  companies: number;
  heightPercent: number; // relative to Bengaluru 58
  heightPx: number;
  details: string;
  topGradient: string;
  bodyGradient: string;
  shadowColor: string;
  badgeBg: string;
  badgeText: string;
}

const REGIONAL_HUBS: RegionalHub[] = [
  {
    id: 'bengaluru',
    name: 'Bengaluru Urban',
    label: 'Bengaluru (58)',
    companies: 58,
    heightPercent: 100,
    heightPx: 148,
    details: 'Bengaluru Urban: 58 Companies • 36 SaaS, 22 GCCs',
    topGradient: 'linear-gradient(180deg, #93C5FD 0%, #38BDF8 100%)',
    bodyGradient: 'linear-gradient(90deg, #1D4ED8 0%, #2563EB 35%, #38BDF8 65%, #1E40AF 100%)',
    shadowColor: 'rgba(37, 99, 235, 0.35)',
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-700'
  },
  {
    id: 'chennai',
    name: 'Chennai OMR',
    label: 'Chennai (46)',
    companies: 46,
    heightPercent: 79,
    heightPx: 118,
    details: 'Chennai OMR: 46 Companies • 28 SaaS, 18 GCCs',
    topGradient: 'linear-gradient(180deg, #99F6E4 0%, #2DD4BF 100%)',
    bodyGradient: 'linear-gradient(90deg, #047857 0%, #059669 35%, #2DD4BF 65%, #065F46 100%)',
    shadowColor: 'rgba(5, 150, 105, 0.35)',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-700'
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad HITEC',
    label: 'Hyderabad (38)',
    companies: 38,
    heightPercent: 65,
    heightPx: 96,
    details: 'Hyderabad HITEC: 38 Companies • 24 SaaS, 14 GCCs',
    topGradient: 'linear-gradient(180deg, #E9D5FF 0%, #C084FC 100%)',
    bodyGradient: 'linear-gradient(90deg, #4338CA 0%, #6366F1 35%, #A855F7 65%, #3730A3 100%)',
    shadowColor: 'rgba(99, 102, 241, 0.35)',
    badgeBg: 'bg-indigo-50',
    badgeText: 'text-indigo-700'
  }
];

type ToolCategory = 'All' | 'AI & Data' | 'Cloud & DevOps' | 'Full-Stack';

interface ToolItem {
  id: string;
  name: string;
  category: 'AI & Data' | 'Cloud & DevOps' | 'Full-Stack';
  active: boolean;
}

const DEFAULT_TOOLS: ToolItem[] = [
  { id: 't1', name: 'LangChain', category: 'AI & Data', active: true },
  { id: 't2', name: 'Docker', category: 'Cloud & DevOps', active: true },
  { id: 't3', name: 'Vector DBs', category: 'AI & Data', active: true },
  { id: 't4', name: 'FastAPI', category: 'Full-Stack', active: true },
  { id: 't5', name: 'Kubernetes', category: 'Cloud & DevOps', active: true },
  { id: 't6', name: 'PyTorch', category: 'AI & Data', active: true },
  { id: 't7', name: 'Next.js 15', category: 'Full-Stack', active: true },
  { id: 't8', name: 'Apache Spark', category: 'AI & Data', active: true },
  { id: 't9', name: 'vLLM', category: 'AI & Data', active: true }
];

// Helper to calculate SVG donut arc coordinates
function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeDonutSegment(x: number, y: number, radius: number, innerRadius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const innerStart = polarToCartesian(x, y, innerRadius, endAngle);
  const innerEnd = polarToCartesian(x, y, innerRadius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    'L', innerEnd.x, innerEnd.y,
    'A', innerRadius, innerRadius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
    'Z'
  ].join(' ');
}

export const SkillSurveysView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'consensus' | 'mandates'>('consensus');

  // 1. Donut interactive state
  const [hoveredDomain, setHoveredDomain] = useState<string | null>(null);

  // 1. Regional Bar Graph interactive state
  const [hoveredHub, setHoveredHub] = useState<string | null>(null);

  // 2. In-Demand Skills State & Filters
  const [tools, setTools] = useState<ToolItem[]>(DEFAULT_TOOLS);
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('All');
  const [newToolName, setNewToolName] = useState('');
  const [isAddingTool, setIsAddingTool] = useState(false);

  // 3. Workplace Standards State
  const [testCoverage, setTestCoverage] = useState<number>(75);
  const [prPassRate, setPrPassRate] = useState<number>(80);
  const [apiLatency, setApiLatency] = useState<number>(200);

  // 4. Bottom Action state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Toggle tool active state
  const toggleTool = (id: string) => {
    setTools(prev => prev.map(tool => tool.id === id ? { ...tool, active: !tool.active } : tool));
  };

  // Add custom tool with Enter
  const handleAddToolSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newToolName.trim()) return;
    const cat: 'AI & Data' | 'Cloud & DevOps' | 'Full-Stack' = 
      selectedCategory === 'All' ? 'AI & Data' : selectedCategory;

    const newEntry: ToolItem = {
      id: `tool-${Date.now()}`,
      name: newToolName.trim(),
      category: cat,
      active: true
    };
    setTools(prev => [...prev, newEntry]);
    setNewToolName('');
    setIsAddingTool(false);
  };

  // Submit action
  const handleSubmitSurvey = () => {
    setIsSubmitted(true);
    setToastMessage('Survey consensus dispatched directly to Portal 2 (Syllabus Fixer)!');
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Filter tools by category
  const filteredTools = selectedCategory === 'All' 
    ? tools 
    : tools.filter(t => t.category === selectedCategory);

  const activeSkillsCount = tools.filter(t => t.active).length;

  // Donut arc data
  const segmentsData = [
    { ...DOMAINS[0], startAngle: 3, endAngle: 148.2 },
    { ...DOMAINS[1], startAngle: 154.2, endAngle: 263.4 },
    { ...DOMAINS[2], startAngle: 269.4, endAngle: 357 }
  ];

  const activeDomainInfo = hoveredDomain 
    ? DOMAINS.find(d => d.id === hoveredDomain) 
    : DOMAINS[0];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2.5 border border-slate-700 animate-bounce">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Clean Section Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Company Skill Surveys
        </h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Quarterly hiring partner consensus & syllabus reform telemetry
        </p>
      </div>

      {/* Persistent Sub-Heading Navigation Bar */}
      <div className="border-b border-slate-200 mb-6">
        <nav className="flex space-x-8 overflow-x-auto" aria-label="Sub-navigation">
          <button
            type="button"
            onClick={() => setActiveSection('consensus')}
            className={`py-3.5 px-1 border-b-2 text-sm transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeSection === 'consensus'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            <PieChart className="w-4 h-4" />
            <span>Consensus & Regional Hubs</span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                activeSection === 'consensus'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              142 Verified Employers
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('mandates')}
            className={`py-3.5 px-1 border-b-2 text-sm transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeSection === 'mandates'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Tooling Mandates & Engineering Benchmarks</span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                activeSection === 'mandates'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              Day-1 Standard
            </span>
          </button>
        </nav>
      </div>

      {/* Sub-Heading 1: Consensus & Regional Hubs */}
      {activeSection === 'consensus' && (
        <div className="animate-in fade-in duration-200">
          {/* ========================================================================= */}
          {/* 1. TOP SECTION: 3D Donut Chart & 3D Regional Bar Graph (50/50 Split)      */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Side: 3D-styled Donut / Pie Chart */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Industry Consensus
              </span>
              <h2 className="text-base font-bold text-slate-900 mt-0.5">
                Domain Hiring Distribution
              </h2>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
              100% Survey Weights
            </span>
          </div>

          {/* 3D Isometric Donut Stage */}
          <div className="my-5 flex flex-col items-center justify-center">
            <div className="relative w-64 h-64 flex items-center justify-center">
              
              <svg 
                viewBox="0 0 260 260" 
                className="w-full h-full overflow-visible"
                style={{
                  filter: 'drop-shadow(0 14px 18px rgba(15, 23, 42, 0.12))',
                  transform: 'perspective(500px) rotateX(20deg)'
                }}
              >
                <defs>
                  <linearGradient id="genai-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#818CF8" />
                    <stop offset="100%" stopColor="#4F46E5" />
                  </linearGradient>
                  <linearGradient id="cloud-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#0284C7" />
                  </linearGradient>
                  <linearGradient id="fullstack-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#34D399" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>

                  <filter id="lift-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="6" stdDeviation="4" floodOpacity="0.25" />
                  </filter>
                </defs>

                {/* 3D Depth Layer */}
                <g transform="translate(0, 8)" opacity="0.85">
                  {segmentsData.map(seg => (
                    <path
                      key={`depth-${seg.id}`}
                      d={describeDonutSegment(130, 130, 96, 62, seg.startAngle, seg.endAngle)}
                      fill={seg.depthColor}
                    />
                  ))}
                </g>

                {/* Top Surface Slices */}
                {segmentsData.map(seg => {
                  const isHovered = hoveredDomain === seg.id;
                  return (
                    <g 
                      key={`top-${seg.id}`}
                      onMouseEnter={() => setHoveredDomain(seg.id)}
                      onMouseLeave={() => setHoveredDomain(null)}
                      className="cursor-pointer transition-all duration-300"
                      style={{
                        transform: isHovered ? 'translateY(-6px) scale(1.03)' : 'translateY(0) scale(1)',
                        transformOrigin: '130px 130px'
                      }}
                    >
                      <path
                        d={describeDonutSegment(130, 130, 96, 62, seg.startAngle, seg.endAngle)}
                        fill={seg.gradient}
                        stroke="#FFFFFF"
                        strokeWidth={isHovered ? "2.5" : "1.5"}
                        filter={isHovered ? "url(#lift-shadow)" : undefined}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Center Readout */}
              <div 
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center"
                style={{ transform: 'translateY(-4px)' }}
              >
                <span className="text-2xl font-black text-slate-900 tracking-tight">
                  {activeDomainInfo?.percentage}%
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2">
                  {activeDomainInfo?.name.split('&')[0]}
                </span>
              </div>
            </div>

            {/* Interactive Domain Pills */}
            <div className="grid grid-cols-3 gap-2 w-full pt-4 mt-2 border-t border-slate-100">
              {DOMAINS.map(domain => {
                const isHovered = hoveredDomain === domain.id;
                return (
                  <button
                    key={domain.id}
                    type="button"
                    onMouseEnter={() => setHoveredDomain(domain.id)}
                    onMouseLeave={() => setHoveredDomain(null)}
                    className={`p-2 rounded-xl text-left transition-all border ${
                      isHovered 
                        ? 'bg-slate-50 border-slate-300 shadow-sm -translate-y-0.5' 
                        : 'bg-white border-transparent hover:bg-slate-50/70'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span 
                        className="w-2.5 h-2.5 rounded-full shrink-0" 
                        style={{ backgroundColor: domain.color }} 
                      />
                      <span className="text-[11px] font-bold text-slate-800 truncate">
                        {domain.name}
                      </span>
                    </div>
                    <span className="text-sm font-black text-slate-900 block">
                      {domain.percentage}%
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-100">
            <span>Hover segments to lift elevation shadow</span>
            <span className="font-mono text-slate-500">Live Q3 Weights</span>
          </div>
        </div>

        {/* Right Side: 3D Regional Bar Graph (Survey Participation by Tech Hub) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-black text-slate-900">
                Survey Participation by Tech Hub
              </h2>
              <span className="bg-blue-50 text-blue-700 font-bold text-xs px-3 py-1 rounded-full border border-blue-200">
                142 Verified (GCCs & SaaS)
              </span>
            </div>

            {/* 3D Vertical Pillars Bar Chart Container */}
            <div className="my-6 px-4">
              <div className="h-52 flex items-end justify-around gap-6 relative">
                
                {/* Horizontal Guide Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-30">
                  <div className="border-b border-dashed border-slate-300 w-full" />
                  <div className="border-b border-dashed border-slate-300 w-full" />
                  <div className="border-b border-dashed border-slate-300 w-full" />
                  <div className="border-b border-slate-200 w-full" />
                </div>

                {/* 3D Pillar Bars */}
                {REGIONAL_HUBS.map(hub => {
                  const isHovered = hoveredHub === hub.id;
                  return (
                    <div 
                      key={hub.id}
                      onMouseEnter={() => setHoveredHub(hub.id)}
                      onMouseLeave={() => setHoveredHub(null)}
                      className="flex-1 flex flex-col items-center h-full justify-end z-10 group cursor-pointer relative"
                    >
                      {/* Floating Tooltip */}
                      {isHovered && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg shadow-xl z-30 pointer-events-none animate-fadeIn border border-slate-700 flex items-center gap-1.5">
                          <Building2 className="w-3 h-3 text-blue-400" />
                          <span>{hub.details}</span>
                        </div>
                      )}

                      {/* Pill Count Above Bar */}
                      <span className={`text-xs font-extrabold ${hub.badgeText} ${hub.badgeBg} px-2 py-0.5 rounded-md mb-2 shadow-xs group-hover:-translate-y-1 transition-transform`}>
                        {hub.companies}
                      </span>

                      {/* 3D Cylinder Structure */}
                      <div className="w-full max-w-[56px] flex flex-col items-center group-hover:-translate-y-1.5 transition-transform duration-200">
                        {/* Cylinder Top Ellipse */}
                        <div 
                          className="w-full h-3.5 rounded-[50%] z-20 shadow-xs"
                          style={{ background: hub.topGradient }}
                        />
                        {/* Cylinder Body */}
                        <div 
                          className="w-full -mt-1.5 rounded-b-lg shadow-md transition-all"
                          style={{
                            height: `${hub.heightPx}px`,
                            background: hub.bodyGradient,
                            boxShadow: `0 8px 16px -4px ${hub.shadowColor}`
                          }}
                        />
                        {/* 3D Base Shadow */}
                        <div className="w-4/5 h-2 rounded-[50%] bg-slate-900/20 blur-[2px] -mt-1" />
                      </div>

                      {/* X-Axis Label */}
                      <span className="text-xs font-bold text-slate-800 mt-2.5 tracking-tight text-center">
                        {hub.label}
                      </span>
                    </div>
                  );
                })}

              </div>
            </div>
          </div>

          {/* Footer Status Bar */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              99.4% Verified Consensus
            </span>
            <span>Rolling 90-Day Refresh</span>
          </div>
        </div>

      </div>
    </div>
  )}

      {/* Sub-Heading 2: Tooling Mandates & Engineering Benchmarks */}
      {activeSection === 'mandates' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* ========================================================================= */}
          {/* 2. FULL-WIDTH: In-Demand Skills & Tools to Mandate                        */}
          {/* ========================================================================= */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        
        {/* Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-2xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-base font-black text-slate-900">
              In-Demand Skills & Tools to Mandate
            </h2>
          </div>
          
          <span className="bg-emerald-50 text-emerald-700 font-bold text-xs px-3 py-1.5 rounded-full border border-emerald-200 shadow-2xs">
            {activeSkillsCount} Skills Selected for Curriculum Ingestion
          </span>
        </div>

        {/* Category Quick Filters */}
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {(['All', 'AI & Data', 'Cloud & DevOps', 'Full-Stack'] as const).map(cat => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Interactive Tag Cloud */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {filteredTools.map(tool => (
            <button
              key={tool.id}
              type="button"
              onClick={() => toggleTool(tool.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
                tool.active
                  ? 'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {tool.active ? (
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              ) : (
                <Plus className="w-3.5 h-3.5 text-slate-400" />
              )}
              <span>{tool.name}</span>
            </button>
          ))}

          {/* Inline + Add Tool Creator */}
          {isAddingTool ? (
            <form onSubmit={handleAddToolSubmit} className="inline-flex items-center gap-1.5 animate-fadeIn">
              <input
                type="text"
                autoFocus
                value={newToolName}
                onChange={(e) => setNewToolName(e.target.value)}
                placeholder="Type tool name..."
                className="px-3 py-1.5 text-xs rounded-xl border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 w-40 bg-emerald-50/40 text-slate-800 placeholder:text-slate-400 font-semibold"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-2xs"
                title="Confirm Add"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => { setIsAddingTool(false); setNewToolName(''); }}
                className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                title="Cancel"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setIsAddingTool(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-dashed border-emerald-300 transition-colors flex items-center gap-1.5 active:scale-95 shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Tool</span>
            </button>
          )}
        </div>

        <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-100">
          <span>Click any chip to toggle syllabus ingestion mandate</span>
          <span className="font-mono text-slate-500">Autonomous Sync with Board of Studies</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. VISUAL OVERHAUL: Workplace Standards (Fresh Graduate Benchmarks)       */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        
        {/* Header */}
        <div>
          <h2 className="text-base font-black text-slate-900">
            Fresh Graduate Engineering Benchmarks
          </h2>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            Slide to set minimum Day-1 code quality thresholds required from university grads
          </p>
        </div>

        {/* 3 Modern Gauge Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          
          {/* Card 1: Automated Test Coverage */}
          <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/90 flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-colors">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Unit & Integration Tests
                </span>
                <span className="text-[11px] text-slate-400 font-semibold">Min Threshold</span>
              </div>
              <div className="text-3xl font-black text-emerald-600 tracking-tight">
                {testCoverage}%
              </div>
            </div>

            {/* Slider with Gradient Track */}
            <div className="space-y-2">
              <input
                type="range"
                min="40"
                max="100"
                step="5"
                value={testCoverage}
                onChange={(e) => setTestCoverage(parseInt(e.target.value, 10))}
                className="w-full h-2 rounded-lg cursor-pointer accent-emerald-600"
                style={{
                  background: `linear-gradient(to right, #A7F3D0 0%, #059669 ${(testCoverage - 40) / 0.6}%, #E2E8F0 ${(testCoverage - 40) / 0.6}%, #E2E8F0 100%)`
                }}
              />
              <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                <span>40% Baseline</span>
                <span className="text-emerald-700 font-bold">Industry Target: 75%+</span>
                <span>100% Strict</span>
              </div>
            </div>
          </div>

          {/* Card 2: Code Review Pass Rate */}
          <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/90 flex flex-col justify-between space-y-4 hover:border-indigo-300 transition-colors">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                  First-Time PR Clearance
                </span>
                <span className="text-[11px] text-slate-400 font-semibold">Review Clean Rate</span>
              </div>
              <div className="text-3xl font-black text-indigo-600 tracking-tight">
                {prPassRate}%
              </div>
            </div>

            {/* Slider with Gradient Track */}
            <div className="space-y-2">
              <input
                type="range"
                min="50"
                max="100"
                step="5"
                value={prPassRate}
                onChange={(e) => setPrPassRate(parseInt(e.target.value, 10))}
                className="w-full h-2 rounded-lg cursor-pointer accent-indigo-600"
                style={{
                  background: `linear-gradient(to right, #C7D2FE 0%, #4F46E5 ${(prPassRate - 50) / 0.5}%, #E2E8F0 ${(prPassRate - 50) / 0.5}%, #E2E8F0 100%)`
                }}
              />
              <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                <span>50% Tolerant</span>
                <span className="text-indigo-700 font-bold">Production Target: 80%+</span>
                <span>100% Zero-Defect</span>
              </div>
            </div>
          </div>

          {/* Card 3: API Latency Threshold */}
          <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/90 flex flex-col justify-between space-y-4 hover:border-blue-300 transition-colors">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-blue-600" />
                  Microservice Response Time
                </span>
                <span className="text-[11px] text-slate-400 font-semibold">Peak Load Bound</span>
              </div>
              <div className="text-3xl font-black text-blue-600 tracking-tight">
                &lt; {apiLatency} ms
              </div>
            </div>

            {/* Slider with Gradient Track */}
            <div className="space-y-2">
              <input
                type="range"
                min="50"
                max="500"
                step="25"
                value={apiLatency}
                onChange={(e) => setApiLatency(parseInt(e.target.value, 10))}
                className="w-full h-2 rounded-lg cursor-pointer accent-blue-600"
                style={{
                  background: `linear-gradient(to right, #BFDBFE 0%, #2563EB ${(apiLatency - 50) / 4.5}%, #E2E8F0 ${(apiLatency - 50) / 4.5}%, #E2E8F0 100%)`
                }}
              />
              <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                <span>50ms Ultra-Fast</span>
                <span className="text-blue-700 font-bold">Benchmark: 200 ms</span>
                <span>500ms Relaxed</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. BOTTOM ACTION BAR                                                      */}
      {/* ========================================================================= */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
        
        {/* Left Side: Focus Badge & Auto-Route Indicator */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-800 text-xs font-bold px-3.5 py-1.5 rounded-full border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Focus: CSE • IT • AI&DS</span>
          </div>

          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-indigo-100">
            <GitFork className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span>
              Survey data automatically routes to <strong>Portal 2 (Syllabus Fixer)</strong>
            </span>
          </div>
        </div>

        {/* Right Side: Prominent Pill Button */}
        <button
          type="button"
          onClick={handleSubmitSurvey}
          disabled={isSubmitted}
          className={`inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-xs font-bold text-white shadow-md hover:shadow-lg transition-all active:scale-95 shrink-0 ${
            isSubmitted
              ? 'bg-emerald-600 hover:bg-emerald-700 cursor-default'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSubmitted ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Survey Dispatched to Portal 2</span>
            </>
          ) : (
            <>
              <span>Submit Skill Survey</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

      </div>
    </div>
  )}
    </div>
  );
};
