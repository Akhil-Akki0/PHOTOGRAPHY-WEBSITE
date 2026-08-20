import React, { useState, useEffect } from 'react';
import { PhotoProject } from '../types';
import { COLOR_PROJECTS, GRAYSCALE_PROJECTS } from '../data/portfolioData';
import { sound, ShutterSoundProfile } from '../utils/audioEngine';
import { X, Filter, Maximize2, Keyboard, Volume2, Sparkles, Camera } from 'lucide-react';

interface ArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPhoto: (photo: PhotoProject) => void;
}

const SOUND_PROFILES: Array<{
  id: ShutterSoundProfile;
  label: string;
  sublabel: string;
  description: string;
}> = [
  {
    id: 'vintageSLR',
    label: 'Vintage SLR',
    sublabel: 'Nikon F3 / Titanium Curtain',
    description: 'Crisp mechanical mirror flip with rich metal curtain clack'
  },
  {
    id: 'modernMirrorless',
    label: 'Modern Mirrorless',
    sublabel: 'Sony α1 / High-Cadence',
    description: 'Ultra-fast electronic-mechanical leaf tick with zero lag'
  },
  {
    id: 'rangefinder',
    label: 'Rangefinder',
    sublabel: 'Leica M / Cloth Focal Plane',
    description: 'Subtle, damped whisper of a quiet cloth focal plane shutter'
  },
  {
    id: 'mediumFormat',
    label: 'Medium Format',
    sublabel: 'Hasselblad X2D / Leaf Shutter',
    description: 'Deep resonant body thud with central leaf aperture pulse'
  }
];

export const ArchiveModal: React.FC<ArchiveModalProps> = ({
  isOpen,
  onClose,
  onSelectPhoto
}) => {
  const [filter, setFilter] = useState<'ALL' | 'COLOR' | 'MONOCHROME' | 'NATURE' | 'OCEAN' | 'WILDLIFE'>('ALL');
  const [currentSoundProfile, setCurrentSoundProfile] = useState<ShutterSoundProfile>(sound.getSoundProfile());

  const allProjects = [...COLOR_PROJECTS, ...GRAYSCALE_PROJECTS];

  const filteredPhotos = allProjects.filter((photo) => {
    if (filter === 'ALL') return true;
    if (filter === 'COLOR') return !photo.isGrayscale;
    if (filter === 'MONOCHROME') return !!photo.isGrayscale;
    if (filter === 'NATURE') return photo.category === 'NATURE';
    if (filter === 'OCEAN') return photo.category === 'OCEAN';
    if (filter === 'WILDLIFE') return photo.category === 'WILDLIFE' || photo.subcategory === 'WILDLIFE';
    return true;
  });

  useEffect(() => {
    if (isOpen) {
      setCurrentSoundProfile(sound.getSoundProfile());
    }
  }, [isOpen]);

  const handleSelectSoundProfile = (profile: ShutterSoundProfile) => {
    sound.setSoundProfile(profile);
    setCurrentSoundProfile(profile);
  };

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
      id="archive-gallery-modal"
      className="fixed inset-0 z-[85] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-300 select-none"
      onClick={onClose}
    >
      <div
        className="bg-[#faf9f7] text-[#1a1c1b] max-w-6xl w-full max-h-[92vh] overflow-y-auto border border-neutral-300 shadow-2xl p-6 sm:p-10 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <div className="absolute top-6 right-6 flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono uppercase text-neutral-400 border border-neutral-200 px-2 py-1 bg-neutral-50">
            <Keyboard className="w-3 h-3 text-neutral-500" />
            <span>[ESC] TO CLOSE</span>
          </div>
          <button
            onClick={() => {
              sound.playDialClick();
              onClose();
            }}
            className="p-2 text-neutral-500 hover:text-black border border-neutral-300 hover:border-black transition-colors cursor-pointer"
            aria-label="Close Archive"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Header */}
        <div className="mb-6">
          <span className="text-xs font-mono text-blue-600 uppercase tracking-widest block mb-1">
            COMPLETE PORTFOLIO ARCHIVE & PREFERENCES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
            Selected Works by Akhil
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            Browse full series across landscape, avian, ocean, and monochrome studies.
          </p>
        </div>

        {/* SOUND PROFILE SETTING CARD */}
        <div className="mb-8 p-4 sm:p-5 bg-white border border-neutral-300 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-800">
                Camera Shutter Sound Profile
              </span>
              <span className="text-[10px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 border border-blue-200 uppercase">
                ACTIVE: {SOUND_PROFILES.find(p => p.id === currentSoundProfile)?.label}
              </span>
            </div>
            <span className="text-[11px] text-neutral-400 font-mono">
              Click profile below to test actuation sound sample
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {SOUND_PROFILES.map((profile) => {
              const isActive = currentSoundProfile === profile.id;
              return (
                <button
                  key={profile.id}
                  onClick={() => handleSelectSoundProfile(profile.id)}
                  onMouseEnter={() => sound.playFocusTick()}
                  className={`p-3 text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'border-blue-600 bg-blue-50/70 text-blue-900 shadow-sm ring-1 ring-blue-600/30'
                      : 'border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100 text-neutral-700 hover:border-neutral-400'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono font-bold uppercase flex items-center gap-1.5">
                        <Camera className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-neutral-500'}`} />
                        <span>{profile.label}</span>
                      </span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500 block mb-1.5 font-medium">
                      {profile.sublabel}
                    </span>
                    <p className="text-[11px] text-neutral-600 leading-snug">
                      {profile.description}
                    </p>
                  </div>
                  <span className={`mt-2.5 text-[9px] font-mono uppercase tracking-widest ${isActive ? 'text-blue-700 font-semibold' : 'text-neutral-400'}`}>
                    {isActive ? '✓ CURRENT SELECTION' : 'CLICK TO AUDITION'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-neutral-200">
          <div className="flex items-center gap-1 text-xs font-mono uppercase text-neutral-500 mr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Series:</span>
          </div>
          {(['ALL', 'COLOR', 'MONOCHROME', 'NATURE', 'OCEAN', 'WILDLIFE'] as const).map((tag) => (
            <button
              key={tag}
              onClick={() => {
                sound.playDialClick();
                setFilter(tag);
              }}
              onMouseEnter={() => sound.playFocusTick()}
              className={`px-3 py-1 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                filter === tag
                  ? 'bg-black text-white font-semibold'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Grid of photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => {
                sound.playShutterSound();
                onClose();
                onSelectPhoto(photo);
              }}
              onMouseEnter={() => sound.playFocusTick()}
              className="group cursor-pointer border border-neutral-200 bg-white p-3 hover:border-black transition-all shadow-sm hover:shadow-md"
            >
              <div className="aspect-[4/3] bg-neutral-100 overflow-hidden mb-3 relative">
                <img
                  src={photo.imageUrl}
                  alt={photo.altText}
                  className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                    photo.isGrayscale ? 'grayscale' : ''
                  }`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="p-2 bg-white/95 text-black text-xs font-mono uppercase flex items-center gap-1 shadow">
                    <Maximize2 className="w-3 h-3" />
                    <span>View Frame & EXIF</span>
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] tracking-widest text-blue-600 uppercase font-mono block">
                    {photo.category} • {photo.subcategory}
                  </span>
                  <h4 className="font-serif font-bold text-base text-neutral-900 group-hover:text-blue-600 transition-colors">
                    {photo.title}
                  </h4>
                </div>
                <span className="text-xs font-mono text-neutral-400">
                  {photo.number}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
