import Image from 'next/image';
import Link from 'next/link';
import type { AboutBlock } from '@/lib/types';
import { Reveal } from '@/components/ui/reveal';

/** Обе колонки одной высоты: кадр слева тянется на всю секцию, текст выровнен по краям. */
export function AboutSection({ content }: { content: AboutBlock }) {
  return (
    <section className="container pt-28 lg:pt-36">
      <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal className="relative min-h-[420px] overflow-hidden rounded-2xl bg-graphite-900 lg:min-h-full">
          <Image
            src={content.photo.src}
            alt={content.photo.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 48vw"
            className="object-cover"
          />
          <span className="absolute bottom-0 left-0 bg-graphite-950 px-7 py-5">
            <span className="display block text-[40px] leading-none">{content.badgeValue}</span>
            <span className="meta mt-1 block">{content.badgeLabel}</span>
          </span>
        </Reveal>

        <div className="flex flex-col justify-between">
          <div>
            <span className="meta">{content.eyebrow}</span>
            <h2 className="display mt-4 text-[10vw] uppercase leading-[0.95] sm:text-[7vw] lg:text-[3.2rem]">
              {content.title.map((line, index) => (
                <span key={index} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-6 max-w-lg text-[16px] leading-[1.75] text-stone-200">{content.text}</p>
          </div>

          <div className="mt-9 border-t border-graphite-700">
            {content.perks.map((perk, index) => (
              <div
                key={index}
                className="grid gap-1.5 border-b border-graphite-700 py-5 lg:grid-cols-[230px_1fr] lg:gap-8"
              >
                <span className="meta">{perk.title}</span>
                <p className="text-[15px] leading-[1.55] text-stone-200">{perk.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-end justify-between gap-8">
            <div className="flex gap-10">
              {content.facts.map((fact, index) => (
                <div key={index}>
                  <div className="display text-[34px] leading-none">{fact.value}</div>
                  <div className="meta mt-2">{fact.label.toUpperCase()}</div>
                </div>
              ))}
            </div>
            <Link href="/about" className="link-underline">
              <span>{content.linkLabel}</span>
              <span className="text-[22px] font-light">↘</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
