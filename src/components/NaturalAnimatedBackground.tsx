import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Wind, Sun, Mountain, Sparkles } from 'lucide-react';

export type NatureAtmosphere = 'mist' | 'goldenHour' | 'alpineForest' | 'desertDune';

interface AtmosphereConfig {
  name: string;
  gradient1: string;
  gradient2: string;
  gradient3: string;
  particleColor: string;
  accentAura: string;
}

const ATMOSPHERES: Record<NatureAtmosphere, AtmosphereConfig> = {
  mist: {
    name: 'Coastal Mist',
    gradient1: 'radial-gradient(ellipse 80% 60% at 20% 30%, rgba(214, 226, 230, 0.65) 0%, rgba(245, 243, 238, 0) 70%)',
    gradient2: 'radial-gradient(ellipse 70% 50% at 85% 65%, rgba(220, 228, 222, 0.55) 0%, rgba(245, 243, 238, 0) 70%)',
    gradient3: 'radial-gradient(ellipse 90% 70% at 50% 90%, rgba(210, 218, 224, 0.5) 0%, rgba(245, 243, 238, 0) 80%)',
    particleColor: 'rgba(140, 165, 175, 0.45)',
    accentAura: 'rgba(180, 205, 215, 0.3)'
  },
  goldenHour: {
    name: 'Golden Hour',
    gradient1: 'radial-gradient(ellipse 80% 60% at 25% 25%, rgba(254, 235, 200, 0.7) 0%, rgba(247, 243, 235, 0) 70%)',
    gradient2: 'radial-gradient(ellipse 75% 55% at 80% 70%, rgba(253, 218, 170, 0.55) 0%, rgba(247, 243, 235, 0) 70%)',
    gradient3: 'radial-gradient(ellipse 90% 80% at 50% 40%, rgba(255, 245, 225, 0.6) 0%, rgba(247, 243, 235, 0) 80%)',
    particleColor: 'rgba(215, 160, 75, 0.55)',
    accentAura: 'rgba(240, 185, 110, 0.35)'
  },
  alpineForest: {
    name: 'Alpine Pines',
    gradient1: 'radial-gradient(ellipse 80% 60% at 15% 40%, rgba(215, 228, 215, 0.65) 0%, rgba(244, 245, 240, 0) 70%)',
    gradient2: 'radial-gradient(ellipse 70% 60% at 85% 30%, rgba(198, 216, 205, 0.55) 0%, rgba(244, 245, 240, 0) 70%)',
    gradient3: 'radial-gradient(ellipse 90% 70% at 50% 85%, rgba(210, 225, 212, 0.5) 0%, rgba(244, 245, 240, 0) 80%)',
    particleColor: 'rgba(110, 155, 125, 0.45)',
    accentAura: 'rgba(145, 185, 155, 0.3)'
  },
  desertDune: {
    name: 'Desert Earth',
    gradient1: 'radial-gradient(ellipse 80% 60% at 30% 20%, rgba(248, 230, 212, 0.7) 0%, rgba(247, 244, 238, 0) 70%)',
    gradient2: 'radial-gradient(ellipse 75% 55% at 75% 80%, rgba(240, 215, 192, 0.55) 0%, rgba(247, 244, 238, 0) 70%)',
    gradient3: 'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(245, 235, 220, 0.5) 0%, rgba(247, 244, 238, 0) 80%)',
    particleColor: 'rgba(195, 145, 110, 0.45)',
    accentAura: 'rgba(215, 165, 130, 0.3)'
  }
};

interface NaturalAnimatedBackgroundProps {
  atmosphere?: NatureAtmosphere;
}

