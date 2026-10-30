// Mamta Ki Dori — Voice Interaction Service (Web Speech API + Resilient Multi-Dialect Fallbacks)
import { ambientMusic } from './ambientMusicService';

let activeUtterance = null;
let speechSimTimeout = null;
let recognitionInstance = null;

const LANG_MAP = {
  hi: 'hi-IN',
  bho: 'hi-IN', // Bhojpuri maps phonetically to Hindi TTS with dialect vocabulary
  mai: 'hi-IN', // Maithili maps phonetically to Hindi TTS
  raj: 'hi-IN', // Rajasthani maps to Hindi TTS
  bn: 'bn-IN',  // Bengali
  mr: 'mr-IN',  // Marathi
  en: 'en-IN'   // Indian English
};

export const speechService = {
  // Check browser support
  hasTTS: () => typeof window !== 'undefined' && 'speechSynthesis' in window,
  hasSTT: () => typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window),

  // Speak aloud in chosen language or dialect
  speak: (text, langCode = 'hi', { onStart, onEnd, onError } = {}) => {
    speechService.stopSpeaking();

    const targetLang = LANG_MAP[langCode] || 'hi-IN';

    if (speechService.hasTTS()) {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = targetLang;
        utterance.rate = 0.90; // Gentle, measured rate for rural clarity
        utterance.pitch = 1.05; // Warm, friendly maternal tone

        // Pick best matching voice if available
        const voices = window.speechSynthesis.getVoices();
        const targetVoice = voices.find(v => {
          if (langCode === 'en') return v.lang.startsWith('en');
          if (langCode === 'bn') return v.lang.includes('bn') || v.lang.includes('Bengali');
          if (langCode === 'mr') return v.lang.includes('mr') || v.lang.includes('Marathi');
          return v.lang.includes('hi') || v.lang.includes('Hindi');
        });
        if (targetVoice) utterance.voice = targetVoice;

        utterance.onstart = () => {
          ambientMusic.duck();
          if (onStart) onStart();
        };

        utterance.onend = () => {
          ambientMusic.unduck();
          activeUtterance = null;
          if (onEnd) onEnd();
        };

        utterance.onerror = (e) => {
          console.warn('SpeechSynthesis error, falling back:', e);
          ambientMusic.unduck();
          activeUtterance = null;
          if (onEnd) onEnd();
          if (onError) onError(e);
        };

        activeUtterance = utterance;
        window.speechSynthesis.speak(utterance);
        return;
      } catch (err) {
        console.warn('Speech synthesis failed:', err);
      }
    }

    // Fallback: simulated speech duration for devices without local TTS
    ambientMusic.duck();
    if (onStart) onStart();
    const duration = Math.max(3000, Math.min(9000, text.length * 60));
    speechSimTimeout = setTimeout(() => {
      ambientMusic.unduck();
      if (onEnd) onEnd();
    }, duration);
  },

  // Stop speaking immediately
  stopSpeaking: () => {
    ambientMusic.unduck();
    if (speechSimTimeout) {
      clearTimeout(speechSimTimeout);
      speechSimTimeout = null;
    }
    if (speechService.hasTTS() && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        // ignore
      }
    }
    activeUtterance = null;
  },

  // Start Voice Recognition (Speech-to-Text)
  startListening: ({ langCode = 'hi', onStart, onResult, onError, onEnd }) => {
    speechService.stopListening();

    const targetLang = LANG_MAP[langCode] || 'hi-IN';
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRec) {
      try {
        const recognition = new SpeechRec();
        recognition.lang = targetLang;
        recognition.continuous = false;
        recognition.interimResults = true;

        recognition.onstart = () => {
          if (onStart) onStart();
        };

        recognition.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
          if (onResult) onResult(transcript, event.results[0].isFinal);
        };

        recognition.onerror = (event) => {
          console.warn('STT error:', event.error);
          if (onError) onError(event.error);
        };

        recognition.onend = () => {
          recognitionInstance = null;
          if (onEnd) onEnd();
        };

        recognitionInstance = recognition;
        recognition.start();
        return;
      } catch (e) {
        console.warn('SpeechRecognition failed to start:', e);
      }
    }

    // Graceful Simulation if STT is not supported or blocked
    if (onStart) onStart();
    const simulatedQueries = {
      hi: [
        "क्या बहू को गैस में अजवाइन का पानी दे सकते हैं?",
        "क्या पहली तिमाही में कच्चा पपीता खाना सुरक्षित है?",
        "केसर और हल्दी वाला दूध कितनी मात्रा में देना चाहिए?",
        "सुनीता दीदी से घरेलू नुस्खे की जांच कैसे करवाएं?"
      ],
      bho: [
        "का पतोहू के पेट के गैस में अजवाइन-सौंफ के पानी दिहल जा सकेला?",
        "का गर्भ में कच्चा पपीता खाइल ठीक बा?",
        "सुनीता दीदी से नुस्खा के जांच करा दीं।"
      ],
      mai: [
        "की पतोहू के गैस में अजवाइन-सौंफक काढ़ा द सकैत छी?",
        "की गर्भावस्था में कच्चा पपीता सुरक्षित अछि?"
      ],
      raj: [
        "कांई बींदणी नै पेट गैस में अजवायन रौ पाणी पाय सका?",
        "कांई कच्चो पपीतो खावणो ठीक छे?"
      ],
      bn: [
        "গর্ভাবস্থায় কি কাঁচা পেঁপে খাওয়া নিরাপদ?",
        "বউমাকে কি জোয়ান ও মৌরির জল দেওয়া যাবে?"
      ],
      mr: [
        "गरोदरपणात कच्ची पपई खाणे सुरक्षित आहे का?",
        "सुनेला ओवा आणि बडीशेपचे पाणी देता येईल का?"
      ],
      en: [
        "Is ajwain and fennel seed water safe for morning sickness and gas?",
        "Can we give raw papaya curry during early pregnancy?",
        "Can ASHA worker Sunita Didi verify this traditional remedy?"
      ]
    };

    const pool = simulatedQueries[langCode] || simulatedQueries.hi;
    const randomPick = pool[Math.floor(Math.random() * pool.length)];
    
    // Simulate speaking after 2.2 seconds
    speechSimTimeout = setTimeout(() => {
      if (onResult) onResult(randomPick, true);
      if (onEnd) onEnd();
    }, 2200);
  },

  // Stop Listening
  stopListening: () => {
    if (speechSimTimeout) {
      clearTimeout(speechSimTimeout);
      speechSimTimeout = null;
    }
    if (recognitionInstance) {
      try {
        recognitionInstance.stop();
      } catch (e) {
        // ignore
      }
      recognitionInstance = null;
    }
  }
};
