import React from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../data/adhkarData';

interface OfflineIndicatorProps {
  language: Language;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ language }) => {
  const isOnline = useOnlineStatus();
  const [showReconnected, setShowReconnected] = React.useState(false);
  const wasOffline = React.useRef(false);
  const t = UI_TRANSLATIONS[language];

  React.useEffect(() => {
    if (!isOnline) {
      wasOffline.current = true;
    } else if (wasOffline.current) {
      setShowReconnected(true);
      const timer = setTimeout(() => {
        setShowReconnected(false);
        wasOffline.current = false;
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  if (!isOnline) {
    return (
      <div 
        id="offline-status-banner"
        className="fixed bottom-4 start-4 z-40 flex items-center gap-2 rounded-2xl bg-amber-500/90 text-slate-950 font-bold px-3.5 py-2 text-xs shadow-2xl backdrop-blur-md border border-amber-300 animate-pulse"
      >
        <WifiOff className="w-4 h-4 text-slate-950 shrink-0" />
        <span>{t.offlineNotice}</span>
      </div>
    );
  }

  if (showReconnected) {
    return (
      <div 
        id="online-restored-banner"
        className="fixed bottom-4 start-4 z-40 flex items-center gap-2 rounded-2xl bg-emerald-500/90 text-slate-950 font-bold px-3.5 py-2 text-xs shadow-2xl backdrop-blur-md border border-emerald-300"
      >
        <Wifi className="w-4 h-4 text-slate-950 shrink-0" />
        <span>{t.onlineNotice}</span>
      </div>
    );
  }

  return null;
};
