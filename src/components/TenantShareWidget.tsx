import React, { useState } from 'react';
import { 
  Share2, 
  Copy, 
  Check, 
  Users, 
  Building, 
  Sparkles, 
  ExternalLink,
  MessageCircle,
  AlertCircle
} from 'lucide-react';

interface TenantShareWidgetProps {
  referralCode?: string;
  initialTenantsCount?: number;
  initialUsersCount?: number;
  compact?: boolean;
}

export const TenantShareWidget: React.FC<TenantShareWidgetProps> = ({
  referralCode = 'Ten29-8472',
  initialTenantsCount = 3,
  initialUsersCount = 24,
  compact = false,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [tenantsCount, setTenantsCount] = useState<number>(initialTenantsCount);
  const [usersCount, setUsersCount] = useState<number>(initialUsersCount);

  const MAX_TENANTS = 10;
  const MAX_USERS = 100;

  // Construct tenant's personal share link
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://timegig.co.za';
  const shareUrl = `${origin}?ref=${encodeURIComponent(referralCode.toLowerCase())}`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Join TimeGiG using my exclusive Tenant partner link! Activate your subscription with 30 days free trial: ${shareUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const tenantsPercent = Math.min(100, Math.round((tenantsCount / MAX_TENANTS) * 100));
  const usersPercent = Math.min(100, Math.round((usersCount / MAX_USERS) * 100));

  return (
    <div className="w-full bg-gradient-to-br from-amber-500/10 via-amber-600/5 to-yellow-950/15 border-2 border-amber-400/40 rounded-3xl p-5 shadow-lg select-none backdrop-blur-md">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-600 shadow-xs">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              <span>Tenant Exclusive Share Link</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 font-bold">
                {referralCode}
              </span>
            </h3>
            <p className="text-[11px] text-slate-600 font-medium">
              Share your link to invite 10 Tenants and 100 User subscriptions
            </p>
          </div>
        </div>
      </div>

      {/* Shareable Link Input & Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-5">
        <div className="flex-1 bg-white/90 border border-amber-300/80 rounded-xl px-3 py-2 flex items-center gap-2 shadow-inner overflow-hidden">
          <span className="text-slate-400 shrink-0 text-xs font-mono">🔗</span>
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="w-full bg-transparent text-xs font-mono text-slate-800 font-semibold focus:outline-none truncate"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopyLink}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-amber-500 hover:bg-amber-600 active:scale-95 text-amber-950 font-black'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Link</span>
              </>
            )}
          </button>

          {/* WhatsApp Share */}
          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
            title="Share via WhatsApp"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span className="hidden xs:inline">WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Quotas & Capacity Limits Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        
        {/* Limit 1: 10 Tenants */}
        <div className="bg-white/95 rounded-2xl p-3.5 border border-amber-300/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <Building className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-black text-slate-900 block leading-tight">
                  Tenants Limit
                </span>
                <span className="text-[10px] text-slate-500 font-semibold">
                  Max 10 Tenants to join
                </span>
              </div>
            </div>

            <span className="text-xs font-mono font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              {tenantsCount} / {MAX_TENANTS}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-200 mb-1.5">
            <div
              className="bg-gradient-to-r from-amber-400 to-amber-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${tenantsPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
            <span>{MAX_TENANTS - tenantsCount} spots left</span>
            <span className="text-amber-800 font-bold">{tenantsPercent}% filled</span>
          </div>
        </div>

        {/* Limit 2: 100 User Subscriptions */}
        <div className="bg-white/95 rounded-2xl p-3.5 border border-indigo-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-black text-slate-900 block leading-tight">
                  Users Limit
                </span>
                <span className="text-[10px] text-slate-500 font-semibold">
                  Max 100 User subscriptions
                </span>
              </div>
            </div>

            <span className="text-xs font-mono font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
              {usersCount} / {MAX_USERS}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-200 mb-1.5">
            <div
              className="bg-gradient-to-r from-indigo-500 to-blue-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${usersPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
            <span>{MAX_USERS - usersCount} spots left</span>
            <span className="text-indigo-800 font-bold">{usersPercent}% filled</span>
          </div>
        </div>

      </div>

      {/* Rules Notice */}
      <div className="mt-3.5 flex items-center gap-2 text-[10px] text-amber-900/90 font-medium bg-amber-400/15 border border-amber-300/60 rounded-xl px-3 py-2">
        <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
        <span>
          <strong>Quota Rule:</strong> Tenant can only get 10 Tenants to join and 100 user subscriptions via their personal link.
        </span>
      </div>

    </div>
  );
};
