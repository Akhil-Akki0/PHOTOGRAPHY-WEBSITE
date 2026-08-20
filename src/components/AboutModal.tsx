import React, { useEffect } from 'react';
import { AKHIL_PROFILE } from '../data/portfolioData';
import { sound } from '../utils/audioEngine';
import { X, Sparkles, Camera, MapPin, Award, CheckCircle, Keyboard } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onOpenContact
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        sound.playDialClick();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="about-creator-modal"
      className="fixed inset-0 z-[90] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-300 select-none"
      onClick={onClose}
    >
      <div
        className="bg-[#faf9f7] text-[#1a1c1b] max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-neutral-300 shadow-2xl p-6 sm:p-10 md:p-12 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="absolute top-6 right-6 flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono uppercase text-neutral-700 font-semibold border border-neutral-300 px-2 py-1 bg-neutral-100">
            <Keyboard className="w-3 h-3 text-neutral-700" />
            <span>[ESC] TO CLOSE</span>
          </div>
          <button
            onClick={() => {
              sound.playDialClick();
              onClose();
            }}
            className="p-2 text-neutral-700 hover:text-black border border-neutral-400 hover:border-black transition-colors cursor-pointer"
            aria-label="Close About Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Header Tag */}
        <div className="flex items-center gap-2 text-xs text-blue-700 font-mono tracking-widest uppercase mb-3 font-bold">
          <Sparkles className="w-4 h-4" />
          <span>ABOUT THE CREATOR & PHOTOGRAPHER</span>
        </div>

        {/* Creator Intro Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-10">
          {/* Akhil's Portrait */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden bg-neutral-900 border-4 border-white shadow-2xl ring-4 ring-neutral-200/80 mb-4 group">
              <img
                src={AKHIL_PROFILE.portraitUrl}
                alt="Akhil - Photographer"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/10" />
            </div>

            <div className="text-center mb-4">
              <div className="text-[11px] font-mono tracking-widest text-blue-700 uppercase font-bold">
                LEAD VISUAL DIRECTOR
              </div>
              <div className="font-serif text-2xl font-bold text-neutral-900">
                {AKHIL_PROFILE.name}
              </div>
            </div>

            <div className="w-full p-3 bg-neutral-100 border border-neutral-300 text-xs font-mono space-y-1.5">
              <div className="flex items-center gap-1.5 text-neutral-800 font-medium">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>{AKHIL_PROFILE.location}</span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-800 font-medium">
                <Award className="w-3.5 h-3.5 text-blue-600" />
                <span>{AKHIL_PROFILE.experienceYears}</span>
              </div>
            </div>
          </div>

          {/* Bio Narrative */}
          <div className="md:col-span-7 space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight">
              Honest Observation, Raw Light & Enduring Stories
            </h2>

            <p className="text-base sm:text-lg text-neutral-800 leading-relaxed font-normal">
              {AKHIL_PROFILE.bio}
            </p>

            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
              Based in Bangalore and traveling internationally, Akhil collaborates with individuals, private art collectors, luxury architectural studios, and publications looking for authentic visual impact without simulated polish.
            </p>

            <div className="pt-4 border-t border-neutral-200">
              <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-700 font-bold mb-3 flex items-center gap-2">
                <Camera className="w-3.5 h-3.5 text-blue-600" />
                <span>Primary Optics & Toolset</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-900 font-mono font-medium">
                {AKHIL_PROFILE.gear.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <CheckCircle className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  sound.playDialClick();
                  onClose();
                  onOpenContact();
                }}
                onMouseEnter={() => sound.playFocusTick()}
                className="px-6 py-3 bg-black text-white text-xs tracking-widest uppercase font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Inquire With Akhil
              </button>
              <button
                onClick={() => {
                  sound.playDialClick();
                  onClose();
                }}
                onMouseEnter={() => sound.playFocusTick()}
                className="px-6 py-3 border border-neutral-300 text-neutral-700 text-xs tracking-widest uppercase hover:border-black hover:text-black transition-colors cursor-pointer"
              >
                Explore Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
