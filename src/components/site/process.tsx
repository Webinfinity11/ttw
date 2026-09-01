import { Reveal } from '@/components/ui/reveal';

const STEPS: Array<[string, string, string, string]> = [
  ['01', 'СРОК: 1 ДЕНЬ', 'ЗАЯВКА И ЗАМЕР', 'Обсуждаем задачу, приезжаем на объект, проверяем геометрию и основание.'],
  ['02', 'СРОК: 1 ДЕНЬ', 'СМЕТА И ДОГОВОР', 'Считаем объёмы и материалы, фиксируем цену и сроки, согласуем раскладку.'],
  ['03', 'СРОК: 2–5 ДНЕЙ', 'ПОДГОТОВКА ОСНОВАНИЯ', 'Демонтаж, выравнивание, стяжка и гидроизоляция — этап, который решает всё.'],
  ['04', 'СРОК: 5–12 ДНЕЙ', 'УКЛАДКА И ЗАТИРКА', 'Кладём плитку, запиливаем углы, затираем швы и герметизируем примыкания.'],
  ['05', 'СРОК: 1 ДЕНЬ', 'СДАЧА ОБЪЕКТА', 'Финальная мойка, уборка, вывоз мусора и гарантия три года на работы.'],
];

export function Process() {
  return (
    <section className="pt-32 lg:pt-44">
      <h2 className="display text-center text-[15vw] leading-none sm:text-[10vw] lg:text-[4.8rem]">
        КАК РАБОТАЕМ
      </h2>

      <div className="mt-20 border-t border-graphite-700 lg:mt-24">
        {STEPS.map(([num, duration, title, text]) => (
          <Reveal
            key={num}
            className="grid min-h-[120px] items-center border-b border-graphite-700 px-5 py-7 lg:grid-cols-2 lg:px-10"
          >
            <div className="flex flex-col gap-3 lg:gap-8">
              <span className="meta">{duration}</span>
              <span className="meta">ЭТАП {num}</span>
            </div>
            <div className="mt-5 lg:mt-0">
              <div className="text-[22px] font-medium tracking-[0.01em] text-stone-300 lg:text-[28px]">
                {title}
              </div>
              <p className="mt-2 max-w-[460px] text-[14px] leading-[1.5] text-stone-200">{text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
