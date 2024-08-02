'use client'
import { BoltDownLeft, BoltDownRight, BoltUpLeft, BoltUpRight, Food, Arrow } from '@/public/icons';
import { useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import { useRouter } from 'next/navigation'

interface SnakeCell {
    x: number,
    y: number,
}

export default function Game() {
    const router = useRouter();
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [food, setFood] = useState<SnakeCell>({x: 10, y: 5});
    const [foodOpacities, setFoodOpacities] = useState<number[]>(Array(10).fill(1));
    const [snake, setSnake] = useState<SnakeCell[]>([
        { x: 10, y: 12 },
        { x: 10, y: 13 },
        { x: 10, y: 14 },
        { x: 10, y: 15 },
        { x: 10, y: 16 },
        { x: 10, y: 17 },
        { x: 10, y: 18 },
        { x: 11, y: 18 },
        { x: 12, y: 18 },
        { x: 13, y: 18 },
        { x: 14, y: 18 },
        { x: 15, y: 18 },
        { x: 15, y: 19 },
        { x: 15, y: 20 },
        { x: 15, y: 21 },
        { x: 15, y: 22 },
        { x: 15, y: 23 },
        { x: 15, y: 24 },
    ]);
    const [direction, setDirection] = useState<string>('up');
    const gameScreenRef = useRef<HTMLDivElement>(null);
    const consoleRef = useRef<HTMLDivElement>(null);
    const gameIntervalRef = useRef<number | undefined>(undefined);

    const handleClickStartGame = () => {
        setGameStarted(!gameStarted);
        setGameOver(!gameOver);
        setFoodOpacities(Array(10).fill(0.3));
    }

    const handleClickStartAgainGame = () => {
        setGameStarted(!gameStarted);
        setGameOver(!gameOver);
        setFoodOpacities(Array(10).fill(1));
    }
    
    return (
        <div>
            <div className="absolute right-[-100px] bottom-[-200px] w-[500px] h-[500px] rounded-blurry-gradient rotate-10 blur-[70px] bg-blurry-gradient-blue opacity-50"></div>
            <div className="absolute right-[200px] top-[-150px] w-[500px] h-[500px] rounded-blurry-gradient rotate-10 blur-[70px] bg-blurry-gradient-green opacity-50"></div>
            <Transition
                in={true}
                timeout={300}
            >{state => <div className={`relative h-[475px] w-[510px] bg-gradient-game rounded-[10px] console-${state}`}>

                <BoltDownLeft className='absolute bottom-2 left-2'/>
                <BoltDownRight className='absolute bottom-2 right-2'/>
                <BoltUpLeft className='absolute top-2 left-2'/>
                <BoltUpRight className='absolute top-2 right-2'/>

                <div
                    className='flex p-[35px] border border-[#0C1616] text-white h-full w-full relative shadow-inner-game rounded-lg'
                >
                    <div
                        ref={gameScreenRef}
                        className='relative rounded-lg h-[405.32px] w-[238.69px] bg-black-light/[.84] h-full shadow-inner-snake'
                    >
                        {gameStarted ? 
                    null :
                    <button
                        onClick={handleClickStartGame}
                        className='flex items-center mt-[311.68px] mx-auto bg-orange text-black text-code px-[14px] py-[10px] rounded-lg'
                    >
                        start-game
                    </button>}
                        {gameOver ? 
                            <div>
                                <div className='text-green-light mt-[264px] py-3 justify-center rounded-lg flex self-center bg-black-light/[.84] text-2xl shadow-inner-snake'>GAME OVER!</div>
                                <button
                                    onClick={handleClickStartAgainGame}
                                    className='w-full h-[58px] text-gray text-code py-5 hover:text-white'
                                >start-again</button>
                            </div>
                : null}
                    </div>
                    <div className='relative text-white text-code ml-[24px]'>
                        <div className='block p-3.5 w-[181.38px] h-[150px] bg-[#011423]/[.19] rounded-lg justify-between flex flex-col'>
                            <div>
                                <p>{'//'} нажимай стрелки</p>
                                <p>{'//'} на клавиатуре</p>
                            </div>
                            <div className='flex flex-col items-center gap-[5px]'>
                                <button className='w-[50px] h-[30px] border rounded-lg bg-background flex items-center justify-center hover:bg-[#010C15D8] hover:shadow-hover-button'><Arrow className='rotate-180'/></button>
                                <div className='flex gap-[5px]'>
                                    <button className='w-[50px] h-[30px] border rounded-lg bg-background flex items-center justify-center hover:bg-[#010C15D8] hover:shadow-hover-button'><Arrow className='rotate-90' /></button>
                                    <button className='w-[50px] h-[30px] border rounded-lg bg-background flex items-center justify-center hover:bg-[#010C15D8] hover:shadow-hover-button'><Arrow /></button>
                                    <button className='w-[50px] h-[30px] border rounded-lg bg-background flex items-center justify-center hover:bg-[#010C15D8] hover:shadow-hover-button'><Arrow className='-rotate-90' /></button>
                                </div>
                            </div>
                        </div>
                        <div className='mt-5 pl-3.5'>
                            <span>{'//'} осталось собрать</span>
                            <div className='flex flex-col gap-[7px] mt-3'>
                                <div className='flex gap-[7px]'>
                                    <Food />
                                    <Food />
                                    <Food />
                                    <Food />
                                    <Food />
                                </div>
                                <div className='flex gap-[7px]'>
                                    <Food />
                                    <Food />
                                    <Food />
                                    <Food />
                                    <Food />
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => {router.push('/about-me')}}
                            className='absolute bottom-0 right-0 px-3.5 py-2.5 border border-white rounded-lg hover:bg-[#fff3]'
                        >skip</button>
                    </div>
                </div>
        
            </div>}  
                
            </Transition>
        </div>
    );
}
