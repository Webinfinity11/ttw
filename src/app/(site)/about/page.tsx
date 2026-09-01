import type { Metadata } from 'next';
import Image from 'next/image';
import { Award, Hammer, Users } from 'lucide-react';
import { CtaSection } from '@/components/site/cta-section';
import { PageHero } from '@/components/site/page-hero';
import { Process } from '@/components/site/process';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { photo } from '@/lib/images';
import { getSettings } from '@/lib/data/content';

export const metadata: Metadata = {
  title: 'О компании — плиточная мастерская в Тбилиси',
};

const VALUES = [
  {
    icon: Hammer,
    title: 'Технология важнее скорости',
    text: 'Не начинаем укладку, пока основание не готово. Это дороже по времени и дешевле по переделкам.',
  },
  {
    icon: Users,
    title: 'Один мастер на объекте',
    text: 'Объект ведёт один человек от демонтажа до сдачи — почерк укладки не меняется в середине работы.',
  },
  {
    icon: Award,
    title: 'Отвечаем за результат',
    text: 'Договор, фиксированная смета и гарантия 3 года на укладку, гидроизоляцию и затирку.',
  },
];

export default async function AboutPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHero
        eyebrow="О компании"
        title={settings.companyName}
        description={settings.about}
        breadcrumbs={[{ label: 'О компании' }]}
      />

      <section className="bg-stone-50 py-16 lg:py-24">
        <div className="container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-none">
              <Image
                src={photo('about-master', 1000, 1250)}
                alt="Мастер за укладкой плитки"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -right-4 bottom-8 w-44 rounded-none border border-stone-200 bg-white p-5 shadow-card lg:-right-10">
              <p className="font-display text-4xl font-black tracking-tightest">12</p>
              <p className="mt-1 text-xs leading-snug text-graphite-500">
                лет с плиткой, из них 6 — в Тбилиси
              </p>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="История"
              title="Мастерская, которая выросла из ремонта своей квартиры"
              description="Начали с частных ванных, сегодня закрываем полный цикл плиточных работ — от стяжки и гидроизоляции до крупноформатных плит 160×320 см."
            />
            <div className="mt-8 space-y-5 text-[16px] leading-relaxed text-graphite-500">
              <p>
                Мы не берём десять объектов одновременно. В работе одновременно два-три адреса —
                этого достаточно, чтобы держать сроки и не терять качество на мелочах: совпадении
                швов, ровности шва у примыканий, аккуратной герметизации углов.
              </p>
              <p>
                Работаем в {settings.city} и пригороде. Помогаем с выбором материала, считаем
                раскладку заранее и показываем, как плитка ляжет в конкретном помещении.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                { value: '480+', label: 'объектов' },
                { value: '96%', label: 'клиентов по рекомендации' },
                { value: '3 года', label: 'гарантии' },
              ].map((item) => (
                <div key={item.label} className="border-l border-stone-300 pl-5">
                  <p className="font-display text-3xl font-black tracking-tightest">{item.value}</p>
                  <p className="mt-1 text-sm text-graphite-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="container">
          <SectionHeading eyebrow="Принципы" title="Как мы относимся к работе" align="center" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {VALUES.map((value, index) => (
              <Reveal
                key={value.title}
                delay={index * 70}
                className="rounded-none border border-stone-200 bg-stone-50 p-8 lg:p-10"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-none bg-white text-stone-100">
                  <value.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-7 text-lg font-semibold tracking-tight">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite-500">{value.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Process />
      <CtaSection settings={settings} />
    </>
  );
}
