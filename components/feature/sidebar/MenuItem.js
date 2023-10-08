import Link from 'next/link';

function MenuItem({ menu }) {
  return (
    <Link
      className="p-4 flex gap-2 justify-center items-center hover:bg-gray-600 transition-all duration-200  rounded-md"
      href={menu.path}
    >
      <div className="">{menu.icon}</div>
      <div className="w-full text-lg font-medium">{menu.title}</div>
    </Link>
  );
}

export default MenuItem;
