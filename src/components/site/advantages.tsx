import { Droplets, Gem, Ruler, ShieldCheck, Sparkles, Wallet } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';

const ITEMS = [
  {
    icon: Ruler,
    title: 'Плоскость до 2 мм',
    text: 'Перед укладкой выводим основание и проверяем правилом 2 м — крупный формат не прощает перепадов.',
  },
  {
    icon: Gem,
    title: 'Запил под 45°',
    text: 'Углы стыкуем «в ус» на станке с водяным охлаждением — без пластиковых уголков и сколов.',
  },
  {
    icon: Droplets,
    title: 'Гидроизоляция по технологии',
    text: 'Два слоя обмазочного состава, ленты в углах и манжеты на выходах труб. Мокрая зона остаётся сухой.',
  },
  {
    icon: Wallet,
    title: 'Фиксированная смета',
    text: 'Считаем объёмы на замере и фиксируем их в договоре. Цена не растёт по ходу работ.',
  },
  {
    icon: Sparkles,
    title: 'Чистая площадка',
    text: 'Пылеудаление при резке, защита проёмов и уборка в конце каждого рабочего дня.',
  },
  {
    icon: ShieldCheck,
    title: 'Гарантия 3 года',
    text: 'Отвечаем за укладку, гидроизоляцию и затирку. Возвращаемся, если что-то пошло не так.',
  },
];

export function Advantages() {
  return (
    <section className="bg-white py-24 lg:py-28">
      <div className="container">
        <div className="mb-14 max-w-2xl">
          <span className="eyebrow">Почему мы</span>
          <h2 className="display mt-4 text-4xl leading-[1.1] sm:text-5xl">
            Работа, к которой не хочется возвращаться
          </h2>
        </div>

        <div className="grid border-l border-t border-stone-200 md:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 60}
              className="group border-b border-r border-stone-200 p-9 transition-colors duration-300 hover:bg-stone-50 lg:p-10"
            >
              <span className="flex h-14 w-14 items-center justify-center bg-stone-100 text-accent-600 transition-colors duration-300 group-hover:bg-accent-500 group-hover:text-white">
                <item.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-7 font-display text-[21px] font-extrabold">{item.title}</h3>
              <p className="mt-3 text-[16px] leading-[1.7] text-graphite-500">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
