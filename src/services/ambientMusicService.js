// Ambient Calming Music Service (Web Audio API)
// Provides soothing, meditative maternal ambient harmony for onboarding screens

class AmbientMusicService {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.droneGain = null;
    this.melodyGain = null;
    this.isPlayingState = false;
    this.melodyInterval = null;
    this.listeners = new Set();
    this.targetVolume = 0.22; // Gentle, non-intrusive background volume
    this.isDucked = false;

    // Pentatonic maternal lullaby scale notes (Frequencies in Hz)
    // C Major Pentatonic / Raag Bhupali (C4, D4, E4, G4, A4, C5, E5)
    this.scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 659.25];
    this.droneFreqs = [130.81, 196.00, 261.63]; // C3, G3, C4 warm root drone
    this.droneOscs = [];
  }

  // Subscribe to play/pause state changes
  subscribe(callback) {
    this.listeners.add(callback);
    callback(this.isPlayingState);
    return () => this.listeners.delete(callback);
  }

  notify() {
    this.listeners.forEach(cb => cb(this.isPlayingState));
  }

  isPlaying() {
    return this.isPlayingState;
  }

  // Initialize Audio Context on user gesture
  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return false;
      this.ctx = new AudioCtx();

      // Master output gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Low pass filter to make sounds exceptionally warm and soft (no harsh treble)
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(650, this.ctx.currentTime); // Warm cutoff
      this.filter.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return true;
  }

  // Start playing soothing ambiance (Disabled per user request)
  start() {
    this.stop();
    this.isPlayingState = false;
    this.notify();
  }

  startWarmDrone() {
    this.stopWarmDrone();
    const now = this.ctx.currentTime;

    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.12, now);
    this.droneGain.connect(this.filter);

    this.droneFreqs.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      // Triangle wave has soft, flute-like warmth
      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Subtle slow detune for chorusing shimmer
      osc.detune.setValueAtTime((i - 1) * 3, now);

      osc.connect(this.droneGain);
      osc.start(now);
      this.droneOscs.push(osc);
    });
  }

  stopWarmDrone() {
    this.droneOscs.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {}
    });
    this.droneOscs = [];
  }

  startGentleMelody() {
    if (this.melodyInterval) clearInterval(this.melodyInterval);

    // Play initial bell note after 800ms
    setTimeout(() => {
      if (this.isPlayingState) this.playSoftChime();
    }, 800);

    // Play next soft chime note every 3.2 to 4.5 seconds
    this.melodyInterval = setInterval(() => {
      if (this.isPlayingState && !this.isDucked) {
        this.playSoftChime();
      }
    }, 3600);
  }

  playSoftChime() {
    if (!this.ctx || this.ctx.state !== 'running') return;

    const now = this.ctx.currentTime;
    // Pick a harmonious pentatonic pitch
    const pitch = this.scale[Math.floor(Math.random() * this.scale.length)];

    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(pitch, now);

    // Gentle bell-like ADSR envelope (slow attack, long tranquil decay)
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.18, now + 0.35); // Gentle strike
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2); // Warm 3.2s decay

    osc.connect(noteGain);
    noteGain.connect(this.filter);

    osc.start(now);
    osc.stop(now + 3.3);
  }

  // Stop / Fade out
  stop() {
    if (!this.isPlayingState || !this.ctx) return;
    this.isPlayingState = false;
    this.notify();

    if (this.melodyInterval) {
      clearInterval(this.melodyInterval);
      this.melodyInterval = null;
    }

    const now = this.ctx.currentTime;
    // Smooth 1.2s fade out
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    setTimeout(() => {
      this.stopWarmDrone();
    }, 1300);
  }

  // Toggle playback
  toggle() {
    if (this.isPlayingState) {
      this.stop();
    } else {
      this.start();
    }
    return this.isPlayingState;
  }

  // Duck music volume when speech or voice assistant is speaking
  duck() {
    if (!this.ctx || !this.isPlayingState || !this.masterGain) return;
    this.isDucked = true;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0.04, now + 0.4); // Duck to 4%
  }

  // Restore music volume when speech ends
  unduck() {
    if (!this.ctx || !this.isPlayingState || !this.masterGain) return;
    this.isDucked = false;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(this.targetVolume, now + 0.8);
  }
}

export const ambientMusic = new AmbientMusicService();
