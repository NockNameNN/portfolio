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
          {state => <div className={`flex items-center justify-between mx-[311px] main-${state}`}>
              <Hello />
              <Game />
          </div>}
      </CSSTransition>
  );
}
