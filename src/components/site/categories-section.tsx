import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import { Reveal } from '@/components/ui/reveal';

/** Облако категорий: размер и яркость слова зависят от того, сколько у нас работ. */
const CLOUD: Array<{ label?: string; size?: string; tone?: string; star?: boolean }> = [
  { label: 'Террасы', size: 'text-[13px] tracking-[0.08em]', tone: 'text-stone-400' },
  { label: 'Лестницы', size: 'text-[14px] tracking-[0.08em]', tone: 'text-stone-300' },
  { label: 'Фартук', size: 'text-[17px] tracking-[0.04em]', tone: 'text-graphite-500' },
  { star: true },
  { label: 'Мозаика', size: 'text-[26px] font-medium', tone: 'text-stone-100' },
  { star: true },
  { star: true },
  { label: 'Кабанчик', size: 'text-[26px] font-medium', tone: 'text-stone-100' },
  { star: true },
  { label: 'Ванные под ключ', size: 'text-[26px] font-medium', tone: 'text-stone-100' },
  { star: true },
  { label: 'Керамогранит', size: 'text-[26px] font-medium', tone: 'text-stone-100' },
  { star: true },
  { star: true },
  { label: 'XXL 160×320', size: 'text-[26px] font-medium', tone: 'text-stone-100' },
  { star: true },
  { label: 'Ступени', size: 'text-[20px]', tone: 'text-graphite-500' },
  { label: 'Гидроизоляция', size: 'text-[14px] tracking-[0.06em]', tone: 'text-stone-300' },
  { label: 'Затирка', size: 'text-[13px] tracking-[0.08em]', tone: 'text-stone-400' },
];

export function CategoriesSection({ projects }: { projects: Project[] }) {
  const [first, second, third] = projects;

  return (
    <section className="pt-32 lg:pt-44">
      <h2 className="display text-center text-[15vw] leading-none sm:text-[10vw] lg:text-[4.8rem]">
        КАТЕГОРИИ
      </h2>

      <Reveal className="container mt-11">
        <div className="mx-auto max-w-[760px] border-x border-graphite-500 px-7 py-1.5">
          <div className="flex flex-wrap items-center justify-center gap-x-[18px] gap-y-3.5 leading-none">
            {CLOUD.map((item, index) =>
              item.star ? (
                <span key={`star-${index}`} className="text-[20px] text-stone-100">
                  ✳
                </span>
              ) : (
                <span key={item.label} className={`${item.size} ${item.tone}`}>
                  {item.label?.toUpperCase()}
                </span>
              ),
            )}
          </div>
        </div>
      </Reveal>

      {/* Три кадра с проектами и ссылка поверх */}
      <div className="container relative mt-14">
        <div className="grid h-[250px] grid-cols-2 gap-0 lg:h-[250px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,1fr)]">
          {[first, second].map((project, index) =>
            project ? (
              <Link key={project.id} href={`/projects/${project.slug}`} className="group relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </Link>
            ) : (
              <div key={`empty-${index}`} />
            ),
          )}

          <div className="hidden lg:block" />

          {third && (
            <Link
              href={`/projects/${third.slug}`}
              className="group relative col-span-2 hidden lg:col-span-1 lg:block"
            >
              <Image
                src={third.image}
                alt={third.title}
                fill
                sizes="25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </Link>
          )}
        </div>

        <Link
          href="/projects"
          className="link-underline absolute bottom-5 left-1/2 -translate-x-[42%] bg-graphite-950/70 px-3 py-1  lg:bg-transparent lg:px-0 lg:py-0 lg:0"
        >
          <span>СМОТРЕТЬ ВСЕ ПРОЕКТЫ</span>
          <span className="text-[22px] font-light">↘</span>
        </Link>
      </div>

      {/* Подпись под лентой */}
      <div className="container mt-8">
        <p className="max-w-2xl text-[15px] leading-[1.6] text-stone-200">
          Ванные, кухни, крупный формат, мозаика, террасы и лестницы — каждый объект с описанием
          материалов, площади и срока работ.
        </p>
      </div>
    </section>
  );
}
