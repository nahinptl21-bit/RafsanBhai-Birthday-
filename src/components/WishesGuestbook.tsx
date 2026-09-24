import React, { useState, useEffect } from 'react';
import { Heart, Send, Sparkles, MessageSquareHeart, User, Smile, Search, Filter } from 'lucide-react';
import { fireCelebrationBurst, fireGoldenStars } from '../utils/confetti';
import { audioManager } from '../utils/audio';

export interface WishNote {
  id: string;
  author: string;
  relation: string;
  message: string;
  emoji: string;
  colorTheme: 'amber' | 'rose' | 'emerald' | 'sky' | 'purple';
  likes: number;
  userLiked?: boolean;
  date: string;
}

const INITIAL_WISHES: WishNote[] = [
  {
    id: 'wish-1',
    author: 'Tanvir Ahmed',
    relation: 'Friend & Adda Partner',
    message: 'Happy Birthday Rafsan Bhai! The only pharmacist whose prescription always guarantees 100% good vibes and endless laughter. Thank you for always having our backs. Looking forward to our next big chai night!',
    emoji: '☕',
    colorTheme: 'amber',
    likes: 24,
    date: 'Today, 2:15 PM',
  },
  {
    id: 'wish-2',
    author: 'Sarah Rahman',
    relation: 'Colleague & Junior',
    message: 'Dearest Rafsan Bhai, thank you for being such an extraordinary mentor! Whenever we get stuck or stressed, your calm guidance makes everything simple. Wishing you immense happiness and career milestones!',
    emoji: '💊',
    colorTheme: 'emerald',
    likes: 31,
    date: 'Today, 1:40 PM',
  },
  {
    id: 'wish-3',
    author: 'Farhan Kabir',
    relation: 'Childhood Friend',
    message: 'Happy Birthday to my oldest partner-in-crime! From school days to watching you become this accomplished, respected gentleman. So proud of you, brother. Party is on you this weekend!',
    emoji: '👑',
    colorTheme: 'rose',
    likes: 19,
    date: 'Today, 11:20 AM',
  },
  {
    id: 'wish-4',
    author: 'Anika Sultana',
    relation: 'Family Well-wisher',
    message: 'To the most affectionate and caring elder brother! May Allah bless you with peak health, continuous barakah, and fulfill every dream in your heart. Have the sweetest birthday!',
    emoji: '❤️',
    colorTheme: 'purple',
    likes: 28,
    date: 'Yesterday',
  },
  {
    id: 'wish-5',
    author: 'Shuvo & The Juniors',
    relation: 'Junior Brotherhood',
    message: 'Rafsan Bhai is simply unmatched! A true big brother in every sense of the word. Happy Birthday to the coolest mentor on earth! We love you Bhai! 🎉🎈',
    emoji: '🎉',
    colorTheme: 'sky',
    likes: 37,
    date: 'Yesterday',
  },
  {
    id: 'wish-6',
    author: 'Dr. Nayeem Chowdhury',
    relation: 'Healthcare Team',
    message: 'Wishing a very Happy Birthday to an outstanding healthcare professional! Your meticulous care for every patient inspires everyone in our network. Cheers to your bright future!',
    emoji: '🌟',
    colorTheme: 'emerald',
    likes: 22,
    date: '2 days ago',
  },
];

const COLOR_CLASSES: Record<string, { bg: string; border: string; header: string; tag: string }> = {
  amber: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    header: 'text-amber-900',
    tag: 'text-amber-700',
  },
  rose: {
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    header: 'text-rose-900',
    tag: 'text-rose-700',
  },
  emerald: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    header: 'text-emerald-900',
    tag: 'text-emerald-700',
  },
  sky: {
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    header: 'text-sky-900',
    tag: 'text-sky-700',
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    header: 'text-purple-900',
    tag: 'text-purple-700',
  },
};

