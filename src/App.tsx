import React, { useState, useEffect, useCallback } from 'react';
import { IntroScreen } from './components/IntroScreen';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatementSection } from './components/StatementSection';
import { FeaturedWork } from './components/FeaturedWork';
import { GrayscaleSection } from './components/GrayscaleSection';
import { ServicesSection } from './components/ServicesSection';
import { JournalSection } from './components/JournalSection';
import { DramaticCTA } from './components/DramaticCTA';
import { Footer } from './components/Footer';
import { PhotoLightbox } from './components/PhotoLightbox';
import { AboutModal } from './components/AboutModal';
import { ContactModal } from './components/ContactModal';
import { ArchiveModal } from './components/ArchiveModal';
import { CameraReticleCursor } from './components/CameraReticleCursor';
import { AudioHUD } from './components/AudioHUD';
import { FilmRollModal, ExposedFrame } from './components/FilmRollModal';
import { NaturalAnimatedBackground, NatureAtmosphere } from './components/NaturalAnimatedBackground';
import { PhotoProject } from './types';
import { COLOR_PROJECTS, GRAYSCALE_PROJECTS } from './data/portfolioData';
import { sound } from './utils/audioEngine';
import { Film } from 'lucide-react';

const MAX_EXPOSURES = 36;
const ATMOSPHERES_LIST: NatureAtmosphere[] = ['goldenHour', 'mist', 'alpineForest', 'desertDune'];

