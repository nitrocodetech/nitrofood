'use client';

import React, { JSX } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Assets & Icons
import Logo from '@/assets/nitro-logo.png';
import {
  BadgeDollarSign,
  Banknote,
  Bike,
  Images,
  ShoppingBasket,
  SlidersHorizontal,
  Store,
  TicketPercent,
  Users,
  Frame,
  Map,
} from 'lucide-react';

type SidebarItem = {
  name: string;
  icon: JSX.Element;
  link: string;
};

const sidebarItems: SidebarItem[] = [
  { name: 'Dashboard', icon: <Frame size={20} />, link: '/dashboard' },
  { name: 'Zone', icon: <Map size={20} />, link: '/zone' },
  { name: 'Users', icon: <Users size={20} />, link: '/users' },
  { name: 'Restaurants', icon: <Store size={20} />, link: '/restaurant' },
  { name: 'Riders', icon: <Bike size={20} />, link: '/riders' },
  { name: 'Products', icon: <ShoppingBasket size={20} />, link: '/products' },
  { name: 'Orders', icon: <BadgeDollarSign size={20} />, link: '/orders' },
  { name: 'Banners', icon: <Images size={20} />, link: '/banners' },
  { name: 'Coupons', icon: <TicketPercent size={20} />, link: '/coupons' },
  { name: 'Tip', icon: <Banknote size={20} />, link: '/tips' },
  {
    name: 'Management',
    icon: <SlidersHorizontal size={20} />,
    link: '/management',
  },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname(); // 👈 current route path

  return (
    <div className="w-64 flex-shrink-0 flex flex-col gap-10 px-[23px] h-screen pt-8 border border-gray-200">
      <div className="flex justify-center">
        <Image src={Logo} alt="Logo" width={180} height={24} />
      </div>

      <nav className="flex flex-col gap-3">
        {sidebarItems.map((item, index) => {
          const isActive = pathname.startsWith(item.link);

          return (
            <Link
              href={item.link}
              key={index}
              className={`group flex items-center gap-4 px-5 py-2 hover:bg-(--darkprimary) rounded-md text-sm font-medium font-display transition
                ${
                  isActive
                    ? 'bg-(--darkprimary) text-white'
                    : 'text-(--sidebartext) hover:bg-[--darkprimary] hover:text-white'
                }
              `}
            >
              <span
                className={`${
                  isActive ? 'text-white' : 'text-gray-500 group-hover:text-white'
                } transition`}
              >
                {item.icon}
              </span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
