import type { LangCode } from "./languages";

export interface Translations {
  appName: string; tagline: string; home: string; schemes: string; track: string;
  grievance: string; more: string; heroTitle: string; heroSubtitle: string;
  voicePlaceholder: string; textPlaceholder: string; searchBtn: string;
  listeningLabel: string; tapToSpeak: string; schemesTitle: string;
  schemesSubtitle: string; eligibilityCheck: string; applyNow: string;
  learnMore: string; checkEligibility: string; schemeDetails: string;
  benefits: string; documents: string; howToApply: string; officialSource: string;
  verifiedLabel: string; liveVerificationNeeded: string; eligibleLabel: string;
  maybeEligibleLabel: string; notEligibleLabel: string; documentsRequired: string;
  documentsMissing: string; documentsReady: string; getDocumentHelp: string;
  whereToGet: string; grievanceTitle: string; grievanceSubtitle: string;
  fileGrievance: string; grievanceCategory: string; grievanceDescription: string;
  grievanceSubmit: string; grievanceDraft: string; grievanceTracking: string;
  grievanceId: string; trackingTitle: string; applicationId: string;
  trackApplication: string; statusSubmitted: string; statusUnderReview: string;
  statusDocVerification: string; statusApproved: string; statusDisbursed: string;
  statusRejected: string; lastUpdated: string; nextStep: string; loading: string;
  error: string; retry: string; back: string; next: string; submit: string;
  cancel: string; close: string; save: string; download: string; share: string;
  copied: string; offlineMsg: string; poweredBy: string; disclaimer: string;
  categories: string; all: string; agriculture: string; housing: string;
  health: string; education: string; finance: string; women: string;
  employment: string; social: string; centralScheme: string; stateScheme: string;
  panchayatScheme: string; quickActions: string; recentSearches: string;
  popularSchemes: string; helpline: string; sourceLabel: string; lastVerified: string;
  selectLanguage: string; languageChanged: string;
}

const en: Translations = {
  appName: "Kriya", tagline: "Your Government, Your Rights", home: "Home",
  schemes: "Schemes", track: "Track", grievance: "Grievance", more: "More",
  heroTitle: "Find Government Benefits You Deserve",
  heroSubtitle: "Ask in your language — voice or text. Instant scheme matching, eligibility check, and guided applications.",
  voicePlaceholder: "Tap mic and speak your question…",
  textPlaceholder: "Type your question or scheme name…",
  searchBtn: "Search", listeningLabel: "Listening…", tapToSpeak: "Tap to speak",
  schemesTitle: "Government Schemes", schemesSubtitle: "Browse schemes you qualify for",
  eligibilityCheck: "Check Eligibility", applyNow: "Apply Now", learnMore: "Learn More",
  checkEligibility: "Check Your Eligibility", schemeDetails: "Scheme Details",
  benefits: "Benefits", documents: "Documents Needed", howToApply: "How to Apply",
  officialSource: "Official Source", verifiedLabel: "Verified",
  liveVerificationNeeded: "Verify on official portal for latest updates",
  eligibleLabel: "Likely Eligible", maybeEligibleLabel: "Partially Eligible",
  notEligibleLabel: "Not Eligible", documentsRequired: "Documents Required",
  documentsMissing: "Missing Documents", documentsReady: "Documents Ready",
  getDocumentHelp: "Get Help Obtaining Documents", whereToGet: "Where to Get",
  grievanceTitle: "File a Grievance", grievanceSubtitle: "Register complaints against government services",
  fileGrievance: "File Complaint", grievanceCategory: "Category",
  grievanceDescription: "Describe your issue", grievanceSubmit: "Submit Grievance",
  grievanceDraft: "Save as Draft", grievanceTracking: "Track Grievance",
  grievanceId: "Grievance ID", trackingTitle: "Track Application",
  applicationId: "Application ID", trackApplication: "Track",
  statusSubmitted: "Submitted", statusUnderReview: "Under Review",
  statusDocVerification: "Document Verification", statusApproved: "Approved",
  statusDisbursed: "Disbursed", statusRejected: "Rejected",
  lastUpdated: "Last Updated", nextStep: "Next Step", loading: "Loading…",
  error: "Something went wrong", retry: "Retry", back: "Back", next: "Next",
  submit: "Submit", cancel: "Cancel", close: "Close", save: "Save",
  download: "Download", share: "Share", copied: "Copied!", 
  offlineMsg: "You are offline. Some features may not be available.",
  poweredBy: "Powered by Kriya AI", disclaimer: "Information is for guidance only. Verify with official government sources.",
  categories: "Categories", all: "All", agriculture: "Agriculture", housing: "Housing",
  health: "Health", education: "Education", finance: "Finance", women: "Women & Child",
  employment: "Employment", social: "Social Welfare", centralScheme: "Central Scheme",
  stateScheme: "State Scheme", panchayatScheme: "Panchayat Scheme",
  quickActions: "Quick Actions", recentSearches: "Recent Searches",
  popularSchemes: "Popular Schemes", helpline: "Helpline", sourceLabel: "Source",
  lastVerified: "Last Verified", selectLanguage: "Select Language",
  languageChanged: "Language changed",
};

