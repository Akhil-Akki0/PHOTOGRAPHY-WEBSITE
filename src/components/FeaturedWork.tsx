import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { PhotoProject } from '../types';
import { COLOR_PROJECTS } from '../data/portfolioData';
import { sound } from '../utils/audioEngine';
import { ArrowRight, Maximize2, Camera } from 'lucide-react';

interface FeaturedWorkProps {
  onSelectPhoto: (photo: PhotoProject) => void;
  onViewAll: () => void;
}

interface ParallaxCardProps {
  photo: PhotoProject;
  className: string;
  aspectRatioClass: string;
  parallaxSpeed?: number;
  onSelect: (photo: PhotoProject) => void;
  badgeContent?: React.ReactNode;
}

const ParallaxFeaturedCard: React.FC<ParallaxCardProps> = ({
  photo,
  className,
  aspectRatioClass,
  parallaxSpeed = 35,
  onSelect,
  badgeContent
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [-parallaxSpeed, parallaxSpeed]);

  return (
    <motion.article
      ref={containerRef}
      id={`project-card-${photo.id}`}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => {
        sound.playShutterSound();
        onSelect(photo);
      }}
      onMouseEnter={() => sound.playFocusTick()}
      className={`${className} group cursor-pointer`}
    >
      <div
        className={`w-full ${aspectRatioClass} bg-neutral-200 overflow-hidden mb-4 sm:mb-6 relative border border-neutral-300 shadow-md`}
      >
        <motion.img
          src={photo.imageUrl}
          alt={photo.altText}
          style={{ y, scale: 1.12 }}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.16]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-500 flex items-end p-3 sm:p-5 opacity-0 group-hover:opacity-100">
          {badgeContent || (
            <span className="bg-white/95 text-black text-[9px] sm:text-[10px] tracking-wider sm:tracking-widest px-2.5 sm:px-3 py-1 sm:py-1.5 uppercase font-medium flex items-center gap-1.5 shadow-lg">
              <Camera className="w-3 h-3 text-blue-600" />
              <span>Inspect EXIF & Darkroom Tools</span>
            </span>
          )}
        </div>
      </div>
      <div className="flex justify-between items-end gap-2">
        <div>
          <p className="text-[11px] sm:text-[12px] tracking-[0.2em] text-blue-600 mb-1 sm:mb-2 font-semibold uppercase font-mono">
            {photo.category} • {photo.subcategory}
          </p>
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-neutral-900 font-bold group-hover:text-blue-700 transition-colors leading-snug">
            {photo.title}
          </h3>
          {photo.story && (
            <p className="text-xs sm:text-[13px] text-neutral-700 mt-1 sm:mt-2 line-clamp-1 max-w-lg leading-relaxed">
              {photo.story}
            </p>
          )}
        </div>
        <span className="font-mono text-sm sm:text-base md:text-lg font-bold text-blue-600 shrink-0">
          {photo.number}
        </span>
      </div>
    </motion.article>
  );
};

