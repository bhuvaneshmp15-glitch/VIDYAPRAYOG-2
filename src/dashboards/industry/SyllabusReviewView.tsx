import React, { useState, useEffect } from 'react';
import { 
  Check, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  X, 
  MessageSquare,
  Lock,
  Cpu,
  GraduationCap,
  GitBranch,
  ShieldCheck,
  Zap,
  Building2,
  Users,
  FileCheck2,
  Layers
} from 'lucide-react';

export const SyllabusReviewView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'endorsement' | 'workload'>('endorsement');

  // Live animated telemetry states (initialize strictly at 0)
  const [signOffProgress, setSignOffProgress] = useState<number>(0);
  const [pastLab, setPastLab] = useState<number>(0);
  const [presentLab, setPresentLab] = useState<number>(0);
  const [gpuReadiness, setGpuReadiness] = useState<number>(0);
  const [facultyTrain, setFacultyTrain] = useState<number>(0);
  const [examFormat, setExamFormat] = useState<number>(0);

  // Sign-off state
  const [isSigned, setIsSigned] = useState<boolean>(false);

  // Modal & feedback
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState<boolean>(false);
  const [revisionTopic, setRevisionTopic] = useState<string>('Unit 1: Vector Search');
  const [revisionNote, setRevisionNote] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Smooth ease-out animation on mount
  useEffect(() => {
    const duration = 1200; // ms
    const startTime = performance.now();

    const animateMount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic

      setSignOffProgress(Math.round(eased * 80));
      setPastLab(Math.round(eased * 10));
      setPresentLab(Math.round(eased * 75));
      setGpuReadiness(Math.round(eased * 100));
      setFacultyTrain(Math.round(eased * 92));
      setExamFormat(Math.round(eased * 100));

      if (progress < 1) {
        requestAnimationFrame(animateMount);
      }
    };

    requestAnimationFrame(animateMount);
  }, []);

  // Action Handler: handleSignOff
  const handleSignOff = () => {
    if (isSigned) return;

    setIsSigned(true);
    setToastMessage('Course digitally stamped! Official endorsement transmitted directly to Board of Studies.');
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);

    const startVal = signOffProgress;
    const targetVal = 100;
    const duration = 800; // ms
    const startTime = performance.now();

    const animateSign = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setSignOffProgress(Math.round(startVal + (targetVal - startVal) * eased));

      if (progress < 1) {
        requestAnimationFrame(animateSign);
      }
    };

    requestAnimationFrame(animateSign);
  };

  // Revision submission handler
  const handleRevisionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRevisionModalOpen(false);
    setToastMessage(`Revision suggestion for "${revisionTopic}" queued for Academic Senate.`);
    setRevisionNote('');
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // SVG Circular Meter math
  const radius = 68;
  const circumference = 2 * Math.PI * radius; // ~ 427.256
  const strokeDashoffset = circumference - (circumference * signOffProgress) / 100;

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
          Syllabus Review & Digital Endorsement
        </h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Consortium validation console for emerging vocational courseware
        </p>
      </div>

      {/* Persistent Sub-Heading Navigation Bar */}
      <div className="border-b border-slate-200 mb-6">
        <nav className="flex space-x-8 overflow-x-auto" aria-label="Sub-navigation">
          <button
            type="button"
            onClick={() => setActiveSection('endorsement')}
            className={`py-3.5 px-1 border-b-2 text-sm transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeSection === 'endorsement'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Consortium Endorsement & Audit</span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                activeSection === 'endorsement'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              80% Consensus Lock
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('workload')}
            className={`py-3.5 px-1 border-b-2 text-sm transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeSection === 'workload'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Practical Workload Transformation</span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                activeSection === 'workload'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              75% Lab Practical
            </span>
          </button>
        </nav>
      </div>

      {/* Sub-Heading 1: Consortium Endorsement & Audit */}
      {activeSection === 'endorsement' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* ========================================================================= */}
          {/* 1. TOP SECTION: 3D Neon Radial Meter & Consortium Trust Tiles (50/50)     */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* Left Card: 3D Neon Consensus Arc */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col items-center justify-center relative">
          <div className="w-full flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
            <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider">
              Consortium Consensus Arc
            </span>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
              Live Telemetry
            </span>
          </div>

          {/* SVG Circular Meter with Neon Arc */}
          <div className="relative w-56 h-56 flex items-center justify-center my-3">
            <svg 
              className="w-full h-full -rotate-90 transform overflow-visible"
              viewBox="0 0 190 190"
              style={{
                filter: 'drop-shadow(0 10px 20px rgba(59, 130, 246, 0.35))',
                transform: 'perspective(500px) rotateX(15deg) rotate(-90deg)'
              }}
            >
              <defs>
                {/* Linear gradient: #06b6d4 -> #3b82f6 -> #8b5cf6 */}
                <linearGradient id="neon-arc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="50%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>

              {/* Background Inactive Track (strokeWidth: 22) */}
              <circle
                cx="95"
                cy="95"
                r={radius}
                className="text-slate-100"
                strokeWidth="22"
                stroke="currentColor"
                fill="transparent"
              />

              {/* Active Animated Arc (strokeWidth: 22) */}
              <circle
                cx="95"
                cy="95"
                r={radius}
                stroke="url(#neon-arc-grad)"
                strokeWidth="22"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-300 ease-out"
              />
            </svg>

            {/* Center Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-4xl font-black text-slate-900 tracking-tight">
                {signOffProgress}%
              </span>
              <span className="bg-emerald-50 text-emerald-700 font-bold text-xs px-3 py-1 rounded-full mt-2 border border-emerald-200">
                {isSigned ? "5 of 5 Approved" : "4 of 5 Approved"}
              </span>
            </div>
          </div>

          <div className="text-[11px] font-semibold text-slate-400 mt-1">
            Consortium Quorum: 80% Threshold Reached
          </div>
        </div>

        {/* Right Card: Curriculum Specification & Trust Tiles (NO SENTENCE PARAGRAPHS) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            {/* Title & Credits */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Cloud-Native GenAI Engineering
              </h2>
              <span className="bg-blue-50 text-blue-700 font-bold text-xs px-3 py-1 rounded-full border border-blue-200">
                4 Credits • 60 Hours
              </span>
            </div>

            {/* Meta Badges */}
            <div className="flex flex-wrap items-center gap-2 mt-3 text-xs font-bold">
              <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                💻 CSE
              </span>
              <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                🌐 IT
              </span>
              <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                🤖 AI&DS
              </span>
              <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                🧠 AIML
              </span>
            </div>

            {/* 5 Consortium Trust Tiles */}
            <div className="grid grid-cols-5 gap-2.5 my-5">
              {/* Tile 1: Zoho */}
              <div className="bg-emerald-50/70 border border-emerald-300 rounded-xl p-2.5 text-center flex flex-col items-center justify-between">
                <span className="font-black text-xs text-slate-900">Zoho</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-700 font-black px-1.5 py-0.5 rounded mt-1">
                  ✓ SIGNED
                </span>
              </div>

              {/* Tile 2: TCS */}
              <div className="bg-emerald-50/70 border border-emerald-300 rounded-xl p-2.5 text-center flex flex-col items-center justify-between">
                <span className="font-black text-xs text-slate-900">TCS</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-700 font-black px-1.5 py-0.5 rounded mt-1">
                  ✓ SIGNED
                </span>
              </div>

              {/* Tile 3: Infosys */}
              <div className="bg-emerald-50/70 border border-emerald-300 rounded-xl p-2.5 text-center flex flex-col items-center justify-between">
                <span className="font-black text-xs text-slate-900">Infosys</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-700 font-black px-1.5 py-0.5 rounded mt-1">
                  ✓ SIGNED
                </span>
              </div>

              {/* Tile 4: Cognizant */}
              <div className="bg-emerald-50/70 border border-emerald-300 rounded-xl p-2.5 text-center flex flex-col items-center justify-between">
                <span className="font-black text-xs text-slate-900">Cognizant</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-700 font-black px-1.5 py-0.5 rounded mt-1">
                  ✓ SIGNED
                </span>
              </div>

              {/* Tile 5: Your Firm (Dynamic Flip) */}
              <div className={`p-2.5 text-center flex flex-col items-center justify-between transition-all duration-300 ${
                isSigned 
                  ? 'bg-emerald-50/70 border border-emerald-300 rounded-xl shadow-xs' 
                  : 'bg-amber-50 border-2 border-dashed border-amber-400 rounded-xl animate-pulse'
              }`}>
                <span className={`font-black text-xs ${isSigned ? 'text-slate-900' : 'text-amber-900'}`}>
                  YOUR FIRM
                </span>
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded mt-1 ${
                  isSigned 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {isSigned ? '✓ SIGNED' : '⚡ STAMP'}
                </span>
              </div>
            </div>
          </div>

          {/* Impact Strip */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs font-bold text-slate-700 gap-2">
            <span>🏛️ 12 Colleges Queued</span>
            <span>•</span>
            <span>👥 1,800 Cohort Trainees</span>
            <span>•</span>
            <span className="text-blue-700 font-black">🔒 Direct Board Lock</span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4. REALITY AUDIT: Live Bar Graphs (Animating From Zero)                   */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-black text-slate-900">
          College Infrastructure & Audit Telemetry
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          
          {/* Gauge 1: Cloud GPU Hardware */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-800 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-cyan-600" />
                Cloud GPU Instances
              </span>
              <span className="text-cyan-700 font-black">
                {gpuReadiness}% Provisioned
              </span>
            </div>
            {/* Animated Bar */}
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${gpuReadiness}%` }}
              />
            </div>
            <span className="text-[11px] font-semibold text-slate-400 block">
              Tier-1 Cluster Verified
            </span>
          </div>

          {/* Gauge 2: Faculty Enablement */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-800 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                Professors Certified
              </span>
              <span className="text-blue-700 font-black">
                {facultyTrain}% Cleared
              </span>
            </div>
            {/* Animated Bar */}
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${facultyTrain}%` }}
              />
            </div>
            <span className="text-[11px] font-semibold text-slate-400 block">
              NASSCOM FutureSkills Certified
            </span>
          </div>

          {/* Gauge 3: Practical Exam Mode */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-800 flex items-center gap-1.5">
                <GitBranch className="w-4 h-4 text-emerald-600" />
                GitHub Evaluation
              </span>
              <span className="text-emerald-700 font-black">
                {examFormat}% Replaces Written Exams
              </span>
            </div>
            {/* Animated Bar */}
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-300"
                style={{ width: `${examFormat}%` }}
              />
            </div>
            <span className="text-[11px] font-semibold text-slate-400 block">
              PR Merge Benchmark Mandated
            </span>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. BOTTOM ACTION & VALIDATION BAR                                         */}
      {/* ========================================================================= */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
        
        {/* Left Side Status */}
        <div className="flex items-center gap-2.5">
          <span className={`w-2.5 h-2.5 rounded-full ${isSigned ? 'bg-emerald-500' : 'bg-amber-500 animate-ping'}`} />
          <span className="text-xs font-black text-slate-800">
            {isSigned ? "Locked & Transmitted to Board of Studies" : "Awaiting Your Digital Endorsement"}
          </span>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsRevisionModalOpen(true)}
            className="border border-slate-300 text-slate-700 px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-50 transition-colors shadow-2xs"
          >
            Suggest Revision
          </button>

          <button
            type="button"
            onClick={handleSignOff}
            disabled={isSigned}
            className={`font-bold text-sm px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2 ${
              isSigned
                ? 'bg-emerald-600 text-white cursor-default'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isSigned ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>✓ Validated & Locked</span>
              </>
            ) : (
              <>
                <span>Digitally Sign & Lock Course →</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  )}

      {/* Sub-Heading 2: Practical Workload Transformation */}
      {activeSection === 'workload' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* ========================================================================= */}
          {/* 2. MIDDLE SECTION: Workload Shift Dual Comparative Bar Graph              */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-base font-black text-slate-900">
              Curriculum Practical Workload Transformation
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
              
              {/* Left Column: PAST CURRICULUM (OBSOLETE) */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-rose-600 tracking-wider">
                    PAST CURRICULUM (OBSOLETE)
                  </span>
                  <span className="bg-rose-50 text-rose-700 border border-rose-200 font-bold text-xs px-2.5 py-0.5 rounded-full">
                    Theoretical Heavy
                  </span>
                </div>

                {/* Stacked 3D horizontal bar */}
                <div className="h-7 rounded-full overflow-hidden flex bg-slate-100 p-0.5 border border-slate-200 shadow-inner">
                  {/* Lab 10% */}
                  <div 
                    className="bg-slate-400 text-white font-bold text-[10px] flex items-center justify-center rounded-l-full transition-all duration-300"
                    style={{ width: `${pastLab}%` }}
                  >
                    {pastLab > 5 && `${pastLab}% Lab`}
                  </div>
                  {/* Theory 90% */}
                  <div 
                    className="bg-rose-400 text-white font-bold text-xs flex items-center justify-center rounded-r-full transition-all duration-300"
                    style={{ width: `${100 - pastLab}%` }}
                  >
                    {100 - pastLab}% Theory
                  </div>
                </div>

                {/* Legend below */}
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 pt-1">
                  <span>6h Lab (10%)</span>
                  <span className="text-slate-400">vs</span>
                  <span>54h Theory (90%)</span>
                </div>
              </div>

              {/* Right Column: PROPOSED BLUEPRINT (LMI-CAP) */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-emerald-600 tracking-wider">
                    PROPOSED BLUEPRINT (LMI-CAP)
                  </span>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs px-2.5 py-0.5 rounded-full">
                    4.5x Hands-On Boost
                  </span>
                </div>

                {/* Stacked 3D horizontal bar */}
                <div className="h-7 rounded-full overflow-hidden flex bg-slate-100 p-0.5 border border-slate-200 shadow-inner">
                  {/* Lab 75% */}
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-bold text-xs flex items-center justify-center shadow-md rounded-l-full transition-all duration-300"
                    style={{ width: `${presentLab}%` }}
                  >
                    {presentLab}% Lab
                  </div>
                  {/* Theory 25% */}
                  <div 
                    className="bg-indigo-500 text-white font-bold text-[10px] flex items-center justify-center rounded-r-full transition-all duration-300"
                    style={{ width: `${100 - presentLab}%` }}
                  >
                    {100 - presentLab > 5 && `${100 - presentLab}% Theory`}
                  </div>
                </div>

                {/* Legend below */}
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 pt-1">
                  <span className="text-emerald-700 font-extrabold">45h Lab (75%)</span>
                  <span className="text-slate-400">vs</span>
                  <span>15h Theory (25%)</span>
                </div>
              </div>

            </div>
          </div>

          {/* ========================================================================= */}
          {/* 3. THE 4 PRACTICAL UNIT CARDS (Zero Descriptive Sentences)                */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            
            {/* Card 1: UNIT 01 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:-translate-y-1 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 block mb-1">
                  UNIT 01
                </span>
                <h4 className="text-base font-black text-slate-900">
                  Vector Search
                </h4>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-0.5 rounded-md border border-slate-200">
                    Qdrant
                  </span>
                  <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-0.5 rounded-md border border-slate-200">
                    Python
                  </span>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100">
                <span className="bg-emerald-50 text-emerald-700 font-bold text-xs px-2.5 py-1 rounded-lg border border-emerald-200 inline-block">
                  ★ 10h Practical Lab
                </span>
              </div>
            </div>

            {/* Card 2: UNIT 02 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:-translate-y-1 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 block mb-1">
                  UNIT 02
                </span>
                <h4 className="text-base font-black text-slate-900">
                  Docker Microservices
                </h4>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-0.5 rounded-md border border-slate-200">
                    Docker
                  </span>
                  <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-0.5 rounded-md border border-slate-200">
                    FastAPI
                  </span>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100">
                <span className="bg-emerald-50 text-emerald-700 font-bold text-xs px-2.5 py-1 rounded-lg border border-emerald-200 inline-block">
                  ★ 12h Practical Lab
                </span>
              </div>
            </div>

            {/* Card 3: UNIT 03 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:-translate-y-1 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 block mb-1">
                  UNIT 03
                </span>
                <h4 className="text-base font-black text-slate-900">
                  Production RAG
                </h4>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-0.5 rounded-md border border-slate-200">
                    LlamaIndex
                  </span>
                  <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-0.5 rounded-md border border-slate-200">
                    Qdrant
                  </span>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100">
                <span className="bg-emerald-50 text-emerald-700 font-bold text-xs px-2.5 py-1 rounded-lg border border-emerald-200 inline-block">
                  ★ 11h Practical Lab
                </span>
              </div>
            </div>

            {/* Card 4: UNIT 04 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:-translate-y-1 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 block mb-1">
                  UNIT 04
                </span>
                <h4 className="text-base font-black text-slate-900">
                  CI/CD Pipelines
                </h4>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-0.5 rounded-md border border-slate-200">
                    GitHub Actions
                  </span>
                  <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-0.5 rounded-md border border-slate-200">
                    AWS
                  </span>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100">
                <span className="bg-emerald-50 text-emerald-700 font-bold text-xs px-2.5 py-1 rounded-lg border border-emerald-200 inline-block">
                  ★ 12h Practical Lab
                </span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUGGEST REVISION MODAL                                                    */}
      {/* ========================================================================= */}
      {isRevisionModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <h3 className="text-base font-black text-slate-900">
                  Suggest Revision
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsRevisionModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRevisionSubmit} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Target Course Unit
                </label>
                <select
                  value={revisionTopic}
                  onChange={(e) => setRevisionTopic(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-800"
                >
                  <option value="Unit 1: Vector Search">Unit 1: Vector Search</option>
                  <option value="Unit 2: Docker Microservices">Unit 2: Docker Microservices</option>
                  <option value="Unit 3: Production RAG">Unit 3: Production RAG</option>
                  <option value="Unit 4: CI/CD Pipelines">Unit 4: CI/CD Pipelines</option>
                  <option value="Workload Distribution">Workload Distribution (Lab / Theory)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Adjustment Details
                </label>
                <textarea
                  rows={3}
                  required
                  value={revisionNote}
                  onChange={(e) => setRevisionNote(e.target.value)}
                  placeholder="Specify tool or hours adjustments..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsRevisionModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
                >
                  Submit Revision →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
