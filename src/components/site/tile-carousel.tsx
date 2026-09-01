'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { galleryPhoto } from '@/lib/images';
import { cn } from '@/lib/cn';

interface Card {
  src: string;
  title: string;
  note: string;
}

const CARDS: Card[] = [
  { src: galleryPhoto('hero-bath-1.jpg'), title: 'Мрамор в душевой', note: 'Крупный формат · книжный подбор' },
  { src: '/tiles/marble-black-gold.webp', title: 'Чёрный мрамор', note: 'Золотые прожилки · полировка' },
  { src: galleryPhoto('pat-1.jpg'), title: 'Цементный орнамент', note: 'Ручная раскладка · шов 2 мм' },
  { src: galleryPhoto('mosaic-2.jpg'), title: 'Мозаика', note: '25×25 · эпоксидная затирка' },
  { src: galleryPhoto('pat-4.jpg'), title: 'Шестиугольник', note: 'Гексагон · пол и стены' },
  { src: galleryPhoto('floor-5.jpg'), title: 'Мрамор на полу', note: 'Полировка · минимальный шов' },
  { src: galleryPhoto('pat-6.jpg'), title: 'Ёлочка под дерево', note: 'Керамогранит 20×120' },
  { src: galleryPhoto('bath-1.jpg'), title: 'Тёмный керамогранит', note: 'Санузел · скрытые люки' },
  { src: galleryPhoto('pat-3.jpg'), title: 'Марокканский узор', note: 'Акцентная стена' },
  { src: '/tiles/terrazzo.jpg', title: 'Натуральный камень', note: 'Патчворк · травертин' },
];

export function TileCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const drag = useRef<{ startX: number; startLeft: number } | null>(null);

  const sync = useCallback(() => {
    const node = trackRef.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    setProgress(max > 0 ? node.scrollLeft / max : 0);
    setCanPrev(node.scrollLeft > 8);
    setCanNext(node.scrollLeft < max - 8);
  }, []);

  useEffect(() => {
    sync();
    const node = trackRef.current;
    if (!node) return;
    node.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      node.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync]);

  const scrollBy = useCallback((direction: 1 | -1) => {
    const node = trackRef.current;
    if (!node) return;
    const card = node.querySelector('[data-card]') as HTMLElement | null;
    const step = (card?.offsetWidth ?? 360) + 24;
    node.scrollBy({ left: step * direction, behavior: 'smooth' });
  }, []);

  return (
    <section className="pt-28 lg:pt-36">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-8 border-b border-graphite-700 pb-9">
          <div>
            <span className="meta">ФАКТУРЫ И МАТЕРИАЛЫ</span>
            <h2 className="display mt-4 text-[12vw] uppercase leading-[0.94] sm:text-[8vw] lg:text-[4.2rem]">
              Что мы кладём
            </h2>
          </div>

          {/* Стрелки */}
          <div className="flex gap-2.5">
            <button
              onClick={() => scrollBy(-1)}
              disabled={!canPrev}
              aria-label="Назад"
              className={cn(
                'flex h-14 w-14 items-center justify-center border text-[26px] font-light leading-none transition-all duration-300',
                canPrev
                  ? 'border-graphite-700 text-stone-100 hover:border-stone-300 hover:bg-stone-100 hover:text-graphite-950'
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
                  ? 'border-graphite-700 text-stone-100 hover:border-stone-300 hover:bg-stone-100 hover:text-graphite-950'
                  : 'border-graphite-800 text-graphite-700',
              )}
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Лента карточек — тянется за курсором, скроллится колесом и свайпом */}
      <div
        ref={trackRef}
        onPointerDown={(event) => {
          const node = trackRef.current;
          if (!node) return;
          drag.current = { startX: event.clientX, startLeft: node.scrollLeft };
          node.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const node = trackRef.current;
          if (!node || !drag.current) return;
          node.scrollLeft = drag.current.startLeft - (event.clientX - drag.current.startX);
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
        className="scrollbar-slim mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 lg:px-10 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none', cursor: 'grab' }}
      >
        {CARDS.map((card, index) => (
          <figure
            key={card.src}
            data-card
            className="group relative w-[76vw] shrink-0 snap-start sm:w-[46vw] lg:w-[27vw] xl:w-[22vw]"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-graphite-900">
              <Image
                src={card.src}
                alt={card.title}
                fill
                sizes="(max-width: 640px) 76vw, (max-width: 1024px) 46vw, 24vw"
                className="select-none object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.07]"
                draggable={false}
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite-950/85 via-graphite-950/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

              <span className="absolute left-5 top-5 text-[12px] uppercase tracking-[0.1em] text-stone-200 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 [transform:translateY(-6px)]">
                {String(index + 1).padStart(2, '0')} / {String(CARDS.length).padStart(2, '0')}
              </span>

              <figcaption className="absolute inset-x-5 bottom-5">
                <p className="text-[20px] font-medium leading-tight text-stone-100">{card.title}</p>
                <p className="mt-1.5 max-h-0 overflow-hidden text-[13px] text-stone-300 opacity-0 transition-all duration-500 group-hover:max-h-10 group-hover:opacity-100">
                  {card.note}
                </p>
              </figcaption>
            </div>
          </figure>
        ))}
      </div>

      {/* Полоса прокрутки */}
      <div className="container mt-4">
        <div className="h-px w-full bg-graphite-700">
          <span
            className="block h-px bg-stone-100 transition-all duration-200"
            style={{ width: `${Math.max(progress * 100, 6)}%` }}
          />
        </div>
        <p className="meta mt-4">ПОТЯНИТЕ ЛЕНТУ ИЛИ ЛИСТАЙТЕ СТРЕЛКАМИ</p>
      </div>
    </section>
  );
}
