import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface DramaticCTAProps {
  onOpenContact: () => void;
}

export const DramaticCTA: React.FC<DramaticCTAProps> = ({ onOpenContact }) => {
  return (
    <section
      id="dramatic-cta"
      className="min-h-[480px] sm:min-h-[550px] py-20 sm:py-28 w-full relative flex items-center justify-center overflow-hidden bg-black text-white select-none"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center grayscale opacity-75 scale-105 transition-transform duration-[10s] hover:scale-100"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC8dUDwfsm75m0Jyuu0J0EpwGoZ6EnJmgAwaV09FVYv0IE9MthRQg8uvU9TSdIwzlWcpT9SbrSJbe6e4UqRAUIqQY14bkfJTNMsekcuv2BGCZtYXKQAMvdByDSAIunVJDgQgyx59Rzh4FJATVTrGqNgvNER4mb8Z0MDchf5eB5lw7mLAknSNgFZafYJwUw46J0nzht_3B585sxiN1MbGMBLxI6jXX6iiVl9R0I4Aem1Gjko-Mc0g_J-dMfie8AtVEjCDw')`
        }}
      />
      <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />

      <div className="relative z-10 text-center px-4 sm:px-6 md:px-16 max-w-5xl flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.35em] uppercase text-blue-300 font-mono mb-4 sm:mb-6"
        >
          COMMISSIONING & INQUIRIES
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-2xl sm:text-4xl md:text-6xl lg:text-7xl text-white mb-8 sm:mb-12 tracking-tight leading-snug sm:leading-tight uppercase font-bold px-2"
        >
          LET'S CREATE SOMETHING<br />WORTH REMEMBERING.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            id="cta-inquire-btn"
            onClick={onOpenContact}
            className="inline-flex items-center gap-2.5 sm:gap-3 bg-white text-black font-semibold text-xs sm:text-sm px-8 sm:px-12 md:px-14 py-3.5 sm:py-4 md:py-5 hover:bg-neutral-200 transition-all duration-300 border border-white tracking-[0.2em] sm:tracking-[0.25em] uppercase cursor-pointer group shadow-2xl hover:scale-105"
          >
            <span>INQUIRE NOW</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 sm:mt-8 text-[10px] sm:text-[11px] tracking-wider sm:tracking-[0.2em] uppercase text-neutral-300 sm:text-neutral-400 font-mono"
        >
          DIRECT INQUIRIES • BESPOKE WORLDWIDE TRAVEL
        </motion.p>
      </div>

      {/* Background Photo EXIF & Location Badge */}
      <div className="absolute bottom-4 left-6 md:left-16 z-10 hidden sm:flex items-center gap-3 text-[10px] font-mono text-neutral-400 bg-black/60 backdrop-blur-md px-3 py-1.5 border border-neutral-800">
        <span className="text-white font-semibold">PLATE #10: FIELD EXPEDITION</span>
        <span className="text-neutral-600">|</span>
        <span>LEICA SL2-S • 35MM F/1.4</span>
        <span className="text-neutral-600">|</span>
        <span>1/400S • ISO 100</span>
        <span className="text-neutral-600">|</span>
        <span>HIMALAYAN HIGHLANDS</span>
      </div>
    </section>
  );
};

