import type { Metadata } from 'next';
import Image from 'next/image';
import { CtaSection } from '@/components/site/cta-section';
import { PageHero } from '@/components/site/page-hero';
import { Process } from '@/components/site/process';
import { Reveal } from '@/components/ui/reveal';
import { galleryPhoto } from '@/lib/images';
import { getSettings } from '@/lib/data/content';

export const metadata: Metadata = {
  title: 'О нас — плиточная мастерская в Тбилиси',
};

const VALUES: Array<[string, string, string]> = [
  [
    '01',
    'ТЕХНОЛОГИЯ ВАЖНЕЕ СКОРОСТИ',
    'Не начинаем укладку, пока основание не готово. Это дороже по времени и дешевле по переделкам.',
  ],
  [
    '02',
    'ОДИН МАСТЕР НА ОБЪЕКТЕ',
    'Объект ведёт один человек от демонтажа до сдачи — почерк укладки не меняется в середине работы.',
  ],
  [
    '03',
    'ОТВЕЧАЕМ ЗА РЕЗУЛЬТАТ',
    'Договор, фиксированная смета и гарантия три года на укладку, гидроизоляцию и затирку.',
  ],
];

const FACTS = [
  { value: '12+', label: 'лет с плиткой' },
  { value: '480+', label: 'объектов' },
  { value: '96%', label: 'по рекомендации' },
  { value: '3', label: 'года гарантии' },
];

export default async function AboutPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHero
        eyebrow="О компании"
        title="О нас"
        description={settings.about}
        breadcrumbs={[{ label: 'О нас' }]}
      />

      {/* История: кадр и текст одной высоты */}
      <section className="container pt-14 lg:pt-16">
        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal className="relative min-h-[380px] overflow-hidden rounded-2xl bg-graphite-900 lg:min-h-full">
            <Image
              src={galleryPhoto('work-3.jpg')}
              alt="Инструмент плиточника на объекте"
              fill
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
            />
          </Reveal>

          <div className="flex flex-col justify-between">
            <div>
              <span className="meta">ИСТОРИЯ</span>
              <h2 className="display mt-4 text-[9vw] uppercase leading-[0.98] sm:text-[6vw] lg:text-[2.8rem]">
                Мастерская, выросшая из своего ремонта
              </h2>
              <div className="mt-6 space-y-4 text-[16px] leading-[1.75] text-stone-200">
                <p>
                  Начали с частных ванных, сегодня закрываем полный цикл плиточных работ — от стяжки
                  и гидроизоляции до крупноформатных плит 160×320 см.
                </p>
                <p>
                  Не берём десять объектов одновременно: в работе два-три адреса. Этого достаточно,
                  чтобы держать сроки и не терять качество на мелочах — совпадении швов, ровности
                  примыканий, аккуратной герметизации углов.
                </p>
                <p>
                  Работаем в {settings.city} и пригороде. Помогаем с выбором материала, считаем
                  раскладку заранее и показываем, как плитка ляжет в конкретном помещении.
                </p>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-graphite-700 pt-7 sm:grid-cols-4">
              {FACTS.map((fact) => (
                <div key={fact.label}>
                  <div className="display text-[32px] leading-none">{fact.value}</div>
                  <div className="meta mt-1.5">{fact.label.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Принципы */}
      <section className="container pt-24 lg:pt-28">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5 border-b border-graphite-700 pb-7">
          <h2 className="display text-[11vw] uppercase leading-[0.94] sm:text-[7vw] lg:text-[3.4rem]">
            Принципы
          </h2>
          <p className="max-w-sm text-[14px] leading-[1.6] text-stone-200">
            Три правила, по которым мы ведём каждый объект — от первого звонка до сдачи.
          </p>
        </div>

        <div className="grid md:grid-cols-3">
          {VALUES.map(([num, title, text], index) => (
            <Reveal
              key={num}
              delay={index * 60}
              className="border-b border-graphite-700 py-8 pr-6 md:pl-8 md:[&:first-child]:pl-0 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-graphite-700 md:[&:not(:first-child)]:border-b-graphite-700"
            >
              <span className="text-[13px] tracking-[0.08em] text-stone-400">{num}</span>
              <h3 className="mt-4 text-[18px] font-medium text-stone-100">{title}</h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-stone-200">{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Process />
      <CtaSection settings={settings} />
    </>
  );
}
