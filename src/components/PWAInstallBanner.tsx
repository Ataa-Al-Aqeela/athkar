import React, { useState } from 'react';
import { Download, Share2, PlusSquare, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../data/adhkarData';

interface PWAInstallBannerProps {
  language: Language;
}

export const PWAInstallBanner: React.FC<PWAInstallBannerProps> = ({ language }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const t = UI_TRANSLATIONS[language];

  // If already in standalone mode or dismissed, hide
  if (isInstalled || dismissed) {
    return null;
  }

  // If not installable and not iOS, return null
  if (!isInstallable && !isIOS) {
    return null;
  }

  return (
    <>
      <aside 
        id="pwa-install-banner"
        aria-label="PWA install banner"
        className="w-full rounded-2xl border border-amber-500/30 bg-gradient-to-r from-[#0c1a2e] to-[#091524] p-3.5 sm:p-4 shadow-lg flex items-center justify-between gap-3 text-slate-200"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
            <Download className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-amber-300">
              {t.installApp}
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-400">
              {t.installAppDesc}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {isInstallable && (
            <button
              onClick={install}
              type="button"
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition cursor-pointer"
            >
              {t.installBtn}
            </button>
          )}

          {isIOS && (
            <button
              onClick={() => setShowIOSGuide(true)}
              type="button"
              className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 hover:bg-amber-500/30 text-amber-300 font-bold text-xs sm:text-sm transition cursor-pointer"
            >
              {t.installBtn}
            </button>
          )}

          <button
            onClick={() => setDismissed(true)}
            type="button"
            className="p-1 text-slate-500 hover:text-slate-300 transition"
            aria-label="Close banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* iOS Installation Guide Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-[#091526] border border-slate-700 p-6 shadow-2xl text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-amber-400">
                {language === 'ar' ? 'تثبيت التطبيق على آيفون / آيباد' : language === 'fa' ? 'نصب برنامه روی آیفون / آیپد' : 'Install on iPhone / iPad'}
              </h3>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-4 space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center shrink-0 font-bold">
                  1
                </span>
                <p>
                  {language === 'ar' ? (
                    <>اضغط على زر المشاركة <Share2 className="inline w-4 h-4 text-sky-400 mx-1" /> في شريط متصفح سفاري.</>
                  ) : language === 'fa' ? (
                    <>روی دکمه اشتراک‌گذاری <Share2 className="inline w-4 h-4 text-sky-400 mx-1" /> در نوار سافاری ضربه بزنید.</>
                  ) : (
                    <>Tap the Share button <Share2 className="inline w-4 h-4 text-sky-400 mx-1" /> in the Safari toolbar.</>
                  )}
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center shrink-0 font-bold">
                  2
                </span>
                <p>
                  {language === 'ar' ? (
                    <>مرر لأسفل واختر <PlusSquare className="inline w-4 h-4 text-emerald-400 mx-1" /> <strong>إضافة إلى الصفحة الرئيسية (Add to Home Screen)</strong>.</>
                  ) : language === 'fa' ? (
                    <>به پایین بروید و گزینه <PlusSquare className="inline w-4 h-4 text-emerald-400 mx-1" /> <strong>افزودن به صفحه اصلی (Add to Home Screen)</strong> را انتخاب کنید.</>
                  ) : (
                    <>Scroll down and select <PlusSquare className="inline w-4 h-4 text-emerald-400 mx-1" /> <strong>Add to Home Screen</strong>.</>
                  )}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-2 w-full rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 text-sm transition"
            >
              {language === 'ar' ? 'حسناً، فهمت' : language === 'fa' ? 'متوجه شدم' : 'Got it'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