const hi: Translations = {
  appName: "क्रिया", tagline: "आपकी सरकार, आपके अधिकार", home: "होम",
  schemes: "योजनाएं", track: "ट्रैक", grievance: "शिकायत", more: "अधिक",
  heroTitle: "अपने लिए सरकारी लाभ खोजें",
  heroSubtitle: "अपनी भाषा में पूछें — आवाज़ या टेक्स्ट से। तुरंत योजना मिलान, पात्रता जांच और मार्गदर्शित आवेदन।",
  voicePlaceholder: "माइक दबाएं और अपना सवाल बोलें…",
  textPlaceholder: "अपना सवाल या योजना का नाम टाइप करें…",
  searchBtn: "खोजें", listeningLabel: "सुन रहा है…", tapToSpeak: "बोलने के लिए दबाएं",
  schemesTitle: "सरकारी योजनाएं", schemesSubtitle: "आपके लिए उपयुक्त योजनाएं खोजें",
  eligibilityCheck: "पात्रता जांचें", applyNow: "अभी आवेदन करें", learnMore: "अधिक जानें",
  checkEligibility: "अपनी पात्रता जांचें", schemeDetails: "योजना विवरण",
  benefits: "लाभ", documents: "आवश्यक दस्तावेज़", howToApply: "आवेदन कैसे करें",
  officialSource: "आधिकारिक स्रोत", verifiedLabel: "सत्यापित",
  liveVerificationNeeded: "नवीनतम जानकारी के लिए आधिकारिक पोर्टल पर जांचें",
  eligibleLabel: "संभवतः पात्र", maybeEligibleLabel: "आंशिक रूप से पात्र",
  notEligibleLabel: "पात्र नहीं", documentsRequired: "आवश्यक दस्तावेज़",
  documentsMissing: "गायब दस्तावेज़", documentsReady: "तैयार दस्तावेज़",
  getDocumentHelp: "दस्तावेज़ प्राप्त करने में सहायता", whereToGet: "कहाँ से प्राप्त करें",
  grievanceTitle: "शिकायत दर्ज करें", grievanceSubtitle: "सरकारी सेवाओं के खिलाफ शिकायत दर्ज करें",
  fileGrievance: "शिकायत दर्ज करें", grievanceCategory: "श्रेणी",
  grievanceDescription: "अपनी समस्या बताएं", grievanceSubmit: "शिकायत भेजें",
  grievanceDraft: "ड्राफ्ट सेव करें", grievanceTracking: "शिकायत ट्रैक करें",
  grievanceId: "शिकायत ID", trackingTitle: "आवेदन ट्रैक करें",
  applicationId: "आवेदन ID", trackApplication: "ट्रैक करें",
  statusSubmitted: "जमा किया गया", statusUnderReview: "समीक्षाधीन",
  statusDocVerification: "दस्तावेज़ सत्यापन", statusApproved: "स्वीकृत",
  statusDisbursed: "वितरित", statusRejected: "अस्वीकृत",
  lastUpdated: "अंतिम अपडेट", nextStep: "अगला कदम", loading: "लोड हो रहा है…",
  error: "कुछ गलत हुआ", retry: "पुनः प्रयास करें", back: "वापस", next: "अगला",
  submit: "जमा करें", cancel: "रद्द करें", close: "बंद करें", save: "सेव करें",
  download: "डाउनलोड", share: "शेयर करें", copied: "कॉपी किया!",
  offlineMsg: "आप ऑफलाइन हैं। कुछ सुविधाएं उपलब्ध नहीं हो सकती हैं।",
  poweredBy: "Kriya AI द्वारा संचालित", disclaimer: "जानकारी केवल मार्गदर्शन के लिए है। आधिकारिक सरकारी स्रोतों से सत्यापित करें।",
  categories: "श्रेणियां", all: "सभी", agriculture: "कृषि", housing: "आवास",
  health: "स्वास्थ्य", education: "शिक्षा", finance: "वित्त", women: "महिला एवं बाल",
  employment: "रोजगार", social: "सामाजिक कल्याण", centralScheme: "केंद्रीय योजना",
  stateScheme: "राज्य योजना", panchayatScheme: "पंचायत योजना",
  quickActions: "त्वरित कार्य", recentSearches: "हाल की खोजें",
  popularSchemes: "लोकप्रिय योजनाएं", helpline: "हेल्पलाइन", sourceLabel: "स्रोत",
  lastVerified: "अंतिम सत्यापन", selectLanguage: "भाषा चुनें",
  languageChanged: "भाषा बदल गई",
};

