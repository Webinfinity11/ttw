'use client';

import { Plus, Trash2 } from 'lucide-react';
import type { Photo } from '@/lib/types';
import { cn } from '@/lib/cn';
import { PhotoField } from './photo-picker';
import { Field, IconButton, SortButtons } from './ui';

/* Перестановка элемента списка на соседнюю позицию. */
function moved<T>(items: T[], index: number, direction: -1 | 1): T[] {
  const target = index + direction;
  if (target < 0 || target >= items.length) return items;
  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

/** Блок страницы: заголовок, пояснение и поля внутри. */
export function Block({
  title,
  hint,
  children,
  className,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('rounded-2xl border border-graphite-100 bg-white p-6 lg:p-7', className)}>
      <div className="border-b border-graphite-100 pb-4">
        <h2 className="text-base font-semibold tracking-tight text-graphite-900">{title}</h2>
        {hint && <p className="mt-1 text-sm text-graphite-500">{hint}</p>}
      </div>
      <div className="space-y-5 pt-5">{children}</div>
    </section>
  );
}

export function TextRow({
  label,
  value,
  onChange,
  hint,
  placeholder,
}: {
  label: string;
  value: string;
  onChange(value: string): void;
  hint?: string;
  placeholder?: string;
}) {
  return (
    <Field label={label} hint={hint}>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="field-input"
      />
    </Field>
  );
}

export function AreaRow({
  label,
  value,
  onChange,
  hint,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange(value: string): void;
  hint?: string;
  rows?: number;
}) {
  return (
    <Field label={label} hint={hint}>
      <textarea
        value={value}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
        className="field-input resize-y"
      />
    </Field>
  );
}

/** Список простых строк — например, строки заголовка или подписи под ним. */
export function LineList({
  label,
  hint,
  items,
  onChange,
  addLabel = 'Добавить строку',
  placeholder,
}: {
  label: string;
  hint?: string;
  items: string[];
  onChange(next: string[]): void;
  addLabel?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <span className="field-label">{label}</span>
      {hint && <p className="mb-2 text-xs text-graphite-300">{hint}</p>}

      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <SortButtons
              onUp={() => onChange(moved(items, index, -1))}
              onDown={() => onChange(moved(items, index, 1))}
              disableUp={index === 0}
              disableDown={index === items.length - 1}
            />
            <input
              value={item}
              placeholder={placeholder}
              onChange={(event) => {
                const next = [...items];
                next[index] = event.target.value;
                onChange(next);
              }}
              className="field-input flex-1"
            />
            <IconButton
              icon={Trash2}
              label="Удалить"
              tone="danger"
              onClick={() => onChange(items.filter((_, i) => i !== index))}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onChange([...items, ''])}
        className="btn mt-3 border border-graphite-100 bg-white px-3.5 py-2 text-xs text-graphite-500 hover:border-graphite-300 hover:text-graphite-900"
      >
        <Plus className="h-3.5 w-3.5" /> {addLabel}
      </button>
    </div>
  );
}

/**
 * Список из двух полей на элемент — цифры с подписью, принципы, преимущества.
 * Поля описываются снаружи, поэтому один компонент годится для всех таких блоков.
 */
export function PairList<T extends { [K in keyof T]: string }>({
  label,
  hint,
  items,
  onChange,
  fields,
  blank,
  addLabel = 'Добавить пункт',
}: {
  label: string;
  hint?: string;
  items: T[];
  onChange(next: T[]): void;
  fields: Array<{ key: keyof T & string; label: string; multiline?: boolean }>;
  blank: T;
  addLabel?: string;
}) {
  function patch(index: number, key: string, value: string) {
    const next = [...items];
    next[index] = { ...next[index], [key]: value } as T;
    onChange(next);
  }

  return (
    <div>
      <span className="field-label">{label}</span>
      {hint && <p className="mb-2 text-xs text-graphite-300">{hint}</p>}

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-2 rounded-xl border border-graphite-100 bg-graphite-50/40 p-3"
          >
            <div className="pt-1">
              <SortButtons
                onUp={() => onChange(moved(items, index, -1))}
                onDown={() => onChange(moved(items, index, 1))}
                disableUp={index === 0}
                disableDown={index === items.length - 1}
              />
            </div>

            <div className="min-w-0 flex-1 space-y-2">
              {fields.map((field) =>
                field.multiline ? (
                  <textarea
                    key={field.key}
                    value={item[field.key]}
                    rows={2}
                    placeholder={field.label}
                    onChange={(event) => patch(index, field.key, event.target.value)}
                    className="field-input resize-y text-sm"
                  />
                ) : (
                  <input
                    key={field.key}
                    value={item[field.key]}
                    placeholder={field.label}
                    onChange={(event) => patch(index, field.key, event.target.value)}
                    className="field-input text-sm"
                  />
                ),
              )}
            </div>

            <IconButton
              icon={Trash2}
              label="Удалить"
              tone="danger"
              onClick={() => onChange(items.filter((_, i) => i !== index))}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onChange([...items, { ...blank }])}
        className="btn mt-3 border border-graphite-100 bg-white px-3.5 py-2 text-xs text-graphite-500 hover:border-graphite-300 hover:text-graphite-900"
      >
        <Plus className="h-3.5 w-3.5" /> {addLabel}
      </button>
    </div>
  );
}

/** Список фотографий с выбором кадра из библиотеки. */
export function PhotoList({
  label,
  hint,
  items,
  onChange,
  withAlt = true,
  addLabel = 'Добавить кадр',
}: {
  label: string;
  hint?: string;
  items: Photo[];
  onChange(next: Photo[]): void;
  withAlt?: boolean;
  addLabel?: string;
}) {
  return (
    <div>
      <span className="field-label">{label}</span>
      {hint && <p className="mb-2 text-xs text-graphite-300">{hint}</p>}

      <div className="space-y-3">
        {items.map((photo, index) => (
          <div
            key={index}
            className="flex items-start gap-2 rounded-xl border border-graphite-100 bg-graphite-50/40 p-3"
          >
            <div className="pt-1">
              <SortButtons
                onUp={() => onChange(moved(items, index, -1))}
                onDown={() => onChange(moved(items, index, 1))}
                disableUp={index === 0}
                disableDown={index === items.length - 1}
              />
            </div>

            <PhotoField
              src={photo.src}
              alt={photo.alt}
              withAlt={withAlt}
              className="min-w-0 flex-1"
              onChange={(next) => {
                const list = [...items];
                list[index] = next;
                onChange(list);
              }}
            />

            <IconButton
              icon={Trash2}
              label="Удалить"
              tone="danger"
              onClick={() => onChange(items.filter((_, i) => i !== index))}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onChange([...items, { src: '', alt: '' }])}
        className="btn mt-3 border border-graphite-100 bg-white px-3.5 py-2 text-xs text-graphite-500 hover:border-graphite-300 hover:text-graphite-900"
      >
        <Plus className="h-3.5 w-3.5" /> {addLabel}
      </button>
    </div>
  );
}
