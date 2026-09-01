import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { CtaSection } from '@/components/site/cta-section';
import { PageHero } from '@/components/site/page-hero';
import { ProjectCard } from '@/components/site/project-card';
import { QuoteButton } from '@/components/site/quote-dialog';
import { Reveal } from '@/components/ui/reveal';
import { getProject, getProjects, getSettings } from '@/lib/data/content';

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [project, projects, settings] = await Promise.all([
    getProject(slug),
    getProjects(),
    getSettings(),
  ]);

  if (!project) notFound();

  const related = projects.filter((item) => item.id !== project.id).slice(0, 3);
  const facts = [
    { label: 'Площадь', value: `${project.area} м²` },
    { label: 'Категория', value: project.category },
    { label: 'Срок', value: project.duration },
    { label: 'Локация', value: project.location },
  ];

  return (
    <>
      <PageHero
        eyebrow={project.category}
        title={project.title}
        description={project.description}
        breadcrumbs={[{ href: '/projects', label: 'Проекты' }, { label: project.title }]}
      />

      <section className="bg-stone-50 py-16 lg:py-20">
        <div className="container">
          <div className="relative aspect-[16/10] overflow-hidden rounded-none">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="mt-6 grid gap-px overflow-hidden rounded-none border border-stone-200 bg-stone-200 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label} className="bg-white px-6 py-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-graphite-300">
                  {fact.label}
                </p>
                <p className="mt-2 font-display text-2xl font-black tracking-tight">{fact.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div className="grid gap-6 sm:grid-cols-2">
              {project.images.map((image, index) => (
                <Reveal
                  key={image}
                  delay={index * 70}
                  className="relative aspect-[4/3] overflow-hidden rounded-none"
                >
                  <Image
                    src={image}
                    alt={`${project.title} — фото ${index + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </Reveal>
              ))}
            </div>

            <aside className="space-y-6">
              <div className="rounded-none border border-stone-200 bg-white p-8">
                <h2 className="font-display text-2xl font-black tracking-tight">Материалы</h2>
                <p className="mt-4 text-sm leading-relaxed text-graphite-500">{project.materials}</p>
              </div>

              <div className="rounded-none bg-graphite-950 p-8 text-stone-50">
                <h2 className="font-display text-2xl font-black leading-snug">
                  Хотите так же у себя?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-stone-200/60">
                  Приедем на замер, подберём материал и посчитаем смету под ваш объект.
                </p>
                <QuoteButton className="btn-accent mt-7 w-full py-3.5">
                  Обсудить проект
                  <ArrowRight className="h-4 w-4" />
                </QuoteButton>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-white py-20">
          <div className="container">
            <div className="flex items-end justify-between gap-6">
              <h2 className="font-display text-3xl font-black tracking-tightest">Другие проекты</h2>
              <Link href="/projects" className="text-sm text-accent-600 transition hover:text-accent-500">
                Всё портфолио →
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {related.map((item) => (
                <ProjectCard key={item.id} project={item} imageClassName="aspect-[4/3]" />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaSection settings={settings} />
    </>
  );
}