const mr: Translations = {
  appName: "क्रिया", tagline: "तुमचे सरकार, तुमचे हक्क", home: "मुख्यपृष्ठ",
  schemes: "योजना", track: "ट्रॅक", grievance: "तक्रार", more: "अधिक",
  heroTitle: "तुमच्यासाठी सरकारी लाभ शोधा",
  heroSubtitle: "तुमच्या भाषेत विचारा — आवाज किंवा मजकूरात. त्वरित योजना जुळवणी, पात्रता तपासणी.",
  voicePlaceholder: "मायक्रोफोन दाबा आणि प्रश्न विचारा…",
  textPlaceholder: "तुमचा प्रश्न किंवा योजनेचे नाव टाइप करा…",
  searchBtn: "शोधा", listeningLabel: "ऐकत आहे…", tapToSpeak: "बोलण्यासाठी दाबा",
  schemesTitle: "सरकारी योजना", schemesSubtitle: "तुमच्यासाठी उपयुक्त योजना शोधा",
  eligibilityCheck: "पात्रता तपासा", applyNow: "आता अर्ज करा", learnMore: "अधिक जाणा",
  checkEligibility: "तुमची पात्रता तपासा", schemeDetails: "योजना तपशील",
  benefits: "फायदे", documents: "आवश्यक कागदपत्रे", howToApply: "अर्ज कसा करावा",
  officialSource: "अधिकृत स्रोत", verifiedLabel: "सत्यापित",
  liveVerificationNeeded: "नवीनतम माहितीसाठी अधिकृत पोर्टलवर तपासा",
  eligibleLabel: "बहुधा पात्र", maybeEligibleLabel: "अंशतः पात्र",
  notEligibleLabel: "पात्र नाही", documentsRequired: "आवश्यक कागदपत्रे",
  documentsMissing: "गहाळ कागदपत्रे", documentsReady: "तयार कागदपत्रे",
  getDocumentHelp: "कागदपत्रे मिळवण्यात मदत", whereToGet: "कुठून मिळवाल",
  grievanceTitle: "तक्रार नोंदवा", grievanceSubtitle: "सरकारी सेवांविरुद्ध तक्रार नोंदवा",
  fileGrievance: "तक्रार नोंदवा", grievanceCategory: "श्रेणी",
  grievanceDescription: "तुमची समस्या सांगा", grievanceSubmit: "तक्रार पाठवा",
  grievanceDraft: "मसुदा जतन करा", grievanceTracking: "तक्रार ट्रॅक करा",
  grievanceId: "तक्रार ID", trackingTitle: "अर्ज ट्रॅक करा",
  applicationId: "अर्ज ID", trackApplication: "ट्रॅक करा",
  statusSubmitted: "सादर केले", statusUnderReview: "पुनरावलोकनाधीन",
  statusDocVerification: "कागदपत्र पडताळणी", statusApproved: "मंजूर",
  statusDisbursed: "वितरित", statusRejected: "नाकारले",
  lastUpdated: "शेवटचे अपडेट", nextStep: "पुढील पाऊल", loading: "लोड होत आहे…",
  error: "काहीतरी चुकले", retry: "पुन्हा प्रयत्न करा", back: "मागे", next: "पुढे",
  submit: "सादर करा", cancel: "रद्द करा", close: "बंद करा", save: "जतन करा",
  download: "डाउनलोड", share: "शेअर करा", copied: "कॉपी केले!",
  offlineMsg: "तुम्ही ऑफलाइन आहात. काही वैशिष्ट्ये उपलब्ध नसतील.",
  poweredBy: "Kriya AI द्वारे चालवलेले", disclaimer: "माहिती केवळ मार्गदर्शनासाठी आहे.",
  categories: "श्रेणी", all: "सर्व", agriculture: "शेती", housing: "घरकुल",
  health: "आरोग्य", education: "शिक्षण", finance: "वित्त", women: "महिला व बाल",
  employment: "रोजगार", social: "सामाजिक कल्याण", centralScheme: "केंद्रीय योजना",
  stateScheme: "राज्य योजना", panchayatScheme: "पंचायत योजना",
  quickActions: "त्वरित कार्ये", recentSearches: "अलीकडील शोध",
  popularSchemes: "लोकप्रिय योजना", helpline: "हेल्पलाइन", sourceLabel: "स्रोत",
  lastVerified: "शेवटचे सत्यापन", selectLanguage: "भाषा निवडा",
  languageChanged: "भाषा बदलली",
};

