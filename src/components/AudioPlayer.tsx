import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, PartyPopper, Music, Sliders } from 'lucide-react';
import { audioManager } from '../utils/audio';
import { fireCelebrationBurst, fireGoldenStars } from '../utils/confetti';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [isExpanded, setIsExpanded] = useState(false);
  const [visualizerHeights, setVisualizerHeights] = useState<number[]>([15, 45, 75, 30, 60, 90, 40, 20]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    audioManager.setOnStateChange((playing) => {
      setIsPlaying(playing);
    });

    const updateVisualizer = () => {
      if (audioManager.getIsPlaying()) {
        const analyser = audioManager.getAnalyser();
        if (analyser) {
          const buffer = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(buffer);
          // Pick 8 representative bins
          const step = Math.floor(buffer.length / 8);
          const heights = Array.from({ length: 8 }, (_, i) => {
            const val = buffer[i * step] || 0;
            return Math.max(12, Math.min(100, Math.round((val / 255) * 100)));
          });
          setVisualizerHeights(heights);
        }
      } else {
        setVisualizerHeights([15, 25, 20, 15, 30, 20, 15, 10]);
      }
      animationFrameRef.current = requestAnimationFrame(updateVisualizer);
    };

    animationFrameRef.current = requestAnimationFrame(updateVisualizer);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      audioManager.stopBirthdaySong();
    };
  }, []);

  const handleTogglePlay = () => {
    audioManager.togglePlay();
    setIsPlaying(audioManager.getIsPlaying());
  };

  const handleToggleMute = () => {
    const muted = audioManager.toggleMute();
    setIsMuted(muted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioManager.setVolume(val);
    if (isMuted && val > 0) {
      audioManager.toggleMute();
      setIsMuted(false);
    }
  };

  const triggerSound = (type: 'horn' | 'popper' | 'cheer') => {
    if (type === 'horn') {
      audioManager.playPartyHorn();
      fireGoldenStars();
    } else if (type === 'popper') {
      audioManager.playPopSound();
      fireCelebrationBurst();
    } else {
      audioManager.playCheerShimmer();
      fireCelebrationBurst();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 max-w-[calc(100vw-2rem)]">
      {/* Expanded Soundboard Tray */}
      {isExpanded && (
        <div className="bg-stone-900/95 backdrop-blur-md text-white border border-amber-500/30 rounded-2xl p-4 shadow-2xl flex flex-col gap-3 min-w-[280px] sm:min-w-[320px] transition-all duration-300 ease-out">
          <div className="flex items-center justify-between border-b border-stone-800 pb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
              Upbeat Celebration Jukebox
            </span>
            <span className="text-[11px] text-stone-400">Web Audio Synth</span>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3 px-1">
            <button
              onClick={handleToggleMute}
              className="text-stone-300 hover:text-white transition-colors focus-visible:outline-none"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-amber-400" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-full h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <span className="text-[11px] font-mono text-stone-400 w-8 text-right">
              {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
            </span>
          </div>

          {/* Soundboard Quick FX */}
          <div>
            <div className="text-[11px] text-stone-400 font-medium mb-1.5">Party Soundboard Effects:</div>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => triggerSound('horn')}
                className="px-2 py-1.5 bg-stone-800 hover:bg-amber-950/60 border border-stone-700 hover:border-amber-500/50 rounded-lg text-xs font-medium text-amber-200 transition-all active:scale-95 flex items-center justify-center gap-1"
              >
                🎺 Fanfare
              </button>
              <button
                onClick={() => triggerSound('popper')}
                className="px-2 py-1.5 bg-stone-800 hover:bg-rose-950/60 border border-stone-700 hover:border-rose-500/50 rounded-lg text-xs font-medium text-rose-200 transition-all active:scale-95 flex items-center justify-center gap-1"
              >
                🎉 Popper
              </button>
              <button
                onClick={() => triggerSound('cheer')}
                className="px-2 py-1.5 bg-stone-800 hover:bg-emerald-950/60 border border-stone-700 hover:border-emerald-500/50 rounded-lg text-xs font-medium text-emerald-200 transition-all active:scale-95 flex items-center justify-center gap-1"
              >
                ✨ Cheer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Docked Floating Pill */}
      <div className="bg-stone-900/90 hover:bg-stone-900 backdrop-blur-md text-white border border-amber-500/40 rounded-full px-3.5 py-2 shadow-xl shadow-amber-950/20 flex items-center gap-3 transition-all duration-200">
        {/* Play/Pause Button */}
        <button
          onClick={handleTogglePlay}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            isPlaying
              ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/40 hover:scale-105'
              : 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 shadow-md hover:scale-105 animate-pulse'
          }`}
          aria-label={isPlaying ? 'Pause birthday music' : 'Play upbeat birthday music'}
          title={isPlaying ? 'Pause celebration melody' : 'Play upbeat celebration melody'}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-stone-950" /> : <Play className="w-4 h-4 fill-stone-950 ml-0.5" />}
        </button>

        {/* Info & Animated Visualizer */}
        <div className="flex flex-col cursor-pointer select-none" onClick={handleTogglePlay}>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-amber-300">
              {isPlaying ? 'Playing: Happy Birthday!' : 'Play Birthday Music'}
            </span>
            {isPlaying && (
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            )}
          </div>
          <span className="text-[10px] text-stone-300 font-medium">
            {isPlaying ? 'Upbeat Synth Edition' : 'Tap to celebrate with audio'}
          </span>
        </div>

        {/* Live Audio Visualizer Bars */}
        <div
          className="flex items-end gap-0.5 h-6 px-1 cursor-pointer"
          onClick={handleTogglePlay}
          title={isPlaying ? 'Music playing' : 'Click play to start'}
        >
          {visualizerHeights.map((h, i) => (
            <div
              key={i}
              className={`w-1 rounded-full transition-all duration-100 ${
                isPlaying
                  ? 'bg-gradient-to-t from-amber-500 to-orange-400'
                  : 'bg-stone-700'
              }`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>

        {/* Quick Expand Toggle for Settings & Soundboard */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`p-1.5 rounded-full transition-colors ${
            isExpanded ? 'bg-amber-500/30 text-amber-300' : 'text-stone-400 hover:text-stone-200'
          }`}
          title="Soundboard & Settings"
          aria-label="Soundboard and settings"
        >
          <Sliders className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
