import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ChevronRight, 
  Check, 
  X, 
  Eye, 
  FileText, 
  Clock, 
  ShieldCheck, 
  AlertCircle, 
  User, 
  CreditCard, 
  Building,
  RefreshCw,
  PlusCircle,
  ExternalLink,
  CheckCircle2,
  XCircle,
  TrendingUp
} from 'lucide-react';
import { 
  loadLiveState, 
  saveLiveState, 
  subscribeToLiveStore, 
  approvePoPAction, 
  rejectPoPAction, 
  PoPSubmission,
  LiveAppState 
} from '../store/liveStore';
import { 
  createSampleCapitecReceiptSvg, 
  createSampleIdCardSvg, 
  SAMPLE_FACE_TENANT, 
  SAMPLE_FACE_USER 
} from '../utils/sampleDocuments';

interface AdminRealisticButton {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  surfaceGrad: string;
  borderStyle: string;
  shadowStyle: string;
  ledColor: string;
  ledGlow: string;
  iconPodStyle: string;
  icon: React.ReactNode;
}

interface AdminViewProps {
  showProfitStats?: boolean;
}

export const AdminView: React.FC<AdminViewProps> = ({ showProfitStats = true }) => {
  const [store, setStore] = useState<LiveAppState>(loadLiveState());
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [viewingDoc, setViewingDoc] = useState<{ title: string; url?: string; type: string; details?: string } | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [rejectPromptId, setRejectPromptId] = useState<{ id: string; type: 'tenant' | 'user' } | null>(null);
  const [rejectReason, setRejectReason] = useState<string>('Payment reference does not match or funds not received');

  useEffect(() => {
    const unsubscribe = subscribeToLiveStore((newState) => {
      setStore(newState);
    });
    return () => unsubscribe();
  }, []);

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  const handleApprove = (id: string, type: 'tenant' | 'user') => {
    approvePoPAction(id, type);
    showNotice(`Submission approved! Account verified & activated.`);
  };

  const handleReject = (id: string, type: 'tenant' | 'user') => {
    rejectPoPAction(id, type, rejectReason);
    setRejectPromptId(null);
    showNotice(`Submission rejected and marked offline.`);
  };

  // Seed test demo item if admin queue is empty so they can test immediately
  const handleSeedDemoSubmission = (type: 'tenant' | 'user') => {
    const isTenant = type === 'tenant';
    const state = loadLiveState();
    const demoSub: PoPSubmission = {
      id: `${type}-demo-${Date.now()}`,
      userName: isTenant ? 'Sarah Jenkins' : 'Michael Ndlovu',
      userEmail: isTenant ? 'sarah.tenant@example.co.za' : 'michael.user@example.co.za',
      amount: isTenant ? 'R299,99' : 'R29,99',
      reference: isTenant ? 'Ten29' : 'Sub29',
      bank: 'Capitec',
      accountNumber: '1334067366',
      accountName: 'Matthews',
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now(),
      fileName: isTenant ? 'Capitec_Payment_Ten29_R299.pdf' : 'Capitec_Payment_Sub29_R29.pdf',
      fileSize: '320 KB',
      fileDataUrl: createSampleCapitecReceiptSvg(isTenant ? 'Ten29' : 'Sub29', isTenant ? 'R299,99' : 'R29,99', isTenant ? 'Sarah Jenkins' : 'Michael Ndlovu'),
      profilePicUrl: isTenant ? SAMPLE_FACE_TENANT : SAMPLE_FACE_USER,
      idDocName: isTenant ? 'sarah_national_id_card.pdf' : 'michael_id_card.pdf',
      idDocUrl: createSampleIdCardSvg(isTenant ? 'SARAH JENKINS' : 'MICHAEL NDLOVU', isTenant ? '880614 5129 084' : '940523 5219 088', isTenant ? '1988-06-14' : '1994-05-23'),
      status: 'pending',
      type,
    };

    if (isTenant) {
      state.tenantPoPs.unshift(demoSub);
    } else {
      state.userPoPs.unshift(demoSub);
    }
    saveLiveState(state);
    setStore(state);
    showNotice(`Demo ${type} submission added for review!`);
  };

  const tenantPoPList = store.tenantPoPs || [];
  const userPoPList = store.userPoPs || [];
  const pendingTenants = tenantPoPList.filter(p => p.status === 'pending');
  const pendingUsers = userPoPList.filter(p => p.status === 'pending');
  const allSubmissions = [...tenantPoPList, ...userPoPList];
  const approvedPoPs = allSubmissions.filter(p => p.status === 'approved');

  // Profit Balances & Live Online Active Calculations (Exact Specifications)
  const activeTenants = 88;
  const activeUsers = 142;
  const tenantProfit = 26399.12;
  const userProfit = 4258.58;
  const totalProfit = 30657.70;

  const formatZAR = (val: number) => {
    return 'R' + val.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const features: AdminRealisticButton[] = [
    {
      id: 'verified',
      title: 'Verified',
      subtitle: `${allSubmissions.length} Verification Profiles Received (Face & ID)`,
      badge: `${allSubmissions.filter(s => s.status === 'pending').length} Pending`,
      surfaceGrad: 'bg-gradient-to-b from-emerald-50/90 via-white to-emerald-100/40',
      borderStyle: 'border border-emerald-300/80',
      shadowStyle: 'shadow-[0_8px_20px_-4px_rgba(16,185,129,0.22),inset_0_1.5px_1px_rgba(255,255,255,0.95),inset_0_-2px_4px_rgba(5,150,105,0.08)]',
      ledColor: 'bg-emerald-500',
      ledGlow: 'shadow-[0_0_8px_rgba(16,185,129,0.85)]',
      iconPodStyle: 'bg-gradient-to-b from-emerald-100 to-emerald-50 border border-emerald-200/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_4px_rgba(5,150,105,0.12)]',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]" fill="none">
          <path
            d="M9 12.75L11.25 15L15 9.75M21 12C21 13.268 20.37 14.39 19.407 15.068C18.89 15.431 18.528 15.968 18.364 16.596C18.17 17.337 17.337 18.17 16.596 18.364C15.968 18.528 15.431 18.89 15.068 19.407C14.39 20.37 13.268 21 12 21C10.732 21 9.61 20.37 8.932 19.407C8.569 18.89 8.032 18.528 7.404 18.364C6.663 18.17 5.83 17.337 5.636 16.596C5.472 15.968 5.11 15.431 4.593 15.068C3.63 14.39 3 13.268 3 12C3 10.732 3.63 9.61 4.593 8.932C5.11 8.569 5.472 8.032 5.636 7.404C5.83 6.663 6.663 5.83 7.404 5.636C8.032 5.472 8.569 5.11 8.932 4.593C9.61 3.63 10.732 3 12 3C13.268 3 14.39 3.63 15.068 4.593C15.431 5.11 15.968 5.472 16.596 5.636C17.337 5.83 18.17 6.663 18.364 7.404C18.528 8.032 18.89 8.569 19.407 8.932C20.37 9.61 21 10.732 21 12Z"
            stroke="#059669"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 'tenant-pop',
      title: 'Tenant PoP',
      subtitle: `${pendingTenants.length} Pending Capitec Proofs (Ref: Ten29)`,
      badge: `${pendingTenants.length} Awaiting`,
      surfaceGrad: 'bg-gradient-to-b from-amber-50/90 via-white to-amber-100/40',
      borderStyle: 'border border-amber-300/80',
      shadowStyle: 'shadow-[0_8px_20px_-4px_rgba(245,158,11,0.22),inset_0_1.5px_1px_rgba(255,255,255,0.95),inset_0_-2px_4px_rgba(217,119,6,0.08)]',
      ledColor: 'bg-amber-500',
      ledGlow: 'shadow-[0_0_8px_rgba(245,158,11,0.85)]',
      iconPodStyle: 'bg-gradient-to-b from-amber-100 to-amber-50 border border-amber-200/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_4px_rgba(217,119,6,0.12)]',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]" fill="none">
          <path
            d="M19.5 14.25V11.625C19.5 9.76104 17.989 8.25 16.125 8.25H14.625C14.0037 8.25 13.5 7.74632 13.5 7.125V5.625C13.5 3.76104 11.989 2.25 10.125 2.25H5.625C5.00368 2.25 4.5 2.75368 4.5 3.375V20.625C4.5 21.2463 5.00368 21.75 5.625 21.75H18.375C18.9963 21.75 19.5 21.2463 19.5 20.625V14.25Z"
            stroke="#d97706"
            strokeWidth="1.8"
          />
          <path d="M8.25 12H15.75M8.25 15.5H12" stroke="#b45309" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'user-pop',
      title: 'User PoP',
      subtitle: `${pendingUsers.length} Pending Capitec Proofs (Ref: Sub29)`,
      badge: `${pendingUsers.length} Awaiting`,
      surfaceGrad: 'bg-gradient-to-b from-indigo-50/90 via-white to-indigo-100/40',
      borderStyle: 'border border-indigo-300/80',
      shadowStyle: 'shadow-[0_8px_20px_-4px_rgba(99,102,241,0.22),inset_0_1.5px_1px_rgba(255,255,255,0.95),inset_0_-2px_4px_rgba(79,70,229,0.08)]',
      ledColor: 'bg-indigo-500',
      ledGlow: 'shadow-[0_0_8px_rgba(99,102,241,0.85)]',
      iconPodStyle: 'bg-gradient-to-b from-indigo-100 to-indigo-50 border border-indigo-200/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_4px_rgba(79,70,229,0.12)]',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]" fill="none">
          <rect x="2.5" y="5" width="19" height="14" rx="2.5" stroke="#4f46e5" strokeWidth="1.8" />
          <path d="M2.5 9.5H21.5" stroke="#4338ca" strokeWidth="1.8" />
          <rect x="5.5" y="13" width="4" height="3" rx="0.5" fill="#c7d2fe" stroke="#4338ca" strokeWidth="1" />
          <circle cx="16" cy="14.5" r="1.5" fill="#818cf8" />
        </svg>
      ),
    },
    {
      id: 'verified-pop',
      title: 'Verified PoP',
      subtitle: `${approvedPoPs.length} Approved & Cleared Payment Records`,
      badge: `${approvedPoPs.length} Cleared`,
      surfaceGrad: 'bg-gradient-to-b from-sky-50/90 via-white to-sky-100/40',
      borderStyle: 'border border-sky-300/80',
      shadowStyle: 'shadow-[0_8px_20px_-4px_rgba(14,165,233,0.22),inset_0_1.5px_1px_rgba(255,255,255,0.95),inset_0_-2px_4px_rgba(2,132,199,0.08)]',
      ledColor: 'bg-sky-500',
      ledGlow: 'shadow-[0_0_8px_rgba(14,165,233,0.85)]',
      iconPodStyle: 'bg-gradient-to-b from-sky-100 to-sky-50 border border-sky-200/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_4px_rgba(2,132,199,0.12)]',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]" fill="none">
          <path
            d="M9 11L11.5 13.5L16 8M10.125 2.25H5.625C5.00368 2.25 4.5 2.75368 4.5 3.375V20.625C4.5 21.2463 5.00368 21.75 5.625 21.75H18.375C18.9963 21.75 19.5 21.2463 19.5 20.625V11.625M10.125 2.25A3.375 3.375 0 0113.5 5.625V7.125C13.5 7.74632 14.0037 8.25 14.625 8.25H16.125C17.989 8.25 19.5 9.76104 19.5 11.625"
            stroke="#0284c7"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  // =========================================================================
  // SUB-VIEW: FEATURE DETAIL LIST VIEW
  // =========================================================================
  if (activeFeature) {
    const feature = features.find((f) => f.id === activeFeature);

    // Filter submissions according to feature selected
    let currentList: PoPSubmission[] = [];
    let isPoPFeature = false;
    let isVerificationFeature = false;

    if (activeFeature === 'tenant-pop') {
      currentList = tenantPoPList;
      isPoPFeature = true;
    } else if (activeFeature === 'user-pop') {
      currentList = userPoPList;
      isPoPFeature = true;
    } else if (activeFeature === 'verified-pop') {
      currentList = approvedPoPs;
      isPoPFeature = true;
    } else if (activeFeature === 'verified') {
      currentList = allSubmissions;
      isVerificationFeature = true;
    }

    return (
      <div className="w-full flex-1 min-h-[calc(100vh-4rem)] bg-slate-50 flex flex-col pb-20">
        {/* Sub-View Sticky Top Navigation */}
        <div className="w-full max-w-md mx-auto px-4 py-3 flex items-center justify-between border-b border-slate-200 bg-white/95 backdrop-blur-xs sticky top-0 z-20">
          <button
            type="button"
            onClick={() => setActiveFeature(null)}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors py-1.5 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 cursor-pointer shadow-2xs active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600" />
            <span>Admin</span>
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-slate-900 tracking-tight">
              {feature?.title}
            </span>
            <div className={`w-2 h-2 rounded-full ${feature?.ledColor} ${feature?.ledGlow}`} />
          </div>

          {/* Quick Demo Seed Button */}
          {activeFeature !== 'verified-pop' && (
            <button
              type="button"
              onClick={() => handleSeedDemoSubmission(activeFeature === 'tenant-pop' ? 'tenant' : 'user')}
              className="text-[10px] font-bold text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 py-1 px-2 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
              title="Add sample submission for testing"
            >
              <PlusCircle className="w-3 h-3" />
              <span>Demo</span>
            </button>
          )}
          {activeFeature === 'verified-pop' && <div className="w-12" />}
        </div>

        {/* Compact Admin Top Bar in Sub-Views */}
        <div className="w-full max-w-md mx-auto px-4 pt-2.5">
          <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-900 text-white text-[10px] font-bold shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-amber-300">{activeTenants} Tenants ({formatZAR(tenantProfit)})</span>
              <span className="text-slate-600">|</span>
              <span className="text-indigo-300">{activeUsers} Users ({formatZAR(userProfit)})</span>
            </div>
            <span className="text-emerald-300 font-mono font-black">{formatZAR(totalProfit)}</span>
          </div>
        </div>

        {/* Action Notice Toast */}
        {actionNotice && (
          <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs px-3.5 py-2 rounded-xl shadow-xl border border-slate-700 animate-in fade-in flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* Feature List Content */}
        <div className="w-full max-w-md mx-auto px-4 py-4 flex-1 flex flex-col gap-3.5">
          
          {/* Header Explanation Banner */}
          <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-black text-slate-900">
                {activeFeature === 'tenant-pop' && 'Tenant Proof of Payment Queue'}
                {activeFeature === 'user-pop' && 'User Proof of Payment Queue'}
                {activeFeature === 'verified' && 'Identity & KYC Verification Feature'}
                {activeFeature === 'verified-pop' && 'Approved Proofs of Payment Audit'}
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                {activeFeature === 'tenant-pop' && 'Review Capitec transfers to Matthews (1334067366) with ref Ten29'}
                {activeFeature === 'user-pop' && 'Review Capitec transfers to Matthews (1334067366) with ref Sub29'}
                {activeFeature === 'verified' && 'Inspect user profile pictures (face only) and National ID documents'}
                {activeFeature === 'verified-pop' && 'All confirmed and cleared payment receipts'}
              </span>
            </div>
            <span className="text-xs font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              {currentList.length}
            </span>
          </div>

          {/* Empty State */}
          {currentList.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3 border border-slate-200">
                <FileText className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-slate-800">
                No submissions received yet
              </p>
              <p className="text-[11px] text-slate-500 max-w-xs mt-1">
                Submissions from the Activation feature will appear here automatically for admin review.
              </p>
              {activeFeature !== 'verified-pop' && (
                <button
                  type="button"
                  onClick={() => handleSeedDemoSubmission(activeFeature === 'tenant-pop' ? 'tenant' : 'user')}
                  className="mt-4 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Generate Test Submission</span>
                </button>
              )}
            </div>
          ) : (
            currentList.map((item) => {
              const isApproved = item.status === 'approved';
              const isRejected = item.status === 'rejected';
              const isPending = item.status === 'pending';

              return (
                <div
                  key={item.id}
                  className={`w-full rounded-2xl bg-white border p-4 flex flex-col gap-3 shadow-xs transition-all ${
                    isApproved 
                      ? 'border-emerald-300 bg-emerald-50/10' 
                      : isRejected 
                      ? 'border-rose-200 bg-rose-50/10' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Top Bar: Applicant Info & Status Badge */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      {/* Face Only Profile Picture */}
                      <div 
                        onClick={() => item.profilePicUrl && setViewingDoc({
                          title: `Face Photo: ${item.userName}`,
                          url: item.profilePicUrl,
                          type: 'image',
                          details: 'Profile Picture (Face Only)'
                        })}
                        className="w-10 h-10 rounded-full border-2 border-slate-200 bg-slate-100 flex items-center justify-center overflow-hidden cursor-pointer shrink-0 hover:border-amber-400 transition-colors shadow-2xs"
                        title="Click to view face photo full size"
                      >
                        {item.profilePicUrl ? (
                          <img src={item.profilePicUrl} alt={item.userName} className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-5 h-5 text-slate-400" />
                        )}
                      </div>

                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900 tracking-tight">
                          {item.userName}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">
                          {item.userEmail}
                        </span>
                        <span className="text-[9px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3 text-slate-400" />
                          Submitted {item.submittedAt}
                        </span>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <div>
                      {isApproved && (
                        <span className="text-[9.5px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                          Approved
                        </span>
                      )}
                      {isRejected && (
                        <span className="text-[9.5px] font-black px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1">
                          <X className="w-3 h-3 text-rose-600 stroke-[3]" />
                          Rejected
                        </span>
                      )}
                      {isPending && (
                        <span className="text-[9.5px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-600 animate-pulse" />
                          Reviewing
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Payment Details Pill (If PoP feature) */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 text-[10px] font-medium">Capitec Ref:</span>
                      <span className="font-mono font-black text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {item.reference}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500 text-[10px] font-medium">Amount:</span>
                      <span className="font-black text-slate-900 text-xs text-emerald-700">
                        {item.amount}
                      </span>
                    </div>
                  </div>

                  {/* Document Thumbnails & View Triggers */}
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
                    
                    {/* Proof of Payment Document Card */}
                    <button
                      type="button"
                      onClick={() => setViewingDoc({
                        title: `Proof of Payment: ${item.fileName}`,
                        url: item.fileDataUrl,
                        type: 'doc',
                        details: `Capitec Payment Transfer · ${item.reference} · ${item.amount}`
                      })}
                      className="p-2 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 hover:border-slate-300 transition-colors flex items-center gap-2 text-left cursor-pointer group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-[10px] font-bold text-slate-900 truncate block">
                          PoP Document
                        </span>
                        <span className="text-[9px] text-amber-700 font-medium flex items-center gap-0.5">
                          View Receipt <Eye className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </button>

                    {/* ID Document Card */}
                    <button
                      type="button"
                      onClick={() => setViewingDoc({
                        title: `ID Document: ${item.idDocName || 'National ID'}`,
                        url: item.idDocUrl,
                        type: 'doc',
                        details: `Government National ID / Passport · ${item.userName}`
                      })}
                      className="p-2 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 hover:border-slate-300 transition-colors flex items-center gap-2 text-left cursor-pointer group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-[10px] font-bold text-slate-900 truncate block">
                          ID Document
                        </span>
                        <span className="text-[9px] text-indigo-700 font-medium flex items-center gap-0.5">
                          View ID <Eye className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </button>

                  </div>

                  {/* Rejection Reason Notice if rejected */}
                  {isRejected && item.rejectionReason && (
                    <div className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-[10px]">
                      <strong>Rejection Note:</strong> {item.rejectionReason}
                    </div>
                  )}

                  {/* Action Buttons: Approve / Reject (Only shown if pending or adjustable) */}
                  {isPending && (
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => handleApprove(item.id, item.type)}
                        className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Approve PoP</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setRejectPromptId({ id: item.id, type: item.type })}
                        className="py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer active:scale-95"
                      >
                        <X className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Reject</span>
                      </button>
                    </div>
                  )}

                  {/* If Approved, show status and reset option */}
                  {isApproved && (
                    <div className="flex items-center justify-between text-[10px] text-emerald-800 pt-1">
                      <span className="flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Verified & Active in {item.type === 'tenant' ? 'Active Tenants' : 'Active Users'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setRejectPromptId({ id: item.id, type: item.type })}
                        className="text-[9.5px] text-slate-400 hover:text-rose-600 underline"
                      >
                        Revoke
                      </button>
                    </div>
                  )}

                </div>
              );
            })
          )}

        </div>

        {/* =================================================================== */}
        {/* DOCUMENT PREVIEW MODAL                                             */}
        {/* =================================================================== */}
        {viewingDoc && (
          <div 
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in"
            onClick={() => setViewingDoc(null)}
          >
            <div 
              className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2 overflow-hidden pr-2">
                  <FileText className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-xs font-bold text-slate-900 truncate">
                    {viewingDoc.title}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setViewingDoc(null)}
                  className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Document Image or SVG Preview */}
              <div className="p-4 flex-1 overflow-y-auto flex flex-col items-center justify-center bg-slate-100/60 min-h-[220px]">
                {viewingDoc.url ? (
                  <img
                    src={viewingDoc.url}
                    alt={viewingDoc.title}
                    className="max-w-full max-h-[50vh] rounded-xl object-contain shadow-md border border-slate-200 bg-white"
                  />
                ) : (
                  <div className="py-8 text-center text-slate-400">
                    <FileText className="w-12 h-12 mx-auto mb-2 opacity-40" />
                    <p className="text-xs font-medium">Document attached without binary preview</p>
                  </div>
                )}
                {viewingDoc.details && (
                  <p className="text-[10.5px] font-semibold text-slate-600 mt-3 text-center">
                    {viewingDoc.details}
                  </p>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-3 border-t border-slate-100 bg-white flex justify-end">
                <button
                  type="button"
                  onClick={() => setViewingDoc(null)}
                  className="py-1.5 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs"
                >
                  Close Document
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* REJECTION REASON PROMPT MODAL                                      */}
        {/* =================================================================== */}
        {rejectPromptId && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in">
            <div className="w-full max-w-xs bg-white rounded-2xl shadow-2xl p-4 flex flex-col gap-3 border border-slate-200">
              <div className="flex items-center gap-2 text-rose-700">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <h4 className="text-xs font-black uppercase tracking-wider">
                  Reject Proof of Payment
                </h4>
              </div>
              
              <p className="text-[11px] text-slate-600">
                Specify the reason for rejection (user account will be marked offline until valid payment):
              </p>

              <select
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full p-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-rose-400"
              >
                <option value="Payment reference does not match Ten29 or Sub29">
                  Reference mismatch (must be Ten29 or Sub29)
                </option>
                <option value="Funds not yet cleared in Capitec Account Matthews (1334067366)">
                  Funds not cleared in Capitec (1334067366)
                </option>
                <option value="Incorrect payment amount">
                  Incorrect amount transferred
                </option>
                <option value="Blurry or unreadable proof of payment document">
                  Unreadable / blurry proof document
                </option>
                <option value="ID document or face photo invalid">
                  Invalid ID or face photo
                </option>
              </select>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleReject(rejectPromptId.id, rejectPromptId.type)}
                  className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Confirm Reject
                </button>
                <button
                  type="button"
                  onClick={() => setRejectPromptId(null)}
                  className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }

  // =========================================================================
  // MAIN VIEW: 4 REALISTIC TACTILE BUTTONS FILLING SCREEN
  // =========================================================================
  return (
    <div className="w-full flex-1 min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50/70 via-white to-slate-50/50 flex flex-col items-center justify-between px-4 py-4 pb-20 overflow-y-auto">
      <div className="w-full max-w-sm flex-1 flex flex-col justify-around gap-3 py-1">
        
        {/* =================================================================== */}
        {/* ADMIN TOP BAR: PROFIT BALANCES & ONLINE ACTIVE USERS & TENANTS      */}
        {/* (Only in admin)                                                     */}
        {/* =================================================================== */}
        {showProfitStats && (
          <div className="w-full flex flex-col gap-2">
            {/* Row 1: Live Online Active Status Bar */}
            <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-900 text-white shadow-xs border border-slate-800">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-300">
                  Live Online Active:
                </span>
              </div>

              <div className="flex items-center gap-3 text-[11px] font-black">
                <span className="text-amber-400 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-amber-400" />
                  {activeTenants} Tenants
                </span>
                <span className="text-slate-600 font-bold">•</span>
                <span className="text-indigo-400 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-indigo-400" />
                  {activeUsers} Users
                </span>
              </div>
            </div>

            {/* Row 2: Tenant & User Subscription Profit Balance Cards */}
            <div className="grid grid-cols-2 gap-2">
              {/* Tenant Subscription Profit */}
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white shadow-[0_4px_12px_rgba(245,158,11,0.25)] border border-amber-400/50 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black uppercase tracking-wider text-amber-200">
                    Tenant Profit
                  </span>
                  <TrendingUp className="w-3 h-3 text-amber-200" />
                </div>
                <div className="mt-1">
                  <span className="text-sm font-black font-mono tracking-tight leading-none text-white block">
                    {formatZAR(tenantProfit)}
                  </span>
                  <span className="text-[8.5px] text-amber-100/90 font-medium block mt-0.5">
                    {activeTenants} active × R299,99/mo
                  </span>
                </div>
              </div>

              {/* User Subscription Profit */}
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-700 text-white shadow-[0_4px_12px_rgba(79,70,229,0.25)] border border-indigo-400/50 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black uppercase tracking-wider text-indigo-200">
                    User Profit
                  </span>
                  <TrendingUp className="w-3 h-3 text-indigo-200" />
                </div>
                <div className="mt-1">
                  <span className="text-sm font-black font-mono tracking-tight leading-none text-white block">
                    {formatZAR(userProfit)}
                  </span>
                  <span className="text-[8.5px] text-indigo-100/90 font-medium block mt-0.5">
                    {activeUsers} active × R29,99/mo
                  </span>
                </div>
              </div>
            </div>

            {/* Row 3: Combined Total Subscription Profit Pool */}
            <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-950 font-bold shadow-2xs">
              <span className="text-[10px] text-emerald-800 uppercase font-black tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Total Profit Balance
              </span>
              <span className="font-mono font-black text-emerald-900 text-xs">
                {formatZAR(totalProfit)}
              </span>
            </div>
          </div>
        )}

        {features.map((feature) => (
          <button
            key={feature.id}
            type="button"
            onClick={() => setActiveFeature(feature.id)}
            className={`group relative w-full rounded-2xl p-4 flex items-center justify-between transition-all duration-150 cursor-pointer select-none text-left active:translate-y-1 active:shadow-[inset_0_4px_8px_rgba(0,0,0,0.14)] ${feature.surfaceGrad} ${feature.borderStyle} ${feature.shadowStyle}`}
            aria-label={feature.title}
          >
            {/* Left: 3D Beveled Square Icon Pod */}
            <div className="flex items-center gap-3.5">
              <div
                className={`w-13 h-13 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${feature.iconPodStyle}`}
              >
                {feature.icon}
              </div>

              {/* Center: Tactile Etched Text */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-slate-900 tracking-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                    {feature.title}
                  </span>
                  {/* Miniature Illuminated LED Status Light */}
                  <div
                    className={`w-2 h-2 rounded-full ${feature.ledColor} ${feature.ledGlow}`}
                    title="Active"
                  />
                </div>
                <span className="text-[11px] font-medium text-slate-500 mt-0.5 line-clamp-1">
                  {feature.subtitle}
                </span>
              </div>
            </div>

            {/* Right: Tactile Hardware Action Chevrons & Badge */}
            <div className="flex items-center gap-2 pl-2 shrink-0">
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-100/90 text-slate-700 border border-slate-200/90">
                {feature.badge}
              </span>
              <div className="w-8 h-8 rounded-lg bg-white/80 border border-slate-200/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_1.5px_3px_rgba(0,0,0,0.06)] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-900 transition-colors" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
