import type { Service } from '@/lib/types';
import { formatPrice } from '@/lib/cn';
import { Reveal } from '@/components/ui/reveal';

/**
 * Сервисы — полный список без фотографий и без переходов на внутренние страницы.
 * Две колонки строк: номер, название, цена.
 */
export function ServicesSection({ services }: { services: Service[] }) {
  const half = Math.ceil(services.length / 2);
  const columns = [services.slice(0, half), services.slice(half)];

  return (
    <section className="pt-28 lg:pt-36">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-8 border-b border-graphite-700 pb-9">
          <h2 className="display text-[12vw] uppercase leading-[0.94] sm:text-[8vw] lg:text-[4.2rem]">
            Сервисы
          </h2>
          <p className="max-w-md text-[14px] leading-[1.55] text-stone-200">
            {services.length} видов работ: от демонтажа старой плитки и стяжки до эпоксидной
            затирки, запила под 45° и облицовки ступеней.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 lg:gap-x-16">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex}>
              {column.map((service, index) => {
                const number = columnIndex * half + index + 1;
                return (
                  <Reveal key={service.id} delay={Math.min(index * 35, 350)}>
                    <div className="group flex items-center gap-5 border-b border-graphite-700 py-5 transition-colors hover:bg-graphite-900 sm:gap-8">
                      <span className="meta w-7 shrink-0">
                        {String(number).padStart(2, '0')}
                      </span>

                      <span className="flex-1 text-[17px] font-medium leading-snug text-stone-100 sm:text-[19px]">
                        {service.title}
                      </span>

                      <span className="meta whitespace-nowrap">
                        от {formatPrice(service.price)} / {service.unit}
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
