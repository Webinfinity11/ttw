'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { galleryPhoto } from '@/lib/images';
import { cn } from '@/lib/cn';

const PHOTOS = [
  galleryPhoto('hero-bath-1.jpg'),
  '/tiles/marble-black-gold.webp',
  galleryPhoto('pat-1.jpg'),
  galleryPhoto('mosaic-2.jpg'),
  galleryPhoto('pat-4.jpg'),
  galleryPhoto('floor-5.jpg'),
  galleryPhoto('pat-6.jpg'),
  galleryPhoto('bath-1.jpg'),
  galleryPhoto('pat-3.jpg'),
  '/tiles/terrazzo.jpg',
  galleryPhoto('hero-bath-2.jpg'),
  galleryPhoto('bath-4.jpg'),
];

/**
 * Крупная лента фактур без подписей.
 * Карточки «дышат»: чем ближе кадр к центру экрана, тем он крупнее и ярче.
 */
export function TileCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const drag = useRef<{ startX: number; startLeft: number; moved: boolean } | null>(null);

  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const paint = useCallback(() => {
    const node = trackRef.current;
    if (!node) return;

    const max = node.scrollWidth - node.clientWidth;
    setProgress(max > 0 ? node.scrollLeft / max : 0);
    setCanPrev(node.scrollLeft > 8);
    setCanNext(node.scrollLeft < max - 8);

    const center = window.innerWidth / 2;
    node.querySelectorAll<HTMLElement>('[data-card]').forEach((card) => {
      const box = card.getBoundingClientRect();
      const distance = Math.abs(box.left + box.width / 2 - center);
      const ratio = Math.min(distance / (window.innerWidth * 0.6), 1);
      card.style.transform = `scale(${(1 - ratio * 0.07).toFixed(3)})`;
      card.style.opacity = `${(1 - ratio * 0.45).toFixed(3)}`;
    });
  }, []);

  const schedule = useCallback(() => {
    if (frame.current !== null) return;
    frame.current = window.requestAnimationFrame(() => {
      frame.current = null;
      paint();
    });
  }, [paint]);

  useEffect(() => {
    paint();
    const node = trackRef.current;
    if (!node) return;
    node.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      node.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, [paint, schedule]);

  const scrollBy = useCallback((direction: 1 | -1) => {
    const node = trackRef.current;
    if (!node) return;
    const card = node.querySelector('[data-card]') as HTMLElement | null;
    const step = (card?.offsetWidth ?? 420) + 20;
    node.scrollBy({ left: step * direction, behavior: 'smooth' });
  }, []);

  return (
    <section className="pt-28 lg:pt-36">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-8 border-b border-graphite-700 pb-9">
          <div>
            <span className="meta">ФАКТУРЫ И МАТЕРИАЛЫ</span>
            <h2 className="display mt-4 text-[12vw] uppercase leading-[0.94] sm:text-[8vw] lg:text-[4.2rem]">
              Галерея
            </h2>
          </div>

          <div className="flex gap-2.5">
            <button
              onClick={() => scrollBy(-1)}
              disabled={!canPrev}
              aria-label="Назад"
              className={cn(
                'flex h-14 w-14 items-center justify-center border text-[26px] font-light leading-none transition-all duration-300',
                canPrev
                  ? 'border-graphite-700 text-stone-100 hover:border-stone-100 hover:bg-stone-100 hover:text-graphite-950'
                  : 'border-graphite-800 text-graphite-700',
              )}
            >
              ‹
            </button>
            <button
              onClick={() => scrollBy(1)}
              disabled={!canNext}
              aria-label="Вперёд"
              className={cn(
                'flex h-14 w-14 items-center justify-center border text-[26px] font-light leading-none transition-all duration-300',
                canNext
                  ? 'border-graphite-700 text-stone-100 hover:border-stone-100 hover:bg-stone-100 hover:text-graphite-950'
                  : 'border-graphite-800 text-graphite-700',
              )}
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        onPointerDown={(event) => {
          const node = trackRef.current;
          if (!node) return;
          drag.current = { startX: event.clientX, startLeft: node.scrollLeft, moved: false };
          node.setPointerCapture(event.pointerId);
          node.style.cursor = 'grabbing';
          node.style.scrollSnapType = 'none';
        }}
        onPointerMove={(event) => {
          const node = trackRef.current;
          if (!node || !drag.current) return;
          const delta = event.clientX - drag.current.startX;
          if (Math.abs(delta) > 4) drag.current.moved = true;
          node.scrollLeft = drag.current.startLeft - delta;
        }}
        onPointerUp={() => {
          const node = trackRef.current;
          drag.current = null;
          if (!node) return;
          node.style.cursor = 'grab';
          node.style.scrollSnapType = '';
        }}
        onPointerCancel={() => {
          drag.current = null;
          if (trackRef.current) trackRef.current.style.cursor = 'grab';
        }}
        className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-8 lg:gap-6 lg:px-10 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none', cursor: 'grab' }}
      >
        {PHOTOS.map((src, index) => (
          <div
            key={src}
            data-card
            className="group relative aspect-[4/5] w-[80vw] shrink-0 snap-center overflow-hidden rounded-2xl bg-graphite-900 transition-[transform,opacity] duration-500 ease-out sm:aspect-[4/3] sm:w-[58vw] lg:w-[42vw] xl:w-[36vw]"
          >
            <Image
              src={src}
              alt=""
              fill
              priority={index < 2}
              sizes="(max-width: 640px) 80vw, (max-width: 1024px) 58vw, 40vw"
              className="select-none object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
              draggable={false}
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite-950/45 via-transparent to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-0" />
            <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
          </div>
        ))}
      </div>

      <div className="container">
        <div className="h-px w-full bg-graphite-700">
          <span
            className="block h-px bg-stone-100 transition-[width] duration-200 ease-out"
            style={{ width: `${Math.max(progress * 100, 5)}%` }}
          />
        </div>
      </div>
    </section>
  );
}
