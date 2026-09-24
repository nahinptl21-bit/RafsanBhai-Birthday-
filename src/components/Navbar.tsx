import React, { useState } from 'react';
import { PartyPopper, Heart, Cake, Camera, Mail, Menu, X, Sparkles, Music } from 'lucide-react';
import { fireCelebrationBurst, fireSideCannons } from '../utils/confetti';
import { audioManager } from '../utils/audio';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleQuickConfetti = () => {
    fireCelebrationBurst();
    audioManager.playPopSound();
  };

  const navLinks = [
    { label: 'Tribute', href: '#message', icon: Mail },
    { label: 'Birthday Cake', href: '#cake', icon: Cake },
    { label: 'Memories', href: '#gallery', icon: Camera },
    { label: 'Wishes Wall', href: '#wishes', icon: Heart },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-900/90 backdrop-blur-md border-b border-amber-500/20 text-white transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Title */}
        <a href="#hero" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-stone-950 font-bold shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            🎂
          </span>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-base tracking-tight text-white group-hover:text-amber-300 transition-colors">
              Rafsan Bhai <span className="text-amber-400">Day</span>
            </span>
            <span className="text-[10px] text-amber-200/70 font-medium tracking-wide">
              A Special Birthday Celebration
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-stone-300 hover:text-amber-300 transition-colors flex items-center gap-1.5 py-1"
              >
                <Icon className="w-3.5 h-3.5 text-amber-400/80" />
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleQuickConfetti}
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-semibold text-xs shadow-md shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
            title="Blast celebratory confetti"
          >
            <PartyPopper className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Blast Confetti</span>
            <span className="sm:hidden">Confetti</span>
          </button>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-stone-900 border-b border-amber-500/20 px-4 py-3 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-stone-200 hover:bg-stone-800 hover:text-amber-300 text-sm font-medium transition-colors"
              >
                <Icon className="w-4 h-4 text-amber-400" />
                {link.label}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
};
