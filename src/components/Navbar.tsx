import React from 'react';
import LanguageToggle from './LanguageToggle';

const Navbar = () => {
  return (
    <nav className="w-full h-14 bg-white mx-auto sticky rounded-t-xl rounded">
      <div className="relative w-full ">
        <LanguageToggle />
        <div className="flex p-[6px] gap-1">
          <div className="text-white h-11 bg-blue-700 w-fit px-2 flex items-center justify-center rounded-xl">
            <a href="#proyectos" className="items-center justify-center">
              Proyectos
            </a>
          </div>
          <div className="text-white h-11 bg-blue-700 w-fit px-2 flex items-center justify-center rounded-xl">
            <a href="#contacto" className="items-center justify-center">
              Contacto
            </a>
          </div>
          <div className="text-white h-11 bg-blue-700 w-fit px-2 flex items-center justify-center rounded-xl">
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
