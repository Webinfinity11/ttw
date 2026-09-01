import type { Review } from '@/lib/types';
import { formatDate, initials } from '@/lib/cn';
import { Reveal } from '@/components/ui/reveal';

export function ReviewsSection({ reviews }: { reviews: Review[] }) {
  const average =
    reviews.length > 0
      ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
      : '—';

  return (
    <section className="pt-32 lg:pt-44">
      <h2 className="display text-center text-[15vw] leading-none sm:text-[10vw] lg:text-[4.8rem]">
        ОТЗЫВЫ
      </h2>

      <div className="container mt-8 flex justify-center gap-8">
        <span className="meta">СРЕДНЯЯ ОЦЕНКА {average}</span>
        <span className="meta">{reviews.length} ОТЗЫВА</span>
      </div>

      <div className="mt-16 border-t border-graphite-700">
        {reviews.map((review, index) => (
          <Reveal
            key={review.id}
            delay={index * 50}
            className="grid items-start gap-6 border-b border-graphite-700 px-5 py-9 lg:grid-cols-[260px_1fr] lg:px-10"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-graphite-700 text-[13px] text-stone-200">
                {initials(review.name)}
              </span>
              <div>
                <p className="text-[16px] text-stone-100">{review.name}</p>
                <p className="meta mt-1">{formatDate(review.date).toUpperCase()}</p>
              </div>
            </div>

            <div>
              <p className="text-[13px] tracking-[0.14em] text-stone-100">
                {'★'.repeat(review.rating)}
                <span className="text-graphite-700">{'★'.repeat(5 - review.rating)}</span>
              </p>
              <p className="mt-3 max-w-3xl text-[17px] leading-[1.65] text-stone-200">
                {review.text}
              </p>
              <p className="meta mt-3">{review.role?.toUpperCase()}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
