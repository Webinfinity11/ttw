import type { Metadata } from 'next';
import { ContactForm } from '@/components/site/contact-form';
import { MapBlock } from '@/components/site/map-block';
import { PageHero } from '@/components/site/page-hero';
import { Reveal } from '@/components/ui/reveal';
import { getServices, getSettings } from '@/lib/data/content';

export const metadata: Metadata = {
  title: 'Контакт — плиточные работы в Тбилиси',
};

export default async function ContactsPage() {
  const [settings, services] = await Promise.all([getSettings(), getServices()]);

  const channels = [
    {
      label: 'ТЕЛЕФОН',
      value: settings.phone,
      href: `tel:${settings.phone.replace(/\s/g, '')}`,
      note: 'Звонок и SMS',
    },
    {
      label: 'WHATSAPP',
      value: settings.whatsapp,
      href: `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`,
      note: 'Ответим в течение часа',
    },
    {
      label: 'TELEGRAM',
      value: settings.telegram,
      href: `https://t.me/${settings.telegram.replace('@', '')}`,
      note: 'Можно прислать фото объекта',
    },
    {
      label: 'EMAIL',
      value: settings.email,
      href: `mailto:${settings.email}`,
      note: 'Для смет и документов',
    },
  ];

  const facts: Array<[string, string]> = [
    ['ГОРОД', settings.city],
    ['АДРЕС', settings.address],
    ['ЧАСЫ РАБОТЫ', settings.workingHours],
    ['ЗАМЕР', 'Бесплатно по городу и пригороду'],
  ];

  return (
    <>
      <PageHero
        eyebrow="Связаться"
        title="Контакт"
        description={`Работаем по всему городу ${settings.city} и в пригороде. Замер бесплатный, смета — в течение суток.`}
        breadcrumbs={[{ label: 'Контакт' }]}
      />

      {/* Каналы связи крупными строками */}
      <section className="container pt-14 lg:pt-16">
        <div className="border-t border-graphite-700">
          {channels.map((channel, index) => (
            <Reveal key={channel.label} delay={index * 50}>
              <a
                href={channel.href}
                className="group grid items-center gap-2 border-b border-graphite-700 py-7 transition-colors lg:grid-cols-[200px_1fr_auto] lg:gap-8 lg:px-4"
              >
                <span className="meta">{channel.label}</span>
                <span className="display text-[26px] leading-none sm:text-[32px]">
                  {channel.value}
                </span>
                <span className="flex items-center gap-6">
                  <span className="hidden text-[14px] text-stone-200 lg:block">{channel.note}</span>
                  <span className="text-[30px] font-light leading-none text-stone-300 transition-transform duration-300">
                    ›
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Реквизиты и форма */}
      <section className="container grid gap-12 pt-16 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:pt-20">
        <div>
          <h2 className="display text-[10vw] uppercase leading-[0.95] sm:text-[7vw] lg:text-[3rem]">
            Как нас найти
          </h2>

          <div className="mt-9 border-t border-graphite-700">
            {facts.map(([label, value]) => (
              <div
                key={label}
                className="grid gap-1.5 border-b border-graphite-700 py-5 lg:grid-cols-[180px_1fr] lg:gap-8"
              >
                <span className="meta">{label}</span>
                <span className="text-[16px] text-stone-100">{value}</span>
              </div>
            ))}
          </div>

          <Reveal className="mt-10">
            <MapBlock address={settings.address} city={settings.city} />
          </Reveal>
        </div>

        <ContactForm services={services.map((service) => service.title)} />
      </section>
    </>
  );
}
