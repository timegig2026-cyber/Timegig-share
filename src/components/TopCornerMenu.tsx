import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  KeyRound, 
  Search, 
  Briefcase, 
  Building2, 
  ShieldCheck, 
  User, 
  Sparkles, 
  ChevronRight,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { TabType } from '../types';
import { loadLiveState } from '../store/liveStore';

interface TopCornerMenuProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  showTenantTab?: boolean;
}

export const TopCornerMenu: React.FC<TopCornerMenuProps> = ({
  activeTab,
  onSelectTab,
  showTenantTab = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const liveState = loadLiveState();

  const handleNav = (tab: TabType) => {
    onSelectTab(tab);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating 3-bar menu button at top-left corner */}
      <div className="fixed top-3 left-3 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md text-slate-800 flex items-center justify-center shadow-[0_3px_12px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] border border-slate-200/90 hover:bg-white active:scale-90 transition-all cursor-pointer"
          title="Menu"
          aria-label="Open Navigation Menu"
        >
          {isOpen ? (
            <X className="w-5 h-5 text-slate-900" />
          ) : (
            <Menu className="w-5 h-5 text-slate-900 stroke-[2.2]" />
          )}
        </button>
      </div>

      {/* Slide-out Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 transition-opacity animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Drawer Menu */}
      <div 
        className={`fixed top-0 left-0 bottom-0 w-72 max-w-[85vw] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out border-r border-slate-200 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-indigo-500 to-indigo-700 text-white flex items-center justify-center font-black text-sm shadow-xs">
              TG
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 leading-tight">TimeGiG App</h3>
              <p className="text-[10.5px] text-slate-500 truncate max-w-[140px]">
                {liveState.currentSession.userEmail}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-lg hover:bg-slate-200/70 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-3 py-1.5">
            Main Features
          </div>

          {/* Activation */}
          <button
            type="button"
            onClick={() => handleNav('activation')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'activation'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <KeyRound className="w-4 h-4 text-amber-500" />
              <span>Activation</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          </button>

          {/* Seekers */}
          <button
            type="button"
            onClick={() => handleNav('seekers')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'seekers'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-sky-500" />
              <span>Seekers</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          </button>

          {/* GiGs */}
          <button
            type="button"
            onClick={() => handleNav('gigs')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'gigs'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Briefcase className="w-4 h-4 text-indigo-500" />
              <span>GiGs (Map Radar)</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          </button>

          {/* Tenant (if approved) */}
          {showTenantTab && (
            <button
              type="button"
              onClick={() => handleNav('tenant')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'tenant'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-amber-500" />
                <span>Tenant Dashboard</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>
          )}

          {/* Admin */}
          <button
            type="button"
            onClick={() => handleNav('admin')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'admin'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Admin Console</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          </button>
        </div>

        {/* Drawer Footer Status */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/70 text-xs text-slate-500">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium">Status</span>
            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Online
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
