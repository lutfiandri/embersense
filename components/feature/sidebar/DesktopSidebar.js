/* eslint-disable @next/next/no-img-element */
import React from 'react';
import MenuItem from './MenuItem';

function DesktopSidebar({ menus, pathname }) {
  return (
    <div className="hidden lg:block">
      <div className="w-[220px]"></div>
      <div className="w-[220px] h-[100vh] fixed bg-[#CA3433] text-white">
        <div className="flex flex-col px-4 py-8">
          <div className="flex flex-col items-center justify-center gap-1">
            <img
              src="/embersense.svg"
              alt="Embersense Logo"
              className="w-24 h-24"
            />
            <div className="font-semibold">Embersense</div>
          </div>
          <div className="flex flex-col py-4 gap-1">
            {menus.map((menu) => (
              <MenuItem key={menu.title} menu={menu} pathname={pathname} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesktopSidebar;
