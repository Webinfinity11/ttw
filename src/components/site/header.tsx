'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useQuote } from './quote-dialog';
import { LogoMark } from './logo';
import { ThemeToggle } from './theme';

const NAV = [
  { href: '/', label: 'Главная' },
  { href: '/about', label: 'О нас' },
  { href: '/services', label: 'Сервисы' },
  { href: '/contacts', label: 'Контакт' },
];

export function Header({ phone, companyName }: { phone: string; companyName: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { open } = useQuote();

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-graphite-700 bg-graphite-950">
      <div className="container flex items-center justify-between gap-6 py-5">
        {/* Логотип */}
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center border border-graphite-700 transition-colors">
            <LogoMark className="h-6 w-6 text-stone-100" />
          </span>
          <span className="leading-none">
            <span className="block text-[17px] font-semibold uppercase tracking-[0.16em] text-stone-100">
              {companyName}
            </span>
            <span className="mt-1 block text-[10px] uppercase tracking-[0.3em] text-stone-400">
              Плитка · Тбилиси
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-[14px] uppercase tracking-[0.06em] xl:flex">
          {NAV.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'transition-colors',
                  active
                    ? 'text-stone-100 underline underline-offset-[6px]'
                    : 'text-stone-200 hover:text-stone-400',
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={`tel:${phone.replace(/\s/g, '')}`}
            className="hidden text-[14px] uppercase tracking-[0.06em] text-stone-200 transition-colors hover:text-stone-400 md:block"
          >
            {phone}
          </a>

          {/* Кнопка заявки */}
          <button
            onClick={() => open()}
            className="group hidden items-center gap-3 bg-stone-100 py-3 pl-6 pr-4 text-[14px] font-medium text-graphite-950 transition-colors hover:bg-stone-200 sm:inline-flex"
          >
            Рассчитать смету
            <span className="text-[18px] leading-none transition-transform duration-300">
              ›
            </span>
          </button>

          <ThemeToggle />

          <button
            onClick={() => setMenuOpen((value) => !value)}
            className="text-stone-100 xl:hidden"
            aria-label="Меню"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-graphite-700 bg-graphite-950 xl:hidden">
          <div className="container flex flex-col py-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-graphite-800 py-4 text-[15px] uppercase tracking-[0.06em] text-stone-100 last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <button onClick={() => open()} className="btn-light mt-5 w-full">
              Рассчитать смету
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
