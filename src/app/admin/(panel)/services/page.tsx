'use client';

import { useMemo, useState } from 'react';
import { Eye, EyeOff, Pencil, Plus, Trash2 } from 'lucide-react';
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
  Thumb,
  Toggle,
} from '@/components/admin/ui';
import { PhotoField } from '@/components/admin/photo-picker';
import { cn, formatPrice } from '@/lib/cn';
import { photo } from '@/lib/images';
import { slugify } from '@/lib/slug';
import type { Service, ServiceCategory } from '@/lib/types';

const CATEGORIES: ServiceCategory[] = [
  'Укладка',
  'Под ключ',
  'Подготовка',
  'Гидроизоляция',
  'Обработка',
  'Демонтаж',
  'Экстерьер',
];

const EMPTY: Omit<Service, 'id'> = {
  slug: '',
  title: '',
  description: '',
  details: '',
  image: photo('new-service', 1200, 900),
  price: 0,
  unit: 'м²',
  category: 'Укладка',
  features: [],
  published: true,
  order: 999,
};

export default function AdminServicesPage() {
  const { services, crud } = useAdminData();
  const { notify } = useToast();

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ServiceCategory | 'Все'>('Все');
  const [editing, setEditing] = useState<Service | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<Service | null>(null);

  const sorted = useMemo(() => [...services].sort((a, b) => a.order - b.order), [services]);

  const filtered = useMemo(
    () =>
      sorted.filter((service) => {
        const matchesQuery = `${service.title} ${service.description}`
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesCategory = category === 'Все' || service.category === category;
        return matchesQuery && matchesCategory;
      }),
    [sorted, query, category],
  );

  async function handleSubmit(values: Omit<Service, 'id'>) {
    if (editing) {
      await crud.services.update(editing.id, values);
      notify('Услуга обновлена');
    } else {
      await crud.services.create({ ...values, order: services.length + 1 });
      notify('Услуга добавлена');
    }
    setEditing(null);
    setCreating(false);
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Услуги"
        description={`${services.length} услуг · ${services.filter((s) => s.published).length} опубликовано`}
        action={
          <button onClick={() => setCreating(true)} className="btn-dark px-5 py-2.5">
            <Plus className="h-4 w-4" /> Добавить услугу
          </button>
        }
      />

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Поиск по названию или описанию"
          className="lg:w-80"
        />
        <div className="scrollbar-slim flex gap-2 overflow-x-auto pb-1">
          {(['Все', ...CATEGORIES] as const).map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={cn(
                'shrink-0 rounded-full border px-4 py-2 text-sm transition',
                category === item
                  ? 'border-graphite-900 bg-graphite-900 text-white'
                  : 'border-graphite-100 bg-white text-graphite-500 hover:border-graphite-300',
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="hidden grid-cols-[40px_1fr_140px_140px_110px_120px] items-center gap-4 border-b border-graphite-100 bg-graphite-50/60 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-graphite-300 lg:grid">
          <span>#</span>
          <span>Услуга</span>
          <span>Категория</span>
          <span>Цена</span>
          <span>Публикация</span>
          <span className="text-right">Действия</span>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title="Ничего не найдено"
            description="Измените поисковый запрос или выберите другую категорию."
          />
        ) : (
          <div className="divide-y divide-graphite-100">
            {filtered.map((service) => {
              const index = sorted.findIndex((item) => item.id === service.id);
              return (
                <div
                  key={service.id}
                  className="grid grid-cols-1 items-center gap-4 px-6 py-4 transition-colors hover:bg-graphite-50/50 lg:grid-cols-[40px_1fr_140px_140px_110px_120px]"
                >
                  <div className="flex items-center gap-1 text-xs text-graphite-300">
                    <SortButtons
                      onUp={() => crud.services.move(service.id, -1)}
                      onDown={() => crud.services.move(service.id, 1)}
                      disableUp={index === 0}
                      disableDown={index === sorted.length - 1}
                    />
                    <span className="tabular-nums">{service.order}</span>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <Thumb src={service.image} alt={service.title} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-graphite-900">
                        {service.title}
                      </p>
                      <p className="mt-0.5 line-clamp-1 text-xs text-graphite-300">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <div>
                    <Badge tone="clay">{service.category}</Badge>
                  </div>

                  <p className="text-sm text-graphite-700">
                    от {formatPrice(service.price)}
                    <span className="text-graphite-300"> / {service.unit}</span>
                  </p>

                  <div className="flex items-center gap-2">
                    <Toggle
                      checked={service.published}
                      onChange={async () => {
                        await crud.services.togglePublished(service.id);
                        notify(service.published ? 'Услуга скрыта' : 'Услуга опубликована', 'info');
                      }}
                    />
                    <span className="text-xs text-graphite-300 lg:hidden">
                      {service.published ? 'Опубликовано' : 'Скрыто'}
                    </span>
                  </div>

                  <div className="flex justify-end gap-1">
                    <IconButton
                      icon={service.published ? Eye : EyeOff}
                      label="Публикация"
                      onClick={() => crud.services.togglePublished(service.id)}
                    />
                    <IconButton icon={Pencil} label="Редактировать" onClick={() => setEditing(service)} />
                    <IconButton
                      icon={Trash2}
                      label="Удалить"
                      tone="danger"
                      onClick={() => setDeleting(service)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {(creating || editing) && (
        <ServiceModal
          service={editing}
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
          await crud.services.remove(deleting.id);
          setDeleting(null);
          notify('Услуга удалена', 'warning');
        }}
      />
    </div>
  );
}

function ServiceModal({
  service,
  onClose,
  onSubmit,
}: {
  service: Service | null;
  onClose(): void;
  onSubmit(values: Omit<Service, 'id'>): Promise<void>;
}) {
  const [values, setValues] = useState<Omit<Service, 'id'>>(() =>
    service ? { ...service } : { ...EMPTY },
  );
  const [features, setFeatures] = useState(values.features.join(', '));
  const [saving, setSaving] = useState(false);

  function set<K extends keyof Omit<Service, 'id'>>(key: K, value: Omit<Service, 'id'>[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <Modal
      open
      onClose={onClose}
      size="lg"
      title={service ? 'Редактирование услуги' : 'Новая услуга'}
      description="Поля соответствуют модели Service — их же будет отдавать backend."
      footer={
        <>
          <button onClick={onClose} className="btn px-5 py-2.5 text-graphite-500 hover:bg-graphite-100">
            Отмена
          </button>
          <button
            disabled={saving || !values.title}
            onClick={async () => {
              setSaving(true);
              await onSubmit({
                ...values,
                slug: values.slug || slugify(values.title),
                features: features
                  .split(',')
                  .map((item) => item.trim())
                  .filter(Boolean),
              });
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
        <Field label="Название">
          <input
            value={values.title}
            onChange={(event) => set('title', event.target.value)}
            className="field-input"
            placeholder="Укладка керамогранита"
          />
        </Field>

        <Field label="Описание">
          <textarea
            rows={3}
            value={values.description}
            onChange={(event) => set('description', event.target.value)}
            className="field-input resize-none"
            placeholder="Короткое описание для карточки услуги"
          />
        </Field>

        <Field label="Подробное описание" hint="Показывается на странице услуги">
          <textarea
            rows={3}
            value={values.details ?? ''}
            onChange={(event) => set('details', event.target.value)}
            className="field-input resize-none"
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
          <Field label="Единица">
            <select
              value={values.unit}
              onChange={(event) => set('unit', event.target.value)}
              className="field-input"
            >
              {['м²', 'п.м.', 'шт.', 'объект', 'мешок'].map((unit) => (
                <option key={unit}>{unit}</option>
              ))}
            </select>
          </Field>
          <Field label="Категория">
            <select
              value={values.category}
              onChange={(event) => set('category', event.target.value as ServiceCategory)}
              className="field-input"
            >
              {CATEGORIES.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </Field>
        </div>

        <div>
          <span className="field-label">Фотография</span>
          <PhotoField
            src={values.image}
            alt={values.title}
            withAlt={false}
            onChange={(next) => set('image', next.src)}
          />
        </div>

        <Field label="Преимущества" hint="Через запятую — выводятся на странице услуги">
          <input
            value={features}
            onChange={(event) => setFeatures(event.target.value)}
            className="field-input"
            placeholder="Бесплатный замер, Гарантия 3 года"
          />
        </Field>

        <div className="flex items-center justify-between rounded-xl border border-graphite-100 bg-graphite-50/60 px-4 py-3">
          <div>
            <p className="text-sm font-medium">Публикация на сайте</p>
            <p className="text-xs text-graphite-300">
              Скрытые услуги не показываются в каталоге и в футере.
            </p>
          </div>
          <Toggle checked={values.published} onChange={(value) => set('published', value)} />
        </div>
      </div>
    </Modal>
  );
}