// Compact translations for remaining 7 languages
const te: Translations = { ...en,
  appName: "క్రియ", tagline: "మీ ప్రభుత్వం, మీ హక్కులు", home: "హోమ్",
  schemes: "పథకాలు", track: "ట్రాక్", grievance: "ఫిర్యాదు", more: "మరిన్ని",
  heroTitle: "మీకు అర్హమైన ప్రభుత్వ సహాయాలను కనుగొనండి",
  heroSubtitle: "మీ భాషలో అడగండి — వాయిస్ లేదా టెక్స్ట్. తక్షణ పథకం మిలాన్.",
  voicePlaceholder: "మైక్ నొక్కి మీ ప్రశ్న చెప్పండి…",
  textPlaceholder: "మీ ప్రశ్న లేదా పథకం పేరు టైప్ చేయండి…",
  searchBtn: "వెతకండి", listeningLabel: "వింటోంది…", tapToSpeak: "మాట్లాడటానికి నొక్కండి",
  schemesTitle: "ప్రభుత్వ పథకాలు", applyNow: "ఇప్పుడే దరఖాస్తు చేయండి",
  eligibilityCheck: "అర్హత తనిఖీ", categories: "వర్గాలు", all: "అన్నీ",
  selectLanguage: "భాష ఎంచుకోండి", languageChanged: "భాష మార్చబడింది",
};

const ta: Translations = { ...en,
  appName: "க்ரியா", tagline: "உங்கள் அரசு, உங்கள் உரிமைகள்", home: "முகப்பு",
  schemes: "திட்டங்கள்", track: "கண்காணிப்பு", grievance: "குறைதீர்வு", more: "மேலும்",
  heroTitle: "உங்களுக்கு தகுந்த அரசு நலன்களை கண்டறியுங்கள்",
  heroSubtitle: "உங்கள் மொழியில் கேளுங்கள் — குரல் அல்லது உரை. உடனடி திட்ட பொருத்தம்.",
  voicePlaceholder: "மைக்கை அழுத்தி உங்கள் கேள்வி சொல்லுங்கள்…",
  textPlaceholder: "உங்கள் கேள்வி அல்லது திட்டத்தின் பெயரை தட்டச்சு செய்யுங்கள்…",
  searchBtn: "தேடு", listeningLabel: "கேட்கிறது…", tapToSpeak: "பேச தட்டவும்",
  schemesTitle: "அரசு திட்டங்கள்", applyNow: "இப்போதே விண்ணப்பிக்கவும்",
  eligibilityCheck: "தகுதி சரிபார்க்கவும்", categories: "வகைகள்", all: "அனைத்தும்",
  selectLanguage: "மொழியை தேர்ந்தெடு", languageChanged: "மொழி மாற்றப்பட்டது",
};

