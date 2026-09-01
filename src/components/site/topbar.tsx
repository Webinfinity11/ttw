import Link from 'next/link';
import { Clock, Instagram, Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import type { SiteSettings } from '@/lib/types';

/** Верхняя служебная полоса: соцсети, разделы, адрес и режим работы. */
export function TopBar({ settings }: { settings: SiteSettings }) {
  return (
    <div className="hidden bg-graphite-950 text-[13px] text-stone-300/70 lg:block">
      <div className="container flex h-14 items-center justify-between gap-6">
        <div className="flex items-center gap-7">
          <div className="flex gap-2">
            {[
              { icon: Instagram, href: '#', label: 'Instagram' },
              { icon: Send, href: `https://t.me/${settings.telegram.replace('@', '')}`, label: 'Telegram' },
              {
                icon: MessageCircle,
                href: `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`,
                label: 'WhatsApp',
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.07] text-stone-200 transition hover:bg-accent-500 hover:text-white"
              >
                <item.icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
          <div className="flex gap-6">
            <Link href="/projects" className="transition hover:text-accent-300">
              Портфолио
            </Link>
            <Link href="/prices" className="transition hover:text-accent-300">
              Прайс
            </Link>
            <Link href="/about" className="transition hover:text-accent-300">
              О нас
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <span className="flex items-center gap-2.5">
            <MapPin className="h-4 w-4 text-accent-400" />
            {settings.address}
          </span>
          <a href={`mailto:${settings.email}`} className="flex items-center gap-2.5 transition hover:text-accent-300">
            <Mail className="h-4 w-4 text-accent-400" />
            {settings.email}
          </a>
          <span className="flex items-center gap-2.5">
            <Clock className="h-4 w-4 text-accent-400" />
            {settings.workingHours}
          </span>
        </div>
      </div>
    </div>
  );
}
