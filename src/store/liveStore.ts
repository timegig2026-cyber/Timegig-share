// Live Application State Store (Local Storage & Reactive Event Bus)
import { 
  SAMPLE_FACE_TENANT, 
  SAMPLE_FACE_USER, 
  createSampleIdCardSvg, 
  createSampleCapitecReceiptSvg 
} from '../utils/sampleDocuments';

export interface PoPSubmission {
  id: string;
  userName: string;
  userEmail: string;
  amount: string;
  reference: string;
  bank: string;
  accountNumber: string;
  accountName: string;
  submittedAt: string;
  timestamp: number;
  fileName: string;
  fileSize: string;
  fileDataUrl?: string;
  profilePicUrl?: string; // Face only profile picture
  idDocName?: string;     // ID document filename
  idDocUrl?: string;      // ID document data URL
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  reviewedAt?: string;
  type: 'tenant' | 'user';
}

export interface ActiveUser {
  id: string;
  name: string;
  email: string;
  plan: string;
  trialStatus: '30d Free Trial' | 'Paid Active';
  status: 'approved' | 'pending' | 'inactive';
  isApproved: boolean;
  approvedAt?: string;
  approvedDate?: string;
  reference?: string;
  paymentAmount?: string;
  daysLeft?: number;
  joinedDate: string;
  profilePicUrl?: string;
  idDocName?: string;
  idDocUrl?: string;
}

export interface ActiveTenant {
  id: string;
  name: string;
  email: string;
  rentalPool: string;
  monthlyPassiveYield: string;
  trialStatus: '30d Free Trial' | 'Paid Active';
  status: 'approved' | 'earning' | 'pending';
  isApproved: boolean;
  approvedAt?: string;
  approvedDate?: string;
  reference?: string;
  paymentAmount?: string;
  payoutBank: string;
  profilePicUrl?: string;
  idDocName?: string;
  idDocUrl?: string;
}

export interface TenantSocialLink {
  id: string;
  platform: string;
  url: string;
}

export interface TenantProfileData {
  firstName: string;
  middleName?: string;
  surname: string;
  address: string;
  location: string;
  province: string;
  contactNumber: string;
  email: string;
  socialLinks: TenantSocialLink[];
  profilePicUrl?: string;
  lastProfilePicChangedAt?: number;
  isLocked: boolean;
  trialStartedAt?: number;
}

export interface LiveAppState {
  tenantPoPs: PoPSubmission[];
  userPoPs: PoPSubmission[];
  activeUsers: ActiveUser[];
  activeTenants: ActiveTenant[];
  currentSession: {
    userName: string;
    userEmail: string;
    profilePicUrl?: string;
    idDocName?: string;
    idDocUrl?: string;
    isTenantTrialActive: boolean;
    isUserTrialActive: boolean;
    tenantStatus: 'none' | 'trial' | 'reviewing' | 'approved' | 'rejected';
    userStatus: 'none' | 'trial' | 'reviewing' | 'approved' | 'rejected';
    tenantProfile?: TenantProfileData;
  };
}

const STORAGE_KEY = 'matthews_capitec_live_store_v4';
const LIVE_STORE_CHANGE_EVENT = 'live-store-updated';

// In-memory cache to prevent data loss and ensure UI stays fast & fluid
let inMemoryLiveState: LiveAppState | null = null;

// Clean up old or obsolete localStorage keys from previous iterations
const cleanObsoleteStorage = () => {
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('matthews_capitec_live_store') && k !== STORAGE_KEY) {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  } catch (e) {
    // Ignore storage access errors in restricted environments
  }
};

const getDefaultState = (): LiveAppState => ({
  tenantPoPs: [],
  userPoPs: [],
  activeUsers: [],
  activeTenants: [],
  currentSession: {
    userName: 'User Account',
    userEmail: 'timegig2026@gmail.com',
    profilePicUrl: SAMPLE_FACE_TENANT,
    idDocName: undefined,
    idDocUrl: undefined,
    isTenantTrialActive: false,
    isUserTrialActive: false,
    tenantStatus: 'none',
    userStatus: 'none',
    tenantProfile: {
      firstName: 'Matthews',
      middleName: '',
      surname: 'Investor',
      address: '42 Sandton Boulevard',
      location: 'Sandton, Johannesburg',
      province: 'Gauteng',
      contactNumber: '+27 82 555 4912',
      email: 'timegig2026@gmail.com',
      socialLinks: [
        { id: 'link-1', platform: 'LinkedIn', url: 'https://linkedin.com/in/tenant-partner' },
        { id: 'link-2', platform: 'WhatsApp', url: '+27825554912' },
      ],
      profilePicUrl: SAMPLE_FACE_TENANT,
      lastProfilePicChangedAt: Date.now() - (35 * 24 * 60 * 60 * 1000), // > 30 days ago initially
      isLocked: false,
      trialStartedAt: Date.now(),
    },
  },
});

