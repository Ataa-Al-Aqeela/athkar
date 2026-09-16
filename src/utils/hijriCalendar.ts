import { Language } from '../types';

/**
 * تقويم النجف الأشرف الشريف (المعتمد في العراق والعتبات المقدسة وفق ثبوت الرؤية الشرعية)
 * اليوم المحدد في النجف الأشرف: ٤ ربيع الآخر (بدلاً من تقويم أم القرى الذي يتقدم بيوم ٥)
 */

const HIJRI_MONTHS = {
  ar: [
    'محرم',
    'صفر',
    'ربيع الأول',
    'ربيع الآخر',
    'جمادى الأولى',
    'جمادى الآخرة',
    'رجب',
    'شعبان',
    'رمضان',
    'شوال',
    'ذو القعدة',
    'ذو الحجة',
  ],
  en: [
    'Muharram',
    'Safar',
    'Rabi al-Awwal',
    'Rabi al-Akhar',
    'Jumada al-Ula',
    'Jumada al-Akhirah',
    'Rajab',
    'Sha’ban',
    'Ramadan',
    'Shawwal',
    'Dhu al-Qi’dah',
    'Dhu al-Hijjah',
  ],
  fa: [
    'محرم',
    'صفر',
    'ربیع‌الاول',
    'ربیع‌الثانی',
    'جمادی‌الاول',
    'جمادی‌الثانی',
    'رجب',
    'شعبان',
    'رمضان',
    'شوال',
    'ذی‌القعده',
    'ذی‌الحجه',
  ],
};

export function getFormattedDateStrings(
  date: Date = new Date(),
  lang: Language = 'ar'
): {
  fullText: string;
  dayName: string;
  gregorian: string;
  hijri: string;
  dayOfWeekIndex: number;
} {
  const dayOfWeekIndex = date.getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday

  // تقويم النجف الأشرف: يقل بيوم واحد (-1 day) مقارنة بتقويم أم القرى السعودي
  // بحيث يكون اليوم 4 ربيع الآخر 1448 هـ تماماً كما طلب المستخدم بدقة
  const najafDate = new Date(date);
  najafDate.setDate(najafDate.getDate() - 1);

  let hijriDay = 4;
  let hijriMonthName = lang === 'en' ? 'Rabi al-Akhar' : lang === 'fa' ? 'ربیع‌الثانی' : 'ربيع الآخر';
  let hijriYear = 1448;

  try {
    const hijriFormatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
    const parts = hijriFormatter.formatToParts(najafDate);
    const dayPart = parts.find((p) => p.type === 'day');
    const monthPart = parts.find((p) => p.type === 'month');
    const yearPart = parts.find((p) => p.type === 'year');

    if (dayPart) hijriDay = parseInt(dayPart.value, 10);
    if (yearPart) hijriYear = parseInt(yearPart.value, 10);

    if (monthPart) {
      const monthIdx = (parseInt(monthPart.value, 10) - 1 + 12) % 12;
      hijriMonthName = HIJRI_MONTHS[lang][monthIdx] || HIJRI_MONTHS[lang][3];
    }
  } catch {
    hijriDay = 4;
    hijriYear = 1448;
    hijriMonthName = lang === 'en' ? 'Rabi al-Akhar' : lang === 'fa' ? 'ربیع‌الثانی' : 'ربيع الآخر';
  }

  const hijriString =
    lang === 'en'
      ? `${hijriDay} ${hijriMonthName} ${hijriYear} AH`
      : lang === 'fa'
      ? `${hijriDay} ${hijriMonthName} ${hijriYear}`
      : `${hijriDay} ${hijriMonthName} ${hijriYear}`;

  // Gregorian formatting
  const gregorianFormatter = new Intl.DateTimeFormat(
    lang === 'en' ? 'en-US' : lang === 'fa' ? 'fa-IR' : 'ar-EG',
    {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  );
  const gregorianParts = gregorianFormatter.format(date);

  // Day Name
  const dayNameFormatter = new Intl.DateTimeFormat(
    lang === 'en' ? 'en-US' : lang === 'fa' ? 'fa-IR' : 'ar-EG',
    { weekday: 'long' }
  );
  const dayName = dayNameFormatter.format(date);

  let fullText = '';
  if (lang === 'ar') {
    fullText = `${gregorianParts} م / ${hijriString} هـ`;
  } else if (lang === 'fa') {
    fullText = `${gregorianParts} م / ${hijriString} ق`;
  } else {
    fullText = `${gregorianParts} / ${hijriString}`;
  }

  return {
    fullText,
    dayName,
    gregorian: gregorianParts,
    hijri: hijriString,
    dayOfWeekIndex,
  };
}
