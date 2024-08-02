'use client'
import { CSSTransition } from "react-transition-group"
import { Console, MagicBall, Gamepad } from "@/public/icons"
import { useEffect, useState } from "react";
import Menu from "@/components/aboutMe/Menu";
import SubMenu from "@/components/aboutMe/SubMenu";
import Content from "@/components/aboutMe/Content";

export default function AboutMe() {
    const [selectedMenu, setSelectedMenu] = useState<number>(0);
    const [selectedSubMenu, setSelectedSubMenu] = useState<number>(0);

    useEffect(() => {
        setSelectedSubMenu(0);
    }, [selectedMenu])

    const menuItems = [
        <Console
            key={0}
            className={`cursor-pointer hover:opacity-100 ${selectedMenu === 0 ? 'opacity-100' : 'opacity-40'}`}
        />, 
        <MagicBall
            key={1}
            className={`cursor-pointer hover:opacity-100 ${selectedMenu === 1 ? 'opacity-100' : 'opacity-40'}`}
        />, 
        <Gamepad
            key={2}
            className={`cursor-pointer hover:opacity-100 ${selectedMenu === 2 ? 'opacity-100' : 'opacity-40'}`}
        />
    ];
    const subMenuItems = [
        {
            title: 'professional-info',
            items: ['experience', 'hard-skills', 'soft-skills'],
        },
        {
            title: 'personal-info',
            items: ['bio', 'interests', 'education'],
        },
        {
            title: 'hobbies-info',
            items: ['board-games', 'computer-games'],
        },
    ];
    const folderColors = ['#E99287', '#43D9AD', '#3A49A4'];
    const contents = [
        [
            `Опыт разработки - 8 месяцев.
Последний разрабатываемый проект - сайт аспирантуры для своего вуза.
Моими обязанностями в процессе работы были:

- Разработка frontend части сайта аспирантуры Сибирского Федерального Университета, используя HTML, CSS, TypeScript, React, API, SCSS и другие современные веб-технологии.

- Интеграция и взаимодействие с backend через RESTful API для реализации функциональности пользовательских интерфейсов.

- Оптимизация производительности и обеспечение адаптивного дизайна веб-приложения.`,
            `ХАРД
скиллы`,
            'СОФТ',
        ],
        [
            'БИО',
            'ИНТЕРЕСЫ',
            'ОБРАЗОВАНИЕ',
        ],
        [
            'НАСТОЛКИ',
            'КОМПЬЮТЕРНЫЕ ИГРЫ',
        ],
    ];

    return (
        <CSSTransition
            in={true}
            timeout={300}
        >
            {state => <div className={`main-${state} flex w-full grow`}>
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
            </div>}
        </CSSTransition>
    )
}
