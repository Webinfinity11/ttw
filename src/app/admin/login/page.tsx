import type { Metadata } from 'next';
import { Suspense } from 'react';
import { LogoMark } from '@/components/site/logo';
import { LoginForm } from './login-form';

export const metadata: Metadata = {
  title: 'Вход — Tiling Work',
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen bg-graphite-50 text-graphite-900">
      {/* Тёмная панель с брендом — только на широких экранах */}
      <aside className="relative hidden w-[44%] max-w-[620px] flex-col justify-between overflow-hidden bg-graphite-950 p-12 lg:flex">
        <div className="flex items-center gap-3">
          <LogoMark className="h-9 w-9 text-accent-400" />
          <span className="flex flex-col leading-none">
            <span className="text-[13px] font-semibold uppercase tracking-[0.16em] text-stone-50">
              Tiling
            </span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.28em] text-stone-200/40">
              Admin
            </span>
          </span>
        </div>

        <div className="relative z-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-300">
            Панель управления
          </p>
          <h1 className="mt-4 max-w-sm text-4xl font-light leading-tight tracking-tight text-stone-50">
            Контент, заявки и&nbsp;отзывы — в&nbsp;одном месте.
          </h1>
        </div>

        <p className="text-xs text-stone-200/40">Tiling Work · Тбилиси</p>

        {/* Декоративная сетка плиток */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-1/2 grid -translate-y-1/2 grid-cols-4 gap-3 opacity-[0.07]"
        >
          {Array.from({ length: 16 }, (_, i) => (
            <span key={i} className="h-24 w-24 rounded-lg bg-stone-100" />
          ))}
        </div>
      </aside>

      <main className="flex flex-1 items-center justify-center px-5 py-12">
        <div className="w-full max-w-[400px]">
          <div className="mb-10 flex items-center gap-3 lg:hidden">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-graphite-950">
              <LogoMark className="h-7 w-7 text-accent-400" />
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.16em]">Tiling Admin</span>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight">Вход в админ-панель</h2>
          <p className="mt-1.5 text-sm text-graphite-500">Введите логин и пароль администратора.</p>

          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
