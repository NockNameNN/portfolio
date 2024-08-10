import { Arrow, Folder, FolderArrow, Mail, Phone } from "@/public/icons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SubMenuList from "./SubMenuList";
import Contacts from "./Contacts";

interface subMenuItem {
  title: string,
  items: string[],
};

interface ISubMenuProps {
  items: subMenuItem;
  onSelect: Dispatch<SetStateAction<number>>;
  folderColors: string[];
  active: number;
};

const SubMenu: React.FC<ISubMenuProps> = ({items, onSelect, folderColors, active}) => {
    return (
        <div className="w-[245px] hidden border-r font-normal text-label xl:block">
            <SubMenuList
                items={items}
                onSelect={onSelect}
                folderColors={folderColors}
                active={active}
                defaultIsOpen
            />
            <Contacts defaultIsOpen/>
        </div>
    );
}

export default SubMenu;
