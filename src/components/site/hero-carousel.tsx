'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import { cn } from '@/lib/cn';
import { galleryPhoto } from '@/lib/images';
import { QuoteButton } from './quote-dialog';

interface Slide {
  eyebrow: string;
  title: string[];
  text: string;
  photo: string;
  tag: string;
  href: string;
  hrefLabel: string;
}

const SLIDES: Slide[] = [
  {
    eyebrow: 'Плиточная мастерская · Тбилиси',
    title: ['Укладка плитки', 'и керамогранита'],
    text: 'Полный цикл: замер, раскладка, подготовка основания и монтаж. Работаем с крупноформатом, мозаикой и натуральным камнем.',
    photo: galleryPhoto('bath-2.jpg'),
    tag: 'Все виды работ',
    href: '/services',
    hrefLabel: 'Наши услуги',
  },
  {
    eyebrow: 'Под ключ',
    title: ['Ванная комната', 'за 12–20 дней'],
    text: 'Демонтаж, разводка, гидроизоляция в два слоя, плитка, эпоксидная затирка и финиш. Один мастер ведёт объект от начала до сдачи.',
    photo: galleryPhoto('bath-4.jpg'),
    tag: 'Гарантия 3 года',
    href: '/services/vannaya-pod-klyuch',
    hrefLabel: 'Как это устроено',
  },
  {
    eyebrow: 'Крупный формат',
    title: ['Плиты XXL', 'до 160×320 см'],
    text: 'Вакуумные присоски, рама для переноски и нивелирующая система. Перед укладкой выводим основание в плоскость до 2 мм.',
    photo: galleryPhoto('floor-5.jpg'),
    tag: 'Шов от 1.5 мм',
    href: '/services/xxl-keramogranit',
    hrefLabel: 'Про крупный формат',
  },
  {
    eyebrow: 'Ювелирная работа',
    title: ['Мозаика и запил', 'под 45 градусов'],
    text: 'Углы стыкуем «в ус» на станке с водяным охлаждением — без пластиковых уголков. Мозаику подрезаем сеткой по месту.',
    photo: galleryPhoto('mosaic-1.jpg'),
    tag: 'Без сколов и уголков',
    href: '/projects',
    hrefLabel: 'Смотреть проекты',
  },
];

const AUTOPLAY_MS = 6500;

