'use client';

import { useMemo, useState } from 'react';
import { Pencil, Plus, Star, Trash2 } from 'lucide-react';
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
  Toggle,
} from '@/components/admin/ui';
import { cn, formatDate } from '@/lib/cn';
import { photo } from '@/lib/images';
import type { Review } from '@/lib/types';

const EMPTY: Omit<Review, 'id'> = {
  name: '',
  role: '',
  text: '',
  rating: 5,
  photo: photo('new-review', 400, 400),
  date: new Date().toISOString().slice(0, 10),
  published: true,
};

function Stars({
  value,
  onChange,
  size = 'sm',
}: {
  value: number;
  onChange?(value: number): void;
  size?: 'sm' | 'lg';
}) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const filled = index < value;
        const icon = (
          <Star
            className={cn(
              size === 'lg' ? 'h-6 w-6' : 'h-4 w-4',
              filled ? 'fill-accent-400 text-accent-400' : 'text-graphite-100',
            )}
          />
        );
        return onChange ? (
          <button key={index} type="button" onClick={() => onChange(index + 1)} aria-label={`${index + 1}`}>
            {icon}
          </button>
        ) : (
          <span key={index}>{icon}</span>
        );
      })}
    </div>
  );
}

export default function AdminReviewsPage() {
  const { reviews, crud } = useAdminData();
  const { notify } = useToast();

  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState<Review | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<Review | null>(null);

  const filtered = useMemo(
    () =>
      reviews.filter((review) =>
        `${review.name} ${review.text}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [reviews, query],
  );

  const average =
    reviews.length > 0
      ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
      : '—';

  async function handleSubmit(values: Omit<Review, 'id'>) {
    if (editing) {
      await crud.reviews.update(editing.id, values);
      notify('Отзыв обновлён');
    } else {
      await crud.reviews.create(values);
      notify('Отзыв добавлен');
    }
    setEditing(null);
    setCreating(false);
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Отзывы"
        description={`${reviews.length} отзывов · средняя оценка ${average}`}
        action={
          <button onClick={() => setCreating(true)} className="btn-dark px-5 py-2.5">
            <Plus className="h-4 w-4" /> Добавить отзыв
          </button>
        }
      />

      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Поиск по имени или тексту"
        className="lg:w-80"
      />

      {filtered.length === 0 ? (
        <Card>
          <EmptyState title="Отзывов нет" description="Добавьте первый отзыв — он появится на главной странице." />
        </Card>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((review) => (
            <div
              key={review.id}
              className="flex flex-col rounded-2xl border border-graphite-100 bg-white p-6 transition hover:shadow-soft"
            >
              <div className="flex items-start gap-3.5">
                <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-graphite-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={review.photo} alt={review.name} className="h-full w-full object-cover" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-graphite-900">{review.name}</p>
                  <p className="truncate text-xs text-graphite-300">
                    {review.role || '—'} · {formatDate(review.date)}
                  </p>
                  <div className="mt-2">
                    <Stars value={review.rating} />
                  </div>
                </div>
                {review.published ? <Badge tone="green">Виден</Badge> : <Badge>Скрыт</Badge>}
              </div>

              <p className="mt-5 line-clamp-4 flex-1 text-sm leading-relaxed text-graphite-500">
                {review.text}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-graphite-100 pt-4">
                <Toggle
                  checked={review.published}
                  onChange={async () => {
                    await crud.reviews.togglePublished(review.id);
                    notify(review.published ? 'Отзыв скрыт' : 'Отзыв опубликован', 'info');
                  }}
                />
                <div className="flex gap-1">
                  <IconButton icon={Pencil} label="Редактировать" onClick={() => setEditing(review)} />
                  <IconButton
                    icon={Trash2}
                    label="Удалить"
                    tone="danger"
                    onClick={() => setDeleting(review)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {(creating || editing) && (
        <ReviewModal
          review={editing}
          onClose={() => {
            setEditing(null);
            setCreating(false);
          }}
          onSubmit={handleSubmit}
        />
      )}

      <ConfirmDialog
        open={Boolean(deleting)}
        title={`Удалить отзыв ${deleting?.name ?? ''}?`}
        onCancel={() => setDeleting(null)}
        onConfirm={async () => {
          if (!deleting) return;
          await crud.reviews.remove(deleting.id);
          setDeleting(null);
          notify('Отзыв удалён', 'warning');
        }}
      />
    </div>
  );
}

function ReviewModal({
  review,
  onClose,
  onSubmit,
}: {
  review: Review | null;
  onClose(): void;
  onSubmit(values: Omit<Review, 'id'>): Promise<void>;
}) {
  const [values, setValues] = useState<Omit<Review, 'id'>>(() =>
    review ? { ...review } : { ...EMPTY },
  );
  const [saving, setSaving] = useState(false);

  function set<K extends keyof Omit<Review, 'id'>>(key: K, value: Omit<Review, 'id'>[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <Modal
      open
      onClose={onClose}
      title={review ? 'Редактирование отзыва' : 'Новый отзыв'}
      footer={
        <>
          <button onClick={onClose} className="btn px-5 py-2.5 text-graphite-500 hover:bg-graphite-100">
            Отмена
          </button>
          <button
            disabled={saving || !values.name || !values.text}
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
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Имя">
            <input
              value={values.name}
              onChange={(event) => set('name', event.target.value)}
              className="field-input"
              placeholder="Нино Гвазава"
            />
          </Field>
          <Field label="Объект / роль">
            <input
              value={values.role ?? ''}
              onChange={(event) => set('role', event.target.value)}
              className="field-input"
              placeholder="Квартира в Ваке"
            />
          </Field>
        </div>

        <Field label="Текст отзыва">
          <textarea
            rows={5}
            value={values.text}
            onChange={(event) => set('text', event.target.value)}
            className="field-input resize-none"
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Оценка">
            <div className="flex h-[42px] items-center gap-3">
              <Stars value={values.rating} onChange={(value) => set('rating', value)} size="lg" />
              <span className="text-sm text-graphite-500">{values.rating} из 5</span>
            </div>
          </Field>
          <Field label="Дата">
            <input
              type="date"
              value={values.date.slice(0, 10)}
              onChange={(event) => set('date', event.target.value)}
              className="field-input"
            />
          </Field>
        </div>

        <Field label="Фотография (URL)">
          <input
            value={values.photo}
            onChange={(event) => set('photo', event.target.value)}
            className="field-input"
          />
        </Field>

        {values.photo && (
          <div className="flex items-center gap-3">
            <span className="relative h-14 w-14 overflow-hidden rounded-full border border-graphite-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={values.photo} alt="Превью" className="h-full w-full object-cover" />
            </span>
            <span className="text-xs text-graphite-300">Так аватар выглядит на сайте</span>
          </div>
        )}

        <div className="flex items-center justify-between rounded-xl border border-graphite-100 bg-graphite-50/60 px-4 py-3">
          <div>
            <p className="text-sm font-medium">Публикация</p>
            <p className="text-xs text-graphite-300">Отзыв появится в блоке «Отзывы» на сайте.</p>
          </div>
          <Toggle checked={values.published} onChange={(value) => set('published', value)} />
        </div>
      </div>
    </Modal>
  );
}
