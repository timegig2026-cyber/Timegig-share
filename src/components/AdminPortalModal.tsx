import React from 'react';
import { AdminView } from './AdminView';
import { AdminShareHub } from './AdminShareHub';
import { X, ShieldAlert } from 'lucide-react';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col overflow-hidden animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="w-full bg-slate-950 text-white px-4 py-3 flex items-center justify-between shadow-md border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-400 shadow-xs">
            <ShieldAlert className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className="text-sm font-black tracking-tight leading-none text-white flex items-center gap-1.5">
              <span>Admin Portal</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                Live
              </span>
            </h2>
            <span className="text-[10px] text-slate-400 font-semibold">
              Live Inflow, Profit Audit & Verification System
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer active:scale-95"
          aria-label="Close Admin Portal"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Admin Features with Live Online Active, Profit Balances & Admin Social Media Share Hub */}
      <div className="flex-1 w-full overflow-y-auto bg-slate-50 flex flex-col">
        {/* Admin Social Media Sharing Hub to Direct Users to Join and Earn */}
        <div className="w-full max-w-sm mx-auto px-4 pt-4">
          <AdminShareHub />
        </div>

        {/* Main Admin Features & Profit Balances */}
        <AdminView showProfitStats={true} />
      </div>
    </div>
  );
};
