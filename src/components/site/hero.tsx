import Image from 'next/image';
import Link from 'next/link';
import { galleryPhoto } from '@/lib/images';
import { CountUp } from './count-up';
import { QuoteButton } from './quote-dialog';

/** Кадры верхней ленты — фактуры, где плитка видна крупно. */
const STRIP = [
  { src: galleryPhoto('pat-1.jpg'), alt: 'Узорная цементная плитка' },
  { src: galleryPhoto('pat-3.jpg'), alt: 'Плитка с орнаментом' },
  { src: galleryPhoto('pat-4.jpg'), alt: 'Шестиугольная плитка' },
  { src: galleryPhoto('pat-7.jpg'), alt: 'Каменная плитка' },
];

const NOTES = [
  'Керамика, керамогранит и натуральный камень — от мозаики до плит XXL 160×320.',
  'Ванная под ключ: гидроизоляция, разводка, укладка, эпоксидная затирка.',
  'Запил под 45°, ниши, короба и облицовка ступеней.',
  'Фиксированная смета в договоре и гарантия три года на все работы.',
];

const STATS = [
  { value: '12+', label: 'лет опыта работы с плиткой' },
  { value: '480+', label: 'сданных объектов в Тбилиси' },
  { value: '21', label: 'вид плиточных работ' },
  { value: '3', label: 'года гарантии на работы' },
];

export function Hero() {
  return (
    <section className="pt-10 lg:pt-14">
      <div className="container">
        {/* Заголовок поднимается из-под маски, стрелка прилетает по диагонали */}
        <div className="flex items-end justify-between gap-10 pb-10">
          <h1 className="display text-[13vw] leading-[0.92] sm:text-[10vw] lg:text-[7.2rem] xl:text-[8.6rem]">
            <span className="block overflow-hidden pb-[0.04em]">
              <span className="word-rise block" style={{ animationDelay: '0.05s' }}>
                УКЛАДКА ПЛИТКИ
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.04em]">
              <span className="word-rise block" style={{ animationDelay: '0.19s' }}>
                В ТБИЛИСИ
              </span>
            </span>
          </h1>
          <span
            className="arrow-in hidden pb-4 text-[72px] font-light leading-none text-stone-100 lg:block"
            style={{ animationDelay: '0.55s' }}
          >
            ↘
          </span>
        </div>

        {/* Линейка прочерчивается, следом всплывают пояснения */}
        <div className="h-px w-full origin-left bg-graphite-700 grow-x" style={{ animationDelay: '0.4s' }} />
        <div className="grid border-b border-graphite-700 sm:grid-cols-2 lg:grid-cols-4">
          {NOTES.map((note, index) => (
            <p
              key={note}
              className={`rise-in px-0 py-6 pr-6 text-[14px] leading-[1.5] text-stone-200 sm:px-6 sm:first:pl-0 ${
                index < NOTES.length - 1 ? 'lg:border-r lg:border-graphite-700' : ''
              }`}
              style={{ animationDelay: `${0.55 + index * 0.09}s` }}
            >
              {note}
            </p>
          ))}
        </div>

        {/* Лента фактур: каждый кадр раскрывается шторкой снизу вверх */}
        <div className="mt-11 grid h-[220px] grid-cols-2 overflow-hidden rounded-2xl lg:h-[260px] lg:grid-cols-4">
          {STRIP.map((item, index) => (
            <div
              key={item.src}
              className="wipe-up relative"
              style={{ animationDelay: `${0.85 + index * 0.13}s` }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                priority={index < 2}
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Показатели: цифры набегают от нуля */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className="rise-in"
              style={{ animationDelay: `${1.35 + index * 0.09}s` }}
            >
              <div className="display text-[52px] leading-none">
                <CountUp value={stat.value} delay={1400 + index * 90} />
              </div>
              <div className="mt-2.5 max-w-[15ch] text-[18px] font-semibold leading-[1.35] text-stone-100">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div
          className="rise-in mt-12 flex flex-col gap-4 sm:flex-row sm:items-center"
          style={{ animationDelay: '1.75s' }}
        >
          <QuoteButton className="btn-light">Рассчитать смету</QuoteButton>
          <Link href="/projects" className="btn-outline-light">
            Смотреть проекты
          </Link>
          <span className="meta sm:ml-4">Бесплатный замер по Тбилиси</span>
        </div>
      </div>
    </section>
  );
}
