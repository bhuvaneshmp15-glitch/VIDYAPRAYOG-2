import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  CheckCircle2, 
  Clock, 
  X, 
  AlertTriangle, 
  Award, 
  Zap, 
  Target, 
  Layers, 
  BarChart3, 
  Filter, 
  Code2, 
  Check, 
  Cpu, 
  CheckCircle 
} from 'lucide-react';

type SubTabType = 'assessment' | 'profile' | 'gap';

interface ScenarioQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

const DEVOPS_QUESTIONS: ScenarioQuestion[] = [
  {
    id: 1,
    question: "In Kubernetes, which controller should be configured to prevent nodes from evicting critical microservices during automated OS kernel rollouts?",
    options: [
      "PodDisruptionBudget (PDB) with minAvailable threshold",
      "HorizontalPodAutoscaler (HPA) targeting CPU utilization",
      "ReplicaSet LimitRange default definition",
      "NodeAffinity Toleration with preferredDuringScheduling"
    ],
    correctIndex: 0,
  },
  {
    id: 2,
    question: "In a zero-downtime Blue/Green deployment over NGINX Ingress, which metric guarantees traffic shifting integrity before decommissioning blue pods?",
    options: [
      "HTTP 5xx error rate < 0.01% on canary endpoints",
      "CPU throttling telemetry on worker daemonsets",
      "TCP keep-alive timeouts on container proxies",
      "Storage volume IOPS consumption under 50%"
    ],
    correctIndex: 0,
  },
  {
    id: 3,
    question: "How should secrets and TLS certificates be dynamically injected into stateless FastAPI containers to conform with ISO-27001 production compliance?",
    options: [
      "Mounted as encrypted memory-backed volumes via HashiCorp Vault / CSI Secret Provider",
      "Hardcoded into multi-stage Docker build arguments (ARG/ENV)",
      "Stored in public CI/CD repository environment files",
      "Injected via unencrypted environment variables in docker-compose"
    ],
    correctIndex: 0,
  },
  {
    id: 4,
    question: "When designing high-throughput vector embedding search pipelines for factory telemetry, which index architecture minimizes retrieval latency for cosine similarity?",
    options: [
      "HNSW (Hierarchical Navigable Small World) graph index",
      "B-Tree cluster index with composite keys",
      "Inverted Full-Text index with BM25 ranking",
      "Linear flat brute-force scan table"
    ],
    correctIndex: 0,
  },
  {
    id: 5,
    question: "In distributed microservices, what architectural pattern prevents cascading timeouts across service meshes during third-party API gateway failure?",
    options: [
      "Circuit Breaker pattern with exponential backoff and fallback caching",
      "Synchronous blocking retry loops with zero delay",
      "Increasing thread pool allocation indefinitely",
      "Disabling HTTP keep-alive on worker connection pools"
    ],
    correctIndex: 0,
  }
];

interface GapDomainData {
  id: string;
  title: string;
  verifiedPct: number;
  deficitPct: number;
  isRedAlert?: boolean;
  deficitLabel: string;
  statusBadge: string;
  badgeColorClass: string;
  badgeDotClass: string;
  keywords: string[];
  verdict: string;
}

const GAP_DOMAINS: GapDomainData[] = [
  {
    id: 'employer',
    title: 'Employer Technical Screens',
    verifiedPct: 72,
    deficitPct: 28,
    deficitLabel: 'Wrong',
    statusBadge: 'Production Capable',
    badgeColorClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    badgeDotClass: 'bg-emerald-400',
    keywords: ['FastAPI', 'REST Endpoints', 'Async/Await', 'Pydantic Models', 'JWT Auth'],
    verdict: 'Demonstrates strong API design and route handling. Minor deficit identified in asynchronous error-handling middleware.'
  },
  {
    id: 'coding',
    title: 'Proctored Coding Arena',
    verifiedPct: 80,
    deficitPct: 20,
    deficitLabel: 'Wrong',
    statusBadge: 'Top 15th Percentile',
    badgeColorClass: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
    badgeDotClass: 'bg-indigo-400',
    keywords: ['Dynamic Programming', 'Graph Traversal', 'Binary Trees', 'Memory Optimization', 'O(log N)'],
    verdict: 'Excellent runtime complexity and algorithmic precision across core data structures.'
  },
  {
    id: 'infra',
    title: 'Infrastructure & Cloud',
    verifiedPct: 47,
    deficitPct: 53,
    isRedAlert: true,
    deficitLabel: 'Deficit',
    statusBadge: 'Critical Requisition Deficit',
    badgeColorClass: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    badgeDotClass: 'bg-rose-400',
    keywords: ['Docker Multi-Stage', 'Kubernetes Pods', 'Linux Systemd', 'Container Isolation', 'CI/CD Actions'],
    verdict: 'Primary hiring bottleneck! Fails containerization runtimes and orchestrator health-check standards required by 18 cluster jobs.'
  },
  {
    id: 'aptitude',
    title: 'Cognitive Aptitude',
    verifiedPct: 65,
    deficitPct: 35,
    deficitLabel: 'Wrong',
    statusBadge: 'Baseline Benchmark Satisfied',
    badgeColorClass: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    badgeDotClass: 'bg-amber-400',
    keywords: ['Algorithmic Logic', 'Root Cause Triage', 'Data Interpretation', 'Deductive Proofs'],
    verdict: 'Meets baseline qualifying criteria for campus drives; requires speed optimization on logical deduction puzzles.'
  }
];

