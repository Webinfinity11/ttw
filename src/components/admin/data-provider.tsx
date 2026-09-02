'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type {
  DataSnapshot,
  FaqItem,
  HomeContent,
  Lead,
  PagesContent,
  PriceItem,
  Project,
  Review,
  Service,
  SiteSettings,
} from '@/lib/types';
import { mockApi, type CollectionKey } from '@/lib/data/mock-api';
import { seedSnapshot } from '@/lib/data/storage';

export interface Crud<T extends { id: string }> {
  create(input: Omit<T, 'id'>): Promise<void>;
  update(id: string, patch: Partial<T>): Promise<void>;
  remove(id: string): Promise<void>;
  /** Сдвинуть элемент вверх (-1) или вниз (+1) в ручной сортировке. */
  move(id: string, direction: -1 | 1): Promise<void>;
  /** Переключить публикацию. */
  togglePublished(id: string): Promise<void>;
}

interface AdminContextValue {
  ready: boolean;
  services: Service[];
  projects: Project[];
  prices: PriceItem[];
  reviews: Review[];
  leads: Lead[];
  faq: FaqItem[];
  settings: SiteSettings;
  pages: PagesContent;
  crud: {
    services: Crud<Service>;
    projects: Crud<Project>;
    prices: Crud<PriceItem>;
    reviews: Crud<Review>;
    leads: Crud<Lead>;
    faq: Crud<FaqItem>;
  };
  updateSettings(patch: Partial<SiteSettings>): Promise<void>;
  updateHome(home: HomeContent): Promise<void>;
  resetDemoData(): Promise<void>;
}

const AdminContext = createContext<AdminContextValue | null>(null);

const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [snapshot, setSnapshot] = useState<DataSnapshot>(() => seedSnapshot());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    mockApi.loadAll().then((data) => {
      if (!alive) return;
      setSnapshot(data);
      setReady(true);
    });
    return () => {
      alive = false;
    };
  }, []);

  const patchCollection = useCallback((key: CollectionKey, items: unknown[]) => {
    setSnapshot((prev) => ({ ...prev, [key]: items }) as DataSnapshot);
  }, []);

  const crud = useMemo(() => {
    function build<T extends { id: string }>(key: CollectionKey): Crud<T> {
      // Коллекции однородны по операциям, но различаются по типу элемента.
      const api = mockApi[key] as unknown as {
        list(): Promise<unknown[]>;
        create(input: unknown): Promise<unknown[]>;
        update(id: string, patch: unknown): Promise<unknown[]>;
        remove(id: string): Promise<unknown[]>;
        reorder(ids: string[]): Promise<unknown[]>;
      };

      return {
        async create(input) {
          patchCollection(key, await api.create(input));
        },
        async update(id, patch) {
          patchCollection(key, await api.update(id, patch));
        },
        async remove(id) {
          patchCollection(key, await api.remove(id));
        },
        async move(id, direction) {
          const current = [...((await api.list()) as Array<T & { order: number }>)].sort(byOrder);
          const index = current.findIndex((item) => item.id === id);
          const target = index + direction;
          if (index === -1 || target < 0 || target >= current.length) return;
          const next = [...current];
          [next[index], next[target]] = [next[target], next[index]];
          patchCollection(
            key,
            await api.reorder(next.map((item) => item.id)),
          );
        },
        async togglePublished(id) {
          const items = (await api.list()) as Array<T & { published?: boolean }>;
          const item = items.find((entry) => entry.id === id);
          if (!item) return;
          patchCollection(key, await api.update(id, { published: !item.published }));
        },
      };
    }

    return {
      services: build<Service>('services'),
      projects: build<Project>('projects'),
      prices: build<PriceItem>('prices'),
      reviews: build<Review>('reviews'),
      leads: build<Lead>('leads'),
      faq: build<FaqItem>('faq'),
    };
  }, [patchCollection]);

  const updateSettings = useCallback(async (patch: Partial<SiteSettings>) => {
    const settings = await mockApi.settings.update(patch);
    setSnapshot((prev) => ({ ...prev, settings }));
  }, []);

  /** Содержимое главной сохраняется целиком: блоки правятся одной формой. */
  const updateHome = useCallback(async (home: HomeContent) => {
    const pages = await mockApi.pages.updateHome(home);
    setSnapshot((prev) => ({ ...prev, pages }));
  }, []);

  const resetDemoData = useCallback(async () => {
    setSnapshot(await mockApi.reset());
  }, []);

  const value: AdminContextValue = {
    ready,
    services: snapshot.services,
    projects: snapshot.projects,
    prices: snapshot.prices,
    reviews: snapshot.reviews,
    leads: snapshot.leads,
    faq: snapshot.faq,
    settings: snapshot.settings,
    pages: snapshot.pages,
    crud,
    updateSettings,
    updateHome,
    resetDemoData,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdminData(): AdminContextValue {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdminData должен вызываться внутри <AdminDataProvider>');
  return ctx;
}
