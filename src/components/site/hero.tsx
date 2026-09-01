import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { QuoteButton } from './quote-dialog';

/**
 * Реальные фотографии материалов (Unsplash, см. public/tiles/CREDITS.txt).
 * Кадрируются в форму плиты — фон снимка не виден.
 */
const TILES = [
  { src: '/tiles/porcelain.jpg', label: 'керамогранит' },
  { src: '/tiles/marble.jpg', label: 'мрамор XXL' },
  { src: '/tiles/terrazzo.jpg', label: 'натуральный камень' },
  { src: '/tiles/mosaic.jpg', label: 'мозаика' },
];

/** Плита: фотография + светлая кромка, тень и «торец» снизу. */
function TilePlate({ src, label, priority }: { src: string; label: string; priority?: boolean }) {
  return (
    <div className="relative overflow-hidden shadow-[0_28px_50px_-18px_rgba(0,0,0,0.85)] ring-1 ring-white/20">
      <Image
        src={src}
        alt={label}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 45vw, 220px"
        className="object-cover"
      />
      {/* блик сверху и торец плиты снизу — объём без вырезания фона */}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-black/35" />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1.5 bg-black/45" />
      <span className="absolute bottom-2.5 left-3 font-mono text-[10px] uppercase tracking-wide text-white/90 [text-shadow:0_1px_3px_rgba(0,0,0,.9)]">
        {label}
      </span>
    </div>
  );
}

const STATS = [
  { value: '12', suffix: 'лет', label: 'опыта работы' },
  { value: '480+', suffix: '', label: 'объектов сдано' },
  { value: '3', suffix: 'года', label: 'гарантии' },
  { value: '160×320', suffix: 'см', label: 'формат плит' },
];

export function Hero({ phone }: { phone: string }) {
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
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-graphite-950 via-graphite-950/85 to-graphite-950/55" />
        <div className="absolute inset-0 tile-grid" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_72%_38%,rgba(14,138,118,0.34),transparent_62%)]" />

        {/* Вертикальный телефон слева */}
        <div className="absolute inset-y-0 left-0 hidden w-[120px] items-center justify-center xl:flex">
          <span className="whitespace-nowrap font-display text-[15px] font-semibold tracking-[0.22em] text-stone-100 [transform:rotate(-90deg)]">
            {phone}
          </span>
        </div>

        {/* Счётчик слайдов */}
        <div className="absolute bottom-0 left-10 hidden bg-white px-7 py-5 text-center font-display leading-tight xl:block">
          <div className="text-2xl font-extrabold text-accent-500">1</div>
          <div className="text-lg text-graphite-300">/</div>
          <div className="text-2xl font-extrabold text-graphite-950">3</div>
        </div>

        <div className="container relative grid items-center gap-16 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-28 xl:pl-[150px]">
          <div className="animate-fade-up">
            <span className="inline-block border-b-2 border-accent-500 pb-2 font-display text-[14px] font-semibold uppercase tracking-[0.14em] text-white">
              Плиточная мастерская · Тбилиси
            </span>

            <h1 className="display mt-8 text-[3rem] leading-[1.03] text-white sm:text-6xl xl:text-[5.2rem]">
              Укладка плитки и керамогранита
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-[1.75] text-stone-300/80">
              Полный цикл: замер, раскладка, подготовка основания и монтаж. Работаем с
              крупноформатом, мозаикой и натуральным камнем.
            </p>

            <div className="mt-11 flex flex-col gap-4 sm:flex-row">
              <Link href="/services" className="btn-light px-11 py-5">
                Наши услуги
              </Link>
              <QuoteButton className="btn-outline-light px-11 py-5">
                Вызвать замерщика
                <ArrowRight className="h-4 w-4" />
              </QuoteButton>
            </div>

            {/* Мобильный вариант блока с материалами */}
            <div className="mt-12 grid grid-cols-2 gap-4 lg:hidden">
              {TILES.map((tile) => (
                <div key={tile.label} className="relative h-28">
                  <TilePlate src={tile.src} label={tile.label} />
                </div>
              ))}
            </div>
          </div>

          {/* Круг с «плитками» */}
          <div className="relative hidden min-h-[520px] items-center justify-center lg:flex">
            <div className="absolute h-[520px] w-[520px] rounded-full border border-white/30 bg-white/[0.04]" />
            <div className="relative grid h-[320px] w-[440px] grid-cols-2 grid-rows-2 gap-6 [transform:rotate(-8deg)]">
              {TILES.map((tile, index) => (
                <TilePlate key={tile.label} src={tile.src} label={tile.label} priority={index < 2} />
              ))}
            </div>
            <span className="absolute right-[-10px] top-2 bg-accent-500 px-4 py-2.5 text-sm font-medium text-white">
              Плитка любого формата
            </span>
            <span className="absolute bottom-2 left-[-20px] bg-accent-500 px-4 py-2.5 text-sm font-medium text-white">
              Запил под 45°
            </span>
          </div>
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
