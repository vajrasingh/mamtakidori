import React from 'react';
import { useApp } from './context/AppContext';
import { TopHeader } from './components/TopHeader';
import { BottomNav } from './components/BottomNav';
import { VoiceAudioBar } from './components/VoiceAudioBar';
import { QuickScreenJumper } from './components/QuickScreenJumper';

// All 18 Screens
import { Screen01Splash } from './screens/Screen01Splash';
import { Screen02Language } from './screens/Screen02Language';
import { Screen03Onboarding } from './screens/Screen03Onboarding';
import { Screen04Consent } from './screens/Screen04Consent';
import { Screen05Registration } from './screens/Screen05Registration';
import { Screen06Home } from './screens/Screen06Home';
import { Screen07TalkToMamta } from './screens/Screen07TalkToMamta';
import { Screen08PregnancyWeek } from './screens/Screen08PregnancyWeek';
import { Screen09Checkups } from './screens/Screen09Checkups';
import { Screen10VoiceRecord } from './screens/Screen10VoiceRecord';
import { Screen11PhotoUpload } from './screens/Screen11PhotoUpload';
import { Screen12Symptoms } from './screens/Screen12Symptoms';
import { Screen13Reminders } from './screens/Screen13Reminders';
import { Screen14FamilySupport } from './screens/Screen14FamilySupport';
import { Screen15CareTimeline } from './screens/Screen15CareTimeline';
import { Screen16GetHelp } from './screens/Screen16GetHelp';
import { Screen17RecordsPrivacy } from './screens/Screen17RecordsPrivacy';
import { Screen18AshaMode } from './screens/Screen18AshaMode';
import { Screen19RemedyFlow } from './screens/Screen19RemedyFlow';
import { Screen20LoginOTP } from './screens/Screen20LoginOTP';
import { RegionalLanguageModal } from './components/RegionalLanguageModal';
import { AmbientMusicControl } from './components/AmbientMusicControl';

import { 
  Smartphone, 
  Maximize2, 
  Minimize2, 
  Globe, 
  UserCheck, 
  Layers, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Volume2,
  VolumeX
} from 'lucide-react';

