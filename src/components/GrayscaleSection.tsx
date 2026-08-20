import React from 'react';
import { motion } from 'motion/react';
import { PhotoProject } from '../types';
import { GRAYSCALE_PROJECTS } from '../data/portfolioData';
import { sound } from '../utils/audioEngine';
import { Maximize2, Camera, Sparkles } from 'lucide-react';

interface GrayscaleSectionProps {
  onSelectPhoto: (photo: PhotoProject) => void;
}

export const GrayscaleSection: React.FC<GrayscaleSectionProps> = ({ onSelectPhoto }) => {
  const handlePhotoClick = (photo: PhotoProject) => {
    sound.playShutterSound();
    onSelectPhoto(photo);
  };

  return (
    <div id="monochrome-archive" className="bg-black text-white transition-colors duration-1000">
      {/* Editorial Header */}
      <div className="pt-24 md:pt-36 px-6 md:px-16 max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end pb-8 border-b border-neutral-800"
        >
          <div>
            <span className="text-[12px] tracking-[0.3em] text-neutral-400 font-semibold mb-2 block uppercase font-mono">
              COLLECTION II • MONOCHROME
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white uppercase">
              THE SHADOW ARCHIVE
            </h2>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2 text-neutral-400 text-xs tracking-widest uppercase font-mono">
            <Camera className="w-4 h-4 text-neutral-500" />
            <span>LEICA MONOCHROM & HASSELBLAD STUDY</span>
          </div>
        </motion.div>
      </div>

      {/* Featured Monochrome Work Continued */}
      <section className="pb-24 pt-16 md:pt-20 px-6 md:px-16 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Project 05 - Large Left */}
          {GRAYSCALE_PROJECTS[0] && (
            <motion.article
              id={`project-card-${GRAYSCALE_PROJECTS[0].id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handlePhotoClick(GRAYSCALE_PROJECTS[0])}
              onMouseEnter={() => sound.playFocusTick()}
              className="col-span-1 md:col-span-8 group cursor-pointer"
            >
              <div className="w-full aspect-[4/3] bg-neutral-900 overflow-hidden mb-6 relative border border-neutral-800">
                <img
                  src={GRAYSCALE_PROJECTS[0].imageUrl}
                  alt={GRAYSCALE_PROJECTS[0].altText}
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-[1.03] group-hover:contrast-125"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-end p-6 opacity-0 group-hover:opacity-100">
                  <span className="bg-white text-black text-[10px] tracking-widest px-3 py-1.5 uppercase font-medium flex items-center gap-1.5 shadow-xl">
                    <Maximize2 className="w-3 h-3" />
                    <span>Examine High-Contrast Grain</span>
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[12px] tracking-[0.2em] text-neutral-400 mb-2 font-semibold uppercase font-mono">
                    {GRAYSCALE_PROJECTS[0].category} • {GRAYSCALE_PROJECTS[0].subcategory}
                  </p>
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-bold group-hover:text-neutral-300 transition-colors">
                    {GRAYSCALE_PROJECTS[0].title}
                  </h3>
                  <p className="text-[13px] text-neutral-400 mt-2 line-clamp-1 max-w-lg">
                    {GRAYSCALE_PROJECTS[0].story}
                  </p>
                </div>
                <span className="font-mono text-base md:text-lg font-bold text-neutral-400">
                  {GRAYSCALE_PROJECTS[0].number}
                </span>
              </div>
            </motion.article>
          )}

          {/* Project 06 - Small Right Offset */}
          {GRAYSCALE_PROJECTS[1] && (
            <motion.article
              id={`project-card-${GRAYSCALE_PROJECTS[1].id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handlePhotoClick(GRAYSCALE_PROJECTS[1])}
              onMouseEnter={() => sound.playFocusTick()}
              className="col-span-1 md:col-span-4 md:col-start-9 md:mt-36 group cursor-pointer"
            >
              <div className="w-full aspect-[3/4] bg-neutral-900 overflow-hidden mb-6 relative border border-neutral-800">
                <img
                  src={GRAYSCALE_PROJECTS[1].imageUrl}
                  alt={GRAYSCALE_PROJECTS[1].altText}
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-[1.03] group-hover:contrast-125"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-end p-4 opacity-0 group-hover:opacity-100">
                  <span className="bg-white text-black text-[10px] tracking-widest px-2.5 py-1 uppercase font-medium flex items-center gap-1 shadow-xl">
                    <Maximize2 className="w-3 h-3" />
                    <span>Inspect</span>
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[12px] tracking-[0.2em] text-neutral-400 mb-2 font-semibold uppercase font-mono">
                    {GRAYSCALE_PROJECTS[1].category} • {GRAYSCALE_PROJECTS[1].subcategory}
                  </p>
                  <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-white font-bold group-hover:text-neutral-300 transition-colors">
                    {GRAYSCALE_PROJECTS[1].title}
                  </h3>
                </div>
                <span className="font-mono text-base md:text-lg font-bold text-neutral-400">
                  {GRAYSCALE_PROJECTS[1].number}
                </span>
              </div>
            </motion.article>
          )}

          {/* Project 07 - Wide Center */}
          {GRAYSCALE_PROJECTS[2] && (
            <motion.article
              id={`project-card-${GRAYSCALE_PROJECTS[2].id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handlePhotoClick(GRAYSCALE_PROJECTS[2])}
              onMouseEnter={() => sound.playFocusTick()}
              className="col-span-1 md:col-span-12 group cursor-pointer mt-12 md:mt-16"
            >
              <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-neutral-900 overflow-hidden mb-6 relative border border-neutral-800">
                <img
                  src={GRAYSCALE_PROJECTS[2].imageUrl}
                  alt={GRAYSCALE_PROJECTS[2].altText}
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-[1.03] group-hover:contrast-125"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-end p-6 opacity-0 group-hover:opacity-100">
                  <span className="bg-white text-black text-[10px] tracking-widest px-3 py-1.5 uppercase font-medium flex items-center gap-1.5 shadow-xl">
                    <Maximize2 className="w-3 h-3" />
                    <span>View Nocturnal Encounter</span>
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[12px] tracking-[0.2em] text-neutral-400 mb-2 font-semibold uppercase font-mono">
                    {GRAYSCALE_PROJECTS[2].category} • {GRAYSCALE_PROJECTS[2].subcategory}
                  </p>
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-bold group-hover:text-neutral-300 transition-colors">
                    {GRAYSCALE_PROJECTS[2].title}
                  </h3>
                  <p className="text-[13px] text-neutral-400 mt-2 line-clamp-1 max-w-xl">
                    {GRAYSCALE_PROJECTS[2].story}
                  </p>
                </div>
                <span className="font-mono text-base md:text-lg font-bold text-neutral-400">
                  {GRAYSCALE_PROJECTS[2].number}
                </span>
              </div>
            </motion.article>
          )}

          {/* Column 1-6: Zone System Tonal Gradient & Optical Glass Study (Fills previously blank left spot beside Project 08) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => {
              if (GRAYSCALE_PROJECTS[3]) {
                sound.playShutterSound();
                handlePhotoClick(GRAYSCALE_PROJECTS[3]);
              }
            }}
            onMouseEnter={() => sound.playFocusTick()}
            className="col-span-1 md:col-span-6 mt-8 md:mt-16 bg-neutral-900/90 backdrop-blur-md border border-neutral-800 p-6 shadow-2xl transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
              <span className="text-[11px] font-mono tracking-widest uppercase text-amber-400 font-semibold flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-amber-400" />
                <span>ZONE SYSTEM TONAL ANALYSIS</span>
              </span>
              <span className="text-[11px] font-mono text-neutral-400 font-bold">LEICA M11 MONOCHROM</span>
            </div>

            <div className="aspect-[16/10] overflow-hidden bg-neutral-950 border border-neutral-800 mb-5 relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuArD9IKHnCgN9W2T8YQL1m_jIcd6UAqLW2cOLDHmIBLl0gTgJGSJ_bEbtrBdhoxqxR1kUT3eqIVFLkuy9-svPHsq0RHPgeWZoELXlmpaj70hb_5gHeqtnH61Hd-8RgZW2nJkziyZVnN9dgaBXJJD4zrpXGp3gp_AkYer_40dCQH-vzcrPvClv4bYFlR86lH4ZwPVlteRqeOTq77Kw01QxLiOAnEdaFP7y2162kDUuc0w3QpflOM4MEL9o1CiLFDhPUx0Q"
                alt="Highland silhouette and weathered alpine canopy texture"
                className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105 group-hover:contrast-125"
              />
              <div className="absolute top-3 left-3 bg-black/85 text-neutral-200 px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase flex items-center gap-1 border border-neutral-700">
                <span>ZONE III — ZONE VIII TONAL SPECTRUM</span>
              </div>
              <div className="absolute bottom-3 right-3 bg-white text-black px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                <Maximize2 className="w-3 h-3 text-black" />
                <span>INSPECT SILVER GELATIN TONING</span>
              </div>
            </div>

            <h4 className="font-serif text-2xl font-bold text-white group-hover:text-amber-200 transition-colors mb-2">
              Granite Solitude & Cloud Forest Contrast
            </h4>

            <p className="text-sm text-neutral-300 leading-relaxed mb-5">
              Pure luminance recorded without a color filter array. The absence of Bayer interpolation delivers unmatched edge sharpness and true organic film-like gradation.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono bg-black/80 p-3 border border-neutral-800 text-neutral-200">
              <div>
                <span className="text-neutral-400 block text-[9px] font-semibold">LENS</span>
                <span className="font-semibold text-white">XCD 135MM F/2.8</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[9px] font-semibold">SHUTTER</span>
                <span className="font-semibold text-white">1/1000 SEC</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[9px] font-semibold">GRAIN RECIPE</span>
                <span className="font-semibold text-white">ILFORD HP5+ 400</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[9px] font-semibold">ELEVATION</span>
                <span className="font-semibold text-white">7,400 FT MSL</span>
              </div>
            </div>
          </motion.div>

          {/* Project 08 - Right Offset */}
          {GRAYSCALE_PROJECTS[3] && (
            <motion.article
              id={`project-card-${GRAYSCALE_PROJECTS[3].id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handlePhotoClick(GRAYSCALE_PROJECTS[3])}
              onMouseEnter={() => sound.playFocusTick()}
              className="col-span-1 md:col-span-6 md:col-start-7 group cursor-pointer mt-8 md:mt-16"
            >
              <div className="w-full aspect-square bg-neutral-900 overflow-hidden mb-6 relative border border-neutral-800">
                <img
                  src={GRAYSCALE_PROJECTS[3].imageUrl}
                  alt={GRAYSCALE_PROJECTS[3].altText}
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-[1.03] group-hover:contrast-125"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-end p-6 opacity-0 group-hover:opacity-100">
                  <span className="bg-white text-black text-[10px] tracking-widest px-3 py-1.5 uppercase font-medium flex items-center gap-1.5 shadow-xl">
                    <Maximize2 className="w-3 h-3" />
                    <span>Inspect Details</span>
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[12px] tracking-[0.2em] text-neutral-400 mb-2 font-semibold uppercase font-mono">
                    {GRAYSCALE_PROJECTS[3].category} • {GRAYSCALE_PROJECTS[3].subcategory}
                  </p>
                  <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-white font-bold group-hover:text-neutral-300 transition-colors">
                    {GRAYSCALE_PROJECTS[3].title}
                  </h3>
                </div>
                <span className="font-mono text-base md:text-lg font-bold text-neutral-400">
                  {GRAYSCALE_PROJECTS[3].number}
                </span>
              </div>
            </motion.article>
          )}
        </div>
      </section>

      {/* FULL WIDTH IMAGE BREAK - SILENCE WITH TELEMETRY BLUEPRINT */}
      <section className="w-full min-h-[550px] md:min-h-[650px] bg-black overflow-hidden relative mb-28 md:mb-40 group select-none flex flex-col justify-between py-12 px-6 md:px-16">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIEO9HTA6Ulss49K9LIKQS-v8iU7yb89BFt5MVMy4SQ6EAvhNS34H_Vv-YWiFfA4NV9pbSPbmIYXdrOtPwaBrBvpzmsEIrwrrxSRSKqFaPThQW-34YOJFszxaga0wn_uqe3CuLBoM5hUnGtRM8eO_CYXE142R-K_lNoodx8J_OXh89HOwkqYYZhLZZyFrlN4gNm2YpeNcEIEWjEKKTPBqK3r3hV-pBume7EhV9rOa3sVy1kMYRwOJx"
          alt="Abstract texture of dark water surface ripples"
          className="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-[15s] ease-out group-hover:scale-105 opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />

        {/* Top Blueprint Bar */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-neutral-400 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-white font-semibold tracking-wider">PLATE #09: NOCTURNAL WATER MOTION STUDY</span>
          </div>
          <div className="flex items-center gap-4 text-neutral-400">
            <span>OPTICS: 35MM SUMMILUX ASPH</span>
            <span>SHUTTER: 8.0 SEC LONG EXPOSURE</span>
            <span>ISO: 100</span>
          </div>
        </div>

        {/* Center Typography & Artistic Statement */}
        <div className="relative z-10 flex flex-col items-center justify-center my-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-[11px] tracking-[0.4em] uppercase text-neutral-300 font-mono mb-4 flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>AESTHETIC INTERLUDE</span>
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 0.95, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-6xl sm:text-8xl md:text-[9rem] lg:text-[11rem] leading-none text-white tracking-[-0.05em] font-bold select-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]"
          >
            SILENCE
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-xs sm:text-sm tracking-[0.25em] uppercase text-neutral-200 max-w-md font-mono"
          >
            "In stillness, nature tells its unfiltered story." — Akhil
          </motion.p>
        </div>

        {/* Bottom Technical Telemetry & Darkroom Recipe Bar */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 text-[10px] font-mono text-neutral-300 bg-black/70 backdrop-blur-md p-4">
          <div>
            <span className="text-neutral-400 block uppercase text-[9px] font-semibold">LUMINANCE SPECTRUM</span>
            <span className="text-white font-medium">HIGH CONTRAST SILVER GELATIN</span>
          </div>
          <div>
            <span className="text-neutral-400 block uppercase text-[9px] font-semibold">FIELD SITE COORDINATES</span>
            <span className="text-white font-medium">10°56'N, 76°44'E • SILENT VALLEY</span>
          </div>
          <div>
            <span className="text-neutral-400 block uppercase text-[9px] font-semibold">OPTICAL APERTURE</span>
            <span className="text-white font-medium">F/11 DIFFRACTION LIMIT</span>
          </div>
          <div>
            <span className="text-neutral-400 block uppercase text-[9px] font-semibold">ARCHIVAL MASTERING</span>
            <span className="text-white font-medium">HOHNLE 300GSM COTTON RAG</span>
          </div>
        </div>
      </section>
    </div>
  );
};

