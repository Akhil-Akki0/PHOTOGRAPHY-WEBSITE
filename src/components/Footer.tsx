import React from 'react';
import { AKHIL_PROFILE } from '../data/portfolioData';
import { sound } from '../utils/audioEngine';
import { ArrowUp, Play, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onReplayIntro: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAbout,
  onOpenContact,
  onReplayIntro
}) => {
  const scrollToTop = () => {
    sound.playDialClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="main-footer"
      className="bg-black text-white py-20 md:py-28 px-6 md:px-16 max-w-[1440px] mx-auto border-t border-neutral-800 select-none"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
        {/* Left Column: Brand & Akhil Attribution */}
        <div className="col-span-1 md:col-span-6 lg:col-span-6 mb-8 md:mb-0">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tighter text-white">
              {AKHIL_PROFILE.brandName}
            </span>
            <span className="text-[10px] bg-neutral-800 text-blue-400 px-2 py-0.5 font-mono uppercase tracking-widest">
              LUMIÈRE
            </span>
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 max-w-md leading-relaxed mb-8">
            An independent photography atelier by Akhil. Dedicated to cinematic storytelling, wildlife preservation narratives, and editorial portraiture worldwide.
          </p>

          {/* Profile Card Snippet */}
          <div className="p-4 border border-neutral-700 bg-neutral-950 flex items-center justify-between max-w-md">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-neutral-600 ring-2 ring-blue-500/30 flex-shrink-0 shadow-md">
                <img
                  src={AKHIL_PROFILE.portraitUrl}
                  alt="Akhil"
                  className="w-full h-full object-cover object-top rounded-full"
                />
              </div>
              <div>
                <span className="text-[9px] tracking-widest text-neutral-400 uppercase block font-mono font-semibold">
                  DIRECTOR & CREATOR
                </span>
                <span className="text-xs font-bold text-white uppercase flex items-center gap-1">
                  <span>{AKHIL_PROFILE.name}</span>
                  <Sparkles className="w-2.5 h-2.5 text-blue-400" />
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playDialClick();
                  onOpenAbout();
                }}
                onMouseEnter={() => sound.playFocusTick()}
                className="text-[10px] tracking-widest uppercase text-neutral-300 hover:text-white px-2 py-1 border border-neutral-700 hover:border-neutral-400 transition-colors cursor-pointer"
              >
                Bio
              </button>
              <button
                onClick={() => {
                  sound.playDialClick();
                  onReplayIntro();
                }}
                onMouseEnter={() => sound.playFocusTick()}
                className="text-[10px] tracking-widest uppercase text-blue-400 hover:text-blue-300 px-2 py-1 border border-neutral-700 hover:border-blue-400 flex items-center gap-1 transition-colors cursor-pointer"
                title="Replay cinematic intro"
              >
                <Play className="w-2.5 h-2.5" />
                <span>Intro</span>
              </button>
            </div>
          </div>
        </div>

        {/* Column 2: Navigation & Services */}
        <div className="col-span-1 md:col-span-3 lg:col-span-3 flex flex-col gap-3">
          <h4 className="text-[11px] tracking-[0.25em] text-white font-mono uppercase mb-3 font-bold">
            EXPLORE
          </h4>
          <a
            href="#featured-work"
            onClick={() => sound.playDialClick()}
            onMouseEnter={() => sound.playFocusTick()}
            className="text-xs tracking-widest text-neutral-300 hover:text-white transition-colors uppercase font-medium"
          >
            SELECTED STORIES
          </a>
          <a
            href="#monochrome-archive"
            onClick={() => sound.playDialClick()}
            onMouseEnter={() => sound.playFocusTick()}
            className="text-xs tracking-widest text-neutral-300 hover:text-white transition-colors uppercase font-medium"
          >
            MONOCHROME ARCHIVE
          </a>
          <button
            onClick={() => {
              sound.playDialClick();
              onOpenAbout();
            }}
            onMouseEnter={() => sound.playFocusTick()}
            className="text-left text-xs tracking-widest text-neutral-300 hover:text-white transition-colors uppercase font-medium cursor-pointer"
          >
            ABOUT AKHIL
          </button>
          <a
            href="#services-section"
            onClick={() => sound.playDialClick()}
            onMouseEnter={() => sound.playFocusTick()}
            className="text-xs tracking-widest text-neutral-300 hover:text-white transition-colors uppercase font-medium"
          >
            SERVICES & COMMISSIONS
          </a>
          <a
            href="#journal-section"
            onClick={() => sound.playDialClick()}
            onMouseEnter={() => sound.playFocusTick()}
            className="text-xs tracking-widest text-neutral-300 hover:text-white transition-colors uppercase font-medium"
          >
            FIELD JOURNAL
          </a>
          <button
            onClick={() => {
              sound.playDialClick();
              onOpenContact();
            }}
            onMouseEnter={() => sound.playFocusTick()}
            className="text-left text-xs tracking-widest text-neutral-300 hover:text-white transition-colors uppercase font-medium cursor-pointer"
          >
            DIRECT INQUIRY
          </button>
        </div>

        {/* Column 3: Social & Back to Top */}
        <div className="col-span-1 md:col-span-3 lg:col-span-3 flex flex-col justify-between h-full">
          <div>
            <h4 className="text-[11px] tracking-[0.25em] text-white font-mono uppercase mb-3 font-bold">
              CONNECT
            </h4>
            <div className="flex flex-col gap-2.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sound.playFocusTick()}
                className="text-xs tracking-widest text-neutral-300 hover:text-white transition-colors uppercase font-medium"
              >
                INSTAGRAM • @AKHIL.VISUALS
              </a>
              <a
                href="https://vimeo.com"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sound.playFocusTick()}
                className="text-xs tracking-widest text-neutral-300 hover:text-white transition-colors uppercase font-medium"
              >
                VIMEO • LUMIÈRE CINEMA
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sound.playFocusTick()}
                className="text-xs tracking-widest text-neutral-300 hover:text-white transition-colors uppercase font-medium"
              >
                LINKEDIN • AKHIL A.
              </a>
              <a
                href="https://behance.net"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sound.playFocusTick()}
                className="text-xs tracking-widest text-neutral-300 hover:text-white transition-colors uppercase font-medium"
              >
                BEHANCE • PORTFOLIO
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-800 flex justify-between items-center">
            <button
              onClick={scrollToTop}
              onMouseEnter={() => sound.playFocusTick()}
              className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-neutral-300 hover:text-white transition-colors cursor-pointer group font-medium"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-16 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-neutral-400 font-mono">
        <p className="tracking-widest uppercase">
          © {new Date().getFullYear()} LUMIÈRE PHOTOGRAPHY STUDIO • CREATED BY AKHIL. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-6 tracking-widest uppercase">
          <span className="hover:text-white cursor-pointer">PRIVACY POLICY</span>
          <span>•</span>
          <span className="hover:text-white cursor-pointer">TERMS OF SERVICE</span>
        </div>
      </div>
    </footer>
  );
};
