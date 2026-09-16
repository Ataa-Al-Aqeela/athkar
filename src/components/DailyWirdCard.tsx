import React, { useState, useEffect } from 'react';
import { Calendar, RotateCcw, Volume2, VolumeX, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DayWird, Language } from '../types';
import { WEEK_WIRDS, UI_TRANSLATIONS } from '../data/adhkarData';
import { playTasbeehClick, playCompletionChime, triggerHaptic } from '../utils/audio';

interface DailyWirdCardProps {
  language: Language;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const DailyWirdCard: React.FC<DailyWirdCardProps> = ({
  language,
  soundEnabled,
  onToggleSound,
}) => {
  const t = UI_TRANSLATIONS[language];
  
  // Determine today's day of week
  const todayDayOfWeek = new Date().getDay(); // 0 is Sun, 6 is Sat
  const defaultDay = WEEK_WIRDS.find(w => w.dayIndex === todayDayOfWeek) || WEEK_WIRDS[4]; // default Wed or today

  const [selectedDayId, setSelectedDayId] = useState<string>(() => {
    return defaultDay.id;
  });

  // Persisted counts per day
  const [counts, setCounts] = useState<{ [key: string]: number }>(() => {
    try {
      const saved = localStorage.getItem('daily_wird_counts');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('daily_wird_counts', JSON.stringify(counts));
    } catch {
      // Ignore storage quota
    }
  }, [counts]);

  const activeWird = WEEK_WIRDS.find(w => w.id === selectedDayId) || WEEK_WIRDS[4];
  const currentCount = counts[activeWird.id] || 0;
  const target = activeWird.target;
  const progressPercent = Math.min(100, Math.round((currentCount / target) * 100));
  const isTargetCompleted = currentCount >= target;

  const isToday = activeWird.dayIndex === todayDayOfWeek;

  const handleIncrement = (amount: number) => {
    const newCount = Math.min(target, currentCount + amount);
    setCounts(prev => ({
      ...prev,
      [activeWird.id]: newCount,
    }));

    if (soundEnabled) {
      playTasbeehClick();
    }
    triggerHaptic(amount === 1 ? 15 : 25);

    if (newCount >= target && currentCount < target) {
      if (soundEnabled) {
        playCompletionChime();
      }
      setShowCelebration(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#f59e0b', '#34d399', '#fbbf24', '#ffffff'],
      });
      setTimeout(() => setShowCelebration(false), 4000);
    }
  };

  const handleReset = () => {
    setCounts(prev => ({
      ...prev,
      [activeWird.id]: 0,
    }));
    triggerHaptic(30);
  };

