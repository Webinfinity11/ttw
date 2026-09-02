import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { CtaSection } from '@/components/site/cta-section';
import { PageHero } from '@/components/site/page-hero';
import { ProjectCard } from '@/components/site/project-card';
import { QuoteButton } from '@/components/site/quote-dialog';
import { Reveal } from '@/components/ui/reveal';
import { getPages, getProject, getProjects, getSettings } from '@/lib/data/content';

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [project, projects, settings, pages] = await Promise.all([
    getProject(slug),
    getProjects(),
    getSettings(),
    getPages(),
  ]);

  if (!project) notFound();

  const { intro, detail } = pages.projects;

  const related = projects.filter((item) => item.id !== project.id).slice(0, 3);
  const facts = [
    { label: detail.areaLabel, value: `${project.area} м²` },
    { label: detail.categoryLabel, value: project.category },
    { label: detail.durationLabel, value: project.duration },
    { label: detail.locationLabel, value: project.location },
  ];

  return (
    <>
      <PageHero
        eyebrow={project.category}
        title={project.title}
        description={project.description}
        breadcrumbs={[{ href: '/projects', label: intro.breadcrumb }, { label: project.title }]}
      />

      <section className="bg-graphite-950 py-16 lg:py-20">
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

          <div className="mt-6 grid gap-px overflow-hidden rounded-none border border-graphite-700 bg-graphite-800 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label} className="bg-graphite-900 px-6 py-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400">
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
                    className="object-cover"
                  />
                </Reveal>
              ))}
            </div>

            <aside className="space-y-6">
              <div className="rounded-none border border-graphite-700 bg-graphite-900 p-8">
                <h2 className="font-display text-2xl font-black tracking-tight">{detail.materialsTitle}</h2>
                <p className="mt-4 text-sm leading-relaxed text-stone-200">{project.materials}</p>
              </div>

              <div className="rounded-none bg-graphite-950 p-8 text-stone-50">
                <h2 className="font-display text-2xl font-black leading-snug">
                  {detail.ctaTitle}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-stone-200/60">
                  {detail.ctaText}
                </p>
                <QuoteButton className="btn-accent mt-7 w-full py-3.5">
                  {detail.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </QuoteButton>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-graphite-900 py-20">
          <div className="container">
            <div className="flex items-end justify-between gap-6">
              <h2 className="font-display text-3xl font-black tracking-tightest">{detail.relatedTitle}</h2>
              <Link href="/projects" className="text-sm text-stone-100 transition hover:text-stone-100">
                {detail.relatedLinkLabel} →
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
