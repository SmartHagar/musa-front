/** @format */
"use client";

import { usePathname } from "next/navigation";

const HeaderAdmin = () => {
  const pathname = usePathname();
  return (
    <div className="lg:backdrop-blur-sm lg:py-2">
      {pathname === "/admin" ? (
        <p className="text-lg text-center">Selamat Datang admin</p>
      ) : (
        <p className="text-lg text-center tracking-[0.2rem]">SILAKU</p>
      )}
    </div>
  );
};

export default HeaderAdmin;
