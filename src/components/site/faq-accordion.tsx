'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import type { FaqItem } from '@/lib/types';
import { cn } from '@/lib/cn';

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-stone-300 border-y border-stone-300">
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div key={item.id}>
            <button
              onClick={() => setOpenId(open ? null : item.id)}
              className="flex w-full items-start justify-between gap-6 py-6 text-left"
            >
              <span
                className={cn(
                  'text-lg font-medium tracking-tight transition-colors',
                  open ? 'text-graphite-900' : 'text-graphite-700',
                )}
              >
                {item.question}
              </span>
              <span
                className={cn(
                  'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
                  open
                    ? 'rotate-45 border-graphite-900 bg-graphite-900 text-white'
                    : 'border-stone-300 text-graphite-500',
                )}
              >
                <Plus className="h-4 w-4" />
              </span>
            </button>
            <div
              className={cn(
                'grid transition-all duration-300 ease-out',
                open ? 'grid-rows-[1fr] pb-7 opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl text-[15px] leading-relaxed text-graphite-500">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
