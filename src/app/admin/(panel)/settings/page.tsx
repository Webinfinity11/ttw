'use client';

import { useEffect, useState } from 'react';
import { Clock, Mail, MapPin, MessageCircle, Phone, RotateCcw, Save, Send } from 'lucide-react';
import { useAdminData } from '@/components/admin/data-provider';
import { useToast } from '@/components/admin/toast';
import { AdminPageHeader, Card, ConfirmDialog, Field } from '@/components/admin/ui';
import type { SiteSettings } from '@/lib/types';

export default function AdminSettingsPage() {
  const { settings, updateSettings, resetDemoData, ready } = useAdminData();
  const { notify } = useToast();

  const [values, setValues] = useState<SiteSettings>(settings);
  const [saving, setSaving] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);

  useEffect(() => {
    setValues(settings);
  }, [settings]);

  function set<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  const dirty = JSON.stringify(values) !== JSON.stringify(settings);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Настройки"
        description="Контакты и реквизиты, которые подставляются в шапку, футер и формы сайта."
        action={
          <>
            <button
              onClick={() => setResetOpen(true)}
              className="btn border border-graphite-100 bg-white px-5 py-2.5 text-graphite-500 hover:border-graphite-300 hover:text-graphite-900"
            >
              <RotateCcw className="h-4 w-4" /> Сбросить демо-данные
            </button>
            <button
              disabled={!dirty || saving || !ready}
              onClick={async () => {
                setSaving(true);
                await updateSettings(values);
                setSaving(false);
                notify('Настройки сохранены');
              }}
              className="btn-dark px-5 py-2.5"
            >
              <Save className="h-4 w-4" />
              {saving ? 'Сохраняем…' : 'Сохранить'}
            </button>
          </>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <Card className="p-6 lg:p-8">
            <h2 className="text-base font-semibold tracking-tight">Компания</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Название компании" className="sm:col-span-2">
                <input
                  value={values.companyName}
                  onChange={(event) => set('companyName', event.target.value)}
                  className="field-input"
                />
              </Field>
              <Field label="Город">
                <input
                  value={values.city}
                  onChange={(event) => set('city', event.target.value)}
                  className="field-input"
                />
              </Field>
              <Field label="Рабочие часы">
                <input
                  value={values.workingHours}
                  onChange={(event) => set('workingHours', event.target.value)}
                  className="field-input"
                  placeholder="Пн–Сб, 09:00–19:00"
                />
              </Field>
              <Field label="Адрес" className="sm:col-span-2">
                <input
                  value={values.address}
                  onChange={(event) => set('address', event.target.value)}
                  className="field-input"
                />
              </Field>
              <Field
                label="О компании"
                className="sm:col-span-2"
                hint="Короткий текст для футера и страницы «О компании»"
              >
                <textarea
                  rows={3}
                  value={values.about}
                  onChange={(event) => set('about', event.target.value)}
                  className="field-input resize-none"
                />
              </Field>
            </div>
          </Card>

          <Card className="p-6 lg:p-8">
            <h2 className="text-base font-semibold tracking-tight">Контакты</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Телефон">
                <input
                  value={values.phone}
                  onChange={(event) => set('phone', event.target.value)}
                  className="field-input"
                  placeholder="+995 555 123 456"
                />
              </Field>
              <Field label="WhatsApp">
                <input
                  value={values.whatsapp}
                  onChange={(event) => set('whatsapp', event.target.value)}
                  className="field-input"
                />
              </Field>
              <Field label="Telegram">
                <input
                  value={values.telegram}
                  onChange={(event) => set('telegram', event.target.value)}
                  className="field-input"
                  placeholder="@tiling_work"
                />
              </Field>
              <Field label="Email">
                <input
                  type="email"
                  value={values.email}
                  onChange={(event) => set('email', event.target.value)}
                  className="field-input"
                />
              </Field>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="overflow-hidden">
            <div className="border-b border-graphite-100 px-6 py-5">
              <h2 className="text-base font-semibold tracking-tight">Как это выглядит на сайте</h2>
              <p className="mt-0.5 text-xs text-graphite-300">Предпросмотр блока контактов</p>
            </div>
            <div className="divide-y divide-graphite-100">
              {[
                { icon: Phone, label: 'Телефон', value: values.phone },
                { icon: MessageCircle, label: 'WhatsApp', value: values.whatsapp },
                { icon: Send, label: 'Telegram', value: values.telegram },
                { icon: Mail, label: 'Email', value: values.email },
                { icon: MapPin, label: 'Адрес', value: values.address },
                { icon: Clock, label: 'Часы работы', value: values.workingHours },
              ].map((row) => (
                <div key={row.label} className="flex items-start gap-3.5 px-6 py-4">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-graphite-50 text-graphite-500">
                    <row.icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-graphite-300">
                      {row.label}
                    </p>
                    <p className="mt-0.5 truncate text-sm text-graphite-900">{row.value || '—'}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-graphite-950 p-6 text-stone-50">
            <h2 className="text-base font-semibold tracking-tight">Demo-режим</h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-200/60">
              Все изменения сохраняются в localStorage браузера. Реальный backend подключается
              заменой методов в <code className="text-accent-300">src/lib/data/mock-api.ts</code> на
              запросы к API.
            </p>
          </Card>
        </div>
      </div>

      <ConfirmDialog
        open={resetOpen}
        title="Сбросить демо-данные?"
        description="Все изменения в услугах, проектах, ценах, отзывах, заявках и FAQ вернутся к исходным."
        confirmLabel="Сбросить"
        onCancel={() => setResetOpen(false)}
        onConfirm={async () => {
          await resetDemoData();
          setResetOpen(false);
          notify('Демо-данные восстановлены', 'info');
        }}
      />
    </div>
  );
}
