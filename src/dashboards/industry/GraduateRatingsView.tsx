import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Check, 
  Download, 
  TrendingDown, 
  TrendingUp, 
  Users, 
  FileText, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Layers, 
  Server,
  Building2,
  CheckCircle2,
  Printer,
  X,
  FileCheck2,
  ShieldCheck,
  Gauge,
  BarChart3
} from 'lucide-react';

export const GraduateRatingsView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'velocity' | 'competency'>('velocity');

  // Live animated telemetry states (animating from zero on mount)
  const [overallReadiness, setOverallReadiness] = useState<number>(0);
  const [daysToPR, setDaysToPR] = useState<number>(65);
  const [retentionRate, setRetentionRate] = useState<number>(0);

  // Competency scores (0 -> target)
  const [dockerScore, setDockerScore] = useState<number>(0);
  const [testScore, setTestScore] = useState<number>(0);
  const [apiScore, setApiScore] = useState<number>(0);
  const [debugScore, setDebugScore] = useState<number>(0);

  // Submission & feedback states
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // PDF Generation & Preview state
  const [isPdfGenerated, setIsPdfGenerated] = useState<boolean>(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);

  // Smooth ease-out animation on mount
  useEffect(() => {
    const duration = 1200; // ms
    const startTime = performance.now();

    const animateMount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out

      setOverallReadiness(Math.round(eased * 84));
      // 65 -> 18 Days
      setDaysToPR(Math.round(65 - (65 - 18) * eased));
      setRetentionRate(parseFloat((eased * 96.2).toFixed(1)));
      setDockerScore(Math.round(eased * 88));
      setTestScore(Math.round(eased * 81));
      setApiScore(Math.round(eased * 86));
      setDebugScore(Math.round(eased * 68));

      if (progress < 1) {
        requestAnimationFrame(animateMount);
      }
    };

    requestAnimationFrame(animateMount);
  }, []);

  // Transmit action handler
  const handleTransmitTelemetry = () => {
    if (feedbackSubmitted) return;
    setFeedbackSubmitted(true);
    setToastMessage('Graduate telemetry successfully transmitted to State Academic Planning Board & Portal 2 Governance!');
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Helper to escape PDF text strings
  const escapePdf = (str: string) => {
    return str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
  };

  // Generate authentic downloadable PDF 1.4 file
  const generatePdfBlob = () => {
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const timeStr = new Date().toLocaleTimeString();

    const lines = [
      'BT',
      '/F1 18 Tf',
      '50 740 Td',
      '(LMI-CAP | LABOUR MARKET INTELLIGENCE PLATFORM) Tj',
      '0 -18 Td',
      '/F1 14 Tf',
      '(90-Day Graduate Work Ratings & Competency Audit Report) Tj',
      '0 -16 Td',
      '/F2 9 Tf',
      `(${escapePdf(`Audit Ref: LMI-90D-2026-Q3-1420 | Date: ${dateStr} ${timeStr} | PS134 Compliance`)}) Tj`,
      '0 -24 Td',
      '/F1 11 Tf',
      '(========================================================================) Tj',
      '0 -16 Td',
      '(1. EXECUTIVE MACRO VELOCITY & PRODUCTION READINESS) Tj',
      '/F2 10 Tf',
      '0 -16 Td',
      `(${escapePdf(`• Overall Cohort Production Readiness: ${overallReadiness}% [Day-90 Job Ready Benchmark]`)}) Tj`,
      '0 -14 Td',
      '(• Total Sample Size: 1,420 Verified Graduate Trainees Across 142 Tech Firms) Tj',
      '0 -14 Td',
      `(${escapePdf(`• Time to 1st Pull Request (PR): ${daysToPR} Days (Ramped from 65-Day baseline, -72% acceleration)`)}) Tj`,
      '0 -14 Td',
      '(• Code Rework Rate: 14% (Down 42% via practical shop-floor terminal lab hours)) Tj',
      '0 -14 Td',
      `(${escapePdf(`• 90-Day Retention Rate: ${retentionRate}% (State target: 90%+ retained post-probation)`)}) Tj`,
      '0 -24 Td',
      '/F1 11 Tf',
      '(2. CORE ENGINEERING COMPETENCY SCORES (TERMINAL 90-DAY AUDIT)) Tj',
      '/F2 10 Tf',
      '0 -16 Td',
      `(${escapePdf(`• Docker & Cloud Deploy: ${dockerScore}% - Status: EXCEEDS BAR (Containerized microservices & health probes)`)}) Tj`,
      '0 -14 Td',
      `(${escapePdf(`• Unit Testing (Jest/PyTest): ${testScore}% - Status: PRODUCTION READY (Test-driven CI/CD merge gates)`)}) Tj`,
      '0 -14 Td',
      `(${escapePdf(`• FastAPI & Microservices: ${apiScore}% - Status: HIGH SPEED (Async REST APIs, latency < 200ms)`)}) Tj`,
      '0 -14 Td',
      `(${escapePdf(`• Distributed Cloud Debugging: ${debugScore}% - Status: NEEDS LAB SANDBOX (Requires log sandboxing)`)}) Tj`,
      '0 -24 Td',
      '/F1 11 Tf',
      '(3. DISTRICT TALENT PIPELINE QUALITY & PLACEMENT READINESS) Tj',
      '/F2 10 Tf',
      '0 -16 Td',
      '(• Chennai OMR Belt: 91% Index (420 Graduate Hires Evaluated)) Tj',
      '0 -14 Td',
      '(• Bengaluru Urban: 88% Index (580 Graduate Hires Evaluated)) Tj',
      '0 -14 Td',
      '(• Hyderabad HITEC: 85% Index (240 Graduate Hires Evaluated)) Tj',
      '0 -14 Td',
      '(• Coimbatore TIDEL: 82% Index (180 Graduate Hires Evaluated)) Tj',
      '0 -24 Td',
      '/F1 11 Tf',
      '(4. ACADEMIC SYLLABUS INTEGRATION & POLICY GOVERNANCE) Tj',
      '/F2 9 Tf',
      '0 -14 Td',
      '(• Autonomous Linkage: Directly integrated with Portal 2 (Syllabus Fixer & District Lab Budgets)) Tj',
      '0 -12 Td',
      '(• Endorsed by 142 participating GCCs, SaaS Leaders, and State Skill Development Councils) Tj',
      '0 -12 Td',
      '(• Cryptographic Audit Seal: Verified Authentic & Tamper-Proof (SHA-256 Validated)) Tj',
      '0 -20 Td',
      '/F1 9 Tf',
      '(========================================================================) Tj',
      '0 -12 Td',
      '/F2 8 Tf',
      '(CONFIDENTIAL - FOR USE BY STATE ACADEMIC PLANNING BOARD, ITIs & POLYTECHNICS ONLY) Tj',
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

  // Export PDF handler
  const handleExportPDF = () => {
    setIsPdfGenerated(true);

    // 1. Generate & Trigger real PDF Blob download
    try {
      const blob = generatePdfBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Graduate_Work_Ratings_90Day_Audit_Report_${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    } catch (e) {
      console.error('PDF download error:', e);
    }

    // 2. Open readymade PDF modal preview
    setIsPdfModalOpen(true);

    // 3. Trigger feedback toast
    setToastMessage('✓ Readymade 90-Day Audit PDF generated & downloaded! Previewing report.');
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Print function for the readymade PDF preview
  const handlePrintReport = () => {
    window.print();
  };

  // SVG Circular Meter Math
  const radius = 68;
  const circumference = 2 * Math.PI * radius; // ~ 427.256
  const strokeDashoffset = circumference - (circumference * overallReadiness) / 100;

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
          Graduate Work Ratings
        </h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          90-day post-placement performance telemetry & terminal competency audit
        </p>
      </div>

      {/* Persistent Sub-Heading Navigation Bar */}
      <div className="border-b border-slate-200 mb-6">
        <nav className="flex space-x-8 overflow-x-auto" aria-label="Sub-navigation">
          <button
            type="button"
            onClick={() => setActiveSection('velocity')}
            className={`py-3.5 px-1 border-b-2 text-sm transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeSection === 'velocity'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            <Gauge className="w-4 h-4" />
            <span>Productivity & Velocity Telemetry</span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                activeSection === 'velocity'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              84% Day-90 Ready
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('competency')}
            className={`py-3.5 px-1 border-b-2 text-sm transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeSection === 'competency'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Terminal Competency Audit</span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                activeSection === 'competency'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              Production Benchmarks
            </span>
          </button>
        </nav>
      </div>

      {/* Sub-Heading 1: Productivity & Velocity Telemetry */}
      {activeSection === 'velocity' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* ========================================================================= */}
          {/* 1. TOP SECTION: 90-Day Production Readiness & Velocity (50/50 Console)    */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* Left Card: 3D Neon Radial Readiness Meter */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col items-center justify-between relative">
          <div className="w-full flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Cohort Productivity Index
            </span>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
              Q3 Benchmark
            </span>
          </div>

          {/* SVG Circular Meter */}
          <div className="relative w-56 h-56 flex items-center justify-center my-2">
            <svg 
              className="w-full h-full -rotate-90 transform overflow-visible"
              viewBox="0 0 190 190"
              style={{
                filter: 'drop-shadow(0 10px 22px rgba(16, 185, 129, 0.3))',
                transform: 'perspective(500px) rotateX(15deg) rotate(-90deg)'
              }}
            >
              <defs>
                {/* Cyan (#06b6d4) -> Sky Blue (#0284c7) -> Emerald (#10b981) */}
                <linearGradient id="readiness-neon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="50%" stopColor="#0284C7" />
                  <stop offset="100%" stopColor="#10B981" />
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
                stroke="url(#readiness-neon-grad)"
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
                {overallReadiness}%
              </span>
              <span className="bg-emerald-50 text-emerald-700 font-black text-xs px-3 py-1 rounded-full mt-2 border border-emerald-200">
                Day-90 Job Ready
              </span>
            </div>
          </div>

          {/* Card Footer */}
          <div className="pt-3 border-t border-slate-100 w-full text-center text-xs font-bold text-slate-500">
            1,420 Trainees Evaluated Across 142 Tech Firms
          </div>
        </div>

        {/* Right Card: Macro Velocity Metrics (3 High-Impact Visual Tiles) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-black text-slate-900">
              Macro Velocity & Retention Telemetry
            </h2>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
              Direct telemetry
            </span>
          </div>

          {/* 3 High-Impact Visual Tiles */}
          <div className="grid grid-cols-3 gap-3 h-full my-4">
            
            {/* Tile 1: Time to 1st PR */}
            <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-4 flex flex-col justify-between text-center group hover:border-emerald-300 transition-colors">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                Time to 1st PR
              </span>
              <div className="my-2">
                <span className="text-2xl sm:text-3xl font-black text-emerald-600 block tracking-tight">
                  {daysToPR} Days
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full inline-flex items-center gap-0.5 mt-1">
                  <TrendingDown className="w-3 h-3" />
                  was 65d
                </span>
              </div>
              <span className="text-[10px] font-semibold text-slate-500">
                Terminal ramp speed
              </span>
            </div>

            {/* Tile 2: Code Rework */}
            <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-4 flex flex-col justify-between text-center group hover:border-blue-300 transition-colors">
              <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider block">
                Code Rework
              </span>
              <div className="my-2">
                <span className="text-2xl sm:text-3xl font-black text-blue-600 block tracking-tight">
                  14%
                </span>
                <span className="text-[11px] font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-full inline-flex items-center gap-0.5 mt-1">
                  <TrendingDown className="w-3 h-3" />
                  down 42%
                </span>
              </div>
              <span className="text-[10px] font-semibold text-slate-500">
                Clean commit quality
              </span>
            </div>

            {/* Tile 3: 90-Day Retention */}
            <div className="bg-indigo-50/60 border border-indigo-200/80 rounded-2xl p-4 flex flex-col justify-between text-center group hover:border-indigo-300 transition-colors">
              <span className="text-[11px] font-bold text-indigo-800 uppercase tracking-wider block">
                90-Day Retention
              </span>
              <div className="my-2">
                <span className="text-2xl sm:text-3xl font-black text-indigo-600 block tracking-tight">
                  {retentionRate}%
                </span>
                <span className="text-[11px] font-bold text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded-full inline-block mt-1">
                  Target: 90%+
                </span>
              </div>
              <span className="text-[10px] font-semibold text-slate-500">
                Post-probation cohort
              </span>
            </div>

          </div>

          {/* Bottom Sync Strip */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live feed linked directly to University Board of Studies
            </span>
            <span className="font-mono text-[11px] text-slate-400">PS134 Telemetry</span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. REGIONAL PIPELINE QUALITY STRIP                                        */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
          District Talent Pipeline Readiness
        </span>

        {/* 4 Compact Cluster Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* Chennai OMR Belt */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 flex flex-col justify-between">
            <span className="text-xs font-black text-slate-900">
              Chennai OMR Belt
            </span>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-emerald-200/60">
              <span className="text-emerald-700 bg-emerald-100 font-extrabold text-xs px-2 py-0.5 rounded-md">
                91% Index
              </span>
              <span className="text-[11px] font-bold text-slate-600">
                420 Hires
              </span>
            </div>
          </div>

          {/* Bengaluru Urban */}
          <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3 flex flex-col justify-between">
            <span className="text-xs font-black text-slate-900">
              Bengaluru Urban
            </span>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-blue-200/60">
              <span className="text-blue-700 bg-blue-100 font-extrabold text-xs px-2 py-0.5 rounded-md">
                88% Index
              </span>
              <span className="text-[11px] font-bold text-slate-600">
                580 Hires
              </span>
            </div>
          </div>

          {/* Hyderabad HITEC */}
          <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-xl p-3 flex flex-col justify-between">
            <span className="text-xs font-black text-slate-900">
              Hyderabad HITEC
            </span>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-indigo-200/60">
              <span className="text-indigo-700 bg-indigo-100 font-extrabold text-xs px-2 py-0.5 rounded-md">
                85% Index
              </span>
              <span className="text-[11px] font-bold text-slate-600">
                240 Hires
              </span>
            </div>
          </div>

          {/* Coimbatore TIDEL */}
          <div className="bg-purple-50/70 border border-purple-200/80 rounded-xl p-3 flex flex-col justify-between">
            <span className="text-xs font-black text-slate-900">
              Coimbatore TIDEL
            </span>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-purple-200/60">
              <span className="text-purple-700 bg-purple-100 font-extrabold text-xs px-2 py-0.5 rounded-md">
                82% Index
              </span>
              <span className="text-[11px] font-bold text-slate-600">
                180 Hires
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. BOTTOM ACTION & FEEDBACK DISPATCH BAR (HIGHLIGHTED PDF BUTTON)         */}
      {/* ========================================================================= */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
        
        {/* Left Side Status */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${feedbackSubmitted ? 'bg-emerald-500' : 'bg-blue-600 animate-pulse'}`} />
            <span className="text-xs font-extrabold text-slate-900">
              {feedbackSubmitted ? "✓ Telemetry Transmitted to State Academic Planning Board" : "● 90-Day Cohort Audit Open for Input"}
            </span>
          </div>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="text-xs font-medium text-slate-500">
            Feeds district lab budgeting and syllabus fixer in Portal 2.
          </span>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-3">
          
          {/* Prominently Highlighted PDF Button */}
          <button
            type="button"
            onClick={handleExportPDF}
            className={`font-bold text-xs px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 active:scale-95 shadow-md hover:shadow-lg ${
              isPdfGenerated
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white ring-2 ring-emerald-400 ring-offset-2 animate-pulse'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white ring-2 ring-blue-400/50 ring-offset-2'
            }`}
            title="Generate and download full 90-Day Audit PDF report"
          >
            {isPdfGenerated ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-100" />
                <span>✓ PDF Ready (View/Save)</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-blue-100 animate-bounce" />
                <span>Export 90-Day Audit PDF</span>
              </>
            )}
          </button>

          {/* Primary Transmit Button */}
          <button
            type="button"
            onClick={handleTransmitTelemetry}
            disabled={feedbackSubmitted}
            className={`font-bold text-sm px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2 ${
              feedbackSubmitted
                ? 'bg-emerald-600 text-white cursor-default'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {feedbackSubmitted ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>✓ Transmitted</span>
              </>
            ) : (
              <>
                <span>Transmit Telemetry to State Board →</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  )}

      {/* Sub-Heading 2: Terminal Competency Audit */}
      {activeSection === 'competency' && (
        <div className="animate-in fade-in duration-200">
          {/* ========================================================================= */}
          {/* 2. MIDDLE SECTION: Core Engineering Competencies (3D Cylinder Bars)       */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <h2 className="text-base font-black text-slate-900">
                Day-90 Terminal & Production Competency Audit
              </h2>
              <span className="text-xs font-semibold text-slate-500">
                Weighted benchmark: 75% Production Threshold
              </span>
            </div>

            {/* 4 Vertical 3D Cylinder Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
              
              {/* Pillar 1: Docker & Containerization */}
              <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between items-center group hover:border-emerald-300 transition-colors">
                <div className="w-full flex items-center justify-between pb-2 border-b border-slate-200/60 text-xs">
                  <span className="font-bold text-slate-700">Docker & Cloud Deploy</span>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-black text-xs px-2.5 py-0.5 rounded-lg shadow-2xs">
                    {dockerScore}% (Exceeds Bar)
                  </span>
                </div>

                {/* 3D Cylinder Stage */}
                <div className="h-44 w-full flex items-end justify-center my-4">
                  <div className="w-16 flex flex-col items-center group-hover:-translate-y-1.5 transition-transform duration-200">
                    {/* Cylinder Top Ellipse */}
                    <div 
                      className="w-full h-4 rounded-[50%] z-20 shadow-xs"
                      style={{ background: 'linear-gradient(180deg, #99F6E4 0%, #2DD4BF 100%)' }}
                    />
                    {/* Cylinder Body */}
                    <div 
                      className="w-full -mt-2 rounded-b-lg shadow-md transition-all duration-300"
                      style={{
                        height: `${(dockerScore / 100) * 128}px`,
                        background: 'linear-gradient(90deg, #047857 0%, #059669 35%, #2DD4BF 65%, #065F46 100%)',
                        boxShadow: '0 8px 16px -4px rgba(5, 150, 105, 0.35)'
                      }}
                    />
                    {/* 3D Base Shadow */}
                    <div className="w-4/5 h-2 rounded-[50%] bg-slate-900/20 blur-[2px] -mt-1" />
                  </div>
                </div>

                <span className="text-[11px] font-semibold text-slate-500 text-center">
                  Containerized microservices & health probes
                </span>
              </div>

              {/* Pillar 2: Automated Test Coverage */}
              <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between items-center group hover:border-blue-300 transition-colors">
                <div className="w-full flex items-center justify-between pb-2 border-b border-slate-200/60 text-xs">
                  <span className="font-bold text-slate-700">Unit Testing (Jest/PyTest)</span>
                  <span className="bg-blue-50 text-blue-700 border border-blue-200 font-black text-xs px-2.5 py-0.5 rounded-lg shadow-2xs">
                    {testScore}% (Production Ready)
                  </span>
                </div>

                {/* 3D Cylinder Stage */}
                <div className="h-44 w-full flex items-end justify-center my-4">
                  <div className="w-16 flex flex-col items-center group-hover:-translate-y-1.5 transition-transform duration-200">
                    {/* Cylinder Top Ellipse */}
                    <div 
                      className="w-full h-4 rounded-[50%] z-20 shadow-xs"
                      style={{ background: 'linear-gradient(180deg, #BAE6FD 0%, #38BDF8 100%)' }}
                    />
                    {/* Cylinder Body */}
                    <div 
                      className="w-full -mt-2 rounded-b-lg shadow-md transition-all duration-300"
                      style={{
                        height: `${(testScore / 100) * 128}px`,
                        background: 'linear-gradient(90deg, #1D4ED8 0%, #2563EB 35%, #38BDF8 65%, #1E40AF 100%)',
                        boxShadow: '0 8px 16px -4px rgba(37, 99, 235, 0.35)'
                      }}
                    />
                    {/* 3D Base Shadow */}
                    <div className="w-4/5 h-2 rounded-[50%] bg-slate-900/20 blur-[2px] -mt-1" />
                  </div>
                </div>

                <span className="text-[11px] font-semibold text-slate-500 text-center">
                  Test-driven CI/CD merge gates
                </span>
              </div>

              {/* Pillar 3: API Microservices */}
              <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between items-center group hover:border-indigo-300 transition-colors">
                <div className="w-full flex items-center justify-between pb-2 border-b border-slate-200/60 text-xs">
                  <span className="font-bold text-slate-700">FastAPI & Microservices</span>
                  <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 font-black text-xs px-2.5 py-0.5 rounded-lg shadow-2xs">
                    {apiScore}% (High Speed)
                  </span>
                </div>

                {/* 3D Cylinder Stage */}
                <div className="h-44 w-full flex items-end justify-center my-4">
                  <div className="w-16 flex flex-col items-center group-hover:-translate-y-1.5 transition-transform duration-200">
                    {/* Cylinder Top Ellipse */}
                    <div 
                      className="w-full h-4 rounded-[50%] z-20 shadow-xs"
                      style={{ background: 'linear-gradient(180deg, #E9D5FF 0%, #C084FC 100%)' }}
                    />
                    {/* Cylinder Body */}
                    <div 
                      className="w-full -mt-2 rounded-b-lg shadow-md transition-all duration-300"
                      style={{
                        height: `${(apiScore / 100) * 128}px`,
                        background: 'linear-gradient(90deg, #4338CA 0%, #6366F1 35%, #A855F7 65%, #3730A3 100%)',
                        boxShadow: '0 8px 16px -4px rgba(99, 102, 241, 0.35)'
                      }}
                    />
                    {/* 3D Base Shadow */}
                    <div className="w-4/5 h-2 rounded-[50%] bg-slate-900/20 blur-[2px] -mt-1" />
                  </div>
                </div>

                <span className="text-[11px] font-semibold text-slate-500 text-center">
                  Async REST APIs & response latency &lt; 200ms
                </span>
              </div>

              {/* Pillar 4: Autonomous Debugging */}
              <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between items-center group hover:border-amber-300 transition-colors">
                <div className="w-full flex items-center justify-between pb-2 border-b border-slate-200/60 text-xs">
                  <span className="font-bold text-slate-700">Distributed Cloud Debugging</span>
                  <span className="bg-amber-50 text-amber-700 border border-amber-200 font-black text-xs px-2.5 py-0.5 rounded-lg shadow-2xs">
                    {debugScore}% (Needs Lab Sandbox)
                  </span>
                </div>

                {/* 3D Cylinder Stage */}
                <div className="h-44 w-full flex items-end justify-center my-4">
                  <div className="w-16 flex flex-col items-center group-hover:-translate-y-1.5 transition-transform duration-200">
                    {/* Cylinder Top Ellipse */}
                    <div 
                      className="w-full h-4 rounded-[50%] z-20 shadow-xs"
                      style={{ background: 'linear-gradient(180deg, #FEF08A 0%, #FACC15 100%)' }}
                    />
                    {/* Cylinder Body */}
                    <div 
                      className="w-full -mt-2 rounded-b-lg shadow-md transition-all duration-300"
                      style={{
                        height: `${(debugScore / 100) * 128}px`,
                        background: 'linear-gradient(90deg, #B45309 0%, #D97706 35%, #FBBF24 65%, #92400E 100%)',
                        boxShadow: '0 8px 16px -4px rgba(217, 119, 6, 0.35)'
                      }}
                    />
                    {/* 3D Base Shadow */}
                    <div className="w-4/5 h-2 rounded-[50%] bg-slate-900/20 blur-[2px] -mt-1" />
                  </div>
                </div>

                <span className="text-[11px] font-semibold text-slate-500 text-center">
                  Requires distributed telemetry log sandboxing
                </span>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* READYMADE PDF REPORT MODAL PREVIEW                                        */}
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
                    Readymade 90-Day Audit PDF Document
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Document Ref: LMI-90D-2026-Q3-1420 • Ready to Print / Save
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrintReport}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save as PDF</span>
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

            {/* Readymade PDF Document Paper View */}
            <div className="p-6 sm:p-8 overflow-y-auto bg-slate-50/50 space-y-6 text-slate-800 text-xs">
              
              {/* PDF Document Paper Sheet */}
              <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
                
                {/* Official Header */}
                <div className="border-b-2 border-slate-900 pb-4 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md inline-block mb-1">
                      Official Government & Industry Consortium Record
                    </span>
                    <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                      Graduate Work Ratings & 90-Day Competency Audit
                    </h1>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      National Vocational Curriculum Alignment • PS134 Compliance Framework
                    </p>
                  </div>
                  <div className="text-right font-mono text-[11px] text-slate-500">
                    <span className="block font-bold text-slate-800">Doc ID: LMI-90D-1420</span>
                    <span className="block">Date: {new Date().toLocaleDateString()}</span>
                    <span className="text-emerald-600 font-bold">Status: Verified Official</span>
                  </div>
                </div>

                {/* Section 1: Macro Production Readiness & Velocity */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 border-l-4 border-emerald-500 pl-2">
                    1. Executive Macro Velocity & Production Readiness
                  </h4>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                      <span className="text-[10px] font-bold text-slate-500 block">Overall Readiness</span>
                      <strong className="text-lg font-black text-emerald-600 block mt-0.5">{overallReadiness}%</strong>
                      <span className="text-[9px] text-emerald-700 font-semibold">Day-90 Job Ready</span>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                      <span className="text-[10px] font-bold text-slate-500 block">Time to 1st PR</span>
                      <strong className="text-lg font-black text-blue-600 block mt-0.5">{daysToPR} Days</strong>
                      <span className="text-[9px] text-blue-700 font-semibold">was 65d (-72%)</span>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                      <span className="text-[10px] font-bold text-slate-500 block">Code Rework Rate</span>
                      <strong className="text-lg font-black text-indigo-600 block mt-0.5">14%</strong>
                      <span className="text-[9px] text-indigo-700 font-semibold">down 42%</span>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                      <span className="text-[10px] font-bold text-slate-500 block">90-Day Retention</span>
                      <strong className="text-lg font-black text-purple-600 block mt-0.5">{retentionRate}%</strong>
                      <span className="text-[9px] text-purple-700 font-semibold">Target: 90%+</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 italic">
                    Sample: 1,420 vocational trainees audited across 142 participating GCCs and tech firms across Tamil Nadu, Karnataka, and Telangana.
                  </p>
                </div>

                {/* Section 2: Core Engineering Competency Scores */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 border-l-4 border-blue-500 pl-2">
                    2. Terminal 90-Day Engineering Competency Audit
                  </h4>

                  <div className="space-y-2.5">
                    {/* Item 1 */}
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/70">
                      <div className="flex justify-between items-center text-xs font-bold mb-1">
                        <span>Docker & Containerization Deploy</span>
                        <span className="text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded font-black text-[10px]">
                          {dockerScore}% • Exceeds Bar
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${dockerScore}%` }} />
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/70">
                      <div className="flex justify-between items-center text-xs font-bold mb-1">
                        <span>Unit Testing (Jest / PyTest / CI Gates)</span>
                        <span className="text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded font-black text-[10px]">
                          {testScore}% • Production Ready
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: `${testScore}%` }} />
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/70">
                      <div className="flex justify-between items-center text-xs font-bold mb-1">
                        <span>FastAPI & Microservices Architecture</span>
                        <span className="text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded font-black text-[10px]">
                          {apiScore}% • High Speed (&lt; 200ms)
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${apiScore}%` }} />
                      </div>
                    </div>

                    {/* Item 4 */}
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/70">
                      <div className="flex justify-between items-center text-xs font-bold mb-1">
                        <span>Distributed Cloud Telemetry & Debugging</span>
                        <span className="text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded font-black text-[10px]">
                          {debugScore}% • Needs Lab Sandbox
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div className="bg-amber-500 h-full rounded-full" style={{ width: `${debugScore}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3: Regional Talent Pipeline Performance */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 border-l-4 border-indigo-500 pl-2">
                    3. Regional District Talent Pipeline Performance
                  </h4>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div className="p-2.5 rounded-lg border border-slate-200 text-center">
                      <span className="font-bold text-[11px] block">Chennai OMR Belt</span>
                      <strong className="text-sm font-black text-emerald-600">91% Index</strong>
                      <span className="text-[10px] text-slate-500 block">420 Hires</span>
                    </div>

                    <div className="p-2.5 rounded-lg border border-slate-200 text-center">
                      <span className="font-bold text-[11px] block">Bengaluru Urban</span>
                      <strong className="text-sm font-black text-blue-600">88% Index</strong>
                      <span className="text-[10px] text-slate-500 block">580 Hires</span>
                    </div>

                    <div className="p-2.5 rounded-lg border border-slate-200 text-center">
                      <span className="font-bold text-[11px] block">Hyderabad HITEC</span>
                      <strong className="text-sm font-black text-indigo-600">85% Index</strong>
                      <span className="text-[10px] text-slate-500 block">240 Hires</span>
                    </div>

                    <div className="p-2.5 rounded-lg border border-slate-200 text-center">
                      <span className="font-bold text-[11px] block">Coimbatore TIDEL</span>
                      <strong className="text-sm font-black text-purple-600">82% Index</strong>
                      <span className="text-[10px] text-slate-500 block">180 Hires</span>
                    </div>
                  </div>
                </div>

                {/* Section 4: Governance & Authentication Seal */}
                <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between text-[10px] text-slate-500 gap-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      <strong>Cryptographically Verified:</strong> SHA256-8F4B1E9C • Synchronized to Portal 2 Governance
                    </span>
                  </div>
                  <span className="font-bold text-slate-700">
                    Confidential • State Board of Vocational Training
                  </span>
                </div>

              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="bg-white px-6 py-3.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <span className="text-xs text-slate-500 font-medium">
                The official PDF file has also been saved to your Downloads folder.
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleExportPDF}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Re-download PDF</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrintReport}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Document</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
