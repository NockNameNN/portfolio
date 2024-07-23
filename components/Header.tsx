'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation'
import GitHubCorners from '@uiw/react-github-corners';

const navItems = [
    ['sagdiev-ruslan', '/'],
    ['_hello', '/'],
    ['_about-me', '/about-me'],
    ['_projects', '/projects'],
    ['_contact-me', '/contact-me']
];

export default function Header() {
    const pathname = usePathname();
    return (
        <header className="w-full h-[50px] text-label border-b flex">
            <GitHubCorners
                href="https://github.com/NockNameNN/portfolio"
                color='#43D9AD'
                bgColor='#011627'
            />
            <nav className="flex justify-between w-full">
                <div className="flex">
                    {navItems.slice(0, -1).map((item, index) => {
                    const isActive = pathname === item[1] && index !== 0;
                    return (
                        <Link
                            className={`px-6 h-full content-center border-r hover:bg-line 
                                ${index === 0 ? 'pr-[154px]' : 'hover:text-white'} 
                                ${isActive ? 'text-white border-b-[3px] border-b-orange border-3' : ''}`}
                            href={item[1]}
                            key={index}
                        >
                            {item[0]}
                        </Link>
                    )
                })}
                </div>
                <Link
                    className={`flex items-center px-6 border-l hover:bg-line hover:text-white 
                        ${pathname === navItems[4][1] ? 'text-white border-b-[3px] border-b-orange border-3' : ''}`}
                    href={navItems[navItems.length-1][1]}
                >
                    {navItems[navItems.length-1][0]}
                </Link>
            </nav>
        </header>
    )
}
