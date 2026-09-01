import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import { Reveal } from '@/components/ui/reveal';

export function PortfolioSection({ projects }: { projects: Project[] }) {
  const items = projects.slice(0, 6);

  return (
    <section className="pt-32 lg:pt-44">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6 border-b border-graphite-700 pb-8">
          <h2 className="display text-[12vw] uppercase leading-[0.94] sm:text-[8vw] lg:text-[4.2rem]">
            Проекты
          </h2>
          <div className="flex items-end gap-8">
            <p className="max-w-sm text-[14px] leading-[1.6] text-stone-200">
              Ванные, кухни, крупный формат, мозаика, террасы и лестницы — с описанием материалов,
              площади и срока.
            </p>
            <div className="text-right">
              <div className="display text-[44px] leading-none">{projects.length}</div>
              <div className="meta mt-1">ОБЪЕКТОВ</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-14 grid gap-x-6 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
        {items.map((project, index) => (
          <Reveal key={project.id} delay={index * 60}>
            <Link href={`/projects/${project.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-graphite-900">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover"
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
                <span className="text-[34px] font-light leading-none text-stone-300 transition-transform duration-300">
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
