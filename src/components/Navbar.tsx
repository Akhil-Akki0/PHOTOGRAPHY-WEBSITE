import React, { useState, useEffect } from 'react';
import { AKHIL_PROFILE } from '../data/portfolioData';
import { sound } from '../utils/audioEngine';
import { Menu, X, Play, Sparkles, UserCheck, ArrowUpRight, Volume2, VolumeX, Music } from 'lucide-react';

interface NavbarProps {
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onReplayIntro: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAbout,
  onOpenContact,
  onReplayIntro,
  activeSection
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCreatorCard, setShowCreatorCard] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [isAmbient, setIsAmbient] = useState(sound.isAmbientActive());

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    sound.playDialClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playDialClick();
  };

  const toggleAmbient = () => {
    const active = sound.toggleAmbientSoundtrack();
    setIsAmbient(active);
    sound.playDialClick();
  };

  return (
    <>
      <nav
        id="top-nav-bar"
        className={`fixed top-0 w-full z-50 transition-all duration-300 px-6 md:px-16 ${
          scrolled
            ? 'bg-[#faf9f7]/95 dark:bg-black/90 backdrop-blur-md py-4 border-b border-black/10 dark:border-white/10 shadow-sm'
            : 'bg-[#faf9f7]/80 dark:bg-black/60 backdrop-blur-sm py-5 sm:py-6 border-b border-black/5 dark:border-white/5'
        }`}
      >
        <div className="max-w-[1440px] mx-auto flex justify-between items-center">
          {/* Logo & Creator Attribution */}
          <div className="flex items-center gap-4 md:gap-6">
            <button
              id="brand-logo-btn"
              onClick={() => {
                sound.playDialClick();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left group cursor-pointer"
            >
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tighter text-blue-600 dark:text-blue-400 block group-hover:opacity-80 transition-opacity uppercase">
                {AKHIL_PROFILE.brandName}
              </span>
              <span className="text-[9px] tracking-[0.25em] text-neutral-500 uppercase block">
                {AKHIL_PROFILE.studioName}
              </span>
            </button>

            {/* CREATED BY AKHIL PROMINENT BADGE */}
            <div className="relative">
              <button
                id="header-created-by-akhil-badge"
                onMouseEnter={() => {
                  sound.playFocusTick();
                  setShowCreatorCard(true);
                }}
                onMouseLeave={() => setShowCreatorCard(false)}
                onClick={() => {
                  sound.playDialClick();
                  onOpenAbout();
                }}
                className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-black/10 dark:border-white/15 rounded-full transition-all duration-300 cursor-pointer shadow-sm"
                title="Created by Akhil • View Photographer Profile"
              >
                <div className="relative w-7 h-7 rounded-full overflow-hidden border border-black/20 dark:border-white/30 flex-shrink-0 ring-1 ring-blue-500/30">
                  <img
                    src={AKHIL_PROFILE.portraitUrl}
                    alt="Akhil"
                    className="w-full h-full object-cover object-top rounded-full"
                  />
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white" />
                </div>
                <div className="text-left leading-none pr-1">
                  <div className="text-[8px] tracking-[0.2em] font-semibold text-neutral-500 dark:text-neutral-400 uppercase">
                    CREATED BY
                  </div>
                  <div className="text-[12px] font-bold tracking-tight text-black dark:text-white uppercase flex items-center gap-1">
                    <span>AKHIL</span>
                    <Sparkles className="w-2.5 h-2.5 text-blue-500" />
                  </div>
                </div>
              </button>

              {/* Hover Flyout Card */}
              {showCreatorCard && (
                <div className="absolute left-0 top-full mt-2 w-72 bg-white dark:bg-neutral-900 border border-black/10 dark:border-neutral-800 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="flex gap-3 items-center pb-3 border-b border-neutral-100 dark:border-neutral-800">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500/40 ring-2 ring-neutral-200 dark:ring-neutral-700 flex-shrink-0">
                      <img
                        src={AKHIL_PROFILE.portraitUrl}
                        alt="Akhil"
                        className="w-full h-full object-cover object-top rounded-full"
                      />
                    </div>
                    <div>
                      <div className="text-[10px] tracking-widest text-blue-600 font-mono uppercase">
                        CREATOR & DIRECTOR
                      </div>
                      <div className="font-serif font-bold text-base text-neutral-900 dark:text-white">
                        {AKHIL_PROFILE.name}
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        {AKHIL_PROFILE.location}
                      </div>
                    </div>
                  </div>
                  <p className="text-[12px] text-neutral-600 dark:text-neutral-300 py-2.5 leading-relaxed">
                    Editorial, nature & cinematic storytelling portfolio crafted with custom visual artistry.
                  </p>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => {
                        sound.playDialClick();
                        onOpenAbout();
                      }}
                      className="flex-1 py-1.5 text-center text-[10px] tracking-widest uppercase bg-black dark:bg-white text-white dark:text-black font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <UserCheck className="w-3 h-3" />
                      <span>Full Bio</span>
                    </button>
                    <button
                      onClick={() => {
                        sound.playDialClick();
                        onReplayIntro();
                      }}
                      className="py-1.5 px-2 text-center text-[10px] tracking-widest uppercase border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center gap-1 cursor-pointer"
                      title="Replay cinematic opening"
                    >
                      <Play className="w-2.5 h-2.5" />
                      <span>Intro</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex gap-7 lg:gap-9 items-center">
            <button
              id="nav-work-btn"
              onClick={() => scrollTo('featured-work')}
              onMouseEnter={() => sound.playFocusTick()}
              className={`text-[12px] tracking-[0.18em] uppercase transition-all duration-300 cursor-pointer ${
                activeSection === 'work'
                  ? 'text-blue-600 dark:text-blue-400 font-semibold border-b border-blue-600 dark:border-blue-400 pb-0.5'
                  : 'text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              WORK
            </button>

            <button
              id="nav-about-btn"
              onClick={() => {
                sound.playDialClick();
                onOpenAbout();
              }}
              onMouseEnter={() => sound.playFocusTick()}
              className="text-[12px] tracking-[0.18em] uppercase text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 cursor-pointer"
            >
              ABOUT
            </button>

            <button
              id="nav-services-btn"
              onClick={() => scrollTo('services-section')}
              onMouseEnter={() => sound.playFocusTick()}
              className="text-[12px] tracking-[0.18em] uppercase text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 cursor-pointer"
            >
              SERVICES
            </button>

            <button
              id="nav-journal-btn"
              onClick={() => scrollTo('journal-section')}
              onMouseEnter={() => sound.playFocusTick()}
              className="text-[12px] tracking-[0.18em] uppercase text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 cursor-pointer"
            >
              JOURNAL
            </button>

            <button
              id="nav-contact-btn"
              onClick={() => {
                sound.playDialClick();
                onOpenContact();
              }}
              onMouseEnter={() => sound.playFocusTick()}
              className="text-[12px] tracking-[0.18em] uppercase text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 cursor-pointer"
            >
              CONTACT
            </button>

            {/* Ambient Soundscape Button in Header */}
            <button
              id="nav-ambient-sound-btn"
              onClick={toggleAmbient}
              className={`p-1.5 border transition-all flex items-center gap-1 text-[10px] font-mono tracking-wider cursor-pointer ${
                isAmbient
                  ? 'border-blue-500 text-blue-600 bg-blue-50 dark:bg-blue-950/40'
                  : 'border-black/10 dark:border-white/10 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
              title="Toggle Ambient Audio Soundscape"
            >
              <Music className={`w-3 h-3 ${isAmbient ? 'animate-pulse text-blue-600' : ''}`} />
              <span className="hidden lg:inline">{isAmbient ? 'MUSIC ON' : 'MUSIC'}</span>
            </button>

            {/* Sound FX Toggle Button in Header */}
            <button
              id="nav-sound-fx-btn"
              onClick={toggleSound}
              className={`p-1.5 border transition-all cursor-pointer ${
                isMuted
                  ? 'border-red-400/40 text-red-500 bg-red-50 dark:bg-red-950/20'
                  : 'border-black/10 dark:border-white/10 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
              title={isMuted ? 'Unmute Camera Audio FX' : 'Mute Camera Audio FX'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-600" />}
            </button>

            {/* Inquire Direct CTA Button */}
            <button
              id="nav-inquire-cta"
              onClick={() => {
                sound.playDialClick();
                onOpenContact();
              }}
              className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>INQUIRE</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2.5">
            {/* Quick Mobile Mute */}
            <button
              onClick={toggleSound}
              className="p-1.5 border border-black/10 text-neutral-600"
              title="Sound FX"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-600" />}
            </button>

            <button
              onClick={() => {
                sound.playDialClick();
                onOpenAbout();
              }}
              className="w-8 h-8 rounded-full border border-black/20 overflow-hidden flex-shrink-0 ring-1 ring-blue-500/30"
              title="Created by Akhil"
            >
              <img
                src={AKHIL_PROFILE.portraitUrl}
                alt="Akhil"
                className="w-full h-full object-cover object-top rounded-full"
              />
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => {
                sound.playDialClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 text-blue-600 dark:text-blue-400 hover:bg-black/5"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-drawer"
            className="md:hidden mt-4 pt-4 pb-6 px-4 bg-white dark:bg-neutral-950 border-t border-black/10 dark:border-neutral-800 flex flex-col gap-4 shadow-xl"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-neutral-200 dark:border-neutral-800">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-neutral-300 dark:border-neutral-700 flex-shrink-0">
                <img
                  src={AKHIL_PROFILE.portraitUrl}
                  alt="Akhil"
                  className="w-full h-full object-cover object-top rounded-full"
                />
              </div>
              <div>
                <span className="text-[10px] tracking-widest text-neutral-500 uppercase block">
                  CREATED BY
                </span>
                <span className="font-serif font-bold text-sm text-neutral-900 dark:text-white uppercase">
                  {AKHIL_PROFILE.name}
                </span>
              </div>
            </div>

            <button
              onClick={() => scrollTo('featured-work')}
              className="text-left text-[13px] tracking-[0.2em] text-neutral-800 dark:text-neutral-200 uppercase py-2 hover:text-blue-600 font-medium cursor-pointer"
            >
              WORK
            </button>
            <button
              onClick={() => {
                sound.playDialClick();
                setMobileMenuOpen(false);
                onOpenAbout();
              }}
              className="text-left text-[13px] tracking-[0.2em] text-neutral-800 dark:text-neutral-200 uppercase py-2 hover:text-blue-600 font-medium cursor-pointer"
            >
              ABOUT AKHIL
            </button>
            <button
              onClick={() => scrollTo('services-section')}
              className="text-left text-[13px] tracking-[0.2em] text-neutral-800 dark:text-neutral-200 uppercase py-2 hover:text-blue-600 font-medium cursor-pointer"
            >
              SERVICES
            </button>
            <button
              onClick={() => scrollTo('journal-section')}
              className="text-left text-[13px] tracking-[0.2em] text-neutral-800 dark:text-neutral-200 uppercase py-2 hover:text-blue-600 font-medium cursor-pointer"
            >
              JOURNAL
            </button>
            <button
              onClick={() => {
                sound.playDialClick();
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="text-left text-[13px] tracking-[0.2em] text-neutral-800 dark:text-neutral-200 uppercase py-2 hover:text-blue-600 font-medium cursor-pointer"
            >
              CONTACT & BOOKINGS
            </button>
            <button
              onClick={() => {
                sound.playDialClick();
                setMobileMenuOpen(false);
                onReplayIntro();
              }}
              className="text-left text-[11px] tracking-[0.2em] text-neutral-500 uppercase py-2 flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-3 h-3" />
              <span>REPLAY CINEMATIC INTRO</span>
            </button>
          </div>
        )}
      </nav>
    </>
  );
};
