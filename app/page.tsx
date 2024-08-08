'use client'
import Game from "@/components/home/Game";
import Hello from "@/components/home/Hello";
import { CSSTransition } from "react-transition-group";

export default function Home() {
  return (
      <CSSTransition
          in={true}
          timeout={300}
      >
          {state => <main
              id='main'
              className={`main-${state} flex mx-5 items-center justify-between p-0 sm:p-10`}
                    >
              <div className="flex-1 flex items-center justify-center h-full">
                  <Hello />
              </div>
              <div className="lg:flex-1 flex items-center justify-center h-full">
                  <Game />
              </div>
          </main>}
      </CSSTransition>
  );
}
