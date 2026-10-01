// High-fidelity vector SVG data URLs for South African ID cards, Face-only profile photos, and Capitec payment receipts

// 1. Tenant Face Profile Picture (Face Only)
export const SAMPLE_FACE_TENANT = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>
    <linearGradient id="skin" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffd5b5" />
      <stop offset="100%" stop-color="#f7b78a" />
    </linearGradient>
    <linearGradient id="hair" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b2210" />
      <stop offset="100%" stop-color="#241307" />
    </linearGradient>
  </defs>
  <!-- Background circular avatar -->
  <circle cx="100" cy="100" r="100" fill="url(#bg)" />
  <!-- Hair back -->
  <path d="M 50 110 C 45 60 70 30 100 30 C 130 30 155 60 150 110 Z" fill="url(#hair)" />
  <!-- Shoulders -->
  <path d="M 40 195 C 40 155 70 145 100 145 C 130 145 160 155 160 195 Z" fill="#1e293b" />
  <!-- Collar -->
  <path d="M 85 145 L 100 165 L 115 145 Z" fill="#ffffff" />
  <!-- Neck -->
  <rect x="88" y="125" width="24" height="25" fill="url(#skin)" />
  <!-- Face -->
  <ellipse cx="100" cy="95" rx="35" ry="42" fill="url(#skin)" />
  <!-- Hair top -->
  <path d="M 62 85 C 60 50 85 40 100 40 C 120 40 138 52 138 75 C 138 82 130 75 120 73 C 105 70 85 75 62 85 Z" fill="url(#hair)" />
  <!-- Eyes -->
  <ellipse cx="88" cy="92" rx="4" ry="4" fill="#2d1a0c" />
  <ellipse cx="112" cy="92" rx="4" ry="4" fill="#2d1a0c" />
  <circle cx="89.5" cy="90.5" r="1.5" fill="#ffffff" />
  <circle cx="113.5" cy="90.5" r="1.5" fill="#ffffff" />
  <!-- Eyebrows -->
  <path d="M 80 84 Q 88 81 96 85" stroke="#2d1a0c" stroke-width="2.5" fill="none" stroke-linecap="round" />
  <path d="M 104 85 Q 112 81 120 84" stroke="#2d1a0c" stroke-width="2.5" fill="none" stroke-linecap="round" />
  <!-- Nose -->
  <path d="M 100 93 L 98 104 L 103 104" stroke="#d48c5b" stroke-width="1.8" fill="none" stroke-linecap="round" />
  <!-- Smile -->
  <path d="M 90 115 Q 100 125 110 115" stroke="#b45a2a" stroke-width="2.5" fill="none" stroke-linecap="round" />
</svg>
`)}`;

// 2. User Face Profile Picture (Face Only)
export const SAMPLE_FACE_USER = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="bgUser" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7" />
      <stop offset="100%" stop-color="#0369a1" />
    </linearGradient>
    <linearGradient id="skinUser" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffd5b5" />
      <stop offset="100%" stop-color="#e8a87c" />
    </linearGradient>
    <linearGradient id="hairUser" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1e1e1e" />
      <stop offset="100%" stop-color="#0f0f0f" />
    </linearGradient>
  </defs>
  <!-- Background circular avatar -->
  <circle cx="100" cy="100" r="100" fill="url(#bgUser)" />
  <!-- Shoulders -->
  <path d="M 40 195 C 40 155 70 145 100 145 C 130 145 160 155 160 195 Z" fill="#0f172a" />
  <!-- Neck -->
  <rect x="88" y="125" width="24" height="25" fill="url(#skinUser)" />
  <!-- Face -->
  <ellipse cx="100" cy="95" rx="35" ry="42" fill="url(#skinUser)" />
  <!-- Short Dark Hair -->
  <path d="M 64 85 C 60 55 75 42 100 42 C 125 42 140 55 136 85 C 130 75 118 68 100 68 C 82 68 70 75 64 85 Z" fill="url(#hairUser)" />
  <!-- Eyes -->
  <ellipse cx="88" cy="92" rx="4" ry="4" fill="#1e1e1e" />
  <ellipse cx="112" cy="92" rx="4" ry="4" fill="#1e1e1e" />
  <circle cx="89.5" cy="90.5" r="1.5" fill="#ffffff" />
  <circle cx="113.5" cy="90.5" r="1.5" fill="#ffffff" />
  <!-- Eyebrows -->
  <path d="M 80 84 Q 88 81 96 85" stroke="#1e1e1e" stroke-width="2.5" fill="none" stroke-linecap="round" />
  <path d="M 104 85 Q 112 81 120 84" stroke="#1e1e1e" stroke-width="2.5" fill="none" stroke-linecap="round" />
  <!-- Nose -->
  <path d="M 100 93 L 98 104 L 103 104" stroke="#c47a4d" stroke-width="1.8" fill="none" stroke-linecap="round" />
  <!-- Smile -->
  <path d="M 90 115 Q 100 124 110 115" stroke="#a34d20" stroke-width="2.5" fill="none" stroke-linecap="round" />
