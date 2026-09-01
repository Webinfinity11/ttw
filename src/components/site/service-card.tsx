import Image from 'next/image';
import Link from 'next/link';
import type { Service } from '@/lib/types';
import { cn, formatPrice } from '@/lib/cn';

export function ServiceCard({ service, className }: { service: Service; className?: string }) {
  return (
    <Link href={`/services/${service.slug}`} className={cn('group flex flex-col', className)}>
      <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-graphite-900">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />
      </div>

      <div className="mt-5 flex flex-1 flex-col border-t border-graphite-700 pt-5">
        <span className="meta">{service.category.toUpperCase()}</span>
        <h3 className="mt-2.5 text-[20px] font-medium leading-snug text-stone-100">
          {service.title}
        </h3>
        <p className="mt-2.5 line-clamp-3 flex-1 text-[14px] leading-[1.6] text-stone-200">
          {service.description}
        </p>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-[15px] text-stone-200">
            от{' '}
            <strong className="display text-[20px] text-stone-100">
              {formatPrice(service.price)}
            </strong>{' '}
            / {service.unit}
          </span>
          <span className="text-[30px] font-light leading-none text-stone-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-stone-100">
            ›
          </span>
        </div>
      </div>
    </Link>
  );
}
