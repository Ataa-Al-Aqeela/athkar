import React from 'react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../data/adhkarData';

interface ContactFooterProps {
  language: Language;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ language }) => {
  const t = UI_TRANSLATIONS[language];
  const phoneNumber = '9647812600392';
  const defaultMessage = 'السلام عليكم ورحمة الله وبركاته - مؤسسة عطاء العقيلة التنموية';
  const encodedText = encodeURIComponent(defaultMessage);

  // الرابط المباشر لتطبيق واتساب ماسنجر العادي
  const whatsappSchemeUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodedText}`;

  const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const ua = navigator.userAgent || '';
    const isAndroid = /android/i.test(ua);
    const isIOS = /iPad|iPhone|iPod/.test(ua);

    if (isAndroid) {
      e.preventDefault();
      // توجيه إجباري لتطبيق واتساب العادي (com.whatsapp) بدلاً من واتساب الأعمال (com.whatsapp.w4b)
      const androidIntent = `intent://send?phone=${phoneNumber}&text=${encodedText}#Intent;package=com.whatsapp;scheme=whatsapp;end`;
      
      try {
        window.location.href = androidIntent;
      } catch {
        window.location.href = whatsappSchemeUrl;
      }

      // خطة بديلة في حال عدم استجابة Intent
      setTimeout(() => {
        if (!document.hidden) {
          window.location.href = whatsappSchemeUrl;
        }
      }, 1000);
      return;
    }

    if (isIOS) {
      e.preventDefault();
      window.location.href = whatsappSchemeUrl;
      setTimeout(() => {
        if (!document.hidden) {
          window.location.href = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedText}`;
        }
      }, 1200);
      return;
    }

    // لسطح المكتب أو المتصفحات العادية
    // فتح واجهة واتساب ويب أو واتساب العادي
  };

  return (
    <footer 
      id="foundation-contact-card"
      className="w-full rounded-3xl border border-slate-800/80 bg-[#0a1526] p-6 sm:p-8 text-center shadow-2xl relative overflow-hidden"
    >
      {/* Golden Title */}
      <h3 
        id="foundation-title"
        className="text-2xl sm:text-3xl font-extrabold text-[#f6c445] tracking-wide mb-2"
      >
        {t.foundationName}
      </h3>

      {/* Motto */}
      <p 
        id="foundation-motto"
        className="text-base sm:text-lg text-slate-300 font-medium mb-6 tracking-wide"
      >
        {t.foundationMotto}
      </p>

      {/* Standard WhatsApp Messenger Button */}
      <div className="max-w-md mx-auto">
        <a
          id="whatsapp-contact-link"
          href={whatsappSchemeUrl}
          onClick={handleWhatsAppClick}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-3.5 bg-[#25D366] hover:bg-[#20bd5a] active:scale-[0.98] text-white px-6 py-4 rounded-2xl shadow-lg shadow-[#25D366]/25 transition-all duration-200 cursor-pointer group"
        >
          {/* Standard WhatsApp Icon (أيقونة الواتساب العادي الأصلية) */}
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
            <svg 
              className="w-6 h-6 text-[#25D366] fill-current" 
              viewBox="0 0 24 24"
            >
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.002.573 1.838.878 2.806.878 3.18 0 5.766-2.586 5.767-5.766.001-3.181-2.585-5.761-5.767-5.761zm3.376 8.211c-.141.396-.713.737-1.026.782-.284.041-.655.074-1.921-.45-1.619-.668-2.66-2.316-2.741-2.424-.081-.108-.654-.871-.654-1.663 0-.792.414-1.182.561-1.344.148-.162.324-.203.432-.203.109 0 .216.001.311.006.1.004.234-.038.366.279.135.324.46 1.121.5 1.202.041.082.068.177.014.284-.055.109-.082.176-.163.27-.081.095-.172.212-.245.284-.082.081-.167.17-.072.333.095.163.422.697.905 1.127.622.553 1.146.724 1.309.805.163.081.258.068.353-.041.095-.108.406-.473.514-.635.108-.163.217-.136.365-.081.149.054.947.447 1.109.528.163.081.271.122.311.189.04.068.04 1.015-.101 1.411zm-3.376-12.383c-5.522 0-10 4.477-10 10 0 1.767.458 3.427 1.259 4.872l-1.336 4.876 5-1.312c1.401.764 3.006 1.199 4.712 1.199 5.522 0 10-4.477 10-10s-4.478-10-10-10z" />
            </svg>
          </div>

          {/* Text Container */}
          <div className="flex flex-col items-start leading-tight">
            <span className="text-sm sm:text-base font-bold">
              {t.contactWhatsApp}
            </span>
            <span className="text-xs sm:text-sm font-semibold opacity-90 dir-ltr">
              {t.phoneCode}
            </span>
          </div>
        </a>
      </div>
    </footer>
  );
};
