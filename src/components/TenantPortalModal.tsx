import React from 'react';
import { AdminView } from './AdminView';
import { TenantShareWidget } from './TenantShareWidget';
import { X, Building } from 'lucide-react';

interface TenantPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  portalType?: 'tenant' | 'user';
}

export const TenantPortalModal: React.FC<TenantPortalModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col overflow-hidden animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="w-full bg-slate-900 text-white px-4 py-3 flex items-center justify-between shadow-md border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
            <Building className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className="text-sm font-black tracking-tight leading-none text-white">
              Tenant Portal
            </h2>
            <span className="text-[10px] text-amber-300 font-bold">
              Admin Features & Partner Network
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer active:scale-95"
          aria-label="Close Portal"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full overflow-y-auto bg-slate-50 flex flex-col">
        {/* Tenant Exclusive Share Link & Capacity Limits (10 Tenants & 100 Users) */}
        <div className="w-full max-w-md mx-auto px-4 pt-4">
          <TenantShareWidget />
        </div>

        {/* Main Admin Features (Profit balances hidden for tenant portal - only in admin) */}
        <AdminView showProfitStats={false} />
      </div>
    </div>
  );
};