export const loadLiveState = (): LiveAppState => {
  if (inMemoryLiveState) {
    return inMemoryLiveState;
  }

  cleanObsoleteStorage();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const fresh = getDefaultState();
      inMemoryLiveState = fresh;
      return fresh;
    }
    const parsed = JSON.parse(raw);
    const loadedState: LiveAppState = {
      tenantPoPs: Array.isArray(parsed.tenantPoPs) ? parsed.tenantPoPs : [],
      userPoPs: Array.isArray(parsed.userPoPs) ? parsed.userPoPs : [],
      activeUsers: Array.isArray(parsed.activeUsers) ? parsed.activeUsers : [],
      activeTenants: Array.isArray(parsed.activeTenants) ? parsed.activeTenants : [],
      currentSession: parsed.currentSession || getDefaultState().currentSession,
    };
    inMemoryLiveState = loadedState;
    return loadedState;
  } catch (e) {
    console.warn('Failed to load from localStorage, returning default state:', e);
    const fresh = getDefaultState();
    inMemoryLiveState = fresh;
    return fresh;
  }
};

// Safe serializer that prevents QuotaExceededError by trimming oversized base64 strings if needed
const sanitizeStateForStorage = (state: LiveAppState, maxStringLength = 60000): LiveAppState => {
  const sanitizeUrl = (url?: string): string | undefined => {
    if (!url) return undefined;
    // If the base64 string is over maxStringLength, avoid storing in localStorage
    if (url.length > maxStringLength) {
      return undefined;
    }
    return url;
  };

  return {
    ...state,
    tenantPoPs: state.tenantPoPs.map((p) => ({
      ...p,
      fileDataUrl: sanitizeUrl(p.fileDataUrl),
      profilePicUrl: sanitizeUrl(p.profilePicUrl),
      idDocUrl: sanitizeUrl(p.idDocUrl),
    })),
    userPoPs: state.userPoPs.map((p) => ({
      ...p,
      fileDataUrl: sanitizeUrl(p.fileDataUrl),
      profilePicUrl: sanitizeUrl(p.profilePicUrl),
      idDocUrl: sanitizeUrl(p.idDocUrl),
    })),
    activeTenants: state.activeTenants.map((t) => ({
      ...t,
      profilePicUrl: sanitizeUrl(t.profilePicUrl),
      idDocUrl: sanitizeUrl(t.idDocUrl),
    })),
    activeUsers: state.activeUsers.map((u) => ({
      ...u,
      profilePicUrl: sanitizeUrl(u.profilePicUrl),
      idDocUrl: sanitizeUrl(u.idDocUrl),
    })),
    currentSession: {
      ...state.currentSession,
      profilePicUrl: sanitizeUrl(state.currentSession.profilePicUrl),
      idDocUrl: sanitizeUrl(state.currentSession.idDocUrl),
    },
  };
};

export const saveLiveState = (state: LiveAppState) => {
  // Always update in-memory state first so application is 100% responsive and retains full data
  inMemoryLiveState = state;

  try {
    // Attempt standard save with reasonably sized data
    const sanitized = sanitizeStateForStorage(state, 120000);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
  } catch (quotaError) {
    console.warn('Storage quota exceeded, cleaning up old keys and compacting state...');
    cleanObsoleteStorage();

    try {
      // Compact more aggressively (trim strings > 30KB)
      const compacted = sanitizeStateForStorage(state, 30000);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(compacted));
    } catch (e2) {
      try {
        // Last resort: strip data URLs completely for localStorage persistence
        const ultraCompact = sanitizeStateForStorage(state, 0);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ultraCompact));
      } catch (fatalError) {
        // Operates smoothly in-memory without throwing error to user
        console.warn('Storage quota completely full; operating in-memory for this session.', fatalError);
      }
    }
  }

  // Notify all subscribed components
  try {
    window.dispatchEvent(new CustomEvent(LIVE_STORE_CHANGE_EVENT, { detail: state }));
  } catch (e) {
    // Ignore event dispatch errors
  }
};

