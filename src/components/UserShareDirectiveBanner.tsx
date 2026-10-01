import React, { useState } from 'react';
import { 
  Share2, 
  Copy, 
  Check, 
  MessageCircle, 
  Sparkles, 
  TrendingUp, 
  Users, 
  Gift
} from 'lucide-react';

interface UserShareDirectiveBannerProps {
  compact?: boolean;
}

export const UserShareDirectiveBanner: React.FC<UserShareDirectiveBannerProps> = ({
  compact = false
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://timegig.co.za';
  const exactShareLink = `${origin}?invite=join-and-earn`;

  const shareText = `🚀 Join TimeGiG and start earning! Sign up with a 30-day free trial on South Africa's premier platform for gigs and commercial partnerships. Click here to join: ${exactShareLink}`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(exactShareLink);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(shareText);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="w-full bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-slate-900/10 border-2 border-indigo-400/40 rounded-3xl p-4 shadow-md backdrop-blur-xs select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-600">
            <Gift className="w-4.5 h-4.5" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              <span>Share & Earn Network</span>
              <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-bold border border-indigo-200">
                Join & Earn
              </span>
            </h4>
            <p className="text-[10px] text-slate-500 font-medium">
              Share this exact link for other users to join and earn with TimeGiG
            </p>
          </div>
        </div>
      </div>

      {/* Exact Link & Direct Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <div className="flex-1 bg-white border border-indigo-200 rounded-xl px-3 py-1.5 flex items-center gap-2 shadow-inner overflow-hidden">
          <span className="text-indigo-400 shrink-0 text-xs font-mono">🔗</span>
          <input
            type="text"
            readOnly
            value={exactShareLink}
            className="w-full bg-transparent text-[11px] font-mono text-slate-800 font-semibold focus:outline-none truncate"
          />
        </div>

        <div className="flex items-center gap-1.5">
          {/* Copy Link Button */}
          <button
            type="button"
            onClick={handleCopyLink}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-black'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Link</span>
              </>
            )}
          </button>

          {/* WhatsApp Direct Share */}
          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
            title="Share via WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>

      <div className="mt-2.5 flex items-center gap-1.5 text-[10px] text-indigo-900 font-medium bg-indigo-50/70 border border-indigo-200/60 rounded-xl px-2.5 py-1.5">
        <Sparkles className="w-3 h-3 text-indigo-600 shrink-0" />
        <span>Direct your friends to join through this link to activate their 30-day free trial and earn.</span>
      </div>

    </div>
  );
};
