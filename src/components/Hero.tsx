import React, { useEffect } from 'react';
import { PartyPopper, Sparkles, Heart, Cake, ArrowDown, Music2, Award, ShieldCheck } from 'lucide-react';
import { fireCelebrationBurst, fireSideCannons, fireGoldenStars } from '../utils/confetti';
import { audioManager } from '../utils/audio';

interface HeroProps {
  portraitImageSrc: string;
}

export const Hero: React.FC<HeroProps> = ({ portraitImageSrc }) => {
  // Fire confetti upon first load
  useEffect(() => {
    const timer = setTimeout(() => {
      fireSideCannons();
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleHeroConfetti = () => {
    fireCelebrationBurst();
    fireGoldenStars();
    audioManager.playPartyHorn();
  };

  const handlePlayMusic = () => {
    audioManager.playBirthdaySong();
    fireCelebrationBurst();
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 bg-gradient-to-b from-stone-900 via-stone-900 to-amber-950/40 text-white">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-br from-amber-500/20 via-orange-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

      {/* Floating decorative festive elements */}
      <div className="absolute top-12 left-6 sm:left-16 text-3xl sm:text-4xl animate-float-slow select-none opacity-85">
        🎈
      </div>
      <div className="absolute top-24 right-8 sm:right-20 text-3xl sm:text-4xl animate-float-reverse select-none opacity-85">
        ✨
      </div>
      <div className="absolute bottom-20 left-12 text-3xl sm:text-4xl animate-float-reverse select-none opacity-75 hidden sm:block">
        🎁
      </div>
      <div className="absolute bottom-24 right-14 text-3xl sm:text-4xl animate-float-slow select-none opacity-80 hidden sm:block">
        🥳
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text & Celebratory Headline */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start space-y-6">
            
            {/* Top Celebration Subhead */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide shadow-inner">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>It's a Very Special Day!</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Celebrating Rafsan Bhai</span>
            </div>

            {/* Main Greeting Typography */}
            <div className="space-y-2">
              <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-6xl tracking-tight leading-none text-white">
                HAPPY BIRTHDAY <br />
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent drop-shadow-sm">
                  RAFSAN BHAI!
                </span>
              </h1>
              <p className="font-handwriting text-2xl sm:text-3xl text-amber-200/90 pt-1">
                The man with the brightest smile, golden heart, and endless kindness ✨
              </p>
            </div>

            {/* Personal bio / heartfelt elevator intro */}
            <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              To the coolest brother, dedicated pharmacist, trusted advisor, and life of every gathering. 
              Today, we celebrate all the moments you have brought joy, laughter, and reassurance to our lives. 
              Here is to a glorious year ahead filled with health, success, and prosperity!
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2 w-full sm:w-auto">
              <button
                onClick={handleHeroConfetti}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-bold text-sm sm:text-base shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <PartyPopper className="w-5 h-5" />
                Shower with Confetti!
              </button>

              <button
                onClick={handlePlayMusic}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 hover:text-amber-200 font-semibold text-sm sm:text-base border border-amber-500/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <Music2 className="w-4 h-4 text-amber-400" />
                Play Birthday Tune
              </button>

              <a
                href="#wishes"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-transparent hover:bg-stone-800/60 text-stone-300 hover:text-white font-medium text-sm sm:text-base border border-stone-700 transition-all flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 text-rose-400" />
                Write a Wish
              </a>
            </div>

            {/* Respect & Brotherly Accolades Badges */}
            <div className="pt-4 border-t border-stone-800/80 w-full grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="bg-stone-800/40 p-2.5 rounded-lg border border-stone-800">
                <div className="text-amber-400 font-bold text-lg font-display">100%</div>
                <div className="text-stone-400 text-xs">Big Brother Energy</div>
              </div>
              <div className="bg-stone-800/40 p-2.5 rounded-lg border border-stone-800">
                <div className="text-emerald-400 font-bold text-lg font-display">Rx Care</div>
                <div className="text-stone-400 text-xs">Healthcare Hero</div>
              </div>
              <div className="bg-stone-800/40 p-2.5 rounded-lg border border-stone-800">
                <div className="text-orange-400 font-bold text-lg font-display">Infinite</div>
                <div className="text-stone-400 text-xs">Smiles & Warmth</div>
              </div>
              <div className="bg-stone-800/40 p-2.5 rounded-lg border border-stone-800">
                <div className="text-rose-400 font-bold text-lg font-display">Top Tier</div>
                <div className="text-stone-400 text-xs">Friend & Mentor</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Portrait Showcase with Golden Laurel Frame */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group">
              {/* Outer Golden Aura */}
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-all duration-500 animate-pulse-soft" />

              {/* Main Photo Card Container */}
              <div className="relative bg-stone-900 border-2 border-amber-400/80 rounded-3xl p-3 sm:p-4 shadow-2xl overflow-hidden max-w-sm sm:max-w-md">
                
                {/* Image element */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-800 shadow-inner">
                  <img
                    src={portraitImageSrc}
                    alt="Rafsan Bhai celebrating his birthday"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Corner Badge */}
                  <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-md border border-amber-400/40 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-md">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    Birthday Star
                  </div>

                  <div className="absolute bottom-3 right-3 bg-stone-950/80 backdrop-blur-md border border-amber-400/40 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-md">
                    <span>👑 King of the Day</span>
                  </div>
                </div>

                {/* Bottom Card Caption */}
                <div className="pt-4 pb-1 text-center">
                  <h2 className="font-display font-bold text-xl text-white">
                    Rafsan Bhai
                  </h2>
                  <p className="text-xs text-amber-300/80 font-medium">
                    Pharmacist · Elder Brother · The Absolute Best
                  </p>
                  <p className="font-handwriting text-lg text-amber-200 mt-1">
                    "Always bringing a cure to worries and a reason to smile!"
                  </p>
                </div>
              </div>
            </div>

            {/* Quick interactive note */}
            <div className="mt-4 text-center">
              <span className="text-xs text-stone-400 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Tap any button or scroll down to light his birthday cake!
              </span>
            </div>

          </div>

        </div>
      </div>

      {/* Down arrow indicator */}
      <div className="mt-12 text-center flex justify-center">
        <a
          href="#message"
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400/70 hover:text-amber-300 transition-colors group"
        >
          <span>Discover Birthday Tribute</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    </section>
  );
};
