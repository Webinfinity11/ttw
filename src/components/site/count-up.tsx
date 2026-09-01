'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Число в показателях набегает от нуля.
 * Значение вида «480+» или «160×320» — цифры анимируются, хвост остаётся.
 */
export function CountUp({
  value,
  delay = 0,
  duration = 1200,
}: {
  value: string;
  delay?: number;
  duration?: number;
}) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : value;

  const [current, setCurrent] = useState(match ? 0 : target);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!match) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCurrent(target);
      return;
    }

    let start: number | null = null;
    const timer = window.setTimeout(() => {
      const step = (time: number) => {
        if (start === null) start = time;
        const ratio = Math.min((time - start) / duration, 1);
        // мягкое замедление к концу
        const eased = 1 - Math.pow(1 - ratio, 3);
        setCurrent(Math.round(target * eased));
        if (ratio < 1) frame.current = window.requestAnimationFrame(step);
      };
      frame.current = window.requestAnimationFrame(step);
    }, delay);

    return () => {
      window.clearTimeout(timer);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, [match, target, delay, duration]);

  return (
    <>
      {current}
      {suffix}
    </>
  );
}
