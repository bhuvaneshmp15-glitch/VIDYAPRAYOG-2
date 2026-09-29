import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  MapPin, 
  Sparkles, 
  Check, 
  X, 
  TrendingUp, 
  Briefcase,
  Layers,
  ArrowRight,
  RefreshCw,
  Activity
} from 'lucide-react';

interface JobItem {
  id: string;
  role: string;
  stream: string;
  nsqfLevel: string;
  location: string;
  openings: number;
  salary: string;
  skills: string[];
  isLive: boolean;
}

const DEFAULT_JOBS: JobItem[] = [
  {
    id: 'job-default-1',
    role: 'GenAI & RAG Applications Engineer',
    stream: 'AI & DS / AIML',
    nsqfLevel: 'NSQF Level 6',
    location: 'Chennai (OMR IT Corridor)',
    openings: 35,
    salary: '₹40,000 – ₹60,000 / mo',
    skills: ['LangChain', 'PyTorch', 'Vector DBs', 'FastAPI', 'Docker'],
    isLive: true
  }
];

export const JobDemandView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'telemetry' | 'requisitions'>('telemetry');
  const [jobs, setJobs] = useState<JobItem[]>(DEFAULT_JOBS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStream, setSelectedStream] = useState<'All' | 'AI & DS' | 'AIML' | 'CSE' | 'IT'>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [isSyncing, setIsSyncing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSyncFeeds = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setToastMessage('Live feeds synchronized with National Labor Exchange & partner portals');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 600);
  };

  // Form states for "+ Post New Job" modal
  const [roleTitle, setRoleTitle] = useState('');
  const [stream, setStream] = useState<'CSE' | 'IT' | 'AI & DS' | 'AIML'>('AI & DS');
  const [location, setLocation] = useState('Bengaluru Urban');
  const [salaryRange, setSalaryRange] = useState('₹35,000 – ₹50,000 / mo');
  const [openingsCount, setOpeningsCount] = useState('20');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Python', 'Docker']);

  const availableTags = ['React', 'Docker', 'Python', 'PyTorch', 'Kubernetes', 'FastAPI', 'Vector DBs', 'TypeScript'];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handlePublishJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleTitle.trim()) return;

    const newJob: JobItem = {
      id: `job-${Date.now()}`,
      role: roleTitle.trim(),
      stream: stream,
      nsqfLevel: 'NSQF Level 6',
      location: location,
      openings: parseInt(openingsCount, 10) || 10,
      salary: salaryRange,
      skills: selectedTags.length > 0 ? selectedTags : ['Cloud Systems', 'CI/CD'],
      isLive: true
    };

    setJobs(prevJobs => [...prevJobs, newJob]);
    setIsModalOpen(false);
    setToastMessage(`Requisition for "${roleTitle}" published live!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);

    // Reset fields
    setRoleTitle('');
    setSelectedTags(['Python', 'Docker']);
  };

  // Filter logic
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStream = 
      selectedStream === 'All' ||
      job.stream.includes(selectedStream);

    const matchesLocation = 
      selectedLocation === 'All' ||
      job.location.toLowerCase().includes(selectedLocation.toLowerCase());

    const matchesLevel = 
      selectedLevel === 'All' ||
      job.nsqfLevel.toLowerCase().includes(selectedLevel.toLowerCase());

    return matchesSearch && matchesStream && matchesLocation && matchesLevel;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center space-x-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Clean Section Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Job Demand & Postings
        </h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Live job feeds and open vacancies
        </p>
      </div>

      {/* Persistent Sub-Heading Navigation Bar */}
      <div className="border-b border-slate-200 mb-6">
        <nav className="flex space-x-8 overflow-x-auto" aria-label="Sub-navigation">
          <button
            type="button"
            onClick={() => setActiveSection('telemetry')}
            className={`py-3.5 px-1 border-b-2 text-sm transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeSection === 'telemetry'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Demand Telemetry & National Overview</span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                activeSection === 'telemetry'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              18,450 Live Jobs
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('requisitions')}
            className={`py-3.5 px-1 border-b-2 text-sm transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeSection === 'requisitions'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Cluster Requisitions & Search</span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                activeSection === 'requisitions'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              Active Postings
            </span>
          </button>
        </nav>
      </div>

      {/* Sub-Heading 1: Demand Telemetry & National Overview */}
      {activeSection === 'telemetry' && (
        <div className="animate-in fade-in duration-200">
          {/* 1. TOP SECTION: 3D-Effect Bar Graph + Right-Side Explainer (50/50 Grid) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: 3D Animated Bar Chart */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Demand Telemetry</span>
              <h2 className="text-base font-bold text-slate-900 mt-0.5">Tech Hiring Signals by Stream</h2>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
              Live Q3 Index
            </span>
          </div>

          {/* 3D Cylindrical Bar Chart Container */}
          <div className="my-6 px-4">
            <div className="h-52 flex items-end justify-between gap-6 relative">
              
              {/* Grid guide lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-30">
                <div className="border-b border-dashed border-slate-300 w-full" />
                <div className="border-b border-dashed border-slate-300 w-full" />
                <div className="border-b border-dashed border-slate-300 w-full" />
                <div className="border-b border-slate-200 w-full" />
              </div>

              {/* Bar 1: AI & DS (5,400 vacancies) - Royal Blue */}
              <div className="flex-1 flex flex-col items-center h-full justify-end z-10 group cursor-pointer">
                <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md mb-2 shadow-xs group-hover:-translate-y-1 transition-transform">
                  5,400
                </span>
                <div className="w-full max-w-[54px] flex flex-col items-center group-hover:-translate-y-1.5 transition-transform duration-200">
                  {/* Cylinder Top Ellipse */}
                  <div 
                    className="w-full h-3 rounded-[50%] z-20 shadow-xs"
                    style={{
                      background: 'linear-gradient(180deg, #93C5FD 0%, #3B82F6 100%)',
                    }}
                  />
                  {/* Cylinder Body */}
                  <div 
                    className="w-full -mt-1.5 rounded-b-lg shadow-md"
                    style={{
                      height: '142px',
                      background: 'linear-gradient(90deg, #1D4ED8 0%, #3B82F6 35%, #60A5FA 65%, #1E40AF 100%)',
                      boxShadow: '0 8px 16px -4px rgba(37, 99, 235, 0.35)'
                    }}
                  />
                  {/* 3D Base Shadow */}
                  <div className="w-4/5 h-2 rounded-[50%] bg-blue-900/20 blur-[2px] -mt-1" />
                </div>
                <span className="text-xs font-bold text-slate-800 mt-2.5">AI & DS</span>
              </div>

              {/* Bar 2: AI & ML (4,900 vacancies) - Purple/Indigo */}
              <div className="flex-1 flex flex-col items-center h-full justify-end z-10 group cursor-pointer">
                <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md mb-2 shadow-xs group-hover:-translate-y-1 transition-transform">
                  4,900
                </span>
                <div className="w-full max-w-[54px] flex flex-col items-center group-hover:-translate-y-1.5 transition-transform duration-200">
                  {/* Cylinder Top Ellipse */}
                  <div 
                    className="w-full h-3 rounded-[50%] z-20 shadow-xs"
                    style={{
                      background: 'linear-gradient(180deg, #C4B5FD 0%, #6366F1 100%)',
                    }}
                  />
                  {/* Cylinder Body */}
                  <div 
                    className="w-full -mt-1.5 rounded-b-lg shadow-md"
                    style={{
                      height: '128px',
                      background: 'linear-gradient(90deg, #4338CA 0%, #6366F1 35%, #818CF8 65%, #3730A3 100%)',
                      boxShadow: '0 8px 16px -4px rgba(99, 102, 241, 0.35)'
                    }}
                  />
                  {/* 3D Base Shadow */}
                  <div className="w-4/5 h-2 rounded-[50%] bg-indigo-900/20 blur-[2px] -mt-1" />
                </div>
                <span className="text-xs font-bold text-slate-800 mt-2.5">AIML</span>
              </div>

              {/* Bar 3: CSE (4,350 vacancies) - Cyan/Sky */}
              <div className="flex-1 flex flex-col items-center h-full justify-end z-10 group cursor-pointer">
                <span className="text-xs font-extrabold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md mb-2 shadow-xs group-hover:-translate-y-1 transition-transform">
                  4,350
                </span>
                <div className="w-full max-w-[54px] flex flex-col items-center group-hover:-translate-y-1.5 transition-transform duration-200">
                  {/* Cylinder Top Ellipse */}
                  <div 
                    className="w-full h-3 rounded-[50%] z-20 shadow-xs"
                    style={{
                      background: 'linear-gradient(180deg, #BAE6FD 0%, #0EA5E9 100%)',
                    }}
                  />
                  {/* Cylinder Body */}
                  <div 
                    className="w-full -mt-1.5 rounded-b-lg shadow-md"
                    style={{
                      height: '112px',
                      background: 'linear-gradient(90deg, #0369A1 0%, #0EA5E9 35%, #38BDF8 65%, #075985 100%)',
                      boxShadow: '0 8px 16px -4px rgba(14, 165, 233, 0.35)'
                    }}
                  />
                  {/* 3D Base Shadow */}
                  <div className="w-4/5 h-2 rounded-[50%] bg-sky-900/20 blur-[2px] -mt-1" />
                </div>
                <span className="text-xs font-bold text-slate-800 mt-2.5">CSE</span>
              </div>

              {/* Bar 4: IT (3,800 vacancies) - Emerald */}
              <div className="flex-1 flex flex-col items-center h-full justify-end z-10 group cursor-pointer">
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md mb-2 shadow-xs group-hover:-translate-y-1 transition-transform">
                  3,800
                </span>
                <div className="w-full max-w-[54px] flex flex-col items-center group-hover:-translate-y-1.5 transition-transform duration-200">
                  {/* Cylinder Top Ellipse */}
                  <div 
                    className="w-full h-3 rounded-[50%] z-20 shadow-xs"
                    style={{
                      background: 'linear-gradient(180deg, #A7F3D0 0%, #10B981 100%)',
                    }}
                  />
                  {/* Cylinder Body */}
                  <div 
                    className="w-full -mt-1.5 rounded-b-lg shadow-md"
                    style={{
                      height: '96px',
                      background: 'linear-gradient(90deg, #047857 0%, #10B981 35%, #34D399 65%, #065F46 100%)',
                      boxShadow: '0 8px 16px -4px rgba(16, 185, 129, 0.35)'
                    }}
                  />
                  {/* 3D Base Shadow */}
                  <div className="w-4/5 h-2 rounded-[50%] bg-emerald-900/20 blur-[2px] -mt-1" />
                </div>
                <span className="text-xs font-bold text-slate-800 mt-2.5">IT</span>
              </div>

            </div>
          </div>

          <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-100">
            <span>Hover cylinders to inspect depth profile</span>
            <span className="font-mono text-slate-500">Live Ingested Feed</span>
          </div>
        </div>

        {/* Right Column: Clean Metrics Breakdown (Zero Paragraphs) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">National Tech Demand Overview</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 inline-flex items-center">
                AI & DS (+24% Spike)
              </span>
            </div>

            <div className="my-5 space-y-5">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Total Openings
                </span>
                <div className="text-3xl font-black text-slate-900 mt-0.5">
                  18,450 Live Jobs
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-400 block">Top Shortage Field</span>
                  <strong className="text-sm font-bold text-slate-800 block mt-0.5">Generative AI & LLM Systems</strong>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-400 block">Avg Entry Salary</span>
                  <strong className="text-sm font-bold text-slate-800 block mt-0.5">₹35,000 – ₹48,000 / mo</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 font-semibold text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
              <span>Live Sync (LinkedIn • Naukri • Exchanges)</span>
            </div>
            <span className="font-mono text-[11px] text-slate-400">99.8% Sync Health</span>
          </div>
        </div>

      </div>
    </div>
  )}

      {/* Sub-Heading 2: Cluster Requisitions & Search */}
      {activeSection === 'requisitions' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* 2. MIDDLE SECTION: Unified Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
        
        {/* Left Group (Search & Parameter Dropdowns) */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Input */}
          <div className="relative w-60">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search role or skill..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Location / District Filter */}
          <div className="relative">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="text-xs font-semibold bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer transition-colors"
              title="Filter by District / Location"
            >
              <option value="All">All Locations</option>
              <option value="Bengaluru">Bengaluru Urban</option>
              <option value="Chennai">Chennai (OMR)</option>
              <option value="Hyderabad">Hyderabad HITEC</option>
              <option value="Pune">Pune Cluster</option>
              <option value="Delhi NCR">Delhi NCR</option>
            </select>
          </div>

          {/* Proficiency / NSQF Level Filter */}
          <div className="relative">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="text-xs font-semibold bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer transition-colors"
              title="Filter by NSQF Proficiency Level"
            >
              <option value="All">All NSQF Levels</option>
              <option value="Level 4">NSQF Level 4</option>
              <option value="Level 5">NSQF Level 5</option>
              <option value="Level 6">NSQF Level 6</option>
              <option value="Level 7">NSQF Level 7</option>
            </select>
          </div>
        </div>

        {/* Center Group (Tech Stream Pills) */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          {(['All', 'AI & DS', 'AIML', 'CSE', 'IT'] as const).map((streamItem) => {
            const isActive = selectedStream === streamItem;
            return (
              <button
                key={streamItem}
                type="button"
                onClick={() => setSelectedStream(streamItem)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {streamItem}
              </button>
            );
          })}
        </div>

        {/* Right Group (Feed Counter, Sync Action & Post Button) */}
        <div className="flex items-center gap-3">
          {/* Requisition Counter */}
          <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
            Showing {filteredJobs.length} active requisition{filteredJobs.length === 1 ? '' : 's'}
          </span>

          {/* Sync Button */}
          <button
            type="button"
            onClick={handleSyncFeeds}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors active:scale-95"
            title="Sync live feeds from National Labor Exchange"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isSyncing ? 'animate-spin text-blue-600' : ''}`} />
            <span>Sync Feeds</span>
          </button>

          {/* Primary Action Button */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-1.5 rounded-lg shadow-xs hover:shadow transition-all shrink-0 active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Post New Job</span>
          </button>
        </div>

      </div>

      {/* 3. BOTTOM SECTION: Showcase Card + Dynamic Job Append */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-500 text-xs">
            No job requisitions found matching your filter. Click <strong>"Post New Job"</strong> to publish one.
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-5"
            >
              <div className="space-y-2.5">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {job.stream}
                  </span>
                  <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {job.nsqfLevel}
                  </span>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live
                  </span>
                </div>

                {/* Role Title */}
                <h3 className="text-lg font-black text-slate-900 leading-snug">
                  {job.role}
                </h3>

                {/* Meta Row */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600">
                  <span className="flex items-center gap-1 text-slate-700 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {job.location}
                  </span>
                  <span>•</span>
                  <span>{job.openings} Openings</span>
                  <span>•</span>
                  <span className="font-bold text-slate-800">{job.salary}</span>
                </div>

                {/* Skill Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-lg text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Action Button */}
              <div className="shrink-0 sm:self-center">
                <button
                  type="button"
                  className="w-full sm:w-auto border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold px-4 py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center space-x-1"
                >
                  <span>Review Candidates</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )}

      {/* 4. INTERACTIVE "+ Post New Job" MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-xl animate-fadeIn">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Post New Tech Requisition</h3>
                <p className="text-xs text-slate-500">Add openings to live national telemetry feeds</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handlePublishJob} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Role Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Cloud DevOps Associate"
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Stream</label>
                  <select
                    value={stream}
                    onChange={(e) => setStream(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="AI & DS">AI & DS</option>
                    <option value="AIML">AIML</option>
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Location</label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Bengaluru Urban">Bengaluru Urban</option>
                    <option value="Chennai OMR">Chennai OMR</option>
                    <option value="Hyderabad HITEC">Hyderabad HITEC</option>
                    <option value="Pune">Pune</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Salary Range</label>
                  <input
                    type="text"
                    value={salaryRange}
                    onChange={(e) => setSalaryRange(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Openings Count</label>
                  <input
                    type="number"
                    min="1"
                    value={openingsCount}
                    onChange={(e) => setOpeningsCount(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              {/* Clickable Tech Stack Tags */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Select Tech Stack Chips (Click to toggle)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {availableTags.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        type="button"
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                          isSelected
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {isSelected ? `✓ ${tag}` : `+ ${tag}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
                >
                  Publish Requisition →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
