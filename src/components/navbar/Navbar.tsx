/** @format */
"use client";
import Image from "next/image";
import React from "react";
import menus from "./menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {};

const Navbar = (props: Props) => {
  const pathname = usePathname();

  return (
    <div className="text-body py-2 px-10 shadow-md flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14">
          <Image
            alt="logo"
            fill
            sizes="(100vw, 100vh)"
            style={{
              objectFit: "contain",
              objectPosition: "center",
              width: "100%",
              height: "100%",
            }}
            className="rounded-full"
            src="/images/uogp.png"
          />
        </div>
        <h4 className="font-bold">Alumni Ottow Geissler</h4>
      </div>
      {/* menus */}
      <div className="flex gap-20 items-center">
        <div className="flex gap-8">
          {menus.map((menu) => (
            <div
              key={menu.name}
              className={`${
                pathname === menu.href
                  ? "border-b border-secondary border-dashed"
                  : ""
              }`}
            >
              <Link href={menu.href} className="font-semibold">
                {menu.name}
              </Link>
            </div>
          ))}
        </div>
        <div>
          <Link className="btn-primary px-6 py-2 rounded-full" href="/login">
            LOGIN
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