export const subscribeToLiveStore = (callback: (state: LiveAppState) => void) => {
  const handler = () => {
    callback(loadLiveState());
  };
  window.addEventListener(LIVE_STORE_CHANGE_EVENT, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(LIVE_STORE_CHANGE_EVENT, handler);
    window.removeEventListener('storage', handler);
  };
};

// Trial Activation with KYC (Face Photo & ID Document)
export const activateTenantTrialAction = (kyc?: {
  profilePicUrl?: string;
  idDocName?: string;
  idDocUrl?: string;
  userName?: string;
  userEmail?: string;
}) => {
  const state = loadLiveState();
  state.currentSession.isTenantTrialActive = true;
  state.currentSession.tenantStatus = 'reviewing';

  if (kyc?.profilePicUrl) state.currentSession.profilePicUrl = kyc.profilePicUrl;
  if (kyc?.idDocName) state.currentSession.idDocName = kyc.idDocName;
  if (kyc?.idDocUrl) state.currentSession.idDocUrl = kyc.idDocUrl;
  if (kyc?.userName) state.currentSession.userName = kyc.userName;
  if (kyc?.userEmail) state.currentSession.userEmail = kyc.userEmail;

  // Send KYC activation to TenantPoP queue for Admin verification & approval
  if (kyc?.profilePicUrl || kyc?.idDocName) {
    const existingIndex = state.tenantPoPs.findIndex(p => p.userEmail === (kyc.userEmail || state.currentSession.userEmail));
    const newSubmission: PoPSubmission = {
      id: `ten-trial-${Date.now()}`,
      userName: kyc.userName || state.currentSession.userName,
      userEmail: kyc.userEmail || state.currentSession.userEmail,
      amount: 'R299,99',
      reference: 'Ten29',
      bank: 'Capitec',
      accountNumber: '1334067366',
      accountName: 'Matthews',
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now(),
      fileName: 'trial_kyc_verification_doc.pdf',
      fileSize: '240 KB',
      fileDataUrl: createSampleCapitecReceiptSvg('Ten29', 'R299,99', kyc.userName || state.currentSession.userName),
      profilePicUrl: kyc.profilePicUrl || state.currentSession.profilePicUrl,
      idDocName: kyc.idDocName || 'national_id_document.pdf',
      idDocUrl: kyc.idDocUrl || createSampleIdCardSvg(kyc.userName || 'TENANT INVESTOR', '880614 5129 084', '1988-06-14'),
      status: 'pending',
      type: 'tenant',
    };

    if (existingIndex >= 0) {
      state.tenantPoPs[existingIndex] = newSubmission;
    } else {
      state.tenantPoPs.unshift(newSubmission);
    }
  }

  saveLiveState(state);
};

export const activateUserTrialAction = (kyc?: {
  profilePicUrl?: string;
  idDocName?: string;
  idDocUrl?: string;
  userName?: string;
  userEmail?: string;
}) => {
  const state = loadLiveState();
  state.currentSession.isUserTrialActive = true;
  state.currentSession.userStatus = 'reviewing';

  if (kyc?.profilePicUrl) state.currentSession.profilePicUrl = kyc.profilePicUrl;
  if (kyc?.idDocName) state.currentSession.idDocName = kyc.idDocName;
  if (kyc?.idDocUrl) state.currentSession.idDocUrl = kyc.idDocUrl;
  if (kyc?.userName) state.currentSession.userName = kyc.userName;
  if (kyc?.userEmail) state.currentSession.userEmail = kyc.userEmail;

  // Send KYC activation to UserPoP queue for Admin verification & approval
  if (kyc?.profilePicUrl || kyc?.idDocName) {
    const existingIndex = state.userPoPs.findIndex(p => p.userEmail === (kyc.userEmail || state.currentSession.userEmail));
    const newSubmission: PoPSubmission = {
      id: `usr-trial-${Date.now()}`,
      userName: kyc.userName || state.currentSession.userName,
      userEmail: kyc.userEmail || state.currentSession.userEmail,
      amount: 'R29,99',
      reference: 'Sub29',
      bank: 'Capitec',
      accountNumber: '1334067366',
      accountName: 'Matthews',
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now(),
      fileName: 'trial_kyc_verification_doc.pdf',
      fileSize: '190 KB',
      fileDataUrl: createSampleCapitecReceiptSvg('Sub29', 'R29,99', kyc.userName || state.currentSession.userName),
      profilePicUrl: kyc.profilePicUrl || state.currentSession.profilePicUrl,
      idDocName: kyc.idDocName || 'national_id_document.pdf',
      idDocUrl: kyc.idDocUrl || createSampleIdCardSvg(kyc.userName || 'APP SUBSCRIBER', '940523 5219 088', '1994-05-23'),
      status: 'pending',
      type: 'user',
    };

    if (existingIndex >= 0) {
      state.userPoPs[existingIndex] = newSubmission;
    } else {
      state.userPoPs.unshift(newSubmission);
    }
  }

  saveLiveState(state);
};

