import type {
  FaqItem,
  HomeContent,
  PriceItem,
  Project,
  Review,
  Service,
  SiteSettings,
} from '@/lib/types';
import { mockServices } from '@/lib/mock/services';
import { mockProjects } from '@/lib/mock/projects';
import { mockPrices } from '@/lib/mock/prices';
import { mockReviews } from '@/lib/mock/reviews';
import { mockFaq } from '@/lib/mock/faq';
import { mockSettings } from '@/lib/mock/settings';
import { mockPages } from '@/lib/mock/pages';

/**
 * Источник данных для публичного сайта.
 *
 * Все функции асинхронные намеренно: когда появится PostgreSQL + Prisma,
 * тело каждой заменяется на `prisma.service.findMany({ where: { published: true } })`
 * без единого изменения в компонентах.
 */

const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;

export async function getServices(): Promise<Service[]> {
  return mockServices.filter((s) => s.published).sort(byOrder);
}

export async function getService(slug: string): Promise<Service | undefined> {
  return mockServices.find((s) => s.slug === slug && s.published);
}

export async function getProjects(): Promise<Project[]> {
  return mockProjects.filter((p) => p.published).sort(byOrder);
}

export async function getProject(slug: string): Promise<Project | undefined> {
  return mockProjects.find((p) => p.slug === slug && p.published);
}

export async function getPrices(): Promise<PriceItem[]> {
  return mockPrices.filter((p) => p.published).sort(byOrder);
}

export async function getReviews(): Promise<Review[]> {
  return mockReviews.filter((r) => r.published);
}

export async function getFaq(): Promise<FaqItem[]> {
  return mockFaq.filter((f) => f.published).sort(byOrder);
}

export async function getSettings(): Promise<SiteSettings> {
  return mockSettings;
}

/** Тексты и фотографии главной страницы. */
export async function getHomeContent(): Promise<HomeContent> {
  return mockPages.home;
}
