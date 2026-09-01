import Image from 'next/image';
import { Star } from 'lucide-react';
import type { Review } from '@/lib/types';
import { cn, formatDate, initials } from '@/lib/cn';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

function Rating({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn('flex gap-0.5', className)}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={cn(
            'h-3.5 w-3.5',
            index < value ? 'fill-accent-400 text-accent-400' : 'text-stone-300',
          )}
        />
      ))}
    </div>
  );
}

export function ReviewsSection({ reviews }: { reviews: Review[] }) {
  const average =
    reviews.length > 0
      ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
      : '—';

  return (
    <section className="bg-stone-100 py-24 lg:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Отзывы"
          title="Что говорят клиенты"
          action={
            <div className="flex items-center gap-4 rounded-none border border-stone-300 bg-white px-6 py-4">
              <span className="font-display text-4xl font-black tracking-tightest">{average}</span>
              <div>
                <Rating value={5} />
                <p className="mt-1.5 text-xs text-graphite-500">{reviews.length} отзыва на сайте</p>
              </div>
            </div>
          }
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review, index) => (
            <Reveal
              key={review.id}
              delay={index * 70}
              className="flex h-full flex-col rounded-none border border-stone-200 bg-white p-8"
            >
              <Rating value={review.rating} />
              <p className="mt-5 flex-1 text-[15px] leading-relaxed text-graphite-700">
                «{review.text}»
              </p>
              <div className="mt-7 flex items-center gap-3.5 border-t border-stone-200 pt-6">
                {review.photo ? (
                  <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                    <Image src={review.photo} alt={review.name} fill sizes="44px" className="object-cover" />
                  </span>
                ) : (
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-500 font-display text-sm font-bold text-white">
                    {initials(review.name)}
                  </span>
                )}
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{review.name}</p>
                  <p className="truncate text-xs text-graphite-300">
                    {review.role} · {formatDate(review.date)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
