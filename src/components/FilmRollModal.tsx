import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, RotateCcw, Camera, Film, Sparkles, CheckCircle2, ChevronRight, Eye } from 'lucide-react';
import { PhotoProject } from '../types';
import { sound } from '../utils/audioEngine';

export interface ExposedFrame {
  frameNumber: number;
  photo?: PhotoProject;
  title: string;
  timestamp: number;
  type: 'inspection' | 'snapshot' | 'lightbox';
}

interface FilmRollModalProps {
  isOpen: boolean;
  onClose: () => void;
  exposureCount: number;
  maxExposures?: number;
  exposedFrames: ExposedFrame[];
  onReloadRoll: () => void;
  onSelectPhoto: (photo: PhotoProject) => void;
  currentFilmStock: string;
  onChangeFilmStock: (stock: string) => void;
  rollsCompleted: number;
}

export const FILM_STOCKS = [
  { id: 'portra400', name: 'KODAK PORTRA 400', iso: 'ISO 400', type: 'Color Negative', color: 'border-amber-500/70 text-amber-400' },
  { id: 'hp5', name: 'ILFORD HP5 PLUS', iso: 'ISO 400', type: 'B&W Panchromatic', color: 'border-neutral-400 text-neutral-300' },
  { id: 'cinestill800', name: 'CINESTILL 800T', iso: 'ISO 800', type: 'Tungsten Color', color: 'border-cyan-500/70 text-cyan-400' },
  { id: 'trix400', name: 'KODAK TRI-X 400', iso: 'ISO 400', type: 'High Contrast B&W', color: 'border-zinc-400 text-zinc-300' },
  { id: 'velvia50', name: 'FUJIFILM VELVIA 50', iso: 'ISO 50', type: 'Daylight Reversal', color: 'border-emerald-500/70 text-emerald-400' }
];

