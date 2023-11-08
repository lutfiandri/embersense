import clsx from 'clsx';
import Link from 'next/link';

function MenuItem({ menu, pathname }) {
  return (
    <Link
      className={clsx(
        'p-4 flex gap-2 justify-center items-center hover:bg-red-500 transition-all duration-200  rounded-md',
        pathname === menu.path ? 'bg-[#e04848]' : ''
      )}
      href={menu.path}
    >
      <div className="scale-75">{menu.icon}</div>
      <div className="w-full text-sm font-medium">{menu.title}</div>
    </Link>
  );
}

export default MenuItem;
