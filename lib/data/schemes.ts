export type SchemeCategory =
  | "agriculture" | "housing" | "health" | "education"
  | "finance" | "women" | "employment" | "social";

export type SchemeLevel = "central" | "state" | "panchayat";
export type EligibilityStatus = "eligible" | "maybe" | "not_eligible" | "unknown";

export interface EligibilityCriteria {
  label: string;
  field: string;
  type: "boolean" | "number_range" | "select";
  options?: string[];
  min?: number;
  max?: number;
}

export interface Document {
  name: string;
  description: string;
  issuingAuthority: string;
  whereToGet: string;
  isMandatory: boolean;
}

export interface ApplicationStep {
  step: number;
  title: string;
  description: string;
  mode: "online" | "offline" | "both";
  url?: string;
}

export interface Scheme {
  id: string;
  name: string;
  nameHi: string;
  shortDescription: string;
  shortDescriptionHi: string;
  category: SchemeCategory;
  level: SchemeLevel;
  ministry: string;
  benefitAmount?: string;
  benefitType: string;
  eligibilitySummary: string;
  eligibilityCriteria: EligibilityCriteria[];
  documents: Document[];
  applicationSteps: ApplicationStep[];
  officialUrl: string;
  portalUrl?: string;
  helplineNumber?: string;
  lastVerified: string;
  isVerified: boolean;
  requiresLiveVerification: boolean;
  tags: string[];
  states?: string[]; // null = pan-India
  launchYear: number;
  beneficiariesCount?: string;
  citation: string;
}

