/** @format */
"use client";
import { FC } from "react";

import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
type Props = {
  user: any;
};

const HeaderDosen: FC<Props> = ({ user }) => {
  Cookies.set("dosen_id", user?.id);
  const pathname = usePathname();
  return (
    <div className="lg:backdrop-blur-sm lg:py-2 pl-7">
      <p className="text-xl font-medium text-center">
        {pathname === "/dosen" && "Selamat Datang "} {user?.name}
      </p>
    </div>
  );
};

export default HeaderDosen;
