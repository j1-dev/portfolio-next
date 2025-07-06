'use client';

import { useEffect, useState } from 'react';

export default function LanguageToggle() {
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    // Try to get locale from cookie
    const match = document.cookie.match(/(?:^|; )locale=([^;]*)/);
    if (match && (match[1] === 'en' || match[1] === 'es')) {
      setLocale(match[1]);
    }
  }, []);

  const switchLocale = (newLocale: 'en' | 'es') => {
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`;
    window.location.reload();
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex gap-2 items-center">
      <div className="flex rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm border border-black/10 dark:border-white/10 shadow-lg p-1">
        <button
          onClick={() => switchLocale('en')}
          className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5bc0be] hover:scale-105 ${
            locale === 'en'
              ? 'bg-[#5bc0be] text-white shadow-md transform scale-105'
              : 'text-[#1c2541] dark:text-[#5bc0be] hover:bg-[#5bc0be]/10 dark:hover:bg-[#5bc0be]/20'
          }`}
          aria-pressed={locale === 'en'}>
          EN
        </button>
        <button
          onClick={() => switchLocale('es')}
          className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5bc0be] hover:scale-105 ${
            locale === 'es'
              ? 'bg-[#5bc0be] text-white shadow-md transform scale-105'
              : 'text-[#1c2541] dark:text-[#5bc0be] hover:bg-[#5bc0be]/10 dark:hover:bg-[#5bc0be]/20'
          }`}
          aria-pressed={locale === 'es'}>
          ES
        </button>
      </div>
    </div>
  );
}
