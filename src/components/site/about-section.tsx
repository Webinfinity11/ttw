import Image from 'next/image';
import Link from 'next/link';
import { galleryPhoto } from '@/lib/images';
import { Reveal } from '@/components/ui/reveal';

const PERKS: Array<[string, string]> = [
  ['ФИКСИРОВАННАЯ СМЕТА', 'Объёмы считаем на замере и пишем в договор — цена не растёт.'],
  ['ОДИН МАСТЕР НА ОБЪЕКТЕ', 'Ведёт работу от демонтажа до сдачи, почерк укладки не меняется.'],
  ['ТЕХНОЛОГИЯ МОКРЫХ ЗОН', 'Гидроизоляция в два слоя, ленты в углах, манжеты на трубах.'],
  ['ГАРАНТИЯ 3 ГОДА', 'На укладку, гидроизоляцию и затирку. Возвращаемся при любой претензии.'],
];

export function AboutSection() {
  return (
    <section className="container pt-32 lg:pt-44">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="relative h-[420px] w-full overflow-hidden rounded-2xl lg:h-[560px]">
            <Image
              src={galleryPhoto('work-1.jpg')}
              alt="Затирка швов на уложенной плитке"
              fill
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div>
          <span className="meta">О КОМПАНИИ</span>
          <h2 className="display mt-5 text-[10vw] uppercase leading-[0.95] sm:text-[7vw] lg:text-[3.4rem]">
            Ровный шов и честный срок
          </h2>
          <p className="mt-6 max-w-lg text-[16px] leading-[1.75] text-stone-200">
            Мастерская плиточных работ в Тбилиси. Не берём десять объектов сразу — в работе два-три
            адреса, чтобы держать сроки и не терять качество на мелочах: совпадении швов, ровности
            примыканий, аккуратной герметизации углов.
          </p>

          <div className="mt-10 border-t border-graphite-700">
            {PERKS.map(([title, text]) => (
              <div key={title} className="grid gap-2 border-b border-graphite-700 py-6 lg:grid-cols-[240px_1fr] lg:gap-8">
                <span className="meta">{title}</span>
                <p className="text-[15px] leading-[1.6] text-stone-200">{text}</p>
              </div>
            ))}
          </div>

          <Link href="/about" className="link-underline mt-9">
            <span>ПОДРОБНЕЕ О НАС</span>
            <span className="text-[22px] font-light">↘</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
