import React from 'react';
import { PartyPopper, Sparkles, Flame, Volume2, Share2, Heart } from 'lucide-react';
import { fireCelebrationBurst, fireSideCannons, fireGoldenStars } from '../utils/confetti';
import { audioManager } from '../utils/audio';

export const CelebrationControls: React.FC = () => {
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: 'Happy Birthday Rafsan Bhai! 🎉',
        text: 'Join in celebrating Rafsan Bhai’s special birthday with photos, heartfelt wishes, and cheerful music!',
        url: url,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
    fireGoldenStars();
  };

  return (
    <section className="py-12 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-500 text-stone-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <span className="text-xs uppercase tracking-widest font-black text-amber-950/80 mb-1 block">
          Party Command Center
        </span>
        <h3 className="font-display font-black text-2xl sm:text-3xl text-stone-950 mb-3">
          Let’s Make Noise for Rafsan Bhai! 🎊
        </h3>
        <p className="text-amber-950/80 font-medium text-sm sm:text-base max-w-xl mx-auto mb-6">
          Trigger live confetti storms, sound the party horn, and share the celebration link with friends!
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              fireSideCannons();
              audioManager.playPartyHorn();
            }}
            className="px-5 py-3 rounded-xl bg-stone-950 hover:bg-stone-900 text-amber-300 font-bold text-sm shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <PartyPopper className="w-4 h-4 text-amber-400" />
            <span>Dual Confetti Cannons</span>
          </button>

          <button
            onClick={() => {
              fireGoldenStars();
              audioManager.playCheerShimmer();
            }}
            className="px-5 py-3 rounded-xl bg-white hover:bg-amber-50 text-stone-950 font-bold text-sm shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Golden Star Shower</span>
          </button>

          <button
            onClick={handleShare}
            className="px-5 py-3 rounded-xl bg-amber-900/40 hover:bg-amber-900/60 text-stone-950 font-bold text-sm border border-amber-950/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span>{copied ? 'Link Copied! 📋' : 'Share with Friends'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