export const submitProofOfPaymentAction = (
  type: 'tenant' | 'user',
  data: {
    fileName: string;
    fileSize: string;
    fileDataUrl?: string;
    profilePicUrl?: string;
    idDocName?: string;
    idDocUrl?: string;
    userName?: string;
    userEmail?: string;
  }
) => {
  const state = loadLiveState();
  const isTenant = type === 'tenant';

  if (data.profilePicUrl) state.currentSession.profilePicUrl = data.profilePicUrl;
  if (data.idDocName) state.currentSession.idDocName = data.idDocName;
  if (data.idDocUrl) state.currentSession.idDocUrl = data.idDocUrl;
  if (data.userName) state.currentSession.userName = data.userName;
  if (data.userEmail) state.currentSession.userEmail = data.userEmail;

  const newSubmission: PoPSubmission = {
    id: `${type}-pop-${Date.now()}`,
    userName: data.userName || state.currentSession.userName,
    userEmail: data.userEmail || state.currentSession.userEmail,
    amount: isTenant ? 'R299,99' : 'R29,99',
    reference: isTenant ? 'Ten29' : 'Sub29',
    bank: 'Capitec',
    accountNumber: '1334067366',
    accountName: 'Matthews',
    submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    timestamp: Date.now(),
    fileName: data.fileName,
    fileSize: data.fileSize,
    fileDataUrl: data.fileDataUrl || createSampleCapitecReceiptSvg(isTenant ? 'Ten29' : 'Sub29', isTenant ? 'R299,99' : 'R29,99', data.userName || state.currentSession.userName),
    profilePicUrl: data.profilePicUrl || state.currentSession.profilePicUrl || (isTenant ? SAMPLE_FACE_TENANT : SAMPLE_FACE_USER),
    idDocName: data.idDocName || state.currentSession.idDocName || 'national_id_document.pdf',
    idDocUrl: data.idDocUrl || state.currentSession.idDocUrl || createSampleIdCardSvg(data.userName || (isTenant ? 'TENANT INVESTOR' : 'APP SUBSCRIBER'), isTenant ? '880614 5129 084' : '940523 5219 088', isTenant ? '1988-06-14' : '1994-05-23'),
    status: 'pending',
    type,
  };

  if (isTenant) {
    state.tenantPoPs.unshift(newSubmission);
    state.currentSession.tenantStatus = 'reviewing';
  } else {
    state.userPoPs.unshift(newSubmission);
    state.currentSession.userStatus = 'reviewing';
  }

  saveLiveState(state);
  return newSubmission;
};

