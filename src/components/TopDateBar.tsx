import React from 'react';
import { Clock } from 'lucide-react';
import { Language } from '../types';
import { getFormattedDateStrings } from '../utils/hijriCalendar';

interface TopDateBarProps {
  language: Language;
}

export const TopDateBar: React.FC<TopDateBarProps> = ({ language }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // update every minute
    return () => clearInterval(timer);
  }, []);

  const dateInfo = getFormattedDateStrings(currentDate, language);

  return (
    <header className="w-full flex justify-center px-4 pt-4 pb-2" id="top-date-header">
      <div 
        id="top-date-pill"
        className="inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-full border border-sky-900/50 bg-[#0c1626]/90 backdrop-blur-md shadow-lg text-slate-200 text-xs sm:text-sm font-medium tracking-wide transition-all hover:border-sky-700/60"
      >
        <span className="text-amber-400 select-none font-semibold text-center">
          {dateInfo.fullText}
        </span>
        <Clock className="w-4 h-4 text-amber-400 shrink-0" />
      </div>
    </header>
  );
};
