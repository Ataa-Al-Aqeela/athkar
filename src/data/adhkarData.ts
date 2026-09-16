import { DayWird, TasbeehDhikr } from '../types';

export const WEEK_WIRDS: DayWird[] = [
  {
    id: 'sat',
    dayIndex: 6, // Saturday
    name: {
      ar: 'السبت',
      en: 'Saturday',
      fa: 'شنبه',
    },
    dhikr: {
      ar: '«يَا رَبَّ العَالَمِينَ»',
      en: '«Yā Rabba al-ʿĀlamīn»',
      fa: '«یا ربَّ العالَمین»',
    },
    translation: {
      ar: 'يا رب العالمين وخالق الخلق أجمعين',
      en: 'O Lord of the Worlds',
      fa: 'ای پروردگار جهانیان',
    },
    subtitle: {
      ar: 'ذكر يوم السبت لزيادة البركة والسكينة ونزول الرحمات (100 مرة)',
      en: 'Saturday Dhikr for blessings and peace of mind (100 times)',
      fa: 'ذکر روز شنبه برای برکت و آرامش قلبی (۱۰۰ مرتبه)',
    },
    target: 100,
  },
  {
    id: 'sun',
    dayIndex: 0, // Sunday
    name: {
      ar: 'الأحد',
      en: 'Sunday',
      fa: 'یک‌شنبه',
    },
    dhikr: {
      ar: '«يَا ذَا الجَلَالِ وَالإِكْرَامِ»',
      en: '«Yā Dhal-Jalāli wal-Ikrām»',
      fa: '«یا ذا الجَلالِ وَ الإِکرام»',
    },
    translation: {
      ar: 'يا صاحب العظمة والكرم والفضل التام',
      en: 'O Possessor of Majesty and Honor',
      fa: 'ای صاحب جلالت و بزرگواری',
    },
    subtitle: {
      ar: 'ذكر يوم الأحد للرفعة والعزة والفتح والتوفيق (100 مرة)',
      en: 'Sunday Dhikr for honor, elevation and success (100 times)',
      fa: 'ذکر روز یک‌شنبه برای عزت و سربلندی (۱۰۰ مرتبه)',
    },
    target: 100,
  },
  {
    id: 'mon',
    dayIndex: 1, // Monday
    name: {
      ar: 'الإثنين',
      en: 'Monday',
      fa: 'دوشنبه',
    },
    dhikr: {
      ar: '«يَا قَاضِيَ الحَاجَاتِ»',
      en: '«Yā Qāḍiya al-Ḥājāt»',
      fa: '«یا قاضِیَ الحاجات»',
    },
    translation: {
      ar: 'يا من تقضي حوائج السائلين ولا تخيب رجاءهم',
      en: 'O Granter of all needs',
      fa: 'ای برآورنده حاجت‌ها',
    },
    subtitle: {
      ar: 'ذكر يوم الإثنين لقضاء الحوائج وتيسير الأمور والرزق (100 مرة)',
      en: 'Monday Dhikr for the fulfillment of needs and ease (100 times)',
      fa: 'ذکر روز دوشنبه برای گشایش امور و برآورده شدن حاجات (۱۰۰ مرتبه)',
    },
    target: 100,
  },
  {
    id: 'tue',
    dayIndex: 2, // Tuesday
    name: {
      ar: 'الثلاثاء',
      en: 'Tuesday',
      fa: 'سه‌شنبه',
    },
    dhikr: {
      ar: '«يَا أَرْحَمَ الرَّاحِمِينَ»',
      en: '«Yā Arḥama ar-Rāḥimīn»',
      fa: '«یا اَرحَمَ الرّاحِمین»',
    },
    translation: {
      ar: 'يا أوسع الراحمين رحمة وعفواً ومغفرة',
      en: 'O Most Merciful of the merciful',
      fa: 'ای مهربان‌ترین مهربانان',
    },
    subtitle: {
      ar: 'ذكر يوم الثلاثاء لطلب المغفرة والرحمة ودفع البلاء (100 مرة)',
      en: 'Tuesday Dhikr for divine mercy and repelling harm (100 times)',
      fa: 'ذکر روز سه‌شنبه برای طلب بخشش و رحمت الهی (۱۰۰ مرتبه)',
    },
    target: 100,
  },
  {
    id: 'wed',
    dayIndex: 3, // Wednesday
    name: {
      ar: 'الأربعاء',
      en: 'Wednesday',
      fa: 'چهارشنبه',
    },
    dhikr: {
      ar: '«يَا حَيُّ يَا قَيُّومُ»',
      en: '«Yā Ḥayyu Yā Qayyūm»',
      fa: '«یا حَیُّ یا قَیّوم»',
    },
    translation: {
      ar: 'يا دائم الحياة القائم بتدبير شؤون خلقه',
      en: 'O Ever-Living, O Sustainer of existence',
      fa: 'ای همیشه زنده و ای پاینده همیشگی',
    },
    subtitle: {
      ar: 'ذكر يوم الأربعاء لحياة القلب ونور البصيرة (100 مرة)',
      en: 'Wednesday Dhikr for life of the heart and inner sight (100 times)',
      fa: 'ذکر روز چهارشنبه برای حیات دل و نور بصیرت (۱۰۰ مرتبه)',
    },
    target: 100,
  },
  {
    id: 'thu',
    dayIndex: 4, // Thursday
    name: {
      ar: 'الخميس',
      en: 'Thursday',
      fa: 'پنج‌شنبه',
    },
    dhikr: {
      ar: '«لَا إِلَهَ إِلَّا اللَّهُ المَلِكُ الحَقُّ المُبِينُ»',
      en: '«Lā ilāha illā Allāh al-Maliku al-Ḥaqqu al-Mubīn»',
      fa: '«لا إلهَ إلّا اللهُ المَلِکُ الحَقُّ المُبین»',
    },
    translation: {
      ar: 'لا معبود بحق إلا الله، الملك الحق الظاهر في عظمته',
      en: 'There is no deity except Allah, the Sovereign, the Evident Truth',
      fa: 'معبودی جز خدای یکتا نیست، پادشاه حق و آشکار',
    },
    subtitle: {
      ar: 'ذكر يوم الخميس لسعة الرزق والبركة والغنى (100 مرة)',
      en: 'Thursday Dhikr for sustenance and abundance (100 times)',
      fa: 'ذکر روز پنج‌شنبه برای وسعت رزق و فراوانی (۱۰۰ مرتبه)',
    },
    target: 100,
  },
  {
    id: 'fri',
    dayIndex: 5, // Friday
    name: {
      ar: 'الجمعة',
      en: 'Friday',
      fa: 'جمعه',
    },
    dhikr: {
      ar: '«اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِ مُحَمَّدٍ»',
      en: '«Allāhumma Ṣalli ʿalā Muḥammadin wa Āli Muḥammad»',
      fa: '«اللّهُمَّ صَلِّ عَلی مُحَمَّدٍ وَ آلِ مُحَمَّد»',
    },
    translation: {
      ar: 'الصلاة والسلام على النبي الأكرم وآله الأطهار',
      en: 'Blessings and peace upon Muhammad and his pure family',
      fa: 'درود خدا بر پیامبر اکرم و خاندان پاکش',
    },
    subtitle: {
      ar: 'ذكر يوم الجمعة لمغفرة الذنوب ونيل الشفاعة والسكينة (100 مرة)',
      en: 'Friday Dhikr for forgiveness, blessings and intercession (100 times)',
      fa: 'ذکر روز جمعه برای آمرزش گناهان و شفاعت (۱۰۰ مرتبه)',
    },
    target: 100,
  },
];

