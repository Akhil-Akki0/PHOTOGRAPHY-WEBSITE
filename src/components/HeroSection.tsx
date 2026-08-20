import React, { useState } from 'react';
import { motion } from 'motion/react';
import { sound } from '../utils/audioEngine';
import { ArrowDown, Camera, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onScrollDown: () => void;
  onTakeSnapshot?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollDown, onTakeSnapshot }) => {
  const [flash, setFlash] = useState(false);

  const handleCameraSnap = () => {
    sound.playShutterSound();
    setFlash(true);
    if (onTakeSnapshot) {
      onTakeSnapshot();
    }
    setTimeout(() => setFlash(false), 140);
  };

  return (
    <section
      id="hero-section"
      className="h-[100vh] min-h-[640px] w-full relative flex items-center justify-center overflow-hidden bg-neutral-900 pt-20 select-none"
    >
      {/* Visual Flash effect when taking snapshot */}
      {flash && (
        <div className="absolute inset-0 z-50 bg-white pointer-events-none transition-opacity duration-150" />
      )}

      {/* Background Image with slow cinematic scale */}
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbEGVqkZPy4_xQ8OTkDnQhrORpW1fxqRFGBFmR8RAHdV70tNL6WCgjkeh6UqIep81laaBEfRP6QPYAJW90BINoZ9RSciZFLkXFL4QvcadWwUz21_J9D1mwFX5Pn1aT6YJiRSa8HVVfTRqCF-IHeWSHKkPcirDr5QqNRPf5oR7NSrgC-yB9FeOHiWjeXNICOfq4zuUGqliuM5xf5dgpEAVwjGNQsDXCOmNrH_NxxeApGknVVTNtc-0rGok3NFECHCWx1A"
        alt="Cinematic landscape mountain horizon at dusk"
        className="absolute inset-0 w-full h-full object-cover scale-105 transform origin-center transition-transform duration-[20s] ease-in-out hover:scale-110 motion-safe:animate-pulse"
      />

      {/* Dark overlay gradients */}
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35" />

      {/* Viewfinder Rule of Thirds subtle lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 hidden md:block">
        <div className="w-full h-full grid grid-cols-3 grid-rows-3 border border-white/20">
          <div className="border-r border-b border-white/10" />
          <div className="border-r border-b border-white/10" />
          <div className="border-b border-white/10" />
          <div className="border-r border-b border-white/10" />
          <div className="border-r border-b border-white/10 flex items-center justify-center">
            <div className="w-8 h-8 border border-white/40 rounded-full" />
          </div>
          <div className="border-b border-white/10" />
          <div className="border-r border-white/10" />
          <div className="border-r border-white/10" />
          <div />
        </div>
      </div>

      {/* Hero Headline */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-16 w-full max-w-7xl text-white">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-3 sm:mb-4 inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 bg-black/50 backdrop-blur-md border border-white/20 text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.25em] uppercase text-blue-300 font-mono"
        >
          <Sparkles className="w-3 h-3 text-blue-400" />
          <span>VOLUME IV</span>
          <span className="text-white/40">•</span>
          <span>CURATED BY AKHIL</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-[5.75rem] leading-[1.18] sm:leading-[1.1] md:leading-[1.08] text-white font-bold tracking-[-0.02em] sm:tracking-[-0.03em] uppercase drop-shadow-lg"
        >
          PHOTOGRAPHS FOR THE<br />
          ONES WHO FEEL DEEPLY.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 sm:mt-6 text-xs sm:text-base md:text-lg leading-relaxed sm:leading-normal tracking-wider sm:tracking-widest text-neutral-300 uppercase font-light max-w-2xl mx-auto px-2"
        >
          An ongoing inquiry into silence, wildlife, and the human spirit
        </motion.p>

        {/* Interactive Camera Shutter Test Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-8 flex justify-center items-center gap-3"
        >
          <button
            id="hero-snapshot-trigger"
            onClick={handleCameraSnap}
            onMouseEnter={() => sound.playFocusTick()}
            className="px-4 sm:px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 hover:border-white text-white text-[11px] sm:text-xs font-mono tracking-wider sm:tracking-widest uppercase transition-all flex items-center gap-2 group cursor-pointer shadow-lg"
          >
            <Camera className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
            <span>TRIGGER SHUTTER ACTUATION</span>
          </button>
        </motion.div>
      </div>

      {/* Bottom Scroll Prompt */}
      <motion.button
        id="hero-scroll-btn"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        onClick={() => {
          sound.playDialClick();
          onScrollDown();
        }}
        onMouseEnter={() => sound.playFocusTick()}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/90 group cursor-pointer transition-transform hover:translate-y-1 z-20"
        aria-label="Scroll down to featured work"
      >
        <span className="text-[11px] tracking-[0.3em] font-semibold text-blue-300 uppercase">
          SCROLL
        </span>
        <div className="w-8 h-8 rounded-none border border-blue-300/40 flex items-center justify-center group-hover:border-blue-300 transition-colors animate-bounce">
          <ArrowDown className="w-4 h-4 text-blue-300" />
        </div>
      </motion.button>
    </section>
  );
};
