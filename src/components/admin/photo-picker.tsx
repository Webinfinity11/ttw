'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ImageOff, Replace } from 'lucide-react';
import { cn } from '@/lib/cn';
import { PHOTO_LIBRARY } from '@/lib/photo-library';
import { Modal, SearchInput } from './ui';

/** Имя файла без папки и расширения — по нему идёт поиск в библиотеке. */
function fileName(src: string): string {
  return src.split('/').pop()?.replace(/\.\w+$/, '') ?? src;
}

function PickerModal({
  open,
  current,
  onClose,
  onSelect,
}: {
  open: boolean;
  current?: string;
  onClose(): void;
  onSelect(src: string): void;
}) {
  const [query, setQuery] = useState('');

  const found = PHOTO_LIBRARY.filter((src) =>
    fileName(src).toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="lg"
      title="Выбрать фотографию"
      description={`${PHOTO_LIBRARY.length} снимков из папок /gallery и /tiles`}
    >
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Поиск по имени файла: bath, marble, work…"
        className="mb-5"
      />

      {found.length === 0 ? (
        <p className="py-10 text-center text-sm text-graphite-500">
          Ничего не найдено. Попробуйте другое слово.
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
          {found.map((src) => (
            <button
              key={src}
              onClick={() => {
                onSelect(src);
                onClose();
              }}
              title={src}
              className={cn(
                'group relative aspect-square overflow-hidden rounded-xl border-2 transition',
                src === current
                  ? 'border-graphite-900'
                  : 'border-transparent hover:border-graphite-300',
              )}
            >
              <Image src={src} alt={fileName(src)} fill sizes="120px" className="object-cover" />
              <span className="absolute inset-x-0 bottom-0 truncate bg-graphite-950/70 px-1.5 py-1 text-[10px] text-white">
                {fileName(src)}
              </span>
            </button>
          ))}
        </div>
      )}
    </Modal>
  );
}

/**
 * Поле выбора фотографии: превью, подпись и кнопка замены.
 *
 * Подпись (alt) — это текст, который читают поисковики и программы для
 * незрячих; для чисто декоративных кадров её можно оставить пустой.
 */
export function PhotoField({
  src,
  alt,
  onChange,
  withAlt = true,
  className,
}: {
  src: string;
  alt: string;
  onChange(next: { src: string; alt: string }): void;
  withAlt?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn('flex gap-4', className)}>
      <button
        onClick={() => setOpen(true)}
        className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl border border-graphite-100 bg-graphite-50 transition hover:border-graphite-300"
      >
        {src ? (
          <Image src={src} alt={alt} fill sizes="128px" className="object-cover" />
        ) : (
          <ImageOff className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-graphite-300" />
        )}
      </button>

      <div className="min-w-0 flex-1 space-y-2">
        <button
          onClick={() => setOpen(true)}
          className="btn border border-graphite-100 bg-white px-3.5 py-2 text-xs text-graphite-500 hover:border-graphite-300 hover:text-graphite-900"
        >
          <Replace className="h-3.5 w-3.5" /> Заменить кадр
        </button>
        <p className="truncate text-xs text-graphite-300">{src || 'кадр не выбран'}</p>
        {withAlt && (
          <input
            value={alt}
            onChange={(event) => onChange({ src, alt: event.target.value })}
            placeholder="Описание кадра"
            className="field-input py-2 text-xs"
          />
        )}
      </div>

      <PickerModal
        open={open}
        current={src}
        onClose={() => setOpen(false)}
        onSelect={(next) => onChange({ src: next, alt })}
      />
    </div>
  );
}
