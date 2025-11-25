import React from 'react';
import LanguageToggle from './LanguageToggle';
import { ThemeSwitcher } from './ThemeSwitcher';

const Navbar = () => {
  return (
    <nav className="w-full h-14  mx-auto sticky rounded-t-xl rounded">
      <div className="relative w-full ">
        <LanguageToggle />
        <div className="absolute right-32 top-3">
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
            <a href="#contacto" className="items-center justify-center">
              Blog
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
