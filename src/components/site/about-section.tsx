import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { photo } from '@/lib/images';
import { Reveal } from '@/components/ui/reveal';

const PERKS = [
  'Фиксированная смета',
  'Свой профессиональный инструмент',
  'Гидроизоляция по технологии',
  'Гарантия 3 года',
  'Запил под 45° без уголков',
  'Уборка после работ',
];

export function AboutSection() {
  return (
    <section className="bg-white">
      <div className="container grid items-center gap-16 py-24 lg:grid-cols-2 lg:gap-20 lg:py-28">
        <Reveal className="relative">
          <div className="relative h-[420px] w-full lg:h-[560px]">
            <Image
              src={photo('about-object', 1000, 1250)}
              alt="Санузел с крупноформатным керамогранитом"
              fill
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-8 right-0 bg-accent-500 px-10 py-8 font-display text-white lg:-right-8">
            <div className="text-5xl font-black leading-none">12</div>
            <div className="mt-1.5 text-[15px] font-medium tracking-[0.06em]">лет на рынке</div>
          </div>
        </Reveal>

        <div>
          <span className="eyebrow">О компании</span>
          <h2 className="display mt-4 text-4xl leading-[1.1] sm:text-5xl">
            Ровный шов и честный срок
          </h2>
          <p className="mt-6 text-[18px] leading-[1.8] text-graphite-500">
            Мастер с профильным опытом, собственный инструмент и контроль на каждом этапе. Смету
            фиксируем до начала работ — скрытых доплат нет.
          </p>

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {PERKS.map((perk) => (
              <div key={perk} className="flex items-start gap-3 text-[17px] text-graphite-900">
                <Check className="mt-1 h-5 w-5 shrink-0 text-accent-500" />
                {perk}
              </div>
            ))}
          </div>

          <Link href="/about" className="btn-dark mt-10">
            Подробнее о нас
          </Link>
        </div>
      </div>
    </section>
  );
}
