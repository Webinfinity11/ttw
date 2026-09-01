'use client';

import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface Slide {
  src: string;
  title: string;
  note: string;
}

/** Материалы в hero — реальные фото (Unsplash, public/tiles/CREDITS.txt). */
export const SLIDES: Slide[] = [
  { src: '/tiles/porcelain.jpg', title: 'Керамогранит', note: '60×120 · под бетон' },
  { src: '/tiles/marble.jpg', title: 'Мрамор XXL', note: '160×320 · книжный подбор' },
  { src: '/tiles/terrazzo.jpg', title: 'Натуральный камень', note: 'мрамор · травертин' },
  { src: '/tiles/mosaic.jpg', title: 'Мозаика', note: '25×25 · эпоксидный шов' },
];

interface SliderProps {
  active: number;
  onSelect(index: number): void;
  onPrev(): void;
  onNext(): void;
  onHoverChange(hovered: boolean): void;
}

/** Слайдер образцов в наклонённом квадрате. */
export function MaterialSlider({ active, onSelect, onPrev, onNext, onHoverChange }: SliderProps) {
  return (
    <div className="relative hidden min-h-[560px] items-center justify-center lg:flex">
      <div
        className="relative flex items-center justify-center [transform:rotate(-8deg)]"
        onMouseEnter={() => onHoverChange(true)}
        onMouseLeave={() => onHoverChange(false)}
      >
        <div className="frame-enter absolute h-[510px] w-[510px] border border-white/25 bg-white/[0.06] backdrop-blur-[2px]" />

        <div className="relative h-[340px] w-[440px] overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.85)] ring-1 ring-white/20">
          {SLIDES.map((slide, index) => (
            <div
              key={slide.src}
              className={cn(
                'absolute inset-0 transition-all duration-[900ms] ease-out',
                active === index ? 'scale-100 opacity-100' : 'scale-[1.07] opacity-0',
              )}
            >
              <Image
                src={slide.src}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="440px"
                className="object-cover"
              />
            </div>
          ))}

          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite-950/80 via-transparent to-white/10" />

          {/* подпись текущего материала */}
          <div className="absolute inset-x-5 bottom-4">
            <p
              key={`title-${active}`}
              className="animate-fade-up font-display text-2xl font-black leading-none text-white"
            >
              {SLIDES[active].title}
            </p>
            <p
              key={`note-${active}`}
              className="animate-fade-up mt-1.5 font-mono text-[11px] uppercase tracking-wide text-accent-300"
              style={{ animationDelay: '80ms' }}
            >
              {SLIDES[active].note}
            </p>
          </div>

          {/* полоса автопрокрутки */}
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white/15">
            <span key={active} className="slide-progress block h-full w-full bg-accent-400" />
          </span>
        </div>

        {/* стрелки */}
        <div className="absolute -bottom-7 right-0 flex">
          <button
            onClick={onPrev}
            aria-label="Предыдущий материал"
            className="flex h-14 w-14 items-center justify-center bg-white text-graphite-950 transition hover:bg-accent-500 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={onNext}
            aria-label="Следующий материал"
            className="flex h-14 w-14 items-center justify-center bg-graphite-950 text-white transition hover:bg-accent-500"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        {/* точки */}
        <div className="absolute -left-7 top-1/2 flex -translate-y-1/2 flex-col gap-3">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.src}
              onClick={() => onSelect(index)}
              aria-label={slide.title}
              className={cn(
                'h-2.5 w-2.5 transition-all duration-300',
                active === index ? 'h-8 bg-accent-400' : 'bg-white/35 hover:bg-white/70',
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Мобильный вариант слайдера — под текстом hero. */
export function MaterialSliderMobile({
  active,
  onSelect,
}: {
  active: number;
  onSelect(index: number): void;
}) {
  return (
    <div className="mt-12 lg:hidden">
      <div className="relative aspect-[16/10] w-full overflow-hidden ring-1 ring-white/20">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.src}
            className={cn(
              'absolute inset-0 transition-all duration-[900ms] ease-out',
              active === index ? 'scale-100 opacity-100' : 'scale-[1.07] opacity-0',
            )}
          >
            <Image src={slide.src} alt={slide.title} fill sizes="100vw" className="object-cover" />
          </div>
        ))}
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite-950/85 to-transparent" />
        <div className="absolute inset-x-5 bottom-4">
          <p className="font-display text-xl font-black text-white">{SLIDES[active].title}</p>
          <p className="mt-1 font-mono text-[11px] uppercase text-accent-300">
            {SLIDES[active].note}
          </p>
        </div>
        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white/15">
          <span key={active} className="slide-progress block h-full w-full bg-accent-400" />
        </span>
      </div>

      <div className="mt-4 flex gap-2">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.src}
            onClick={() => onSelect(index)}
            aria-label={slide.title}
            className={cn(
              'h-1 flex-1 transition-colors',
              active === index ? 'bg-accent-400' : 'bg-white/25',
            )}
          />
        ))}
      </div>
    </div>
  );
}
