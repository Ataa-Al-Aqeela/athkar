import React, { useState, useEffect } from 'react';
import { RotateCcw, Volume2, VolumeX, Sparkles, Maximize2, Minimize2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, TasbeehDhikr } from '../types';
import { SMART_TASBEEH_PRESETS, UI_TRANSLATIONS } from '../data/adhkarData';
import { playTasbeehClick, playCompletionChime, triggerHaptic } from '../utils/audio';

interface SmartTasbeehCardProps {
  language: Language;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const SmartTasbeehCard: React.FC<SmartTasbeehCardProps> = ({
  language,
  soundEnabled,
  onToggleSound,
}) => {
  const t = UI_TRANSLATIONS[language];

  const [selectedDhikrId, setSelectedDhikrId] = useState<string>(SMART_TASBEEH_PRESETS[0].id);

  // Targets per dhikr or custom target
  const [targetCycles, setTargetCycles] = useState<{ [id: string]: number }>({
    astaghfirullah: 100,
    subhanallah: 100,
    salawat: 100,
    tahlil: 100,
    tahmeed: 33,
    takbeer: 34,
    hawqala: 100,
  });

  // Saved counts and total completed cycles
  const [counts, setCounts] = useState<{ [id: string]: number }>(() => {
    try {
      const saved = localStorage.getItem('smart_tasbeeh_counts');
      return saved ? JSON.parse(saved) : { astaghfirullah: 5 };
    } catch {
      return { astaghfirullah: 5 };
    }
  });

  const [completedCycles, setCompletedCycles] = useState<{ [id: string]: number }>(() => {
    try {
      const saved = localStorage.getItem('smart_tasbeeh_cycles');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isRippling, setIsRippling] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('smart_tasbeeh_counts', JSON.stringify(counts));
      localStorage.setItem('smart_tasbeeh_cycles', JSON.stringify(completedCycles));
    } catch {
      // Ignore storage error
    }
  }, [counts, completedCycles]);

  const activeDhikr = SMART_TASBEEH_PRESETS.find(d => d.id === selectedDhikrId) || SMART_TASBEEH_PRESETS[0];
  const currentCount = counts[activeDhikr.id] || 0;
  const target = targetCycles[activeDhikr.id] || activeDhikr.defaultTarget;
  const cyclesCount = completedCycles[activeDhikr.id] || 0;

  const progressPercent = Math.min(100, Math.round((currentCount / target) * 100));

