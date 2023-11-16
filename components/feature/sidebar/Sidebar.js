/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import MenuItem from './MenuItem';
import {
  TbDeviceCameraPhone,
  TbFlagStar,
  TbHistory,
  TbHome,
  TbLayoutDashboard,
  TbUserQuestion,
} from 'react-icons/tb';
import DesktopSidebar from './DesktopSidebar';
import MobileSidebar from './MobileSidebar';

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
    path: '/recommendation',
    title: 'Rekomendasi Peletakan',
    icon: <TbFlagStar className="w-8 h-8" />,
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
    <>
      <MobileSidebar menus={MENUS} pathname={router.pathname}></MobileSidebar>
      <DesktopSidebar menus={MENUS} pathname={router.pathname}></DesktopSidebar>
    </>
  );
}

export default Sidebar;
