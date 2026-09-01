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
import type { FaqItem } from '@/lib/types';

const EMPTY: Omit<FaqItem, 'id'> = {
  question: '',
  answer: '',
  published: true,
  order: 999,
};

export default function AdminFaqPage() {
  const { faq, crud } = useAdminData();
  const { notify } = useToast();

  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState<FaqItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<FaqItem | null>(null);

  const sorted = useMemo(() => [...faq].sort((a, b) => a.order - b.order), [faq]);
  const filtered = useMemo(
    () =>
      sorted.filter((item) =>
        `${item.question} ${item.answer}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [sorted, query],
  );

  async function handleSubmit(values: Omit<FaqItem, 'id'>) {
    if (editing) {
      await crud.faq.update(editing.id, values);
      notify('Вопрос обновлён');
    } else {
      await crud.faq.create({ ...values, order: faq.length + 1 });
      notify('Вопрос добавлен');
    }
    setEditing(null);
    setCreating(false);
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="FAQ"
        description={`${faq.length} вопросов · ${faq.filter((item) => item.published).length} опубликовано`}
        action={
          <button onClick={() => setCreating(true)} className="btn-dark px-5 py-2.5">
            <Plus className="h-4 w-4" /> Добавить вопрос
          </button>
        }
      />

      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Поиск по вопросу или ответу"
        className="lg:w-80"
      />

      <Card className="overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState title="Вопросов нет" description="Добавьте первый вопрос — он появится в блоке FAQ." />
        ) : (
          <div className="divide-y divide-graphite-100">
            {filtered.map((item) => {
              const index = sorted.findIndex((entry) => entry.id === item.id);
              return (
                <div key={item.id} className="flex gap-4 px-6 py-5 transition-colors hover:bg-graphite-50/50">
                  <div className="flex items-start pt-1">
                    <SortButtons
                      onUp={() => crud.faq.move(item.id, -1)}
                      onDown={() => crud.faq.move(item.id, 1)}
                      disableUp={index === 0}
                      disableDown={index === sorted.length - 1}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-sm font-medium text-graphite-900">{item.question}</p>
                      {item.published ? (
                        <Badge tone="green">Опубликован</Badge>
                      ) : (
                        <Badge>Скрыт</Badge>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-graphite-500">{item.answer}</p>
                  </div>

                  <div className="flex shrink-0 items-start gap-2">
                    <Toggle
                      checked={item.published}
                      onChange={async () => {
                        await crud.faq.togglePublished(item.id);
                        notify(item.published ? 'Вопрос скрыт' : 'Вопрос опубликован', 'info');
                      }}
                    />
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

      {(creating || editing) && (
        <FaqModal
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
        title="Удалить вопрос?"
        description={deleting?.question}
        onCancel={() => setDeleting(null)}
        onConfirm={async () => {
          if (!deleting) return;
          await crud.faq.remove(deleting.id);
          setDeleting(null);
          notify('Вопрос удалён', 'warning');
        }}
      />
    </div>
  );
}

function FaqModal({
  item,
  onClose,
  onSubmit,
}: {
  item: FaqItem | null;
  onClose(): void;
  onSubmit(values: Omit<FaqItem, 'id'>): Promise<void>;
}) {
  const [values, setValues] = useState<Omit<FaqItem, 'id'>>(() =>
    item ? { ...item } : { ...EMPTY },
  );
  const [saving, setSaving] = useState(false);

  return (
    <Modal
      open
      onClose={onClose}
      size="lg"
      title={item ? 'Редактирование вопроса' : 'Новый вопрос'}
      footer={
        <>
          <button onClick={onClose} className="btn px-5 py-2.5 text-graphite-500 hover:bg-graphite-100">
            Отмена
          </button>
          <button
            disabled={saving || !values.question || !values.answer}
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
        <Field label="Вопрос">
          <input
            value={values.question}
            onChange={(event) => setValues({ ...values, question: event.target.value })}
            className="field-input"
            placeholder="Сколько стоит укладка плитки в Тбилиси?"
          />
        </Field>

        <Field label="Ответ">
          <textarea
            rows={6}
            value={values.answer}
            onChange={(event) => setValues({ ...values, answer: event.target.value })}
            className="field-input resize-none"
          />
        </Field>

        <div className="flex items-center justify-between rounded-xl border border-graphite-100 bg-graphite-50/60 px-4 py-3">
          <div>
            <p className="text-sm font-medium">Публикация</p>
            <p className="text-xs text-graphite-300">Вопрос появится в блоке FAQ на странице цен.</p>
          </div>
          <Toggle
            checked={values.published}
            onChange={(value) => setValues({ ...values, published: value })}
          />
        </div>
      </div>
    </Modal>
  );
}
