/* eslint-disable @next/next/no-img-element */
import MenuItem from './MenuItem';
import {
  TbDeviceCameraPhone,
  TbHistory,
  TbHome,
  TbLayoutDashboard,
  TbUserQuestion,
} from 'react-icons/tb';

const MENUS = [
  {
    path: '/',
    title: 'Pemetaan',
    icon: <TbHome className="w-8 h-8" />,
  },
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: <TbLayoutDashboard className="w-8 h-8" />,
  },
  {
    path: '/about',
    title: 'Tentang Kami',
    icon: <TbUserQuestion className="w-8 h-8" />,
  },
];

function Sidebar() {
  return (
    <div>
      <div className="w-[220px]"></div>
      <div className="w-[220px] h-[100vh] fixed bg-[#CA3433] text-white">
        <div className="flex flex-col px-4 py-8 gap-1">
          <div className="flex flex-col items-center justify-center gap-2">
            <img
              src="/embersense.svg"
              alt="Embersense Logo"
              className="w-20 h-20"
            />
            <div className="font-semibold">Embersense</div>
          </div>
          <div className="flex flex-col py-4 gap-1">
            {MENUS.map((menu) => (
              <MenuItem key={menu.title} menu={menu} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
