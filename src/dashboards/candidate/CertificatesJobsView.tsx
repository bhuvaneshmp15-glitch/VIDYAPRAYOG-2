import React, { useState } from 'react';
import {
  BadgeCheck,
  CheckCircle2,
  Download,
  ExternalLink,
  Award,
  Sparkles,
  Check,
  Copy,
  FileText,
  Zap,
  Building2,
  MapPin,
  X,
  Code2,
  Terminal,
  ShieldCheck,
  SlidersHorizontal,
  Clock,
  KeyRound
} from 'lucide-react';

// GitHub Octocat SVG Icon Component
const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

// Generates a clean, full-color official certificate PDF in standard PDF 1.4
const generateFullColorCertificatePdf = (): string => {
  const stream = [
    // Outer canvas & border
    '0.98 0.99 1.0 rg',
    '20 20 572 752 re f',
    '0.08 0.13 0.24 RG',
    '3 w',
    '25 25 562 742 re S',

    // Top Navy Header Banner
    '0.08 0.13 0.24 rg',
    '30 700 552 60 re f',
    'BT',
    '/F1 16 Tf',
    '1 1 1 rg',
    '50 724 Td',
    '(STATE SKILL MISSION & AICTE VERIFIED CERTIFICATE) Tj',
    'ET',

    // Student Information Card
    '0.93 0.96 1.0 rg',
    '50 595 512 85 re f',
    '0.7 0.8 0.95 RG',
    '1 w',
    '50 595 512 85 re S',
    'BT',
    '/F1 15 Tf',
    '0.08 0.13 0.24 rg',
    '70 648 Td',
    '(STUDENT NAME: KOWSHIK) Tj',
    '/F2 11 Tf',
    '0 -18 Td',
    '(Candidate ID: LMI-9042   |   Course: Cloud DevOps & Microservices Apprentice) Tj',
    '0 -16 Td',
    '(Status: AICTE Certified   |   Location: Chennai OMR Industrial Corridor) Tj',
    'ET',

    // Score Section Title
    'BT',
    '/F1 13 Tf',
    '0.08 0.13 0.24 rg',
    '50 560 Td',
    '(OFFICIAL VERIFIED SKILL SCORES) Tj',
    'ET',

    // 1. FastAPI 84% (Green Bar)
    'BT /F1 11 Tf 0.1 0.1 0.1 rg 50 530 Td (FastAPI Microservices: 84%) Tj ET',
    '0.9 0.9 0.92 rg 230 528 290 12 re f',
    '0.06 0.72 0.44 rg 230 528 243 12 re f',

    // 2. Cloud DevOps 78% (Blue Bar)
    'BT /F1 11 Tf 0.1 0.1 0.1 rg 50 498 Td (Cloud DevOps & Docker: 78%) Tj ET',
    '0.9 0.9 0.92 rg 230 496 290 12 re f',
    '0.15 0.50 0.95 rg 230 496 226 12 re f',

    // 3. Databases 76% (Indigo Bar)
    'BT /F1 11 Tf 0.1 0.1 0.1 rg 50 466 Td (Database & Vector DBs: 76%) Tj ET',
    '0.9 0.9 0.92 rg 230 464 290 12 re f',
    '0.39 0.35 0.88 rg 230 464 220 12 re f',

    // 4. Problem Solving 82% (Purple Bar)
    'BT /F1 11 Tf 0.1 0.1 0.1 rg 50 434 Td (Problem Solving & Aptitude: 82%) Tj ET',
    '0.9 0.9 0.92 rg 230 432 290 12 re f',
    '0.65 0.28 0.85 rg 230 432 237 12 re f',

    // Overall Score Box
    '0.95 0.98 0.95 rg 50 375 512 36 re f',
    '0.2 0.7 0.3 RG 1 w 50 375 512 36 re S',
    'BT /F1 12 Tf 0.05 0.5 0.2 rg 70 388 Td (Overall Factory Readiness Index: 80.0% - Job Ready Candidate) Tj ET',

    // Bottom Green Seal
    '0.06 0.72 0.44 rg',
    '50 280 230 65 re f',
    'BT',
    '/F1 13 Tf',
    '1 1 1 rg',
    '75 315 Td',
    '(VERIFIED CANDIDATE) Tj',
    '/F2 9 Tf',
    '0 -16 Td',
    '(State Skill Council & AICTE Approved) Tj',
    'ET',

    // Colored QR Code Box
    '0.92 0.95 0.98 rg',
    '390 265 140 95 re f',
    '0.2 0.5 0.8 RG',
    '1.5 w',
    '390 265 140 95 re S',
    'BT',
    '/F1 11 Tf',
    '0.1 0.1 0.1 rg',
    '425 325 Td',
    '([ QR CODE ]) Tj',
    '/F2 8 Tf',
    '-20 -18 Td',
    '(Scan to Verify Certificate) Tj',
    '0 -12 Td',
    '(ID: LMI-9042-KOWSHIK) Tj',
    'ET'
  ].join('\n');

  const streamLen = new TextEncoder().encode(stream).length;
  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [];

  const addObj = (s: string) => {
    offsets.push(new TextEncoder().encode(pdf).length);
    pdf += s + '\n';
  };

  addObj('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj');
  addObj('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj');
  addObj('3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj');
  addObj(`4 0 obj\n<< /Length ${streamLen} >>\nstream\n${stream}\nendstream\nendobj`);
  addObj('5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj');
  addObj('6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj');

  const startxref = new TextEncoder().encode(pdf).length;
  pdf += 'xref\n0 ' + (offsets.length + 1) + '\n0000000000 65535 f \n';
  for (const off of offsets) {
    pdf += String(off).padStart(10, '0') + ' 00000 n \n';
  }
  pdf += 'trailer\n<< /Size ' + (offsets.length + 1) + ' /Root 1 0 R >>\nstartxref\n' + startxref + '\n%%EOF';
  return pdf;
};

