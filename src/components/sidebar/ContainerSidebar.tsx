/** @format */
"use client";
import React, { useEffect } from "react";
import { FaAlignJustify, FaXmark } from "react-icons/fa6";
import menus from "./Menus";
import { useMenuContext } from "@/context/MenuContext";
import { usePathname } from "next/navigation";
import SidebarComp from "./SidebarComp";

type Props = {};

const ContainerSidebar = (props: Props) => {
  const { isOpen, setIsOpen } = useMenuContext();
  const pathName = usePathname();
  useEffect(() => {
    const width = window.innerWidth >= 1024;
    width ? setIsOpen(true) : setIsOpen(false);

    return () => {
      setIsOpen(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName]);

  return (
    <div className="relative">
      <div
        className="lg:hidden mt-2 ml-2 z-50 h-7 absolute"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <FaXmark className=" text-3xl absolute left-[15rem] bg-side-bar text-dark rounded-tr-lg rounded-br-lg" />
        ) : (
          <FaAlignJustify className="text-2xl" />
        )}
      </div>

      <aside className="absolute hidden lg:static lg:block w-[15.5rem] lg:w-[18rem] z-10 bg-accent rounded-lg shadow-lg shadow-black">
        <SidebarComp menus={menus} />
      </aside>
    </div>
  );
};

export default ContainerSidebar;
