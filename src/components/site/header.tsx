'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useQuote } from './quote-dialog';
import { LogoMark } from './logo';

const NAV = [
  { href: '/', label: 'Главная' },
  { href: '/services', label: 'Услуги' },
  { href: '/projects', label: 'Проекты' },
  { href: '/prices', label: 'Цены' },
  { href: '/about', label: 'О компании' },
  { href: '/contacts', label: 'Контакты' },
];

export function Header({ phone, companyName }: { phone: string; companyName: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { open } = useQuote();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header
      className={cn(
        'z-50 w-full bg-white',
        scrolled && 'sticky top-0 shadow-[0_10px_30px_-24px_rgba(11,16,15,0.6)]',
      )}
    >
      <div className="container flex items-stretch justify-between gap-8 px-0 lg:pr-8">
        {/* Логотип на акцентной плашке */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3.5 bg-accent-500 px-6 text-white transition-colors hover:bg-accent-600 lg:px-10"
        >
          <LogoMark className="h-9 w-9 text-white" />
          <span className="display text-2xl leading-none lg:text-[28px]">
            {companyName.split(' ')[0]}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 xl:flex">
          {NAV.map((item) => {
            const active =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-[16px] font-medium transition-colors',
                  active ? 'text-accent-500' : 'text-graphite-900 hover:text-accent-500',
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4 py-3 pr-5 lg:pr-0">
          <a
            href={`tel:${phone.replace(/\s/g, '')}`}
            className="hidden items-center gap-2.5 border border-stone-200 px-5 py-3.5 text-[15px] font-medium text-graphite-900 transition hover:border-accent-400 hover:text-accent-600 md:flex"
          >
            <Phone className="h-4 w-4 text-accent-500" />
            {phone}
          </a>
          <button onClick={() => open()} className="btn-accent hidden px-7 py-4 sm:inline-flex">
            Рассчитать смету
          </button>
          <button
            onClick={() => setMenuOpen((value) => !value)}
            className="border border-stone-200 p-3 text-graphite-900 xl:hidden"
            aria-label="Меню"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="animate-fade-in border-t border-stone-200 bg-white xl:hidden">
          <div className="container flex flex-col py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-stone-200 py-3.5 text-lg font-medium text-graphite-900 last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <button onClick={() => open()} className="btn-accent mt-4 w-full">
              Рассчитать смету
            </button>
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="mt-3 flex items-center justify-center gap-2 py-2 text-sm text-graphite-500"
            >
              <Phone className="h-4 w-4" /> {phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
