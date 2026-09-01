const STATS = [
  { value: '12', suffix: 'лет', label: 'опыта работы с плиткой' },
  { value: '480+', suffix: '', label: 'объектов сдано' },
  { value: '3', suffix: 'года', label: 'гарантии на работы' },
  { value: '160×320', suffix: 'см', label: 'максимальный формат плит' },
];

/** Полоса показателей — продолжение тёмной секции с каруселью. */
export function HeroStats() {
  return (
    <section className="border-b border-white/10 bg-graphite-950">
      <div className="container grid divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-white/10">
        {STATS.map((stat) => (
          <div key={stat.label} className="px-2 py-9 lg:px-8">
            <p className="display text-4xl text-white">
              {stat.value}
              {stat.suffix && (
                <span className="ml-2 text-base font-semibold tracking-normal text-accent-400">
                  {stat.suffix}
                </span>
              )}
            </p>
            <p className="mt-2 text-[15px] text-stone-200/60">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