export function AppContent() {
  const { 
    currentScreen, 
    setCurrentScreen, 
    navigateTo, 
    goBack, 
    language, 
    toggleLanguage, 
    role, 
    setRole, 
    isFullscreen, 
    setIsFullscreen,
    setIsJumperOpen,
    isSpeaking,
    stopAudio,
    t
  } = useApp();

  // Screen Dispatcher Map
  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 1: return <Screen01Splash />;
      case 2: return <Screen02Language />;
      case 3: return <Screen03Onboarding />;
      case 4: return <Screen04Consent />;
      case 5: return <Screen05Registration />;
      case 6: return <Screen06Home />;
      case 7: return <Screen07TalkToMamta />;
      case 8: return <Screen08PregnancyWeek />;
      case 9: return <Screen09Checkups />;
      case 10: return <Screen10VoiceRecord />;
      case 11: return <Screen11PhotoUpload />;
      case 12: return <Screen12Symptoms />;
      case 13: return <Screen13Reminders />;
      case 14: return <Screen14FamilySupport />;
      case 15: return <Screen15CareTimeline />;
      case 16: return <Screen16GetHelp />;
      case 17: return <Screen17RecordsPrivacy />;
      case 18: return <Screen18AshaMode />;
      case 19: return <Screen19RemedyFlow />;
      case 20: return <Screen20LoginOTP />;
      default: return <Screen06Home />;
    }
  };

  const screenNames = [
    "01 Splash", "02 Language", "03 Onboarding", "04 Consent", "05 Register",
    "06 Home", "07 Talk to Mamta", "08 Week-by-Week", "09 Check-ups", "10 Voice Record",
    "11 Photo Upload", "12 Symptoms", "13 Reminders", "14 Family Support", "15 Timeline",
    "16 Get Help", "17 Records & Privacy", "18 ASHA Mode", "19 Family Remedy AI",
    "20 Login OTP"
  ];

  return (
    <div className="app-viewport-shell">
      {/* Top Prototype Workbench Bar for Reviewer Convenience */}
      <aside className="prototype-workbench-bar" aria-label="Prototype Controls">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/assets/logo.png" alt="Logo" style={{ width: '28px', height: '28px', borderRadius: '6px' }} />
          <div>
            <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--deep-navy)' }}>
              ममता की डोरी
            </span>
            <span style={{ fontSize: '11px', color: 'var(--primary-blue)', marginLeft: '6px', fontWeight: 700 }}>
              v1.0 Complete Prototype
            </span>
          </div>
        </div>

        {/* Screen Picker Quick Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button 
            onClick={() => currentScreen > 1 && navigateTo(currentScreen - 1)}
            disabled={currentScreen <= 1}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '4px 6px',
              cursor: currentScreen <= 1 ? 'not-allowed' : 'pointer',
              opacity: currentScreen <= 1 ? 0.4 : 1,
              color: 'var(--deep-navy)'
            }}
            title="Previous Screen"
          >
            <ChevronLeft size={18} />
          </button>

          <select
            value={currentScreen}
            onChange={(e) => navigateTo(Number(e.target.value))}
            style={{
              padding: '6px 10px',
              borderRadius: 'var(--radius-sm)',
              border: '1.5px solid var(--powder-blue)',
              background: 'white',
              fontSize: '13px',
              fontWeight: 700,
              color: 'var(--deep-navy)',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {screenNames.map((name, i) => (
              <option key={i + 1} value={i + 1}>
                {name}
              </option>
            ))}
          </select>

          <button 
            onClick={() => currentScreen < 20 && navigateTo(currentScreen + 1)}
            disabled={currentScreen >= 20}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '4px 6px',
              cursor: currentScreen >= 20 ? 'not-allowed' : 'pointer',
              opacity: currentScreen >= 20 ? 0.4 : 1,
              color: 'var(--deep-navy)'
            }}
            title="Next Screen"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Quick Actions & Toggles */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Audio Stop Button if speaking */}
          {isSpeaking && (
            <button
              onClick={stopAudio}
              style={{
                background: 'var(--warm-rose)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                padding: '4px 10px',
                fontSize: '12px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer'
              }}
            >
              <VolumeX size={14} />
              <span>Stop Voice</span>
            </button>
          )}

          {/* Role Quick Selector */}
          <button
            onClick={() => {
              if (role === 'mother') { setRole('mil'); navigateTo(14); }
              else if (role === 'mil') { setRole('asha'); navigateTo(18); }
              else { setRole('mother'); navigateTo(6); }
            }}
            className="m-badge"
            style={{
              background: role === 'asha' ? 'var(--color-success-bg)' : role === 'mil' ? 'var(--soft-blush)' : 'var(--powder-blue)',
              cursor: 'pointer',
              padding: '6px 10px',
              border: '1px solid rgba(65, 111, 152, 0.2)'
            }}
            title="Switch User Persona Role"
          >
            <UserCheck size={14} />
            <span style={{ textTransform: 'capitalize' }}>Role: {role}</span>
          </button>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="m-badge"
            style={{
              background: 'white',
              cursor: 'pointer',
              padding: '6px 10px',
              border: '1px solid rgba(65, 111, 152, 0.2)'
            }}
          >
            <Globe size={14} />
            <span>{language === 'hi' ? 'हिन्दी' : 'English'}</span>
          </button>

          {/* Calming Ambient Music Control */}
          <AmbientMusicControl language={language} />

          {/* All Screens Drawer */}
          <button
            onClick={() => setIsJumperOpen(true)}
            className="m-badge m-badge-blue"
            style={{ cursor: 'pointer', padding: '6px 10px' }}
          >
            <Layers size={14} />
            <span>All 20 Screens</span>
          </button>

          {/* Device Frame Viewport Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            style={{
              background: 'white',
              border: '1px solid rgba(65, 111, 152, 0.2)',
              borderRadius: 'var(--radius-sm)',
              padding: '6px 10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--deep-navy)'
            }}
            title={isFullscreen ? "Switch to Phone Frame" : "Switch to Fullscreen"}
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            <span>{isFullscreen ? "Phone Frame" : "Expand"}</span>
          </button>
        </div>
      </aside>

      {/* Smartphone Device Chassis */}
      <main className={`mobile-device-chassis ${isFullscreen ? 'is-fullscreen' : ''} ${currentScreen === 1 ? 'is-splash-screen' : ''}`}>
        {/* Smartphone Hardware Status Bar */}
        <div className="phone-status-bar">
          <span>09:41</span>
          <div className="phone-camera-punchhole">
            <span className="camera-lens" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>5G</span>
            <span>📶</span>
            <span>🔋 92%</span>
          </div>
        </div>

        {/* Persistent Top Header (screens 4 to 19, excluding 20 which has dedicated back navigation) */}
        {currentScreen > 3 && currentScreen !== 20 && <TopHeader />}

        {/* Scrollable Main Screen Canvas */}
        <div className={`screen-scroll-container ${[1, 2, 3, 4, 5, 20].includes(currentScreen) ? 'has-no-bottom-nav' : ''}`}>
          {renderCurrentScreen()}
        </div>

        {/* Spoken Voice Floating Player Bar */}
        <VoiceAudioBar />

        {/* Bottom Persistent 4-Destination Navigation */}
        <BottomNav />

        {/* Drawer for Jumping between All Screens */}
        <QuickScreenJumper />

        {/* Regional Dialects Selection Modal */}
        <RegionalLanguageModal />
      </main>
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
