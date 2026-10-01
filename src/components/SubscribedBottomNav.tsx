import React from 'react';
import { GigsGadget4D } from './FourDIcons';
import { User, Users, Compass, Search } from 'lucide-react';

export type SubscribedTab = 'seekers' | 'gigs' | 'profile';

interface SubscribedBottomNavProps {
  activeTab: SubscribedTab;
  onSelectTab: (tab: SubscribedTab) => void;
  profilePicUrl?: string;
}

export const SubscribedBottomNav: React.FC<SubscribedBottomNavProps> = ({
  activeTab,
  onSelectTab,
  profilePicUrl,
}) => {
  return (
    <nav
      aria-label="Subscribed Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]"
    >
      <div className="w-full max-w-md mx-auto flex items-center justify-around h-16 px-4">
        
        {/* 1. Seekers Feature */}
        <button
          type="button"
          onClick={() => onSelectTab('seekers')}
          className="group flex-1 flex flex-col items-center justify-center transition-all select-none cursor-pointer bg-transparent border-none h-full py-1 active:scale-95"
          aria-label="Seekers Feature"
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            activeTab === 'seekers'
              ? 'bg-amber-100 text-amber-700 ring-2 ring-amber-400 scale-105 shadow-xs'
              : 'bg-amber-50 text-amber-600 hover:bg-amber-100'
          }`}>
            <Compass className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span
            className={`text-[10.5px] tracking-tight mt-1 transition-all ${
              activeTab === 'seekers'
                ? 'font-black text-amber-950 scale-105'
                : 'font-bold text-amber-700 group-hover:text-amber-900'
            }`}
          >
            Seekers
          </span>
          {activeTab === 'seekers' ? (
            <span className="w-4 h-1 rounded-full bg-amber-500 mt-0.5 shadow-xs" />
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-amber-300/60 mt-0.5" />
          )}
        </button>

        {/* 2. GiGs Feature (Center Pin) */}
        <button
          type="button"
          onClick={() => onSelectTab('gigs')}
          className="group flex-1 flex flex-col items-center justify-center transition-all select-none cursor-pointer bg-transparent border-none -mt-2 py-0.5 active:scale-95"
          aria-label="GiGs Feature"
        >
          <GigsGadget4D isActive={activeTab === 'gigs'} className="w-10 h-10" />
          <span
            className={`text-[10.5px] tracking-tight mt-0.5 transition-all ${
              activeTab === 'gigs'
                ? 'font-black text-indigo-950 scale-105'
                : 'font-bold text-indigo-700 group-hover:text-indigo-900'
            }`}
          >
            GiGs
          </span>
          {activeTab === 'gigs' ? (
            <span className="w-4 h-1 rounded-full bg-indigo-600 mt-0.5 shadow-xs" />
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-300/80 mt-0.5" />
          )}
        </button>

        {/* 3. Profile Feature */}
        <button
          type="button"
          onClick={() => onSelectTab('profile')}
          className="group flex-1 flex flex-col items-center justify-center transition-all select-none cursor-pointer bg-transparent border-none h-full py-1 active:scale-95"
          aria-label="Profile Feature"
        >
          <div className="relative">
            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center overflow-hidden transition-all shadow-xs ${
              activeTab === 'profile'
                ? 'border-indigo-600 bg-indigo-100 ring-2 ring-indigo-400 ring-offset-1 scale-105 text-indigo-800'
                : 'border-indigo-300 bg-indigo-50 text-indigo-700 group-hover:border-indigo-400'
            }`}>
              {profilePicUrl ? (
                <img
                  src={profilePicUrl}
                  alt="Profile Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-4.5 h-4.5 stroke-[2.2]" />
              )}
            </div>

            {/* Verified Green Indicator Dot */}
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.9)] border-2 border-white" />
          </div>

          <span
            className={`text-[10.5px] tracking-tight mt-1 transition-all ${
              activeTab === 'profile'
                ? 'font-black text-indigo-950 scale-105'
                : 'font-bold text-indigo-700 group-hover:text-indigo-900'
            }`}
          >
            Profile
          </span>
          {activeTab === 'profile' ? (
            <span className="w-4 h-1 rounded-full bg-indigo-600 mt-0.5 shadow-xs" />
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-300/60 mt-0.5" />
          )}
        </button>

      </div>
    </nav>
  );
};
