'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { cn, formatPrice } from '@/lib/cn';
import { QuoteButton } from './quote-dialog';

/* ------------------------------- Справочники ------------------------------ */

const MATERIALS = [
  { id: 'porcelain', name: 'Керамогранит', src: '/tiles/porcelain.jpg', price: 80 },
  { id: 'marble', name: 'Мрамор', src: '/tiles/marble.jpg', price: 140 },
  { id: 'stone', name: 'Натуральный камень', src: '/tiles/terrazzo.jpg', price: 120 },
  { id: 'mosaic', name: 'Мозаика', src: '/tiles/mosaic.jpg', price: 120 },
] as const;

const FORMATS = [
  { id: '60x60', name: '60×60', w: 104, h: 104 },
  { id: '60x120', name: '60×120', w: 196, h: 98 },
  { id: '30x60', name: '30×60', w: 128, h: 64 },
  { id: '10x30', name: '10×30', w: 132, h: 44 },
] as const;

const PATTERNS = [
  { id: 'straight', name: 'Прямая', surcharge: 0 },
  { id: 'offset', name: 'Со смещением ½', surcharge: 10 },
  { id: 'herringbone', name: 'Ёлочка', surcharge: 30 },
  { id: 'diagonal', name: 'Диагональ', surcharge: 22 },
] as const;

const GROUTS = [
  { id: 'thin', name: '1.5 мм', gap: 3, color: '#D9DEDC' },
  { id: 'mid', name: '3 мм', gap: 6, color: '#C9D0CE' },
  { id: 'wide', name: '5 мм', gap: 10, color: '#AFB8B6' },
] as const;

type PatternId = (typeof PATTERNS)[number]['id'];

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Виртуальный холст, который затем обрезается контейнером. */
const CANVAS = { w: 1700, h: 700 };

/* ------------------------------- Раскладки -------------------------------- */

function buildLayout(pattern: PatternId, w: number, h: number, gap: number): Rect[] {
  const rects: Rect[] = [];

  if (pattern === 'herringbone') {
    // Ёлочка: пара «горизонтальная + вертикальная» плитка, размноженная
    // векторами (L+W, 0) и (−W, W). Для квадратного формата берём L = 2W.
    const L = w >= h * 1.6 ? w : w;
    const W = w >= h * 1.6 ? h : Math.round(w / 2);

    for (let a = -2; a < Math.ceil(CANVAS.h / W) + 4; a++) {
      for (let b = -2; b < Math.ceil(CANVAS.w / (L + W)) + 4; b++) {
        const x = b * (L + W) - a * W;
        const y = a * W;
        rects.push({ x, y, w: L, h: W });
        rects.push({ x: x + L, y, w: W, h: L });
      }
    }
    return rects;
  }

  const cols = Math.ceil(CANVAS.w / (w + gap)) + 2;
  const rows = Math.ceil(CANVAS.h / (h + gap)) + 2;

  for (let r = -1; r < rows; r++) {
    for (let c = -1; c < cols; c++) {
      const shift = pattern === 'offset' && Math.abs(r % 2) === 1 ? (w + gap) / 2 : 0;
      rects.push({ x: c * (w + gap) + shift, y: r * (h + gap), w, h });
    }
  }
  return rects;
}

/* -------------------------------- Компонент ------------------------------- */

