'use client';
import { CSSTransition } from "react-transition-group";
import { Console, MagicBall, Gamepad } from "@/public/icons";
import React, { useEffect, useState } from "react";
import Menu from "@/components/aboutMe/Menu";
import SubMenu from "@/components/aboutMe/SubMenu";
import Content from "@/components/aboutMe/Content";
import data from '@/developerData.json';
import Snippets from "@/components/aboutMe/Snippets";
import MobileMenu from "@/components/aboutMe/MobileMenu";

const iconComponents: Record<string, JSX.Element> = {
    Console: <Console />,
    MagicBall: <MagicBall />,
    Gamepad: <Gamepad />
};

function calculateExperience(startDate: string) {
    const start = new Date(startDate);
    const now = new Date();
    const yearsDiff = now.getFullYear() - start.getFullYear();
    const monthsDiff = now.getMonth() - start.getMonth() + 4;
    
    const totalMonths = yearsDiff * 12 + monthsDiff;
    
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (years > 0 && months > 0) {
        return `${years} год${years > 1 ? 'а' : ''} и ${months} месяц${months > 1 ? 'а' : ''}`;
    } else if (years > 0) {
        return `${years} год${years > 1 ? 'а' : ''}`;
    } else {
        return `${months} месяц${months > 1 ? 'а' : ''}`;
    }
}

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

    const startDate = '2024-01-30';
    const experienceFormatted = calculateExperience(startDate);

    const subMenuItems = data.aboutMe.subMenuItems;
    const folderColors = data.aboutMe.folderColors;
    const contents = data.aboutMe.contents;

    contents[0][0] = `Опыт разработки - ${experienceFormatted}. \n\nВ данный момент разрабатываю в одиночку дипломную работу - сайт, где будет реализована игра "Мафия" с вебками. Благодаря этому проекту, я впервые серьёзно начал изучать бэкенд и веб-сокеты. \n\nСтек технологий, используемый на данный момент для разработки мафии, включает Next.js, Redux-toolkit, WebRTC, socket.io, tailwind, бэк организую с помощью express на node.js, sequelize, в качестве бд выступает postgresql, также использую JWT для аутентификации пользователей. \n\nТакже участвовал в разработке сайта аспирантуры Сибирского Федерального университета. Моими обязанностями в процессе работы были:\n\n- Разработка frontend части сайта аспирантуры Сибирского Федерального Университета, используя HTML, CSS, TypeScript, React, API, SCSS и другие современные веб-технологии.\n\n- Интеграция и взаимодействие с backend через RESTful API для реализации функциональности пользовательских интерфейсов.\n\n- Оптимизация производительности и обеспечение адаптивного дизайна веб-приложения.\n\nПримеры реализованных страниц:\n\n- Личный кабинет пользователя.\nРеализован интерфейс для вывода и редактирования личной информации. Присутствует интеграция с API для сохранения и получения данных.\n\n- Таблица с отчётностью аспирантов.\nСоздан интерфейс для отображения и фильтрации данных отчётности с гибкой системой фильтров и сортировки, а также оптимизацией для работы с большим объёмом данных.\n\n- Список научных руководителей.\nРазработка интерфейса для отображения списка научных руководителей с функцией выбора аспирантом научного руководителя с помощью API.\n\nТакже проходил три летних практики в SibDev, студии веб-разработки и сопровождения.`;

    return (
        <CSSTransition
            in={true}
            timeout={300}
        >
            {state => (
                <main
                    id='main'
                    className={`main-${state} flex flex-col xl:flex-row w-full grow overflow-auto xl:overflow-hidden`}
                >
                    <div className="flex flex-col xl:flex-row">
                        <div className="flex h-[70px] mx-6 text-code text-white xl:hidden">
                            <h2 className="self-center">_about-me</h2>
                        </div>
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
                        <MobileMenu
                            items={subMenuItems} 
                            onSelect={setSelectedSubMenu} 
                            folderColors={folderColors} 
                            active={selectedSubMenu}
                        />
                    </div>
                    <div className="flex flex-col h-content xl:grid xl:grid-cols-2 w-full xl:h-full">
                        <Content 
                            subhead={subMenuItems[selectedMenu].title} 
                            content={contents[selectedMenu][selectedSubMenu]}
                        />
                        <Snippets />
                    </div>

                </main>
            )}
        </CSSTransition>
    );
}
