import type { DataSnapshot } from '@/lib/types';
import { mockServices } from '@/lib/mock/services';
import { mockProjects } from '@/lib/mock/projects';
import { mockPrices } from '@/lib/mock/prices';
import { mockReviews } from '@/lib/mock/reviews';
import { mockLeads } from '@/lib/mock/leads';
import { mockFaq } from '@/lib/mock/faq';
import { mockSettings } from '@/lib/mock/settings';

const STORAGE_KEY = 'plitka-admin-db:v1';

export function seedSnapshot(): DataSnapshot {
  return {
    services: mockServices,
    projects: mockProjects,
    prices: mockPrices,
    reviews: mockReviews,
    leads: mockLeads,
    faq: mockFaq,
    settings: mockSettings,
  };
}

/**
 * Слой хранения для демо-режима.
 *
 * Сейчас снимок данных лежит в localStorage, чтобы правки в админке
 * переживали перезагрузку страницы. При переходе на PostgreSQL + Prisma
 * этот модуль удаляется целиком, а `mock-api.ts` начинает ходить в `/api/*`.
 */
export function loadSnapshot(): DataSnapshot {
  if (typeof window === 'undefined') return seedSnapshot();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedSnapshot();
    const parsed = JSON.parse(raw) as Partial<DataSnapshot>;
    return { ...seedSnapshot(), ...parsed };
  } catch {
    return seedSnapshot();
  }
}

export function persistSnapshot(snapshot: DataSnapshot): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    /* приватный режим браузера — просто работаем в памяти */
  }
}

export function resetSnapshot(): DataSnapshot {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }
  return seedSnapshot();
}

export function createId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}
