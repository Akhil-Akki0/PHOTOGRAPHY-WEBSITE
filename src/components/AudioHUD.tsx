import React, { useState, useEffect } from 'react';
import { sound } from '../utils/audioEngine';
import { Volume2, VolumeX, Music, Disc, Camera, Film, Sun, Wind, Trees, Compass, Activity, Sparkles, Gauge } from 'lucide-react';
import { NatureAtmosphere } from './NaturalAnimatedBackground';

interface AudioHUDProps {
  reticleEnabled: boolean;
  onToggleReticle: () => void;
  onTakeSnapshot: () => void;
  exposureCount: number;
  maxExposures?: number;
  onOpenFilmRoll: () => void;
  currentFilmStock?: string;
  atmosphere: NatureAtmosphere;
  onCycleAtmosphere: () => void;
}

export const AudioHUD: React.FC<AudioHUDProps> = ({
  reticleEnabled,
  onToggleReticle,
  onTakeSnapshot,
  exposureCount,
  maxExposures = 36,
  onOpenFilmRoll,
  currentFilmStock = 'portra400',
  atmosphere,
  onCycleAtmosphere
}) => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [ambientPlaying, setAmbientPlaying] = useState(sound.isAmbientActive());

  // Real-time Optical Light Meter Telemetry
  const [evValue, setEvValue] = useState<number>(13.4);
  const [meterDeviation, setMeterDeviation] = useState<number>(0); // -2 to +2 scale needle

  useEffect(() => {
    setIsMuted(sound.getMuted());
    setAmbientPlaying(sound.isAmbientActive());
  }, []);

  // Fluctuating real-time light meter calculation based on atmosphere
  useEffect(() => {
    let baseEV = 13.5;
    if (atmosphere === 'goldenHour') baseEV = 13.6;
    else if (atmosphere === 'mist') baseEV = 10.4;
    else if (atmosphere === 'alpineForest') baseEV = 11.8;
    else if (atmosphere === 'desertDune') baseEV = 15.2;

    const interval = setInterval(() => {
      // Natural photodiode variance & micro-fluctuations
      const jitter = (Math.sin(Date.now() / 1200) * 0.25) + ((Math.random() - 0.5) * 0.18);
      const calculatedEV = parseFloat((baseEV + jitter).toFixed(1));
      setEvValue(calculatedEV);
      // Deviation from center 0 EV
      setMeterDeviation(parseFloat((jitter * 2).toFixed(1)));
    }, 700);

    return () => clearInterval(interval);
  }, [atmosphere]);

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sound.playDialClick();
    }
  };

  const handleToggleAmbient = () => {
    const active = sound.toggleAmbientSoundtrack();
    setAmbientPlaying(active);
    sound.playDialClick();
  };

  const handleShutterActuation = () => {
    onTakeSnapshot();
  };

  const isRollFull = exposureCount >= maxExposures;
  const progressPercent = Math.min(100, Math.round((exposureCount / maxExposures) * 100));

  const getAtmosphereIcon = () => {
    switch (atmosphere) {
      case 'goldenHour':
        return <Sun className="w-3.5 h-3.5 text-amber-400" />;
      case 'mist':
        return <Wind className="w-3.5 h-3.5 text-cyan-300" />;
      case 'alpineForest':
        return <Trees className="w-3.5 h-3.5 text-emerald-400" />;
      case 'desertDune':
        return <Compass className="w-3.5 h-3.5 text-orange-400" />;
      default:
        return <Sun className="w-3.5 h-3.5 text-amber-400" />;
    }
  };

  const getAtmosphereLabel = () => {
    switch (atmosphere) {
      case 'goldenHour':
        return 'GOLDEN';
      case 'mist':
        return 'MIST';
      case 'alpineForest':
        return 'ALPINE';
      case 'desertDune':
        return 'DUNE';
    }
  };

  // Get suggested shutter & aperture based on EV
  const getExposureSuggestion = () => {
    if (evValue >= 15.0) return '1/2000s • f/5.6';
    if (evValue >= 13.0) return '1/500s • f/4.0';
    if (evValue >= 11.5) return '1/250s • f/2.8';
    return '1/125s • f/2.0';
  };

  return (
    <>
      {/* Floating Bottom Right Camera Tooling & Film Roll HUD */}
      <div
        id="camera-audio-hud"
        className="fixed bottom-6 right-4 sm:right-6 z-40 flex items-center gap-1.5 sm:gap-2 bg-black/90 backdrop-blur-md border border-neutral-700/80 p-1.5 shadow-2xl text-white select-none max-w-[calc(100vw-2rem)]"
      >
        {/* REAL-TIME OPTICAL LIGHT METER WIDGET */}
        <div
          id="hud-optical-light-meter"
          onClick={() => {
            sound.playFocusTick();
          }}
          className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-neutral-950 border border-neutral-800 text-white font-mono cursor-pointer group hover:border-neutral-600 transition-colors"
          title={`Photodiode Light Meter • Atmosphere: ${atmosphere.toUpperCase()} • Suggested: ${getExposureSuggestion()}`}
        >
          <div className="flex flex-col items-start leading-none">
            <div className="flex items-center gap-1 text-[8px] text-neutral-400 uppercase">
              <Activity className="w-2.5 h-2.5 text-purple-400 animate-pulse" />
              <span>METER</span>
            </div>
            <span className="text-[11px] font-bold text-emerald-400">
              EV {evValue}
            </span>
          </div>

          {/* Micro Analog Needle Scale [-2 .. ▲ .. +2] */}
          <div className="flex flex-col items-center gap-0.5">
            <div className="flex items-center gap-0.5 text-[7px] text-neutral-400 font-mono">
              <span>-2</span>
              <span>-1</span>
              <span className="text-white font-bold">0</span>
              <span>+1</span>
              <span>+2</span>
            </div>
            <div className="w-14 h-1.5 bg-neutral-900 border border-neutral-700 relative overflow-hidden flex items-center justify-center">
              {/* Zero center tick */}
              <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-neutral-500" />
              {/* Moving photodiode needle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-emerald-400 shadow-sm transition-all duration-500"
                style={{
                  left: `calc(50% + ${Math.max(-24, Math.min(24, meterDeviation * 14))}px)`
                }}
              />
            </div>
          </div>

          {/* Suggested Exposure Reading */}
          <div className="hidden lg:flex flex-col text-[9px] text-neutral-400 border-l border-neutral-800 pl-2">
            <span className="text-[7px] text-neutral-400 uppercase">CALCULATED</span>
            <span className="text-neutral-200 font-semibold">{getExposureSuggestion()}</span>
          </div>
        </div>

        {/* Visual 35mm Film Roll Indicator */}
        <button
          id="hud-film-roll-trigger"
          onClick={() => {
            sound.playDialClick();
            onOpenFilmRoll();
          }}
          className={`px-2 py-1.5 border transition-all flex flex-col justify-center gap-1 text-[11px] font-mono tracking-wider cursor-pointer group relative ${
            isRollFull
              ? 'border-amber-500/90 bg-amber-950/40 text-amber-300 shadow-sm animate-pulse'
              : exposureCount > 0
              ? 'border-amber-600/60 bg-neutral-900/90 text-amber-400 hover:border-amber-400'
              : 'border-neutral-700 text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
          title="35mm Film Roll Exposure Counter (Click to inspect contact sheet & cartridge)"
        >
          <div className="flex items-center gap-1.5">
            <Film className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${isRollFull ? 'text-amber-300' : 'text-amber-400'}`} />
            <span className="font-bold">
              EXP {exposureCount}/{maxExposures}
            </span>
            {isRollFull && (
              <span className="text-[8px] bg-red-900/80 text-red-200 px-1 font-semibold uppercase">FULL</span>
            )}
          </div>

          {/* Micro Progress Bar on bottom of Film Roll button */}
          <div className="w-full h-1 bg-neutral-950 overflow-hidden border border-neutral-800">
            <div
              className={`h-full transition-all duration-300 ${
                isRollFull ? 'bg-red-500' : 'bg-gradient-to-r from-amber-600 to-amber-400'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </button>

        {/* Nature Atmosphere Mood Changer */}
        <button
          id="hud-atmosphere-trigger"
          onClick={() => {
            sound.playDialClick();
            onCycleAtmosphere();
          }}
          className="p-2 border border-neutral-700 hover:border-neutral-500 transition-all flex items-center gap-1.5 text-[11px] font-mono tracking-wider cursor-pointer group hover:bg-neutral-800"
          title={`Switch Natural Background Atmosphere (Current: ${atmosphere})`}
        >
          {getAtmosphereIcon()}
          <span className="hidden sm:inline text-neutral-300 group-hover:text-white">
            {getAtmosphereLabel()}
          </span>
        </button>

        {/* Shutter Snapshot Button */}
        <button
          id="hud-shutter-trigger"
          onClick={handleShutterActuation}
          className="p-2 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-700 transition-all flex items-center gap-1.5 text-[11px] font-mono tracking-wider group cursor-pointer"
          title="Actuate Shutter (Leica Mechanical Sound & Flash)"
        >
          <Camera className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
          <span className="hidden md:inline">SNAP</span>
        </button>

        {/* Ambient Soundscape Toggle */}
        <button
          id="hud-ambient-toggle"
          onClick={handleToggleAmbient}
          className={`p-2 border transition-all flex items-center gap-1.5 text-[11px] font-mono tracking-wider cursor-pointer ${
            ambientPlaying
              ? 'bg-blue-600/30 border-blue-500 text-blue-300'
              : 'border-neutral-700 text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
          title="Toggle Cinematic Ambient Soundscape"
        >
          <Music className={`w-3.5 h-3.5 ${ambientPlaying ? 'animate-pulse text-blue-400' : ''}`} />
          <span className="hidden md:inline">
            {ambientPlaying ? 'AMBIENT ON' : 'AMBIENT'}
          </span>
          {ambientPlaying && (
            <span className="flex items-center gap-0.5 ml-1">
              <span className="w-0.5 h-2 bg-blue-400 animate-bounce" />
              <span className="w-0.5 h-3 bg-blue-400 animate-bounce [animation-delay:0.15s]" />
              <span className="w-0.5 h-2.5 bg-blue-400 animate-bounce [animation-delay:0.3s]" />
            </span>
          )}
        </button>

        {/* Sound FX Mute/Unmute */}
        <button
          id="hud-audio-toggle"
          onClick={handleToggleMute}
          className={`p-2 border transition-all cursor-pointer ${
            isMuted
              ? 'border-red-500/50 text-red-400 bg-red-950/30'
              : 'border-neutral-700 text-neutral-300 hover:text-white hover:bg-neutral-800'
          }`}
          title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
        </button>

        {/* Reticle Focus Viewfinder Toggle */}
        <button
          id="hud-reticle-toggle"
          onClick={() => {
            sound.playDialClick();
            onToggleReticle();
          }}
          className={`hidden lg:flex p-2 border transition-all items-center gap-1 text-[11px] font-mono tracking-wider cursor-pointer ${
            reticleEnabled
              ? 'border-emerald-500/80 text-emerald-300 bg-emerald-950/20'
              : 'border-neutral-700 text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
          title="Toggle Precision Camera Viewfinder Cursor"
        >
          <Disc className={`w-3.5 h-3.5 ${reticleEnabled ? 'text-emerald-400 animate-spin [animation-duration:12s]' : ''}`} />
          <span>{reticleEnabled ? 'AF-ON' : 'AF-OFF'}</span>
        </button>
      </div>
    </>
  );
};

