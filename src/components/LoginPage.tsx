import React, { useState } from 'react';
import { 
  Building2, 
  Landmark, 
  GraduationCap, 
  Sparkles, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { PortalId } from '../types/portal';
import { PORTALS } from '../data/mockData';

interface LoginPageProps {
  onSelectPortal: (portalId: PortalId) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSelectPortal }) => {
  const [hoveredPortal, setHoveredPortal] = useState<PortalId | null>(null);

  // The 3 official portals
  const portalKeys: PortalId[] = ['industry', 'governance', 'candidate'];

  const getPortalTheme = (portalId: PortalId) => {
    switch (portalId) {
      case 'industry':
        return {
          badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
          iconContainer: 'bg-blue-50 text-blue-600 border-blue-100 group-hover:bg-blue-600 group-hover:text-white',
          buttonClass: 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs hover:shadow',
          hoverBorder: 'hover:border-blue-400 hover:shadow-md'
        };
      case 'governance':
        return {
          badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          iconContainer: 'bg-indigo-50 text-indigo-600 border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white',
          buttonClass: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs hover:shadow',
          hoverBorder: 'hover:border-indigo-400 hover:shadow-md'
        };
      case 'candidate':
        return {
          badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          iconContainer: 'bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white',
          buttonClass: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs hover:shadow',
          hoverBorder: 'hover:border-emerald-400 hover:shadow-md'
        };
    }
  };

  const renderPortalIcon = (portalId: PortalId) => {
    switch (portalId) {
      case 'industry':
        return <Building2 className="w-5 h-5" />;
      case 'governance':
        return <Landmark className="w-5 h-5" />;
      case 'candidate':
        return <GraduationCap className="w-5 h-5" />;
    }
  };

  return (
    <div 
      className="min-h-screen text-white flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans select-none relative overflow-x-hidden"
      style={{
        background: 'linear-gradient(165deg, #B85EFA 0%, #9C4DF8 45%, #7E35E6 85%, #722BDD 100%)'
      }}
    >
      {/* Background Soft Subtle Glow Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/3 w-[550px] h-[550px] bg-purple-300/15 blur-[130px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-indigo-400/15 blur-[110px] rounded-full" />
      </div>

      {/* Main 2-Column Section: Portal Box (Wider & Compact) + Seamless Large Hero Image */}
      <main className="relative z-10 max-w-7xl mx-auto w-full my-auto py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ===================================================================== */}
          {/* LEFT SIDE: LMI LOGO & BRANDING ON TOP + WIDE PORTAL BOX BELOW         */}
          {/* ===================================================================== */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-end justify-center">
            <div className="w-full max-w-[590px] flex flex-col space-y-3.5">
              
              {/* LMI BRANDING & LOGO (OUTSIDE & ON TOP OF THE PORTAL BOX) */}
              <div className="flex items-center space-x-3.5 pl-1">
                {/* LMI Logo Mark */}
                <div className="w-13 h-13 rounded-2xl bg-white shadow-xl shadow-purple-950/20 border border-white/90 p-2.5 flex items-center justify-center shrink-0">
                  <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="lmiGradHex" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#7E35E6" />
                        <stop offset="100%" stopColor="#2563EB" />
                      </linearGradient>
                      <linearGradient id="lmiCoreGrad" x1="12" y1="12" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#38BDF8" />
                        <stop offset="100%" stopColor="#0284C7" />
                      </linearGradient>
                    </defs>
                    {/* Hexagon Framework */}
                    <path d="M16 3L27 9.5V22.5L16 29L5 22.5V9.5L16 3Z" stroke="url(#lmiGradHex)" strokeWidth="2.5" strokeLinejoin="round" />
                    {/* Core Hub */}
                    <circle cx="16" cy="16" r="3.5" fill="url(#lmiCoreGrad)" />
                    {/* Connector Rays to the 3 Pillars */}
                    <path d="M16 6V12.5" stroke="url(#lmiGradHex)" strokeWidth="2" strokeLinecap="round" />
                    <path d="M24 21L18.5 17.5" stroke="url(#lmiGradHex)" strokeWidth="2" strokeLinecap="round" />
                    <path d="M8 21L13.5 17.5" stroke="url(#lmiGradHex)" strokeWidth="2" strokeLinecap="round" />
                    {/* 3 Pillar Color Nodes: Amber=Industry, Cyan/Blue=Governance, Green=Candidate */}
                    <circle cx="16" cy="6" r="2.2" fill="#F59E0B" />
                    <circle cx="24.5" cy="21" r="2.2" fill="#10B981" />
                    <circle cx="7.5" cy="21" r="2.2" fill="#3B82F6" />
                  </svg>
                </div>

                {/* Typography */}
                <div>
                  <div className="flex items-center gap-2.5">
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none drop-shadow-xs">
                      LMI-CAP
                    </h1>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white backdrop-blur-sm border border-white/30 shadow-xs">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      Multi-Tenant Architecture
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-purple-100 font-medium mt-1 leading-snug drop-shadow-xs">
                    Labour-Market Intelligence &amp; Curriculum Alignment Platform
                  </p>
                </div>
              </div>

              {/* THE WHITE PORTAL BOX (CONTAINS ONLY THE THREE PORTAL CARDS) */}
              <div className="w-full bg-white text-slate-900 rounded-3xl p-5 sm:p-6 shadow-2xl border border-white/60 flex flex-col justify-between space-y-3">
                
                {/* The 3 Portals - Horizontal Row Layout (Wider, Not Lengthier) */}
                <div className="space-y-3">
                  {portalKeys.map((key) => {
                    const portal = PORTALS[key];
                    const theme = getPortalTheme(key);
                    const isHovered = hoveredPortal === key;

                    return (
                      <div
                        key={portal.id}
                        onMouseEnter={() => setHoveredPortal(key)}
                        onMouseLeave={() => setHoveredPortal(null)}
                        onClick={() => onSelectPortal(portal.id)}
                        className={`group relative bg-white hover:bg-slate-50/80 rounded-2xl p-3.5 sm:p-4 border border-slate-200/90 transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 sm:gap-4 ${theme.hoverBorder} ${
                          isHovered ? 'shadow-md -translate-y-0.5' : ''
                        }`}
                      >
                        {/* Left: Icon & Title/Details */}
                        <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
                          <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl border flex items-center justify-center shrink-0 transition-colors duration-200 ${theme.iconContainer}`}>
                            {renderPortalIcon(portal.id)}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${theme.badgeClass}`}>
                                {portal.badge}
                              </span>
                            </div>
                            <h2 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                              {portal.name}
                            </h2>
                            <p className="text-[11px] text-slate-500 font-normal line-clamp-1 mt-0.5">
                              {portal.description}
                            </p>
                          </div>
                        </div>

                        {/* Right: Action Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectPortal(portal.id);
                          }}
                          className={`shrink-0 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap shadow-xs hover:shadow ${theme.buttonClass}`}
                        >
                          <span>{portal.buttonText}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom note inside the left box */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5 font-medium text-slate-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Unified SSO with RBAC
                  </span>
                  <span className="font-mono text-[10px]">v2.4.0-stable</span>
                </div>

              </div>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* RIGHT SIDE: LARGE HERO IMAGE (NO BOX, NO CARD BORDER, NO SHADOW)       */}
          {/* ===================================================================== */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-start p-2">
            <div className="relative w-full max-w-[620px] group">
              <img 
                src="/three_portals_hero_nobox.png" 
                alt="Industry, Governance, and Candidate Portals" 
                className="w-full h-auto object-contain select-none pointer-events-none transition-transform duration-300 group-hover:scale-[1.01]"
              />

              {/* Clickable Hotspots on the 3 Circles for instant navigation */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* 1. Industry Hotspot */}
                <button
                  type="button"
                  onClick={() => onSelectPortal('industry')}
                  className="pointer-events-auto absolute top-[18%] left-[23%] w-24 h-24 rounded-full bg-transparent hover:bg-amber-500/20 border-2 border-transparent hover:border-amber-400 transition-all cursor-pointer"
                  title="Launch Industry & Employer Portal"
                >
                  <span className="sr-only">Industry & Employer</span>
                </button>

                {/* 2. Governance Hotspot */}
                <button
                  type="button"
                  onClick={() => onSelectPortal('governance')}
                  className="pointer-events-auto absolute top-[18%] left-[42%] w-24 h-24 rounded-full bg-transparent hover:bg-indigo-500/20 border-2 border-transparent hover:border-indigo-400 transition-all cursor-pointer"
                  title="Launch Governance & Planning Console"
                >
                  <span className="sr-only">Governance & Planning</span>
                </button>

                {/* 3. Candidate & Employee Hotspot */}
                <button
                  type="button"
                  onClick={() => onSelectPortal('candidate')}
                  className="pointer-events-auto absolute top-[18%] left-[61%] w-24 h-24 rounded-full bg-transparent hover:bg-cyan-500/20 border-2 border-transparent hover:border-cyan-400 transition-all cursor-pointer"
                  title="Launch Candidate & Trainee Portal"
                >
                  <span className="sr-only">Candidate & Employee</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Clean Subtle Footer */}
      <footer className="relative z-10 max-w-5xl mx-auto w-full pt-2 flex flex-col sm:flex-row items-center justify-between text-[11px] text-purple-200/75 gap-2">
        <p className="font-medium text-center sm:text-left">
          LMI-CAP Platform • Labour-Market Intelligence & Curriculum Alignment
        </p>

        <div className="flex items-center space-x-1.5 font-bold uppercase tracking-wider text-purple-100 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10 text-[10px]">
          <span>Learn</span>
          <span>•</span>
          <span>Connect</span>
          <span>•</span>
          <span>Collaborate</span>
          <span>•</span>
          <span className="text-amber-300">Grow</span>
        </div>
      </footer>

    </div>
  );
};
