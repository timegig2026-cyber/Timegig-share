import React from 'react';

interface Gadget2DProps {
  isActive: boolean;
  className?: string;
}

// ============================================================================
// 1. ACTIVATION GADGET: 2D Map GPS Compass & Survey Instrument (Always in Vivid Color)
// ============================================================================
export const ActivationGadget4D: React.FC<Gadget2DProps> = ({ isActive, className = "w-7 h-7" }) => {
  // Always stay in rich gold/amber colors whether active or not
  const primaryColor = '#d97706'; // vibrant amber-600
  const secondaryColor = '#f59e0b'; // bright amber-500
  const bgColor = '#fffbeb'; // warm amber tint
  const borderColor = '#f59e0b'; // golden perimeter

  return (
    <div className={`relative flex items-center justify-center transition-transform duration-200 ${
      isActive ? 'scale-110 drop-shadow-[0_2px_8px_rgba(245,158,11,0.45)]' : 'hover:scale-105'
    }`}>
      <svg
        viewBox="0 0 36 36"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Flat 2D Outer Instrument Circle */}
        <circle
          cx="18"
          cy="18"
          r="16"
          fill={bgColor}
          stroke={borderColor}
          strokeWidth="1.5"
        />

        {/* Flat Inner Dial Ring */}
        <circle
          cx="18"
          cy="18"
          r="12.5"
          stroke={secondaryColor}
          strokeWidth="1"
          strokeDasharray="2 2"
          opacity="0.85"
        />

        {/* 2D Cardinal Azimuth Ticks (N, S, E, W) in vivid orange/amber */}
        <line x1="18" y1="3" x2="18" y2="6.5" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="18" y1="29.5" x2="18" y2="33" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="3" y1="18" x2="6.5" y2="18" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="29.5" y1="18" x2="33" y2="18" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" />

        {/* 2D Diagonal Degree Notches */}
        <line x1="7.4" y1="7.4" x2="9.8" y2="9.8" stroke={secondaryColor} strokeWidth="1" strokeLinecap="round" />
        <line x1="26.2" y1="26.2" x2="28.6" y2="28.6" stroke={secondaryColor} strokeWidth="1" strokeLinecap="round" />
        <line x1="28.6" y1="7.4" x2="26.2" y2="9.8" stroke={secondaryColor} strokeWidth="1" strokeLinecap="round" />
        <line x1="7.4" y1="28.6" x2="9.8" y2="26.2" stroke={secondaryColor} strokeWidth="1" strokeLinecap="round" />

        {/* 2D Topographic Map Contour Curves */}
        <path
          d="M 8 13 C 12 11, 15 15, 20 12 C 24 9.5, 27 12, 28 13"
          stroke={secondaryColor}
          strokeWidth="0.8"
          strokeDasharray="1.5 1.5"
          opacity="0.75"
        />

        {/* 2D Flat Geometric Compass Needle (Vivid Two-Tone North/South) */}
        <polygon
          points="18,6.5 21,18 18,16.5"
          fill="#ea580c" // Vivid Orange North
        />
        <polygon
          points="18,6.5 15,18 18,16.5"
          fill="#f97316"
        />
        <polygon
          points="18,29.5 21,18 18,19.5"
          fill="#78350f" // Deep Warm Bronze South
        />
        <polygon
          points="18,29.5 15,18 18,19.5"
          fill="#b45309"
        />

        {/* Flat Center Pivot Dot */}
        <circle cx="18" cy="18" r="2.5" fill="#ffffff" stroke={borderColor} strokeWidth="1.2" />
        <circle cx="18" cy="18" r="1.2" fill={primaryColor} />
      </svg>
    </div>
  );
};

