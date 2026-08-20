import React, { useEffect, useState } from 'react';
import { sound } from '../utils/audioEngine';

interface CameraReticleCursorProps {
  enabled: boolean;
}

export const CameraReticleCursor: React.FC<CameraReticleCursorProps> = ({ enabled }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHoveringPhoto, setIsHoveringPhoto] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      const isPhoto = !!target?.closest('article, [id^="project-card-"], #hero-section, img');
      
      if (isPhoto && !isHoveringPhoto) {
        setIsHoveringPhoto(true);
        sound.playFocusTick();
      } else if (!isPhoto && isHoveringPhoto) {
        setIsHoveringPhoto(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enabled, isHoveringPhoto, isVisible]);

  if (!enabled || !isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-opacity duration-200 hidden md:block"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        left: 0,
        top: 0
      }}
    >
      {/* Central Crosshair dot */}
      <div
        className={`-translate-x-1/2 -translate-y-1/2 transition-all duration-150 ${
          isClicking
            ? 'w-6 h-6 bg-red-500/80 scale-75'
            : isHoveringPhoto
            ? 'w-10 h-10 border border-emerald-400 bg-emerald-500/10'
            : 'w-4 h-4 border border-white/60 bg-black/20 backdrop-invert'
        } flex items-center justify-center`}
      >
        {/* Tiny center dot */}
        <div
          className={`w-1 h-1 rounded-full ${
            isHoveringPhoto ? 'bg-emerald-400' : 'bg-white'
          }`}
        />

        {/* Viewfinder Telemetry when hovering photo */}
        {isHoveringPhoto && (
          <>
            {/* Top Left Bracket */}
            <span className="absolute -top-1.5 -left-1.5 w-2 h-2 border-t-2 border-l-2 border-emerald-400" />
            {/* Top Right Bracket */}
            <span className="absolute -top-1.5 -right-1.5 w-2 h-2 border-t-2 border-r-2 border-emerald-400" />
            {/* Bottom Left Bracket */}
            <span className="absolute -bottom-1.5 -left-1.5 w-2 h-2 border-b-2 border-l-2 border-emerald-400" />
            {/* Bottom Right Bracket */}
            <span className="absolute -bottom-1.5 -right-1.5 w-2 h-2 border-b-2 border-r-2 border-emerald-400" />

            {/* Camera Viewfinder Live Data Tag */}
            <div className="absolute left-6 -top-3 whitespace-nowrap bg-black/80 text-emerald-400 border border-emerald-500/40 text-[9px] font-mono px-1.5 py-0.5 tracking-wider flex items-center gap-1.5 shadow-lg">
              <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse rounded-full" />
              <span>AF-LOCK • 50mm f/1.4</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
