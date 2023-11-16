/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { TbMenu2, TbX } from 'react-icons/tb';

function MobileSidebar({ menus, pathname }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="lg:hidden z-[99999]">
      <div className="h-12"></div>
      {/* header */}
      <div className="fixed h-12 top-0 left-0 flex bg-[#CA3433] text-white w-full items-center justify-between px-4">
        <div className="flex items-center">
          <img
            src="/embersense.svg"
            alt="Embersense Logo"
            className="w-8 h-8"
          />
          <div className="font-semibold">Embersense</div>
        </div>
        <div>
          {isOpen ? (
            <TbX
              className="w-6 h-6 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          ) : (
            <TbMenu2
              className="w-6 h-6 cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
          )}
        </div>
      </div>

      {/* slide menu */}
      {/* <div className="fixed w-full h-screen bg-red-400 top-0 left-0"></div> */}
    </div>
  );
}

export default MobileSidebar;
