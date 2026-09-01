import Link from 'next/link';
import type { ReactNode } from 'react';

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: Array<{ href?: string; label: string }>;
  children?: ReactNode;
}

export function PageHero({ eyebrow, title, description, breadcrumbs = [], children }: PageHeroProps) {
  return (
    <section className="container pt-12 lg:pt-16">
      <nav className="flex flex-wrap items-center gap-2 text-[13px] uppercase tracking-[0.06em] text-stone-400">
        <Link href="/" className="transition-colors hover:text-stone-100">
          Главная
        </Link>
        {breadcrumbs.map((crumb) => (
          <span key={crumb.label} className="flex items-center gap-2">
            <span>/</span>
            {crumb.href ? (
              <Link href={crumb.href} className="transition-colors hover:text-stone-100">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-stone-200">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>

      <div className="flex items-end justify-between gap-10 border-b border-graphite-700 pb-10 pt-8">
        <div className="max-w-4xl">
          {eyebrow && <span className="meta">{eyebrow.toUpperCase()}</span>}
          <h1 className="display mt-5 text-[10vw] uppercase leading-[0.95] sm:text-[7vw] lg:text-[4.4rem]">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-[16px] leading-[1.7] text-stone-200">{description}</p>
          )}
        </div>
        <span className="hidden pb-3 text-[64px] font-light leading-none text-stone-100 lg:block">
          ↘
        </span>
      </div>

      {children && <div className="mt-10">{children}</div>}
    </section>
  );
}
