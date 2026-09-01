'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * Число в показателях набегает от нуля.
 * Значение вида «480+» — цифры анимируются, хвост остаётся как есть.
 */
export function CountUp({
  value,
  delay = 0,
  duration = 900,
}: {
  value: string;
  delay?: number;
  duration?: number;
}) {
  // Разбор значения мемоизирован: иначе новый результат match на каждом
  // рендере перезапускал бы эффект и анимация зависала на середине.
  const { target, suffix, animatable } = useMemo(() => {
    const parsed = value.match(/^(\d+)(.*)$/);
    return parsed
      ? { target: Number(parsed[1]), suffix: parsed[2], animatable: true }
      : { target: 0, suffix: '', animatable: false };
  }, [value]);

  const [current, setCurrent] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!animatable) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCurrent(target);
      return;
    }

    let startTime: number | null = null;

    const timer = window.setTimeout(() => {
      const step = (time: number) => {
        if (startTime === null) startTime = time;
        const ratio = Math.min((time - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - ratio, 3);
        setCurrent(Math.round(target * eased));
        if (ratio < 1) {
          frame.current = window.requestAnimationFrame(step);
        } else {
          setCurrent(target);
        }
      };
      frame.current = window.requestAnimationFrame(step);
    }, delay);

    return () => {
      window.clearTimeout(timer);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, [animatable, target, delay, duration]);

  if (!animatable) return <>{value}</>;

  return (
    <>
      {current}
      {suffix}
    </>
  );
}
