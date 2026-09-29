import React, { useState, useEffect } from 'react';
import { 
  Cpu,
  Check, 
  Download, 
  Sparkles, 
  FileCheck2, 
  ShieldCheck, 
  Building2, 
  Clock, 
  ArrowRight,
  CheckCircle2,
  X,
  Printer
} from 'lucide-react';

interface CourseUnit {
  unitNumber: string;
  prunedTitle: string;
  prunedHours: string;
  injectedTitle: string;
  injectedHours: string;
}

interface CourseDefinition {
  code: string;
  title: string;
  gap: number;
  medianCTCPeak: number;
  placementYieldPeak: number;
  gazetteHash: string;
  units: CourseUnit[];
}

const COURSES: Record<string, CourseDefinition> = {
  'CS3601': {
    code: 'CS3601',
    title: 'Web Architectures',
    gap: 58,
    medianCTCPeak: 8.2,
    placementYieldPeak: 89,
    gazetteHash: 'BOS-TN-2026-CS3601-ALPHA',
    units: [
      {
        unitNumber: 'Unit 01',
        prunedTitle: '✕ Module 1: JSP Servlets & Scriptlets (15 Hours)',
        prunedHours: '15 Hours',
        injectedTitle: '✓ Module 1: FastAPI Microservices & REST Endpoints (15 Hours)',
        injectedHours: '15 Hours'
      },
      {
        unitNumber: 'Unit 02',
        prunedTitle: '✕ Module 2: Monolithic SOAP & XML Schemas (15 Hours)',
        prunedHours: '15 Hours',
        injectedTitle: '✓ Module 2: Docker Containers & K8s Runtimes (15 Hours)',
        injectedHours: '15 Hours'
      },
      {
        unitNumber: 'Unit 03',
        prunedTitle: '✕ Module 3: Manual FTP Server Deployments (15 Hours)',
        prunedHours: '15 Hours',
        injectedTitle: '✓ Module 3: Vector DBs & Semantic Search with Qdrant (15 Hours)',
        injectedHours: '15 Hours'
      },
      {
        unitNumber: 'Unit 04',
        prunedTitle: '✕ Module 4: Theoretical SQL Tuning on Pen-and-Paper (15 Hours)',
        prunedHours: '15 Hours',
        injectedTitle: '✓ Module 4: GitHub Actions & CI/CD Pipeline Automation (15 Hours)',
        injectedHours: '15 Hours'
      }
    ]
  },
  'IT3402': {
    code: 'IT3402',
    title: 'Cloud Systems',
    gap: 52,
    medianCTCPeak: 8.6,
    placementYieldPeak: 91,
    gazetteHash: 'BOS-TN-2026-IT3402-ALPHA',
    units: [
      {
        unitNumber: 'Unit 01',
        prunedTitle: '✕ Module 1: Bare-Metal Hypervisors & Xen (15 Hours)',
        prunedHours: '15 Hours',
        injectedTitle: '✓ Module 1: Kubernetes Cluster Orchestration & Helm (15 Hours)',
        injectedHours: '15 Hours'
      },
      {
        unitNumber: 'Unit 02',
        prunedTitle: '✕ Module 2: Manual Shell Script Provisioning (15 Hours)',
        prunedHours: '15 Hours',
        injectedTitle: '✓ Module 2: Terraform Infrastructure as Code (15 Hours)',
        injectedHours: '15 Hours'
      },
      {
        unitNumber: 'Unit 03',
        prunedTitle: '✕ Module 3: Monolithic Apache HTTP Server (15 Hours)',
        prunedHours: '15 Hours',
        injectedTitle: '✓ Module 3: Envoy Gateway & Service Mesh (15 Hours)',
        injectedHours: '15 Hours'
      },
      {
        unitNumber: 'Unit 04',
        prunedTitle: '✕ Module 4: Static Syslog File Log Rotation (15 Hours)',
        prunedHours: '15 Hours',
        injectedTitle: '✓ Module 4: Prometheus & Grafana Distributed Observability (15 Hours)',
        injectedHours: '15 Hours'
      }
    ]
  },
  'AI3501': {
    code: 'AI3501',
    title: 'Applied ML',
    gap: 64,
    medianCTCPeak: 9.4,
    placementYieldPeak: 94,
    gazetteHash: 'BOS-TN-2026-AI3501-ALPHA',
    units: [
      {
        unitNumber: 'Unit 01',
        prunedTitle: '✕ Module 1: Manual Weka GUI Classifiers (15 Hours)',
        prunedHours: '15 Hours',
        injectedTitle: '✓ Module 1: PyTorch Deep Learning & CUDA Kernels (15 Hours)',
        injectedHours: '15 Hours'
      },
      {
        unitNumber: 'Unit 02',
        prunedTitle: '✕ Module 2: Bag-of-Words & TF-IDF Rote Math (15 Hours)',
        prunedHours: '15 Hours',
        injectedTitle: '✓ Module 2: HuggingFace Transformers & LoRA Fine-Tuning (15 Hours)',
        injectedHours: '15 Hours'
      },
      {
        unitNumber: 'Unit 03',
        prunedTitle: '✕ Module 3: Static CSV Data Wrangling on Excel (15 Hours)',
        prunedHours: '15 Hours',
        injectedTitle: '✓ Module 3: LangChain & LangGraph Autonomous Agents (15 Hours)',
        injectedHours: '15 Hours'
      },
      {
        unitNumber: 'Unit 04',
        prunedTitle: '✕ Module 4: Pen-and-Paper Perceptron Weight Updates (15 Hours)',
        prunedHours: '15 Hours',
        injectedTitle: '✓ Module 4: vLLM Inference & Production Model Serving (15 Hours)',
        injectedHours: '15 Hours'
      }
    ]
  }
};