</svg>
`)}`;

// 3. Official Republic of South Africa Smart ID Card SVG
export const createSampleIdCardSvg = (name: string, idNo: string, dob: string): string => {
  return `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 280" width="450" height="280">
  <defs>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f0fdf4" />
      <stop offset="50%" stop-color="#ecfdf5" />
      <stop offset="100%" stop-color="#d1fae5" />
    </linearGradient>
    <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#047857" />
      <stop offset="100%" stop-color="#065f46" />
    </linearGradient>
  </defs>

  <!-- Card Body with rounded corners & shadow -->
  <rect x="2" y="2" width="446" height="276" rx="16" fill="url(#cardGrad)" stroke="#10b981" stroke-width="2.5" />
  
  <!-- Subtle guilloche lines -->
  <path d="M 2 50 Q 120 80 240 50 T 448 50" fill="none" stroke="#a7f3d0" stroke-width="1.5" opacity="0.6" />
  <path d="M 2 120 Q 120 150 240 120 T 448 120" fill="none" stroke="#a7f3d0" stroke-width="1.5" opacity="0.6" />
  <path d="M 2 190 Q 120 220 240 190 T 448 190" fill="none" stroke="#a7f3d0" stroke-width="1.5" opacity="0.6" />

  <!-- Header Banner -->
  <rect x="2" y="2" width="446" height="42" rx="14" fill="url(#headerGrad)" />
  <rect x="2" y="30" width="446" height="14" fill="url(#headerGrad)" />
  
  <!-- Header Text -->
  <text x="20" y="24" font-family="Arial, sans-serif" font-size="12" font-weight="900" fill="#ffffff" letter-spacing="1.5">REPUBLIC OF SOUTH AFRICA</text>
  <text x="20" y="38" font-family="Arial, sans-serif" font-size="8.5" font-weight="700" fill="#a7f3d0" letter-spacing="2">NATIONAL IDENTITY SMART CARD</text>
  
  <!-- Gold Shield / Emblem Badge -->
  <circle cx="415" cy="22" r="14" fill="#fbbf24" stroke="#d97706" stroke-width="1.5" />
  <text x="415" y="26" font-family="Arial, sans-serif" font-size="9" font-weight="900" fill="#78350f" text-anchor="middle">RSA</text>

  <!-- Photo Box (Left) -->
  <rect x="22" y="60" width="95" height="120" rx="8" fill="#ffffff" stroke="#059669" stroke-width="2" />
  <!-- Silhouette in photo -->
  <circle cx="69.5" cy="100" r="22" fill="#9ca3af" />
  <path d="M 38 160 C 38 135 52 128 69.5 128 C 87 128 101 135 101 160 Z" fill="#6b7280" />
  <rect x="22" y="160" width="95" height="20" rx="4" fill="#e5e7eb" />
  <text x="69.5" y="174" font-family="monospace" font-size="8" font-weight="bold" fill="#374151" text-anchor="middle">OFFICIAL PHOTO</text>

  <!-- ID Information Attached (Right) -->
  <g transform="translate(135, 65)">
    <!-- Identity Number -->
    <text x="0" y="12" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#047857">IDENTITY NUMBER / IDENTITEITSNOMMER</text>
    <text x="0" y="30" font-family="monospace" font-size="14" font-weight="900" fill="#0f172a" letter-spacing="1.5">${idNo}</text>

    <!-- Surname & Names -->
    <text x="0" y="48" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#047857">SURNAME &amp; NAMES / VAN &amp; VOORNAME</text>
    <text x="0" y="66" font-family="Arial, sans-serif" font-size="12" font-weight="800" fill="#0f172a">${name.toUpperCase()}</text>

    <!-- Date of Birth & Gender & Nationality -->
    <text x="0" y="84" font-family="Arial, sans-serif" font-size="7.5" font-weight="bold" fill="#047857">DATE OF BIRTH / GEBOORTEDATUM</text>
    <text x="0" y="98" font-family="monospace" font-size="10" font-weight="700" fill="#1e293b">${dob}</text>

    <text x="160" y="84" font-family="Arial, sans-serif" font-size="7.5" font-weight="bold" fill="#047857">NATIONALITY</text>
    <text x="160" y="98" font-family="Arial, sans-serif" font-size="10" font-weight="900" fill="#1e293b">SOUTH AFRICAN</text>
  </g>

  <!-- Smart Chip Graphic -->
  <rect x="22" y="195" width="40" height="28" rx="4" fill="#fbbf24" stroke="#b45309" stroke-width="1.5" />
  <line x1="22" y1="209" x2="62" y2="209" stroke="#b45309" stroke-width="1" />
  <line x1="42" y1="195" x2="42" y2="223" stroke="#b45309" stroke-width="1" />

  <!-- Barcode & Machine Readable Zone (Bottom) -->
  <g transform="translate(80, 235)">
    <rect x="0" y="0" width="345" height="26" fill="#ffffff" rx="4" stroke="#cbd5e1" />
    <!-- Simulated barcode vertical stripes -->
    <path d="M 10 5 v 16 M 14 5 v 16 M 17 5 v 16 M 22 5 v 16 M 25 5 v 16 M 30 5 v 16 M 34 5 v 16 M 38 5 v 16 M 45 5 v 16 M 50 5 v 16 M 55 5 v 16 M 62 5 v 16 M 70 5 v 16 M 74 5 v 16 M 80 5 v 16 M 88 5 v 16 M 92 5 v 16 M 100 5 v 16 M 110 5 v 16 M 115 5 v 16 M 122 5 v 16 M 130 5 v 16 M 138 5 v 16 M 145 5 v 16 M 150 5 v 16 M 160 5 v 16 M 170 5 v 16 M 180 5 v 16 M 190 5 v 16 M 200 5 v 16 M 210 5 v 16 M 220 5 v 16 M 230 5 v 16 M 240 5 v 16 M 250 5 v 16 M 260 5 v 16 M 270 5 v 16 M 280 5 v 16 M 290 5 v 16 M 300 5 v 16 M 310 5 v 16 M 320 5 v 16 M 330 5 v 16" stroke="#0f172a" stroke-width="2" />
  </g>
</svg>
`)}`;
};

// 4. Official Capitec Bank Proof of Payment Receipt SVG
export const createSampleCapitecReceiptSvg = (ref: string, amount: string, name: string): string => {
  return `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 320" width="400" height="320">
  <rect x="2" y="2" width="396" height="316" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" />
  
  <!-- Header Bar -->
  <rect x="2" y="2" width="396" height="50" rx="10" fill="#004b87" />
  <rect x="2" y="35" width="396" height="17" fill="#004b87" />
  <text x="20" y="32" font-family="Arial, sans-serif" font-size="16" font-weight="900" fill="#ffffff">CAPITEC</text>
  <text x="100" y="32" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#93c5fd">PROOF OF PAYMENT</text>

  <!-- Status Banner -->
  <rect x="20" y="65" width="360" height="32" rx="6" fill="#f0fdf4" stroke="#86efac" />
  <circle cx="36" cy="81" r="7" fill="#16a34a" />
  <path d="M 33 81 L 35 83 L 39 79" stroke="#ffffff" stroke-width="1.8" fill="none" stroke-linecap="round" />
  <text x="50" y="85" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#166534">Payment Successful &amp; Cleared</text>

  <!-- Details Grid -->
  <g transform="translate(20, 115)" font-family="Arial, sans-serif" font-size="11">
    <!-- Beneficiary Details -->
    <text x="0" y="15" fill="#64748b" font-size="10">Beneficiary Name:</text>
    <text x="170" y="15" font-weight="bold" fill="#0f172a">Matthews</text>

    <text x="0" y="38" fill="#64748b" font-size="10">Account Number:</text>
    <text x="170" y="38" font-family="monospace" font-weight="bold" fill="#0f172a">1334067366</text>

    <text x="0" y="61" fill="#64748b" font-size="10">Bank Name:</text>
    <text x="170" y="61" font-weight="bold" fill="#0f172a">Capitec Bank</text>

    <text x="0" y="84" fill="#64748b" font-size="10">Beneficiary Reference:</text>
    <text x="170" y="84" font-family="monospace" font-weight="900" fill="#d97706">${ref}</text>

    <text x="0" y="107" fill="#64748b" font-size="10">Applicant / Payer:</text>
    <text x="170" y="107" font-weight="bold" fill="#0f172a">${name}</text>

    <line x1="0" y1="120" x2="360" y2="120" stroke="#e2e8f0" stroke-width="1" />

    <!-- Amount -->
    <text x="0" y="145" font-size="12" font-weight="bold" fill="#0f172a">Payment Amount:</text>
    <text x="170" y="145" font-family="monospace" font-size="16" font-weight="900" fill="#16a34a">${amount}</text>
  </g>

  <!-- Watermark & Capitec Guarantee -->
  <rect x="20" y="275" width="360" height="28" rx="6" fill="#f8fafc" />
  <text x="200" y="293" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#64748b" text-anchor="middle">Official Capitec Instant Digital Clearance • Reference ${ref}</text>
</svg>
`)}`;
};
