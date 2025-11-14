'use client';

import { useEffect, useState } from 'react';

export default function LanguageToggle() {
  const [locale, setLocale] = useState('en');
  const localeArray = ['en', 'es'];

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
    <div className="z-50 flex gap-2 items-center bg-blue-700 w-fit rounded-xl p-1 absolute right-2 top-[6px] h-11">
        {localeArray.map((loc) => (
          <button
            key={loc}
            onClick={() => switchLocale(loc as 'es' | 'en')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 ${
              locale === loc ? 'bg-white text-blue-700' : 'text-white'
            }`}
            aria-pressed={locale === loc}>
            {loc.toUpperCase()}
          </button>
        ))}
    </div>
  );
}
