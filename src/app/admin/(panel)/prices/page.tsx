'use client';

import { useMemo, useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useAdminData } from '@/components/admin/data-provider';
import { useToast } from '@/components/admin/toast';
import {
  AdminPageHeader,
  Badge,
  Card,
  ConfirmDialog,
  EmptyState,
  Field,
  IconButton,
  Modal,
  SearchInput,
  SortButtons,
  Toggle,
} from '@/components/admin/ui';
import { formatPrice } from '@/lib/cn';
import type { PriceItem } from '@/lib/types';

const UNITS = ['м²', 'п.м.', 'шт.', 'объект', 'мешок', 'час'];
const CATEGORIES = ['Укладка', 'Подготовка', 'Гидроизоляция', 'Обработка', 'Демонтаж', 'Под ключ'];

const EMPTY: Omit<PriceItem, 'id'> = {
  title: '',
  price: 0,
  unit: 'м²',
  category: 'Укладка',
  note: '',
  published: true,
  order: 999,
};

export default function AdminPricesPage() {
  const { prices, crud } = useAdminData();
  const { notify } = useToast();

  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState<PriceItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<PriceItem | null>(null);

  const sorted = useMemo(() => [...prices].sort((a, b) => a.order - b.order), [prices]);
  const filtered = useMemo(
    () => sorted.filter((item) => item.title.toLowerCase().includes(query.toLowerCase())),
    [sorted, query],
  );

  async function handleSubmit(values: Omit<PriceItem, 'id'>) {
    if (editing) {
      await crud.prices.update(editing.id, values);
      notify('Позиция обновлена');
    } else {
      await crud.prices.create({ ...values, order: prices.length + 1 });
      notify('Позиция добавлена');
    }
    setEditing(null);
    setCreating(false);
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Цены"
        description={`${prices.length} позиций · ${prices.filter((p) => p.published).length} показывается на сайте`}
        action={
          <button onClick={() => setCreating(true)} className="btn-dark px-5 py-2.5">
            <Plus className="h-4 w-4" /> Добавить позицию
          </button>
        }
      />

      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Поиск по названию услуги"
        className="lg:w-80"
      />

      <Card className="overflow-hidden">
        <div className="hidden grid-cols-[40px_1fr_150px_170px_110px_100px] items-center gap-4 border-b border-graphite-100 bg-graphite-50/60 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-graphite-300 lg:grid">
          <span>#</span>
          <span>Услуга</span>
          <span>Категория</span>
          <span>Цена</span>
          <span>Публикация</span>
          <span className="text-right">Действия</span>
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="Позиции не найдены" description="Измените запрос или добавьте новую строку прайса." />
        ) : (
          <div className="divide-y divide-graphite-100">
            {filtered.map((item) => {
              const index = sorted.findIndex((entry) => entry.id === item.id);
              return (
                <div
                  key={item.id}
                  className="grid grid-cols-1 items-center gap-4 px-6 py-4 transition-colors hover:bg-graphite-50/50 lg:grid-cols-[40px_1fr_150px_170px_110px_100px]"
                >
                  <div className="flex items-center gap-1 text-xs text-graphite-300">
                    <SortButtons
                      onUp={() => crud.prices.move(item.id, -1)}
                      onDown={() => crud.prices.move(item.id, 1)}
                      disableUp={index === 0}
                      disableDown={index === sorted.length - 1}
                    />
                    <span className="tabular-nums">{item.order}</span>
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-graphite-900">{item.title}</p>
                    {item.note && (
                      <p className="mt-0.5 truncate text-xs text-graphite-300">{item.note}</p>
                    )}
                  </div>

                  <div>
                    <Badge tone="clay">{item.category}</Badge>
                  </div>

                  <p className="text-sm text-graphite-700">
                    от{' '}
                    <span className="text-base font-medium text-graphite-900">
                      {formatPrice(item.price)}
                    </span>
                    <span className="text-graphite-300"> / {item.unit}</span>
                  </p>

                  <Toggle
                    checked={item.published}
                    onChange={async () => {
                      await crud.prices.togglePublished(item.id);
                      notify(item.published ? 'Позиция скрыта' : 'Позиция опубликована', 'info');
                    }}
                  />

                  <div className="flex justify-end gap-1">
                    <IconButton icon={Pencil} label="Редактировать" onClick={() => setEditing(item)} />
                    <IconButton
                      icon={Trash2}
                      label="Удалить"
                      tone="danger"
                      onClick={() => setDeleting(item)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <p className="text-xs text-graphite-300">
        Пример строки на сайте: «Укладка керамогранита — от 80 ₾ / м²».
      </p>

      {(creating || editing) && (
        <PriceModal
          item={editing}
          onClose={() => {
            setEditing(null);
            setCreating(false);
          }}
          onSubmit={handleSubmit}
        />
      )}

      <ConfirmDialog
        open={Boolean(deleting)}
        title={`Удалить «${deleting?.title ?? ''}»?`}
        onCancel={() => setDeleting(null)}
        onConfirm={async () => {
          if (!deleting) return;
          await crud.prices.remove(deleting.id);
          setDeleting(null);
          notify('Позиция удалена', 'warning');
        }}
      />
    </div>
  );
}

function PriceModal({
  item,
  onClose,
  onSubmit,
}: {
  item: PriceItem | null;
  onClose(): void;
  onSubmit(values: Omit<PriceItem, 'id'>): Promise<void>;
}) {
  const [values, setValues] = useState<Omit<PriceItem, 'id'>>(() =>
    item ? { ...item } : { ...EMPTY },
  );
  const [saving, setSaving] = useState(false);

  function set<K extends keyof Omit<PriceItem, 'id'>>(key: K, value: Omit<PriceItem, 'id'>[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <Modal
      open
      onClose={onClose}
      title={item ? 'Редактирование позиции' : 'Новая позиция прайса'}
      footer={
        <>
          <button onClick={onClose} className="btn px-5 py-2.5 text-graphite-500 hover:bg-graphite-100">
            Отмена
          </button>
          <button
            disabled={saving || !values.title}
            onClick={async () => {
              setSaving(true);
              await onSubmit(values);
              setSaving(false);
            }}
            className="btn-dark px-5 py-2.5"
          >
            {saving ? 'Сохраняем…' : 'Сохранить'}
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <Field label="Услуга">
          <input
            value={values.title}
            onChange={(event) => set('title', event.target.value)}
            className="field-input"
            placeholder="Укладка керамогранита"
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Цена, ₾">
            <input
              type="number"
              min={0}
              value={values.price}
              onChange={(event) => set('price', Number(event.target.value))}
              className="field-input"
            />
          </Field>
          <Field label="Единица измерения">
            <select
              value={values.unit}
              onChange={(event) => set('unit', event.target.value)}
              className="field-input"
            >
              {UNITS.map((unit) => (
                <option key={unit}>{unit}</option>
              ))}
            </select>
          </Field>
          <Field label="Категория">
            <select
              value={values.category}
              onChange={(event) => set('category', event.target.value)}
              className="field-input"
            >
              {CATEGORIES.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Примечание" hint="Короткое уточнение под названием">
          <input
            value={values.note ?? ''}
            onChange={(event) => set('note', event.target.value)}
            className="field-input"
            placeholder="Итоговая смета — после замера"
          />
        </Field>

        <div className="rounded-xl border border-graphite-100 bg-graphite-50/60 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.16em] text-graphite-300">Предпросмотр</p>
          <p className="mt-2 text-sm">
            {values.title || 'Название услуги'} — от{' '}
            <strong>{formatPrice(values.price)}</strong> / {values.unit}
          </p>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-graphite-100 px-4 py-3">
          <div>
            <p className="text-sm font-medium">Показывать в прайсе</p>
            <p className="text-xs text-graphite-300">Выключите, чтобы временно скрыть позицию.</p>
          </div>
          <Toggle checked={values.published} onChange={(value) => set('published', value)} />
        </div>
      </div>
    </Modal>
  );
}
