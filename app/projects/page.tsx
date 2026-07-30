'use client';

import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import data from '@/developerData.json';
import Project, { type ProjectType } from '@/components/projects/Project';

type FilterId = 'all' | ProjectType;

const FILTERS: Array<{ id: FilterId; label: string }> = [
  { id: 'all', label: 'Все' },
  { id: 'admin', label: 'Админки' },
  { id: 'site', label: 'Сайты' },
  { id: 'wip', label: 'В работе' },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterId>('all');

  const projects =
    activeFilter === 'all'
      ? data.projects
      : data.projects.filter((project) =>
          (project.types as ProjectType[] | undefined)?.includes(activeFilter)
        );

  return (
    <CSSTransition in={true} timeout={300}>
      {(state) => (
        <main
          id="main"
          className={`main-${state} flex w-full grow flex-col gap-5 overflow-auto p-5 lg:p-6`}
        >
          <div
            className="flex flex-wrap gap-x-1 gap-y-2 border-b border-line pb-px"
            role="tablist"
            aria-label="Фильтр проектов"
          >
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2.5 text-code transition-colors ${
                    isActive
                      ? 'border-b-[3px] border-b-orange text-white'
                      : 'border-b-[3px] border-b-transparent text-gray hover:text-white'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          {projects.length === 0 ? (
            <p className="text-code text-gray">Проектов в этой категории пока нет.</p>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <Project
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  img={project.img}
                  url={project.url}
                  media={project.media}
                  startDate={project.startDate}
                  endDate={project.endDate}
                  technologies={project.technologies}
                  implemented={project.implemented}
                  types={project.types as ProjectType[]}
                />
              ))}
            </div>
          )}
        </main>
      )}
    </CSSTransition>
  );
}
