import Image from 'next/image';
import Link from 'next/link';
import { galleryPhoto } from '@/lib/images';
import { CountUp } from './count-up';
import { QuoteButton } from './quote-dialog';

const HEADLINE = ['УКЛАДКА ПЛИТКИ', 'В ТБИЛИСИ'];

/** Кадры верхней ленты — фактуры, где плитка видна крупно. */
const STRIP = [
  { src: galleryPhoto('pat-1.jpg'), alt: 'Узорная цементная плитка' },
  { src: galleryPhoto('pat-3.jpg'), alt: 'Плитка с орнаментом' },
  { src: galleryPhoto('pat-4.jpg'), alt: 'Шестиугольная плитка' },
  { src: galleryPhoto('pat-7.jpg'), alt: 'Каменная плитка' },
];

const NOTES = [
  'Керамика, керамогранит и камень — от мозаики до плит XXL 160×320.',
  'Ванная под ключ: гидроизоляция, разводка, укладка, затирка.',
  'Запил под 45°, ниши, короба и облицовка ступеней.',
  'Фиксированная смета в договоре и гарантия три года.',
];

const STATS = [
  { value: '12+', label: 'лет опыта с плиткой' },
  { value: '480+', label: 'сданных объектов' },
  { value: '21', label: 'вид работ' },
  { value: '3', label: 'года гарантии' },
];

/**
 * Первый экран целиком помещается в высоту окна:
 * заголовок, пояснения, лента, показатели и кнопки — без прокрутки.
 * Свободное место забирает лента фактур.
 */
export function Hero() {
  return (
    <section className="pt-6 lg:h-[calc(100svh-84px)] lg:pt-7">
      <div className="container flex h-full flex-col">
        {/* Заголовок проявляется буква за буквой из размытия */}
        <div className="flex shrink-0 items-end justify-between gap-10 pb-6 lg:pb-5">
          <h1 className="display text-[12vw] leading-[0.9] sm:text-[9vw] lg:text-[4.6rem] xl:text-[5.6rem] 2xl:text-[6.4rem]">
            {HEADLINE.map((line, lineIndex) => (
              <span key={line} className="block">
                {Array.from(line).map((char, charIndex) => (
                  <span
                    key={`${lineIndex}-${charIndex}`}
                    className="char-in"
                    style={{ animationDelay: `${0.06 + lineIndex * 0.3 + charIndex * 0.028}s` }}
                  >
                    {char === ' ' ? ' ' : char}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <span
            className="arrow-in hidden pb-2 text-[56px] font-light leading-none text-stone-100 lg:block"
            style={{ animationDelay: '0.9s' }}
          >
            ↘
          </span>
        </div>

        {/* Линейка прочерчивается, следом выезжают пояснения */}
        <div
          className="grow-x h-px w-full shrink-0 origin-left bg-graphite-700"
          style={{ animationDelay: '0.85s' }}
        />
        <div className="grid shrink-0 border-b border-graphite-700 sm:grid-cols-2 lg:grid-cols-4">
          {NOTES.map((note, index) => (
            <p
              key={note}
              className={`slide-right px-0 py-4 pr-6 text-[13px] leading-[1.45] text-stone-200 sm:px-5 sm:first:pl-0 ${
                index < NOTES.length - 1 ? 'lg:border-r lg:border-graphite-700' : ''
              }`}
              style={{ animationDelay: `${0.95 + index * 0.1}s` }}
            >
              {note}
            </p>
          ))}
        </div>

        {/* Лента фактур забирает всё свободное место по высоте */}
        <div className="my-6 grid h-[200px] shrink-0 grid-cols-2 overflow-hidden rounded-2xl lg:my-5 lg:h-auto lg:min-h-[120px] lg:flex-1 lg:shrink lg:grid-cols-4">
          {STRIP.map((item, index) => (
            <div
              key={item.src}
              className={index % 2 === 0 ? 'wipe-right relative' : 'wipe-left relative'}
              style={{ animationDelay: `${1.3 + index * 0.14}s` }}
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

        {/* Показатели и кнопки — нижняя строка первого экрана */}
        <div className="shrink-0 pb-8 lg:pb-6">
          <div className="grid gap-6 border-b border-graphite-700 pb-6 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, index) => (
              <div
                key={stat.label}
                className="fade-scale"
                style={{ animationDelay: `${1.95 + index * 0.1}s` }}
              >
                <div className="display text-[40px] leading-none xl:text-[46px]">
                  <CountUp value={stat.value} delay={2050 + index * 100} />
                </div>
                <div className="mt-1.5 text-[15px] font-medium leading-[1.3] text-stone-200">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div
            className="fade-scale mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: '2.4s' }}
          >
            <QuoteButton className="btn-light py-3.5">Рассчитать смету</QuoteButton>
            <Link href="/projects" className="btn-outline-light py-3.5">
              Смотреть проекты
            </Link>
            <span className="meta sm:ml-3">Бесплатный замер по Тбилиси</span>
          </div>
        </div>
      </div>
    </section>
  );
}
