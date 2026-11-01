import React from 'react';
import { useApp } from './context/AppContext';
import { TopHeader } from './components/TopHeader';
import { BottomNav } from './components/BottomNav';
import { VoiceAudioBar } from './components/VoiceAudioBar';
import { MamtaFloatingButton } from './components/MamtaFloatingButton';
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

export function AppContent() {
  const { 
    currentScreen, 
    isFullscreen
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

  return (
    <div className="app-viewport-shell">
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

        {/* Talk to Mamta Floating Action Button (FAB) on right side above bottom nav */}
        <MamtaFloatingButton />

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
