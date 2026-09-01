import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import { Reveal } from '@/components/ui/reveal';

export function PortfolioSection({ projects }: { projects: Project[] }) {
  const items = projects.slice(0, 6);

  return (
    <section className="bg-stone-50 py-24 lg:py-28">
      <div className="container">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">Портфолио</span>
            <h2 className="display mt-4 text-4xl leading-[1.1] sm:text-5xl">Недавние объекты</h2>
          </div>
          <Link href="/projects" className="link-underline">
            Все работы
          </Link>
        </div>

        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {items.map((project, index) => (
            <Reveal key={project.id} delay={index * 60}>
              <Link href={`/projects/${project.slug}`} className="group relative block h-[430px]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite-950/60 via-transparent to-transparent" />
                <div className="absolute inset-x-5 bottom-5 bg-white px-6 py-5 transition-colors duration-300 group-hover:bg-accent-500">
                  <p className="font-display text-[13px] font-semibold uppercase tracking-[0.1em] text-accent-500 transition-colors group-hover:text-white/80">
                    {project.category}
                  </p>
                  <p className="mt-1.5 font-display text-[21px] font-extrabold leading-tight text-graphite-950 transition-colors group-hover:text-white">
                    {project.title}
                  </p>
                  <p className="mt-1 text-sm text-graphite-500 transition-colors group-hover:text-white/75">
                    {project.area} м² · {project.location}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
