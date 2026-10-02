'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ExternalLink, RotateCcw, Save } from 'lucide-react';
import { useAdminData } from '@/components/admin/data-provider';
import { useToast } from '@/components/admin/toast';
import { AdminPageHeader } from '@/components/admin/ui';
import { Block } from '@/components/admin/block-editors';
import {
  AboutEditor,
  HomeEditor,
  IntroFields,
  ProjectsEditor,
  ServicesEditor,
} from '@/components/admin/page-editors';
import { cn } from '@/lib/cn';
import type { PageIntro, PagesContent } from '@/lib/types';

/** Вкладки идут в том же порядке, что пункты меню на сайте. */
const TABS = [
  { key: 'home', label: 'Главная', href: '/' },
  { key: 'services', label: 'Услуги', href: '/services' },
  { key: 'projects', label: 'Проекты', href: '/projects' },
  { key: 'prices', label: 'Цены', href: '/prices' },
  { key: 'about', label: 'О нас', href: '/about' },
  { key: 'contacts', label: 'Контакт', href: '/contacts' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

/** Подсказка под шапкой: где редактируется содержимое самой страницы. */
const INTRO_HINTS: Record<string, string> = {
  prices: 'Строки прайса — в разделе «Цены», вопросы под таблицей — в разделе «FAQ».',
  contacts: 'Телефон, адрес и часы работы — в разделе «Настройки».',
};

export default function AdminPagesPage() {
  const { pages, updatePages, ready } = useAdminData();
  const { notify } = useToast();

  const [tab, setTab] = useState<TabKey>('home');
  const [draft, setDraft] = useState<PagesContent>(pages);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDraft(pages);
  }, [pages]);

  const dirty = JSON.stringify(draft) !== JSON.stringify(pages);
  const current = TABS.find((item) => item.key === tab)!;

  function setIntro(key: 'prices' | 'contacts', next: PageIntro) {
    setDraft((prev) => ({ ...prev, [key]: next }));
  }

  async function save() {
    setSaving(true);
    await updatePages(draft);
    setSaving(false);
    notify('Страницы сохранены');
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Страницы"
        description="Тексты и фотографии сайта. Блоки идут в том же порядке, что и на самой странице."
        action={
          <>
            <Link
              href={current.href}
              target="_blank"
              className="btn border border-graphite-100 bg-white px-5 py-2.5 text-graphite-500 hover:border-graphite-300 hover:text-graphite-900"
            >
              <ExternalLink className="h-4 w-4" /> Открыть страницу
            </Link>
            <button
              disabled={!dirty || saving || !ready}
              onClick={() => setDraft(pages)}
              className="btn border border-graphite-100 bg-white px-5 py-2.5 text-graphite-500 hover:border-graphite-300 hover:text-graphite-900"
            >
              <RotateCcw className="h-4 w-4" /> Отменить
            </button>
            <button
              disabled={!dirty || saving || !ready}
              onClick={save}
              className="btn-dark px-5 py-2.5"
            >
              <Save className="h-4 w-4" />
              {saving ? 'Сохраняем…' : 'Сохранить'}
            </button>
          </>
        }
      />

      {/* Переключатель страниц */}
      <div className="flex flex-wrap gap-1.5 rounded-2xl border border-graphite-100 bg-white p-1.5">
        {TABS.map((item) => (
          <button
            key={item.key}
            onClick={() => setTab(item.key)}
            className={cn(
              'rounded-xl px-4 py-2 text-sm transition',
              tab === item.key
                ? 'bg-graphite-900 text-white'
                : 'text-graphite-500 hover:bg-graphite-50 hover:text-graphite-900',
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {dirty && (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Есть несохранённые правки. Кнопка «Сохранить» сохраняет сразу все вкладки.
        </p>
      )}

      {tab === 'home' && (
        <HomeEditor
          value={draft.home}
          onChange={(home) => setDraft((prev) => ({ ...prev, home }))}
        />
      )}

      {tab === 'about' && (
        <AboutEditor
          value={draft.about}
          onChange={(about) => setDraft((prev) => ({ ...prev, about }))}
        />
      )}

      {tab === 'services' && (
        <ServicesEditor
          value={draft.services}
          onChange={(services) => setDraft((prev) => ({ ...prev, services }))}
        />
      )}

      {tab === 'projects' && (
        <ProjectsEditor
          value={draft.projects}
          onChange={(projects) => setDraft((prev) => ({ ...prev, projects }))}
        />
      )}

      {(tab === 'prices' || tab === 'contacts') && (
        <Block title="Шапка страницы" hint={INTRO_HINTS[tab]}>
          <IntroFields value={draft[tab]} onChange={(next) => setIntro(tab, next)} />
        </Block>
      )}
    </div>
  );
}
