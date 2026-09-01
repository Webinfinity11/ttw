import Link from 'next/link';
import {
  Droplets,
  Gem,
  Grid3x3,
  Hammer,
  Layers,
  Maximize,
  Ruler,
  Sun,
  type LucideIcon,
} from 'lucide-react';
import type { Service, ServiceCategory } from '@/lib/types';
import { formatPrice } from '@/lib/cn';
import { Reveal } from '@/components/ui/reveal';

const ICONS: Record<ServiceCategory, LucideIcon> = {
  'Укладка': Grid3x3,
  'Под ключ': Maximize,
  'Подготовка': Ruler,
  'Гидроизоляция': Droplets,
  'Обработка': Gem,
  'Демонтаж': Hammer,
  'Экстерьер': Sun,
};

export function ServicesSection({ services }: { services: Service[] }) {
  const featured = services.slice(0, 8);
  const rest = services.slice(8);

  return (
    <section className="bg-stone-50 py-24 lg:py-28">
      <div className="container">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">Что мы делаем</span>
            <h2 className="display mt-4 max-w-[18ch] text-4xl leading-[1.1] sm:text-5xl">
              Услуги по укладке и отделке
            </h2>
          </div>
          <Link href="/services" className="link-underline">
            Все услуги
          </Link>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-4">
          {featured.map((service, index) => {
            const Icon = ICONS[service.category] ?? Layers;
            return (
              <Reveal key={service.id} delay={index * 50}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col border border-stone-200 bg-white p-9 transition-colors duration-300 hover:border-accent-500"
                >
                  <span className="flex h-16 w-16 items-center justify-center bg-accent-500 text-white transition-colors duration-300 group-hover:bg-graphite-950">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-7 font-display text-[22px] font-extrabold leading-[1.25]">
                    {service.title}
                  </h3>
                  <p className="mt-3.5 flex-1 text-[16px] leading-[1.7] text-graphite-500">
                    {service.description}
                  </p>
                  <p className="mt-6 font-display text-[15px] font-bold text-accent-500">
                    от {formatPrice(service.price)} / {service.unit}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {rest.length > 0 && (
          <Reveal className="mt-7 border border-stone-200 bg-white p-9">
            <p className="font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-graphite-300">
              Также выполняем
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {rest.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="border border-stone-200 px-4 py-2.5 text-[15px] text-graphite-700 transition hover:border-accent-500 hover:bg-accent-500 hover:text-white"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
