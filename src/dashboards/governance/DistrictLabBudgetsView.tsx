import React, { useState, useEffect } from 'react';
import { 
  Landmark,
  BarChart3,
  Wrench, 
  Check, 
  CheckCircle2, 
  Printer, 
  X, 
  FileCheck2, 
  Cpu, 
  Server, 
  Users, 
  Sparkles, 
  ArrowRight, 
  ArrowUp,
  ShieldCheck, 
  Layers, 
  Building2, 
  Coins, 
  HardDrive, 
  Cloud, 
  Radio
} from 'lucide-react';

type TabType = 'audit' | 'trainers' | 'budget';
type DeploymentMode = 'local' | 'cloud';

interface ChartHoverTooltip {
  index: number;
  district: string;
  code: string;
  fullTitle: string;
  workstationType: string;
  category: string;
  metric: 'active' | 'target' | 'cluster';
  active: number;
  target: number;
  deficit: number;
}

export const DistrictLabBudgetsView: React.FC = () => {
  // Sub-Heading Active Tab State
  const [activeSection, setActiveSection] = useState<'treasury' | 'parity'>('treasury');

  // Persistent Capital Ledger State (Animated from zero on mount)
  const [totalHarvested, setTotalHarvested] = useState<number>(0);
  const [hardwareBudget, setHardwareBudget] = useState<number>(0);
  const [trainerFund, setTrainerFund] = useState<number>(0);
  const [reserveFund, setReserveFund] = useState<number>(0);
  const [fundedTrainers, setFundedTrainers] = useState<number>(0);
  const [mountProgress, setMountProgress] = useState<number>(0);

  // Active Tab State
  const [activeTab, setActiveTab] = useState<TabType>('audit');

  // Tab 1 Interactive States
  const [deploymentMode, setDeploymentMode] = useState<DeploymentMode>('local');
  const [chennaiProvisioned, setChennaiProvisioned] = useState<boolean>(false);
  const [maduraiDispatched, setMaduraiDispatched] = useState<boolean>(false);
  const [auditBarsAnimated, setAuditBarsAnimated] = useState<boolean>(false);
  const [chartTooltip, setChartTooltip] = useState<ChartHoverTooltip | null>(null);

  // Tab 2 Interactive States
  const [isQ4Enrolled, setIsQ4Enrolled] = useState<boolean>(false);
  const [stage1Count, setStage1Count] = useState<number>(0);
  const [stage2Count, setStage2Count] = useState<number>(0);
  const [stage3Count, setStage3Count] = useState<number>(0);

  // Tab 3 Interactive States
  const [isGrantPromulgated, setIsGrantPromulgated] = useState<boolean>(false);
  const [isLedgerModalOpen, setIsLedgerModalOpen] = useState<boolean>(false);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Mount Animation Logic
  useEffect(() => {
    const duration = 1200;
    const startTime = performance.now();

    const animateMount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out

      setMountProgress(eased);
      setTotalHarvested(Number((eased * 14.2).toFixed(1)));
      setHardwareBudget(Number((eased * 9.8).toFixed(1)));
      setTrainerFund(Number((eased * 2.6).toFixed(1)));
      setReserveFund(Number((eased * 1.8).toFixed(1)));
      setFundedTrainers(Math.round(eased * 380));

      // Trainer funnel initial stages
      setStage1Count(Math.round(eased * 142));
      setStage2Count(Math.round(eased * 180));
      setStage3Count(Math.round(eased * 58));

      if (progress < 1) {
        requestAnimationFrame(animateMount);
      }
    };

    requestAnimationFrame(animateMount);
  }, []);

  // Column Chart Animation (height: 0 -> target percentage via transition-all duration-1000 ease-out on mount and tab switch)
  useEffect(() => {
    if (activeSection === 'parity' || activeTab === 'audit') {
      setAuditBarsAnimated(false);
      const timer = setTimeout(() => {
        setAuditBarsAnimated(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [activeSection, activeTab]);

  // Show toast notification helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 4500);
  };

  // Tab 1 Handlers
  const handleToggleDeployment = (mode: DeploymentMode) => {
    setDeploymentMode(mode);
    triggerToast(
      mode === 'cloud' 
        ? "Deployment Switch: Active Cloud Sandbox Clusters prioritised for regional ITIs."
        : "Deployment Switch: Dedicated On-Premises GPU Workstations prioritised."
    );
  };

  const handleProvisionChennai = () => {
    if (chennaiProvisioned) return;
    setChennaiProvisioned(true);
    triggerToast("Cloud Lab Enabled: 45 AWS GPU Sandbox instances active for Chennai OMR.");
  };

  const handleDispatchMadurai = () => {
    if (maduraiDispatched) return;
    setMaduraiDispatched(true);
    triggerToast("Hardware Upgrade Enacted: 30 Generative 3D CAD/BIM units dispatched to Madurai ATC.");
  };

  // Tab 2 Handler: Enroll Remaining 58 Instructors into Q4 FDP Sprint
  const handleEnrollRemainingTrainers = () => {
    if (isQ4Enrolled) return;
    setIsQ4Enrolled(true);

    // Smooth transition: 58 scheduled move into active FDP bootcamps / certified
    const startStage3 = stage3Count;
    const startStage2 = stage2Count;
    const duration = 500;
    const startTime = performance.now();

    const animateTransition = (now: number) => {
      const elapsed = now - startTime;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);

      setStage3Count(Math.round(startStage3 * (1 - eased)));
      setStage2Count(Math.round(startStage2 + (58 * eased)));

      if (p < 1) {
        requestAnimationFrame(animateTransition);
      } else {
        setStage3Count(0);
        setStage2Count(238);
      }
    };

    requestAnimationFrame(animateTransition);
    triggerToast("Statewide FDP Mandate: All 58 remaining instructors enrolled in Q4 Sprint. 100% Roster Active.");
  };

  // Tab 3 Handler: Statutory Promulgation
  const handlePromulgateGrant = () => {
    if (isGrantPromulgated) return;
    setIsGrantPromulgated(true);
    triggerToast("Order GO-TN-2026-LABGRANT-04 Promulgated Statewide. ₹14.2 Cr Capital Grant Disbursed.");
  };

  // Generate Printable HTML for Fiscal Grant Ledger
  const generateFiscalLedgerHtml = () => {
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const timeStr = new Date().toLocaleTimeString();

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fiscal Grant Ledger - GO-TN-2026-LABGRANT-04</title>
  <style>
    @page { size: A4 portrait; margin: 15mm; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
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
    .content-padding { padding: 32px; }
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
      text-transform: uppercase;
      color: #64748b;
      margin-bottom: 4px;
    }
    .metric-val {
      font-size: 18px;
      font-weight: 900;
      color: #0f172a;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
      font-size: 12px;
    }
    th {
      background: #f1f5f9;
      text-align: left;
      padding: 10px 12px;
      font-size: 10px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #475569;
      border-bottom: 2px solid #cbd5e1;
    }
    td {
      padding: 12px;
      border-bottom: 1px solid #e2e8f0;
      vertical-align: middle;
    }
    .badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 10px;
      font-weight: 800;
    }
    .badge-emerald { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }
    .badge-blue { background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; }
    .badge-amber { background: #fef3c7; color: #92400e; border: 1px solid #fde68a; }
    .sign-box {
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      border-top: 1px dashed #cbd5e1;
      padding-top: 20px;
    }
    .sign-col { text-align: center; width: 45%; }
    .sign-line {
      margin-top: 35px;
      border-bottom: 1px solid #0f172a;
      padding-bottom: 4px;
      font-weight: 800;
      font-size: 11px;
    }
    .sign-role { font-size: 10px; color: #64748b; margin-top: 4px; }
    @media print {
      body { padding: 0; background: #ffffff; }
      .print-sheet { border: none; box-shadow: none; max-width: 100%; }
      .print-toolbar { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="print-sheet">
    <div class="print-toolbar">
      <div>
        <span style="font-weight: 800; font-size: 12px; letter-spacing: 0.05em;">TAMIL NADU TECHNICAL EDUCATION LEDGER</span>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="print-btn" onclick="window.print()">Print / Save PDF</button>
        <button class="close-btn" onclick="window.close()">Close</button>
      </div>
    </div>
    
    <div class="content-padding">
      <div class="header-card">
        <div class="subheader">DIRECTORATE OF TECHNICAL EDUCATION • GOVERNMENT OF TAMIL NADU</div>
        <h1 class="main-title">Statutory Physical Enablement &amp; Fiscal Grant Ledger</h1>
        <div class="order-pill">ORDER REF: GO-TN-2026-LABGRANT-04</div>
        <div class="meta-row">
          <span>Date: ${dateStr}</span>
          <span>•</span>
          <span>Time: ${timeStr}</span>
          <span>•</span>
          <span>Source: GO-TN-2026-RATIONALIZE-09 (₹14.2 Cr Reinvested)</span>
        </div>
      </div>

      <div class="section-box">
        <div class="section-header">Executive Capital Ledger Breakdown (100% Harvested Reallocation)</div>
        <div class="metric-grid">
          <div class="metric-card">
            <div class="metric-label">Total Capital Reinvested</div>
            <div class="metric-val">₹14.2 Cr</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Compute &amp; Lab Hardware</div>
            <div class="metric-val" style="color: #0284c7;">₹9.8 Cr</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Faculty FDP Enablement</div>
            <div class="metric-val" style="color: #d97706;">₹2.6 Cr</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Rural Contingency Reserve</div>
            <div class="metric-val" style="color: #16a34a;">₹1.8 Cr</div>
          </div>
        </div>
      </div>

      <div class="section-box">
        <div class="section-header">Targeted District Lab Disbursements (18 High-Priority Centres)</div>
        <table>
          <thead>
            <tr>
              <th>Target District &amp; Institution</th>
              <th>Grant Focus &amp; Modernization Track</th>
              <th>Allocated Grant</th>
              <th>Audit Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong style="color: #0f172a;">Chennai Urban Tech Corridor</strong><br>
                <span style="font-size: 11px; color: #64748b;">Chennai OMR State Polytechnic</span>
              </td>
              <td>High-Density GPU Cloud Sandbox &amp; Microservices Clusters</td>
              <td><strong>₹4.20 Cr</strong></td>
              <td><span class="badge badge-emerald">Disbursed (AWS / K8s)</span></td>
            </tr>
            <tr>
              <td>
                <strong style="color: #0f172a;">Coimbatore Engineering &amp; Auto Belt</strong><br>
                <span style="font-size: 11px; color: #64748b;">Coimbatore TIDEL ITI</span>
              </td>
              <td>Robotics &amp; Embedded Edge AI Industrial Workstations</td>
              <td><strong>₹3.10 Cr</strong></td>
              <td><span class="badge badge-emerald">Disbursed (Edge AI)</span></td>
            </tr>
            <tr>
              <td>
                <strong style="color: #0f172a;">Madurai &amp; Southern Regional Hub</strong><br>
                <span style="font-size: 11px; color: #64748b;">Madurai Regional Advanced Training Centre</span>
              </td>
              <td>Digital CAD / Generative Architecture 3D BIM Lab</td>
              <td><strong>₹2.50 Cr</strong></td>
              <td><span class="badge badge-blue">Disbursed (3D BIM)</span></td>
            </tr>
            <tr>
              <td>
                <strong style="color: #0f172a;">Tier-2 / Tier-3 Rural ITI Upgrades</strong><br>
                <span style="font-size: 11px; color: #64748b;">Dharmapuri, Ramanathapuram &amp; Cuddalore</span>
              </td>
              <td>Satellite Cloud Terminals, Gigabit Fiber &amp; Thin-Clients</td>
              <td><strong>₹2.60 Cr</strong></td>
              <td><span class="badge badge-amber">Active Rollout</span></td>
            </tr>
            <tr style="background: #f8fafc;">
              <td>
                <strong style="color: #0f172a;">Unallocated Contingency Buffer</strong><br>
                <span style="font-size: 11px; color: #64748b;">State Skill Development Mission</span>
              </td>
              <td>Hardware Spares, Cloud Credit Spikes &amp; Emergency Maintenance</td>
              <td><strong>₹1.80 Cr</strong></td>
              <td><span class="badge badge-emerald">Reserved</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="section-box">
        <div class="section-header">Faculty Re-skilling &amp; Capacity Ledger (380 Instructors)</div>
        <p style="font-size: 11px; color: #475569; margin-bottom: 10px;">
          100% of teaching faculty released from sunsetted trades (DTP, ASP 3.0, Manual Draughting, Flash) have been absorbed into modern technical certification tracks sponsored via the Faculty Enablement Program (FDP).
        </p>
        <div class="metric-grid">
          <div class="metric-card">
            <div class="metric-label">Stage 1: Industry Certified</div>
            <div class="metric-val" style="color: #16a34a;">142</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Stage 2: Active FDP Bootcamps</div>
            <div class="metric-val" style="color: #d97706;">180</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Stage 3: Q4 Sprint Rollout</div>
            <div class="metric-val" style="color: #2563eb;">58</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Total Faculty Protected</div>
            <div class="metric-val" style="color: #0f172a;">380 (100%)</div>
          </div>
        </div>
      </div>

      <div class="sign-box">
        <div class="sign-col">
          <div class="sign-line">Director of Technical Education</div>
          <div class="sign-role">Government of Tamil Nadu • DOTE Chennai</div>
        </div>
        <div class="sign-col">
          <div class="sign-line">Principal Secretary, Higher Education &amp; Labour</div>
          <div class="sign-role">Fort St. George • Secretariat, Chennai</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
  };

  const handlePrintFiscalLedger = () => {
    const htmlContent = generateFiscalLedgerHtml();
    
    // Direct print via invisible iframe
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
      doc.write(htmlContent);
      doc.close();

      setTimeout(() => {
        try {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
        } catch (e) {
          console.error("Print error:", e);
        } finally {
          setTimeout(() => {
            document.body.removeChild(iframe);
          }, 1000);
        }
      }, 500);
    }

    triggerToast("✓ Fiscal Grant Ledger prepared for printing / PDF export.");
  };

  const handleOpenLedgerModal = () => {
    setIsLedgerModalOpen(true);
    handlePrintFiscalLedger();
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
          District Lab &amp; Budgets
        </h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Capital equipment allocation, modern compute infrastructure, and statewide instructor re-skilling ledger
        </p>
      </div>

      {/* Persistent Green Banner when Order is Promulgated */}
      {isGrantPromulgated && (
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border-2 border-emerald-500/80 rounded-2xl p-4 text-white shadow-xl flex flex-wrap items-center justify-between gap-4 animate-fadeIn">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-300 shadow-inner">
              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xs font-black text-emerald-400 uppercase tracking-widest block">
                Statewide Laboratory Grant Directive Promulgated • ₹14.2 Cr Capital Disbursed
              </span>
              <p className="text-sm font-bold text-white mt-0.5">
                Order GO-TN-2026-LABGRANT-04 Enacted Across All 18 Target District Labs.
              </p>
              <span className="text-[11px] font-mono text-emerald-300/80">
                100% Sunk Drag Capital Reinvested • 380 Faculty Sponsored • Zero Deficit Protocol
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-3.5 py-1.5 rounded-full">
              🟢 18 / 18 Labs Funded
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
            onClick={() => setActiveSection('treasury')}
            className={`py-3.5 px-1 border-b-2 text-sm transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeSection === 'treasury'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>Capital Treasury &amp; Readiness Audit</span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                activeSection === 'treasury'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              ₹14.2 Cr Allocated
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('parity')}
            className={`py-3.5 px-1 border-b-2 text-sm transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeSection === 'parity'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Lab Parity Chart &amp; Action Roster</span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                activeSection === 'parity'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              5 District Nodes
            </span>
          </button>
        </nav>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: Capital Treasury & Readiness Audit                             */}
      {/* ========================================================================= */}
      {activeSection === 'treasury' && (
        <div className="animate-in fade-in duration-200 space-y-6">
          {/* 0. PERSISTENT TOP HEADER: Capital Inflow Treasury Bar                     */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 shadow-md mb-6 border border-indigo-900/50">
        
        {/* Top Metadata Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-indigo-900/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider text-indigo-300">
              ● STATE SKILL TREASURY • CAPITAL HARVESTED FROM RATIONALIZED TRADES
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400 font-bold">
            Source Order: GO-TN-2026-RATIONALIZE-09 • Audit: 100% Reinvested
          </span>
        </div>

        {/* 4 Telemetry Inflow Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mt-4">
          
          {/* Card 1: Total Harvested Capital */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:bg-white/[0.08] transition-colors">
            <span className="text-xs font-black text-slate-300 uppercase tracking-wider">
              Total Re-routed Capital
            </span>
            <div className="my-2">
              <span className="text-2xl lg:text-3xl font-black text-white block tracking-tight">
                ₹{totalHarvested.toFixed(1)} Cr
              </span>
              <span className="text-[10px] font-bold text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded-full inline-block mt-1 border border-indigo-500/30">
                100% Reallocated
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-400">
              Saved from Deprecated Labs
            </span>
          </div>

          {/* Card 2: Modern Compute & Labs */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:bg-white/[0.08] transition-colors">
            <span className="text-xs font-black text-cyan-300 uppercase tracking-wider">
              Modern Compute &amp; Labs
            </span>
            <div className="my-2">
              <span className="text-2xl lg:text-3xl font-black text-cyan-400 block tracking-tight">
                ₹{hardwareBudget.toFixed(1)} Cr
              </span>
              <span className="text-[10px] font-bold text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded-full inline-block mt-1 border border-cyan-500/30">
                GPU &amp; Cloud Sandbox
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-400">
              Allocated to 18 District Labs
            </span>
          </div>

          {/* Card 3: Trainer Enablement Fund */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:bg-white/[0.08] transition-colors">
            <span className="text-xs font-black text-amber-300 uppercase tracking-wider">
              Trainer Enablement Fund
            </span>
            <div className="my-2">
              <span className="text-2xl lg:text-3xl font-black text-amber-400 block tracking-tight">
                ₹{trainerFund.toFixed(1)} Cr
              </span>
              <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full inline-block mt-1 border border-amber-500/30">
                {isQ4Enrolled ? "380 / 380 Active" : "322 / 380 Enrolled"}
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-400">
              {fundedTrainers} Instructors Sponsored
            </span>
          </div>

          {/* Card 4: Rural Contingency Reserve */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:bg-white/[0.08] transition-colors">
            <span className="text-xs font-black text-emerald-300 uppercase tracking-wider">
              Rural Contingency Reserve
            </span>
            <div className="my-2">
              <span className="text-2xl lg:text-3xl font-black text-emerald-400 block tracking-tight">
                ₹{reserveFund.toFixed(1)} Cr
              </span>
              <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full inline-block mt-1 border border-emerald-500/30">
                Satellite Terminals
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-400">
              Tier-2/3 Lab Infrastructure
            </span>
          </div>

        </div>
      </div>

          {/* ========================================================================= */}
          {/* DISTRICT LABORATORY MACHINE READINESS & COMPUTE AUDIT BLOCK               */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          
          {/* Header & Deployment Toggle */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-black text-slate-900">
                District Laboratory Machine Readiness &amp; Compute Audit
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Audits physical workshop compute against the newly approved AI &amp; Cloud curriculum requirements.
              </p>
            </div>

            {/* Right Toggle: Pill switch */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 self-start md:self-auto">
              <button
                type="button"
                onClick={() => handleToggleDeployment('local')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  deploymentMode === 'local'
                    ? 'bg-white text-indigo-950 font-black shadow-2xs border border-slate-200'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <HardDrive className="w-3.5 h-3.5" />
                <span>Local Workstations</span>
              </button>

              <button
                type="button"
                onClick={() => handleToggleDeployment('cloud')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  deploymentMode === 'cloud'
                    ? 'bg-white text-indigo-950 font-black shadow-2xs border border-slate-200'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Cloud className="w-3.5 h-3.5" />
                <span>Cloud Sandbox Clusters</span>
              </button>
            </div>
          </div>

          {/* Cluster Readiness Barometer (Top Strip) */}
          <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-4 my-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
                <span className="text-xs font-black text-slate-900">
                  Cluster Parity Index:
                </span>
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                  {Math.round(58 * mountProgress)}% Statewide Compute Parity
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  18 Modernized Labs
                </span>
                <span>•</span>
                <span className="bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-full border border-rose-200">
                  42 Labs Pending GPU Upgrades
                </span>
              </div>
            </div>

            {/* Visual Barometer */}
            <div className="w-full h-3.5 bg-slate-200 rounded-full overflow-hidden flex shadow-inner">
              <div 
                style={{ width: `${Math.round(58 * mountProgress)}%` }} 
                className="bg-emerald-500 transition-all duration-700 ease-out" 
              />
              <div 
                style={{ width: `${Math.round(42 * mountProgress)}%` }} 
                className="bg-rose-400 transition-all duration-700 ease-out" 
              />
            </div>
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 mt-1.5 px-0.5">
              <span>● Compliant AI Labs (58%)</span>
              <span>Pending Compute Re-allocation (42%) ●</span>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: Lab Parity Chart & Action Roster                               */}
      {/* ========================================================================= */}
      {activeSection === 'parity' && (
        <div className="animate-in fade-in duration-200 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
          {/* ================================================================= */}
          {/* UNIFIED VERTICAL BAR CHART (COLUMN CHART)                         */}
          {/* ================================================================= */}
          <div className="bg-slate-50/70 border border-slate-200/90 rounded-3xl p-5 sm:p-6 mb-6 shadow-xs relative">
            {/* Chart Header & Legend */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span>Statewide Laboratory Machine Parity • Analytical Column Chart</span>
                </h3>
                <p className="text-xs font-medium text-slate-500 mt-0.5">
                  Cartesian comparative analysis comparing operational active nodes against certified curriculum targets
                </p>
              </div>

              {/* Top-Right Legend */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs self-start sm:self-auto">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-emerald-500 shadow-2xs inline-block" />
                  <span>Operational Active Nodes</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-indigo-600 shadow-2xs inline-block" />
                  <span>Target Demand / Capacity</span>
                </span>
              </div>
            </div>

            {/* Cartesian Coordinate Plane */}
            <div className="pt-8 pb-12 px-2 sm:px-4">
              <div className="flex h-64 sm:h-72 w-full relative">
                
                {/* Vertical Y-Axis (Left) */}
                <div className="flex items-stretch pr-2 select-none relative">
                  {/* Axis Title */}
                  <div className="hidden sm:flex items-center justify-center mr-1.5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 [writing-mode:vertical-lr] rotate-180">
                      Number of Workstations / Nodes
                    </span>
                  </div>

                  {/* Tick Labels */}
                  <div className="flex flex-col justify-between items-end pr-2.5 text-[11px] font-mono font-bold text-slate-500">
                    <div className="flex items-center gap-1 -mt-2">
                      <ArrowUp className="w-3.5 h-3.5 text-slate-500" />
                      <span>60 Nodes</span>
                    </div>
                    <span>45</span>
                    <span>30</span>
                    <span>15</span>
                    <span className="-mb-2">0</span>
                  </div>

                  {/* Vertical Axis Line with Top Arrow */}
                  <div className="w-0.5 bg-slate-400 h-full relative">
                    <ArrowUp className="w-3.5 h-3.5 text-slate-500 absolute -top-3.5 -left-[6px]" />
                  </div>
                </div>

                {/* Main Graph Area */}
                <div 
                  className="flex-1 relative h-full"
                  onMouseLeave={() => setChartTooltip(null)}
                >
                  {/* Luminous Column Hover Highlight Beam */}
                  {chartTooltip && (
                    <div 
                      className="absolute top-0 bottom-0 pointer-events-none bg-indigo-500/[0.04] border-x border-indigo-500/15 transition-all duration-200 z-0 rounded-xl"
                      style={{
                        left: `${chartTooltip.index * 20}%`,
                        width: '20%'
                      }}
                    />
                  )}

                  {/* Background Horizontal Dashed Gridlines across Chart Plane */}
                  <div className="absolute inset-0 pointer-events-none flex flex-col justify-between">
                    <div className="border-b border-dashed border-slate-200 w-full" />
                    <div className="border-b border-dashed border-slate-200 w-full" />
                    <div className="border-b border-dashed border-slate-200 w-full" />
                    <div className="border-b border-dashed border-slate-200 w-full" />
                    {/* Baseline Axis Line with Rightward Arrow */}
                    <div className="border-b-2 border-slate-400 w-full relative">
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 absolute -right-3 -top-[7px]" />
                    </div>
                  </div>

                  {/* Dual Grouped Vertical Columns Grid */}
                  <div className="grid grid-cols-5 h-full relative z-10 px-2 sm:px-4">
                    {(() => {
                      const districtLabData = [
                        {
                          id: 'chennai',
                          code: 'CHN-DIST-01',
                          name: 'Chennai OMR',
                          category: 'Polytechnic',
                          fullTitle: 'Chennai OMR State Polytechnic',
                          workstationType: 'High-Compute GPU Workstations',
                          active: chennaiProvisioned ? 60 : 15,
                          target: 60,
                        },
                        {
                          id: 'coimbatore',
                          code: 'CBE-DIST-04',
                          name: 'Coimbatore TIDEL',
                          category: 'ITI',
                          fullTitle: 'Coimbatore TIDEL ITI',
                          workstationType: 'Linux Microservices Terminals',
                          active: 38,
                          target: 40,
                        },
                        {
                          id: 'madurai',
                          code: 'MDU-DIST-09',
                          name: 'Madurai Reg.',
                          category: 'Hub',
                          fullTitle: 'Madurai Regional Training Centre',
                          workstationType: '3D CAD/BIM Workstations',
                          active: maduraiDispatched ? 30 : 0,
                          target: 30,
                        },
                        {
                          id: 'salem',
                          code: 'SLM-DIST-12',
                          name: 'Salem Tech',
                          category: 'Advanced Lab',
                          fullTitle: 'Salem Tech Advanced Lab',
                          workstationType: 'Industrial IoT Edge Nodes',
                          active: 20,
                          target: 25,
                        },
                        {
                          id: 'tiruchi',
                          code: 'TRY-DIST-07',
                          name: 'Tiruchirappalli',
                          category: 'Polytechnic',
                          fullTitle: 'Tiruchirappalli State Polytechnic',
                          workstationType: 'Cloud Dev & Microservices Terminals',
                          active: 18,
                          target: 20,
                        },
                      ];

                      return districtLabData.map((d, index) => {
                        const activeHeight = auditBarsAnimated ? Math.round((d.active / 60) * 100) : 0;
                        const targetHeight = auditBarsAnimated ? Math.round((d.target / 60) * 100) : 0;
                        const deficit = Math.max(0, d.target - d.active);
                        const isColumnHovered = chartTooltip?.index === index;
                        const isActiveHovered = isColumnHovered && chartTooltip?.metric === 'active';
                        const isTargetHovered = isColumnHovered && chartTooltip?.metric === 'target';

                        return (
                          <div 
                            key={d.id}
                            onMouseEnter={() => setChartTooltip(prev => (prev?.index === index ? prev : {
                              index,
                              district: d.name,
                              code: d.code,
                              fullTitle: d.fullTitle,
                              workstationType: d.workstationType,
                              category: d.category,
                              metric: 'cluster',
                              active: d.active,
                              target: d.target,
                              deficit,
                            }))}
                            className="flex flex-col items-center h-full relative group cursor-pointer"
                          >
                            {/* Columns Container rising from baseline */}
                            <div className="flex items-end justify-center gap-1 sm:gap-2 w-full h-full pb-0.5">
                              {/* Column A (Operational Active) */}
                              <div 
                                style={{ height: `${activeHeight}%` }}
                                onMouseEnter={(e) => {
                                  e.stopPropagation();
                                  setChartTooltip({
                                    index,
                                    district: d.name,
                                    code: d.code,
                                    fullTitle: d.fullTitle,
                                    workstationType: d.workstationType,
                                    category: d.category,
                                    metric: 'active',
                                    active: d.active,
                                    target: d.target,
                                    deficit,
                                  });
                                }}
                                className={`w-4 sm:w-7 md:w-9 rounded-t-md transition-all duration-1000 ease-out relative flex justify-center ${
                                  d.active > 0
                                    ? `bg-emerald-500 hover:bg-emerald-400 ${
                                        isActiveHovered ? 'ring-2 ring-emerald-300 brightness-110 shadow-lg shadow-emerald-500/30' : 'shadow-sm shadow-emerald-500/20'
                                      }`
                                    : 'bg-rose-300/60 border border-dashed border-rose-400 min-h-[4px]'
                                }`}
                              >
                                <span className={`absolute -top-6 text-[10px] sm:text-xs font-mono font-black px-1 py-0.5 rounded border shadow-2xs transition-transform ${
                                  isActiveHovered ? 'scale-110' : ''
                                } ${
                                  d.active > 0
                                    ? 'text-emerald-800 bg-emerald-100/90 border-emerald-300'
                                    : 'text-rose-800 bg-rose-100/90 border-rose-300'
                                }`}>
                                  {d.active}
                                </span>
                              </div>

                              {/* Column B (Target Capacity) */}
                              <div 
                                style={{ height: `${targetHeight}%` }}
                                onMouseEnter={(e) => {
                                  e.stopPropagation();
                                  setChartTooltip({
                                    index,
                                    district: d.name,
                                    code: d.code,
                                    fullTitle: d.fullTitle,
                                    workstationType: d.workstationType,
                                    category: d.category,
                                    metric: 'target',
                                    active: d.active,
                                    target: d.target,
                                    deficit,
                                  });
                                }}
                                className={`w-4 sm:w-7 md:w-9 bg-indigo-600/80 hover:bg-indigo-600 rounded-t-md border border-indigo-700/30 transition-all duration-1000 ease-out relative flex justify-center ${
                                  isTargetHovered ? 'ring-2 ring-indigo-300 brightness-110 shadow-lg shadow-indigo-600/30' : 'shadow-sm shadow-indigo-600/15'
                                }`}
                              >
                                <span className={`absolute -top-6 text-[10px] sm:text-xs font-mono font-black text-indigo-800 bg-indigo-100/90 px-1 py-0.5 rounded border border-indigo-300 shadow-2xs transition-transform ${
                                  isTargetHovered ? 'scale-110' : ''
                                }`}>
                                  {d.target}
                                </span>
                              </div>
                            </div>

                            {/* X-Axis Category Label */}
                            <div className="absolute top-full mt-2.5 text-center whitespace-nowrap select-none">
                              <div className={`text-[11px] sm:text-xs font-black transition-colors ${
                                isColumnHovered ? 'text-indigo-600' : 'text-slate-900'
                              }`}>
                                {d.name}
                              </div>
                              <div className="text-[9px] sm:text-[10px] font-bold text-slate-500">
                                ({d.category})
                              </div>
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>

                  {/* Sleek Floating Dark-Theme Executive Tooltip */}
                  {chartTooltip && (
                    <div 
                      className="absolute z-30 pointer-events-none transition-all duration-150 ease-out"
                      style={{
                        left: `${(chartTooltip.index * 20) + 10}%`,
                        top: '8px',
                        transform: chartTooltip.index === 0 
                          ? 'translateX(2%)' 
                          : chartTooltip.index === 4 
                            ? 'translateX(-98%)' 
                            : 'translateX(-50%)'
                      }}
                    >
                      <div className="bg-slate-900/95 backdrop-blur-md text-white border border-slate-700/80 rounded-2xl p-3.5 shadow-2xl shadow-slate-950/70 w-64 sm:w-72 text-left animate-in fade-in zoom-in-95 duration-150 ring-1 ring-white/10">
                        
                        {/* Header: Code & Category */}
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-[10px] font-mono font-black text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded border border-indigo-500/30">
                            {chartTooltip.code}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            {chartTooltip.category}
                          </span>
                        </div>

                        {/* District Title & Workstation Type */}
                        <h5 className="text-xs font-black text-white leading-tight">
                          {chartTooltip.fullTitle}
                        </h5>
                        <p className="text-[11px] font-medium text-slate-400 mt-0.5 mb-2.5 line-clamp-1">
                          {chartTooltip.workstationType}
                        </p>

                        {/* Hovered Metric Highlight Pill */}
                        <div className={`flex items-center justify-between text-xs font-bold px-2.5 py-1.5 rounded-lg mb-2.5 border ${
                          chartTooltip.metric === 'active'
                            ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                            : chartTooltip.metric === 'target'
                              ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300'
                              : 'bg-slate-800/80 border-slate-700 text-slate-300'
                        }`}>
                          <span className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${
                              chartTooltip.metric === 'active' 
                                ? 'bg-emerald-400 animate-pulse' 
                                : chartTooltip.metric === 'target'
                                  ? 'bg-indigo-400 animate-pulse'
                                  : 'bg-slate-400'
                            }`} />
                            <span>
                              {chartTooltip.metric === 'active' 
                                ? 'Operational Active Nodes' 
                                : chartTooltip.metric === 'target'
                                  ? 'Certified Target Demand'
                                  : 'District Overview'}
                            </span>
                          </span>
                          <span className="font-mono font-black text-white">
                            {chartTooltip.metric === 'active'
                              ? `${chartTooltip.active} Nodes`
                              : chartTooltip.metric === 'target'
                                ? `${chartTooltip.target} Nodes`
                                : `${chartTooltip.active} / ${chartTooltip.target}`}
                          </span>
                        </div>

                        {/* Telemetry Breakdown Details */}
                        <div className="space-y-1.5 text-[11px] font-medium border-t border-slate-800/90 pt-2">
                          <div className="flex justify-between items-center text-slate-300">
                            <span className="text-slate-400">Operational Active:</span>
                            <span className="font-mono font-bold text-emerald-400">{chartTooltip.active} Nodes</span>
                          </div>
                          <div className="flex justify-between items-center text-slate-300">
                            <span className="text-slate-400">Certified Demand:</span>
                            <span className="font-mono font-bold text-indigo-300">{chartTooltip.target} Nodes</span>
                          </div>
                          <div className="flex justify-between items-center text-slate-300">
                            <span className="text-slate-400">Net Infrastructure Deficit:</span>
                            <span className={`font-mono font-bold px-1.5 py-0.5 rounded text-[10px] ${
                              chartTooltip.deficit === 0
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            }`}>
                              {chartTooltip.deficit === 0 
                                ? '✓ Parity Reached (100%)' 
                                : `-${chartTooltip.deficit} Nodes (${Math.round((chartTooltip.deficit / chartTooltip.target) * 100)}% Deficit)`}
                            </span>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* COMPACT DISTRICT ACTION ROSTER (BELOW THE CHART)                  */}
          {/* ================================================================= */}
          <div>
            <div className="flex items-center justify-between pb-3">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Priority District Lab Action Roster
              </h4>
              <span className="text-xs font-bold text-slate-500">
                Direct statutory execution panel
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Card 1: Chennai OMR State Polytechnic */}
              <div className={`p-4 rounded-2xl border transition-all ${
                chennaiProvisioned
                  ? 'bg-emerald-50/30 border-emerald-200'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              } shadow-xs flex flex-col justify-between`}>
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
                      CHN-DIST-01
                    </span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                      chennaiProvisioned
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}>
                      {chennaiProvisioned ? "Parity Reached (100%)" : "Critical Deficit (75%)"}
                    </span>
                  </div>
                  
                  <h5 className="text-sm font-black text-slate-900">
                    Chennai OMR State Polytechnic
                  </h5>
                  <p className="text-xs text-slate-600 mt-1 font-medium">
                    {chennaiProvisioned
                      ? "High-Compute GPU Workstations • 60 / 60 Active (0 Missing Deficit)"
                      : "High-Compute GPU Workstations • 15 / 60 Active (45 Missing Deficit)"}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-end">
                  {chennaiProvisioned ? (
                    <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs flex items-center gap-1.5 cursor-default">
                      <span>✓ Lab Ready</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleProvisionChennai}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all bg-blue-600 hover:bg-blue-700 text-white shadow-xs active:scale-95 flex items-center gap-1.5"
                    >
                      <span>⚡ Enable Cloud Lab</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Card 2: Coimbatore TIDEL ITI */}
              <div className="p-4 rounded-2xl border transition-all bg-emerald-50/30 border-emerald-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
                      CBE-DIST-04
                    </span>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-300">
                      Parity Reached (95%)
                    </span>
                  </div>
                  
                  <h5 className="text-sm font-black text-slate-900">
                    Coimbatore TIDEL ITI
                  </h5>
                  <p className="text-xs text-slate-600 mt-1 font-medium">
                    Linux Microservices Terminals • 38 / 40 Active (2 Missing)
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-end">
                  <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs flex items-center gap-1.5 cursor-default">
                    <span>✓ Lab Ready</span>
                  </span>
                </div>
              </div>

              {/* Card 3: Madurai Regional Training Centre */}
              <div className={`p-4 rounded-2xl border transition-all ${
                maduraiDispatched
                  ? 'bg-emerald-50/30 border-emerald-200'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              } shadow-xs flex flex-col justify-between`}>
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
                      MDU-DIST-09
                    </span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                      maduraiDispatched
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}>
                      {maduraiDispatched ? "Parity Reached (100%)" : "Zero Infrastructure"}
                    </span>
                  </div>
                  
                  <h5 className="text-sm font-black text-slate-900">
                    Madurai Regional Training Centre
                  </h5>
                  <p className="text-xs text-slate-600 mt-1 font-medium">
                    {maduraiDispatched
                      ? "3D CAD/BIM Workstations • 30 / 30 Active (0 Missing)"
                      : "3D CAD/BIM Workstations • 0 / 30 Active (100% Deficit)"}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-end">
                  {maduraiDispatched ? (
                    <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs flex items-center gap-1.5 cursor-default">
                      <span>✓ Lab Ready</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleDispatchMadurai}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs active:scale-95 flex items-center gap-1.5"
                    >
                      <span>🛠️ Upgrade Hardware</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 1 (CONT.): Trainer Capacity (FDP) & Capital Grant Allocation      */}
      {/* ========================================================================= */}
      {activeSection === 'treasury' && (
        <div className="animate-in fade-in duration-200 space-y-6">
          {/* Secondary Sub-Switcher for Faculty & Capital Allocation Ledger */}
          <div className="flex flex-wrap items-center gap-3 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200">
            <button
              type="button"
              onClick={() => setActiveTab('trainers')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'trainers' || activeTab === 'audit'
                  ? 'bg-white text-indigo-950 font-black shadow-sm border border-slate-200/80'
                  : 'text-slate-500 font-bold hover:text-slate-800'
              }`}
            >
              <Users className="w-4 h-4 text-amber-600" />
              <span>01 | Trainer Capacity &amp; FDP</span>
              <span className="bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full ml-1">
                {fundedTrainers} Trainers
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('budget')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'budget'
                  ? 'bg-white text-indigo-950 font-black shadow-sm border border-slate-200/80'
                  : 'text-slate-500 font-bold hover:text-slate-800'
              }`}
            >
              <Coins className="w-4 h-4 text-emerald-600" />
              <span>02 | Targeted Capital Allocation</span>
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-black px-2 py-0.5 rounded-full ml-1">
                ₹14.2 Cr Available
              </span>
            </button>
          </div>

          {/* TAB 2: Trainer Capacity & FDP */}
          {(activeTab === 'trainers' || activeTab === 'audit') && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm animate-fadeIn">
          
          {/* Header */}
          <div className="pb-4 border-b border-slate-100">
            <h2 className="text-base font-black text-slate-900">
              Statewide Faculty Enablement Program (FDP) Pipeline
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Re-skilling 380 instructors released from rationalized trades into accredited modern domains.
            </p>
          </div>

          {/* 3-Stage Trainer Re-skilling Funnel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
            
            {/* Stage 1 */}
            <div className="border-2 border-emerald-500/80 bg-emerald-50/30 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-emerald-800 uppercase tracking-wider block">
                  Stage 1: Certified
                </span>
                <span className="text-3xl font-black text-emerald-600 block mt-2">
                  {stage1Count} Instructors
                </span>
              </div>
              <p className="text-xs font-bold text-emerald-800 mt-3 pt-3 border-t border-emerald-200">
                Industry Certified (AWS &amp; Linux Foundation)
              </p>
            </div>

            {/* Stage 2 */}
            <div className="border-2 border-amber-500/80 bg-amber-50/30 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-amber-800 uppercase tracking-wider block">
                  Stage 2: Active Training
                </span>
                <span className="text-3xl font-black text-amber-600 block mt-2">
                  {stage2Count} Instructors
                </span>
              </div>
              <p className="text-xs font-bold text-amber-800 mt-3 pt-3 border-t border-amber-200">
                In Active Bootcamps (IIT-M &amp; NASSCOM FDP)
              </p>
            </div>

            {/* Stage 3 */}
            <div className={`border-2 rounded-2xl p-4 flex flex-col justify-between transition-all ${
              isQ4Enrolled
                ? 'border-emerald-500/80 bg-emerald-50/30'
                : 'border-indigo-500/80 bg-indigo-50/30'
            }`}>
              <div>
                <span className={`text-xs font-black uppercase tracking-wider block ${
                  isQ4Enrolled ? 'text-emerald-800' : 'text-indigo-800'
                }`}>
                  Stage 3: Q4 Sprint Rollout
                </span>
                <span className={`text-3xl font-black block mt-2 ${
                  isQ4Enrolled ? 'text-emerald-600' : 'text-indigo-600'
                }`}>
                  {isQ4Enrolled ? "0 Pending" : `${stage3Count} Instructors`}
                </span>
              </div>
              <p className={`text-xs font-bold mt-3 pt-3 border-t ${
                isQ4Enrolled ? 'text-emerald-800 border-emerald-200' : 'text-indigo-800 border-indigo-200'
              }`}>
                {isQ4Enrolled ? "100% Enrolled in Active FDP Sprint ✓" : "Scheduled for Q4 Sprint"}
              </p>
            </div>

          </div>

          {/* Faculty Modernization Transition Roster (Granular list) */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden mb-5">
            <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 text-xs font-black text-slate-700 uppercase tracking-wider">
              Faculty Modernization Transition Roster (Sample Cohort)
            </div>

            <div className="divide-y divide-slate-100">
              
              {/* Trainer 1 */}
              <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-slate-900">S. Parthiban</span>
                    <span className="text-[11px] font-bold text-slate-500">(20 yrs exp)</span>
                  </div>
                  <div className="text-xs text-slate-600 flex flex-wrap items-center gap-2">
                    <span className="text-rose-700 font-semibold line-through">Legacy Visual Basic &amp; ASP 3.0</span>
                    <span className="text-slate-400">──►</span>
                    <span className="text-emerald-700 font-bold">FastAPI &amp; Microservices</span>
                  </div>
                </div>
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-extrabold px-3 py-1 rounded-full self-start sm:self-auto">
                  [ NASSCOM Verified ]
                </span>
              </div>

              {/* Trainer 2 */}
              <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-slate-900">K. Meenakshi</span>
                    <span className="text-[11px] font-bold text-slate-500">(14 yrs exp)</span>
                  </div>
                  <div className="text-xs text-slate-600 flex flex-wrap items-center gap-2">
                    <span className="text-rose-700 font-semibold line-through">DTP &amp; Desktop Publishing</span>
                    <span className="text-slate-400">──►</span>
                    <span className="text-emerald-700 font-bold">Cloud DevOps &amp; K8s</span>
                  </div>
                </div>
                <span className="bg-blue-100 text-blue-800 border border-blue-300 text-xs font-extrabold px-3 py-1 rounded-full self-start sm:self-auto">
                  [ AWS Solutions Architect ]
                </span>
              </div>

              {/* Trainer 3 */}
              <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-slate-900">R. Vignesh</span>
                    <span className="text-[11px] font-bold text-slate-500">(18 yrs exp)</span>
                  </div>
                  <div className="text-xs text-slate-600 flex flex-wrap items-center gap-2">
                    <span className="text-rose-700 font-semibold line-through">Manual 2D Draughtsmanship</span>
                    <span className="text-slate-400">──►</span>
                    <span className="text-emerald-700 font-bold">3D Generative BIM</span>
                  </div>
                </div>
                <span className="bg-indigo-100 text-indigo-800 border border-indigo-300 text-xs font-extrabold px-3 py-1 rounded-full self-start sm:self-auto">
                  [ Autodesk Certified ]
                </span>
              </div>

            </div>
          </div>

          {/* Action Strip */}
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={handleEnrollRemainingTrainers}
              disabled={isQ4Enrolled}
              className={`font-black text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-md transition-all active:scale-95 flex items-center gap-2 ${
                isQ4Enrolled
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {isQ4Enrolled ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>✓ All 58 Q4 Instructors Enrolled (100% Roster Active)</span>
                </>
              ) : (
                <>
                  <span>Enroll Remaining 58 Instructors into Q4 FDP Sprint →</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: Targeted Capital Allocation                                        */}
      {/* ========================================================================= */}
      {activeTab === 'budget' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm animate-fadeIn">
          
          {/* Header */}
          <div className="pb-4 border-b border-slate-100">
            <h2 className="text-base font-black text-slate-900">
              Weighted Capital Grant Disbursement Ledger
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Automated distribution of harvested funds to districts weighted by regional skill shortage severity.
            </p>
          </div>

          {/* District Disbursement Matrix (4 Key Grants + Contingency) */}
          <div className="space-y-3.5 my-5">
            
            {/* Chennai */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-sm font-black text-slate-900 block">
                  Chennai Urban Tech Corridor
                </span>
                <span className="text-xs text-slate-600">
                  High-Density GPU Cloud Sandbox &amp; Cluster Labs
                </span>
              </div>
              <div className="flex items-center gap-3 self-start sm:self-auto">
                <span className="text-base font-black text-slate-900">
                  ₹4.20 Cr Disbursed
                </span>
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                  Disbursed ✓
                </span>
              </div>
            </div>

            {/* Coimbatore */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-sm font-black text-slate-900 block">
                  Coimbatore Engineering &amp; Auto Belt
                </span>
                <span className="text-xs text-slate-600">
                  Robotics &amp; Embedded Edge AI Workstations
                </span>
              </div>
              <div className="flex items-center gap-3 self-start sm:self-auto">
                <span className="text-base font-black text-slate-900">
                  ₹3.10 Cr Disbursed
                </span>
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                  Disbursed ✓
                </span>
              </div>
            </div>

            {/* Madurai */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-sm font-black text-slate-900 block">
                  Madurai &amp; Southern Regional Hub
                </span>
                <span className="text-xs text-slate-600">
                  Digital CAD / Generative Architecture Lab Setup
                </span>
              </div>
              <div className="flex items-center gap-3 self-start sm:self-auto">
                <span className="text-base font-black text-slate-900">
                  ₹2.50 Cr Disbursed
                </span>
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                  Disbursed ✓
                </span>
              </div>
            </div>

            {/* Tier-2 / Tier-3 Rural ITIs */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-sm font-black text-slate-900 block">
                  Tier-2 / Tier-3 Rural ITI Upgrades
                </span>
                <span className="text-xs text-slate-600">
                  Satellite Cloud Terminals &amp; Gigabit Fiber
                </span>
              </div>
              <div className="flex items-center gap-3 self-start sm:self-auto">
                <span className="text-base font-black text-slate-900">
                  ₹2.60 Cr Disbursed
                </span>
                <span className="bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                  Active Rollout
                </span>
              </div>
            </div>

            {/* Unallocated Contingency Buffer */}
            <div className="p-4 rounded-2xl border border-indigo-200 bg-indigo-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-sm font-black text-indigo-950 block">
                  Unallocated Contingency Buffer
                </span>
                <span className="text-xs text-indigo-800">
                  Hardware Spares &amp; Emergency Maintenance
                </span>
              </div>
              <div className="flex items-center gap-3 self-start sm:self-auto">
                <span className="text-base font-black text-indigo-950">
                  ₹1.80 Cr
                </span>
                <span className="bg-indigo-100 text-indigo-800 border border-indigo-300 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                  Reserved Buffer
                </span>
              </div>
            </div>

          </div>

          {/* Statutory Promulgation & Export Bar (Bottom Row) */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 mt-6">
            
            {/* Left Side */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Order Ref:</span>
              <span className="font-mono text-xs font-black text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                GO-TN-2026-LABGRANT-04
              </span>
              <span className="text-xs font-black text-slate-600 ml-3">
                ● 18 High-Priority Regional Labs Target-Funded
              </span>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleOpenLedgerModal}
                className="border border-slate-300 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-slate-100 transition-colors shadow-2xs flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>Export Fiscal Grant Ledger (PDF)</span>
              </button>

              <button
                type="button"
                onClick={handlePromulgateGrant}
                disabled={isGrantPromulgated}
                className={`font-black text-sm px-6 py-2.5 rounded-full shadow-md transition-all active:scale-95 flex items-center gap-2 ${
                  isGrantPromulgated
                    ? 'bg-emerald-600 text-white cursor-default'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isGrantPromulgated ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>✓ Lab Grant Order Promulgated Statewide</span>
                  </>
                ) : (
                  <>
                    <span>Promulgate Statewide Lab Grant Order →</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. OFFICIAL FISCAL GRANT LEDGER MODAL                                      */}
      {/* ========================================================================= */}
      {isLedgerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <FileCheck2 className="w-6 h-6 text-emerald-400" />
                <div>
                  <h3 className="text-base font-black tracking-tight">
                    Statutory Physical Enablement &amp; Fiscal Grant Ledger
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Ref: GO-TN-2026-LABGRANT-04 • Reinvestment Protocol
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrintFiscalLedger}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Document</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsLedgerModalOpen(false)}
                  className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body Preview */}
            <div className="p-6 max-h-[70vh] overflow-y-auto bg-slate-50 space-y-4">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
                <div className="text-center pb-4 border-b border-slate-200">
                  <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                    DIRECTORATE OF TECHNICAL EDUCATION • GOVERNMENT OF TAMIL NADU
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mt-1">
                    Statutory Physical Enablement &amp; Fiscal Grant Ledger
                  </h4>
                  <div className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-200 mt-2 font-mono">
                    GO-TN-2026-LABGRANT-04
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Re-routing Sunk Trade Drag into Statewide AI, Cloud &amp; Faculty Modernization
                  </p>
                </div>

                {/* Ledger Summary */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 block uppercase">Total Capital</span>
                    <span className="text-base font-black text-slate-900">₹14.2 Cr</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 block uppercase">Hardware &amp; Compute</span>
                    <span className="text-base font-black text-cyan-600">₹9.8 Cr</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 block uppercase">Faculty FDP</span>
                    <span className="text-base font-black text-amber-600">₹2.6 Cr</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 block uppercase">Rural Reserve</span>
                    <span className="text-base font-black text-emerald-600">₹1.8 Cr</span>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
                  <div className="bg-slate-100 p-2 font-black text-slate-700">Targeted District Disbursements:</div>
                  <div className="divide-y divide-slate-100">
                    <div className="p-2.5 flex justify-between">
                      <span>Chennai OMR State Polytechnic (GPU Workstations)</span>
                      <strong className="text-slate-900">₹4.20 Cr</strong>
                    </div>
                    <div className="p-2.5 flex justify-between">
                      <span>Coimbatore TIDEL ITI (Edge AI Terminals)</span>
                      <strong className="text-slate-900">₹3.10 Cr</strong>
                    </div>
                    <div className="p-2.5 flex justify-between">
                      <span>Madurai Regional ATC (3D Generative BIM Lab)</span>
                      <strong className="text-slate-900">₹2.50 Cr</strong>
                    </div>
                    <div className="p-2.5 flex justify-between">
                      <span>Tier-2 / Tier-3 Rural ITIs (Satellite Cloud Nodes)</span>
                      <strong className="text-slate-900">₹2.60 Cr</strong>
                    </div>
                    <div className="p-2.5 flex justify-between bg-slate-50">
                      <span>Emergency Maintenance &amp; Spares Contingency</span>
                      <strong className="text-indigo-900">₹1.80 Cr</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
              <span>Standard A4 Output • Zero Seat Loss &amp; Capital Reinvestment Compliant</span>
              <button
                type="button"
                onClick={() => setIsLedgerModalOpen(false)}
                className="bg-white border border-slate-300 text-slate-700 font-bold px-4 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
