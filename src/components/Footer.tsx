import React from 'react';
import { Heart, ArrowUp, Sparkles, Cake } from 'lucide-react';
import { fireCelebrationBurst } from '../utils/confetti';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fireCelebrationBurst();
  };

  return (
    <footer className="bg-stone-950 text-stone-300 py-12 border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand info */}
        <div className="flex items-center gap-3 text-center md:text-left">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-xl">
            🎂
          </div>
          <div>
            <h4 className="font-display font-bold text-white text-base">
              Happy Birthday Rafsan Bhai! 🎉
            </h4>
            <p className="text-xs text-stone-400">
              Dedicated with love, gratitude, and utmost respect from your closest friends & family.
            </p>
          </div>
        </div>

        {/* Back to Top */}
        <div className="flex items-center gap-4">
          <button
            onClick={scrollToTop}
            className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-400 text-xs font-semibold border border-stone-800 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 pt-6 border-t border-stone-900 text-center text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-center gap-2">
        <span>Made for celebrating our beloved Rafsan Bhai</span>
        <span aria-hidden="true">·</span>
        <span className="flex items-center gap-1">
          Wishing you health, happiness & barakah always <Heart className="w-3.5 h-3.5 text-rose-500 fill-current inline" />
        </span>
      </div>
    </footer>
  );
};
