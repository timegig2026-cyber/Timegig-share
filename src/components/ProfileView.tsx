import React, { useState, useRef } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Camera, 
  CheckCircle2, 
  Sparkles, 
  Building, 
  Calendar, 
  CreditCard,
  Edit2,
  Check,
  Award
} from 'lucide-react';
import { LiveAppState, saveLiveState } from '../store/liveStore';
import { SAMPLE_FACE_USER, SAMPLE_FACE_TENANT } from '../utils/sampleDocuments';
import { TenantShareWidget } from './TenantShareWidget';
import { UserShareDirectiveBanner } from './UserShareDirectiveBanner';

interface ProfileViewProps {
  store: LiveAppState;
  planType: 'tenant' | 'user';
  onUpdateSession?: (updated: Partial<LiveAppState['currentSession']>) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  store,
  planType,
  onUpdateSession,
}) => {
  const isTenant = planType === 'tenant';
  const defaultPhoto = isTenant ? SAMPLE_FACE_TENANT : SAMPLE_FACE_USER;
  const currentPhoto = store.currentSession.profilePicUrl || defaultPhoto;

  const [profilePic, setProfilePic] = useState<string>(currentPhoto);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>(store.currentSession.userName || 'Sipho Ndlovu');
  const [userEmail, setUserEmail] = useState<string>(store.currentSession.userEmail || 'timegig2026@gmail.com');
  const [phone, setPhone] = useState<string>('+27 82 459 1083');
  const [savedToast, setSavedToast] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setProfilePic(base64);
        if (onUpdateSession) {
          onUpdateSession({ profilePicUrl: base64 });
        }
        // Save to live store
        store.currentSession.profilePicUrl = base64;
        saveLiveState(store);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveInfo = () => {
    setIsEditing(false);
    if (onUpdateSession) {
      onUpdateSession({ userName, userEmail });
    }
    store.currentSession.userName = userName;
    store.currentSession.userEmail = userEmail;
    saveLiveState(store);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 pb-24 flex flex-col items-center select-none animate-in fade-in duration-200">
      
      {/* Toast Notification */}
      {savedToast && (
        <div className="fixed top-4 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Profile information updated successfully!</span>
        </div>
      )}

      {/* Hidden File Input for Picture Logo */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handlePhotoUpload}
        accept="image/*"
        className="hidden"
      />

      {/* =================================================================== */}
      {/* 1. PROFILE PICTURE LOGO (Face Photo Avatar with Verified Dot)       */}
      {/* =================================================================== */}
      <div className="relative flex flex-col items-center mb-5">
        <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
          {/* Outer Glowing Ring */}
          <div className={`w-28 h-28 rounded-full p-1 border-4 shadow-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
            isTenant 
              ? 'border-amber-400 bg-gradient-to-tr from-amber-400 to-amber-200 shadow-amber-500/25' 
              : 'border-indigo-500 bg-gradient-to-tr from-indigo-500 to-blue-400 shadow-indigo-500/25'
          }`}>
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 relative">
              <img
                src={profilePic}
                alt="Profile Logo"
                className="w-full h-full object-cover"
              />
              {/* Hover Camera Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-bold">
                <Camera className="w-5 h-5 mb-0.5" />
                <span>Change</span>
              </div>
            </div>
          </div>

          {/* Verified Emerald Badge Icon on bottom-right of picture logo */}
          <div 
            className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white shadow-md"
            title="Verified Member Identity"
          >
            <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>

        {/* Change Photo Trigger */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="mt-2 text-[11px] font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
        >
          <Camera className="w-3 h-3 text-slate-400" />
          <span>Change Picture Logo</span>
        </button>
      </div>

      {/* =================================================================== */}
      {/* 2. MAIN USER HEADLINE & STATUS BADGE                                */}
      {/* =================================================================== */}
      <div className="text-center mb-5">
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            {userName}
          </h2>
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.9)]" />
        </div>

        <p className="text-xs text-slate-500 font-medium mt-0.5">
          {userEmail}
        </p>

        {/* Plan Pill */}
        <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black shadow-xs border bg-slate-50 text-slate-800 border-slate-200">
          {isTenant ? (
            <Building className="w-3.5 h-3.5 text-amber-600" />
          ) : (
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          )}
          <span>
            {isTenant ? 'Tenant Commercial Partner' : 'User Member Pass'}
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <span className="text-emerald-700 font-bold">30d Free Trial</span>
        </div>
      </div>

      {/* =================================================================== */}
      {/* 3. PROFILE INFORMATION CARDS                                        */}
      {/* =================================================================== */}
      <div className="w-full flex flex-col gap-3">
        
        {/* Account Details Card */}
        <div className="w-full bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Personal Information
            </span>
            <button
              type="button"
              onClick={() => {
                if (isEditing) {
                  handleSaveInfo();
                } else {
                  setIsEditing(true);
                }
              }}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
            >
              {isEditing ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Done</span>
                </>
              ) : (
                <>
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </>
              )}
            </button>
          </div>

          <div className="flex flex-col gap-2.5 text-xs">
            {/* Full Name */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-500 font-medium">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Full Name:</span>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="px-2 py-0.5 text-right font-bold text-slate-900 border border-indigo-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              ) : (
                <span className="font-bold text-slate-900">{userName}</span>
              )}
            </div>

            {/* Email Address */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-500 font-medium">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>Email:</span>
              </div>
              {isEditing ? (
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="px-2 py-0.5 text-right font-bold text-slate-900 border border-indigo-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              ) : (
                <span className="font-bold text-slate-900">{userEmail}</span>
              )}
            </div>

            {/* Phone */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-500 font-medium">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>Mobile:</span>
              </div>
              {isEditing ? (
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="px-2 py-0.5 text-right font-bold text-slate-900 border border-indigo-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              ) : (
                <span className="font-bold text-slate-900">{phone}</span>
              )}
            </div>
          </div>
        </div>

        {/* Subscription & Membership Tier Card */}
        <div className="w-full bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Subscription Status
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black border border-emerald-200">
              Active & Verified
            </span>
          </div>

          <div className="flex flex-col gap-2.5 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-500 font-medium">
                <Award className="w-3.5 h-3.5 text-slate-400" />
                <span>Tier:</span>
              </div>
              <span className="font-bold text-slate-900">
                {isTenant ? 'Tenant Commercial' : 'User Standard Pass'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-500 font-medium">
                <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                <span>Rate:</span>
              </div>
              <span className="font-mono font-bold text-slate-900">
                {isTenant ? 'R299,99 / month' : 'R29,99 / month'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-500 font-medium">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Trial Period:</span>
              </div>
              <span className="font-bold text-emerald-600">30 Days Active Free Trial</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-500 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>Reference:</span>
              </div>
              <span className="font-mono font-bold text-slate-800">
                {isTenant ? 'Ten29-8472' : 'Sub29-2026'}
              </span>
            </div>
          </div>
        </div>

        {/* Tenant Exclusive Sharing Link & Quotas (Max 10 Tenants & 100 Users) */}
        {isTenant ? (
          <TenantShareWidget />
        ) : (
          <UserShareDirectiveBanner />
        )}

        {/* Verification Badges */}
        <div className="w-full bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-3 flex items-center justify-around text-center">
          <div className="flex flex-col items-center">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mb-1" />
            <span className="text-[10px] font-bold text-emerald-950">Face Verified</span>
          </div>
          <div className="h-6 w-px bg-emerald-200" />
          <div className="flex flex-col items-center">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mb-1" />
            <span className="text-[10px] font-bold text-emerald-950">ID Verified</span>
          </div>
          <div className="h-6 w-px bg-emerald-200" />
          <div className="flex flex-col items-center">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mb-1" />
            <span className="text-[10px] font-bold text-emerald-950">Payment Active</span>
          </div>
        </div>

      </div>

    </div>
  );
};
