import Link from 'next/link';

function MenuItem({ menu }) {
  return (
    <Link
      className="p-4 flex gap-2 justify-center items-center hover:bg-red-500 transition-all duration-200  rounded-md"
      href={menu.path}
    >
      <div className="scale-75">{menu.icon}</div>
      <div className="w-full text-sm font-medium">{menu.title}</div>
    </Link>
  );
}

export default MenuItem;