// Generates simple standard PDF files for card 2 downloads
const generateSimplePdf = (title: string, lines: string[]): string => {
  let stream = 'BT\n/F1 15 Tf\n50 740 Td\n(' + title + ') Tj\n/F2 11 Tf\n';
  for (const line of lines) {
    stream += '0 -22 Td\n(' + line + ') Tj\n';
  }
  stream += 'ET';

  const len = new TextEncoder().encode(stream).length;
  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [];

  const addObj = (s: string) => {
    offsets.push(new TextEncoder().encode(pdf).length);
    pdf += s + '\n';
  };

  addObj('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj');
  addObj('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj');
  addObj('3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj');
  addObj(`4 0 obj\n<< /Length ${len} >>\nstream\n${stream}\nendstream\nendobj`);
  addObj('5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj');
  addObj('6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj');

  const startxref = new TextEncoder().encode(pdf).length;
  pdf += 'xref\n0 ' + (offsets.length + 1) + '\n0000000000 65535 f \n';
  for (const off of offsets) {
    pdf += String(off).padStart(10, '0') + ' 00000 n \n';
  }
  pdf += 'trailer\n<< /Size ' + (offsets.length + 1) + ' /Root 1 0 R >>\nstartxref\n' + startxref + '\n%%EOF';
  return pdf;
};

// Universal client-side instant file download trigger
const triggerInstantDownload = (filename: string, content: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};

