import type { Metadata } from 'next';
import { CtaSection } from '@/components/site/cta-section';
import { PageHero } from '@/components/site/page-hero';
import { ServiceCard } from '@/components/site/service-card';
import { Reveal } from '@/components/ui/reveal';
import { getServices, getSettings } from '@/lib/data/content';

export const metadata: Metadata = {
  title: 'Услуги — плиточные работы в Тбилиси',
};

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([getServices(), getSettings()]);

  const categories = Array.from(new Set(services.map((service) => service.category)));

  return (
    <>
      <PageHero
        eyebrow="Услуги"
        title="Всё, что связано с плиткой"
        description="21 вид работ: от подготовки основания и гидроизоляции до крупноформатного керамогранита, запила под 45° и эпоксидной затирки."
        breadcrumbs={[{ label: 'Услуги' }]}
      />

      <section className="bg-stone-50 py-16 lg:py-24">
        <div className="container space-y-20">
          {categories.map((category) => {
            const items = services.filter((service) => service.category === category);
            return (
              <div key={category}>
                <div className="flex items-center gap-5">
                  <h2 className="font-display text-3xl font-black tracking-tightest">{category}</h2>
                  <span className="h-px flex-1 bg-stone-300" />
                  <span className="text-sm text-graphite-300">{items.length}</span>
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
