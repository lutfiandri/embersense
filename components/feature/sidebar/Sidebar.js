/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
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
  const router = useRouter();
  console.log(router.pathname);
  return (
    <div>
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
            {MENUS.map((menu) => (
              <MenuItem
                key={menu.title}
                menu={menu}
                pathname={router.pathname}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
