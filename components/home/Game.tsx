'use client'
import { BoltDownLeft, BoltDownRight, BoltUpLeft, BoltUpRight, Arrow } from '@/public/icons';
import { useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import { useRouter } from 'next/navigation'

interface SnakeCell {
    x: number,
    y: number,
}

const snakeDefault = [
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
];

const foodDefault: SnakeCell = { x: 10, y: 5 };

const directionDefault: SnakeCell = {x: 0, y: 1};

const GRID_SIZE: [number, number] = [24, 40];
const GAMEGRID = Array.from({length:GRID_SIZE[1]}, ()=>new Array(GRID_SIZE[0]).fill(""));

const generateFood = () => {
    const x = Math.floor(Math.random()*GRID_SIZE[0]);
    const y = Math.floor(Math.random()*GRID_SIZE[1]);
    return {x, y}
}

export default function Game() {
    const router = useRouter();
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [foodCollected, setFoodCollected] = useState<number>(0);
    const [snake, setSnake] = useState<SnakeCell[]>(snakeDefault);
    const directionRef = useRef<SnakeCell>(directionDefault);
    const foodRef = useRef<SnakeCell>(foodDefault);

    const isSnakeDiv = (xy: number, yc: number) => {
        return snake.some((SnakeCell => {
            return SnakeCell.x === xy && SnakeCell.y === yc;
        }))
    }

    const isSnakeHead = (xy: number, yc: number) => {
        return snake[0].x === xy && snake[0].y === yc;
     }

    const handleClickStartGame = () => {
        setGameStarted(!gameStarted);
        const interval = setInterval(() => {
            setSnake((prevSnake) => {
                const newHead = {
                    x: prevSnake[0].x + directionRef.current.x,
                    y: prevSnake[0].y - directionRef.current.y
                };
                if (
                    newHead.x < 0 || 
                    newHead.y < 0 || 
                    newHead.x >= GRID_SIZE[0] || 
                    newHead.y >= GRID_SIZE[1] ||
                    prevSnake.some(({x, y}) => {
                        return newHead.x === x && newHead.y === y;
                    })    
                ) {
                    clearInterval(interval);
                    setGameOver(true);
                    return prevSnake;
                }
                if (newHead.x === foodRef.current.x && newHead.y === foodRef.current.y) {
                    foodRef.current = generateFood();
                    setFoodCollected((prev) => {
                        const newFoodCollected = prev + 1;

                        if (newFoodCollected === 10) {
                            clearInterval(interval);
                            setGameOver(true);
                        }

                        return newFoodCollected;
                    });
                }
                const copySnake = [...prevSnake];
                copySnake.pop();
                copySnake.unshift(newHead);
                return copySnake;
            });
        }, 50);
    
        return () => clearInterval(interval);
    }

    const handleClickStartAgainGame = () => {
        directionRef.current = directionDefault;
        setGameStarted(!gameStarted);
        setGameOver(!gameOver);
        foodRef.current = foodDefault;
        setFoodCollected(0);
        setSnake(snakeDefault);
    }

    useEffect(() => {
        const handleDirection = (e: KeyboardEvent) => {
            const key = e.key;
            switch (key) {
                case 'ArrowUp':
                    if (directionRef.current.y != -1) {
                        directionRef.current = ({ x: 0, y: 1 });
                    }
                    break;
                case 'ArrowDown': 
                    if (directionRef.current.y != 1) {
                        directionRef.current = ({ x: 0, y: -1 });
                    }
                    break;
                case 'ArrowRight': 
                    if (directionRef.current.x != -1) {
                        directionRef.current = ({ x: 1, y: 0 });
                    }
                    break;
                case 'ArrowLeft': 
                    if (directionRef.current.x != 1) {
                        directionRef.current = ({ x: -1, y: 0 });
                    }
                    break;
            }
        };

        window.addEventListener('keydown', handleDirection);

        return () => {
            window.removeEventListener('keydown', handleDirection);
        }
    }, []);
    
    return (
        <div>
            <div className="absolute right-[0px] bottom-[-100px] w-[500px] h-[500px] rounded-blurry-gradient rotate-10 blur-[70px] bg-blurry-gradient-blue opacity-50"></div>
            <div className="absolute right-[450px] top-[-150px] w-[500px] h-[500px] rounded-blurry-gradient rotate-10 blur-[70px] bg-blurry-gradient-green opacity-50"></div>
            <Transition
                in={true}
                timeout={300}
            >{state => <div className={`relative h-[475px] w-[510px] bg-gradient-game rounded-[10px] console-${state} hidden game-screen:block`}>

                <BoltDownLeft className='absolute bottom-2 left-2'/>
                <BoltDownRight className='absolute bottom-2 right-2'/>
                <BoltUpLeft className='absolute top-2 left-2'/>
                <BoltUpRight className='absolute top-2 right-2'/>

                <div
                    className='flex p-[35px] border border-[#0C1616] text-white h-full w-full relative shadow-inner-game rounded-lg'
                >
                    <div className='relative rounded-lg h-[405.32px] w-[238.69px] bg-black-light/[.84] h-full shadow-inner-snake grid grid-cols-game'>
                        {GAMEGRID.map((row, yc) => {
                            return row.map((cell, xc) => {
                                const isSnake = isSnakeDiv(xc, yc);
                                const snakeIndex = snake.findIndex(({ x, y }) => x === xc && y === yc);
                                const opacity = isSnake ? 1 - (snakeIndex / snake.length) : 1;

                                return <div
                                    key={xc+yc}
                                    className={`
                                        ${isSnakeHead(xc, yc) && directionRef.current.x === 1 ? 'rounded-tr-md rounded-br-md' : ''}
                                        ${isSnakeHead(xc, yc) && directionRef.current.x === -1 ? 'rounded-tl-md rounded-bl-md' : ''}
                                        ${isSnakeHead(xc, yc) && directionRef.current.y === 1 ? 'rounded-tl-md rounded-tr-md' : ''}
                                        ${isSnakeHead(xc, yc) && directionRef.current.y === -1 ? 'rounded-bl-md rounded-br-md' : ''}
                                        ${isSnakeDiv(xc, yc) ? 'bg-green-light' : ''} 
                                        ${foodRef.current.x === xc && foodRef.current.y === yc ? 'bg-green-light opacity-100 rounded-full shadow-hover-button' : ''}
                                    `}
                                    style={{opacity}}
                                ></div>
                            })
                        })}
                        {gameStarted ? 
                        null :
                        <button
                            onClick={handleClickStartGame}
                            className='absolute top-[311.68px] left-1/4 bg-orange text-black text-code px-[14px] py-[10px] rounded-lg'
                        >
                            start-game
                        </button>}
                        {gameOver ? 
                            <div className='w-full absolute top-[264px]'>
                                <div className='text-green-light top-[264px] py-3 justify-center rounded-lg flex self-center bg-black-light/[.84] text-2xl shadow-inner-snake'>{foodCollected === 10 ? 'WELL DONE!' : 'GAME OVER!'}</div>
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
                                <button 
                                    onClick={() => { 
                                        if (directionRef.current.y != -1) {
                                            directionRef.current = ({ x: 0, y: 1 });
                                        }
                                    }}
                                    className='w-[50px] h-[30px] border rounded-lg bg-background flex items-center justify-center hover:bg-[#010C15D8] hover:shadow-hover-button'
                                >
                                    <Arrow className='rotate-180'/>
                                </button>
                                <div className='flex gap-[5px]'>
                                    <button
                                        onClick={() => {
                                            if (directionRef.current.x != 1) {
                                                directionRef.current = ({ x: -1, y: 0 });
                                            }
                                        }} 
                                        className='w-[50px] h-[30px] border rounded-lg bg-background flex items-center justify-center hover:bg-[#010C15D8] hover:shadow-hover-button'
                                    >
                                        <Arrow className='rotate-90' />
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (directionRef.current.y != 1) {
                                                directionRef.current = ({ x: 0, y: -1 });
                                            }
                                        }}
                                        className='w-[50px] h-[30px] border rounded-lg bg-background flex items-center justify-center hover:bg-[#010C15D8] hover:shadow-hover-button'
                                    >
                                        <Arrow />
                                    </button>
                                    <button 
                                        onClick={() => {
                                            if (directionRef.current.x != -1) {
                                                directionRef.current = ({ x: 1, y: 0 });
                                            }
                                        }}
                                        className='w-[50px] h-[30px] border rounded-lg bg-background flex items-center justify-center hover:bg-[#010C15D8] hover:shadow-hover-button'
                                    >
                                        <Arrow className='-rotate-90' />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='mt-5 pl-3.5'>
                            <span>{'//'} осталось собрать</span>
                            <div className='flex flex-col gap-[7px] mt-3'>
                                <div className="grid grid-cols-5 gap-6 justify-items-center pt-2 w-fit">
                                    {[...Array(10)].map((_, index) => (
                                        <div
                                            key={index}
                                            className={`food ${index < foodCollected ? 'opacity-100' : 'opacity-30'}`}
                                        ></div>
                                    ))}
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