export const NaturalAnimatedBackground: React.FC<NaturalAnimatedBackgroundProps> = ({
  atmosphere = 'goldenHour'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentAtm = ATMOSPHERES[atmosphere];

  // Canvas floating nature spores & light motes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle system (floating spore particles / ambient golden dust motes)
    const particleCount = 42;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.8 + 0.8,
      speedX: (Math.random() - 0.45) * 0.35,
      speedY: -Math.random() * 0.4 - 0.1, // Drifting gently upwards like outdoor dust motes
      opacity: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.01
    }));

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Render gentle drifting particles
      particles.forEach((p) => {
        p.x += p.speedX + Math.sin(time + p.pulse) * 0.15;
        p.y += p.speedY;
        p.pulse += p.pulseSpeed;

        // Wrap edges smoothly
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        const currentOpacity = p.opacity * (0.6 + Math.sin(p.pulse) * 0.4);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = currentAtm.particleColor.replace(/[\d.]+\)$/, `${currentOpacity})`);
        ctx.shadowColor = currentAtm.particleColor;
        ctx.shadowBlur = p.radius * 2.5;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [atmosphere, currentAtm]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Base warm nature earth tone canvas */}
      <div className="absolute inset-0 bg-[#f7f5f0] transition-colors duration-1000" />

      {/* Layer 1: Animated Organic Sun-Dappled & Mist Aura (Floating Caustic Glows) */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -35, 25, 0],
          scale: [1, 1.08, 0.96, 1]
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute -top-[20%] -left-[10%] w-[120%] h-[120%] opacity-90 transition-all duration-1000 filter blur-2xl"
        style={{ background: currentAtm.gradient1 }}
      />

      {/* Layer 2: Secondary Organic Nature Caustic Drift */}
      <motion.div
        animate={{
          x: [0, -45, 35, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.95, 1.1, 1]
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute -top-[10%] -right-[15%] w-[130%] h-[130%] opacity-80 transition-all duration-1000 filter blur-3xl"
        style={{ background: currentAtm.gradient2 }}
      />

      {/* Layer 3: Central Deep Atmospheric Breathing Ground */}
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.65, 0.85, 0.65]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute inset-0 transition-all duration-1000 filter blur-3xl"
        style={{ background: currentAtm.gradient3 }}
      />

      {/* Layer 4: Elegant Animated Natural Topographic Elevation Waves */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.045] mix-blend-multiply"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,200 C300,140 600,280 900,190 C1200,100 1350,220 1440,180 L1440,900 L0,900 Z"
          fill="none"
          stroke="#1a1c1b"
          strokeWidth="1.5"
          animate={{
            d: [
              'M0,200 C300,140 600,280 900,190 C1200,100 1350,220 1440,180 L1440,900 L0,900 Z',
              'M0,230 C320,190 580,130 920,240 C1180,160 1380,180 1440,220 L1440,900 L0,900 Z',
              'M0,200 C300,140 600,280 900,190 C1200,100 1350,220 1440,180 L1440,900 L0,900 Z'
            ]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M0,350 C360,400 700,260 1020,380 C1240,320 1380,390 1440,340 L1440,900 L0,900 Z"
          fill="none"
          stroke="#1a1c1b"
          strokeWidth="1.2"
          animate={{
            d: [
              'M0,350 C360,400 700,260 1020,380 C1240,320 1380,390 1440,340 L1440,900 L0,900 Z',
              'M0,320 C340,310 680,410 1000,320 C1260,390 1360,330 1440,370 L1440,900 L0,900 Z',
              'M0,350 C360,400 700,260 1020,380 C1240,320 1380,390 1440,340 L1440,900 L0,900 Z'
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M0,520 C280,480 620,580 960,490 C1190,560 1370,480 1440,530 L1440,900 L0,900 Z"
          fill="none"
          stroke="#1a1c1b"
          strokeWidth="1.5"
          animate={{
            d: [
              'M0,520 C280,480 620,580 960,490 C1190,560 1370,480 1440,530 L1440,900 L0,900 Z',
              'M0,550 C310,560 640,470 940,540 C1220,470 1350,550 1440,500 L1440,900 L0,900 Z',
              'M0,520 C280,480 620,580 960,490 C1190,560 1370,480 1440,530 L1440,900 L0,900 Z'
            ]
          }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M0,700 C400,640 760,740 1080,670 C1280,630 1390,720 1440,680 L1440,900 L0,900 Z"
          fill="none"
          stroke="#1a1c1b"
          strokeWidth="1"
          animate={{
            d: [
              'M0,700 C400,640 760,740 1080,670 C1280,630 1390,720 1440,680 L1440,900 L0,900 Z',
              'M0,670 C380,720 740,650 1100,710 C1260,670 1370,640 1440,710 L1440,900 L0,900 Z',
              'M0,700 C400,640 760,740 1080,670 C1280,630 1390,720 1440,680 L1440,900 L0,900 Z'
            ]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>

      {/* Layer 5: Canvas of Floating Spores / Golden Motes */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full mix-blend-multiply opacity-80"
      />

      {/* Layer 6: Subtle Tactile 35mm Analog Film Grain Texture */}
      <div className="absolute inset-0 noise-overlay opacity-35 mix-blend-overlay" />

      {/* Layer 7: Gentle Vignette framing the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.04)_100%)] pointer-events-none" />
    </div>
  );
};
