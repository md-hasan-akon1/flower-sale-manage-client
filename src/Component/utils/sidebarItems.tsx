import { NavLink } from "react-router-dom";
import { TSideBarItem, TUserPath, } from "../types/sidebarItem.type";

export const sidebarItemGenerator = (items: TUserPath[],role:string) => {
  const SideBarItem = items.reduce((acc: TSideBarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }
    if (item.children) {
      acc.push({
        key: item.name as string,
        label: item.name,
        children: item.children.map((child) => {
          if (child.name) {
            return {
              key: child.name,
              label: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>,
            };
          }
        }),
      });
    }
    return acc;
  }, []);

  return SideBarItem;
};
