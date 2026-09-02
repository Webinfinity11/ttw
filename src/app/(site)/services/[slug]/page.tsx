import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import { CtaSection } from '@/components/site/cta-section';
import { PageHero } from '@/components/site/page-hero';
import { QuoteButton } from '@/components/site/quote-dialog';
import { ServiceCard } from '@/components/site/service-card';
import { Reveal } from '@/components/ui/reveal';
import { formatPrice } from '@/lib/cn';
import { getPages, getService, getServices, getSettings } from '@/lib/data/content';

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [service, services, settings, pages] = await Promise.all([
    getService(slug),
    getServices(),
    getSettings(),
    getPages(),
  ]);

  if (!service) notFound();

  const { intro, detail } = pages.services;

  const related = services
    .filter((item) => item.id !== service.id && item.category === service.category)
    .slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={service.category}
        title={service.title}
        description={service.description}
        breadcrumbs={[{ href: '/services', label: intro.breadcrumb }, { label: service.title }]}
      />

      <section className="bg-graphite-950 py-16 lg:py-24">
        <div className="container grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-none">
              <Image
                src={service.image}
                alt={service.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>

            <div className="mt-10 max-w-2xl space-y-5 text-[17px] leading-relaxed text-stone-200">
              <p>{service.description}</p>
              {service.details && <p>{service.details}</p>}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {service.features.map((feature) => (
                <div
                  key={feature}
                  className="rounded-none border border-graphite-700 bg-graphite-900 px-5 py-6"
                >
                  <Check className="h-5 w-5 text-stone-100" />
                  <p className="mt-4 text-sm font-medium leading-snug">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          <aside>
            <div className="sticky top-28 rounded-none border border-graphite-700 bg-graphite-900 p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-400">
                {detail.priceLabel}
              </p>
              <p className="mt-4 font-display text-5xl font-black tracking-tightest">
                {formatPrice(service.price)}
                <span className="ml-2 text-base tracking-normal text-stone-200">
                  / {service.unit}
                </span>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-stone-200">
                {detail.priceNote}
              </p>

              <QuoteButton service={service.title} className="btn-dark mt-8 w-full py-3.5">
                {detail.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </QuoteButton>

              <div className="mt-8 space-y-3 border-t border-graphite-700 pt-6 text-sm text-stone-200">
                <p>
                  {detail.phoneLabel}{' '}
                  <a
                    href={`tel:${settings.phone.replace(/\s/g, '')}`}
                    className="font-medium text-stone-100"
                  >
                    {settings.phone}
                  </a>
                </p>
                <p>{settings.workingHours}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-graphite-900 py-20">
          <div className="container">
            <div className="flex items-end justify-between gap-6">
              <h2 className="font-display text-3xl font-black tracking-tightest">
                {detail.relatedTitle}
              </h2>
              <Link href="/services" className="text-sm text-stone-100 transition hover:text-stone-100">
                {detail.relatedLinkLabel} →
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {related.map((item, index) => (
                <Reveal key={item.id} delay={index * 60}>
                  <ServiceCard service={item} className="h-full" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaSection settings={settings} />
    </>
  );
}
