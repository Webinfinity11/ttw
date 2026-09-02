import type { Metadata } from 'next';
import { CtaSection } from '@/components/site/cta-section';
import { FaqAccordion } from '@/components/site/faq-accordion';
import { PageHero } from '@/components/site/page-hero';
import { PricesTable } from '@/components/site/prices-table';
import { SectionHeading } from '@/components/ui/section-heading';
import { getFaq, getPages, getPrices, getSettings } from '@/lib/data/content';

export async function generateMetadata(): Promise<Metadata> {
  const pages = await getPages();
  return { title: pages.prices.metaTitle };
}

export default async function PricesPage() {
  const [prices, faq, settings, pages] = await Promise.all([
    getPrices(),
    getFaq(),
    getSettings(),
    getPages(),
  ]);

  const intro = pages.prices;

  return (
    <>
      <PageHero
        eyebrow={intro.eyebrow}
        title={intro.title}
        description={intro.description}
        breadcrumbs={[{ label: intro.breadcrumb }]}
      />

      <section className="bg-graphite-950 py-16 lg:py-24">
        <div className="container">
          <PricesTable prices={prices} />

          <div className="mt-10 rounded-none border border-graphite-700 bg-graphite-900 p-8 text-sm leading-relaxed text-stone-200 lg:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-400">
              Что влияет на цену
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <p>
                <strong className="text-stone-100">Формат плитки.</strong> Мелкий формат и XXL
                дороже стандартного: больше подрезов или больше рук на плиту.
              </p>
              <p>
                <strong className="text-stone-100">Основание.</strong> Если стены и пол уходят
                от плоскости, добавляется выравнивание или стяжка.
              </p>
              <p>
                <strong className="text-stone-100">Раскладка.</strong> Диагональ, ёлочка,
                смещение и подбор рисунка увеличивают трудоёмкость.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-graphite-900 py-20 lg:py-28">
        <div className="container">
          <SectionHeading eyebrow="FAQ" title="Частые вопросы" />
          <div className="mt-12">
            <FaqAccordion items={faq} />
          </div>
        </div>
      </section>

      <CtaSection settings={settings} />
    </>
  );
}
