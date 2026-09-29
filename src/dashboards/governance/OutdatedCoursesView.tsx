import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle,
  RefreshCw,
  Check, 
  CheckCircle2, 
  Printer, 
  X, 
  FileCheck2, 
  Lock,
  Sparkles
} from 'lucide-react';

type CourseLifecycleState = 'active' | 'frozen' | 'sunset' | 'modernized' | 'deregistered';

interface CourseItem {
  id: string;
  code: string;
  name: string;
  demandVsSupply: string;
  placementYield: string;
  placementPillColor: string;
  seats: number;
  budgetCr: number;
  status: CourseLifecycleState;
  reallocatedTo: string;
  districtShortage: string;
}

const INITIAL_COURSES: CourseItem[] = [
  {
    id: 'cs-voc-102',
    code: 'CS-VOC-102',
    name: 'DTP & Desktop Publishing',
    demandVsSupply: '45 Openings vs 2,400 Grads (+5,230% Flood)',
    placementYield: '14% Median Yield',
    placementPillColor: 'bg-rose-50 text-rose-700 border-rose-200',
    seats: 2400,
    budgetCr: 4.0,
    status: 'sunset', // initialized as sunset (already completed)
    reallocatedTo: 'Cloud DevOps & K8s',
    districtShortage: 'Resolves OMR Shortage'
  },
  {
    id: 'it-voc-204',
    code: 'IT-VOC-204',
    name: 'Legacy ASP 3.0 & Visual Basic 6',
    demandVsSupply: '12 Openings vs 1,800 Grads (Extinct Market)',
    placementYield: '8% Median Yield',
    placementPillColor: 'bg-rose-50 text-rose-700 border-rose-200',
    seats: 1800,
    budgetCr: 3.0,
    status: 'active',
    reallocatedTo: 'FastAPI & Microservices',
    districtShortage: 'Resolves TIDEL Shortage'
  },
  {
    id: 'me-voc-301',
    code: 'ME-VOC-301',
    name: 'Manual 2D Draughtsmanship (Paper T-Square)',
    demandVsSupply: '110 Openings vs 2,200 Grads (Legacy Draft)',
    placementYield: '21% Median Yield',
    placementPillColor: 'bg-amber-50 text-amber-700 border-amber-200',
    seats: 2200,
    budgetCr: 3.7,
    status: 'active',
    reallocatedTo: '3D BIM & Generative CAD',
    districtShortage: 'Resolves Auto Corridor Shortage'
  },
  {
    id: 'mm-voc-108',
    code: 'MM-VOC-108',
    name: 'Flash & ActionScript Animation',
    demandVsSupply: '0 Openings vs 2,020 Grads (100% Obsolete)',
    placementYield: '0% Median Yield',
    placementPillColor: 'bg-rose-50 text-rose-700 border-rose-200',
    seats: 2020,
    budgetCr: 3.5,
    status: 'active',
    reallocatedTo: 'Applied GenAI & Agents',
    districtShortage: 'Resolves Urban Shortage'
  }
];

