import type { AdvantagesBlock } from '@/lib/types';
import { Reveal } from '@/components/ui/reveal';

/**
 * Блок «Почему мы». Нумерация проставляется автоматически по порядку,
 * поэтому в админке достаточно переставить пункт — номера пересчитаются сами.
 */
export function Advantages({ content }: { content: AdvantagesBlock }) {
  return (
    <section className="pt-28 lg:pt-36">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6 border-b border-graphite-700 pb-8">
          <h2 className="display text-[12vw] uppercase leading-[0.94] sm:text-[8vw] lg:text-[4.2rem]">
            {content.title}
          </h2>
          <p className="max-w-sm text-[14px] leading-[1.6] text-stone-200">{content.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, index) => (
            <Reveal
              key={index}
              delay={index * 50}
              className="border-b border-graphite-700 py-9 pr-8 lg:pl-8 lg:[&:nth-child(3n+1)]:pl-0"
            >
              <div className="flex items-baseline gap-4">
                <span className="text-[13px] tracking-[0.08em] text-stone-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-[19px] font-medium text-stone-100">{item.title}</h3>
              </div>
              <p className="mt-3 max-w-[38ch] text-[15px] leading-[1.6] text-stone-200">
                {item.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
