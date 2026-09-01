import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
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
      <div className={cn('relative overflow-hidden rounded-none bg-stone-200', imageClassName)}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite-950/70 via-graphite-950/10 to-transparent opacity-90" />

        <span className="absolute left-5 top-5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
          {project.category}
        </span>

        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl font-black leading-tight text-white">
              {project.title}
            </h3>
            <p className="mt-1.5 text-sm text-white/65">
              {project.area} м² · {project.location}
            </p>
          </div>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-white group-hover:text-graphite-900">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
