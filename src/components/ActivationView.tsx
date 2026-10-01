import React, { useState, useEffect } from 'react';
import { 
  Check, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Zap
} from 'lucide-react';
import { 
  loadLiveState, 
  subscribeToLiveStore, 
  submitProofOfPaymentAction, 
  LiveAppState 
} from '../store/liveStore';
import { PaymentTransferModal, ProofOfPaymentSubmission } from './PaymentTransferModal';

interface PlanDetails {
  id: 'tenant' | 'user';
  cardName: string;
  category: string;
  feeText: string;
  rawFee: string;
  headline: string;
  spotsBadge?: string;
  spotsCount?: string;
  cardNumber: string;
  expiryText: string;
  cardHolder: string;
  reference: string;
  cardTheme: {
    bgGradient: string;
    border: string;
    chipColor: string;
    chipCircuit: string;
    accentGlow: string;
    textColor: string;
    badgeStyle: string;
    buttonStyle: string;
  };
}

interface ActivationViewProps {
  currentSubscriptionMode?: 'tenant' | 'user';
  onSubscriptionSelect?: (type: 'tenant' | 'user') => void;
  onCardModalChange?: (isOpen: boolean) => void;
}

export const ActivationView: React.FC<ActivationViewProps> = ({ 
  currentSubscriptionMode = 'tenant',
  onSubscriptionSelect,
  onCardModalChange 
}) => {
  const [store, setStore] = useState<LiveAppState>(loadLiveState());
  const [activePaymentPlan, setActivePaymentPlan] = useState<'tenant' | 'user' | null>(null);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToLiveStore((newState) => {
      setStore(newState);
    });
    return () => unsubscribe();
  }, []);

  const tenantStatus = store.currentSession.tenantStatus;
  const userStatus = store.currentSession.userStatus;
  const tenantPending = store.tenantPoPs.some(p => p.status === 'pending');
  const userPending = store.userPoPs.some(p => p.status === 'pending');
  const isTenantActive = tenantStatus === 'approved' || (store.currentSession.isTenantTrialActive && !tenantPending);
  const isUserActive = userStatus === 'approved' || (store.currentSession.isUserTrialActive && !userPending);

  const handleOpenPayment = (planType: 'tenant' | 'user') => {
    onSubscriptionSelect?.(planType);
    setActivePaymentPlan(planType);
    onCardModalChange?.(true);
  };

  const handleClosePayment = () => {
    setActivePaymentPlan(null);
    onCardModalChange?.(false);
  };

  const handlePaymentSubmitted = (submission: ProofOfPaymentSubmission) => {
    submitProofOfPaymentAction(submission.planType, {
      fileName: submission.fileName,
      fileSize: submission.fileSize,
      fileDataUrl: submission.fileDataUrl,
      profilePicUrl: submission.profilePicUrl,
      idDocName: submission.idDocName,
      idDocUrl: submission.idDocUrl,
      userName: submission.userName,
      userEmail: submission.userEmail,
    });
    handleClosePayment();
    setFeedbackToast(
      `Documents submitted for review (15 to 25 minutes). Admin will review in ${submission.planType === 'tenant' ? 'Tenant PoP' : 'User PoP'}!`
    );
    setTimeout(() => setFeedbackToast(null), 4500);
  };

  const tenantPlan: PlanDetails = {
    id: 'tenant',
    cardName: 'TENANT PASSIVE INCOME',
    category: 'Commercial Tenant Partner',
    feeText: 'R299,99',
    rawFee: 'R299,99 / month',
    headline: 'Earn Monthly Passive Income',
    spotsBadge: 'ONLY 100 SPOTS',
    spotsCount: 'Only 100 Tenant spots available • 87 Claimed',
    cardNumber: '5412  8834  9012  7741',
    expiryText: '30D FREE TRIAL',
    cardHolder: 'VALUED TENANT PARTNER',
    reference: 'Ten29',
    cardTheme: {
      bgGradient: 'bg-gradient-to-br from-[#1c1917] via-[#292524] to-[#0c0a09]',
      border: 'border-2 border-amber-500/80',
      chipColor: 'bg-gradient-to-tr from-amber-300 via-amber-400 to-amber-200',
      chipCircuit: 'border-amber-700/60',
      accentGlow: 'shadow-[0_8px_24px_rgba(245,158,11,0.22),inset_0_1px_2px_rgba(251,191,36,0.35)]',
      textColor: 'text-amber-100',
      badgeStyle: 'bg-amber-500/20 text-amber-300 border border-amber-500/40',
      buttonStyle: 'bg-gradient-to-r from-amber-500 to-amber-400 text-amber-950 hover:brightness-105',
    },
  };

  const userPlan: PlanDetails = {
    id: 'user',
    cardName: 'USER APP SUBSCRIPTION',
    category: 'Full Application Access',
    feeText: 'R29,99',
    rawFee: 'R29,99 / month',
    headline: 'Complete App Access & Features',
    cardNumber: '4288  6109  3201  5589',
    expiryText: '30D FREE TRIAL',
    cardHolder: 'ACTIVE APP MEMBER',
    reference: 'Sub29',
    cardTheme: {
      bgGradient: 'bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617]',
      border: 'border-2 border-indigo-400/80',
      chipColor: 'bg-gradient-to-tr from-slate-200 via-slate-100 to-slate-300',
      chipCircuit: 'border-slate-500/60',
      accentGlow: 'shadow-[0_8px_24px_rgba(99,102,241,0.22),inset_0_1px_2px_rgba(165,180,252,0.35)]',
      textColor: 'text-indigo-100',
      badgeStyle: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40',
      buttonStyle: 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:brightness-105',
    },
  };

  return (
    <div className="w-full h-[calc(100dvh-7.25rem)] max-h-[calc(100dvh-7.25rem)] bg-slate-50 flex flex-col justify-between px-3.5 py-2 overflow-hidden select-none">
      {/* Toast Notification */}
      {feedbackToast && (
        <div className="fixed top-3 z-50 max-w-sm left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur-md text-white text-[11px] px-3.5 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in text-left">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="font-semibold leading-tight">{feedbackToast}</span>
        </div>
      )}

      {/* Screen Header - With Contextual Subscription Switcher */}
      <div className="w-full max-w-sm mx-auto flex items-center justify-between px-1">
        <div>
          <h1 className="text-sm font-black text-slate-900 tracking-tight leading-tight">
            Activation Plans
          </h1>
          <p className="text-[10px] text-slate-500 font-medium">
            Tap a card to start activating
          </p>
        </div>

        {/* Quick Mode Indicator Switcher */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-200/80 border border-slate-300/80 text-[10px] font-bold">
          <button
            type="button"
            onClick={() => onSubscriptionSelect?.('tenant')}
            className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
              currentSubscriptionMode === 'tenant'
                ? 'bg-amber-500 text-amber-950 font-black shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Switch top corner to Tenant Portal"
          >
            Tenant
          </button>
          <button
            type="button"
            onClick={() => onSubscriptionSelect?.('user')}
            className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
              currentSubscriptionMode === 'user'
                ? 'bg-indigo-600 text-white font-black shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Switch top corner to User Portal"
          >
            User
          </button>
        </div>
      </div>

      {/* Main Container - 2 Realistic Credit Cards */}
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col justify-around py-0.5 gap-2">
        
        {/* =================================================================== */}
        {/* 1. TENANT CREDIT CARD (Passive Income - Ref: Ten29 - R299,99)        */}
        {/* =================================================================== */}
        <div
          onClick={() => handleOpenPayment('tenant')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleOpenPayment('tenant')}
          className={`relative w-full rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between cursor-pointer transition-all duration-200 active:scale-[0.985] ${
            tenantPlan.cardTheme.bgGradient
          } ${
            currentSubscriptionMode === 'tenant' ? 'ring-2 ring-amber-400 ring-offset-2' : ''
          } ${tenantPlan.cardTheme.border} ${tenantPlan.cardTheme.accentGlow}`}
          style={{ minHeight: '165px', maxHeight: '195px' }}
        >
          {/* Subtle Gloss Reflection */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />

          {/* Card Top: Chip, RFID & Quota Badge */}
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2.5">
              {/* Gold Smartchip */}
              <div className={`w-8 h-5.5 rounded-md ${tenantPlan.cardTheme.chipColor} border ${tenantPlan.cardTheme.chipCircuit} relative overflow-hidden shadow-xs shrink-0`}>
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-amber-800/60" />
                <div className="absolute inset-y-0 left-1/3 w-[1px] bg-amber-800/60" />
                <div className="absolute inset-y-0 right-1/3 w-[1px] bg-amber-800/60" />
              </div>

              {/* Contactless Waves */}
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-amber-300/80" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8.5 16.5a5 5 0 0 1 0-9" strokeLinecap="round" />
                <path d="M12 19a8.5 8.5 0 0 1 0-14" strokeLinecap="round" />
                <path d="M15.5 21.5a12 12 0 0 1 0-19" strokeLinecap="round" />
              </svg>
            </div>

            {/* Quota Badge */}
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40">
              <TrendingUp className="w-3 h-3 text-amber-400" />
              <span className="text-[8.5px] font-black text-amber-300 uppercase tracking-wider">
                Only 100 Spots (13 Left)
              </span>
            </div>
          </div>

          {/* Card Middle: Feature & Numbers */}
          <div className="relative z-10 my-0.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-200 tracking-tight">
                Tenant Passive Income
              </span>
              <span className="text-[9px] font-mono tracking-widest text-amber-300/70">
                Ref: Ten29
              </span>
            </div>
            <p className="text-[9.5px] text-amber-300/90 font-medium line-clamp-1 mt-0.5">
              Earn monthly passive income yield automatically
            </p>
          </div>

          {/* Card Bottom: Pricing & Interactive Trigger Button */}
          <div className="flex items-center justify-between relative z-10 pt-1.5 border-t border-amber-500/20">
            <div className="flex flex-col">
              <span className="text-[7.5px] uppercase tracking-wider text-amber-300/60 font-medium">
                30D Free • Then
              </span>
              <span className="text-[11.5px] font-black text-amber-200 leading-tight">
                R299,99<span className="text-[8.5px] font-normal text-amber-300/70">/mo</span>
              </span>
            </div>

            {/* Interactive Activation Trigger */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenPayment('tenant');
              }}
              className={`px-3 py-1 rounded-lg text-[10px] font-black flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform ${
                isTenantActive
                  ? 'bg-emerald-600 text-white'
                  : tenantPending
                  ? 'bg-amber-600/90 text-white'
                  : tenantPlan.cardTheme.buttonStyle
              }`}
            >
              {isTenantActive ? (
                <>
                  <Check className="w-3 h-3 text-white stroke-[3]" />
                  <span>Verified Tenant</span>
                </>
              ) : tenantPending ? (
                <>
                  <Clock className="w-3 h-3 text-white animate-pulse" />
                  <span>Reviewing (15-25m)</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5" />
                  <span>Activate & Pay</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* =================================================================== */}
        {/* 2. USER SUBSCRIPTION CREDIT CARD (Ref: Sub29 - R29,99)              */}
        {/* =================================================================== */}
        <div
          onClick={() => handleOpenPayment('user')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleOpenPayment('user')}
          className={`relative w-full rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between cursor-pointer transition-all duration-200 active:scale-[0.985] ${
            userPlan.cardTheme.bgGradient
          } ${
            currentSubscriptionMode === 'user' ? 'ring-2 ring-indigo-400 ring-offset-2' : ''
          } ${userPlan.cardTheme.border} ${userPlan.cardTheme.accentGlow}`}
          style={{ minHeight: '165px', maxHeight: '195px' }}
        >
          {/* Subtle Gloss Reflection */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />

          {/* Card Top: Chip, RFID & Access Tier Badge */}
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2.5">
              {/* Platinum Smartchip */}
              <div className={`w-8 h-5.5 rounded-md ${userPlan.cardTheme.chipColor} border ${userPlan.cardTheme.chipCircuit} relative overflow-hidden shadow-xs shrink-0`}>
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-slate-600/60" />
                <div className="absolute inset-y-0 left-1/3 w-[1px] bg-slate-600/60" />
                <div className="absolute inset-y-0 right-1/3 w-[1px] bg-slate-600/60" />
              </div>

              {/* Contactless Waves */}
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-indigo-300/80" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8.5 16.5a5 5 0 0 1 0-9" strokeLinecap="round" />
                <path d="M12 19a8.5 8.5 0 0 1 0-14" strokeLinecap="round" />
                <path d="M15.5 21.5a12 12 0 0 1 0-19" strokeLinecap="round" />
              </svg>
            </div>

            {/* Access Pass Badge */}
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/40">
              <span className="text-[8.5px] font-black text-indigo-300 uppercase tracking-wider">
                Full App Access
              </span>
            </div>
          </div>

          {/* Card Middle: Feature & Numbers */}
          <div className="relative z-10 my-0.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-indigo-200 tracking-tight">
                User Subscription
              </span>
              <span className="text-[9px] font-mono tracking-widest text-indigo-300/70">
                Ref: Sub29
              </span>
            </div>
            <p className="text-[9.5px] text-indigo-300/90 font-medium line-clamp-1 mt-0.5">
              Access all features, gig matching & verified opportunities
            </p>
          </div>

          {/* Card Bottom: Pricing & Interactive Trigger Button */}
          <div className="flex items-center justify-between relative z-10 pt-1.5 border-t border-indigo-500/20">
            <div className="flex flex-col">
              <span className="text-[7.5px] uppercase tracking-wider text-indigo-300/60 font-medium">
                30D Free • Then
              </span>
              <span className="text-[11.5px] font-black text-indigo-200 leading-tight">
                R29,99<span className="text-[8.5px] font-normal text-indigo-300/70">/mo</span>
              </span>
            </div>

            {/* Interactive Activation Trigger */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenPayment('user');
              }}
              className={`px-3 py-1 rounded-lg text-[10px] font-black flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform ${
                isUserActive
                  ? 'bg-emerald-600 text-white'
                  : userPending
                  ? 'bg-indigo-700/90 text-white'
                  : userPlan.cardTheme.buttonStyle
              }`}
            >
              {isUserActive ? (
                <>
                  <Check className="w-3 h-3 text-white stroke-[3]" />
                  <span>Verified User</span>
                </>
              ) : userPending ? (
                <>
                  <Clock className="w-3 h-3 text-white animate-pulse" />
                  <span>Reviewing (15-25m)</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5" />
                  <span>Activate & Pay</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

      {/* =================================================================== */}
      {/* CAPITEC TRANSFER & DOCUMENT UPLOAD MODAL                            */}
      {/* =================================================================== */}
      {activePaymentPlan && (
        <PaymentTransferModal
          isOpen={!!activePaymentPlan}
          onClose={handleClosePayment}
          onSubmitProof={handlePaymentSubmitted}
          currentSubmission={null}
          planType={activePaymentPlan}
          initialProfilePic={store.currentSession.profilePicUrl}
          initialIdDocName={store.currentSession.idDocName}
          initialIdDocUrl={store.currentSession.idDocUrl}
        />
      )}

    </div>
  );
};