export default function App() {
  const [introOpen, setIntroOpen] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoProject | null>(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [filmRollOpen, setFilmRollOpen] = useState(false);
  const [inquireService, setInquireService] = useState<string | undefined>(undefined);
  const [reticleEnabled, setReticleEnabled] = useState(true);
  const [isFlashActive, setIsFlashActive] = useState(false);
  const [flashKey, setFlashKey] = useState(0);
  const [atmosphere, setAtmosphere] = useState<NatureAtmosphere>('goldenHour');

  // 35mm Film Roll Consumption State
  const [exposureCount, setExposureCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('akhil_film_exposures');
      return saved ? Math.min(MAX_EXPOSURES, parseInt(saved, 10)) : 0;
    } catch {
      return 0;
    }
  });

  const [currentFilmStock, setCurrentFilmStock] = useState('portra400');
  const [rollsCompleted, setRollsCompleted] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('akhil_film_rolls_completed');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [exposedFrames, setExposedFrames] = useState<ExposedFrame[]>([]);
  const [filmNotification, setFilmNotification] = useState<string | null>(null);

  const allPhotos = [...COLOR_PROJECTS, ...GRAYSCALE_PROJECTS];

  // Helper to advance film roll when user interacts with photos or snaps shutter
  const recordExposure = useCallback((photo?: PhotoProject, title?: string, type: 'inspection' | 'snapshot' | 'lightbox' = 'inspection') => {
    setExposureCount((prev) => {
      if (prev >= MAX_EXPOSURES) {
        setFilmNotification('35MM ROLL IS FULL (36/36) — CLICK HUD TO REWIND');
        setTimeout(() => setFilmNotification(null), 3500);
        return MAX_EXPOSURES;
      }
      const next = prev + 1;
      try {
        localStorage.setItem('akhil_film_exposures', String(next));
      } catch {
        // Ignore storage exceptions
      }

      sound.playFilmAdvance();

      const frameNumber = next;
      const frameTitle = title || (photo ? photo.title : `Shutter Exposure #${frameNumber}`);
      setExposedFrames((frames) => {
        const newFrame: ExposedFrame = {
          frameNumber,
          photo,
          title: frameTitle,
          timestamp: Date.now(),
          type
        };
        return [newFrame, ...frames.slice(0, 35)];
      });

      if (next === MAX_EXPOSURES) {
        setFilmNotification('35MM ROLL FULL (36/36 EXPOSURES CONSUMED) — READY FOR DARKROOM');
        setTimeout(() => setFilmNotification(null), 4500);
      } else {
        setFilmNotification(`FRAME #${String(next).padStart(2, '0')}/36 EXPOSED`);
        setTimeout(() => setFilmNotification(null), 2000);
      }

      return next;
    });
  }, []);

  const handleReloadRoll = useCallback(() => {
    setExposureCount(0);
    setExposedFrames([]);
    setRollsCompleted((prev) => {
      const next = prev + 1;
      try {
        localStorage.setItem('akhil_film_rolls_completed', String(next));
        localStorage.setItem('akhil_film_exposures', '0');
      } catch {
        // Ignore
      }
      return next;
    });
    setFilmNotification('FRESH 36-EXP 35MM ROLL LOADED & ADVANCED TO FRAME #01');
    setTimeout(() => setFilmNotification(null), 3000);
  }, []);

  const handleCycleAtmosphere = useCallback(() => {
    setAtmosphere((current) => {
      const currentIndex = ATMOSPHERES_LIST.indexOf(current);
      const nextIndex = (currentIndex + 1) % ATMOSPHERES_LIST.length;
      const nextAtm = ATMOSPHERES_LIST[nextIndex];
      const names: Record<NatureAtmosphere, string> = {
        goldenHour: 'GOLDEN HOUR (WARM SUNLIGHT)',
        mist: 'COASTAL MIST (SOFT OCEAN AIR)',
        alpineForest: 'ALPINE PINES (COOL FOREST BREEZE)',
        desertDune: 'DESERT EARTH (WARM TERRACOTTA)'
      };
      setFilmNotification(`ATMOSPHERE: ${names[nextAtm]}`);
      setTimeout(() => setFilmNotification(null), 2500);
      return nextAtm;
    });
  }, []);

  const handleInquireService = (serviceName: string) => {
    sound.playDialClick();
    setInquireService(serviceName);
    setContactOpen(true);
  };

  const handleScrollDown = () => {
    sound.playDialClick();
    const el = document.getElementById('featured-work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTakeSnapshot = useCallback(() => {
    sound.playShutterSound();
    recordExposure(undefined, 'Leica M Shutter Snapshot', 'snapshot');
    setFlashKey((k) => k + 1);
    setIsFlashActive(true);
    setTimeout(() => {
      setIsFlashActive(false);
    }, 350);
  }, [recordExposure]);

  const handleSelectPhoto = useCallback((photo: PhotoProject) => {
    sound.playShutterSound();
    recordExposure(photo, photo.title, 'lightbox');
    setSelectedPhoto(photo);
  }, [recordExposure]);

  // Navigate to previous photo in gallery
  const handlePrevPhoto = useCallback(() => {
    sound.playShutterSound();
    if (selectedPhoto) {
      const currentIndex = allPhotos.findIndex((p) => p.id === selectedPhoto.id);
      const prevIndex = (currentIndex - 1 + allPhotos.length) % allPhotos.length;
      const prevPhoto = allPhotos[prevIndex];
      recordExposure(prevPhoto, prevPhoto.title, 'lightbox');
      setSelectedPhoto(prevPhoto);
    } else {
      const lastPhoto = allPhotos[allPhotos.length - 1];
      recordExposure(lastPhoto, lastPhoto.title, 'lightbox');
      setSelectedPhoto(lastPhoto);
    }
  }, [selectedPhoto, allPhotos, recordExposure]);

  // Navigate to next photo in gallery
  const handleNextPhoto = useCallback(() => {
    sound.playShutterSound();
    if (selectedPhoto) {
      const currentIndex = allPhotos.findIndex((p) => p.id === selectedPhoto.id);
      const nextIndex = (currentIndex + 1) % allPhotos.length;
      const nextPhoto = allPhotos[nextIndex];
      recordExposure(nextPhoto, nextPhoto.title, 'lightbox');
      setSelectedPhoto(nextPhoto);
    } else {
      const firstPhoto = allPhotos[0];
      recordExposure(firstPhoto, firstPhoto.title, 'lightbox');
      setSelectedPhoto(firstPhoto);
    }
  }, [selectedPhoto, allPhotos, recordExposure]);

  // Close the active top-most modal
  const handleCloseActiveModal = useCallback(() => {
    sound.playDialClick();
    if (selectedPhoto) {
      setSelectedPhoto(null);
    } else if (filmRollOpen) {
      setFilmRollOpen(false);
    } else if (contactOpen) {
      setContactOpen(false);
    } else if (aboutOpen) {
      setAboutOpen(false);
    } else if (archiveOpen) {
      setArchiveOpen(false);
    } else if (introOpen) {
      setIntroOpen(false);
    }
  }, [selectedPhoto, filmRollOpen, contactOpen, aboutOpen, archiveOpen, introOpen]);

  // Global Keyboard Event Listener
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // If typing in input, textarea, or select, don't trigger gallery navigation
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      const isInputActive = activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select';

      if (e.key === 'Escape') {
        e.preventDefault();
        handleCloseActiveModal();
        return;
      }

      // If user is actively typing in a form input, allow native arrow movement in text
      if (isInputActive) return;

      // Gallery Navigation with Arrow Keys
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (selectedPhoto || archiveOpen) {
          e.preventDefault();
          handleNextPhoto();
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (selectedPhoto || archiveOpen) {
          e.preventDefault();
          handlePrevPhoto();
        }
      } else if (e.key === 's' || e.key === 'S') {
        // Snapshot shortcut (when not in a modal or text input)
        if (!contactOpen) {
          e.preventDefault();
          handleTakeSnapshot();
        }
      } else if (e.key === 'f' || e.key === 'F') {
        // Quick toggle Film Roll inspection
        if (!contactOpen) {
          e.preventDefault();
          sound.playDialClick();
          setFilmRollOpen((o) => !o);
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [handleCloseActiveModal, handleNextPhoto, handlePrevPhoto, handleTakeSnapshot, selectedPhoto, archiveOpen, contactOpen]);

  return (
    <div className="relative min-h-screen bg-[#f7f5f0] text-[#1a1c1b] selection:bg-black selection:text-white">
      {/* ANIMATED NATURAL ATMOSPHERE BACKGROUND (Replaces plain white everywhere) */}
      <NaturalAnimatedBackground atmosphere={atmosphere} />

      {/* GLOBAL CAMERA FLASH OVERLAY */}
      {isFlashActive && (
        <div
          key={flashKey}
          id="camera-flash-overlay"
          className="fixed inset-0 z-[99999] bg-white pointer-events-none animate-camera-flash"
          aria-hidden="true"
        />
      )}

      {/* 0. INTERACTIVE CAMERA FOCUS RETICLE CURSOR */}
      <CameraReticleCursor enabled={reticleEnabled} />

      {/* 1. CINEMATIC INTRO SCREEN (Triggered on every page open) */}
      <IntroScreen
        isOpen={introOpen}
        onComplete={() => setIntroOpen(false)}
      />

      {/* 2. TOP STICKY NAVBAR (With prominent CREATED BY AKHIL photo badge) */}
      <Navbar
        onOpenAbout={() => {
          sound.playDialClick();
          setAboutOpen(true);
        }}
        onOpenContact={() => {
          sound.playDialClick();
          setInquireService(undefined);
          setContactOpen(true);
        }}
        onReplayIntro={() => {
          sound.playShutterSound();
          setIntroOpen(true);
        }}
        activeSection="work"
      />

      {/* 3. HERO SECTION */}
      <HeroSection
        onScrollDown={handleScrollDown}
        onTakeSnapshot={handleTakeSnapshot}
      />

      {/* 4. ARTISTIC THESIS / STATEMENT (WITH PHOTO STUDIES & METADATA) */}
      <StatementSection onSelectPhoto={handleSelectPhoto} />

      {/* 5. FEATURED WORK (ASYMMETRICAL COLOR GRID) */}
      <FeaturedWork
        onSelectPhoto={handleSelectPhoto}
        onViewAll={() => {
          sound.playDialClick();
          setArchiveOpen(true);
        }}
      />

      {/* 6. GRAYSCALE EDITORIAL SHIFT & SILENCE SECTION */}
      <GrayscaleSection
        onSelectPhoto={handleSelectPhoto}
      />

      {/* 7. TYPOGRAPHIC SERVICES / OUR APPROACH */}
      <ServicesSection
        onInquireService={handleInquireService}
      />

      {/* 8. FIELD NOTES & ESSAY JOURNAL */}
      <JournalSection />

      {/* 9. DRAMATIC CTA */}
      <DramaticCTA
        onOpenContact={() => {
          sound.playDialClick();
          setInquireService(undefined);
          setContactOpen(true);
        }}
      />

      {/* 10. MAIN FOOTER */}
      <Footer
        onOpenAbout={() => {
          sound.playDialClick();
          setAboutOpen(true);
        }}
        onOpenContact={() => {
          sound.playDialClick();
          setInquireService(undefined);
          setContactOpen(true);
        }}
        onReplayIntro={() => {
          sound.playShutterSound();
          setIntroOpen(true);
        }}
      />

      {/* FLOATING CAMERA & AUDIO CONTROL HUD (WITH 35MM FILM ROLL INDICATOR & ATMOSPHERE CHANGER) */}
      <AudioHUD
        reticleEnabled={reticleEnabled}
        onToggleReticle={() => setReticleEnabled(!reticleEnabled)}
        onTakeSnapshot={handleTakeSnapshot}
        exposureCount={exposureCount}
        maxExposures={MAX_EXPOSURES}
        onOpenFilmRoll={() => {
          sound.playDialClick();
          setFilmRollOpen(true);
        }}
        currentFilmStock={currentFilmStock}
        atmosphere={atmosphere}
        onCycleAtmosphere={handleCycleAtmosphere}
      />

      {/* FILM ROLL TOAST NOTIFICATION BADGE */}
      {filmNotification && (
        <div
          id="film-roll-notification-toast"
          className="fixed bottom-20 right-4 sm:right-6 z-40 bg-black/95 text-amber-300 border border-amber-500/80 px-3.5 py-2 shadow-2xl text-[11px] font-mono tracking-widest uppercase flex items-center gap-2 animate-bounce select-none pointer-events-none"
        >
          <Film className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>{filmNotification}</span>
        </div>
      )}

      {/* MODALS */}
      {/* 35mm Film Roll & Canister Inspector Modal */}
      <FilmRollModal
        isOpen={filmRollOpen}
        onClose={() => {
          sound.playDialClick();
          setFilmRollOpen(false);
        }}
        exposureCount={exposureCount}
        maxExposures={MAX_EXPOSURES}
        exposedFrames={exposedFrames}
        onReloadRoll={handleReloadRoll}
        onSelectPhoto={handleSelectPhoto}
        currentFilmStock={currentFilmStock}
        onChangeFilmStock={(stock) => setCurrentFilmStock(stock)}
        rollsCompleted={rollsCompleted}
      />

      {/* Lightbox / EXIF Inspector / Darkroom Simulator */}
      <PhotoLightbox
        photo={selectedPhoto}
        allPhotos={allPhotos}
        onClose={() => {
          sound.playDialClick();
          setSelectedPhoto(null);
        }}
        onSelectPhoto={handleSelectPhoto}
        onPrevPhoto={handlePrevPhoto}
        onNextPhoto={handleNextPhoto}
      />

      {/* About Akhil Modal */}
      <AboutModal
        isOpen={aboutOpen}
        onClose={() => {
          sound.playDialClick();
          setAboutOpen(false);
        }}
        onOpenContact={() => {
          sound.playDialClick();
          setAboutOpen(false);
          setInquireService(undefined);
          setContactOpen(true);
        }}
      />

      {/* Contact & Commission Booking Modal */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => {
          sound.playDialClick();
          setContactOpen(false);
        }}
        preselectedService={inquireService}
      />

      {/* Full Photo Archive Modal */}
      <ArchiveModal
        isOpen={archiveOpen}
        onClose={() => {
          sound.playDialClick();
          setArchiveOpen(false);
        }}
        onSelectPhoto={handleSelectPhoto}
      />
    </div>
  );
}
