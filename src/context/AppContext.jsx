import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';
import { speechService } from '../services/speechService';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('hi'); // 'hi' or 'en'
  const [currentScreen, setCurrentScreen] = useState(1); // 1 to 18
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
    familySharing: false,
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
      date: '15 अक्टूबर 2026',
      doctor: 'डॉ. प्रिया सिंह (PHC)',
      status: 'सत्यापित (Verified)',
      imageUrl: '/assets/doctor_prenatal_clinic.jpg'
    },
    {
      id: 2,
      type: 'ultrasound',
      title: 'प्रथम तिमाही डेटिंग सोनोग्राफी',
      date: '10 अक्टूबर 2026',
      doctor: 'जिला अस्पताल रेडियोलॉजी',
      status: 'समीक्षित (Reviewed)',
      imageUrl: '/assets/Hindi maternal health app wireframe storyboard (1).png'
    }
  ]);

  // Current translation strings
  const t = translations[language];

  // Language toggle
  const toggleLanguage = () => {
    const nextLang = language === 'hi' ? 'en' : 'hi';
    setLanguage(nextLang);
    if (isSpeaking) speechService.stopSpeaking();
    document.body.className = nextLang === 'en' ? 'lang-en' : 'lang-hi';
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

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
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
