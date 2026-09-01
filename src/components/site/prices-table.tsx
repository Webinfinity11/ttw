import type { PriceItem } from '@/lib/types';
import { formatPrice } from '@/lib/cn';
import { Reveal } from '@/components/ui/reveal';

export function PricesTable({ prices }: { prices: PriceItem[] }) {
  const groups = prices.reduce<Record<string, PriceItem[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-12">
      {Object.entries(groups).map(([category, items], groupIndex) => (
        <Reveal key={category} delay={groupIndex * 60}>
          <div className="flex items-center gap-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-600">
              {category}
            </h3>
            <span className="h-px flex-1 bg-stone-300" />
          </div>

          <div className="mt-5 overflow-hidden rounded-none border border-stone-200 bg-white">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-6 py-5 transition-colors hover:bg-stone-50 ${
                  index > 0 ? 'border-t border-stone-200' : ''
                }`}
              >
                <div className="min-w-[200px] flex-1">
                  <p className="text-[15px] font-medium text-graphite-900">{item.title}</p>
                  {item.note && <p className="mt-1 text-xs text-graphite-300">{item.note}</p>}
                </div>
                <p className="whitespace-nowrap text-sm text-graphite-500">
                  от{' '}
                  <strong className="font-display text-2xl font-extrabold tracking-tight text-graphite-900">
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
