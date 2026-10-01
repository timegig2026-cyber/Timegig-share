import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  ArrowRight, 
  Building, 
  Sparkles,
  X
} from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  planType: 'tenant' | 'user';
  initialEmail?: string;
  onComplete: (data: { email: string; termsAccepted: boolean }) => void;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  planType,
  initialEmail = 'timegig2026@gmail.com',
  onComplete,
  onClose,
}) => {
  const isTenant = planType === 'tenant';

  const [email, setEmail] = useState<string>(initialEmail);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify your password.');
      return;
    }

    if (!termsAccepted) {
      setErrorMessage('You must read and accept the terms and conditions to proceed.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onComplete({
        email: email.trim(),
        termsAccepted: true,
      });
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto text-slate-900 select-none animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className={`px-6 py-5 text-white flex items-center justify-between ${
          isTenant 
            ? 'bg-gradient-to-r from-amber-600 via-amber-700 to-yellow-800' 
            : 'bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-800'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-white shadow-xs">
              {isTenant ? <Building className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-white/80 block">
                Subscription Activated
              </span>
              <h2 className="text-base font-black tracking-tight leading-tight">
                Register Your Account
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 overflow-y-auto max-h-[75vh]">
          
          {/* Subscription confirmation badge */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-bold text-slate-800">
                {isTenant ? 'Tenant Commercial Subscription' : 'User Member Subscription'}
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black border border-emerald-300">
              30d Free Trial
            </span>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-rose-700 text-xs font-semibold animate-in shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Field 1: Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. yourname@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50/50"
            />
          </div>

          {/* Field 2: Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Password (Minimum 6 characters)</span>
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Field 3: Confirm Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Confirm Password</span>
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50/50"
            />
          </div>

          {/* Section: Terms and Conditions */}
          <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Terms and Conditions</span>
            </label>

            {/* Scrollable Terms Text Container */}
            <div className="w-full h-32 overflow-y-auto p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 leading-relaxed flex flex-col gap-2 shadow-inner">
              <div>
                <strong className="text-slate-900 block font-bold">1. 30-Day Free Trial Policy:</strong>
                Your subscription begins with a complimentary 30-day trial. During this period, you have unrestricted access to platform features, verified GiG matching, and tenant yield tracking.
              </div>
              <div>
                <strong className="text-slate-900 block font-bold">2. Payment & Verification Reference:</strong>
                Monthly payments are processed via Capitec Bank EFT to account Matthews (1334067366). Members must use reference <span className="font-mono font-bold text-slate-900">Ten29</span> (Tenant) or <span className="font-mono font-bold text-slate-900">Sub29</span> (User) for automated clearance.
              </div>
              <div>
                <strong className="text-slate-900 block font-bold">3. Privacy & POPIA Compliance:</strong>
                All identification documents and face photographs are encrypted and utilized solely for identity matching and fraud prevention. Data is never shared with unauthorized third parties.
              </div>
              <div>
                <strong className="text-slate-900 block font-bold">4. Tenant Sharing Quotas:</strong>
                Tenants agree to adhere to the network capacity ceiling of maximum 10 Tenants and 100 User subscriptions per referral code.
              </div>
              <div>
                <strong className="text-slate-900 block font-bold">5. Cancellation & Revocation:</strong>
                You may cancel your trial or active subscription at any time without penalty prior to billing renewal.
              </div>
            </div>

            {/* Terms Checkbox */}
            <label className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 cursor-pointer mt-1 border border-transparent hover:border-slate-200 transition-colors">
              <input
                type="checkbox"
                required
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 cursor-pointer"
              />
              <span className="text-xs text-slate-700 font-semibold leading-tight">
                I have read and accept the <strong>Terms and Conditions</strong> and <strong>30-Day Free Trial Policy</strong>.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3.5 px-4 rounded-2xl text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-98 ${
              isTenant
                ? 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 shadow-amber-500/25'
                : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 shadow-indigo-500/25'
            } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <span>Registering Account...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                <span>Accept Terms & Complete Registration</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  );
};
