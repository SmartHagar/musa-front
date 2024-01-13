/** @format */
"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import MenuTypes from "@/types/MenuTypes";
import SubMenu from "./SubMenu";

type Props = {
  menus: MenuTypes[];
};

const SidebarComp = ({ menus }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const router = useRouter();

  const pathname = usePathname();

  const findOpenMenus = (menuList: MenuTypes[]) => {
    for (const menu of menuList) {
      // console.log({ slug, menu });
      if (menu.href === pathname) {
        const second = pathname?.split("/");
        // if second.length > 0 remove index 0
        second.splice(0, 1);
        setOpenMenus(second);
      }
      // console.log({ menu });
      if (menu.subMenus) {
        // console.log({ menu });
        findOpenMenus(menu.subMenus);
      }
    }
  };

  useEffect(() => {
    findOpenMenus(menus);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleSingout = async () => {
    setIsLoading(true);
    // remove cookie token and role
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("dosen_id");
    // redirect to roote page
    router.push("/");
    setIsLoading(false);
  };

  return (
    <aside className="flex flex-col w-64 h-screen px-5 overflow-y-auto">
      <div className="flex items-center mt-2 gap-2 justify-center">
        <div className="relative h-[75px] w-20">
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
            src="/images/logo.png"
          />
        </div>
      </div>
      <div className="mt-2 mb-2 w-full border-b border-light">
        <p className="px-3 text-sm font-medium text-black text-center uppercase ">
          Menu
        </p>
      </div>

      <div className="flex flex-col justify-between flex-1 pt-2">
        <nav className="-mx-3 space-y-6 ">
          <div className="space-y-3 text-slate-800">
            {menus.map(({ name, href, icon, subMenus, slug }, index) => {
              const isActive = pathname === href;
              if (!subMenus) {
                return (
                  <div key={index}>
                    <Link
                      href={href}
                      className={`flex items-center px-3 py-2 transition-all duration-300 transform rounded-lg hover:bg-primary hover:text-white/70 ${
                        isActive &&
                        "border-b-2 border-primary text-primary bg-white/50"
                      }`}
                    >
                      <span>{icon}</span>
                      <span className="mx-2 text-sm font-medium">{name}</span>
                    </Link>
                  </div>
                );
              } else {
                return SubMenu({
                  subMenus,
                  name,
                  icon,
                  slug,
                  index,
                  pathname,
                  openMenus,
                });
              }
            })}
          </div>
        </nav>
        <div>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <button
              onClick={handleSingout}
              className="flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg text-secondary hover:underline hover:text-primary"
            >
              <span>Sign Out</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default SidebarComp;
