import { useState, useEffect } from 'react';
import { Language } from './types';
import { TopDateBar } from './components/TopDateBar';
import { LanguageSelector } from './components/LanguageSelector';
import { DailyWirdCard } from './components/DailyWirdCard';
import { SmartTasbeehCard } from './components/SmartTasbeehCard';
import { ContactFooter } from './components/ContactFooter';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { OfflineIndicator } from './components/OfflineIndicator';

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('app_language');
      if (saved === 'ar' || saved === 'en' || saved === 'fa') return saved;
    } catch {
      // Ignore
    }
    return 'ar';
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('sound_enabled');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  // Sync document language and direction
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'en' ? 'ltr' : 'rtl';
    try {
      localStorage.setItem('app_language', language);
    } catch {
      // Ignore
    }
  }, [language]);

  // Sync sound setting
  useEffect(() => {
    try {
      localStorage.setItem('sound_enabled', String(soundEnabled));
    } catch {
      // Ignore
    }
  }, [soundEnabled]);

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#050c16] text-slate-100 font-sans antialiased flex flex-col items-center justify-start pb-16 selection:bg-amber-500 selection:text-slate-950">
      {/* Background Subtle Ambient Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-sky-950/20 via-emerald-950/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-3xl" />
      </div>

      {/* Main Container - Responsive bounded container */}
      <main className="w-full max-w-2xl px-3 sm:px-5 flex flex-col gap-5 sm:gap-6 pt-2">
        {/* 1. Top Date Bar: Day and Date in Hijri and Gregorian */}
        <TopDateBar language={language} />

        {/* 2. Three Languages Switcher: Arabic, English, Persian */}
        <LanguageSelector
          currentLanguage={language}
          onSelectLanguage={setLanguage}
        />

        {/* PWA Install Banner */}
        <PWAInstallBanner language={language} />

        {/* 3. Daily Interactive Wird (وِرْد اليوم التفاعلي) */}
        <DailyWirdCard
          language={language}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
        />

        {/* 4. Smart Rosary & Adhkar (المسبحة الذكية وورد الأذكار) */}
        <SmartTasbeehCard
          language={language}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
        />

        {/* 5. Contact WhatsApp & Foundation Section (تواصل معنا واتس اب) */}
        <ContactFooter language={language} />
      </main>

      {/* Offline Status Badge */}
      <OfflineIndicator language={language} />
    </div>
  );
}

