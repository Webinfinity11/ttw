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
    <section className="pt-32 lg:pt-44">
      <h2 className="display text-center text-[15vw] leading-none sm:text-[10vw] lg:text-[4.8rem]">
        ПОЧЕМУ МЫ
      </h2>

      <div className="container mt-16 grid border-t border-graphite-700 md:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map(([num, title, text], index) => (
          <Reveal
            key={num}
            delay={index * 50}
            className="border-b border-graphite-700 px-0 py-9 md:px-8 md:first:pl-0 lg:border-r lg:[&:nth-child(3n)]:border-r-0"
          >
            <span className="meta">{num}</span>
            <h3 className="mt-4 text-[20px] font-medium text-stone-100">{title}</h3>
            <p className="mt-3 text-[15px] leading-[1.6] text-stone-200">{text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
