'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Задержка появления в миллисекундах — для «лесенки» из карточек. */
  delay?: number;
  as?: ElementType;
}

/**
 * Мягкое появление блока при попадании во вьюпорт.
 * Стили лежат в globals.css (`[data-reveal]`), здесь только наблюдатель.
 */
export function Reveal({ children, className, delay = 0, as: Tag = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          window.setTimeout(() => {
            (entry.target as HTMLElement).dataset.reveal = 'shown';
          }, delay);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Tag ref={ref} data-reveal="" className={className}>
      {children}
    </Tag>
  );
}
