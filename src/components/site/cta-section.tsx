import Image from 'next/image';
import type { SiteSettings } from '@/lib/types';
import { galleryPhoto } from '@/lib/images';
import { Reveal } from '@/components/ui/reveal';
import { QuoteButton } from './quote-dialog';

/**
 * Блок поверх фотографии.
 * Цвета здесь намеренно фиксированные (чёрная заливка + белый текст),
 * а не токены темы: над кадром текст должен читаться и в тёмной, и в светлой.
 */
export function CtaSection({ settings }: { settings: SiteSettings }) {
  return (
    <section className="container pt-32 lg:pt-44">
      <Reveal className="relative overflow-hidden rounded-2xl">
        <div className="relative h-[440px] w-full lg:h-[480px]">
          <Image
            src={galleryPhoto('hero-bath-1.jpg')}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          {/* Плотное затемнение и виньетка — текст читается на любом кадре */}
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_50%,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.75)_100%)]" />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <span className="text-[13px] uppercase tracking-[0.18em] text-white/70">
            Бесплатный замер по {settings.city}
          </span>

          <h2 className="display mt-5 max-w-[18ch] text-[9vw] leading-[0.98] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.6)] sm:text-[6vw] lg:text-[3.6rem]">
            СМЕТА В ТЕЧЕНИЕ СУТОК
          </h2>

          <p className="mt-6 max-w-xl text-[16px] leading-[1.7] text-white/80">
            Расскажите о помещении — подберём формат плитки, раскладку и способ подготовки
            основания.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <QuoteButton className="btn bg-white px-9 py-4 text-[14px] font-medium text-black hover:bg-white/85">
              Рассчитать смету
            </QuoteButton>
            <a
              href={`tel:${settings.phone.replace(/\s/g, '')}`}
              className="btn border border-white/45 px-9 py-4 text-[14px] font-medium text-white hover:border-white hover:bg-white/10"
            >
              {settings.phone}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
