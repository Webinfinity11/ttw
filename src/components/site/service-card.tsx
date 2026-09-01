import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Service } from '@/lib/types';
import { cn, formatPrice } from '@/lib/cn';

export function ServiceCard({ service, className }: { service: Service; className?: string }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-none border border-stone-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-lift',
        className,
      )}
    >
      <div className="relative aspect-[16/11] overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite-950/50 via-graphite-950/5 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-graphite-700 backdrop-blur">
          {service.category}
        </span>
        <span className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white text-graphite-900 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-[17px] font-semibold leading-snug tracking-tight text-graphite-900">
          {service.title}
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-graphite-500">
          {service.description}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-stone-200 pt-5">
          <span className="text-sm text-graphite-500">
            от{' '}
            <strong className="font-display text-2xl font-extrabold tracking-tight text-graphite-900">
              {formatPrice(service.price)}
            </strong>{' '}
            / {service.unit}
          </span>
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-accent-600 transition group-hover:text-accent-500">
            Подробнее
          </span>
        </div>
      </div>
    </Link>
  );
}