export const OutdatedCoursesView: React.FC = () => {
  // Sub-Heading Active Tab State
  const [activeSection, setActiveSection] = useState<'docket' | 'redeployment'>('docket');

  // Flagged courses state
  const [courses, setCourses] = useState<CourseItem[]>(INITIAL_COURSES);

  // Live telemetry counters
  const [trappedSeats, setTrappedSeats] = useState<number>(0);
  const [wastedBudget, setWastedBudget] = useState<number>(0);
  const [seatsPreserved, setSeatsPreserved] = useState<number>(0);
  const [instructorsQueued, setInstructorsQueued] = useState<number>(0);
  const [isPromulgated, setIsPromulgated] = useState<boolean>(false);
  const [mountProgress, setMountProgress] = useState<number>(0);

  // Modal & Toast states
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDocketModalOpen, setIsDocketModalOpen] = useState<boolean>(false);

  // Initial target metrics based on CS-VOC-102 already being sunset (2,400 seats reallocated):
  // Remaining active trapped seats: 1,800 + 2,200 + 2,020 = 6,020
  // Initial wasted budget: 3.0 + 3.7 + 3.5 = 10.2 Cr
  // Initial seats preserved: 2,400
  // Instructors queued: 380
  useEffect(() => {
    const duration = 1200;
    const startTime = performance.now();

    const animateMount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out

      setMountProgress(eased);
      setTrappedSeats(Math.round(eased * 6020));
      setWastedBudget(Number((eased * 10.2).toFixed(1)));
      setSeatsPreserved(Math.round(eased * 2400));
      setInstructorsQueued(Math.round(eased * 380));

      if (progress < 1) {
        requestAnimationFrame(animateMount);
      }
    };

    requestAnimationFrame(animateMount);
  }, []);

  // Helper for smooth numeric transitions on click
  const animateNumber = (from: number, to: number, setter: (v: number) => void, isFloat = false) => {
    const duration = 400;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = from + (to - from) * eased;
      setter(isFloat ? Number(current.toFixed(1)) : Math.round(current));
      if (p < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  // 1. Freeze Admissions handler
  const handleFreezeAdmissions = (courseId: string) => {
    const target = courses.find(c => c.id === courseId);
    if (!target || target.status !== 'active') return;

    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        return { ...c, status: 'frozen' };
      }
      return c;
    }));

    setToastMessage('Intake Locked: Fresh admissions blocked for AY 2026-27.');
    setTimeout(() => setToastMessage(null), 4000);
  };

  // 2. Phase-Out Sunset handler (e.g. IT-VOC-204)
  const handlePhaseOutSunset = (courseId: string) => {
    const target = courses.find(c => c.id === courseId);
    if (!target || target.status === 'sunset') return;

    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        return { ...c, status: 'sunset' };
      }
      return c;
    }));

    // Decrement trappedSeats by course capacity, decrement wastedBudget, increment seatsPreserved
    animateNumber(trappedSeats, Math.max(0, trappedSeats - target.seats), setTrappedSeats);
    animateNumber(wastedBudget, Math.max(0, Number((wastedBudget - target.budgetCr).toFixed(1))), setWastedBudget, true);
    animateNumber(seatsPreserved, Math.min(8420, seatsPreserved + target.seats), setSeatsPreserved);

    setToastMessage('Statutory Sunset Scheduled: Capacity routed to emerging tracks.');
    setTimeout(() => setToastMessage(null), 4000);
  };

  // 3. Mandate Modernization handler (e.g. ME-VOC-301)
  const handleMandateModernization = (courseId: string) => {
    const target = courses.find(c => c.id === courseId);
    if (!target || target.status === 'modernized') return;

    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        return { ...c, status: 'modernized' };
      }
      return c;
    }));

    // Decrement trappedSeats by 2,200, decrement budget, increment seatsPreserved
    animateNumber(trappedSeats, Math.max(0, trappedSeats - target.seats), setTrappedSeats);
    animateNumber(wastedBudget, Math.max(0, Number((wastedBudget - target.budgetCr).toFixed(1))), setWastedBudget, true);
    animateNumber(seatsPreserved, Math.min(8420, seatsPreserved + target.seats), setSeatsPreserved);

    setToastMessage('Modernization Mandate Ratified: Capacity routed to 3D BIM & CAD.');
    setTimeout(() => setToastMessage(null), 4000);
  };

  // 4. Immediate Deregistration handler (e.g. MM-VOC-108)
  const handleImmediateDeregistration = (courseId: string) => {
    const target = courses.find(c => c.id === courseId);
    if (!target || target.status === 'deregistered') return;

    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        return { ...c, status: 'deregistered' };
      }
      return c;
    }));

    // Decrement trappedSeats by 2,020, decrement budget, increment seatsPreserved
    animateNumber(trappedSeats, Math.max(0, trappedSeats - target.seats), setTrappedSeats);
    animateNumber(wastedBudget, Math.max(0, Number((wastedBudget - target.budgetCr).toFixed(1))), setWastedBudget, true);
    animateNumber(seatsPreserved, Math.min(8420, seatsPreserved + target.seats), setSeatsPreserved);

    setToastMessage('Immediate Deregistration Order Dispatched: 2,020 seats reallocated to GenAI.');
    setTimeout(() => setToastMessage(null), 4000);
  };

  // 5. Bottom Promulgation Master Action
  const handlePromulgateAll = () => {
    if (isPromulgated) return;
    setIsPromulgated(true);

    // Transition ALL courses simultaneously to their completed states
    setCourses(prev => prev.map(c => {
      if (c.id === 'cs-voc-102' || c.id === 'it-voc-204') {
        return { ...c, status: 'sunset' };
      }
      if (c.id === 'me-voc-301') {
        return { ...c, status: 'modernized' };
      }
      if (c.id === 'mm-voc-108') {
        return { ...c, status: 'deregistered' };
      }
      return { ...c, status: 'sunset' };
    }));

    // Animate trappedSeats down to 0, wastedBudget down to 0.0 Cr, seatsPreserved hits 8,420
    animateNumber(trappedSeats, 0, setTrappedSeats);
    animateNumber(wastedBudget, 0.0, setWastedBudget, true);
    animateNumber(seatsPreserved, 8420, setSeatsPreserved);

    setToastMessage('Order GO-TN-2026-RATIONALIZE-09 Promulgated Statewide.');
    setTimeout(() => setToastMessage(null), 5000);
  };

  // Course status check helpers for bottom conduits
  const isConduit1Active = courses.find(c => c.id === 'cs-voc-102')?.status === 'sunset' || isPromulgated;
  const isConduit2Active = courses.find(c => c.id === 'it-voc-204')?.status === 'sunset' || isPromulgated;
  const isConduit3Active = courses.find(c => c.id === 'me-voc-301')?.status === 'modernized' || courses.find(c => c.id === 'me-voc-301')?.status === 'sunset' || isPromulgated;
  const isConduit4Active = courses.find(c => c.id === 'mm-voc-108')?.status === 'deregistered' || courses.find(c => c.id === 'mm-voc-108')?.status === 'sunset' || isPromulgated;

  // Dynamic Risk Barometer Widths:
  // Red bar collapses to 0%, Emerald bar expands to 100% when promulgated or all resolved
  const redBarWidth = isPromulgated ? 0 : Math.round(18 * (trappedSeats / 6020) * mountProgress);
  const amberBarWidth = isPromulgated ? 0 : Math.round(34 * (trappedSeats / 6020) * mountProgress);
  const emeraldBarWidth = isPromulgated 
    ? 100 
    : Math.min(100, Math.round(48 + (52 * (seatsPreserved - 2400) / 6020)));

  // Generate printable HTML for Rationalization Docket
  const generateDocketHtml = () => {
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const timeStr = new Date().toLocaleTimeString();

    return `< !DOCTYPE html >
  <html lang="en">
    <head>
      <meta charset="UTF-8">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Statewide Rationalization Docket - GO-TN-2026-RATIONALIZE-09</title>
            <style>
              @page {size: A4 portrait; margin: 15mm; }
              * {box - sizing: border-box; margin: 0; padding: 0; }
              body {
                font - family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              color: #0f172a;
              background: #f8fafc;
              padding: 24px;
              line-height: 1.45;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
    }
              .print-sheet {
                max - width: 820px;
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
              .content-padding {padding: 32px; }
              .header-card {
                text - align: center;
              padding: 24px 20px;
              border: 1px solid #e2e8f0;
              border-radius: 14px;
              background: #ffffff;
              margin-bottom: 24px;
    }
              .subheader {
                font - size: 11px;
              font-weight: 900;
              letter-spacing: 0.12em;
              text-transform: uppercase;
              color: #64748b;
              margin-bottom: 6px;
    }
              .main-title {
                font - size: 20px;
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
                font - size: 12px;
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
              grid-template-columns: repeat(3, 1fr);
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
                font - size: 10px;
              font-weight: 700;
              color: #64748b;
              text-transform: uppercase;
              margin-bottom: 4px;
              display: block;
    }
              .metric-value {
                font - size: 18px;
              font-weight: 900;
              color: #0f172a;
              display: block;
    }
              .metric-meta {
                font - size: 9px;
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
                font - size: 11px;
              color: #475569;
              line-height: 1.5;
              max-width: 520px;
    }
              .stamp-box {
                border: 2px solid #10b981;
              background: #ecfdf5;
              padding: 10px 16px;
              border-radius: 12px;
              text-align: center;
              min-width: 170px;
    }
              @media print {
                body {background: #ffffff; padding: 0; }
              .print-sheet {border: none; box-shadow: none; border-radius: 0; max-width: 100%; }
              .print-toolbar {display: none !important; }
              .content-padding {padding: 0; }
    }
            </style>
          </head>
          <body>
            <div class="print-sheet">
              <div class="print-toolbar no-print">
                <div style="font-weight: 800; font-size: 14px; display: flex; align-items: center; gap: 8px;">
                  <span>&#9998;</span> State SDMS Course Rationalization Gazette Print Engine
                </div>
                <div style="display: flex; gap: 10px;">
                  <button class="print-btn" onclick="window.print();">&#128438; Print / Save as PDF</button>
                  <button class="close-btn" onclick="window.close();">Close Window</button>
                </div>
              </div>

              <div class="content-padding">
                <div class="header-card">
                  <div class="subheader">GOVERNMENT OF TAMIL NADU &bull; SKILL DEVELOPMENT MISSION &bull; ITIs &amp; POLYTECHNICS</div>
                  <h1 class="main-title">STATUTORY COURSE PRUNING &amp; SEAT REALLOCATION ORDER</h1>
                  <div class="order-pill">Order Ref: GO-TN-2026-RATIONALIZE-09 &bull; Zero Seat Loss Protocol</div>
                  <div class="meta-row">
                    <span>Target Institutions: <strong>420 State ITIs &amp; Polytechs</strong></span>
                    <span>&bull;</span>
                    <span>Scope: <strong>766 Industrial Districts</strong></span>
                    <span>&bull;</span>
                    <span>Date: ${dateStr} ${timeStr}</span>
                  </div>
                </div>

                <div class="section-box">
                  <div class="section-header">1. Macro Capacity Protection &amp; Capital Reallocation</div>
                  <div class="metric-grid">
                    <div class="metric-card">
                      <span class="metric-label">Trapped Student Seats</span>
                      <span class="metric-value" style="color: #e11d48;">${trappedSeats.toLocaleString()}</span>
                      <span class="metric-meta">${trappedSeats === 0 ? '100% Cleared' : 'Sub-20% Placement Drag'}</span>
                    </div>
                    <div class="metric-card">
                      <span class="metric-label">Wasted Annual Grants</span>
                      <span class="metric-value" style="color: #d97706;">&#8377;${wastedBudget.toFixed(1)} Cr</span>
                      <span class="metric-meta">${wastedBudget === 0 ? 'Fully Reallocated' : 'Sunk in Deprecated Workshops'}</span>
                    </div>
                    <div class="metric-card">
                      <span class="metric-label">Net Capacity Preserved</span>
                      <span class="metric-value" style="color: #059669;">${seatsPreserved.toLocaleString()} Seats</span>
                      <span class="metric-meta">100% 1:1 Reallocated (0% Loss)</span>
                    </div>
                  </div>
                </div>

                <div class="section-box">
                  <div class="section-header">2. Flagged Disciplines &amp; 1:1 Redeployment Pathways</div>
                  ${courses.map(c => `
          <div class="unit-row">
            <div class="unit-pruned">
              <span style="text-decoration: line-through;">${c.code}: ${c.name} (${c.seats.toLocaleString()} Seats)</span>
              <span style="font-size: 10px; font-weight: 800; color: #e11d48; margin-left: 8px;">[${c.status.toUpperCase()}]</span>
            </div>
            <div class="unit-arrow">&#10148; 1:1 Conduit &#10148;</div>
            <div class="unit-injected">
              <span>${c.reallocatedTo} (${c.seats.toLocaleString()} Seats)</span>
              <span style="font-size: 10px; font-weight: 800; background: #d1fae5; color: #047857; padding: 2px 6px; border-radius: 9999px; margin-left: 8px;">[${c.districtShortage}]</span>
            </div>
          </div>
        `).join('')}
                </div>

                <div class="footer-box">
                  <div>
                    <p class="footer-statement">
                      <strong>Statutory Mandate:</strong> In accordance with Tamil Nadu Skill Development Mission Resolution SDMS/2026/09, all obsolete vocational intake pipelines are hereby sunsetted. 100% of physical seating capacity and affiliated faculty allocations are routed to modern enterprise skills.
                    </p>
                    <div style="font-family: monospace; font-size: 10px; color: #2563eb; margin-top: 4px;">
                      Statutory Cryptographic Ref: GO-TN-2026-RATIONALIZE-09 &bull; AICTE-NCrF Level 6.5
                    </div>
                  </div>
                  <div class="stamp-box">
                    <span style="font-size: 11px; font-weight: 900; color: #065f46; text-transform: uppercase; display: block;">&#10003; DIGITALLY RATIFIED</span>
                    <span style="font-family: monospace; font-size: 9px; color: #059669; font-weight: 700; display: block; margin-top: 2px;">GO-TN-SDMS-2026</span>
                    <span style="font-size: 8px; color: #64748b; text-transform: uppercase; margin-top: 4px; display: block;">Directorate of Technical Education</span>
                  </div>
                </div>
              </div>
            </div>

            <script>
    window.addEventListener('load', () => {
                setTimeout(() => { window.print(); }, 350);
    });
            </script>
          </body>
        </html>`;
  };

  // Launch print window
  const handlePrintDocket = () => {
    const html = generateDocketHtml();
        try {
      const printWindow = window.open('', '_blank', 'width=950,height=900,menubar=no,toolbar=no,location=no,status=no');
        if (printWindow) {
          printWindow.document.open();
        printWindow.document.write(html);
        printWindow.document.close();
        printWindow.focus();
      } else {
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
    } catch (e) {
          console.error('Print error:', e);
        window.print();
    }

        setToastMessage('✓ Rationalization Docket launched for printing / PDF export.');
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleOpenDocketModal = () => {
          setIsDocketModalOpen(true);
        handlePrintDocket();
  };

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
              Outdated Courses
            </h1>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Statewide course rationalization, obsolete intake phase-out, and 1:1 seat capacity reallocation engine
            </p>
          </div>

          {/* Persistent Green Banner when Order is Promulgated */}
          {isPromulgated && (
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border-2 border-emerald-500/80 rounded-2xl p-4 text-white shadow-xl flex flex-wrap items-center justify-between gap-4 animate-fadeIn">
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-300 shadow-inner">
                  <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-xs font-black text-emerald-400 uppercase tracking-widest block">
                    Statewide Rationalization Directive Promulgated • 8,420 Seats Fully Transferred.
                  </span>
                  <p className="text-sm font-bold text-white mt-0.5">
                    Order GO-TN-2026-RATIONALIZE-09 Promulgated Statewide.
                  </p>
                  <span className="text-[11px] font-mono text-emerald-300/80">
                    All 4 Deprecated Pipelines Sunsetted • 0% Seat Loss • 766 Districts Synced
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-3.5 py-1.5 rounded-full">
                  🟢 420 / 420 State ITIs &amp; Polytechs Synced
                </span>
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
                onClick={() => setActiveSection('docket')}
                className={`py-3.5 px-1 border-b-2 text-sm transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                  activeSection === 'docket'
                    ? 'border-blue-600 text-blue-600 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800 font-medium'
                }`}
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Trade Risk &amp; Rationalization Docket</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                    activeSection === 'docket'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  14 Obsolete Trades
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSection('redeployment')}
                className={`py-3.5 px-1 border-b-2 text-sm transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                  activeSection === 'redeployment'
                    ? 'border-blue-600 text-blue-600 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800 font-medium'
                }`}
              >
                <RefreshCw className="w-4 h-4" />
                <span>Capacity Redeployment Conduit</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                    activeSection === 'redeployment'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  8,420 Protected Seats
                </span>
              </button>
            </nav>
          </div>

          {/* ========================================================================= */}
          {/* 1. TOP SECTION: Statewide Risk Barometer & Capital Reallocation Funnel    */}
          {/* ========================================================================= */}
          {activeSection === 'docket' && (
            <div className="animate-in fade-in duration-200 space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm mb-6">

            {/* Top: Horizontal Vocational Health Risk Spectrum */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Statewide Vocational Catalog Risk Spectrum
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Active Catalog: 82 Accredited Trade Qualifications
                </span>
              </div>

              {/* Segmented Multi-Color Progress Runway */}
              <div className="h-4 rounded-full overflow-hidden flex my-3 shadow-inner bg-slate-100">
                {/* Critical Placement Drag (<20% Yield) */}
                <div
                  style={{ width: `${redBarWidth}%` }}
                  className="bg-rose-500 transition-all duration-700 ease-out relative group"
                  title={`Critical Drag (<20% Yield): ${redBarWidth}%`}
                />
                {/* Oversupplied Moderate Drag (20-50% Yield) */}
                <div
                  style={{ width: `${amberBarWidth}%` }}
                  className="bg-amber-500 transition-all duration-700 ease-out relative group"
                  title={`Oversupplied (20-50% Yield): ${amberBarWidth}%`}
                />
                {/* High-Yield Industry Matched (>50% Yield) */}
                <div
                  style={{ width: `${emeraldBarWidth}%` }}
                  className="bg-emerald-500 transition-all duration-700 ease-out relative group"
                  title={`Industry Aligned (>50% Yield): ${emeraldBarWidth}%`}
                />
              </div>

              {/* Spectrum Legend */}
              <div className="flex flex-wrap items-center justify-between text-xs font-bold pt-1 gap-2">
                <span className={isPromulgated ? "text-slate-400 line-through" : "text-rose-600"}>
                  ● {isPromulgated ? "0% Critical Drag (0 Trades)" : "18% Critical Drag (<20% Yield • 12 Trades)"}
                </span>
                <span className={isPromulgated ? "text-slate-400 line-through" : "text-amber-600"}>
                  ● {isPromulgated ? "0% Oversupplied (0 Trades)" : "34% Oversupplied (20-50% Yield • 28 Trades)"}
                </span>
                <span className="text-emerald-600">
                  ● {isPromulgated ? "100% Industry Aligned (82 Trades • Fully Ratified)" : "48% Industry Aligned (>50% Yield • 42 Trades)"}
                </span>
              </div>
            </div>

            {/* Bottom: 3 Macro Velocity Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

              {/* Tile 1 (Trapped Pipeline) */}
              <div className="bg-rose-50/60 border border-rose-200/80 rounded-2xl p-4 flex flex-col justify-between group hover:border-rose-300 transition-colors">
                <span className="text-xs font-black text-rose-800 uppercase tracking-wider">
                  Trapped Student Seats
                </span>
                <div className="my-1">
                  <span className="text-3xl font-black text-rose-600 block tracking-tight">
                    {trappedSeats.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-bold text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded-full inline-block mt-1">
                    {trappedSeats === 0 ? "100% Seats Cleared" : "Sub-20% Placement Yield"}
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500">
                  {trappedSeats === 0 ? "Zero Trapped Capacity" : "Outdated trades statewide"}
                </span>
              </div>

              {/* Tile 2 (Capital Drag) */}
              <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-4 flex flex-col justify-between group hover:border-amber-300 transition-colors">
                <span className="text-xs font-black text-amber-800 uppercase tracking-wider">
                  Wasted Annual Grants
                </span>
                <div className="my-1">
                  <span className="text-3xl font-black text-amber-600 block tracking-tight">
                    ₹{wastedBudget.toFixed(1)} Cr
                  </span>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full inline-block mt-1">
                    {wastedBudget === 0 ? "100% Sunk Drag Cleared" : "Sunk in Deprecated Workshops"}
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500">
                  {wastedBudget === 0 ? "All Grants Reallocated" : "Recurring lab & consumable costs"}
                </span>
              </div>

              {/* Tile 3 (Capacity Protection) */}
              <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-4 flex flex-col justify-between group hover:border-emerald-300 transition-colors">
                <span className="text-xs font-black text-emerald-800 uppercase tracking-wider">
                  Net Capacity Preserved
                </span>
                <div className="my-1">
                  <span className="text-3xl font-black text-emerald-600 block tracking-tight">
                    {seatsPreserved.toLocaleString()} Seats
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full inline-block mt-1">
                    100% 1:1 Reallocated (0% Seat Loss)
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500">
                  Guaranteed institutional quota
                </span>
              </div>

            </div>

          </div>

          {/* ========================================================================= */}
          {/* 2. MIDDLE SECTION: Rationalization & Sunset Triage Matrix                 */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm mb-6">
            {/* Header Row */}
            <div className="pb-3 border-b border-slate-100">
              <h2 className="text-base font-black text-slate-900">
                Priority Trade Rationalization Docket
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Flagged disciplines with high enrollment but near-zero industrial demand.
              </p>
            </div>

            {/* Course Sunset Table / Stacked Card Rows */}
            <div className="space-y-3.5 mt-4">

              {/* Row 1: CS-VOC-102 (DTP & Desktop Publishing) - Initialized as sunset */}
              {(() => {
                const course = courses.find(c => c.id === 'cs-voc-102')!;
                return (
                  <div className="p-4 rounded-2xl border transition-all bg-emerald-50/40 border-emerald-200">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-black text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
                            {course.code}
                          </span>
                          <span className="text-sm font-black text-slate-900">
                            {course.name}
                          </span>
                          <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                            [Sunset &amp; Reallocated]
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 flex flex-wrap items-center gap-3">
                          <span>Demand vs Supply: <strong className="text-slate-900">{course.demandVsSupply}</strong></span>
                          <span>•</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${course.placementPillColor}`}>
                            {course.placementYield}
                          </span>
                          <span>•</span>
                          <span className="text-slate-500 font-medium">Capacity: {course.seats.toLocaleString()} Seats</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start lg:self-center">
                        <button
                          type="button"
                          disabled
                          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                        >
                          Freeze Admissions
                        </button>
                        <div className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white border border-emerald-600 flex items-center gap-1.5 shadow-2xs cursor-default">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>[ ✓ Sunset Confirmed ]</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Row 2: IT-VOC-204 (Legacy ASP 3.0 & VB6) - supports 'active', 'frozen', 'sunset' */}
              {(() => {
                const course = courses.find(c => c.id === 'it-voc-204')!;
                const isFrozen = course.status === 'frozen';
                const isSunset = course.status === 'sunset';

                return (
                  <div className={`p-4 rounded-2xl border transition-all ${isSunset
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : isFrozen
                        ? 'bg-amber-50/40 border-amber-200'
                        : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                    }`}>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-black text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
                            {course.code}
                          </span>
                          <span className="text-sm font-black text-slate-900">
                            {course.name}
                          </span>
                          {isSunset ? (
                            <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                              [Sunset &amp; Reallocated]
                            </span>
                          ) : isFrozen ? (
                            <span className="bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                              [Admissions Frozen 2026-27]
                            </span>
                          ) : (
                            <span className="bg-rose-100 text-rose-800 border border-rose-300 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                              Active Intake
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-600 flex flex-wrap items-center gap-3">
                          <span>Demand vs Supply: <strong className="text-slate-900">{course.demandVsSupply}</strong></span>
                          <span>•</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${course.placementPillColor}`}>
                            {course.placementYield}
                          </span>
                          <span>•</span>
                          <span className="text-slate-500 font-medium">Capacity: {course.seats.toLocaleString()} Seats</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start lg:self-center">
                        {/* Freeze Admissions Button */}
                        {isFrozen ? (
                          <span className="px-3 py-1.5 rounded-xl text-xs font-black bg-amber-100 text-amber-800 border border-amber-300 shadow-2xs flex items-center gap-1.5 cursor-default">
                            <span>[ ❄️ Intake Frozen ]</span>
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleFreezeAdmissions(course.id)}
                            disabled={isSunset}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${isSunset
                                ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                                : 'bg-white hover:bg-amber-50 text-amber-700 border border-amber-300 shadow-2xs active:scale-95'
                              }`}
                          >
                            <Lock className="w-3.5 h-3.5" />
                            <span>[ Freeze Admissions ]</span>
                          </button>
                        )}

                        {/* Phase-Out Sunset Button */}
                        {isSunset ? (
                          <div className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white border border-emerald-600 flex items-center gap-1.5 shadow-2xs cursor-default">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>[ ✓ Sunset Confirmed ]</span>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handlePhaseOutSunset(course.id)}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all bg-rose-600 hover:bg-rose-700 text-white shadow-2xs active:scale-95 flex items-center gap-1.5"
                          >
                            <span>[ Phase-Out Sunset ]</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Row 3: ME-VOC-301 (Manual 2D Draughtsmanship) - supports 'active', 'frozen', 'modernized' */}
              {(() => {
                const course = courses.find(c => c.id === 'me-voc-301')!;
                const isFrozen = course.status === 'frozen';
                const isModernized = course.status === 'modernized' || course.status === 'sunset';

                return (
                  <div className={`p-4 rounded-2xl border transition-all ${isModernized
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : isFrozen
                        ? 'bg-amber-50/40 border-amber-200'
                        : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                    }`}>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-black text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
                            {course.code}
                          </span>
                          <span className="text-sm font-black text-slate-900">
                            {course.name}
                          </span>
                          {isModernized ? (
                            <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                              [ Modernized to 3D BIM ]
                            </span>
                          ) : isFrozen ? (
                            <span className="bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                              [Admissions Frozen 2026-27]
                            </span>
                          ) : (
                            <span className="bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                              Active Intake
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-600 flex flex-wrap items-center gap-3">
                          <span>Demand vs Supply: <strong className="text-slate-900">{course.demandVsSupply}</strong></span>
                          <span>•</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${course.placementPillColor}`}>
                            {course.placementYield}
                          </span>
                          <span>•</span>
                          <span className="text-slate-500 font-medium">Capacity: {course.seats.toLocaleString()} Seats</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start lg:self-center">
                        {/* Freeze Admissions Button */}
                        {isFrozen ? (
                          <span className="px-3 py-1.5 rounded-xl text-xs font-black bg-amber-100 text-amber-800 border border-amber-300 shadow-2xs flex items-center gap-1.5 cursor-default">
                            <span>[ ❄️ Intake Frozen ]</span>
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleFreezeAdmissions(course.id)}
                            disabled={isModernized}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${isModernized
                                ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                                : 'bg-white hover:bg-amber-50 text-amber-700 border border-amber-300 shadow-2xs active:scale-95'
                              }`}
                          >
                            <Lock className="w-3.5 h-3.5" />
                            <span>[ Freeze Admissions ]</span>
                          </button>
                        )}

                        {/* Mandate Modernization Button */}
                        {isModernized ? (
                          <div className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white border border-emerald-600 flex items-center gap-1.5 shadow-2xs cursor-default">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>[ ⚡ Modernized to 3D BIM ]</span>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleMandateModernization(course.id)}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all bg-blue-600 hover:bg-blue-700 text-white shadow-2xs active:scale-95 flex items-center gap-1.5"
                          >
                            <span>[ Mandate Modernization ]</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Row 4: MM-VOC-108 (Flash & ActionScript) - supports 'active', 'deregistered' */}
              {(() => {
                const course = courses.find(c => c.id === 'mm-voc-108')!;
                const isDeregistered = course.status === 'deregistered' || course.status === 'sunset';

                return (
                  <div className={`p-4 rounded-2xl border transition-all ${isDeregistered
                      ? 'bg-rose-50/30 border-rose-200'
                      : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                    }`}>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-black text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
                            {course.code}
                          </span>
                          <span className={`text-sm font-black text-slate-900 ${isDeregistered ? 'line-through opacity-75' : ''}`}>
                            {course.name}
                          </span>
                          {isDeregistered ? (
                            <span className="bg-rose-100 text-rose-800 border border-rose-300 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                              [ Deregistered 🚫 ]
                            </span>
                          ) : (
                            <span className="bg-rose-100 text-rose-800 border border-rose-300 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                              Active Intake
                            </span>
                          )}
                        </div>
                        <div className={`text-xs text-slate-600 flex flex-wrap items-center gap-3 ${isDeregistered ? 'opacity-70' : ''}`}>
                          <span>Demand vs Supply: <strong className="text-slate-900">{course.demandVsSupply}</strong></span>
                          <span>•</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${course.placementPillColor}`}>
                            {course.placementYield}
                          </span>
                          <span>•</span>
                          <span className="text-slate-500 font-medium">Capacity: {course.seats.toLocaleString()} Seats</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start lg:self-center">
                        {/* Immediate Deregistration Button */}
                        {isDeregistered ? (
                          <span className="px-3 py-1.5 rounded-xl text-xs font-black bg-rose-100 text-rose-800 border border-rose-300 shadow-2xs flex items-center gap-1.5 cursor-default">
                            <span>[ Deregistered 🚫 ]</span>
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleImmediateDeregistration(course.id)}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all bg-rose-600 hover:bg-rose-700 text-white shadow-2xs active:scale-95 flex items-center gap-1.5"
                          >
                            <span>[ Immediate Deregistration ]</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}

            </div>
          </div>
        </div>
      )}

          {/* ========================================================================= */}
          {/* 3. LOWER-MIDDLE SECTION: The 1:1 Seat Redeployment Conduit                */}
          {/* ========================================================================= */}
          {activeSection === 'redeployment' && (
            <div className="animate-in fade-in duration-200 space-y-6">
              <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 shadow-md mb-6">
            {/* Header */}
            <div className="pb-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-black text-indigo-300 uppercase tracking-wider block">
                  ● ZERO SEAT LOSS PROTOCOL
                </span>
                <h2 className="text-lg font-black text-white mt-1">
                  Automated Student Capacity Redeployment Conduit
                </h2>
                <p className="text-xs font-medium text-slate-300 mt-0.5">
                  Guarantees state institutions retain 100% of their student enrollment quota by routing pruned seats into Portal 1 regional tech deficits.
                </p>
              </div>
              <span className="text-xs font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full">
                8,420 Protected Seats
              </span>
            </div>

            {/* 4 High-Impact Transfer Channels */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-5">

              {/* Conduit 1: Cloud DevOps & K8s */}
              <div className={`rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 ${isConduit1Active
                  ? 'bg-emerald-950/60 border-2 border-emerald-400/90 shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-500/20'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}>
                <div className="flex items-center justify-between">
                  <span className="text-rose-300 font-bold line-through text-xs">
                    2,400 DTP Seats
                  </span>
                  {isConduit1Active && (
                    <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>[ Capacity Routed ✓ ]</span>
                    </span>
                  )}
                </div>

                <span className="text-slate-400 text-xs font-black my-1.5 block">
                  ➔ Transfer ➔
                </span>

                <div>
                  <span className="text-emerald-400 font-black text-sm block">
                    Cloud DevOps &amp; K8s
                  </span>
                  <span className="text-[10px] text-indigo-200 mt-1 block font-medium">
                    Resolves OMR Shortage
                  </span>
                </div>
              </div>

              {/* Conduit 2: FastAPI & Microservices */}
              <div className={`rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 ${isConduit2Active
                  ? 'bg-emerald-950/60 border-2 border-emerald-400/90 shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-500/20'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}>
                <div className="flex items-center justify-between">
                  <span className="text-rose-300 font-bold line-through text-xs">
                    1,800 Legacy ASP Seats
                  </span>
                  {isConduit2Active && (
                    <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>[ Capacity Routed ✓ ]</span>
                    </span>
                  )}
                </div>

                <span className="text-slate-400 text-xs font-black my-1.5 block">
                  ➔ Transfer ➔
                </span>

                <div>
                  <span className="text-emerald-400 font-black text-sm block">
                    FastAPI &amp; Microservices
                  </span>
                  <span className="text-[10px] text-indigo-200 mt-1 block font-medium">
                    Resolves TIDEL Shortage
                  </span>
                </div>
              </div>

              {/* Conduit 3: 3D BIM & Generative CAD */}
              <div className={`rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 ${isConduit3Active
                  ? 'bg-emerald-950/60 border-2 border-emerald-400/90 shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-500/20'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}>
                <div className="flex items-center justify-between">
                  <span className="text-rose-300 font-bold line-through text-xs">
                    2,200 2D Draughting Seats
                  </span>
                  {isConduit3Active && (
                    <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>[ Capacity Routed ✓ ]</span>
                    </span>
                  )}
                </div>

                <span className="text-slate-400 text-xs font-black my-1.5 block">
                  ➔ Transfer ➔
                </span>

                <div>
                  <span className="text-emerald-400 font-black text-sm block">
                    3D BIM &amp; Generative CAD
                  </span>
                  <span className="text-[10px] text-indigo-200 mt-1 block font-medium">
                    Resolves Auto Corridor Shortage
                  </span>
                </div>
              </div>

              {/* Conduit 4: Applied GenAI & Agents */}
              <div className={`rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 ${isConduit4Active
                  ? 'bg-emerald-950/60 border-2 border-emerald-400/90 shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-500/20'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}>
                <div className="flex items-center justify-between">
                  <span className="text-rose-300 font-bold line-through text-xs">
                    2,020 Flash Seats
                  </span>
                  {isConduit4Active && (
                    <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>[ Capacity Routed ✓ ]</span>
                    </span>
                  )}
                </div>

                <span className="text-slate-400 text-xs font-black my-1.5 block">
                  ➔ Transfer ➔
                </span>

                <div>
                  <span className="text-emerald-400 font-black text-sm block">
                    Applied GenAI &amp; Agents
                  </span>
                  <span className="text-[10px] text-indigo-200 mt-1 block font-medium">
                    Resolves Urban Shortage
                  </span>
                </div>
              </div>

            </div>

            {/* Footer Strip */}
            <div className="pt-4 mt-5 border-t border-slate-800 text-xs text-indigo-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                ● {instructorsQueued} Instructors Enrolled in State Re-skilling Bootcamps (Funded via District Lab &amp; Budgets)
              </span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 4. BOTTOM SECTION: Statutory Gazette Promulgation Bar                     */}
          {/* ========================================================================= */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            {/* Left Side */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">Statutory Ref:</span>
                <span className="font-mono text-xs font-black text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                  GO-TN-2026-RATIONALIZE-09
                </span>
              </div>
              <span className="text-xs font-black text-slate-600 ml-3 flex items-center gap-1.5">
                <span className={isPromulgated ? "text-emerald-600" : "text-slate-400"}>●</span>
                <span>766 Districts &amp; 420 State ITIs / Polytechs Synced</span>
              </span>
            </div>

            {/* Right Side Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleOpenDocketModal}
                className="border border-slate-300 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>Export Rationalization Docket (PDF)</span>
              </button>

              <button
                type="button"
                onClick={handlePromulgateAll}
                disabled={isPromulgated}
                className={`font-black text-sm px-6 py-2.5 rounded-full shadow-md transition-all active:scale-95 flex items-center gap-2 ${isPromulgated
                    ? 'bg-emerald-600 text-white cursor-default'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
              >
                {isPromulgated ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>✓ Order Promulgated Statewide (All 766 Districts Synced)</span>
                  </>
                ) : (
                  <>
                    <span>Promulgate Statewide Seat Reallocation Order →</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

          {/* ========================================================================= */}
          {/* 5. OFFICIAL RATIONALIZATION DOCKET PREVIEW MODAL                           */}
          {/* ========================================================================= */}
          {isDocketModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
              <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn">
                {/* Modal Header */}
                <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center space-x-3">
                    <FileCheck2 className="w-6 h-6 text-emerald-400" />
                    <div>
                      <h3 className="text-base font-black tracking-tight">
                        Statutory Rationalization &amp; Seat Reallocation Docket
                      </h3>
                      <p className="text-xs text-slate-400 font-mono">
                        Ref: GO-TN-2026-RATIONALIZE-09 • Zero Seat Loss Protocol
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePrintDocket}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print / Save PDF</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsDocketModalOpen(false)}
                      className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-6 max-h-[70vh] overflow-y-auto space-y-5 bg-slate-50 font-sans text-xs text-slate-700">
                  <div className="bg-white p-5 rounded-xl border border-slate-200 text-center shadow-xs">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                      Government of Tamil Nadu • Directorate of Technical Education
                    </span>
                    <h4 className="text-base font-black text-slate-900 uppercase">
                      Statutory Course Pruning &amp; Seat Reallocation Order
                    </h4>
                    <p className="text-xs font-bold text-blue-700 mt-1">
                      Order Ref: GO-TN-2026-RATIONALIZE-09 • 1:1 Zero Seat Loss Protection
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold uppercase block">Trapped Student Seats</span>
                      <strong className="text-base font-black text-rose-600">{trappedSeats.toLocaleString()}</strong>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold uppercase block">Wasted Budget Pruned</span>
                      <strong className="text-base font-black text-amber-600">₹{wastedBudget.toFixed(1)} Cr</strong>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold uppercase block">Net Capacity Preserved</span>
                      <strong className="text-base font-black text-emerald-600">{seatsPreserved.toLocaleString()} Seats</strong>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                    <h5 className="font-black text-slate-900 text-xs uppercase border-b pb-2">
                      1:1 Redeployment Pathways
                    </h5>
                    {courses.map((c, i) => (
                      <div key={i} className="p-2.5 bg-slate-50 rounded-lg flex items-center justify-between text-[11px]">
                        <span className="line-through text-rose-700 font-semibold w-5/12">
                          {c.code}: {c.name} ({c.seats.toLocaleString()} Seats)
                        </span>
                        <span className="text-slate-400 font-mono text-xs">➔</span>
                        <span className="text-emerald-800 font-bold w-5/12 text-right">
                          {c.reallocatedTo} ({c.districtShortage})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="bg-slate-100 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-slate-600 font-medium">
                    Official Gazette Ref: <strong>GO-TN-2026-RATIONALIZE-09</strong>
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handlePrintDocket}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 active:scale-95"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print / Download Docket PDF</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsDocketModalOpen(false)}
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
