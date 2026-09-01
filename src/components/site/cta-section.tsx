import Image from 'next/image';
import type { SiteSettings } from '@/lib/types';
import { galleryPhoto } from '@/lib/images';
import { Reveal } from '@/components/ui/reveal';
import { QuoteButton } from './quote-dialog';

export function CtaSection({ settings }: { settings: SiteSettings }) {
  return (
    <section className="container pt-32 lg:pt-44">
      <Reveal className="relative overflow-hidden rounded-2xl">
        <div className="relative h-[420px] w-full lg:h-[460px]">
          <Image
            src={galleryPhoto('hero-bath-1.jpg')}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-graphite-950/72" />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <span className="meta">БЕСПЛАТНЫЙ ЗАМЕР ПО {settings.city.toUpperCase()}</span>
          <h2 className="display mt-6 max-w-[18ch] text-[9vw] leading-[0.98] sm:text-[6vw] lg:text-[3.6rem]">
            СМЕТА В ТЕЧЕНИЕ СУТОК
          </h2>
          <p className="mt-6 max-w-xl text-[16px] leading-[1.7] text-stone-200">
            Расскажите о помещении — подберём формат плитки, раскладку и способ подготовки
            основания.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <QuoteButton className="btn-light">Рассчитать смету</QuoteButton>
            <a
              href={`tel:${settings.phone.replace(/\s/g, '')}`}
              className="btn-outline-light"
            >
              {settings.phone}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
