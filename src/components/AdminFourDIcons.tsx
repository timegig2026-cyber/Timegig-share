import React from 'react';

interface AdminIcon4DProps {
  isActive: boolean;
  className?: string;
}

// ============================================================================
// 1. OVERVIEW: 4D Isometric Command Matrix / Telemetry Prism
// ============================================================================
export const AdminOverviewIcon4D: React.FC<AdminIcon4DProps> = ({ isActive }) => {
  return (
    <div className={`relative flex items-center justify-center transition-all duration-200 ${
      isActive ? 'scale-110 -translate-y-0.5' : 'group-hover:scale-105'
    }`}>
      {/* 4D Ambient Floor Glow */}
      <div className={`absolute -bottom-0.5 w-4 h-1.5 rounded-full transition-all duration-300 blur-[1.5px] ${
        isActive ? 'bg-cyan-400/60 scale-125' : 'bg-black/10'
      }`} />

      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4 drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.2)] overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cubeTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bae6fd" />
            <stop offset="60%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          <linearGradient id="cubeLeft" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>

          <linearGradient id="cubeRight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#312e81" />
          </linearGradient>

          <linearGradient id="cubeGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="70%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#a16207" />
          </linearGradient>
        </defs>

        {/* 3D Cast Shadow */}
        <polygon points="12,23 20,18.5 12,15 4,18.5" fill="#082f49" opacity="0.35" />

        {/* Main Isometric Block 1 (Top Primary Platform) */}
        <polygon points="12,2 18,5.5 12,9 6,5.5" fill="url(#cubeTop)" stroke="#bae6fd" strokeWidth="0.4" />
        <polygon points="6,5.5 12,9 12,15 6,11.5" fill="url(#cubeLeft)" stroke="#0369a1" strokeWidth="0.4" />
        <polygon points="12,9 18,5.5 18,11.5 12,15" fill="url(#cubeRight)" stroke="#312e81" strokeWidth="0.4" />

        {/* Floating Mini 4D Gold Stat Gem */}
        <polygon points="12,5.5 14,7 12,8.5 10,7" fill="url(#cubeGold)" />
        
        {/* Secondary Sub-Tile (Bottom Left Analytics Pillar) */}
        <polygon points="5,14 8,15.5 8,19 5,17.5" fill="#10b981" opacity="0.9" />
        <polygon points="5,14 8,15.5 5,17 2,15.5" fill="#6ee7b7" />
        
        {/* Specular Ridge Glint */}
        <line x1="12" y1="2" x2="12" y2="9" stroke="#ffffff" strokeWidth="0.6" strokeLinecap="round" opacity="0.9" />
      </svg>
    </div>
  );
};

// ============================================================================
// 2. TENANT POP: 4D Gold Commercial Verification Receipt & Invoice
// ============================================================================
export const AdminTenantPoPIcon4D: React.FC<AdminIcon4DProps> = ({ isActive }) => {
  return (
    <div className={`relative flex items-center justify-center transition-all duration-200 ${
      isActive ? 'scale-110 -translate-y-0.5' : 'group-hover:scale-105'
    }`}>
      {/* 4D Ambient Floor Glow */}
      <div className={`absolute -bottom-0.5 w-4 h-1.5 rounded-full transition-all duration-300 blur-[1.5px] ${
        isActive ? 'bg-amber-400/60 scale-125' : 'bg-black/10'
      }`} />

      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4 drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.2)] overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="receiptSheet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="50%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fde68a" />
          </linearGradient>

          <linearGradient id="capitecGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          <linearGradient id="foilHolo" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>
        </defs>

        {/* 3D Extruded Paper Shadow */}
        <polygon points="5,22 19,22 19,4 5,4" fill="#451a03" opacity="0.3" transform="translate(0, 1.2)" />

        {/* Main Document Body */}
        <path
          d="M 5 3 C 5 2.5 5.5 2 6 2 L 18 2 C 18.5 2 19 2.5 19 3 L 19 21 L 16.5 19.5 L 14.5 21 L 12 19.5 L 9.5 21 L 7.5 19.5 L 5 21 Z"
          fill="url(#receiptSheet)"
          stroke="#d97706"
          strokeWidth="0.6"
        />

        {/* Holographic Security Foil Strip */}
        <rect x="7" y="5" width="10" height="2" rx="0.5" fill="url(#foilHolo)" opacity="0.9" />

        {/* Commercial Ledger Lines */}
        <line x1="7" y1="9" x2="13" y2="9" stroke="#b45309" strokeWidth="0.9" strokeLinecap="round" />
        <line x1="7" y1="12" x2="17" y2="12" stroke="#d97706" strokeWidth="0.7" strokeLinecap="round" />
        <line x1="7" y1="14.5" x2="15" y2="14.5" stroke="#d97706" strokeWidth="0.7" strokeLinecap="round" />

        {/* 4D Gold Capitec Approval Seal Stamp */}
        <circle cx="14.5" cy="16.5" r="2.8" fill="url(#capitecGold)" stroke="#78350f" strokeWidth="0.4" />
        <path d="M 13.5 16.5 L 14.2 17.3 L 15.6 15.7" stroke="#ffffff" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />

        {/* Top Paper Specular Sheen */}
        <line x1="6" y1="3" x2="18" y2="3" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" />
      </svg>
    </div>
  );
};

