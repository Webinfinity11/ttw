import Image from 'next/image';
import type { SiteSettings } from '@/lib/types';
import { Reveal } from '@/components/ui/reveal';
import { QuoteButton } from './quote-dialog';

export function CtaSection({ settings }: { settings: SiteSettings }) {
  return (
    <section className="relative overflow-hidden bg-graphite-950">
      <Image
        src="/tiles/hero-marble.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-45 [object-position:50%_70%]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-graphite-950 via-graphite-950/90 to-graphite-950/70" />
      <div className="absolute inset-0 tile-grid-lg" />
      <div className="absolute inset-0 bg-[radial-gradient(90%_120%_at_85%_50%,rgba(14,138,118,0.3),transparent_60%)]" />

      <Reveal className="container relative flex flex-wrap items-center justify-between gap-12 py-20 lg:py-24">
        <div>
          <h2 className="display max-w-[22ch] text-3xl leading-[1.12] text-white sm:text-[2.9rem]">
            Бесплатный замер и смета в течение суток
          </h2>
          <p className="mt-4 text-lg text-stone-300/75">
            Выезд по {settings.city} и пригороду. Ответим в WhatsApp, Telegram или по телефону.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <a
            href={`tel:${settings.phone.replace(/\s/g, '')}`}
            className="display text-3xl text-white transition-colors hover:text-accent-300"
          >
            {settings.phone}
          </a>
          <QuoteButton className="btn-accent px-11 py-5">Заказать звонок</QuoteButton>
        </div>
      </Reveal>
    </section>
  );
}
