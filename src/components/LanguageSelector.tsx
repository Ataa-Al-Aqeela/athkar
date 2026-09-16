import React from 'react';
import { Language } from '../types';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onSelectLanguage,
}) => {
  const languages: { code: Language; label: string }[] = [
    { code: 'ar', label: 'العربية' },
    { code: 'en', label: 'English' },
    { code: 'fa', label: 'فارسی' },
  ];

  return (
    <nav className="w-full flex justify-center py-2 px-4" id="language-nav" aria-label="Language selection">
      <div 
        id="language-switcher-pill"
        className="inline-flex items-center rounded-full bg-[#0a1220] border border-slate-800/80 p-1 shadow-inner gap-1"
      >
        {languages.map((lang) => {
          const isActive = currentLanguage === lang.code;
          return (
            <button
              key={lang.code}
              id={`lang-btn-${lang.code}`}
              onClick={() => onSelectLanguage(lang.code)}
              type="button"
              className={`px-4 sm:px-6 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {lang.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
