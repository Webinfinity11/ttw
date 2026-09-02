import Image from 'next/image';
import Link from 'next/link';
import type { HeroBlock } from '@/lib/types';
import { CountUp } from './count-up';
import { QuoteButton } from './quote-dialog';

/**
 * Первый экран помещается в высоту окна.
 * Вход: строки заголовка поднимаются из-под маски, линейка прочерчивается,
 * пояснения всплывают, кадры раскрываются шторкой, счётчики и кнопки следом.
 *
 * Весь текст и кадры приходят из админки — раздел «Страницы» → «Первый экран».
 */
export function Hero({ content }: { content: HeroBlock }) {
  return (
    <section className="pt-6 lg:h-[calc(100svh-84px)] lg:pt-7">
      <div className="container flex h-full flex-col">
        <div className="flex shrink-0 items-end justify-between gap-10 pb-6 lg:pb-5">
          <h1 className="display text-[10.5vw] leading-[1.02] sm:text-[8vw] lg:text-[3.9rem] xl:text-[4.7rem] 2xl:text-[5.2rem]">
            {content.headline.map((line, index) => (
              <span key={index} className="block overflow-hidden pb-[0.06em]">
                <span className="word-rise" style={{ animationDelay: `${0.05 + index * 0.14}s` }}>
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <span
            className="arrow-in hidden pb-2 text-[56px] font-light leading-none text-stone-100 lg:block"
            style={{ animationDelay: '0.55s' }}
          >
            ↘
          </span>
        </div>

        <div
          className="grow-x h-px w-full shrink-0 origin-left bg-graphite-700"
          style={{ animationDelay: '0.4s' }}
        />
        <div className="grid shrink-0 border-b border-graphite-700 sm:grid-cols-2 lg:grid-cols-4">
          {content.notes.map((note, index) => (
            <p
              key={index}
              className={`rise-in px-0 py-4 pr-6 text-[13px] leading-[1.45] text-stone-200 sm:px-5 sm:first:pl-0 ${
                index < content.notes.length - 1 ? 'lg:border-r lg:border-graphite-700' : ''
              }`}
              style={{ animationDelay: `${0.55 + index * 0.09}s` }}
            >
              {note}
            </p>
          ))}
        </div>

        {/* Лента фактур: каждый кадр раскрывается шторкой снизу вверх */}
        <div className="my-6 grid h-[200px] shrink-0 grid-cols-2 overflow-hidden rounded-2xl lg:my-5 lg:h-auto lg:min-h-[120px] lg:flex-1 lg:shrink lg:grid-cols-4">
          {content.photos.map((item, index) => (
            <div
              key={index}
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

        <div className="shrink-0 pb-8 lg:pb-6">
          <div className="grid gap-6 border-b border-graphite-700 pb-6 sm:grid-cols-2 lg:grid-cols-4">
            {content.stats.map((stat, index) => (
              <div
                key={index}
                className="rise-in"
                style={{ animationDelay: `${1.35 + index * 0.09}s` }}
              >
                <div className="display text-[40px] leading-none xl:text-[46px]">
                  <CountUp value={stat.value} delay={1400 + index * 90} duration={1200} />
                </div>
                <div className="mt-1.5 text-[15px] font-medium leading-[1.3] text-stone-200">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div
            className="rise-in mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: '1.75s' }}
          >
            <QuoteButton className="btn-light py-3.5">{content.primaryCta}</QuoteButton>
            <Link href="/projects" className="btn-outline-light py-3.5">
              {content.secondaryCta}
            </Link>
            <span className="meta sm:ml-3">{content.footnote}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