// Approve PoP action: Strictly registers into Active Tenants / Active Users with isApproved = true
export const approvePoPAction = (id: string, type: 'tenant' | 'user') => {
  const state = loadLiveState();
  const isTenant = type === 'tenant';
  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateStr = new Date().toISOString().split('T')[0];

  if (isTenant) {
    const pop = state.tenantPoPs.find(p => p.id === id);
    const applicantEmail = pop?.userEmail || state.currentSession.userEmail;
    const applicantName = pop?.userName || state.currentSession.userName;
    const profilePic = pop?.profilePicUrl || state.currentSession.profilePicUrl || SAMPLE_FACE_TENANT;
    const idName = pop?.idDocName || state.currentSession.idDocName || 'national_id_card.pdf';
    const idUrl = pop?.idDocUrl || state.currentSession.idDocUrl || createSampleIdCardSvg(applicantName, '880614 5129 084', '1988-06-14');
    const ref = pop?.reference || 'Ten29';

    // Mark submission approved
    state.tenantPoPs = state.tenantPoPs.map(p => 
      p.id === id ? { ...p, status: 'approved', reviewedAt: timeStr } : p
    );
    state.currentSession.tenantStatus = 'approved';
    state.currentSession.isTenantTrialActive = true;

    // Register / update ONLY approved tenant
    const index = state.activeTenants.findIndex(t => t.email === applicantEmail);
    if (index >= 0) {
      state.activeTenants[index].status = 'approved';
      state.activeTenants[index].isApproved = true;
      state.activeTenants[index].trialStatus = 'Paid Active';
      state.activeTenants[index].approvedAt = timeStr;
      state.activeTenants[index].approvedDate = dateStr;
      state.activeTenants[index].reference = ref;
      state.activeTenants[index].paymentAmount = 'R299,99';
      state.activeTenants[index].name = applicantName;
      if (profilePic) state.activeTenants[index].profilePicUrl = profilePic;
      if (idName) state.activeTenants[index].idDocName = idName;
      if (idUrl) state.activeTenants[index].idDocUrl = idUrl;
    } else {
      state.activeTenants.unshift({
        id: `ten-${Date.now()}`,
        name: applicantName,
        email: applicantEmail,
        rentalPool: 'Capitec High-Yield Rental Pool #1',
        monthlyPassiveYield: 'R299,99',
        trialStatus: 'Paid Active',
        status: 'approved',
        isApproved: true,
        approvedAt: timeStr,
        approvedDate: dateStr,
        reference: ref,
        paymentAmount: 'R299,99',
        payoutBank: 'Capitec Bank (1334067366)',
        profilePicUrl: profilePic,
        idDocName: idName,
        idDocUrl: idUrl,
      });
    }
  } else {
    const pop = state.userPoPs.find(p => p.id === id);
    const applicantEmail = pop?.userEmail || state.currentSession.userEmail;
    const applicantName = pop?.userName || state.currentSession.userName;
    const profilePic = pop?.profilePicUrl || state.currentSession.profilePicUrl || SAMPLE_FACE_USER;
    const idName = pop?.idDocName || state.currentSession.idDocName || 'national_id_card.pdf';
    const idUrl = pop?.idDocUrl || state.currentSession.idDocUrl || createSampleIdCardSvg(applicantName, '940523 5219 088', '1994-05-23');
    const ref = pop?.reference || 'Sub29';

    // Mark submission approved
    state.userPoPs = state.userPoPs.map(p => 
      p.id === id ? { ...p, status: 'approved', reviewedAt: timeStr } : p
    );
    state.currentSession.userStatus = 'approved';
    state.currentSession.isUserTrialActive = true;

    // Register / update ONLY approved user
    const index = state.activeUsers.findIndex(u => u.email === applicantEmail);
    if (index >= 0) {
      state.activeUsers[index].status = 'approved';
      state.activeUsers[index].isApproved = true;
      state.activeUsers[index].trialStatus = 'Paid Active';
      state.activeUsers[index].approvedAt = timeStr;
      state.activeUsers[index].approvedDate = dateStr;
      state.activeUsers[index].reference = ref;
      state.activeUsers[index].paymentAmount = 'R29,99';
      state.activeUsers[index].name = applicantName;
      if (profilePic) state.activeUsers[index].profilePicUrl = profilePic;
      if (idName) state.activeUsers[index].idDocName = idName;
      if (idUrl) state.activeUsers[index].idDocUrl = idUrl;
    } else {
      state.activeUsers.unshift({
        id: `usr-${Date.now()}`,
        name: applicantName,
        email: applicantEmail,
        plan: 'User Subscription (R29,99/mo)',
        trialStatus: 'Paid Active',
        status: 'approved',
        isApproved: true,
        approvedAt: timeStr,
        approvedDate: dateStr,
        reference: ref,
        paymentAmount: 'R29,99',
        joinedDate: dateStr,
        profilePicUrl: profilePic,
        idDocName: idName,
        idDocUrl: idUrl,
      });
    }
  }

  saveLiveState(state);
};

// Reject PoP action: Marks rejected and strictly removes them from Active Users / Tenants
export const rejectPoPAction = (id: string, type: 'tenant' | 'user', reason?: string) => {
  const state = loadLiveState();
  const isTenant = type === 'tenant';
  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const reasonText = reason || 'Unverified Capitec transfer or reference mismatch.';

  if (isTenant) {
    const pop = state.tenantPoPs.find(p => p.id === id);
    const targetEmail = pop?.userEmail;
    state.tenantPoPs = state.tenantPoPs.map(p => 
      p.id === id ? { ...p, status: 'rejected', rejectionReason: reasonText, reviewedAt: timeStr } : p
    );
    state.currentSession.tenantStatus = 'rejected';
    // Remove rejected tenant from activeTenants so ONLY approved tenants exist
    if (targetEmail) {
      state.activeTenants = state.activeTenants.filter(t => t.email !== targetEmail);
    }
  } else {
    const pop = state.userPoPs.find(p => p.id === id);
    const targetEmail = pop?.userEmail;
    state.userPoPs = state.userPoPs.map(p => 
      p.id === id ? { ...p, status: 'rejected', rejectionReason: reasonText, reviewedAt: timeStr } : p
    );
    state.currentSession.userStatus = 'rejected';
    // Remove rejected user from activeUsers so ONLY approved users exist
    if (targetEmail) {
      state.activeUsers = state.activeUsers.filter(u => u.email !== targetEmail);
    }
  }

  saveLiveState(state);
};