const bn: Translations = { ...en,
  appName: "ক্রিয়া", tagline: "আপনার সরকার, আপনার অধিকার", home: "হোম",
  schemes: "প্রকল্প", track: "ট্র্যাক", grievance: "অভিযোগ", more: "আরো",
  heroTitle: "আপনার প্রাপ্য সরকারি সুবিধা খুঁজুন",
  heroSubtitle: "আপনার ভাষায় জিজ্ঞেস করুন — ভয়েস বা টেক্সটে। তাৎক্ষণিক প্রকল্প মিলান।",
  voicePlaceholder: "মাইক চাপুন এবং আপনার প্রশ্ন বলুন…",
  textPlaceholder: "আপনার প্রশ্ন বা প্রকল্পের নাম টাইপ করুন…",
  searchBtn: "খুঁজুন", listeningLabel: "শুনছি…", tapToSpeak: "বলতে ট্যাপ করুন",
  schemesTitle: "সরকারি প্রকল্প", applyNow: "এখনই আবেদন করুন",
  eligibilityCheck: "যোগ্যতা যাচাই করুন", categories: "বিভাগ", all: "সব",
  selectLanguage: "ভাষা নির্বাচন করুন", languageChanged: "ভাষা পরিবর্তিত হয়েছে",
};

const kn: Translations = { ...en,
  appName: "ಕ್ರಿಯಾ", tagline: "ನಿಮ್ಮ ಸರ್ಕಾರ, ನಿಮ್ಮ ಹಕ್ಕುಗಳು", home: "ಮುಖ್ಯಪುಟ",
  schemes: "ಯೋಜನೆಗಳು", track: "ಟ್ರ್ಯಾಕ್", grievance: "ದೂರು", more: "ಇನ್ನಷ್ಟು",
  heroTitle: "ನಿಮಗೆ ಅರ್ಹವಾದ ಸರ್ಕಾರಿ ಸೌಲಭ್ಯಗಳನ್ನು ಹುಡುಕಿ",
  heroSubtitle: "ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಕೇಳಿ — ಧ್ವನಿ ಅಥವಾ ಪಠ್ಯ.",
  voicePlaceholder: "ಮೈಕ್ ಅನ್ನು ಒತ್ತಿ ನಿಮ್ಮ ಪ್ರಶ್ನೆ ಹೇಳಿ…",
  textPlaceholder: "ನಿಮ್ಮ ಪ್ರಶ್ನೆ ಅಥವಾ ಯೋಜನೆ ಹೆಸರನ್ನು ಟೈಪ್ ಮಾಡಿ…",
  searchBtn: "ಹುಡುಕಿ", listeningLabel: "ಆಲಿಸುತ್ತಿದೆ…", tapToSpeak: "ಮಾತನಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ",
  schemesTitle: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು", applyNow: "ಈಗ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ",
  eligibilityCheck: "ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ", categories: "ವರ್ಗಗಳು", all: "ಎಲ್ಲಾ",
  selectLanguage: "ಭಾಷೆ ಆಯ್ಕೆ ಮಾಡಿ", languageChanged: "ಭಾಷೆ ಬದಲಾಯಿತು",
};

const gu: Translations = { ...en,
  appName: "ક્રિયા", tagline: "તમારી સરકાર, તમારા અધિકાર", home: "હોમ",
  schemes: "યોજનાઓ", track: "ટ્રૅક", grievance: "ફરિયાદ", more: "વધુ",
  heroTitle: "તમને મળવા પાત્ર સરકારી લાભ શોધો",
  heroSubtitle: "તમારી ભાષામાં પૂછો — અવાજ અથવા ટેક્સ્ટ.",
  voicePlaceholder: "માઈક દબાવો અને તમારો પ્રશ્ન બોલો…",
  textPlaceholder: "તમારો પ્રશ્ન અથવા યોજનાનું નામ ટાઇપ કરો…",
  searchBtn: "શોધો", listeningLabel: "સાંભળી રહ્યો છે…", tapToSpeak: "બોલવા ટૅપ કરો",
  schemesTitle: "સરકારી યોજનાઓ", applyNow: "હવે અરજી કરો",
  eligibilityCheck: "પાત્રતા ચકાસો", categories: "શ્રેણીઓ", all: "બધા",
  selectLanguage: "ભાષા પસંદ કરો", languageChanged: "ભાષા બદલાઈ",
};