export const SMART_TASBEEH_PRESETS: TasbeehDhikr[] = [
  {
    id: 'astaghfirullah',
    shortLabel: {
      ar: 'أَسْتَغْفِرُ اللَّهَ...',
      en: 'Astaghfirullah...',
      fa: 'استغفر الله...',
    },
    fullText: {
      ar: 'أَسْتَغْفِرُ اللَّهَ العَظِيمَ وَأَتُوبُ إِلَيْهِ',
      en: 'Astaghfiru Allāha al-ʿAẓīm wa atūbu ilayh',
      fa: 'أَسْتَغْفِرُ اللَّهَ العَظِيمَ وَأَتُوبُ إِلَيْهِ',
    },
    meaning: {
      ar: 'أستغفر الله العظيم من كل ذنب وأتوب إليه',
      en: 'I seek the forgiveness of Allah the Magnificent and repent to Him',
      fa: 'از خدای بزرگ آمرزش می‌خواهم و به سوی او بازمی‌گردم',
    },
    defaultTarget: 100,
  },
  {
    id: 'subhanallah',
    shortLabel: {
      ar: 'سُبْحَانَ اللَّهِ...',
      en: 'Subhanallah...',
      fa: 'سبحان الله...',
    },
    fullText: {
      ar: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ العَظِيمِ',
      en: 'Subḥāna Allāh wa biḥamdihi, Subḥāna Allāh al-ʿAẓīm',
      fa: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ العَظِيمِ',
    },
    meaning: {
      ar: 'تسبيح الله وتنزيهه عن كل نقص وحمده والثناء عليه',
      en: 'Glory be to Allah and His is the praise, Glory be to Allah the Magnificent',
      fa: 'پاک و منزه است خداوند و ستایش از آن اوست، پاک و منزه است خدای بزرگ',
    },
    defaultTarget: 100,
  },
  {
    id: 'salawat',
    shortLabel: {
      ar: 'اللَّهُمَّ صَلِّ...',
      en: 'Salawat...',
      fa: 'صلوات...',
    },
    fullText: {
      ar: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِ مُحَمَّدٍ',
      en: 'Allāhumma Ṣalli ʿalā Muḥammadin wa Āli Muḥammad',
      fa: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِ مُحَمَّدٍ',
    },
    meaning: {
      ar: 'الصلاة والسلام التام على النبي وآله الطيبين',
      en: 'O Allah, send blessings upon Muhammad and the household of Muhammad',
      fa: 'خدایا درود فرست بر محمد و خاندان مطهر محمد',
    },
    defaultTarget: 100,
  },
  {
    id: 'tahlil',
    shortLabel: {
      ar: 'لَا إِلَهَ...',
      en: 'La Ilaha...',
      fa: 'لا إله...',
    },
    fullText: {
      ar: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
      en: 'Lā ilāha illā Allāh waḥdahu lā sharīka lah',
      fa: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    },
    meaning: {
      ar: 'شهادة التوحيد والإخلاص لله تعالى',
      en: 'There is no deity except Allah alone, with no partner',
      fa: 'هیچ معبودی جز خدای یگانه و بی‌شریک نیست',
    },
    defaultTarget: 100,
  },
  {
    id: 'tahmeed',
    shortLabel: {
      ar: 'الحَمْدُ لِلَّهِ...',
      en: 'Alhamdulillah...',
      fa: 'الحمد لله...',
    },
    fullText: {
      ar: 'الحَمْدُ لِلَّهِ رَبِّ العَالَمِينَ عَلَى كُلِّ حَالٍ',
      en: 'Al-Ḥamdu lillāhi Rabbi al-ʿĀlamīn ʿalā kulli ḥāl',
      fa: 'الحَمْدُ لِلَّهِ رَبِّ العَالَمِينَ عَلَى كُلِّ حَالٍ',
    },
    meaning: {
      ar: 'شكر الله والثناء عليه في السراء والضراء',
      en: 'Praise be to Allah, Lord of the worlds in all circumstances',
      fa: 'سپاس و ستایش خدای جهانیان را در هر حالتی',
    },
    defaultTarget: 33,
  },
  {
    id: 'takbeer',
    shortLabel: {
      ar: 'اللَّهُ أَكْبَرُ...',
      en: 'Allahu Akbar...',
      fa: 'الله اکبر...',
    },
    fullText: {
      ar: 'اللَّهُ أَكْبَرُ كَبِيرًا وَالحَمْدُ لِلَّهِ كَثِيرًا',
      en: 'Allāhu Akbaru kabīran wal-ḥamdu lillāhi kathīran',
      fa: 'اللَّهُ أَكْبَرُ كَبِيرًا وَالحَمْدُ لِلَّهِ كَثِيرًا',
    },
    meaning: {
      ar: 'تعظيم الله وتكبيره فوق كل شيء',
      en: 'Allah is the Greatest beyond measure, and abundant praise is for Him',
      fa: 'خداوند از هر چیزی بزرگ‌تر و والاتر است',
    },
    defaultTarget: 34,
  },
  {
    id: 'hawqala',
    shortLabel: {
      ar: 'لَا حَوْلَ...',
      en: 'La Hawla...',
      fa: 'لا حول...',
    },
    fullText: {
      ar: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ العَلِيِّ العَظِيمِ',
      en: 'Lā ḥawla wa lā quwwata illā billāh al-ʿAliyyi al-ʿAẓīm',
      fa: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ العَلِيِّ العَظِيمِ',
    },
    meaning: {
      ar: 'تفويض الأمر لله والاعتراف بعجزه وقوة الله المطلقة',
      en: 'There is no power nor strength except with Allah, the Most High, the Most Great',
      fa: 'هیچ نیرو و توانی جز از جانب خداوند بلندمرتبه و بزرگ نیست',
    },
    defaultTarget: 100,
  },
];

