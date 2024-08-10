import data from '@/developerData.json';
import { Arrow } from '@/public/icons';
import { Dispatch, SetStateAction, useState } from 'react';
import SubMenu from './SubMenu';
import Contacts from './Contacts';
import SubMenuList from './SubMenuList';

interface subMenuItem {
    title: string,
    items: string[],
  };
  
  interface IMobileMenuProps {
    items: subMenuItem[];
    onSelect: Dispatch<SetStateAction<number>>;
    folderColors: string[];
    active: number;
  };

export default function MobileMenu({items, onSelect, folderColors, active}: IMobileMenuProps) {
    const [indexMenu, setIndexMenu] = useState<number|null>(null)
  return (
      <div className='flex flex-col gap-[3px] font-normal text-label xl:hidden'>
          {data.aboutMe.subMenuItems.map((item, index) => (
              <div key={index}>
                  <SubMenuList
                      items={item}
                      onSelect={onSelect}
                      folderColors={folderColors}
                      active={active}
                      defaultIsOpen={false}
                  />
                  {/* <button
                      className={`flex bg-line items-center w-full px-6 gap-3 py-1 text-white`}
                      onClick={() => { setIndexMenu(indexMenu === index ? null : index)}}
                  >
                      <Arrow className={`transition-rotate -rotate-90 ${indexMenu === index && 'rotate-0'}`}/>
                      {item.title}
                  </button> */}
                  {/* {indexMenu === index && <SubMenu ></SubMenu>} */}
              </div>
        ))}
          {/* <SubMenuList /> */}
          <Contacts defaultIsOpen={false}/>
      </div>
  )
}