export const FilmRollModal: React.FC<FilmRollModalProps> = ({
  isOpen,
  onClose,
  exposureCount,
  maxExposures = 36,
  exposedFrames,
  onReloadRoll,
  onSelectPhoto,
  currentFilmStock,
  onChangeFilmStock,
  rollsCompleted
}) => {
  if (!isOpen) return null;

  const isRollFull = exposureCount >= maxExposures;
  const remaining = Math.max(0, maxExposures - exposureCount);
  const percentage = Math.min(100, Math.round((exposureCount / maxExposures) * 100));

  const activeStockInfo = FILM_STOCKS.find((s) => s.id === currentFilmStock) || FILM_STOCKS[0];

  const handleFrameClick = (frame: ExposedFrame) => {
    if (frame.photo) {
      sound.playShutterSound();
      onSelectPhoto(frame.photo);
      onClose();
    }
  };

  const handleReload = () => {
    sound.playFilmRewind();
    onReloadRoll();
  };

  return (
    <AnimatePresence>
      <div
        id="film-roll-modal-backdrop"
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="bg-neutral-950 border border-neutral-800 text-white w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto"
        >
          {/* Modal Header */}
          <div className="p-4 sm:p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/60">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-black border border-neutral-700 text-amber-400">
                <Film className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] tracking-[0.25em] text-amber-400 font-mono font-semibold uppercase">
                    35MM CARTRIDGE EMULSION SIMULATOR
                  </span>
                  {isRollFull && (
                    <span className="px-1.5 py-0.5 bg-red-950 text-red-400 border border-red-800 text-[9px] font-mono tracking-wider animate-pulse uppercase">
                      ROLL FULL
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-lg sm:text-2xl text-white font-medium">
                  {activeStockInfo.name} • {activeStockInfo.iso}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800 transition-colors"
              aria-label="Close Film Roll Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
            {/* Film Canister HUD & Gauge Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-neutral-900/40 p-4 sm:p-5 border border-neutral-800">
              {/* Canister Art / Info */}
              <div className="md:col-span-5 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-800 pb-4 md:pb-0 md:pr-4">
                <div>
                  <span className="text-[10px] tracking-widest text-neutral-500 font-mono uppercase block mb-1">
                    CURRENT LOADED CASSETTE
                  </span>
                  <div className="font-mono text-xl text-amber-400 font-bold tracking-wider">
                    EXP: {exposureCount} / {maxExposures}
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">
                    {remaining > 0
                      ? `${remaining} unexposed frames ready on spool`
                      : 'Roll fully exposed. Rewind to load fresh roll.'}
                  </p>
                </div>

                {/* Film Stock Switcher */}
                <div className="mt-4">
                  <span className="text-[10px] tracking-widest text-neutral-500 font-mono uppercase block mb-2">
                    SELECT FILM EMULSION
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {FILM_STOCKS.map((stock) => (
                      <button
                        key={stock.id}
                        onClick={() => {
                          sound.playDialClick();
                          onChangeFilmStock(stock.id);
                        }}
                        className={`text-[10px] font-mono px-2 py-1 border transition-all cursor-pointer ${
                          currentFilmStock === stock.id
                            ? `${stock.color} bg-black font-semibold shadow-sm`
                            : 'border-neutral-800 text-neutral-500 hover:text-neutral-300 hover:bg-neutral-900'
                        }`}
                      >
                        {stock.name.replace('KODAK ', '').replace('FUJIFILM ', '').replace('ILFORD ', '')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress Gauge & Stats */}
              <div className="md:col-span-7 flex flex-col justify-between md:pl-2">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[10px] tracking-widest text-neutral-400 font-mono uppercase">
                      EXPOSURE GAUGE (36-FRAME SPOOL)
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {percentage}% CONSUMED
                    </span>
                  </div>

                  {/* 36-segment sprocket progress bar */}
                  <div className="grid grid-cols-12 sm:grid-cols-18 md:grid-cols-36 gap-0.5 bg-black p-1.5 border border-neutral-800">
                    {Array.from({ length: maxExposures }).map((_, i) => {
                      const isExposed = i < exposureCount;
                      const isCurrent = i === exposureCount - 1;
                      return (
                        <div
                          key={i}
                          title={`Frame #${i + 1} ${isExposed ? '(Exposed)' : '(Unexposed)'}`}
                          className={`h-6 rounded-none transition-all duration-300 ${
                            isCurrent
                              ? 'bg-amber-400 ring-1 ring-white animate-pulse'
                              : isExposed
                              ? 'bg-amber-600/80 hover:bg-amber-500'
                              : 'bg-neutral-800/60'
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Action / Reload */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-800/60">
                  <div className="text-[11px] font-mono text-neutral-400">
                    ROLLS ARCHIVED: <span className="text-white font-bold">{rollsCompleted}</span>
                  </div>

                  <button
                    onClick={handleReload}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-mono tracking-wider transition-all hover:scale-102 cursor-pointer group"
                    title="Rewind film into canister and load a fresh 36-frame roll"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-400 group-hover:-rotate-90 transition-transform duration-300" />
                    <span>{isRollFull ? 'REWIND & LOAD FRESH ROLL' : 'RELOAD SPOOL (RESET)'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 35mm Film Negative Strip Visualization */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs tracking-[0.2em] uppercase font-mono text-neutral-400 flex items-center gap-2">
                  <Camera className="w-3.5 h-3.5 text-blue-400" />
                  <span>35MM CONTACT PROOF STRIP (RECENT EXPOSURES)</span>
                </span>
                <span className="text-[11px] font-mono text-neutral-500">
                  CLICK ANY FRAME TO INSPECT
                </span>
              </div>

              {/* Horizontal Film Strip Container */}
              <div className="bg-black border border-neutral-800 p-3 sm:p-4 overflow-x-auto shadow-inner select-none">
                {/* Top Sprockets */}
                <div className="flex gap-2 mb-2 justify-start min-w-[700px]">
                  {Array.from({ length: 28 }).map((_, idx) => (
                    <div key={`sprocket-top-${idx}`} className="w-3 h-2 bg-neutral-900 border border-neutral-800 rounded-xs" />
                  ))}
                </div>

                {/* Negative Frames Grid / Horizontal Reel */}
                <div className="flex gap-3 min-w-[700px] py-1">
                  {exposedFrames.length === 0 ? (
                    <div className="w-full py-8 text-center border border-dashed border-neutral-800 text-neutral-500 text-xs font-mono">
                      [ NO EXPOSURES YET. CLICK ANY PHOTO, NAVIGATE LIGHTBOX, OR SNAP SHUTTER TO ADVANCE FILM ROLL ]
                    </div>
                  ) : (
                    exposedFrames.map((frame, idx) => (
                      <div
                        key={`${frame.frameNumber}-${idx}`}
                        onClick={() => handleFrameClick(frame)}
                        className="w-36 flex-shrink-0 bg-neutral-950 border border-neutral-800 hover:border-amber-400/80 transition-all p-1.5 group cursor-pointer relative"
                      >
                        {/* Frame Number Marker */}
                        <div className="flex justify-between items-center text-[9px] font-mono text-neutral-400 px-1 mb-1">
                          <span className="text-amber-400 font-bold">#{String(frame.frameNumber).padStart(2, '0')}</span>
                          <span className="text-[8px] uppercase text-neutral-600">{frame.type}</span>
                        </div>

                        {/* Image Thumbnail */}
                        <div className="aspect-[3/2] bg-neutral-900 overflow-hidden relative border border-neutral-800/80">
                          {frame.photo?.imageUrl ? (
                            <img
                              src={frame.photo.imageUrl}
                              alt={frame.photo.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 filter group-hover:contrast-105"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-neutral-600">
                              <Camera className="w-5 h-5 mb-1 text-neutral-700" />
                              <span className="text-[9px] font-mono">SHUTTER SNAP</span>
                            </div>
                          )}

                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <Eye className="w-4 h-4 text-white drop-shadow-md" />
                          </div>
                        </div>

                        {/* Caption */}
                        <div className="mt-1 text-[10px] text-neutral-300 truncate font-mono">
                          {frame.title || 'Exposed Frame'}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Bottom Sprockets & DX Code Simulation */}
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-900 min-w-[700px]">
                  <div className="flex gap-2">
                    {Array.from({ length: 28 }).map((_, idx) => (
                      <div key={`sprocket-bot-${idx}`} className="w-3 h-2 bg-neutral-900 border border-neutral-800 rounded-xs" />
                    ))}
                  </div>
                  <div className="text-[8px] font-mono text-neutral-600 tracking-widest uppercase pr-2">
                    SAFETY FILM • DX CODE 018492 • LEICA M EMULSION
                  </div>
                </div>
              </div>
            </div>

            {/* Explanatory Craft Note */}
            <div className="p-3 bg-neutral-900/30 border border-neutral-800/70 text-[11px] text-neutral-400 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>How it works:</strong> Every time you inspect an artwork in the lightbox, examine archives, or trigger the camera shutter, a frame is exposed on your 36-shot 35mm roll. When you finish 36 exposures, rewind and load a fresh roll!
              </span>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-4 border-t border-neutral-800 bg-neutral-900/80 flex items-center justify-between">
            <div className="text-xs font-mono text-neutral-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>CAMERA SPOOL SYNCHRONIZED</span>
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2 bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-neutral-200 transition-colors font-mono cursor-pointer"
            >
              CLOSE CASSETTE
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
