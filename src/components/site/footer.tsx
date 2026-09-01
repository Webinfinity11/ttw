import Link from 'next/link';
import { Instagram, Mail, MessageCircle, Send } from 'lucide-react';
import type { Service, SiteSettings } from '@/lib/types';
import { LogoMark } from './logo';

export function Footer({ settings, services }: { settings: SiteSettings; services: Service[] }) {
  const year = new Date().getFullYear();

  const socials = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Send, href: `https://t.me/${settings.telegram.replace('@', '')}`, label: 'Telegram' },
    {
      icon: MessageCircle,
      href: `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`,
      label: 'WhatsApp',
    },
    { icon: Mail, href: `mailto:${settings.email}`, label: 'Email' },
  ];

  return (
    <footer className="bg-graphite-950 text-stone-300/70">
      <div className="container grid gap-14 py-20 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-14">
        <div>
          <div className="mb-6 flex items-center gap-3.5">
            <LogoMark className="h-9 w-9 text-accent-400" />
            <span className="display text-2xl text-white">{settings.companyName.split(' ')[0]}</span>
          </div>
          <p className="max-w-[38ch] text-[16px] leading-[1.8]">{settings.about}</p>
          <div className="mt-7 flex gap-2.5">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.07] text-stone-100 transition hover:bg-accent-500 hover:text-white"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-5 font-display text-[19px] font-extrabold text-white">Услуги</p>
          <div className="flex flex-col gap-3 text-[16px]">
            {services.slice(0, 6).map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="transition hover:text-accent-300"
              >
                {service.title}
              </Link>
            ))}
            <Link href="/services" className="text-accent-300 transition hover:text-accent-200">
              Все услуги →
            </Link>
          </div>
        </div>

        <div>
          <p className="mb-5 font-display text-[19px] font-extrabold text-white">Компания</p>
          <div className="flex flex-col gap-3 text-[16px]">
            {[
              { href: '/projects', label: 'Портфолио' },
              { href: '/prices', label: 'Цены' },
              { href: '/about', label: 'О нас' },
              { href: '/contacts', label: 'Контакты' },
              { href: '/admin', label: 'Админ-панель' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-accent-300">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-5 font-display text-[19px] font-extrabold text-white">Контакты</p>
          <div className="flex flex-col gap-3 text-[16px]">
            <a
              href={`tel:${settings.phone.replace(/\s/g, '')}`}
              className="transition hover:text-accent-300"
            >
              {settings.phone}
            </a>
            <a href={`mailto:${settings.email}`} className="transition hover:text-accent-300">
              {settings.email}
            </a>
            <span>{settings.address}</span>
            <span>{settings.workingHours}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-wrap justify-between gap-4 py-6 text-[15px]">
          <span>
            © {year} {settings.companyName}. Плиточные работы в {settings.city}.
          </span>
          <span>Демо-версия сайта. Изображения — placeholder.</span>
        </div>
      </div>
    </footer>
  );
}