export const SCHEMES: Scheme[] = [
  {
    id: "pm-kisan",
    name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    nameHi: "प्रधानमंत्री किसान सम्मान निधि",
    shortDescription: "₹6,000/year direct income support in 3 equal instalments to small and marginal farmers.",
    shortDescriptionHi: "छोटे और सीमांत किसानों को ₹6,000 प्रति वर्ष तीन किश्तों में सीधे बैंक खाते में।",
    category: "agriculture",
    level: "central",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    benefitAmount: "₹6,000/year",
    benefitType: "Direct Bank Transfer",
    eligibilitySummary: "Small & marginal farmers with cultivable land up to 2 hectares. Must be Indian citizen with valid Aadhaar and linked bank account.",
    eligibilityCriteria: [
      { label: "Are you a farmer?", field: "isFarmer", type: "boolean" },
      { label: "Land holding (hectares)", field: "landHolding", type: "number_range", min: 0, max: 2 },
      { label: "Do you have Aadhaar?", field: "hasAadhaar", type: "boolean" },
      { label: "Do you have a bank account?", field: "hasBankAccount", type: "boolean" },
    ],
    documents: [
      { name: "Aadhaar Card", description: "12-digit unique identity number", issuingAuthority: "UIDAI", whereToGet: "Aadhaar Enrollment Centre or online at myaadhaar.uidai.gov.in", isMandatory: true },
      { name: "Land Records / Khasra", description: "Proof of land ownership and area", issuingAuthority: "State Revenue Department", whereToGet: "Tehsil/Taluka office or Bhulekh state portal", isMandatory: true },
      { name: "Bank Passbook (first page)", description: "Account number and IFSC code", issuingAuthority: "Your Bank", whereToGet: "Your bank branch", isMandatory: true },
      { name: "Mobile Number (Aadhaar-linked)", description: "For OTP verification", issuingAuthority: "—", whereToGet: "Link at nearest bank or CSC", isMandatory: true },
    ],
    applicationSteps: [
      { step: 1, title: "Register on PM-KISAN Portal", description: "Visit pmkisan.gov.in and click 'New Farmer Registration'. Enter Aadhaar and OTP.", mode: "online", url: "https://pmkisan.gov.in" },
      { step: 2, title: "OR Visit Nearest CSC", description: "Go to Common Service Centre with documents. Operator will register on your behalf.", mode: "offline" },
      { step: 3, title: "e-KYC Mandatory", description: "Complete e-KYC on PM-KISAN portal or through PMKISAN app to receive instalments.", mode: "online", url: "https://pmkisan.gov.in/ekyc.aspx" },
      { step: 4, title: "Check Beneficiary Status", description: "Track your application and instalment status on the portal.", mode: "online", url: "https://pmkisan.gov.in/BeneficiaryStatus.aspx" },
    ],
    officialUrl: "https://pmkisan.gov.in",
    portalUrl: "https://pmkisan.gov.in",
    helplineNumber: "155261",
    lastVerified: "2024-01-15",
    isVerified: true,
    requiresLiveVerification: true,
    tags: ["farmer", "income support", "DBT", "kisan", "agriculture"],
    launchYear: 2019,
    beneficiariesCount: "11+ crore",
    citation: "Ministry of Agriculture & Farmers Welfare, GoI. pmkisan.gov.in (2024)",
  },
  {
    id: "pmay-gramin",
    name: "PMAY-G (Pradhan Mantri Awaas Yojana – Gramin)",
    nameHi: "प्रधानमंत्री आवास योजना – ग्रामीण",
    shortDescription: "Financial assistance up to ₹1.20 lakh (plains) / ₹1.30 lakh (hilly areas) to BPL rural households for constructing pucca houses.",
    shortDescriptionHi: "ग्रामीण गरीब परिवारों को पक्का घर बनाने के लिए ₹1.20 लाख (मैदानी) / ₹1.30 लाख (पहाड़ी) की सहायता।",
    category: "housing",
    level: "central",
    ministry: "Ministry of Rural Development",
    benefitAmount: "₹1.20–1.30 lakh",
    benefitType: "Direct Bank Transfer (Instalments)",
    eligibilitySummary: "Houseless families or those living in kutcha/dilapidated houses in rural areas. BPL or SECC 2011 listed. No prior permanent house ownership.",
    eligibilityCriteria: [
      { label: "Do you live in a rural area?", field: "isRural", type: "boolean" },
      { label: "Do you have a pucca house?", field: "hasPuccaHouse", type: "boolean" },
      { label: "Are you in SECC 2011 list?", field: "inSECC", type: "boolean" },
      { label: "Annual family income (₹)", field: "annualIncome", type: "number_range", min: 0, max: 300000 },
    ],
    documents: [
      { name: "Aadhaar Card (all family members)", description: "Mandatory for all adult members", issuingAuthority: "UIDAI", whereToGet: "Aadhaar centre", isMandatory: true },
      { name: "BPL / SECC 2011 Certificate", description: "Proof of inclusion in beneficiary list", issuingAuthority: "Gram Panchayat / Block Office", whereToGet: "Your Gram Panchayat", isMandatory: true },
      { name: "Bank Account Details", description: "For direct transfer of funds", issuingAuthority: "Bank", whereToGet: "Bank branch", isMandatory: true },
      { name: "Land Ownership Proof", description: "Land where house will be constructed", issuingAuthority: "Revenue Dept", whereToGet: "Tehsil office", isMandatory: true },
      { name: "Caste Certificate (if SC/ST)", description: "For SC/ST priority", issuingAuthority: "Tehsil", whereToGet: "Tehsil office", isMandatory: false },
    ],
    applicationSteps: [
      { step: 1, title: "Check SECC List at Gram Panchayat", description: "Confirm your name in the SECC 2011 beneficiary list at your Gram Panchayat office.", mode: "offline" },
      { step: 2, title: "Apply via Gram Panchayat", description: "Submit application form with documents to Gram Panchayat / Block Development Officer.", mode: "offline" },
      { step: 3, title: "OR Apply on PMAY-G Portal", description: "Self-registration at pmayg.nic.in with Aadhaar and OTP.", mode: "online", url: "https://pmayg.nic.in" },
      { step: 4, title: "Geo-Tagging & Inspection", description: "After approval, house construction is geo-tagged at each stage before next instalment.", mode: "offline" },
    ],
    officialUrl: "https://pmayg.nic.in",
    helplineNumber: "1800-11-6446",
    lastVerified: "2024-01-10",
    isVerified: true,
    requiresLiveVerification: true,
    tags: ["housing", "gramin", "rural", "pucca house", "BPL"],
    launchYear: 2016,
    beneficiariesCount: "2.5+ crore",
    citation: "Ministry of Rural Development, GoI. pmayg.nic.in (2024)",
  },
  {
    id: "ayushman-bharat",
    name: "Ayushman Bharat – Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)",
    nameHi: "आयुष्मान भारत – प्रधानमंत्री जन आरोग्य योजना",
    shortDescription: "Health cover up to ₹5 lakh per family per year for hospitalisation at empanelled hospitals. Covers 3 days pre and 15 days post hospitalisation.",
    shortDescriptionHi: "प्रति परिवार प्रति वर्ष ₹5 लाख तक का स्वास्थ्य बीमा। सूचीबद्ध अस्पतालों में नि:शुल्क इलाज।",
    category: "health",
    level: "central",
    ministry: "Ministry of Health & Family Welfare",
    benefitAmount: "₹5 lakh/year per family",
    benefitType: "Cashless Health Cover",
    eligibilitySummary: "Families listed in SECC 2011 (rural D1–D5 and urban 11 occupational categories). AB-PMJAY does not require income proof — eligibility is based on SECC data.",
    eligibilityCriteria: [
      { label: "Are you in SECC 2011 list?", field: "inSECC", type: "boolean" },
      { label: "Family monthly income (₹)", field: "monthlyIncome", type: "number_range", min: 0, max: 50000 },
    ],
    documents: [
      { name: "Aadhaar Card / Ration Card", description: "Identity proof to generate Ayushman card", issuingAuthority: "UIDAI / PDS", whereToGet: "Aadhaar centre or Ration shop", isMandatory: true },
      { name: "Ayushman Card (Golden Card)", description: "Generated on eligibility confirmation", issuingAuthority: "Common Service Centre / Hospital", whereToGet: "Nearest CSC or empanelled hospital", isMandatory: true },
    ],
    applicationSteps: [
      { step: 1, title: "Check Eligibility", description: "SMS 'PMJAY' to 56167 or visit pmjay.gov.in. Enter your mobile or Ration Card number.", mode: "both", url: "https://pmjay.gov.in" },
      { step: 2, title: "Generate Ayushman Card", description: "Visit nearest CSC or empanelled hospital with Aadhaar for biometric verification and card generation.", mode: "offline" },
      { step: 3, title: "Avail Treatment", description: "At any empanelled hospital, show Ayushman Card. Pre-authorisation is obtained by hospital.", mode: "offline" },
    ],
    officialUrl: "https://pmjay.gov.in",
    helplineNumber: "14555",
    lastVerified: "2024-01-20",
    isVerified: true,
    requiresLiveVerification: true,
    tags: ["health", "insurance", "hospital", "cashless", "ayushman"],
    launchYear: 2018,
    beneficiariesCount: "55+ crore",
    citation: "National Health Authority, GoI. pmjay.gov.in (2024)",
  },
  {
    id: "mnregs",
    name: "MGNREGS (Mahatma Gandhi National Rural Employment Guarantee Scheme)",
    nameHi: "महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी योजना",
    shortDescription: "Guarantees 100 days of wage employment per year to every rural household. Adult members willing to do unskilled manual work.",
    shortDescriptionHi: "प्रत्येक ग्रामीण परिवार को एक वर्ष में 100 दिन का रोजगार गारंटी। अकुशल शारीरिक श्रम के लिए।",
    category: "employment",
    level: "central",
    ministry: "Ministry of Rural Development",
    benefitAmount: "100 days guaranteed employment",
    benefitType: "Wage Employment",
    eligibilitySummary: "Any rural household. Adult members (18+) who register as job card holders at their Gram Panchayat. Willing to do unskilled manual work.",
    eligibilityCriteria: [
      { label: "Do you live in rural area?", field: "isRural", type: "boolean" },
      { label: "Age", field: "age", type: "number_range", min: 18, max: 100 },
      { label: "Are you willing to do manual labour?", field: "willingLabour", type: "boolean" },
    ],
    documents: [
      { name: "Aadhaar Card", description: "Mandatory for wage payment", issuingAuthority: "UIDAI", whereToGet: "Aadhaar centre", isMandatory: true },
      { name: "Residence Proof", description: "Proof of residence in rural area", issuingAuthority: "Gram Panchayat", whereToGet: "Gram Panchayat", isMandatory: true },
      { name: "Bank Account / Post Office Account", description: "For wage transfer", issuingAuthority: "Bank/PO", whereToGet: "Nearest bank or post office", isMandatory: true },
      { name: "Passport-size photograph", description: "For job card", issuingAuthority: "—", whereToGet: "Photo studio", isMandatory: true },
    ],
    applicationSteps: [
      { step: 1, title: "Register at Gram Panchayat", description: "Submit application to Gram Panchayat with documents. Job Card issued within 15 days.", mode: "offline" },
      { step: 2, title: "Demand Work in Writing", description: "Submit written work demand to Gram Panchayat. Employment must be provided within 15 days.", mode: "offline" },
      { step: 3, title: "Check Wages on NREGA Portal", description: "Track your job card, work history and wages at nrega.nic.in", mode: "online", url: "https://nrega.nic.in" },
    ],
    officialUrl: "https://nrega.nic.in",
    helplineNumber: "1800-111-555",
    lastVerified: "2024-01-12",
    isVerified: true,
    requiresLiveVerification: false,
    tags: ["employment", "wages", "rural", "job card", "NREGA"],
    launchYear: 2006,
    beneficiariesCount: "15+ crore households",
    citation: "Ministry of Rural Development, GoI. nrega.nic.in (2024)",
  },
  {
    id: "pm-ujjwala",
    name: "Pradhan Mantri Ujjwala Yojana (PMUY)",
    nameHi: "प्रधानमंत्री उज्ज्वला योजना",
    shortDescription: "Free LPG connection to BPL women from Below Poverty Line households. Provides initial subsidy, first refill, and stove free or at subsidised cost.",
    shortDescriptionHi: "BPL परिवारों की महिलाओं को नि:शुल्क LPG कनेक्शन। पहला रिफिल और चूल्हा भी सब्सिडी पर।",
    category: "women",
    level: "central",
    ministry: "Ministry of Petroleum & Natural Gas",
    benefitAmount: "Free LPG connection + subsidy",
    benefitType: "Subsidised LPG Connection",
    eligibilitySummary: "Adult women from BPL household. No LPG connection in household. Name in BPL/SECC list or 14 eligible categories (SC/ST, PMAY-G beneficiary, forest dweller etc.)",
    eligibilityCriteria: [
      { label: "Is applicant adult woman (18+)?", field: "isAdultWoman", type: "boolean" },
      { label: "Is household BPL or SECC listed?", field: "isBPL", type: "boolean" },
      { label: "Does household already have LPG?", field: "hasLPG", type: "boolean" },
    ],
    documents: [
      { name: "Aadhaar Card", description: "Identity and address proof", issuingAuthority: "UIDAI", whereToGet: "Aadhaar centre", isMandatory: true },
      { name: "BPL Ration Card / SECC data", description: "Proof of BPL status", issuingAuthority: "Gram Panchayat / PDS", whereToGet: "Gram Panchayat or ration card office", isMandatory: true },
      { name: "Bank Account", description: "For subsidy transfer", issuingAuthority: "Bank", whereToGet: "Nearest bank", isMandatory: true },
      { name: "Self-declaration form", description: "No existing LPG connection", issuingAuthority: "—", whereToGet: "LPG distributor", isMandatory: true },
    ],
    applicationSteps: [
      { step: 1, title: "Visit Nearest LPG Distributor", description: "Go to nearest Indane/HP Gas/Bharat Gas distributor with documents.", mode: "offline" },
      { step: 2, title: "Fill PMUY Application Form", description: "Submit KYC Form 1 + self-declaration at distributor.", mode: "offline" },
      { step: 3, title: "OR Apply Online", description: "Apply at pmuy.gov.in or through oil company portals.", mode: "online", url: "https://pmuy.gov.in" },
    ],
    officialUrl: "https://pmuy.gov.in",
    helplineNumber: "1800-233-3555",
    lastVerified: "2024-01-08",
    isVerified: true,
    requiresLiveVerification: false,
    tags: ["LPG", "gas", "women", "BPL", "cooking fuel", "ujjwala"],
    launchYear: 2016,
    beneficiariesCount: "9+ crore",
    citation: "Ministry of Petroleum & Natural Gas, GoI. pmuy.gov.in (2024)",
  },
  {
    id: "sukanya-samriddhi",
    name: "Sukanya Samriddhi Yojana (SSY)",
    nameHi: "सुकन्या समृद्धि योजना",
    shortDescription: "Small savings scheme for girl children. Deposits of ₹250 to ₹1.5 lakh/year. Account earns high interest (currently 8.2% p.a.) with tax benefits.",
    shortDescriptionHi: "10 वर्ष से कम उम्र की बेटियों के लिए बचत योजना। न्यूनतम ₹250 से शुरू, वर्तमान ब्याज दर 8.2% प्रति वर्ष।",
    category: "women",
    level: "central",
    ministry: "Ministry of Finance",
    benefitAmount: "8.2% p.a. interest (Q1 FY25)",
    benefitType: "Savings + Tax Benefit",
    eligibilitySummary: "Girl child below 10 years of age. Account opened by parent/guardian. Max 2 accounts per family (3 for twin/triplet girls).",
    eligibilityCriteria: [
      { label: "Is girl child below 10 years?", field: "girlAge", type: "number_range", min: 0, max: 10 },
      { label: "Is applicant parent/legal guardian?", field: "isGuardian", type: "boolean" },
    ],
    documents: [
      { name: "Birth Certificate of Girl Child", description: "Age proof for girl", issuingAuthority: "Municipal / Gram Panchayat", whereToGet: "Birth registration office", isMandatory: true },
      { name: "Parent/Guardian Aadhaar & PAN", description: "KYC for account opening", issuingAuthority: "UIDAI / IT Dept", whereToGet: "Aadhaar centre / PAN office", isMandatory: true },
      { name: "Passport-size photos", description: "For account opening", issuingAuthority: "—", whereToGet: "Photo studio", isMandatory: true },
    ],
    applicationSteps: [
      { step: 1, title: "Visit Post Office or Authorised Bank", description: "Open SSY account at any post office or authorised banks (SBI, PNB, Bank of Baroda, etc.)", mode: "offline" },
      { step: 2, title: "Submit KYC Documents", description: "Fill account opening form with birth certificate and guardian KYC.", mode: "offline" },
      { step: 3, title: "Minimum Deposit ₹250", description: "Initial deposit minimum ₹250. Account stays active for 21 years or until girl's marriage after 18.", mode: "offline" },
    ],
    officialUrl: "https://www.indiapost.gov.in/Financial/Pages/Content/Sukanya.aspx",
    lastVerified: "2024-01-18",
    isVerified: true,
    requiresLiveVerification: true,
    tags: ["girl child", "savings", "education", "marriage", "tax benefit"],
    launchYear: 2015,
    beneficiariesCount: "3+ crore accounts",
    citation: "Ministry of Finance / India Post, GoI. indiapost.gov.in (2024)",
  },
  {
    id: "pm-fasal-bima",
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    nameHi: "प्रधानमंत्री फसल बीमा योजना",
    shortDescription: "Crop insurance at very low premium — 2% for Kharif, 1.5% for Rabi, 5% for commercial crops. Covers yield losses, prevented sowing, post-harvest losses.",
    shortDescriptionHi: "खरीफ के लिए 2%, रबी के लिए 1.5% प्रीमियम पर फसल बीमा। बाढ़, सूखे, ओलावृष्टि से नुकसान पर मुआवजा।",
    category: "agriculture",
    level: "central",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    benefitAmount: "Crop loss compensation",
    benefitType: "Crop Insurance",
    eligibilitySummary: "All farmers growing notified crops in notified areas. Compulsory for loanee farmers; voluntary for non-loanee farmers.",
    eligibilityCriteria: [
      { label: "Are you a farmer?", field: "isFarmer", type: "boolean" },
      { label: "Do you grow notified crops?", field: "growsNotifiedCrops", type: "boolean" },
    ],
    documents: [
      { name: "Land Records / Khasra", description: "Proof of sown land and crop", issuingAuthority: "Revenue Dept", whereToGet: "Tehsil", isMandatory: true },
      { name: "Aadhaar Card", description: "KYC", issuingAuthority: "UIDAI", whereToGet: "Aadhaar centre", isMandatory: true },
      { name: "Bank Account / KCC", description: "For premium debit and claim credit", issuingAuthority: "Bank", whereToGet: "Bank branch", isMandatory: true },
      { name: "Sowing Certificate", description: "Crop sown certificate from Patwari", issuingAuthority: "Patwari / Revenue", whereToGet: "Village Patwari", isMandatory: false },
    ],
    applicationSteps: [
      { step: 1, title: "Enrol Before Cut-Off Date", description: "Enrol within the notified cut-off date for your crop season at your bank or CSC.", mode: "both" },
      { step: 2, title: "Apply via Bank / CSC / PMFBY App", description: "Fill PMFBY form online at pmfby.gov.in or at bank/CSC.", mode: "both", url: "https://pmfby.gov.in" },
      { step: 3, title: "Claim After Loss", description: "Intimation within 72 hours of crop loss via PMFBY app, helpline, or bank.", mode: "both", url: "https://pmfby.gov.in" },
    ],
    officialUrl: "https://pmfby.gov.in",
    helplineNumber: "1800-200-7710",
    lastVerified: "2024-01-14",
    isVerified: true,
    requiresLiveVerification: true,
    tags: ["crop insurance", "agriculture", "kharif", "rabi", "fasal bima"],
    launchYear: 2016,
    beneficiariesCount: "5+ crore",
    citation: "Ministry of Agriculture & Farmers Welfare, GoI. pmfby.gov.in (2024)",
  },
  {
    id: "jan-dhan",
    name: "Pradhan Mantri Jan-Dhan Yojana (PMJDY)",
    nameHi: "प्रधानमंत्री जन-धन योजना",
    shortDescription: "Zero-balance bank account for unbanked citizens. Comes with RuPay debit card, ₹1 lakh accident insurance, ₹30,000 life cover, and overdraft of ₹10,000.",
    shortDescriptionHi: "गरीब और बिना बैंक खाते वाले नागरिकों के लिए शून्य शेष बैंक खाता। RuPay कार्ड, ₹1 लाख दुर्घटना बीमा साथ।",
    category: "finance",
    level: "central",
    ministry: "Ministry of Finance",
    benefitAmount: "Zero-balance account + ₹1 lakh accident cover",
    benefitType: "Financial Inclusion",
    eligibilitySummary: "Any Indian citizen (10 years+) without a bank account. Even minor accounts allowed under guardian supervision.",
    eligibilityCriteria: [
      { label: "Age (years)", field: "age", type: "number_range", min: 10, max: 100 },
      { label: "Do you already have a bank account?", field: "hasBankAccount", type: "boolean" },
    ],
    documents: [
      { name: "Aadhaar Card / Voter ID / Passport", description: "Any one officially valid document (OVD)", issuingAuthority: "UIDAI/ECI/MEA", whereToGet: "Respective authorities", isMandatory: true },
      { name: "Passport-size photo", description: "For account opening", issuingAuthority: "—", whereToGet: "Photo studio", isMandatory: true },
    ],
    applicationSteps: [
      { step: 1, title: "Visit Any Bank Branch", description: "Go to any bank branch or Business Correspondent with OVD and photo.", mode: "offline" },
      { step: 2, title: "Fill Account Opening Form", description: "Fill PMJDY account opening form. Account opened on the same day.", mode: "offline" },
      { step: 3, title: "Receive RuPay Card", description: "RuPay Debit Card issued. Activate by making first transaction at ATM.", mode: "offline" },
    ],
    officialUrl: "https://pmjdy.gov.in",
    lastVerified: "2024-01-16",
    isVerified: true,
    requiresLiveVerification: false,
    tags: ["bank account", "financial inclusion", "RuPay", "DBT", "Jan Dhan"],
    launchYear: 2014,
    beneficiariesCount: "51+ crore accounts",
    citation: "Department of Financial Services, GoI. pmjdy.gov.in (2024)",
  },
  {
    id: "pm-scholarship",
    name: "PM Scholarship Scheme (Central Armed Police Forces / Railway Protection Force)",
    nameHi: "प्रधानमंत्री छात्रवृत्ति योजना",
    shortDescription: "Scholarship for wards of CAPF/RPF/State Police personnel. ₹2,500/month for boys and ₹3,000/month for girls for professional degree courses.",
    shortDescriptionHi: "CAPF/RPF/राज्य पुलिस कर्मियों के वार्डों के लिए छात्रवृत्ति। लड़कों को ₹2500 और लड़कियों को ₹3000 प्रति माह।",
    category: "education",
    level: "central",
    ministry: "Ministry of Home Affairs",
    benefitAmount: "₹2,500–3,000/month",
    benefitType: "Monthly Scholarship",
    eligibilitySummary: "Wards/widows of CAPF/RPF personnel. Min 60% in Class 12. Enrolled in 1st year of professional degree (MBBS/BE/BBA/LLB etc.).",
    eligibilityCriteria: [
      { label: "Is parent/guardian a CAPF/RPF officer?", field: "isCAPFWard", type: "boolean" },
      { label: "Class 12 percentage", field: "class12Percent", type: "number_range", min: 60, max: 100 },
      { label: "Are you in 1st year of professional degree?", field: "inProfDegree", type: "boolean" },
    ],
    documents: [
      { name: "Service/Ex-service Certificate of Parent", description: "Proof of CAPF/RPF service", issuingAuthority: "Respective Force HQ", whereToGet: "Battalion/Unit HQ", isMandatory: true },
      { name: "Class 12 Marksheet", description: "Min 60% required", issuingAuthority: "Board", whereToGet: "School/Board", isMandatory: true },
      { name: "College Admission Letter", description: "Proof of enrollment in professional course", issuingAuthority: "College", whereToGet: "Respective college", isMandatory: true },
      { name: "Aadhaar Card", description: "Identity verification", issuingAuthority: "UIDAI", whereToGet: "Aadhaar centre", isMandatory: true },
      { name: "Bank Account (Applicant's)", description: "For scholarship transfer", issuingAuthority: "Bank", whereToGet: "Bank branch", isMandatory: true },
    ],
    applicationSteps: [
      { step: 1, title: "Register on NSP Portal", description: "Create account on National Scholarship Portal (scholarships.gov.in)", mode: "online", url: "https://scholarships.gov.in" },
      { step: 2, title: "Fill Application Form", description: "Fill PMSS application form online with required details.", mode: "online", url: "https://scholarships.gov.in" },
      { step: 3, title: "Upload Documents", description: "Upload scanned documents and submit before deadline.", mode: "online" },
      { step: 4, title: "Institute Verification", description: "Your institute verifies and forwards the application.", mode: "offline" },
    ],
    officialUrl: "https://scholarships.gov.in",
    lastVerified: "2024-01-05",
    isVerified: true,
    requiresLiveVerification: true,
    tags: ["scholarship", "education", "CAPF", "RPF", "professional degree"],
    launchYear: 2006,
    citation: "Ministry of Home Affairs, GoI. scholarships.gov.in (2024)",
  },
  {
    id: "nfsa-ration",
    name: "National Food Security Act (NFSA) – PDS Ration",
    nameHi: "राष्ट्रीय खाद्य सुरक्षा अधिनियम – सार्वजनिक वितरण प्रणाली",
    shortDescription: "Subsidised food grains under PDS. Priority Households: 5 kg/person/month at ₹3/kg rice, ₹2/kg wheat. Antyodaya families: 35 kg/month.",
    shortDescriptionHi: "प्राथमिकता वाले परिवारों को 5 किग्रा प्रति व्यक्ति प्रति माह ₹3/किग्रा चावल, ₹2/किग्रा गेहूं। अंत्योदय को 35 किग्रा/माह।",
    category: "social",
    level: "central",
    ministry: "Ministry of Consumer Affairs, Food & Public Distribution",
    benefitAmount: "Subsidised / Free grains",
    benefitType: "Food Subsidy",
    eligibilitySummary: "All BPL/Antyodaya households and eligible families listed in state beneficiary list. Coverage: 67% of India's population.",
    eligibilityCriteria: [
      { label: "Do you have a ration card?", field: "hasRationCard", type: "boolean" },
      { label: "Annual household income (₹)", field: "annualIncome", type: "number_range", min: 0, max: 200000 },
    ],
    documents: [
      { name: "Ration Card Application", description: "New ration card or inclusion in existing", issuingAuthority: "Food & Civil Supplies Dept", whereToGet: "Block/Tehsil office or state PDS portal", isMandatory: true },
      { name: "Aadhaar Card (all members)", description: "For e-KYC seeding", issuingAuthority: "UIDAI", whereToGet: "Aadhaar centre", isMandatory: true },
      { name: "Income Certificate", description: "For BPL categorisation", issuingAuthority: "Tehsil", whereToGet: "Tehsil office", isMandatory: false },
    ],
    applicationSteps: [
      { step: 1, title: "Apply for Ration Card", description: "Visit Block/Tehsil food department or apply on state PDS portal for new ration card.", mode: "both" },
      { step: 2, title: "Link Aadhaar to Ration Card", description: "Link all family members' Aadhaar to ration card at the ration shop or CSC.", mode: "offline" },
      { step: 3, title: "Collect Grains from FPS", description: "Visit your Fair Price Shop (ration shop) each month with biometric authentication.", mode: "offline" },
    ],
    officialUrl: "https://dfpd.gov.in",
    helplineNumber: "14445",
    lastVerified: "2024-01-20",
    isVerified: true,
    requiresLiveVerification: false,
    tags: ["ration", "food", "PDS", "BPL", "grains", "antyodaya"],
    launchYear: 2013,
    beneficiariesCount: "80+ crore",
    citation: "Dept of Food & Public Distribution, GoI. dfpd.gov.in (2024)",
  },
];

