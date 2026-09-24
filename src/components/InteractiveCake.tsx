import React, { useState } from 'react';
import { Sparkles, Flame, RefreshCw, Gift, Heart, Trophy, Smile } from 'lucide-react';
import { fireCandleBlowFanfare, fireCelebrationBurst } from '../utils/confetti';
import { audioManager } from '../utils/audio';

const BIRTHDAY_FORTUNES = [
  "🌟 Rafsan Bhai's Fortune: An extraordinary breakthrough year ahead filled with health, immense happiness, and triumphant career milestones!",
  "🚀 Rafsan Bhai's Fortune: Every path you walk this year will be showered with blessings, loyal friends, and sweet achievements!",
  "☕ Rafsan Bhai's Fortune: Infinite cups of soothing chai, endless laughs, and unforgettable travels to breathtaking destinations!",
  "💎 Rafsan Bhai's Fortune: Your kindness will return to you tenfold in love, peace of mind, and everlasting prosperity!",
];

export const InteractiveCake: React.FC = () => {
  // 5 candles state: true = lit, false = blown
  const [candles, setCandles] = useState<boolean[]>([true, true, true, true, true]);
  const [hasBlownAll, setHasBlownAll] = useState(false);
  const [fortuneIndex, setFortuneIndex] = useState(0);

  const litCount = candles.filter(Boolean).length;

  const blowSingleCandle = (index: number) => {
    if (!candles[index]) return; // already out

    const next = [...candles];
    next[index] = false;
    setCandles(next);
    audioManager.playCandleBlowChime();

    if (next.every((c) => !c)) {
      triggerAllBlown();
    }
  };

  const blowAllCandles = () => {
    setCandles([false, false, false, false, false]);
    triggerAllBlown();
  };

  const triggerAllBlown = () => {
    setHasBlownAll(true);
    setFortuneIndex(Math.floor(Math.random() * BIRTHDAY_FORTUNES.length));
    audioManager.playCandleBlowChime();
    audioManager.playPartyHorn();
    fireCandleBlowFanfare();
  };

  const relightCandles = () => {
    setCandles([true, true, true, true, true]);
    setHasBlownAll(false);
    audioManager.playPopSound();
    fireCelebrationBurst();
  };

  return (
    <section id="cake" className="py-16 md:py-24 bg-gradient-to-b from-amber-950/20 via-stone-900 to-stone-950 text-white relative overflow-hidden border-b border-amber-500/20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        
        {/* Section Heading */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Tradition</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Make a Wish for Rafsan Bhai! 🎂
          </h2>
          <p className="mt-2 text-stone-300 text-sm sm:text-base max-w-md mx-auto">
            Click on individual candles or blow them all together to seal your warmest birthday wish for him.
          </p>
        </div>

        {/* The Interactive Cake Showcase */}
        <div className="relative inline-flex flex-col items-center select-none pt-12 pb-6">
          
          {/* Candles Row */}
          <div className="flex items-end justify-center gap-6 sm:gap-9 mb-[-8px] z-20">
            {candles.map((isLit, idx) => (
              <div
                key={idx}
                onClick={() => blowSingleCandle(idx)}
                className="flex flex-col items-center cursor-pointer group"
                title={isLit ? 'Click to blow out this candle!' : 'Blown out'}
              >
                {/* Flame or Smoke */}
                <div className="h-10 flex items-center justify-center">
                  {isLit ? (
                    <div className="relative animate-flame">
                      <div className="w-3.5 h-6 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 rounded-full shadow-[0_0_12px_#fbbf24] transition-all group-hover:scale-125" />
                      <div className="absolute inset-0 w-2 h-3.5 bg-white/70 rounded-full top-1 left-0.5 blur-[1px]" />
                    </div>
                  ) : (
                    <div className="text-stone-400 font-mono text-xs opacity-70 animate-pulse">
                      💨
                    </div>
                  )}
                </div>

                {/* Candle Wick */}
                <div className="w-0.5 h-2 bg-stone-700" />

                {/* Candle Stick */}
                <div
                  className={`w-3.5 sm:w-4 h-12 rounded-t-sm shadow-md transition-all ${
                    idx % 2 === 0
                      ? 'bg-gradient-to-b from-amber-200 via-amber-300 to-amber-400 border border-amber-200'
                      : 'bg-gradient-to-b from-rose-300 via-rose-400 to-rose-500 border border-rose-300'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Cake Top Tier */}
          <div className="w-56 sm:w-72 h-14 bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 rounded-t-3xl border-2 border-amber-300/60 shadow-lg relative flex items-center justify-around px-4 z-10">
            <span className="text-base sm:text-lg">🍓</span>
            <span className="text-base sm:text-lg">🍫</span>
            <span className="text-xs sm:text-sm font-bold text-amber-950 font-display">RAFSAN</span>
            <span className="text-base sm:text-lg">🍫</span>
            <span className="text-base sm:text-lg">🍓</span>
          </div>

          {/* Cake Middle Tier */}
          <div className="w-72 sm:w-88 h-16 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 rounded-t-2xl border-x-2 border-t-2 border-amber-500/40 shadow-xl relative flex items-center justify-center">
            {/* Frosting drips */}
            <div className="absolute -top-2 inset-x-0 flex justify-around px-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-3 bg-amber-100 rounded-b-full shadow-sm"
                />
              ))}
            </div>
            <span className="font-handwriting text-2xl sm:text-3xl text-amber-200 tracking-wider">
              Happy Birthday, Bhai!
            </span>
          </div>

          {/* Cake Bottom Tier */}
          <div className="w-84 sm:w-104 h-20 bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 rounded-t-xl border-x-2 border-t-2 border-amber-400/50 shadow-2xl relative flex items-center justify-around px-6">
            <span className="text-lg">✨</span>
            <span className="text-xs uppercase tracking-widest text-amber-300 font-bold">
              365 Days of Awesomeness
            </span>
            <span className="text-lg">✨</span>
          </div>

          {/* Cake Plate / Stand */}
          <div className="w-96 sm:w-116 h-4 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-400 rounded-full shadow-2xl border border-amber-300" />
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {litCount > 0 ? (
            <button
              onClick={blowAllCandles}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-stone-950 font-extrabold text-sm sm:text-base shadow-lg shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Flame className="w-5 h-5 fill-stone-950 text-stone-950" />
              <span>Make a Wish & Blow All Candles ({litCount} burning)</span>
            </button>
          ) : (
            <button
              onClick={relightCandles}
              className="px-6 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 hover:text-white font-bold text-sm sm:text-base border border-amber-500/40 shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Relight the Candles!</span>
            </button>
          )}
        </div>

        {/* Wish Granted Modal / Fortune Card */}
        {hasBlownAll && (
          <div className="mt-8 max-w-xl mx-auto p-5 sm:p-6 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-rose-500/20 border border-amber-400/50 rounded-2xl shadow-2xl backdrop-blur-md animate-fade-in">
            <div className="flex items-center justify-center gap-2 text-amber-300 font-display font-bold text-xl mb-1">
              <span>🎉 Wish Granted! 🎉</span>
            </div>
            <p className="text-stone-200 text-sm sm:text-base italic leading-relaxed">
              {BIRTHDAY_FORTUNES[fortuneIndex]}
            </p>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-amber-300/80 font-medium">
              <Smile className="w-4 h-4 text-amber-400" />
              <span>May every prayer made for Rafsan Bhai come true!</span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
