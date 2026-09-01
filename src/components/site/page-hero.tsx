import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
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
    <section className="relative overflow-hidden bg-graphite-950">
      <Image
        src="/tiles/hero-marble.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-50 [object-position:50%_35%]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-graphite-950 via-graphite-950/88 to-graphite-950/60" />
      <div className="absolute inset-0 tile-grid-lg" />
      <div className="absolute inset-0 bg-[radial-gradient(100%_120%_at_80%_40%,rgba(14,138,118,0.28),transparent_62%)]" />

      <div className="container relative py-16 lg:py-20">
        <nav className="flex flex-wrap items-center gap-1.5 text-[13px] text-stone-300/50">
          <Link href="/" className="transition hover:text-accent-300">
            Главная
          </Link>
          {breadcrumbs.map((crumb) => (
            <span key={crumb.label} className="flex items-center gap-1.5">
              <ChevronRight className="h-3 w-3" />
              {crumb.href ? (
                <Link href={crumb.href} className="transition hover:text-accent-300">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-stone-300/80">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <div className="mt-8 max-w-3xl animate-fade-up">
          {eyebrow && (
            <span className="inline-block border-b-2 border-accent-500 pb-2 font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-white">
              {eyebrow}
            </span>
          )}
          <h1 className="display mt-6 text-4xl leading-[1.05] text-white sm:text-6xl">{title}</h1>
          {description && (
            <p className="mt-6 text-lg leading-[1.75] text-stone-300/75">{description}</p>
          )}
        </div>

        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
