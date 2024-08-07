'use client';
import { CSSTransition } from "react-transition-group";
import { Console, MagicBall, Gamepad } from "@/public/icons";
import React, { useEffect, useState } from "react";
import Menu from "@/components/aboutMe/Menu";
import SubMenu from "@/components/aboutMe/SubMenu";
import Content from "@/components/aboutMe/Content";
import data from '@/developerData.json';
import Snippets from "@/components/aboutMe/Snippets";

const iconComponents: Record<string, JSX.Element> = {
    Console: <Console />,
    MagicBall: <MagicBall />,
    Gamepad: <Gamepad />
};

export default function AboutMe() {
    const [selectedMenu, setSelectedMenu] = useState<number>(0);
    const [selectedSubMenu, setSelectedSubMenu] = useState<number>(0);

    useEffect(() => {
        setSelectedSubMenu(0);
    }, [selectedMenu])

    const menuItems = data.aboutMe.menuItems.map(item => 
        React.cloneElement(iconComponents[item.icon], {
            key: item.key,
            className: `cursor-pointer hover:opacity-100 ${selectedMenu === item.key ? 'opacity-100' : 'opacity-40'}`
        })
    );

    const subMenuItems = data.aboutMe.subMenuItems;
    const folderColors = data.aboutMe.folderColors;
    const contents = data.aboutMe.contents;

    return (
        <CSSTransition
            in={true}
            timeout={300}
        >
            {state => (
                <main
                    id='main'
                    className={`main-${state} flex w-full grow`}
                >
                    <Menu
                        items={menuItems}
                        onSelect={setSelectedMenu}
                    />
                    <SubMenu 
                        items={subMenuItems[selectedMenu]} 
                        onSelect={setSelectedSubMenu} 
                        folderColors={folderColors} 
                        active={selectedSubMenu} 
                    />
                    <Content 
                        subhead={subMenuItems[selectedMenu].title} 
                        content={contents[selectedMenu][selectedSubMenu]} 
                    />
                    <Snippets />
                </main>
            )}
        </CSSTransition>
    );
}
