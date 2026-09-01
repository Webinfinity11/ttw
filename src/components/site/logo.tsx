import { cn } from '@/lib/cn';

/** Знак — четыре плитки со швом, набранные в квадрат. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={cn('h-8 w-8', className)} aria-hidden>
      <rect x="1" y="1" width="30" height="30" rx="7" className="stroke-current" strokeWidth="1.2" opacity=".28" />
      <rect x="6.5" y="6.5" width="8" height="8" rx="1.6" className="fill-current" opacity=".9" />
      <rect x="17.5" y="6.5" width="8" height="8" rx="1.6" className="fill-current" opacity=".45" />
      <rect x="6.5" y="17.5" width="8" height="8" rx="1.6" className="fill-current" opacity=".45" />
      <rect x="17.5" y="17.5" width="8" height="8" rx="1.6" className="fill-current" opacity=".9" />
    </svg>
  );
}

export function Logo({
  companyName,
  tone = 'light',
}: {
  companyName: string;
  tone?: 'light' | 'dark';
}) {
  const [first, ...rest] = companyName.split(' ');
  return (
    <span
      className={cn(
        'flex items-center gap-2.5',
        tone === 'dark' ? 'text-stone-50' : 'text-graphite-900',
      )}
    >
      <LogoMark className={tone === 'dark' ? 'text-accent-300' : 'text-accent-500'} />
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold uppercase tracking-[0.16em]">{first}</span>
        {rest.length > 0 && (
          <span
            className={cn(
              'mt-1 text-[10px] uppercase tracking-[0.3em]',
              tone === 'dark' ? 'text-stone-200/50' : 'text-graphite-300',
            )}
          >
            {rest.join(' ')}
          </span>
        )}
      </span>
    </span>
  );
}
