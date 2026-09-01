'use client';

import { useEffect } from 'react';
import type { ComponentType, ReactNode } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp, ImageOff, Loader2, Search, X } from 'lucide-react';
import { cn } from '@/lib/cn';

/* ---------------------------------- Шапка --------------------------------- */

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-graphite-900">{title}</h1>
        {description && <p className="mt-1.5 text-sm text-graphite-500">{description}</p>}
      </div>
      {action && <div className="flex shrink-0 gap-2">{action}</div>}
    </div>
  );
}

/* ---------------------------------- Карточки ------------------------------- */

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-2xl border border-graphite-100 bg-white', className)}>{children}</div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = 'default',
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  icon: ComponentType<{ className?: string }>;
  tone?: 'default' | 'accent' | 'dark';
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border p-6 transition-shadow hover:shadow-soft',
        tone === 'dark'
          ? 'border-graphite-900 bg-graphite-950 text-stone-50'
          : 'border-graphite-100 bg-white',
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <p
          className={cn(
            'text-[11px] font-semibold uppercase tracking-[0.18em]',
            tone === 'dark' ? 'text-stone-200/50' : 'text-graphite-300',
          )}
        >
          {label}
        </p>
        <span
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-xl',
            tone === 'dark'
              ? 'bg-white/10 text-accent-300'
              : tone === 'accent'
                ? 'bg-accent-100 text-accent-600'
                : 'bg-graphite-50 text-graphite-500',
          )}
        >
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-6 text-4xl font-light tracking-tight">{value}</p>
      {hint && (
        <p className={cn('mt-2 text-xs', tone === 'dark' ? 'text-stone-200/50' : 'text-graphite-300')}>
          {hint}
        </p>
      )}
    </div>
  );
}

/* ---------------------------------- Значки --------------------------------- */

const BADGE_TONES = {
  neutral: 'bg-graphite-50 text-graphite-500 border-graphite-100',
  green: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  amber: 'bg-amber-50 text-amber-700 border-amber-100',
  sky: 'bg-sky-50 text-sky-700 border-sky-100',
  clay: 'bg-accent-50 text-accent-700 border-accent-100',
  red: 'bg-rose-50 text-rose-700 border-rose-100',
} as const;

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof BADGE_TONES;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium',
        BADGE_TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* --------------------------------- Переключатель --------------------------- */

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange(value: boolean): void;
  label?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label ?? 'Переключить'}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors',
        checked ? 'bg-emerald-500' : 'bg-graphite-100',
      )}
    >
      <span
        className={cn(
          'inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform',
          checked ? 'translate-x-[22px]' : 'translate-x-0.5',
        )}
      />
    </button>
  );
}

/* ---------------------------------- Кнопки --------------------------------- */

export function IconButton({
  icon: Icon,
  label,
  onClick,
  tone = 'default',
  disabled,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  onClick?(): void;
  tone?: 'default' | 'danger';
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-graphite-300 transition',
        'hover:border-graphite-100 hover:bg-white hover:text-graphite-900 disabled:pointer-events-none disabled:opacity-40',
        tone === 'danger' && 'hover:border-rose-100 hover:bg-rose-50 hover:text-rose-600',
      )}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

export function SortButtons({
  onUp,
  onDown,
  disableUp,
  disableDown,
}: {
  onUp(): void;
  onDown(): void;
  disableUp?: boolean;
  disableDown?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={onUp}
        disabled={disableUp}
        aria-label="Выше"
        className="rounded-t-md px-1.5 py-0.5 text-graphite-300 transition hover:bg-graphite-50 hover:text-graphite-900 disabled:pointer-events-none disabled:opacity-30"
      >
        <ChevronUp className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={onDown}
        disabled={disableDown}
        aria-label="Ниже"
        className="rounded-b-md px-1.5 py-0.5 text-graphite-300 transition hover:bg-graphite-50 hover:text-graphite-900 disabled:pointer-events-none disabled:opacity-30"
      >
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

/* ----------------------------------- Поля ---------------------------------- */

export function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn('block', className)}>
      <span className="field-label">{label}</span>
      {children}
      {hint && <span className="mt-1.5 block text-xs text-graphite-300">{hint}</span>}
    </label>
  );
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Поиск',
  className,
}: {
  value: string;
  onChange(value: string): void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={cn('relative', className)}>
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite-300" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="field-input pl-10"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-graphite-300 hover:text-graphite-700"
          aria-label="Очистить"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

/* --------------------------------- Превью ---------------------------------- */

export function Thumb({
  src,
  alt,
  className,
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'relative flex h-12 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-graphite-50 text-graphite-300',
        className,
      )}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes="64px" className="object-cover" />
      ) : (
        <ImageOff className="h-4 w-4" />
      )}
    </span>
  );
}

/* --------------------------------- Модальные ------------------------------- */

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
}: {
  open: boolean;
  onClose(): void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'md' | 'lg';
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-start justify-center overflow-y-auto p-4 sm:p-8">
      <button
        aria-label="Закрыть"
        onClick={onClose}
        className="fixed inset-0 animate-fade-in bg-graphite-950/40 backdrop-blur-sm"
      />
      <div
        className={cn(
          'relative z-10 my-auto w-full animate-scale-in rounded-2xl border border-graphite-100 bg-white shadow-lift',
          size === 'lg' ? 'max-w-3xl' : 'max-w-xl',
        )}
      >
        <div className="flex items-start justify-between gap-6 border-b border-graphite-100 px-7 py-5">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
            {description && <p className="mt-1 text-sm text-graphite-500">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-graphite-300 transition hover:bg-graphite-50 hover:text-graphite-900"
            aria-label="Закрыть"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="scrollbar-slim max-h-[calc(100vh-260px)] overflow-y-auto px-7 py-6">
          {children}
        </div>

        {footer && (
          <div className="flex justify-end gap-2 border-t border-graphite-100 bg-graphite-50/60 px-7 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Удалить',
  loading,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  loading?: boolean;
  onConfirm(): void;
  onCancel(): void;
}) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={title}
      description={description}
      footer={
        <>
          <button onClick={onCancel} className="btn px-5 py-2.5 text-graphite-500 hover:bg-graphite-50">
            Отмена
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="btn bg-rose-600 px-5 py-2.5 text-white hover:bg-rose-700"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {confirmLabel}
          </button>
        </>
      }
    >
      <p className="text-sm leading-relaxed text-graphite-500">
        Действие нельзя отменить. В демо-режиме данные хранятся в браузере и восстанавливаются
        кнопкой «Сбросить демо-данные» в настройках.
      </p>
    </Modal>
  );
}

/* -------------------------------- Пустое состояние ------------------------- */

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-graphite-50 text-graphite-300">
        <Search className="h-6 w-6" />
      </div>
      <h3 className="mt-5 text-base font-semibold">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm text-graphite-500">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

/* ------------------------------- Скелет загрузки --------------------------- */

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="divide-y divide-graphite-100">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="flex items-center gap-4 px-6 py-4">
          <div className="h-12 w-16 animate-pulse rounded-lg bg-graphite-50" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-1/3 animate-pulse rounded bg-graphite-50" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-graphite-50" />
          </div>
        </div>
      ))}
    </div>
  );
}