export function LayoutLab() {
  const [material, setMaterial] = useState(0);
  const [format, setFormat] = useState(1);
  const [pattern, setPattern] = useState(0);
  const [grout, setGrout] = useState(0);

  const currentMaterial = MATERIALS[material];
  const currentFormat = FORMATS[format];
  const currentPattern = PATTERNS[pattern];
  const currentGrout = GROUTS[grout];

  const rects = useMemo(
    () =>
      buildLayout(currentPattern.id, currentFormat.w, currentFormat.h, currentGrout.gap),
    [currentPattern.id, currentFormat.w, currentFormat.h, currentGrout.gap],
  );

  const price = currentMaterial.price + currentPattern.surcharge;

  const isRotated = currentPattern.id === 'diagonal';

  function reset() {
    setMaterial(0);
    setFormat(1);
    setPattern(0);
    setGrout(0);
  }

  return (
    <section className="relative overflow-hidden bg-graphite-950 py-24 lg:py-28">
      <div className="absolute inset-0 tile-grid-lg opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(80%_120%_at_15%_20%,rgba(14,138,118,0.22),transparent_60%)]" />

      <div className="container relative">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow text-accent-300">Попробуйте сами</span>
            <h2 className="display mt-4 max-w-[16ch] text-4xl leading-[1.1] text-white sm:text-5xl">
              Живая раскладка плитки
            </h2>
            <p className="mt-5 max-w-xl text-[17px] leading-[1.7] text-stone-300/70">
              Выберите материал, формат, схему укладки и ширину шва — раскладка перестроится
              прямо на экране. Так вы увидите, как плитка ляжет в вашем помещении.
            </p>
          </div>

          <button
            onClick={reset}
            className="inline-flex items-center gap-2 self-start border border-white/20 px-5 py-3 text-sm text-stone-200 transition hover:border-accent-400 hover:text-accent-300"
          >
            <RotateCcw className="h-4 w-4" />
            Сбросить
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          {/* ------------------------------ Управление ------------------------------ */}
          <div className="space-y-7 border border-white/15 bg-white/[0.04] p-7 backdrop-blur-sm">
            <Control label="Материал">
              <div className="grid grid-cols-2 gap-2.5">
                {MATERIALS.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setMaterial(index)}
                    className={cn(
                      'group relative h-20 overflow-hidden border transition-all duration-200',
                      material === index
                        ? 'border-accent-400 ring-2 ring-accent-400/40'
                        : 'border-white/15 hover:border-white/40',
                    )}
                  >
                    <span
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${item.src})` }}
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-graphite-950/85 to-transparent" />
                    <span className="absolute inset-x-2 bottom-1.5 text-left text-[11px] font-medium leading-tight text-white">
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>
            </Control>

            <Control label="Формат, см">
              <Segmented
                items={FORMATS.map((item) => item.name)}
                active={format}
                onSelect={setFormat}
                columns={4}
              />
            </Control>

            <Control label="Схема укладки">
              <Segmented
                items={PATTERNS.map((item) => item.name)}
                active={pattern}
                onSelect={setPattern}
                columns={2}
              />
            </Control>

            <Control label="Ширина шва">
              <Segmented
                items={GROUTS.map((item) => item.name)}
                active={grout}
                onSelect={setGrout}
                columns={3}
              />
            </Control>

            <div className="border-t border-white/15 pt-6">
              <p className="text-[11px] uppercase tracking-[0.18em] text-stone-300/50">
                Ориентировочно
              </p>
              <p className="mt-2 display text-4xl text-white">
                от {formatPrice(price)}
                <span className="ml-2 text-base font-semibold tracking-normal text-accent-300">
                  / м²
                </span>
              </p>
              <p className="mt-2 text-xs leading-relaxed text-stone-300/50">
                {currentMaterial.name} · {currentFormat.name} · {currentPattern.name.toLowerCase()}
                {currentPattern.surcharge > 0 && ` (+${currentPattern.surcharge} ₾ за сложность)`}
              </p>

              <QuoteButton
                service={`Укладка: ${currentMaterial.name}, ${currentFormat.name}, ${currentPattern.name}`}
                className="btn-accent mt-6 w-full py-4"
              >
                Хочу такую раскладку
                <ArrowRight className="h-4 w-4" />
              </QuoteButton>
            </div>
          </div>

          {/* ------------------------------ Превью ---------------------------------- */}
          <div
            className="relative h-[460px] overflow-hidden border border-white/15 lg:h-[620px]"
            style={{ background: currentGrout.color }}
          >
            <div
              className={cn(
                'absolute left-1/2 top-1/2 transition-transform duration-500 ease-out',
                isRotated ? 'scale-[1.5]' : 'scale-100',
              )}
              style={{
                width: CANVAS.w,
                height: CANVAS.h,
                transform: `translate(-50%, -50%) rotate(${isRotated ? 45 : 0}deg)`,
              }}
            >
              {rects.map((rect, index) => (
                <span
                  key={`${currentPattern.id}-${currentFormat.id}-${index}`}
                  className="absolute bg-cover"
                  style={{
                    left: rect.x + currentGrout.gap / 2,
                    top: rect.y + currentGrout.gap / 2,
                    width: Math.max(rect.w - currentGrout.gap, 2),
                    height: Math.max(rect.h - currentGrout.gap, 2),
                    backgroundImage: `url(${currentMaterial.src})`,
                    // лёгкий сдвиг рисунка на каждой плитке — чтобы не было
                    // ощущения копипасты одной и той же фотографии
                    backgroundPosition: `${(index * 37) % 100}% ${(index * 61) % 100}%`,
                    backgroundSize: '180% 180%',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,.28), inset 0 -2px 4px rgba(0,0,0,.22)',
                  }}
                />
              ))}
            </div>

            {/* виньетка и подпись поверх раскладки */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_50%,transparent_45%,rgba(11,16,15,0.45))]" />
            <div className="pointer-events-none absolute bottom-5 left-5 bg-graphite-950/80 px-4 py-2.5 backdrop-blur">
              <p className="font-mono text-[11px] uppercase tracking-wide text-white">
                {currentPattern.name} · {currentFormat.name} · шов {currentGrout.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Мелкие детали ----------------------------- */

function Control({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-300/50">
        {label}
      </p>
      {children}
    </div>
  );
}

function Segmented({
  items,
  active,
  onSelect,
  columns,
}: {
  items: readonly string[];
  active: number;
  onSelect(index: number): void;
  columns: number;
}) {
  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {items.map((item, index) => (
        <button
          key={item}
          onClick={() => onSelect(index)}
          className={cn(
            'border px-3 py-2.5 text-[13px] transition-all duration-200',
            active === index
              ? 'border-accent-400 bg-accent-500/15 text-white'
              : 'border-white/15 text-stone-300/70 hover:border-white/40 hover:text-white',
          )}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
