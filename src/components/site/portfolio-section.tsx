import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import { Reveal } from '@/components/ui/reveal';

export function PortfolioSection({ projects }: { projects: Project[] }) {
  const items = projects.slice(0, 6);

  return (
    <section className="pt-32 lg:pt-44">
      <h2 className="display text-center text-[15vw] leading-none sm:text-[10vw] lg:text-[4.8rem]">
        ПРОЕКТЫ
      </h2>

      <div className="container mt-16 grid gap-x-6 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
        {items.map((project, index) => (
          <Reveal key={project.id} delay={index * 60}>
            <Link href={`/projects/${project.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-graphite-900">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>

              <div className="mt-5 flex items-start justify-between gap-6 border-t border-graphite-700 pt-5">
                <div>
                  <span className="meta">{project.category.toUpperCase()}</span>
                  <p className="mt-2 text-[22px] font-medium leading-tight text-stone-100">
                    {project.title}
                  </p>
                  <p className="mt-1.5 text-[14px] text-stone-200">
                    {project.area} м² · {project.duration} · {project.location}
                  </p>
                </div>
                <span className="text-[34px] font-light leading-none text-stone-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-stone-100">
                  ›
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="container mt-12 flex justify-center">
        <Link href="/projects" className="link-underline">
          <span>ВСЁ ПОРТФОЛИО</span>
          <span className="text-[22px] font-light">↘</span>
        </Link>
      </div>
    </section>
  );
}
