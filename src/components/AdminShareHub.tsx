import React, { useState } from 'react';
import { 
  Share2, 
  Copy, 
  Check, 
  ExternalLink, 
  MessageCircle, 
  Globe, 
  Sparkles, 
  TrendingUp, 
  Send,
  Users
} from 'lucide-react';

interface AdminShareHubProps {
  compact?: boolean;
}

export const AdminShareHub: React.FC<AdminShareHubProps> = ({ compact = false }) => {
  const [copied, setCopied] = useState<boolean>(false);

  // Exact platform invite link that directs users to join and earn
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://timegig.co.za';
  const exactShareLink = `${origin}?invite=join-and-earn`;

  const shareTitle = 'Join TimeGiG & Start Earning (30-Day Free Trial)';
  const shareText = `🚀 Join TimeGiG and start earning today! Get full access with a 30-day free trial to South Africa's top platform for gigs, talent, and commercial rentals. Join here: ${exactShareLink}`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(exactShareLink);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Social Media Platform Sharing Handlers
  const sharePlatforms = [
    {
      name: 'WhatsApp',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.074-1.895-.447-1.077-.445-1.776-1.545-1.83-1.616-.053-.071-.434-.577-.434-1.1 0-.524.275-.78.373-.887.098-.106.213-.133.284-.133.07 0 .142 0 .205.003.067.004.156-.025.244.186.091.218.312.76.339.815.027.054.045.118.009.19-.036.071-.054.116-.107.179-.053.062-.112.138-.16.186-.053.053-.109.111-.047.218.062.107.276.455.592.736.406.362.748.474.855.527.106.054.169.045.231-.027.062-.071.267-.311.338-.418.071-.107.142-.089.24-.053.098.035.622.293.729.347.107.053.178.08.205.124.027.045.027.257-.117.662z"/>
        </svg>
      ),
      bg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'Facebook',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      bg: 'bg-blue-600 hover:bg-blue-700 text-white',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(exactShareLink)}`,
    },
    {
      name: 'X (Twitter)',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      bg: 'bg-slate-900 hover:bg-black text-white',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 0 0 1.53-1.53c0-.85-.68-1.53-1.53-1.53a1.53 1.53 0 0 0-1.53 1.53c0 .85.68 1.53 1.53 1.53m1.39 9.74v-8.37H5.07v8.37h2.78z"/>
        </svg>
      ),
      bg: 'bg-sky-700 hover:bg-sky-800 text-white',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(exactShareLink)}`,
    },
    {
      name: 'Telegram',
      icon: (
        <Send className="w-3.5 h-3.5" />
      ),
      bg: 'bg-sky-500 hover:bg-sky-600 text-white',
      url: `https://t.me/share/url?url=${encodeURIComponent(exactShareLink)}&text=${encodeURIComponent(shareText)}`,
    },
  ];

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: exactShareLink,
        });
      } catch {
        // Fallback to copy link
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/30 rounded-3xl p-5 shadow-2xl text-white select-none">
      
      {/* Top Header */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-400 shadow-xs">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black tracking-tight flex items-center gap-1.5">
              <span>Admin Social Media Share Hub</span>
              <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/40 font-bold">
                Join & Earn
              </span>
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">
              Share the official app link on social media to direct users to join and earn
            </p>
          </div>
        </div>

        {/* Live Active Community Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-black px-2.5 py-1 rounded-xl bg-slate-800/80 border border-slate-700 text-indigo-300">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          <span>Active Inflow</span>
        </div>
      </div>

      {/* Exact Link Display Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-4">
        <div className="flex-1 bg-slate-950/80 border border-indigo-500/40 rounded-xl px-3 py-2 flex items-center gap-2 shadow-inner overflow-hidden">
          <span className="text-indigo-400 shrink-0 text-xs font-mono">🔗</span>
          <input
            type="text"
            readOnly
            value={exactShareLink}
            className="w-full bg-transparent text-xs font-mono text-indigo-200 font-semibold focus:outline-none truncate"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Copy Link Button */}
          <button
            type="button"
            onClick={handleCopyLink}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-black'
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

          {/* Native Device Share Sheet */}
          <button
            type="button"
            onClick={handleNativeShare}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
            title="Share via device options"
          >
            <Share2 className="w-4 h-4 text-indigo-400" />
            <span className="hidden xs:inline">Share</span>
          </button>
        </div>
      </div>

      {/* Social Media Platform Action Buttons */}
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
          Share directly with other social media platforms:
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {sharePlatforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer ${platform.bg}`}
              title={`Share on ${platform.name}`}
            >
              {platform.icon}
              <span className="text-[11px] truncate">{platform.name}</span>
            </a>
          ))}
        </div>
      </div>

      {/* How the link directs users */}
      <div className="mt-4 p-3 rounded-2xl bg-indigo-950/60 border border-indigo-500/20 flex items-start gap-2.5 text-slate-300 text-[11px] leading-relaxed">
        <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white block font-bold">How the link directs users:</strong>
          Opening this exact link directs users to the 30-day free trial subscription options (Tenant or User) and gives them the direct prompt to share with other users to join and earn with TimeGiG.
        </div>
      </div>

    </div>
  );
};
