import type { Metadata } from 'next';
import { CtaSection } from '@/components/site/cta-section';
import { PageHero } from '@/components/site/page-hero';
import { ProjectsGallery } from '@/components/site/projects-gallery';
import { getProjects, getSettings } from '@/lib/data/content';

export const metadata: Metadata = {
  title: 'Проекты — портфолио плиточных работ',
};

export default async function ProjectsPage() {
  const [projects, settings] = await Promise.all([getProjects(), getSettings()]);

  return (
    <>
      <PageHero
        eyebrow="Портфолио"
        title="Проекты"
        description="Ванные и кухни, крупноформатный керамогранит, мозаика, террасы и лестницы — объекты, сданные в Тбилиси."
        breadcrumbs={[{ label: 'Проекты' }]}
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
