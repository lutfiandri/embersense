import MenuItem from './MenuItem';
import {
  TbDeviceCameraPhone,
  TbHistory,
  TbHome,
  TbLayoutDashboard,
} from 'react-icons/tb';

const MENUS = [
  {
    path: '/',
    title: 'Home',
    icon: <TbHome className="w-8 h-8" />,
  },
  {
    path: '/',
    title: 'Dashboard',
    icon: <TbLayoutDashboard className="w-8 h-8" />,
  },
  {
    path: '/',
    title: 'Riwayat',
    icon: <TbHistory className="w-8 h-8" />,
  },
  {
    path: '/',
    title: 'Perangkat Sensor',
    icon: <TbDeviceCameraPhone className="w-8 h-8" />,
  },
];

function Sidebar() {
  return (
    <div>
      <div className="w-[300px]"></div>
      <div className="w-[300px] h-[100vh] fixed bg-gray-700 text-white">
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
