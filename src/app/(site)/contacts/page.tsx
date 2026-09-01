import type { Metadata } from 'next';
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { ContactForm } from '@/components/site/contact-form';
import { PageHero } from '@/components/site/page-hero';
import { Reveal } from '@/components/ui/reveal';
import { getServices, getSettings } from '@/lib/data/content';

export const metadata: Metadata = {
  title: 'Контакты — плиточные работы в Тбилиси',
};

export default async function ContactsPage() {
  const [settings, services] = await Promise.all([getSettings(), getServices()]);

  const channels = [
    {
      icon: Phone,
      label: 'Телефон',
      value: settings.phone,
      href: `tel:${settings.phone.replace(/\s/g, '')}`,
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: settings.whatsapp,
      href: `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`,
    },
    {
      icon: Send,
      label: 'Telegram',
      value: settings.telegram,
      href: `https://t.me/${settings.telegram.replace('@', '')}`,
    },
    {
      icon: Mail,
      label: 'Email',
      value: settings.email,
      href: `mailto:${settings.email}`,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Контакты"
        title="Свяжитесь с нами"
        description={`Работаем по всему городу ${settings.city} и в пригороде. Замер — бесплатно.`}
        breadcrumbs={[{ label: 'Контакты' }]}
      />

      <section className="bg-stone-50 py-16 lg:py-24">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <div className="grid gap-px overflow-hidden rounded-none border border-stone-200 bg-stone-200 sm:grid-cols-2">
              {channels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  className="group bg-white p-7 transition-colors hover:bg-white/60"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-none bg-stone-100 text-accent-600 transition-colors group-hover:bg-accent-500 group-hover:text-white">
                    <channel.icon className="h-5 w-5" />
                  </span>
                  <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-graphite-300">
                    {channel.label}
                  </p>
                  <p className="mt-2 text-[15px] font-medium text-graphite-900">{channel.value}</p>
                </a>
              ))}
            </div>

            <div className="mt-6 rounded-none border border-stone-200 bg-white p-8">
              <div className="flex items-start gap-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-graphite-300">
                    Адрес
                  </p>
                  <p className="mt-2 text-[15px]">{settings.address}</p>
                </div>
              </div>
              <div className="mt-6 flex items-start gap-4 border-t border-stone-200 pt-6">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-graphite-300">
                    Часы работы
                  </p>
                  <p className="mt-2 text-[15px]">{settings.workingHours}</p>
                </div>
              </div>
            </div>

            <Reveal className="mt-6 overflow-hidden rounded-none border border-stone-200">
              <div className="relative flex h-64 items-center justify-center bg-stone-200">
                <div className="absolute inset-0 grid-lines opacity-60" />
                <div className="relative text-center">
                  <MapPin className="mx-auto h-8 w-8 text-accent-500" />
                  <p className="mt-3 text-sm text-graphite-500">
                    Здесь будет карта {settings.city}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <ContactForm services={services.map((service) => service.title)} />
        </div>
      </section>
    </>
  );
}