// Admin Revoke / Deactivate an Approved Tenant
export const revokeTenantAction = (email: string) => {
  const state = loadLiveState();
  state.activeTenants = state.activeTenants.filter(t => t.email !== email);
  if (state.currentSession.userEmail === email) {
    state.currentSession.tenantStatus = 'none';
    state.currentSession.isTenantTrialActive = false;
  }
  saveLiveState(state);
};

// Admin Revoke / Deactivate an Approved User
export const revokeUserAction = (email: string) => {
  const state = loadLiveState();
  state.activeUsers = state.activeUsers.filter(u => u.email !== email);
  if (state.currentSession.userEmail === email) {
    state.currentSession.userStatus = 'none';
    state.currentSession.isUserTrialActive = false;
  }
  saveLiveState(state);
};

// Save Tenant Profile action: updates details and locks/unlocks
export const saveTenantProfileAction = (profileData: Partial<TenantProfileData>) => {
  const state = loadLiveState();
  const currentProfile = state.currentSession.tenantProfile || {
    firstName: 'Matthews',
    middleName: '',
    surname: 'Investor',
    address: '42 Sandton Boulevard',
    location: 'Sandton, Johannesburg',
    province: 'Gauteng',
    contactNumber: '+27 82 555 4912',
    email: 'timegig2026@gmail.com',
    socialLinks: [],
    profilePicUrl: state.currentSession.profilePicUrl || SAMPLE_FACE_TENANT,
    lastProfilePicChangedAt: Date.now() - (35 * 24 * 60 * 60 * 1000),
    isLocked: false,
    trialStartedAt: Date.now(),
  };

  const updatedProfile: TenantProfileData = {
    ...currentProfile,
    ...profileData,
    profilePicUrl: profileData.profilePicUrl || currentProfile.profilePicUrl || state.currentSession.profilePicUrl,
  };

  state.currentSession.tenantProfile = updatedProfile;
  if (profileData.firstName || profileData.surname) {
    state.currentSession.userName = `${profileData.firstName || currentProfile.firstName} ${profileData.surname || currentProfile.surname}`.trim();
  }
  if (profileData.email) {
    state.currentSession.userEmail = profileData.email;
  }
  if (profileData.profilePicUrl) {
    state.currentSession.profilePicUrl = profileData.profilePicUrl;
  }

  saveLiveState(state);
  return updatedProfile;
};

// Update Profile Picture with once-a-month (30 days) rule
export const updateProfilePicAction = (newPicUrl: string): { success: boolean; message: string; remainingDays?: number } => {
  const state = loadLiveState();
  const currentProfile = state.currentSession.tenantProfile;
  const lastChanged = currentProfile?.lastProfilePicChangedAt || 0;
  const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
  const elapsed = Date.now() - lastChanged;

  if (lastChanged > 0 && elapsed < THIRTY_DAYS_MS) {
    const remainingDays = Math.ceil((THIRTY_DAYS_MS - elapsed) / (24 * 60 * 60 * 1000));
    return {
      success: false,
      message: `Profile picture can only be changed once a month. You can update your picture again in ${remainingDays} days.`,
      remainingDays,
    };
  }

  // Update allowed
  state.currentSession.profilePicUrl = newPicUrl;
  if (state.currentSession.tenantProfile) {
    state.currentSession.tenantProfile.profilePicUrl = newPicUrl;
    state.currentSession.tenantProfile.lastProfilePicChangedAt = Date.now();
  }

  saveLiveState(state);
  return {
    success: true,
    message: 'Profile picture successfully updated!',
  };
};

export const clearAllLiveDataAction = () => {
  cleanObsoleteStorage();
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    // Ignore error
  }
  const fresh = getDefaultState();
  inMemoryLiveState = fresh;
  try {
    window.dispatchEvent(new CustomEvent(LIVE_STORE_CHANGE_EVENT, { detail: fresh }));
  } catch (e) {
    // Ignore error
  }
  return fresh;
};
