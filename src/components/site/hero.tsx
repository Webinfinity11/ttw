'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { QuoteButton } from './quote-dialog';
import { MaterialSlider, MaterialSliderMobile, SLIDES } from './material-slider';

const HEADLINE = ['Укладка', 'плитки', 'и', 'керамогранита'];

const STATS = [
  { value: '12', suffix: 'лет', label: 'опыта работы' },
  { value: '480+', suffix: '', label: 'объектов сдано' },
  { value: '3', suffix: 'года', label: 'гарантии' },
  { value: '160×320', suffix: 'см', label: 'формат плит' },
];

const AUTOPLAY_MS = 5000;

export function Hero({ phone }: { phone: string }) {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setSlide((value) => (value + 1) % SLIDES.length), []);
  const prev = useCallback(
    () => setSlide((value) => (value - 1 + SLIDES.length) % SLIDES.length),
    [],
  );

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(next, AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [slide, paused, next]);

  return (
    <>
      <section className="relative overflow-hidden bg-graphite-950">
        {/* Фон: тёмный мрамор + затемнение + сетка плиточных швов */}
        <Image
          src="/tiles/hero-marble.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-100 contrast-[1.18] brightness-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-graphite-950 via-graphite-950/78 to-graphite-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite-950/70 via-transparent to-graphite-950/40" />
        <div className="absolute inset-0 tile-grid" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_72%_38%,rgba(14,138,118,0.34),transparent_62%)]" />

        {/* Вертикальный телефон слева */}
        <div className="absolute inset-y-0 left-0 hidden w-[120px] items-center justify-center xl:flex">
          <span className="whitespace-nowrap font-display text-[15px] font-semibold tracking-[0.22em] text-stone-100 [transform:rotate(-90deg)]">
            {phone}
          </span>
        </div>

        {/* Счётчик слайдов — связан со слайдером */}
        <div className="absolute bottom-0 left-10 hidden bg-white px-7 py-5 text-center font-display leading-tight xl:block">
          <div className="text-2xl font-extrabold text-accent-500">
            {String(slide + 1).padStart(2, '0')}
          </div>
          <div className="text-lg text-graphite-300">/</div>
          <div className="text-2xl font-extrabold text-graphite-950">
            {String(SLIDES.length).padStart(2, '0')}
          </div>
        </div>

        <div className="container relative grid items-center gap-16 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-28 xl:pl-[150px]">
          <div>
            <span className="relative inline-block pb-2 font-display text-[14px] font-semibold uppercase tracking-[0.14em] text-white">
              <span className="animate-fade-in inline-block" style={{ animationDelay: '0.05s' }}>
                Плиточная мастерская · Тбилиси
              </span>
              <span
                className="line-draw absolute inset-x-0 bottom-0 h-0.5 bg-accent-500"
                style={{ animationDelay: '0.25s' }}
              />
            </span>

            <h1 className="display mt-8 text-[3rem] leading-[1.03] text-white sm:text-6xl xl:text-[5.2rem]">
              {HEADLINE.map((word, index) => (
                <span key={word} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <span
                    className="word-rise inline-block"
                    style={{ animationDelay: `${0.3 + index * 0.09}s` }}
                  >
                    {word}&nbsp;
                  </span>
                </span>
              ))}
            </h1>

            <p
              className="animate-fade-up mt-7 max-w-xl text-lg leading-[1.75] text-stone-300/80"
              style={{ animationDelay: '0.75s' }}
            >
              Полный цикл: замер, раскладка, подготовка основания и монтаж. Работаем с
              крупноформатом, мозаикой и натуральным камнем.
            </p>

            <div
              className="animate-fade-up mt-11 flex flex-col gap-4 sm:flex-row"
              style={{ animationDelay: '0.92s' }}
            >
              <Link href="/services" className="btn-light px-11 py-5">
                Наши услуги
              </Link>
              <QuoteButton className="btn-outline-light px-11 py-5">
                Вызвать замерщика
                <ArrowRight className="h-4 w-4" />
              </QuoteButton>
            </div>

            <MaterialSliderMobile active={slide} onSelect={setSlide} />
          </div>

          <MaterialSlider
            active={slide}
            onSelect={setSlide}
            onPrev={prev}
            onNext={next}
            onHoverChange={setPaused}
          />
        </div>
      </section>

      {/* Полоса показателей */}
      <section className="border-b border-stone-200 bg-white">
        <div className="container grid divide-y divide-stone-200 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {STATS.map((stat) => (
            <div key={stat.label} className="px-2 py-8 lg:px-8">
              <p className="display text-4xl text-graphite-950">
                {stat.value}
                {stat.suffix && (
                  <span className="ml-2 text-base font-semibold tracking-normal text-accent-500">
                    {stat.suffix}
                  </span>
                )}
              </p>
              <p className="mt-2 text-[15px] text-graphite-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