  const handleIncrement = (amount: number) => {
    setIsRippling(true);
    setTimeout(() => setIsRippling(false), 180);

    const nextCount = currentCount + amount;
    
    if (soundEnabled) {
      playTasbeehClick();
    }
    triggerHaptic(amount === 1 ? 15 : 25);

    if (nextCount >= target) {
      // Completed a cycle
      const remainder = nextCount % target;
      const additionalCycles = Math.floor(nextCount / target);

      setCounts(prev => ({
        ...prev,
        [activeDhikr.id]: remainder,
      }));

      setCompletedCycles(prev => ({
        ...prev,
        [activeDhikr.id]: (prev[activeDhikr.id] || 0) + additionalCycles,
      }));

      if (soundEnabled) {
        playCompletionChime();
      }

      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#fef08a', '#10b981', '#ffffff'],
      });
    } else {
      setCounts(prev => ({
        ...prev,
        [activeDhikr.id]: nextCount,
      }));
    }
  };

  const handleReset = () => {
    setCounts(prev => ({
      ...prev,
      [activeDhikr.id]: 0,
    }));
    triggerHaptic(30);
  };

  const cycleTargetGoal = () => {
    const targets = [33, 100, 1000];
    const currentIndex = targets.indexOf(target);
    const nextTarget = currentIndex === -1 ? 100 : targets[(currentIndex + 1) % targets.length];
    setTargetCycles(prev => ({
      ...prev,
      [activeDhikr.id]: nextTarget,
    }));
    triggerHaptic(20);
  };

  return (
    <>
      <section 
        id="smart-tasbeeh-section"
        className="w-full rounded-3xl border border-slate-800/80 bg-gradient-to-b from-[#0a1526] to-[#070f1c] p-4 sm:p-6 shadow-2xl transition-all relative overflow-hidden"
      >
        {/* Subtle background glow */}
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          {/* Title & Rosary Icon */}
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center shadow-inner shrink-0">
              <span className="text-xl">📿</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-[#f6c445] tracking-tight">
                  {t.appTitle}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5 max-w-md">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => setIsFullScreen(true)}
              id="fullscreen-tasbeeh-btn"
              type="button"
              className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-amber-400 hover:bg-slate-800 transition cursor-pointer"
              title={t.fullScreen}
              aria-label={t.fullScreen}
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            <button
              onClick={onToggleSound}
              id="toggle-tasbeeh-sound-btn"
              type="button"
              className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-amber-400 hover:bg-slate-800 transition cursor-pointer"
              title={soundEnabled ? t.soundOff : t.soundOn}
              aria-label={soundEnabled ? t.soundOff : t.soundOn}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            <button
              onClick={handleReset}
              id="reset-tasbeeh-btn"
              type="button"
              className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-amber-400 hover:bg-slate-800 transition cursor-pointer"
              title={t.reset}
              aria-label={t.reset}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dhikr Selector Tabs */}
        <div className="py-4 overflow-x-auto no-scrollbar" id="tasbeeh-dhikr-tabs">
          <div className="flex items-center gap-2 min-w-max">
            {SMART_TASBEEH_PRESETS.map((preset) => {
              const isSelected = preset.id === selectedDhikrId;
              return (
                <button
                  key={preset.id}
                  id={`tasbeeh-tab-${preset.id}`}
                  onClick={() => setSelectedDhikrId(preset.id)}
                  type="button"
                  className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/25'
                      : 'bg-[#081322] border border-slate-800/80 text-slate-300 hover:bg-[#0c1a2e] hover:text-white'
                  }`}
                >
                  {preset.shortLabel[language]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Inner Card */}
        <div 
          id="tasbeeh-inner-card"
          className="rounded-2xl border border-slate-800/80 bg-[#07101d]/95 p-5 sm:p-7 text-center relative shadow-inner"
        >
          {/* Target Pill */}
          <div className="flex items-center justify-center mb-3">
            <button
              onClick={cycleTargetGoal}
              type="button"
              id="target-goal-badge"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#182619]/90 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold hover:border-amber-400 hover:bg-[#1a2c1b] transition cursor-pointer shadow-sm"
              title="انقر لتغيير الهدف (33 / 100 / 1000)"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.targetGoal}: {target}</span>
            </button>
          </div>

          {/* Full Dhikr Calligraphy */}
          <div className="py-2 px-2 min-h-[5rem] flex flex-col items-center justify-center">
            <p 
              id="tasbeeh-calligraphy-text"
              className="text-2xl sm:text-3xl lg:text-4xl font-quran font-bold text-amber-200 drop-shadow-[0_2px_12px_rgba(245,158,11,0.25)] tracking-wide leading-relaxed"
            >
              {activeDhikr.fullText[language]}
            </p>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5 max-w-lg font-normal">
              {activeDhikr.meaning[language]}
            </p>
          </div>

          {/* Glowing Golden Ring Counter Button */}
          <div className="py-5 flex justify-center">
            <button
              id="tasbeeh-main-counter-circle"
              onClick={() => handleIncrement(1)}
              type="button"
              aria-label={t.tapToTasbeeh}
              className={`w-44 h-44 sm:w-52 sm:h-52 rounded-full relative p-2 shadow-[0_0_40px_rgba(245,158,11,0.28)] active:scale-95 transition-all duration-100 flex flex-col items-center justify-center cursor-pointer select-none group ${
                isRippling ? 'scale-98' : ''
              }`}
            >
              {/* Outer Golden Ring with subtle breathing animation */}
              <div className="absolute inset-0 rounded-full border-[3px] border-amber-400 shadow-[inset_0_0_20px_rgba(245,158,11,0.3)] animate-pulse-ring" />

              {/* Inner Circle Content */}
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#0b182b] to-[#060e1a] border border-amber-500/40 flex flex-col items-center justify-center p-4 text-center">
                <span className="text-5xl sm:text-6xl font-extrabold font-mono text-amber-400 my-1 drop-shadow-[0_2px_8px_rgba(245,158,11,0.4)]">
                  {currentCount}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-300 group-hover:text-amber-300 transition-colors mt-1">
                  {t.tapToTasbeeh}
                </span>
                {cyclesCount > 0 && (
                  <span className="text-[11px] text-emerald-400 font-medium mt-1">
                    {t.completedCycles}: {cyclesCount}
                  </span>
                )}
              </div>
            </button>
          </div>

          {/* Current Cycle Progress Row */}
          <div className="max-w-md mx-auto my-4 space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm text-slate-300 font-medium px-1">
              <span className="text-slate-400">{t.currentCycleProgress}</span>
              <span className="text-amber-400 font-mono font-bold">
                {progressPercent}%
              </span>
            </div>

            <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 rounded-full transition-all duration-200 shadow-[0_0_8px_rgba(245,158,11,0.4)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Quick Increment Buttons */}
          <div className="flex items-center justify-center gap-3 mt-3" id="tasbeeh-quick-add-buttons">
            <button
              onClick={() => handleIncrement(1)}
              type="button"
              className="px-4 py-2 rounded-xl bg-[#0a1829] border border-amber-500/30 text-slate-200 text-xs sm:text-sm font-bold hover:bg-amber-500/20 hover:text-amber-300 hover:border-amber-400 transition cursor-pointer shadow-sm active:scale-95"
            >
              +1
            </button>
            <button
              onClick={() => handleIncrement(5)}
              type="button"
              className="px-4 py-2 rounded-xl bg-[#0a1829] border border-amber-500/30 text-slate-200 text-xs sm:text-sm font-bold hover:bg-amber-500/20 hover:text-amber-300 hover:border-amber-400 transition cursor-pointer shadow-sm active:scale-95"
            >
              +5
            </button>
            <button
              onClick={() => handleIncrement(10)}
              type="button"
              className="px-4 py-2 rounded-xl bg-[#0a1829] border border-amber-500/30 text-slate-200 text-xs sm:text-sm font-bold hover:bg-amber-500/20 hover:text-amber-300 hover:border-amber-400 transition cursor-pointer shadow-sm active:scale-95"
            >
              +10
            </button>
          </div>
        </div>
      </section>

      {/* Full Screen Dedicated Tasbeeh Modal */}
      {isFullScreen && (
        <div 
          id="fullscreen-tasbeeh-modal"
          className="fixed inset-0 z-50 bg-[#050c16] flex flex-col items-center justify-between p-6 select-none"
        >
          {/* Top Exit & Sound Bar */}
          <div className="w-full flex items-center justify-between max-w-md mx-auto">
            <button
              onClick={onToggleSound}
              type="button"
              className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-amber-400 transition cursor-pointer"
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
            </button>

            <span className="text-sm font-bold text-amber-400">
              {t.targetGoal}: {target}
            </span>

            <button
              onClick={() => setIsFullScreen(false)}
              type="button"
              className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-red-400 transition cursor-pointer"
              title={t.exitFullScreen}
            >
              <Minimize2 className="w-5 h-5" />
            </button>
          </div>

          {/* Main Fullscreen Tap Area */}
          <div 
            onClick={() => handleIncrement(1)}
            className="flex-1 w-full max-w-md flex flex-col items-center justify-center cursor-pointer active:scale-98 transition-transform"
          >
            <p className="text-3xl sm:text-4xl font-quran font-bold text-amber-200 text-center mb-8 px-4 leading-relaxed">
              {activeDhikr.fullText[language]}
            </p>

            <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full relative p-2 shadow-[0_0_60px_rgba(245,158,11,0.35)] flex flex-col items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-amber-400 shadow-[inset_0_0_30px_rgba(245,158,11,0.4)] animate-pulse-ring" />
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#0b182b] to-[#060e1a] border border-amber-500/50 flex flex-col items-center justify-center p-6 text-center">
                <span className="text-7xl sm:text-8xl font-black font-mono text-amber-400 drop-shadow-[0_2px_12px_rgba(245,158,11,0.5)]">
                  {currentCount}
                </span>
                <span className="text-sm font-bold text-slate-300 mt-2">
                  {t.tapToTasbeeh}
                </span>
                {cyclesCount > 0 && (
                  <span className="text-xs text-emerald-400 font-semibold mt-1">
                    {t.completedCycles}: {cyclesCount}
                  </span>
                )}
              </div>
            </div>

            {/* Progress bar in fullscreen */}
            <div className="w-full mt-8 px-4 space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>{t.currentCycleProgress}</span>
                <span className="text-amber-400 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-200"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Bottom quick reset button */}
          <div className="w-full max-w-md flex justify-center gap-4 py-2">
            <button
              onClick={handleReset}
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm font-semibold text-slate-300 hover:text-amber-400 transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.reset}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
