/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx';
import React, { useState } from 'react';
import { TbMenu2, TbX } from 'react-icons/tb';
import MenuItem from './MenuItem';

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
      <div
        className={clsx(
          'fixed w-full h-[calc(100vh-48px)] bg-[#CA3433] top-12 duration-300 text-white',
          isOpen ? 'left-0' : '-left-[100%]'
        )}
      >
        <div className="flex flex-col py-4 gap-1 m-4">
          {menus.map((menu) => (
            <MenuItem key={menu.title} menu={menu} pathname={pathname} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MobileSidebar;