export const FeaturedWork: React.FC<FeaturedWorkProps> = ({ onSelectPhoto, onViewAll }) => {
  return (
    <section
      id="featured-work"
      className="pt-16 sm:pt-24 md:pt-36 pb-14 sm:pb-20 px-4 sm:px-6 md:px-16 max-w-[1440px] mx-auto border-t border-black/10 relative z-10 select-none"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-16 md:mb-24 pb-5 sm:pb-8 border-b border-black/10 gap-3"
      >
        <div>
          <span className="text-[11px] sm:text-[12px] tracking-[0.25em] sm:tracking-[0.3em] text-blue-600 font-semibold mb-1.5 sm:mb-2 block uppercase font-mono">
            COLLECTION I
          </span>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-serif font-bold text-neutral-900 uppercase leading-snug">
            SELECTED STORIES
          </h2>
        </div>

        <button
          onClick={() => {
            sound.playDialClick();
            onViewAll();
          }}
          onMouseEnter={() => sound.playFocusTick()}
          className="mt-2 md:mt-0 text-[11px] sm:text-[12px] tracking-[0.2em] text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1.5 sm:gap-2 font-semibold uppercase group cursor-pointer"
        >
          <span>EXPLORE ARCHIVE</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </motion.div>

      {/* Asymmetrical Grid with Parallax Depth */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
        {/* Project 01 - Large Left */}
        {COLOR_PROJECTS[0] && (
          <ParallaxFeaturedCard
            photo={COLOR_PROJECTS[0]}
            className="col-span-1 md:col-span-8"
            aspectRatioClass="aspect-[4/3]"
            parallaxSpeed={40}
            onSelect={onSelectPhoto}
          />
        )}

        {/* Column 9-12: Field Optics & Chromatic Sensor Analysis Photo Card (Fills previously blank top-right space) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => {
            if (COLOR_PROJECTS[0]) {
              sound.playShutterSound();
              onSelectPhoto(COLOR_PROJECTS[0]);
            }
          }}
          onMouseEnter={() => sound.playFocusTick()}
          className="col-span-1 md:col-span-4 bg-white/90 backdrop-blur-md border border-neutral-300 p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group mb-6 md:mb-0"
        >
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-3">
            <span className="text-[10px] font-mono tracking-widest uppercase text-blue-700 font-semibold flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-blue-600" />
              <span>OPTICAL BENCH & TELEMETRY</span>
            </span>
            <span className="text-[10px] font-mono text-neutral-500 font-bold">FE 600MM F/4</span>
          </div>

          <div className="aspect-[16/9] overflow-hidden bg-neutral-100 border border-neutral-200 mb-4 relative">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWrsBKg-LrCn3PfK21tXuka2ma6uBYaMc0pMY4pJuz8tkgfZuUwHZ3TziQppQeibHHpO13JMg6YLFABIU4KrbFrypUbmeoCbyLWnVnZlgqUaPaS20dz1iMkOLniOia2iHGLG7WqIB-Fj2mbrnUi090R6IFb9A1Srxv8tMwXW30JGivurV68uOFKZi6XUhwd9UdG1y0Qk80WP5HKU2BZYQyW0EdktLaAfhmrXw-h7vRlOD5VQjaOBkP6YKzQlEHqGxuOg"
              alt="Field calibration preview of natural flora and avian study"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2.5">
              <span className="text-[10px] font-mono text-white tracking-widest uppercase">
                CALIBRATED COLOR PROOF #01A
              </span>
            </div>
          </div>

          <p className="text-xs text-neutral-800 leading-relaxed mb-4 font-normal">
            Direct sunlight filtered through canopy mist. High shutter speeds isolate micro-feather diffraction with zero motion blur.
          </p>

          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono bg-neutral-100/90 p-2.5 border border-neutral-300 text-neutral-800">
            <div>
              <span className="text-neutral-600 block font-semibold text-[9px]">SHUTTER</span>
              <span className="font-bold text-neutral-900">1/2500 SEC</span>
            </div>
            <div>
              <span className="text-neutral-600 block font-semibold text-[9px]">APERTURE</span>
              <span className="font-bold text-neutral-900">F/4.0 WIDE OPEN</span>
            </div>
            <div>
              <span className="text-neutral-600 block font-semibold text-[9px]">SENSOR ISO</span>
              <span className="font-bold text-neutral-900">ISO 400 DUAL BASE</span>
            </div>
            <div>
              <span className="text-neutral-600 block font-semibold text-[9px]">DYNAMIC RANGE</span>
              <span className="font-bold text-neutral-900">15.2 STOPS</span>
            </div>
          </div>
        </motion.div>

        {/* Project 02 - Right Offset */}
        {COLOR_PROJECTS[1] && (
          <ParallaxFeaturedCard
            photo={COLOR_PROJECTS[1]}
            className="col-span-1 md:col-span-4 md:col-start-9 md:mt-12"
            aspectRatioClass="aspect-[3/4]"
            parallaxSpeed={30}
            onSelect={onSelectPhoto}
            badgeContent={
              <span className="bg-white/95 text-black text-[10px] tracking-widest px-2.5 py-1 uppercase font-medium flex items-center gap-1 shadow-lg">
                <Maximize2 className="w-3 h-3 text-blue-600" />
                <span>Inspect</span>
              </span>
            }
          />
        )}

        {/* Project 03 - Wide Center Panoramic */}
        {COLOR_PROJECTS[2] && (
          <ParallaxFeaturedCard
            photo={COLOR_PROJECTS[2]}
            className="col-span-1 md:col-span-12 mt-10 md:mt-16"
            aspectRatioClass="aspect-[16/9] md:aspect-[21/9]"
            parallaxSpeed={50}
            onSelect={onSelectPhoto}
            badgeContent={
              <span className="bg-white/95 text-black text-[10px] tracking-widest px-3 py-1.5 uppercase font-medium flex items-center gap-1.5 shadow-lg">
                <Camera className="w-3 h-3 text-blue-600" />
                <span>View Oceanic Masterpiece</span>
              </span>
            }
          />
        )}

        {/* Column 1-6: Marine Underwater Housing & Depth Field Study Photo Card (Fills previously blank left spot beside Project 04) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => {
            if (COLOR_PROJECTS[3]) {
              sound.playShutterSound();
              onSelectPhoto(COLOR_PROJECTS[3]);
            }
          }}
          onMouseEnter={() => sound.playFocusTick()}
          className="col-span-1 md:col-span-6 mt-8 md:mt-16 bg-white/90 backdrop-blur-md border border-neutral-300 p-6 shadow-md hover:shadow-xl transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-4">
            <span className="text-[11px] font-mono tracking-widest uppercase text-blue-700 font-semibold flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-blue-600" />
              <span>EXPEDITION REPORT: PELAGIC TRENCH</span>
            </span>
            <span className="text-[11px] font-mono text-neutral-500 font-bold">DEPTH: 40 FT</span>
          </div>

          <div className="aspect-[16/10] overflow-hidden bg-neutral-100 border border-neutral-200 mb-5 relative">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsJcLhozbCCa6A18u7lGM8e8_lMXXxmoa5a6w5KYOBccW4pbx9tlocqTb6cpXRwP3LTIWrOagf59uTEsqSdJZMzxsbkj6JXqdhfIyjJgqgVH4xiHUVEIq3LR85F_OIGR9cXCRfl4ewdw9LckloknvNaP3q4_Fv3zq3RCaIRqUeq41slQb7VcGKcBpnqQqJOTn-NipzXy4OQQlgcFBYJJ-yxh0B4mkdXUCvXwvZCJ4hmJ9eku5-AsF7idcHr2yGghFLmA"
              alt="Marine pelagic life gliding through deep crystal turquoise water"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3 bg-black/80 text-white px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase flex items-center gap-1">
              <span>HASSELBLAD 100MP MEDIUM FORMAT</span>
            </div>
            <div className="absolute bottom-3 right-3 bg-white/95 text-black px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-3 h-3 text-blue-600" />
              <span>EXPAND IN LIGHTBOX</span>
            </div>
          </div>

          <h4 className="font-serif text-2xl font-bold text-neutral-900 group-hover:text-blue-700 transition-colors mb-2">
            Hydrodynamic Refraction & Ambient Luminescence
          </h4>

          <p className="text-sm text-neutral-800 leading-relaxed mb-5 font-normal">
            Photographed in natural underwater sunlight without artificial strobes. Medium format 100-megapixel raw sensor captures individual sand grain caustics suspended in the pelagic column.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono bg-neutral-100/90 p-3 border border-neutral-300 text-neutral-800">
            <div>
              <span className="text-neutral-600 block text-[9px] font-semibold">LENS</span>
              <span className="font-bold text-neutral-900">XCD 21MM F/4</span>
            </div>
            <div>
              <span className="text-neutral-600 block text-[9px] font-semibold">EXPOSURE</span>
              <span className="font-bold text-neutral-900">1/500S • F/5.6</span>
            </div>
            <div>
              <span className="text-neutral-600 block text-[9px] font-semibold">COLOR PROFILE</span>
              <span className="font-bold text-neutral-900">HNCS 16-BIT</span>
            </div>
            <div>
              <span className="text-neutral-600 block text-[9px] font-semibold">LOCATION</span>
              <span className="font-bold text-neutral-900 truncate block">ANDAMAN SEA</span>
            </div>
          </div>
        </motion.div>

        {/* Project 04 - Right Offset Square */}
        {COLOR_PROJECTS[3] && (
          <ParallaxFeaturedCard
            photo={COLOR_PROJECTS[3]}
            className="col-span-1 md:col-span-6 md:col-start-7 mt-8 md:mt-16"
            aspectRatioClass="aspect-square"
            parallaxSpeed={35}
            onSelect={onSelectPhoto}
            badgeContent={
              <span className="bg-white/95 text-black text-[10px] tracking-widest px-3 py-1.5 uppercase font-medium flex items-center gap-1.5 shadow-lg">
                <Maximize2 className="w-3 h-3 text-blue-600" />
                <span>Inspect Details</span>
              </span>
            }
          />
        )}
      </div>
    </section>
  );
};
