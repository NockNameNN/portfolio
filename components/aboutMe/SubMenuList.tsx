import { Arrow, Folder, FolderArrow } from '@/public/icons'
import React, { Dispatch, SetStateAction, useState } from 'react'

type subMenuItem = {
    title: string,
    items: string[],
};

interface subMenuListProps {
    items: subMenuItem;
    onSelect: Dispatch<SetStateAction<number>>;
    folderColors: string[];
    active: number;
    defaultIsOpen: boolean;
};

export default function SubMenuList({items, onSelect, folderColors, active, defaultIsOpen}: subMenuListProps) {
    const [isOpen, setIsOpen] = useState<boolean>(defaultIsOpen);
    return (
        <div>
            <button
                className='borderClasses'
                onClick={() => {setIsOpen(!isOpen)}}
            >
                <Arrow className={`transition-rotate ${!isOpen && '-rotate-90'}`}/>
                <p>{items.title}</p>
            </button>
            {isOpen && <ul className="flex flex-col pl-3.5 gap-2 pt-4 pb-7 border-b">
                {items.items.map((item, index) => (
                    <li
                        key={index}
                        onClick={() => onSelect(index)}
                        className={`commonClasses ${index === active && 'text-white'}`}
                    >
                        <FolderArrow className={`transition-rotate ${index === active && 'rotate-90'}`}/>
                        <div className="flex gap-2 items-center">
                            <Folder color={folderColors[index]}/>
                            {item}
                        </div>
                    </li>
                ))}
            </ul>}
        </div>
    )
}
