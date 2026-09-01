import type { DataSnapshot, SiteSettings } from '@/lib/types';
import { createId, loadSnapshot, persistSnapshot, resetSnapshot } from './storage';

/**
 * Mock-API админки.
 *
 * Публичная сигнатура специально повторяет будущий REST:
 *   list()   -> GET    /api/{collection}
 *   create() -> POST   /api/{collection}
 *   update() -> PATCH  /api/{collection}/{id}
 *   remove() -> DELETE /api/{collection}/{id}
 *   reorder()-> POST   /api/{collection}/reorder
 *
 * Чтобы перейти на настоящий backend, достаточно заменить тела методов на
 * `fetch(...)`: провайдер и страницы админки менять не нужно.
 */

export type CollectionKey = 'services' | 'projects' | 'prices' | 'reviews' | 'leads' | 'faq';
type ItemOf<K extends CollectionKey> = DataSnapshot[K][number];

/** Имитация сетевой задержки, чтобы состояния загрузки были видны. */
const latency = (ms = 140) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const ID_PREFIX: Record<CollectionKey, string> = {
  services: 'svc',
  projects: 'prj',
  prices: 'prc',
  reviews: 'rev',
  leads: 'lead',
  faq: 'faq',
};

function readAll<K extends CollectionKey>(key: K): ItemOf<K>[] {
  return loadSnapshot()[key] as ItemOf<K>[];
}

function writeAll<K extends CollectionKey>(key: K, items: ItemOf<K>[]): ItemOf<K>[] {
  const snapshot = loadSnapshot();
  // Типы коллекций различаются, но операция всегда однородна.
  persistSnapshot({ ...snapshot, [key]: items } as DataSnapshot);
  return items;
}

function collection<K extends CollectionKey>(key: K) {
  return {
    async list(): Promise<ItemOf<K>[]> {
      await latency(80);
      return readAll(key);
    },

    async create(input: Omit<ItemOf<K>, 'id'>): Promise<ItemOf<K>[]> {
      await latency();
      const item = { ...(input as object), id: createId(ID_PREFIX[key]) } as ItemOf<K>;
      return writeAll(key, [item, ...readAll(key)]);
    },

    async update(id: string, patch: Partial<ItemOf<K>>): Promise<ItemOf<K>[]> {
      await latency();
      const next = readAll(key).map((item) =>
        (item as { id: string }).id === id ? ({ ...item, ...patch } as ItemOf<K>) : item,
      );
      return writeAll(key, next);
    },

    async remove(id: string): Promise<ItemOf<K>[]> {
      await latency();
      return writeAll(
        key,
        readAll(key).filter((item) => (item as { id: string }).id !== id),
      );
    },

    /** Принимает id в нужном порядке и переписывает поле `order`. */
    async reorder(ids: string[]): Promise<ItemOf<K>[]> {
      await latency(60);
      const items = readAll(key);
      const next = items.map((item) => {
        const index = ids.indexOf((item as { id: string }).id);
        return index === -1 ? item : ({ ...item, order: index + 1 } as ItemOf<K>);
      });
      return writeAll(key, next);
    },
  };
}

export const mockApi = {
  services: collection('services'),
  projects: collection('projects'),
  prices: collection('prices'),
  reviews: collection('reviews'),
  leads: collection('leads'),
  faq: collection('faq'),

  settings: {
    async get(): Promise<SiteSettings> {
      await latency(80);
      return loadSnapshot().settings;
    },
    async update(patch: Partial<SiteSettings>): Promise<SiteSettings> {
      await latency();
      const snapshot = loadSnapshot();
      const settings = { ...snapshot.settings, ...patch };
      persistSnapshot({ ...snapshot, settings });
      return settings;
    },
  },

  async loadAll(): Promise<DataSnapshot> {
    await latency(120);
    return loadSnapshot();
  },

  /** Сброс демо-данных к исходному состоянию. */
  async reset(): Promise<DataSnapshot> {
    await latency(120);
    return resetSnapshot();
  },
};
