import { Reveal } from '@/components/ui/reveal';

const STEPS: Array<[string, string, string, string]> = [
  ['01', '1 день', 'Заявка и замер', 'Обсуждаем задачу, приезжаем на объект, проверяем геометрию и основание.'],
  ['02', '1 день', 'Смета и договор', 'Считаем объёмы и материалы, фиксируем цену и сроки, согласуем раскладку.'],
  ['03', '2–5 дней', 'Подготовка основания', 'Демонтаж, выравнивание, стяжка и гидроизоляция — этап, который решает всё.'],
  ['04', '5–12 дней', 'Укладка и затирка', 'Кладём плитку, запиливаем углы, затираем швы и герметизируем примыкания.'],
  ['05', '1 день', 'Сдача объекта', 'Финальная мойка, уборка, вывоз мусора и гарантия три года на работы.'],
];

/** Этапы работы компактной лентой: пять колонок вместо длинных строк. */
export function Process() {
  return (
    <section className="pt-28 lg:pt-36">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5 border-b border-graphite-700 pb-7">
          <h2 className="display text-[11vw] uppercase leading-[0.94] sm:text-[7vw] lg:text-[3.4rem]">
            Как работаем
          </h2>
          <p className="max-w-sm text-[14px] leading-[1.6] text-stone-200">
            Каждый этап заканчивается приёмкой — вы всегда понимаете, что сделано и что дальше.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map(([num, duration, title, text], index) => (
            <Reveal
              key={num}
              delay={index * 50}
              className="border-b border-graphite-700 py-7 pr-6 lg:border-b-0 lg:pl-6 lg:[&:first-child]:pl-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-graphite-700"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="display text-[22px] leading-none text-stone-400">{num}</span>
                <span className="text-[12px] uppercase tracking-[0.08em] text-stone-400">
                  {duration}
                </span>
              </div>
              <h3 className="mt-5 text-[17px] font-medium leading-snug text-stone-100">{title}</h3>
              <p className="mt-2.5 text-[14px] leading-[1.55] text-stone-200">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