// ============================================================================
// 3. USER POP: 4D Titanium & Smartchip Payment Card Token
// ============================================================================
export const AdminUserPoPIcon4D: React.FC<AdminIcon4DProps> = ({ isActive }) => {
  return (
    <div className={`relative flex items-center justify-center transition-all duration-200 ${
      isActive ? 'scale-110 -translate-y-0.5' : 'group-hover:scale-105'
    }`}>
      {/* 4D Ambient Floor Glow */}
      <div className={`absolute -bottom-0.5 w-4 h-1.5 rounded-full transition-all duration-300 blur-[1.5px] ${
        isActive ? 'bg-indigo-400/60 scale-125' : 'bg-black/10'
      }`} />

      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4 drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.2)] overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cardObsidian" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="50%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <linearGradient id="smartChip" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          <linearGradient id="cardBevel" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>

        {/* 3D Extrusion Shadow */}
        <rect x="2.5" y="6" width="19" height="13" rx="2.5" fill="#020617" opacity="0.35" />

        {/* Main 4D Credit/Debit Card Body */}
        <rect
          x="2.5"
          y="4.5"
          width="19"
          height="13"
          rx="2.5"
          fill="url(#cardObsidian)"
          stroke="#475569"
          strokeWidth="0.6"
        />

        {/* Titanium Edge Highlight */}
        <path d="M 4 5 L 20 5" stroke="url(#cardBevel)" strokeWidth="0.8" strokeLinecap="round" opacity="0.9" />

        {/* Magnetic Security Stripe */}
        <rect x="2.5" y="7.5" width="19" height="2.5" fill="#090d16" />

        {/* 4D Gold Smart EMV Microchip */}
        <rect x="5.5" y="11.5" width="4.5" height="3.5" rx="0.75" fill="url(#smartChip)" stroke="#78350f" strokeWidth="0.35" />
        <line x1="7.7" y1="11.5" x2="7.7" y2="15" stroke="#78350f" strokeWidth="0.3" />
        <line x1="5.5" y1="13.2" x2="10" y2="13.2" stroke="#78350f" strokeWidth="0.3" />

        {/* Contactless NFC Waves */}
        <path d="M 16.5 12 C 17.2 12.8 17.2 13.8 16.5 14.5" stroke="#38bdf8" strokeWidth="0.6" strokeLinecap="round" />
        <path d="M 18 11 C 19 12.5 19 14.5 18 15.5" stroke="#38bdf8" strokeWidth="0.6" strokeLinecap="round" opacity="0.75" />
      </svg>
    </div>
  );
};

