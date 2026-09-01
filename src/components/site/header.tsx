'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useQuote } from './quote-dialog';

const NAV = [
  { href: '/', label: 'Главная' },
  { href: '/services', label: 'Услуги' },
  { href: '/projects', label: 'Проекты' },
  { href: '/prices', label: 'Цены' },
  { href: '/about', label: 'О нас' },
];

export function Header({ phone }: { phone: string; companyName: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { open } = useQuote();

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-graphite-700 bg-graphite-950">
      <div className="container flex items-center justify-between gap-8 py-6">
        <nav className="hidden items-center gap-8 text-[14px] uppercase tracking-[0.06em] lg:flex">
          {NAV.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'transition-colors',
                  active ? 'text-stone-100 underline underline-offset-[6px]' : 'text-stone-200 hover:text-stone-400',
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link href="/" className="text-[15px] uppercase tracking-[0.14em] lg:hidden">
          Kerama
        </Link>

        <div className="flex items-center gap-8 text-[14px] uppercase tracking-[0.06em]">
          <a
            href={`tel:${phone.replace(/\s/g, '')}`}
            className="hidden text-stone-200 transition-colors hover:text-stone-400 md:block"
          >
            {phone}
          </a>
          <Link
            href="/contacts"
            className="hidden text-stone-200 transition-colors hover:text-stone-400 lg:block"
          >
            Контакты
          </Link>
          <button
            onClick={() => open()}
            className="hidden text-stone-100 underline underline-offset-[6px] transition-colors hover:text-stone-400 sm:block"
          >
            Смета
          </button>
          <button
            onClick={() => setMenuOpen((value) => !value)}
            className="text-stone-100 lg:hidden"
            aria-label="Меню"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-graphite-700 bg-graphite-950 lg:hidden">
          <div className="container flex flex-col py-3">
            {NAV.concat({ href: '/contacts', label: 'Контакты' }).map((item) => (
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
