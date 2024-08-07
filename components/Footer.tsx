'use client'
import Link from "next/link";
import {Vk, Telegram, GitHub} from '@/public/icons';

type Item = [string | JSX.Element, string];

const contacts: Item[] = [
    [<Vk key={1} />, 'https://vk.com/suslikdl'],
    [<Telegram key={2} />, 'https://t.me/nockname'],
    [<GitHub
        className='opacity-40 group-hover:opacity-100'
        key={3}
    />, 'https://github.com/nocknamenn'],
];

export default function Header() {
    return (
        <footer className="w-full h-[50px] text-label border-t flex justify-between">
            <div className="flex">
                <span className="px-3.5 content-center border-r">find me in:</span>
                {contacts.slice(0, -1).map((contact, index) => {
                    return (
                        <Link
                            target="_blank"
                            className={`px-3.5 h-full opacity-40 content-center border-r hover:bg-line hover:opacity-100`}
                            href={contact[1]}
                            key={index}
                        >
                            {contact[0]}
                        </Link>
                    )
                })}
            </div>
            <Link
                className={`flex px-3.5 h-full items-center border-l hover:bg-line group`}
                href={contacts[contacts.length-1][1]}
                target="_blank"
            >
                <span className="hidden md:block mr-[5px]">@nocknamenn</span>
                {contacts[contacts.length-1][0]}
            </Link>
        </footer>

    )
}