export const CertificatesJobsView: React.FC = () => {
  // 1-Click Apply state
  const [appliedJobs, setAppliedJobs] = useState<Record<string, boolean>>({});
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);

  // Modals state
  const [isRepoModalOpen, setIsRepoModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isBlockchainModalOpen, setIsBlockchainModalOpen] = useState(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 3200);
  };

  // Top Certificate Download
  const handleDownloadFullCertificate = () => {
    const pdfData = generateFullColorCertificatePdf();
    triggerInstantDownload('KOWSHIK_Skill_Certificate.pdf', pdfData, 'application/pdf');
    showToast('✓ Downloaded full-color certificate: KOWSHIK_Skill_Certificate.pdf');
  };

  // Card 2 Downloads
  const handleDownloadCert = (type: 'state' | 'aicte' | 'sig') => {
    if (type === 'state') {
      const pdf = generateSimplePdf('STATE SKILL MISSION OFFICIAL CREDENTIAL', [
        'Candidate Name: KOWSHIK',
        'Candidate ID: LMI-9042',
        'Track: Cloud DevOps & Microservices Apprentice',
        'Regional Hub: Chennai OMR Industrial Corridor',
        'Status: Cryptographically Ratified (NCrF Level 6.5)',
        'Issuing Authority: Tamil Nadu State Skill Mission'
      ]);
      triggerInstantDownload('State_Skill_Mission_Credential_KOWSHIK.pdf', pdf, 'application/pdf');
      showToast('✓ Downloaded State_Skill_Mission_Credential_KOWSHIK.pdf');
    } else if (type === 'aicte') {
      const pdf = generateSimplePdf('AICTE BOARD OF STUDIES CURRICULUM TRANSCRIPT', [
        'Candidate Name: KOWSHIK',
        'Candidate ID: LMI-9042',
        'Program: AICTE Aligned Technical Apprenticeship',
        'Overall Score: 80.0% Aggregate (Distinction)',
        'Status: Officially Ratified by AICTE BOS'
      ]);
      triggerInstantDownload('AICTE_BOS_Transcript_KOWSHIK.pdf', pdf, 'application/pdf');
      showToast('✓ Downloaded AICTE_BOS_Transcript_KOWSHIK.pdf');
    } else {
      const sigData = `-----BEGIN LMI CRYPTOGRAPHIC VALIDATION-----
Issuer: director.omr.districtlab.gov.in
Candidate: KOWSHIK
CandidateID: LMI-9042
Corridor: Chennai OMR Industrial Corridor
Track: Cloud DevOps & Microservices Apprentice
PracticalHours: 24.0 Hours Verified Sandbox
Ed25519-Sig: 6c5a31a987dbe024ff0019284ba0175ef3810283c74ea0218bfa923e1104e4209
VerificationPortal: https://verify.lmi-portal.gov.in/v/LMI-9042-NCRF65-KOWSHIK
Timestamp: 2026-09-24T09:30:00Z
-----END LMI CRYPTOGRAPHIC VALIDATION-----`;
      triggerInstantDownload('District_Lab_Validation_KOWSHIK.sig', sigData, 'text/plain');
      showToast('✓ Downloaded District_Lab_Validation_KOWSHIK.sig');
    }
  };

  // 1-Click Fast-Track Apply Handler
  const handleApply = (jobId: string, company: string) => {
    if (appliedJobs[jobId]) return;
    setApplyingJobId(jobId);
    setTimeout(() => {
      setAppliedJobs((prev) => ({ ...prev, [jobId]: true }));
      setApplyingJobId(null);
      showToast(`⚡ Application sent to ${company} ✓`);
    }, 450);
  };

  const handleCopyShareLink = () => {
    navigator.clipboard?.writeText('https://verify.lmi-portal.gov.in/v/LMI-9042-NCRF65-KOWSHIK');
    setCopiedLink(true);
    showToast('✓ Verification link copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="h-[calc(100vh-125px)] flex flex-col justify-between p-3 gap-3 overflow-hidden max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-2xl border border-slate-700 text-xs font-semibold animate-in fade-in duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-slate-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TOP HEADER BAR (COMPACT & CRISP) */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs px-4 py-2 flex items-center justify-between gap-3 flex-shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base md:text-lg font-black text-slate-900 tracking-tight leading-none">
              Digital Credential Wallet &amp; Job Conduit
            </h1>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              NCrF 6.5 Verified
            </span>
          </div>
          <p className="text-[11px] font-medium text-slate-500 mt-0.5 hidden sm:block">
            Cryptographically verified credentials and direct 1-click hiring pipeline into Portal 1 cluster requisitions.
          </p>
        </div>

        {/* Top Action Button: Bright Blue Full-Color Certificate Download */}
        <button
          type="button"
          onClick={handleDownloadFullCertificate}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs hover:shadow-md transition-all active:scale-95 flex-shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download My Certificate (PDF) ↗</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* BENTO GRID (6 COMPACT CARDS • ALL BUTTONS FULLY VISIBLE • ZERO SCROLLING) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 flex-1 min-h-0">
        
        {/* ----------------------------------------------------------------------- */}
        {/* CARD 1: 1. TRAINEE IDENTITY */}
        {/* ----------------------------------------------------------------------- */}
        <div className="p-3.5 rounded-xl flex flex-col justify-between overflow-hidden bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="space-y-1.5">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                1. TRAINEE IDENTITY
              </h2>
              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Verified ✓
              </span>
            </div>

            {/* Identity Block (Two-column layout) */}
            <div className="flex items-center gap-3 bg-slate-50/80 rounded-lg p-2 border border-slate-100">
              {/* Left: Circular Candidate Avatar with active status indicator */}
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 to-indigo-600 text-white font-black text-base flex items-center justify-center shadow-inner">
                  K
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center">
                  <span className="w-1 h-1 bg-white rounded-full" />
                </span>
              </div>

              {/* Right: Candidate Details */}
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-black text-slate-900 leading-none">
                    KOWSHIK
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-200/80 text-slate-700">
                    LMI-9042
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-emerald-700 mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active LMI Candidate
                </div>
              </div>
            </div>

            {/* Metadata Row Stack (Clean horizontal label + value format) */}
            <div className="space-y-1 text-[11px]">
              <div className="flex items-center justify-between py-0.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Candidate Name:</span>
                <span className="font-bold text-slate-900">KOWSHIK</span>
              </div>
              <div className="flex items-center justify-between py-0.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Candidate ID:</span>
                <span className="font-mono font-bold text-slate-800">LMI-9042</span>
              </div>
              <div className="flex items-center justify-between py-0.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Track:</span>
                <span className="font-bold text-slate-900 truncate max-w-[170px]">
                  Cloud DevOps &amp; Microservices Apprentice
                </span>
              </div>
              <div className="flex items-center justify-between py-0.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Regional Hub:</span>
                <span className="font-semibold text-slate-800 truncate max-w-[170px]">
                  Chennai OMR Industrial Corridor
                </span>
              </div>
            </div>

            {/* Framework Seal Box (Gold/amber tinted container) */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-1.5 text-xs flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span className="text-[11px] font-bold text-amber-900 truncate">
                Framework Seal: NCrF Level 6.5 Certified (AICTE Aligned)
              </span>
            </div>
          </div>

          {/* Card Footer Action: Full-width button */}
          <div className="pt-2 border-t border-slate-100 flex-shrink-0">
            <button
              type="button"
              onClick={() => setIsProfileModalOpen(true)}
              className="w-full py-1.5 px-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-[11px] font-bold text-slate-700 transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <SlidersHorizontal className="w-3 h-3 text-slate-500" />
              <span>Edit Profile Settings</span>
            </button>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* CARD 2: 2. CREDENTIAL VAULT */}
        {/* ----------------------------------------------------------------------- */}
        <div className="p-3.5 rounded-xl flex flex-col justify-between overflow-hidden bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="space-y-1.5">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                2. CREDENTIAL VAULT
              </h2>
              <span className="flex items-center gap-1 text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded-full border border-indigo-100">
                <KeyRound className="w-2.5 h-2.5" />
                <span>3 Verified Signatures</span>
              </span>
            </div>

            {/* 3 Download Rows (Tightly spaced, high-contrast download buttons) */}
            <div className="space-y-1.5">
              {/* Row 1: State Skill Mission Credential */}
              <div className="p-1.5 rounded-lg border border-slate-100 bg-slate-50/70 hover:bg-white flex items-center justify-between gap-2 transition-all">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 border border-red-100">
                    <FileText className="w-3 h-3" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-900 truncate">
                    State Skill Mission Credential
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDownloadCert('state')}
                  className="px-2 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold shadow-2xs transition-all flex items-center gap-1 flex-shrink-0 active:scale-95 cursor-pointer"
                  title="Download State_Skill_Mission_Credential_KOWSHIK.pdf"
                >
                  <Download className="w-2.5 h-2.5" />
                  <span>Download PDF</span>
                </button>
              </div>

              {/* Row 2: AICTE BOS Ratification Transcript */}
              <div className="p-1.5 rounded-lg border border-slate-100 bg-slate-50/70 hover:bg-white flex items-center justify-between gap-2 transition-all">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 border border-blue-100">
                    <FileText className="w-3 h-3" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-900 truncate">
                    AICTE BOS Ratification Transcript
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDownloadCert('aicte')}
                  className="px-2 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold shadow-2xs transition-all flex items-center gap-1 flex-shrink-0 active:scale-95 cursor-pointer"
                  title="Download AICTE_BOS_Transcript_KOWSHIK.pdf"
                >
                  <Download className="w-2.5 h-2.5" />
                  <span>Download PDF</span>
                </button>
              </div>

              {/* Row 3: District Lab Practical Validation */}
              <div className="p-1.5 rounded-lg border border-slate-100 bg-slate-50/70 hover:bg-white flex items-center justify-between gap-2 transition-all">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0 border border-purple-100">
                    <ShieldCheck className="w-3 h-3" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-900 truncate">
                    District Lab Practical Validation
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDownloadCert('sig')}
                  className="px-2 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold shadow-2xs transition-all flex items-center gap-1 flex-shrink-0 active:scale-95 cursor-pointer"
                  title="Download District_Lab_Validation_KOWSHIK.sig"
                >
                  <Download className="w-2.5 h-2.5" />
                  <span>Download SIG</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Action Button (Must be 100% visible, not clipped) */}
          <div className="pt-2 border-t border-slate-100 flex-shrink-0">
            <button
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              className="w-full py-1.5 px-3 rounded-lg bg-indigo-50/80 hover:bg-indigo-100 border border-indigo-200/80 text-[11px] font-bold text-indigo-700 transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <span>🔗 Share Verification Link ↗</span>
            </button>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* CARD 3: 3. VERIFIED SKILL TELEMETRY */}
        {/* ----------------------------------------------------------------------- */}
        <div className="p-3.5 rounded-xl flex flex-col justify-between overflow-hidden bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="space-y-1.5">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                3. VERIFIED SKILL TELEMETRY
              </h2>
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                LIVE
              </span>
            </div>

            {/* 4 Horizontal Progress Bars (Compact spacing) */}
            <div className="space-y-1.5">
              {/* 1. FastAPI Microservices: 84% (Green) */}
              <div>
                <div className="flex justify-between items-center text-[11px] mb-0.5">
                  <span className="font-bold text-slate-800 truncate">FastAPI Microservices</span>
                  <span className="font-black text-emerald-600 text-[10px]">84%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '84%' }} />
                </div>
              </div>

              {/* 2. Cloud DevOps & Docker: 78% (Blue) */}
              <div>
                <div className="flex justify-between items-center text-[11px] mb-0.5">
                  <span className="font-bold text-slate-800 truncate">Cloud DevOps &amp; Docker</span>
                  <span className="font-black text-blue-600 text-[10px]">78%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '78%' }} />
                </div>
              </div>

              {/* 3. Database & Vector DBs: 76% (Indigo) */}
              <div>
                <div className="flex justify-between items-center text-[11px] mb-0.5">
                  <span className="font-bold text-slate-800 truncate">Database &amp; Vector DBs</span>
                  <span className="font-black text-indigo-600 text-[10px]">76%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '76%' }} />
                </div>
              </div>

              {/* 4. Problem Solving & Aptitude: 82% (Purple) */}
              <div>
                <div className="flex justify-between items-center text-[11px] mb-0.5">
                  <span className="font-bold text-slate-800 truncate">Problem Solving &amp; Aptitude</span>
                  <span className="font-black text-purple-600 text-[10px]">82%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '82%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Aggregate Metric Footer */}
          <div className="pt-2 border-t border-slate-100 flex-shrink-0">
            <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200/80 flex items-center justify-between text-[11px]">
              <span className="font-bold text-emerald-950 truncate">
                Overall Factory Readiness Index:
              </span>
              <span className="font-black text-emerald-700 bg-white px-1.5 py-0.5 rounded shadow-2xs">
                80.0% (Job Ready ✓)
              </span>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* CARD 4: 4. GITHUB CAPSTONE SYNC */}
        {/* ----------------------------------------------------------------------- */}
        <div className="p-3.5 rounded-xl flex flex-col justify-between overflow-hidden bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="space-y-1.5">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
              <div className="flex items-center gap-1.5 min-w-0">
                <div className="w-5 h-5 rounded bg-slate-100 text-slate-900 flex items-center justify-center flex-shrink-0 border border-slate-200">
                  <GithubIcon className="w-3.5 h-3.5" />
                </div>
                <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider truncate">
                  4. GITHUB CAPSTONE SYNC
                </h2>
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 flex-shrink-0">
                @skowshik889-a11y
              </span>
            </div>

            {/* Original Card Face Display */}
            {/* Terminal Sync Box */}
            <div className="p-2 rounded-lg bg-slate-900 text-white font-mono text-[11px] space-y-1 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-emerald-400 font-bold truncate">
                  skowshik889-a11y/capstone-verified
                </span>
                <span className="text-[9px] font-sans font-bold text-emerald-950 bg-emerald-400 px-1.5 py-0.2 rounded flex items-center gap-0.5 flex-shrink-0">
                  <Check className="w-2.5 h-2.5" /> Passing
                </span>
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                commit #a7f29b • Verified Production Build
              </div>
            </div>

            {/* Verified Tech Stack Badges */}
            <div className="flex flex-wrap gap-1">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
                #Docker
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                #FastAPI
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                #Kubernetes
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-purple-50 text-purple-700 border border-purple-200/60">
                #Python
              </span>
            </div>

            {/* Telemetry Pill */}
            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-50 border border-slate-200/70 text-[10px] text-slate-700 font-semibold">
              <Clock className="w-3 h-3 text-emerald-600 flex-shrink-0" />
              <span className="truncate">24 Lab Sandbox Practice Hours Synced</span>
            </div>
          </div>

          {/* Bottom Action Button (Fully visible) */}
          <div className="pt-2 border-t border-slate-100 flex-shrink-0">
            <button
              type="button"
              onClick={() => setIsRepoModalOpen(true)}
              className="w-full py-1.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95"
            >
              <span>📂 View 4 Projects &amp; Source Code ↗</span>
            </button>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* CARD 5: 5. MATCHED CLUSTER JOBS */}
        {/* ----------------------------------------------------------------------- */}
        <div className="p-3.5 rounded-xl flex flex-col justify-between overflow-hidden bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="space-y-1.5">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                5. MATCHED CLUSTER JOBS
              </h2>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
                Open Openings
              </span>
            </div>

            {/* Jobs List */}
            <div className="space-y-1.5">
              {/* Job 1 */}
              <div className="p-2 rounded-lg border border-slate-200 bg-slate-50/60">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[11px] font-black text-slate-900 truncate max-w-[160px]">
                    Junior Cloud DevOps Engineer
                  </span>
                  <span className="text-[9px] font-black text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                    ₹8.5 - 11.0 LPA
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 mb-1">
                  CloudZero Networks • OMR Corridor
                </div>
                <button
                  type="button"
                  onClick={() => handleApply('job1', 'CloudZero Networks')}
                  disabled={appliedJobs['job1'] || applyingJobId === 'job1'}
                  className={`w-full py-1 px-2 rounded-md text-[10px] font-bold transition-all flex items-center justify-center gap-1 shadow-2xs ${
                    appliedJobs['job1']
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95'
                  }`}
                >
                  <Zap className="w-3 h-3" />
                  <span>
                    {appliedJobs['job1'] ? 'Applied ✓' : applyingJobId === 'job1' ? 'Applying...' : '⚡ 1-Click Fast-Track Apply'}
                  </span>
                </button>
              </div>

              {/* Job 2 */}
              <div className="p-2 rounded-lg border border-slate-200 bg-slate-50/60">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[11px] font-black text-slate-900 truncate max-w-[160px]">
                    Microservices Backend Developer
                  </span>
                  <span className="text-[9px] font-black text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">
                    ₹7.5 - 9.2 LPA
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 mb-1">
                  TIDEL Systems Group • IT Hub
                </div>
                <button
                  type="button"
                  onClick={() => handleApply('job2', 'TIDEL Systems Group')}
                  disabled={appliedJobs['job2'] || applyingJobId === 'job2'}
                  className={`w-full py-1 px-2 rounded-md text-[10px] font-bold transition-all flex items-center justify-center gap-1 shadow-2xs ${
                    appliedJobs['job2']
                      ? 'bg-slate-800 text-white cursor-default'
                      : 'bg-slate-900 hover:bg-slate-800 text-white active:scale-95'
                  }`}
                >
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span>
                    {appliedJobs['job2'] ? 'Applied ✓' : applyingJobId === 'job2' ? 'Applying...' : '⚡ 1-Click Fast-Track Apply'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 flex-shrink-0">
            <span>Direct consortium conduit</span>
            <span className="text-emerald-700 font-bold">18 Vacancies Live</span>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* CARD 6: 6. CONSORTIUM CREDENTIALS */}
        {/* ----------------------------------------------------------------------- */}
        <div className="p-3.5 rounded-xl flex flex-col justify-between overflow-hidden bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="space-y-1.5">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                6. CONSORTIUM CREDENTIALS
              </h2>
              <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded-full border border-purple-200">
                4 Badges
              </span>
            </div>

            {/* 4 Verified Seal Rows with Green Checkmarks */}
            <div className="space-y-1 text-xs">
              <div className="p-1.5 rounded-lg bg-emerald-50/70 border border-emerald-100 flex items-center justify-between font-bold text-emerald-950 text-[11px]">
                <span className="truncate">✓ AWS Cloud Sandbox Verified</span>
                <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              </div>
              <div className="p-1.5 rounded-lg bg-emerald-50/70 border border-emerald-100 flex items-center justify-between font-bold text-emerald-950 text-[11px]">
                <span className="truncate">✓ Production Container Runtimes (Docker &amp; K8s)</span>
                <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              </div>
              <div className="p-1.5 rounded-lg bg-emerald-50/70 border border-emerald-100 flex items-center justify-between font-bold text-emerald-950 text-[11px]">
                <span className="truncate">✓ Top 12th Percentile Factory Readiness Index</span>
                <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              </div>
              <div className="p-1.5 rounded-lg bg-emerald-50/70 border border-emerald-100 flex items-center justify-between font-bold text-emerald-950 text-[11px]">
                <span className="truncate">✓ Zero Deficit Clearance (OMR Corridor)</span>
                <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              </div>
            </div>
          </div>

          {/* Bottom Action Button (Must be 100% visible, not clipped) */}
          <div className="pt-2 border-t border-slate-100 flex-shrink-0">
            <button
              type="button"
              onClick={() => setIsBlockchainModalOpen(true)}
              className="w-full py-1.5 px-3 rounded-lg border border-indigo-300 hover:bg-indigo-50 text-[11px] font-bold text-indigo-700 transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <span>🛡️ View Public Blockchain Proof ↗</span>
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE MODAL: GITHUB SHOWCASE (pass_word, facial_repo, ChatBots_Chat, Weather_app) */}
      {/* ========================================================================= */}
      {isRepoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full p-5 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-md">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 leading-tight">
                    KOWSHIK&apos;s Verified GitHub Repositories
                  </h3>
                  <a
                    href="https://github.com/skowshik889-a11y"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <span>@skowshik889-a11y</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsRepoModalOpen(false)}
                className="px-2.5 py-1 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors"
              >
                ✕ Close
              </button>
            </div>

            {/* 4 Exact Repositories List with Direct Working Redirections */}
            <div className="space-y-2.5">
              {/* 1. pass_word */}
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white flex items-center justify-between gap-3 transition-colors">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Code2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-sm font-black text-slate-900 truncate">
                      pass_word
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      Secure password generation and authentication pipeline
                    </div>
                  </div>
                </div>
                <a
                  href="https://github.com/skowshik889-a11y/pass_word"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1 shadow-2xs transition-all active:scale-95 flex-shrink-0"
                >
                  <span>Open GitHub Repo ↗</span>
                </a>
              </div>

              {/* 2. facial_repo */}
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white flex items-center justify-between gap-3 transition-colors">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Code2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-sm font-black text-slate-900 truncate">
                      facial_repo
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      Facial landmark detection and computer vision analysis
                    </div>
                  </div>
                </div>
                <a
                  href="https://github.com/skowshik889-a11y/facial_repo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1 shadow-2xs transition-all active:scale-95 flex-shrink-0"
                >
                  <span>Open GitHub Repo ↗</span>
                </a>
              </div>

              {/* 3. ChatBots_Chat */}
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white flex items-center justify-between gap-3 transition-colors">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Code2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-sm font-black text-slate-900 truncate">
                      ChatBots_Chat
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      Interactive conversational chatbot and NLP interface
                    </div>
                  </div>
                </div>
                <a
                  href="https://github.com/skowshik889-a11y/ChatBots_Chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1 shadow-2xs transition-all active:scale-95 flex-shrink-0"
                >
                  <span>Open GitHub Repo ↗</span>
                </a>
              </div>

              {/* 4. Weather_app */}
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white flex items-center justify-between gap-3 transition-colors">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Code2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-sm font-black text-slate-900 truncate">
                      Weather_app
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      Real-time live weather telemetry and radar application
                    </div>
                  </div>
                </div>
                <a
                  href="https://github.com/skowshik889-a11y/Weather_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1 shadow-2xs transition-all active:scale-95 flex-shrink-0"
                >
                  <span>Open GitHub Repo ↗</span>
                </a>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setIsRepoModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
              >
                Close Showcase
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* INTERACTIVE MODAL: SHARE MY VERIFICATION LINK */}
      {/* ========================================================================= */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <h3 className="text-base font-black text-slate-900">
                Share Verification Link
              </h3>
              <button
                type="button"
                onClick={() => setIsShareModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-3">
              This cryptographic verification link allows employers to verify KOWSHIK’s credentials and live scores:
            </p>

            <div className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl mb-4">
              <input
                type="text"
                readOnly
                value="https://verify.lmi-portal.gov.in/v/LMI-9042-NCRF65-KOWSHIK"
                className="bg-transparent border-none text-xs text-slate-800 w-full focus:outline-none font-mono"
              />
              <button
                type="button"
                onClick={handleCopyShareLink}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1 flex-shrink-0"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsShareModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* INTERACTIVE MODAL: EDIT PROFILE SETTINGS */}
      {/* ========================================================================= */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <h3 className="text-base font-black text-slate-900">
                Trainee Profile Settings
              </h3>
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-500 font-semibold mb-1">Candidate Name</label>
                <input
                  type="text"
                  disabled
                  value="KOWSHIK"
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-900 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">Candidate ID</label>
                <input
                  type="text"
                  disabled
                  value="LMI-9042"
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">GitHub Profile Handle</label>
                <input
                  type="text"
                  disabled
                  value="skowshik889-a11y"
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-900 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Regional Industrial Hub</label>
                <select className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 font-semibold focus:outline-none">
                  <option>Chennai OMR Industrial Corridor</option>
                  <option>TIDEL Park IT Corridor</option>
                  <option>Coimbatore Manufacturing Hub</option>
                </select>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(false)}
                className="px-3.5 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast('Profile configuration saved.');
                  setIsProfileModalOpen(false);
                }}
                className="px-4 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold shadow-xs hover:bg-slate-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* INTERACTIVE MODAL: BLOCKCHAIN PROOF */}
      {/* ========================================================================= */}
      {isBlockchainModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <h3 className="text-base font-black text-slate-900">
                Consortium Blockchain Proof
              </h3>
              <button
                type="button"
                onClick={() => setIsBlockchainModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-slate-900 text-slate-200 rounded-xl space-y-1.5 text-[11px] font-mono mb-3">
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">Consortium Block:</span>
                <span className="text-emerald-400 font-bold">#19,402,881 (Confirmed)</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">Contract:</span>
                <span className="text-purple-300 truncate max-w-[180px]">0x71C83a9F42b702E651cA84E</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">Merkle Root:</span>
                <span className="text-indigo-300 truncate max-w-[180px]">0x94b7f83a21bc901e88d1512</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Signatures:</span>
                <span className="text-slate-200 font-bold">AICTE BOS &bull; TNSDC &bull; OMR Lab</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium mb-4">
              ✓ All 4 badges verified against tamper-proof consortium ledger.
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsBlockchainModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
