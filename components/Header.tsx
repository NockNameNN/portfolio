'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { Sling as Hamburger } from 'hamburger-react'
import { useState } from "react";
import { CSSTransition } from "react-transition-group";

const navItems = [
    ['sagdiev-ruslan', '/'],
    ['_hello', '/'],
    ['_about-me', '/about-me'],
    ['_projects', '/projects'],
];

export default function Header() {
    const [isOpen, setOpen] = useState(false)
    const pathname = usePathname();
    
    const handlerBurger = () => {
        const main = document.getElementById('main');
        const subbody = document.getElementById('subbody');
        if (main) {
            if (!isOpen) {
                main.classList.add('hidden');
                if (subbody) {
                    subbody.classList.add('h-full')
                }
            } else {
                main.classList.remove('hidden');
                if (subbody) {
                    subbody.classList.remove('h-full')
                }
            }
        }
    }

    return (
        <header className="w-full h-16 text-label border-b flex relative z-20 lg:h-[50px] lg:min-h-[50px]">
            <nav className="hidden lg:flex">
                {navItems.map((item, index) => {
                    const isActive = pathname === item[1] && index !== 0;
                    return (
                        <Link
                            className={`px-6 h-full content-center border-r hover:bg-line 
                                ${index === 0 ? 'pr-[154px]' : 'hover:text-white'} 
                                ${isActive && 'text-white border-b-[3px] border-b-orange border-3'}`}
                            href={item[1]}
                            key={index}
                        >
                            {item[0]}
                        </Link>
                    )
                })}
            </nav>
            <div className="flex h-16 min-h-16 justify-between items-center mx-5 w-full lg:hidden">
                <Link
                    href={navItems[0][1]}
                >
                    {navItems[0][0]}
                </Link>
                <button
                    type="button"
                    onClick={handlerBurger}
                >
                    <Hamburger
                        toggled={isOpen}
                        toggle={setOpen}
                    />
                </button>

                {isOpen && 
                <CSSTransition 
                    in={true}
                    timeout={300}
                >{state => 
                    <nav className={`flex flex-col absolute right-0 top-16 w-full z-10 main-${state}`}>
                        {navItems.slice(1).map((item, index) => {
                            const isActive = pathname === item[1];
                            return (
                                <Link
                                    className={`h-16 border-b px-5 content-center w-full hover:bg-line hover:text-white ${isActive && 'text-white'}`}
                                    href={item[1]}
                                    key={index}
                                    onClick={() => {
                                        handlerBurger; 
                                        setOpen(false);}
                                    }
                                >
                                    {item[0]}
                                </Link>
                            )
                        })}
                    </nav>}
                </CSSTransition>}
            </div>
        </header>
    )
}
