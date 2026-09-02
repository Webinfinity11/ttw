import type { Metadata } from 'next';
import Image from 'next/image';
import { CtaSection } from '@/components/site/cta-section';
import { PageHero } from '@/components/site/page-hero';
import { Process } from '@/components/site/process';
import { Reveal } from '@/components/ui/reveal';
import { getPages, getSettings } from '@/lib/data/content';

export async function generateMetadata(): Promise<Metadata> {
  const pages = await getPages();
  return { title: pages.about.intro.metaTitle };
}

export default async function AboutPage() {
  const [settings, pages] = await Promise.all([getSettings(), getPages()]);

  const { intro, story, values, process } = pages.about;

  return (
    <>
      <PageHero
        eyebrow={intro.eyebrow}
        title={intro.title}
        description={intro.description}
        breadcrumbs={[{ label: intro.breadcrumb }]}
      />

      {/* История: кадр и текст одной высоты */}
      <section className="container pt-14 lg:pt-16">
        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal className="relative min-h-[380px] overflow-hidden rounded-2xl bg-graphite-900 lg:min-h-full">
            <Image
              src={story.photo.src}
              alt={story.photo.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
            />
          </Reveal>

          <div className="flex flex-col justify-between">
            <div>
              <span className="meta">{story.eyebrow}</span>
              <h2 className="display mt-4 text-[9vw] uppercase leading-[0.98] sm:text-[6vw] lg:text-[2.8rem]">
                {story.title}
              </h2>
              <div className="mt-6 space-y-4 text-[16px] leading-[1.75] text-stone-200">
                {story.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-graphite-700 pt-7 sm:grid-cols-4">
              {story.facts.map((fact, index) => (
                <div key={index}>
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
            {values.title}
          </h2>
          <p className="max-w-sm text-[14px] leading-[1.6] text-stone-200">{values.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3">
          {values.items.map((item, index) => (
            <Reveal
              key={index}
              delay={index * 60}
              className="border-b border-graphite-700 py-8 pr-6 md:pl-8 md:[&:first-child]:pl-0 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-graphite-700 md:[&:not(:first-child)]:border-b-graphite-700"
            >
              <span className="text-[13px] tracking-[0.08em] text-stone-400">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-[18px] font-medium text-stone-100">{item.title}</h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-stone-200">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Process content={process} />
      <CtaSection settings={settings} />
    </>
  );
}
