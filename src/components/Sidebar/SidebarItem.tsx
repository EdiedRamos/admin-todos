"use client";

import { usePathname } from "next/navigation";

interface Props {
  title: string;
  path: string;
  icon: React.ReactNode;
}

export const SidebarItem = ({ title, path, icon }: Props) => {
  const pathName = usePathname();
  const isActive = pathName === path;
  return (
    <li>
      <a
        href={path}
        className={`px-4 py-3 flex items-center space-x-4 rounded-md ${
          isActive
            ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
            : "text-gray-600 group"
        } `}
      >
        {icon}
        <span className="-mr-1 font-medium">{title}</span>
      </a>
    </li>
  );
};