export const SkillTestScoreView: React.FC = () => {
  // Navigation State
  const [activeSubTab, setActiveSubTab] = useState<'assessment' | 'profile' | 'gap'>('assessment');

  // Test Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeTestTitle, setActiveTestTitle] = useState<string>("Cloud DevOps & K8s Pipeline Screen (Chennai OMR Requisition)");
  const [activeTestPassCriteria, setActiveTestPassCriteria] = useState<string>("Pass Threshold: 65%");
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timerSeconds, setTimerSeconds] = useState<number>(1796); // 29 mins 56 secs
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Animation States
  const [gaugeProgress, setGaugeProgress] = useState<number>(0);
  const [ledAnimated, setLedAnimated] = useState<boolean>(false);
  const [hasCompletedTest, setHasCompletedTest] = useState<boolean>(false);
  const [latestScore, setLatestScore] = useState<{ score: number; total: number } | null>(null);

  // Sub-Tab 3: Skill Gap Analysis Animation & Inspection State
  const [gapAnimated, setGapAnimated] = useState<boolean>(false);
  const [selectedDomain, setSelectedDomain] = useState<string | null>('infra');

  // Trigger Toast Helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 4500);
  };

  // Timer Countdown Logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isModalOpen) {
      interval = setInterval(() => {
        setTimerSeconds(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isModalOpen]);

  // Animated Gauge & Sequential LED Fill on Mount or Tab switch
  useEffect(() => {
    if (activeSubTab === 'profile') {
      setGaugeProgress(0);
      setLedAnimated(false);

      const duration = 1200;
      const startTime = performance.now();
      let frameId: number;

      const animateGauge = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
        setGaugeProgress(eased);

        if (progress < 1) {
          frameId = requestAnimationFrame(animateGauge);
        }
      };

      frameId = requestAnimationFrame(animateGauge);

      // Trigger sequential LED dot illumination after 150ms
      const ledTimer = setTimeout(() => {
        setLedAnimated(true);
      }, 150);

      return () => {
        cancelAnimationFrame(frameId);
        clearTimeout(ledTimer);
      };
    }
  }, [activeSubTab]);

  // Gap Analysis Mount & Activation Animation Trigger (150ms delay, resets on tab switch)
  useEffect(() => {
    if (activeSubTab === 'gap') {
      setGapAnimated(false);
      const timer = setTimeout(() => {
        setGapAnimated(true);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      setGapAnimated(false);
    }
  }, [activeSubTab]);

  // Format Time Helper
  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Handle Test Launch
  const handleStartTest = (title: string, passCriteria: string = "Pass Threshold: 65%") => {
    setActiveTestTitle(title);
    setActiveTestPassCriteria(passCriteria);
    setSelectedAnswers({});
    setTimerSeconds(1796);
    setIsModalOpen(true);
  };

  // Handle Option Selection
  const handleSelectOption = (questionId: number, optionIdx: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  // Handle Test Submission
  const handleSubmitTest = () => {
    let score = 0;
    DEVOPS_QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });

    setLatestScore({ score, total: DEVOPS_QUESTIONS.length });
    setHasCompletedTest(true);
    setIsModalOpen(false);
    
    triggerToast(`✓ Assessment Verified! Scored ${score}/${DEVOPS_QUESTIONS.length} (${Math.round((score / DEVOPS_QUESTIONS.length) * 100)}%). Factory Readiness updated to 78%.`);
    setActiveSubTab('profile');
  };

  // Technical Skills Data
  const technicalSkills = [
    {
      name: "FastAPI Microservices & REST Endpoints",
      score: 14,
      isDeficit: false,
    },
    {
      name: "Cloud DevOps & Docker Runtimes",
      score: 12,
      isDeficit: false,
    },
    {
      name: "Database Architecture & Vector DBs",
      score: 11,
      isDeficit: false,
    },
    {
      name: "Applied GenAI & Autonomous Agents",
      score: 7,
      isDeficit: true,
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2.5 border border-slate-700 animate-bounce">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Skill Test &amp; Score
        </h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Benchmarking candidate competencies against active Portal 1 industrial hiring requisitions and factory needs
        </p>
      </div>

      {/* ========================================================================= */}
      {/* SUB-NAV TAB ARCHITECTURE                                                  */}
      {/* ========================================================================= */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-8" aria-label="Tabs">
          
          {/* Tab 1: Skill Assessment */}
          <button
            type="button"
            onClick={() => setActiveSubTab('assessment')}
            className={`py-3.5 px-1 border-b-2 text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'assessment'
                ? 'border-blue-600 text-blue-600 font-black'
                : 'border-transparent text-slate-500 hover:text-slate-800 font-bold'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Skill Assessment</span>
            <span className="bg-blue-100 text-blue-800 text-[10px] font-black px-2 py-0.5 rounded-full">
              2 Pending
            </span>
          </button>

          {/* Tab 2: Skill Profile */}
          <button
            type="button"
            onClick={() => setActiveSubTab('profile')}
            className={`py-3.5 px-1 border-b-2 text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'profile'
                ? 'border-blue-600 text-blue-600 font-black'
                : 'border-transparent text-slate-500 hover:text-slate-800 font-bold'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Skill Profile</span>
            {hasCompletedTest && (
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                Verified
              </span>
            )}
          </button>

          {/* Tab 3: Skill Gap Analysis */}
          <button
            type="button"
            onClick={() => setActiveSubTab('gap')}
            className={`py-3.5 px-1 border-b-2 text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'gap'
                ? 'border-blue-600 text-blue-600 font-black'
                : 'border-transparent text-slate-500 hover:text-slate-800 font-bold'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Skill Gap Analysis</span>
            <span className="bg-rose-100 text-rose-800 text-[10px] font-black px-2 py-0.5 rounded-full">
              1 Deficit Alert
            </span>
          </button>

        </nav>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: SKILL ASSESSMENT (ZERO CLUTTER • HIGH-CONTRAST ACTIONS)        */}
      {/* ========================================================================= */}
      {activeSubTab === 'assessment' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Triage 3-Card Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
            
            {/* Card 1: Employer Technical Screens */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    <h3 className="text-sm font-black text-slate-900 tracking-tight">
                      Employer Technical Screens
                    </h3>
                  </div>
                  <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-black px-2.5 py-0.5 rounded-full">
                    2 Pending
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 font-medium mb-4">
                  Evaluations calibrated against active Portal 1 industrial hiring requisitions.
                </p>

                {/* Rows with ONLY Test Name + High-Contrast Electric Blue Action Button */}
                <div className="space-y-3">
                  
                  {/* Track A */}
                  <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-between gap-4 hover:bg-slate-100/60 transition-colors">
                    <h4 className="text-sm font-black text-slate-900 leading-snug">
                      Cloud DevOps &amp; K8s Pipeline Screen
                    </h4>
                    <button
                      type="button"
                      onClick={() => handleStartTest(
                        "Cloud DevOps & K8s Pipeline Screen (Chennai OMR Requisition)",
                        "Pass Threshold: 65%"
                      )}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-black text-xs px-5 py-2.5 rounded-xl shadow-md shadow-blue-500/25 active:scale-95 transition-all shrink-0 cursor-pointer"
                    >
                      Start Assessment →
                    </button>
                  </div>

                  {/* Track B */}
                  <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-between gap-4 hover:bg-slate-100/60 transition-colors">
                    <h4 className="text-sm font-black text-slate-900 leading-snug">
                      FastAPI &amp; Microservices Architecture
                    </h4>
                    <button
                      type="button"
                      onClick={() => handleStartTest(
                        "FastAPI & Microservices Architecture (TIDEL IT Corridor Requisition)",
                        "Pass Threshold: 60%"
                      )}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-black text-xs px-5 py-2.5 rounded-xl shadow-md shadow-blue-500/25 active:scale-95 transition-all shrink-0 cursor-pointer"
                    >
                      Start Assessment →
                    </button>
                  </div>

                </div>
              </div>
            </div>

            {/* Card 2: Cognitive Aptitude */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-rose-600" />
                    <h3 className="text-sm font-black text-slate-900 tracking-tight">
                      Cognitive Aptitude
                    </h3>
                  </div>
                  <span className="bg-rose-50 text-rose-700 border border-rose-200 text-xs font-black px-2.5 py-0.5 rounded-full">
                    CORE FILTERS
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 font-medium mb-4">
                  Foundational diagnostic modules required for technical qualification rounds.
                </p>

                {/* Rows with ONLY Test Name + Vibrant Crimson/Rose Action Button */}
                <div className="space-y-3">
                  
                  {/* Row 1 */}
                  <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-between gap-3 hover:bg-slate-100/60 transition-colors">
                    <h4 className="text-sm font-black text-slate-900 leading-snug">
                      Logical Reasoning &amp; Problem Solving
                    </h4>
                    <button
                      type="button"
                      onClick={() => handleStartTest(
                        "Cognitive Aptitude: Logical Reasoning & Problem Solving",
                        "Pass Threshold: 70%"
                      )}
                      className="bg-rose-500 hover:bg-rose-600 text-white font-black text-xs px-4 py-2 rounded-xl shadow-md shadow-rose-500/25 active:scale-95 transition-all shrink-0 cursor-pointer"
                    >
                      Start Test
                    </button>
                  </div>

                  {/* Row 2 */}
                  <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-between gap-3 hover:bg-slate-100/60 transition-colors">
                    <h4 className="text-sm font-black text-slate-900 leading-snug">
                      Quantitative &amp; Data Interpretation
                    </h4>
                    <button
                      type="button"
                      onClick={() => handleStartTest(
                        "Cognitive Aptitude: Quantitative & Data Interpretation",
                        "Pass Threshold: 65%"
                      )}
                      className="bg-rose-500 hover:bg-rose-600 text-white font-black text-xs px-4 py-2 rounded-xl shadow-md shadow-rose-500/25 active:scale-95 transition-all shrink-0 cursor-pointer"
                    >
                      Start Test
                    </button>
                  </div>

                  {/* Row 3 */}
                  <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-between gap-3 hover:bg-slate-100/60 transition-colors">
                    <h4 className="text-sm font-black text-slate-900 leading-snug">
                      Technical &amp; Operational English
                    </h4>
                    <button
                      type="button"
                      onClick={() => handleStartTest(
                        "Cognitive Aptitude: Technical & Operational English",
                        "Pass Threshold: 60%"
                      )}
                      className="bg-rose-500 hover:bg-rose-600 text-white font-black text-xs px-4 py-2 rounded-xl shadow-md shadow-rose-500/25 active:scale-95 transition-all shrink-0 cursor-pointer"
                    >
                      Start Test
                    </button>
                  </div>

                </div>
              </div>
            </div>

            {/* Card 3: Proctored Code Arena */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-amber-600" />
                    <h3 className="text-sm font-black text-slate-900 tracking-tight">
                      Code Arena
                    </h3>
                  </div>
                  <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-black px-2.5 py-0.5 rounded-full">
                    PROCTORED
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 font-medium mb-4">
                  Compiler-based runtime challenges evaluating code precision and algorithms.
                </p>

                {/* Rows with ONLY Test Name + Vibrant Warm Amber Action Button */}
                <div className="space-y-3">
                  
                  {/* Row 1 */}
                  <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-between gap-3 hover:bg-slate-100/60 transition-colors">
                    <h4 className="text-sm font-black text-slate-900 leading-snug">
                      Python &amp; Vector Embeddings
                    </h4>
                    <button
                      type="button"
                      onClick={() => handleStartTest(
                        "Code Arena: Python & Vector Embeddings",
                        "Pass Threshold: 70%"
                      )}
                      className="bg-amber-500 hover:bg-amber-600 text-white font-black text-xs px-4 py-2 rounded-xl shadow-md shadow-amber-500/25 active:scale-95 transition-all shrink-0 cursor-pointer"
                    >
                      Start Challenge
                    </button>
                  </div>

                  {/* Row 2 */}
                  <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-between gap-3 hover:bg-slate-100/60 transition-colors">
                    <h4 className="text-sm font-black text-slate-900 leading-snug">
                      Containerization &amp; Dockerfile Linting
                    </h4>
                    <button
                      type="button"
                      onClick={() => handleStartTest(
                        "Code Arena: Containerization & Dockerfile Linting",
                        "Pass Threshold: 70%"
                      )}
                      className="bg-amber-500 hover:bg-amber-600 text-white font-black text-xs px-4 py-2 rounded-xl shadow-md shadow-amber-500/25 active:scale-95 transition-all shrink-0 cursor-pointer"
                    >
                      Start Challenge
                    </button>
                  </div>

                  {/* Row 3 */}
                  <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-between gap-3 hover:bg-slate-100/60 transition-colors">
                    <h4 className="text-sm font-black text-slate-900 leading-snug">
                      SQL Schema &amp; Query Optimization
                    </h4>
                    <button
                      type="button"
                      onClick={() => handleStartTest(
                        "Code Arena: SQL Schema & Query Optimization",
                        "Pass Threshold: 65%"
                      )}
                      className="bg-amber-500 hover:bg-amber-600 text-white font-black text-xs px-4 py-2 rounded-xl shadow-md shadow-amber-500/25 active:scale-95 transition-all shrink-0 cursor-pointer"
                    >
                      Start Challenge
                    </button>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: SKILL PROFILE (SEQUENTIAL 15-DOT LED FILL ANIMATION FROM ZERO) */}
      {/* ========================================================================= */}
      {activeSubTab === 'profile' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Latest Assessment Completion Toast Alert (if completed) */}
          {hasCompletedTest && latestScore && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-900">
                    Industrial Technical Screen Verified
                  </h4>
                  <p className="text-xs text-emerald-700">
                    You scored {latestScore.score} / {latestScore.total} on {activeTestTitle}. Factory readiness recalculated against Portal 1 requisitions.
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-300">
                Score: {Math.round((latestScore.score / latestScore.total) * 100)}%
              </span>
            </div>
          )}

          {/* Diagnostic 2-Column Grid */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column (lg:col-span-5): Circular Factory Readiness Gauge */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 border-b lg:border-b-0 lg:border-r border-slate-100">
                
                {/* SVG Radial Ring */}
                <div className="relative w-52 h-52 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                    {/* Background Track */}
                    <circle
                      cx="80"
                      cy="80"
                      r="65"
                      fill="transparent"
                      stroke="#f1f5f9"
                      strokeWidth="14"
                    />
                    {/* Active Animated Progress Arc */}
                    <circle
                      cx="80"
                      cy="80"
                      r="65"
                      fill="transparent"
                      stroke="#10b981"
                      strokeWidth="14"
                      strokeDasharray={2 * Math.PI * 65}
                      strokeDashoffset={2 * Math.PI * 65 * (1 - (0.78 * gaugeProgress))}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>

                  {/* Center Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-4xl font-black text-slate-900 tracking-tight">
                      {Math.round(78 * gaugeProgress)}%
                    </span>
                    <span className="text-xs font-black text-emerald-600 tracking-wider flex items-center gap-1 mt-1">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>FACTORY READY</span>
                    </span>
                    <span className="mt-1.5 text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 shadow-2xs">
                      NCrF Level 6.5 Aligned
                    </span>
                  </div>
                </div>

                {/* Subtext */}
                <div className="text-center mt-5 max-w-sm">
                  <p className="text-xs font-medium text-slate-500 leading-relaxed">
                    Candidate diagnostic index matches 78% of active Portal 1 employer requisitions across Chennai and Coimbatore industrial corridors.
                  </p>
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Tier-1 Priority
                    </span>
                    <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      Top 12th Percentile
                    </span>
                  </div>
                </div>

              </div>

              {/* Right Column (lg:col-span-7): Technical Skills Breakdown */}
              <div className="lg:col-span-7 space-y-5">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-blue-600" />
                    <h3 className="text-xs font-black text-slate-900 tracking-wider uppercase">
                      TECHNICAL SKILLS BREAKDOWN
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 font-bold">
                    15-Point Competency Scale
                  </span>
                </div>

                {/* Live Sequential 15-Dot LED Tracks */}
                <div className="space-y-4">
                  {technicalSkills.map((skill) => (
                    <div 
                      key={skill.name}
                      className={`rounded-2xl p-3.5 border transition-colors ${
                        skill.isDeficit 
                          ? 'bg-amber-50/40 border-amber-200/80' 
                          : 'bg-slate-50/80 border-slate-100'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">
                            {skill.name}
                          </span>
                          {skill.isDeficit && (
                            <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              <span>Deficit Alert</span>
                            </span>
                          )}
                        </div>
                        <span className={`text-xs font-mono font-black px-2 py-0.5 rounded border ${
                          skill.isDeficit 
                            ? 'text-amber-800 bg-amber-100/80 border-amber-300'
                            : 'text-blue-600 bg-blue-50 border-blue-200'
                        }`}>
                          {skill.score} / 15
                        </span>
                      </div>

                      {/* 15-dot LED Track with Sequential Delay */}
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {Array.from({ length: 15 }).map((_, dotIndex) => {
                          const isFilled = ledAnimated && dotIndex < skill.score;

                          return (
                            <div
                              key={dotIndex}
                              style={{
                                transitionDelay: `${dotIndex * 45}ms`
                              }}
                              className={`h-2.5 flex-1 rounded-full transition-all duration-300 ease-out ${
                                isFilled
                                  ? skill.isDeficit
                                    ? 'bg-amber-500 shadow-xs shadow-amber-400/40'
                                    : 'bg-blue-600 shadow-xs shadow-blue-400/40'
                                  : 'bg-slate-200/80'
                              }`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: SKILL GAP ANALYSIS (CLEAN DONUT CHART CONTAINER)               */}
      {/* ========================================================================= */}
      {activeSubTab === 'gap' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Top Performance Alert Banner */}
          <div className="bg-rose-50/90 border border-rose-200 rounded-2xl p-5 mb-6 flex items-start gap-3.5 shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-black text-rose-950 uppercase tracking-wider">
                Critical Requisition Gap Detected
              </h3>
              <p className="text-xs text-rose-800 mt-1 leading-relaxed font-medium">
                Critical Requisition Gap Detected: Your performance in Applied GenAI &amp; Autonomous Agents (47%) lags the regional minimum employer threshold (75%). Rectify this deficit via Career Roadmap to qualify for 18 active cluster vacancies.
              </p>
              <div className="mt-3">
                <button
                  type="button"
                  onClick={() => {
                    handleStartTest(
                      "Targeted Remedial: Applied GenAI & Autonomous Agents Masterclass",
                      "Pass Threshold: 75%"
                    );
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Launch Targeted Remedial Assessment</span>
                </button>
              </div>
            </div>
          </div>

          {/* Middle Diagnostic Grid (2 Columns, Decluttered & Balanced) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 items-start">
            
            {/* Left Card: Assessment Domain Distribution (Donut Chart) */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-600" />
                    <h3 className="text-sm font-black text-slate-900 tracking-tight">
                      Assessment Domain Distribution
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-slate-400">
                    Evaluation Weights
                  </span>
                </div>

                {/* SVG Donut Chart Cleanly Centered */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-3">
                  <div className="relative w-44 h-44 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                      {/* Background circle */}
                      <circle cx="60" cy="60" r="45" fill="transparent" stroke="#f1f5f9" strokeWidth="18" />
                      
                      {/* Segment 1: Employer Screens (35% - Emerald #10b981) */}
                      <circle
                        cx="60"
                        cy="60"
                        r="45"
                        fill="transparent"
                        stroke="#10b981"
                        strokeWidth="18"
                        strokeDasharray="282.74"
                        strokeDashoffset={gapAnimated ? 282.74 * (1 - 0.35) : 282.74}
                        style={{
                          transition: 'stroke-dashoffset 1000ms cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                      />
                      
                      {/* Segment 2: Proctored Coding (25% - Indigo #6366f1) */}
                      <circle
                        cx="60"
                        cy="60"
                        r="45"
                        fill="transparent"
                        stroke="#6366f1"
                        strokeWidth="18"
                        strokeDasharray="282.74"
                        strokeDashoffset={gapAnimated ? 282.74 * (1 - 0.25) : 282.74}
                        style={{
                          transform: `rotate(${0.35 * 360}deg)`,
                          transformOrigin: 'center',
                          transition: 'stroke-dashoffset 1000ms cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                      />

                      {/* Segment 3: Infrastructure & Cloud (25% - Cyan #06b6d4) */}
                      <circle
                        cx="60"
                        cy="60"
                        r="45"
                        fill="transparent"
                        stroke="#06b6d4"
                        strokeWidth="18"
                        strokeDasharray="282.74"
                        strokeDashoffset={gapAnimated ? 282.74 * (1 - 0.25) : 282.74}
                        style={{
                          transform: `rotate(${(0.35 + 0.25) * 360}deg)`,
                          transformOrigin: 'center',
                          transition: 'stroke-dashoffset 1000ms cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                      />

                      {/* Segment 4: Cognitive Aptitude (15% - Amber #f59e0b) */}
                      <circle
                        cx="60"
                        cy="60"
                        r="45"
                        fill="transparent"
                        stroke="#f59e0b"
                        strokeWidth="18"
                        strokeDasharray="282.74"
                        strokeDashoffset={gapAnimated ? 282.74 * (1 - 0.15) : 282.74}
                        style={{
                          transform: `rotate(${(0.35 + 0.25 + 0.25) * 360}deg)`,
                          transformOrigin: 'center',
                          transition: 'stroke-dashoffset 1000ms cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                      />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                      <span className="text-xl font-black text-slate-900 tracking-tight transition-all duration-700">
                        {gapAnimated ? '100%' : '0%'}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        4 Categories
                      </span>
                    </div>
                  </div>

                  {/* Clean 4-Item Legend (Interactive sync with inspector) */}
                  <div className="space-y-2.5 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setSelectedDomain(prev => prev === 'employer' ? null : 'employer')}
                      className={`flex items-center justify-between sm:justify-start gap-3 w-full p-2 rounded-xl transition-all cursor-pointer text-left border ${
                        selectedDomain === 'employer'
                          ? 'bg-emerald-50/80 border-emerald-300 ring-2 ring-emerald-500/30'
                          : 'bg-transparent border-transparent hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-2 text-xs font-bold text-slate-700">
                        <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shrink-0" />
                        <span>Employer Screens</span>
                      </span>
                      <span className="font-mono text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                        35%
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedDomain(prev => prev === 'coding' ? null : 'coding')}
                      className={`flex items-center justify-between sm:justify-start gap-3 w-full p-2 rounded-xl transition-all cursor-pointer text-left border ${
                        selectedDomain === 'coding'
                          ? 'bg-indigo-50/80 border-indigo-300 ring-2 ring-indigo-500/30'
                          : 'bg-transparent border-transparent hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-2 text-xs font-bold text-slate-700">
                        <span className="w-3 h-3 rounded-full bg-indigo-500 inline-block shrink-0" />
                        <span>Proctored Coding</span>
                      </span>
                      <span className="font-mono text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                        25%
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedDomain(prev => prev === 'infra' ? null : 'infra')}
                      className={`flex items-center justify-between sm:justify-start gap-3 w-full p-2 rounded-xl transition-all cursor-pointer text-left border ${
                        selectedDomain === 'infra'
                          ? 'bg-rose-50/80 border-rose-300 ring-2 ring-rose-500/30'
                          : 'bg-transparent border-transparent hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-2 text-xs font-bold text-slate-700">
                        <span className="w-3 h-3 rounded-full bg-cyan-500 inline-block shrink-0" />
                        <span>Infrastructure &amp; Cloud</span>
                      </span>
                      <span className="font-mono text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                        25%
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedDomain(prev => prev === 'aptitude' ? null : 'aptitude')}
                      className={`flex items-center justify-between sm:justify-start gap-3 w-full p-2 rounded-xl transition-all cursor-pointer text-left border ${
                        selectedDomain === 'aptitude'
                          ? 'bg-amber-50/80 border-amber-300 ring-2 ring-amber-500/30'
                          : 'bg-transparent border-transparent hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-2 text-xs font-bold text-slate-700">
                        <span className="w-3 h-3 rounded-full bg-amber-500 inline-block shrink-0" />
                        <span>Cognitive Aptitude</span>
                      </span>
                      <span className="font-mono text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                        15%
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card: Performance Categorization (Stacked Correct vs Wrong Bars with Click-to-Inspect) */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-emerald-600" />
                    <h3 className="text-sm font-black text-slate-900 tracking-tight">
                      Performance Categorization
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] font-bold">
                    <span className="flex items-center gap-1.5 text-emerald-700">
                      <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                      <span>Verified (Green)</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-rose-700">
                      <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" />
                      <span>Deficit (Red)</span>
                    </span>
                  </div>
                </div>

                {/* Stacked Dual-Color Progress Bars with Interactive Click-to-Inspect Mechanic */}
                <div className="space-y-3.5">
                  {GAP_DOMAINS.map((item) => {
                    const isSelected = selectedDomain === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedDomain(prev => prev === item.id ? null : item.id)}
                        className={`group rounded-2xl p-3.5 transition-all duration-200 cursor-pointer border ${
                          isSelected
                            ? 'bg-slate-50/90 border-indigo-400 ring-2 ring-indigo-500/40 shadow-xs'
                            : 'bg-white border-slate-200/70 hover:bg-slate-50/60 hover:border-slate-300'
                        }`}
                      >
                        {/* Bar Row Header */}
                        <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="group-hover:text-indigo-600 transition-colors font-bold">{item.title}</span>
                            {item.isRedAlert && (
                              <span className="text-[9px] font-black text-rose-700 bg-rose-100 border border-rose-200 px-1.5 py-0.2 rounded">
                                RED ALERT
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2.5">
                            <span className={`font-mono font-black ${item.isRedAlert ? 'text-rose-600' : 'text-slate-900'}`}>
                              {item.verifiedPct}% / {item.deficitPct}%
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded transition-all ${
                              isSelected 
                                ? 'bg-indigo-600 text-white shadow-2xs' 
                                : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-800'
                            }`}>
                              {isSelected ? 'Inspecting' : 'Inspect'}
                            </span>
                          </div>
                        </div>

                        {/* Dual-Color Performance Bar (Live horizontal animation from 0%) */}
                        <div className="h-5 w-full bg-slate-100 rounded-lg overflow-hidden flex shadow-inner text-[10px] font-mono font-bold text-white">
                          <div
                            style={{
                              width: gapAnimated ? `${item.verifiedPct}%` : '0%',
                              transition: 'width 1000ms cubic-bezier(0.16, 1, 0.3, 1)'
                            }}
                            className="bg-emerald-500 flex items-center justify-center overflow-hidden whitespace-nowrap"
                          >
                            <span className={`px-1 transition-opacity duration-300 ${gapAnimated ? 'opacity-100' : 'opacity-0'}`}>
                              {item.verifiedPct}% Correct
                            </span>
                          </div>
                          <div
                            style={{
                              width: gapAnimated ? `${item.deficitPct}%` : '0%',
                              transition: 'width 1000ms cubic-bezier(0.16, 1, 0.3, 1)'
                            }}
                            className={`bg-rose-500 flex items-center justify-center overflow-hidden whitespace-nowrap ${
                              item.isRedAlert ? 'font-black' : ''
                            }`}
                          >
                            <span className={`px-1 transition-opacity duration-300 ${gapAnimated ? 'opacity-100' : 'opacity-0'}`}>
                              {item.deficitPct}% {item.deficitLabel}
                            </span>
                          </div>
                        </div>

                        {/* Expanded Diagnostic Card */}
                        {isSelected && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="mt-3.5 bg-slate-900/95 backdrop-blur-md rounded-2xl p-4 border border-slate-700/70 shadow-xl space-y-3.5 animate-fadeIn"
                          >
                            {/* Top row: Domain title on left, color-coded status badge on right */}
                            <div className="flex items-center justify-between gap-3 border-b border-slate-800/80 pb-2.5">
                              <div className="flex items-center gap-2">
                                <Cpu className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                                <span className="text-xs font-black text-slate-100 tracking-tight">
                                  {item.title}
                                </span>
                              </div>
                              <div className={`px-2.5 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shrink-0 ${item.badgeColorClass}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${item.badgeDotClass} animate-pulse`} />
                                <span>{item.statusBadge}</span>
                              </div>
                            </div>

                            {/* Middle row: Horizontal wrap of high-contrast monospace keyword chips */}
                            <div>
                              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                                <Target className="w-3 h-3 text-cyan-400" />
                                <span>Target Competencies &amp; Verified Badges</span>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {item.keywords.map((keyword, kwIdx) => (
                                  <span
                                    key={kwIdx}
                                    className="font-mono text-[10.5px] font-bold px-2.5 py-1 rounded-lg bg-slate-950/90 text-cyan-300 border border-cyan-800/50 shadow-inner flex items-center gap-1.5 hover:border-emerald-400/60 hover:text-emerald-300 transition-colors"
                                  >
                                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                                    <span>{keyword}</span>
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Bottom row: Clear, high-readability diagnostic summary explaining the exact hiring impact */}
                            <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800/80 flex items-start gap-2.5">
                              <div className="w-5 h-5 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                                <Zap className="w-3 h-3 text-indigo-400" />
                              </div>
                              <div>
                                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-300 block mb-0.5">
                                  Actionable Evaluation Verdict
                                </span>
                                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                                  {item.verdict}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Remediation Strip (Clean & Focused) */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-5 shadow-md border border-indigo-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-wider text-indigo-300">
                  Deficit Remediation Conduit Active
                </span>
              </div>
              <h4 className="text-sm font-black text-white">
                Qualify for 18 Active Regional Cluster Vacancies
              </h4>
            </div>

            <button
              type="button"
              onClick={() => {
                triggerToast("Routing Deficit to Candidate Career Roadmap Module: Loading customized learning bridge...");
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 shrink-0 active:scale-95 cursor-pointer"
            >
              <span>Route Deficit to Career Roadmap →</span>
            </button>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* INTERACTIVE TEST EVALUATION MODAL                                         */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-scaleUp">
            
            {/* Modal Top Bar */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
              <div>
                <h3 className="text-base font-black text-slate-900 leading-tight">
                  {activeTestTitle}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">
                  5 Practical Scenarios • 30 Mins • {activeTestPassCriteria}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Live Countdown Timer */}
                <div className="bg-amber-100 border border-amber-300 text-amber-800 px-3 py-1.5 rounded-xl font-mono text-xs font-black flex items-center gap-1.5 shadow-2xs">
                  <Clock className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
                  <span>{formatTimer(timerSeconds)}</span>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 transition-colors cursor-pointer"
                  aria-label="Close Test Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Question Stream (Scrollable) */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-white">
              {DEVOPS_QUESTIONS.map((q, qIndex) => {
                return (
                  <div 
                    key={q.id}
                    className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 shadow-2xs space-y-3.5"
                  >
                    {/* Question Title */}
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-blue-600 text-white font-mono text-xs font-black flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        {qIndex + 1}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">
                        {q.question}
                      </h4>
                    </div>

                    {/* Radio Pill Choices */}
                    <div className="space-y-2 pt-1 pl-8">
                      {q.options.map((option, optIdx) => {
                        const isSelected = selectedAnswers[q.id] === optIdx;

                        return (
                          <label
                            key={optIdx}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            className={`flex items-center gap-3 p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-blue-50/80 border-blue-500 text-blue-950 font-bold shadow-xs'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/80 hover:border-slate-300'
                            }`}
                          >
                            <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                              isSelected
                                ? 'border-blue-600 bg-blue-600 text-white'
                                : 'border-slate-300 bg-white'
                            }`}>
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </span>
                            <span>{option}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sticky Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="text-xs text-slate-500 font-medium">
                Answered: <strong className="text-slate-900 font-mono">{Object.keys(selectedAnswers).length}</strong> / {DEVOPS_QUESTIONS.length} Scenarios
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200/80 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmitTest}
                  disabled={Object.keys(selectedAnswers).length === 0}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm transition-all ${
                    Object.keys(selectedAnswers).length > 0
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95 cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>✓ Submit Assessment &amp; Verify Score</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
