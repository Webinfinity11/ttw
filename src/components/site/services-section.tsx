import Image from 'next/image';
import Link from 'next/link';
import type { Service } from '@/lib/types';
import { formatPrice } from '@/lib/cn';
import { galleryPhoto } from '@/lib/images';
import { Reveal } from '@/components/ui/reveal';

/**
 * Услуги компактно: шесть направлений карточками с кадром,
 * остальные — строкой тегов. Длинный список ушёл на /services.
 */
export function ServicesSection({ services }: { services: Service[] }) {
  const featured = services.slice(0, 6);
  const rest = services.slice(6, 14);

  return (
    <section className="pt-28 lg:pt-36">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-8 border-b border-graphite-700 pb-10">
          <h2 className="display text-[12vw] uppercase leading-[0.94] sm:text-[8vw] lg:text-[4.2rem]">
            Наши услуги
          </h2>
          <div className="flex items-center gap-10">
            <p className="hidden max-w-xs text-[14px] leading-[1.55] text-stone-200 lg:block">
              21 вид работ: от демонтажа и стяжки до эпоксидной затирки и запила под 45°.
            </p>
            <Link href="/services" className="link-underline">
              <span>ВСЕ УСЛУГИ</span>
              <span className="text-[22px] font-light">↘</span>
            </Link>
          </div>
        </div>

        {/* Шесть направлений */}
        <div className="mt-12 grid gap-x-6 gap-y-11 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((service, index) => (
            <Reveal key={service.id} delay={index * 50}>
              <Link href={`/services/${service.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-graphite-900">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <span className="absolute left-4 top-4 bg-graphite-950/80 px-3 py-1.5 text-[12px] uppercase tracking-[0.08em] text-stone-100">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="mt-4 flex items-start justify-between gap-5">
                  <div>
                    <h3 className="text-[19px] font-medium leading-snug text-stone-100">
                      {service.title}
                    </h3>
                    <p className="meta mt-2">
                      ОТ {formatPrice(service.price)} / {service.unit.toUpperCase()}
                    </p>
                  </div>
                  <span className="text-[28px] font-light leading-none text-stone-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-stone-100">
                    ›
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Остальные — строкой */}
        <Reveal className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-3 border-t border-graphite-700 pt-9">
          <span className="meta mr-2">ТАКЖЕ ВЫПОЛНЯЕМ</span>
          {rest.map((service) => (
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
            и ещё {Math.max(services.length - 14, 0)}
          </Link>
        </Reveal>
      </div>

      {/* Шестиугольная плитка — деталь из макета */}
      <div className="container relative">
        <div className="pointer-events-none absolute -top-24 right-6 hidden h-[190px] w-[210px] rotate-[-8deg] xl:block">
          <div className="hex-mask relative h-full w-full opacity-90">
            <Image src={galleryPhoto('pat-4.jpg')} alt="" fill sizes="210px" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
