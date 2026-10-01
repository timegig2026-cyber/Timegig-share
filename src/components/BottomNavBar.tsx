import React from 'react';
import { TabType } from '../types';
import { 
  ActivationGadget4D, 
  GigsGadget4D 
} from './FourDIcons';
import { Building, UserCheck } from 'lucide-react';

interface BottomNavBarProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  portalType: 'tenant' | 'user';
  onOpenPortal: () => void;
  isPortalOpen?: boolean;
  profilePicUrl?: string;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onSelectTab,
  portalType,
  onOpenPortal,
  isPortalOpen = false,
  profilePicUrl,
}) => {
  const isTenant = portalType === 'tenant';

  return (
    <nav
      aria-label="Bottom Navigation Menu"
      className="fixed bottom-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
    >
      <div className="w-full max-w-md mx-auto flex items-center justify-around h-16 px-4">
        
        {/* 1. Activation Feature (Vibrant Amber/Gold Colors Stays On) */}
        <button
          type="button"
          onClick={() => onSelectTab('activation')}
          className="group flex-1 flex flex-col items-center justify-center transition-all select-none cursor-pointer bg-transparent border-none h-full py-1 active:scale-95"
          aria-label="Activation Feature"
        >
          <ActivationGadget4D isActive={activeTab === 'activation' && !isPortalOpen} />
          <span
            className={`text-[10.5px] tracking-tight mt-1 transition-all ${
              activeTab === 'activation' && !isPortalOpen
                ? 'font-black text-amber-950 scale-105'
                : 'font-bold text-amber-700 group-hover:text-amber-900'
            }`}
          >
            Activation
          </span>
          {activeTab === 'activation' && !isPortalOpen ? (
            <span className="w-4 h-1 rounded-full bg-amber-500 mt-0.5 shadow-xs" />
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-amber-300/80 mt-0.5" />
          )}
        </button>

        {/* 2. GiGs Feature in the Middle (Vibrant Electric Indigo Colors Stays On) */}
        <button
          type="button"
          onClick={() => onSelectTab('gigs')}
          className="group flex-1 flex flex-col items-center justify-center transition-all select-none cursor-pointer bg-transparent border-none -mt-2 py-0.5 active:scale-95"
          aria-label="GiGs Feature"
        >
          <GigsGadget4D isActive={activeTab === 'gigs' && !isPortalOpen} className="w-10 h-10" />
          <span
            className={`text-[10.5px] tracking-tight mt-0.5 transition-all ${
              activeTab === 'gigs' && !isPortalOpen
                ? 'font-black text-indigo-950 scale-105'
                : 'font-bold text-indigo-700 group-hover:text-indigo-900'
            }`}
          >
            GiGs
          </span>
          {activeTab === 'gigs' && !isPortalOpen ? (
            <span className="w-4 h-1 rounded-full bg-indigo-600 mt-0.5 shadow-xs" />
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-300/80 mt-0.5" />
          )}
        </button>

        {/* 3. TENANT / USER PORTAL (Vibrant Gold/Indigo Ring & Green Verified Dot Stays On) */}
        <button
          type="button"
          onClick={onOpenPortal}
          className="group flex-1 flex flex-col items-center justify-center transition-all select-none cursor-pointer bg-transparent border-none h-full py-1 active:scale-95"
          aria-label={isTenant ? 'Tenant Portal' : 'User Portal'}
        >
          {/* Avatar Profile Picture Logo / Portal Icon in Vivid Border */}
          <div className="relative">
            <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center overflow-hidden transition-all shadow-xs ${
              isTenant
                ? 'border-amber-500 bg-amber-100 ring-2 ring-amber-300/80'
                : 'border-indigo-600 bg-indigo-100 ring-2 ring-indigo-300/80'
            } ${isPortalOpen ? 'scale-110 ring-offset-1 drop-shadow-[0_2px_8px_rgba(245,158,11,0.4)]' : 'group-hover:scale-105'}`}>
              {profilePicUrl ? (
                <img
                  src={profilePicUrl}
                  alt="Portal Avatar"
                  className="w-full h-full object-cover"
                />
              ) : isTenant ? (
                <Building className="w-3.5 h-3.5 text-amber-900" />
              ) : (
                <UserCheck className="w-3.5 h-3.5 text-indigo-900" />
              )}
            </div>

            {/* Glowing Emerald Verified Indicator Dot */}
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.9)] border-2 border-white" />
          </div>

          <span
            className={`text-[10.5px] tracking-tight mt-1 transition-all ${
              isTenant
                ? isPortalOpen ? 'font-black text-amber-950 scale-105' : 'font-bold text-amber-800'
                : isPortalOpen ? 'font-black text-indigo-950 scale-105' : 'font-bold text-indigo-800'
            }`}
          >
            {isTenant ? 'Tenant Portal' : 'User Portal'}
          </span>
          {isPortalOpen ? (
            <span className={`w-4 h-1 rounded-full mt-0.5 shadow-xs ${
              isTenant ? 'bg-amber-500' : 'bg-indigo-600'
            }`} />
          ) : (
            <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
              isTenant ? 'bg-amber-400/80' : 'bg-indigo-400/80'
            }`} />
          )}
        </button>

      </div>
    </nav>
  );
};
