'use client';

import { useMemo, useState } from 'react';
import { MessageSquare, Phone, Trash2 } from 'lucide-react';
import { useAdminData } from '@/components/admin/data-provider';
import { LEAD_STATUSES, LeadStatusBadge } from '@/components/admin/lead-status';
import { useToast } from '@/components/admin/toast';
import {
  AdminPageHeader,
  Card,
  ConfirmDialog,
  EmptyState,
  IconButton,
  Modal,
  SearchInput,
} from '@/components/admin/ui';
import { cn, formatDateTime } from '@/lib/cn';
import { LEAD_STATUS_LABELS, type Lead, type LeadStatus } from '@/lib/types';

export default function AdminLeadsPage() {
  const { leads, crud } = useAdminData();
  const { notify } = useToast();

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<LeadStatus | 'all'>('all');
  const [opened, setOpened] = useState<Lead | null>(null);
  const [deleting, setDeleting] = useState<Lead | null>(null);

  const sorted = useMemo(
    () => [...leads].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [leads],
  );

  const filtered = useMemo(
    () =>
      sorted.filter((lead) => {
        const matchesQuery = `${lead.name} ${lead.phone} ${lead.service}`
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesStatus = status === 'all' || lead.status === status;
        return matchesQuery && matchesStatus;
      }),
    [sorted, query, status],
  );

  const counts = LEAD_STATUSES.map((value) => ({
    value,
    count: leads.filter((lead) => lead.status === value).length,
  }));

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Заявки"
        description={`${leads.length} заявок · ${leads.filter((l) => l.status === 'new').length} новых`}
      />

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Поиск по имени, телефону или услуге"
          className="lg:w-80"
        />
        <div className="scrollbar-slim flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setStatus('all')}
            className={cn(
              'shrink-0 rounded-full border px-4 py-2 text-sm transition',
              status === 'all'
                ? 'border-graphite-900 bg-graphite-900 text-white'
                : 'border-graphite-100 bg-white text-graphite-500 hover:border-graphite-300',
            )}
          >
            Все <span className="ml-1 text-xs opacity-60">{leads.length}</span>
          </button>
          {counts.map((item) => (
            <button
              key={item.value}
              onClick={() => setStatus(item.value)}
              className={cn(
                'shrink-0 rounded-full border px-4 py-2 text-sm transition',
                status === item.value
                  ? 'border-graphite-900 bg-graphite-900 text-white'
                  : 'border-graphite-100 bg-white text-graphite-500 hover:border-graphite-300',
              )}
            >
              {LEAD_STATUS_LABELS[item.value]}
              <span className="ml-1 text-xs opacity-60">{item.count}</span>
            </button>
          ))}
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="hidden grid-cols-[1fr_170px_1fr_150px_160px_80px] items-center gap-4 border-b border-graphite-100 bg-graphite-50/60 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-graphite-300 lg:grid">
          <span>Имя</span>
          <span>Телефон</span>
          <span>Услуга</span>
          <span>Дата</span>
          <span>Статус</span>
          <span className="text-right">Действия</span>
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="Заявок нет" description="В этом фильтре пока пусто." />
        ) : (
          <div className="divide-y divide-graphite-100">
            {filtered.map((lead) => (
              <div
                key={lead.id}
                className="grid grid-cols-1 items-center gap-4 px-6 py-4 transition-colors hover:bg-graphite-50/50 lg:grid-cols-[1fr_170px_1fr_150px_160px_80px]"
              >
                <button onClick={() => setOpened(lead)} className="min-w-0 text-left">
                  <p className="truncate text-sm font-medium text-graphite-900">{lead.name}</p>
                  {lead.message && (
                    <p className="mt-0.5 flex items-center gap-1.5 truncate text-xs text-graphite-300">
                      <MessageSquare className="h-3 w-3 shrink-0" />
                      {lead.message}
                    </p>
                  )}
                </button>

                <a
                  href={`tel:${lead.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-sm text-graphite-700 transition hover:text-accent-600"
                >
                  <Phone className="h-3.5 w-3.5 text-graphite-300" />
                  {lead.phone}
                </a>

                <p className="truncate text-sm text-graphite-500">{lead.service}</p>

                <p className="text-xs text-graphite-300">{formatDateTime(lead.date)}</p>

                <div>
                  <select
                    value={lead.status}
                    onChange={async (event) => {
                      await crud.leads.update(lead.id, {
                        status: event.target.value as LeadStatus,
                      });
                      notify('Статус заявки обновлён', 'info');
                    }}
                    className="w-full rounded-lg border border-graphite-100 bg-white px-3 py-2 text-sm outline-none transition focus:border-accent-300 focus:ring-4 focus:ring-accent-100/60"
                  >
                    {LEAD_STATUSES.map((value) => (
                      <option key={value} value={value}>
                        {LEAD_STATUS_LABELS[value]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end">
                  <IconButton
                    icon={Trash2}
                    label="Удалить"
                    tone="danger"
                    onClick={() => setDeleting(lead)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <p className="text-xs text-graphite-300">
        Заявки демонстрационные. После подключения backend сюда будут падать обращения с форм сайта.
      </p>

      <Modal
        open={Boolean(opened)}
        onClose={() => setOpened(null)}
        title={opened?.name ?? ''}
        description={opened ? formatDateTime(opened.date) : undefined}
        footer={
          <button
            onClick={() => setOpened(null)}
            className="btn px-5 py-2.5 text-graphite-500 hover:bg-graphite-100"
          >
            Закрыть
          </button>
        }
      >
        {opened && (
          <div className="space-y-5">
            <div className="flex items-center justify-between rounded-xl border border-graphite-100 px-4 py-3">
              <span className="text-sm text-graphite-500">Статус</span>
              <LeadStatusBadge status={opened.status} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-graphite-300">Телефон</p>
                <a
                  href={`tel:${opened.phone.replace(/\s/g, '')}`}
                  className="mt-1.5 block text-sm font-medium text-graphite-900"
                >
                  {opened.phone}
                </a>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-graphite-300">Услуга</p>
                <p className="mt-1.5 text-sm text-graphite-700">{opened.service}</p>
              </div>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-graphite-300">
                Комментарий
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-graphite-700">
                {opened.message || '— без комментария —'}
              </p>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={Boolean(deleting)}
        title={`Удалить заявку ${deleting?.name ?? ''}?`}
        onCancel={() => setDeleting(null)}
        onConfirm={async () => {
          if (!deleting) return;
          await crud.leads.remove(deleting.id);
          setDeleting(null);
          notify('Заявка удалена', 'warning');
        }}
      />
    </div>
  );
}
