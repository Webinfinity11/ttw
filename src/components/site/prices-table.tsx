import type { PriceItem } from '@/lib/types';
import { formatPrice } from '@/lib/cn';
import { Reveal } from '@/components/ui/reveal';

export function PricesTable({ prices }: { prices: PriceItem[] }) {
  const groups = prices.reduce<Record<string, PriceItem[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-16">
      {Object.entries(groups).map(([category, items], groupIndex) => (
        <Reveal key={category} delay={groupIndex * 60}>
          <div className="flex items-baseline gap-6">
            <h3 className="meta">{category.toUpperCase()}</h3>
            <span className="h-px flex-1 bg-graphite-700" />
            <span className="meta">{items.length}</span>
          </div>

          <div className="mt-4 border-t border-graphite-700">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-graphite-700 py-5 transition-colors hover:bg-graphite-900 transition-colors"
              >
                <div className="min-w-[220px] flex-1">
                  <p className="text-[18px] text-stone-100">{item.title}</p>
                  {item.note && <p className="mt-1 text-[13px] text-stone-400">{item.note}</p>}
                </div>
                <p className="whitespace-nowrap text-[15px] text-stone-200">
                  от{' '}
                  <strong className="display text-[26px] font-extrabold text-stone-100">
                    {formatPrice(item.price)}
                  </strong>{' '}
                  / {item.unit}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
