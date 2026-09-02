import type { Metadata } from 'next';
import { CtaSection } from '@/components/site/cta-section';
import { PageHero } from '@/components/site/page-hero';
import { ProjectsGallery } from '@/components/site/projects-gallery';
import { getPages, getProjects, getSettings } from '@/lib/data/content';

export async function generateMetadata(): Promise<Metadata> {
  const pages = await getPages();
  return { title: pages.projects.intro.metaTitle };
}

export default async function ProjectsPage() {
  const [projects, settings, pages] = await Promise.all([
    getProjects(),
    getSettings(),
    getPages(),
  ]);

  const intro = pages.projects.intro;

  return (
    <>
      <PageHero
        eyebrow={intro.eyebrow}
        title={intro.title}
        description={intro.description}
        breadcrumbs={[{ label: intro.breadcrumb }]}
      />

      <section className="bg-graphite-950 py-16 lg:py-20">
        <div className="container">
          <ProjectsGallery projects={projects} />
        </div>
      </section>

      <CtaSection settings={settings} />
    </>
  );
}
