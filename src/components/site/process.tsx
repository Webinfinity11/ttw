import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

const STEPS = [
  {
    step: '01',
    title: 'Заявка и консультация',
    text: 'Обсуждаем задачу по телефону или в мессенджере, даём ориентир по цене и срокам.',
  },
  {
    step: '02',
    title: 'Замер и смета',
    text: 'Приезжаем на объект, проверяем геометрию и основание, считаем объёмы и материалы.',
  },
  {
    step: '03',
    title: 'Договор и раскладка',
    text: 'Фиксируем цену и сроки, согласовываем раскладку плитки и точки начала укладки.',
  },
  {
    step: '04',
    title: 'Подготовка основания',
    text: 'Демонтаж, выравнивание, стяжка и гидроизоляция — этап, который определяет результат.',
  },
  {
    step: '05',
    title: 'Укладка и затирка',
    text: 'Кладём плитку, запиливаем углы, затираем швы и герметизируем примыкания.',
  },
  {
    step: '06',
    title: 'Сдача объекта',
    text: 'Финальная мойка, уборка, вывоз мусора и гарантия 3 года на выполненные работы.',
  },
];

export function Process() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Как работаем"
          title="Шесть шагов от заявки до сдачи"
          description="Каждый этап заканчивается приёмкой: вы всегда понимаете, что сделано и что дальше."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-none border border-stone-200 bg-stone-200 md:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((item, index) => (
            <Reveal
              key={item.step}
              delay={index * 60}
              className="group relative bg-white p-8 transition-colors hover:bg-stone-50 lg:p-10"
            >
              <span className="font-display text-5xl font-black tracking-tightest text-stone-300 transition-colors duration-300 group-hover:text-accent-400">
                {item.step}
              </span>
              <h3 className="mt-6 text-lg font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-graphite-500">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