// ============================================================================
// 4. ACTIVE USERS: 4D Holographic Emerald Biometric Community Avatar
// ============================================================================
export const AdminActiveUsersIcon4D: React.FC<AdminIcon4DProps> = ({ isActive }) => {
  return (
    <div className={`relative flex items-center justify-center transition-all duration-200 ${
      isActive ? 'scale-110 -translate-y-0.5' : 'group-hover:scale-105'
    }`}>
      {/* 4D Ambient Floor Glow */}
      <div className={`absolute -bottom-0.5 w-4 h-1.5 rounded-full transition-all duration-300 blur-[1.5px] ${
        isActive ? 'bg-emerald-400/60 scale-125' : 'bg-black/10'
      }`} />

      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4 drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.2)] overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="emeraldHead" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#a7f3d0" />
            <stop offset="45%" stopColor="#34d399" />
            <stop offset="85%" stopColor="#059669" />
            <stop offset="100%" stopColor="#064e3b" />
          </radialGradient>

          <linearGradient id="bodyBevel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="60%" stopColor="#059669" />
            <stop offset="100%" stopColor="#064e3b" />
          </linearGradient>

          <linearGradient id="secondaryAvatar" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
        </defs>

        {/* 3D Cast Shadow */}
        <ellipse cx="12" cy="20.5" rx="8" ry="2" fill="#022c22" opacity="0.3" />

        {/* Secondary Background User (3D Depth Layer) */}
        <circle cx="16.5" cy="8" r="3" fill="url(#secondaryAvatar)" stroke="#0f172a" strokeWidth="0.4" />
        <path d="M 14.5 13 C 16 12 18.5 12 20.5 13 C 21.5 13.6 22 14.8 22 16.5 L 14 16.5 Z" fill="url(#secondaryAvatar)" />

        {/* Primary Foreground 4D User Head */}
        <circle
          cx="10"
          cy="7.5"
          r="4.2"
          fill="url(#emeraldHead)"
          stroke="#064e3b"
          strokeWidth="0.6"
        />
        {/* Specular Face Sheen */}
        <path d="M 8 5 C 9 4.2 11 4.2 12 4.8" stroke="#ffffff" strokeWidth="0.7" strokeLinecap="round" opacity="0.85" />

        {/* Primary Foreground 4D User Shoulders / Torso */}
        <path
          d="M 3.5 18 C 3.5 14.5 6.5 13.5 10 13.5 C 13.5 13.5 16.5 14.5 16.5 18 C 16.5 19.5 15.5 20.5 13.5 20.5 L 6.5 20.5 C 4.5 20.5 3.5 19.5 3.5 18 Z"
          fill="url(#bodyBevel)"
          stroke="#064e3b"
          strokeWidth="0.6"
        />

        {/* Specular Collar Ridge */}
        <path d="M 7.5 14.5 C 9 15.2 11 15.2 12.5 14.5" stroke="#a7f3d0" strokeWidth="0.6" strokeLinecap="round" />

        {/* Active Verified Tick Gem */}
        <circle cx="14" cy="11" r="1.8" fill="#10b981" stroke="#ffffff" strokeWidth="0.5" />
        <path d="M 13.3 11 L 13.8 11.5 L 14.8 10.5" stroke="#ffffff" strokeWidth="0.5" strokeLinecap="round" />
      </svg>
    </div>
  );
};

// ============================================================================
// 5. ACTIVE TENANTS: 4D Gold Enterprise High-Rise Architectural Ingot
// ============================================================================
export const AdminActiveTenantsIcon4D: React.FC<AdminIcon4DProps> = ({ isActive }) => {
  return (
    <div className={`relative flex items-center justify-center transition-all duration-200 ${
      isActive ? 'scale-110 -translate-y-0.5' : 'group-hover:scale-105'
    }`}>
      {/* 4D Ambient Floor Glow */}
      <div className={`absolute -bottom-0.5 w-4 h-1.5 rounded-full transition-all duration-300 blur-[1.5px] ${
        isActive ? 'bg-amber-400/60 scale-125' : 'bg-black/10'
      }`} />

      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4 drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.2)] overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="tenantRoof" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="50%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>

          <linearGradient id="tenantLeft" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          <linearGradient id="tenantRight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
        </defs>

        {/* 3D Ground Shadow */}
        <polygon points="12,23 19,19 12,16 5,19" fill="#451a03" opacity="0.35" />

        {/* Left Lit Facade */}
        <polygon points="12,6.5 12,20.5 5,16.5 5,2.5" fill="url(#tenantLeft)" stroke="#92400e" strokeWidth="0.4" />
        
        {/* Right Shaded Facade */}
        <polygon points="12,6.5 19,2.5 19,16.5 12,20.5" fill="url(#tenantRight)" stroke="#78350f" strokeWidth="0.4" />
        
        {/* Top Illuminated Penthouse Roof */}
        <polygon points="12,6.5 5,2.5 12,-1 19,2.5" fill="url(#tenantRoof)" stroke="#fef08a" strokeWidth="0.5" transform="translate(0, 2)" />

        {/* Windows / Tier Grid Lines */}
        <line x1="5" y1="6.5" x2="12" y2="10.5" stroke="#fef08a" strokeWidth="0.5" opacity="0.8" />
        <line x1="5" y1="10.5" x2="12" y2="14.5" stroke="#fef08a" strokeWidth="0.5" opacity="0.8" />
        <line x1="5" y1="14.5" x2="12" y2="18.5" stroke="#fef08a" strokeWidth="0.5" opacity="0.8" />

        <line x1="12" y1="10.5" x2="19" y2="6.5" stroke="#fde047" strokeWidth="0.5" opacity="0.4" />
        <line x1="12" y1="14.5" x2="19" y2="10.5" stroke="#fde047" strokeWidth="0.5" opacity="0.4" />
        <line x1="12" y1="18.5" x2="19" y2="14.5" stroke="#fde047" strokeWidth="0.5" opacity="0.4" />

        {/* Specular Corner Edge */}
        <line x1="12" y1="6.5" x2="12" y2="20.5" stroke="#ffffff" strokeWidth="0.7" opacity="0.85" />
      </svg>
    </div>
  );
};
