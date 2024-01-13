/** @format */

interface MenuTypes {
  name: string;
  href: string;
  icon?: JSX.Element;
  slug?: string;
  subMenus?: MenuTypes[];
}

export default MenuTypes;
