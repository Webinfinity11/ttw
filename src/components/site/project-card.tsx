import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import { cn } from '@/lib/cn';

export function ProjectCard({
  project,
  className,
  imageClassName = 'aspect-[4/3]',
  priority = false,
}: {
  project: Project;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}) {
  return (
    <Link href={`/projects/${project.slug}`} className={cn('group block', className)}>
      <div className={cn('relative overflow-hidden rounded-2xl bg-graphite-900', imageClassName)}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>

      <div className="mt-5 flex items-start justify-between gap-6 border-t border-graphite-700 pt-5">
        <div>
          <span className="meta">{project.category.toUpperCase()}</span>
          <p className="mt-2 text-[20px] font-medium leading-tight text-stone-100">
            {project.title}
          </p>
          <p className="mt-1.5 text-[14px] text-stone-200">
            {project.area} м² · {project.location}
          </p>
        </div>
        <span className="text-[30px] font-light leading-none text-stone-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-stone-100">
          ›
        </span>
      </div>
    </Link>
  );
}
