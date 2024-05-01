import nav_menus_list from "@/data/headernav/nav-menus";
import useGlobalContext from "@/hooks/use-context";
import Link from "next/link";
import React,{useState} from "react";

const MobileMenu = () => {
    const {setShowSidebar} = useGlobalContext()
    const safeSetShowSidebar = setShowSidebar || (() => {});
    const [submenuOpen, setSubmenuOpen] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);
  
    const handleMenuToggle = (id: number) => {
      setSubmenuOpen(id)
      setOpen(!open);
    };
  
  return (
    <>
      <ul>
        {nav_menus_list.map((item, index) => (
          <li
          onClick={() => handleMenuToggle(item.id)}
            key={index}
            className={`${
              item.hasDropdown && submenuOpen === item.id && open === true ? "menu-item-has-children has-droupdown active" : `${item.hasDropdown ? "menu-item-has-children has-droupdown" : ""}`
            }`}
          >
            <Link href="">{item.title}</Link>
            {item.hasDropdown && (
              <ul
                className={`sub-menu ${item.hasDropdown  && submenuOpen === item.id && open === true ? "active" : ""}`}
              >
                {item.dropdownItems &&
                  item.dropdownItems.map((dropdownItem, subIndex) => (
                    <li key={subIndex}>
                      <Link onClick={() => safeSetShowSidebar(false)} href={dropdownItem.link}>{dropdownItem.title}</Link>
                    </li>
                  ))}
              </ul>
            )}
          </li>
        ))}
        
      </ul>
    </>
  );
};

export default MobileMenu;
