import React from 'react';
import { ShieldCheck, ArrowLeft, TrendingUp, Building, User } from 'lucide-react';
import { LiveAppState } from '../store/liveStore';
import { TabType } from '../types';

interface TopBarProps {
  store: LiveAppState;
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ 
  store, 
  activeTab,
  onSelectTab 
}) => {
  const isAdminActive = activeTab === 'admin';
  const pendingCount = (store.tenantPoPs || []).filter(p => p.status === 'pending').length +
                       (store.userPoPs || []).filter(p => p.status === 'pending').length;

  const approvedTenants = (store.tenantPoPs || []).filter(p => p.status === 'approved').length;
  const approvedUsers = (store.userPoPs || []).filter(p => p.status === 'approved').length;
  const activeTenants = 87 + approvedTenants;
  const activeUsers = 142 + approvedUsers;
  const tenantProfit = activeTenants * 299.99;
  const userProfit = activeUsers * 29.99;

  const formatShortZAR = (val: number) => {
    return `R${val.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleAdminClick = () => {
    if (isAdminActive) {
      onSelectTab('activation');
    } else {
      onSelectTab('admin');
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-slate-100/90 px-3.5 py-2 flex items-center justify-between shadow-2xs">
      
      {/* If Admin is active: Show Quick Profit & Active Online Ticker on the left */}
      {isAdminActive ? (
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden mr-2">
          {/* Active Online Ticker */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-900 text-white text-[10px] shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-bold text-amber-300 flex items-center gap-0.5">
              <Building className="w-2.5 h-2.5" />
              {activeTenants}
            </span>
            <span className="text-slate-500">|</span>
            <span className="font-bold text-indigo-300 flex items-center gap-0.5">
              <User className="w-2.5 h-2.5" />
              {activeUsers}
            </span>
          </div>

          {/* Quick Profits */}
          <div className="flex items-center gap-1 text-[9.5px] font-bold">
            <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
              T: {formatShortZAR(tenantProfit)}
            </span>
            <span className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-900 border border-indigo-200">
              U: {formatShortZAR(userProfit)}
            </span>
          </div>
        </div>
      ) : (
        <div />
      )}

      {/* =================================================================== */}
      {/* ADMIN FLOATING BUTTON IN TOP CORNER                                 */}
      {/* =================================================================== */}
      <div className="relative shrink-0">
        <button
          type="button"
          onClick={handleAdminClick}
          className={`group relative flex items-center gap-2 pl-2 pr-3.5 py-1.5 rounded-full text-xs font-black transition-all duration-200 cursor-pointer border select-none ${
            isAdminActive
              ? 'bg-slate-900 text-white border-slate-800 shadow-[0_4px_12px_rgba(0,0,0,0.25)]'
              : 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white shadow-[0_6px_16px_rgba(16,185,129,0.38)] hover:shadow-[0_10px_22px_rgba(16,185,129,0.5)] hover:-translate-y-0.5 active:translate-y-0.5 border-emerald-400/80'
          }`}
          title={isAdminActive ? 'Exit Admin View' : 'Open Admin Feature'}
        >
          {/* Tactical Admin Icon */}
          <div className="relative flex items-center justify-center">
            {isAdminActive ? (
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                <ArrowLeft className="w-3.5 h-3.5 text-white" />
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-100" />
              </div>
            )}

            {/* Illuminated Emerald LED Indicator Dot */}
            <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)] border border-white" />
          </div>

          {/* Button Text */}
          <div className="flex flex-col text-left">
            <span className="leading-tight tracking-tight drop-shadow-[0_0.5px_1px_rgba(0,0,0,0.2)]">
              {isAdminActive ? 'Exit Admin' : 'Admin'}
            </span>
            <span className="text-[8.5px] font-bold text-emerald-100/90 leading-none">
              {isAdminActive ? 'Back to App' : 'Control Hub'}
            </span>
          </div>

          {/* Pending Notification Badge if any proofs await review */}
          {pendingCount > 0 && !isAdminActive && (
            <span className="ml-1 px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[9px] font-black shadow-xs animate-pulse">
              {pendingCount}
            </span>
          )}

          {/* Floating Subtle Glow Aura when not in Admin */}
          {!isAdminActive && (
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-white" />
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
