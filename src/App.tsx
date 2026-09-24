/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PersonalizedMessage } from './components/PersonalizedMessage';
import { InteractiveCake } from './components/InteractiveCake';
import { PhotoGallery } from './components/PhotoGallery';
import { WishesGuestbook } from './components/WishesGuestbook';
import { CelebrationControls } from './components/CelebrationControls';
import { Footer } from './components/Footer';
import { AudioPlayer } from './components/AudioPlayer';

import rafsanImg from './assets/images/Rafsan.png';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-stone-900 selection:bg-amber-300 selection:text-amber-950 font-sans">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* Hero Section with Rafsan Bhai's Portrait */}
        <Hero portraitImageSrc={rafsanImg} />

        {/* Personalized Message & Tribute */}
        <PersonalizedMessage />

        {/* Interactive Candle Blow Cake Experience */}
        <InteractiveCake />

        {/* Photo Gallery: Best Memories Over The Years */}
        <PhotoGallery />

        {/* Guestbook: Heartfelt Notes & Wishes Wall */}
        <WishesGuestbook />

        {/* Celebration Command Controls */}
        <CelebrationControls />
      </main>

      {/* Celebratory Footer */}
      <Footer />

      {/* Floating Celebration Audio Jukebox */}
      <AudioPlayer />
    </div>
  );
}