  return (
    <section 
      id="daily-wird-section"
      className="w-full rounded-3xl border border-emerald-900/40 bg-gradient-to-b from-[#081a1d] to-[#07131e] p-4 sm:p-6 shadow-2xl transition-all relative overflow-hidden"
    >
      {/* Background subtle radial glow */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-emerald-950/60">
        {/* Title and Icon */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-emerald-950/80 border border-emerald-700/60 flex items-center justify-center shadow-inner shrink-0">
            <Calendar className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#f6c445] tracking-tight">
                {t.dailyWirdTitle}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300/80 mt-0.5 max-w-md">
              {activeWird.subtitle[language]}
            </p>
          </div>
        </div>

        {/* Actions & Badge */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {isToday && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/90 text-emerald-400 border border-emerald-800/60 flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {activeWird.name[language]} ({t.today})
            </span>
          )}

          <button
            onClick={onToggleSound}
            id="toggle-wird-sound-btn"
            type="button"
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-amber-400 hover:bg-slate-800/80 transition cursor-pointer"
            title={soundEnabled ? t.soundOff : t.soundOn}
            aria-label={soundEnabled ? t.soundOff : t.soundOn}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          <button
            onClick={handleReset}
            id="reset-wird-btn"
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-800 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.reset}</span>
          </button>
        </div>
      </div>

      {/* Days of Week Tab Bar */}
      <div className="py-4 overflow-x-auto no-scrollbar" id="weekday-tabs-container">
        <div className="flex items-center gap-2 min-w-max">
          {WEEK_WIRDS.map((wird) => {
            const isSelected = wird.id === selectedDayId;
            const isActualToday = wird.dayIndex === todayDayOfWeek;
            const dayCount = counts[wird.id] || 0;
            const isDone = dayCount >= wird.target;

            return (
              <button
                key={wird.id}
                id={`wird-day-tab-${wird.id}`}
                onClick={() => setSelectedDayId(wird.id)}
                type="button"
                className={`relative px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'bg-[#09151e] border border-slate-800/70 text-slate-300 hover:bg-[#0d1d29] hover:text-white'
                }`}
              >
                <span>{wird.name[language]}</span>
                {isActualToday && (
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-slate-950' : 'bg-amber-400 animate-pulse'}`} />
                )}
                {isDone && (
                  <CheckCircle2 className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-emerald-400'}`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Inner Dhikr Box */}
      <div 
        id="wird-inner-card"
        className="rounded-2xl border border-emerald-950/90 bg-[#061118]/90 p-5 sm:p-7 text-center relative shadow-inner"
      >
        {/* Celebration Banner */}
        {showCelebration && (
          <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-bold animate-bounce">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{t.congratulations}</span>
          </div>
        )}

        {/* Sacred Calligraphy Dhikr */}
        <div className="py-2">
          <p 
            id="wird-dhikr-text"
            className="text-3xl sm:text-4xl lg:text-5xl font-quran font-bold text-emerald-300 drop-shadow-[0_2px_12px_rgba(16,185,129,0.3)] tracking-wide leading-relaxed selection:bg-emerald-500"
          >
            {activeWird.dhikr[language]}
          </p>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 font-normal">
            {activeWird.translation[language]}
          </p>
        </div>

        {/* Progress Info & Bar */}
        <div className="max-w-md mx-auto my-5 space-y-2">
          <div className="flex items-center justify-between text-xs sm:text-sm text-slate-300 font-medium px-1">
            <span className="text-slate-400">{t.achievementRate}</span>
            <span className="text-emerald-400 font-mono font-bold">
              {currentCount} / {target} {t.times} ({progressPercent}%)
            </span>
          </div>

          <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-emerald-950">
            <div
              className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(52,211,153,0.5)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Circular Big Counter Button */}
        <div className="py-3 flex justify-center">
          <button
            id="wird-counter-button"
            onClick={() => handleIncrement(1)}
            type="button"
            aria-label={t.tapToCount}
            className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 text-slate-950 p-1.5 shadow-[0_0_35px_rgba(245,158,11,0.35)] active:scale-95 transition-transform duration-100 flex flex-col items-center justify-center cursor-pointer border-4 border-amber-300/60 select-none group"
          >
            <div className="w-full h-full rounded-full bg-gradient-to-b from-amber-400 to-amber-500 flex flex-col items-center justify-center p-4 text-center">
              <span className="text-xs sm:text-sm font-bold text-slate-900/85 mb-1 group-hover:tracking-wider transition-all">
                {t.tapToCount}
              </span>
              <span className="text-4xl sm:text-5xl font-extrabold font-mono text-slate-950 my-1">
                {currentCount}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-900/75">
                {target} /
              </span>
            </div>
          </button>
        </div>

        {/* Quick Increment Buttons */}
        <div className="flex items-center justify-center gap-3 mt-4" id="wird-quick-add-buttons">
          <button
            onClick={() => handleIncrement(1)}
            type="button"
            className="px-4 py-2 rounded-xl bg-[#0a1824] border border-emerald-900/60 text-slate-200 text-xs sm:text-sm font-bold hover:bg-emerald-950 hover:text-emerald-300 hover:border-emerald-600 transition cursor-pointer shadow-sm active:scale-95"
          >
            +1
          </button>
          <button
            onClick={() => handleIncrement(5)}
            type="button"
            className="px-4 py-2 rounded-xl bg-[#0a1824] border border-emerald-900/60 text-slate-200 text-xs sm:text-sm font-bold hover:bg-emerald-950 hover:text-emerald-300 hover:border-emerald-600 transition cursor-pointer shadow-sm active:scale-95"
          >
            +5
          </button>
          <button
            onClick={() => handleIncrement(10)}
            type="button"
            className="px-4 py-2 rounded-xl bg-[#0a1824] border border-emerald-900/60 text-slate-200 text-xs sm:text-sm font-bold hover:bg-emerald-950 hover:text-emerald-300 hover:border-emerald-600 transition cursor-pointer shadow-sm active:scale-95"
          >
            +10
          </button>
        </div>
      </div>
    </section>
  );
};
