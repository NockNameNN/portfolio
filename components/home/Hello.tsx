'use client'
import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';

export default function Hello() {
    return (
        <div className="text-white-header">
            <div>Всем привет! Меня зовут</div>
            <div className="text-head font-normal leading-none py-4">Руслан Сагдиев</div>
            <div className='text-blue text-[20px] md:text-subhead'>
                <div className='inline mr-5'>{">"}</div>
                <TypeAnimation
                    sequence={[
                    2000,
                    'Front-end developer',
                  ]}
                    wrapper="span"
                    speed={10}
                    className='inline'
                />
            </div>
            <div className='flex flex-col gap-y-2.5 mt-[10px] md:mt-[80px] text-label text-gray '>
                <div className='hidden md:block high-height:block'>{'//'} завершите игру для продолжения</div>
                <div>{'//'} можете посмотреть на GitHub</div>
                <div className='font-medium'>
                    <span className='text-blue'>const </span>
                    <span className='text-green-light'>githubLink </span>
                    <span>= </span>
                    <Link
                        href="https://github.com/NockNameNN/portfolio"
                        target='_blank'
                        className='hidden text-red underline underline-offset- decoration-solid md:inline'
                        
                    >&quot;https://github.com/NockNameNN/portfolio&quot;</Link>
                    <Link
                        href="https://github.com/NockNameNN/portfolio"
                        target='_blank'
                        className='text-red underline underline-offset- decoration-solid md:hidden'
                    >&quot;https://github.com/...&quot;</Link>
                </div>
            </div>
            
        </div>
    )
}
