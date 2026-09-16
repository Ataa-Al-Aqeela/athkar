export type Language = 'ar' | 'en' | 'fa';

export interface DayWird {
  id: string;
  dayIndex: number; // 0: Sunday, 1: Monday, ... 6: Saturday
  name: {
    ar: string;
    en: string;
    fa: string;
  };
  dhikr: {
    ar: string;
    en: string;
    fa: string;
  };
  translation: {
    ar: string;
    en: string;
    fa: string;
  };
  subtitle: {
    ar: string;
    en: string;
    fa: string;
  };
  target: number;
}

export interface TasbeehDhikr {
  id: string;
  shortLabel: {
    ar: string;
    en: string;
    fa: string;
  };
  fullText: {
    ar: string;
    en: string;
    fa: string;
  };
  meaning: {
    ar: string;
    en: string;
    fa: string;
  };
  defaultTarget: number;
}
