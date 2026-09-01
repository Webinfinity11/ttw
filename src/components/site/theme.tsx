'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/cn';

type Theme = 'dark' | 'light';

const ThemeContext = createContext<{ theme: Theme; toggle(): void } | null>(null);

const STORAGE_KEY = 'site-theme';

/**
 * Обёртка сайта: хранит выбранную тему и вешает `.theme-light`,
 * который переопределяет цветовые переменные. Админка не затрагивается.
 */
export function ThemeShell({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') setTheme(saved);
    } catch {
      /* приватный режим — остаёмся на тёмной */
    }
  }, []);

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark';
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <div
        className={cn(
          'flex min-h-screen flex-col bg-graphite-950 text-stone-100 transition-colors duration-500',
          theme === 'light' && 'theme-light',
        )}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme должен вызываться внутри <ThemeShell>');
  return ctx;
}

/** Переключатель темы для шапки. */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'}
      title={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
      className={cn(
        'flex h-9 w-9 items-center justify-center border border-graphite-700 text-stone-200 transition-colors hover:border-stone-300 hover:text-stone-100',
        className,
      )}
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
