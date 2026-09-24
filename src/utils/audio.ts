/**
 * Synthesizer & Sound Effects engine for Rafsan Bhai's Birthday Celebration
 * Built with Web Audio API for zero-lag, dependency-free, cross-browser reliable audio.
 */

// Notes frequency mapping (Hz)
const NOTE_FREQS: Record<string, number> = {
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, Bb4: 466.16, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, Bb5: 932.33, B5: 987.77,
  C6: 1046.50
};

// Upbeat festive Happy Birthday arrangement: [note, duration in seconds, beatType]
const BIRTHDAY_MELODY: Array<{ note: string; duration: number; bass?: string }> = [
  // Happy Birthday to you
  { note: 'G4', duration: 0.28, bass: 'C3' },
  { note: 'G4', duration: 0.18, bass: 'C3' },
  { note: 'A4', duration: 0.45, bass: 'F3' },
  { note: 'G4', duration: 0.45, bass: 'C3' },
  { note: 'C5', duration: 0.45, bass: 'G3' },
  { note: 'B4', duration: 0.85, bass: 'C3' },

  // Happy Birthday to you
  { note: 'G4', duration: 0.28, bass: 'G3' },
  { note: 'G4', duration: 0.18, bass: 'G3' },
  { note: 'A4', duration: 0.45, bass: 'D3' },
  { note: 'G4', duration: 0.45, bass: 'G3' },
  { note: 'D5', duration: 0.45, bass: 'G3' },
  { note: 'C5', duration: 0.85, bass: 'C3' },

  // Happy Birthday dear Rafsan Bhai!
  { note: 'G4', duration: 0.28, bass: 'C3' },
  { note: 'G4', duration: 0.18, bass: 'C3' },
  { note: 'G5', duration: 0.48, bass: 'E3' },
  { note: 'E5', duration: 0.48, bass: 'A3' },
  { note: 'C5', duration: 0.48, bass: 'F3' },
  { note: 'B4', duration: 0.48, bass: 'G3' },
  { note: 'A4', duration: 0.85, bass: 'F3' },

  // Happy Birthday to you! (Grand finish)
  { note: 'F5', duration: 0.28, bass: 'F3' },
  { note: 'F5', duration: 0.18, bass: 'F3' },
  { note: 'E5', duration: 0.48, bass: 'C3' },
  { note: 'C5', duration: 0.48, bass: 'F3' },
  { note: 'D5', duration: 0.48, bass: 'G3' },
  { note: 'C5', duration: 1.10, bass: 'C3' },
];

class BirthdayAudioManager {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private isMuted = false;
  private volume = 0.65;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private timeoutIds: number[] = [];
  private onStateChange: ((playing: boolean) => void) | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setOnStateChange(cb: (playing: boolean) => void) {
    this.onStateChange = cb;
  }

  public getAnalyser(): AnalyserNode | null {
    this.initContext();
    return this.analyser;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime, 0.05);
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Plays a single cheerful bell/synth note
   */
  private playNote(freq: number, startTime: number, duration: number, isBass = false) {
    if (!this.ctx || !this.masterGain) return;

    // Main melodic oscillator
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Warm bell timbre: mixture of triangle and slight sine
    osc.type = isBass ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    if (!isBass) {
      // Harmonic overtone for shimmering celebration feel
      const overtone = this.ctx.createOscillator();
      const overtoneGain = this.ctx.createGain();
      overtone.type = 'triangle';
      overtone.frequency.setValueAtTime(freq * 2, startTime);

      overtoneGain.gain.setValueAtTime(0.2, startTime);
      overtoneGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration * 0.8);

      overtone.connect(overtoneGain);
      overtoneGain.connect(gain);
      overtone.start(startTime);
      overtone.stop(startTime + duration);
    }

    // Envelope
    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(isBass ? 0.35 : 0.45, startTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }

  /**
   * Adds an upbeat percussion tap / tambourine rhythm
   */
  private playPerchTap(startTime: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, startTime);
    osc.frequency.exponentialRampToValueAtTime(40, startTime + 0.08);

    gain.gain.setValueAtTime(0.18, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.08);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(startTime);
    osc.stop(startTime + 0.09);
  }

  /**
   * Starts playback of upbeat birthday song in a continuous joyous loop
   */
  public playBirthdaySong() {
    this.initContext();
    this.stopBirthdaySong();

    if (!this.ctx) return;
    this.isPlaying = true;
    if (this.onStateChange) this.onStateChange(true);

    const scheduleLoop = () => {
      if (!this.isPlaying || !this.ctx) return;

      let currentTime = this.ctx.currentTime + 0.1;
      let totalDuration = 0;

      BIRTHDAY_MELODY.forEach((item) => {
        const freq = NOTE_FREQS[item.note] || 440;
        const dur = item.duration;

        this.playNote(freq, currentTime + totalDuration, dur, false);

        // Percussion tap on upbeat
        this.playPerchTap(currentTime + totalDuration);

        if (item.bass) {
          const bassFreq = NOTE_FREQS[item.bass] || 130;
          this.playNote(bassFreq, currentTime + totalDuration, dur * 0.9, true);
        }

        totalDuration += dur + 0.06;
      });

      // Loop after small upbeat rest
      const loopTimeout = window.setTimeout(() => {
        if (this.isPlaying) {
          scheduleLoop();
        }
      }, totalDuration * 1000 + 400);

      this.timeoutIds.push(loopTimeout);
    };

    scheduleLoop();
  }

  public stopBirthdaySong() {
    this.isPlaying = false;
    this.timeoutIds.forEach((id) => clearTimeout(id));
    this.timeoutIds = [];
    if (this.onStateChange) this.onStateChange(false);
  }

  public togglePlay() {
    if (this.isPlaying) {
      this.stopBirthdaySong();
    } else {
      this.playBirthdaySong();
    }
  }

  // --- Sound Effects ---

  /**
   * Party Horn sound effect (Ta-da!)
   */
  public playPartyHorn() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 fanfare
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.01, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.3, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + (idx === 3 ? 0.6 : 0.15));

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.7);
    });
  }

  /**
   * Cake Candle Blow Out sound: gentle wind whoosh + magical chime
   */
  public playCandleBlowChime() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;

    // Magical chime ascending
    const chimes = [783.99, 987.77, 1174.66, 1567.98];
    chimes.forEach((freq, i) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + 0.1 + i * 0.09);

      gain.gain.setValueAtTime(0.25, now + 0.1 + i * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8 + i * 0.1);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + 0.1 + i * 0.09);
      osc.stop(now + 1.2);
    });
  }

  /**
   * Party Popper "POP!" sound
   */
  public playPopSound() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.12);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.13);
  }

  /**
   * Upbeat applause/cheer synthesizer sparkle
   */
  public playCheerShimmer() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    for (let i = 0; i < 6; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      const randomFreq = 400 + Math.random() * 800;
      osc.frequency.setValueAtTime(randomFreq, now + i * 0.07);

      gain.gain.setValueAtTime(0.15, now + i * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.25);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + i * 0.07);
      osc.stop(now + i * 0.07 + 0.3);
    }
  }
}

export const audioManager = new BirthdayAudioManager();
