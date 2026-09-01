import Image from 'next/image';
import Link from 'next/link';
import type { Service } from '@/lib/types';
import { formatPrice } from '@/lib/cn';
import { galleryPhoto } from '@/lib/images';

/** Услуги строками, как в макете: слева мета, справа название и стрелка. */
export function ServicesSection({ services }: { services: Service[] }) {
  const rows = services.slice(0, 8);

  return (
    <section className="pt-32 lg:pt-44">
      <h2 className="display text-center text-[15vw] leading-none sm:text-[10vw] lg:text-[4.8rem]">
        НАШИ УСЛУГИ
      </h2>

      <div className="relative mt-20 lg:mt-28">
        <div className="border-t border-graphite-700">
          {rows.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="group grid min-h-[120px] items-center border-b border-graphite-700 px-5 py-7 transition-colors hover:bg-graphite-900 lg:grid-cols-2 lg:px-10"
            >
              <div className="flex flex-col gap-3 lg:gap-8">
                <span className="meta">Категория: {service.category.toUpperCase()}</span>
                <span className="meta">
                  ОТ {formatPrice(service.price)} / {service.unit.toUpperCase()}
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between gap-10 lg:mt-0">
                <div>
                  <div className="text-[22px] font-medium tracking-[0.01em] text-stone-300 transition-colors group-hover:text-stone-100 lg:text-[28px]">
                    {service.title}
                  </div>
                  <p className="mt-2 max-w-[430px] text-[14px] leading-[1.5] text-stone-200">
                    {service.description}
                  </p>
                </div>
                <span className="text-[44px] font-light leading-none text-stone-300 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-stone-100">
                  ›
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Шестиугольная плитка, наложенная на строки — деталь из макета */}
        <div className="pointer-events-none absolute left-[18%] top-[78px] hidden h-[250px] w-[270px] rotate-[-8deg] xl:block">
          <div className="hex-mask relative h-full w-full">
            <Image
              src={galleryPhoto('pat-4.jpg')}
              alt=""
              fill
              sizes="270px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="container mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-[15px] leading-[1.6] text-stone-200">
          Всего 21 вид работ: от демонтажа старой плитки и стяжки до эпоксидной затирки, запила
          под 45° и облицовки ступеней.
        </p>
        <Link href="/services" className="link-underline">
          <span>ВСЕ УСЛУГИ</span>
          <span className="text-[22px] font-light">↘</span>
        </Link>
      </div>
    </section>
  );
}
