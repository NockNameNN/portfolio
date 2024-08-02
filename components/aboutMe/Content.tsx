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
            <div className='flex mt-5'>
                <div className='ml-10 lg:flex flex-col w-16 min-w-[4rem] hidden'>
                    {Array.from({ length: lineCount }, (_, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-2 gap-10 items-center"
                        >
                            <span className="col-span-1 text-right">{index + 1}</span>
                            <div className="col-span-1">{getLineContent(index)}</div>
                        </div>
                    ))}
                </div>
                <div className='flex-1 text-container pl-4'>
                    <pre
                        ref={contentRef}
                        className='whitespace-pre-wrap'
                    >
                        {`\n${content}`}
                    </pre>
                </div>
            </div>
        </div>
    );
}
