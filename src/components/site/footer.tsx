import Link from 'next/link';
import type { Service, SiteSettings } from '@/lib/types';

export function Footer({ settings, services }: { settings: SiteSettings; services: Service[] }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-32 border-t border-graphite-700 lg:mt-44">
      {/* Крупная подпись во всю ширину */}
      <div className="container overflow-hidden border-b border-graphite-700 py-10">
        <p className="display whitespace-nowrap text-[13vw] uppercase leading-[0.9] text-stone-100 lg:text-[8.5vw]">
          {settings.companyName} · Плитка
        </p>
      </div>

      <div className="container grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <p className="display text-[26px] leading-none">{settings.companyName.toUpperCase()}</p>
          <p className="mt-5 max-w-[38ch] text-[15px] leading-[1.7] text-stone-200">
            {settings.about}
          </p>
        </div>

        <div>
          <p className="meta">УСЛУГИ</p>
          <div className="mt-5 flex flex-col gap-3 text-[15px] text-stone-200">
            {services.slice(0, 6).map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="transition-colors hover:text-stone-400"
              >
                {service.title}
              </Link>
            ))}
            <Link href="/services" className="text-stone-100 underline underline-offset-4">
              Все услуги
            </Link>
          </div>
        </div>

        <div>
          <p className="meta">КОМПАНИЯ</p>
          <div className="mt-5 flex flex-col gap-3 text-[15px] text-stone-200">
            {[
              { href: '/projects', label: 'Проекты' },
              { href: '/prices', label: 'Цены' },
              { href: '/about', label: 'О нас' },
              { href: '/contacts', label: 'Контакты' },
              { href: '/admin', label: 'Админ-панель' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-stone-400">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="meta">КОНТАКТЫ</p>
          <div className="mt-5 flex flex-col gap-3 text-[15px] text-stone-200">
            <a
              href={`tel:${settings.phone.replace(/\s/g, '')}`}
              className="text-[20px] text-stone-100 transition-colors hover:text-stone-400"
            >
              {settings.phone}
            </a>
            <a href={`mailto:${settings.email}`} className="transition-colors hover:text-stone-400">
              {settings.email}
            </a>
            <a
              href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`}
              className="transition-colors hover:text-stone-400"
            >
              WhatsApp
            </a>
            <a
              href={`https://t.me/${settings.telegram.replace('@', '')}`}
              className="transition-colors hover:text-stone-400"
            >
              Telegram {settings.telegram}
            </a>
            <span>{settings.address}</span>
            <span>{settings.workingHours}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-graphite-700">
        <div className="container flex flex-wrap justify-between gap-4 py-6 text-[13px] uppercase tracking-[0.06em] text-stone-400">
          <span>
            © {year} {settings.companyName} · Плиточные работы в {settings.city}
          </span>
          <span>Демо-версия сайта</span>
        </div>
      </div>
    </footer>
  );
}
