import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AKHIL_PROFILE } from '../data/portfolioData';
import { sound } from '../utils/audioEngine';
import { ArrowRight, Sparkles, Volume2 } from 'lucide-react';

interface IntroScreenProps {
  onComplete: () => void;
  isOpen: boolean;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete, isOpen }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        sound.playShutterSound();
        onComplete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1.6; // ~3.2 seconds total
      });
    }, 50);

    const timer = setTimeout(() => {
      sound.playShutterSound();
      onComplete();
    }, 3600);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  const handleSkip = () => {
    sound.playShutterSound();
    onComplete();
  };

  return (
    <AnimatePresence>
      <motion.div
        id="intro-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-white noise-overlay select-none cursor-default"
      >
        {/* Ambient Subtle Lighting Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(40,40,40,0.4)_0%,rgba(0,0,0,0.95)_100%)] pointer-events-none" />

        {/* Top Floating Badge */}
        <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-20">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] tracking-[0.25em] text-neutral-400 uppercase font-mono">
              PORTFOLIO EDITION • 2024–2025
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-1 text-[10px] font-mono text-neutral-500">
              <Volume2 className="w-3 h-3 text-emerald-400" />
              <span>AUDIO ENABLED</span>
            </span>

            <button
              id="intro-skip-btn"
              onClick={handleSkip}
              className="flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase text-neutral-400 hover:text-white transition-colors duration-300 py-1.5 px-3 border border-neutral-800 hover:border-neutral-500 bg-black/40 backdrop-blur-sm cursor-pointer"
            >
              <span>Skip Intro</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Central Content */}
        <motion.div
          id="intro-content"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center w-full px-6 md:px-16 max-w-4xl flex flex-col items-center justify-center relative z-10"
        >
          {/* Tagline */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-8 bg-neutral-600" />
            <p className="text-[12px] md:text-[13px] tracking-[0.35em] text-neutral-400 uppercase font-medium">
              CREATED BY
            </p>
            <div className="h-[1px] w-8 bg-neutral-600" />
          </div>

          {/* Akhil's Prominent Hero Portrait Frame */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.6, delay: 0.3 }}
            className="mb-6 w-36 h-36 sm:w-44 sm:h-44 rounded-full relative overflow-hidden bg-neutral-900 border-2 border-white/40 ring-4 ring-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] mx-auto group"
          >
            <img
              src={AKHIL_PROFILE.portraitUrl}
              alt="Akhil - Lead Photographer & Creative Director"
              className="object-cover w-full h-full object-top transition-transform duration-1000 group-hover:scale-105 rounded-full"
            />
            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/20 pointer-events-none" />
          </motion.div>

          {/* Author Name */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-4 uppercase font-serif"
          >
            {AKHIL_PROFILE.name}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.7 }}
            className="text-[12px] sm:text-[13px] tracking-[0.25em] text-neutral-400 uppercase max-w-xl mx-auto"
          >
            {AKHIL_PROFILE.title}
          </motion.p>

          {/* Progress Indicator */}
          <div className="w-48 sm:w-64 h-[2px] bg-neutral-800 mt-10 overflow-hidden relative">
            <motion.div
              className="h-full bg-white transition-all duration-75"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-neutral-500 mt-3 tracking-widest">
            ENTERING EXPERIENCE • {Math.round(Math.min(progress, 100))}%
          </span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
