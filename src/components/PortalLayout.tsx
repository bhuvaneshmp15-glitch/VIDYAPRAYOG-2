import React, { useState } from 'react';
import { 
  Building2, 
  Landmark, 
  GraduationCap, 
  ChevronDown, 
  ArrowLeft, 
  TrendingUp, 
  ClipboardCheck, 
  FileCheck2, 
  Award, 
  LayoutGrid, 
  Cpu, 
  AlertTriangle, 
  Wrench, 
  Activity, 
  Compass, 
  GitFork, 
  BadgeCheck, 
  LogOut, 
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import { PortalId, PortalConfig } from '../types/portal';
import { PORTALS } from '../data/mockData';

// Clean Section Views
import { JobDemandView } from '../dashboards/industry/JobDemandView';
import { SkillSurveysView } from '../dashboards/industry/SkillSurveysView';
import { SyllabusReviewView } from '../dashboards/industry/SyllabusReviewView';
import { GraduateRatingsView } from '../dashboards/industry/GraduateRatingsView';

import { DistrictSkillMapView } from '../dashboards/governance/DistrictSkillMapView';
import { SyllabusFixerView } from '../dashboards/governance/SyllabusFixerView';
import { OutdatedCoursesView } from '../dashboards/governance/OutdatedCoursesView';
import { DistrictLabBudgetsView } from '../dashboards/governance/DistrictLabBudgetsView';

import { SkillTestScoreView } from '../dashboards/candidate/SkillTestScoreView';
import { TopLocalTradesView } from '../dashboards/candidate/TopLocalTradesView';
import { CareerRoadmapView } from '../dashboards/candidate/CareerRoadmapView';
import { CertificatesJobsView } from '../dashboards/candidate/CertificatesJobsView';

interface PortalLayoutProps {
  currentPortalId: PortalId;
  onSelectPortal: (portalId: PortalId) => void;
  onReturnToHome: () => void;
}

export const PortalLayout: React.FC<PortalLayoutProps> = ({
  currentPortalId,
  onSelectPortal,
  onReturnToHome
}) => {
  const currentPortal: PortalConfig = PORTALS[currentPortalId];
  const [activeSectionId, setActiveSectionId] = useState<string>(currentPortal.sections[0].id);
  const [isPortalDropdownOpen, setIsPortalDropdownOpen] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // When portal changes, reset active section to first section of new portal
  const handleSwitchPortal = (newPortalId: PortalId) => {
    onSelectPortal(newPortalId);
    setActiveSectionId(PORTALS[newPortalId].sections[0].id);
    setIsPortalDropdownOpen(false);
    setIsMobileSidebarOpen(false);
  };

  // Helper to render exact Lucide icon
  const renderSectionIcon = (iconName: string) => {
    const iconClasses = "w-5 h-5 shrink-0";
    switch (iconName) {
      // Industry Portal Icons
      case 'TrendingUp':
        return <TrendingUp className={iconClasses} />;
      case 'ClipboardCheck':
        return <ClipboardCheck className={iconClasses} />;
      case 'FileCheck2':
        return <FileCheck2 className={iconClasses} />;
      case 'Award':
        return <Award className={iconClasses} />;

      // Governance Portal Icons
      case 'LayoutGrid':
        return <LayoutGrid className={iconClasses} />;
      case 'Cpu':
        return <Cpu className={iconClasses} />;
      case 'AlertTriangle':
        return <AlertTriangle className={iconClasses} />;
      case 'Wrench':
        return <Wrench className={iconClasses} />;

      // Candidate Portal Icons
      case 'Activity':
        return <Activity className={iconClasses} />;
      case 'Compass':
        return <Compass className={iconClasses} />;
      case 'GitFork':
        return <GitFork className={iconClasses} />;
      case 'BadgeCheck':
        return <BadgeCheck className={iconClasses} />;

      default:
        return <Sparkles className={iconClasses} />;
    }
  };

  // Styling matching exact rules
  const getActiveTabClass = (portalId: PortalId) => {
    switch (portalId) {
      case 'industry':
        return 'bg-slate-100 text-slate-900 font-bold rounded-xl px-4 py-3 border-l-4 border-blue-600 shadow-2xs';
      case 'governance':
        return 'bg-slate-100 text-slate-900 font-bold rounded-xl px-4 py-3 border-l-4 border-indigo-600 shadow-2xs';
      case 'candidate':
        return 'bg-slate-100 text-slate-900 font-bold rounded-xl px-4 py-3 border-l-4 border-emerald-600 shadow-2xs';
    }
  };

  // Render the active section component
  const renderActiveSectionContent = () => {
    switch (currentPortalId) {
      case 'industry':
        switch (activeSectionId) {
          case 'job-demand':
            return <JobDemandView />;
          case 'skill-surveys':
            return <SkillSurveysView />;
          case 'syllabus-review':
            return <SyllabusReviewView />;
          case 'graduate-ratings':
            return <GraduateRatingsView />;
          default:
            return <JobDemandView />;
        }

      case 'governance':
        switch (activeSectionId) {
          case 'district-map':
            return <DistrictSkillMapView />;
          case 'syllabus-fixer':
            return <SyllabusFixerView />;
          case 'outdated-courses':
            return <OutdatedCoursesView />;
          case 'district-budgets':
            return <DistrictLabBudgetsView />;
          default:
            return <DistrictSkillMapView />;
        }

      case 'candidate':
        switch (activeSectionId) {
          case 'skill-test':
            return <SkillTestScoreView />;
          case 'local-trades':
            return <TopLocalTradesView />;
          case 'career-roadmap':
            return <CareerRoadmapView />;
          case 'certificates-jobs':
            return <CertificatesJobsView />;
          default:
            return <SkillTestScoreView />;
        }
    }
  };

  const currentSection = currentPortal.sections.find(s => s.id === activeSectionId) || currentPortal.sections[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans antialiased text-slate-900">
      
      {/* MOBILE SIDEBAR BACKDROP */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* PERSISTENT LEFT SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 lg:static
        w-64 bg-white border-r border-slate-200 min-h-screen p-4 flex flex-col justify-between
        transform transition-transform duration-200 ease-in-out
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Top Sidebar Content */}
        <div>
          {/* Brand Logo & Home Return */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <button 
              onClick={onReturnToHome}
              className="flex items-center space-x-2.5 text-left group"
              title="Return to Portal Landing Page"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-sm shadow-2xs group-hover:bg-blue-600 transition-colors">
                LM
              </div>
              <div>
                <span className="text-sm font-black text-slate-900 tracking-tight block">LMI-CAP</span>
                <span className="text-[10px] text-slate-400 font-medium block">Labour-Market Platform</span>
              </div>
            </button>

            {/* Mobile close button */}
            <button 
              onClick={() => setIsMobileSidebarOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Switch Portal Dropdown Trigger */}
          <div className="relative my-4">
            <button
              onClick={() => setIsPortalDropdownOpen(!isPortalDropdownOpen)}
              className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors"
            >
              <div className="flex items-center space-x-2 truncate pr-2">
                <span className="text-[11px] text-slate-400 font-normal">Tenant:</span>
                <span className="truncate text-slate-900">{currentPortal.shortName}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isPortalDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu for Switching Portals */}
            {isPortalDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-elevated p-2 z-50 space-y-1 animate-fadeIn">
                <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Switch Active Portal
                </div>

                {(['industry', 'governance', 'candidate'] as PortalId[]).map((pId) => {
                  const p = PORTALS[pId];
                  const isCurrent = pId === currentPortalId;
                  return (
                    <button
                      key={pId}
                      onClick={() => handleSwitchPortal(pId)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-colors text-left ${
                        isCurrent 
                          ? 'bg-slate-100 font-bold text-slate-900' 
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span className="truncate">{p.name}</span>
                      {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />}
                    </button>
                  );
                })}

                <div className="pt-1 mt-1 border-t border-slate-100">
                  <button
                    onClick={onReturnToHome}
                    className="w-full flex items-center space-x-1.5 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Return to Landing Page</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Current Active Portal Indicator Badge */}
          <div className="mb-4">
            <div className={`p-3 rounded-xl border ${currentPortal.theme.badgeBg} ${currentPortal.theme.badgeBorder} ${currentPortal.theme.badgeText}`}>
              <span className="text-[10px] font-bold uppercase tracking-wider block opacity-75">
                Active Environment
              </span>
              <div className="text-xs font-black tracking-tight mt-0.5">
                {currentPortal.name}
              </div>
              <span className="text-[10px] font-semibold opacity-90 block mt-0.5">
                {currentPortal.badge}
              </span>
            </div>
          </div>

          {/* Section Links: Rendered vertically one by one without truncation */}
          <nav className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-1">
              Navigation
            </span>

            {currentPortal.sections.map((section) => {
              const isActive = activeSectionId === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSectionId(section.id);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 text-left transition-all ${
                    isActive
                      ? getActiveTabClass(currentPortalId)
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl px-4 py-3 font-medium transition-all'
                  }`}
                >
                  {renderSectionIcon(section.iconName)}
                  <span className="text-xs leading-normal font-inherit whitespace-normal">
                    {section.title}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Tenant Context & Logout */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Tenant Session</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
            <p className="font-bold text-slate-900 truncate">{currentPortal.defaultTenantName}</p>
            <p className="text-[11px] text-slate-500 truncate">{currentPortal.tenantRole}</p>
          </div>

          <button
            onClick={onReturnToHome}
            className="w-full flex items-center justify-center space-x-2 py-2 text-xs font-bold text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Switch Portal / Exit</span>
          </button>
        </div>
      </aside>

      {/* MAIN WRAPPER: Top Bar + Main Canvas Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-5 py-3.5 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-3">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumbs */}
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-slate-400">{currentPortal.shortName}</span>
              <span className="text-slate-300">/</span>
              <span className="font-bold text-slate-900">{currentSection.title}</span>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center space-x-3">
            <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5 animate-pulse"></span>
              Live Grid: 766 Districts
            </span>

            <button
              onClick={() => setIsPortalDropdownOpen(!isPortalDropdownOpen)}
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <span>Switch Portal</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              {currentPortalId.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Main Canvas Area */}
        <main className="flex-1 p-3 sm:p-5 lg:p-6 max-w-5xl w-full mx-auto">
          {renderActiveSectionContent()}
        </main>

        {/* Canvas Footer */}
        <footer className="p-4 border-t border-slate-200 text-center text-xs text-slate-400">
          LMI-CAP Platform • Smart India Hackathon PS134 • National Skill Development Framework
        </footer>
      </div>

    </div>
  );
};
