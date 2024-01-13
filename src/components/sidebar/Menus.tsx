/** @format */
import MenuTypes from "@/types/MenuTypes";
import {
  BsFillBookFill,
  BsFillPersonLinesFill,
  BsHouseDoorFill,
  BsLampFill,
  BsPeopleFill,
  BsReverseLayoutTextWindowReverse,
} from "react-icons/bs";
const adminUrl = (href: string) => {
  return `/admin${href}`;
};
const menus: MenuTypes[] = [
  {
    name: "Dashboard",
    href: adminUrl("/"),
    icon: <BsHouseDoorFill />,
  },
  {
    name: "Tempat",
    href: "#",
    slug: "tempat",
    icon: <BsPeopleFill />,
    subMenus: [
      {
        name: "Kecamatan",
        href: adminUrl("/tempat/kecamatan"),
        icon: <BsPeopleFill />,
      },
    ],
  },
];

export default menus;
