import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Reveal } from './reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  action?: ReactNode;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  action,
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
        {eyebrow && <span className="meta">{eyebrow.toUpperCase()}</span>}
        <h2 className="display mt-4 text-[9vw] uppercase leading-[0.98] sm:text-[6vw] lg:text-[3.4rem]">
          {title}
        </h2>
        {description && (
          <p className="mt-5 text-[16px] leading-[1.7] text-stone-200">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}
