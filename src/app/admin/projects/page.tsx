'use client';

import { useMemo, useState } from 'react';
import { Eye, EyeOff, Images, Pencil, Plus, Trash2 } from 'lucide-react';
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
import { PhotoField } from '@/components/admin/photo-picker';
import { PhotoList } from '@/components/admin/block-editors';
import { cn } from '@/lib/cn';
import { photo } from '@/lib/images';
import { slugify } from '@/lib/slug';
import type { Project, ProjectCategory } from '@/lib/types';

const CATEGORIES: ProjectCategory[] = [
  'Ванные',
  'Кухни',
  'Керамогранит',
  'XXL',
  'Мозаика',
  'Террасы',
  'Лестницы',
];

const EMPTY: Omit<Project, 'id'> = {
  slug: '',
  title: '',
  description: '',
  category: 'Ванные',
  image: photo('new-project', 1400, 1050),
  images: [],
  area: 0,
  materials: '',
  location: 'Тбилиси',
  duration: '',
  published: true,
  order: 999,
};

export default function AdminProjectsPage() {
  const { projects, crud } = useAdminData();
  const { notify } = useToast();

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ProjectCategory | 'Все'>('Все');
  const [editing, setEditing] = useState<Project | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<Project | null>(null);

  const sorted = useMemo(() => [...projects].sort((a, b) => a.order - b.order), [projects]);

  const filtered = useMemo(
    () =>
      sorted.filter((project) => {
        const matchesQuery = `${project.title} ${project.description} ${project.materials}`
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesCategory = category === 'Все' || project.category === category;
        return matchesQuery && matchesCategory;
      }),
    [sorted, query, category],
  );

  async function handleSubmit(values: Omit<Project, 'id'>) {
    if (editing) {
      await crud.projects.update(editing.id, values);
      notify('Проект обновлён');
    } else {
      await crud.projects.create({ ...values, order: projects.length + 1 });
      notify('Проект добавлен');
    }
    setEditing(null);
    setCreating(false);
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Проекты"
        description={`${projects.length} проектов · ${projects.filter((p) => p.published).length} опубликовано`}
        action={
          <button onClick={() => setCreating(true)} className="btn-dark px-5 py-2.5">
            <Plus className="h-4 w-4" /> Добавить проект
          </button>
        }
      />

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Поиск по названию или материалам"
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

      {filtered.length === 0 ? (
        <Card>
          <EmptyState
            title="Проекты не найдены"
            description="Попробуйте изменить фильтр или добавьте новый проект."
            action={
              <button onClick={() => setCreating(true)} className="btn-dark px-5 py-2.5">
                <Plus className="h-4 w-4" /> Добавить проект
              </button>
            }
          />
        </Card>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="group overflow-hidden rounded-2xl border border-graphite-100 bg-white transition hover:shadow-soft"
            >
              <div className="relative aspect-[16/10] bg-graphite-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
                  <Badge tone="clay" className="bg-white/90 backdrop-blur">
                    {project.category}
                  </Badge>
                  {project.published ? (
                    <Badge tone="green" className="bg-white/90 backdrop-blur">
                      Опубликован
                    </Badge>
                  ) : (
                    <Badge className="bg-white/90 backdrop-blur">Скрыт</Badge>
                  )}
                </div>
                {project.images.length > 0 && (
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-graphite-950/70 px-2.5 py-1 text-[11px] text-white backdrop-blur">
                    <Images className="h-3 w-3" /> {project.images.length + 1}
                  </span>
                )}
              </div>

              <div className="p-5">
                <p className="truncate text-sm font-semibold text-graphite-900">{project.title}</p>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-graphite-300">
                  {project.description}
                </p>

                <div className="mt-4 flex items-center gap-3 text-xs text-graphite-500">
                  <span>{project.area} м²</span>
                  <span className="h-1 w-1 rounded-full bg-graphite-100" />
                  <span>{project.duration || '—'}</span>
                  <span className="h-1 w-1 rounded-full bg-graphite-100" />
                  <span className="truncate">{project.location}</span>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-graphite-100 pt-4">
                  <Toggle
                    checked={project.published}
                    onChange={async () => {
                      await crud.projects.togglePublished(project.id);
                      notify(project.published ? 'Проект скрыт' : 'Проект опубликован', 'info');
                    }}
                  />
                  <div className="flex gap-1">
                    <IconButton
                      icon={project.published ? Eye : EyeOff}
                      label="Публикация"
                      onClick={() => crud.projects.togglePublished(project.id)}
                    />
                    <IconButton
                      icon={Pencil}
                      label="Редактировать"
                      onClick={() => setEditing(project)}
                    />
                    <IconButton
                      icon={Trash2}
                      label="Удалить"
                      tone="danger"
                      onClick={() => setDeleting(project)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {(creating || editing) && (
        <ProjectModal
          project={editing}
          onClose={() => {
            setEditing(null);
            setCreating(false);
          }}
          onSubmit={handleSubmit}
        />
      )}

      <ConfirmDialog
        open={Boolean(deleting)}
        title={`Удалить проект «${deleting?.title ?? ''}»?`}
        onCancel={() => setDeleting(null)}
        onConfirm={async () => {
          if (!deleting) return;
          await crud.projects.remove(deleting.id);
          setDeleting(null);
          notify('Проект удалён', 'warning');
        }}
      />
    </div>
  );
}

function ProjectModal({
  project,
  onClose,
  onSubmit,
}: {
  project: Project | null;
  onClose(): void;
  onSubmit(values: Omit<Project, 'id'>): Promise<void>;
}) {
  const [values, setValues] = useState<Omit<Project, 'id'>>(() =>
    project ? { ...project } : { ...EMPTY },
  );
  const [gallery, setGallery] = useState(values.images.join('\n'));
  const [saving, setSaving] = useState(false);

  function set<K extends keyof Omit<Project, 'id'>>(key: K, value: Omit<Project, 'id'>[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  const galleryList = gallery
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <Modal
      open
      onClose={onClose}
      size="lg"
      title={project ? 'Редактирование проекта' : 'Новый проект'}
      description="Обложка, галерея, площадь и материалы — то, что показывается в портфолио."
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
                images: galleryList,
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
            placeholder="Ванная в травертине, Ваке"
          />
        </Field>

        <Field label="Описание">
          <textarea
            rows={3}
            value={values.description}
            onChange={(event) => set('description', event.target.value)}
            className="field-input resize-none"
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Категория">
            <select
              value={values.category}
              onChange={(event) => set('category', event.target.value as ProjectCategory)}
              className="field-input"
            >
              {CATEGORIES.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </Field>
          <Field label="Площадь, м²">
            <input
              type="number"
              min={0}
              value={values.area}
              onChange={(event) => set('area', Number(event.target.value))}
              className="field-input"
            />
          </Field>
          <Field label="Локация">
            <input
              value={values.location}
              onChange={(event) => set('location', event.target.value)}
              className="field-input"
              placeholder="Ваке, Тбилиси"
            />
          </Field>
          <Field label="Срок работ">
            <input
              value={values.duration}
              onChange={(event) => set('duration', event.target.value)}
              className="field-input"
              placeholder="18 дней"
            />
          </Field>
        </div>

        <Field label="Материалы">
          <textarea
            rows={2}
            value={values.materials}
            onChange={(event) => set('materials', event.target.value)}
            className="field-input resize-none"
            placeholder="Керамогранит 60×120, эпоксидная затирка, гидроизоляция"
          />
        </Field>

        <div>
          <span className="field-label">Обложка</span>
          <PhotoField
            src={values.image}
            alt={values.title}
            withAlt={false}
            onChange={(next) => set('image', next.src)}
          />
        </div>

        <PhotoList
          label="Фотографии проекта"
          hint="Показываются на странице проекта после обложки."
          items={galleryList.map((src) => ({ src, alt: '' }))}
          onChange={(items) => setGallery(items.map((item) => item.src).join('\n'))}
          withAlt={false}
          addLabel="Добавить фотографию"
        />

        <div className="flex items-center justify-between rounded-xl border border-graphite-100 bg-graphite-50/60 px-4 py-3">
          <div>
            <p className="text-sm font-medium">Публикация в портфолио</p>
            <p className="text-xs text-graphite-300">Скрытые проекты видны только в админке.</p>
          </div>
          <Toggle checked={values.published} onChange={(value) => set('published', value)} />
        </div>
      </div>
    </Modal>
  );
}
