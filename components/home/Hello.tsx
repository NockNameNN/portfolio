'use client'
import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';

export default function Hello() {
    return (
        <div className="text-white-header">
            <div>Всем привет! Меня зовут</div>
            <div className="text-head">Руслан Сагдиев</div>
            <div className='text-blue text-subhead'>
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
            <div className='flex-col gap-y-4 mt-[80px] text-label text-gray '>
                <div className='pb-4'>{'//'} заверши игру для продолжения</div>
                <div className='text-label text-gray pb-4'>{'//'} можете посмотреть её на GitHub</div>
                <div>
                    <span className='text-blue'>const </span>
                    <span className='text-green-light'>githubLink </span>
                    <span>= </span>
                    <Link
                        href="https://github.com/NockNameNN/portfolio"
                        target='_blank'
                        className='text-red underline underline-offset- decoration-solid'
                        
                    >&quot;https://github.com/NockNameNN/portfolio&quot;</Link>
                </div>
            </div>
            
        </div>
    )
}
