import { Arrow, Folder, FolderArrow, Mail, Phone } from "@/public/icons";
import { Dispatch, SetStateAction } from "react";

interface subMenuItem {
  title: string,
  items: string[],
};

interface IProps {
  items: subMenuItem;
  onSelect: Dispatch<SetStateAction<number>>;
  folderColors: string[];
  active: number;
};

const commonClasses = "flex gap-3.5 items-center cursor-pointer hover:text-white";
const borderClasses = "subhead gap-2.5 text-white cursor-pointer";

const SubMenu: React.FC<IProps> = ({items, onSelect, folderColors, active}) => {
  return (
      <div className="w-[245px] border-r font-normal text-label">
          <div className={borderClasses}>
              <Arrow />
              <p>{items.title}</p>
          </div>
          <ul className="flex flex-col pl-[14px] gap-2 pt-4 pb-7 border-b">
              {items.items.map((item, index) => (
                  <li
                      key={index}
                      onClick={() => onSelect(index)}
                      className={`${commonClasses} ${index === active ? 'text-white' : ''}`}
                  >
                      <FolderArrow className={`${index === active ? 'rotate-90' : ''}`}/>
                      <div className="flex gap-2 items-center">
                          <Folder color={folderColors[index]}/>
                          {item}
                      </div>
                  </li>
        ))}
          </ul>
          <div className={borderClasses}>
              <Arrow />
              <p>contacts</p>
          </div>
          <div className="flex flex-col pl-[14px] gap-2 pt-4">
              <a
                  onClick={() => {}}
                  className={commonClasses}
                  href="mailto:nockname2@mail.ru"
              >
                  <Mail />
                  <p>nockname2@mail.ru</p>
              </a>
              <a
                  onClick={() => {}}
                  className={commonClasses}
                  href="tel:89509986963"
              >
                  <Phone />
                  <p>+79509986963</p>
              </a>
          </div>
      </div>
  );
}

export default SubMenu;
