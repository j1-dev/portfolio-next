import React from 'react';
import LanguageToggle from './LanguageToggle';
import { ThemeSwitcher } from './ThemeSwitcher';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const Navbar = () => {
  const t = useTranslations();
  return (
    <nav className="w-full h-14  mx-auto relative rounded-t-xl rounded">
      <div className="rounded-xl sm:absolute fixed bottom-2 sm:bottom-[3px] right-2 sm:right-1 w-40 h-13 z-50 bg-foreground sm:bg-background">
        <LanguageToggle />
        <ThemeSwitcher />
      </div>
      <div className="flex p-[6px] gap-1">
        <div className="hover:text-accent h-11 bg-background w-fit px-2 flex items-center justify-center rounded-xl">
          <a href="#proyectos" className="items-center justify-center">
            {t('projects')}
          </a>
        </div>
        <div className="hover:text-accent h-11 bg-background w-fit px-2 flex items-center justify-center rounded-xl">
          <a href="#contacto" className="items-center justify-center">
            {t('contact')}
          </a>
        </div>
        <div className="hover:text-accent h-11 bg-background w-fit px-2 flex items-center justify-center rounded-xl">
          <Link href="/blog" className="items-center justify-center">
            {t('blog')}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
