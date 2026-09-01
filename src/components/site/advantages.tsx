import { Reveal } from '@/components/ui/reveal';

const ITEMS: Array<[string, string, string]> = [
  ['01', 'ПЛОСКОСТЬ ДО 2 ММ', 'Выводим основание и проверяем правилом 2 м — крупный формат не прощает перепадов.'],
  ['02', 'ЗАПИЛ ПОД 45°', 'Углы стыкуем «в ус» на станке с водяным охлаждением, без пластиковых уголков.'],
  ['03', 'ГИДРОИЗОЛЯЦИЯ', 'Два слоя обмазочного состава, ленты в углах, манжеты на выходах труб.'],
  ['04', 'СМЕТА В ДОГОВОРЕ', 'Объёмы фиксируем до старта работ. Цена не растёт по ходу.'],
  ['05', 'ЧИСТАЯ ПЛОЩАДКА', 'Пылеудаление при резке, защита проёмов, уборка в конце дня.'],
  ['06', 'ГАРАНТИЯ 3 ГОДА', 'На укладку, гидроизоляцию и затирку — с выездом по обращению.'],
];

export function Advantages() {
  return (
    <section className="pt-28 lg:pt-36">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6 border-b border-graphite-700 pb-8">
          <h2 className="display text-[12vw] uppercase leading-[0.94] sm:text-[8vw] lg:text-[4.2rem]">
            Почему мы
          </h2>
          <p className="max-w-sm text-[14px] leading-[1.6] text-stone-200">
            Шесть принципов, из которых складывается результат — от подготовки основания до
            финальной герметизации.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map(([num, title, text], index) => (
            <Reveal
              key={num}
              delay={index * 50}
              className="border-b border-graphite-700 py-9 pr-8 lg:pl-8 lg:[&:nth-child(3n+1)]:pl-0"
            >
              <div className="flex items-baseline gap-4">
                <span className="text-[13px] tracking-[0.08em] text-stone-400">
                  {num}
                </span>
                <h3 className="text-[19px] font-medium text-stone-100">{title}</h3>
              </div>
              <p className="mt-3 max-w-[38ch] text-[15px] leading-[1.6] text-stone-200">{text}</p>

            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
