'use client';
import { CSSTransition } from "react-transition-group";
import data from '@/developerData.json';
import Project from "@/components/projects/Project";

export default function Projects() {
  return (
      <CSSTransition
          in={true}
          timeout={300}
      >
          {state => (
              <main
                  id='main'
                  className={`main-${state} mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-x-20 gap-y-10 overflow-auto p-5`}
              >
                  {data.projects.map(project => (
                      <Project
                          key={project.title}
                          title={project.title}
                          description={project.description}
                          img={project.img}
                          url={project.url}
                      />
                  ))}
              </main>)}
      </CSSTransition>     
  )
}
