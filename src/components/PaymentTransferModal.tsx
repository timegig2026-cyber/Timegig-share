import React, { useState, useRef } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  UploadCloud, 
  FileText, 
  Clock, 
  AlertCircle, 
  Building, 
  CreditCard,
  User,
  Mail,
  Camera,
  ShieldCheck,
  Send
} from 'lucide-react';
import { compressImageFile } from '../utils/imageCompressor';

export interface ProofOfPaymentSubmission {
  fileName: string;
  fileSize: string;
  fileDataUrl?: string;
  profilePicUrl?: string;
  idDocName?: string;
  idDocUrl?: string;
  submittedAt: string;
  status: 'reviewing' | 'approved';
  reference: string;
  amount: string;
  planType: 'tenant' | 'user';
  userName?: string;
  userEmail?: string;
}

interface PaymentTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitProof: (submission: ProofOfPaymentSubmission) => void;
  currentSubmission: ProofOfPaymentSubmission | null;
  planType: 'tenant' | 'user';
  initialProfilePic?: string;
  initialIdDocName?: string;
  initialIdDocUrl?: string;
}

export const PaymentTransferModal: React.FC<PaymentTransferModalProps> = ({
  isOpen,
  onClose,
  onSubmitProof,
  currentSubmission,
  planType,
  initialProfilePic,
  initialIdDocName,
  initialIdDocUrl,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  // 1. Profile Picture (Face Only)
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(initialProfilePic || null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  // 2. ID Document
  const [idDocFile, setIdDocFile] = useState<File | null>(null);
  const [idDocPreview, setIdDocPreview] = useState<string | null>(initialIdDocUrl || null);
  const [idDocName, setIdDocName] = useState<string>(initialIdDocName || '');
  const idInputRef = useRef<HTMLInputElement>(null);

  // 3. PoP Document
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [applicantName, setApplicantName] = useState<string>('User Account');
  const [applicantEmail, setApplicantEmail] = useState<string>('timegig2026@gmail.com');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const isTenant = planType === 'tenant';
  const amountStr = isTenant ? 'R299,99' : 'R29,99';
  const referenceCode = isTenant ? 'Ten29' : 'Sub29';
  const modalTitle = isTenant ? 'Tenant Activation' : 'User Subscription';
  const planSubtitle = isTenant ? 'Passive Monthly Income (Ref: Ten29)' : 'App Monthly Subscription (Ref: Sub29)';

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const handleFileSelect = async (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!validTypes.includes(file.type) && !file.name.toLowerCase().endsWith('.pdf')) {
      setErrorMessage('Please upload an image (JPG, PNG) or PDF document.');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setErrorMessage('File size must be under 20MB.');
      return;
    }

    setErrorMessage(null);
    setSelectedFile(file);

    try {
      const compressed = await compressImageFile(file, 650, 650, 0.75);
      setFilePreview(compressed);
    } catch (e) {
      const reader = new FileReader();
      reader.onload = (ev) => setFilePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleProfilePicSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Profile picture must be an image file (face only).');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setErrorMessage('Profile picture must be under 15MB.');
      return;
    }
    setErrorMessage(null);
    try {
      const compressed = await compressImageFile(file, 260, 260, 0.82);
      setProfilePicPreview(compressed);
    } catch (e) {
      const reader = new FileReader();
      reader.onload = (ev) => setProfilePicPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleIdDocSelect = async (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!validTypes.includes(file.type) && !file.name.toLowerCase().endsWith('.pdf')) {
      setErrorMessage('ID document must be an image or PDF document.');
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setErrorMessage('ID document must be under 20MB.');
      return;
    }
    setErrorMessage(null);
    setIdDocFile(file);
    setIdDocName(file.name);
    try {
      const compressed = await compressImageFile(file, 650, 450, 0.75);
      setIdDocPreview(compressed);
    } catch (e) {
      const reader = new FileReader();
      reader.onload = (ev) => setIdDocPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profilePicPreview) {
      setErrorMessage('When activating subscription, you must first upload your profile picture (face only).');
      return;
    }

    if (!idDocName && !idDocFile) {
      setErrorMessage('Please upload your ID document from your device.');
      return;
    }

    if (!selectedFile) {
      setErrorMessage('Please upload your Capitec proof of payment document.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const submission: ProofOfPaymentSubmission = {
        fileName: selectedFile.name,
        fileSize: `${(selectedFile.size / 1024).toFixed(1)} KB`,
        fileDataUrl: filePreview || undefined,
        profilePicUrl: profilePicPreview,
        idDocName: idDocName || idDocFile?.name,
        idDocUrl: idDocPreview || undefined,
        submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'reviewing',
        reference: referenceCode,
        amount: amountStr,
        planType,
        userName: applicantName || 'User Account',
        userEmail: applicantEmail || 'timegig2026@gmail.com',
      };
      onSubmitProof(submission);
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-[430px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Banner */}
        <div className={`px-4 py-3 text-white flex items-center justify-between ${
          isTenant 
            ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600' 
            : 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600'
        }`}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
              {isTenant ? (
                <Building className="w-4 h-4 text-white" />
              ) : (
                <CreditCard className="w-4 h-4 text-white" />
              )}
            </div>
            <div className="text-left">
              <h3 className="text-xs font-black uppercase tracking-wider">
                {modalTitle} & Verification
              </h3>
              <p className="text-[10px] text-white/90 font-medium">
                {planSubtitle}
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

        {/* Modal Scrollable Form */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs text-slate-700">
          
          {/* Active Review Notice Banner */}
          {currentSubmission && currentSubmission.status === 'reviewing' && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 space-y-1 shadow-xs text-left">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-700 animate-pulse" />
                <span className="font-extrabold text-[11px] text-amber-900">
                  Review in Progress (15 to 25 minutes)
                </span>
              </div>
              <p className="text-[10px] leading-relaxed text-amber-900/90">
                Proof of payment ({currentSubmission.fileName}) was submitted. Our admin team will verify it in Tenant PoP / Verification feature within 15 to 25 minutes.
              </p>
            </div>
          )}

          {/* STEP 1: Upload Profile Picture (Face Only) */}
          <div className="space-y-1 text-left">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[9px] font-bold">1</span>
                Upload Profile Picture (Face Only)
              </span>
              <span className="text-[9px] font-bold text-indigo-800 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">
                Required: Face Only
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
              className="border-2 border-dashed border-slate-300 hover:border-indigo-400 rounded-xl p-2.5 bg-slate-50/70 cursor-pointer flex items-center gap-3 transition-colors"
            >
              <div className="w-12 h-12 rounded-full border-2 border-indigo-300 bg-indigo-100 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
                {profilePicPreview ? (
                  <img
                    src={profilePicPreview}
                    alt="Face preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="w-5 h-5 text-indigo-700" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-bold text-slate-900">
                  {profilePicPreview ? 'Face picture selected' : 'Select face photo from device'}
                </p>
                <p className="text-[9px] text-slate-500 leading-tight">
                  Admin will receive it to view in verification feature.
                </p>
              </div>
              {profilePicPreview && (
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-300">
                  <Check className="w-3 h-3" />
                </div>
              )}
            </div>
          </div>

          {/* STEP 2: Upload ID Document */}
          <div className="space-y-1 text-left">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[9px] font-bold">2</span>
                Upload ID Document from Device
              </span>
              <span className="text-[9px] text-slate-500">Selection from device</span>
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
              className={`border-2 border-dashed rounded-xl p-2.5 text-center transition-all cursor-pointer ${
                idDocName || idDocFile
                  ? 'border-emerald-400 bg-emerald-50/40'
                  : 'border-slate-300 hover:border-indigo-400 bg-slate-50/70'
              }`}
            >
              {idDocName || idDocFile ? (
                <div className="flex items-center justify-between gap-2 text-left">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <div className="w-8 h-8 rounded bg-indigo-100 flex items-center justify-center text-indigo-800 shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[10.5px] font-bold text-slate-900 truncate">
                        {idDocName || idDocFile?.name}
                      </p>
                      <p className="text-[8.5px] text-emerald-700 font-semibold">
                        ID document attached for verification
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIdDocFile(null);
                      setIdDocName('');
                      setIdDocPreview(null);
                      if (idInputRef.current) idInputRef.current.value = '';
                    }}
                    className="p-1 text-slate-400 hover:text-red-500 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="py-1 flex flex-col items-center">
                  <UploadCloud className="w-5 h-5 text-indigo-600 mb-0.5" />
                  <p className="text-[10.5px] font-bold text-slate-800">
                    Click to select National ID or Passport from device
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* STEP 3: Bank Transfer Details (Capitec) */}
          <div className="space-y-1.5 text-left">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[9px] font-bold">3</span>
                Pay via Bank Transfer to Capitec
              </span>
              <span className="text-[10px] font-black text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                Amount: {amountStr}
              </span>
            </div>

            {/* Banking Details Card */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 space-y-2 text-left">
              
              {/* Bank Name */}
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-[11px]">Bank:</span>
                <span className="font-bold text-slate-900 text-[11px]">Capitec</span>
              </div>

              {/* Account Name */}
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-[11px]">Account Name:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-900 text-[11px]">Matthews</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('Matthews', 'name')}
                    className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded transition-colors cursor-pointer"
                    title="Copy Account Name"
                  >
                    {copiedField === 'name' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Account Number */}
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-[11px]">Account Number:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-black text-slate-900 text-xs tracking-wider">
                    1334067366
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('1334067366', 'account')}
                    className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded transition-colors cursor-pointer"
                    title="Copy Account Number"
                  >
                    {copiedField === 'account' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Required Reference */}
              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between bg-amber-100/70 -mx-3 -mb-3 p-3 rounded-b-xl">
                <div>
                  <span className="text-[10px] font-black text-amber-900 uppercase block tracking-wider">
                    Required Reference:
                  </span>
                  <span className="text-[9px] text-amber-800">
                    Must enter this exact reference in Capitec
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-black text-sm px-2.5 py-1 bg-white rounded-lg border-2 border-amber-400 text-amber-950 shadow-xs">
                    {referenceCode}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(referenceCode, 'ref')}
                    className="p-1.5 bg-amber-200 hover:bg-amber-300 text-amber-900 rounded-md transition-colors cursor-pointer shadow-xs"
                    title="Copy Reference"
                  >
                    {copiedField === 'ref' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[2.5]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 stroke-[2]" />
                    )}
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* STEP 4: Upload Proof of Payment (PoP) Documents */}
          <div className="space-y-1 text-left">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-bold">4</span>
                Upload Proof of Payment Documents
              </span>
              <span className="text-[9px] text-slate-500">PDF, JPG, PNG</span>
            </div>

            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-3 text-center transition-all cursor-pointer ${
                dragActive
                  ? 'border-amber-500 bg-amber-50/60'
                  : selectedFile
                  ? 'border-emerald-400 bg-emerald-50/40'
                  : 'border-slate-300 hover:border-amber-400 bg-slate-50/70'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileSelect(e.target.files[0]);
                  }
                }}
              />

              {selectedFile ? (
                <div className="flex items-center justify-between gap-2 text-left">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <div className="w-8 h-8 rounded bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[10.5px] font-bold text-slate-900 truncate">
                        {selectedFile.name}
                      </p>
                      <p className="text-[8.5px] text-emerald-700 font-semibold">
                        {(selectedFile.size / 1024).toFixed(1)} KB · Ready to submit
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                      setFilePreview(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="p-1 text-slate-400 hover:text-red-500 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="py-1 flex flex-col items-center">
                  <UploadCloud className="w-5 h-5 text-emerald-600 mb-0.5" />
                  <p className="text-[10.5px] font-bold text-slate-800">
                    Click to upload Proof of Payment from device
                  </p>
                  <p className="text-[8.5px] text-slate-500">
                    Capitec receipt, screenshot, or PDF statement
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Review Duration Notice */}
          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200/90 flex items-center gap-2 text-left">
            <Clock className="w-4 h-4 text-amber-600 shrink-0 animate-pulse" />
            <p className="text-[10.5px] font-semibold text-amber-950 leading-tight">
              <strong>Review takes 15 to 25 minutes.</strong> Admin will receive your PoP document in Tenant PoP to view, approve, or reject.
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-[10px] flex items-center gap-1.5 text-left">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-xl font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer active:scale-98 ${
              isSubmitting 
                ? 'bg-slate-400 text-white cursor-not-allowed' 
                : isTenant 
                ? 'bg-amber-500 hover:bg-amber-600 text-amber-950' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>
              {isSubmitting ? 'Uploading & Submitting...' : 'Submit Documents (15 - 25 Min Review)'}
            </span>
          </button>

        </div>
      </div>
    </div>
  );
};
