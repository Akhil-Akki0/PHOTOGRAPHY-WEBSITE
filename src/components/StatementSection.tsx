import React from 'react';
import { motion } from 'motion/react';
import { AKHIL_PROFILE, COLOR_PROJECTS, GRAYSCALE_PROJECTS } from '../data/portfolioData';
import { PhotoProject } from '../types';
import { sound } from '../utils/audioEngine';
import { Camera, MapPin, Eye, Aperture, Compass, Sparkles, Sliders } from 'lucide-react';

interface StatementSectionProps {
  onSelectPhoto?: (photo: PhotoProject) => void;
}

export const StatementSection: React.FC<StatementSectionProps> = ({ onSelectPhoto }) => {
  // Companion study photos for the Artistic Thesis
  const thesisPhotoLeft = COLOR_PROJECTS[1]; // Blossom Duet
  const thesisPhotoRight = GRAYSCALE_PROJECTS[0]; // Shadow Hunter

  return (
    <section
      id="statement-section"
      className="py-14 sm:py-24 md:py-36 px-4 sm:px-6 md:px-16 max-w-[1440px] mx-auto relative z-10 select-none"
    >
      {/* Central Statement & Philosophy */}
      <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-16 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6"
        >
          <span className="h-[1px] w-6 sm:w-12 bg-blue-400" />
          <span className="text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-blue-700 font-semibold font-mono flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>ARTISTIC THESIS & PHILOSOPHY</span>
          </span>
          <span className="h-[1px] w-6 sm:w-12 bg-blue-400" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-neutral-900 leading-snug sm:leading-tight md:leading-[1.2] tracking-tight font-bold px-2"
        >
          "We photograph people, places and stories with an honest, cinematic eye."
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 sm:mt-6 flex flex-col items-center justify-center"
        >
          <span className="text-[11px] sm:text-[12px] tracking-[0.2em] sm:tracking-[0.25em] text-neutral-900 uppercase font-mono font-bold">
            AKHIL.A — PRINCIPAL PHOTOGRAPHER
          </span>
          <span className="text-[10px] sm:text-[11px] tracking-wider sm:tracking-widest text-neutral-700 mt-1 uppercase font-mono font-medium">
            {AKHIL_PROFILE.studioName} • {AKHIL_PROFILE.location}
          </span>
        </motion.div>
      </div>

      {/* Visual Diptych with Rich Photo Metadata & Field Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 mt-8 sm:mt-12">
        {/* Left Photo Study: Chromatic Daylight */}
        {thesisPhotoLeft && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => {
              sound.playShutterSound();
              if (onSelectPhoto) onSelectPhoto(thesisPhotoLeft);
            }}
            onMouseEnter={() => sound.playFocusTick()}
            className="group cursor-pointer bg-white/90 backdrop-blur-md border border-neutral-300 p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Photo Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 border border-neutral-300 mb-4 sm:mb-6">
                <img
                  src={thesisPhotoLeft.imageUrl}
                  alt={thesisPhotoLeft.altText}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 bg-black/85 backdrop-blur-sm text-white px-2 sm:px-2.5 py-1 text-[9px] sm:text-[10px] font-mono tracking-widest uppercase flex items-center gap-1.5 border border-white/20">
                  <Camera className="w-3 h-3 text-blue-400" />
                  <span>STUDY 01: CHROMATIC FLEETING LIGHT</span>
                </div>
                <div className="absolute bottom-2.5 sm:bottom-3 right-2.5 sm:right-3 bg-white text-black px-2 sm:px-2.5 py-1 text-[9px] sm:text-[10px] font-mono tracking-widest uppercase flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                  <Eye className="w-3 h-3 text-blue-600" />
                  <span>CLICK TO INSPECT FULL EXIF</span>
                </div>
              </div>

              {/* Photo Title & Location */}
              <div className="flex justify-between items-start mb-2 sm:mb-3">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-mono tracking-wider sm:tracking-widest text-blue-700 font-bold uppercase block mb-1">
                    {thesisPhotoLeft.category} / {thesisPhotoLeft.subcategory}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 group-hover:text-blue-700 transition-colors leading-snug">
                    {thesisPhotoLeft.title}
                  </h3>
                </div>
                <span className="font-mono text-xs sm:text-sm font-bold text-neutral-600">
                  REF #02A
                </span>
              </div>

              {/* Photo Story / Field Context */}
              <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed mb-5 sm:mb-6 font-normal">
                {thesisPhotoLeft.story}
              </p>
            </div>

            {/* Photo Technical Specs Breakdown Bar */}
            <div className="pt-3.5 sm:pt-4 border-t border-neutral-200 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-[10px] sm:text-[11px] font-mono text-neutral-800 bg-neutral-100/90 p-2.5 sm:p-3 border border-neutral-200">
              <div>
                <span className="text-[9px] text-neutral-600 block uppercase font-semibold">CAMERA</span>
                <span className="font-bold text-neutral-900">{thesisPhotoLeft.exif?.camera}</span>
              </div>
              <div>
                <span className="text-[9px] text-neutral-600 block uppercase font-semibold">OPTICS</span>
                <span className="font-bold text-neutral-900">{thesisPhotoLeft.exif?.focalLength} • {thesisPhotoLeft.exif?.aperture}</span>
              </div>
              <div>
                <span className="text-[9px] text-neutral-600 block uppercase font-semibold">EXPOSURE</span>
                <span className="font-bold text-neutral-900">{thesisPhotoLeft.exif?.shutterSpeed} • ISO {thesisPhotoLeft.exif?.iso}</span>
              </div>
              <div>
                <span className="text-[9px] text-neutral-600 block uppercase font-semibold">LOCATION</span>
                <span className="font-bold text-neutral-900 flex items-center gap-1 truncate">
                  <MapPin className="w-2.5 h-2.5 text-blue-600 shrink-0" />
                  <span className="truncate">{thesisPhotoLeft.location}</span>
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Right Photo Study: Shadow & Tonal Geometry */}
        {thesisPhotoRight && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => {
              sound.playShutterSound();
              if (onSelectPhoto) onSelectPhoto(thesisPhotoRight);
            }}
            onMouseEnter={() => sound.playFocusTick()}
            className="group cursor-pointer bg-neutral-900 text-white border border-neutral-800 p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Photo Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950 border border-neutral-800 mb-4 sm:mb-6">
                <img
                  src={thesisPhotoRight.imageUrl}
                  alt={thesisPhotoRight.altText}
                  className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105 group-hover:contrast-125"
                  loading="lazy"
                />
                <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 bg-black/85 backdrop-blur-sm text-neutral-200 px-2 sm:px-2.5 py-1 text-[9px] sm:text-[10px] font-mono tracking-widest uppercase flex items-center gap-1.5 border border-neutral-700">
                  <Aperture className="w-3 h-3 text-amber-400" />
                  <span>STUDY 02: MONOCHROME TONAL DYNAMICS</span>
                </div>
                <div className="absolute bottom-2.5 sm:bottom-3 right-2.5 sm:right-3 bg-white text-black px-2 sm:px-2.5 py-1 text-[9px] sm:text-[10px] font-mono tracking-widest uppercase flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                  <Eye className="w-3 h-3 text-black" />
                  <span>INSPECT ZONE SYSTEM</span>
                </div>
              </div>

              {/* Photo Title & Location */}
              <div className="flex justify-between items-start mb-2 sm:mb-3">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-mono tracking-wider sm:tracking-widest text-amber-400 font-bold uppercase block mb-1">
                    {thesisPhotoRight.category} / {thesisPhotoRight.subcategory}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-amber-200 transition-colors leading-snug">
                    {thesisPhotoRight.title}
                  </h3>
                </div>
                <span className="font-mono text-xs sm:text-sm font-bold text-neutral-400">
                  REF #05B
                </span>
              </div>

              {/* Photo Story / Field Context */}
              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed mb-5 sm:mb-6 font-normal">
                {thesisPhotoRight.story}
              </p>
            </div>

            {/* Photo Technical Specs Breakdown Bar */}
            <div className="pt-3.5 sm:pt-4 border-t border-neutral-800 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-[10px] sm:text-[11px] font-mono text-neutral-300 bg-neutral-950/90 p-2.5 sm:p-3 border border-neutral-800">
              <div>
                <span className="text-[9px] text-neutral-400 block uppercase font-semibold">SENSOR</span>
                <span className="font-bold text-white">{thesisPhotoRight.exif?.camera}</span>
              </div>
              <div>
                <span className="text-[9px] text-neutral-400 block uppercase font-semibold">GLASS</span>
                <span className="font-bold text-white">{thesisPhotoRight.exif?.lens?.split(' ')[0] || 'Leica APO'} • {thesisPhotoRight.exif?.aperture}</span>
              </div>
              <div>
                <span className="text-[9px] text-neutral-400 block uppercase font-semibold">ACTUATION</span>
                <span className="font-bold text-white">{thesisPhotoRight.exif?.shutterSpeed} • ISO {thesisPhotoRight.exif?.iso}</span>
              </div>
              <div>
                <span className="text-[9px] text-neutral-400 block uppercase font-semibold">FIELD SITE</span>
                <span className="font-bold text-white flex items-center gap-1 truncate">
                  <MapPin className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                  <span className="truncate">{thesisPhotoRight.location}</span>
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};


