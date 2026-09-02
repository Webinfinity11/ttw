import type { SectionIntro, Service } from '@/lib/types';
import { Reveal } from '@/components/ui/reveal';

/**
 * Сервисы — полный список без фотографий, цен и переходов.
 * Слева номер, в центре название, справа категория работ.
 */
export function ServicesSection({
  services,
  intro,
}: {
  services: Service[];
  intro: SectionIntro;
}) {
  const half = Math.ceil(services.length / 2);
  const columns = [services.slice(0, half), services.slice(half)];

  const categories = Array.from(new Set(services.map((service) => service.category)));

  return (
    <section className="pt-28 lg:pt-36">
      <div className="container">
        {/* Шапка секции */}
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <h2 className="display text-[12vw] uppercase leading-[0.94] sm:text-[8vw] lg:text-[4.2rem]">
            {intro.title}
          </h2>
          <div className="flex items-end gap-8">
            <p className="max-w-sm text-[14px] leading-[1.6] text-stone-200">{intro.subtitle}</p>
            <div className="text-right">
              <div className="display text-[44px] leading-none">{services.length}</div>
              <div className="meta mt-1">{intro.counterLabel}</div>
            </div>
          </div>
        </div>

        {/* Категории строкой — навигация по смыслу */}
        <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-graphite-700 py-4">
          {categories.map((category, index) => (
            <span key={category} className="flex items-center gap-4">
              {index > 0 && <span className="text-[11px] text-stone-400">✳</span>}
              <span className="text-[13px] uppercase tracking-[0.1em] text-stone-200">
                {category}
                <span className="ml-1.5 text-stone-400">
                  {services.filter((service) => service.category === category).length}
                </span>
              </span>
            </span>
          ))}
        </div>

        {/* Две колонки строк */}
        <div className="grid lg:grid-cols-2 lg:gap-x-14">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex}>
              {column.map((service, index) => {
                const number = columnIndex * half + index + 1;
                return (
                  <Reveal key={service.id} delay={Math.min(index * 30, 300)}>
                    <div className="flex items-center gap-5 border-b border-graphite-700 py-5 sm:gap-8">
                      <span className="relative w-7 shrink-0 text-[13px] tracking-[0.08em] text-stone-400 transition-colors duration-300">
                        {String(number).padStart(2, '0')}
                      </span>

                      <span className="relative flex-1 text-[17px] font-medium leading-snug text-stone-100 transition-transform duration-500 ease-out sm:text-[19px]">
                        {service.title}
                      </span>

                      <span className="relative hidden whitespace-nowrap text-[12px] uppercase tracking-[0.1em] text-stone-400 transition-colors duration-300 sm:block">
                        {service.category}
                      </span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
