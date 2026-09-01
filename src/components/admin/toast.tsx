'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { Check, Info, TriangleAlert, X } from 'lucide-react';
import { cn } from '@/lib/cn';

type ToastTone = 'success' | 'info' | 'warning';

interface Toast {
  id: number;
  message: string;
  tone: ToastTone;
}

const ToastContext = createContext<{ notify(message: string, tone?: ToastTone): void } | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast должен вызываться внутри <ToastProvider>');
  return ctx;
}

const TONES: Record<ToastTone, { icon: typeof Check; className: string }> = {
  success: { icon: Check, className: 'bg-emerald-500/10 text-emerald-600' },
  info: { icon: Info, className: 'bg-sky-500/10 text-sky-600' },
  warning: { icon: TriangleAlert, className: 'bg-amber-500/10 text-amber-600' },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const notify = useCallback((message: string, tone: ToastTone = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, tone }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3600);
  }, []);

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <div className="pointer-events-none fixed bottom-6 right-6 z-[200] flex w-[320px] flex-col gap-2.5">
        {toasts.map((toast) => {
          const tone = TONES[toast.tone];
          return (
            <div
              key={toast.id}
              className="pointer-events-auto flex animate-scale-in items-start gap-3 rounded-2xl border border-graphite-100 bg-white p-4 shadow-lift"
            >
              <span
                className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', tone.className)}
              >
                <tone.icon className="h-4 w-4" />
              </span>
              <p className="flex-1 pt-1 text-sm text-graphite-700">{toast.message}</p>
              <button
                onClick={() => setToasts((prev) => prev.filter((item) => item.id !== toast.id))}
                className="rounded-md p-1 text-graphite-300 transition hover:bg-graphite-50 hover:text-graphite-700"
                aria-label="Закрыть"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
