import type { Metadata } from 'next';
import { CtaSection } from '@/components/site/cta-section';
import { FaqAccordion } from '@/components/site/faq-accordion';
import { PageHero } from '@/components/site/page-hero';
import { PricesTable } from '@/components/site/prices-table';
import { SectionHeading } from '@/components/ui/section-heading';
import { getFaq, getPrices, getSettings } from '@/lib/data/content';

export const metadata: Metadata = {
  title: 'Цены на плиточные работы в Тбилиси',
};

export default async function PricesPage() {
  const [prices, faq, settings] = await Promise.all([getPrices(), getFaq(), getSettings()]);

  return (
    <>
      <PageHero
        eyebrow="Цены"
        title="Прайс на плиточные работы"
        description="Стоимость указана за работу без материалов. Итоговая смета фиксируется в договоре после бесплатного замера."
        breadcrumbs={[{ label: 'Цены' }]}
      />

      <section className="bg-stone-50 py-16 lg:py-24">
        <div className="container">
          <PricesTable prices={prices} />

          <div className="mt-10 rounded-none border border-stone-200 bg-white p-8 text-sm leading-relaxed text-graphite-500 lg:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-graphite-300">
              Что влияет на цену
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <p>
                <strong className="text-graphite-900">Формат плитки.</strong> Мелкий формат и XXL
                дороже стандартного: больше подрезов или больше рук на плиту.
              </p>
              <p>
                <strong className="text-graphite-900">Основание.</strong> Если стены и пол уходят
                от плоскости, добавляется выравнивание или стяжка.
              </p>
              <p>
                <strong className="text-graphite-900">Раскладка.</strong> Диагональ, ёлочка,
                смещение и подбор рисунка увеличивают трудоёмкость.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
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
