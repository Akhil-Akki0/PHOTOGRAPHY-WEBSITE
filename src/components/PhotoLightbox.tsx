import React, { useEffect, useState, useRef } from 'react';
import { PhotoProject } from '../types';
import { sound } from '../utils/audioEngine';
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Camera,
  Aperture,
  Clock,
  Zap,
  Sliders,
  Sparkles,
  Search,
  RotateCcw,
  Film,
  Keyboard,
  Info,
  Layers,
  Eye,
  EyeOff,
  Activity
} from 'lucide-react';

interface PhotoLightboxProps {
  photo: PhotoProject | null;
  allPhotos: PhotoProject[];
  onClose: () => void;
  onSelectPhoto: (photo: PhotoProject) => void;
  onPrevPhoto?: () => void;
  onNextPhoto?: () => void;
}

type FilmStock = 'raw' | 'portra400' | 'velvia50' | 'trix400' | 'ilford' | 'cinematic';

const FILM_DETAILS: Record<FilmStock, { name: string; type: string; temp: string; badgeColor: string }> = {
  raw: {
    name: 'RAW Standard',
    type: 'Digital Sensor Profile',
    temp: '5600K Native',
    badgeColor: 'text-neutral-300 border-neutral-700 bg-neutral-900/80'
  },
  portra400: {
    name: 'Kodak Portra 400',
    type: 'Warm Color Negative Emulation',
    temp: '5200K Daylight',
    badgeColor: 'text-amber-300 border-amber-500/40 bg-amber-950/60'
  },
  velvia50: {
    name: 'Fujifilm Velvia 50',
    type: 'Vivid Chrome Reversal Emulation',
    temp: '5800K Hyper-Saturated',
    badgeColor: 'text-emerald-300 border-emerald-500/40 bg-emerald-950/60'
  },
  trix400: {
    name: 'Kodak Tri-X 400',
    type: 'High-Contrast Silver Grain B&W',
    temp: 'Monochrome Silver Gelatin',
    badgeColor: 'text-neutral-100 border-neutral-400 bg-neutral-900/80'
  },
  ilford: {
    name: 'Ilford HP5 Plus',
    type: 'Classic Tonal Range B&W',
    temp: 'Monochrome Soft Grain',
    badgeColor: 'text-neutral-200 border-neutral-500 bg-neutral-950/80'
  },
  cinematic: {
    name: 'Cinematic Teal 35mm',
    type: 'Motion Picture Tungsten Balance',
    temp: '4300K Cool Shadow / Warm Highlight',
    badgeColor: 'text-cyan-300 border-cyan-500/40 bg-cyan-950/60'
  }
};

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photo,
  allPhotos,
  onClose,
  onSelectPhoto,
  onPrevPhoto,
  onNextPhoto
}) => {
  // Darkroom & Film emulation states
  const [activeFilm, setActiveFilm] = useState<FilmStock>('raw');
  const [exposure, setExposure] = useState<number>(0);
  const [contrast, setContrast] = useState<number>(100);
  const [grainIntensity, setGrainIntensity] = useState<number>(25);
  const [showDarkroom, setShowDarkroom] = useState<boolean>(false);
  const [showHudOverlay, setShowHudOverlay] = useState<boolean>(true);
  const [loupeActive, setLoupeActive] = useState<boolean>(false);
  const [loupePos, setLoupePos] = useState<{ x: number; y: number; bgX: number; bgY: number }>({
    x: 0,
    y: 0,
    bgX: 0,
    bgY: 0
  });

  // Touch swipe states for mobile navigation
  const [swipeOffset, setSwipeOffset] = useState<number>(0);
  const [isSwiping, setIsSwiping] = useState<boolean>(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchStartTime = useRef<number>(0);

  const imageContainerRef = useRef<HTMLDivElement | null>(null);

  // Play shutter sound on photo open & change
  useEffect(() => {
    if (photo) {
      sound.playShutterSound();
      setActiveFilm('raw');
      setExposure(0);
      setContrast(100);
      // Auto-set baseline grain based on photo's native ISO
      const isoNum = parseInt(photo.exif.iso.replace(/\D/g, '')) || 400;
      if (isoNum <= 100) setGrainIntensity(10);
      else if (isoNum <= 400) setGrainIntensity(25);
      else if (isoNum <= 1600) setGrainIntensity(50);
      else setGrainIntensity(75);
      setSwipeOffset(0);
      setIsSwiping(false);
    }
  }, [photo?.id]);

  const currentIndex = photo ? allPhotos.findIndex((p) => p.id === photo.id) : -1;
  const prevPhoto = photo && currentIndex !== -1 ? allPhotos[(currentIndex - 1 + allPhotos.length) % allPhotos.length] : null;
  const nextPhoto = photo && currentIndex !== -1 ? allPhotos[(currentIndex + 1) % allPhotos.length] : null;

  const handleGoPrev = () => {
    sound.playShutterSound();
    if (onPrevPhoto) {
      onPrevPhoto();
    } else if (prevPhoto) {
      onSelectPhoto(prevPhoto);
    }
  };

  const handleGoNext = () => {
    sound.playShutterSound();
    if (onNextPhoto) {
      onNextPhoto();
    } else if (nextPhoto) {
      onSelectPhoto(nextPhoto);
    }
  };

  // Touch Event Listeners for Mobile Swipe Navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      touchStartTime.current = Date.now();
      setIsSwiping(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - touchStartX.current;
    const deltaY = currentY - touchStartY.current;

    // Check if horizontal movement dominates vertical scroll
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      setSwipeOffset(deltaX);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchStartY.current === null) {
      setSwipeOffset(0);
      setIsSwiping(false);
      return;
    }

    const duration = Date.now() - touchStartTime.current;
    const deltaX = swipeOffset;
    const threshold = 40; // minimum horizontal distance in px
    const isQuickFlick = Math.abs(deltaX) > 25 && duration < 250;

    if (deltaX < -threshold || (isQuickFlick && deltaX < 0)) {
      // Swiped Left -> Advance to Next Photo
      handleGoNext();
    } else if (deltaX > threshold || (isQuickFlick && deltaX > 0)) {
      // Swiped Right -> Return to Prev Photo
      handleGoPrev();
    }

    // Reset touch variables
    touchStartX.current = null;
    touchStartY.current = null;
    setSwipeOffset(0);
    setIsSwiping(false);
  };

  const handleTouchCancel = () => {
    touchStartX.current = null;
    touchStartY.current = null;
    setSwipeOffset(0);
    setIsSwiping(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!photo) return;
      if (e.key === 'Escape') {
        sound.playDialClick();
        onClose();
      }
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        handleGoNext();
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        handleGoPrev();
      }
      if (e.key === 'i' || e.key === 'I' || e.key === 'h' || e.key === 'H') {
        sound.playDialClick();
        setShowHudOverlay((prev) => !prev);
      }
      if (e.key === 'd' || e.key === 'D') {
        sound.playDialClick();
        setShowDarkroom((prev) => !prev);
      }
      if (e.key === 'l' || e.key === 'L') {
        sound.playDialClick();
        setLoupeActive((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo, allPhotos, onClose, onSelectPhoto, onPrevPhoto, onNextPhoto, prevPhoto, nextPhoto]);

  if (!photo) return null;

  // Calculate CSS filters based on Film Stock & Custom Sliders
  const getFilterStyle = () => {
    let filterString = `brightness(${100 + exposure * 15}%) contrast(${contrast}%)`;

    switch (activeFilm) {
      case 'portra400':
        filterString += ' sepia(15%) saturate(115%) hue-rotate(-5deg)';
        break;
      case 'velvia50':
        filterString += ' saturate(155%) contrast(118%)';
        break;
      case 'trix400':
        filterString += ' grayscale(100%) contrast(140%) brightness(95%)';
        break;
      case 'ilford':
        filterString += ' grayscale(100%) contrast(105%) brightness(105%)';
        break;
      case 'cinematic':
        filterString += ' saturate(125%) hue-rotate(15deg) contrast(110%)';
        break;
      case 'raw':
      default:
        if (photo.isGrayscale) {
          filterString += ' grayscale(100%) contrast(110%)';
        }
        break;
    }
    return filterString;
  };

  // Loupe pointer handler
  const handleMouseMoveImage = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!loupeActive || !imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const bgX = (x / rect.width) * 100;
    const bgY = (y / rect.height) * 100;

    setLoupePos({ x, y, bgX, bgY });
  };

  const currentFilm = FILM_DETAILS[activeFilm];

  return (
    <div
      id="photo-lightbox-modal"
      className="fixed inset-0 z-[80] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-3 sm:p-6 md:p-8 animate-in fade-in duration-200 select-none overflow-y-auto"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div
        className="flex justify-between items-center z-10 text-white pb-3 border-b border-neutral-800/80"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-neutral-400">
            FRAME {photo.number} / {String(allPhotos.length).padStart(2, '0')}
          </span>
          <span className="text-neutral-600">•</span>
          <span className="text-[11px] tracking-widest uppercase text-blue-400 font-mono">
            {photo.category}
          </span>
          {activeFilm !== 'raw' && (
            <span className={`hidden sm:inline-flex items-center gap-1 px-2 py-0.5 border text-[9px] font-mono uppercase ${currentFilm.badgeColor}`}>
              <Film className="w-2.5 h-2.5" />
              <span>{currentFilm.name}</span>
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Keyboard navigation hint */}
          <div className="hidden xl:flex items-center gap-2 text-[10px] font-mono text-neutral-400 border border-neutral-800 px-2.5 py-1 bg-neutral-900/60">
            <Keyboard className="w-3 h-3 text-blue-400" />
            <span>[←/→] SLIDES</span>
            <span className="text-neutral-600">•</span>
            <span>[I] HUD</span>
            <span className="text-neutral-600">•</span>
            <span>[D] DARKROOM</span>
            <span className="text-neutral-600">•</span>
            <span>[ESC] CLOSE</span>
          </div>

          {/* Minimalist HUD Metadata Overlay Toggle */}
          <button
            onClick={() => {
              sound.playDialClick();
              setShowHudOverlay(!showHudOverlay);
            }}
            className={`p-2 border transition-all flex items-center gap-1.5 text-xs font-mono tracking-wider ${
              showHudOverlay
                ? 'bg-neutral-800 border-neutral-500 text-white'
                : 'border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-neutral-200'
            }`}
            title="Toggle Sleek Metadata Telemetry Overlay (Key: I)"
          >
            {showHudOverlay ? <Eye className="w-3.5 h-3.5 text-blue-400" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">HUD METADATA</span>
          </button>

          {/* Darkroom Controls Toggle */}
          <button
            onClick={() => {
              sound.playDialClick();
              setShowDarkroom(!showDarkroom);
            }}
            className={`p-2 border transition-all flex items-center gap-1.5 text-xs font-mono tracking-wider ${
              showDarkroom
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'border-neutral-700 text-neutral-300 hover:border-white hover:text-white'
            }`}
            title="Toggle Film Stocks & Darkroom Tools (Key: D)"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">DARKROOM</span>
          </button>

          {/* 2.5x Loupe Magnifier Toggle */}
          <button
            onClick={() => {
              sound.playDialClick();
              setLoupeActive(!loupeActive);
            }}
            className={`p-2 border transition-all flex items-center gap-1.5 text-xs font-mono tracking-wider ${
              loupeActive
                ? 'bg-emerald-600 border-emerald-500 text-white'
                : 'border-neutral-700 text-neutral-300 hover:border-white hover:text-white'
            }`}
            title="Toggle 2.5x Optical Magnifier Loupe (Key: L)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">LOUPE</span>
          </button>

          <button
            onClick={() => {
              sound.playDialClick();
              onClose();
            }}
            className="p-2 border border-neutral-700 text-neutral-300 hover:text-white hover:border-white transition-colors flex items-center gap-1.5 text-xs uppercase tracking-widest cursor-pointer"
            aria-label="Close Lightbox"
          >
            <span>Close</span>
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Optional Darkroom Film Simulation Drawer */}
      {showDarkroom && (
        <div
          className="bg-neutral-900/95 border border-neutral-800 p-4 my-2 text-white z-30 flex flex-wrap items-center justify-between gap-4 animate-in slide-in-from-top-2 duration-150 text-xs font-mono"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Film Presets */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-neutral-500 flex items-center gap-1 text-[10px] uppercase tracking-wider">
              <Film className="w-3 h-3 text-blue-400" /> FILM STOCK:
            </span>
            {[
              { id: 'raw', label: 'RAW Standard' },
              { id: 'portra400', label: 'Portra 400' },
              { id: 'velvia50', label: 'Velvia 50' },
              { id: 'trix400', label: 'Tri-X 400 B&W' },
              { id: 'ilford', label: 'Ilford HP5' },
              { id: 'cinematic', label: 'Cinematic Teal' }
            ].map((film) => (
              <button
                key={film.id}
                onClick={() => {
                  sound.playDialClick();
                  setActiveFilm(film.id as FilmStock);
                }}
                className={`px-2.5 py-1 text-[10px] tracking-wider uppercase transition-colors border cursor-pointer ${
                  activeFilm === film.id
                    ? 'bg-blue-600 border-blue-400 text-white font-bold'
                    : 'border-neutral-700 bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                {film.label}
              </button>
            ))}
          </div>

            {/* Exposure & Contrast & Grain Sliders */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-neutral-400 text-[10px]">EXP:</span>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="0.5"
                  value={exposure}
                  onChange={(e) => {
                    setExposure(parseFloat(e.target.value));
                    sound.playDialClick();
                  }}
                  className="w-20 accent-blue-500 cursor-pointer"
                />
                <span className="text-neutral-300 text-[10px] w-8">
                  {exposure > 0 ? `+${exposure}` : exposure} EV
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-neutral-400 text-[10px]">CONTR:</span>
                <input
                  type="range"
                  min="70"
                  max="140"
                  step="5"
                  value={contrast}
                  onChange={(e) => {
                    setContrast(parseInt(e.target.value));
                    sound.playDialClick();
                  }}
                  className="w-20 accent-blue-500 cursor-pointer"
                />
                <span className="text-neutral-300 text-[10px] w-8">{contrast}%</span>
              </div>

              {/* ISO Film Grain Density Slider */}
              <div className="flex items-center gap-2 bg-neutral-950/80 px-2.5 py-1 border border-neutral-800">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span className="text-neutral-400 text-[10px]">GRAIN DENSITY:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={grainIntensity}
                  onChange={(e) => {
                    setGrainIntensity(parseInt(e.target.value));
                    sound.playDialClick();
                  }}
                  className="w-20 accent-amber-500 cursor-pointer"
                />
                <span className="text-amber-300 text-[10px] w-12 font-mono font-semibold">
                  {grainIntensity === 0
                    ? '0% (CLEAN)'
                    : grainIntensity <= 25
                    ? `ISO 400`
                    : grainIntensity <= 50
                    ? `ISO 1600`
                    : grainIntensity <= 75
                    ? `ISO 6400`
                    : `ISO 12.8k`}
                </span>
              </div>

              <button
                onClick={() => {
                  sound.playDialClick();
                  setActiveFilm('raw');
                  setExposure(0);
                  setContrast(100);
                  setGrainIntensity(25);
                }}
                className="p-1.5 border border-neutral-700 text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
                title="Reset Adjustments"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {/* Main Image Stage */}
        <div
          className="relative flex-1 flex flex-col items-center justify-center my-2 overflow-hidden min-h-[50vh] touch-pan-y"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
        >
          {/* Prev Button */}
          <button
            onClick={handleGoPrev}
            className="absolute left-2 sm:left-4 z-20 p-3 bg-black/50 hover:bg-black/90 border border-neutral-800 text-white transition-all hover:scale-105 group cursor-pointer"
            aria-label="Previous Photo"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Center Image Container with Loupe, Swipe Transform & Sleek Overlay */}
          <div
            ref={imageContainerRef}
            onMouseMove={handleMouseMoveImage}
            style={{
              transform: `translateX(${swipeOffset}px)`,
              transition: isSwiping ? 'none' : 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)',
              opacity: Math.max(0.4, 1 - Math.abs(swipeOffset) / 400)
            }}
            className={`relative max-h-[62vh] max-w-5xl w-full h-full flex items-center justify-center p-2 cursor-${
              loupeActive ? 'crosshair' : 'default'
            }`}
          >
            <img
              src={photo.imageUrl}
              alt={photo.altText}
              style={{ filter: getFilterStyle() }}
              className="max-h-[62vh] max-w-full object-contain shadow-2xl transition-all duration-200 pointer-events-none select-none"
              draggable={false}
            />

            {/* REALISTIC ANALOG FILM GRAIN OVERLAY TEXTURE */}
            {grainIntensity > 0 && (
              <div
                className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-150"
                style={{
                  opacity: (grainIntensity / 100) * 0.85,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'repeat'
                }}
              />
            )}

            {/* SLEEK MINIMALIST TECHNICAL METADATA OVERLAY */}
            {showHudOverlay && (
              <div
                id="photo-metadata-hud-overlay"
                className="absolute inset-0 pointer-events-none p-3 sm:p-5 flex flex-col justify-between animate-in fade-in duration-300"
              >
                {/* Top HUD Row: Optical Camera & Frame Resolution Telemetry */}
                <div className="flex justify-between items-start gap-2">
                  {/* Top-Left: Camera Body & Resolution */}
                  <div className="bg-black/75 backdrop-blur-md border border-neutral-800/90 text-neutral-300 p-2 sm:px-3 sm:py-2 text-[10px] sm:text-xs font-mono shadow-xl flex items-center gap-2.5">
                    <div className="flex items-center gap-1.5 text-white font-medium">
                      <Camera className="w-3.5 h-3.5 text-blue-400" />
                      <span>{photo.exif.camera}</span>
                    </div>
                    <span className="text-neutral-600 hidden sm:inline">|</span>
                    <span className="text-neutral-400 hidden sm:inline">3:2 FULL-FRAME</span>
                    <span className="text-neutral-600 hidden md:inline">|</span>
                    <span className="text-neutral-400 hidden md:inline">{photo.exif.lens}</span>
                  </div>

                  {/* Top-Right: Film Stock Emulation Type & ISO Density Simulation Badge */}
                  <div className="bg-black/75 backdrop-blur-md border border-neutral-800/90 p-2 sm:px-3 sm:py-2 text-[10px] sm:text-xs font-mono shadow-xl flex items-center gap-2 pointer-events-auto">
                    <div className="flex items-center gap-1.5">
                      <Film className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-[9px] text-neutral-400 uppercase hidden sm:inline">STOCK:</span>
                      <span className="font-semibold text-neutral-100">{currentFilm.name}</span>
                    </div>
                    <span className="text-neutral-600 hidden lg:inline">|</span>
                    <span className="text-[9px] text-amber-300 hidden lg:inline font-mono">
                      GRAIN {grainIntensity}% ({grainIntensity === 0 ? 'ISO 50' : grainIntensity <= 25 ? 'ISO 400' : grainIntensity <= 50 ? 'ISO 1600' : grainIntensity <= 75 ? 'ISO 6400' : 'ISO 12800'})
                    </span>
                  </div>
                </div>

                {/* Bottom HUD Row: Core Exposure Telemetry Bar (Aperture, Shutter Speed, ISO + Grain Slider, EV) */}
                <div className="flex justify-center sm:justify-start items-end pointer-events-auto">
                  <div className="bg-black/85 backdrop-blur-md border border-neutral-800/90 text-white p-2.5 sm:px-4 sm:py-2.5 shadow-2xl flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-xs">
                    {/* Aperture */}
                    <div className="flex items-center gap-1.5 group" title="Lens Aperture">
                      <Aperture className="w-3.5 h-3.5 text-blue-400" />
                      <div className="flex flex-col">
                        <span className="text-[8px] text-neutral-500 uppercase leading-none">APERTURE</span>
                        <span className="font-bold text-white text-xs sm:text-sm tracking-tight">{photo.exif.aperture}</span>
                      </div>
                    </div>

                    <div className="w-[1px] h-6 bg-neutral-800" />

                    {/* Shutter Speed */}
                    <div className="flex items-center gap-1.5" title="Shutter Speed">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <div className="flex flex-col">
                        <span className="text-[8px] text-neutral-500 uppercase leading-none">SHUTTER</span>
                        <span className="font-bold text-white text-xs sm:text-sm tracking-tight">{photo.exif.shutterSpeed}</span>
                      </div>
                    </div>

                    <div className="w-[1px] h-6 bg-neutral-800" />

                    {/* ISO Sensitivity & Film Grain Toggle / Slider */}
                    <div className="flex items-center gap-2" title="ISO Sensitivity & Simulated Film Grain Density">
                      <Zap className="w-3.5 h-3.5 text-emerald-400" />
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[8px] text-neutral-500 uppercase leading-none">ISO SENSITIVITY</span>
                          <span className="text-[8px] text-amber-400 font-bold leading-none">
                            {grainIntensity === 0 ? 'ISO 50' : grainIntensity <= 25 ? 'ISO 400' : grainIntensity <= 50 ? 'ISO 1600' : grainIntensity <= 75 ? 'ISO 6400' : 'ISO 12.8k'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="font-bold text-white text-xs tracking-tight">ISO {photo.exif.iso}</span>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            value={grainIntensity}
                            onChange={(e) => {
                              setGrainIntensity(parseInt(e.target.value));
                              sound.playDialClick();
                            }}
                            className="w-14 sm:w-16 h-1.5 accent-amber-400 bg-neutral-800 cursor-pointer"
                            title={`Film Grain Density: ${grainIntensity}%`}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-[1px] h-6 bg-neutral-800" />

                    {/* Exposure Compensation EV */}
                    <div className="flex items-center gap-1.5" title="Exposure Bias">
                      <Activity className="w-3.5 h-3.5 text-purple-400" />
                      <div className="flex flex-col">
                        <span className="text-[8px] text-neutral-500 uppercase leading-none">EV BIAS</span>
                        <span className="font-semibold text-neutral-200 text-xs sm:text-sm">
                          {exposure > 0 ? `+${exposure}` : exposure} EV
                        </span>
                      </div>
                    </div>

                    {/* Mini Simulated Histogram Waveform */}
                    <div className="hidden md:flex items-center gap-1 pl-1" title="Tonal Distribution Indicator">
                      <div className="flex items-end gap-0.5 h-4 w-12 px-1 bg-neutral-900 border border-neutral-800">
                        <span className="w-1.5 h-2 bg-blue-500/70" />
                        <span className="w-1.5 h-3 bg-neutral-400" />
                        <span className="w-1.5 h-4 bg-emerald-400" />
                        <span className="w-1.5 h-3 bg-amber-400" />
                        <span className="w-1.5 h-2.5 bg-neutral-400" />
                        <span className="w-1.5 h-1.5 bg-purple-400" />
                      </div>
                      <span className="text-[8px] text-neutral-500 font-mono">RGB</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          {/* 2.5x Optical Magnifier Loupe Floating Ring */}
          {loupeActive && (
            <div
              className="absolute pointer-events-none w-36 h-36 rounded-full border-2 border-emerald-400 shadow-[0_0_25px_rgba(0,0,0,0.9)] overflow-hidden hidden sm:block"
              style={{
                left: `${loupePos.x - 72}px`,
                top: `${loupePos.y - 72}px`,
                backgroundImage: `url(${photo.imageUrl})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '250%',
                backgroundPosition: `${loupePos.bgX}% ${loupePos.bgY}%`,
                filter: getFilterStyle()
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full border border-emerald-400 bg-emerald-500/30" />
              </div>
              <span className="absolute bottom-1 right-2 text-[8px] font-mono bg-black/80 text-emerald-400 px-1 py-0.2">
                2.5X
              </span>
            </div>
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={handleGoNext}
          className="absolute right-2 sm:right-4 z-20 p-3 bg-black/50 hover:bg-black/90 border border-neutral-800 text-white transition-all hover:scale-105 group cursor-pointer"
          aria-label="Next Photo"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Mobile Swipe Navigation Hint */}
      <div className="flex sm:hidden items-center justify-center gap-2 py-1 text-[10px] text-neutral-400 font-mono tracking-widest uppercase z-10 select-none">
        <ChevronLeft className="w-3 h-3 text-blue-400 animate-pulse" />
        <span>SWIPE TO NAVIGATE</span>
        <ChevronRight className="w-3 h-3 text-blue-400 animate-pulse" />
      </div>

      {/* Bottom EXIF & Narrative Panel */}
      <div
        className="bg-neutral-950/95 border border-neutral-800/80 p-4 sm:p-5 md:p-6 text-white max-w-5xl mx-auto w-full z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          {/* Title & Story */}
          <div className="md:col-span-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase">
                {photo.subcategory}
              </span>
              <span className="text-neutral-600">•</span>
              <span className="text-[10px] font-mono text-neutral-400">
                MASTER PRINT
              </span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
              {photo.title}
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed font-light line-clamp-2 md:line-clamp-3">
              {photo.story}
            </p>
            <div className="flex items-center gap-4 text-[11px] text-neutral-400 font-mono mt-3">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-blue-400" />
                {photo.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-blue-400" />
                {photo.year}
              </span>
            </div>
          </div>

          {/* EXIF Technical Details */}
          <div className="md:col-span-6 border-t md:border-t-0 md:border-l border-neutral-800 pt-3 md:pt-0 md:pl-6">
            <div className="flex justify-between items-center mb-2">
              <div className="text-[10px] tracking-widest uppercase text-neutral-500 font-mono">
                EXIF & OPTICS SPECIFICATIONS
              </div>
              <div className="flex items-center gap-1 text-[9px] font-mono text-emerald-400">
                <Sparkles className="w-2.5 h-2.5" />
                <span>AUTHENTIC EXIF</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
              <div className="p-2 bg-neutral-900 border border-neutral-800/80">
                <div className="text-[9px] text-neutral-500 flex items-center gap-1 mb-0.5">
                  <Camera className="w-2.5 h-2.5" /> CAMERA
                </div>
                <div className="text-neutral-200 truncate">{photo.exif.camera}</div>
              </div>

              <div className="p-2 bg-neutral-900 border border-neutral-800/80">
                <div className="text-[9px] text-neutral-500 flex items-center gap-1 mb-0.5">
                  <Aperture className="w-2.5 h-2.5" /> APERTURE
                </div>
                <div className="text-neutral-200">{photo.exif.aperture}</div>
              </div>

              <div className="p-2 bg-neutral-900 border border-neutral-800/80">
                <div className="text-[9px] text-neutral-500 flex items-center gap-1 mb-0.5">
                  <Clock className="w-2.5 h-2.5" /> SHUTTER
                </div>
                <div className="text-neutral-200">{photo.exif.shutterSpeed}</div>
              </div>

              <div className="p-2 bg-neutral-900 border border-neutral-800/80">
                <div className="text-[9px] text-neutral-500 flex items-center gap-1 mb-0.5">
                  <Zap className="w-2.5 h-2.5" /> ISO
                </div>
                <div className="text-neutral-200">ISO {photo.exif.iso}</div>
              </div>

              <div className="p-2 bg-neutral-900 border border-neutral-800/80 col-span-2">
                <div className="text-[9px] text-neutral-500 mb-0.5">LENS & FILM STOCK</div>
                <div className="text-neutral-200 truncate flex items-center justify-between">
                  <span>{photo.exif.lens}</span>
                  <span className="text-[10px] text-amber-400 uppercase font-semibold">{currentFilm.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

