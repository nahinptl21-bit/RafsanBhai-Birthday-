import React, { useState } from 'react';
import { Mail, Heart, Sparkles, CheckCircle2, ChevronDown, ChevronUp, Gift, Star } from 'lucide-react';
import { fireGoldenStars, fireCelebrationBurst } from '../utils/confetti';
import { audioManager } from '../utils/audio';

export const PersonalizedMessage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'letter' | 'qualities' | 'wishes_pledge'>('letter');

  const handleSealClick = () => {
    fireGoldenStars();
    audioManager.playCandleBlowChime();
  };

  const qualities = [
    {
      title: 'The Trusted Pharmacist & Healer',
      icon: '💊',
      desc: 'Whenever anyone in the circle is unwell or confused about medications, Rafsan Bhai is the first person we call. His steady expertise, compassion, and patient guidance give everyone instant peace of mind.',
    },
    {
      title: 'The Ultimate Elder Brother ("Bhai")',
      icon: '🛡️',
      desc: 'Not everyone gets a brother who genuinely listens without judgment, gives the most practical advice, and stands by you during difficult times. Rafsan Bhai represents true brotherly support.',
    },
    {
      title: 'The Warmest Smile & Laugh',
      icon: '✨',
      desc: 'No matter how stressful or hectic the day is, the moment Rafsan Bhai walks in with his signature smile and calm aura, the entire mood changes for the better.',
    },
    {
      title: 'The Best Adda & Tea Companion',
      icon: '☕',
      desc: 'From spontaneous evening tea sessions to deep life conversations and hilarious banter, moments spent in Rafsan Bhai’s company are always memorable and full of heart.',
    },
  ];

  return (
    <section id="message" className="py-16 md:py-24 bg-amber-50/70 border-b border-amber-200/60 relative overflow-hidden">
      {/* Subtle celebratory background watermark */}
      <div className="absolute top-10 right-5 text-amber-200/40 text-9xl font-handwriting select-none pointer-events-none">
        Birthday
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-700 mb-2">
            <Heart className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
            <span>From All of Us With Love</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            A Personalized Letter to Rafsan Bhai
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base">
            Words can hardly capture how much you mean to everyone around you, but we wanted to put it in ink.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 p-1.5 bg-amber-200/50 rounded-xl max-w-md mx-auto mb-8">
          <button
            onClick={() => setActiveTab('letter')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'letter'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            💌 The Letter
          </button>
          <button
            onClick={() => setActiveTab('qualities')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'qualities'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            🌟 Why We Love Him
          </button>
          <button
            onClick={() => setActiveTab('wishes_pledge')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'wishes_pledge'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            🥂 Birthday Toast
          </button>
        </div>

        {/* TAB 1: The Heartfelt Letter */}
        {activeTab === 'letter' && (
          <div className="relative bg-[#fffdfa] border-2 border-amber-300 rounded-3xl p-6 sm:p-10 shadow-xl shadow-amber-900/5">
            {/* Wax Seal Visual Accent */}
            <div className="flex items-center justify-between border-b border-amber-100 pb-4 mb-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-600 font-bold">Confidential & Heartfelt</span>
                <h3 className="font-display font-bold text-xl text-stone-900">Dearest Rafsan Bhai,</h3>
              </div>
              <button
                onClick={handleSealClick}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-rose-700 text-amber-100 font-serif font-black flex items-center justify-center shadow-md border-2 border-amber-300 hover:scale-110 active:scale-95 transition-transform"
                title="Click wax seal for sparkles!"
              >
                RB
              </button>
            </div>

            {/* Letter Body */}
            <div className="space-y-4 text-stone-700 text-base sm:text-lg leading-relaxed font-normal">
              <p>
                As another fantastic year unfolds, we want to pause and celebrate the incredible human being you are. 
                Whether you're behind the counter caring for patients with unwavering dedication, giving the most thoughtful advice to a confused junior, or making everyone laugh with your sharp wit at evening adda — you do everything with genuine grace and honesty.
              </p>

              <p>
                Having you as an elder brother, colleague, and lifelong friend is a true blessing. You never hesitate to step forward when someone needs help. Your humility despite your achievements, your dedication to your noble craft, and the respect you give to each person you meet make you a role model for all of us.
              </p>

              <p className="bg-amber-100/60 border-l-4 border-amber-500 p-4 rounded-r-xl font-handwriting text-2xl text-amber-950">
                "May your special day be as warm, uplifting, and extraordinary as the energy you share with everyone every single day."
              </p>

              <p>
                Today, forget about schedules and routines. Eat an extra slice of cake, smile from ear to ear, and know that you are celebrated, admired, and deeply loved by every single person whose life you touch.
              </p>

              <div className="pt-6 border-t border-amber-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-handwriting text-3xl font-bold text-amber-900">
                    Always with love & deep respect,
                  </p>
                  <p className="text-sm text-stone-500 font-medium">
                    Your Friends, Juniors, Family & Well-wishers ❤️
                  </p>
                </div>
                <button
                  onClick={() => {
                    fireCelebrationBurst();
                    audioManager.playCheerShimmer();
                  }}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow hover:shadow-md active:scale-95 flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  Applaud Rafsan Bhai!
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Qualities We Love */}
        {activeTab === 'qualities' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {qualities.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-amber-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow hover:border-amber-300"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-display font-bold text-lg text-stone-900 mb-1.5">
                  {item.title}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: Birthday Toast & Blessings */}
        {activeTab === 'wishes_pledge' && (
          <div className="bg-gradient-to-br from-stone-900 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-500/30">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🥂</span>
              <h3 className="font-display font-bold text-2xl text-amber-300">
                The Rafsan Bhai Birthday Toast
              </h3>
            </div>
            
            <div className="space-y-4 text-stone-200 text-sm sm:text-base leading-relaxed">
              <p>
                Raise your glasses, your cups of hot cha, and your hearts for our birthday hero!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 bg-stone-800/60 p-3 rounded-xl border border-stone-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-200 block text-sm">Vibrant Health & Vitality</strong>
                    <span className="text-stone-300 text-xs">As you take care of others, may you be blessed with lifelong peak wellness and strength.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-stone-800/60 p-3 rounded-xl border border-stone-700">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-200 block text-sm">Career & Milestone Success</strong>
                    <span className="text-stone-300 text-xs">May every project, venture, and ambition you pursue yield grand triumphs.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-stone-800/60 p-3 rounded-xl border border-stone-700">
                  <CheckCircle2 className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-200 block text-sm">Peace & Heartfelt Joy</strong>
                    <span className="text-stone-300 text-xs">May your home be surrounded by laughter, genuine love, and serene peace of mind.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-stone-800/60 p-3 rounded-xl border border-stone-700">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-200 block text-sm">Lifelong Brotherhood</strong>
                    <span className="text-stone-300 text-xs">A bond of friendship and respect that only grows stronger with every passing season.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-800 flex justify-end">
              <button
                onClick={() => {
                  fireCelebrationBurst();
                  fireGoldenStars();
                  audioManager.playPartyHorn();
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-transform active:scale-95"
              >
                <span>🎉 Raise a Virtual Toast</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
