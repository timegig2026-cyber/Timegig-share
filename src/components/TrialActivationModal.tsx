import React, { useState, useRef } from 'react';
import { 
  X, 
  Camera, 
  UploadCloud, 
  FileText, 
  Check, 
  AlertCircle, 
  ShieldCheck, 
  User, 
  Mail, 
  Sparkles,
  Building2,
  CreditCard
} from 'lucide-react';
import { compressImageFile } from '../utils/imageCompressor';

interface TrialActivationModalProps {
  isOpen: boolean;
  onClose: () => void;
  planType: 'tenant' | 'user';
  onActivate: (kyc: {
    profilePicUrl: string;
    idDocName: string;
    idDocUrl?: string;
    userName: string;
    userEmail: string;
  }) => void;
  defaultUserName?: string;
  defaultUserEmail?: string;
  existingProfilePic?: string;
  existingIdDocName?: string;
  existingIdDocUrl?: string;
}

export const TrialActivationModal: React.FC<TrialActivationModalProps> = ({
  isOpen,
  onClose,
  planType,
  onActivate,
  defaultUserName = 'User Account',
  defaultUserEmail = 'timegig2026@gmail.com',
  existingProfilePic,
  existingIdDocName,
  existingIdDocUrl,
}) => {
  const [userName, setUserName] = useState<string>(defaultUserName);
  const [userEmail, setUserEmail] = useState<string>(defaultUserEmail);
  
  // Profile picture face only
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(existingProfilePic || null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  // ID document
  const [idFile, setIdFile] = useState<File | null>(null);
  const [idDocPreview, setIdDocPreview] = useState<string | null>(existingIdDocUrl || null);
  const [idDocName, setIdDocName] = useState<string>(existingIdDocName || '');
  const idInputRef = useRef<HTMLInputElement>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const isTenant = planType === 'tenant';

  // Handle Profile Picture (Face Only)
  const handleProfilePicSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Profile picture must be an image file (JPG, PNG, WebP).');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setErrorMessage('Profile picture must be under 15MB.');
      return;
    }

    setErrorMessage(null);
    try {
      // Compress face photo to compact avatar dimensions (approx 15-25KB)
      const compressed = await compressImageFile(file, 260, 260, 0.82);
      setProfilePicPreview(compressed);
    } catch (e) {
      const reader = new FileReader();
      reader.onload = (ev) => setProfilePicPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Handle ID Document
  const handleIdDocSelect = async (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!validTypes.includes(file.type) && !file.name.toLowerCase().endsWith('.pdf')) {
      setErrorMessage('ID document must be an image (JPG, PNG) or PDF document.');
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setErrorMessage('ID document must be under 20MB.');
      return;
    }

    setErrorMessage(null);
    setIdFile(file);
    setIdDocName(file.name);

    try {
      // Compress document image (approx 25-45KB)
      const compressed = await compressImageFile(file, 650, 450, 0.75);
      setIdDocPreview(compressed);
    } catch (e) {
      const reader = new FileReader();
      reader.onload = (ev) => setIdDocPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!profilePicPreview) {
      setErrorMessage('Please upload a profile picture (face only) from your device.');
      return;
    }

    if (!idDocName && !idFile) {
      setErrorMessage('Please upload your National ID document from your device.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onActivate({
        profilePicUrl: profilePicPreview,
        idDocName: idDocName || idFile?.name || 'national_id_document.pdf',
        idDocUrl: idDocPreview || undefined,
        userName: userName.trim() || 'User Account',
        userEmail: userEmail.trim() || 'timegig2026@gmail.com',
      });
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-[430px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 px-4 py-3 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
              {isTenant ? <Building2 className="w-4 h-4 text-white" /> : <CreditCard className="w-4 h-4 text-white" />}
            </div>
            <div className="text-left">
              <h3 className="text-xs font-black uppercase tracking-wider">
                Activate 30-Day Free Trial
              </h3>
              <p className="text-[10px] text-amber-100 font-medium">
                {isTenant ? 'Tenant Passive Income' : 'Full User App Access'} · Free for 30 Days
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors cursor-pointer text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-4 overflow-y-auto space-y-3.5 text-xs text-left">
          
          {/* Identity Requirement Notice */}
          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 flex items-start gap-2 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="text-[10px] leading-tight">
              To activate your <strong>30-day free trial</strong>, upload a <strong>face-only profile photo</strong> and your <strong>official ID document</strong> from your device.
            </p>
          </div>

          {/* User Name & Email */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
              1. Applicant Information
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[9.5px] font-semibold text-slate-500 block mb-0.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-3 h-3 text-slate-400 absolute left-2 top-2" />
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full pl-6 pr-2 py-1 text-[11px] rounded-lg border border-slate-200 focus:outline-none focus:border-amber-400 bg-white"
                    placeholder="Full Name"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-[9.5px] font-semibold text-slate-500 block mb-0.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-3 h-3 text-slate-400 absolute left-2 top-2" />
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full pl-6 pr-2 py-1 text-[11px] rounded-lg border border-slate-200 focus:outline-none focus:border-amber-400 bg-white"
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Upload 1: Profile Picture (Face Only) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                2. Profile Picture (Face Only)
              </span>
              <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                Face Only Required
              </span>
            </div>

            <input
              ref={profileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleProfilePicSelect(e.target.files[0]);
                }
              }}
            />

            <div 
              onClick={() => profileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 hover:border-amber-400 rounded-xl p-3 bg-slate-50/60 cursor-pointer flex items-center gap-3 transition-colors"
            >
              {/* Circular Avatar Preview */}
              <div className="relative w-14 h-14 rounded-full border-2 border-amber-400 bg-amber-100 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
                {profilePicPreview ? (
                  <img
                    src={profilePicPreview}
                    alt="Face profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="w-6 h-6 text-amber-800" />
                )}
                {profilePicPreview && (
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <p className="text-[11px] font-bold text-slate-900">
                  {profilePicPreview ? 'Face picture selected' : 'Upload face photo from device'}
                </p>
                <p className="text-[9.5px] text-slate-500 mt-0.5 leading-tight">
                  Clear, front-facing selfie or portrait of your face only.
                </p>
                <button
                  type="button"
                  className="mt-1 text-[9.5px] font-extrabold text-amber-800 hover:text-amber-950 underline"
                >
                  {profilePicPreview ? 'Change Photo' : 'Choose File from Device'}
                </button>
              </div>

              {profilePicPreview && (
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-300">
                  <Check className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          </div>

          {/* Upload 2: ID Document */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                3. ID Document (Device Upload)
              </span>
              <span className="text-[9px] text-slate-500">PDF, JPG, PNG (Max 10MB)</span>
            </div>

            <input
              ref={idInputRef}
              type="file"
              accept="image/*,application/pdf"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleIdDocSelect(e.target.files[0]);
                }
              }}
            />

            <div 
              onClick={() => idInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-3 text-center transition-all cursor-pointer ${
                idDocName || idFile
                  ? 'border-emerald-400 bg-emerald-50/30'
                  : 'border-slate-300 hover:border-amber-400 bg-slate-50/60'
              }`}
            >
              {idDocName || idFile ? (
                <div className="flex items-center justify-between gap-2 text-left">
                  <div className="flex items-center gap-2 overflow-hidden">
                    {idDocPreview && idDocPreview.startsWith('data:image/') ? (
                      <img
                        src={idDocPreview}
                        alt="ID Preview"
                        className="w-10 h-10 object-cover rounded border border-slate-200 shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                    )}
                    <div className="overflow-hidden">
                      <p className="text-[11px] font-bold text-slate-900 truncate">
                        {idDocName || idFile?.name}
                      </p>
                      <p className="text-[9px] text-emerald-700 font-semibold">
                        Official ID document attached
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIdFile(null);
                      setIdDocName('');
                      setIdDocPreview(null);
                      if (idInputRef.current) idInputRef.current.value = '';
                    }}
                    className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="py-2 flex flex-col items-center">
                  <UploadCloud className="w-7 h-7 text-amber-600 mb-1" />
                  <p className="text-[11px] font-bold text-slate-800">
                    Click to upload ID document from device
                  </p>
                  <p className="text-[9px] text-slate-500 mt-0.5">
                    National ID Card, Smart ID, or Passport
                  </p>
                </div>
              )}
            </div>
          </div>

          {errorMessage && (
            <p className="text-[10px] text-rose-600 font-semibold mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMessage}</span>
            </p>
          )}

          {/* Footer Action */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="py-1.5 px-3 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-1.5 px-4 rounded-lg text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 shadow-xs cursor-pointer flex items-center gap-1 active:translate-y-0.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Confirm & Activate 30-Day Free Trial</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
