import React from 'react';
import { Compass, Plus } from 'lucide-react';

export const TopLocalTradesView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Clean Section Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900">
          Top Local Trades
        </h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          High-paying courses near you
        </p>
      </div>

      {/* Empty Surface Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-10 min-h-[420px] flex flex-col items-center justify-center text-center shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
          <Compass className="w-7 h-7" />
        </div>
        <h2 className="text-base font-bold text-slate-700">
          Ready to configure Top Local Trades
        </h2>
        <p className="text-xs text-slate-400 mt-1 mb-6 max-w-sm">
          Discover high-yield vocational trades in your region offering competitive starting salaries and verified placements.
        </p>
        <button
          type="button"
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>+ Configure New Entry</span>
        </button>
      </div>
    </div>
  );
};