export const UI_TRANSLATIONS = {
  ar: {
    appTitle: 'المسبحة الذكية وورد الأذكار',
    appSubtitle: 'تطهير اللسان والقلب بذكر الله واستغفاره لتنزل السكينة والطمأنينة قبل النوم',
    dailyWirdTitle: 'وِرْد اليوم التفاعلي',
    today: 'اليوم',
    reset: 'إعادة ضبط',
    achievementRate: 'نسبة الإنجاز',
    times: 'مرة',
    tapToCount: 'اضغط للذكر',
    tapToTasbeeh: 'اضغط للعد والتسبيح',
    targetGoal: 'الهدف التكراري',
    currentCycleProgress: 'تقدم الدورة الحالية',
    completedCycles: 'الدورات المكتملة',
    soundOn: 'تشغيل الصوت',
    soundOff: 'كتم الصوت',
    vibrationOn: 'تشغيل الاهتزاز',
    vibrationOff: 'إيقاف الاهتزاز',
    congratulations: 'ما شاء الله! أتممت الورد بنجاح',
    fullScreen: 'وضع الشاشة الكاملة',
    exitFullScreen: 'خروج من الشاشة الكاملة',
    customTarget: 'تحديد الهدف',
    foundationName: 'مؤسسة عطاء العقيلة التنموية',
    foundationMotto: '"من أجل دولة كريمة"',
    contactWhatsApp: 'تواصل معنا واتس اب: 781 260 0392',
    phoneCode: '+964',
    installApp: 'تثبيت التطبيق على جهازك',
    installAppDesc: 'استخدم المسبحة والأذكار في أي وقت دون الحاجة للإنترنت',
    installBtn: 'تثبيت الآن',
    installed: 'التطبيق مثبت',
    offlineNotice: 'وضع عدم الاتصال — المسبحة تعمل بالكامل بدون إنترنت',
    onlineNotice: 'تمت استعادة الاتصال بالإنترنت',
  },
  en: {
    appTitle: 'Smart Tasbeeh & Daily Adhkar',
    appSubtitle: 'Purifying tongue and heart with remembrance of Allah for tranquility and peace',
    dailyWirdTitle: 'Interactive Daily Wird',
    today: 'Today',
    reset: 'Reset',
    achievementRate: 'Progress Rate',
    times: 'times',
    tapToCount: 'Tap for Dhikr',
    tapToTasbeeh: 'Tap to Count Tasbeeh',
    targetGoal: 'Target Count',
    currentCycleProgress: 'Current Cycle Progress',
    completedCycles: 'Completed Cycles',
    soundOn: 'Sound On',
    soundOff: 'Mute',
    vibrationOn: 'Vibration On',
    vibrationOff: 'Vibration Off',
    congratulations: 'MashaAllah! You completed the Wird target',
    fullScreen: 'Full Screen Mode',
    exitFullScreen: 'Exit Full Screen',
    customTarget: 'Set Target',
    foundationName: 'Ataa Al-Aqila Development Foundation',
    foundationMotto: '"For a Dignified State"',
    contactWhatsApp: 'Contact us via WhatsApp: 781 260 0392',
    phoneCode: '+964',
    installApp: 'Install App on Your Device',
    installAppDesc: 'Use the tasbeeh and daily adhkar anytime completely offline',
    installBtn: 'Install Now',
    installed: 'App Installed',
    offlineNotice: 'Offline Mode — Fully operational without internet connection',
    onlineNotice: 'Internet connection restored',
  },
  fa: {
    appTitle: 'تسبیح هوشمند و اذکار روزانه',
    appSubtitle: 'پاکسازی زبان و دل با ذکر خدا و استغفار برای نزول آرامش و سکینت قلبی',
    dailyWirdTitle: 'ورد روزانه تعاملی',
    today: 'امروز',
    reset: 'بازنشانی',
    achievementRate: 'میزان پیشرفت',
    times: 'مرتبه',
    tapToCount: 'برای ذکر لمس کنید',
    tapToTasbeeh: 'برای تسبیح لمس کنید',
    targetGoal: 'هدف تکرار',
    currentCycleProgress: 'پیشرفت این دوره',
    completedCycles: 'دوره‌های تکمیل‌شده',
    soundOn: 'صدای تسبیح فعال',
    soundOff: 'بی‌صدا',
    vibrationOn: 'لرزش فعال',
    vibrationOff: 'لرزش غیرفعال',
    congratulations: 'ماشاءالله! ورد امروز را با موفقیت کامل کردید',
    fullScreen: 'حالت تمام صفحه',
    exitFullScreen: 'خروج از تمام صفحه',
    customTarget: 'تعیین هدف',
    foundationName: 'مؤسسة عطاء العقيلة التنموية',
    foundationMotto: '"برای دولتی باکرامت"',
    contactWhatsApp: 'ارتباط با ما در واتساپ: 781 260 0392',
    phoneCode: '+964',
    installApp: 'نصب برنامه روی گوشی',
    installAppDesc: 'استفاده از تسبیح و اذکار در هر زمان بدون نیاز به اینترنت',
    installBtn: 'نصب برنامه',
    installed: 'برنامه نصب شد',
    offlineNotice: 'حالت آفلاین — برنامه بدون اینترنت کاملاً کار می‌کند',
    onlineNotice: 'اتصال به اینترنت برقرار شد',
  },
};