export function HeroCarousel({ phone }: { phone: string }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const touchStart = useRef<number | null>(null);

  const go = useCallback((index: number) => setActive((index + SLIDES.length) % SLIDES.length), []);
  const next = useCallback(() => setActive((value) => (value + 1) % SLIDES.length), []);
  const prev = useCallback(
    () => setActive((value) => (value - 1 + SLIDES.length) % SLIDES.length),
    [],
  );

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(next, AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [active, playing, next]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') next();
      if (event.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  const slide = SLIDES[active];

  return (
    <section
      className="relative isolate flex min-h-[680px] flex-col overflow-hidden bg-graphite-950 lg:h-[calc(100svh-72px)]"
      onTouchStart={(event) => {
        touchStart.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const delta = event.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(delta) > 60) (delta < 0 ? next : prev)();
        touchStart.current = null;
      }}
    >
      {/* Чёрный мрамор с золотыми прожилками — фактура всей секции */}
      <Image
        src="/tiles/marble-black-gold.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-20 bg-graphite-950/45" />

      {/* Фото объекта — правая половина, уходит в мрамор */}
      <div className="absolute inset-y-0 right-0 -z-10 w-full lg:w-[62%]">
        {SLIDES.map((item, index) => (
          <div
            key={item.photo}
            className={cn(
              'absolute inset-0 transition-all duration-[1100ms] ease-out',
              active === index ? 'scale-100 opacity-100' : 'scale-[1.06] opacity-0',
            )}
          >
            <Image
              src={item.photo}
              alt={item.title.join(' ')}
              fill
              priority={index === 0}
              sizes="(max-width: 1024px) 100vw, 62vw"
              className="object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-graphite-950 via-graphite-950/70 to-graphite-950/25 lg:via-graphite-950/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-transparent to-graphite-950/40" />
      </div>

      {/* Вертикальный телефон слева */}
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[110px] items-center justify-center xl:flex">
        <a
          href={`tel:${phone.replace(/\s/g, '')}`}
          className="pointer-events-auto whitespace-nowrap font-display text-[14px] font-semibold tracking-[0.24em] text-stone-100/80 transition hover:text-accent-400 [transform:rotate(-90deg)]"
        >
          {phone}
        </a>
      </div>

      {/* Контент слайда */}
      <div className="container relative flex flex-1 items-center py-24 lg:py-0 xl:pl-[140px]">
        <div className="max-w-2xl">
          <span key={`eyebrow-${active}`} className="animate-fade-up inline-flex items-center gap-3">
            <span className="h-px w-10 bg-accent-400" />
            <span className="font-display text-[13px] font-bold uppercase tracking-[0.22em] text-accent-400">
              {slide.eyebrow}
            </span>
          </span>

          <h1 className="display mt-7 text-[2.9rem] leading-[1.02] text-white sm:text-6xl xl:text-[5rem]">
            {slide.title.map((line, index) => (
              <span
                key={`${active}-${line}`}
                className="block overflow-hidden pb-[0.06em]"
              >
                <span
                  className="word-rise block"
                  style={{ animationDelay: `${0.1 + index * 0.12}s` }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            key={`text-${active}`}
            className="animate-fade-up mt-7 max-w-xl text-lg leading-[1.75] text-stone-200/75"
            style={{ animationDelay: '0.35s' }}
          >
            {slide.text}
          </p>

          <div
            key={`cta-${active}`}
            className="animate-fade-up mt-10 flex flex-col gap-4 sm:flex-row"
            style={{ animationDelay: '0.5s' }}
          >
            <QuoteButton className="btn bg-accent-400 px-10 py-5 text-graphite-950 hover:bg-accent-300">
              Рассчитать смету
              <ArrowRight className="h-4 w-4" />
            </QuoteButton>
            <Link
              href={slide.href}
              className="btn border border-white/25 px-10 py-5 text-white transition hover:border-accent-400 hover:text-accent-400"
            >
              {slide.hrefLabel}
            </Link>
          </div>

          <span
            key={`tag-${active}`}
            className="animate-fade-up mt-9 inline-block border border-accent-400/40 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent-300"
            style={{ animationDelay: '0.62s' }}
          >
            {slide.tag}
          </span>
        </div>
      </div>

      {/* Панель управления каруселью */}
      <div className="relative border-t border-white/10 bg-graphite-950/70">
        <div className="container flex flex-wrap items-stretch justify-between gap-6 py-5">
          {/* счётчик + прогресс */}
          <div className="flex items-center gap-6">
            <div className="font-display leading-none">
              <span className="text-3xl font-black text-accent-400">
                {String(active + 1).padStart(2, '0')}
              </span>
              <span className="mx-1.5 text-lg text-white/30">/</span>
              <span className="text-lg text-white/45">
                {String(SLIDES.length).padStart(2, '0')}
              </span>
            </div>

            <div className="hidden h-px w-40 bg-white/15 sm:block">
              <span
                key={`progress-${active}-${playing}`}
                className={cn('block h-full bg-accent-400', playing && 'hero-progress')}
              />
            </div>

            <button
              onClick={() => setPlaying((value) => !value)}
              aria-label={playing ? 'Пауза' : 'Продолжить'}
              className="flex h-9 w-9 items-center justify-center border border-white/20 text-white transition hover:border-accent-400 hover:text-accent-400"
            >
              {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            </button>
          </div>

          {/* миниатюры слайдов */}
          <div className="flex items-center gap-3">
            {SLIDES.map((item, index) => (
              <button
                key={item.photo}
                onClick={() => go(index)}
                aria-label={item.title.join(' ')}
                className={cn(
                  'relative h-14 w-20 overflow-hidden border transition-all duration-300',
                  active === index
                    ? 'border-accent-400 opacity-100'
                    : 'border-white/15 opacity-45 hover:opacity-80',
                )}
              >
                <Image src={item.photo} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}

            <div className="ml-2 flex">
              <button
                onClick={prev}
                aria-label="Предыдущий слайд"
                className="flex h-14 w-14 items-center justify-center border border-white/20 text-white transition hover:border-accent-400 hover:text-accent-400"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                aria-label="Следующий слайд"
                className="flex h-14 w-14 items-center justify-center border border-l-0 border-white/20 bg-accent-400 text-graphite-950 transition hover:bg-accent-300"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
