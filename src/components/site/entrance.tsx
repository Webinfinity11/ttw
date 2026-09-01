'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Придерживает анимации входа до момента, когда шрифт загружен
 * и браузер готов рисовать: иначе первый кадр совпадает с подменой
 * шрифта и вход выглядит рванным.
 */
export function Entrance({ children, className }: { children: ReactNode; className?: string }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const start = () => {
      if (cancelled) return;
      // два кадра форы, чтобы стили успели примениться до старта
      requestAnimationFrame(() => requestAnimationFrame(() => !cancelled && setReady(true)));
    };

    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    if (fonts?.ready) {
      fonts.ready.then(start).catch(start);
    } else {
      start();
    }

    // страховка, если шрифты не отдались
    const fallback = window.setTimeout(start, 900);
    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
    };
  }, []);

  return <div className={cn('entrance', ready && 'is-ready', className)}>{children}</div>;
}