export const SyllabusFixerView: React.FC = () => {
  // Sub-Heading Active Tab State
  const [activeSection, setActiveSection] = useState<'diagnostics' | 'audit'>('diagnostics');

  // Course selection
  const [selectedCourseKey, setSelectedCourseKey] = useState<string>('CS3601');
  const currentCourse = COURSES[selectedCourseKey] || COURSES['CS3601'];

  // Time-machine scrubber: 0 to 100, default 100
  const [timeSlider, setTimeSlider] = useState<number>(100);

  // Telemetry state on mount:
  // obsolescenceGap: 0 -> 58%
  // medianCTC: 3.6 -> 8.2 (LPA)
  // placementYield: 41 -> 89 (%)
  // collegesSynced: 0 -> 420 on directive
  const [mountProgress, setMountProgress] = useState<number>(0);
  const [isDirectiveIssued, setIsDirectiveIssued] = useState<boolean>(false);
  const [collegesSynced, setCollegesSynced] = useState<number>(0);
  const [showExecutiveBanner, setShowExecutiveBanner] = useState<boolean>(false);
  const [isPreviewPdfOpen, setIsPreviewPdfOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Mount animation (animates numbers from 0 up)
  useEffect(() => {
    setMountProgress(0);
    const duration = 1200;
    const startTime = performance.now();

    const animateMount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out

      setMountProgress(eased);

      if (progress < 1) {
        requestAnimationFrame(animateMount);
      }
    };

    requestAnimationFrame(animateMount);
  }, [selectedCourseKey]);

  // Derived telemetry metrics based on mount animation and timeSlider
  const obsolescenceGap = Math.round(mountProgress * currentCourse.gap);

  // Interpolate wage & placement based on timeSlider (0 = 2021 legacy baseline, 100 = 2026 peak)
  const timeFactor = timeSlider / 100;
  const baseCTC = 3.6;
  const peakCTC = currentCourse.medianCTCPeak;
  const targetCTC = baseCTC + (peakCTC - baseCTC) * timeFactor;
  const medianCTC = baseCTC + (targetCTC - baseCTC) * mountProgress;

  const baseYield = 41;
  const peakYield = currentCourse.placementYieldPeak;
  const targetYield = Math.round(baseYield + (peakYield - baseYield) * timeFactor);
  const placementYield = Math.round(baseYield + (targetYield - baseYield) * mountProgress);

  // Handle Board of Studies Directive promulgation
  const handleIssueDirective = () => {
    if (isDirectiveIssued) return;
    setIsDirectiveIssued(true);
    setShowExecutiveBanner(true);

    // Rapid counter animation for collegesSynced: 0 -> 420
    const duration = 1200;
    const target = 420;
    const startTime = performance.now();

    const animateColleges = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCollegesSynced(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(animateColleges);
      }
    };

    requestAnimationFrame(animateColleges);

    setToastMessage('Gazette Order Promulgated: 420 State Engineering Colleges Updated.');
    setTimeout(() => setToastMessage(null), 5000);
  };

  // Generate Official Styled HTML for Board of Studies Statutory Gazette Diff Document
  const generateGazettePrintHtml = () => {
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const timeStr = new Date().toLocaleTimeString();

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gazette Directive - ${currentCourse.code} (${currentCourse.gazetteHash})</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 15mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #f8fafc;
      padding: 24px;
      line-height: 1.45;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .print-sheet {
      max-width: 820px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08);
    }
    .print-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 24px;
      background: #0f172a;
      color: #ffffff;
    }
    .print-btn {
      background: #2563eb;
      color: #ffffff;
      border: none;
      padding: 8px 18px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
    }
    .close-btn {
      background: #334155;
      color: #ffffff;
      border: none;
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 13px;
      cursor: pointer;
    }
    .content-padding {
      padding: 32px;
    }
    .header-card {
      text-align: center;
      padding: 24px 20px;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      background: #ffffff;
      margin-bottom: 24px;
    }
    .subheader {
      font-size: 11px;
      font-weight: 900;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #64748b;
      margin-bottom: 6px;
    }
    .main-title {
      font-size: 20px;
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: -0.02em;
      margin-bottom: 12px;
    }
    .order-pill {
      display: inline-block;
      background: #eff6ff;
      color: #1d4ed8;
      border: 1px solid #bfdbfe;
      padding: 4px 16px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 800;
      margin-bottom: 14px;
    }
    .meta-row {
      display: flex;
      justify-content: center;
      gap: 16px;
      font-size: 11px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      color: #64748b;
    }
    .section-box {
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 20px;
      margin-bottom: 20px;
      background: #ffffff;
    }
    .section-header {
      font-size: 12px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #0f172a;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 8px;
      margin-bottom: 16px;
    }
    .metric-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }
    .metric-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 12px 8px;
      text-align: center;
    }
    .metric-label {
      font-size: 10px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      margin-bottom: 4px;
      display: block;
    }
    .metric-value {
      font-size: 16px;
      font-weight: 900;
      color: #0f172a;
      display: block;
    }
    .metric-meta {
      font-size: 9px;
      font-weight: 600;
      color: #94a3b8;
      margin-top: 2px;
      display: block;
    }
    .unit-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 12px 14px;
      border-radius: 10px;
      border: 1px solid #e2e8f0;
      background: #f8fafc;
      margin-bottom: 10px;
      font-size: 12px;
    }
    .unit-pruned {
      flex: 1;
      color: #9f1239;
      background: #fff1f2;
      border: 1px solid #fecdd3;
      padding: 8px 12px;
      border-radius: 8px;
      font-weight: 600;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .pruned-text {
      text-decoration: line-through;
    }
    .pruned-badge {
      font-size: 10px;
      font-weight: 800;
      color: #e11d48;
      margin-left: 8px;
    }
    .unit-arrow {
      color: #94a3b8;
      font-weight: 900;
      font-size: 14px;
      padding: 0 4px;
    }
    .unit-injected {
      flex: 1;
      color: #065f46;
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      padding: 8px 12px;
      border-radius: 8px;
      font-weight: 700;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .injected-badge {
      font-size: 10px;
      font-weight: 800;
      background: #d1fae5;
      color: #047857;
      padding: 2px 6px;
      border-radius: 9999px;
      border: 1px solid #6ee7b7;
      margin-left: 8px;
    }
    .footer-box {
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 18px 20px;
      background: #ffffff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
    }
    .footer-statement {
      font-size: 11px;
      color: #475569;
      line-height: 1.5;
      max-width: 520px;
    }
    .footer-hash {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 10px;
      font-weight: 700;
      color: #2563eb;
      margin-top: 4px;
    }
    .stamp-box {
      border: 2px solid #10b981;
      background: #ecfdf5;
      padding: 10px 16px;
      border-radius: 12px;
      text-align: center;
      min-width: 170px;
    }
    .stamp-title {
      font-size: 11px;
      font-weight: 900;
      color: #065f46;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      display: block;
    }
    .stamp-hash {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 9px;
      color: #059669;
      font-weight: 700;
      display: block;
      margin-top: 2px;
    }
    @media print {
      body {
        background: #ffffff;
        padding: 0;
      }
      .print-sheet {
        border: none;
        box-shadow: none;
        border-radius: 0;
        max-width: 100%;
      }
      .print-toolbar {
        display: none !important;
      }
      .content-padding {
        padding: 0;
      }
    }
  </style>
</head>
<body>
  <div class="print-sheet">
    <div class="print-toolbar no-print">
      <div style="font-weight: 800; font-size: 14px; display: flex; align-items: center; gap: 8px;">
        <span>&#9998;</span> Official Board of Studies Gazette Print Engine
      </div>
      <div style="display: flex; gap: 10px;">
        <button class="print-btn" onclick="window.print();">&#128438; Print / Save as PDF</button>
        <button class="close-btn" onclick="window.close();">Close Window</button>
      </div>
    </div>

    <div class="content-padding">
      <!-- Official Header -->
      <div class="header-card">
        <div class="subheader">GOVERNMENT OF TAMIL NADU &bull; DIRECTORATE OF TECHNICAL EDUCATION</div>
        <h1 class="main-title">BOARD OF STUDIES STATUTORY CURRICULUM GAZETTE NOTIFICATION</h1>
        <div class="order-pill">Mandatory Reallocation Order for ${currentCourse.code}: ${currentCourse.title}</div>
        <div class="meta-row">
          <span>Gazette Ref: <strong>${currentCourse.gazetteHash}</strong></span>
          <span>&bull;</span>
          <span>Effective: <strong>Academic Year 2026-27</strong></span>
          <span>&bull;</span>
          <span><strong>AICTE &amp; NCrF Certified</strong></span>
          <span>&bull;</span>
          <span>Issued: ${dateStr} ${timeStr}</span>
        </div>
      </div>

      <!-- Section 1: Zero Credit Drift & Telemetry -->
      <div class="section-box">
        <div class="section-header">1. Zero Credit Drift Certification &amp; Wage Lift Telemetry</div>
        <div class="metric-grid">
          <div class="metric-card">
            <span class="metric-label">Contact Hours</span>
            <span class="metric-value">60 / 60h</span>
            <span class="metric-meta">Delta: 0.0h Locked</span>
          </div>
          <div class="metric-card">
            <span class="metric-label">Net Credit Delta</span>
            <span class="metric-value" style="color: #059669;">0.0 (4.0 Net)</span>
            <span class="metric-meta">AICTE Model Compliant</span>
          </div>
          <div class="metric-card">
            <span class="metric-label">Projected Starting CTC</span>
            <span class="metric-value" style="color: #4f46e5;">&#8377;${medianCTC.toFixed(1)} LPA</span>
            <span class="metric-meta">was &#8377;3.6 LPA in 2021</span>
          </div>
          <div class="metric-card">
            <span class="metric-label">Placement Yield</span>
            <span class="metric-value" style="color: #0284c7;">${placementYield}%</span>
            <span class="metric-meta">was 41% in 2021</span>
          </div>
        </div>
      </div>

      <!-- Section 2: Unit-by-Unit Statutory Surgery Breakdown -->
      <div class="section-box">
        <div class="section-header">2. Unit-by-Unit Statutory Surgery Breakdown</div>
        ${currentCourse.units.map(u => `
          <div class="unit-row">
            <div class="unit-pruned">
              <span class="pruned-text">${u.prunedTitle}</span>
              <span class="pruned-badge">[PRUNED]</span>
            </div>
            <div class="unit-arrow">&#10148; [Auto-Replaced] &#10148;</div>
            <div class="unit-injected">
              <span>${u.injectedTitle}</span>
              <span class="injected-badge">[VERIFIED]</span>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Official Footer & Statutory Promulgation -->
      <div class="footer-box">
        <div>
          <p class="footer-statement">
            <strong>Statutory Promulgation Statement:</strong> Promulgated pursuant to the statutory powers vested under the State Board of Technical Education, National Education Policy (NEP 2020), and AICTE Model Curriculum Framework. All 420 affiliated technical colleges and engineering institutes are mandated to enforce these revisions without credit drift.
          </p>
          <div class="footer-hash">
            Cryptographic Verification Hash: ${currentCourse.gazetteHash} &bull; State Council Ref: BOS-TN-2026-REG
          </div>
        </div>
        <div class="stamp-box">
          <span class="stamp-title">&#10003; DIGITALLY RATIFIED</span>
          <span class="stamp-hash">BOS-TN-SEC-2026</span>
          <span style="font-size: 8px; color: #64748b; text-transform: uppercase; margin-top: 4px; display: block;">Directorate of Technical Education</span>
        </div>
      </div>
    </div>
  </div>

  <script>
    window.addEventListener('load', () => {
      setTimeout(() => {
        window.print();
      }, 350);
    });
  </script>
</body>
</html>`;
  };

  // Printable generation handler for new print window trigger
  const handlePrintGazette = () => {
    const html = generateGazettePrintHtml();

    try {
      const printWindow = window.open('', '_blank', 'width=950,height=900,menubar=no,toolbar=no,location=no,status=no');
      if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(html);
        printWindow.document.close();
        printWindow.focus();
      } else {
        // Fallback using temporary hidden iframe if popups are restricted
        const iframe = document.createElement('iframe');
        iframe.style.position = 'fixed';
        iframe.style.right = '0';
        iframe.style.bottom = '0';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = '0';
        document.body.appendChild(iframe);
        const doc = iframe.contentWindow?.document;
        if (doc) {
          doc.open();
          doc.write(html);
          doc.close();
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
        }
        setTimeout(() => {
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
        }, 3000);
      }
    } catch (err) {
      console.error('Print error:', err);
      window.print();
    }

    setToastMessage(`✓ Official Gazette Print Engine launched for ${currentCourse.code}`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Handle Export / Preview Gazette Diff PDF
  const handlePreviewPdf = () => {
    setIsPreviewPdfOpen(true);
    handlePrintGazette();
  };

  // SVG Circular Gauge Calculations
  const radius = 68;
  const circumference = 2 * Math.PI * radius; // ~ 427.256
  const strokeDashoffset = circumference - (circumference * obsolescenceGap) / 100;

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
          Syllabus Fixer
        </h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Automated skill gap match, zero credit drift balancer, and Board of Studies statutory promulgation
        </p>
      </div>

      {/* Executive Confirmation Banner when Directive is Issued */}
      {showExecutiveBanner && (
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border border-emerald-500/50 rounded-2xl p-4 text-white shadow-lg flex flex-wrap items-center justify-between gap-4 animate-fadeIn">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xs font-black text-emerald-400 uppercase tracking-widest block">
                Official Gazette Directive Promulgated
              </span>
              <p className="text-sm font-bold text-white mt-0.5">
                Gazette Order Promulgated: {collegesSynced} State Engineering Colleges Updated.
              </p>
              <span className="text-[11px] font-mono text-emerald-300/80">
                Hash: {currentCourse.gazetteHash} • AICTE &amp; NCrF Ratified
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-3 py-1.5 rounded-full">
              🟢 {collegesSynced} / 420 Campuses Synced
            </span>
            <button
              type="button"
              onClick={() => setShowExecutiveBanner(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-NAV TAB ARCHITECTURE                                                  */}
      {/* ========================================================================= */}
      <div className="border-b border-slate-200 mb-6">
        <nav className="flex space-x-8 overflow-x-auto" aria-label="Sub-navigation">
          <button
            type="button"
            onClick={() => setActiveSection('diagnostics')}
            className={`py-3.5 px-1 border-b-2 text-sm transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeSection === 'diagnostics'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Curriculum Diagnostics &amp; Simulation</span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                activeSection === 'diagnostics'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              58% Lag Detected
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('audit')}
            className={`py-3.5 px-1 border-b-2 text-sm transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeSection === 'audit'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Zero Credit Drift Audit &amp; Directive</span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                activeSection === 'audit'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              60 Contact Hours Locked
            </span>
          </button>
        </nav>
      </div>

      {/* ========================================================================= */}
      {/* 1. TOP SECTION: Diagnostic Console & Wage Predictor (50/50 Dual View)    */}
      {/* ========================================================================= */}
      {activeSection === 'diagnostics' && (
        <div className="animate-in fade-in duration-200 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 items-stretch">
        
        {/* Left Card: 3D Obsolescence Radial Diagnostic Meter */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div className="w-full flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
              Curriculum Diagnostics Console
            </span>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
              PS134 Telemetry
            </span>
          </div>

          {/* SVG Circular Meter */}
          <div className="relative w-56 h-56 flex items-center justify-center my-2 mx-auto">
            <svg 
              className="w-full h-full -rotate-90 transform overflow-visible"
              viewBox="0 0 190 190"
              style={{
                filter: 'drop-shadow(0 10px 22px rgba(244, 63, 94, 0.25))',
                transform: 'perspective(500px) rotateX(15deg) rotate(-90deg)'
              }}
            >
              <defs>
                <linearGradient id="obsolescenceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#6366f1" />
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
                stroke="url(#obsolescenceGradient)"
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
                {obsolescenceGap}%
              </span>
              <span className="bg-rose-50 text-rose-700 font-black text-xs px-3 py-1 rounded-full mt-2 border border-rose-200">
                Curriculum Lag Detected
              </span>
            </div>
          </div>

          {/* Target Course Selector Chips */}
          <div className="w-full pt-3 border-t border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2 text-center">
              Select Target Course
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedCourseKey('CS3601')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCourseKey === 'CS3601'
                    ? 'bg-slate-900 text-white font-black shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                [ CS3601: Web Architectures ]
              </button>
              <button
                type="button"
                onClick={() => setSelectedCourseKey('IT3402')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCourseKey === 'IT3402'
                    ? 'bg-slate-900 text-white font-black shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                [ IT3402: Cloud Systems ]
              </button>
              <button
                type="button"
                onClick={() => setSelectedCourseKey('AI3501')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCourseKey === 'AI3501'
                    ? 'bg-slate-900 text-white font-black shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                [ AI3501: Applied ML ]
              </button>
            </div>
          </div>

          {/* Subtext */}
          <p className="text-[11px] font-medium text-slate-400 text-center mt-3">
            Ingesting 142 Enterprise Surveys &amp; Q3 Requisitions from Portal 1
          </p>
        </div>

        {/* Right Card: Starting CTC & Placement Yield Predictor */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
              ● Socio-Economic Return Simulation (PS134 KPI)
            </span>
            <span className="text-[10px] font-bold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-md border border-indigo-500/30">
              Live AICTE Model
            </span>
          </div>

          {/* Metric Row */}
          <div className="grid grid-cols-2 gap-4 my-3">
            {/* Column 1: Median Starting CTC */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Median Starting CTC
              </span>
              <div className="my-2">
                <span className="text-3xl font-black text-emerald-400 block tracking-tight">
                  ₹{medianCTC.toFixed(1)} LPA
                </span>
                <span className="text-xs text-slate-400 line-through block mt-0.5">
                  was ₹3.6 LPA in 2021
                </span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-300/80">
                Industry Accredited Baseline
              </span>
            </div>

            {/* Column 2: Placement Yield */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Placement Yield
              </span>
              <div className="my-2">
                <span className="text-3xl font-black text-cyan-400 block tracking-tight">
                  {placementYield}%
                </span>
                <span className="text-xs text-slate-400 block mt-0.5">
                  was 41% in 2021
                </span>
              </div>
              <span className="text-[10px] font-semibold text-cyan-300/80">
                90-Day Exit Conversion
              </span>
            </div>
          </div>

          {/* Bottom Lift Strip */}
          <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-black text-xs px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>+128% Starting Wage Lift</span>
              </span>
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-black text-xs px-3 py-1 rounded-full">
                0.0 Credit Drift
              </span>
            </div>

            <span className="text-[11px] font-medium text-slate-400">
              NCrF Level 6.5 Aligned
            </span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. THE INTERACTIVE SYLLABUS TIME-MACHINE SCRUBBER (COCKPIT CONTROL CENTER)*/}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden rounded-3xl p-6 mb-6 border-2 border-indigo-400/80 bg-gradient-to-r from-indigo-50/90 via-purple-50/50 to-sky-50/80 shadow-xl shadow-indigo-500/10 transition-all">
        {/* Ambient Decorative Glow */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-br from-indigo-400/25 via-purple-400/20 to-pink-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-gradient-to-tr from-sky-400/25 via-indigo-400/20 to-emerald-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 space-y-4">
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-indigo-200/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
                <Clock className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-sm font-black text-slate-900 uppercase tracking-wider block">
                  Interactive Curriculum Time-Machine
                </span>
                <span className="text-[11px] font-bold text-indigo-700/80">
                  Statewide Academic Chronology Scrubber &bull; Live Telemetry Sync
                </span>
              </div>
            </div>

            {/* Dynamic Era Indicator */}
            <div className="flex items-center gap-2">
              {timeSlider < 30 && (
                <span className="text-amber-800 bg-amber-100/90 px-3.5 py-1.5 rounded-full font-black text-xs border border-amber-300 inline-flex items-center gap-1.5 shadow-xs">
                  <span>[ 🕰️ 2021 Legacy Era (Obsolete Rote Syllabus) ]</span>
                </span>
              )}
              {timeSlider >= 30 && timeSlider < 80 && (
                <span className="text-blue-800 bg-blue-100/90 px-3.5 py-1.5 rounded-full font-black text-xs border border-blue-300 inline-flex items-center gap-1.5 shadow-xs">
                  <span>[ 🔄 Transition Phase (Hybrid Review) ]</span>
                </span>
              )}
              {timeSlider >= 80 && (
                <span className="text-emerald-800 bg-emerald-100/90 px-3.5 py-1.5 rounded-full font-black text-xs border border-emerald-300 inline-flex items-center gap-1.5 shadow-xs">
                  <span>[ ⚡ 2026 Autonomous AI Era (Industry-Aligned) ]</span>
                </span>
              )}
            </div>
          </div>

          {/* Cockpit HUD Metric Dials Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white/70 backdrop-blur-md p-3 rounded-2xl border border-indigo-200/80 shadow-2xs">
            <div className="flex items-center justify-between px-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Scrubber Position
              </span>
              <span className="font-mono text-xs font-black text-indigo-900 bg-indigo-100/80 px-2 py-0.5 rounded-md">
                {timeSlider}% Timeline
              </span>
            </div>
            <div className="flex items-center justify-between px-2 border-t sm:border-t-0 sm:border-l border-slate-200/80 pt-2 sm:pt-0">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Projected Wage Lift
              </span>
              <span className="font-mono text-xs font-black text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                +{Math.round(128 * (timeSlider / 100))}% CTC
              </span>
            </div>
            <div className="flex items-center justify-between px-2 border-t sm:border-t-0 sm:border-l border-slate-200/80 pt-2 sm:pt-0">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Credit Balancer
              </span>
              <span className="font-mono text-xs font-black text-sky-700 bg-sky-100/80 px-2 py-0.5 rounded-md">
                0.0h Drift Locked
              </span>
            </div>
          </div>

          {/* The Slider Element & Track */}
          <div className="pt-2 px-1">
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={timeSlider} 
              onChange={(e) => setTimeSlider(Number(e.target.value))} 
              className="w-full h-3.5 bg-slate-200/80 rounded-lg appearance-none cursor-pointer accent-indigo-600 shadow-inner" 
              style={{
                background: `linear-gradient(to right, #4f46e5 0%, #06b6d4 ${timeSlider}%, #e2e8f0 ${timeSlider}%, #e2e8f0 100%)`
              }}
            />

            {/* Tick Labels below slider */}
            <div className="flex justify-between items-center text-[11px] font-bold mt-2.5 px-0.5">
              <button 
                type="button"
                onClick={() => setTimeSlider(0)}
                className={`text-left transition-all ${
                  timeSlider < 30 
                    ? 'text-amber-800 font-black scale-102' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                2021 Legacy Monolith (0% Placement Lift)
              </button>

              <button 
                type="button"
                onClick={() => setTimeSlider(50)}
                className={`text-center transition-all ${
                  timeSlider >= 30 && timeSlider < 80 
                    ? 'text-blue-800 font-black scale-102' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Midway Hybrid
              </button>

              <button 
                type="button"
                onClick={() => setTimeSlider(100)}
                className={`text-right transition-all ${
                  timeSlider >= 80 
                    ? 'text-emerald-800 font-black scale-102' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                2026 Cloud-Native &amp; GenAI (+128% Placement Lift)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )}

      {/* ========================================================================= */}
      {/* 3. AUTOMATED MODULE SURGERY MATRIX (ZERO CREDIT DRIFT BALANCER)           */}
      {/* ========================================================================= */}
      {activeSection === 'audit' && (
        <div className="animate-in fade-in duration-200 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
        {/* Top Balance Strip */}
        <div className="bg-slate-900 text-white rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-sm">
          <div>
            <span className="text-xs sm:text-sm font-black text-emerald-400 tracking-wider block">
              ZERO CREDIT DRIFT AUDIT: 60 / 60 CONTACT HOURS LOCKED (4.0 CREDITS NET)
            </span>
            <span className="text-[11px] font-medium text-slate-300 mt-0.5 block">
              AICTE Model Curriculum Compliant • NCrF Level 6.5 Aligned • Contact Hour Delta: 0.0h
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
              ✓ Exact 1:1 Hour Balancing
            </span>
          </div>
        </div>

        {/* 4 Visual Unit Rows */}
        <div className="space-y-3.5 mt-4">
          {currentCourse.units.map((unit, idx) => (
            <div 
              key={`unit-row-${idx}`}
              className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 items-center bg-slate-50/50 p-2 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors"
            >
              {/* Left (Pruned) */}
              <div className="bg-rose-50 text-rose-800 border border-rose-200 rounded-xl p-3 text-xs font-bold line-through opacity-80 flex items-center justify-between">
                <span>{unit.prunedTitle}</span>
                <span className="text-[10px] font-mono text-rose-600 ml-2 no-underline">
                  [Pruned]
                </span>
              </div>

              {/* Center Arrow */}
              <div className="text-xs font-black text-slate-400 self-center text-center px-2 py-1">
                ➔ [Auto-Replaced] ➔
              </div>

              {/* Right (Injected) */}
              <div className="bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-xl p-3 text-xs font-bold shadow-xs flex items-center justify-between">
                <span>{unit.injectedTitle}</span>
                <span className="text-[10px] font-mono text-emerald-700 ml-2 bg-emerald-100/70 px-1.5 py-0.5 rounded">
                  [Verified]
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. REGULATORY COMPLIANCE & STATE BOS DIRECTIVE ACTION BAR                  */}
      {/* ========================================================================= */}
      
      {/* Compliance Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-center font-black text-xs text-slate-700 shadow-2xs">
          🏛️ NCrF Level 6.5 Certified
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-center font-black text-xs text-slate-700 shadow-2xs">
          📋 AICTE Model Match: 100%
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-center font-black text-xs text-emerald-700 shadow-2xs">
          🛡️ 5 of 5 Industry Seals Active
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-2.5 text-center font-black text-xs text-blue-700 shadow-2xs">
          🧪 GitHub PR Exam Rubric: 100%
        </div>
      </div>

      {/* Bottom Action Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
        {/* Left Side: Gazette Hash & Propagation Radar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">Gazette Hash:</span>
            <span className="font-mono text-xs font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              {isDirectiveIssued ? "BOS-TN-2026-CS3601-ALPHA" : "HASH-PENDING-RATIFICATION"}
            </span>
          </div>

          <span className="text-xs font-black text-slate-600 ml-3 flex items-center gap-1.5">
            {isDirectiveIssued ? (
              <>
                <span className="text-emerald-600">🟢</span>
                <span>{collegesSynced} / 420 State Colleges Synced</span>
              </>
            ) : (
              <>
                <span className="text-slate-400">●</span>
                <span>Awaiting BOS Executive Signature</span>
              </>
            )}
          </span>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePreviewPdf}
            className="border border-slate-300 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Preview Gazette Diff (PDF)</span>
          </button>

          <button
            type="button"
            onClick={handleIssueDirective}
            disabled={isDirectiveIssued}
            className={`font-black text-sm px-6 py-2.5 rounded-full shadow-md transition-all active:scale-95 flex items-center gap-2 ${
              isDirectiveIssued
                ? 'bg-emerald-600 text-white cursor-default'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isDirectiveIssued ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>✓ BOS Directive Promulgated</span>
              </>
            ) : (
              <>
                <span>Issue Board of Studies Directive →</span>
              </>
            )}
          </button>
        </div>
      </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. OFFICIAL GAZETTE DIFF PDF PREVIEW MODAL                                */}
      {/* ========================================================================= */}
      {isPreviewPdfOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <FileCheck2 className="w-6 h-6 text-emerald-400" />
                <div>
                  <h3 className="text-base font-black tracking-tight">
                    Official Board of Studies Statutory Gazette Diff
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Ref: {currentCourse.gazetteHash} • AICTE &amp; NCrF Certified
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrintGazette}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save PDF</span>
                </button>
                <button 
                  type="button"
                  onClick={() => setIsPreviewPdfOpen(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body / Gazette Document Preview */}
            <div className="p-6 max-h-[70vh] overflow-y-auto space-y-5 bg-slate-50 font-sans text-xs text-slate-700">
              
              {/* Document Banner */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 text-center shadow-xs">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                  Government of Tamil Nadu • Directorate of Technical Education
                </span>
                <h4 className="text-base font-black text-slate-900 uppercase">
                  Board of Studies Statutory Curriculum Gazette Notification
                </h4>
                <p className="text-xs font-bold text-blue-700 mt-1">
                  Mandatory Reallocation Order for {currentCourse.code}: {currentCourse.title}
                </p>
                <div className="mt-3 flex justify-center gap-3 text-[11px] font-mono text-slate-500">
                  <span>Gazette Hash: <strong>{currentCourse.gazetteHash}</strong></span>
                  <span>•</span>
                  <span>Effective: Academic Year 2026-27</span>
                </div>
              </div>

              {/* Audit Summary Table */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <h5 className="font-black text-slate-900 text-xs uppercase tracking-wider border-b pb-2">
                  1. Zero Credit Drift Certification &amp; Wage Lift Telemetry
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-2.5 bg-slate-50 rounded-lg">
                    <span className="text-[10px] text-slate-500 block">Contact Hours</span>
                    <strong className="text-sm font-black text-slate-900">60 / 60h</strong>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg">
                    <span className="text-[10px] text-slate-500 block">Net Credit Delta</span>
                    <strong className="text-sm font-black text-emerald-600">0.0 (4.0 Credits)</strong>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg">
                    <span className="text-[10px] text-slate-500 block">Projected Starting CTC</span>
                    <strong className="text-sm font-black text-indigo-600">₹{medianCTC.toFixed(1)} LPA</strong>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg">
                    <span className="text-[10px] text-slate-500 block">Placement Yield</span>
                    <strong className="text-sm font-black text-cyan-600">{placementYield}%</strong>
                  </div>
                </div>
              </div>

              {/* Side-by-Side Module Surgery Table */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <h5 className="font-black text-slate-900 text-xs uppercase tracking-wider border-b pb-2">
                  2. Unit-by-Unit Statutory Surgery Breakdown
                </h5>
                <div className="space-y-2">
                  {currentCourse.units.map((u, i) => (
                    <div key={`modal-unit-${i}`} className="p-3 bg-slate-50 rounded-lg border border-slate-200/60 flex items-center justify-between text-[11px]">
                      <div className="line-through text-rose-700 font-semibold w-5/12">
                        {u.prunedTitle}
                      </div>
                      <div className="font-mono text-slate-400 text-xs px-2">➔</div>
                      <div className="text-emerald-800 font-bold w-5/12 text-right">
                        {u.injectedTitle}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Statutory Sign-off Stamps */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Statutory Ratification
                  </span>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">
                    State Board of Studies Academic Council &amp; AICTE Regional Committee
                  </p>
                </div>
                <div className="border border-emerald-400 bg-emerald-50 px-4 py-2 rounded-xl text-center">
                  <span className="text-[10px] font-black text-emerald-800 uppercase block">
                    ✓ DIGITALLY RATIFIED
                  </span>
                  <span className="text-[9px] font-mono text-emerald-600">
                    BOS-TN-SEC-2026
                  </span>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-slate-100 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-slate-600 font-medium">
                  Official Gazette Ref: <strong>{currentCourse.gazetteHash}</strong> • AICTE &amp; NCrF Certified
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrintGazette}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 active:scale-95"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Download Gazette PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsPreviewPdfOpen(false)}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
