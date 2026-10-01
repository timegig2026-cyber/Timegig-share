import React, { useState, useEffect } from 'react';
import { 
  Building, 
  UserCheck, 
  Sparkles, 
  TrendingUp, 
  ArrowRight,
  Zap,
  RotateCcw,
  ShieldAlert
} from 'lucide-react';
import { PaymentTransferModal, ProofOfPaymentSubmission } from './components/PaymentTransferModal';
import { SubscribedBottomNav, SubscribedTab } from './components/SubscribedBottomNav';
import { ProfileView } from './components/ProfileView';
import { TenantPortalModal } from './components/TenantPortalModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { RegistrationModal } from './components/RegistrationModal';
import { UserShareDirectiveBanner } from './components/UserShareDirectiveBanner';
import { loadLiveState, saveLiveState, submitProofOfPaymentAction, LiveAppState } from './store/liveStore';

export default function App() {
  const [store, setStore] = useState<LiveAppState>(loadLiveState());
  const [activePaymentPlan, setActivePaymentPlan] = useState<'tenant' | 'user' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Detect if user landed via shared exact invite link to join and earn
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('invite') || urlParams.get('ref')) {
        setToastMessage('🎉 Welcome! You were invited to join & earn with TimeGiG. 30-day trial ready!');
        setTimeout(() => setToastMessage(null), 5000);
      }
    }
  }, []);
  
  // Subscription Activation State
  const [isActivated, setIsActivated] = useState<boolean>(false);
  const [activatedPlan, setActivatedPlan] = useState<'tenant' | 'user'>('user');
  const [subscribedTab, setSubscribedTab] = useState<SubscribedTab>('gigs');
  
  // Tenant Portal Modal State
  const [isTenantPortalOpen, setIsTenantPortalOpen] = useState<boolean>(false);
  
  // Admin Portal State (Directly accessible with no pass key needed when logged in with timegig2026@gmail.com)
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState<boolean>(false);

  // Email Restriction: Admin feature is visible ONLY when logged in with timegig2026@gmail.com
  const currentUserEmail = (store.currentSession.userEmail || '').trim().toLowerCase();
  const isAuthorizedAdminEmail = currentUserEmail === 'timegig2026@gmail.com';

  const handleOpenAdmin = () => {
    // Just show admin directly - no pass key needed
    setIsAdminPortalOpen(true);
  };

  // Account Registration & Terms Acceptance Modal State
  const [isRegistrationOpen, setIsRegistrationOpen] = useState<boolean>(false);

  const handleOpenPayment = (plan: 'tenant' | 'user') => {
    setActivePaymentPlan(plan);
  };

  const handleClosePayment = () => {
    setActivePaymentPlan(null);
  };

  // Called when user initiates activation for their chosen subscription
  const handleActivateSubscription = (plan: 'tenant' | 'user') => {
    setActivatedPlan(plan);
    handleClosePayment();
    // User must register account with email and password then accept terms and conditions after activating subscription
    setIsRegistrationOpen(true);
  };

  // Called after user registers email/password and accepts terms & conditions
  const handleRegistrationComplete = (data: { email: string; termsAccepted: boolean }) => {
    const updatedStore: LiveAppState = {
      ...store,
      currentSession: {
        ...store.currentSession,
        userEmail: data.email,
        isTenantTrialActive: activatedPlan === 'tenant' ? true : store.currentSession.isTenantTrialActive,
        isUserTrialActive: activatedPlan === 'user' ? true : store.currentSession.isUserTrialActive,
        tenantStatus: activatedPlan === 'tenant' ? ('trial' as const) : store.currentSession.tenantStatus,
        userStatus: activatedPlan === 'user' ? ('trial' as const) : store.currentSession.userStatus,
      }
    };
    saveLiveState(updatedStore);
    setStore(updatedStore);
    setIsRegistrationOpen(false);
    setIsActivated(true);
    setToastMessage('Account registered and terms accepted! Subscription active.');
    setTimeout(() => setToastMessage(null), 3500);
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
    // Direct user to empty white screen with bottom menu bar
    handleActivateSubscription(submission.planType);
  };

  return (
    <>
      {/* =================================================================== */}
      {/* TOP CORNER ICONS: ADMIN FEATURE ICON NEXT TO TENANT PORTAL ICON     */}
      {/* =================================================================== */}
      <div className="fixed top-3.5 right-3.5 z-40 flex items-center gap-2">
        {/* Admin Feature Icon (Shown ONLY in timegig2026@gmail.com with secret password) */}
        {isAuthorizedAdminEmail && (
          <button
            type="button"
            onClick={handleOpenAdmin}
            className="w-11 h-11 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-300/90 shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.22)] flex items-center justify-center text-slate-700 hover:text-slate-950 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Admin Portal"
            title="Admin Portal (Restricted to timegig2026@gmail.com)"
          >
            <div className="relative flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-indigo-600 stroke-[2.3]" />
              {/* Subtle indigo status dot */}
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_6px_rgba(99,102,241,0.9)] border-2 border-white" />
            </div>
          </button>
        )}

        {/* Tenant Portal Icon (Only visible in tenant subscription) */}
        {isActivated && activatedPlan === 'tenant' && (
          <button
            type="button"
            onClick={() => setIsTenantPortalOpen(true)}
            className="w-11 h-11 rounded-2xl bg-white/95 backdrop-blur-md border border-amber-300 shadow-[0_4px_16px_rgba(245,158,11,0.25)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.4)] flex items-center justify-center text-amber-700 hover:text-amber-900 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Tenant Portal"
            title="Tenant Portal"
          >
            <div className="relative flex items-center justify-center">
              <Building className="w-5 h-5 text-amber-600 stroke-[2.3]" />
              {/* Subtle amber status dot */}
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.9)] border-2 border-white" />
            </div>
          </button>
        )}
      </div>

      {/* =================================================================== */}
      {/* STATE 2: ACTIVATED - EMPTY WHITE SCREEN WITH BOTTOM MENU BAR        */}
      {/* (Features: Seekers, GiGs, and Profile)                              */}
      {/* =================================================================== */}
      {isActivated ? (
        <div className="min-h-screen w-full bg-white flex flex-col justify-between select-none">
          
          {/* Main Canvas: Empty White Screen for Seekers & GiGs; Profile Information for Profile */}
          <main className="flex-1 w-full bg-white relative flex flex-col items-center">
            {/* Discreet Reset Button to return to activation bubbles if needed */}
            <button
              type="button"
              onClick={() => setIsActivated(false)}
              className="absolute top-3.5 left-3.5 z-30 text-[10px] text-slate-300 hover:text-slate-600 transition-colors flex items-center gap-1 cursor-pointer p-1"
              title="Switch back to subscriptions view"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>

            {/* Profile Feature: Shows Profile Information with Profile Picture Logo */}
            {subscribedTab === 'profile' && (
              <ProfileView
                store={store}
                planType={activatedPlan}
                onUpdateSession={(updated) => {
                  setStore(prev => ({
                    ...prev,
                    currentSession: {
                      ...prev.currentSession,
                      ...updated
                    }
                  }));
                }}
              />
            )}
          </main>

          {/* Bottom Menu Bar with Seekers, GiGs, and Profile */}
          <SubscribedBottomNav
            activeTab={subscribedTab}
            onSelectTab={setSubscribedTab}
            profilePicUrl={store.currentSession.profilePicUrl}
          />
        </div>
      ) : (
        /* =================================================================== */
        /* STATE 1: 2 BIG BUBBLES UNDER EACH OTHER (Tenant & User Subscriptions) */
        /* =================================================================== */
        <div className="min-h-screen w-full bg-radial from-slate-900 via-slate-950 to-black text-white flex flex-col items-center justify-center p-4 sm:p-6 overflow-y-auto">
          
          {/* Toast Alert */}
          {toastMessage && (
            <div className="fixed top-4 z-50 max-w-sm left-1/2 -translate-x-1/2 bg-white/95 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-2xl shadow-2xl border border-slate-200 flex items-center gap-2 animate-in fade-in">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Main Container - 2 Big Bubbles Under Each Other */}
          <div className="w-full max-w-md flex flex-col items-center justify-center gap-6 py-4">
            
            {/* User Can Only Choose 1 Subscription Notice */}
            <div className="flex flex-col items-center text-center gap-1 mb-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Single Plan Selection</span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                You can only choose 1 subscription (Tenant or User)
              </p>
            </div>
            
            {/* Bubble 1: Tenant Subscription */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => handleOpenPayment('tenant')}
              onKeyDown={(e) => e.key === 'Enter' && handleOpenPayment('tenant')}
              className="group relative w-full aspect-[4/3] max-w-[340px] sm:max-w-[360px] rounded-[3rem] p-6 sm:p-7 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] select-none text-left overflow-hidden bg-gradient-to-br from-amber-500/20 via-amber-600/30 to-yellow-950/60 backdrop-blur-xl border-2 border-amber-400/60 shadow-[0_20px_50px_rgba(245,158,11,0.25),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-8px_16px_rgba(0,0,0,0.5)]"
            >
              {/* Glass Bubble Highlights */}
              <div className="absolute -top-12 -left-12 w-44 h-44 rounded-full bg-gradient-to-br from-white/35 to-transparent blur-md pointer-events-none" />
              <div className="absolute top-4 right-6 w-12 h-6 rounded-full bg-white/20 blur-xs rotate-[-25deg] pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full bg-amber-500/20 blur-xl pointer-events-none" />

              {/* Bubble Top Header */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/30 border border-amber-300/50 flex items-center justify-center text-amber-300 shadow-[0_4px_12px_rgba(245,158,11,0.4)]">
                    <Building className="w-6 h-6 drop-shadow-sm" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black tracking-widest uppercase text-amber-300/90 block">
                      Commercial Partner
                    </span>
                    <h2 className="text-xl font-black text-white tracking-tight leading-none drop-shadow-md">
                      Tenant Subscription
                    </h2>
                  </div>
                </div>

                {/* Quota Badge */}
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-200">
                  <TrendingUp className="w-3 h-3 text-amber-300" />
                  <span className="text-[9px] font-black tracking-wider uppercase">
                    100 Spots
                  </span>
                </div>
              </div>

              {/* Bubble Middle: Value Proposition */}
              <div className="relative z-10 my-auto py-2">
                <p className="text-xs sm:text-sm text-amber-100 font-semibold leading-snug">
                  Earn Monthly Passive Income Yield
                </p>
                <span className="text-[11px] text-amber-200/70 font-medium">
                  Reference: <strong className="text-amber-300 font-mono">Ten29</strong> · Capitec verified partner
                </span>
              </div>

              {/* Bubble Bottom: Pricing & Call to Action */}
              <div className="relative z-10 pt-3 border-t border-amber-400/20 flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-amber-300/80 font-bold block">
                    30-Day Free Trial
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-amber-300 tracking-tight font-mono">
                      R299,99
                    </span>
                    <span className="text-xs text-amber-200/70 font-medium">
                      /month
                    </span>
                  </div>
                </div>

                {/* Action Pill */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleActivateSubscription('tenant');
                    }}
                    className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-amber-950 font-black text-xs flex items-center gap-1.5 shadow-[0_4px_16px_rgba(245,158,11,0.5)] transition-transform group-hover:translate-x-0.5 cursor-pointer"
                  >
                    <span>Activate</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bubble 2: User Subscription */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => handleOpenPayment('user')}
              onKeyDown={(e) => e.key === 'Enter' && handleOpenPayment('user')}
              className="group relative w-full aspect-[4/3] max-w-[340px] sm:max-w-[360px] rounded-[3rem] p-6 sm:p-7 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] select-none text-left overflow-hidden bg-gradient-to-br from-indigo-500/20 via-indigo-600/30 to-blue-950/60 backdrop-blur-xl border-2 border-indigo-400/60 shadow-[0_20px_50px_rgba(99,102,241,0.25),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-8px_16px_rgba(0,0,0,0.5)]"
            >
              {/* Glass Bubble Highlights */}
              <div className="absolute -top-12 -left-12 w-44 h-44 rounded-full bg-gradient-to-br from-white/35 to-transparent blur-md pointer-events-none" />
              <div className="absolute top-4 right-6 w-12 h-6 rounded-full bg-white/20 blur-xs rotate-[-25deg] pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full bg-indigo-500/20 blur-xl pointer-events-none" />

              {/* Bubble Top Header */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/30 border border-indigo-300/50 flex items-center justify-center text-indigo-300 shadow-[0_4px_12px_rgba(99,102,241,0.4)]">
                    <UserCheck className="w-6 h-6 drop-shadow-sm" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black tracking-widest uppercase text-indigo-300/90 block">
                      Member Access
                    </span>
                    <h2 className="text-xl font-black text-white tracking-tight leading-none drop-shadow-md">
                      User Subscription
                    </h2>
                  </div>
                </div>

                {/* Access Badge */}
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-400/20 border border-indigo-400/40 text-indigo-200">
                  <Sparkles className="w-3 h-3 text-indigo-300" />
                  <span className="text-[9px] font-black tracking-wider uppercase">
                    Full Pass
                  </span>
                </div>
              </div>

              {/* Bubble Middle: Value Proposition */}
              <div className="relative z-10 my-auto py-2">
                <p className="text-xs sm:text-sm text-indigo-100 font-semibold leading-snug">
                  Complete App Access, Features & GiG Matching
                </p>
                <span className="text-[11px] text-indigo-200/70 font-medium">
                  Reference: <strong className="text-indigo-300 font-mono">Sub29</strong> · Capitec verified member
                </span>
              </div>

              {/* Bubble Bottom: Pricing & Call to Action */}
              <div className="relative z-10 pt-3 border-t border-indigo-400/20 flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-indigo-300/80 font-bold block">
                    30-Day Free Trial
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-indigo-300 tracking-tight font-mono">
                      R29,99
                    </span>
                    <span className="text-xs text-indigo-200/70 font-medium">
                      /month
                    </span>
                  </div>
                </div>

                {/* Action Pill */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleActivateSubscription('user');
                    }}
                    className="px-4 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-400 hover:to-blue-500 text-white font-black text-xs flex items-center gap-1.5 shadow-[0_4px_16px_rgba(99,102,241,0.5)] transition-transform group-hover:translate-x-0.5 cursor-pointer"
                  >
                    <span>Activate</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Directive for users to share the exact link for other users to join and earn with the app */}
            <div className="w-full max-w-[340px] sm:max-w-[360px] mt-1">
              <UserShareDirectiveBanner />
            </div>

          </div>
        </div>
      )}

      {/* Payment / Proof of Payment Modal */}
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

      {/* Full-Screen Tenant Portal Modal */}
      <TenantPortalModal
        isOpen={isTenantPortalOpen}
        onClose={() => setIsTenantPortalOpen(false)}
        portalType="tenant"
      />

      {/* Full-Screen Admin Portal Modal (With Live Online Active & Profit Balances - Only in Admin) */}
      <AdminPortalModal
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
      />

      {/* Account Registration & Terms Acceptance Modal (Required after activating subscription) */}
      <RegistrationModal
        isOpen={isRegistrationOpen}
        planType={activatedPlan}
        initialEmail={store.currentSession.userEmail || 'timegig2026@gmail.com'}
        onComplete={handleRegistrationComplete}
        onClose={() => setIsRegistrationOpen(false)}
      />
    </>
  );
}
