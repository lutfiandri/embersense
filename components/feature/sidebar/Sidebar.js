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
      <div className="w-[200px]"></div>
      <div className="w-[200px] h-[100vh] fixed bg-slate-700 text-white">
        <div className="flex flex-col p-4 gap-1">
          <div>embersense</div>
          {MENUS.map((menu) => (
            <MenuItem key={menu.title} menu={menu} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
