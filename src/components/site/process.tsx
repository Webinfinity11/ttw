import type { ProcessStep } from '@/lib/types';
import { Reveal } from '@/components/ui/reveal';

/**
 * Этапы работы компактной лентой: пять колонок вместо длинных строк.
 * Номера проставляются по порядку, поэтому этап можно вставить в середину.
 */
export function Process({
  content,
}: {
  content: { title: string; subtitle: string; steps: ProcessStep[] };
}) {
  return (
    <section className="pt-28 lg:pt-36">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5 border-b border-graphite-700 pb-7">
          <h2 className="display text-[11vw] uppercase leading-[0.94] sm:text-[7vw] lg:text-[3.4rem]">
            {content.title}
          </h2>
          <p className="max-w-sm text-[14px] leading-[1.6] text-stone-200">{content.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5">
          {content.steps.map((step, index) => (
            <Reveal
              key={index}
              delay={index * 50}
              className="border-b border-graphite-700 py-7 pr-6 lg:border-b-0 lg:pl-6 lg:[&:first-child]:pl-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-graphite-700"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="display text-[22px] leading-none text-stone-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-[12px] uppercase tracking-[0.08em] text-stone-400">
                  {step.duration}
                </span>
              </div>
              <h3 className="mt-5 text-[17px] font-medium leading-snug text-stone-100">
                {step.title}
              </h3>
              <p className="mt-2.5 text-[14px] leading-[1.55] text-stone-200">{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
