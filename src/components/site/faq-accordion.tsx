'use client';

import { useState } from 'react';
import type { FaqItem } from '@/lib/types';
import { cn } from '@/lib/cn';

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="border-t border-graphite-700">
      {items.map((item, index) => {
        const open = openId === item.id;
        return (
          <div key={item.id} className="border-b border-graphite-700">
            <button
              onClick={() => setOpenId(open ? null : item.id)}
              className="grid w-full items-center gap-4 py-7 text-left lg:grid-cols-[120px_1fr_60px]"
            >
              <span className="meta hidden lg:block">
                ВОПРОС {String(index + 1).padStart(2, '0')}
              </span>
              <span
                className={cn(
                  'text-[20px] font-medium transition-colors lg:text-[24px]',
                  open ? 'text-stone-100' : 'text-stone-300',
                )}
              >
                {item.question}
              </span>
              <span
                className={cn(
                  'justify-self-end text-[34px] font-light leading-none transition-transform duration-300',
                  open ? 'rotate-90 text-stone-100' : 'text-stone-300',
                )}
              >
                ›
              </span>
            </button>

            <div
              className={cn(
                'grid transition-all duration-300 ease-out',
                open ? 'grid-rows-[1fr] pb-8 opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl text-[16px] leading-[1.75] text-stone-200 lg:pl-[136px]">
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
