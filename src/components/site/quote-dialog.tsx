'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Check, Loader2, Phone, X } from 'lucide-react';
import { cn } from '@/lib/cn';

interface QuoteContextValue {
  open(service?: string): void;
  close(): void;
  isOpen: boolean;
}

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function useQuote(): QuoteContextValue {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error('useQuote должен вызываться внутри <QuoteProvider>');
  return ctx;
}

interface QuoteProviderProps {
  children: ReactNode;
  services: string[];
  phone: string;
}

export function QuoteProvider({ children, services, phone }: QuoteProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [preset, setPreset] = useState<string | undefined>();

  const open = useCallback((service?: string) => {
    setPreset(service);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, close]);

  return (
    <QuoteContext.Provider value={{ open, close, isOpen }}>
      {children}
      {isOpen && (
        <QuoteDialog services={services} phone={phone} preset={preset} onClose={close} />
      )}
    </QuoteContext.Provider>
  );
}

function QuoteDialog({
  services,
  phone,
  preset,
  onClose,
}: {
  services: string[];
  phone: string;
  preset?: string;
  onClose(): void;
}) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    service: preset ?? services[0] ?? '',
    message: '',
  });

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setState('sending');
    // Demo-режим: заявка никуда не уходит. Позже здесь будет
    // POST /api/leads, который создаст запись в PostgreSQL.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setState('sent');
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button
        aria-label="Закрыть"
        onClick={onClose}
        className="absolute inset-0 bg-graphite-950/80 animate-fade-in"
      />
      <div className="relative z-10 w-full max-w-lg animate-scale-in overflow-hidden rounded-none border border-graphite-700 bg-graphite-900 shadow-lift sm:rounded-none">
        <div className="flex items-start justify-between gap-6 border-b border-graphite-700 px-7 py-6">
          <div>
            <span className="eyebrow">Заявка</span>
            <h3 className="mt-2 font-display text-3xl font-black leading-tight">
              Рассчитать стоимость
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-stone-400 transition hover:bg-graphite-800 hover:text-stone-100"
            aria-label="Закрыть"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {state === 'sent' ? (
          <div className="px-7 py-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-stone-100 text-graphite-950">
              <Check className="h-7 w-7" />
            </div>
            <h4 className="mt-6 font-display text-2xl font-black">Заявка принята</h4>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-stone-200">
              Свяжемся с вами в течение рабочего дня, уточним детали и предложим удобное время
              для бесплатного замера.
            </p>
            <button onClick={onClose} className="btn-dark mt-8">
              Понятно
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-7 py-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="field-label-dark">Имя</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="field-dark"
                  placeholder="Как к вам обращаться"
                />
              </div>
              <div>
                <label className="field-label-dark">Телефон</label>
                <input
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="field-dark"
                  placeholder="+995 5__ __ __ __"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="field-label-dark">Услуга</label>
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="field-dark"
              >
                {services.map((service) => (
                  <option key={service}>{service}</option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <label className="field-label-dark">Комментарий</label>
              <textarea
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="field-dark resize-none"
                placeholder="Площадь, формат плитки, сроки"
              />
            </div>

            <button
              type="submit"
              disabled={state === 'sending'}
              className={cn('btn-dark mt-6 w-full py-3.5')}
            >
              {state === 'sending' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Отправляем
                </>
              ) : (
                'Отправить заявку'
              )}
            </button>

            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="mt-4 flex items-center justify-center gap-2 text-sm text-stone-200 transition hover:text-stone-100"
            >
              <Phone className="h-4 w-4" /> или позвоните: {phone}
            </a>
          </form>
        )}
      </div>
    </div>
  );
}

/** Кнопка, открывающая модальное окно заявки. */
export function QuoteButton({
  children,
  className,
  service,
}: {
  children: ReactNode;
  className?: string;
  service?: string;
}) {
  const { open } = useQuote();
  return (
    <button type="button" onClick={() => open(service)} className={className}>
      {children}
    </button>
  );
}
