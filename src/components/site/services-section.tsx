import Link from 'next/link';
import type { Service } from '@/lib/types';
import { formatPrice } from '@/lib/cn';
import { Reveal } from '@/components/ui/reveal';

/**
 * Сервисы — компактный список без фотографий:
 * две колонки строк, номер, название и цена.
 */
export function ServicesSection({ services }: { services: Service[] }) {
  const rows = services.slice(0, 10);
  const columns = [rows.slice(0, 5), rows.slice(5, 10)];

  return (
    <section className="pt-28 lg:pt-36">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-8 border-b border-graphite-700 pb-9">
          <h2 className="display text-[12vw] uppercase leading-[0.94] sm:text-[8vw] lg:text-[4.2rem]">
            Сервисы
          </h2>
          <div className="flex items-center gap-10">
            <p className="hidden max-w-xs text-[14px] leading-[1.55] text-stone-200 lg:block">
              21 вид работ: от демонтажа и стяжки до эпоксидной затирки и запила под 45°.
            </p>
            <Link href="/services" className="link-underline">
              <span>ВСЕ СЕРВИСЫ</span>
              <span className="text-[22px] font-light">↘</span>
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 lg:gap-x-16">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex}>
              {column.map((service, index) => {
                const number = columnIndex * 5 + index + 1;
                return (
                  <Reveal key={service.id} delay={index * 40}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="group flex items-center gap-5 border-b border-graphite-700 py-6 sm:gap-8"
                    >
                      <span className="meta w-7 shrink-0 transition-colors group-hover:text-stone-100">
                        {String(number).padStart(2, '0')}
                      </span>

                      <span className="flex-1 text-[18px] font-medium leading-snug text-stone-100 transition-colors group-hover:text-stone-300 sm:text-[21px]">
                        {service.title}
                      </span>

                      <span className="meta hidden whitespace-nowrap sm:block">
                        ОТ {formatPrice(service.price)} / {service.unit.toUpperCase()}
                      </span>

                      <span className="text-[26px] font-light leading-none text-stone-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-stone-100">
                        ›
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          ))}
        </div>

        <Reveal className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-3">
          <span className="meta mr-2">ТАКЖЕ</span>
          {services.slice(10, 16).map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="border border-graphite-700 px-4 py-2 text-[14px] text-stone-200 transition-colors hover:border-stone-300 hover:text-stone-100"
            >
              {service.title}
            </Link>
          ))}
          <Link
            href="/services"
            className="px-2 py-2 text-[14px] text-stone-100 underline underline-offset-4"
          >
            и ещё {Math.max(services.length - 16, 0)}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
