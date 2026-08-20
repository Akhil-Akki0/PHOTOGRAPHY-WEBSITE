import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SERVICES, AKHIL_PROFILE } from '../data/portfolioData';
import { sound } from '../utils/audioEngine';
import { Plus, Minus, Check, ArrowRight, Camera, Sparkles, Sliders } from 'lucide-react';

interface ServicesSectionProps {
  onInquireService: (serviceName: string) => void;
}

// Visual previews for each service tier with authentic camera/lighting specs
const SERVICE_PREVIEWS = [
  {
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3vgZJYs9Vc0pmYe9qU88gpFzDEsiMleLVokDQbmqtR2iUebcN-rX-ri9OAICBzFb_kelDH6cUGxt3QPyicMlnPQZny4bAth4d1OxP64yC9-DGM6nDPJvTbMjobgSH9uHd726LDacSP7sAA4dv-bLrGMONjX6s59Ub1QnrIxqcsYxaREQZpHKr68B1UGJQs19hvWojanLaEeVESyi3EQLiehlySfknEG8KqgblM1_wQgLikI8YZlCbZWj-UVTVS4w2kg',
    caption: 'PORTRAIT LIGHTING BENCHMARK',
    specs: 'Leica SL2-S • 50mm f/1.4 • Natural North Light'
  },
  {
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIofDFt18ET_DNuQBV9OLiEBGJAEIXfKGAFGnxnITDcMXTc2tYEqGliS9WjQYrOG5JMpZB1OAUhH72rw4VBOVLnV9pBzeF6wrcjGo3KBdmxcc-M4918yuERk43Yg9vMW5zuap9X1-CcDs8K3Ry10vXNI-Fm_SUbriJfTFChnDmHjmYSKSR3HQ5lKGE9iC5COAOLBfaDzxyEmaaORyMqoLAN3NjOgKJB42TOSDrV4jyseb_apXxZ1FwHKFZZU1KVwaMRQ',
    caption: 'DOCUMENTARY RAW CAPTURE',
    specs: 'Sony α7R V • 1/2500s High Cadence • Unobtrusive'
  },
  {
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbEGVqkZPy4_xQ8OTkDnQhrORpW1fxqRFGBFmR8RAHdV70tNL6WCgjkeh6UqIep81laaBEfRP6QPYAJW90BINoZ9RSciZFLkXFL4QvcadWwUz21_J9D1mwFX5Pn1aT6YJiRSa8HVVfTRqCF-IHeWSHKkPcirDr5QqNRPf5oR7NSrgC-yB9FeOHiWjeXNICOfq4zuUGqliuM5xf5dgpEAVwjGNQsDXCOmNrH_NxxeApGknVVTNtc-0rGok3NFECHCWx1A',
    caption: 'BRAND SPATIAL & CINEMATIC SCALE',
    specs: 'Hasselblad 100MP • Fine-Art Color Grading'
  }
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onInquireService }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    sound.playDialClick();
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section
      id="services-section"
      className="pb-16 sm:pb-28 md:pb-40 px-4 sm:px-6 md:px-16 max-w-[1440px] mx-auto bg-black text-white select-none"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
        {/* Left Column: Heading, Status, and Field Methodology Photo Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-1 md:col-span-4 border-t border-neutral-800 pt-6 sm:pt-8 mb-4 md:mb-0 flex flex-col justify-between"
        >
          <div>
            <span className="text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-neutral-400 font-mono block mb-1.5 sm:mb-2">
              METHODOLOGY & COMMISSIONS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-bold tracking-tight uppercase leading-snug">
              OUR APPROACH
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 sm:text-neutral-400 mt-3 sm:mt-6 leading-relaxed max-w-sm">
              Every commission is an artistic partnership. We limit our annual client intake to ensure profound dedication to vision, pacing, and visual craftsmanship.
            </p>

            <div className="mt-4 sm:mt-6 p-3 sm:p-4 border border-neutral-800 bg-neutral-950">
              <span className="text-[9px] sm:text-[10px] tracking-wider sm:tracking-widest text-blue-400 uppercase font-mono block mb-1">
                CURRENT STATUS
              </span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-neutral-200">Accepting Q3/Q4 Commissions</span>
              </div>
            </div>
          </div>

          {/* Field Kit & Studio Philosophy Photo Card */}
          <div className="mt-6 sm:mt-8 border border-neutral-800 bg-neutral-950 p-3.5 sm:p-4 relative overflow-hidden group">
            <div className="aspect-[16/10] overflow-hidden bg-neutral-900 mb-2.5 sm:mb-3 relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8dUDwfsm75m0Jyuu0J0EpwGoZ6EnJmgAwaV09FVYv0IE9MthRQg8uvU9TSdIwzlWcpT9SbrSJbe6e4UqRAUIqQY14bkfJTNMsekcuv2BGCZtYXKQAMvdByDSAIunVJDgQgyx59Rzh4FJATVTrGqNgvNER4mb8Z0MDchf5eB5lw7mLAknSNgFZafYJwUw46J0nzht_3B585sxiN1MbGMBLxI6jXX6iiVl9R0I4Aem1Gjko-Mc0g_J-dMfie8AtVEjCDw"
                alt="Photographer field location camera setup"
                className="w-full h-full object-cover grayscale transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 text-[8px] sm:text-[9px] font-mono text-neutral-300 uppercase tracking-widest">
                ON LOCATION SPEC
              </div>
            </div>
            <div className="text-[10px] sm:text-[11px] font-mono font-semibold text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-blue-400" />
              <span>PRIMARY CAMERA ARSENAL</span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-neutral-300 sm:text-neutral-400 leading-relaxed font-mono">
              Leica M11 & SL2-S Primes • Hasselblad X2D Medium Format • Nauticam Underwater Depth Enclosures
            </p>
          </div>
        </motion.div>

        {/* Right Column: Service items list */}
        <div className="col-span-1 md:col-span-8 flex flex-col gap-6 sm:gap-10 md:gap-14">
          {SERVICES.map((service, index) => {
            const isExpanded = expandedIndex === index;
            const preview = SERVICE_PREVIEWS[index];

            return (
              <motion.div
                key={service.number}
                id={`service-item-${service.number}`}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="border-b border-neutral-800 pb-6 sm:pb-10 transition-colors group"
              >
                {/* Header Clickable Row */}
                <div
                  onClick={() => toggleExpand(index)}
                  onMouseEnter={() => sound.playFocusTick()}
                  className="flex justify-between items-start cursor-pointer group-hover:text-blue-300 transition-colors gap-3"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <h3 className="font-serif text-xl sm:text-3xl md:text-4xl text-white font-bold leading-snug">
                      {service.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                    <span className="font-mono text-xs text-neutral-400">
                      {service.number}
                    </span>
                    <button
                      className="p-1 rounded-none border border-neutral-700 text-neutral-400 group-hover:border-white group-hover:text-white transition-colors cursor-pointer"
                      aria-label="Expand service info"
                    >
                      {isExpanded ? <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                    </button>
                  </div>
                </div>

                {/* Short description */}
                <p className="text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl leading-relaxed mt-2.5 sm:mt-4">
                  {service.description}
                </p>

                {/* Expanded Details Accordion with Integrated Photography Preview & Specs */}
                {isExpanded && (
                  <div className="mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-neutral-900 grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 animate-in fade-in duration-300">
                    {/* Left: Deliverables & Inclusions */}
                    <div className="md:col-span-5">
                      <h4 className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-neutral-400 font-mono mb-2.5 sm:mb-3">
                        Included in Commission
                      </h4>
                      <ul className="space-y-2 sm:space-y-2.5">
                        {service.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                            <Check className="w-3.5 h-3.5 text-blue-400 mt-0.5 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Middle: Live Photo Case Study */}
                    {preview && (
                      <div className="md:col-span-3 border border-neutral-800 bg-neutral-950 p-2.5 flex flex-col justify-between">
                        <div>
                          <div className="aspect-[4/3] overflow-hidden bg-neutral-900 mb-2 relative">
                            <img
                              src={preview.imageUrl}
                              alt={preview.caption}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                            <div className="absolute top-1.5 left-1.5 bg-black/80 px-1.5 py-0.5 text-[8px] font-mono text-white uppercase">
                              REFERENCE FRAME
                            </div>
                          </div>
                          <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest block font-semibold">
                            {preview.caption}
                          </span>
                        </div>
                        <span className="text-[9px] font-mono text-neutral-400 mt-2 block border-t border-neutral-800 pt-1.5">
                          {preview.specs}
                        </span>
                      </div>
                    )}

                    {/* Right: Turnaround, Deliverables & CTA */}
                    <div className="md:col-span-4 flex flex-col justify-between p-3.5 sm:p-4 bg-neutral-950 border border-neutral-800">
                      <div>
                        <div className="text-[9px] sm:text-[10px] tracking-wider sm:tracking-widest uppercase text-neutral-400 font-mono mb-1">
                          Standard Turnaround
                        </div>
                        <div className="text-xs sm:text-sm font-semibold text-white mb-2.5 sm:mb-3 font-mono">
                          {service.turnaround}
                        </div>

                        <div className="text-[9px] sm:text-[10px] tracking-wider sm:tracking-widest uppercase text-neutral-400 font-mono mb-1">
                          Deliverables
                        </div>
                        <div className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed font-mono">
                          {service.deliverables}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          sound.playDialClick();
                          onInquireService(service.title);
                        }}
                        onMouseEnter={() => sound.playFocusTick()}
                        className="mt-4 sm:mt-6 w-full py-2.5 bg-white text-black text-[10px] sm:text-[11px] tracking-wider sm:tracking-widest uppercase font-semibold hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                      >
                        <span>Commission This Service</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


