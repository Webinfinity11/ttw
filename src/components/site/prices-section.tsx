import Link from 'next/link';
import type { PriceItem } from '@/lib/types';
import { Reveal } from '@/components/ui/reveal';
import { PricesTable } from './prices-table';
import { QuoteButton } from './quote-dialog';

export function PricesSection({ prices }: { prices: PriceItem[] }) {
  const popular = prices.filter((item) => ['Укладка', 'Обработка'].includes(item.category));

  return (
    <section className="pt-32 lg:pt-44">
      <h2 className="display text-center text-[15vw] leading-none sm:text-[10vw] lg:text-[4.8rem]">
        ЦЕНЫ
      </h2>

      <div className="container mt-16 grid gap-14 lg:grid-cols-[1.7fr_1fr]">
        <PricesTable prices={popular} />

        <Reveal>
          <div className="sticky top-28 border border-graphite-700 p-9">
            <span className="meta">СМЕТА</span>
            <p className="display mt-5 text-[30px] leading-[1.1]">
              Не знаете,
              <br />
              сколько выйдет?
            </p>
            <p className="mt-5 text-[15px] leading-[1.7] text-stone-200">
              Пришлите площадь и формат плитки — посчитаем ориентир в тот же день, а на замере
              зафиксируем итоговую цену в договоре.
            </p>

            <ul className="mt-8 space-y-4 border-t border-graphite-700 pt-7 text-[15px] text-stone-200">
              {[
                'Замер по Тбилиси бесплатно',
                'Смета в течение рабочего дня',
                'Список материалов с запасом на подрез',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-stone-100">✳</span>
                  {item}
                </li>
              ))}
            </ul>

            <QuoteButton className="btn-light mt-9 w-full">Рассчитать смету</QuoteButton>
            <Link
              href="/prices"
              className="link-underline mt-6 w-full justify-center text-[15px]"
            >
              <span>ПОЛНЫЙ ПРАЙС</span>
              <span className="text-[20px] font-light">↘</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