export const WishesGuestbook: React.FC = () => {
  const [wishes, setWishes] = useState<WishNote[]>(() => {
    const saved = localStorage.getItem('rafsan_bhai_wishes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_WISHES;
      }
    }
    return INITIAL_WISHES;
  });

  // Form State
  const [authorName, setAuthorName] = useState('');
  const [relation, setRelation] = useState('Friend');
  const [message, setMessage] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🎉');
  const [selectedColor, setSelectedColor] = useState<'amber' | 'rose' | 'emerald' | 'sky' | 'purple'>('amber');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('rafsan_bhai_wishes', JSON.stringify(wishes));
  }, [wishes]);

  const handleSubmitWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim()) return;

    const newWish: WishNote = {
      id: `wish-${Date.now()}`,
      author: authorName.trim(),
      relation: relation.trim() || 'Well-wisher',
      message: message.trim(),
      emoji: selectedEmoji,
      colorTheme: selectedColor,
      likes: 1,
      userLiked: true,
      date: 'Just now',
    };

    setWishes([newWish, ...wishes]);
    setAuthorName('');
    setMessage('');

    fireCelebrationBurst();
    fireGoldenStars();
    audioManager.playPopSound();
  };

  const handleLikeWish = (id: string) => {
    setWishes((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          const isLiked = w.userLiked;
          return {
            ...w,
            likes: isLiked ? w.likes - 1 : w.likes + 1,
            userLiked: !isLiked,
          };
        }
        return w;
      })
    );
    fireCelebrationBurst();
    audioManager.playPopSound();
  };

  const filteredWishes = wishes.filter(
    (w) =>
      w.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.relation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="wishes" className="py-16 md:py-24 bg-amber-50/50 relative border-b border-amber-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 mb-2">
            <MessageSquareHeart className="w-4 h-4 text-amber-600" />
            <span>Guestbook & Wall of Wishes</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Heartfelt Notes for Rafsan Bhai 💌
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base">
            Leave your personalized birthday greetings, favorite memory, or loving message on his wall!
          </p>
        </div>

        {/* Two Columns: Left Form / Right Wall */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Create Note Form */}
          <div className="lg:col-span-5 bg-white border border-amber-200 rounded-3xl p-6 sm:p-7 shadow-lg shadow-amber-900/5 sticky top-20">
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-stone-100">
              <span className="text-2xl">✍️</span>
              <div>
                <h3 className="font-display font-bold text-lg text-stone-900">
                  Write Your Note
                </h3>
                <p className="text-xs text-stone-500">
                  Your message will appear on Rafsan Bhai’s board instantly!
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmitWish} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Tanvir, Fahim, Dr. Nafis"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm outline-none bg-stone-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Your Connection / Tag
                </label>
                <select
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 text-sm outline-none bg-stone-50/50"
                >
                  <option value="Friend & Adda Partner">Friend & Adda Partner</option>
                  <option value="Junior Brother / Sister">Junior Brother / Sister</option>
                  <option value="Colleague & Pharmacy Crew">Colleague & Pharmacy Crew</option>
                  <option value="Family Member">Family Member</option>
                  <option value="Childhood Friend">Childhood Friend</option>
                  <option value="Well-wisher">Well-wisher</option>
                </select>
              </div>

              {/* Emoji Badge & Sticky Note Color Picker */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Sticker Icon
                  </label>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {['🎉', '👑', '💊', '☕', '❤️', '🌟', '🚀'].map((em) => (
                      <button
                        type="button"
                        key={em}
                        onClick={() => setSelectedEmoji(em)}
                        className={`w-8 h-8 rounded-lg text-sm flex items-center justify-center transition-all ${
                          selectedEmoji === em
                            ? 'bg-amber-100 ring-2 ring-amber-500 scale-110 shadow-sm'
                            : 'hover:bg-stone-100'
                        }`}
                      >
                        {em}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Card Tint
                  </label>
                  <div className="flex items-center gap-2 pt-1">
                    {[
                      { id: 'amber', bg: 'bg-amber-300' },
                      { id: 'rose', bg: 'bg-rose-300' },
                      { id: 'emerald', bg: 'bg-emerald-300' },
                      { id: 'sky', bg: 'bg-sky-300' },
                      { id: 'purple', bg: 'bg-purple-300' },
                    ].map((col) => (
                      <button
                        type="button"
                        key={col.id}
                        onClick={() => setSelectedColor(col.id as any)}
                        className={`w-6 h-6 rounded-full ${col.bg} transition-all ${
                          selectedColor === col.id ? 'ring-2 ring-stone-900 scale-125' : 'hover:scale-110'
                        }`}
                        title={col.id}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Heartfelt Birthday Message *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Dear Rafsan Bhai, wishing you the happiest birthday..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm outline-none bg-stone-50/50 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Post Birthday Note to Wall</span>
              </button>
            </form>
          </div>

          {/* Right Column: Interactive Notes Grid */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search wishes by name or message..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-amber-200/80 text-sm text-stone-800 placeholder-stone-400 focus:border-amber-500 focus:outline-none shadow-sm"
              />
            </div>

            {/* Notes List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredWishes.map((note) => {
                const theme = COLOR_CLASSES[note.colorTheme] || COLOR_CLASSES.amber;

                return (
                  <div
                    key={note.id}
                    className={`${theme.bg} border ${theme.border} rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group`}
                  >
                    {/* Top row */}
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl" role="img" aria-label="sticker">
                            {note.emoji}
                          </span>
                          <div>
                            <h4 className={`font-display font-bold text-sm ${theme.header}`}>
                              {note.author}
                            </h4>
                            <span className="text-[11px] text-stone-500 font-medium block">
                              {note.relation}
                            </span>
                          </div>
                        </div>

                        {/* Unboxed timestamp */}
                        <span className="text-[10px] text-stone-600 font-medium">
                          {note.date}
                        </span>
                      </div>

                      {/* Message body */}
                      <p className="text-stone-700 text-xs sm:text-sm leading-relaxed mt-2 font-normal">
                        "{note.message}"
                      </p>
                    </div>

                    {/* Bottom Like Action */}
                    <div className="mt-4 pt-3 border-t border-stone-200/50 flex items-center justify-between">
                      <span className="text-[11px] text-stone-500 font-medium">
                        Wished with love
                      </span>

                      <button
                        onClick={() => handleLikeWish(note.id)}
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-transform active:scale-90 ${
                          note.userLiked
                            ? 'bg-rose-500 text-white shadow-sm'
                            : 'bg-white/80 hover:bg-white text-stone-700 shadow-xs'
                        }`}
                        title="Love this wish"
                      >
                        <Heart className={`w-3.5 h-3.5 ${note.userLiked ? 'fill-current' : ''}`} />
                        <span>{note.likes}</span>
                      </button>
                    </div>
                  </div>
                );
              })}

              {filteredWishes.length === 0 && (
                <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-stone-200 text-stone-500">
                  <p className="text-sm">No notes match your search. Be the first to add one!</p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
