// Mamta Ki Dori — Voice Interaction Service (Web Speech API + Resilient Fallbacks)

let activeUtterance = null;
let speechSimTimeout = null;
let recognitionInstance = null;

export const speechService = {
  // Check browser support
  hasTTS: () => typeof window !== 'undefined' && 'speechSynthesis' in window,
  hasSTT: () => typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window),

  // Speak aloud in Hindi or English
  speak: (text, lang = 'hi-IN', { onStart, onEnd } = {}) => {
    speechService.stopSpeaking();

    if (speechService.hasTTS()) {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang === 'en' ? 'en-IN' : 'hi-IN';
        utterance.rate = 0.92; // Slightly measured rate for rural understanding
        utterance.pitch = 1.05; // Friendly warm tone

        // Pick best matching voice if available
        const voices = window.speechSynthesis.getVoices();
        const targetVoice = voices.find(v => 
          (lang === 'en' ? v.lang.startsWith('en') : (v.lang.includes('hi') || v.lang.includes('Hindi')))
        );
        if (targetVoice) utterance.voice = targetVoice;

        utterance.onstart = () => {
          if (onStart) onStart();
        };

        utterance.onend = () => {
          activeUtterance = null;
          if (onEnd) onEnd();
        };

        utterance.onerror = (e) => {
          console.warn('SpeechSynthesis error, falling back:', e);
          activeUtterance = null;
          if (onEnd) onEnd();
        };

        activeUtterance = utterance;
        window.speechSynthesis.speak(utterance);
        return;
      } catch (err) {
        console.warn('Speech synthesis failed:', err);
      }
    }

    // Fallback: simulated speech duration
    if (onStart) onStart();
    const duration = Math.max(2500, Math.min(8000, text.length * 70));
    speechSimTimeout = setTimeout(() => {
      if (onEnd) onEnd();
    }, duration);
  },

  // Stop speaking immediately
  stopSpeaking: () => {
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
  startListening: ({ lang = 'hi-IN', onStart, onResult, onError, onEnd }) => {
    speechService.stopListening();

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRec) {
      try {
        const recognition = new SpeechRec();
        recognition.lang = lang === 'en' ? 'en-IN' : 'hi-IN';
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
    const simulatedQueries = lang === 'en' ? [
      "When is my next hospital check-up?",
      "I am feeling very tired and weak.",
      "Is saffron milk safe during pregnancy?",
      "How can I contact my ASHA worker?"
    ] : [
      "मेरा अगला चेकअप कब है?",
      "मुझे बहुत कमजोरी और थकान लग रही है।",
      "क्या केसर वाला दूध पीना सुरक्षित है?",
      "सुनीता दीदी (आशा कार्यकर्ता) से कैसे बात करें?"
    ];

    const randomPick = simulatedQueries[Math.floor(Math.random() * simulatedQueries.length)];
    
    // Simulate speaking after 2.5 seconds
    speechSimTimeout = setTimeout(() => {
      if (onResult) onResult(randomPick, true);
      if (onEnd) onEnd();
    }, 2500);
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