// ============================================================================
// 2. GIGS GADGET: 2D Map Waypoint & GPS Pin Plotter (Always in Vivid Color)
// ============================================================================
export const GigsGadget4D: React.FC<Gadget2DProps> = ({ isActive, className = "w-10 h-10" }) => {
  // Always stay in vibrant electric indigo and violet colors
  const pinFill = '#4f46e5'; // rich indigo
  const accentColor = '#818cf8'; // bright lavender
  const ringColor = '#c7d2fe'; // glowing perimeter ring

  return (
    <div className={`relative flex items-center justify-center transition-transform duration-200 ${
      isActive ? 'scale-110 drop-shadow-[0_4px_12px_rgba(79,70,229,0.5)]' : 'hover:scale-105'
    }`}>
      <svg
        viewBox="0 0 40 40"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 2D Flat Ground Waypoint Radar Rings in vivid indigo */}
        <ellipse
          cx="20"
          cy="31"
          rx="14"
          ry="5.5"
          stroke={ringColor}
          strokeWidth="1.2"
          strokeDasharray="2 1.5"
        />
        <ellipse
          cx="20"
          cy="31"
          rx="9"
          ry="3.5"
          stroke={accentColor}
          strokeWidth="1.2"
        />
        <ellipse
          cx="20"
          cy="31"
          rx="4"
          ry="1.5"
          fill="#818cf8"
          opacity="0.85"
        />

        {/* 2D Map Route Trail Line */}
        <path
          d="M 6 30 C 11 31, 14 27, 20 31 C 26 35, 30 29, 35 28"
          stroke={accentColor}
          strokeWidth="1"
          strokeDasharray="2 2"
          opacity="0.75"
        />

        {/* 2D Flat Classic Map Pin in vivid electric indigo */}
        <path
          d="M 20 32 C 16.5 27 12 21 12 15 C 12 10.58 15.58 7 20 7 C 24.42 7 28 10.58 28 15 C 28 21 23.5 27 20 32 Z"
          fill={pinFill}
          stroke="#312e81"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* 2D Inner Cutout Circle */}
        <circle
          cx="20"
          cy="15"
          r="4.2"
          fill="#ffffff"
        />

        {/* 2D Center Waypoint Dot */}
        <circle
          cx="20"
          cy="15"
          r="2"
          fill={pinFill}
        />
      </svg>
    </div>
  );
};

// ============================================================================
// 3. ADMIN GADGET: 2D Tactical Radar Scope & Map Grid Scanner (Always in Vivid Color)
// ============================================================================
export const AdminGadget4D: React.FC<Gadget2DProps> = ({ isActive, className = "w-7 h-7" }) => {
  // Always stay in vivid emerald and mint radar colors
  const primaryColor = '#059669'; // vivid emerald-600
  const secondaryColor = '#34d399'; // bright mint-400
  const bgColor = '#ecfdf5'; // light emerald tint
  const borderColor = '#10b981'; // bright green boundary

  return (
    <div className={`relative flex items-center justify-center transition-transform duration-200 ${
      isActive ? 'scale-110 drop-shadow-[0_2px_8px_rgba(16,185,129,0.45)]' : 'hover:scale-105'
    }`}>
      <svg
        viewBox="0 0 36 36"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 2D Flat Outer Radar Scope Circle */}
        <circle
          cx="18"
          cy="18"
          r="16"
          fill={bgColor}
          stroke={borderColor}
          strokeWidth="1.5"
        />

        {/* 2D Concentric Range Distance Rings */}
        <circle
          cx="18"
          cy="18"
          r="11.5"
          stroke={secondaryColor}
          strokeWidth="1"
          strokeDasharray="2 1.5"
          opacity="0.85"
        />
        <circle
          cx="18"
          cy="18"
          r="6.5"
          stroke={secondaryColor}
          strokeWidth="1"
          opacity="0.85"
        />

        {/* 2D Crosshair Grid Lines */}
        <line x1="18" y1="2" x2="18" y2="34" stroke={secondaryColor} strokeWidth="1" strokeDasharray="1.5 1.5" opacity="0.6" />
        <line x1="2" y1="18" x2="34" y2="18" stroke={secondaryColor} strokeWidth="1" strokeDasharray="1.5 1.5" opacity="0.6" />

        {/* 2D Radar Sweep Beam Wedge */}
        <path
          d="M 18 18 L 29 10 A 16 16 0 0 1 33 18 Z"
          fill={secondaryColor}
          opacity="0.35"
        />

        {/* 2D Active Map Radar Targets (Blips) */}
        <circle cx="25" cy="13" r="1.5" fill={primaryColor} />
        <circle cx="11" cy="23" r="1.2" fill={secondaryColor} />
        <circle cx="23" cy="25" r="1.2" fill={primaryColor} />

        {/* Center Target Station Marker */}
        <circle cx="18" cy="18" r="2" fill="#ffffff" stroke={borderColor} strokeWidth="1" />
        <circle cx="18" cy="18" r="0.9" fill={primaryColor} />
      </svg>
    </div>
  );
};
