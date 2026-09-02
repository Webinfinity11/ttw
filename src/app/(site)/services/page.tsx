import type { Metadata } from 'next';
import { CtaSection } from '@/components/site/cta-section';
import { PageHero } from '@/components/site/page-hero';
import { ServiceCard } from '@/components/site/service-card';
import { Reveal } from '@/components/ui/reveal';
import { getPages, getServices, getSettings } from '@/lib/data/content';

export async function generateMetadata(): Promise<Metadata> {
  const pages = await getPages();
  return { title: pages.services.intro.metaTitle };
}

export default async function ServicesPage() {
  const [services, settings, pages] = await Promise.all([
    getServices(),
    getSettings(),
    getPages(),
  ]);

  const intro = pages.services.intro;

  const categories = Array.from(new Set(services.map((service) => service.category)));

  return (
    <>
      <PageHero
        eyebrow={intro.eyebrow}
        title={intro.title}
        description={intro.description}
        breadcrumbs={[{ label: intro.breadcrumb }]}
      />

      <section className="bg-graphite-950 py-16 lg:py-24">
        <div className="container space-y-20">
          {categories.map((category) => {
            const items = services.filter((service) => service.category === category);
            return (
              <div key={category}>
                <div className="flex items-center gap-5">
                  <h2 className="font-display text-3xl font-black tracking-tightest">{category}</h2>
                  <span className="h-px flex-1 bg-stone-300" />
                  <span className="text-sm text-stone-400">{items.length}</span>
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {items.map((service, index) => (
                    <Reveal key={service.id} delay={index * 50}>
                      <ServiceCard service={service} className="h-full" />
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <CtaSection settings={settings} />
    </>
  );
}
