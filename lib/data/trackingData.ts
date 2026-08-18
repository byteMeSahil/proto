export type TrackStatus = "submitted" | "under_review" | "doc_verification" | "approved" | "disbursed" | "rejected" | "pending";

export interface TrackingStep {
  id: TrackStatus;
  label: string;
  labelHi: string;
  description: string;
  icon: string;
}

export interface ApplicationTrack {
  applicationId: string;
  schemeName: string;
  schemeId: string;
  applicantName: string;
  submittedDate: string;
  currentStatus: TrackStatus;
  currentStatusDate: string;
  estimatedDate?: string;
  nextAction?: string;
  remarks?: string;
  history: Array<{ status: TrackStatus; date: string; remark: string }>;
  officerName?: string;
  officerDesignation?: string;
}

export const TRACKING_STEPS: TrackingStep[] = [
  { id: "submitted",         label: "Submitted",             labelHi: "जमा किया",          description: "Application received by the system",    icon: "📋" },
  { id: "under_review",      label: "Under Review",          labelHi: "समीक्षा में",         description: "Being reviewed by the concerned officer", icon: "🔍" },
  { id: "doc_verification",  label: "Document Verification", labelHi: "दस्तावेज़ जांच",      description: "Your documents are being verified",      icon: "📁" },
  { id: "approved",          label: "Approved",              labelHi: "स्वीकृत",            description: "Application has been approved",          icon: "✅" },
  { id: "disbursed",         label: "Disbursed",             labelHi: "वितरित",             description: "Benefits have been transferred",         icon: "💰" },
];

export const SAMPLE_APPLICATIONS: ApplicationTrack[] = [
  {
    applicationId: "PMKISAN-2024-MH-0042891",
    schemeName: "PM-KISAN",
    schemeId: "pm-kisan",
    applicantName: "Ramesh Patil",
    submittedDate: "2024-09-10",
    currentStatus: "disbursed",
    currentStatusDate: "2024-11-15",
    remarks: "16th instalment of ₹2,000 credited to bank account ending **6782.",
    history: [
      { status: "submitted",        date: "2024-09-10", remark: "Registration completed via CSC" },
      { status: "under_review",     date: "2024-09-18", remark: "Assigned to Block Agriculture Officer" },
      { status: "doc_verification", date: "2024-10-02", remark: "Land records verified by Patwari" },
      { status: "approved",         date: "2024-10-20", remark: "Approved by District Agriculture Office" },
      { status: "disbursed",        date: "2024-11-15", remark: "₹2,000 DBT to bank account" },
    ],
    officerName: "Shri A.K. Sharma",
    officerDesignation: "Block Agriculture Officer",
  },
  {
    applicationId: "PMAYG-2024-UP-00178342",
    schemeName: "PMAY-Gramin",
    schemeId: "pmay-gramin",
    applicantName: "Sunita Devi",
    submittedDate: "2024-06-01",
    currentStatus: "doc_verification",
    currentStatusDate: "2024-12-01",
    estimatedDate: "2025-01-30",
    nextAction: "Submit updated land certificate at Block Development Office",
    remarks: "Land ownership documents need re-verification. Please visit BDO office with original Khasra-Khatauni.",
    history: [
      { status: "submitted",        date: "2024-06-01", remark: "Application submitted at Gram Panchayat" },
      { status: "under_review",     date: "2024-07-10", remark: "Forwarded to Block Development Office" },
      { status: "doc_verification", date: "2024-12-01", remark: "Land documents require re-verification" },
    ],
    officerName: "Km. Priya Singh",
    officerDesignation: "Block Development Officer",
  },
  {
    applicationId: "PMJAY-2024-TN-0099512",
    schemeName: "Ayushman Bharat PMJAY",
    schemeId: "ayushman-bharat",
    applicantName: "Murugan K.",
    submittedDate: "2024-10-22",
    currentStatus: "approved",
    currentStatusDate: "2024-11-28",
    remarks: "Ayushman Card has been generated. Collect from nearest empanelled hospital or download from PMJAY app.",
    history: [
      { status: "submitted",        date: "2024-10-22", remark: "e-KYC completed at CSC" },
      { status: "under_review",     date: "2024-10-25", remark: "SECC eligibility confirmed" },
      { status: "doc_verification", date: "2024-11-05", remark: "Biometric verification at hospital" },
      { status: "approved",         date: "2024-11-28", remark: "Ayushman Card generated" },
    ],
  },
];
