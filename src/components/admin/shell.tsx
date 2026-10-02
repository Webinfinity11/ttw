'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  CircleHelp,
  ExternalLink,
  FileText,
  Images,
  Inbox,
  LayoutDashboard,
  Layers,
  LogOut,
  Menu,
  Settings,
  Star,
  Tag,
  X,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { LogoMark } from '@/components/site/logo';
import { useAdminData } from './data-provider';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/pages', label: 'Страницы', icon: FileText },
  { href: '/admin/services', label: 'Услуги', icon: Layers },
  { href: '/admin/projects', label: 'Проекты', icon: Images },
  { href: '/admin/prices', label: 'Цены', icon: Tag },
  { href: '/admin/reviews', label: 'Отзывы', icon: Star },
  { href: '/admin/leads', label: 'Заявки', icon: Inbox, counter: 'leads' as const },
  { href: '/admin/faq', label: 'FAQ', icon: CircleHelp },
  { href: '/admin/settings', label: 'Настройки', icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' }).catch(() => {});
    window.location.href = '/admin/login';
  }
  const { leads, settings } = useAdminData();

  const newLeads = leads.filter((lead) => lead.status === 'new').length;

  useEffect(() => setMobileOpen(false), [pathname]);

  const nav = (
    <nav className="flex-1 space-y-1 px-3">
      {NAV.map((item) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-all duration-200',
              active
                ? 'bg-white/[0.08] text-white'
                : 'text-stone-200/50 hover:bg-white/[0.04] hover:text-stone-100',
            )}
          >
            <item.icon
              className={cn(
                'h-[18px] w-[18px] transition-colors',
                active ? 'text-accent-300' : 'text-stone-200/40 group-hover:text-stone-100',
              )}
            />
            <span className="flex-1">{item.label}</span>
            {item.counter === 'leads' && newLeads > 0 && (
              <span className="rounded-full bg-accent-300 px-2 py-0.5 text-[11px] font-semibold text-graphite-950">
                {newLeads}
              </span>
            )}
            {active && <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />}
          </Link>
        );
      })}
    </nav>
  );

  const sidebarBody = (
    <div className="flex h-full flex-col bg-graphite-950 py-6">
      <Link href="/admin" className="mb-8 flex items-center gap-3 px-6">
        <LogoMark className="h-8 w-8 text-accent-400" />
        <span className="flex flex-col leading-none">
          <span className="text-[13px] font-semibold uppercase tracking-[0.16em] text-stone-50">
            {settings.companyName.split(' ')[0]}
          </span>
          <span className="mt-1 text-[10px] uppercase tracking-[0.28em] text-stone-200/40">
            Admin
          </span>
        </span>
      </Link>

      {nav}

      <div className="mt-6 px-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-300">
            Демо-режим
          </p>
          <p className="mt-2 text-xs leading-relaxed text-stone-200/50">
            Данные хранятся в браузере. Backend подключается заменой mock-API.
          </p>
        </div>

        <Link
          href="/"
          className="mt-3 flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm text-stone-200/50 transition hover:bg-white/[0.04] hover:text-stone-100"
        >
          <ExternalLink className="h-[18px] w-[18px]" />
          Открыть сайт
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-graphite-50 text-graphite-900">
      {/* Десктопный сайдбар */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[264px] lg:block">{sidebarBody}</aside>

      {/* Мобильный сайдбар */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Закрыть меню"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 animate-fade-in bg-graphite-950/50 backdrop-blur-sm"
          />
          <aside className="relative h-full w-[264px] animate-fade-in">{sidebarBody}</aside>
        </div>
      )}

      <div className="lg:pl-[264px]">
        <header className="sticky top-0 z-30 border-b border-graphite-100 bg-white/85 backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between gap-4 px-5 lg:px-8">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(true)}
                className="rounded-lg border border-graphite-100 p-2 text-graphite-700 lg:hidden"
                aria-label="Меню"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <p className="text-sm font-semibold tracking-tight text-graphite-900">
                  Панель управления
                </p>
                <p className="text-xs text-graphite-300">
                  {settings.companyName} · {settings.city}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="hidden items-center gap-2 rounded-full border border-graphite-100 px-4 py-2 text-sm text-graphite-500 transition hover:border-graphite-300 hover:text-graphite-900 sm:inline-flex"
              >
                <ExternalLink className="h-4 w-4" />
                Сайт
              </Link>
              <div className="flex items-center gap-3 rounded-full border border-graphite-100 py-1 pl-1 pr-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-graphite-900 text-xs font-semibold text-white">
                  АД
                </span>
                <span className="hidden text-sm text-graphite-700 sm:block">Администратор</span>
              </div>
              <button
                type="button"
                onClick={logout}
                title="Выйти"
                className="inline-flex items-center gap-2 rounded-full border border-graphite-100 px-3 py-2 text-sm text-graphite-500 transition hover:border-graphite-300 hover:text-graphite-900 sm:px-4"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Выйти</span>
              </button>
            </div>
          </div>
        </header>

        <main className="px-5 py-8 lg:px-8 lg:py-10">
          <div className="mx-auto max-w-[1180px]">{children}</div>
        </main>
      </div>

      {mobileOpen && (
        <button
          onClick={() => setMobileOpen(false)}
          className="fixed right-5 top-5 z-[60] rounded-lg bg-white p-2 text-graphite-900 lg:hidden"
          aria-label="Закрыть"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