export const SCHEME_CATEGORIES: Array<{ key: string; labelEn: string; labelHi: string; icon: string; color: string }> = [
  { key: "all",        labelEn: "All",        labelHi: "सभी",        icon: "🏛️", color: "bg-kriya-indigo-light text-kriya-indigo" },
  { key: "agriculture",labelEn: "Agriculture", labelHi: "कृषि",       icon: "🌾", color: "bg-green-50 text-green-700" },
  { key: "housing",    labelEn: "Housing",    labelHi: "आवास",       icon: "🏠", color: "bg-orange-50 text-orange-700" },
  { key: "health",     labelEn: "Health",     labelHi: "स्वास्थ्य",   icon: "🏥", color: "bg-red-50 text-red-700" },
  { key: "education",  labelEn: "Education",  labelHi: "शिक्षा",      icon: "📚", color: "bg-blue-50 text-blue-700" },
  { key: "finance",    labelEn: "Finance",    labelHi: "वित्त",       icon: "💰", color: "bg-yellow-50 text-yellow-700" },
  { key: "women",      labelEn: "Women",      labelHi: "महिला",       icon: "👩", color: "bg-pink-50 text-pink-700" },
  { key: "employment", labelEn: "Employment", labelHi: "रोजगार",     icon: "💼", color: "bg-purple-50 text-purple-700" },
  { key: "social",     labelEn: "Social",     labelHi: "सामाजिक",    icon: "🤝", color: "bg-teal-50 text-teal-700" },
];

export function searchSchemes(query: string, category?: string): Scheme[] {
  const q = query.toLowerCase().trim();
  let results = SCHEMES;
  if (category && category !== "all") {
    results = results.filter(s => s.category === category);
  }
  if (!q) return results;
  return results.filter(s =>
    s.name.toLowerCase().includes(q) ||
    s.nameHi.includes(q) ||
    s.shortDescription.toLowerCase().includes(q) ||
    s.tags.some(t => t.toLowerCase().includes(q)) ||
    s.ministry.toLowerCase().includes(q)
  );
}

export function getSchemeById(id: string): Scheme | undefined {
  return SCHEMES.find(s => s.id === id);
}
