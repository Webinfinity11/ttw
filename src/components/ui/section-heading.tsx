import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Reveal } from './reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  action?: ReactNode;
  tone?: 'light' | 'dark';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  action,
  tone = 'light',
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-6 md:flex-row md:items-end md:justify-between',
        align === 'center' && 'md:flex-col md:items-center md:text-center',
        className,
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
        {eyebrow && (
          <span className={cn('eyebrow', tone === 'dark' && 'text-accent-300')}>{eyebrow}</span>
        )}
        <h2
          className={cn(
            'display mt-4 text-4xl leading-[1.1] sm:text-5xl',
            tone === 'dark' ? 'text-white' : 'text-graphite-950',
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              'mt-5 text-[17px] leading-[1.75]',
              tone === 'dark' ? 'text-stone-300/75' : 'text-graphite-500',
            )}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}
