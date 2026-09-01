import Link from 'next/link';
import { ArrowRight, Calculator } from 'lucide-react';
import type { PriceItem } from '@/lib/types';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { PricesTable } from './prices-table';
import { QuoteButton } from './quote-dialog';

export function PricesSection({ prices }: { prices: PriceItem[] }) {
  const popular = prices.filter((item) => ['Укладка', 'Обработка'].includes(item.category));

  return (
    <section className="bg-stone-50 py-24 lg:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Цены"
          title="Прозрачный прайс без скрытых работ"
          description="Стоимость указана за работу. Точная смета формируется после бесплатного замера — с фиксированными объёмами."
          action={
            <Link href="/prices" className="btn-outline">
              Полный прайс
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          <PricesTable prices={popular} />

          <Reveal delay={120}>
            <div className="sticky top-28 overflow-hidden rounded-none bg-graphite-950 p-8 text-stone-50 lg:p-10">
              <span className="flex h-12 w-12 items-center justify-center rounded-none bg-white/10 text-accent-300">
                <Calculator className="h-5 w-5" />
              </span>
              <h3 className="mt-7 font-display text-3xl font-black leading-tight">
                Не знаете, сколько выйдет?
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-stone-200/60">
                Пришлите площадь и формат плитки — посчитаем ориентир в тот же день, а на замере
                зафиксируем итоговую смету.
              </p>

              <ul className="mt-8 space-y-3 text-sm text-stone-200/75">
                {['Замер по Тбилиси бесплатно', 'Смета в течение рабочего дня', 'Список материалов с запасом'].map(
                  (item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-400" />
                      {item}
                    </li>
                  ),
                )}
              </ul>

              <QuoteButton className="btn-accent mt-9 w-full py-3.5">
                Рассчитать стоимость
                <ArrowRight className="h-4 w-4" />
              </QuoteButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
