'use client';

import { useMemo, useState } from 'react';
import type { Project, ProjectCategory } from '@/lib/types';
import { cn } from '@/lib/cn';
import { ProjectCard } from './project-card';

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'Ванные',
  'Кухни',
  'Керамогранит',
  'XXL',
  'Мозаика',
  'Террасы',
  'Лестницы',
];

export function ProjectsGallery({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<ProjectCategory | 'Все'>('Все');

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    projects.forEach((project) => {
      map.set(project.category, (map.get(project.category) ?? 0) + 1);
    });
    return map;
  }, [projects]);

  const filtered = useMemo(
    () => (active === 'Все' ? projects : projects.filter((p) => p.category === active)),
    [projects, active],
  );

  const tabs: Array<ProjectCategory | 'Все'> = ['Все', ...PROJECT_CATEGORIES];

  return (
    <div>
      <div className="scrollbar-slim -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {tabs.map((tab) => {
          const count = tab === 'Все' ? projects.length : (counts.get(tab) ?? 0);
          if (count === 0 && tab !== 'Все') return null;
          return (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={cn(
                'shrink-0 rounded-full border px-5 py-2.5 text-sm transition-all duration-200',
                active === tab
                  ? 'border-stone-100 bg-stone-100 text-graphite-950'
                  : 'border-graphite-700 bg-graphite-900 text-stone-200 hover:border-stone-300 hover:text-stone-100',
              )}
            >
              {tab}
              <span
                className={cn(
                  'ml-2 text-xs',
                  active === tab ? 'text-graphite-950/50' : 'text-stone-400',
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project) => (
          <div key={project.id} className="animate-fade-up">
            <ProjectCard project={project} imageClassName="aspect-[4/3]" />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-20 text-center text-stone-200">
          В этой категории пока нет опубликованных проектов.
        </p>
      )}
    </div>
  );
}
