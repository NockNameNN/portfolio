import { Close } from '@/public/icons';
import { useEffect, useRef, useState } from 'react';

interface IProps {
    subhead: string;
    content: string;
}

export default function Content({ subhead, content }: IProps) {
    const [lineCount, setLineCount] = useState<number>(0);
    const contentRef = useRef<HTMLPreElement>(null);

    useEffect(() => {
        updateLines();
        window.addEventListener('resize', updateLines);
        return () => {
            window.removeEventListener('resize', updateLines);
        };
    }, []);

    useEffect(() => {
        updateLines();
    }, [content]);

    const updateLines = () => {
        if (contentRef.current) {
            const lineHeight = parseInt(window.getComputedStyle(contentRef.current).lineHeight);
            const contentHeight = contentRef.current.scrollHeight;
            const lines = Math.ceil(contentHeight / lineHeight) + 1;
            setLineCount(lines);
        }
    };

    const getLineContent = (index: number) => {
        if (index === 0) return '/**';
        if (index === lineCount - 1) return '*/';
        return '*';
    };

    return (
        <div className='w-[700px] border-r'>
            <div className='flex'>
                <div className="subhead gap-12 pr-3 w-fit border-r flex-none text-label">
                    {subhead}
                    <Close />
                </div>
                <div className='subhead w-full'></div>
            </div>  
            <div className='flex mt-5 font-fira_retina text-menu-text'>
                <div className='lg:flex flex-col w-32 hidden'>
                    {Array.from({ length: lineCount }, (_, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-2 justify-end"
                        >
                            <span className="col-span-1 mr-3">{index + 1}</span>
                            <div className="col-span-1 flex justify-center">{getLineContent(index)}</div>
                        </div>
                    ))}
                </div>
                <div className='text-container'>
                    <pre
                        ref={contentRef}
                        className='text-wrap'
                    >
                        {`\n${content}`}
                    </pre>
                </div>
            </div>
        </div>
    );
}
