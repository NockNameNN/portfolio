'use client'
import { CSSTransition } from "react-transition-group"

export default function AboutMe() {
  return (
      <CSSTransition
          in={true}
          timeout={300}
      >
          {state => <div className={`main-${state}`}>
              AboutMe
          </div>}
      </CSSTransition>
  )
}
