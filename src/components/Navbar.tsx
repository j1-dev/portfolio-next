import React from 'react';
import LanguageToggle from './LanguageToggle';
import { ThemeSwitcher } from './ThemeSwitcher';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="w-full h-14  mx-auto relative rounded-t-xl rounded">
      <div className="rounded-xl sm:absolute fixed bottom-[2px] right-1 w-40 h-13 z-50">
        <LanguageToggle />
        <ThemeSwitcher />
      </div>
      <div className="flex p-[6px] gap-1">
        <div className="hover:text-accent h-11 bg-background w-fit px-2 flex items-center justify-center rounded-xl">
          <a href="#proyectos" className="items-center justify-center">
            Proyectos
          </a>
        </div>
        <div className="hover:text-accent h-11 bg-background w-fit px-2 flex items-center justify-center rounded-xl">
          <a href="#contacto" className="items-center justify-center">
            Contacto
          </a>
        </div>
        <div className="hover:text-accent h-11 bg-background w-fit px-2 flex items-center justify-center rounded-xl">
          <Link href="/blog" className="items-center justify-center">
            Blog
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
