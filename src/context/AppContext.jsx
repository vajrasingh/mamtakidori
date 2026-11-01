import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';
import { speechService } from '../services/speechService';
import { SCREEN_NARRATIONS } from '../data/screenNarrations';

export const AVAILABLE_LANGUAGES = [
  { code: 'hi', name: 'हिन्दी', region: 'उत्तर भारत', script: 'Hindi', preview: 'नमस्ते! मैं ममता हूँ।' },
  { code: 'en', name: 'English', region: 'National / Standard', script: 'English', preview: 'Hello! I am Mamta.' },
  { code: 'braj', name: 'ब्रजभाषा', region: 'ब्रज क्षेत्र / पश्चिमी उप्र (मथुरा-आगरा)', script: 'Braj Bhasha', preview: 'राधे-राधे! हम ममता हैं।' },
  { code: 'bho', name: 'भोजपुरी', region: 'बिहार व पूर्वी उप्र', script: 'Bhojpuri', preview: 'प्रणाम! हम ममता हईं।' },
  { code: 'mai', name: 'मैथिली', region: 'मिथिलांचल / बिहार', script: 'Maithili', preview: 'प्रणाम! हम ममता छी।' },
  { code: 'raj', name: 'राजस्थानी', region: 'राजस्थान / मारवाड़', script: 'Rajasthani', preview: 'खम्मा घणी! म्हें ममता हूँ।' },
  { code: 'bn', name: 'বাংলা', region: 'পশ্চিমবঙ্গ / ত্রিপুরা', script: 'Bengali', preview: 'নমস্কার! আমি মমতা।' },
  { code: 'mr', name: 'मराठी', region: 'महाराष्ट्र', script: 'Marathi', preview: 'नमस्कार! मी ममता आहे.' }
];

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('hi'); // 'hi', 'bho', 'mai', 'raj', 'bn', 'mr', 'en'
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(1); // 1 to 19
  const [screenHistory, setScreenHistory] = useState([1]);
  const [role, setRole] = useState('mother'); // 'mother', 'mil', 'asha'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isJumperOpen, setIsJumperOpen] = useState(false);

  // Voice Speech States
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechTranscript, setSpeechTranscript] = useState('');
  const [currentSpokenText, setCurrentSpokenText] = useState('');

  // User Profile & Medical Context
  const [userProfile, setUserProfile] = useState({
    name: 'रानी देवी',
    week: 12,
    stage: '12वां सप्ताह (तिमाही 1)',
    dueDate: '5 नवंबर 2026',
    ashaName: 'सुनीता देवी',
    ashaPhone: '+91 98765 43210',
    doctorName: 'डॉ. प्रिया सिंह (CHC)',
    doctorPhone: '+91 94123 56789'
  });

  // Consent & Privacy Permissions
  const [consent, setConsent] = useState({
    essential: true,
    familySharing: true,
    ashaSharing: true,
    discreetNotifications: true,
    sharedPinEnabled: false
  });

  // Reminders
  const [reminders, setReminders] = useState([
    { id: 1, title: 'सुबह की आयरन की गोली', time: '09:00 AM', active: true, category: 'medicine' },
    { id: 2, title: 'पीएचसी में अगला चेकअप (ANC 1)', time: '5 Nov 2026, 10:00 AM', active: true, category: 'hospital' },
    { id: 3, title: 'सुनीता दीदी से घर पर भेंट', time: 'गुरुवार, 02:00 PM', active: true, category: 'asha' }
  ]);

  // Health Records
  const [healthRecords, setHealthRecords] = useState([
    {
      id: 1,
      type: 'prescription',
      title: 'आयरन-फोलिक एसिड दवा पर्ची',
      titleEn: 'Iron & Folic Acid Prescription',
      date: '15 अक्टूबर 2026',
      dateEn: '15 October 2026',
      doctor: 'डॉ. प्रिया सिंह (PHC)',
      doctorEn: 'Dr. Priya Singh (PHC)',
      status: 'सत्यापित (Verified)',
      statusEn: 'Verified',
      imageUrl: '/assets/doctor_prenatal_clinic.jpg'
    },
    {
      id: 2,
      type: 'ultrasound',
      title: 'प्रथम तिमाही डेटिंग सोनोग्राफी',
      titleEn: '1st Trimester Dating Ultrasound',
      date: '10 अक्टूबर 2026',
      dateEn: '10 October 2026',
      doctor: 'जिला अस्पताल रेडियोलॉजी',
      doctorEn: 'District Hospital Radiology',
      status: 'समीक्षित (Reviewed)',
      statusEn: 'Reviewed',
      imageUrl: '/assets/doctor_prenatal_clinic.jpg'
    },
    {
      id: 3,
      type: 'lab_report',
      title: 'हीमोग्लोबिन व रक्त जांच (11.2 g/dL)',
      titleEn: 'Hemoglobin Blood Test (11.2 g/dL)',
      date: '20 अक्टूबर 2026',
      dateEn: '20 October 2026',
      doctor: 'रामपुर पीएचसी पैथोलॉजी लैब',
      doctorEn: 'Rampur PHC Pathology Lab',
      status: 'सामान्य (Normal)',
      statusEn: 'Normal (Safe)',
      imageUrl: '/assets/doctor_prenatal_clinic.jpg'
    }
  ]);

  // Resilient translation resolver (falls back to Hindi if specific regional key missing)
  const currentTranslation = translations[language] || translations.hi;
  const fallbackTranslation = translations.hi;

  const t = new Proxy(currentTranslation, {
    get(target, prop) {
      if (prop in target) return target[prop];
      return fallbackTranslation[prop] || {};
    }
  });

  // Language changer with voice preview
  const changeLanguage = (langCode) => {
    speechService.stopSpeaking();
    setLanguage(langCode);
    document.body.className = `lang-${langCode}`;
    setIsLangModalOpen(false);

    const langObj = AVAILABLE_LANGUAGES.find(l => l.code === langCode);
    if (langObj && langObj.preview) {
      setTimeout(() => {
        speechService.speak(langObj.preview, langCode, {
          onStart: () => setIsSpeaking(true),
          onEnd: () => setIsSpeaking(false)
        });
      }, 300);
    }
  };

  const toggleLanguage = () => {
    setIsLangModalOpen(true);
  };

  // Screen Navigation with history tracking
  const navigateTo = (screenNum) => {
    speechService.stopSpeaking();
    speechService.stopListening();
    setIsSpeaking(false);
    setIsListening(false);
    setScreenHistory(prev => [...prev, screenNum]);
    setCurrentScreen(screenNum);
  };

  const goBack = () => {
    speechService.stopSpeaking();
    speechService.stopListening();
    setIsSpeaking(false);
    setIsListening(false);
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory];
      newHistory.pop();
      setScreenHistory(newHistory);
      setCurrentScreen(newHistory[newHistory.length - 1]);
    } else {
      setCurrentScreen(6); // Default back to Home
    }
  };

  // Text-To-Speech helper
  const speakText = (text) => {
    if (!text) return;
    setCurrentSpokenText(text);
    setIsSpeaking(true);

    speechService.speak(text, language, {
      onStart: () => setIsSpeaking(true),
      onEnd: () => {
        setIsSpeaking(false);
        setCurrentSpokenText('');
      }
    });
  };

  // Stop speaking
  const stopAudio = () => {
    speechService.stopSpeaking();
    setIsSpeaking(false);
    setCurrentSpokenText('');
  };

  // Replay speech
  const replayAudio = () => {
    if (currentSpokenText) {
      speakText(currentSpokenText);
    }
  };

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      speechService.stopSpeaking();
      speechService.stopListening();
    };
  }, []);

  // Automatic Screen Content Narration: speaks the page content when moving to a new page
  useEffect(() => {
    // Avoid speaking on splash screen (screen 1)
    if (currentScreen === 1) return;

    const narration = SCREEN_NARRATIONS[currentScreen];
    if (narration) {
      const textToSpeak = narration[language] || narration.hi || narration.en;
      if (textToSpeak) {
        // Smooth 400ms delay to let the screen transition settle
        const timer = setTimeout(() => {
          speakText(textToSpeak);
        }, 400);
        return () => clearTimeout(timer);
      }
    }
  }, [currentScreen, language]);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        changeLanguage,
        toggleLanguage,
        isLangModalOpen,
        setIsLangModalOpen,
        availableLanguages: AVAILABLE_LANGUAGES,
        t,
        currentScreen,
        setCurrentScreen,
        navigateTo,
        goBack,
        role,
        setRole,
        isFullscreen,
        setIsFullscreen,
        isJumperOpen,
        setIsJumperOpen,
        isSpeaking,
        isListening,
        setIsListening,
        speechTranscript,
        setSpeechTranscript,
        currentSpokenText,
        speakText,
        stopAudio,
        replayAudio,
        userProfile,
        setUserProfile,
        consent,
        setConsent,
        reminders,
        setReminders,
        healthRecords,
        setHealthRecords
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