const ml: Translations = { ...en,
  appName: "ക്രിയ", tagline: "നിങ്ങളുടെ സർക്കാർ, നിങ്ങളുടെ അവകാശങ്ങൾ", home: "ഹോം",
  schemes: "പദ്ധതികൾ", track: "ട്രാക്ക്", grievance: "പരാതി", more: "കൂടുതൽ",
  heroTitle: "നിങ്ങൾക്ക് അർഹതയുള്ള സർക്കാർ ആനുകൂല്യങ്ങൾ കണ്ടെത്തൂ",
  heroSubtitle: "നിങ്ങളുടെ ഭാഷയിൽ ചോദിക്കൂ — ശബ്ദം അല്ലെങ്കിൽ ടെക്സ്റ്റ്.",
  voicePlaceholder: "മൈക്ക് അമർത്തി നിങ്ങളുടെ ചോദ്യം പറയൂ…",
  textPlaceholder: "നിങ്ങളുടെ ചോദ്യം അല്ലെങ്കിൽ പദ്ധതി നാമം ടൈപ്പ് ചെയ്യൂ…",
  searchBtn: "തിരയൂ", listeningLabel: "കേൾക്കുന്നു…", tapToSpeak: "സംസാരിക്കാൻ ടാപ്പ് ചെയ്യൂ",
  schemesTitle: "സർക്കാർ പദ്ധതികൾ", applyNow: "ഇപ്പോൾ അപേക്ഷിക്കൂ",
  eligibilityCheck: "യോഗ്യത പരിശോധിക്കൂ", categories: "വിഭാഗങ്ങൾ", all: "എല്ലാം",
  selectLanguage: "ഭാഷ തിരഞ്ഞെടുക്കൂ", languageChanged: "ഭാഷ മാറ്റി",
};

const pa: Translations = { ...en,
  appName: "ਕ੍ਰਿਆ", tagline: "ਤੁਹਾਡੀ ਸਰਕਾਰ, ਤੁਹਾਡੇ ਅਧਿਕਾਰ", home: "ਘਰ",
  schemes: "ਯੋਜਨਾਵਾਂ", track: "ਟ੍ਰੈਕ", grievance: "ਸ਼ਿਕਾਇਤ", more: "ਹੋਰ",
  heroTitle: "ਆਪਣੇ ਲਈ ਸਰਕਾਰੀ ਲਾਭ ਲੱਭੋ",
  heroSubtitle: "ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਪੁੱਛੋ — ਆਵਾਜ਼ ਜਾਂ ਟੈਕਸਟ ਨਾਲ।",
  voicePlaceholder: "ਮਾਈਕ ਦਬਾਓ ਅਤੇ ਆਪਣਾ ਸਵਾਲ ਬੋਲੋ…",
  textPlaceholder: "ਆਪਣਾ ਸਵਾਲ ਜਾਂ ਯੋਜਨਾ ਦਾ ਨਾਮ ਟਾਈਪ ਕਰੋ…",
  searchBtn: "ਖੋਜੋ", listeningLabel: "ਸੁਣ ਰਿਹਾ ਹੈ…", tapToSpeak: "ਬੋਲਣ ਲਈ ਦਬਾਓ",
  schemesTitle: "ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ", applyNow: "ਹੁਣੇ ਅਰਜ਼ੀ ਦਿਓ",
  eligibilityCheck: "ਯੋਗਤਾ ਜਾਂਚੋ", categories: "ਸ਼੍ਰੇਣੀਆਂ", all: "ਸਭ",
  selectLanguage: "ਭਾਸ਼ਾ ਚੁਣੋ", languageChanged: "ਭਾਸ਼ਾ ਬਦਲੀ ਗਈ",
};

export const TRANSLATIONS: Record<LangCode, Translations> = { en, hi, mr, te, ta, bn, kn, gu, ml, pa };

export function getT(lang: LangCode): Translations {
  return TRANSLATIONS[lang] ?? TRANSLATIONS.en;
}
