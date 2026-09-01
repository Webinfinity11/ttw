import Image from 'next/image';
import Link from 'next/link';
import { galleryPhoto } from '@/lib/images';
import { Reveal } from '@/components/ui/reveal';

const PERKS: Array<[string, string]> = [
  ['ФИКСИРОВАННАЯ СМЕТА', 'Объёмы считаем на замере и пишем в договор — цена не растёт.'],
  ['ОДИН МАСТЕР НА ОБЪЕКТЕ', 'Ведёт работу от демонтажа до сдачи, почерк укладки не меняется.'],
  ['ТЕХНОЛОГИЯ МОКРЫХ ЗОН', 'Гидроизоляция в два слоя, ленты в углах, манжеты на трубах.'],
  ['ГАРАНТИЯ 3 ГОДА', 'На укладку, гидроизоляцию и затирку — с выездом по обращению.'],
];

const FACTS = [
  { value: '12+', label: 'лет с плиткой' },
  { value: '480+', label: 'объектов' },
  { value: '96%', label: 'по рекомендации' },
];

/** Обе колонки одной высоты: кадр слева тянется на всю секцию, текст выровнен по краям. */
export function AboutSection() {
  return (
    <section className="container pt-28 lg:pt-36">
      <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal className="relative min-h-[420px] overflow-hidden rounded-2xl bg-graphite-900 lg:min-h-full">
          <Image
            src={galleryPhoto('work-1.jpg')}
            alt="Затирка швов на уложенной плитке"
            fill
            sizes="(max-width: 1024px) 100vw, 48vw"
            className="object-cover"
          />
          <span className="absolute bottom-0 left-0 bg-graphite-950 px-7 py-5">
            <span className="display block text-[40px] leading-none">12</span>
            <span className="meta mt-1 block">ЛЕТ НА РЫНКЕ</span>
          </span>
        </Reveal>

        <div className="flex flex-col justify-between">
          <div>
            <span className="meta">О КОМПАНИИ</span>
            <h2 className="display mt-4 text-[10vw] uppercase leading-[0.95] sm:text-[7vw] lg:text-[3.2rem]">
              Ровный шов
              <br />и честный срок
            </h2>
            <p className="mt-6 max-w-lg text-[16px] leading-[1.75] text-stone-200">
              Мастерская плиточных работ в Тбилиси. Не берём десять объектов сразу — в работе
              два-три адреса, чтобы держать сроки и не терять качество на мелочах: совпадении швов,
              ровности примыканий, аккуратной герметизации углов.
            </p>
          </div>

          <div className="mt-9 border-t border-graphite-700">
            {PERKS.map(([title, text]) => (
              <div
                key={title}
                className="grid gap-1.5 border-b border-graphite-700 py-5 lg:grid-cols-[230px_1fr] lg:gap-8"
              >
                <span className="meta">{title}</span>
                <p className="text-[15px] leading-[1.55] text-stone-200">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-end justify-between gap-8">
            <div className="flex gap-10">
              {FACTS.map((fact) => (
                <div key={fact.label}>
                  <div className="display text-[34px] leading-none">{fact.value}</div>
                  <div className="meta mt-2">{fact.label.toUpperCase()}</div>
                </div>
              ))}
            </div>
            <Link href="/about" className="link-underline">
              <span>ПОДРОБНЕЕ</span>
              <span className="text-[22px] font-light">↘</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
